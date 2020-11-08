import Error from '.Error';
import create from '.Object.create';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import NULL from '.null.prototype';

var INIT = /*#__PURE__*/function () {
	var INIT = create(NULL) as ShadowRootInit;
	INIT.mode = 'open';
	return INIT;
}();

function attach (this :void, el :HTMLElement | null) :ShadowRoot | null { return el && ( el.shadowRoot || el.attachShadow(INIT) ); }

export type ShadowAssigner = { (this :void, self :Context, data :Data) :void };
export function ShadowAssigner (this :void, along :string) :ShadowAssigner {
	var index = along.indexOf('.');
	var names = index<0 ? null : along.slice(index + 1).split('.');
	var toName = names ? along.slice(0, index) : along;
	if ( names ) {
		if ( names.length===1 ) {
			var name$get = names[0] + '$get';
			var name$set = names[0] + '$set';
			return function (this :void, self :{ [name :string] :All }, data :{ [name :string] :All }) {
				var all = data[toName] = create(NULL) as All;
				all[name$set] = function (this :void, el :HTMLElement | null) { self[toName]![name$get] = attach(el); };
				all[name$get] = null;
			} as unknown as ShadowAssigner;
		}
		else {
			return function (this :void, self :{ [name :string] :All }, data :{ [name :string] :All }) {
				var all = data[toName] = create(NULL) as All;
				names!.forEach(function (name :string) {
					all[name + '$set'] = function (this :void, el :HTMLElement | null) { self[toName]![name] = attach(el); };
					all[name += '$get'] = null;
				});
			} as unknown as ShadowAssigner;
		}
	}
	else {
		var toName$get = toName + '$get';
		var toName$set = toName + '$set';
		return function (this :void, self :All, data :All) {
			data[toName$set] = function (this :void, el :HTMLElement | null) { self[toName$get] = attach(el); };
			data[toName$get] = null;
		} as unknown as ShadowAssigner;
	}
}

export type ShadowChecker = { (this :void, data :Data) :void };
export function ShadowChecker (this :void, along :string, names :Names, __dev__ :__Dev__) :ShadowChecker {
	var index = along.indexOf('.');
	var toName = index<0 ? along.slice(0, index) : along;
	if ( toName in names ) { throw Error(__dev__.compile_shadow); }
	return index<0
		? function (this :void, data :Data) {
			if ( hasOwnProperty.call(data, toName + '$get') || hasOwnProperty.call(data, toName + '$set') ) { throw Error(__dev__.runtime_shadow); }
		}
		: function (this :void, data :Data) {
			if ( hasOwnProperty.call(data, toName) ) { throw Error(__dev__.runtime_shadow); }
		};
}

type All = { [name :string] :{ (this :void, el :HTMLElement | null) :void } | ShadowRoot | null };

import type { Context, Data, __Dev__, Names } from './';