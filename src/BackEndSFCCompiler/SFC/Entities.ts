import SyntaxError from '.SyntaxError';
import ReferenceError from '.ReferenceError';
import RangeError from '.RangeError';
import parseInt from '.parseInt';
import fromCodePoint from '.String.fromCodePoint';
import Null from '.null';

import { NON_SCALAR as SURROGATE } from '@ltd/j-utf';
import { SEMICOLON_ENTITIES, CONTINUE_ENTITIES } from 'lib:entities';

import { NONCHARACTER, CONTROL_CHARACTER } from './RE';

const ESCAPABLE_INNER_TEXT = /[\t\n\r &<\xA0\u2000-\u200A\u2028\u2029\u202F\u3000]/g;// 除了必须转义的，还有防止被 Vue 编译器剔除的空白
const ESCAPABLE_BEAUTIFUL_TEXT = /[\t&<]/g;
const escapableInnerTextReplacer = ($0 :string) => `&#${$0.charCodeAt(0)};`;
export const escapeInnerText = (text :string) :string => text.replace(ESCAPABLE_INNER_TEXT, escapableInnerTextReplacer);
export const escapeBeautifulText = (text :string) :string => text.replace(ESCAPABLE_BEAUTIFUL_TEXT, escapableInnerTextReplacer);

const ESCAPABLE_ATTRIBUTE_VALUE = /["&]/g;
const escapableAttributeValueReplacer = ($0 :string) => $0==='"' ? '&quot;' : '&amp;';
export const escapeAttributeValue = (text :string) :string => text.replace(ESCAPABLE_ATTRIBUTE_VALUE, escapableAttributeValueReplacer);

//export const test = (text :string) => { if ( / /.test(text) ) {} };

const CONTROL_TO_CHAR = Null({
	0x80: 0x20AC,
	0x82: 0x201A,
	0x83: 0x0192,
	0x84: 0x201E,
	0x85: 0x2026,
	0x86: 0x2020,
	0x87: 0x2021,
	0x88: 0x02C6,
	0x89: 0x2030,
	0x8A: 0x0160,
	0x8B: 0x2039,
	0x8C: 0x0152,
	0x8E: 0x017D,
	0x91: 0x2018,
	0x92: 0x2019,
	0x93: 0x201C,
	0x94: 0x201D,
	0x95: 0x2022,
	0x96: 0x2013,
	0x97: 0x2014,
	0x98: 0x02DC,
	0x99: 0x2122,
	0x9A: 0x0161,
	0x9B: 0x203A,
	0x9C: 0x0153,
	0x9E: 0x017E,
	0x9F: 0x0178,
});

const ENTITIES_TO_TRY = /&([a-z][a-z\d]*|#(?:\d+|x[\dA-F]+));?/ig;

const unescape_or_return = (ambiguous_ampersand :string, inner :string) :string => {
	if ( inner[0]==='#' ) {
		const codePoint :number = ambiguous_ampersand[2]==='x'
			? parseInt(inner.slice(2), 16)
			: parseInt(inner.slice(1), 10);
		if ( codePoint===0x00 || 0xD800<=codePoint && codePoint<=0xDFFF || 0x10FFFF<codePoint ) { return '\uFFFD'; }
		return fromCodePoint(codePoint in CONTROL_TO_CHAR ? CONTROL_TO_CHAR[codePoint as keyof typeof CONTROL_TO_CHAR] : codePoint);
	}
	else {
		if ( ambiguous_ampersand && ambiguous_ampersand[ambiguous_ampersand.length - 1]===';' && inner in SEMICOLON_ENTITIES ) { return SEMICOLON_ENTITIES[inner]; }
		let index = inner.length;
		for ( ; ;--index ) {
			if ( inner.slice(0, index) in CONTINUE_ENTITIES ) {
				return SEMICOLON_ENTITIES[ambiguous_ampersand.slice(0, index)]+ambiguous_ampersand.slice(index);
			}
			if ( index===1 ) { return ambiguous_ampersand; }
		}
	}
};

const ENTITIES = /&(?:(?:([a-z][a-z\d]*)|#(?:\d+|x[\dA-F]+));?)?/ig;

const unescape_or_throw = (ambiguous_ampersand :string, named? :string) :string => {
	if ( ambiguous_ampersand.length===1 ) { throw SyntaxError(`孤立的“&”没有作为 HTML 实体存在`); }
	if ( !ambiguous_ampersand || ambiguous_ampersand[ambiguous_ampersand.length - 1]!==';' ) { throw SyntaxError(`HTML 实体“${ambiguous_ampersand}”后缺少“;”`); }
	if ( named ) {
		if ( named in SEMICOLON_ENTITIES ) { return SEMICOLON_ENTITIES[named]!; }
		throw ReferenceError(`未知的 HTML 实体名称“${ambiguous_ampersand}”`);
	}
	const codePoint :number = ambiguous_ampersand[2]==='x' ? parseInt(ambiguous_ampersand.slice(3, -1), 16) : parseInt(ambiguous_ampersand.slice(2, -1), 10);
	if ( codePoint===0x00 ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值为空（U+0000）码点`); }
	if ( codePoint>0x10FFFF ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值超出了 Unicode 的最大范围（U+10FFFF）`); }
	const unicode :string = fromCodePoint(codePoint);
	if ( SURROGATE.test(unicode) ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值是单个代理对码点（U+D800〜U+DFFF）`); }
	if ( NONCHARACTER.test(unicode) ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值是永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
	if ( CONTROL_CHARACTER.test(unicode) || codePoint===0x0D ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值是除水平制表（U+0009）换行（U+000A）换页（U+000C）以外的控制字符（U+0000〜U+001F、U+007F〜U+009F）`); }
	return unicode;
};

export const unescape = (string :string, fallback? :boolean) :string =>
	fallback
		? string.replace(ENTITIES_TO_TRY, unescape_or_return)
		: string.replace(ENTITIES, unescape_or_throw);
