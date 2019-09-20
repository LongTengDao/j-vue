import Array from '.Array';
import freeze from '.Object.freeze';

import * as TOKEN from './TOKEN';
import SquareBracketBlock from './SquareBracketBlock';

export default class ParenthesisBlock extends Array<ParenthesisBlock | SquareBracketBlock | TypeSelector | ClassSelector | string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.ParenthesisBlock'; }
	
	readonly parent :AtRule | ImportRule | QualifiedRule | Declaration | ParenthesisBlock;
	readonly name :string;
	
	constructor (parent :AtRule | ImportRule | QualifiedRule | Declaration | ParenthesisBlock, name :string) {
		super();
		this.parent = parent;
		this.name = name;
	}
	
	appendToken (this :ParenthesisBlock) :AtRule | ImportRule | QualifiedRule | Declaration | ParenthesisBlock | SquareBracketBlock | void {
		switch ( TOKEN.type ) {
			case TOKEN.whitespace:
				this.push(' ');
				return this;
			case TOKEN.function$:
			case '(':
				const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
				this.push(parenthesisBlock);
				return parenthesisBlock;
			case '[':
				const squareBracketBlock = new SquareBracketBlock(this);
				this.push(squareBracketBlock);
				return squareBracketBlock;
			case ')':
				return this.parent;
			case TOKEN.comment:
				this.push('/**/');
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
				return;
		}
		this.push(TOKEN.literal);
		return this;
	}
	
	get cssText () :string {
		let cssText = '';
		for ( let index = this.length; index; ) {
			const child = this[--index];
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		return `${this.name}(${cssText})`;
	}
	
};

freeze(ParenthesisBlock.prototype);

type AtRule = import('./AtRule').default;
type ImportRule = import('./ImportRule').default;
type QualifiedRule = import('./QualifiedRule').default;
type Declaration = import('./Declaration').default;
type TypeSelector = import('./Selector').TypeSelector;
type ClassSelector = import('./Selector').ClassSelector;