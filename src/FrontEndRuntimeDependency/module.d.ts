declare module '*?j-vue=' {
	export const style :string;
	export const styles :string[];
	export const delimiters :[ '{{', '}}' ];
	export const template :string;
	export const Render :jVue.Render3Constructor;
	export const render :jVue.Render2;
	export const staticRenderFns :jVue.Render2[];
	
	import type * as jVue from 'j-vue';
}

declare module '*?j-vue' {
	export { Identifier, Scope, Style, remove, Component, mixin, prop } from 'j-vue';
	
	export const scopeFunction :jVue.Scope<void>;
	export const scopeObject :jVue.Scope<string>;
	export const delimiters :[ '{{', '}}' ];
	export const template :string;
	export const Render :jVue.Render3Constructor;
	export const render :jVue.Render2;
	export const staticRenderFns :jVue.Render2[];
	
	import type * as jVue from 'j-vue';
}

declare module 'j-vue' {
	export type _Vue = Vue$;
	export type {
		SubComponent as _Component,
		ObjectAPI as _ObjectAPI,
	};
	
	export const version :string;
	
	export function Identifier () :string;
	
	export const Scope :{
		<Keys extends string> (this :void | Scope<string | void> | readonly Scope<string | void>[], keys :string) :Scope<Keys>;
		                      (this :void | Scope<string | void> | readonly Scope<string | void>[]              ) :Scope<void>;
		readonly prototype :null;
	};
	export type Scope<Keys extends string | void> = (
		Keys extends string ? { readonly [Key in Keys] :string } :
		Keys extends void ? { (...args :any) :string; readonly prototype? :{ readonly [key :string] :string }; } :
	never ) & {
		readonly $ :<T extends Scope<string | void>> (this :T, css? :string, media? :string) => T;
		readonly [_]? :(string :string) => string;
		readonly _? :(string :string) => string;
	};
	const _ :unique symbol;
	
	export function Template (html :string, scope :Scope<string | void>) :string;
	export function Render (code :string, scope? :Scope<string | void>) :Render2 | Render3Constructor;
	export function StaticRenderFns (codes :readonly string[], scope? :Scope<string | void>) :Render2[];
	export type Render3Constructor = {
		new (Vue3 :Vue3) :Render3;
		readonly shadow? :string;
		readonly sheet? :{ readonly [Ref in string] :(this :Vue, self :Vue) => string };
	};
	export type Render3 = { (this :Vue) :VNode | ( VNode | string )[] };
	export type Render2 = { (this :Vue, h :$createElement) :VNode, _withStripped? :unknown };
	type $createElement = {
		(this :void, type :string | NonArray, props? :NonArray | null, children? :( VNode | string )[]) :VNode;
		(this :void, type :string | NonArray,                          children  :( VNode | string )[]) :VNode;
	};
	type VNode = NonArray;
	type NonArray<T extends object = { [name :string] :unknown }> = { readonly [index :number] :never } & T;
	
	export function Style (css? :string, scope? :Scope<string | void>) :HTMLStyleElement;
	export function remove (style :HTMLStyleElement) :typeof remove;
	
	export abstract class Component<Sub extends SubComponent<Sub>> extends SubComponent<Sub> { protected constructor () }
	export function mixin<Mixins extends object = object> (...mixins :( ClassAPI | ObjectAPI )[]) :
		{ [Name in keyof typeof Component] :typeof Component[Name] } &
		{ readonly [_mixins] :readonly ( ClassAPI | ObjectAPI )[] } &
		{ new<Sub extends Component<Sub>> () :
			Component<Sub> &
			{ [Name in OwnKeys<Mixins>] :Mixins[Name] }
		};
	const _mixins :unique symbol;
	
	export const prop :Readonly<{
		beforeMount (el :Element, binding :{ arg? :any, value? :any }) :void,
		bind (el :Element, binding :{ arg? :any, value? :any }) :void,
		
		updated (el :Element, binding :{ arg? :any, value? :any }) :void,
		componentUpdated (el :Element, binding :{ arg? :any, value? :any }) :void,
	}>;
	
