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