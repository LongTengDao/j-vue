import Error from '.Error';
import TypeError from '.TypeError';
import Function from '.Function';
import Symbol from '.Symbol?';
import WeakMap from '.WeakMap?';
import isArray from '.Array.isArray';
import from from '.Array.from?';
import getPrototypeOf from '.Reflect.getPrototypeOf?=Object.getPrototypeOf';
import setPrototypeOf from '.Object.setPrototypeOf?';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import getOwnPropertyDescriptor from '.Object.getOwnPropertyDescriptor';
import getOwnPropertySymbols from '.Object.getOwnPropertySymbols?';
import defineProperties from '.Object.defineProperties';
import defineProperty from '.Object.defineProperty';
import get from '.Reflect.get?';
import apply from '.Reflect.apply?';
import assign from '.Object.assign?';
import create from '.Object.create';
import Keys from '.Object.keys';
import OwnKeys from '.Reflect.ownKeys?';
import freeze from '.Object.freeze';
import PROTO_BUG from '.Object.prototype';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import test from '.RegExp.prototype.test';
import window from '.window';
import document from '.document';
import undefined from '.undefined';
import NULL from '.null.prototype';

import { that, NAMES, proProto, proConstructor, proNames, proData, devData } from './Data';
import { ShadowAssigner, ShadowChecker } from './Shadow';

export { Component as default };
var Component :ClassAPI = /*#__PURE__*/freeze(/*#__PURE__*/defineProperties(
	function Component () { return that; },
	{
		prototype: {
			configurable: false,
			enumerable: false,
			value: null,
		},
		render: {
			enumerable: false,
			get: function render (this :void) { throw TypeError('Component.render='); },
			set: function render (this :void, value :_Render3 | _Render2) { ( that!._ || that!.$options ).render = value; },
		},
		_main: {
			enumerable: false,
			get: function _main (this :ClassAPI) {
				var Component = this;
				if ( !isComponentConstructor(Component) ) { throw TypeError('(!Component)._main'); }
				return function _main (this :unknown) :void {
					if ( once ) { throw Error('Component._main()x2'); }
					if ( this!==Component && isComponentConstructor(this) ) { throw TypeError('(Component!this)._main()'); }
					var Vue = Function('return Vue')();
					if ( typeof Vue==='object' ) {
						var dev = isArray(( window as { devtoolsFormatters? :[] } ).devtoolsFormatters);
						var app = Vue.createApp(
							ToOptions(
								Component,
								Vue,
								dev ? create(NULL) : undefined
							)
						);
						defineProperty(app.config, 'isCustomElement', { value: test.bind(STARTS_WITH_LOWERCASE), writable: true });
						if ( dev ) {
							THROW_IRREPARABLE = false;
							app.config.performance = true;
						}
						app.mount(document.body);
					}
					else {
						new ( Vue.extend(
							ToOptions(
								Component,
								undefined,
								Vue.devtools ? ( Vue.config.ignoredElements.push(STARTS_WITH_LOWERCASE), Vue.config.performance = true, create(NULL) ) : undefined
							)
						) )()
						.$mount(( document.body.innerHTML = '<br>', 'br' ));
					}
					once = true;
				};
			},
			set: undefined,
		},
		_toOptions: {
			enumerable: false,
			value: function _toOptions (this :ClassAPI, Vue3? :_Vue3, __dev__? :{ readonly [Key in keyof __Dev__]? :string }) {
				if ( !isComponentConstructor(this) ) { throw TypeError('(!Component)._toOptions()'); }
				return ToOptions(this, Vue3, __dev__);
			},
		},
	}
));
var once = false;

