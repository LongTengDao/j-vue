import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import isBuffer from '.Buffer.isBuffer';
import freeze from '.Object.freeze';
import undefined from '.undefined';
import NULL from '.null';

import { StringLiteral } from '@ltd/j-es';

import { NON_SCALAR as SURROGATE_IN_INPUT_STREAM, buffer2object } from '@ltd/j-utf';
const OPTIONS = { swappable: false as false, stripBOM: true as true, startsWithASCII: true as true, throwError: true as true };

import { NONCHARACTER as NONCHARACTER_IN_INPUT_STREAM, CONTROL_CHARACTER as CONTROL_CHARACTER_IN_INPUT_STREAM } from './RE';

import { EOL, LF, FF, CRLF, CR, LS, PS } from '@ltd/j-eol';
const VUE_EOL = EOL([ LF, CRLF, CR ], [ FF, LS, PS ], true);
const CR_LF = /\r\n?/g;

import parseComponent from './parseComponent';
import From from './From';
import one from './one';

export default class SFC extends NULL {
	
	get [Symbol.toStringTag] () { return 'SFC'; }
	
	bom :'\uFEFF' | '';
	eol :string;
	tab :string;
	
	constructor (vue :string | Buffer) {
		
		super();
		
		if ( typeof vue==='string' ) {
			if ( SURROGATE_IN_INPUT_STREAM.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
			this.bom = '';
		}
		else if ( isBuffer(vue) ) {
			try { ( { BOM: this.bom, string: vue } = buffer2object(vue, OPTIONS) ); }
			catch (error) { throw Error(`无法解码 Buffer，请确认它是 UTF-8 或 UTF-16 编码的，并且不存在非 Unicode 标量值（U+D800〜U+DFFF 的代理对码点，或超出了 U+10FFFF）`); }
		}
		else { throw TypeError(`new SFC(vue) 时参数只能是 string 或 Buffer`); }
		
		if ( NONCHARACTER_IN_INPUT_STREAM.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER_IN_INPUT_STREAM.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现除空（U+00）、水平制表（U+09）、换行（U+0A）、换页（U+0C）、回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		
		try { this.eol = VUE_EOL(vue); }
		catch (error) {
			throw SyntaxError(
				`.vue 文件的换行符必须是 LF（U+0A）、CRLF（U+0D U+0A）或 CR（U+0D）中的唯一一个`+
				`，而且`+// script 标签内容前
				`不得包含对 JS 是换行符、而对 HTML 和 CSS 不是换行符的 U+2028 或 U+2029，也不得包含对 CSS 是换行符、而对 HTML 和 JS 不是换行符的 U+0C`//，否则源图映射的行号和列号可能出错
			);
		}
		if ( CR_LF.test(this.eol) ) { vue = vue.replace(CR_LF, '\n'); }
		
		this.tab = vue.includes('\t') ? '\t' : '';
		
		parseComponent(this, vue);
		
	}
	
	script :Script | null = null;
	readonly styles :Style[] = [];
	template :Template | null = null;
	readonly customBlocks :CustomBlock[] = [];
	
	export (mode :'default' | 'const' | 'var' | 'let' | {
		'var' :'const' | 'var' | 'let',
		'?j-vue'? :string,
		'j-vue'? :string,
		'map'? :boolean | 'inline',
		'src'? (src :string) :Promise<string>,
		'lang'? (lang :string, inner :string) :string | Promise<string>,
	}, from? :string) :string | Promise<string | { code :string, map :any }> {
		if ( typeof mode==='object' ) { return one(this, mode); }
		const { bom, tab, eol, script, styles, template } = this;
		if ( mode==='default' ) {
			if ( script ) {
				if ( script.inner===undefined ) {
					return bom
						+`export { default } from ${StringLiteral(script.src!)};`;
				}
				else {
					return eol!==LF
						? bom+script.innerJS.split(LF).join(eol)
						: bom+script.innerJS;
				}
			}
			else {
				if ( template ) {
					return bom
						+`import { template } from ${from===undefined ? `'?j-vue'` : StringLiteral(from)};${eol}`
						+`export default { template: template };`;
				}
				else {
					throw Error(`.vue 如果要 export default，至少要有 script 块或 template 块中的一个`);
				}
			}
		}
		else {
			let code :string = bom;
			for ( const chunk of From(tab, mode, styles, template, from===undefined ? 'j-vue' : from, eol) ) { code += chunk; }
			return code;
		}
	}
	
};

freeze(SFC.prototype);

import Script from './Script';
import Style from './Style';
import Template from './Template';
import CustomBlock from './CustomBlock';