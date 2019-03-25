export const version :'8.9.0';

export function Identifier () :string;

export type Scope = ObjectScope | FunctionScope;
type ObjectScope = {
	_ :(string :string) => string
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
