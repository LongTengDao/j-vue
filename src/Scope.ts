import { groupify } from '@ltd/j-groupify';
import { Identifier } from './Identifier';

var isArray :(arg :any) => boolean = Array.isArray;
var create :(o :object | null, properties?) => object = Object.create;
var SEARCH :RegExp = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;
var KEYS :RegExp = /[a-z][a-z0-9]*(?:_[a-z0-9]+)*/ig;
var NULL :object = Object.freeze(Object.create(null));
var EMPTY :[] = [];
ObjectScope.prototype = NULL;

type objectScope = object;
type functionScope = (value :string | object | any[]) => string;

export default function Scope (this :objectScope[] | objectScope | any, keys? :string) :objectScope | functionScope {
	if ( typeof keys==='string' ) {
		if ( isArray(this) ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = mix(<objectScope[]>this)); }
		else if ( this instanceof ObjectScope ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = <objectScope>this); }
		else { return new ObjectScope(keys.match(KEYS) || EMPTY); }
	}
	else {
		if ( isArray(this) ) { return FunctionScope(mix(<objectScope[]>this)); }
		else if ( this instanceof ObjectScope ) { return FunctionScope(create(<objectScope>this)); }
		else { return FunctionScope(create(null)); }
	}
};

function mix (this :void, protos :objectScope[]) :objectScope {
	var scope :objectScope = create(null);
	for ( var length :number = protos.length, index = 0; index<length; ++index ) {
		var proto :objectScope = protos[index];
		for ( var id in proto ) { scope[id] = proto[id]; }
	}
	return scope;
}

function ObjectScope (keys :string[]) :void {
	this._ = function (string :string) { return string.replace(search, replacer); };
	var search = Search(keys);
	var replacer = Replacer(this);
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
}

function InheritedObjectScope (keys :string[], proto :objectScope) :void {
	this._ = function (string :string) { return string.replace(search, replacer); };
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	for ( var key in proto ) { key==='_' || keys.push(key); }
	var search = Search(keys);
	var replacer = Replacer(this);
	InheritedObjectScope.prototype = NULL;
}

function FunctionScope (this :void, cache :objectScope) :functionScope {
	function scope (value :string | object | any[]) :string { return scopify(value, _scope); }
	scope._ = function (string :string) { return string.replace(SEARCH, _replacer); };
	function _replacer (__key__ :string) :string { return _scope(__key__.slice(2, -2)); }
	function _scope (key :string) :string { return cache[key] || ( cache[key] = Identifier() ); }
	return scope;
}

function Search (keys :string[]) :RegExp {
	return new RegExp('__'+groupify(keys, false, true)+'__', 'g');
}

function Replacer (scope :objectScope) {
	return function replacer (__key__ :string) :string { return scope[__key__.slice(2, -2)]; };
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
