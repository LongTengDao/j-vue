import { ObjectScope, InheritedObjectScope } from './Scope/ObjectScope';
import { FunctionScope } from './Scope/FunctionScope';

type Scope = ObjectScope | FunctionScope;

var isArray :(arg :any) => boolean = Array.isArray;
var create :(o :object | null, properties?) => object = Object.create;
var KEYS :RegExp = /[a-z][a-z0-9]*(?:_[a-z0-9]+)*/ig;
var EMPTY :[] = [];

export default function Scope (this :ObjectScope[] | ObjectScope | any, keys? :string) :Scope {
	if ( typeof keys==='string' ) {
		if ( isArray(this) ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = mix(<ObjectScope[]>this)); }
		else if ( this instanceof ObjectScope ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = <ObjectScope>this); }
		else { return new ObjectScope(keys.match(KEYS) || EMPTY); }
	}
	else {
		if ( isArray(this) ) { return FunctionScope(mix(<ObjectScope[]>this)); }
		else if ( this instanceof ObjectScope ) { return FunctionScope(create(<ObjectScope>this)); }
		else { return FunctionScope(create(null)); }
	}
};

function mix (this :void, protos :ObjectScope[]) :ObjectScope {
	var scope :ObjectScope = create(null);
	for ( var length :number = protos.length, index = 0; index<length; ++index ) {
		var proto :ObjectScope = protos[index];
		for ( var id in proto ) { scope[id] = proto[id]; }
	}
	return scope;
}
