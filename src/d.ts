declare module 'j-vue' {
	
	export const version :string;
	
	export function Identifier () :string;
	
	export function Scope () :Function;
	export function Scope (keys :string) :object;
	
	export function Template (html: string, scope :Function | object) :string;
	export function Render (code :string, scope? :Function | object) :Function;
	export function StaticRenderFns (codes :string[], scope? :Function | object) :Function[];
	
	export const STYLE :object;
	
	export function Style (css? :string, scope? :Function | object) :HTMLStyleElement;
	
	export function remove (style :HTMLStyleElement) :typeof remove;
	
}

declare module '?template' {
	export const template :string;
	export * from 'j-vue';
}

declare module '?scope&template' {
	export const scope :Function;
	export const template :string;
	export * from 'j-vue';
}

declare module '?template&scope' {
	export const template :string;
	export const scope :Function;
	export * from 'j-vue';
}

declare module '?render&staticRenderFns' {
	export const render :Function;
	export const staticRenderFns :Function[];
	export * from 'j-vue';
}

declare module '?scope&render&staticRenderFns' {
	export const scope :Function;
	export const render :Function;
	export const staticRenderFns :Function[];
	export * from 'j-vue';
}

declare module '?render&staticRenderFns&scope' {
	export const render :Function;
	export const staticRenderFns :Function[];
	export const scope :Function;
	export * from 'j-vue';
}
