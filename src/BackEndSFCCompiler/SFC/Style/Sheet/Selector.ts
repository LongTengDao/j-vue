import freeze from '.Object.freeze';

export class TypeSelector {
	
	readonly parent :QualifiedRule | ParenthesisBlock;
	cssText :string;
	
	constructor (parent :QualifiedRule | ParenthesisBlock, literal :string) {
		this.parent = parent;
		this.cssText = literal;
	}
	
}

freeze(TypeSelector.prototype);

export class ClassSelector {
	
	readonly parent :QualifiedRule | ParenthesisBlock;
	readonly literal :string;
	
	constructor (parent :QualifiedRule | ParenthesisBlock, literal :string) {
		this.parent = parent;
		this.literal = literal;
	}
	
	get cssText () { return `.${this.literal}`; }
	
}

freeze(ClassSelector.prototype);

type QualifiedRule = import('./QualifiedRule').default;
type ParenthesisBlock = import('./ParenthesisBlock').default;