import RegExp from '.RegExp';
import create from '.Object.create';
import freeze from '.Object.freeze';
import defineProperty from '.Object.defineProperty';
import NULL from '.null.prototype';

import { groupify } from '@ltd/j-regexp';

import Identifier from '../Identifier';
import { _, $ } from './_';

var prepare_ :{ (scope :Scope) :void } | null = typeof _==='symbol' ? null : /*#__PURE__*/function () {
	var _descriptor = create(NULL) as PropertyDescriptor;
	_descriptor.value = null;
	_descriptor.writable = true;
	_descriptor.enumerable = true;
	_descriptor.configurable = true;
	return function $ (scope :Scope) { defineProperty(scope, _, _descriptor); };
}();

function Search (keys :string[]) :RegExp { return RegExp('__' + groupify(keys, false, true) + '__', 'g'); }
function Replacer (scope :StaticScope) { return function replacer (__key__ :string) :string { return scope[__key__.slice(2, -2)]; }; }

var StaticScope = function StaticScope (this :StaticScope, keys :string[]) :void {
	prepare_ && prepare_(this);
	this[_] = function _ (string :string) { return string.replace(_search, _replacer); };
	var _search = Search(keys);
	var _replacer = Replacer(this);
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
} as unknown as {
	new (keys :string[]) :StaticScope;
	prototype :StaticScope;
};

var SCOPE :StaticScope = StaticScope.prototype = /*#__PURE__*/freeze(create(null, {
	$: { value: $, writable: false, enumerable: false, configurable: false },
}) as StaticScope);

var InheritedStaticScope = function InheritedStaticScope (this :StaticScope, keys :string[], proto :StaticScope) :void {
	prepare_ && prepare_(this);
	this[_] = function _ (string :string) { return string.replace(_search, _replacer); };
	for ( var index :number = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	for ( var key in proto ) { /*key==='_' || key==='$' || ( */
		keys[keys.length] = key/* )*/;
	}
	var _search = Search(keys);
	var _replacer = Replacer(this);
	InheritedStaticScope.prototype = SCOPE;
} as unknown as {
	new (keys :string[], proto :StaticScope) :StaticScope;
	prototype :StaticScope;
};

export { StaticScope, SCOPE, InheritedStaticScope };

type StaticScope = {
	[key :string] :string;
} & {
	$ :typeof $;
	[_] :(string :string) => string;
};

import type Scope from './';