	export { exports as default };
	const exports :Readonly<{
		version :typeof version,
		Identifier :typeof Identifier,
		Scope :typeof Scope,
		Template :typeof Template,
		Render :typeof Render,
		StaticRenderFns :typeof StaticRenderFns,
		Style :typeof Style,
		remove :typeof remove,
		Component :typeof Component,
		mixin :typeof mixin,
		prop :typeof prop,
		default :typeof exports,
	}>;
	
	type ClassAPI = typeof AnyComponent;
	abstract class AnyComponent<Sub extends SubComponent<Sub>> extends SubComponent<Sub> {
		protected constructor ();
		get _data () :any;
		get _inject () :any;
		get _props () :any;
		get _directives () :any;
	}
	abstract class SubComponent<Sub extends Vue> extends Vue {
		
		protected _beforeCreated? () :void | Promise<void>;
		protected _created? () :void | Promise<void>;
		protected _beforeMount? () :void | Promise<void>;
		protected _mounted? () :void | Promise<void>;
		protected _beforeUpdate? () :void | Promise<void>;
		protected _updated? () :void | Promise<void>;
		protected _activated? () :void | Promise<void>;
		protected _deactivated? () :void | Promise<void>;
		protected _beforeUnmount? () :void | Promise<void>;
		protected _unmounted? () :void | Promise<void>;
		/**@deprecated*/
		protected _beforeDestroy? () :void | Promise<void>;
		/**@deprecated*/
		protected _destroyed? () :void | Promise<void>;
		
		protected _render? () :VNode | ( VNode | string )[];
		protected _provide? () :{ [key :string] :unknown };
		
		get _data () :void | readonly OwnNames<Sub>[];
		get _inject () :void | Inject<Sub>;
		get _props () :void | Props<Sub>;
		get _directives () :void | Directives<Sub>;
		
		static readonly data :void;
		static readonly directives :void | Directives<Vue>;
		static readonly provide :void | { [key :string] :unknown };
		
		static render :void | Render2 | Render3;
		
		static readonly Render :void | Render3Constructor;
		static readonly staticRenderFns :void | readonly Render2[];
		static readonly template :void | string;
		static readonly delimiters :void | [ string, string ];
		static readonly inheritAttrs :void | boolean;
		static readonly components :void | { readonly [name :string] :ClassAPI | ObjectAPI };
		static readonly emits :void | Emits;
		
		static readonly _ :(this :ClassAPI, Vue3? :Vue3, __dev__? :{
			readonly [Error in
				| 'proto'
				| 'compile_name'
				| 'compile_props'
				| 'compile_emits'
				| 'compile_is'
				| 'compile_layer'
				| 'compile_reserved'
				| 'compile_redefined'
				| 'compile_overwrite'
				| 'compile_type'
				| 'compile_symbol'
				| 'compile_shadow'
				| 'runtime_shadow'
				| 'runtime_redefined'
				| 'runtime_symbol'
				| 'runtime_reserved'
				| 'runtime_enumerable'
				| 'runtime_data'
			]? :string
		}) => ObjectAPI;
		protected constructor (Vue3? :Vue3);
		
		private _Render :void;
		
		private _staticRenderFns :void;
		private _template :void;
		private _delimiters :void;
		private _inheritAttrs :void;
		private _components :void;
		private _emits :void;
		
		private _mixins :void;
		private _extends :void;
		private _watch :void;
		private _methods :void;
		private _computed :void;
		private _setup :void;
		
		/**@deprecated*/
		private _filters :void;
		/**@deprecated*/
		private _comments :void;
		/**@deprecated*/
		private _functional :void;
		/**@deprecated*/
		private _propsData :void;
		/**@deprecated*/
		private _model :void;
		
