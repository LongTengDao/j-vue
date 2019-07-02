
declare module '.Array.isArray' { export default Array.isArray; }
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }

declare module '.Function' { export default Function; }

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
declare module '.Object.seal' { export default Object.seal; }
declare module '.Object.setPrototypeOf' { export default Object.setPrototypeOf; }
declare module '.Object.values' { export default values;
	function values<T extends object> (object :T) :T[Extract<string, keyof T>][];
}

declare module '.RegExp' { export default RegExp; }

declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

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

declare module '.undefined' { export default undefined; }
