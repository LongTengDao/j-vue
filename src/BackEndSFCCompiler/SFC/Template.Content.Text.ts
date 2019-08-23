import freeze from '.Object.freeze';
import defineProperty from '.Object.defineProperty';
import PropertyDescriptor from '.null.PropertyDescriptor';

import Node from './Template.Content.Node';
import * as Entities from './Entities';

const childNodesPropertyDescriptor = PropertyDescriptor(/*#__PURE__*/freeze([]), true, false, true);

class CharacterData extends Node {
	
	constructor (data :string) {
		super();
		defineProperty(this, 'childNodes', childNodesPropertyDescriptor);
		this.data = data;
	}
	
	data :string;
	
}

freeze(CharacterData.prototype);

export default class Text extends CharacterData {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Text'; }
	
	constructor (data :string = '') {
		super(data);
	}
	
	get outerHTML () :string {
		return Entities.escapeInnerText(this.data);
	}
	
	* toSource () :IterableIterator<string> {
		yield * this.outerHTML.split('&#10;');
	}
	
};

freeze(Text.prototype);
