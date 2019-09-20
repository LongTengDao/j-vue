import isArray from '.Array.isArray';
import create from '.Object.create';
import undefined from '.undefined';

import { StaticScope, InheritedStaticScope, SCOPE } from './StaticScope';
import DynamicScope from './DynamicScope';
import KEYS from './KEYS';

var EMPTY :string[] = [];

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

function Scope (this :Scope[] | Scope | any, keys? :string) :Scope {
	if ( keys===undefined ) {
		if ( isArray(this) ) { return DynamicScope(mix(this as Scope[])); }
		else if ( this instanceof StaticScope ) { return DynamicScope(create(this)); }
		else if ( typeof this==='function' && this.prototype instanceof StaticScope ) { return DynamicScope(create(this.prototype as StaticScope)); }
		else { return DynamicScope(create(SCOPE)); }
	}
	else {
		if ( isArray(this) ) { return new InheritedStaticScope(keys.match(KEYS) || EMPTY, InheritedStaticScope.prototype = mix(this as Scope[])); }
		else if ( this instanceof StaticScope ) { return new InheritedStaticScope(keys.match(KEYS) || EMPTY, InheritedStaticScope.prototype = this); }
		else if ( typeof this==='function' && this.prototype instanceof StaticScope ) { return new InheritedStaticScope(keys.match(KEYS) || EMPTY, InheritedStaticScope.prototype = this.prototype); }
		else { return new StaticScope(keys.match(KEYS) || EMPTY); }
	}
}
Scope.prototype = null as any;

export { Scope as default, KEYS };