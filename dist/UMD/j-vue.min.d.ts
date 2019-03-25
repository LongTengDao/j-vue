export = exports;

declare const exports :{
	version :'8.9.0'
	
	Identifier () :string
	
	Scope (this :Scope[] | Scope | any, keys :string) :ObjectScope
	Scope (this :Scope[] | Scope | any) :FunctionScope
	
	Template (html :string, scope :Scope) :string
	
	Render (code :string, scope? :Scope) :Function
	StaticRenderFns (codes :string[], scope? :Scope) :Function[]
	
	Style (css? :string, scope? :Scope) :HTMLStyleElement
	remove :typeof remove
	
	STYLE :{ functional :true, render :Function }
	
	default :typeof exports
};

type Scope = ObjectScope | FunctionScope;
type ObjectScope = {
	_ :(string :string) => string
};
type FunctionScope = {
	(...args :any[]) :string
	prototype :ObjectScope
	_ :(string :string) => string
};

declare function remove (style :HTMLStyleElement) :typeof remove;
