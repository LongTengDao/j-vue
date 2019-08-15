declare module 'j-vue?*' {
	export const scope :ObjectScope<any> | FunctionScope;
	export const template :string;
	export const render :Render;
	export const staticRenderFns :Render[];
	export * from 'j-vue';
}

declare module 'j-vue' {
	
	export const version :'12.0.0';
	
	export function Identifier () :string;
	
	export const Scope :{
		<Keys extends string> (this :Scope[] | Scope | any, keys :string) :ObjectScope<Keys>
		(this :Scope[] | Scope | any) :FunctionScope
		readonly prototype :null
	};
	export type Scope<Keys extends string | void = void> = Keys extends string ? ObjectScope<Keys> : FunctionScope;
	
	export function Template (html :string, scope :Scope) :string;
	export function Render (code :string, scope? :Scope) :Render;
	export function StaticRenderFns (codes :string[], scope? :Scope) :Render[];
	
	export const STYLE :{ functional :true, render :Render };
	export function Style (css? :string, scope? :Scope) :HTMLStyleElement;
	export function remove (style :HTMLStyleElement) :typeof remove;
	
	export { exports as default };
	const exports :Readonly<{
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
	
}

type Render = <CreateElement extends (...args :any[]) => any> (createElement :CreateElement) => ReturnType<CreateElement>;

type ObjectScope<Keys extends string> = {
	readonly [key in Keys] :string
} & {
	readonly $ :(this :ObjectScope<Keys>, css? :string, media? :string) => ObjectScope<Keys>
	readonly [_] :(string :string) => string
	readonly _ :never
};

type FunctionScope = {
	(...args :any[]) :string
	readonly prototype :Readonly<object>
	readonly $ :(this :FunctionScope, css? :string, media? :string) => FunctionScope
	readonly [_] :(string :string) => string
	readonly _ :never
};

declare const _ :unique symbol;
