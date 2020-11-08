import Array from '.Array';
import freeze from '.Object.freeze';

import * as TOKEN from './TOKEN';
import ParenthesisBlock from './ParenthesisBlock';

export default class ImportRule extends Array<ParenthesisBlock | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.ImportRule'; }
	
	readonly parent :Sheet;
	readonly name :string = 'import';
	get block () { return false as const; }
	///private semicolon :boolean = false;
	
	constructor (parent :Sheet) {
		super();
		this.parent = parent;
		return this;
	}
	
	appendToken (this :ImportRule) :Sheet | ImportRule | ParenthesisBlock | null {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
				this.length && ( this[this.length] = ' ' );
				return this;
			case TOKEN.function$:
			case '(':
				const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
				this[this.length] = parenthesisBlock;
				return parenthesisBlock;
			case TOKEN.ident:
			case TOKEN.string:
			case TOKEN.url:
			case ':':
			case ',':
				this[this.length] = TOKEN.literal;
				return this;
			case ';': {
				///this.semicolon = true;
				return this.parent;
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
		return `@import ${atText};`;
	}
	
	beautify (this :ImportRule, tab? :string) :Generator<string, void, undefined>;
	* beautify (this :ImportRule) :Generator<string, void, undefined> {
		let atText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		yield `@import ${atText};`;
	}
	
};

freeze(ImportRule.prototype);

import type Sheet from './';