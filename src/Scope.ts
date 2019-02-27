import { groupify } from '@ltd/j-groupify';
import { Identifier } from './Identifier';

var undefined :undefined;
var isArray :(arg :any) => boolean = Array.isArray;
var create :(o :object | null, properties?) => object = Object.create;
var SEARCH :RegExp = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;
var NULL :object = Object.freeze(Object.create(null));
ObjectScope.prototype = NULL;

export default function Scope (this :object[] | object | any, keys? :string) :Function | object {
	if ( keys===undefined ) { return FunctionScope(isArray(this) ? mix(this) : create(this instanceof ObjectScope ? this : null)); }
	var proto :object;
	if ( isArray(this) ) { proto = mix(this); }
	else if ( this instanceof ObjectScope ) { proto = this; }
	else { return new ObjectScope(keys.split('|')); }
	InheritedObjectScope.prototype = proto;
	return new InheritedObjectScope(keys.split('|'), proto);
};

function mix (this :void, protos :object[]) :object {
	var scope :object = create(null);
	for ( var length :number = protos.length, index = 0; index<length; ++index ) {
		var proto :object = protos[index];
		for ( var id in proto ) { scope[id] = proto[id]; }
	}
	return scope;
}

function FunctionScope (this: void, cache :object) :Function {
	function scope (key :string) :string { return cache[key] || ( cache[key] = Identifier() ); }
	scope._ = function (string :string) { return string.replace(SEARCH, replacer); };
	function replacer (__key__ :string) :string { return scope(__key__.slice(2, -2)); }
	return scope;
}

function ObjectScope (keys :string[]) :void {
	this._ = function (string :string) { return string.replace(search, replacer); };
	var search = Search(keys);
	var replacer = Replacer(this);
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
}

function InheritedObjectScope (keys :string[], proto :object) :void {
	this._ = function (string :string) { return string.replace(search, replacer); };
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	for ( var key in proto ) { key==='_' || keys.push(key); }
	var search = Search(keys);
	var replacer = Replacer(this);
	InheritedObjectScope.prototype = NULL;
}

function Search (keys :string[]) :RegExp {
	return new RegExp('__'+groupify(keys, false, true)+'__', 'g');
}

function Replacer (scope :object) {
	return function replacer (__key__ :string) :string { return scope[__key__.slice(2, -2)]; };
}
