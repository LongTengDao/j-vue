export = exports;
declare namespace exports {
	
	export const version :'14.13.1';
	
	export class SFC {
		
		constructor (vue :string | Buffer);
		
		bom :'\uFEFF' | '';
		eol :'\n' | '\r\n' | '\r' | '\u2028' | '\u2029' | '';
		tab :string;
		
		readonly script :null | {
			readonly blockName :'script'
			readonly attributes :Readonly<{ [name :string] :undefined | string }>
			inner? :string
			readonly src? :string
			readonly lang? :string
			innerJS :string
		};
		
		readonly styles :Array<{
			readonly blockName :'style'
			readonly attributes :Readonly<{ [name :string] :undefined | string }>
			inner? :string
			readonly src? :string
			readonly lang? :string
			innerCSS :string
		}>;
		
		readonly template :null | {
			readonly blockName :'template'
			readonly attributes :Readonly<{ [name :string] :undefined | string }>
			inner? :string
			readonly src? :string
			readonly lang? :string
			innerHTML :string
		} | null;
		
		readonly customBlocks :Array<{
			readonly blockName :string
			readonly attributes :Readonly<{ [name :string] :undefined | string }>
			inner? :string
			readonly src? :string
			readonly lang? :string
		}>;
		
		export (mode :'default', from? :string) :string;
		export (mode :'const' | 'var' | 'let', from? :string) :string;
		export (mode :{
			'var' :'const' | 'var' | 'let',
			'?j-vue'? :string,
			'j-vue'? :string,
			'map'? :false | 'inline',
			'src'? (src :string) :Promise<string>,
			'lang'? (lang :string, inner :string) :string | Promise<string>,
		}) :Promise<string>;
		export (mode :{
			'var' :'const' | 'var' | 'let',
			'?j-vue'? :string,
			'j-vue'? :string,
			'map' :true,
			'src'? (src :string) :Promise<string>,
			'lang'? (lang :string, inner :string) :string | Promise<string>,
		}) :Promise<object & { code :string, map :any }>;
		
	}
	
	export { exports as default };
	
}