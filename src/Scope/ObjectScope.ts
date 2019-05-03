import { groupify } from '@ltd/j-groupify';

import RegExp from '.RegExp';
import Object from '.Object';

import Identifier from '../Identifier';

export var SCOPE :ObjectScope =
	/*#__PURE__*/
	Object.preventExtensions(Object.create(null));

export var ObjectScope = function ObjectScope (this :ObjectScope, keys :Key[]) :void {
	this._ = function (string :string) { return string.replace(search, replacer); };
	var search :RegExp = Search(keys);
	var replacer = Replacer(this);
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
} as unknown as {
	new (keys :Key[]) :ObjectScope
};
export type ObjectScope = {
	_ :(string :string) => string
	a0_0 :string
};
export type Key = 'a0_0';

ObjectScope.prototype = SCOPE;

export var InheritedObjectScope = function InheritedObjectScope (this :ObjectScope, keys :Key[], proto :ObjectScope) :void {
	this._ = function (string :string) { return string.replace(search, replacer); };
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	for ( var key in proto ) { key==='_' || keys.push(<Key>key); }
	var search :RegExp = Search(keys);
	var replacer = Replacer(this);
	InheritedObjectScope.prototype = SCOPE;
} as unknown as {
	new (keys :Key[], proto :ObjectScope) :ObjectScope
};

function Search (keys :string[]) :RegExp {
	return RegExp('__'+groupify(keys, false, true)+'__', 'g');
}

function Replacer (scope :ObjectScope) {
	return function replacer (__key__ :string) :string { return scope[<Key>__key__.slice(2, -2)]; };
}
