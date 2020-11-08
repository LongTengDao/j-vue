import freeze from '.Object.freeze';

export class TypeSelector {
	
	readonly parent :QualifiedRule | ParenthesisBlock;
	cssText :string;
	readonly ns_ :boolean;
	
	constructor (parent :QualifiedRule | ParenthesisBlock, literal :string, ns_ :boolean) {
		this.parent = parent;
		this.cssText = literal;
		this.ns_ = ns_;
		return this;
	}
	
}

freeze(TypeSelector.prototype);

export class ClassSelector {
	
	readonly parent :QualifiedRule | ParenthesisBlock;
	readonly literal :string;
	
	constructor (parent :QualifiedRule | ParenthesisBlock, literal :string) {
		this.parent = parent;
		this.literal = literal;
		return this;
	}
	
	get cssText () { return `.${this.literal}`; }
	
}

freeze(ClassSelector.prototype);

import type QualifiedRule from './QualifiedRule';
import type ParenthesisBlock from './ParenthesisBlock';