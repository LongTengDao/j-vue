import freeze from '.Object.freeze';

export default abstract class Node {
	
	protected constructor () { return this; }
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.*.Node'; }
	
	readonly firstChild :Element | Text | null = null;
	readonly nextSibling :Element | Text | null = null;
	afterInsert (this :Content | Element, refChild :Element | Text | null, newChild :Element | Text) {
		return refChild
			? ( refChild as any ).nextSibling = newChild
			: ( this as any ).firstChild = newChild;
	}
	
	abstract [Symbol.toPrimitive] (this :Content | Element | Text) :string;
	abstract beautify (tab? :string) :Generator<string, void, undefined>;
	
};

freeze(freeze(Node).prototype);

import type Element from './Element';
import type Text from './Text';
import type Content from './';