		private static readonly beforeCreated :void;
		private static readonly created :void;
		private static readonly beforeMount :void;
		private static readonly mounted :void;
		private static readonly beforeUpdate :void;
		private static readonly updated :void;
		private static readonly activated :void;
		private static readonly deactivated :void;
		private static readonly beforeUnmount :void;
		private static readonly unmounted :void;
		/**@deprecated*/
		private static readonly beforeDestroy :void;
		/**@deprecated*/
		private static readonly destroyed :void;
		
		private static readonly inject :void;
		private static readonly props :void;
		
		private static readonly mixins :void;
		private static readonly extends :void;
		private static readonly watch :void;
		private static readonly methods :void;
		private static readonly computed :void;
		private static readonly setup :void;
		
		/**@deprecated*/
		private static readonly filters :void;
		/**@deprecated*/
		private static readonly comments :void;
		/**@deprecated*/
		private static readonly functional :void;
		/**@deprecated*/
		private static readonly propsData :void;
		/**@deprecated*/
		private static readonly model :void;
		
	}
	
	type OwnNames<T> = Extract<OwnKeys<T>, string>;
	type OwnKeys<T> = Exclude<keyof T,
		'_beforeCreated' | '_created' | '_beforeMount' | '_mounted' | '_beforeUpdate' | '_updated' | '_activated' | '_deactivated' | '_beforeUnmount' | '_unmounted' | '_beforeDestroy' | '_destroyed' |
		'_render' | '_provide' |
		'_inject' | '_props' | '_directives' |
		'_Render' |
		'_staticRenderFns' | '_template' | '_inheritAttrs' | '_components' | '_emits' | '_mixins' |
		'_extends' | '_data' | '_watch' | '_methods' | '_computed' | '_setup' |
		'_delimiters' |
		'_filters' | '_comments' | '_functional' | '_propsData' | '_model' |
		'_' |
		'$emit' |
		'$watch' |
		'$nextTick' |
		'$forceUpdate' |
		'$scopedSlots' | '$options' | '$parent' | '$slots' | '$attrs' | '$refs' | '$root' |
		'$el' |
		'$data' | '$props' |
		'$createElement' |
		'$children' | '$listeners' | '$destroy' | '$delete' | '$mount' | '$once' | '$set' | '$off' | '$on' |
		'$'
		>;
	
	const Vue :{ new () :Vue };
	type Vue = Readonly<Vue_>;
	abstract class Vue_ extends Vue$ { private _? :never }
	abstract class Vue$ {
		
		$emit (this :this, event :string, ...args :unknown[]) :this;
		
		$watch        (this :this, exp :string                          , cb :<Value> (this :this, value :Value, oldValue  :Value) => void | Promise<void>, options? :{ deep? :boolean, immediate? :false  , flush? :'pre' | 'post' | 'sync' }) :{ () :void };
		$watch        (this :this, exp :string                          , cb :<Value> (this :this, value :Value, oldValue? :Value) => void | Promise<void>, options? :{ deep? :boolean, immediate? :boolean, flush? :'pre' | 'post' | 'sync' }) :{ () :void };
		$watch<Value> (this :this, fn :(this :this, self :this) => Value, cb :        (this :this, value :Value, oldValue  :Value) => void | Promise<void>, options? :{ deep? :boolean, immediate? :false  , flush? :'pre' | 'post' | 'sync' }) :{ () :void };
		$watch<Value> (this :this, fn :(this :this, self :this) => Value, cb :        (this :this, value :Value, oldValue? :Value) => void | Promise<void>, options? :{ deep? :boolean, immediate? :boolean, flush? :'pre' | 'post' | 'sync' }) :{ () :void };
		
		$nextTick (this :this, callback :(this :this) => void | Promise<void>) :void;
		$nextTick () :Promise<void>;
		
		$forceUpdate (this :this) :void;
		
