import isArray from '.Array.isArray';
import create from '.Object.create';
import undefined from '.undefined';

import { ObjectScope, InheritedObjectScope, SCOPE } from './ObjectScope';
import FunctionScope from './FunctionScope';

var KEYS = /[a-z][a-z0-9]*(?:_[a-z0-9]+)*/ig;
var EMPTY :string[] = [];

function mix (protos :Scope[]) :ObjectScope {
	var scope :ObjectScope = create(SCOPE);
	for ( var length :number = protos.length, index = 0; index<length; ++index ) {
		var proto :Scope = protos[index];
		if ( typeof proto==='function' ) { proto = proto.prototype; }
		for ( var id in proto ) { scope[id] = proto[id]; }
	}
	return scope;
}

type Scope = ObjectScope | FunctionScope;

function Scope (this :Scope[] | Scope | any, keys? :string) :Scope {
	if ( keys===undefined ) {
		if ( isArray(this) ) { return FunctionScope(mix(this as Scope[])); }
		else if ( this instanceof ObjectScope ) { return FunctionScope(create(this)); }
		else if ( typeof this==='function' && this.prototype instanceof ObjectScope ) { return FunctionScope(create(this.prototype)); }
		else { return FunctionScope(create(SCOPE)); }
	}
	else {
		if ( isArray(this) ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = mix(this as Scope[])); }
		else if ( this instanceof ObjectScope ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = this); }
		else if ( typeof this==='function' && this.prototype instanceof ObjectScope ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = this.prototype); }
		else { return new ObjectScope(keys.match(KEYS) || EMPTY); }
	}
}

export { Scope as default, KEYS };