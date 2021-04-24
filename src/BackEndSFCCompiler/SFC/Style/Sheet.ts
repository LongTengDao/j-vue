import ReferenceError from '.ReferenceError';
import freeze from '.Object.freeze';

import { Sheet as Super } from '@ltd/j-css';

import { startsWithUpperCase, NameAs__Key__ } from '../RE';

const type_attribute = [ 'type', 'attribute' ] as const;
const attributeCallback = (evaluated :string) :string | void => {
	if ( evaluated[0]==='_' ) { return '.' + NameAs__Key__(evaluated.slice(1)); }
};

export default class Sheet extends Super {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet'; }
	
	constructor (inner :string, abbr? :Replacer) {
		super(inner);
		abbr
			? this.replace((evaluated, kind) :string | void => {
				switch ( kind ) {
					case 'type':
						if ( startsWithUpperCase(evaluated) ) { return abbr(evaluated); }
						break;
					case 'attribute':
						return attributeCallback(evaluated);
				}
			}, type_attribute)
			: this.replace(attributeCallback, 'attribute');
		return this;
	}
	
	checkScoped (this :Sheet, isScoped :(this :void, string :string) => boolean) {
		this.forEach((evaluated) => { if ( !isScoped(evaluated) ) { throw ReferenceError(`@keyframes ${evaluated} 将对全局生效`); } }, 'keyframes');
		const selector = this.findGlobal(isScoped);
		if ( selector ) { throw ReferenceError(`“${selector}” 将对全局生效`); }
	}
	
};

freeze(freeze(Sheet).prototype);

import type { Replacer } from './';