		$options :Readonly<ObjectAPI>;
		$scopedSlots? :ScopedSlots;
		$slots? :ScopedSlots;
		$parent? :Vue;
		$root :Vue;
		$attrs :{ readonly [name :string] :unknown };
		$refs :{ readonly [name :string] :unknown };
		$el? :null | Element | Comment | Text;
		
		/**@deprecated*/
		$createElement? :$createElement;
		
		/**@deprecated*/
		private $isServer? :never;
		/**@deprecated*/
		private $children? :never;
		/**@deprecated*/
		private $listeners? :never;
		/**@deprecated*/
		private $destroy? :never;
		/**@deprecated*/
		private $delete? :never;
		/**@deprecated*/
		private $mount? :never;
		/**@deprecated*/
		private $once? :never;
		/**@deprecated*/
		private $set? :never;
		/**@deprecated*/
		private $off? :never;
		/**@deprecated*/
		private $on? :never;
		
		private $props? :never;
		private $data? :never;
		private $? :never;
		
	}
	
	type Props<This extends Vue> =
		readonly Exclude<OwnNames<This>, 'key' | 'ref'>[] |
		NonArray<{
			[Key in Exclude<OwnNames<This>, 'key' | 'ref'>]? :
			ConstructorType<This[Key]> | ConstructorType<This[Key]>[] |
			NonArray<{
				type? :ConstructorType<This[Key]> | ConstructorType<This[Key]>[],
				validator? (value :unknown) :value is This[Key],
			} & ( {
				default? :This[Key] extends object ? { (this :void, props? :{ readonly [name :string] :unknown }) :This[Key] } : This[Key] | { (this :void, props? :{ readonly [name :string] :unknown }) :This[Key] },
				required? :false,
			} | {
				default? :never,
				required? :boolean,
			})>
		}>;
	type ConstructorType<T> = {
		new (...args :any) :
			T extends boolean ? Boolean :
			T extends number ? Number :
			T extends string ? String :
			T extends symbol ? Symbol :
			T extends bigint ? BigInt :
			T
	};
	
	type Inject<This extends Vue> =
		readonly OwnNames<This>[] |
		NonArray<{
			[Key in OwnKeys<This>]? :
			string | symbol |
			{
				from? :string | symbol,
				default? :This[Key] extends object ? { (this :void) :This[Key] } : This[Key] | { (this :void) :This[Key] },
			}
		}>;
	
	type Emits =
		readonly string[] |
		NonArray<{ [event :string] :null | { (this :void, ...args :readonly unknown[]) :boolean } }>;
	
	type Directives<This extends Vue> = { [name :string] :Directive<This> };
	type Directive<This extends Vue> =
		{
			(
				this :void,
				el :Element,
				binding :{
					/**@deprecated*/
					readonly expression? :undefined,
					/**@deprecated*/
					readonly name? :undefined,
					readonly instance :This,
					readonly value? :unknown,
					readonly oldValue? :unknown,
					readonly arg? :unknown,
					readonly modifiers :{ readonly [Modifier in string]? :true },
					readonly dir :Directive<This>,
				} | {
					/**@deprecated*/
					readonly expression? :string,
					/**@deprecated*/
					readonly name :string,
					readonly instance? :undefined,
					readonly value? :unknown,
					readonly oldValue? :unknown,
					readonly arg? :unknown,
					readonly modifiers :{ readonly [Modifier in string]? :true },
					readonly dir? :undefined,
				},
				vNode :VNode & { /**@deprecated*/ readonly context? :This },
				previousVNode? :VNode & { /**@deprecated*/ readonly context? :This },
			) :void | Promise<void>
		} | {
			[Hook in 'beforeMount' | 'mounted'  | 'beforeUpdate' | 'updated'                     | 'beforeUnmount' | 'unmounted']? :{
				(
					this :void,
					el :Element,
					binding :{
						/**@deprecated*/
						readonly expression? :void,
						/**@deprecated*/
						readonly name? :void,
						readonly instance :This,
						readonly value? :unknown,
						readonly oldValue? :Hook extends 'beforeUpdate' | 'updated' ? unknown : void,
						readonly arg? :unknown,
						readonly modifiers :{ readonly [Modifier in string]? :true },
						readonly dir :Directive<This>,
					},
					vNode :VNode & { /**@deprecated*/ readonly context? :void },
					previousVNode :Hook extends 'beforeUpdate' | 'updated' ? VNode & { /**@deprecated*/ readonly context? :void } : void,
				) :void | Promise<void>
			}
		} & {
			/**@deprecated*/
			[Hook in 'bind'        | 'inserted'                  | 'update'  | 'componentUpdated'                  | 'unbind'   ]? :{
				(
					this :void,
					el :Element,
					binding :{
						/**@deprecated*/
						readonly expression? :string,
						/**@deprecated*/
						readonly name :string,
						readonly instance? :void,
						readonly value? :unknown,
						readonly oldValue? :Hook extends 'update' | 'componentUpdated' ? unknown : void,
						readonly arg? :unknown,
						readonly modifiers :{ readonly [Modifier in string]? :true },
						readonly dir? :void,
					},
					vNode :VNode & { /**@deprecated*/ readonly context :This },
					previousVNode :Hook extends 'update' | 'componentUpdated' ? VNode & { /**@deprecated*/ readonly context :This } : void,
				) :void | Promise<void>
			}
		};
	
