import freeze from '.Object.freeze';

import Node from './Node';
import * as Entities from '../../Entities';

abstract class CharacterData extends Node {
	
	protected constructor (data :string) {
		super();
		this.void();
		this.data = data;
		return this;
	}
	
	//get length () :number { return this.data.length; }
	
	readonly data :string;
	
}

freeze(CharacterData.prototype);

export default class Text extends CharacterData {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Text'; }
	
	constructor (data :string = '') { return super(data) as unknown as this; }
	
	//get wholeText () :string { return this.data; }
	
	get outerHTML () {
		return Entities.escapeInnerText(this.data);
	}
	
	* beautify (this :Text) :Generator<string, void, undefined> {
		yield * this.outerHTML.split('&#10;');
	}
	
};

freeze(Text.prototype);

export class RawText extends Text {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.RawText'; }
	
	constructor (data :string) { return super(data) as unknown as this; }
	
	get outerHTML () {
		return this.data;
	}
	
	* beautify (this :Text) :Generator<string, void, undefined> {
		yield * this.outerHTML.split('\n');
	}
	
}

freeze(RawText.prototype);
