import { groupify } from '@ltd/j-groupify';
import { Identifier } from './Identifier.js';

var undefined;
var isArray = Array.isArray;
var create = Object.create;
var SEARCH = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;
var NULL = Object.freeze(Object.create(null));
ObjectScope.prototype = NULL;

export default function Scope (keys) {
	if ( keys===undefined ) { return FunctionScope(isArray(this) ? mix(this) : create(this instanceof ObjectScope ? this : null)); }
	if ( isArray(this) ) { var proto = mix(this); }
	else if ( this instanceof ObjectScope ) { proto = this; }
	else { return new ObjectScope(keys.split('|')); }
	InheritedObjectScope.prototype = proto;
	return new InheritedObjectScope(keys.split('|'), proto);
};

function mix (protos) {
	var scope = create(null);
	for ( var length = protos.length, index = 0; index<length; ++index ) {
		var proto = protos[index];
		for ( var id in proto ) { scope[id] = proto[id]; }
	}
	return scope;
}

function FunctionScope (cache) {
	function scope (key) { return cache[key] || ( cache[key] = Identifier() ); }
	scope._search = SEARCH;
	scope._replacer = function _replacer (__key__) { return scope(__key__.slice(2, -2)); };
	return scope;
}

function ObjectScope (keys) {
	this._search = Search(keys);
	this._replacer = Replacer(this);
	for ( var index = keys.length; index; ) { this[keys[--index]] = Identifier(); }
}

function InheritedObjectScope (keys, proto) {
	this._search = null;
	this._replacer = Replacer(this);
	for ( var index = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	for ( var key in proto ) { key[0]==='_' || keys.push(key); }
	this._search = Search(keys);
	InheritedObjectScope.prototype = NULL;
}

function Search (keys) {
	return new RegExp('__'+groupify(keys, false, true)+'__', 'g');
}

function Replacer (scope) {
	return function _replacer (__key__) {
		return scope[__key__.slice(2, -2)];
	};
}
