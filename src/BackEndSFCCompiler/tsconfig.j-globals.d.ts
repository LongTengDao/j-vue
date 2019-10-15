
declare module '.Array' { export default Array; }
declare module '.Array.isArray?=' { export default isArray;
	function isArray (value :any) :value is readonly any[];
}
declare module '.Array.prototype' { export default Array.prototype; }

declare module '.Buffer.from?' { export default Buffer.from; }
declare module '.Buffer.isBuffer' { export default Buffer.isBuffer; }

declare module '.Date.prototype.valueOf' { export default Date.prototype.valueOf; }

declare module '.Error' { export default Error; }
declare module '.Error?=' { export default Error; }

declare module '.Infinity' { export default Infinity; }

declare module '.Map' { export default constructor;
	class constructor<K, V> extends Map<K, V> {
		constructor (entries? :Iterable<Readonly<{ 0 :K, 1 :V }>>)
	}
}
declare module '.Map.prototype.has?' { export default Map.prototype.has; }

declare module '.Math.floor' { export default Math.floor; }

declare module '.Object' { export default O;
	type O = Object;
	const O :{
		<T extends object> (value :T) :T;
		(value? :undefined | null) :object;
		(value :boolean) :Boolean & object;
		(value :number) :Number & object;
		(value :string) :String & object;
		(value :symbol) :Symbol & object;
		(value :bigint) :BigInt & object;
		new<T extends object> (value :T) :T;
		new (value? :undefined | null) :object;
		new (value :boolean) :Boolean & object;
		new (value :number) :Number & object;
		new (value :string) :String & object;
		new (value :symbol) :Symbol & object;
		new (value :bigint) :BigInt & object;
	} & {
		readonly [Method in keyof typeof Object] :typeof Object[Method];
	};
}
declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.create' { export default create;
	function create<P extends object | null, D extends TypedPropertyDescriptorMap<object> | void> (proto :P,    descriptorMap? :D) :object & ( D extends TypedPropertyDescriptorMap<infer O> ? O : object ) & ( P extends object ? { [K in keyof P] :P[K] } : object );
	type TypedPropertyDescriptorMap<O> = { [K in keyof O] :TypedPropertyDescriptor<O[K]> };
}
declare module '.Object.create?=' { export default create;
	function create<P extends object | null> (proto :P) :P extends object ? object & { [K in keyof P] :P[K] } : object;
}
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.fromEntries' { export default fromEntries;
	function fromEntries<K extends string | symbol, V extends any> (entries :Iterable<Readonly<{ 0 :K, 1 :V }>>) :{ [k in K] :V };
}
declare module '.Object.getOwnPropertyDescriptor' { export default Object.getOwnPropertyDescriptor; }
declare module '.Object.is' { export default Object.is; }
declare module '.Object.keys' { export default keys;
	function keys<T extends object> (object :T) :Extract<string, keyof T>[];
}
declare module '.Object.prototype' { export default Object.prototype; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }
declare module '.Object.seal' { export default Object.seal; }

declare module '.Proxy' { export default Proxy; }

declare module '.RangeError' { export default RangeError; }

declare module '.ReferenceError' { export default ReferenceError; }

declare module '.Reflect.apply' { export default apply;
	function apply<This extends any, Args extends { length :number, [index :number] :any }, Target extends (this :This, ...args :Args & any[]) => any> (target :Target, thisArg :This, args :Readonly<Args>) :Target extends (this :This, ...args :Args & any[]) => infer R ? R : never;
}
declare module '.Reflect.construct' { export default construct;
	function construct<Args extends { length :number, [index :number] :any }, Target extends new (...args :Args & any[]) => any, NewTarget extends new (...args :any) => any> (target :Target, args :Readonly<Args>, newTarget? :NewTarget) :Target extends new (...args :Args & any[]) => infer R ? R : never;
}
declare module '.Reflect.defineProperty' { export default Reflect.defineProperty; }
declare module '.Reflect.deleteProperty' { export default Reflect.deleteProperty; }
declare module '.Reflect.ownKeys' { export default ownKeys;
	function ownKeys<T extends object> (object :T) :Extract<string | symbol, keyof T>[];
}
declare module '.Reflect.set' { export default Reflect.set; }

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype' { export default RegExp.prototype; }
declare module '.RegExp.prototype.test' { export default RegExp.prototype.test; }

