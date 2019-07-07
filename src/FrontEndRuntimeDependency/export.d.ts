export const version :string;

export function Identifier () :string;

export type Scope<Keys extends string = string> = ObjectScope<Keys> | FunctionScope<Keys>;
type ObjectScope<Keys extends string> = {
	readonly [key in Keys] :string
} & {
	readonly $ :<T extends ObjectScope<Keys>> (this :T, css? :string, media? :string) => T
	readonly [_] :(string :string) => string
};
type FunctionScope<Keys extends string = string> = {
	(...args :any[]) :string
	readonly prototype :ObjectScope<Keys>
	readonly $ :<T extends FunctionScope<Keys>> (this :T, css? :string, media? :string) => T
	readonly [_] :(string :string) => string
};
declare const _ :unique symbol;
export function Scope<Keys extends string = string> (this :Scope[] | Scope | any, keys :string) :ObjectScope<Keys>;
export function Scope<Keys extends string = string> (this :Scope[] | Scope | any) :FunctionScope<Keys>;

export function Template (html :string, scope :Scope) :string;

export function Render (code :string, scope? :Scope) :Render;
export function StaticRenderFns (codes :string[], scope? :Scope) :Render[];

export function Style (css? :string, scope? :Scope) :HTMLStyleElement;
export function remove (style :HTMLStyleElement) :typeof remove;

export const STYLE :{ functional :true, render :Render };

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

type Render = <CreateElement extends (...args :any[]) => any> (createElement :CreateElement) => ReturnType<CreateElement>;
