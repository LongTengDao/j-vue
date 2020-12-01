import freeze from '.Object.freeze';

import Node from './Node';
import * as Entities from '../../Entities';

const EOL = /[\n\u2028\u2029]|\r\n?/;

export default class TextCharacterData extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.*.Text'; }
	
	private _isInterpolation :boolean;
	
	constructor (data :string = '', isInterpolation :boolean = false) {
		super();
		this.data = data;
		this._isInterpolation = isInterpolation;
		return this;
	}
	
	readonly data :string;
	
	//get wholeText () :string { return this.data; }
	
	//get length () { return this.data.length; }
	
	[Symbol.toPrimitive] (this :TextCharacterData) {
		return this._isInterpolation
			? `{{${Entities.escapeInnerText(this.data)} }}`
			: Entities.escapeInnerText(this.data);
	}
	
	* beautify () :Generator<string, void, undefined> {
		yield * (
			this._isInterpolation
				? `{{ ${Entities.escapeBeautifulText(this.data)} }}`
				: Entities.escapeBeautifulText(this.data)
		).split(EOL);
	}
	
};

freeze(freeze(TextCharacterData).prototype);