	type ScopedSlots = {
		readonly [Name in string]? :(this :void, arg :unknown) => readonly VNode[] | undefined
	};
	
	interface ObjectAPI {
		
		inheritAttrs? :boolean,
		template? :string,
		render? :Render2 | Render3,
		staticRenderFns? :Render2[],
		directives? :Directives<Vue>,
		components? :{ [name :string] :ObjectAPI },
		provide? :
			{ [key :string] :unknown } |
			{ (this :Vue) :{ [key :string] :unknown } },
		emits? :Emits,
		
		inject? :Inject<Vue>,
		props? :Props<Vue>,
		
		/**@deprecated*/
		filters? :void,
		/**@deprecated*/
		comments? :void,
		/**@deprecated*/
		functional? :void,
		/**@deprecated*/
		propsData? :void,
		/**@deprecated*/
		model? :void,
		
		beforeCreated? (this :Vue) :void | Promise<void>,
		created? (this :Vue) :void | Promise<void>,
		beforeMount? (this :Vue) :void | Promise<void>,
		mounted? (this :Vue) :void | Promise<void>,
		beforeUpdate? (this :Vue) :void | Promise<void>,
		updated? (this :Vue) :void | Promise<void>,
		activated? (this :Vue) :void | Promise<void>,
		deactivated? (this :Vue) :void | Promise<void>,
		beforeUnmount? (this :Vue) :void | Promise<void>,
		unmounted? (this :Vue) :void | Promise<void>,
		/**@deprecated*/
		beforeDestroy? (this :Vue) :void | Promise<void>,
		/**@deprecated*/
		destroyed? (this :Vue) :void | Promise<void>,
		
		delimiters? :[ string, string ],
		
		extends? :ObjectAPI,
		data? (this :Vue, self :Vue) :{ [name :string] :unknown },
		watch? :{
			[exp :string] :
				{ <Value> (this :Vue, value :Value, oldValue? :Value) :void | Promise<void> } |
				{
					handler<Value> (this :Vue, value :Value, oldValue? :Value) :void | Promise<void>,
					deep? :boolean,
					immediate? :boolean,
					flush? :'pre' | 'post' | 'sync',
				}
		},
		methods? :{ [name :string] :{ (this :Vue, ...args :unknown[]) :any } },
		computed? :{
			[name :string] :
				{ (this :Vue, self :Vue) :unknown } |
				{
					get? (this :Vue, self :Vue) :unknown,
					set? (this :Vue, value :unknown) :void | Promise<void>,
				}
		},
		setup? (
			this :void,
			props :{ readonly [name :string] :unknown },
			{} :{
				readonly attrs :{ readonly [name :string] :unknown },
				readonly slots :ScopedSlots,
				readonly emit :(this :void, event :string, ...args :unknown[]) => void,
			},
		) :{ [name :string] :unknown } | Render3,
		
