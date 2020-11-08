import Array from '.Array';
import freeze from '.Object.freeze';

import * as TOKEN from './TOKEN';
import ParenthesisBlock from './ParenthesisBlock';

export default class Declaration extends Array<ParenthesisBlock | string> {// property or descriptor
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.Declaration'; }
	
	readonly parent :DeclarationList | Declarations;
	readonly name :string;
	private colon :boolean = false;
	///private semicolon :boolean = false;
	
	constructor (parent :DeclarationList | Declarations, name :string) {
		super();
		this.parent = parent;
		this.name = name;
		return this;
	}
	
	appendToken (this :Declaration) :Sheet | DeclarationList | QualifiedRule | Declarations | Declaration | ParenthesisBlock | null {
		if ( this.colon ) {
			switch ( TOKEN.type ) {
				case ';':
					///this.semicolon = true;
					return this.parent;
				case TOKEN.function$:
					const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
					this[this.length] = parenthesisBlock;
					return parenthesisBlock;
				case '}':
					return this.parent.appendToken() as Sheet | DeclarationList;
				case '?':
				case '/':
				case '-':
				case '+':
				case ',':
				case '*':
				case '!':
				case TOKEN.ident:
				case TOKEN.hash:
				case TOKEN.string:
				case TOKEN.number:
				case TOKEN.dimension:
				case TOKEN.percentage:
				case TOKEN.url:
					this[this.length] = TOKEN.literal;
					return this;
				case TOKEN.whitespace:
					this.length && ( this[this.length] = ' ' );
					return this;
				case TOKEN.comment:
					this.length && ( this[this.length] = '/**/' );
					return this;
			}
		}
		else {
			if ( TOKEN.type===':' ) {
				this.colon = true;
				return this;
			}
			if ( TOKEN.type===TOKEN.whitespace || TOKEN.type===TOKEN.comment ) { return this; }
		}
		return null;
	}
	
	get cssText () :string {
		let cssText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		return `${this.name}:${cssText};`;
	}
	
	beautify (this :Declaration, tab? :string) :Generator<string, void, undefined>;
	* beautify (this :Declaration) :Generator<string, void, undefined> {
		let cssText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		yield `${this.name}:${cssText[0]===' ' ? '' : ' '}${cssText};`;
	}
	
};

freeze(Declaration.prototype);

import type Sheet from './';
import type { DeclarationList } from './AtRule';
import type { default as QualifiedRule, Declarations } from './QualifiedRule';