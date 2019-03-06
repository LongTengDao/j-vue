import { groupify } from '@ltd/j-groupify';
import { Identifier } from '../Identifier';

export type ObjectScope = {
	_ :(string :string) => string
};

import Object from '.Object';

export var SCOPE :ObjectScope = Object.create(null);
/*#__PURE__*/Object.freeze(SCOPE);

export function ObjectScope (this :ObjectScope, keys :string[]) :void {
	this._ = function (string :string) { return string.replace(search, replacer); };
	var search = Search(keys);
	var replacer = Replacer(this);
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
}

ObjectScope.prototype = SCOPE;

export function InheritedObjectScope (this :ObjectScope, keys :string[], proto :ObjectScope) :void {
	this._ = function (string :string) { return string.replace(search, replacer); };
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	for ( var key in proto ) { key==='_' || keys.push(key); }
	var search = Search(keys);
	var replacer = Replacer(this);
	InheritedObjectScope.prototype = SCOPE;
}

function Search (keys :string[]) :RegExp {
	return new RegExp('__'+groupify(keys, false, true)+'__', 'g');
}

function Replacer (scope :ObjectScope) {
	return function replacer (__key__ :string) :string { return scope[__key__.slice(2, -2)]; };
}
