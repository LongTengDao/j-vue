
declare module 'j-vue' {
	
	export const version :'9.0.2';
	
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
	
}

declare module 'j-vue?*' {
	
	export * from 'j-vue';
	
	import { Scope } from 'j-vue';
	export const scope :Scope;
	
	export const template :string;
	
	export const render :Function;
	export const staticRenderFns :Function[];
	
}
