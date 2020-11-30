import Error from '.Error';
import isArray from '.Array.isArray';
import create from '.Object.create';
import freeze from '.Object.freeze';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import match from '.String.prototype.match';
import undefined from '.undefined';

import { StaticScope, InheritedStaticScope, SCOPE } from './StaticScope';
import DynamicScope from './DynamicScope';
import KEYS from './KEYS';

function throwEmpty (keys :string) :never { throw Error('Scope("' + keys + '")'); }
var isStaticScope = /*#__PURE__*/isPrototypeOf.bind(SCOPE) as (value :unknown) => value is StaticScope;
var match_call :(string :string, re :RegExp) => RegExpMatchArray | null = /*#__PURE__*/match.call.bind(match);

function mix (protos :Scope[]) :StaticScope {
	var scope :StaticScope = create(SCOPE);
	for ( var length :number = protos.length, index = 0; index<length; ++index ) {
		var proto :Scope = protos[index];
		if ( typeof proto==='function' ) { proto = proto.prototype; }
		for ( var id in proto ) { scope[id] = proto[id]; }
	}
	return scope;
}

type Scope = StaticScope | DynamicScope;

var Scope = /*#__PURE__*/function () {
	function Scope (this :void | Scope[] | Scope, keys? :string) :Scope {
		if ( keys===undefined ) {
			if ( this ) {
				if ( isArray(this) ) { return DynamicScope(mix(this as Scope[])); }
				else if ( typeof this==='function' && isStaticScope(this.prototype) ) { return DynamicScope(create(this.prototype)); }
				else if ( isStaticScope(this) ) { return DynamicScope(create(this)); }
			}
			return DynamicScope(create(SCOPE));
		}
		else {
			if ( this ) {
				if ( isArray(this) ) { var scope :StaticScope = new InheritedStaticScope(match_call(keys, KEYS) || throwEmpty(keys), InheritedStaticScope.prototype = mix(this as Scope[])); }
				else if ( typeof this==='function' && isStaticScope(this.prototype) ) { scope = new InheritedStaticScope(match_call(keys, KEYS) || throwEmpty(keys), InheritedStaticScope.prototype = this.prototype); }
				else if ( isStaticScope(this) ) { scope = new InheritedStaticScope(match_call(keys, KEYS) || throwEmpty(keys), InheritedStaticScope.prototype = this); }
				else { return new StaticScope(match_call(keys, KEYS) || throwEmpty(keys)); }
				InheritedStaticScope.prototype = SCOPE;
				return scope;
			}
			else { return new StaticScope(match_call(keys, KEYS) || throwEmpty(keys)); }
		}
	}
	//@ts-ignore
	Scope.prototype = null;
	return freeze(Scope);
}();

export { Scope as default, KEYS };