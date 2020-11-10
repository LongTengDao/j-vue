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

export function proSymbols (self :Context, symbolMethods :SymbolMethods) {
	
	var _ = self._;
	defineProperties(_ ? _.ctx : self, symbolMethods);
	
}

export function proConstructor (self :Context, symbolMethods :SymbolMethods | null, constructor :ClassAPI, Vue3 :_Vue3 | undefined) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
}

export function proNames (self :Context, symbolMethods :SymbolMethods | null, constructor :ClassAPI, Vue3 :_Vue3 | undefined, dataNames :Names, shadowAssigner :ShadowAssigner | null) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = assign(create(NULL), dataNames) as Data;
	if ( _ ) {
		var accessCache = _.accessCache;
		for ( var name in dataNames ) {
			data[name] = ctx[name as keyof Context];
			if ( name in accessCache ) { accessCache[name as keyof Context] = undefined; }
		}
	}
	else {
		for ( name in dataNames ) { data[name] = ctx[name as keyof Context]; }
	}
	shadowAssigner && shadowAssigner(self, data);
	return data;
	
}

export function proData (self :Context, symbolMethods :SymbolMethods | null, constructor :ClassAPI, Vue3 :_Vue3 | undefined, restNames :Names, shadowAssigner :ShadowAssigner | null) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = create(NULL) as Data;
	if ( _ ) {
		var accessCache = _.accessCache;
		for ( var name in ctx ) {
			if ( !( name in restNames ) ) {
				data[name] = ctx[name as keyof Context];
				if ( name in accessCache ) { accessCache[name as keyof Context] = undefined; }
			}
		}
	}
	else {
		var nowNames = Keys(ctx);
		var index = 0;
		while ( index!==nowNames.length ) {
			name = nowNames[index++];
			if ( !( name in restNames ) ) { data[name] = ctx[name as keyof Context]; }
		}
	}
	shadowAssigner && shadowAssigner(self, data);
	return data;
	
}

export function devData (self :Context, symbolMethods :SymbolMethods | null, constructor :ClassAPI, Vue3 :_Vue3 | undefined, skipData :boolean, dataNames :Names | null, restNames :Names, shadowAssigner :ShadowAssigner | null, shadowChecker :ShadowChecker | undefined, skipConstructor :boolean, __dev__ :__Dev__) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	var oldDescriptors = assign(create(NULL), getOwnPropertyDescriptors(ctx), symbolMethods);
	symbolMethods && defineProperties(ctx, symbolMethods);
	
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
	if ( skipConstructor || skipData ) {
		if ( difKeys.length ) { throw Error(__dev__.runtime_data); }
	}
	if ( dataNames ) {
		var count = 0;
		for ( var key in dataNames ) { ++count; }
		if ( count!==difKeys.length ) { throw Error(__dev__.runtime_data); }
		difKeys.forEach(function () {
			if ( !( key in dataNames ) ) { throw Error(__dev__.runtime_data); }
		});
	}
	difKeys.forEach(function (this :object, key) {
		if ( key in this && !( key in {} ) || key in restNames ) { throw Error(__dev__.runtime_redefined); }
		if ( typeof key==='symbol' ) { throw Error(__dev__.runtime_symbol); }
		if ( key[0]==='_' || key[0]==='$' ) { throw Error(__dev__.runtime_reserved); }
		//@ts-ignore
		if ( key==='constructor' ) { throw Error(__dev__.proto); }
		if ( !propertyIsEnumerable.call(ctx, key)) { throw Error(__dev__.runtime_enumerable); }
	}, getPrototypeOf(ctx));
	
	var data = create(NULL) as Data;
	difKeys.forEach(function (key) {
		( data as Data )[key] = ctx[key];
		if ( _ && key in _.accessCache ) { _.accessCache[key] = undefined; }
	});
	if ( shadowAssigner ) {
		shadowChecker!(data);
		shadowAssigner(self, data);
	}
	return data;
	
}

import type { ShadowAssigner, ShadowChecker } from './Shadow';
import type { SymbolMethods, ClassAPI, Context, Data, __Dev__, Names } from './';
import type { _Vue3 } from 'j-vue';