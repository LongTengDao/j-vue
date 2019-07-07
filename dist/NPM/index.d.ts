export = exports;
declare namespace exports {
	
	export const version :'9.0.6';
	
	export class SFC {
		
		constructor (vue :string | Buffer);
		
		bom :'\uFEFF' | '';
		eol :string;
		tab :string;
		
		script :null | {
			blockName :'script',
			attributes :{ [name :string] :undefined | string },
			inner? :string,
			src? :string,
			lang? :string,
			readonly innerJS :string,
		};
		
		styles :Array<{
			blockName :'style',
			attributes :{ [name :string] :undefined | string },
			inner? :string,
			src? :string,
			lang? :string,
			readonly innerCSS :string,
		}>;
		
		template :null | {
			blockName :'template',
			attributes :{ [name :string] :undefined | string },
			inner? :string,
			src? :string,
			lang? :string,
			readonly innerHTML :string,
		} | null;
		
		customBlocks :Array<{
			blockName :string,
			attributes :{ [name :string] :undefined | string },
			inner? :string,
			src? :string,
			lang? :string,
		}>;
		
		export (mode :'default' | 'const' | 'var' | 'let', from? :string) :string;
		
	}
	
	export { exports as default };
	
}