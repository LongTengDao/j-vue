import freeze from '.Object.freeze';

import Node from './Node';
import * as Entities from '../../Entities';

export default class TextCharacterData extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.*.Text'; }
	
	constructor (data :string = '') {
		super();
		this.data = data;
		return this;
	}
	
	readonly data :string;
	
	//get wholeText () :string { return this.data; }
	
	//get length () { return this.data.length; }
	
	[Symbol.toPrimitive] (this :TextCharacterData) {
		return Entities.escapeInnerText(this.data);
	}
	
	* beautify () :Generator<string, void, undefined> {
		yield * ( '' + this ).split('&#10;');
	}
	
};

freeze(freeze(TextCharacterData).prototype);
