import Error from '.Error';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import isBuffer from '.Buffer.isBuffer';
import freeze from '.Object.freeze';
import undefined from '.undefined';

import { StringLiteral } from '@ltd/j-es';

import { NON_SCALAR as SURROGATE_IN_INPUT_STREAM, buffer2object } from '@ltd/j-utf';
const OPTIONS = { swappable: false, stripBOM: true, startsWithASCII: true, throwError: true } as const;

import { NONCHARACTER as NONCHARACTER_IN_INPUT_STREAM, CONTROL_CHARACTER as CONTROL_CHARACTER_IN_INPUT_STREAM } from './RE';

import { EOL, LF, FF, CRLF, CR, LS, PS } from '@ltd/j-eol';
const VUE_EOL = EOL([ LF, CRLF, CR ], [ FF, LS, PS ], true);

import parseComponent from './parseComponent';
import From from './From';
import one from './one';

const ES_EOL = /\r\n?|[\n\u2028\u2029]/g;

export default class SFC {
	
	get [Symbol.toStringTag] () { return 'SFC'; }
	
	bom :'\uFEFF' | '';
	eol :LF | CRLF | CR | LS | PS | '';
	tab :string;
	
	constructor (vue :string | Buffer) {
		
		if ( isBuffer(vue) ) {
			try {
				const { BOM, string } = buffer2object(vue, OPTIONS);
				this.bom = BOM;
				vue = string;
			}
			catch (error) { throw Error(`无法解码 Buffer，请确认它是 UTF-8 或 UTF-16 编码的，并且不存在非 Unicode 标量值（U+D800〜U+DFFF）的代理对码点，或超出了 U+10FFFF）`); }
		}
		else if ( typeof vue==='string' ) {
			if ( SURROGATE_IN_INPUT_STREAM.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
			this.bom = '';
		}
		else { throw TypeError(`new SFC(vue) 时参数只能是 string 或 Buffer`); }
		
		if ( NONCHARACTER_IN_INPUT_STREAM.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER_IN_INPUT_STREAM.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现除 NUL 空（U+00）、TAB 水平制表（U+09）、LF 换行（U+0A）、FF 换页（U+0C）、CR 回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		
		try { this.eol = VUE_EOL(vue); }
		catch (error) {
			throw SyntaxError(
				`.vue 文件的换行符必须是 LF（U+0A）、CRLF（U+0D U+0A）或 CR（U+0D）中的唯一一个` +
				`，而且` +// script 标签内容前
				`不得包含对 JS 是换行符、而对 HTML 和 CSS 不是换行符的 LS（U+2028）或 PS（U+2029），也不得包含对 CSS 是换行符、而对 HTML 和 JS 不是换行符的 FF（U+0C）`//，否则源图映射的行号和列号可能出错
			);
		}
		
		this.tab = vue.includes('\t') ? '\t' : '';
		
		parseComponent(this, vue);
		
		return this;
		
	}
	
	script :Script | null = null;
	scriptSetup :Script | null = null;
	readonly styles :Style[] = [];
	template :Template | null = null;
	readonly customBlocks :CustomBlock[] = [];
	
	export (this :SFC, mode :'default' | 'const' | 'var' | 'let' | {
		'var' :'const' | 'var' | 'let',
		'?j-vue'? :string,
		'j-vue'? :string | null,
		'map'? :boolean | 'inline',
		'src'? (src :string) :Promise<string>,
		'lang'? (lang :string, inner :string) :string | Promise<string>,
	}, from :string | null = 'j-vue') :string | Promise<string | { code :string, map :any }> {
		if ( typeof mode==='object' ) { return one(this, mode); }
		const { bom, tab, eol, script, styles, template } = this;
		if ( mode==='default' ) {
			if ( this.scriptSetup ) { throw Error(`jVue 暂未支持编译 script setup`); }
			if ( !script ) { throw Error(`由于 Vue 2 和 3 所需的 render 函数不同，.vue 的 script 块现在不能省略`); }
			return script.inner===undefined
				? bom + `export { default } from ${StringLiteral(script.src!)};`
				: bom + script.innerJS.replace(ES_EOL, eol);
		}
		else {
			let code :string = bom;
			for ( const chunk of From(tab, mode, styles, template, from, eol) ) { code += chunk; }
			return code;
		}
	}
	
};

freeze(SFC.prototype);

import type Script from './Script/';
import type Style from './Style/';
import type Template from './Template/';
import type CustomBlock from './CustomBlock';