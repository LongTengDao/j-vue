declare module 'j-vue' {
	
	export const version :string;
	
	export function Identifier () :string;
	
	type ObjectScope = object;
	type FunctionScope = (...args :any[]) => string;
	type Scope = ObjectScope | FunctionScope;
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
	
	type ObjectScope = object;
	type FunctionScope = (...args :any[]) => string;
	type Scope = ObjectScope | FunctionScope;
	export const scope :Scope;
	
	export const template :string;
	
	export const render :Function;
	export const staticRenderFns :Function[];
	
}