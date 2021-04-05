
declare module '.Array' { export default Array; }
declare module '.Array.from?' { export default Array.from; }
declare module '.Array.isArray' { export default isArray;
	function isArray (value :any) :value is readonly any[];
}
declare module '.Array.isArray?=' { export default isArray;
	function isArray (value :any) :value is readonly any[];
}
declare module '.Array.prototype' { export default Array.prototype; }
declare module '.Array.prototype.join' { export default Array.prototype.join; }
declare module '.Array.prototype.unshift' { export default Array.prototype.unshift; }

declare module '.Error' { export default Error; }

declare module '.Function' { export default Function; }
declare module '.Function.prototype.apply' { export default Function.prototype.apply; }
declare module '.Function.prototype.bind?' { export default Function.prototype.bind; }

declare module '.Infinity' { export default Infinity; }

declare module '.Math.floor' { export default Math.floor; }

declare module '.Object' { export default O;
	type O = Object;
	const O :{ [Method in keyof typeof Object] :typeof Object[Method] } & {
		<T> (value :T) :Objectify<T>;
		() :object;
		new<T> (value :T) :Objectify<T>;
		new () :object;
	};
	type Objectify<T> =
		T extends object ? T :
		T extends undefined | null ? object :
		T extends boolean ? object & Boolean :
		T extends number ? object & Number :
		T extends string ? object & String :
		T extends symbol ? object & Symbol :
		T extends bigint ? object & BigInt :
		never;
}
declare module '.Object.assign?' { export default Object.assign; }
declare module '.Object.create' { export default create;
	function create<P extends object | null, D extends TypedPropertyDescriptorMap<object> | void> (proto :P,    descriptorMap? :D) :object & ( D extends TypedPropertyDescriptorMap<infer O> ? O : object ) & ( P extends object ? { [K in keyof P] :P[K] } : object );
	type TypedPropertyDescriptorMap<O> = { [K in keyof O] :TypedPropertyDescriptor<O[K]> };
}
declare module '.Object.create?=' { export default create;
	function create<P extends object | null> (proto :P) :P extends object ? object & { [K in keyof P] :P[K] } : object;
}
declare module '.Object.defineProperties' { export default Object.defineProperties; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.defineProperty?' { export default Object.defineProperty; }
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.freeze?' { export default Object.freeze; }
declare module '.Object.getOwnPropertyDescriptor' { export default getOwnPropertyDescriptor;
	function getOwnPropertyDescriptor<O extends {}, P extends string | symbol> (o :O, p :P) :P extends keyof O ? { value :O[P], writable :boolean, enumerable :boolean, configurable :boolean } | { get? () :O[P], set? (v :O[P]) :void, enumerable :boolean, configurable :boolean } : undefined;
}
declare module '.Object.getOwnPropertyDescriptors' { export default Object.getOwnPropertyDescriptors; }
declare module '.Object.getOwnPropertyNames' { export default getOwnPropertyNames;
	function getOwnPropertyNames<T extends {}> (nonNullable :T) :Extract<keyof T, string>[];
}
declare module '.Object.getOwnPropertySymbols?' { export default getOwnPropertySymbols;
	function getOwnPropertySymbols<T extends {}> (nonNullable :T) :Extract<keyof T, symbol>[];
}
declare module '.Object.getPrototypeOf' { export default getPrototypeOf;
	function getPrototypeOf<T extends {}> (nonNullable :T) :T & { [K in keyof T]? :T[K] };
}
declare module '.Object.keys' { export default keys;
	function keys<T extends {}> (nonNullable :T) :Extract<keyof T, string>[];
}
declare module '.Object.prototype' { export default Object.prototype; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.isPrototypeOf' { export default Object.prototype.isPrototypeOf; }
declare module '.Object.prototype.propertyIsEnumerable' { export default Object.prototype.propertyIsEnumerable; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }
declare module '.Object.setPrototypeOf?' { export default Object.setPrototypeOf; }

declare module '.Proxy?' { export default Proxy; }

declare module '.Reflect.apply?' { export default apply;
	function apply<This, Args extends readonly any[], Target extends (this :This, ...args :Args) => any> (target :Target, thisArg :This, args :Args) :Target extends (this :This, ...args :Args) => infer R ? R : never;
}
declare module '.Reflect.get?' { export default Reflect.get; }
declare module '.Reflect.getPrototypeOf?=Object.getPrototypeOf' { export default getPrototypeOf;
	function getPrototypeOf<Target extends object> (target :Target) :Target & { [Key in keyof Target]? :Target[Key] };
}
declare module '.Reflect.ownKeys?' { export default ownKeys;
	function ownKeys<T extends object> (object :T) :Extract<keyof T, string | symbol>[];
}

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype.exec' { export default RegExp.prototype.exec; }
declare module '.RegExp.prototype.test' { export default RegExp.prototype.test; }

declare module '.String.fromCharCode' { export default String.fromCharCode; }
declare module '.String.prototype.match' { export default String.prototype.match; }

declare module '.Symbol.species?' { export default Symbol.species; }
declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }
declare module '.Symbol?' { export default Symbol; }

declare module '.SyntaxError' { export default SyntaxError; }

declare module '.TypeError' { export default TypeError; }

declare module '.WeakMap?' { export default constructor;
	class constructor<K extends object, V> extends WeakMap<K, V> { constructor (entries? :Iterable<{ readonly 0 :K, readonly 1 :V }>) }
}

declare module '.class.isPrimitive' { export default isPrimitive;
	function isPrimitive<T> (value :T) :T extends object ? false : true;
}

declare module '.console.error' { export default console.error; }

declare module '.default' { export default Default;
	function Default<Exports extends { readonly [name :string] :any, readonly default? :Module<Exports> }> (exports :Exports) :Module<Exports>;
	function Default<Statics extends { readonly [name :string] :any, readonly default? :ModuleFunction<Statics, Main> }, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports> & { readonly default :Module<Exports> };
	type ModuleFunction<Statics, Main> = Readonly<Statics & Main> & { readonly default :ModuleFunction<Statics, Main> };
	type Callable = (...args :any) => any;
	type Newable = { new (...args :any) :any };
}
declare module '.default?=' { export default Default;
	function Default<Exports extends { readonly [name :string] :any, readonly default? :Module<Exports> }> (exports :Exports) :Module<Exports>;
	function Default<Statics extends { readonly [name :string] :any, readonly default? :ModuleFunction<Statics, Main> }, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports> & { readonly default :Module<Exports> };
	type ModuleFunction<Statics, Main> = Readonly<Statics & Main> & { readonly default :ModuleFunction<Statics, Main> };
	type Callable = (...args :any) => any;
	type Newable = { new (...args :any) :any };
}

declare module '.document' { export default document; }
declare module '.document.head' { export default document.head; }

declare module '.native' { export default _; const _ :never; }

declare module '.null.prototype' { export default NULL;
	const NULL :object | null;
}

declare module '.undefined' { export default undefined; }
