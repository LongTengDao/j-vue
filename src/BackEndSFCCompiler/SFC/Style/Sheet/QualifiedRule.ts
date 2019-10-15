import Array from '.Array';
import undefined from '.undefined';
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
	}
	
	appendToken (this :Declarations) :Sheet | DeclarationList | KeyframesRule | Declarations | Declaration | void {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.ident:
				const declaration = new Declaration(this, TOKEN.literal);
				this.push(declaration);
				return declaration;
			case '}':
				return this.parent.parent;
		}
	}
	
}

freeze(Declarations.prototype);

function replaceTypeSelector (func :ParenthesisBlock, qualifiedRule :QualifiedRule) {
	const dotIndexes = [];
	let dotIndex = 0;
	const { length } = func;
	let index = 0;
	let not = '';
	while ( index<length ) {
		const item = func[index];
		if ( item===':' ) { not = item; }
		else if ( item==='.' ) {
			not = item;
			dotIndex = index;
		}
		else if ( item!=='/**/' ) {
			if ( item instanceof ParenthesisBlock ) { replaceTypeSelector(item, qualifiedRule); }
			else if ( typeof item==='string' ) {
				if ( IDENT.test(item) ) {
					if ( not==='' ) { qualifiedRule.typeSelectors.push(func[index] = new TypeSelector(func, item)); }
					else if ( not==='.' ) {
						dotIndexes.push(dotIndex);
						qualifiedRule.classSelectors.push(func[index] = new ClassSelector(func, item));
					}
				}
			}
			not = '';
		}
		++index;
	}
	index = dotIndexes.length;
	while ( index ) { func.splice(dotIndexes[--index], 1); }
}

export default class QualifiedRule extends Array<ParenthesisBlock | SquareBracketBlock | TypeSelector | ClassSelector | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.QualifiedRule'; }
	
	readonly parent :Sheet | DeclarationList | KeyframesRule;
	readonly block :Declarations;
	private not :':' | '.' | '' = '';
	private dotIndex :number = 0;
	private func? :ParenthesisBlock;
	readonly typeSelectors :TypeSelector[] = [];
	readonly classSelectors :ClassSelector[] = [];
	
	constructor (parent :Sheet | DeclarationList | KeyframesRule) {
		super();
		this.parent = parent;
		this.block = new Declarations(this);
	}
	
	appendToken (this :QualifiedRule, not? :boolean) :QualifiedRule | Declarations | ParenthesisBlock | SquareBracketBlock | void {
		const { func } = this;
		if ( func ) {
			replaceTypeSelector(func, this);
			this.func = undefined;
		}
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
				this.push(' ');
				this.not = '';
				return this;
			case ':':
				this.push(this.not = TOKEN.type);
				return this;
			case '.':
				this.push(this.not = TOKEN.type);
				this.dotIndex = this.length-1;
				return this;
			case TOKEN.ident:
				if ( this.not===':' || not ) { this.push(TOKEN.literal); }
				else {
					let selector;
					if ( this.not==='.' ) {
						this.classSelectors.push(selector = new ClassSelector(this, TOKEN.literal));
						this.splice(this.dotIndex, 1);
					}
					else {
						this.typeSelectors.push(selector = new TypeSelector(this, TOKEN.literal));
					}
					this.push(selector);
				}
				this.not = '';
				return this;
			case ',':
			case '*':
			case '+':
			case '>':
			case '~':
			case '|':
			case '!':
			case '$':
			case '/':
			case TOKEN.hash:
			case TOKEN.percentage:// not style rule
				this.push(TOKEN.literal);
				this.not = '';
				return this;
			case '[':
				const squareBracketBlock = new SquareBracketBlock(this);
				this.push(squareBracketBlock);
				this.not = '';
				return squareBracketBlock;
			case TOKEN.function$:
				if ( this.not!==':' ) { return; }
				const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
				this.push(parenthesisBlock);
				this.func = parenthesisBlock;
				this.not = '';
				return parenthesisBlock;
			case '{':
				const lastIndex = this.length-1;
				const lastItem = this[lastIndex];
				if ( lastItem===' ' || lastItem==='/**/' ) { this.length = lastIndex; }
				return this.block;
			case TOKEN.comment:
				this.push('/**/');
				return this;
		}
	}
	
	get selectorText () :string {
		let selectorText = '';
		for ( let index = this.length; index; ) {
			const child = this[--index];
			selectorText = ( typeof child==='string' ? child : child.cssText )+selectorText;
		}
		return selectorText;
	}
	
	get cssText () :string {
		const { block } = this;
		let blockText = '';
		for ( let index = block.length; index; ) {
			blockText = block[--index].cssText+blockText;
		}
		return blockText && `${this.selectorText}{${blockText.slice(0, -1)}}`;
	}
	
	* beautify (this :QualifiedRule, tab? :string) :IterableIterator<string> {
		const { block } = this;
		let blockText = '';
		for ( let index = block.length; index; ) {
			blockText = block[--index].cssText+' '+blockText;
		}
		if ( blockText ) {
			yield `${this.selectorText} { ${blockText}}`;
		}
	}
	
};

freeze(QualifiedRule.prototype);

type Sheet = import('./').default;
type DeclarationList = import('./AtRule').DeclarationList;
type KeyframesRule = import('./KeyframesRule').default;