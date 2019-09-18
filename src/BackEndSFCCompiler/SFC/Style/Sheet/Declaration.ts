import Array from '.Array';
import freeze from '.Object.freeze';

import * as TOKEN from './TOKEN';
import ParenthesisBlock from './ParenthesisBlock';

export default class Declaration extends Array<ParenthesisBlock | string> {// property or descriptor
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.Declaration'; }
	
	readonly parent :DeclarationList | Declarations;
	readonly name :string;
	colon :boolean = false;
	semicolon :boolean = false;
	
	constructor (parent :DeclarationList | Declarations, name :string) {
		super();
		this.parent = parent;
		this.name = name;
	}
	
	appendToken (this :Declaration) :Sheet | DeclarationList | QualifiedRule | Declarations | Declaration | ParenthesisBlock | void {
		if ( this.colon ) {
			switch ( TOKEN.type ) {
				case ';':
					this.semicolon = true;
					return this.parent;
				case TOKEN.function$:
					const parenthesisBlock = new ParenthesisBlock(this, TOKEN.literal.slice(0, -1));
					this.push(parenthesisBlock);
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
				case TOKEN.comment:
				case TOKEN.whitespace:
				case TOKEN.ident:
				case TOKEN.hash:
				case TOKEN.string:
				case TOKEN.number:
				case TOKEN.dimension:
				case TOKEN.percentage:
				case TOKEN.url:
					this.push(TOKEN.literal);
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
	}
	
	get cssText () :string {
		let cssText = '';
		for ( let index = this.length; index; ) {
			const child = this[--index];
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		return `${this.name}:${cssText};`;
	}
	
	* beautify () :IterableIterator<string> {
		let cssText = '';
		for ( let index = this.length; index; ) {
			const child = this[--index];
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		return `${this.name}:${cssText.startsWith(' ') ? '' : ' '}${cssText};`;
	}
	
};

freeze(Declaration.prototype);

type Sheet = import('./').default;
type DeclarationList = import('./AtRule').DeclarationList;
type QualifiedRule = import('./QualifiedRule').Declarations;
type Declarations = import('./QualifiedRule').Declarations;