function ToOptions (this :void, constructor :ClassAPI, Vue3? :_Vue3, __dev__? :{ readonly [Key in keyof __Dev__]? :string }) {
	var DID_OPTIONS = OPTIONS.objects.into(__dev__ || OPTIONS as any).into(Vue3 || OPTIONS as any);
	var TMP_OPTIONS = new OPTIONS.objectsTmp;
	var options = Options(
		constructor,
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
}

var _mixins :typeof SYMBOL = Symbol && /*#__PURE__*/Symbol('_mixins') as typeof SYMBOL;

function __PURE__ (this :void, Sub :any, mixins :any[]) {
	Sub.prototype = null;
	Sub[_mixins] = mixins;
	return setPrototypeOf(Sub, Component);
}

export function mixin (this :void) {
	return arguments.length
		? /*#__PURE__*/__PURE__(function () { return that; }, /*#__PURE__*/from(arguments))
		: Component;
}

function Options (constructor :ClassAPI, Vue3 :_Vue3 | undefined, __dev__ :__Dev__ | null, DID_OPTIONS :WeakMap<ClassAPI, _ObjectAPI>, TMP_OPTIONS :Map<ClassAPI, _ObjectAPI>) :_ObjectAPI {
	
	var options :_ObjectAPI | undefined = DID_OPTIONS.get(constructor) || TMP_OPTIONS.get(constructor);
	if ( options ) { return options; }
	OPTIONS.constructor.set(options = create(NULL) as _ObjectAPI, constructor);
	
	if ( isMixins(constructor) ) {
		var static_mixins = constructor[_mixins]!;
		var mixins = new OPTIONS.Set<_ObjectAPI>();
		var index = 0;
		while ( index!==static_mixins.length ) {
			var mixin = static_mixins[index++]!;
			if ( isComponentConstructor(mixin) ) {
				var mixinOptions = Options(mixin, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
				if ( isMixins(mixin) ) {
					var mixinMixins = mixinOptions.mixins!;
					var mixinIndex = 0;
					while ( mixinIndex!==mixinMixins.length ) { mixins.add(mixinMixins[mixinIndex++]!); }
				}
				else { mixins.add(mixinOptions); }
			}
			else { mixins.add(mixin as _ObjectAPI); }
		}
		options.mixins = from(mixins);
		__dev__ && check(options, __dev__);
		collectNames(options, constructor);
		TMP_OPTIONS.set(constructor, options);
		return options;
	}
	
	var prototype = constructor.prototype;
	
	var Super = OPTIONS.super.get(constructor);
	if ( !Super ) {
		OPTIONS.super.set(constructor, Super = getPrototypeOf(constructor));
		Super===Component || isMixins(Super) || ( setPrototypeOf(constructor, Component), setPrototypeOf(prototype, null) );
	}
	if ( Super!==Component ) {
		var SuperOptions = Options(Super, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
		isMixins(Super)
			? SuperOptions.mixins!.length===1
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
	var skipConstructor = false;
	while ( index ) {
		var staticName = staticNames[--index]!;
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
		else if ( staticName==='data' ) {
			if ( __dev__ ) {
				if ( constructor[staticName]!==undefined ) { throw Error(isArray(constructor[staticName]) ? __dev__.compile_layer : __dev__.compile_type); }
			}
			skipConstructor = true;
		}
		else if ( staticName!=='prototype' ) {
			if ( __dev__ ) {
				if ( staticName[0]==='_' ) { throw Error(__dev__.compile_reserved); }
				if (
					//@ts-ignore
					staticName==='setup' || staticName==='watch' || staticName==='methods' || staticName==='computed' || staticName==='extends' || staticName==='mixins' ||
					//@ts-ignore
					staticName==='beforeCreated' || staticName==='created' || staticName==='beforeMount' || staticName==='mounted' || staticName==='beforeUpdate' || staticName==='updated' || staticName==='activated' || staticName==='deactivated' || staticName==='beforeUnmount' || staticName==='unmounted' || staticName==='beforeDestroy' || staticName==='destroyed' ||
					//@ts-ignore
					staticName==='inject' || staticName==='props' || protoName1==='emits'
				) { throw Error(__dev__.compile_layer); }
			}
			//@ts-ignore
			set(options, staticName, constructor[staticName]);
		}
	}
	
	var protoDescriptors :ProtoDescriptors | null = null;
	
	var protoNames = getOwnPropertyNames(prototype);
	index = protoNames.length;
	var watchers :Watcher[] = [];
	var skipData = false;
	var dataNames :Names | null = null;
	while ( index ) {
		var protoName = protoNames[--index]!;
		if ( protoName==='_data' ) {
			var _data = get(prototype, protoName, undefined);
			if ( _data ) {
				if ( __dev__ ) {
					if ( !isArray(_data) ) { throw Error(__dev__.compile_type); }
					_data.forEach(function (name) {
						if ( typeof name!=='string' ) { throw Error(__dev__.compile_type); }
						if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
					});
					if ( skipConstructor ) { throw Error(__dev__.compile_redefined); }
				}
				var length = _data.length;
				if ( length ) {
					dataNames = create(NULL) as Names;
					var i = 0;
					do { dataNames[_data[i]] = null; }
					while ( ++i!==length );
					dataNames = assign(create(NULL), dataNames);
					__dev__ && OPTIONS.data.set(options, dataNames);
				}
				else {
					skipData = true;
				}
			}
			else {
				if ( __dev__ ) {
					if ( _data!==undefined ) { throw Error(__dev__.compile_type); }
					if ( skipConstructor ) { throw Error(__dev__.compile_redefined); }
				}
				skipConstructor = true;
			}
		}
		else if ( protoName[0]==='_' && !( protoName.startsWith('_watch(') ) ) {
			if ( __dev__ ) {
				var protoName1 = protoName.slice(1);
				if ( protoName1[0]==='_' ) { throw Error(__dev__.compile_reserved); }
				if (
					protoName1==='setup' || protoName1==='watch' || protoName1==='methods' || protoName1==='computed' || protoName1==='extends' || protoName1==='mixins' ||
					protoName1==='components' || protoName1==='directives' || protoName1==='staticRenderFns' || protoName1==='template' || protoName1==='inheritAttrs' ||
					protoName1==='name' ||
					protoName1==='Render' ||
					protoName1==='delimiters' ||
					protoName1==='filters' || protoName1==='comments' || protoName1==='functional' || protoName1==='propsData' || protoName1==='model'
				) { throw Error(__dev__.compile_layer); }
			}
			set(options, protoName.slice(1), get(prototype, protoName, undefined));
		}
		else {
			var descriptor :PropertyDescriptor = getOwnPropertyDescriptor(prototype, protoName);
			if ( protoName[0]==='_' ) {
				var indexOfQ = protoName.lastIndexOf(')');
				var watcher = watchers[watchers.length] = create(NULL) as Watcher;
				if ( descriptor.hasOwnProperty('value') ) {
					watcher.$ = protoName.slice(7, indexOfQ).trim();
					watcher.handler = assertFunction(descriptor.value);
				}
				else {
					watcher.$ = assertFunction(descriptor.get);
					watcher.handler = assertFunction(descriptor.set);
				}
				if ( indexOfQ + 1!==protoName.length ) {
					indexOfQ += 2;
					do {
						var indexOfA = protoName.indexOf(';', indexOfQ);
						var pair = indexOfA<0
							? protoName.slice(indexOfQ)
							: protoName.slice(indexOfQ, indexOfA);
						indexOfQ = indexOfA + 1;
						if ( pair ) {
							var indexOfE = pair.indexOf('=');
							indexOfE<0
								? watcher[pair] = true
								: watcher[pair.slice(0, indexOfE)] = pair.slice(indexOfE + 1);
						}
					}
					while ( indexOfQ );
				}
			}
			else if ( protoName[0]==='$' ) {
				( protoDescriptors || ( protoDescriptors = create(NULL) as ProtoDescriptors ) )[protoName] = assign(create(NULL), descriptor);
			}
			else {
				if ( descriptor.hasOwnProperty('value') ) {
					if ( protoName!=='constructor' || descriptor.value!==constructor ) {
						( options.methods || ( options.methods = create(NULL) as NonNullable<_ObjectAPI['methods']> ) )[protoName] = assertFunction(descriptor.value);
					}
				}
				else {
					( options.computed || ( options.computed = create(NULL) as NonNullable<_ObjectAPI['computed']> ) )[protoName] = descriptor.set ? {
						get: descriptor.get,
						set: descriptor.set
					} : descriptor.get as any;
				}
			}
		}
	}
	
	var protoSymbols = getOwnPropertySymbols(prototype) as typeof SYMBOL[];
	if ( ( index = protoSymbols.length ) ) {
		if ( !protoDescriptors ) { protoDescriptors = create(NULL) as ProtoDescriptors; }
		do {
			var protoSymbol :typeof SYMBOL = protoSymbols[--index]!;
			protoDescriptors![protoSymbol] = assign(create(NULL), getOwnPropertyDescriptor(prototype, protoSymbol));
		}
		while ( index );
	}
	protoDescriptors && OPTIONS.proto.set(options, protoDescriptors = assign(create(NULL), protoDescriptors));
	
	__dev__ && check(options, __dev__);
	
	var restNames = collectNames(options, constructor);
	
	if ( Render && Vue3 ) {
		var shadow = Render.shadow;
		if ( shadow ) {
			if ( __dev__ ) {
				if ( skipConstructor && skipData ) { throw Error(__dev__.compile_shadow); }
				var shadowNames = create(NULL) as Names;
				var shadowChecker :ShadowChecker | undefined = ShadowChecker(shadow, restNames, dataNames, shadowNames, __dev__);
				OPTIONS.shadow.set(options, shadowNames);
			}
			shadowAssigner = ShadowAssigner(shadow);
		}
		var sheet = Render.sheet;
		if ( sheet ) {
			var watchers2 :Watcher[] = [];
			OwnKeys(sheet).forEach(function (this :Watcher[], key, index) {
				var watcher = this[index] = create(NULL) as Watcher;
				watcher.$ = assertFunction(sheet![key]);
				watcher.handler = function (this :_Vue, css :string) { ( this.$refs[key] as HTMLStyleElement ).textContent = css; };
				watcher.immediate = true;
				watcher.flush = 'sync';
			}, watchers2);
			watchers2.reverse();
			var beforeMount = options.beforeMount;
			options.beforeMount = beforeMount
				? function beforeBeforeMount () {
					$watch(this, watchers2);
					return apply(beforeMount!, this, ARGS);
				}
				: function beforeBeforeMount () {
					$watch(this, watchers2);
				};
		}
		options.render = assertFunction(new Render(Vue3!));
	}
	
	if ( __dev__ ) { options.data = function (self :_Vue) { return devData(self as Context, protoDescriptors, constructor, Vue3, skipData, dataNames, restNames, shadowAssigner, shadowChecker, skipConstructor, __dev__); }; }
	else if ( skipConstructor || skipData ) {}
	else if ( dataNames ) { options.data = function (self :_Vue) { return proNames(self as Context, protoDescriptors, constructor, Vue3, dataNames!, shadowAssigner); }; }
	else { options.data = function (self :_Vue) { return proData(self as Context, protoDescriptors, constructor, Vue3, restNames, shadowAssigner); }; }
	
	if ( watchers.length || !__dev__ && ( skipConstructor && protoDescriptors || skipData ) ) {
		watchers.length && watchers.reverse();
		var created = options.created;
		switch ( ( __dev__ ? ( skipConstructor ? 's' : 'n' ) : '_' ) + ( watchers.length ? 'w' : '_' ) + ( created ? 'c' : '_' ) ) {
			case 'swc':
				options.created = function beforeCreated (this :_Vue) {
					proProto(this as Context, protoDescriptors!);
					$watch(this, watchers);
					return apply(created!, this, ARGS);
				};
				break;
			case 'sw_':
				options.created = function beforeCreated (this :_Vue) {
					proProto(this as Context, protoDescriptors!);
					$watch(this, watchers);
				};
				break;
			case 's_c':
				options.created = function beforeCreated (this :_Vue) {
					proProto(this as Context, protoDescriptors!);
					return apply(created!, this, ARGS);
				};
				break;
			case 's__':
				options.created = function beforeCreated (this :_Vue) {
					proProto(this as Context, protoDescriptors!);
				};
				break;
			case 'nwc':
				options.created = function beforeCreated (this :_Vue) {
					proConstructor(this as Context, protoDescriptors, constructor, Vue3);
					$watch(this, watchers);
					return apply(created!, this, ARGS);
				};
				break;
			case 'nw_':
				options.created = function beforeCreated (this :_Vue) {
					proConstructor(this as Context, protoDescriptors, constructor, Vue3);
					$watch(this, watchers);
				};
				break;
			case 'n_c':
				options.created = function beforeCreated (this :_Vue) {
					proConstructor(this as Context, protoDescriptors, constructor, Vue3);
					return apply(created!, this, ARGS);
				};
				break;
			case 'n__':
				options.created = function beforeCreated (this :_Vue) {
					proConstructor(this as Context, protoDescriptors, constructor, Vue3);
				};
				break;
			case '_wc':
				options.created = function beforeCreated (this :_Vue) {
					$watch(this, watchers);
					return apply(created!, this, ARGS);
				};
				break;
			case '_w_':
				options.created = function beforeCreated (this :_Vue) {
					$watch(this, watchers);
				};
				break;
		}
	}
	
	TMP_OPTIONS.set(constructor, options);
	
	//@ts-ignore
	if ( options.components || options.name || options.displayName ) {
		var components = options.components = assign(create(NULL), options.components);
		if ( __dev__ ) {
			for ( pascal in components ) {
				if ( !pascal || STARTS_WITH_LOWERCASE.test(pascal) ) { throw Error(__dev__.compile_name); }
			}
			if ( THROW_IRREPARABLE && Vue3 && !options.render && options.template ) {
				if (
					//@ts-ignore
					options.name && INCLUDES_UPPERCASE.test(options.name.slice(1))
				) { throw Error(__dev__.compile_case); }
				if (
					//@ts-ignore
					options.displayName && INCLUDES_UPPERCASE.test(options.displayName.slice(1))
				) { throw Error(__dev__.compile_case); }
				for ( pascal in components ) {
					if ( INCLUDES_UPPERCASE.test(pascal.slice(1)) ) { throw Error(__dev__.compile_case); }
				}
			}
		}
		for ( var pascal in components ) {
			var value = components[pascal]!;
			if ( isComponentConstructor(value) ) { components[pascal] = Options(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS); }
		}
		if ( !Vue3 ) {
			var cases = create(NULL) as Names;
			//@ts-ignore
			options.name && fixPascal(options.name, cases);
			//@ts-ignore
			options.displayName && fixPascal(options.displayName, cases);
			for ( pascal in components ) { fixPascal(pascal, cases); }
			assign(components, cases, components);
		}
	}
	
	return options;
	
}

var OPTIONS = /*#__PURE__*/function () {
	try {
		return Function('"use strict";\
class EasyMap extends WeakMap{into(key){let sub=this.get(key);sub??this.set(key,sub=new EasyMap);return sub}}EasyMap.prototype.get=WeakMap.prototype.get;EasyMap.prototype.set=WeakMap.prototype.set;\
class StrongMap extends Map{}StrongMap.prototype.get=Map.prototype.get;StrongMap.prototype.set=Map.prototype.set;StrongMap.prototype.forEach=Map.prototype.forEach;\
class StrongSet extends Set{}StrongSet.prototype.add=Set.prototype.add;StrongSet.prototype[Symbol.iterator]=Set.prototype[Symbol.iterator];\
return{objects:new EasyMap,objectsTmp:StrongMap,super:new EasyMap,rest:new EasyMap,data:new EasyMap,proto:new EasyMap,constructor:new EasyMap,shadow:new EasyMap,Set:StrongSet}\
')();
	}
	catch (error) {}
}() as {
	objects :EasyMap<__Dev__, EasyMap<_Vue3, WeakMap<ClassAPI, _ObjectAPI>>>,
	objectsTmp :{ new () :Map<ClassAPI, _ObjectAPI> },
	super :WeakMap<ClassAPI, ClassAPI>,
	rest :WeakMap<ClassAPI | _ObjectAPI, Names>,
	data :WeakMap<_ObjectAPI, Names>,
	proto :WeakMap<_ObjectAPI, ProtoDescriptors>,
	constructor :WeakMap<_ObjectAPI, ClassAPI>,
	shadow :WeakMap<_ObjectAPI, Names>,
	Set :SetConstructor,
};
interface EasyMap<K extends object, V> extends WeakMap<K, V> {into (key :K) :V;}

var isComponentConstructor = /*#__PURE__*/isPrototypeOf.bind(Component) as (value :any) => value is ClassAPI;

var ARGS = [] as const;

var _MIXINS = [ _mixins ] as const;
function isMixins (constructor :ClassAPI) { return apply(hasOwnProperty, constructor, _MIXINS); }

var SYMBOLS = /*#__PURE__*/getOwnPropertyNames(Symbol).reduce(function (SYMBOLS, name) {
	if ( typeof Symbol[name]==='symbol' ) { SYMBOLS[Symbol[name] as typeof SYMBOL] = null; }
	return SYMBOLS;
}, create(NULL) as { [SYMBOL] :unknown });

function $watch (that :_Vue, watchers :readonly Watcher[]) {
	var index = watchers.length;
	do {
		var watcher :any = watchers[--index];
		that.$watch(watcher.$, watcher.handler, watcher);
	}
	while ( index );
}

export type Names<T = unknown> = {
	[name :string] :T,
	[SYMBOL]? :T,
};
function collectNames (options :_ObjectAPI, constructor :ClassAPI | null) :Names {
	var restNames :Names | undefined = OPTIONS.rest.get(options);
	if ( !restNames ) {
		if ( constructor ) { restNames = OPTIONS.rest.get(constructor); }
		if ( !restNames ) {
			restNames = create(NAMES);
			var extend = options.extends;
			extend && assign(restNames, collectNames(extend, null));
			var mixins = options.mixins;
			if ( mixins ) { for ( var index = mixins.length; index; ) { assign(restNames, collectNames(mixins[--index]!, null)); } }
			var props = options.props;
			var name :string;
			if ( isArray(props) ) { for ( index = props.length; index; ) { restNames[props[--index]!] = null; } }
			else { for ( name in props ) { restNames[name] = null; } }
			props = options.inject;
			if ( isArray(props) ) { for ( index = props.length; index; ) { restNames[props[--index]!] = null; } }
			else { for ( name in props ) { restNames[name] = null; } }
			for ( name in options.methods ) { restNames[name] = null; }
			for ( name in options.computed ) { restNames[name] = null; }
			restNames = assign(create(NULL), restNames);
		}
		if ( constructor ) { OPTIONS.rest.set(constructor, restNames); }
		OPTIONS.rest.set(options, restNames);
	}
	return restNames;
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

var THROW_IRREPARABLE = true;
var INCLUDES_UPPERCASE = /[A-Z]/;
var STARTS_WITH_LOWERCASE = /^[a-z]/;
var CHECKED = WeakMap && /*#__PURE__*/new WeakMap<ClassAPI | _ObjectAPI, Names<ClassAPI | _ObjectAPI>>();
function forKeys (option :{} | undefined, callback :(name :string) => void) {
	if ( isArray(option) ) { option.forEach(callback); }
	else { for ( var key in option ) { callback(key); } }
}
function check (options :_ObjectAPI & { readonly name? :string, readonly displayName? :string }, __dev__ :__Dev__) :Names<ClassAPI | _ObjectAPI> {
	
	var belong = OPTIONS.constructor.get(options) || options;
	var ownKeys = CHECKED.get(belong);
	if ( ownKeys ) { return ownKeys; }
	var allKeys = create(NULL) as Names<ClassAPI | _ObjectAPI>;
	
	( options.extends ? [ options.extends ] : [] ).concat(options.mixins || []).forEach(function (mixin) {
		var mixinNames = check(mixin, __dev__);
		for ( var name in mixinNames ) {
			if ( name in allKeys && mixinNames[name]!==allKeys[name] ) { throw Error(__dev__.compile_overwrite); }
		}
		assign(allKeys, mixinNames);
	});
	
	ownKeys = create(NULL) as Names<ClassAPI | _ObjectAPI>;
	
	var protoDescriptors = OPTIONS.proto.get(options);
	protoDescriptors && OwnKeys(protoDescriptors).forEach(function (key) {
		ownKeys![key] = belong;
	});
	
	forKeys(options.props, function (name) {
		if ( typeof name!=='string' ) { throw Error(__dev__.compile_type); }
		if ( /-|^(?:key$|on|ref$)/.test(name) ) { throw Error(__dev__.compile_props); }
		if ( name in PROTO_BUG ) { throw Error(__dev__.proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys! ) { throw Error(__dev__.compile_redefined); }
		ownKeys![name] = belong;
	});
	
	forKeys(options.inject, function (name) {
		if ( typeof name!=='string' ) { throw Error(__dev__.compile_type); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys! ) { throw Error(__dev__.compile_redefined); }
		ownKeys![name] = belong;
	});
	
	var name :string;
	
	for ( name in options.methods ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys ) { throw Error(__dev__.compile_redefined); }
		ownKeys[name] = belong;
	}
	
	for ( name in options.computed ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys ) { throw Error(__dev__.compile_redefined); }
		ownKeys[name] = belong;
	}
	
	for ( name in OPTIONS.data.get(options) ) {
		if ( name in ownKeys! ) { throw Error(__dev__.compile_redefined); }
		ownKeys![name] = belong;
	}
	
	for ( name in OPTIONS.shadow.get(options) ) {
		if ( name in ownKeys! ) { throw Error(__dev__.compile_redefined); }
		ownKeys![name] = belong;
	}
	
	if ( 'constructor' in ownKeys ) { throw Error(__dev__.proto); }
	
	OwnKeys(ownKeys).forEach(function (key) {
		if ( key in allKeys ) { throw Error(__dev__.compile_overwrite); }
	});
	assign(allKeys, ownKeys);
	
	[ options.name, options.displayName ].forEach(function (name :unknown) {
		if ( typeof name==='string'
			? !name || STARTS_WITH_LOWERCASE.test(name) || options.components && name in options.components && options.components[name]!==options
			: name!==undefined
		) { throw Error(__dev__.compile_name); }
	});
	
	options.emits &&
	( isArray(options.emits) ? options.emits : Keys(options.emits) ).forEach(function (event) {
		if ( typeof event!=='string' ) { throw Error(__dev__.compile_type); }
		if ( /(?:capture|once|passive)$/i.test('on' + event) || /^-?[vV]node/.test(event) ) { throw Error(__dev__.compile_emits); }
	});
	
	if (
		options.directives && 'is' in options.directives// 2
		||//@ts-ignore
		options.props && ( isArray(options.props) ? options.props.includes('is') : 'is' in options.props )// 3
	) { throw Error(__dev__.compile_is); }
	
	CHECKED.set(belong, allKeys);
	return allKeys;
	
}

var UPPER = /[A-Z]/;
function fixPascal (pascal :string, cases :Names) {
	var First = pascal[0]!;
	var first = First.toLowerCase();
	var rest = pascal.slice(1);
	cases[first + rest] = null;
	hyphenate(first, rest, cases);
	first===First || hyphenate(First, rest, cases);
}
function hyphenate (before :string, after :string, cases :Names) {
	var index = after.search(UPPER);
	if ( index<0 ) { cases[before + after] = null; }
	else {
		if ( index ) { before += after.slice(0, index); }
		var char = after[index]!;
		after = after.slice(index + 1);
		hyphenate(before + '-' + char.toLowerCase(), after, cases);
		hyphenate(before + '-' + char, after, cases);
		before[before.length - 1]==='-' || hyphenate(before + char, after, cases);
	}
}

var DEV :readonly ( keyof __Dev__ )[] = [
	'proto',
	'compile_case',
	'compile_name',
	'compile_props',
	'compile_emits',
	'compile_is',
	'compile_layer',
	'compile_reserved',
	'compile_redefined',
	'compile_overwrite',
	'compile_type',
	'compile_symbol',
	'compile_shadow',
	'runtime_shadow',
	'runtime_redefined',
	'runtime_symbol',
	'runtime_reserved',
	'runtime_enumerable',
	'runtime_data',
];

export type ClassAPI =
	& { new (Vue3? :_Vue3) :Context }
	& { readonly prototype :_Component<_Vue> & { readonly [SYMBOL]? :unknown } }
	& { readonly [Key in keyof typeof _Component] :typeof _Component[Key] }
	& { readonly [_mixins]? :readonly ( ClassAPI | _ObjectAPI )[] };

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

export type ProtoDescriptors = {
	[name :string] :Readonly<TypedPropertyDescriptor<unknown>>,
	[SYMBOL]? :Readonly<TypedPropertyDescriptor<unknown>>,
};

type Watcher = {
	[option :string] :boolean | string,
} & {
	$ :string | { (this :_Vue, self :_Vue) :unknown },
	handler (this :_Vue, value :unknown, oldValue? :unknown) :void | Promise<void>,
	deep? :boolean,
	immediate? :boolean,
	flush? :string,
};

declare const SYMBOL :unique symbol;

import type { _Component, _Vue, _ObjectAPI, Vue3 as _Vue3, Render2 as _Render2, Render3 as _Render3, Render3Constructor as _Render3Constructor, __Dev__ } from 'j-vue';