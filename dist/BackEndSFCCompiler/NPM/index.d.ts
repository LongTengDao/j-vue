export = exports;
declare namespace exports {
	
	export const version :'17.0.3';
	
	export class SFC {
		
		constructor (vue :string | Buffer);
		
		bom :'\uFEFF' | '';
		eol :'\n' | '\r\n' | '\r' | '\u2028' | '\u2029' | '';
		tab :string;
		
		readonly script :null | {
			readonly blockName :'script'
			readonly attributes :{ readonly [Name in string]? :string }
			inner? :string
			readonly src? :string
			readonly lang? :string
			innerJS :string
		};
		
		readonly scriptSetup :null | {
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
		
		export (mode :'default', from? :string) :string;
		export (mode :'const' | 'var' | 'let', from? :string | null) :string;
		export (mode :{
			'var' :'const' | 'var' | 'let',
			'?j-vue'? :string,
			'j-vue'? :string | null,
			'map'? :false | 'inline',
			'src'? (src :string) :Promise<string>,
			'lang'? (lang :string, inner :string) :string | Promise<string>,
		}) :Promise<string>;
		export (mode :{
			'var' :'const' | 'var' | 'let',
			'?j-vue'? :string,
			'j-vue'? :string | null,
			'map' :true,
			'src'? (src :string) :Promise<string>,
			'lang'? (lang :string, inner :string) :string | Promise<string>,
		}) :Promise<object & { code :string, map :any }>;
		
	}
	
	export function CSS (this :void, css :string) :string;
	
	export function TSD (this :void, {}? :{ readonly [ID in
		  'j-vue' |
		'*?j-vue' |
		'*?j-vue='
	]? :string }) :string;
	
	export { exports as default };
	
}