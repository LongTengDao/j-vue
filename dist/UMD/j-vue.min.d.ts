export as namespace jVue;
export = exports;

declare const exports :{
	version :'9.0.0'
	
	Identifier () :string
	
	Scope<Keys extends string = string> (this :Scope[] | Scope | any, keys :string) :ObjectScope<Keys>
	Scope<Keys extends string = string> (this :Scope[] | Scope | any) :FunctionScope<Keys>
	
	Template (html :string, scope :Scope) :string
	
	Render (code :string, scope? :Scope) :Function
	StaticRenderFns (codes :string[], scope? :Scope) :Function[]
	
	Style (css? :string, scope? :Scope) :HTMLStyleElement
	remove :typeof remove
	
	STYLE :{ functional :true, render :Function }
	
	default :typeof exports
};

type Scope<Keys extends string = string> = ObjectScope<Keys> | FunctionScope<Keys>;
type ObjectScope<Keys extends string> = {
	readonly [key in Keys] :string
} & {
	readonly [_] :(string :string) => string
};
type FunctionScope<Keys extends string = string> = {
	(...args :any[]) :string
	readonly prototype :ObjectScope<Keys>
	readonly [_] :(string :string) => string
};
declare const _ :unique symbol;

declare function remove (style :HTMLStyleElement) :typeof remove;
