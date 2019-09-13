import NodeList from '.Array';
import freeze from '.Object.freeze';

const _parentNode :unique symbol = Symbol('#parentNode');

const childNodes = /*#__PURE__*/freeze([]) as [];

export default abstract class Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Node'; }
	
	[_parentNode]? :Node;
	get parentNode () :Node | null { return this[_parentNode] || null; }
	
	readonly childNodes :NodeList<Element | Text>;
	
	constructor (voidElement? :boolean) {
		this.childNodes = voidElement ? childNodes : new NodeList;
	}
	
	get firstChild () :Node | null {
		return this.childNodes.length ? this.childNodes[0] : null;
	}
	
	get lastChild () :Node | null {
		return this.childNodes.length ? this.childNodes[this.childNodes.length-1] : null;
	}
	
	appendChild<Node extends Element | Text> (this :Content | Element, node :Node) :Node {
		if ( node[_parentNode] ) { node[_parentNode]!.childNodes.splice(node[_parentNode]!.childNodes.indexOf(node), 1); }
		node[_parentNode] = this;
		this.childNodes.push(node);
		return node;
	}
	
};

freeze(Node.prototype);

type Content = import('./Template.Content').default;
type Element = import('./Template.Content.Element').default;
type Text = import('./Template.Content.Text').default;