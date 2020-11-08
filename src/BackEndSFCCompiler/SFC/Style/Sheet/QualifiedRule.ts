import Array from '.Array';
import freeze from '.Object.freeze';

import { newRegExp } from '@ltd/j-regexp';

import * as TOKEN from './TOKEN';
import { TypeSelector, ClassSelector } from './Selector';
import SquareBracketBlock from './SquareBracketBlock';
import ParenthesisBlock from './ParenthesisBlock';
import Declaration from './Declaration';

const IDENT = newRegExp('i')`^${TOKEN.ident_token}$`;

export class Declarations extends Array<Declaration> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.QualifiedRule.Declarations'; }
	
	readonly parent :QualifiedRule;
	
	constructor (parent :QualifiedRule) {
		super();
		this.parent = parent;
		return this;
	}
	
	appendToken (this :Declarations) :Sheet | DeclarationList | KeyframesRule | Declarations | Declaration | null {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.ident:
				return this[this.length] = new Declaration(this, TOKEN.literal);
			case '}':
				return this.parent.parent;
		}
		return null;
	}
	
}

freeze(Declarations.prototype);

const replaceTypeSelector = (func :ParenthesisBlock, qualifiedRule :QualifiedRule) :boolean => {
	
	let { length } = func;
	if ( !length ) { return false; }
	
	const indexes = [];
	let indexes_length = 0;
	
	let index = 1;
	for ( ; index!==length; ++index ) {
		if ( func[index]==='/**/' ) {
			const previousItem = func[index-1];
			if ( previousItem==='.' || previousItem===':' || previousItem==='|' || func[index+1]==='|' ) { indexes[indexes_length++] = index; }
		}
	}
	if ( indexes_length ) {
		length -= indexes_length;
		do { func.splice(indexes[--indexes_length], 1); }
		while ( indexes_length )
		indexes.length = 0;
	}
	
	for ( index = 0; index!==length; ++index ) {
		if ( func[index]==='|' && func[index+1]==='|' ) {
			if ( func[index+2]==='|' ) { return true; }
			func[index] = '||';
			indexes[indexes_length++] = ++index;
		}
	}
	if ( indexes_length ) {
		length -= indexes_length;
		do { func.splice(indexes[--indexes_length], 1); }
		while ( indexes_length )
		indexes.length = 0;
	}
	
	index = 0;
	for ( const { classSelectorsPART } = qualifiedRule; index!==length; ++index ) {
		let item = func[index];
		if ( item==='.' ) {
			if ( typeof ( item = func[index+1] )!=='string' || !IDENT.test(item) || func[index+2]==='|' ) { return true; }
			func[index] = classSelectorsPART[classSelectorsPART.length] = new ClassSelector(func, item);
			indexes[indexes_length++] = ++index;
		}
		else if ( item===':' ) {
			if ( typeof ( item = func[index+1] )==='string' && IDENT.test(item) ) {
				if ( func[index+2]==='|' ) { return true; }
				++index;
			}
		}
		else if ( item==='*' ) {
			if ( func[index+1]==='|' && ( item = func[index += 2] )!=='*' ) {
				if ( typeof item!=='string' || !IDENT.test(item) ) { return true; }
				func[index] = TOKEN.typeSelectors[TOKEN.typeSelectors.length] = new TypeSelector(func, item, true);
			}
		}
		else if ( item==='|' ) { return true; }
		else if ( typeof item==='string' ) {
			if ( IDENT.test(item) ) {
				if ( func[index+1]==='|' ) {
					item = func[index += 2];
					if ( item!=='*' ) {
						if ( typeof item!=='string' || !IDENT.test(item) ) { return true; }
						func[index] = TOKEN.typeSelectors[TOKEN.typeSelectors.length] = new TypeSelector(func, item, true);
					}
				}
				else {
					func[index] = TOKEN.typeSelectors[TOKEN.typeSelectors.length] = new TypeSelector(func, item, false);
				}
			}
		}
		else if ( item instanceof ParenthesisBlock && replaceTypeSelector(item, qualifiedRule) ) { return true; }
	}
	while ( indexes_length ) { func.splice(indexes[--indexes_length], 1); }
	
	return false;
	
};

