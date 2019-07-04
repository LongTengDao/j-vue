
declare module 'j-vue' {
	
	export const version :'9.0.5';
	
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
	const _ :unique symbol;
	export function Scope<Keys extends string = string> (this :Scope[] | Scope | any, keys :string) :ObjectScope<Keys>;
	export function Scope<Keys extends string = string> (this :Scope[] | Scope | any) :FunctionScope<Keys>;
	
	export function Template (html :string, scope :Scope) :string;
	
	export function Render (code :string, scope? :Scope) :Function;
	export function StaticRenderFns (codes :string[], scope? :Scope) :Function[];
	
	export function Style (css? :string, scope? :Scope) :HTMLStyleElement;
	export function remove (style :HTMLStyleElement) :typeof remove;
	
	export const STYLE :{ functional :true, render :Function };
	
}

declare module 'j-vue?*' {
	
	export * from 'j-vue';
	
	import { Scope } from 'j-vue';
	export const scope :Scope;
	
	export const template :string;
	
	export const render :Function;
	export const staticRenderFns :Function[];
	
}
