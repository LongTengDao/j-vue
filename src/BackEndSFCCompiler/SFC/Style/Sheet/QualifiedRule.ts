import Array from '.Array';
import undefined from '.undefined';
import freeze from '.Object.freeze';

import * as TOKEN from './TOKEN';
import TypeSelector from './TypeSelector';
import SquareBracketBlock from './SquareBracketBlock';
import ParenthesisBlock from './ParenthesisBlock';
import Declaration from './Declaration';

export class Declarations extends Array<Declaration> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.QualifiedRule.Declarations'; }
	
	readonly parent :QualifiedRule;
	
	constructor (parent :QualifiedRule) {
		super();
		this.parent = parent;
	}
	
	appendToken (this :Declarations) :Sheet | DeclarationList | Declarations | Declaration | void {
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

function replaceTypeSelector (func :ParenthesisBlock, typeSelectors :TypeSelector[]) {
	const { length } = func;
	let index = 0;
	let is = true;
	while ( index<length ) {
		const item = func[index];
		if ( item===':' || item==='.' ) { is = false; }
		else {
			if ( item instanceof ParenthesisBlock ) { replaceTypeSelector(item, typeSelectors); }
			else if ( is && typeof item==='string' && / /.test(item) ) { typeSelectors.push(func[index] = new TypeSelector(func, item)); }
			is = true;
		}
		++index;
	}
}

export default class QualifiedRule extends Array<ParenthesisBlock | SquareBracketBlock | TypeSelector | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.QualifiedRule'; }
	
	readonly parent :Sheet | DeclarationList;
	readonly block :Declarations;
	private not :':' | '.' | '' = '';
	private func? :ParenthesisBlock;
	readonly typeSelectors :TypeSelector[] = [];
	
	constructor (parent :Sheet | DeclarationList) {
		super();
		this.parent = parent;
		this.block = new Declarations(this);
	}
	
	appendToken (this :QualifiedRule) :QualifiedRule | Declarations | ParenthesisBlock | SquareBracketBlock | void {
		const { func } = this;
		if ( func ) {
			replaceTypeSelector(func, this.typeSelectors);
			this.func = undefined;
		}
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
				this.push(' ');
				this.not = '';
				return this;
			case '.':
			case ':':
				this.push(TOKEN.literal);
				this.not = TOKEN.type;
				return this;
			case TOKEN.ident:
				if ( this.not ) {
					this.push(TOKEN.literal);
					this.not = '';
				}
				else {
					const typeSelector = new TypeSelector(this, TOKEN.literal);
					this.typeSelectors.push(typeSelector);
					this.push(typeSelector);
				}
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
		return `${this.selectorText}{${blockText}}`;
	}
	
	* beautify (this :QualifiedRule) :IterableIterator<string> {
		const { block } = this;
		const { length } = block;
		if ( length ) {
			const blockTexts = [];
			for ( let index = 0; index<length; ++index ) {
				blockTexts.push(block[index].cssText);
			}
			const blockText = blockTexts.join(' ');
			const { selectorText } = this;
			yield `${selectorText}${selectorText.endsWith(' ') ? '' : ' '}{${blockText.startsWith(' ') ? '' : ' '}${blockText}${blockText.endsWith(' ') ? '' : ' '}}`;
		}
	}
	
};

freeze(QualifiedRule.prototype);

type Sheet = import('./').default;
type DeclarationList = import('./AtRule').DeclarationList;