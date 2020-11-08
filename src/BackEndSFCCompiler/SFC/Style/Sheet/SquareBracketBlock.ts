import Array from '.Array';
import freeze from '.Object.freeze';

import * as TOKEN from './TOKEN';

export default class SquareBracketBlock extends Array<string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.SquareBracketBlock'; }
	
	readonly parent :QualifiedRule | ParenthesisBlock;
	
	constructor (parent :QualifiedRule | ParenthesisBlock) {
		super();
		this.parent = parent;
		return this;
	}
	
	appendToken (this :SquareBracketBlock) :SquareBracketBlock | ParenthesisBlock | QualifiedRule | null {
		switch ( TOKEN.type ) {
			case ']':
				const lastItem = this[this.length-1];
				( lastItem===' ' || lastItem==='/**/' ) && --this.length;
				return this.parent;
			case TOKEN.whitespace:
				this.length && ( this[this.length] = ' ' );
				return this;
			case TOKEN.ident:
			case '~':
			case '|':
			case '^':
			case '$':
			case '*':
			case '=':
			case TOKEN.string:
				this[this.length] = TOKEN.literal;
				return this;
			case TOKEN.comment:
				this.length && ( this[this.length] = '/**/' );
				return this;
		}
		return null;
	}
	
	get cssText () :string { return `[${this.join('')}]`; }
	
};

freeze(SquareBracketBlock.prototype);

import type QualifiedRule from './QualifiedRule';
import type ParenthesisBlock from './ParenthesisBlock';