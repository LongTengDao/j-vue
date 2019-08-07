
declare module '.Array' { export default Array; }
declare module '.Array.isArray' { export default isArray;
	function isArray (value :any) :value is any[] | readonly any[];
}
declare module '.Array.isArray?=' { export default isArray;
	function isArray (value :any) :value is any[] | readonly any[];
}
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }

declare module '.Buffer.from?' { export default Buffer.from; }
declare module '.Buffer.isBuffer' { export default Buffer.isBuffer; }

declare module '.Error' { export default Error; }

declare module '.Map' { export default Map; }

declare module '.Object' { export default Object;
	const Object :{		<T extends object> (value :T) :T;
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
	};
}
declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.create' { export default Object.create; }
declare module '.Object.create?=' { export default Object.create; }
declare module '.Object.defineProperties' { export default Object.defineProperties; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.fromEntries' { export default fromEntries;
	function fromEntries<K extends string | symbol, V extends any> (entries :Iterable<{ readonly 0: K, readonly 1: V }>) :{ [k in K] :V };
}
declare module '.Object.getOwnPropertyDescriptor' { export default Object.getOwnPropertyDescriptor; }
declare module '.Object.is' { export default Object.is; }
declare module '.Object.keys' { export default keys;
	function keys<T extends object> (object :T) :Extract<string, keyof T>[];
}
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }
declare module '.Object.seal' { export default Object.seal; }

declare module '.Proxy' { export default Proxy; }

declare module '.RangeError' { export default RangeError; }

declare module '.ReferenceError' { export default ReferenceError; }

declare module '.Reflect.apply' { export default Reflect.apply; }
declare module '.Reflect.construct' { export default Reflect.construct; }
declare module '.Reflect.defineProperty' { export default Reflect.defineProperty; }
declare module '.Reflect.deleteProperty' { export default Reflect.deleteProperty; }
declare module '.Reflect.ownKeys' { export default ownKeys;
	function ownKeys<T extends object> (object :T) :Extract<string | symbol, keyof T>[];
}
declare module '.Reflect.set' { export default Reflect.set; }

declare module '.RegExp' { export default RegExp; }
declare module '.RegExp.prototype' { export default RegExp.prototype; }

declare module '.Set' { export default Set; }

declare module '.String.fromCodePoint' { export default String.fromCodePoint; }

declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.SyntaxError' { export default SyntaxError; }

declare module '.TypeError' { export default TypeError; }

declare module '.WeakMap' { export default WeakMap; }

declare module '.WeakSet' { export default WeakSet; }

declare module '.default' { export default Default;
	function Default<Exports extends Readonly<{ [key :string] :any, default? :Module<Exports> }>> (exports :Exports) :Module<Exports>;
	function Default<Statics extends Readonly<{ [key :string] :any, default? :ModuleFunction<Statics, Main> }>, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports & { default :Module<Exports> }>;
	type ModuleFunction<Statics, Main> = Readonly<Statics & { default :ModuleFunction<Statics, Main> }> & Main;
	type Callable = (...args :any[]) => any;
	type Newable = { new (...args :any[]) :any };
}
declare module '.default?=' { export default Default;
	function Default<Exports extends Readonly<{ [key :string] :any, default? :Module<Exports> }>> (exports :Exports) :Module<Exports>;
	function Default<Statics extends Readonly<{ [key :string] :any, default? :ModuleFunction<Statics, Main> }>, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = Readonly<Exports & { default :Module<Exports> }>;
	type ModuleFunction<Statics, Main> = Readonly<Statics & { default :ModuleFunction<Statics, Main> }> & Main;
	type Callable = (...args :any[]) => any;
	type Newable = { new (...args :any[]) :any };
}

declare module '.null' { export default NULL;
	const NULL :{
		new<ValueType extends any> () :NULL<ValueType>,
		new () :object,
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
}
declare module '.null.PropertyDescriptor' { export default PropertyDescriptor;
	function PropertyDescriptor<V extends any, W extends boolean, E extends boolean, C extends boolean> (value :V, writable :W, enumerable :E, configurable :C) :{ value :V, writable :W, enumerable :E, configurable :C };
	function PropertyDescriptor<G extends ( () => any ) | undefined, S extends ( (value :any) => void ) | undefined, E extends boolean, C extends boolean> (get :G, set :S, enumerable :E, configurable :C) :{ get :G, set :S, enumerable :E, configurable :C };
}

declare module '.parseInt' { export default parseInt; }

declare module '.private' { export default Private;

	function Private () :{
		(instance :object) :void
		<Private extends object, Public extends object> (instance :Public) :Private
	};
	function Private<_ extends (instance :any) => object> () :_;
	function Private<Private extends object, Public extends object> () :{
		(instance :Public) :Private
	};
}

declare module '.return' { export default RETURN;
	function RETURN<T extends any> (value :T) :T;
}

declare module '.throw.SyntaxError' { export default throwSyntaxError;
	function throwSyntaxError (message? :string) :never;
}

declare module '.undefined' { export default undefined; }
