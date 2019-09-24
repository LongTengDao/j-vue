
declare module '.Array' { export default Array; }
declare module '.Array.isArray' { export default isArray;
	function isArray (value :any) :value is readonly any[];
}
declare module '.Array.isArray?=' { export default isArray;
	function isArray (value :any) :value is readonly any[];
}
declare module '.Array.prototype' { export default Array.prototype; }
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }

declare module '.Function' { export default Function; }

declare module '.Infinity' { export default Infinity; }

declare module '.Math.floor' { export default Math.floor; }

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
declare module '.Object.preventExtensions' { export default Object.preventExtensions; }
declare module '.Object.prototype' { export default Object.prototype; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }
declare module '.Object.prototype.toString' { export default Object.prototype.toString; }
declare module '.Object.seal' { export default Object.seal; }

declare module '.RegExp' { export default RegExp; }

declare module '.String.fromCharCode' { export default String.fromCharCode; }

declare module '.Symbol.species?' { export default Symbol.species; }
declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.class.isPrimitive' { export default isPrimitive;
	function isPrimitive (value :any) :value is undefined | null | boolean | string | symbol | number | bigint;
}

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

declare module '.document' { export default document; }
declare module '.document.head' { export default document.head; }

declare module '.native' { export default _; const _ :never; }

declare module '.null.PropertyDescriptor' { export default PropertyDescriptor;
	function PropertyDescriptor<V extends any, W extends boolean, E extends boolean, C extends boolean> (value :V, writable :W, enumerable :E, configurable :C) :{ value :V, writable :W, enumerable :E, configurable :C };
	function PropertyDescriptor<G extends ( () => any ) | undefined, S extends ( (value :any) => void ) | undefined, E extends boolean, C extends boolean> (get :G, set :S, enumerable :E, configurable :C) :{ get :G, set :S, enumerable :E, configurable :C };
}
declare module '.null.prototype' { export default NULL;
	const NULL :object | null;
}

declare module '.undefined' { export default undefined; }
