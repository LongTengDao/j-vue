import Error from '.Error';
import Keys from '.Object.keys';
import ownKeys from '.Reflect.ownKeys?';
import getOwnPropertyDescriptor from '.Object.getOwnPropertyDescriptor';
import defineProperties from '.Object.defineProperties';
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import create from '.Object.create';
import assign from '.Object.assign?';
import getPrototypeOf from '.Object.getPrototypeOf';
import propertyIsEnumerable from '.Object.prototype.propertyIsEnumerable';
import undefined from '.undefined';
import NULL from '.null.prototype';

export var that :Context | null = null;

export function proData (constructor :ClassAPI, self :Context, symbolMethods :SymbolMethods | null, Vue3 :_Vue3 | undefined, names :Names, shadowAssigner :ShadowAssigner | null) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	var accessCache = _ && _.accessCache;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = create(NULL) as Data;
	if ( accessCache ) {
		for ( var name in ctx ) {
			if ( !( name in names ) ) {
				data[name] = ctx[name as keyof Context];
				if ( name in accessCache ) { accessCache[name as keyof Context] = undefined; }
			}
		}
	}
	else {
		var keys = Keys(ctx);
		var index = keys.length;
		do {
			var key = keys[--index];
			if ( !( key in names ) && key[0]!=='$' && key[0]!=='_' ) { data[key] = ctx[key]; }
		}
		while ( index );
	}
	shadowAssigner && shadowAssigner(self, data);
	return data;
	
}

export function devData (constructor :ClassAPI, self :Context, symbolMethods :SymbolMethods | null, Vue3 :_Vue3 | undefined, names :Names, shadowAssigner :ShadowAssigner | null, shadowChecker :ShadowChecker | undefined, __dev__ :__Dev__) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	var proto = getPrototypeOf(ctx);
	var accessCache = _ && _.accessCache;
	var oldDescriptors = assign(create(NULL), getOwnPropertyDescriptors(ctx), symbolMethods);
	defineProperties(ctx, symbolMethods || {});
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	ownKeys(oldDescriptors).forEach(function (key) {
		var oldDescriptor = oldDescriptors[key]!;
		var newDescriptor = getOwnPropertyDescriptor(ctx, key as keyof Context);
		if (
			!newDescriptor ||
			newDescriptor.configurable!==oldDescriptor.configurable ||
			newDescriptor.enumerable!==oldDescriptor.enumerable ||
			( newDescriptor.hasOwnProperty('value')
					//@ts-ignore
					? newDescriptor.value!==oldDescriptor.value || newDescriptor.writable!==oldDescriptor.writable
					//@ts-ignore
					: newDescriptor.get!==oldDescriptor.get || newDescriptor.set!==oldDescriptor.set
			)
		) { throw Error(__dev__.runtime_redefined); }
	});
	var difKeys = ownKeys(ctx).filter(function (key) {
		return !( key in oldDescriptors );
	});
	difKeys.forEach(function (key) {
		if ( key in proto && !( key in {} ) || key in names ) { throw Error(__dev__.runtime_redefined); }
		if ( typeof key==='symbol' ) { throw Error(__dev__.runtime_symbol); }
		if ( key[0]==='_' || key[0]==='$' ) { throw Error(__dev__.runtime_reserved); }
		if ( !propertyIsEnumerable.call(ctx, key)) { throw Error(__dev__.runtime_enumerable); }
	});
	
	var data = create(NULL) as Data;
	difKeys.forEach(function (key) {
		( data as Data )[key] = ctx[key];
		if ( accessCache && key in accessCache ) { accessCache[key] = undefined; }
	});
	if ( shadowAssigner ) {
		shadowChecker!(data);
		shadowAssigner(self, data);
	}
	return data;
	
}

import type { ShadowAssigner, ShadowChecker } from './Shadow';
import type { SymbolMethods, ClassAPI, Context, Data, __Dev__, Names } from './';
import type { _Vue3, Render2 as _Render2, Render3 as _Render3 } from 'j-vue';