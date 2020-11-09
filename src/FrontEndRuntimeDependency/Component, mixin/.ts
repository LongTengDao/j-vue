import Error from '.Error';
import Symbol from '.Symbol?';
import Set from '.Set?';
import Map from '.Map?';
import WeakMap from '.WeakMap?';
import TypeError from '.TypeError';
import Function from '.Function';
import isArray from '.Array.isArray';
import getPrototypeOf from '.Reflect.getPrototypeOf?=Object.getPrototypeOf';
import setPrototypeOf from '.Object.setPrototypeOf';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import getOwnPropertyDescriptor from '.Object.getOwnPropertyDescriptor';
import getOwnPropertySymbols from '.Object.getOwnPropertySymbols?';
import defineProperties from '.Object.defineProperties';
import get from '.Reflect.get?';
import apply from '.Reflect.apply?';
import assign from '.Object.assign?';
import create from '.Object.create';
import keys from '.Object.keys';
import freeze from '.Object.freeze';
import PROTO_BUG from '.Object.prototype';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import undefined from '.undefined';
import NULL from '.null.prototype';

import { that, proData, devData } from './Data';
import { ShadowAssigner, ShadowChecker } from './Shadow';

export { Component as default };
var Component :ClassAPI = /*#__PURE__*/freeze(/*#__PURE__*/defineProperties(
	function Component () { return that; },
	{
		prototype: {
			configurable: false,
			enumerable: false,
			value: /*#__PURE__*/freeze(create(null, {
				_render: {
					enumerable: false,
					get: undefined,
					set: function _render (this :Context, value :_Render3 | _Render2) { ( this._ || this.$options ).render = value; },
				},
			})),
		},
		render: {
			enumerable: false,
			get: undefined,
			set: function render (value :_Render3 | _Render2) { ( that!._ || that!.$options ).render = value; },
		},
		_: {
			enumerable: false,
			value: function toOptions (this :ClassAPI, Vue3? :_Vue3, __dev__? :{ readonly [Key in keyof __Dev__]? :string }) {
				if ( !isComponentConstructor(this) ) { throw Error('!( this extends Component )._()'); }
				var DID_OPTIONS = OPTIONS.objects.into(__dev__ || OPTIONS as any).into(Vue3 || OPTIONS as any);
				var TMP_OPTIONS = new OPTIONS.objectsTmp;
				var options = ToOptions(
					this,
					Vue3 || undefined,
					__dev__ ? DEV.reduce(function Dev (dev, key) {
						dev[key] = __dev__![key] || key;
						return dev;
					}, create(NULL) as { -readonly [Key in keyof __Dev__] :string }) : null,
					DID_OPTIONS,
					TMP_OPTIONS
				);
				TMP_OPTIONS.forEach!(function (optionsValue, constructorKey) { DID_OPTIONS.set(constructorKey, optionsValue); });
				return options;
			},
		},
	}
));

var _mixins :typeof SYMBOL = Symbol && /*#__PURE__*/Symbol('_mixins') as typeof SYMBOL;

var __PURE__ = /*#__PURE__*/function () {
	try { return Function('Component,_mixins', '"use strict";return(...mixins)=>class extends Component{constructor(){return Component()}static get[_mixins](){return mixins}}')(Component, _mixins); }
	catch (error) {}
}();

export function mixin (this :void) {
	return arguments.length
		? /*#__PURE__*/apply(__PURE__, null, arguments as any)
		: Component;
}

