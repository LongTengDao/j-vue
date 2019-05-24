export const version :string;

export function Identifier () :string;

export type Scope = ObjectScope | FunctionScope;
type ObjectScope = {
	[key :string] :string
};
type FunctionScope = {
	(...args :any[]) :string
	prototype :ObjectScope
	_ :(string :string) => string
};
export function Scope (this :Scope[] | Scope | any, keys :string) :ObjectScope;
export function Scope (this :Scope[] | Scope | any) :FunctionScope;

export function Template (html :string, scope :Scope) :string;

export function Render (code :string, scope? :Scope) :Function;
export function StaticRenderFns (codes :string[], scope? :Scope) :Function[];

export function Style (css? :string, scope? :Scope) :HTMLStyleElement;
export function remove (style :HTMLStyleElement) :typeof remove;

export const STYLE :{ functional :true, render :Function };

export default exports;
declare const exports :{
	version :typeof version
	Identifier :typeof Identifier
	Scope :typeof Scope
	Template :typeof Template
	Render :typeof Render
	StaticRenderFns :typeof StaticRenderFns
	Style :typeof Style
	remove :typeof remove
	STYLE :typeof STYLE
	default :typeof exports
};
