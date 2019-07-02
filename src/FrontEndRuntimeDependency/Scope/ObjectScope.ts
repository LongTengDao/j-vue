import { groupify } from '@ltd/j-groupify';

import RegExp from '.RegExp';
import create from '.Object.create';
import defineProperty from '.Object.defineProperty';
import preventExtensions from '.Object.preventExtensions';

import Identifier from '../Identifier';
import { _, $, prepare_ } from './_';

export var SCOPE :ObjectScope =
	/*#__PURE__*/
	function () {
		var descriptor = create(null);
		descriptor.value = $;
		return preventExtensions(defineProperty(create(null), '$', descriptor));
	}();

export var ObjectScope = function ObjectScope (this :ObjectScope, keys :string[]) :void {
	prepare_(this);
	this[_] = function _ (string :string) { return string.replace(_search, _replacer); };
	var _search = Search(keys);
	var _replacer = Replacer(this);
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
} as unknown as {
	new (keys :string[]) :ObjectScope
};
export type ObjectScope = {
	[key :string] :string
} & {
	$ :typeof $
	[_] :(string :string) => string
};

ObjectScope.prototype = SCOPE;

export var InheritedObjectScope = function InheritedObjectScope (this :ObjectScope, keys :string[], proto :ObjectScope) :void {
	prepare_(this);
	this[_] = function _ (string :string) { return string.replace(_search, _replacer); };
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	for ( var key in proto ) { /*key==='_' || key==='$' || */keys.push(key); }
	var _search = Search(keys);
	var _replacer = Replacer(this);
	InheritedObjectScope.prototype = SCOPE;
} as unknown as {
	new (keys :string[], proto :ObjectScope) :ObjectScope
};

function Search (keys :string[]) {
	return new RegExp('__'+groupify(keys, false, true)+'__', 'g');
}

function Replacer (scope :ObjectScope) {
	return function replacer (__key__ :string) :string { return scope[__key__.slice(2, -2)]; };
}
