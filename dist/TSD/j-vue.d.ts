type scope = object | ( (value :string | object | any[]) => string );

declare module 'j-vue' {
	
	export const version :string;
	
	export function Identifier () :string;
	
	export function Scope (keys :string) :object;
	export function Scope () :(value :string | object | any[]) => string;
	
	export function Template (html :string, scope :scope) :string;
	
	export function Render (code :string, scope? :scope) :Function;
	export function StaticRenderFns (codes :string[], scope? :scope) :Function[];
	
	export function Style (css? :string, scope? :scope) :HTMLStyleElement;
	export function remove (style :HTMLStyleElement) :typeof remove;
	
	export const STYLE :{ functional :true, render :Function };
	
}

declare module 'j-vue?*' {
	export * from 'j-vue';
	export const scope :scope;
	export const template :string;
	export const render :Function;
	export const staticRenderFns :Function[];
}