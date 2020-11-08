import Array from '.Array';
import freeze from '.Object.freeze';

import * as is from './is';
import * as TOKEN from './TOKEN';
import SquareBracketBlock from './SquareBracketBlock';
import ParenthesisBlock from './ParenthesisBlock';
import Declaration from './Declaration';
import QualifiedRule from './QualifiedRule';
import KeyframesRule from './KeyframesRule';

class Multi extends Array {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule.Multi'; }
	
	readonly parent :DeclarationList;
	private readonly declaration :Declaration;
	private readonly styleRule :QualifiedRule;
	#d :any;
	#sr :any;
	
	constructor (parent :DeclarationList) {
		super();
		this.parent = parent;
		this.#d = this.declaration = new Declaration(parent, TOKEN.literal);
		this.#sr = ( this.styleRule = new QualifiedRule(parent) ).appendToken();// may not style rule
		return this;
	}
	
	appendToken (this :Multi) {
		const d = this.#d.appendToken();
		const sr = this.#sr.appendToken();
		if ( d && sr ) {
			this.#d = d;
			this.#sr = sr;
			return this;
		}
		if ( d ) {
			this.parent[this.parent.length] = this.declaration;
			return d;
		}
		if ( sr ) {
			this.parent[this.parent.length] = this.styleRule;
			return sr;
		}
		return null;
	}
	
}

freeze(Multi.prototype);

export class DeclarationList extends Array<AtRule | KeyframesRule | QualifiedRule | Declaration> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule.DeclarationList'; }
	
	readonly parent :AtRule;
	readonly #noAt :boolean = false;
	readonly #noQualified :boolean = false;
	readonly #noDeclaration :boolean = false;
	
	constructor (parent :AtRule) {
		super();
		this.parent = parent;
		const parent_parent = parent.parent;
		if ( parent_parent instanceof DeclarationList && is.page(parent_parent.parent.name) ) {
			this.#noAt = true;
			this.#noQualified = true;
			return;
		}
		const { name } = parent;
		if ( is.media(name) ) { this.#noDeclaration = true; }
		//else if ( is.keyframes(name) ) {
		//	this.#noAt = true;
		//	this.#noDeclaration = true;
		//}
		else if ( is.font_face(name) ) {
			this.#noAt = true;
			this.#noQualified = true;
		}
		else if ( is.page(name) ) { this.#noQualified = true; }
		else if ( is.supports(name) || is.document(name) ) { this.#noDeclaration = true; }
		return this;
	}
	
	appendToken (this :DeclarationList) :Sheet | DeclarationList | AtRule | KeyframesRule | QualifiedRule | SquareBracketBlock | Declaration | Multi | null {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.at_keyword:
				if ( this.#noAt ) { break; }
				const name = TOKEN.literal.slice(1);
				if ( is.charset(name) || is.import(name) || is.namespace(name) ) { break; }
				const atRule = is.keyframes(name) ? new KeyframesRule(this, name) : new AtRule(this, name);
				this[this.length] = atRule;
				return atRule;
			case TOKEN.ident:
				if ( this.#noDeclaration ) {
					if ( this.#noQualified ) { break; }
					const styleRule = new QualifiedRule(this);// may not style rule
					this[this.length] = styleRule;
					return styleRule.appendToken() as QualifiedRule;
				}
				if ( this.#noQualified ) {
					const declaration = new Declaration(this, TOKEN.literal);
					this[this.length] = declaration;
					return declaration;
				}
				return new Multi(this);
			case '*':
			case '.':
			case ':':
			case '[':
			///case '|':
			case '$':
			case TOKEN.hash:
			///case TOKEN.percentage:// not style rule
				if ( this.#noQualified ) { break; }
				const styleRule = new QualifiedRule(this);
				this[this.length] = styleRule;
				return styleRule.appendToken() as QualifiedRule | SquareBracketBlock;
			case '}':
				return this.parent.parent;
		}
		return null;
	}
	
}

freeze(DeclarationList.prototype);

export default class AtRule extends Array<ParenthesisBlock | SquareBracketBlock | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule'; }
	
	readonly parent :Sheet | DeclarationList;
	readonly name :string;
	block :DeclarationList | null = null;
	///private semicolon :boolean = false;
	
	constructor (parent :Sheet | DeclarationList, name :string) {
		super();
		this.parent = parent;
		this.name = name;
		return this;
	}
	
	appendToken (this :AtRule) :Sheet | AtRule | DeclarationList | ParenthesisBlock | SquareBracketBlock | null {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
				this.length && ( this[this.length] = ' ' );
				return this;
			case TOKEN.function$:
			case '(': {
				const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
				this[this.length] = parenthesisBlock;
				return parenthesisBlock;
			}
			case TOKEN.ident:
			case TOKEN.string:
			case TOKEN.url:
			case ':':
			case ',':
				this[this.length] = TOKEN.literal;
				return this;
			case '{': {
				if ( /*is.charset(this.name) || is.import(this.name) || */is.namespace(this.name) ) { break; }
				const lastIndex = this.length-1;
				if ( lastIndex>=0 ) {
					const lastItem = this[lastIndex];
					if ( lastItem===' ' || lastItem==='/**/' ) { this.length = lastIndex; }
				}
				return this.block = new DeclarationList(this);
			}
			case ';': {
				const { name } = this;
				if ( is.media(name) || is.page(name) || is.font_face(name) || /*is.keyframes(name) || */is.supports(name) || is.document(name) ) { break; }
				///this.semicolon = true;
				return this.parent;
			}
			case '}': {
				const { name } = this;
				if ( is.media(name) || is.page(name) || is.font_face(name) || /*is.keyframes(name) || */is.supports(name) || is.document(name) ) { break; }
				return this.parent.appendToken() as Sheet | DeclarationList;
			}
			case TOKEN.comment:
				this.length && ( this[this.length] = '/**/' );
				return this;
		}
		return null;
	}
	
	get cssText () :string {
		let atText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		const { block } = this;
		if ( block ) {
			let blockText = '';
			let index = block.length;
			while ( index ) { blockText = block[--index].cssText+blockText; }
			return `@${this.name}${atText ? ' ' : ''}${atText}{${blockText && blockText[blockText.length - 1]===';' ? blockText.slice(0, -1) : blockText}}`;
		}
		else {
			return `@${this.name}${atText ? ' ' : ''}${atText};`;
		}
	}
	
	* beautify (this :AtRule, tab :string = '\t') :Generator<string, void, undefined> {
		let atText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		const { block } = this;
		if ( block ) {
			yield `@${this.name}${atText ? ' ' : ''}${atText} {`;
			let index = 0;
			const { length } = block;
			while ( index!==length ) {
				for ( const line of block[index++].beautify(tab) ) {
					yield tab+line;
				}
			}
			yield `}`;
		}
		else {
			yield `@${this.name}${atText ? ' ' : ''}${atText};`;
		}
	}
	
};

freeze(AtRule.prototype);

import type Sheet from './';