function ToOptions (constructor :ClassAPI, Vue3 :_Vue3 | undefined, __dev__ :__Dev__ | null, DID_OPTIONS :Options, TMP_OPTIONS :Options) :_ObjectAPI {
	
	var options :_ObjectAPI | undefined = DID_OPTIONS.get(constructor) || TMP_OPTIONS.get(constructor);
	if ( options ) { return options; }
	options = create(NULL) as _ObjectAPI;
	
	if ( isMixins(constructor) ) {
		var static_mixins = constructor[_mixins]!;
		var mixins = options.mixins = [] as _ObjectAPI[];
		var index = 0;
		while ( mixins.length!==static_mixins.length ) {
			var mixin = static_mixins[index++];
			if ( isComponentConstructor(mixin) ) {
				var mixinOptions = ToOptions(mixin, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
				if ( isMixins(mixin) ) {
					var mixinMixins = mixinOptions.mixins!;
					var mixinIndex = 0;
					while ( mixinIndex!==mixinMixins.length ) { mixins[mixins.length] = mixinMixins[mixinIndex++]; }
				}
				else { mixins[mixins.length] = mixinOptions; }
			}
			else { mixins[mixins.length] = mixin as _ObjectAPI; }
		}
		__dev__ && check(options, __dev__, DID_OPTIONS, TMP_OPTIONS);
		collectNames(options, constructor);
		TMP_OPTIONS.set(constructor, options);
		return options;
	}
	
	var Super = OPTIONS.supers.get(constructor);
	if ( !Super ) {
		OPTIONS.supers.set(constructor, Super = getPrototypeOf(constructor));
		Super===Component || isMixins(Super) || setPrototypeOf(constructor, Component);
	}
	if ( Super!==Component ) {
		var SuperOptions = ToOptions(Super, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
		isMixins(Super)
			? options.mixins!.length===1
				? options.extends = SuperOptions.mixins![0]
				: options.mixins = SuperOptions.mixins
			: options.extends = SuperOptions;
	}
	
	__dev__ && getOwnPropertySymbols(constructor).forEach(function (symbol) {
		if ( symbol!==_mixins && !( symbol in SYMBOLS ) ) { throw Error(__dev__.compile_symbol); }
	});
	
	var set :typeof proSet = __dev__ ? devSet.bind(__dev__) : proSet;
	var assertFunction :typeof proAssertFunction = __dev__ ? devAssertFunction.bind(__dev__) : proAssertFunction;
	
	var staticNames = getOwnPropertyNames(constructor);
	index = staticNames.length;
	var shadowAssigner :ShadowAssigner | null = null;
	while ( index ) {
		var staticName = staticNames[--index];
		if ( staticName==='Render' ) { var Render :_Render3Constructor | undefined = constructor[staticName] as _Render3Constructor; }
		//@ts-ignore
		else if ( staticName==='name' || staticName==='length' ) {
			descriptor = getOwnPropertyDescriptor(constructor, staticName);
			if ( descriptor.hasOwnProperty('value') ) {
				descriptor.enumerable && set(options, staticName, descriptor.value);
			}
			else {
				set(options, staticName, apply(descriptor.get!, constructor, ARGS));
			}
		}
		else if ( staticName!=='prototype' ) {
			if ( __dev__ ) {
				if ( staticName[0]==='_' ) { throw Error(__dev__.compile_reserved); }
				if (
					//@ts-ignore
					staticName==='setup' || staticName==='watch' || staticName==='methods' || staticName==='computed' || staticName==='extends' || staticName==='data' || staticName==='mixins' ||
					//@ts-ignore
					staticName==='beforeCreated' || staticName==='created' || staticName==='beforeMount' || staticName==='mounted' || staticName==='beforeUpdate' || staticName==='updated' || staticName==='activated' || staticName==='deactivated' || staticName==='beforeUnmount' || staticName==='unmounted' || staticName==='beforeDestroy' || staticName==='destroyed' ||
					//@ts-ignore
					staticName==='inject' || staticName==='props'
				) { throw Error(__dev__.compile_layout); }
			}
			//@ts-ignore
			set(options, staticName, constructor[staticName]);
		}
	}
	
	var prototype = constructor.prototype;
	
	var protoNames = getOwnPropertyNames(prototype);
	index = protoNames.length;
	var watchers :Watcher[] = [];
	while ( index ) {
		var protoName = protoNames[--index];
		if ( protoName[0]==='_' && !protoName.startsWith('_watch:') ) {
			if ( __dev__ ) {
				var protoName1 = protoName.slice(1);
				if ( protoName1[0]==='_' ) { throw Error(__dev__.compile_reserved); }
				if (
					protoName1==='setup' || protoName1==='watch' || protoName1==='methods' || protoName1==='computed' || protoName1==='extends' || protoName1==='data' || protoName1==='mixins' ||
					protoName1==='emits' || protoName1==='components' || protoName1==='directives' || protoName1==='staticRenderFns' || protoName1==='template' || protoName1==='inheritAttrs' ||
					protoName1==='name' ||
					protoName1==='Render' ||
					protoName1==='delimiters' ||
					protoName1==='filters' || protoName1==='comments' || protoName1==='functional' || protoName1==='propsData' || protoName1==='model'
				) { throw Error(__dev__.compile_layout); }
			}
			set(options, protoName.slice(1), get(prototype, protoName, undefined));
		}
		else {
			var descriptor :PropertyDescriptor = getOwnPropertyDescriptor(prototype, protoName);
			if ( protoName[0]==='_' ) {
				var indexOfQ = protoName.search(WATCH_OPTIONS);
				var watcher = watchers[watchers.length] = create(NULL) as Watcher;
				if ( descriptor.hasOwnProperty('value') ) {
					watcher.$ = indexOfQ<0
						? protoName.slice(7)
						: protoName.slice(7, indexOfQ);
					watcher.handler = assertFunction(descriptor.value);
				}
				else {
					watcher.$ = assertFunction(descriptor.get);
					watcher.handler = assertFunction(descriptor.set);
				}
				if ( indexOfQ>0 ) {
					++indexOfQ;
					do {
						var indexOfA = protoName.indexOf(';', indexOfQ);
						var pair = indexOfA<0
							? protoName.slice(indexOfQ)
							: protoName.slice(indexOfQ, indexOfA);
						indexOfQ = indexOfA + 1;
						var indexOfE = pair.indexOf('=');
						indexOfE<0
							? watcher[pair] = true
							: watcher[pair.slice(0, indexOfE)] = pair.slice(indexOfE + 1);
					}
					while ( indexOfQ );
				}
			}
			else {
				if ( __dev__ ) {
					if ( protoName[0]==='$' ) { throw Error(__dev__.compile_reserved); }
				}
				if ( descriptor.hasOwnProperty('value') ) {
					if ( protoName!=='constructor' || descriptor.value!==constructor ) {
						( options.methods || ( options.methods = create(NULL) as NonNullable<_ObjectAPI['methods']> ) )[protoName] = assertFunction(descriptor.value);
					}
				}
				else {
					( options.computed || ( options.computed = create(NULL) as NonNullable<_ObjectAPI['computed']> ) )[protoName] = descriptor.set ? { get: descriptor.get, set: descriptor.set } : descriptor.get as any;
				}
			}
		}
	}
	
	__dev__ && check(options, __dev__, DID_OPTIONS, TMP_OPTIONS);
	
	var names = collectNames(options, constructor);
	
	if ( Render && Vue3 ) {
		var shadow = Render.shadow;
		if ( shadow ) {
			if ( __dev__ ) { var shadowChecker :ShadowChecker | undefined = ShadowChecker(shadow, names, __dev__); }
			shadowAssigner = ShadowAssigner(shadow);
		}
		options.render = assertFunction(new Render(Vue3));
	}
	
	var protoSymbols = getOwnPropertySymbols(prototype) as typeof SYMBOL[];
	index = protoSymbols.length;
	var symbolMethods = index ? create(NULL) as { [SYMBOL]? :TypedPropertyDescriptor<unknown> } : null;
	while ( index ) {
		var protoSymbol :typeof SYMBOL = protoSymbols[--index];
		symbolMethods![protoSymbol] = assign(create(NULL), getOwnPropertyDescriptor(prototype, protoSymbol));
	}
	
	if ( watchers.length ) {
		var created = options.created;
		options.created = created
			? function watchBeforeCreated (this :_Vue) {
				$watch(this, watchers);
				return created!.call(this);
			}
			: function watchBeforeCreated (this :_Vue) { $watch(this, watchers); };
	}
	
	options.data = __dev__
		? function (self :_Vue) { return devData(constructor, self as Context, symbolMethods, Vue3, names, shadowAssigner, shadowChecker, __dev__); }
		: function (self :_Vue) { return proData(constructor, self as Context, symbolMethods, Vue3, names, shadowAssigner); };
	
	TMP_OPTIONS.set(constructor, options);
	
	if ( options.components ) {
		var components = options.components = assign(create(NULL), options.components);
		for ( var name in components ) {
			if ( __dev__ ) {
				if ( /^(?![A-Z])/.test(name) ) { throw Error(__dev__.compile_name); }
			}
			var value = components[name];
			if ( isComponentConstructor(value) ) { components[name] = ToOptions(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS); }
		}
	}
	
	return options;
	
}

var OPTIONS = WeakMap && /*#__PURE__*/function () {
	try {
		return Function('WeakMap,Map', '"use strict";\
class EasyMap extends WeakMap{into(key){let sub=this.get(key);sub??this.set(key,sub=new EasyMap);return sub}}EasyMap.prototype.get=WeakMap.prototype.get;EasyMap.prototype.set=WeakMap.prototype.set;\
class StrongMap extends Map{}StrongMap.prototype.get=Map.prototype.get;StrongMap.prototype.set=Map.prototype.set;StrongMap.prototype.forEach=Map.prototype.forEach;\
return{objects:new EasyMap,objectsTmp:StrongMap,supers:new EasyMap,names:new EasyMap}\
')(WeakMap, Map);
	}
	catch (error) {}
}() as {
	objects :EasyMap<__Dev__, EasyMap<_Vue3, Options>>,
	objectsTmp :{ new () :Options },
	supers :WeakMap<ClassAPI, ClassAPI>,
	names :WeakMap<ClassAPI | _ObjectAPI, Names>,
};
interface EasyMap<K extends object, V> extends WeakMap<K, V> { into (key :K) :V; }
interface Options {
	get (key :ClassAPI) :_ObjectAPI | undefined;
	has (key :_ObjectAPI) :boolean;
	set (key :ClassAPI, value :_ObjectAPI) :this;
	set (key :_ObjectAPI, value :null) :this;
	forEach? (cb :(value :_ObjectAPI, key :ClassAPI) => void) :void;
	forEach? (cb :(value :null, key :_ObjectAPI) => void) :void;
}

function isComponentConstructor (value :object) :value is ClassAPI { return apply(isPrototypeOf, Component, [ value ] as const); }

var ARGS = [] as const;

var _MIXINS = [ _mixins ] as const;
function isMixins (constructor :ClassAPI) { return apply(hasOwnProperty, constructor, _MIXINS); }

var SYMBOLS = /*#__PURE__*/getOwnPropertyNames(Symbol).reduce(function (SYMBOLS, name) {
	if ( typeof Symbol[name]==='symbol' ) { SYMBOLS[Symbol[name] as typeof SYMBOL] = null; }
	return SYMBOLS;
}, create(NULL) as { [SYMBOL] :unknown });

var WATCH_OPTIONS = /;[a-z;=]*$/;
function $watch (that :_Vue, watchers :readonly Watcher[]) {
	var index = watchers.length;
	do {
		var watcher :any = watchers[--index];
		that.$watch(watcher.$, watcher.handler, watcher);
	}
	while ( index );
}

export type Names = { [name :string] :unknown };
function collectNames (options :_ObjectAPI, constructor :ClassAPI | null) :Names {
	var names :Names | undefined = OPTIONS.names.get(options);
	if ( !names ) {
		if ( constructor ) { names = OPTIONS.names.get(constructor); }
		if ( !names ) {
			names = create(NULL) as Names;
			var extend = options.extends;
			extend && assign(names, collectNames(extend, null));
			var mixins = options.mixins;
			if ( mixins ) {
				var index = mixins.length;
				while ( index ) { assign(names, collectNames(mixins[--index], null)); }
			}
			var props = options.props;
			var name :string;
			if ( isArray(props) ) { for ( index = props.length; index; ) { name = props[--index]; names[name] = null; } }
			else { for ( name in props ) { names[name] = null; } }
			props = options.inject;
			if ( isArray(props) ) { for ( index = props.length; index; ) { name = props[--index]; names[name] = null; } }
			else { for ( name in props ) { names[name] = null; } }
			for ( name in options.methods ) { names[name] = null; }
			for ( name in options.computed ) { names[name] = null; }
		}
		if ( constructor ) { OPTIONS.names.set(constructor, names); }
		OPTIONS.names.set(options, names);
	}
	return names;
}

function proSet<T> (object :{ [name :string] :T }, name :string, value :T) { object[name] = value; }
function devSet<T> (this :__Dev__, object :{ [name :string] :T }, name :string, value :T) {
	if ( name in object ) { throw Error(this.compile_redefined); }
	object[name] = value;
}

function proAssertFunction<T> (fn :T) { return fn as T extends CallableFunction ? T : never; }
function devAssertFunction<T> (this :__Dev__, fn :T) {
	if ( typeof fn!=='function' ) { throw TypeError(this.compile_type); }
	return fn as T extends CallableFunction ? T : never;
}

function forKeys (option :{} | undefined, callback :(name :string) => void) {
	if ( isArray(option) ) { option.forEach(callback); }
	else { for ( var key in option ) { callback(key); } }
}
function check (options :_ObjectAPI & { readonly name? :string }, __dev__ :__Dev__, DID_OPTIONS :Options, TMP_OPTIONS :Options) {
	
	( options.extends ? [ options.extends ] : [] ).concat(options.mixins || []).forEach(function (mixin) {
		DID_OPTIONS.has(mixin) || TMP_OPTIONS.has(mixin) || check(mixin, __dev__, DID_OPTIONS, TMP_OPTIONS);
	});
	
	var names = new Set<string>();
	
	forKeys(options.props, function (name) {
		if ( /-|^(?:key$|[oO][nN]|ref$)/.test(name) ) { throw Error(__dev__.compile_props); }
		if ( name in PROTO_BUG ) { throw Error(__dev__.compile_proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( names.size===names.add(name).size ) { throw Error(__dev__.compile_redefined); }
	});
	
	forKeys(options.inject, function (name) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( names.size===names.add(name).size ) { throw Error(__dev__.compile_redefined); }
	});
	
	for ( name in options.methods ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( names.size===names.add(name).size ) { throw Error(__dev__.compile_redefined); }
	}
	
	for ( name in options.computed ) {
		if ( name in PROTO_BUG ) { throw Error(__dev__.compile_proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( names.size===names.add(name).size ) { throw Error(__dev__.compile_redefined); }
	}
	
	var name = options.name;
	if ( name ) {
		if (
			/^(?![A-Z])/.test(name)
			||
			options.components && name in options.components
		) { throw Error(__dev__.compile_name); }
	}
	
	options.emits &&
	( isArray(options.emits) ? options.emits : keys(options.emits) ).forEach(function (event) {
		if ( /[A-Z]|^onvnode|(?:capture|once|passive)$/.test('on' + event) ) { throw Error(__dev__.compile_emits); }
	});
	
	if (
		options.directives && 'is' in options.directives// 2
		||//@ts-ignore
		options.props && ( isArray(options.props) ? options.props.includes('is') : 'is' in options.props )// 3
	) { throw Error(__dev__.compile_is); }
	
	TMP_OPTIONS.set(options, null);
	
}

var DEV = [
	'compile_name',
	'compile_proto',
	'compile_props',
	'compile_emits',
	'compile_is',
	'compile_layout',
	'compile_reserved',
	'compile_redefined',
	'compile_type',
	'compile_symbol',
	'compile_shadow',
	'runtime_shadow',
	'runtime_redefined',
	'runtime_symbol',
	'runtime_reserved',
	'runtime_enumerable',
] as const;

export type __Dev__ = typeof DEV extends readonly ( infer T )[] ? { readonly [Key in Extract<T, string>] :string } : never;

export type ClassAPI =
	{ new (Vue3? :_Vue3) :Context } &
	{ readonly prototype :_Component<_Vue> & { readonly [SYMBOL]? :unknown } } &
	{ readonly [Key in keyof typeof _Component] :typeof _Component[Key] } &
	{ readonly [_mixins]? :readonly ( ClassAPI | _ObjectAPI )[] };

export interface Context extends _Vue {
	readonly _? :{
		render :_Render3,
		readonly ctx :Context,
		readonly accessCache :{
			[Key in typeof SYMBOL | '_' | keyof _Vue]? :number
		},
	},
	readonly $options :{
		render :_Render2,
	},
	readonly [SYMBOL]? :unknown,
}

export interface Data {
	[name :string] :unknown,
	[SYMBOL]? :unknown,
}

export type SymbolMethods = {
	readonly [SYMBOL]? :Readonly<TypedPropertyDescriptor<unknown>>,
};

type Watcher = { [option :string] :boolean | string } & { $ :string | CallableFunction, handler :CallableFunction };

declare const SYMBOL :unique symbol;

import type { _Component, _Vue, _ObjectAPI, _Vue3, Render2 as _Render2, Render3 as _Render3, Render3Constructor as _Render3Constructor } from 'j-vue';