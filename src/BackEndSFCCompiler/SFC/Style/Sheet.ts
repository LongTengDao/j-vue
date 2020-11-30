import ReferenceError from '.ReferenceError';
import freeze from '.Object.freeze';

import { Sheet } from '@ltd/j-css';

import { STARTS_WITH_UPPER_CASE, NameAs__Key__ } from '../RE';

const type_attribute = [ 'type', 'attribute' ] as const;
const class_id_keyframes = [ 'class', 'id', 'keyframes' ] as const;
const attributeCallback = (evaluated :string) :string | void => {
	if ( evaluated[0]==='_' ) { return '.' + NameAs__Key__(evaluated.slice(1)); }
};

export default class extends Sheet {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet'; }
	
	constructor (inner :string, abbr? :Replacer) {
		super(inner);
		abbr
			? this.replace((evaluated, kind) :string | void => {
				switch ( kind ) {
					case 'type':
						if ( STARTS_WITH_UPPER_CASE.test(evaluated) ) { return abbr(evaluated); }
						break;
					case 'attribute':
						return attributeCallback(evaluated);
				}
			}, type_attribute)
			: this.replace(attributeCallback, 'attribute');
		return this;
	}
	
	checkScoped (this :Sheet, __KEY__ :{ readonly test :(this :object, string :string) => boolean }) {
		this.forEach((evaluated, kind) => {
			if ( !__KEY__.test(evaluated) ) {
				switch ( kind ) {
					case 'class':
						throw ReferenceError(`.${evaluated} 将对全局生效`);
					case 'id':
						throw ReferenceError(`#${evaluated} 将对全局生效`);
					case 'keyframes':
						throw ReferenceError(`@keyframes ${evaluated} 将对全局生效`);
				}
			}
		}, class_id_keyframes);
		const selector = this.findGlobal();
		if ( selector ) { throw ReferenceError(`“${selector}” 将对全局生效`); }
	}
	
};

freeze(freeze(Sheet).prototype);

import type { Replacer } from './';