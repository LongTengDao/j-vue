import Splice from '.void.splice';
import freeze from '.Object.freeze';

import * as TOKEN from './TOKEN';
import SquareBracketBlock from './SquareBracketBlock';

export default class ParenthesisBlock extends Splice<ParenthesisBlock | SquareBracketBlock | TypeSelector | ClassSelector | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.ParenthesisBlock'; }
	
	readonly parent :ImportRule | AtRule | QualifiedRule | Declaration | ParenthesisBlock;
	private readonly name :string;
	
	constructor (parent :ImportRule | AtRule | QualifiedRule | Declaration | ParenthesisBlock, name :string) {
		super();
		this.parent = parent;
		this.name = name;
		return this;
	}
	
	appendToken (this :ParenthesisBlock) :ImportRule | AtRule | QualifiedRule | Declaration | ParenthesisBlock | SquareBracketBlock | null {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
				this.length && ( this[this.length] = ' ' );
				return this;
			case TOKEN.function$:
			case '(':
				const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
				this[this.length] = parenthesisBlock;
				return parenthesisBlock;
			case '[':
				const squareBracketBlock = new SquareBracketBlock(this);
				this[this.length] = squareBracketBlock;
				return squareBracketBlock;
			case ')':
				const lastItem = this[this.length-1];
				( lastItem===' ' || lastItem==='/**/' ) && --this.length;
				return this.parent;
			case TOKEN.comment:
				this.length && ( this[this.length] = '/**/' );
				return this;
			case ']':
			case '{':
			case '}':
			case '`':
			case '^':
			case '@':
			case '<':
			case '=':
			case ';':
			case '&':
			case '%':
			case TOKEN.at_keyword:
				return null;
			/*
			case TOKEN.ident:
			case TOKEN.hash:
			case TOKEN.string:
			case TOKEN.number:
			case TOKEN.dimension:
			case TOKEN.percentage:
			case TOKEN.url:
			case '!':
			case '$':
			case '*':
			case '+':
			case ',':
			case '-':
			case '.':
			case '/':
			case ':':
			case '>':
			case '?':
			case '|':
			case '~':
			*/
		}
		this[this.length] = TOKEN.literal;
		return this;
	}
	
	get cssText () :string {
		let cssText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index]!;
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		return `${this.name}(${cssText})`;
	}
	
};

freeze(ParenthesisBlock.prototype);

import type ImportRule from './ImportRule';
import type AtRule from './AtRule';
import type QualifiedRule from './QualifiedRule';
import type Declaration from './Declaration';
import type { TypeSelector } from './Selector';
import type { ClassSelector } from './Selector';