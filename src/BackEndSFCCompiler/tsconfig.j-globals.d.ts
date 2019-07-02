
declare module '.Array' { export default Array;
	export { default as from } from '.Array.from';
	export { default as isArray } from '.Array.isArray';
	export { default as of } from '.Array.of';
}
declare module '.Array.from' { export default Array.from; }
declare module '.Array.isArray' { export default Array.isArray; }
declare module '.Array.isArray?=' { export default Array.isArray; }
declare module '.Array.of' { export default Array.of; }
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }

declare module '.Buffer.from?' { export default Buffer.from; }
declare module '.Buffer.isBuffer' { export default Buffer.isBuffer; }

declare module '.Error' { export default Error; }

declare module '.Map' { export default Map; }

declare module '.Number.MAX_SAFE_INTEGER?=' { export default Number.MAX_SAFE_INTEGER; }

declare module '.Object' { export default Object;
	export { default as assign } from '.Object.assign';
	export { default as create } from '.Object.create';
	export { default as defineProperties } from '.Object.defineProperties';
	export { default as defineProperty } from '.Object.defineProperty';
	export { default as entries } from '.Object.entries';
	export { default as freeze } from '.Object.freeze';
	export { default as fromEntries } from '.Object.fromEntries';
	export { default as getOwnPropertyDescriptor } from '.Object.getOwnPropertyDescriptor';
	export { default as getOwnPropertyDescriptors } from '.Object.getOwnPropertyDescriptors';
	export { default as getOwnPropertyNames } from '.Object.getOwnPropertyNames';
	export { default as getOwnPropertySymbols } from '.Object.getOwnPropertySymbols';
	export { default as getPrototypeOf } from '.Object.getPrototypeOf';
	export { default as is } from '.Object.is';
	export { default as isExtensible } from '.Object.isExtensible';
	export { default as isFrozen } from '.Object.isFrozen';
	export { default as isSealed } from '.Object.isSealed';
	export { default as keys } from '.Object.keys';
	export { default as preventExtensions } from '.Object.preventExtensions';
	export { default as seal } from '.Object.seal';
	export { default as setPrototypeOf } from '.Object.setPrototypeOf';
	export { default as values } from '.Object.values';
}
declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.create' { export default Object.create; }
declare module '.Object.create?=' { export default Object.create; }
declare module '.Object.defineProperties' { export default Object.defineProperties; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.entries' { export default entries;
	function entries<T extends object> (object :T) :[Extract<string, keyof T>, T[Extract<string, keyof T>]][];
}
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.fromEntries' { export default fromEntries;
	function fromEntries<K extends string | symbol, V extends any> (entries :Iterable<{ readonly 0: K, readonly 1: V }>) :{ [k in K] :V };
}
declare module '.Object.getOwnPropertyDescriptor' { export default Object.getOwnPropertyDescriptor; }
declare module '.Object.getOwnPropertyDescriptors' { export default Object.getOwnPropertyDescriptors; }
declare module '.Object.getOwnPropertyNames' { export default Object.getOwnPropertyNames; }
declare module '.Object.getOwnPropertySymbols' { export default Object.getOwnPropertySymbols; }
declare module '.Object.getPrototypeOf' { export default Object.getPrototypeOf; }
declare module '.Object.is' { export default Object.is; }
declare module '.Object.isExtensible' { export default Object.isExtensible; }
declare module '.Object.isFrozen' { export default Object.isFrozen; }
declare module '.Object.isSealed' { export default Object.isSealed; }
declare module '.Object.keys' { export default keys;
	function keys<T extends object> (object :T) :Extract<string, keyof T>[];
}
declare module '.Object.preventExtensions' { export default Object.preventExtensions; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.propertyIsEnumerable' { export default Object.prototype.propertyIsEnumerable; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }
declare module '.Object.seal' { export default Object.seal; }
declare module '.Object.setPrototypeOf' { export default Object.setPrototypeOf; }
declare module '.Object.values' { export default values;
	function values<T extends object> (object :T) :T[Extract<string, keyof T>][];
}

declare module '.Proxy' { export default Proxy;
	export { default as revocable } from '.Proxy.revocable';
}
declare module '.Proxy.revocable' { export default Proxy.revocable; }

declare module '.RangeError' { export default RangeError; }

declare module '.ReferenceError' { export default ReferenceError; }

declare module '.Reflect' { export default Reflect;
	export { default as apply } from '.Reflect.apply';
	export { default as construct } from '.Reflect.construct';
	export { default as defineProperty } from '.Reflect.defineProperty';
	export { default as deleteProperty } from '.Reflect.deleteProperty';
	export { default as get } from '.Reflect.get';
	export { default as getOwnPropertyDescriptor } from '.Reflect.getOwnPropertyDescriptor';
	export { default as getPrototypeOf } from '.Reflect.getPrototypeOf';
	export { default as has } from '.Reflect.has';
	export { default as isExtensible } from '.Reflect.isExtensible';
	export { default as ownKeys } from '.Reflect.ownKeys';
	export { default as preventExtensions } from '.Reflect.preventExtensions';
	export { default as set } from '.Reflect.set';
	export { default as setPrototypeOf } from '.Reflect.setPrototypeOf';
}
declare module '.Reflect.apply' { export default Reflect.apply; }
declare module '.Reflect.construct' { export default Reflect.construct; }
declare module '.Reflect.defineProperty' { export default Reflect.defineProperty; }
declare module '.Reflect.deleteProperty' { export default Reflect.deleteProperty; }
declare module '.Reflect.get' { export default Reflect.get; }
declare module '.Reflect.getOwnPropertyDescriptor' { export default Reflect.getOwnPropertyDescriptor; }
declare module '.Reflect.getPrototypeOf' { export default Reflect.getPrototypeOf; }
declare module '.Reflect.has' { export default Reflect.has; }
declare module '.Reflect.isExtensible' { export default Reflect.isExtensible; }
declare module '.Reflect.ownKeys' { export default ownKeys;
	function ownKeys<T extends object> (object :T) :Extract<string | symbol, keyof T>[];
}
declare module '.Reflect.preventExtensions' { export default Reflect.preventExtensions; }
declare module '.Reflect.set' { export default Reflect.set; }
declare module '.Reflect.setPrototypeOf' { export default Reflect.setPrototypeOf; }

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype' { export default RegExp.prototype;
	export { default as compile } from '.RegExp.prototype.compile';
	export { default as exec } from '.RegExp.prototype.exec';
	export { default as source } from '.RegExp.prototype.source';
	export { default as test } from '.RegExp.prototype.test';
	export { default as toString } from '.RegExp.prototype.toString';
}
declare module '.RegExp.prototype.compile' { export default RegExp.prototype.compile; }
declare module '.RegExp.prototype.exec' { export default RegExp.prototype.exec; }
declare module '.RegExp.prototype.source' { export default RegExp.prototype.source; }
declare module '.RegExp.prototype.test' { export default RegExp.prototype.test; }
declare module '.RegExp.prototype.toString' { export default RegExp.prototype.toString; }