export default class QualifiedRule extends Array<ParenthesisBlock | SquareBracketBlock | TypeSelector | ClassSelector | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.QualifiedRule'; }
	
	readonly parent :Sheet | DeclarationList | KeyframesRule;
	readonly block :Declarations;
	#func :ParenthesisBlock | null = null;
	#l :0 | 1 | 2 = 0;
	classSelectorsPART :ClassSelector[] = [];
	readonly classSelectors :ClassSelector[][] = [ this.classSelectorsPART ];
	
	constructor (parent :Sheet | DeclarationList | KeyframesRule) {
		super();
		this.parent = parent;
		this.block = new Declarations(this);
		return this;
	}
	
	appendToken (this :QualifiedRule, not? :boolean) :QualifiedRule | Declarations | ParenthesisBlock | SquareBracketBlock | null {
		if ( this.#func ) {
			if ( replaceTypeSelector(this.#func, this) ) { return null; }
			this.#func = null;
		}
		else if ( this.#l ) {
			if ( TOKEN.type==='|' ) {
				if ( this.#l===2 ) { return null; }
				this.#l = 2;
				return this;
			}
			else {
				let { length } = this;
				if ( !length ) { return null; }
				let lastItem = this[length-1];
				if ( this.#l===2 ) {
					this[lastItem===' ' || lastItem==='/**/' ? length-1 : length] = '||';
					return this;
				}
				if ( lastItem==='/**/' ) {
					if ( !--length ) { return null; }
					lastItem = this[length-1];
				}
				if ( lastItem!=='*' ) {
					const lastIndex = TOKEN.typeSelectors.length-1;
					if ( lastItem!==TOKEN.typeSelectors[lastIndex] ) { return null; }
					TOKEN.typeSelectors.length = lastIndex;
				}
				this[length] = '|';
				return this;
			}
		}
		switch ( TOKEN.type ) {
			case TOKEN.whitespace: {/// [0]
				const lastItem = this[this.length-1];
				if ( lastItem===',' || lastItem==='+' || lastItem==='>' || lastItem==='||' ) { return this; }
				this[this.length] = ' ';
				return this;
			}
			case ':':
				this[this.length] = TOKEN.type;
				return this;
			case '.':
				this[this.length] = TOKEN.type;
				return this;
			case TOKEN.ident:
				const lastItem = this[this.length-1];
				if ( lastItem===':' || not ) { this[this.length] = TOKEN.literal; }
				else {
					lastItem==='.'
						? this[this.length-1] = this.classSelectorsPART[this.classSelectorsPART.length] = new ClassSelector(this, TOKEN.literal)
						: this[this.length] = TOKEN.typeSelectors[TOKEN.typeSelectors.length] = new TypeSelector(this, TOKEN.literal, lastItem==='|');
				}
				return this;
			case ',':
				this.classSelectors[this.classSelectors.length] = this.classSelectorsPART = [];
			case '+':
			case '>': {
				const lastItem = this[this.length-1];
				this[lastItem===' ' || lastItem==='/**/' ? this.length-1 : this.length] = TOKEN.literal;
				return this;
			}
			case '|':
				this.#l = 1;
				return this;
			case '*':
			case '~':
			case '!':
			case '$':
			case '/':
			case TOKEN.hash:
			case TOKEN.percentage:// not style rule
				this[this.length] = TOKEN.literal;
				return this;
			case '[':
				const squareBracketBlock = new SquareBracketBlock(this);
				this[this.length] = squareBracketBlock;
				return squareBracketBlock;
			case TOKEN.function$:
				if ( this[this.length-1]!==':' ) { break; }
				const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
				this[this.length] = parenthesisBlock;
				this.#func = parenthesisBlock;
				return parenthesisBlock;
			case '{': {
				const lastItem = this[this.length-1];
				( lastItem===' ' || lastItem==='/**/' ) && --this.length;
				return this.block;
			}
			case TOKEN.comment: {/// [0]
				const lastItem = this[this.length-1];
				if ( lastItem===',' || lastItem==='+' || lastItem==='>' || lastItem==='||' || lastItem==='|' || lastItem==='.' || lastItem===':' ) { return this; }
				this[this.length] = '/**/';
				return this;
			}
		}
		return null;
	}
	
	selectorTextAt (this :QualifiedRule, index :number) :string {
		let start = 0;
		for ( ; index; --index ) { start = this.indexOf(',', start)+1; }
		let selectorText = '';
		let end = this.indexOf(',', start);
		if ( end<0 ) { end = this.length; }
		while ( start!==end ) {
			const child = this[start++]!;
			selectorText += typeof child==='string' ? child : child.cssText;
		}
		return selectorText;
	}
	
	private get selectorText () :string {
		let selectorText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index]!;
			selectorText = ( typeof child==='string' ? child : child.cssText )+selectorText;
		}
		return selectorText;
	}
	
	get cssText () :string {
		const { block } = this;
		let blockText = '';
		let index = block.length;
		while ( index ) { blockText = block[--index].cssText+blockText; }
		return blockText && `${this.selectorText}{${blockText.slice(0, -1)}}`;
	}
	
	beautify (this :QualifiedRule, tab? :string) :Generator<string, void, undefined>;
	* beautify (this :QualifiedRule) :Generator<string, void, undefined> {
		const { block } = this;
		let blockText = '';
		let index = block.length;
		while ( index ) { blockText = block[--index].cssText+' '+blockText; }
		if ( blockText ) { yield `${this.selectorText} { ${blockText}}`; }
	}
	
};

freeze(QualifiedRule.prototype);

import type Sheet from './';
import type { DeclarationList } from './AtRule';
import type KeyframesRule from './KeyframesRule';