		mixins? :ObjectAPI[],
		
	}
	
	export type Vue3 = Readonly<{
		h (this :void, type :string | NonArray, props? :NonArray | null, children? :( VNode | string )[] | { (this :void, arg :unknown) :VNode[] | undefined } | { [name :string] :{ (this :void, arg :unknown) :VNode[] | undefined } }) :VNode;
		h (this :void, type :string | NonArray,                          children  :( VNode | string )[] | { (this :void, arg :unknown) :VNode[] | undefined }                                                                          ) :VNode;
	} & { [API in
		| 'BaseTransition'
		| 'Comment'
		| 'Fragment'
		| 'KeepAlive'
		| 'Static'
		| 'Suspense'
		| 'Teleport'
		| 'Text'
		| 'Transition'
		| 'TransitionGroup'
		| 'callWithAsyncErrorHandling'
		| 'callWithErrorHandling'
		| 'camelize'
		| 'capitalize'
		| 'cloneVNode'
		| 'compile'
		| 'computed'
		| 'createApp'
		| 'createBlock'
		| 'createCommentVNode'
		| 'createHydrationRenderer'
		| 'createRenderer'
		| 'createSSRApp'
		| 'createSlots'
		| 'createStaticVNode'
		| 'createTextVNode'
		| 'createVNode'
		| 'customRef'
		| 'defineAsyncComponent'
		| 'defineComponent'
		| 'getCurrentInstance'
		| 'getTransitionRawChildren'
		| 'handleError'
		| 'hydrate'
		| 'initCustomFormatter'
		| 'inject'
		| 'isProxy'
		| 'isReactive'
		| 'isReadonly'
		| 'isRef'
		| 'isVNode'
		| 'markRaw'
		| 'mergeProps'
		| 'nextTick'
		| 'onActivated'
		| 'onBeforeMount'
		| 'onBeforeUnmount'
		| 'onBeforeUpdate'
		| 'onDeactivated'
		| 'onErrorCaptured'
		| 'onMounted'
		| 'onRenderTracked'
		| 'onRenderTriggered'
		| 'onUnmounted'
		| 'onUpdated'
		| 'openBlock'
		| 'popScopeId'
		| 'provide'
		| 'proxyRefs'
		| 'pushScopeId'
		| 'queuePostFlushCb'
		| 'reactive'
		| 'readonly'
		| 'ref'
		| 'registerRuntimeCompiler'
		| 'render'
		| 'renderList'
		| 'renderSlot'
		| 'resolveComponent'
		| 'resolveDirective'
		| 'resolveDynamicComponent'
		| 'resolveTransitionHooks'
		| 'setBlockTracking'
		| 'setDevtoolsHook'
		| 'setTransitionHooks'
		| 'shallowReactive'
		| 'shallowReadonly'
		| 'shallowRef'
		| 'ssrContextKey'
		| 'ssrUtils'
		| 'toDisplayString'
		| 'toHandlers'
		| 'toRaw'
		| 'toRef'
		| 'toRefs'
		| 'transformVNodeArgs'
		| 'triggerRef'
		| 'unref'
		| 'useCssModule'
		| 'useCssVars'
		| 'useSSRContext'
		| 'useTransitionState'
		| 'vModelCheckbox'
		| 'vModelDynamic'
		| 'vModelRadio'
		| 'vModelSelect'
		| 'vModelText'
		| 'vShow'
		| 'version'
		| 'warn'
		| 'watch'
		| 'watchEffect'
		| 'withCtx'
		| 'withDirectives'
		| 'withKeys'
		| 'withModifiers'
		| 'withScopeId'
	] :any }>;
	
}
