import NodeList from '.void.splice';
import freeze from '.Object.freeze';
import defineProperty from '.Object.defineProperty';
import Null from '.null';

const VOID :TypedPropertyDescriptor<0> = Null({ value: 0, writable: false, enumerable: false, configurable: false });

export default abstract class Node extends NodeList<Node> {
	
	protected constructor () { return super() as unknown as this; }
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Node'; }
	
	parentNode :Node | null = null;
	
	protected void () { defineProperty(this, 'length', VOID); }
	
	//get childNodes () :NodeList<Element | Text> { return this; }
	get firstChild () :Node | null { return this.length ? this[0]! : null; }
	get lastChild () :Node | null { return this.length ? this[this.length-1]! : null; }
	
	appendChild<T extends Node> (this :Node, node :T) :T {
		node.parentNode?.splice(node.parentNode.indexOf(node), 1);
		node.parentNode = this;
		this[this.length] = node;
		return node;
	}
	
	abstract get outerHTML () :string;
	abstract beautify (this :Node, tab? :string) :Generator<string, void, undefined>;
	
};

freeze(Node.prototype);
