import isArray from '.Array.isArray';
import slice from '.Array.prototype.slice';

import Identifier from '../Identifier';
import { ObjectScope } from './ObjectScope';
import { _, $ } from './_';

var SEARCH = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;

function scopify (value :string | object | any[], _scope :(key :string) => string) :string {
	var keys :string,
		index :number,
		values :string[],
		key :string;
	if ( value ) {
		switch ( typeof value ) {
			case 'string':
				if ( value.indexOf(' ')<0 ) {
					return _scope(value);
				}
				else {
					keys = '';
					values = value.split(' ');
					for ( index = values.length; index--; ) {
						key = value[index];
						if ( key ) { keys = _scope(key)+' '+keys; }
					}
					return keys && keys.slice(0, -1);
				}
			case 'object':
				keys = '';
				if ( isArray(value) ) {
					for ( index = value.length; index--; ) {
						key = scopify(value[index], _scope);
						if ( key ) { keys = key+' '+keys; }
					}
					return keys && keys.slice(0, -1);
				}
				else {
					for ( key in value ) {
						if ( ( value as { [key :string] :any } )[key] ) { keys += ' '+_scope(key); }
					}
					return keys && keys.slice(1);
				}
		}
	}
	return '';
}

type FunctionScope = {
	(...args :any[]) :string
	prototype :ObjectScope
	$ :typeof $
	[_] :(string :string) => string
};

function FunctionScope (cache :ObjectScope) :FunctionScope {
	var scope = function scope (value :string | object | any[]) :string { return scopify(arguments.length===1 ? value : slice.call(arguments, 0), _scope); } as FunctionScope;
	scope.prototype = cache;
	scope.$ = $;
	scope[_] = function _ (string :string) { return string.replace(SEARCH, _replacer); };
	function _replacer (__key__ :string) :string { return _scope(__key__.slice(2, -2)); }
	function _scope (key :string) :string { return cache[key] || ( cache[key] = Identifier() ); }
	return scope;
}

export { FunctionScope as default };