declare module '.Set' { export default Set; }

declare module '.String.fromCodePoint' { export default String.fromCodePoint; }

declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.SyntaxError' { export default SyntaxError; }

declare module '.TypeError' { export default TypeError; }

declare module '.WeakMap' { export default WeakMap; }

declare module '.default' { export default Default;
	function Default<Exports extends { readonly [key :string] :any, default? :Module<Exports> }> (exports :Exports) :Module<Exports>;
	function Default<Statics extends { readonly [key :string] :any, default? :ModuleFunction<Statics, Main> }, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = { readonly [key in keyof Exports] :Exports[key] } & { readonly default :Module<Exports> };
	type ModuleFunction<Statics, Main> = { readonly [key in keyof Statics] :Statics[key] } & { readonly default :ModuleFunction<Statics, Main> } & Main;
	type Callable = { (...args :any[]) :any };
	type Newable = { new (...args :any[]) :any };
}

declare module '.document' { export default document; }
declare module '.document.head' { export default document.head; }

declare module '.null' { export default NULL;
	const NULL :{
		new<ValueType extends any> () :NULL<ValueType>,
		new () :{},
		<_ extends never, Object extends object> (object :Object, define? :boolean) :Object,
		<ValueType> (object :object, define? :boolean) :NULL<ValueType>,
	};
	type NULL<ValueType> = {
		[key :string] :undefined | ValueType,
		toString? :ValueType,
		toLocaleString? :ValueType,
		valueOf? :ValueType,
		hasOwnProperty? :ValueType,
		isPrototypeOf? :ValueType,
		propertyIsEnumerable? :ValueType,
		__defineGetter__? :ValueType,
		__defineSetter__? :ValueType,
		__lookupGetter__? :ValueType,
		__lookupSetter__? :ValueType,
		__proto__? :ValueType,
		constructor? :ValueType,
	};
	export { default as assign } from '.null.assign';
	export { default as create } from '.null.create';
	export { default as defineProperties } from '.null.defineProperties';
	export { default as defineProperty } from '.null.defineProperty';
	export { default as fromEntries } from '.null.fromEntries';
	export { default as getOwnPropertyDescriptor } from '.null.getOwnPropertyDescriptor';
	export { default as getOwnPropertyDescriptors } from '.null.getOwnPropertyDescriptors';
	export { default as PropertyDescriptor } from '.null.PropertyDescriptor';
}
declare module '.null.PropertyDescriptor' { export default PropertyDescriptor;
	function PropertyDescriptor<V extends any, W extends boolean, E extends boolean, C extends boolean> (value :V, writable :W, enumerable :E, configurable :C) :{ value :V, writable :W, enumerable :E, configurable :C };
	function PropertyDescriptor<G extends ( () => any ) | undefined, S extends ( (value :any) => void ) | undefined, E extends boolean, C extends boolean> (get :G, set :S, enumerable :E, configurable :C) :{ get :G, set :S, enumerable :E, configurable :C };
}
declare module '.null.assign' { export default assign;
	function assign<O extends {}> (target :null | O, firstSource :O, ...restSources :O[]) :O;
}
declare module '.null.create' { export default create;
	function create<O extends {}, OO extends PropertyDescriptorMap> (proto? :null | O, descriptorMap? :OO) :( OO extends TypedPropertyDescriptorMap<infer O> ? O : {} ) & O;
	type TypedPropertyDescriptorMap<O> = { [k in keyof O] :TypedPropertyDescriptor<O[k]> };
}
declare module '.null.defineProperties' { export default defineProperties;
	function defineProperties<O extends {}, OO extends PropertyDescriptorMap> (object :O, descriptorMap :OO) :( OO extends TypedPropertyDescriptorMap<infer O> ? O : never ) & O;
	type TypedPropertyDescriptorMap<O> = { [k in keyof O] :TypedPropertyDescriptor<O[k]> };
}
declare module '.null.defineProperty' { export default defineProperty;
	function defineProperty<O extends {}, K extends string | symbol, D extends PropertyDescriptor> (object :O, key :K, descriptor :D, useReflect? :false) :( D extends TypedPropertyDescriptor<infer V> ? { [key in K] :V } : never ) & O;
	function defineProperty<O extends {}, K extends string | symbol, D extends PropertyDescriptor> (object :O, key :K, descriptor :D, useReflect :true) :boolean;
}
declare module '.null.fromEntries' { export default fromEntries;
	function fromEntries<K extends string | symbol, V extends any> (entries :Iterable<{ readonly 0: K, readonly 1: V }>) :{ [k in K] :V };
}
declare module '.null.getOwnPropertyDescriptor' { export default getOwnPropertyDescriptor;
	function getOwnPropertyDescriptor<O extends {}, K extends Extract<keyof O, string | symbol>> (object :O, key :K) :TypedPropertyDescriptor<O[K]>;
}
declare module '.null.getOwnPropertyDescriptors' { export default getOwnPropertyDescriptors;
	function getOwnPropertyDescriptors<O extends {}> (object :O) :{ [k in keyof O] :TypedPropertyDescriptor<O[k]> };
}

declare module '.parseInt' { export default parseInt; }

declare module '.private' { export default Private;
	function Private () :<T extends {}> (THIS :T) => T;
}

declare module '.return' { export default RETURN;
	function RETURN<T extends any> (value :T) :T;
}

declare module '.throw.SyntaxError' { export default throwSyntaxError;
	function throwSyntaxError (message? :string) :never;
}

declare module '.undefined' { export default undefined; }
