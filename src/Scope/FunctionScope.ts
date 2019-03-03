import { Identifier } from '../Identifier';
import { ObjectScope } from './ObjectScope';

export type FunctionScope = ( (value :string | object | any[]) => string );

var isArray :(arg :any) => boolean = Array.isArray;

var SEARCH :RegExp = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;

export function FunctionScope (this :void, cache :ObjectScope) :FunctionScope {
	function scope (value :string | object | any[]) :string { return scopify(value, _scope); }
	scope._ = function (string :string) { return string.replace(SEARCH, _replacer); };
	function _replacer (__key__ :string) :string { return _scope(__key__.slice(2, -2)); }
	function _scope (key :string) :string { return cache[key] || ( cache[key] = Identifier() ); }
	return scope;
}

function scopify (value :string | object | any[], _scope :(key :string) => string) :string {
	var keys :string,
		index :number,
		key :string;
	if ( typeof value==='string' ) {
		if ( ( <string>value ).indexOf(' ')=== -1 ) { return _scope(value); }
		keys = '';
		var values :string[] = value.split(' ');
		for ( index = values.length; index--; ) {
			key = value[index];
			if ( key ) { keys = _scope(key)+' '+keys; }
		}
		return keys && keys.slice(0, -1);
	}
	var keys = '';
	if ( isArray(value) ) {
		for ( index = ( <string[]>value ).length; index--; ) {
			key = scopify(value[index], _scope);
			if ( key ) { keys = key+' '+keys; }
		}
		return keys && keys.slice(0, -1);
	}
	else {
		for ( key in <object>value ) {
			if ( value[key] ) { keys += ' '+_scope(key); }
		}
		return keys && keys.slice(1);
	}
}