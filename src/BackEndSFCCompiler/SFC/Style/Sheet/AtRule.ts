import Array from '.Array';
import freeze from '.Object.freeze';

import * as is from './is';
import * as TOKEN from './TOKEN';
import SquareBracketBlock from './SquareBracketBlock';
import ParenthesisBlock from './ParenthesisBlock';
import Declaration from './Declaration';
import QualifiedRule from './QualifiedRule';

class Multi extends Array {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule.Multi'; }
	
	readonly parent :DeclarationList;
	declaration :Declaration;
	styleRule :QualifiedRule;
	d :any;
	sr :any;
	
	constructor (parent :DeclarationList) {
		super();
		this.parent = parent;
		this.d = this.declaration = new Declaration(parent, TOKEN.literal);
		this.sr = ( this.styleRule = new QualifiedRule(parent) ).appendToken();// may not style rule
	}
	
	appendToken (this :Multi) {
		const d = this.d.appendToken();
		const sr = this.sr.appendToken();
		if ( d && sr ) {
			this.d = d;
			this.sr = sr;
			return this;
		}
		if ( d ) {
			this.parent.push(this.declaration);
			return d;
		}
		if ( sr ) {
			this.parent.push(this.styleRule);
			return sr;
		}
	}
	
}

freeze(Multi.prototype);

export class DeclarationList extends Array<AtRule | QualifiedRule | Declaration> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule.DeclarationList'; }
	
	readonly parent :AtRule;
	private readonly noAt :boolean = false;
	private readonly noQualified :boolean = false;
	private readonly noDeclaration :boolean = false;
	
	constructor (parent :AtRule) {
		super();
		this.parent = parent;
		const parent_parent = parent.parent;
		if ( parent_parent instanceof DeclarationList && is.page(parent_parent.parent.name) ) {
			this.noAt = true;
			this.noQualified = true;
			return;
		}
		const { name } = parent;
		if ( is.media(name) ) { this.noDeclaration = true; }
		else if ( is.keyframes(name) ) {
			this.noAt = true;
			this.noDeclaration = true;
		}
		else if ( is.font_face(name) ) {
			this.noAt = true;
			this.noQualified = true;
		}
		else if ( is.page(name) ) { this.noQualified = true; }
		else if ( is.supports(name) || is.document(name) ) { this.noDeclaration = true; }
	}
	
	appendToken (this :DeclarationList) :Sheet | DeclarationList | AtRule | QualifiedRule | SquareBracketBlock | Declaration | Multi | void {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
			case TOKEN.comment:
				return this;
			case TOKEN.at_keyword:
				if ( this.noAt ) { return; }
				const atRule = new AtRule(this, TOKEN.literal.slice(1));
				this.push(atRule);
				return atRule;
			case TOKEN.ident:
				if ( this.noDeclaration ) {
					if ( this.noQualified ) { return; }
					const styleRule = new QualifiedRule(this);// may not style rule
					this.push(styleRule);
					return styleRule.appendToken() as QualifiedRule;
				}
				if ( this.noQualified ) {
					const declaration = new Declaration(this, TOKEN.literal);
					this.push(declaration);
					return declaration;
				}
				return new Multi(this);
			case '*':
			case '.':
			case ':':
			case '[':
			case '|':
			case '$':
			case TOKEN.hash:
			case TOKEN.percentage:// not style rule
				if ( this.noQualified ) { return; }
				const styleRule = new QualifiedRule(this);
				this.push(styleRule);
				return styleRule.appendToken() as QualifiedRule | SquareBracketBlock;
			case '}':
				return this.parent.parent;
		}
	}
	
}

freeze(DeclarationList.prototype);

export default class AtRule extends Array<ParenthesisBlock | SquareBracketBlock | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule'; }
	
	readonly parent :Sheet | DeclarationList;
	readonly name :string;
	block? :DeclarationList;
	semicolon :boolean = false;
	
	constructor (parent :Sheet | DeclarationList, name :string) {
		super();
		this.parent = parent;
		this.name = name;
	}
	
	appendToken (this :AtRule) :Sheet | AtRule | DeclarationList | ParenthesisBlock | SquareBracketBlock | void {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
				this.push(' ');
				return this;
			case TOKEN.function$:
			case '(':
				const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
				this.push(parenthesisBlock);
				return parenthesisBlock;
			case TOKEN.ident:
			case TOKEN.hash:
			case TOKEN.string:
			case TOKEN.url:
			case ':':
				this.push(TOKEN.literal);
				return this;
			case '{': {
				const { name } = this;
				if ( is.charset(name) || is._import(name) || is.namespace(name) ) { return; }
				return this.block = new DeclarationList(this);
			}
			case ';': {
				const { name } = this;
				if ( is.media(name) || is.page(name) || is.font_face(name) || is.keyframes(name) || is.supports(name) || is.document(name) ) { return; }
				this.semicolon = true;
				return this.parent;
			}
			case '}':
				const { name } = this;
				if ( is.media(name) || is.page(name) || is.font_face(name) || is.keyframes(name) || is.supports(name) || is.document(name) ) { return; }
				return this.parent.appendToken() as Sheet | DeclarationList;
			case TOKEN.comment:
				this.push('/**/');
				return this;
		}
	}
	
	get cssText () :string {
		let atText = '';
		for ( let index = this.length; index; ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		const { block } = this;
		if ( block ) {
			let blockText = '';
			for ( let index = block.length; index; ) {
				blockText = block[--index].cssText+blockText;
			}
			return `@${this.name}${atText}{${blockText}}`;
		}
		else {
			return `@${this.name}${atText};`;
		}
	}
	
	* beautify (this :AtRule, tab :string = '\t') :IterableIterator<string> {
		let atText = '';
		for ( let index = this.length; index; ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		const { block } = this;
		if ( block ) {
			yield `@${this.name}${atText}{`;
			for ( let index = 0, { length } = block; index<length; ++index ) {
				for ( const line of block[index].beautify(tab) ) {
					yield tab+line;
				}
			}
			yield `}`;
		}
		else {
			yield `@${this.name}${atText};`;
		}
	}
	
};

freeze(AtRule.prototype);

type Sheet = import('./').default;