export = exports;
declare namespace exports {
	
	export const version :'22.0.0';
	
	export class SFC {
		
		constructor (vue :string | Buffer);
		
		bom :'\uFEFF' | '';
		eol :'\n' | '\r\n' | '\r' | '\u2028' | '\u2029' | '';
		tab :string;
		
		script :null | {
			readonly blockName :'script'
			readonly attributes :{ readonly [Name in string]? :string }
			inner? :string
			readonly src? :string
			readonly lang? :string
			innerJS :string
		};
		
		scriptSetup :null | {
			readonly blockName :'script'
			readonly attributes :{ readonly [Name in string]? :string }
			inner :string
			readonly lang? :string
			innerJS :string
		};
		
		readonly styles :Array<{
			readonly blockName :'style'
			readonly attributes :{ readonly [Name in string]? :string }
			inner? :string
			readonly src? :string
			readonly lang? :string
			innerCSS :string
		}>;
		
		readonly template :null | {
			readonly blockName :'template'
			readonly attributes :{ readonly [Name in string]? :string }
			inner? :string
			readonly src? :string
			readonly lang? :string
			innerHTML :string
		};
		
		readonly customBlocks :Array<{
			readonly blockName :string
			readonly attributes :{ readonly [Name in string]? :string }
			inner? :string
			readonly src? :string
			readonly lang? :string
		}>;
		
		export (mode :'default') :string;
		export (mode :'const' | 'var' | 'let', from? :string | null) :Promise<object & { ports :string[] | null, code :string }>;
		export (mode :{
			'var' :'const' | 'var' | 'let',
			'?j-vue'? :string,
			'j-vue'? :string | null,
			'map'? :false | 'inline',
			'src'? (src :string) :Promise<string>,
			'lang'? (lang :string, inner :string) :string | Promise<string>,
		}) :Promise<object & { ports :string[] | null, code :string }>;
		export (mode :{
			'var' :'const' | 'var' | 'let',
			'?j-vue'? :string,
			'j-vue'? :string | null,
			'map' :true,
			'src'? (src :string) :Promise<string>,
			'lang'? (lang :string, inner :string) :string | Promise<string>,
		}) :Promise<object & { ports :string[] | null, code :string, map :any }>;
		
	}
	
	export function TSD (this :void, ids? :{ readonly [ID in
		|   'j-vue'
		| '*?j-vue'
		| '*?j-vue='
	]? :string }) :string;
	
	export const DOT :string;
	
	export { exports as default };
	
}