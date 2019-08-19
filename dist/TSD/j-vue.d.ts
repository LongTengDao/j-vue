declare module 'j-vue?*' {
	export const dynamicScope :DynamicScope;
	export const staticScope :StaticScope<any>;
	export const template :string;
	export const render :Render<any>;
	export const staticRenderFns :Render<any>[];
	export * from 'j-vue';
}

declare module 'j-vue:' {
	export = Options;
	type Options<This> = import('j-vue').Options<This>;
}

declare module 'j-vue' {
	
	export const version :'13.7.0';
	
	export function Identifier () :string;
	
	export const Scope :{
		<Keys extends string> (this :Scope[] | Scope | any, keys :string) :StaticScope<Keys>
		(this :Scope[] | Scope | any) :DynamicScope
		readonly prototype :null
	};
	export type Scope<Keys extends string | void = void> = Keys extends string ? StaticScope<Keys> : DynamicScope;
	
	export function Template (html :string, scope :Scope) :string;
	export function Render (code :string, scope? :Scope) :Render<any>;
	export function StaticRenderFns (codes :string[], scope? :Scope) :Render<any>[];
	
	export const STYLE :{
		readonly functional :true,
		readonly render :<CreateElement extends (this :void, ...args :any[]) => any> (this :void, createElement :CreateElement, context :Readonly<{ data :Readonly<{}>, children :Readonly<any[]> }>) => ReturnType<CreateElement>,
	};
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
	
	export function Options<This> (options :Options<This>) :Options<This>;
	export type Options<This extends { $options? :object }> = {
		[Key in keyof This['$options']] :This['$options'][Key]
	} & {
		data? (this :This) :{ [Key in keyof This]? :This[Key] },
		props? :( keyof This )[] | Exclude<{
			[Key in keyof This]? :{ prototype :object } | { prototype :object }[] | Exclude<{
				type? :{ prototype :object } | { prototype :object }[],
				validator? (this :void, value :any) :value is This[Key],
			} & ( {
				required :true,
				default? :never,
			} | {
				required? :false,
				default? :This[Key] | { (this :void) :This[Key] },
			} ), any[]>
		}, any[]>,
		propsData? :never,
		computed? :{
			[Key in keyof This]? :{
				(this :This) :This[Key]
			} | {
				get (this :This) :This[Key], set (this :This, value :This[Key]) :void
			}
		},
		methods? :{
			[Key in keyof This]? :This[Key] & { (this :This, ...args :any) :any }
		},
		watch? :{
			[Expression :string] :keyof This | {
				(this :This, value :any, oldVal :any) :void | Promise<void>
			} | {
				handler :keyof This | { (this :This, value :any, oldVal :any) :void | Promise<void> },
				deep? :boolean,
				immediate? :boolean,
			} | ( keyof This | {
				(this :This, value :any, oldVal :any) :void | Promise<void>
			} | {
				handler :keyof This | { (this :This, value :any, oldVal :any) :void | Promise<void> },
				deep? :boolean,
				immediate? :boolean,
			} )[]
		},
	} & {
		el? :never,
		renderError?<CreateElement extends (this :void, ...args :any[]) => any> (this :This, createElement :CreateElement, error :Error) :ReturnType<CreateElement>,
	} & {
		[Key in 'beforeCreate' | 'created' | 'beforeMount' | 'mounted' | 'beforeUpdate' | 'updated' | 'activated' | 'deactivated' | 'beforeDestroy' | 'destroyed']? :(this :This) => void | Promise<void>
	} & {
		errorCaptured? (this :This, error :any, vm :any, info :string) :boolean | void,
	} & {
		directives? :object,
		filters? :{ [Key :string] :(this :void, value :any, ...args :any) => any },
		components? :object,
	} & {
		parent? :any,
		mixins? :Options<This>[],
		extends? :Options<This>,
		provide? :{ [key :string] :keyof This } | {
			(this :This) :{ [key :string] :keyof This }
		},
		inject? :( keyof This )[] | Exclude<{ [Key in keyof This]? :any }, any[]>,
	} & {
		name? :string,
		delimiters? :[ '{{', '}}' ],
		model? :{ prop? :keyof This, event? :string },
		inheritAttrs? :boolean,
		comments? :false,
	} & ( {
		functional? :false,
		template :string,
	} | {
		functional? :false,
		render :Render<This>,
		staticRenderFns :Render<This>[],
	} | {
		functional? :false,
		render :Render<This>,
	} | {
		functional :true,
		render<CreateElement extends (this :void, ...args :any[]) => any> (this :void, createElement :CreateElement, context :any) :ReturnType<CreateElement>,
	} );
	
}

type Render<This> = <CreateElement extends (this :void, ...args :any[]) => any> (this :This, createElement :CreateElement) => ReturnType<CreateElement>;

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
