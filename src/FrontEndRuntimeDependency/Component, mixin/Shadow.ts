import Error from '.Error';
import create from '.Object.create';
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
export function ShadowChecker (this :void, along :string, restNames :Names, dataNames :Names | null, shadowNames :Names, __dev__ :__Dev__) :ShadowChecker {
	if ( along[0]==='_' || along[0]==='$' ) { throw Error(__dev__.compile_shadow); }
	var index = along.indexOf('.');
	if ( index<0 ) {
		var toName$get = along.slice(0, index) + '$get';
		var toName$set = along.slice(0, index) + '$set';
		if ( toName$get in restNames || toName$set in restNames ) { throw Error(__dev__.compile_shadow); }
		shadowNames[toName$get] = null;
		shadowNames[toName$set] = null;
		if ( dataNames ) {
			if ( toName$get in dataNames || toName$set in dataNames ) { throw Error(__dev__.compile_shadow); }
			return function () {};
		}
		return function (this :void, data :Data) {
			if ( toName$get in data || toName$set in data ) { throw Error(__dev__.runtime_shadow); }
		};
	}
	else {
		if ( along==='constructor' ) { throw Error(__dev__.proto); }
		if ( along in restNames ) { throw Error(__dev__.compile_shadow); }
		shadowNames[along] = null;
		if ( dataNames ) {
			if ( along in dataNames ) { throw Error(__dev__.compile_shadow); }
			return function () {};
		}
		return function (this :void, data :Data) {
			if ( along in data ) { throw Error(__dev__.runtime_shadow); }
		};
	}
}

type All = { [name :string] :{ (this :void, el :HTMLElement | null) :void } | ShadowRoot | null };

import type { Context, Data, Names } from './';
import type { __Dev__ } from 'j-vue';