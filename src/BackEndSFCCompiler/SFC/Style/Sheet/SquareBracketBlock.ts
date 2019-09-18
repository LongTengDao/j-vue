import Array from '.Array';
import freeze from '.Object.freeze';

import * as TOKEN from './TOKEN';

export default class SquareBracketBlock extends Array<string> {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.SquareBracketBlock'; }
	
	readonly parent :QualifiedRule | ParenthesisBlock;
	
	constructor (parent :QualifiedRule | ParenthesisBlock) {
		super();
		this.parent = parent;
	}
	
	appendToken (this :SquareBracketBlock) :SquareBracketBlock | ParenthesisBlock | QualifiedRule | void {
		switch ( TOKEN.type ) {
			case ']':
				const { length } = this;
				if ( length ) {
					const last = this[length-1];
					if ( last===' ' || last==='/**/' ) { this.length = length-1; }
				}
				return this.parent;
			case TOKEN.whitespace:
				this.length && this.push(' ');
				return this;
			case TOKEN.ident:
			case '~':
			case '|':
			case '^':
			case '$':
			case '*':
			case '=':
			case TOKEN.string:
				this.push(TOKEN.literal);
				return this;
			case TOKEN.comment:
				this.length && this.push('/**/');
				return this;
		}
	}
	
	get cssText () :string { return `[${this.join('')}]`; }
	
};

freeze(SquareBracketBlock.prototype);

type QualifiedRule = import('./QualifiedRule').default;
type ParenthesisBlock = import('./ParenthesisBlock').default;