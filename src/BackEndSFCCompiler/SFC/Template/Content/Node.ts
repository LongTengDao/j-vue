import NodeList from '.Array';
import freeze from '.Object.freeze';
import defineProperty from '.Object.defineProperty';
import Null from '.null';

const VOID :TypedPropertyDescriptor<0> = Null({ value: 0, writable: false, enumerable: false, configurable: false });

export default abstract class Node extends NodeList<Element | Text> {
	
	protected get [Symbol.toStringTag] () { return 'SFC.Template.Content.Node'; }
	
	readonly parentNode :Node | null = null;
	
	protected void () { defineProperty(this, 'length', VOID); }
	
	//get childNodes () :NodeList<Element | Text> { return this; }
	get firstChild () :Node | null { return this.length ? this[0] : null; }
	get lastChild () :Node | null { return this.length ? this[this.length-1] : null; }
	
	appendChild<Node extends Element | Text> (this :Content | Element, node :Node) :Node {
		if ( node.parentNode ) { node.parentNode.splice(node.parentNode.indexOf(node), 1); }
		( node as any ).parentNode = this;
		this.push(node);
		return node;
	}
	
};

freeze(Node.prototype);

type Content = import('./').default;
type Element = import('./Element').default;
type Text = import('./Text').default;