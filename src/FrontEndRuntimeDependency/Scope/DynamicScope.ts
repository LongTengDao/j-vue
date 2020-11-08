import isArray from '.Array.isArray';

import Identifier from '../Identifier';
import { StaticScope } from './StaticScope';
import { _, $ } from './_';

var SEARCH = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;

function get (cache :StaticScope, key :string) :string { return cache[key] || ( cache[key] = Identifier() ); }

function scopify (value :string | object | any[], cache :StaticScope) :string {
	var keys :string,
		index :number,
		values :string[],
		key :string;
	if ( value ) {
		switch ( typeof value ) {
			case 'string':
				if ( value.indexOf(' ')<0 ) {
					return get(cache, value);
				}
				else {
					keys = '';
					values = value.split(' ');
					for ( index = values.length; index; ) {
						key = value[--index];
						if ( key ) { keys = get(cache, key)+' '+keys; }
					}
					return keys && keys.slice(0, -1);
				}
			case 'object':
				keys = '';
				if ( isArray(value) ) {
					for ( index = value.length; index; ) {
						key = scopify(value[--index], cache);
						if ( key ) { keys = key+' '+keys; }
					}
					return keys && keys.slice(0, -1);
				}
				else {
					for ( key in value ) {
						if ( ( value as { [key :string] :any } )[key] ) { keys += ' '+get(cache, key); }
					}
					return keys && keys.slice(1);
				}
		}
	}
	return '';
}

function DynamicScope (cache :StaticScope) :DynamicScope {
	var scope = function scope (value :string | object | any[]) :string {
		var length = arguments.length;
		if ( length>1 ) {
			value = [ value, arguments[1] ];
			for ( var index = 2; index!==length; ++index ) { ( value as any[] )[index] = arguments[index]; }
		}
		return scopify(value, cache);
	} as DynamicScope;
	scope.prototype = cache;
	scope.$ = $;
	scope[_] = function _ (string :string) { return string.replace(SEARCH, _replacer); };
	function _replacer (__key__ :string) :string { return get(cache, __key__.slice(2, -2)); }
	return scope;
}

export { DynamicScope as default };

type DynamicScope = {
	(...args :any) :string;
	prototype :StaticScope;
	$ :typeof $;
	[_] :(string :string) => string;
};
