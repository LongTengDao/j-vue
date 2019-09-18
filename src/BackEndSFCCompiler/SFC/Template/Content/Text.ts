import freeze from '.Object.freeze';

import Node from './Node';
import * as Entities from '../../Entities';

abstract class CharacterData extends Node {
	
	protected constructor (data :string) {
		super();
		this.void();
		this.data = data;
	}
	
	readonly data :string;
	
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
	
	* beautify (this :Text) :IterableIterator<string> {
		yield * this.outerHTML.split('&#10;');
	}
	
};

freeze(Text.prototype);
