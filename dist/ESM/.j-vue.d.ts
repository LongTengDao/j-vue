export const version :'13.0.0';

export function Identifier () :string;

export const Scope :{
	<Keys extends string> (this :Scope[] | Scope | any, keys :string) :StaticScope<Keys>
	(this :Scope[] | Scope | any) :DynamicScope
	readonly prototype :null
};
export type Scope<Keys extends string | void = void> =
	Keys extends string
		? StaticScope<Keys>
		: DynamicScope;
type StaticScope<Keys extends string> = {
	readonly [key in Keys] :string
} & {
	readonly $ :(this :StaticScope<Keys>, css? :string, media? :string) => StaticScope<Keys>
	readonly [_] :(string :string) => string
	readonly _ :never
};
type DynamicScope = {
	(...args :any[]) :string
	readonly prototype :Readonly<object>
	readonly $ :(this :DynamicScope, css? :string, media? :string) => DynamicScope
	readonly [_] :(string :string) => string
	readonly _ :never
};
declare const _ :unique symbol;

export function Template (html :string, scope :Scope) :string;
export function Render (code :string, scope? :Scope) :Render;
export function StaticRenderFns (codes :string[], scope? :Scope) :Render[];

type Render = <CreateElement extends (...args :any[]) => any> (createElement :CreateElement) => ReturnType<CreateElement>;

export const STYLE :{ functional :true, render :Render };
export function Style (css? :string, scope? :Scope) :HTMLStyleElement;
export function remove (style :HTMLStyleElement) :typeof remove;

export default exports;
declare const exports :Readonly<{
	version :typeof version
	Identifier :typeof Identifier
	Scope :typeof Scope
	Template :typeof Template
	Render :typeof Render
	StaticRenderFns :typeof StaticRenderFns
	STYLE :typeof STYLE
	Style :typeof Style
	remove :typeof remove
	default :typeof exports
}>;
