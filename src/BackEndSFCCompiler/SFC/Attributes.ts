import undefined from '.undefined';
import keys from '.Object.keys';
import freeze from '.Object.freeze';

import { Null } from '@ltd/j-orderify';

import * as Entities from './Entities';

export type EMPTY = undefined;
export const EMPTY :EMPTY = undefined;

export default class Attributes extends Null<string> {
	
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
	
};

delete Attributes.prototype.constructor;

freeze(Attributes.prototype);
