declare module 'j-vue?*' {
	export const scope :ObjectScope<any> | FunctionScope;
	export const template :string;
	export const render :Render;
	export const staticRenderFns :Render[];
	export * from 'j-vue';
}

declare module 'j-vue' {
	
	export const version :'12.2.0';
	
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
	
	export function Options<Instance> (options :Options<Instance>) :Options<Instance>;
	export type Options<Instance extends object & { $options? :object }> = {
		[Key in keyof Instance['$options']] :Instance['$options'][Key]
	} & {
		data? (this :Instance) :object & { [Key in keyof Instance]? :Instance[Key] },
		props? :( keyof Instance )[] | object & { [Key in keyof Instance]? :any },
		propsData? :never,
		computed? :object & {
			[Key in keyof Instance]? :{
			(this :Instance) :Instance[Key]
		} | object & {
			get (this :Instance) :Instance[Key], set (this :Instance, value :Instance[Key]) :void
		}
		},
		methods? :object & {
			[Key in keyof Instance]? :(this :Instance, ...args :any) => any
		},
		watch? :object & {
			[Expression :string] :keyof Instance | {
				(this :Instance, value :any, oldVal :any) :void | Promise<void>
			} | {
				handler :keyof Instance | { (this :Instance, value :any, oldVal :any) :void | Promise<void> },
				deep? :boolean,
				immediate? :boolean,
			} | ( keyof Instance | {
				(this :Instance, value :any, oldVal :any) :void | Promise<void>
			} | {
				handler :keyof Instance | { (this :Instance, value :any, oldVal :any) :void | Promise<void> },
				deep? :boolean,
				immediate? :boolean,
			} )[]
		},
	} & {
		el? :never,
		renderError? :never,
	} & {
		[Key in 'beforeCreate' | 'created' | 'beforeMount' | 'mounted' | 'beforeUpdate' | 'updated' | 'activated' | 'deactivated' | 'beforeDestroy' | 'destroyed']? :(this :Instance) => void | Promise<void>
	} & {
		errorCaptured? (error :any, vm :any, info :string) :boolean | void,
	} & {
		directives? :object,
		filters? :object & { [Key :string] :(this :void, value :any, ...args :any) => any },
		components? :object,
	} & {
		parent? :any,
		mixins? :Options<Instance>[],
		extends? :Options<Instance>,
		provide? :object & { [key :string] :keyof Instance } | {
			(this :Instance) :object & { [key :string] :keyof Instance }
		},
		inject? :( keyof Instance )[] | object & { [Key in keyof Instance]? :any },
	} & {
		name? :string,
		delimiters? :[ '{{', '}}' ],
		model? :object & { prop? :keyof Instance, event? :string },
		inheritAttrs? :boolean,
		comments? :false,
	} & ( {
		functional? :false,
		template :string,
	} | {
		functional? :false,
		render :Render,
		staticRenderFns :Render[],
	} | {
		functional? :false,
		render :Render,
	} | {
		functional :true,
		render :Render,
	} );
	
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
