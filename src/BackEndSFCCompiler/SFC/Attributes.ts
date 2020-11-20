import keys from '.Object.keys';
import undefined from '.undefined';

import { Null } from '@ltd/j-orderify';

import * as Entities from './Entities';

export type EMPTY = undefined;
export const EMPTY :EMPTY = undefined;

export default class Attributes extends Null<string> {
	
	constructor () { return super() as unknown as this; }
	
	get [Symbol.toStringTag] () { return 'SFC.*.Attributes'; }
	
	[Symbol.toPrimitive] (this :Attributes, hint :'number') :number;
	[Symbol.toPrimitive] (this :Attributes, hint :'string' | 'default') :string;
	[Symbol.toPrimitive] (this :Attributes, hint :'number' | 'string' | 'default') :number | string {
		if ( hint==='number' ) { return keys(this).length; }
		let literal :string = '';
		for ( const name in this ) {
			const value = this[name];
			literal += value===EMPTY ? ` ${name}` : ` ${name}="${Entities.escapeAttributeValue(value)}"`;
		}
		return literal;
	}
	
	#dot = '';
	static dot (attributes :Attributes, __key__? :string) {
		if ( __key__ ) { attributes.#dot += ' ' + __key__; }
		else if ( attributes.#dot ) {
			attributes['class'] = attributes['class']
				? attributes.#dot.slice(1) + ' ' + attributes['class']
				: attributes.#dot.slice(1);
		}
	}
	
	static 'default' = Null(Attributes);
	
};