declare module '.Set' { export default constructor;
	class constructor<V> extends Set<V> {
		constructor (values? :Iterable<V>)
	}
}
declare module '.Set.prototype.has?' { export default Set.prototype.has; }

declare module '.String.fromCharCode' { export default String.fromCharCode; }
declare module '.String.fromCodePoint' { export default String.fromCodePoint; }

declare module '.Symbol.species?' { export default Symbol.species; }
declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.SyntaxError' { export default SyntaxError; }

declare module '.TypeError' { export default TypeError; }

declare module '.URIError' { export default URIError; }

declare module '.WeakMap' { export default constructor;
	class constructor<K extends object, V> extends WeakMap<K, V> {
		constructor (entries? :Iterable<Readonly<{ 0 :K, 1 :V }>>)
	}
}

declare module '.WeakSet' { export default constructor;
	class constructor<V extends object> extends WeakSet<V> {
		constructor (values? :Iterable<V>)
	}
}

declare module '.class.isDate' { export default isDate;
	function isDate (value :any) :value is Date;
}
declare module '.class.isMap' { export default isMap;
	function isMap (value :any) :value is Map<any, any>;
}
declare module '.class.isPrimitive' { export default isPrimitive;
	function isPrimitive (value :any) :value is undefined | null | boolean | string | symbol | number | bigint;
}
declare module '.class.isRegExp' { export default isRegExp;
	function isRegExp (value :any) :value is RegExp;
}
declare module '.class.isSet' { export default isSet;
	function isSet (value :any) :value is Set<any>;
}

declare module '.console.warn' { export default console.warn; }

declare module '.default' { export default Default;
	function Default<Exports extends Readonly<{ [key :string] :any, default? :Module<Exports> }>> (exports :Exports) :Module<Exports>;
	function Default<Statics extends Readonly<{ [key :string] :any, default? :ModuleFunction<Statics, Main> }>, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports & { default :Module<Exports> }>;
	type ModuleFunction<Statics, Main> = Readonly<Statics & { default :ModuleFunction<Statics, Main> }> & Main;
	type Callable = (...args :any) => any;
	type Newable = { new (...args :any) :any };
}
declare module '.default?=' { export default Default;
	function Default<Exports extends Readonly<{ [key :string] :any, default? :Module<Exports> }>> (exports :Exports) :Module<Exports>;
	function Default<Statics extends Readonly<{ [key :string] :any, default? :ModuleFunction<Statics, Main> }>, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports & { default :Module<Exports> }>;
	type ModuleFunction<Statics, Main> = Readonly<Statics & { default :ModuleFunction<Statics, Main> }> & Main;
	type Callable = (...args :any) => any;
	type Newable = { new (...args :any) :any };
}

declare module '.native' { export default _; const _ :never; }

declare module '.null' { export default NULL;
	const NULL :{
		new<ValueType> () :NULL<ValueType>,
		new () :object,
		<_ extends never, ObjectType extends object> (object :ObjectType) :ObjectType,
		<ValueType> (object :object) :NULL<ValueType>,
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
}
declare module '.null.prototype' { export default NULL;
	const NULL :object | null;
}

declare module '.parseInt' { export default parseInt; }

declare module '.private' { export default Private;
	function Private<_ extends (this :void, instance :any) => object> (Private? :{ new ($ :object) :ReturnType<_> } | { new () :ReturnType<_> } | { (this :void, $ :object) :ReturnType<_> } | { (this :void) :ReturnType<_> } | ReturnType<_>) :_;
	function Private<Public extends object, Private extends object> (Private? :{ new ($ :Public) :Private } | { new () :Private } | { ($ :Public) :Private } | { () :Private } | Private) :(this :void, instance :Public) => Private;
}

declare module '.return' { export default RETURN;
	function RETURN<T extends any> (value :T) :T;
}

declare module '.throw.Error' { export default throwError;
	function throwError (message? :string) :never;
}
declare module '.throw.SyntaxError' { export default throwSyntaxError;
	function throwSyntaxError (message? :string) :never;
}

declare module '.undefined' { export default undefined; }

declare module '.void.KEEP' { export default KEEP;
	function KEEP (...args :any[]) :void;
}
