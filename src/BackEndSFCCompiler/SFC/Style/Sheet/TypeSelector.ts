import freeze from '.Object.freeze';

export default class TypeSelector {
	
	readonly parent :QualifiedRule | ParenthesisBlock;
	cssText :string;
	
	constructor (parent :QualifiedRule | ParenthesisBlock, literal :string) {
		this.parent = parent;
		this.cssText = literal;
	}
	
};

freeze(TypeSelector.prototype);

type QualifiedRule = import('./QualifiedRule').default;
type ParenthesisBlock = import('./ParenthesisBlock').default;