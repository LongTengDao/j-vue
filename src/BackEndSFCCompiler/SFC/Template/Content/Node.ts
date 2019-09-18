import NodeList from '.Array';
import freeze from '.Object.freeze';
import defineProperty from '.Object.defineProperty';
import Null from '.null';

const _parentNode :unique symbol = Symbol('#parentNode');

const VOID :TypedPropertyDescriptor<0> = Null({ value: 0, writable: false, enumerable: false, configurable: false });

export default abstract class Node extends NodeList<Element | Text> {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Node'; }
	
	[_parentNode]? :Node;
	get parentNode () :Node | null { return this[_parentNode] || null; }
	
	void () { defineProperty(this, 'length', VOID); }
	
	get childNodes () :NodeList<Element | Text> { return this; }
	get firstChild () :Node | null { return this.length ? this[0] : null; }
	get lastChild () :Node | null { return this.length ? this[this.length-1] : null; }
	
	appendChild<Node extends Element | Text> (this :Content | Element, node :Node) :Node {
		if ( node[_parentNode] ) { node[_parentNode]!.splice(node[_parentNode]!.indexOf(node), 1); }
		node[_parentNode] = this;
		this.push(node);
		return node;
	}
	
};

freeze(Node.prototype);

type Content = import('./').default;
type Element = import('./Element').default;
type Text = import('./Text').default;