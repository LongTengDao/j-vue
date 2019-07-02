import freeze from '.Object.freeze';

import Node from './Template.Content.Node';
import * as Entities from './Entities';

class CharacterData extends Node {
	
	constructor (data :string) {
		super();
		this.data = data;
	}
	
	data :string
	
}

freeze(CharacterData.prototype);

export default class Text extends CharacterData {
	
	constructor (data :string = '') {
		super(data);
	}
	
	get outerHTML () :string {
		return Entities.escape(this.data);
	}
	
	* toSource () :IterableIterator<string> {
		yield * this.outerHTML.split('&#10;');
	}
	
};

freeze(Text.prototype);
