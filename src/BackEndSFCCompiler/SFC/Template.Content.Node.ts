import NodeList from '.Array';
import freeze from '.Object.freeze';

export default class Node {
	
	parentNode :Node | null = null;
	
	childNodes :NodeList<Element | Text> = new NodeList;
	
	get firstChild () :Node | null {
		return this.childNodes.length ? this.childNodes[0] : null;
	}
	
	get lastChild () :Node | null {
		return this.childNodes.length ? this.childNodes[this.childNodes.length-1] : null;
	}
	
	appendChild<T extends Element | Text> (node :T) :T {
		node.parentNode && node.parentNode.childNodes.splice(node.parentNode.childNodes.indexOf(node), 1);
		node.parentNode = this;
		this.childNodes.push(node);
		return node;
	}
	
};

freeze(Node.prototype);

import Element from './Template.Content.Element';
import Text from './Template.Content.Text';