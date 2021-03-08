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
import error from '.console.error';
import undefined from '.undefined';
import NULL from '.null.prototype';

export var that :Context | null = null;

export var NAMES = assign && /*#__PURE__*/assign(create(null), {
	_: null,
	_c: null,
	_computedWatchers: null,
	_data: null,
	_directInactive: null,
	_events: null,
	_hasHookEvent: null,
	_hasMove: null,
	_inactive: null,
	_isBeingDestroyed: null,
	_isDestroyed: null,
	_isMounted: null,
	_isVue: null,
	_leaving: null,
	_name: null,
	_props: null,
	_provided: null,
	_reflow: null,
	_renderProxy: null,
	_self: null,
	_staticTrees: null,
	_uid: null,
	_update: null,
	_vnode: null,
	_watcher: null,
	_watchers: null,
});

export function proProto (self :Context, protoDescriptors :ProtoDescriptors) {
	
	var _ = self._;
	defineProperties(_ ? _.ctx : self, protoDescriptors);
	
}

export function proConstructor (self :Context, protoDescriptors :ProtoDescriptors | null, constructor :ClassAPI, Vue3 :_Vue3 | undefined) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	protoDescriptors && defineProperties(ctx, protoDescriptors);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
}

export function proNames (self :Context, protoDescriptors :ProtoDescriptors | null, constructor :ClassAPI, Vue3 :_Vue3 | undefined, dataNames :Names, shadowAssigner :ShadowAssigner | null) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	protoDescriptors && defineProperties(ctx, protoDescriptors);
	
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

export function proData (self :Context, protoDescriptors :ProtoDescriptors | null, constructor :ClassAPI, Vue3 :_Vue3 | undefined, restNames :Names, shadowAssigner :ShadowAssigner | null) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	protoDescriptors && defineProperties(ctx, protoDescriptors);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = create(NULL) as Data;
	if ( _ ) {
		var accessCache = _.accessCache;
		for ( var name in ctx ) {
			if ( !( name in restNames ) && name[0]!=='$' ) {
				data[name] = ctx[name as keyof Context];
				if ( name in accessCache ) { accessCache[name as keyof Context] = undefined; }
			}
		}
	}
	else {
		var nowNames = Keys(ctx);
		var index = nowNames.length;
		while ( index ) {
			name = nowNames[--index]!;
			if ( !( name in restNames ) && name[0]!=='$' ) { data[name] = ctx[name as keyof Context]; }
		}
	}
	shadowAssigner && shadowAssigner(self, data);
	return data;
	
}

export function devData (self :Context, protoDescriptors :ProtoDescriptors | null, constructor :ClassAPI, Vue3 :_Vue3 | undefined, skipData :boolean, dataNames :Names | null, restNames :Names, shadowAssigner :ShadowAssigner | null, shadowChecker :ShadowChecker | undefined, skipConstructor :boolean, __dev__ :__Dev__) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	for ( var name in ctx ) {
		if ( name[0]==='_' && !( name in NAMES ) ) {
			error(Error('[jVue bug]: vm.' + name + ' is unknown but exists'));
			break;
		}
	}
	var oldDescriptors = assign(create(NULL), getOwnPropertyDescriptors(ctx), protoDescriptors);
	if ( protoDescriptors ) {
		for ( var $name in protoDescriptors ) { if ( $name in ctx ) { throw Error(__dev__.runtime_reserved); } }
		defineProperties(ctx, protoDescriptors);
	}
	
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
	var difKeys :( string | symbol )[] = ownKeys(ctx).filter(function (key) {
		return !( key in oldDescriptors );
	});
	if ( skipConstructor ) {
		if ( difKeys.length ) { throw Error(__dev__.runtime_data); }
	}
	var difNames = difKeys.filter(function (key) :key is string {
		return typeof key==='string' && key[0]!=='$';
	});
	if ( skipData ) {
		if ( difNames.length ) { throw Error(__dev__.runtime_data); }
	}
	if ( dataNames ) {
		var count = 0;
		for ( name in dataNames ) { ++count; }
		if ( count!==difNames.length ) { throw Error(__dev__.runtime_data); }
		difNames.forEach(function (name) {
			if ( !( name in dataNames ) ) { throw Error(__dev__.runtime_data); }
		});
	}
	difNames.forEach(function (this :object, name) {
		if ( name in this && !( name in {} ) || name in restNames ) { throw Error(__dev__.runtime_redefined); }
		if ( name[0]==='_' ) { throw Error(__dev__.runtime_reserved); }
		if ( name==='constructor' ) { throw Error(__dev__.proto); }
		if ( !propertyIsEnumerable.call(ctx, name)) { throw Error(__dev__.runtime_enumerable); }
	}, getPrototypeOf(ctx));
	
	var data = create(NULL) as Data;
	difNames.forEach(function (name) {
		( data as Data )[name] = ctx[name as keyof Context];
		if ( _ && name in _.accessCache ) { _.accessCache[name as keyof Context] = undefined; }
	});
	if ( shadowAssigner ) {
		shadowChecker!(data);
		shadowAssigner(self, data);
	}
	return data;
	
}

import type { ShadowAssigner, ShadowChecker } from './Shadow';
import type { ProtoDescriptors, ClassAPI, Context, Data, Names } from './';
import type { Vue3 as _Vue3, __Dev__ } from 'j-vue';