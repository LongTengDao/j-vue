import NodeList from '.Array';
import freeze from '.Object.freeze';

const _parentNode = Symbol('#parentNode');

export default class Node {
	
	[_parentNode]? :Node;
	get parentNode () :Node | null { return this[_parentNode] || null; }
	
	readonly childNodes :NodeList<Element | Text> = new NodeList;
	
	get firstChild () :Node | null {
		return this.childNodes.length ? this.childNodes[0] : null;
	}
	
	get lastChild () :Node | null {
		return this.childNodes.length ? this.childNodes[this.childNodes.length-1] : null;
	}
	
	appendChild<T extends Element | Text> (node :T) :T {
		if ( node[_parentNode] ) { node[_parentNode]!.childNodes.splice(node[_parentNode]!.childNodes.indexOf(node), 1); }
		node[_parentNode] = this;
		this.childNodes.push(node);
		return node;
	}
	
};

freeze(Node.prototype);

import Element from './Template.Content.Element';
import Text from './Template.Content.Text';