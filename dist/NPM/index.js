'use strict';

const version = '9.5.0';

const isBuffer = Buffer.isBuffer;

const freeze = Object.freeze;

const undefined$1 = void 0;

const Object_assign = Object.assign;

const create = Object.create;

const Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

const PropertyDescriptor = (
	/*! j-globals: null.PropertyDescriptor (internal) */
	function () {
		function __PURE__ (value_get, set_writable, enumerable, configurable) {
			var propertyDescriptor = create(null);
			if ( set_writable===true ) {
				propertyDescriptor.value = value_get;
				propertyDescriptor.writable = true;
			}
			else if ( set_writable===false ) {
				propertyDescriptor.value = value_get;
				propertyDescriptor.writable = false;
			}
			else {
				propertyDescriptor.get = value_get;
				propertyDescriptor.set = set_writable;
			}
			propertyDescriptor.enumerable = enumerable;
			propertyDescriptor.configurable = configurable;
			return propertyDescriptor;
		}
		return function PropertyDescriptor (value_get, set_writable, enumerable, configurable) {
			return /*#__PURE__*/ __PURE__(value_get, set_writable, enumerable, configurable);
		};
	}()
	/*¡ j-globals: null.PropertyDescriptor (internal) */
);

const getOwnPropertyDescriptor = (
	/*! j-globals: null.getOwnPropertyDescriptor (internal) */
	function getOwnPropertyDescriptor (object, key) {
		var descriptor = /*#__PURE__*/ Object_getOwnPropertyDescriptor(object, key);
		return /*#__PURE__*/ descriptor.hasOwnProperty('value')
			? /*#__PURE__*/ PropertyDescriptor(descriptor.value, descriptor.writable, descriptor.enumerable, descriptor.configurable)
			: /*#__PURE__*/ PropertyDescriptor(descriptor.get, descriptor.set, descriptor.enumerable, descriptor.configurable);
	}
	/*¡ j-globals: null.getOwnPropertyDescriptor (internal) */
);

var ownKeys = typeof Reflect==='object' ? Reflect.ownKeys : Object.getOwnPropertyNames;
const getOwnPropertyDescriptors = (
	/*! j-globals: null.getOwnPropertyDescriptors (internal) */
	function getOwnPropertyDescriptors (object) {
		var descriptorMap = /*#__PURE__*/ create(null);
		for ( var keys = /*#__PURE__*/ ownKeys(object), length = keys.length, index = 0; index<length; ++index ) {
			var key = keys[index];
			descriptorMap[key] = /*#__PURE__*/ getOwnPropertyDescriptor(object, key);
		}
		return descriptorMap;
	}
	/*¡ j-globals: null.getOwnPropertyDescriptors (internal) */
);

const NULL = (
	/*! j-globals: null (internal) */
	/*#__PURE__*/ function () {
		var NULL = function (object, define) {
			if ( object ) {
				return define
					? /*#__PURE__*/ create(null, /*#__PURE__*/getOwnPropertyDescriptors(object))
					: /*#__PURE__*/ Object_assign(/*#__PURE__*/ create(null), object);
			}
		};
		delete NULL.name;
		//try { delete NULL.length; } catch (error) {}
		NULL.prototype = null;
		freeze && freeze(NULL);
		return NULL;
	}()
	/*¡ j-globals: null (internal) */
);

const hasOwnProperty = Object.prototype.hasOwnProperty;

const toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

const defineProperty = Object.defineProperty;

const seal = Object.seal;

const Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(null); }
			if ( Object_assign ) { Object_assign(exports, addOnOrigin); }
			else { for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
			exports['default'] = exports;
			typeof exports==='function' && exports.prototype && seal(exports.prototype);
			if ( toStringTag ) {
				var descriptor = create(null);
				descriptor.value = 'Module';
				defineProperty(exports, toStringTag, descriptor);
			}
			return freeze(exports);
		}(exports, addOnOrigin);
	}
	/*¡ j-globals: default (internal) */
);

/*!
 * 模块名称：ES
 * 模块功能：ECMAScript 语法相关共享实用程序。从属于“简计划”。
   　　　　　ECMAScript syntax util. Belong to "Plan J".
 * 模块版本：0.8.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-es/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-es/
 */

var Cf = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/g;

var CANT_IN_SINGLE_QUOTE = /[\n\r'\\\u2028\u2029]/g;
function staticallyEscape (cant_in_single_quote                              )         {
	return CHAR_TO_ESCAPED[cant_in_single_quote];
}

var CHAR_TO_ESCAPED = { '\n': '\\n', '\r': '\\r', '\'': '\\\'', '\\': '\\\\', '\u2028': '\\u2028', '\u2029': '\\u2029' };
function dynamicallyEscape (char_in_cf        )         {
	if ( char_in_cf.length>1 ) {
		return dynamicallyEscape(char_in_cf.charAt(0))+dynamicallyEscape(char_in_cf.charAt(1));
	}
	var hex         = char_in_cf.charCodeAt(0).toString(16).toUpperCase();
	switch ( hex.length ) {
		case 4:
			return '\\u'+hex;
		case 3:
			return '\\u0'+hex;
		case 2:
			return '\\x'+hex;
	}
	return '\\x0'+hex;
}

                                           

function StringLiteral (string        )         {
	return '\''
		+string
		.replace(CANT_IN_SINGLE_QUOTE, staticallyEscape            )
		.replace(Cf, dynamicallyEscape            )
		+'\'';
}

/*¡ ES */

const from = (
	/*! j-globals: Buffer.from (fallback) */
	typeof Buffer==='function' && /*#__PURE__*/ hasOwnProperty.call(Buffer, 'from') ? Buffer.from : undefined$1
	/*¡ j-globals: Buffer.from (fallback) */
);

const RegExp_prototype = RegExp.prototype;

/*!
 * 模块名称：j-utf
 * 模块功能：UTF 相关共享实用程序。从属于“简计划”。
   　　　　　UTF util. Belong to "Plan J".
 * 模块版本：3.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-utf/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-utf/
 */

var NON_SCALAR = (
	'unicode' in RegExp_prototype
		? RegExp('[\\uD800-\\uDFFF]', 'u')
		: /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
);

function buffer2object (buffer        , options          )                                                                          {
	
	var length         = buffer.length;
	if ( !length ) { return { BOM: '', UTF: '', string: '' }; }
	
	var encoding                    ;
	var swapped                    ;
	var BOM               ;
	var UTF                            ;
	
	var throwError          = !options || options.throwError!==false;
	
	var firstByte         = buffer[0];
	if ( firstByte===0xEF ) {
		if ( length>2 && buffer[1]===0xBB && buffer[2]===0xBF ) {
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(3); }
			BOM = '\uFEFF';
			UTF = '8';
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-8 BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( firstByte===0xFF ) {
		if ( length>1 && buffer[1]===0xFE ) {
			if ( throwError && length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(2); }
			encoding = 'ucs2';
			BOM = '\uFEFF';
			UTF = '16LE';
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-16LE BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( firstByte===0xFE ) {
		if ( length>1 && buffer[1]===0xFF ) {
			if ( throwError && length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			buffer.swap16();
			if ( options ) {
				if ( !options.swappable ) { swapped = buffer; }
				if ( options.stripBOM!==false ) { buffer = buffer.slice(2); }
			}
			else {
				swapped = buffer;
				buffer = buffer.slice(2);
			}
			encoding = 'ucs2';
			BOM = '\uFEFF';
			UTF = '16BE';
		}
		else {
			if ( throwError ) { throw Error('残破的 UTF-16BE BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( options && options.startsWithASCII ) {
		if ( firstByte===0x00 ) {
			if ( throwError ) {
				if ( length>2 && buffer[2]===0x00 ) { throw Error('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			}
			buffer.swap16();
			if ( !options.swappable ) { swapped = buffer; }
			encoding = 'ucs2';
			UTF = '16BE';
		}
		else if ( length>1 && buffer[1]===0x00 ) {
			if ( throwError ) {
				if ( length>3 && buffer[3]===0x00 ) { throw Error('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error('UTF-16 的字节数必须为 2 的倍数'); }
			}
			encoding = 'ucs2';
			UTF = '16LE';
		}
		else {
			UTF = '8';
		}
		BOM = '';
	}
	else {
		BOM = '';
		UTF = '';
	}
	
	var string         = encoding ? buffer.toString(encoding) : buffer.toString();
	if ( throwError ) {
		if ( from(string, encoding).equals(buffer) ) {
			swapped && swapped.swap16();
			if ( NON_SCALAR.test(string) ) { throw Error('代理对码点不能单独出现'); }
		}
		else {
			swapped && swapped.swap16();
			throw Error('文件中存在超出 Unicode 表示范围的内容');
		}
	}
	else { swapped && swapped.swap16(); }
	return { BOM, UTF, string };
	
}

/*¡ j-utf */

const slice = Array.prototype.slice;

/*!
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：5.3.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var NT = /[\n\t]/g;

function Source (raw                       , substitutions                       )         {
	var source         = raw[0];
	for ( var length         = substitutions.length, index         = 0; index<length; ) {
		var substitution                  = substitutions[index];
		source += ( substitution instanceof RegExp ? substitution.source : substitution )+raw[++index];
	}
	return source.replace(NT, '');
}

var newRegExp            =
	/*#__PURE__*/
	function (newRegExp, createNewRegExpWith) {
		
		( function recursion (pickedFlags            , restFlags       )       {
			if ( restFlags ) {
				recursion(pickedFlags+restFlags.charAt(0)         , restFlags = restFlags.slice(1)         );
				recursion(pickedFlags, restFlags);
			}
			else if ( pickedFlags ) {
				newRegExp[pickedFlags] = createNewRegExpWith(pickedFlags);
			}
		} )('', 'gimsuy');
		
		return newRegExp;
		
	}(
		function newRegExp (template                      )         {
			return new RegExp(Source(template.raw, slice.call(arguments, 1)));
		}             ,
		
		function createNewRegExpWith (flags       ) {
			return ( {}        )['newRegExp.'+flags] = function (template                      )         {
				return new RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
			};
		}
	);

/*¡ j-regexp */

const NONCHARACTER = newRegExp.u`[
	\uFDD0-\uFDEF
	\uFFFE\u{1FFFE}\u{2FFFE}\u{3FFFE}\u{4FFFE}\u{5FFFE}\u{6FFFE}\u{7FFFE}\u{8FFFE}\u{9FFFE}\u{AFFFE}\u{BFFFE}\u{CFFFE}\u{DFFFE}\u{EFFFE}\u{FFFFE}\u{10FFFE}
	\uFFFF\u{1FFFF}\u{2FFFF}\u{3FFFF}\u{4FFFF}\u{5FFFF}\u{6FFFF}\u{7FFFF}\u{8FFFF}\u{9FFFF}\u{AFFFF}\u{BFFFF}\u{CFFFF}\u{DFFFF}\u{EFFFF}\u{FFFFF}\u{10FFFF}
]`;
const CONTROL_CHARACTER = /[\x01-\x08\x0B\x0E-\x1F\x7F-\x9F]/;

const ASCII_WHITESPACE = /[\t\n\f\r ]/;
const ASCII_ALPHA = /[a-zA-Z]/;

const TOKENS = /[^\s=;]+/g;
const AliasName = /[A-Z][\w\-]*/;////
const localOrComponentName = /[A-Za-z][A-Za-z0-9\-]*/;////
const localName$1 = /[a-z][a-z0-9\-]*/;////
const className = /[\w\-]+/;////

const ATTRIBUTE_NAME = /[^\0\t\n\f\r "'<>/=]+/;
const UNQUOTED_ATTRIBUTE_VALUE = /[^\0\t\n\f\r "'=<>`]+/;//// /[^\t\n\f\r "'=<>`][^\t\n\f\r >]*|(?=>)/; // HTML5 以前的标准宽松一些，实际 HTML 解析则更宽松。但 jVue 目前的整体设计原则是抛出一切不规范的错误，另外顺带提示反引号这个十分特殊的 IE 漏洞的存在
const ATTRIBUTE_NAME_VALUE = newRegExp`
	(${ATTRIBUTE_NAME})
	${ASCII_WHITESPACE}*
	=
	${ASCII_WHITESPACE}*
	(
		"[^"]*"
		|
		'[^']*'
		|
		${UNQUOTED_ATTRIBUTE_VALUE}
	)`;
const ATTRIBUTE = newRegExp.g`
	${ATTRIBUTE_NAME}
	(?:
		${ASCII_WHITESPACE}*
		=
		${ASCII_WHITESPACE}*
		(?:
			"[^\0"]*"
			|
			'[^\0']*'
			|
			${UNQUOTED_ATTRIBUTE_VALUE}
		)
	)?`;

const TAG_NAME = newRegExp`${ASCII_ALPHA}[^\0\t\n\f\r />]*`;
const TAG = newRegExp`
	^
	<
	(/?)
	(${TAG_NAME})
	((?:
		${ASCII_WHITESPACE}+
		${ATTRIBUTE}
	)*)
	${ASCII_WHITESPACE}*
	(/?)
	>
`;

const TAG_EMIT_CHAR = /[\t\n\f\r />]/;
const TAG_LIKE = newRegExp`
	<
	(?:
		/?${TAG_NAME}${TAG_EMIT_CHAR}
		|
		[!?]
	)
`;

const IS_TAG = newRegExp`
	^
	<
	/?
	${TAG_NAME}
	${TAG_EMIT_CHAR}
`;

const isArray = Array.isArray;

/*!
 * 模块名称：j-eol
 * 模块功能：换行符相关共享实用程序。从属于“简计划”。
   　　　　　EOL util. Belong to "Plan J".
 * 模块版本：1.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-eol/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-eol/
 */

var clearRegExp = '$_' in RegExp
	? function () {
		var REGEXP = /^/;
		return function clearRegExp                (value    )                {
			REGEXP.test('');
			return value;
		};
	}()
	: function clearRegExp                (value    )                {
		return value;
	};

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP        = create(null);

function groupify (branches          , uFlag          , noEscape          )         {
	var group        = create(null);
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index]); }
	return sourcify(group, !noEscape);
}
function appendPointBranch (group       , branch        )       {
	if ( branch ) {
		var char         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch(group[char] || ( group[char] = create(null) ), branch.slice(char.length));
	}
	else { group[''] = GROUP; }
}

function appendCodeBranch (group       , branch        )       {
	if ( branch ) {
		var char         = branch.charAt(0);
		appendCodeBranch(group[char] || ( group[char] = create(null) ), branch.slice(1));
	}
	else { group[''] = GROUP; }
}

function sourcify (group       , needEscape         )         {
	var branches           = [];
	var singleCharactersBranch           = [];
	var noEmptyBranch          = true;
	for ( var char in group ) {
		if ( char ) {
			var sub_branches         = sourcify(group[char], needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(char) ) { char = '\\'+char; }
			sub_branches ? branches.push(char+sub_branches) : singleCharactersBranch.push(char);
		}
		else { noEmptyBranch = false; }
	}
	singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length===1 ? singleCharactersBranch[0] : '['+singleCharactersBranch.join('')+']');
	return branches.length===0
		? ''
		: ( branches.length===1 && ( singleCharactersBranch.length || noEmptyBranch )
			? branches[0]
			: '(?:'+branches.join('|')+')'
		)
		+( noEmptyBranch ? '' : '?' );
}

/*¡ j-regexp */

function EOL                     (allow                , disallow_uniform                              , uniform_disallow                              ) {
	
	if ( typeof disallow_uniform==='object' ) {
		DISALLOW = isArray(disallow_uniform) ? new RegExp(groupify(disallow_uniform)) : disallow_uniform;
		FIRST = !uniform_disallow;
	}
	else if ( typeof uniform_disallow==='object' ) {
		DISALLOW = isArray(uniform_disallow) ? new RegExp(groupify(uniform_disallow)) : uniform_disallow;
		FIRST = !disallow_uniform;
	}
	else {
		FIRST = !( uniform_disallow || disallow_uniform );
	}
	var DISALLOW        ;
	var FIRST         ;
	var ALLOW = isArray(allow) ? new RegExp(groupify(allow), FIRST ? '' : 'g') : allow;
	
	return function EOL (string        )           {
		if ( DISALLOW && DISALLOW.test(string) ) { throw clearRegExp(SyntaxError)('存在禁用换行符'); }
		var eols               =                clearRegExp(string.match(ALLOW));
		if ( !eols ) { return ''; }
		if ( FIRST ) { return eols[0]; }
		var eol = eols[0];
		for ( var length = eols.length, index = 1; index<length; ++index ) { if ( eols[index]!==eol ) { throw SyntaxError('存在多种换行符'); } }
		return eol;
	};
	
}

var LF     = '\n';
var FF     = '\f';
var CRLF       = '\r\n';
var CR     = '\r';
var LS     = '\u2028';
var PS     = '\u2029';

/*¡ j-eol */

const checkNewline = (
	/*! j-globals: return (internal) */
	function RETURN (value) {
		return value;
	}
	/*¡ j-globals: return (internal) */
);

const VOID_ELEMENTS = /^(?:area|b(?:r|ase)|co(?:l|mmand)|embed|hr|i(?:mg|nput)|keygen|link|meta|param|source|track|wbr)$/i;

const RAW_TEXT_ELEMENTS = /^s(?:cript|tyle)$/i;

const ESCAPABLE_RAW_TEXT_ELEMENTS = /^t(?:extarea|itle)$/i;

const FOREIGN_ELEMENTS = /^(?:s(?:vg|witch|ymbol)|animate|c(?:ircle|lippath|ursor)|de(?:fs|sc)|ellipse|f(?:ilter|o(?:nt\-face|reignObject))|g(?:lyph)?|image|line|m(?:a(?:rker|sk)|issing\-glyph)|p(?:at(?:h|tern)|oly(?:gon|line))|rect|t(?:ext(?:path)?|span)|use|view)$/i;

const NON_ASCII = /[^\x00-\x7F]/u;
const NON_TAB = /[^\t\x20]/g;

function Snippet (whole        , errorPosition        )         {
	
	const linesAroundError                                      = [];
	const linesBeforeError           = whole.slice(0, errorPosition).split('\n');
	const errorLineNumber         = linesBeforeError.length;
	
	if ( errorLineNumber>1 ) {
		linesAroundError.push({
			number: errorLineNumber-1+'',
			value: linesBeforeError[errorLineNumber-2],
		});
	}
	
	const errorLineEnd         = whole.indexOf('\n', errorPosition);
	linesAroundError.push({
		number: errorLineNumber+'',
		value: linesBeforeError[errorLineNumber-1]+( errorLineEnd<0
			? whole.slice(errorPosition)
			: whole.slice(errorPosition, errorLineEnd)
		),
	});
	linesAroundError.push({
		number: '',
		value: linesBeforeError[errorLineNumber-1].replace(NON_ASCII, '\u3000').replace(NON_TAB, '\x20')+'^',
	});
	
	let maxLengthOfLineNumber        ;
	if ( errorLineEnd<0 ) { maxLengthOfLineNumber = ( errorLineNumber+'' ).length; }
	else {
		maxLengthOfLineNumber = ( errorLineNumber+1+'' ).length;
		const nextEnd         = whole.indexOf('\n', errorLineEnd+1);
		const next         = nextEnd<0
			? whole.slice(errorLineEnd+1)
			: whole.slice(errorLineEnd+1, nextEnd);
		linesAroundError.push({
			number: errorLineNumber+1+'',
			value: next,
		});
	}
	
	const errorSnippet           = [];
	for ( let { number, value } of linesAroundError ) {
		number = number ? number.padStart(maxLengthOfLineNumber, '0') : ' '.repeat(maxLengthOfLineNumber);
		errorSnippet.push(`${number}\t|${value}`);
	}
	return errorSnippet.join('\n');
	
}

const throwSyntaxError = (
	/*! j-globals: throw.SyntaxError (internal) */
	function throwSyntaxError (message) {
		throw SyntaxError(message);
	}
	/*¡ j-globals: throw.SyntaxError (internal) */
);

const fromCodePoint = String.fromCodePoint;

const SEMICOLON_ENTITIES = /*#__PURE__*/ NULL({
	Aacute: 'Á',
	aacute: 'á',
	Abreve: 'Ă',
	abreve: 'ă',
	ac: '∾',
	acd: '∿',
	acE: '∾̳',
	Acirc: 'Â',
	acirc: 'â',
	acute: '´',
	Acy: 'А',
	acy: 'а',
	AElig: 'Æ',
	aelig: 'æ',
	af: '\u2061',
	Afr: '𝔄',
	afr: '𝔞',
	Agrave: 'À',
	agrave: 'à',
	alefsym: 'ℵ',
	aleph: 'ℵ',
	Alpha: 'Α',
	alpha: 'α',
	Amacr: 'Ā',
	amacr: 'ā',
	amalg: '⨿',
	amp: '&',
	AMP: '&',
	andand: '⩕',
	And: '⩓',
	and: '∧',
	andd: '⩜',
	andslope: '⩘',
	andv: '⩚',
	ang: '∠',
	ange: '⦤',
	angle: '∠',
	angmsdaa: '⦨',
	angmsdab: '⦩',
	angmsdac: '⦪',
	angmsdad: '⦫',
	angmsdae: '⦬',
	angmsdaf: '⦭',
	angmsdag: '⦮',
	angmsdah: '⦯',
	angmsd: '∡',
	angrt: '∟',
	angrtvb: '⊾',
	angrtvbd: '⦝',
	angsph: '∢',
	angst: 'Å',
	angzarr: '⍼',
	Aogon: 'Ą',
	aogon: 'ą',
	Aopf: '𝔸',
	aopf: '𝕒',
	apacir: '⩯',
	ap: '≈',
	apE: '⩰',
	ape: '≊',
	apid: '≋',
	apos: '\'',
	ApplyFunction: '\u2061',
	approx: '≈',
	approxeq: '≊',
	Aring: 'Å',
	aring: 'å',
	Ascr: '𝒜',
	ascr: '𝒶',
	Assign: '≔',
	ast: '*',
	asymp: '≈',
	asympeq: '≍',
	Atilde: 'Ã',
	atilde: 'ã',
	Auml: 'Ä',
	auml: 'ä',
	awconint: '∳',
	awint: '⨑',
	backcong: '≌',
	backepsilon: '϶',
	backprime: '‵',
	backsim: '∽',
	backsimeq: '⋍',
	Backslash: '∖',
	Barv: '⫧',
	barvee: '⊽',
	barwed: '⌅',
	Barwed: '⌆',
	barwedge: '⌅',
	bbrk: '⎵',
	bbrktbrk: '⎶',
	bcong: '≌',
	Bcy: 'Б',
	bcy: 'б',
	bdquo: '„',
	becaus: '∵',
	because: '∵',
	Because: '∵',
	bemptyv: '⦰',
	bepsi: '϶',
	bernou: 'ℬ',
	Bernoullis: 'ℬ',
	Beta: 'Β',
	beta: 'β',
	beth: 'ℶ',
	between: '≬',
	Bfr: '𝔅',
	bfr: '𝔟',
	bigcap: '⋂',
	bigcirc: '◯',
	bigcup: '⋃',
	bigodot: '⨀',
	bigoplus: '⨁',
	bigotimes: '⨂',
	bigsqcup: '⨆',
	bigstar: '★',
	bigtriangledown: '▽',
	bigtriangleup: '△',
	biguplus: '⨄',
	bigvee: '⋁',
	bigwedge: '⋀',
	bkarow: '⤍',
	blacklozenge: '⧫',
	blacksquare: '▪',
	blacktriangle: '▴',
	blacktriangledown: '▾',
	blacktriangleleft: '◂',
	blacktriangleright: '▸',
	blank: '␣',
	blk12: '▒',
	blk14: '░',
	blk34: '▓',
	block: '█',
	bne: '=⃥',
	bnequiv: '≡⃥',
	bNot: '⫭',
	bnot: '⌐',
	Bopf: '𝔹',
	bopf: '𝕓',
	bot: '⊥',
	bottom: '⊥',
	bowtie: '⋈',
	boxbox: '⧉',
	boxdl: '┐',
	boxdL: '╕',
	boxDl: '╖',
	boxDL: '╗',
	boxdr: '┌',
	boxdR: '╒',
	boxDr: '╓',
	boxDR: '╔',
	boxh: '─',
	boxH: '═',
	boxhd: '┬',
	boxHd: '╤',
	boxhD: '╥',
	boxHD: '╦',
	boxhu: '┴',
	boxHu: '╧',
	boxhU: '╨',
	boxHU: '╩',
	boxminus: '⊟',
	boxplus: '⊞',
	boxtimes: '⊠',
	boxul: '┘',
	boxuL: '╛',
	boxUl: '╜',
	boxUL: '╝',
	boxur: '└',
	boxuR: '╘',
	boxUr: '╙',
	boxUR: '╚',
	boxv: '│',
	boxV: '║',
	boxvh: '┼',
	boxvH: '╪',
	boxVh: '╫',
	boxVH: '╬',
	boxvl: '┤',
	boxvL: '╡',
	boxVl: '╢',
	boxVL: '╣',
	boxvr: '├',
	boxvR: '╞',
	boxVr: '╟',
	boxVR: '╠',
	bprime: '‵',
	breve: '˘',
	Breve: '˘',
	brvbar: '¦',
	bscr: '𝒷',
	Bscr: 'ℬ',
	bsemi: '⁏',
	bsim: '∽',
	bsime: '⋍',
	bsolb: '⧅',
	bsol: '\\',
	bsolhsub: '⟈',
	bull: '•',
	bullet: '•',
	bump: '≎',
	bumpE: '⪮',
	bumpe: '≏',
	Bumpeq: '≎',
	bumpeq: '≏',
	Cacute: 'Ć',
	cacute: 'ć',
	capand: '⩄',
	capbrcup: '⩉',
	capcap: '⩋',
	cap: '∩',
	Cap: '⋒',
	capcup: '⩇',
	capdot: '⩀',
	CapitalDifferentialD: 'ⅅ',
	caps: '∩︀',
	caret: '⁁',
	caron: 'ˇ',
	Cayleys: 'ℭ',
	ccaps: '⩍',
	Ccaron: 'Č',
	ccaron: 'č',
	Ccedil: 'Ç',
	ccedil: 'ç',
	Ccirc: 'Ĉ',
	ccirc: 'ĉ',
	Cconint: '∰',
	ccups: '⩌',
	ccupssm: '⩐',
	Cdot: 'Ċ',
	cdot: 'ċ',
	cedil: '¸',
	Cedilla: '¸',
	cemptyv: '⦲',
	cent: '¢',
	centerdot: '·',
	CenterDot: '·',
	cfr: '𝔠',
	Cfr: 'ℭ',
	CHcy: 'Ч',
	chcy: 'ч',
	check: '✓',
	checkmark: '✓',
	Chi: 'Χ',
	chi: 'χ',
	circ: 'ˆ',
	circeq: '≗',
	circlearrowleft: '↺',
	circlearrowright: '↻',
	circledast: '⊛',
	circledcirc: '⊚',
	circleddash: '⊝',
	CircleDot: '⊙',
	circledR: '®',
	circledS: 'Ⓢ',
	CircleMinus: '⊖',
	CirclePlus: '⊕',
	CircleTimes: '⊗',
	cir: '○',
	cirE: '⧃',
	cire: '≗',
	cirfnint: '⨐',
	cirmid: '⫯',
	cirscir: '⧂',
	ClockwiseContourIntegral: '∲',
	CloseCurlyDoubleQuote: '”',
	CloseCurlyQuote: '’',
	clubs: '♣',
	clubsuit: '♣',
	colon: ':',
	Colon: '∷',
	Colone: '⩴',
	colone: '≔',
	coloneq: '≔',
	comma: ',',
	commat: '@',
	comp: '∁',
	compfn: '∘',
	complement: '∁',
	complexes: 'ℂ',
	cong: '≅',
	congdot: '⩭',
	Congruent: '≡',
	conint: '∮',
	Conint: '∯',
	ContourIntegral: '∮',
	copf: '𝕔',
	Copf: 'ℂ',
	coprod: '∐',
	Coproduct: '∐',
	copy: '©',
	COPY: '©',
	copysr: '℗',
	CounterClockwiseContourIntegral: '∳',
	crarr: '↵',
	cross: '✗',
	Cross: '⨯',
	Cscr: '𝒞',
	cscr: '𝒸',
	csub: '⫏',
	csube: '⫑',
	csup: '⫐',
	csupe: '⫒',
	ctdot: '⋯',
	cudarrl: '⤸',
	cudarrr: '⤵',
	cuepr: '⋞',
	cuesc: '⋟',
	cularr: '↶',
	cularrp: '⤽',
	cupbrcap: '⩈',
	cupcap: '⩆',
	CupCap: '≍',
	cup: '∪',
	Cup: '⋓',
	cupcup: '⩊',
	cupdot: '⊍',
	cupor: '⩅',
	cups: '∪︀',
	curarr: '↷',
	curarrm: '⤼',
	curlyeqprec: '⋞',
	curlyeqsucc: '⋟',
	curlyvee: '⋎',
	curlywedge: '⋏',
	curren: '¤',
	curvearrowleft: '↶',
	curvearrowright: '↷',
	cuvee: '⋎',
	cuwed: '⋏',
	cwconint: '∲',
	cwint: '∱',
	cylcty: '⌭',
	dagger: '†',
	Dagger: '‡',
	daleth: 'ℸ',
	darr: '↓',
	Darr: '↡',
	dArr: '⇓',
	dash: '‐',
	Dashv: '⫤',
	dashv: '⊣',
	dbkarow: '⤏',
	dblac: '˝',
	Dcaron: 'Ď',
	dcaron: 'ď',
	Dcy: 'Д',
	dcy: 'д',
	ddagger: '‡',
	ddarr: '⇊',
	DD: 'ⅅ',
	dd: 'ⅆ',
	DDotrahd: '⤑',
	ddotseq: '⩷',
	deg: '°',
	Del: '∇',
	Delta: 'Δ',
	delta: 'δ',
	demptyv: '⦱',
	dfisht: '⥿',
	Dfr: '𝔇',
	dfr: '𝔡',
	dHar: '⥥',
	dharl: '⇃',
	dharr: '⇂',
	DiacriticalAcute: '´',
	DiacriticalDot: '˙',
	DiacriticalDoubleAcute: '˝',
	DiacriticalGrave: '`',
	DiacriticalTilde: '˜',
	diam: '⋄',
	diamond: '⋄',
	Diamond: '⋄',
	diamondsuit: '♦',
	diams: '♦',
	die: '¨',
	DifferentialD: 'ⅆ',
	digamma: 'ϝ',
	disin: '⋲',
	div: '÷',
	divide: '÷',
	divideontimes: '⋇',
	divonx: '⋇',
	DJcy: 'Ђ',
	djcy: 'ђ',
	dlcorn: '⌞',
	dlcrop: '⌍',
	dollar: '$',
	Dopf: '𝔻',
	dopf: '𝕕',
	Dot: '¨',
	dot: '˙',
	DotDot: '⃜',
	doteq: '≐',
	doteqdot: '≑',
	DotEqual: '≐',
	dotminus: '∸',
	dotplus: '∔',
	dotsquare: '⊡',
	doublebarwedge: '⌆',
	DoubleContourIntegral: '∯',
	DoubleDot: '¨',
	DoubleDownArrow: '⇓',
	DoubleLeftArrow: '⇐',
	DoubleLeftRightArrow: '⇔',
	DoubleLeftTee: '⫤',
	DoubleLongLeftArrow: '⟸',
	DoubleLongLeftRightArrow: '⟺',
	DoubleLongRightArrow: '⟹',
	DoubleRightArrow: '⇒',
	DoubleRightTee: '⊨',
	DoubleUpArrow: '⇑',
	DoubleUpDownArrow: '⇕',
	DoubleVerticalBar: '∥',
	DownArrowBar: '⤓',
	downarrow: '↓',
	DownArrow: '↓',
	Downarrow: '⇓',
	DownArrowUpArrow: '⇵',
	DownBreve: '̑',
	downdownarrows: '⇊',
	downharpoonleft: '⇃',
	downharpoonright: '⇂',
	DownLeftRightVector: '⥐',
	DownLeftTeeVector: '⥞',
	DownLeftVectorBar: '⥖',
	DownLeftVector: '↽',
	DownRightTeeVector: '⥟',
	DownRightVectorBar: '⥗',
	DownRightVector: '⇁',
	DownTeeArrow: '↧',
	DownTee: '⊤',
	drbkarow: '⤐',
	drcorn: '⌟',
	drcrop: '⌌',
	Dscr: '𝒟',
	dscr: '𝒹',
	DScy: 'Ѕ',
	dscy: 'ѕ',
	dsol: '⧶',
	Dstrok: 'Đ',
	dstrok: 'đ',
	dtdot: '⋱',
	dtri: '▿',
	dtrif: '▾',
	duarr: '⇵',
	duhar: '⥯',
	dwangle: '⦦',
	DZcy: 'Џ',
	dzcy: 'џ',
	dzigrarr: '⟿',
	Eacute: 'É',
	eacute: 'é',
	easter: '⩮',
	Ecaron: 'Ě',
	ecaron: 'ě',
	Ecirc: 'Ê',
	ecirc: 'ê',
	ecir: '≖',
	ecolon: '≕',
	Ecy: 'Э',
	ecy: 'э',
	eDDot: '⩷',
	Edot: 'Ė',
	edot: 'ė',
	eDot: '≑',
	ee: 'ⅇ',
	efDot: '≒',
	Efr: '𝔈',
	efr: '𝔢',
	eg: '⪚',
	Egrave: 'È',
	egrave: 'è',
	egs: '⪖',
	egsdot: '⪘',
	el: '⪙',
	Element: '∈',
	elinters: '⏧',
	ell: 'ℓ',
	els: '⪕',
	elsdot: '⪗',
	Emacr: 'Ē',
	emacr: 'ē',
	empty: '∅',
	emptyset: '∅',
	EmptySmallSquare: '◻',
	emptyv: '∅',
	EmptyVerySmallSquare: '▫',
	emsp13: ' ',
	emsp14: ' ',
	emsp: ' ',
	ENG: 'Ŋ',
	eng: 'ŋ',
	ensp: ' ',
	Eogon: 'Ę',
	eogon: 'ę',
	Eopf: '𝔼',
	eopf: '𝕖',
	epar: '⋕',
	eparsl: '⧣',
	eplus: '⩱',
	epsi: 'ε',
	Epsilon: 'Ε',
	epsilon: 'ε',
	epsiv: 'ϵ',
	eqcirc: '≖',
	eqcolon: '≕',
	eqsim: '≂',
	eqslantgtr: '⪖',
	eqslantless: '⪕',
	Equal: '⩵',
	equals: '=',
	EqualTilde: '≂',
	equest: '≟',
	Equilibrium: '⇌',
	equiv: '≡',
	equivDD: '⩸',
	eqvparsl: '⧥',
	erarr: '⥱',
	erDot: '≓',
	escr: 'ℯ',
	Escr: 'ℰ',
	esdot: '≐',
	Esim: '⩳',
	esim: '≂',
	Eta: 'Η',
	eta: 'η',
	ETH: 'Ð',
	eth: 'ð',
	Euml: 'Ë',
	euml: 'ë',
	euro: '€',
	excl: '!',
	exist: '∃',
	Exists: '∃',
	expectation: 'ℰ',
	exponentiale: 'ⅇ',
	ExponentialE: 'ⅇ',
	fallingdotseq: '≒',
	Fcy: 'Ф',
	fcy: 'ф',
	female: '♀',
	ffilig: 'ﬃ',
	fflig: 'ﬀ',
	ffllig: 'ﬄ',
	Ffr: '𝔉',
	ffr: '𝔣',
	filig: 'ﬁ',
	FilledSmallSquare: '◼',
	FilledVerySmallSquare: '▪',
	fjlig: 'fj',
	flat: '♭',
	fllig: 'ﬂ',
	fltns: '▱',
	fnof: 'ƒ',
	Fopf: '𝔽',
	fopf: '𝕗',
	forall: '∀',
	ForAll: '∀',
	fork: '⋔',
	forkv: '⫙',
	Fouriertrf: 'ℱ',
	fpartint: '⨍',
	frac12: '½',
	frac13: '⅓',
	frac14: '¼',
	frac15: '⅕',
	frac16: '⅙',
	frac18: '⅛',
	frac23: '⅔',
	frac25: '⅖',
	frac34: '¾',
	frac35: '⅗',
	frac38: '⅜',
	frac45: '⅘',
	frac56: '⅚',
	frac58: '⅝',
	frac78: '⅞',
	frasl: '⁄',
	frown: '⌢',
	fscr: '𝒻',
	Fscr: 'ℱ',
	gacute: 'ǵ',
	Gamma: 'Γ',
	gamma: 'γ',
	Gammad: 'Ϝ',
	gammad: 'ϝ',
	gap: '⪆',
	Gbreve: 'Ğ',
	gbreve: 'ğ',
	Gcedil: 'Ģ',
	Gcirc: 'Ĝ',
	gcirc: 'ĝ',
	Gcy: 'Г',
	gcy: 'г',
	Gdot: 'Ġ',
	gdot: 'ġ',
	ge: '≥',
	gE: '≧',
	gEl: '⪌',
	gel: '⋛',
	geq: '≥',
	geqq: '≧',
	geqslant: '⩾',
	gescc: '⪩',
	ges: '⩾',
	gesdot: '⪀',
	gesdoto: '⪂',
	gesdotol: '⪄',
	gesl: '⋛︀',
	gesles: '⪔',
	Gfr: '𝔊',
	gfr: '𝔤',
	gg: '≫',
	Gg: '⋙',
	ggg: '⋙',
	gimel: 'ℷ',
	GJcy: 'Ѓ',
	gjcy: 'ѓ',
	gla: '⪥',
	gl: '≷',
	glE: '⪒',
	glj: '⪤',
	gnap: '⪊',
	gnapprox: '⪊',
	gne: '⪈',
	gnE: '≩',
	gneq: '⪈',
	gneqq: '≩',
	gnsim: '⋧',
	Gopf: '𝔾',
	gopf: '𝕘',
	grave: '`',
	GreaterEqual: '≥',
	GreaterEqualLess: '⋛',
	GreaterFullEqual: '≧',
	GreaterGreater: '⪢',
	GreaterLess: '≷',
	GreaterSlantEqual: '⩾',
	GreaterTilde: '≳',
	Gscr: '𝒢',
	gscr: 'ℊ',
	gsim: '≳',
	gsime: '⪎',
	gsiml: '⪐',
	gtcc: '⪧',
	gtcir: '⩺',
	gt: '>',
	GT: '>',
	Gt: '≫',
	gtdot: '⋗',
	gtlPar: '⦕',
	gtquest: '⩼',
	gtrapprox: '⪆',
	gtrarr: '⥸',
	gtrdot: '⋗',
	gtreqless: '⋛',
	gtreqqless: '⪌',
	gtrless: '≷',
	gtrsim: '≳',
	gvertneqq: '≩︀',
	gvnE: '≩︀',
	Hacek: 'ˇ',
	hairsp: ' ',
	half: '½',
	hamilt: 'ℋ',
	HARDcy: 'Ъ',
	hardcy: 'ъ',
	harrcir: '⥈',
	harr: '↔',
	hArr: '⇔',
	harrw: '↭',
	Hat: '^',
	hbar: 'ℏ',
	Hcirc: 'Ĥ',
	hcirc: 'ĥ',
	hearts: '♥',
	heartsuit: '♥',
	hellip: '…',
	hercon: '⊹',
	hfr: '𝔥',
	Hfr: 'ℌ',
	HilbertSpace: 'ℋ',
	hksearow: '⤥',
	hkswarow: '⤦',
	hoarr: '⇿',
	homtht: '∻',
	hookleftarrow: '↩',
	hookrightarrow: '↪',
	hopf: '𝕙',
	Hopf: 'ℍ',
	horbar: '―',
	HorizontalLine: '─',
	hscr: '𝒽',
	Hscr: 'ℋ',
	hslash: 'ℏ',
	Hstrok: 'Ħ',
	hstrok: 'ħ',
	HumpDownHump: '≎',
	HumpEqual: '≏',
	hybull: '⁃',
	hyphen: '‐',
	Iacute: 'Í',
	iacute: 'í',
	ic: '\u2063',
	Icirc: 'Î',
	icirc: 'î',
	Icy: 'И',
	icy: 'и',
	Idot: 'İ',
	IEcy: 'Е',
	iecy: 'е',
	iexcl: '¡',
	iff: '⇔',
	ifr: '𝔦',
	Ifr: 'ℑ',
	Igrave: 'Ì',
	igrave: 'ì',
	ii: 'ⅈ',
	iiiint: '⨌',
	iiint: '∭',
	iinfin: '⧜',
	iiota: '℩',
	IJlig: 'Ĳ',
	ijlig: 'ĳ',
	Imacr: 'Ī',
	imacr: 'ī',
	image: 'ℑ',
	ImaginaryI: 'ⅈ',
	imagline: 'ℐ',
	imagpart: 'ℑ',
	imath: 'ı',
	Im: 'ℑ',
	imof: '⊷',
	imped: 'Ƶ',
	Implies: '⇒',
	incare: '℅',
	'in': '∈',
	infin: '∞',
	infintie: '⧝',
	inodot: 'ı',
	intcal: '⊺',
	int: '∫',
	Int: '∬',
	integers: 'ℤ',
	Integral: '∫',
	intercal: '⊺',
	Intersection: '⋂',
	intlarhk: '⨗',
	intprod: '⨼',
	InvisibleComma: '\u2063',
	InvisibleTimes: '\u2062',
	IOcy: 'Ё',
	iocy: 'ё',
	Iogon: 'Į',
	iogon: 'į',
	Iopf: '𝕀',
	iopf: '𝕚',
	Iota: 'Ι',
	iota: 'ι',
	iprod: '⨼',
	iquest: '¿',
	iscr: '𝒾',
	Iscr: 'ℐ',
	isin: '∈',
	isindot: '⋵',
	isinE: '⋹',
	isins: '⋴',
	isinsv: '⋳',
	isinv: '∈',
	it: '\u2062',
	Itilde: 'Ĩ',
	itilde: 'ĩ',
	Iukcy: 'І',
	iukcy: 'і',
	Iuml: 'Ï',
	iuml: 'ï',
	Jcirc: 'Ĵ',
	jcirc: 'ĵ',
	Jcy: 'Й',
	jcy: 'й',
	Jfr: '𝔍',
	jfr: '𝔧',
	jmath: 'ȷ',
	Jopf: '𝕁',
	jopf: '𝕛',
	Jscr: '𝒥',
	jscr: '𝒿',
	Jsercy: 'Ј',
	jsercy: 'ј',
	Jukcy: 'Є',
	jukcy: 'є',
	Kappa: 'Κ',
	kappa: 'κ',
	kappav: 'ϰ',
	Kcedil: 'Ķ',
	kcedil: 'ķ',
	Kcy: 'К',
	kcy: 'к',
	Kfr: '𝔎',
	kfr: '𝔨',
	kgreen: 'ĸ',
	KHcy: 'Х',
	khcy: 'х',
	KJcy: 'Ќ',
	kjcy: 'ќ',
	Kopf: '𝕂',
	kopf: '𝕜',
	Kscr: '𝒦',
	kscr: '𝓀',
	lAarr: '⇚',
	Lacute: 'Ĺ',
	lacute: 'ĺ',
	laemptyv: '⦴',
	lagran: 'ℒ',
	Lambda: 'Λ',
	lambda: 'λ',
	lang: '⟨',
	Lang: '⟪',
	langd: '⦑',
	langle: '⟨',
	lap: '⪅',
	Laplacetrf: 'ℒ',
	laquo: '«',
	larrb: '⇤',
	larrbfs: '⤟',
	larr: '←',
	Larr: '↞',
	lArr: '⇐',
	larrfs: '⤝',
	larrhk: '↩',
	larrlp: '↫',
	larrpl: '⤹',
	larrsim: '⥳',
	larrtl: '↢',
	latail: '⤙',
	lAtail: '⤛',
	lat: '⪫',
	late: '⪭',
	lates: '⪭︀',
	lbarr: '⤌',
	lBarr: '⤎',
	lbbrk: '❲',
	lbrace: '{',
	lbrack: '[',
	lbrke: '⦋',
	lbrksld: '⦏',
	lbrkslu: '⦍',
	Lcaron: 'Ľ',
	lcaron: 'ľ',
	Lcedil: 'Ļ',
	lcedil: 'ļ',
	lceil: '⌈',
	lcub: '{',
	Lcy: 'Л',
	lcy: 'л',
	ldca: '⤶',
	ldquo: '“',
	ldquor: '„',
	ldrdhar: '⥧',
	ldrushar: '⥋',
	ldsh: '↲',
	le: '≤',
	lE: '≦',
	LeftAngleBracket: '⟨',
	LeftArrowBar: '⇤',
	leftarrow: '←',
	LeftArrow: '←',
	Leftarrow: '⇐',
	LeftArrowRightArrow: '⇆',
	leftarrowtail: '↢',
	LeftCeiling: '⌈',
	LeftDoubleBracket: '⟦',
	LeftDownTeeVector: '⥡',
	LeftDownVectorBar: '⥙',
	LeftDownVector: '⇃',
	LeftFloor: '⌊',
	leftharpoondown: '↽',
	leftharpoonup: '↼',
	leftleftarrows: '⇇',
	leftrightarrow: '↔',
	LeftRightArrow: '↔',
	Leftrightarrow: '⇔',
	leftrightarrows: '⇆',
	leftrightharpoons: '⇋',
	leftrightsquigarrow: '↭',
	LeftRightVector: '⥎',
	LeftTeeArrow: '↤',
	LeftTee: '⊣',
	LeftTeeVector: '⥚',
	leftthreetimes: '⋋',
	LeftTriangleBar: '⧏',
	LeftTriangle: '⊲',
	LeftTriangleEqual: '⊴',
	LeftUpDownVector: '⥑',
	LeftUpTeeVector: '⥠',
	LeftUpVectorBar: '⥘',
	LeftUpVector: '↿',
	LeftVectorBar: '⥒',
	LeftVector: '↼',
	lEg: '⪋',
	leg: '⋚',
	leq: '≤',
	leqq: '≦',
	leqslant: '⩽',
	lescc: '⪨',
	les: '⩽',
	lesdot: '⩿',
	lesdoto: '⪁',
	lesdotor: '⪃',
	lesg: '⋚︀',
	lesges: '⪓',
	lessapprox: '⪅',
	lessdot: '⋖',
	lesseqgtr: '⋚',
	lesseqqgtr: '⪋',
	LessEqualGreater: '⋚',
	LessFullEqual: '≦',
	LessGreater: '≶',
	lessgtr: '≶',
	LessLess: '⪡',
	lesssim: '≲',
	LessSlantEqual: '⩽',
	LessTilde: '≲',
	lfisht: '⥼',
	lfloor: '⌊',
	Lfr: '𝔏',
	lfr: '𝔩',
	lg: '≶',
	lgE: '⪑',
	lHar: '⥢',
	lhard: '↽',
	lharu: '↼',
	lharul: '⥪',
	lhblk: '▄',
	LJcy: 'Љ',
	ljcy: 'љ',
	llarr: '⇇',
	ll: '≪',
	Ll: '⋘',
	llcorner: '⌞',
	Lleftarrow: '⇚',
	llhard: '⥫',
	lltri: '◺',
	Lmidot: 'Ŀ',
	lmidot: 'ŀ',
	lmoustache: '⎰',
	lmoust: '⎰',
	lnap: '⪉',
	lnapprox: '⪉',
	lne: '⪇',
	lnE: '≨',
	lneq: '⪇',
	lneqq: '≨',
	lnsim: '⋦',
	loang: '⟬',
	loarr: '⇽',
	lobrk: '⟦',
	longleftarrow: '⟵',
	LongLeftArrow: '⟵',
	Longleftarrow: '⟸',
	longleftrightarrow: '⟷',
	LongLeftRightArrow: '⟷',
	Longleftrightarrow: '⟺',
	longmapsto: '⟼',
	longrightarrow: '⟶',
	LongRightArrow: '⟶',
	Longrightarrow: '⟹',
	looparrowleft: '↫',
	looparrowright: '↬',
	lopar: '⦅',
	Lopf: '𝕃',
	lopf: '𝕝',
	loplus: '⨭',
	lotimes: '⨴',
	lowast: '∗',
	lowbar: '_',
	LowerLeftArrow: '↙',
	LowerRightArrow: '↘',
	loz: '◊',
	lozenge: '◊',
	lozf: '⧫',
	lpar: '(',
	lparlt: '⦓',
	lrarr: '⇆',
	lrcorner: '⌟',
	lrhar: '⇋',
	lrhard: '⥭',
	lrm: '\u200E',
	lrtri: '⊿',
	lsaquo: '‹',
	lscr: '𝓁',
	Lscr: 'ℒ',
	lsh: '↰',
	Lsh: '↰',
	lsim: '≲',
	lsime: '⪍',
	lsimg: '⪏',
	lsqb: '[',
	lsquo: '‘',
	lsquor: '‚',
	Lstrok: 'Ł',
	lstrok: 'ł',
	ltcc: '⪦',
	ltcir: '⩹',
	lt: '<',
	LT: '<',
	Lt: '≪',
	ltdot: '⋖',
	lthree: '⋋',
	ltimes: '⋉',
	ltlarr: '⥶',
	ltquest: '⩻',
	ltri: '◃',
	ltrie: '⊴',
	ltrif: '◂',
	ltrPar: '⦖',
	lurdshar: '⥊',
	luruhar: '⥦',
	lvertneqq: '≨︀',
	lvnE: '≨︀',
	macr: '¯',
	male: '♂',
	malt: '✠',
	maltese: '✠',
	Map: '⤅',
	map: '↦',
	mapsto: '↦',
	mapstodown: '↧',
	mapstoleft: '↤',
	mapstoup: '↥',
	marker: '▮',
	mcomma: '⨩',
	Mcy: 'М',
	mcy: 'м',
	mdash: '—',
	mDDot: '∺',
	measuredangle: '∡',
	MediumSpace: ' ',
	Mellintrf: 'ℳ',
	Mfr: '𝔐',
	mfr: '𝔪',
	mho: '℧',
	micro: 'µ',
	midast: '*',
	midcir: '⫰',
	mid: '∣',
	middot: '·',
	minusb: '⊟',
	minus: '−',
	minusd: '∸',
	minusdu: '⨪',
	MinusPlus: '∓',
	mlcp: '⫛',
	mldr: '…',
	mnplus: '∓',
	models: '⊧',
	Mopf: '𝕄',
	mopf: '𝕞',
	mp: '∓',
	mscr: '𝓂',
	Mscr: 'ℳ',
	mstpos: '∾',
	Mu: 'Μ',
	mu: 'μ',
	multimap: '⊸',
	mumap: '⊸',
	nabla: '∇',
	Nacute: 'Ń',
	nacute: 'ń',
	nang: '∠⃒',
	nap: '≉',
	napE: '⩰̸',
	napid: '≋̸',
	napos: 'ŉ',
	napprox: '≉',
	natural: '♮',
	naturals: 'ℕ',
	natur: '♮',
	nbsp: ' ',
	nbump: '≎̸',
	nbumpe: '≏̸',
	ncap: '⩃',
	Ncaron: 'Ň',
	ncaron: 'ň',
	Ncedil: 'Ņ',
	ncedil: 'ņ',
	ncong: '≇',
	ncongdot: '⩭̸',
	ncup: '⩂',
	Ncy: 'Н',
	ncy: 'н',
	ndash: '–',
	nearhk: '⤤',
	nearr: '↗',
	neArr: '⇗',
	nearrow: '↗',
	ne: '≠',
	nedot: '≐̸',
	NegativeMediumSpace: '\u200B',
	NegativeThickSpace: '\u200B',
	NegativeThinSpace: '\u200B',
	NegativeVeryThinSpace: '\u200B',
	nequiv: '≢',
	nesear: '⤨',
	nesim: '≂̸',
	NestedGreaterGreater: '≫',
	NestedLessLess: '≪',
	NewLine: '\n',
	nexist: '∄',
	nexists: '∄',
	Nfr: '𝔑',
	nfr: '𝔫',
	ngE: '≧̸',
	nge: '≱',
	ngeq: '≱',
	ngeqq: '≧̸',
	ngeqslant: '⩾̸',
	nges: '⩾̸',
	nGg: '⋙̸',
	ngsim: '≵',
	nGt: '≫⃒',
	ngt: '≯',
	ngtr: '≯',
	nGtv: '≫̸',
	nharr: '↮',
	nhArr: '⇎',
	nhpar: '⫲',
	ni: '∋',
	nis: '⋼',
	nisd: '⋺',
	niv: '∋',
	NJcy: 'Њ',
	njcy: 'њ',
	nlarr: '↚',
	nlArr: '⇍',
	nldr: '‥',
	nlE: '≦̸',
	nle: '≰',
	nleftarrow: '↚',
	nLeftarrow: '⇍',
	nleftrightarrow: '↮',
	nLeftrightarrow: '⇎',
	nleq: '≰',
	nleqq: '≦̸',
	nleqslant: '⩽̸',
	nles: '⩽̸',
	nless: '≮',
	nLl: '⋘̸',
	nlsim: '≴',
	nLt: '≪⃒',
	nlt: '≮',
	nltri: '⋪',
	nltrie: '⋬',
	nLtv: '≪̸',
	nmid: '∤',
	NoBreak: '\u2060',
	NonBreakingSpace: ' ',
	nopf: '𝕟',
	Nopf: 'ℕ',
	Not: '⫬',
	not: '¬',
	NotCongruent: '≢',
	NotCupCap: '≭',
	NotDoubleVerticalBar: '∦',
	NotElement: '∉',
	NotEqual: '≠',
	NotEqualTilde: '≂̸',
	NotExists: '∄',
	NotGreater: '≯',
	NotGreaterEqual: '≱',
	NotGreaterFullEqual: '≧̸',
	NotGreaterGreater: '≫̸',
	NotGreaterLess: '≹',
	NotGreaterSlantEqual: '⩾̸',
	NotGreaterTilde: '≵',
	NotHumpDownHump: '≎̸',
	NotHumpEqual: '≏̸',
	notin: '∉',
	notindot: '⋵̸',
	notinE: '⋹̸',
	notinva: '∉',
	notinvb: '⋷',
	notinvc: '⋶',
	NotLeftTriangleBar: '⧏̸',
	NotLeftTriangle: '⋪',
	NotLeftTriangleEqual: '⋬',
	NotLess: '≮',
	NotLessEqual: '≰',
	NotLessGreater: '≸',
	NotLessLess: '≪̸',
	NotLessSlantEqual: '⩽̸',
	NotLessTilde: '≴',
	NotNestedGreaterGreater: '⪢̸',
	NotNestedLessLess: '⪡̸',
	notni: '∌',
	notniva: '∌',
	notnivb: '⋾',
	notnivc: '⋽',
	NotPrecedes: '⊀',
	NotPrecedesEqual: '⪯̸',
	NotPrecedesSlantEqual: '⋠',
	NotReverseElement: '∌',
	NotRightTriangleBar: '⧐̸',
	NotRightTriangle: '⋫',
	NotRightTriangleEqual: '⋭',
	NotSquareSubset: '⊏̸',
	NotSquareSubsetEqual: '⋢',
	NotSquareSuperset: '⊐̸',
	NotSquareSupersetEqual: '⋣',
	NotSubset: '⊂⃒',
	NotSubsetEqual: '⊈',
	NotSucceeds: '⊁',
	NotSucceedsEqual: '⪰̸',
	NotSucceedsSlantEqual: '⋡',
	NotSucceedsTilde: '≿̸',
	NotSuperset: '⊃⃒',
	NotSupersetEqual: '⊉',
	NotTilde: '≁',
	NotTildeEqual: '≄',
	NotTildeFullEqual: '≇',
	NotTildeTilde: '≉',
	NotVerticalBar: '∤',
	nparallel: '∦',
	npar: '∦',
	nparsl: '⫽⃥',
	npart: '∂̸',
	npolint: '⨔',
	npr: '⊀',
	nprcue: '⋠',
	nprec: '⊀',
	npreceq: '⪯̸',
	npre: '⪯̸',
	nrarrc: '⤳̸',
	nrarr: '↛',
	nrArr: '⇏',
	nrarrw: '↝̸',
	nrightarrow: '↛',
	nRightarrow: '⇏',
	nrtri: '⋫',
	nrtrie: '⋭',
	nsc: '⊁',
	nsccue: '⋡',
	nsce: '⪰̸',
	Nscr: '𝒩',
	nscr: '𝓃',
	nshortmid: '∤',
	nshortparallel: '∦',
	nsim: '≁',
	nsime: '≄',
	nsimeq: '≄',
	nsmid: '∤',
	nspar: '∦',
	nsqsube: '⋢',
	nsqsupe: '⋣',
	nsub: '⊄',
	nsubE: '⫅̸',
	nsube: '⊈',
	nsubset: '⊂⃒',
	nsubseteq: '⊈',
	nsubseteqq: '⫅̸',
	nsucc: '⊁',
	nsucceq: '⪰̸',
	nsup: '⊅',
	nsupE: '⫆̸',
	nsupe: '⊉',
	nsupset: '⊃⃒',
	nsupseteq: '⊉',
	nsupseteqq: '⫆̸',
	ntgl: '≹',
	Ntilde: 'Ñ',
	ntilde: 'ñ',
	ntlg: '≸',
	ntriangleleft: '⋪',
	ntrianglelefteq: '⋬',
	ntriangleright: '⋫',
	ntrianglerighteq: '⋭',
	Nu: 'Ν',
	nu: 'ν',
	num: '#',
	numero: '№',
	numsp: ' ',
	nvap: '≍⃒',
	nvdash: '⊬',
	nvDash: '⊭',
	nVdash: '⊮',
	nVDash: '⊯',
	nvge: '≥⃒',
	nvgt: '>⃒',
	nvHarr: '⤄',
	nvinfin: '⧞',
	nvlArr: '⤂',
	nvle: '≤⃒',
	nvlt: '<⃒',
	nvltrie: '⊴⃒',
	nvrArr: '⤃',
	nvrtrie: '⊵⃒',
	nvsim: '∼⃒',
	nwarhk: '⤣',
	nwarr: '↖',
	nwArr: '⇖',
	nwarrow: '↖',
	nwnear: '⤧',
	Oacute: 'Ó',
	oacute: 'ó',
	oast: '⊛',
	Ocirc: 'Ô',
	ocirc: 'ô',
	ocir: '⊚',
	Ocy: 'О',
	ocy: 'о',
	odash: '⊝',
	Odblac: 'Ő',
	odblac: 'ő',
	odiv: '⨸',
	odot: '⊙',
	odsold: '⦼',
	OElig: 'Œ',
	oelig: 'œ',
	ofcir: '⦿',
	Ofr: '𝔒',
	ofr: '𝔬',
	ogon: '˛',
	Ograve: 'Ò',
	ograve: 'ò',
	ogt: '⧁',
	ohbar: '⦵',
	ohm: 'Ω',
	oint: '∮',
	olarr: '↺',
	olcir: '⦾',
	olcross: '⦻',
	oline: '‾',
	olt: '⧀',
	Omacr: 'Ō',
	omacr: 'ō',
	Omega: 'Ω',
	omega: 'ω',
	Omicron: 'Ο',
	omicron: 'ο',
	omid: '⦶',
	ominus: '⊖',
	Oopf: '𝕆',
	oopf: '𝕠',
	opar: '⦷',
	OpenCurlyDoubleQuote: '“',
	OpenCurlyQuote: '‘',
	operp: '⦹',
	oplus: '⊕',
	orarr: '↻',
	Or: '⩔',
	or: '∨',
	ord: '⩝',
	order: 'ℴ',
	orderof: 'ℴ',
	ordf: 'ª',
	ordm: 'º',
	origof: '⊶',
	oror: '⩖',
	orslope: '⩗',
	orv: '⩛',
	oS: 'Ⓢ',
	Oscr: '𝒪',
	oscr: 'ℴ',
	Oslash: 'Ø',
	oslash: 'ø',
	osol: '⊘',
	Otilde: 'Õ',
	otilde: 'õ',
	otimesas: '⨶',
	Otimes: '⨷',
	otimes: '⊗',
	Ouml: 'Ö',
	ouml: 'ö',
	ovbar: '⌽',
	OverBar: '‾',
	OverBrace: '⏞',
	OverBracket: '⎴',
	OverParenthesis: '⏜',
	para: '¶',
	parallel: '∥',
	par: '∥',
	parsim: '⫳',
	parsl: '⫽',
	part: '∂',
	PartialD: '∂',
	Pcy: 'П',
	pcy: 'п',
	percnt: '%',
	period: '.',
	permil: '‰',
	perp: '⊥',
	pertenk: '‱',
	Pfr: '𝔓',
	pfr: '𝔭',
	Phi: 'Φ',
	phi: 'φ',
	phiv: 'ϕ',
	phmmat: 'ℳ',
	phone: '☎',
	Pi: 'Π',
	pi: 'π',
	pitchfork: '⋔',
	piv: 'ϖ',
	planck: 'ℏ',
	planckh: 'ℎ',
	plankv: 'ℏ',
	plusacir: '⨣',
	plusb: '⊞',
	pluscir: '⨢',
	plus: '+',
	plusdo: '∔',
	plusdu: '⨥',
	pluse: '⩲',
	PlusMinus: '±',
	plusmn: '±',
	plussim: '⨦',
	plustwo: '⨧',
	pm: '±',
	Poincareplane: 'ℌ',
	pointint: '⨕',
	popf: '𝕡',
	Popf: 'ℙ',
	pound: '£',
	prap: '⪷',
	Pr: '⪻',
	pr: '≺',
	prcue: '≼',
	precapprox: '⪷',
	prec: '≺',
	preccurlyeq: '≼',
	Precedes: '≺',
	PrecedesEqual: '⪯',
	PrecedesSlantEqual: '≼',
	PrecedesTilde: '≾',
	preceq: '⪯',
	precnapprox: '⪹',
	precneqq: '⪵',
	precnsim: '⋨',
	pre: '⪯',
	prE: '⪳',
	precsim: '≾',
	prime: '′',
	Prime: '″',
	primes: 'ℙ',
	prnap: '⪹',
	prnE: '⪵',
	prnsim: '⋨',
	prod: '∏',
	Product: '∏',
	profalar: '⌮',
	profline: '⌒',
	profsurf: '⌓',
	prop: '∝',
	Proportional: '∝',
	Proportion: '∷',
	propto: '∝',
	prsim: '≾',
	prurel: '⊰',
	Pscr: '𝒫',
	pscr: '𝓅',
	Psi: 'Ψ',
	psi: 'ψ',
	puncsp: ' ',
	Qfr: '𝔔',
	qfr: '𝔮',
	qint: '⨌',
	qopf: '𝕢',
	Qopf: 'ℚ',
	qprime: '⁗',
	Qscr: '𝒬',
	qscr: '𝓆',
	quaternions: 'ℍ',
	quatint: '⨖',
	quest: '?',
	questeq: '≟',
	quot: '"',
	QUOT: '"',
	rAarr: '⇛',
	race: '∽̱',
	Racute: 'Ŕ',
	racute: 'ŕ',
	radic: '√',
	raemptyv: '⦳',
	rang: '⟩',
	Rang: '⟫',
	rangd: '⦒',
	range: '⦥',
	rangle: '⟩',
	raquo: '»',
	rarrap: '⥵',
	rarrb: '⇥',
	rarrbfs: '⤠',
	rarrc: '⤳',
	rarr: '→',
	Rarr: '↠',
	rArr: '⇒',
	rarrfs: '⤞',
	rarrhk: '↪',
	rarrlp: '↬',
	rarrpl: '⥅',
	rarrsim: '⥴',
	Rarrtl: '⤖',
	rarrtl: '↣',
	rarrw: '↝',
	ratail: '⤚',
	rAtail: '⤜',
	ratio: '∶',
	rationals: 'ℚ',
	rbarr: '⤍',
	rBarr: '⤏',
	RBarr: '⤐',
	rbbrk: '❳',
	rbrace: '}',
	rbrack: ']',
	rbrke: '⦌',
	rbrksld: '⦎',
	rbrkslu: '⦐',
	Rcaron: 'Ř',
	rcaron: 'ř',
	Rcedil: 'Ŗ',
	rcedil: 'ŗ',
	rceil: '⌉',
	rcub: '}',
	Rcy: 'Р',
	rcy: 'р',
	rdca: '⤷',
	rdldhar: '⥩',
	rdquo: '”',
	rdquor: '”',
	rdsh: '↳',
	real: 'ℜ',
	realine: 'ℛ',
	realpart: 'ℜ',
	reals: 'ℝ',
	Re: 'ℜ',
	rect: '▭',
	reg: '®',
	REG: '®',
	ReverseElement: '∋',
	ReverseEquilibrium: '⇋',
	ReverseUpEquilibrium: '⥯',
	rfisht: '⥽',
	rfloor: '⌋',
	rfr: '𝔯',
	Rfr: 'ℜ',
	rHar: '⥤',
	rhard: '⇁',
	rharu: '⇀',
	rharul: '⥬',
	Rho: 'Ρ',
	rho: 'ρ',
	rhov: 'ϱ',
	RightAngleBracket: '⟩',
	RightArrowBar: '⇥',
	rightarrow: '→',
	RightArrow: '→',
	Rightarrow: '⇒',
	RightArrowLeftArrow: '⇄',
	rightarrowtail: '↣',
	RightCeiling: '⌉',
	RightDoubleBracket: '⟧',
	RightDownTeeVector: '⥝',
	RightDownVectorBar: '⥕',
	RightDownVector: '⇂',
	RightFloor: '⌋',
	rightharpoondown: '⇁',
	rightharpoonup: '⇀',
	rightleftarrows: '⇄',
	rightleftharpoons: '⇌',
	rightrightarrows: '⇉',
	rightsquigarrow: '↝',
	RightTeeArrow: '↦',
	RightTee: '⊢',
	RightTeeVector: '⥛',
	rightthreetimes: '⋌',
	RightTriangleBar: '⧐',
	RightTriangle: '⊳',
	RightTriangleEqual: '⊵',
	RightUpDownVector: '⥏',
	RightUpTeeVector: '⥜',
	RightUpVectorBar: '⥔',
	RightUpVector: '↾',
	RightVectorBar: '⥓',
	RightVector: '⇀',
	ring: '˚',
	risingdotseq: '≓',
	rlarr: '⇄',
	rlhar: '⇌',
	rlm: '\u200F',
	rmoustache: '⎱',
	rmoust: '⎱',
	rnmid: '⫮',
	roang: '⟭',
	roarr: '⇾',
	robrk: '⟧',
	ropar: '⦆',
	ropf: '𝕣',
	Ropf: 'ℝ',
	roplus: '⨮',
	rotimes: '⨵',
	RoundImplies: '⥰',
	rpar: ')',
	rpargt: '⦔',
	rppolint: '⨒',
	rrarr: '⇉',
	Rrightarrow: '⇛',
	rsaquo: '›',
	rscr: '𝓇',
	Rscr: 'ℛ',
	rsh: '↱',
	Rsh: '↱',
	rsqb: ']',
	rsquo: '’',
	rsquor: '’',
	rthree: '⋌',
	rtimes: '⋊',
	rtri: '▹',
	rtrie: '⊵',
	rtrif: '▸',
	rtriltri: '⧎',
	RuleDelayed: '⧴',
	ruluhar: '⥨',
	rx: '℞',
	Sacute: 'Ś',
	sacute: 'ś',
	sbquo: '‚',
	scap: '⪸',
	Scaron: 'Š',
	scaron: 'š',
	Sc: '⪼',
	sc: '≻',
	sccue: '≽',
	sce: '⪰',
	scE: '⪴',
	Scedil: 'Ş',
	scedil: 'ş',
	Scirc: 'Ŝ',
	scirc: 'ŝ',
	scnap: '⪺',
	scnE: '⪶',
	scnsim: '⋩',
	scpolint: '⨓',
	scsim: '≿',
	Scy: 'С',
	scy: 'с',
	sdotb: '⊡',
	sdot: '⋅',
	sdote: '⩦',
	searhk: '⤥',
	searr: '↘',
	seArr: '⇘',
	searrow: '↘',
	sect: '§',
	semi: ';',
	seswar: '⤩',
	setminus: '∖',
	setmn: '∖',
	sext: '✶',
	Sfr: '𝔖',
	sfr: '𝔰',
	sfrown: '⌢',
	sharp: '♯',
	SHCHcy: 'Щ',
	shchcy: 'щ',
	SHcy: 'Ш',
	shcy: 'ш',
	ShortDownArrow: '↓',
	ShortLeftArrow: '←',
	shortmid: '∣',
	shortparallel: '∥',
	ShortRightArrow: '→',
	ShortUpArrow: '↑',
	shy: '\xAD',
	Sigma: 'Σ',
	sigma: 'σ',
	sigmaf: 'ς',
	sigmav: 'ς',
	sim: '∼',
	simdot: '⩪',
	sime: '≃',
	simeq: '≃',
	simg: '⪞',
	simgE: '⪠',
	siml: '⪝',
	simlE: '⪟',
	simne: '≆',
	simplus: '⨤',
	simrarr: '⥲',
	slarr: '←',
	SmallCircle: '∘',
	smallsetminus: '∖',
	smashp: '⨳',
	smeparsl: '⧤',
	smid: '∣',
	smile: '⌣',
	smt: '⪪',
	smte: '⪬',
	smtes: '⪬︀',
	SOFTcy: 'Ь',
	softcy: 'ь',
	solbar: '⌿',
	solb: '⧄',
	sol: '/',
	Sopf: '𝕊',
	sopf: '𝕤',
	spades: '♠',
	spadesuit: '♠',
	spar: '∥',
	sqcap: '⊓',
	sqcaps: '⊓︀',
	sqcup: '⊔',
	sqcups: '⊔︀',
	Sqrt: '√',
	sqsub: '⊏',
	sqsube: '⊑',
	sqsubset: '⊏',
	sqsubseteq: '⊑',
	sqsup: '⊐',
	sqsupe: '⊒',
	sqsupset: '⊐',
	sqsupseteq: '⊒',
	square: '□',
	Square: '□',
	SquareIntersection: '⊓',
	SquareSubset: '⊏',
	SquareSubsetEqual: '⊑',
	SquareSuperset: '⊐',
	SquareSupersetEqual: '⊒',
	SquareUnion: '⊔',
	squarf: '▪',
	squ: '□',
	squf: '▪',
	srarr: '→',
	Sscr: '𝒮',
	sscr: '𝓈',
	ssetmn: '∖',
	ssmile: '⌣',
	sstarf: '⋆',
	Star: '⋆',
	star: '☆',
	starf: '★',
	straightepsilon: 'ϵ',
	straightphi: 'ϕ',
	strns: '¯',
	sub: '⊂',
	Sub: '⋐',
	subdot: '⪽',
	subE: '⫅',
	sube: '⊆',
	subedot: '⫃',
	submult: '⫁',
	subnE: '⫋',
	subne: '⊊',
	subplus: '⪿',
	subrarr: '⥹',
	subset: '⊂',
	Subset: '⋐',
	subseteq: '⊆',
	subseteqq: '⫅',
	SubsetEqual: '⊆',
	subsetneq: '⊊',
	subsetneqq: '⫋',
	subsim: '⫇',
	subsub: '⫕',
	subsup: '⫓',
	succapprox: '⪸',
	succ: '≻',
	succcurlyeq: '≽',
	Succeeds: '≻',
	SucceedsEqual: '⪰',
	SucceedsSlantEqual: '≽',
	SucceedsTilde: '≿',
	succeq: '⪰',
	succnapprox: '⪺',
	succneqq: '⪶',
	succnsim: '⋩',
	succsim: '≿',
	SuchThat: '∋',
	sum: '∑',
	Sum: '∑',
	sung: '♪',
	sup1: '¹',
	sup2: '²',
	sup3: '³',
	sup: '⊃',
	Sup: '⋑',
	supdot: '⪾',
	supdsub: '⫘',
	supE: '⫆',
	supe: '⊇',
	supedot: '⫄',
	Superset: '⊃',
	SupersetEqual: '⊇',
	suphsol: '⟉',
	suphsub: '⫗',
	suplarr: '⥻',
	supmult: '⫂',
	supnE: '⫌',
	supne: '⊋',
	supplus: '⫀',
	supset: '⊃',
	Supset: '⋑',
	supseteq: '⊇',
	supseteqq: '⫆',
	supsetneq: '⊋',
	supsetneqq: '⫌',
	supsim: '⫈',
	supsub: '⫔',
	supsup: '⫖',
	swarhk: '⤦',
	swarr: '↙',
	swArr: '⇙',
	swarrow: '↙',
	swnwar: '⤪',
	szlig: 'ß',
	Tab: '	',
	target: '⌖',
	Tau: 'Τ',
	tau: 'τ',
	tbrk: '⎴',
	Tcaron: 'Ť',
	tcaron: 'ť',
	Tcedil: 'Ţ',
	tcedil: 'ţ',
	Tcy: 'Т',
	tcy: 'т',
	tdot: '⃛',
	telrec: '⌕',
	Tfr: '𝔗',
	tfr: '𝔱',
	there4: '∴',
	therefore: '∴',
	Therefore: '∴',
	Theta: 'Θ',
	theta: 'θ',
	thetasym: 'ϑ',
	thetav: 'ϑ',
	thickapprox: '≈',
	thicksim: '∼',
	ThickSpace: '  ',
	ThinSpace: ' ',
	thinsp: ' ',
	thkap: '≈',
	thksim: '∼',
	THORN: 'Þ',
	thorn: 'þ',
	tilde: '˜',
	Tilde: '∼',
	TildeEqual: '≃',
	TildeFullEqual: '≅',
	TildeTilde: '≈',
	timesbar: '⨱',
	timesb: '⊠',
	times: '×',
	timesd: '⨰',
	tint: '∭',
	toea: '⤨',
	topbot: '⌶',
	topcir: '⫱',
	top: '⊤',
	Topf: '𝕋',
	topf: '𝕥',
	topfork: '⫚',
	tosa: '⤩',
	tprime: '‴',
	trade: '™',
	TRADE: '™',
	triangle: '▵',
	triangledown: '▿',
	triangleleft: '◃',
	trianglelefteq: '⊴',
	triangleq: '≜',
	triangleright: '▹',
	trianglerighteq: '⊵',
	tridot: '◬',
	trie: '≜',
	triminus: '⨺',
	TripleDot: '⃛',
	triplus: '⨹',
	trisb: '⧍',
	tritime: '⨻',
	trpezium: '⏢',
	Tscr: '𝒯',
	tscr: '𝓉',
	TScy: 'Ц',
	tscy: 'ц',
	TSHcy: 'Ћ',
	tshcy: 'ћ',
	Tstrok: 'Ŧ',
	tstrok: 'ŧ',
	twixt: '≬',
	twoheadleftarrow: '↞',
	twoheadrightarrow: '↠',
	Uacute: 'Ú',
	uacute: 'ú',
	uarr: '↑',
	Uarr: '↟',
	uArr: '⇑',
	Uarrocir: '⥉',
	Ubrcy: 'Ў',
	ubrcy: 'ў',
	Ubreve: 'Ŭ',
	ubreve: 'ŭ',
	Ucirc: 'Û',
	ucirc: 'û',
	Ucy: 'У',
	ucy: 'у',
	udarr: '⇅',
	Udblac: 'Ű',
	udblac: 'ű',
	udhar: '⥮',
	ufisht: '⥾',
	Ufr: '𝔘',
	ufr: '𝔲',
	Ugrave: 'Ù',
	ugrave: 'ù',
	uHar: '⥣',
	uharl: '↿',
	uharr: '↾',
	uhblk: '▀',
	ulcorn: '⌜',
	ulcorner: '⌜',
	ulcrop: '⌏',
	ultri: '◸',
	Umacr: 'Ū',
	umacr: 'ū',
	uml: '¨',
	UnderBar: '_',
	UnderBrace: '⏟',
	UnderBracket: '⎵',
	UnderParenthesis: '⏝',
	Union: '⋃',
	UnionPlus: '⊎',
	Uogon: 'Ų',
	uogon: 'ų',
	Uopf: '𝕌',
	uopf: '𝕦',
	UpArrowBar: '⤒',
	uparrow: '↑',
	UpArrow: '↑',
	Uparrow: '⇑',
	UpArrowDownArrow: '⇅',
	updownarrow: '↕',
	UpDownArrow: '↕',
	Updownarrow: '⇕',
	UpEquilibrium: '⥮',
	upharpoonleft: '↿',
	upharpoonright: '↾',
	uplus: '⊎',
	UpperLeftArrow: '↖',
	UpperRightArrow: '↗',
	upsi: 'υ',
	Upsi: 'ϒ',
	upsih: 'ϒ',
	Upsilon: 'Υ',
	upsilon: 'υ',
	UpTeeArrow: '↥',
	UpTee: '⊥',
	upuparrows: '⇈',
	urcorn: '⌝',
	urcorner: '⌝',
	urcrop: '⌎',
	Uring: 'Ů',
	uring: 'ů',
	urtri: '◹',
	Uscr: '𝒰',
	uscr: '𝓊',
	utdot: '⋰',
	Utilde: 'Ũ',
	utilde: 'ũ',
	utri: '▵',
	utrif: '▴',
	uuarr: '⇈',
	Uuml: 'Ü',
	uuml: 'ü',
	uwangle: '⦧',
	vangrt: '⦜',
	varepsilon: 'ϵ',
	varkappa: 'ϰ',
	varnothing: '∅',
	varphi: 'ϕ',
	varpi: 'ϖ',
	varpropto: '∝',
	varr: '↕',
	vArr: '⇕',
	varrho: 'ϱ',
	varsigma: 'ς',
	varsubsetneq: '⊊︀',
	varsubsetneqq: '⫋︀',
	varsupsetneq: '⊋︀',
	varsupsetneqq: '⫌︀',
	vartheta: 'ϑ',
	vartriangleleft: '⊲',
	vartriangleright: '⊳',
	vBar: '⫨',
	Vbar: '⫫',
	vBarv: '⫩',
	Vcy: 'В',
	vcy: 'в',
	vdash: '⊢',
	vDash: '⊨',
	Vdash: '⊩',
	VDash: '⊫',
	Vdashl: '⫦',
	veebar: '⊻',
	vee: '∨',
	Vee: '⋁',
	veeeq: '≚',
	vellip: '⋮',
	verbar: '|',
	Verbar: '‖',
	vert: '|',
	Vert: '‖',
	VerticalBar: '∣',
	VerticalLine: '|',
	VerticalSeparator: '❘',
	VerticalTilde: '≀',
	VeryThinSpace: ' ',
	Vfr: '𝔙',
	vfr: '𝔳',
	vltri: '⊲',
	vnsub: '⊂⃒',
	vnsup: '⊃⃒',
	Vopf: '𝕍',
	vopf: '𝕧',
	vprop: '∝',
	vrtri: '⊳',
	Vscr: '𝒱',
	vscr: '𝓋',
	vsubnE: '⫋︀',
	vsubne: '⊊︀',
	vsupnE: '⫌︀',
	vsupne: '⊋︀',
	Vvdash: '⊪',
	vzigzag: '⦚',
	Wcirc: 'Ŵ',
	wcirc: 'ŵ',
	wedbar: '⩟',
	wedge: '∧',
	Wedge: '⋀',
	wedgeq: '≙',
	weierp: '℘',
	Wfr: '𝔚',
	wfr: '𝔴',
	Wopf: '𝕎',
	wopf: '𝕨',
	wp: '℘',
	wr: '≀',
	wreath: '≀',
	Wscr: '𝒲',
	wscr: '𝓌',
	xcap: '⋂',
	xcirc: '◯',
	xcup: '⋃',
	xdtri: '▽',
	Xfr: '𝔛',
	xfr: '𝔵',
	xharr: '⟷',
	xhArr: '⟺',
	Xi: 'Ξ',
	xi: 'ξ',
	xlarr: '⟵',
	xlArr: '⟸',
	xmap: '⟼',
	xnis: '⋻',
	xodot: '⨀',
	Xopf: '𝕏',
	xopf: '𝕩',
	xoplus: '⨁',
	xotime: '⨂',
	xrarr: '⟶',
	xrArr: '⟹',
	Xscr: '𝒳',
	xscr: '𝓍',
	xsqcup: '⨆',
	xuplus: '⨄',
	xutri: '△',
	xvee: '⋁',
	xwedge: '⋀',
	Yacute: 'Ý',
	yacute: 'ý',
	YAcy: 'Я',
	yacy: 'я',
	Ycirc: 'Ŷ',
	ycirc: 'ŷ',
	Ycy: 'Ы',
	ycy: 'ы',
	yen: '¥',
	Yfr: '𝔜',
	yfr: '𝔶',
	YIcy: 'Ї',
	yicy: 'ї',
	Yopf: '𝕐',
	yopf: '𝕪',
	Yscr: '𝒴',
	yscr: '𝓎',
	YUcy: 'Ю',
	yucy: 'ю',
	yuml: 'ÿ',
	Yuml: 'Ÿ',
	Zacute: 'Ź',
	zacute: 'ź',
	Zcaron: 'Ž',
	zcaron: 'ž',
	Zcy: 'З',
	zcy: 'з',
	Zdot: 'Ż',
	zdot: 'ż',
	zeetrf: 'ℨ',
	ZeroWidthSpace: '\u200B',
	Zeta: 'Ζ',
	zeta: 'ζ',
	zfr: '𝔷',
	Zfr: 'ℨ',
	ZHcy: 'Ж',
	zhcy: 'ж',
	zigrarr: '⇝',
	zopf: '𝕫',
	Zopf: 'ℤ',
	Zscr: '𝒵',
	zscr: '𝓏',
	zwj: '\u200D',
	zwnj: '\u200C',
});

const CONTINUE_ENTITIES = /*#__PURE__*/ NULL({ Aacute:0, aacute:0, Acirc:0, acirc:0, acute:0, AElig:0, aelig:0, Agrave:0, agrave:0, amp:0, AMP:0, Aring:0, aring:0, Atilde:0, atilde:0, Auml:0, auml:0, brvbar:0, Ccedil:0, ccedil:0, cedil:0, cent:0, copy:0, COPY:0, curren:0, deg:0, divide:0, Eacute:0, eacute:0, Ecirc:0, ecirc:0, Egrave:0, egrave:0, ETH:0, eth:0, Euml:0, euml:0, frac12:0, frac14:0, frac34:0, gt:0, GT:0, Iacute:0, iacute:0, Icirc:0, icirc:0, iexcl:0, Igrave:0, igrave:0, iquest:0, Iuml:0, iuml:0, laquo:0, lt:0, LT:0, macr:0, micro:0, middot:0, nbsp:0, not:0, Ntilde:0, ntilde:0, Oacute:0, oacute:0, Ocirc:0, ocirc:0, Ograve:0, ograve:0, ordf:0, ordm:0, Oslash:0, oslash:0, Otilde:0, otilde:0, Ouml:0, ouml:0, para:0, plusmn:0, pound:0, quot:0, QUOT:0, raquo:0, reg:0, REG:0, sect:0, shy:0, sup1:0, sup2:0, sup3:0, szlig:0, THORN:0, thorn:0, times:0, Uacute:0, uacute:0, Ucirc:0, ucirc:0, Ugrave:0, ugrave:0, uml:0, Uuml:0, uuml:0, Yacute:0, yacute:0, yen:0, yuml:0 });

const ESCAPABLE_INNER_TEXT = /[\t\n\r\x20&<\xA0\u2000-\u200A\u2028\u2029\u202F\u3000]/g;// 除了必须转义的，还有防止被 Vue 编译器剔除的空白
const escapableInnerTextReplacer = ($0        ) => `&#${$0.charCodeAt(0)};`;
function escapeInnerText (text        )         { return text.replace(ESCAPABLE_INNER_TEXT, escapableInnerTextReplacer); }

const ESCAPABLE_ATTRIBUTE_VALUE = /["&]/g;
const escapableAttributeValueReplacer = ($0        ) => $0==='"' ? '&quot;' : '&amp;';
function escapeAttributeValue (text        )         { return text.replace(ESCAPABLE_ATTRIBUTE_VALUE, escapableAttributeValueReplacer); }

const CONTROL_TO_CHAR = NULL({
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

function unescape_or_return (ambiguous_ampersand        , inner        )         {
	if ( inner[0]==='#' ) {
		const codePoint         = ambiguous_ampersand[2]==='x'
			? parseInt(inner.slice(2), 16)
			: parseInt(inner.slice(1), 10);
		if ( codePoint===0x00 || 0xD800<=codePoint && codePoint<=0xDFFF || 0x10FFFF<codePoint ) { return '\uFFFD'; }
		return fromCodePoint(codePoint in CONTROL_TO_CHAR ? CONTROL_TO_CHAR[codePoint                                ] : codePoint);
	}
	else {
		if ( ambiguous_ampersand.endsWith(';') && inner in SEMICOLON_ENTITIES ) { return SEMICOLON_ENTITIES[inner]; }
		for ( let index = inner.length; ;--index ) {
			if ( inner.slice(0, index) in CONTINUE_ENTITIES ) {
				return SEMICOLON_ENTITIES[ambiguous_ampersand.slice(0, index)]+ambiguous_ampersand.slice(index);
			}
			if ( index===1 ) { return ambiguous_ampersand; }
		}
	}
}

const ENTITIES = /&(?:(?:([a-z][a-z\d]*)|#(?:\d+|x[\dA-F]+));?)?/ig;

function unescape_or_throw (ambiguous_ampersand        , named         )         {
	if ( ambiguous_ampersand.length===1 ) { throw SyntaxError(`孤立的“&”没有作为 HTML 实体存在`); }
	if ( !ambiguous_ampersand.endsWith(';') ) { throw SyntaxError(`HTML 实体“${ambiguous_ampersand}”后缺少“;”`); }
	if ( named ) {
		if ( named in SEMICOLON_ENTITIES ) { return SEMICOLON_ENTITIES[named]; }
		throw ReferenceError(`未知的 HTML 实体名称“${ambiguous_ampersand}”`);
	}
	const codePoint         = ambiguous_ampersand[2]==='x' ? parseInt(ambiguous_ampersand.slice(3, -1), 16) : parseInt(ambiguous_ampersand.slice(2, -1), 10);
	if ( codePoint===0x00 ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值为空（U+0000）码点`); }
	if ( codePoint>0x10FFFF ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值超出了 Unicode 的最大范围（U+10FFFF）`); }
	const unicode         = fromCodePoint(codePoint);
	if ( NON_SCALAR.test(unicode) ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值是单个代理对码点（U+D800〜U+DFFF）`); }
	if ( NONCHARACTER.test(unicode) ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值是永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
	if ( CONTROL_CHARACTER.test(unicode) || codePoint===0x0D ) { throw RangeError(`HTML 实体“${ambiguous_ampersand}”数值是除水平制表（U+0009）换行（U+000A）换页（U+000C）以外的控制字符（U+0000〜U+001F、U+007F〜U+009F）`); }
	return unicode;
}

function unescape (string        , fallback          )         {
	return fallback
		? string.replace(ENTITIES_TO_TRY, unescape_or_return)
		: string.replace(ENTITIES, unescape_or_throw);
}

const keys = Object.keys;

const Object_defineProperties = Object.defineProperties;

const Reflect_apply = Reflect.apply;

const Reflect_construct = Reflect.construct;

const Reflect_defineProperty = Reflect.defineProperty;

const Reflect_deleteProperty = Reflect.deleteProperty;

const Reflect_set = Reflect.set;

const Reflect_ownKeys = Reflect.ownKeys;

/*!
 * 模块名称：j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。从属于“简计划”。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string. Belong to "Plan J".
 * 模块版本：5.3.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const Keeper = Set;
const target2keeper                          = new WeakMap;
const proxy2target                         = new WeakMap;
const target2proxy                         = new WeakMap;

const setDescriptor = /*#__PURE__*/Object_assign(create(null), {
	value: undefined$1,
	writable: true,
	enumerable: true,
	configurable: true,
});
const handlers = /*#__PURE__*/Object_assign(create(null), {
	apply (Function                           , thisArg     , args       ) {
		return orderify(Reflect_apply(Function, thisArg, args));
	},
	construct (Class                               , args       , newTarget     ) {
		return orderify(Reflect_construct(Class, args, newTarget));
	},
	defineProperty (target    , key     , descriptor                    )          {
		if ( Reflect_defineProperty(target, key, PartialDescriptor(descriptor)) ) {
			target2keeper.get(target) .add(key);
			return true;
		}
		return false;
	},
	deleteProperty (target    , key     )          {
		if ( Reflect_deleteProperty(target, key) ) {
			target2keeper.get(target) .delete(key);
			return true;
		}
		return false;
	},
	ownKeys (target    )        {
		return [ ...target2keeper.get(target)  ];
	},
	set (target    , key     , value     , receiver    )          {
		if ( key in target ) { return Reflect_set(target, key, value, receiver); }
		setDescriptor.value = value;
		if ( Reflect_defineProperty(target, key, setDescriptor) ) {
			target2keeper.get(target) .add(key);
			setDescriptor.value = undefined$1;
			return true;
		}
		else {
			setDescriptor.value = undefined$1;
			return false;
		}
	},
});

function newProxy                   (target   , keeper        )    {
	target2keeper.set(target, keeper);
	const proxy    = new Proxy(target, handlers);
	proxy2target.set(proxy, target);
	return proxy;
}

const { orderify } = {
	orderify                   (object   )    {
		if ( proxy2target.has(object) ) { return object; }
		let proxy                = target2proxy.get(object)                 ;
		if ( proxy ) { return proxy; }
		proxy = newProxy(object, new Keeper(Reflect_ownKeys(object)));
		target2proxy.set(object, proxy);
		return proxy;
	}
};

function PartialDescriptor                               (source   )    {
	const target    = create(null);
	if ( source.hasOwnProperty('value') ) {
		target.value = source.value;
		if ( source.hasOwnProperty('writable') ) { target.writable = source.writable; }
	}
	else if ( source.hasOwnProperty('writable') ) { target.writable = source.writable; }
	else if ( source.hasOwnProperty('get') ) {
		target.get = source.get;
		if ( source.hasOwnProperty('set') ) { target.set = source.set; }
	}
	else if ( source.hasOwnProperty('set') ) { target.set = source.set; }
	if ( source.hasOwnProperty('enumerable') ) { target.enumerable = source.enumerable; }
	if ( source.hasOwnProperty('configurable') ) { target.configurable = source.configurable; }
	return target;
}
function InternalDescriptor                               (source   )    {
	const target    = create(null);
	if ( source.hasOwnProperty('value') ) {
		target.value = source.value;
		target.writable = source.writable;
	}
	else {
		target.get = source.get;
		target.set = source.set;
	}
	target.enumerable = source.enumerable;
	target.configurable = source.configurable;
	return target;
}

const { getOwnPropertyDescriptors: getOwnPropertyDescriptors$1 } = {
	getOwnPropertyDescriptors                   (object   )                                                    {
		const descriptors = create(null);
		const keeper         = new Keeper;
		const keys = Reflect_ownKeys(object);
		for ( let length         = keys.length, index         = 0; index<length; ++index ) {
			const key = keys[index];
			descriptors[key] = InternalDescriptor(Object_getOwnPropertyDescriptor(object, key) );
			keeper.add(key);
		}
		return newProxy(descriptors, keeper);
	}
};

function keeperAddKeys (keeper        , object    )       {
	const keys        = Reflect_ownKeys(object);
	for ( let length         = keys.length, index         = 0; index<length; ++index ) {
		keeper.add(keys[index]);
	}
}
function NULL_from (source           , define         )      {
	const target = create(null);
	const keeper         = new Keeper;
	if ( define ) {
		if ( isArray(source) ) {
			for ( let length         = source.length, index         = 0; index<length; ++index ) {
				const descriptorMap = getOwnPropertyDescriptors$1(source[index]);
				Object_defineProperties(target, descriptorMap);
				keeperAddKeys(keeper, descriptorMap);
			}
		}
		else {
			const descriptorMap = getOwnPropertyDescriptors$1(source);
			Object_defineProperties(target, descriptorMap);
			keeperAddKeys(keeper, descriptorMap);
		}
	}
	else {
		if ( isArray(source) ) {
			Object_assign(target, ...source);
			for ( let length         = source.length, index         = 0; index<length; ++index ) {
				keeperAddKeys(keeper, source[index]);
			}
		}
		else {
			Object_assign(target, source);
			keeperAddKeys(keeper, source);
		}
	}
	return newProxy(target, keeper);
}
function throwConstructing ()        { throw TypeError(`NULL cannot be invoked with 'new'`); }
const NULL$1                                   =
	/*#__PURE__*/
	function (         ) {
		const NULL      = function                (              source          , define          )    {
			return new.target
				? new.target===NULL
					? /*#__PURE__*/ throwConstructing()
					: /*#__PURE__*/ newProxy(this, new Keeper)
				: /*#__PURE__*/ NULL_from(source , define );
		};
		NULL.prototype = null;
		//delete NULL.name;
		//delete NULL.length;
		freeze(NULL);
		return NULL;
	}();

/*¡ j-orderify */

class Attributes extends NULL$1         {
	
	                                                                
	                                                                            
	[Symbol.toPrimitive] (                  hint                                 )                  {
		if ( hint==='number' ) { return keys(this).length; }
		let literal         = '';
		for ( const name in this ) {
			const value = this[name];
			literal += value===undefined$1 ? ` ${name}` : ` ${name}="${escapeAttributeValue(value)}"`;
		}
		return literal;
	}
	
}
delete Attributes.prototype.constructor;

freeze(Attributes.prototype);

const ELEMENT_START      = 1.1;
const ELEMENT_END      = 1.2;
const ELEMENT_SELF_CLOSING      = 1.3;
const TEXT    = 3;
const COMMENT    = 8;
const EOF    = 0;

function Tag (html        , position        , foreign         ) {
	
	let rest        ;
	
	if ( html.startsWith('<', position) ) {
		
		if ( html.startsWith('!', position+1) ) {
			if ( !html.startsWith('--', position+2) ) { throw SyntaxError(html.startsWith('[CDATA[', position+2) && !foreign ? `“<![CDATA[”“]]>”语法只能用于 foreign 元素（MathML 或 SVG）内` : `标准的注释语法应由“<!--”而非“ <!”开启`); }
			if ( html.startsWith('>', position+4) || html.startsWith('->', position+4) ) { throw SyntaxError(`紧随“<!--”注释开始语法之后出现的“>”或“->”会造成注释意外中断`); }
			const end         = html.indexOf('-->', position+4);
			if ( end<0 ) { throw SyntaxError(html.includes('--!>', position+4) ? '应使用“-->”而非“--!>”关闭注释节点' : '存在未关闭的注释节点'); }
			const data         = html.slice(position+4, end);
			if ( data.includes('--!>') ) { throw SyntaxError(`“--!>”会造成注释意外中断`); }
			return { type: COMMENT, data, end: end+3 };
		}
		
		if ( html.startsWith('?', position+1) ) { throw SyntaxError(foreign ? `不知该如何对待“<?”开启的 XML 指令/声明` : `在 HTML 上下文中，“<?”XML 指令/声明只会被作为注释对待，而且其引号属性并不安全`); }
		
		rest = html.slice(position);
		
		if ( IS_TAG.test(rest) ) {
			const { 0: { length }, 1: endSolidus, 2: xName, 3: attributesLiteral, 4: selfClosingSolidus } = TAG.exec(rest) || throwSyntaxError('标签格式有误');
			if ( endSolidus ) {
				if ( attributesLiteral ) { throw SyntaxError(`结束标签中存在属性`); }
				if ( selfClosingSolidus ) { throw SyntaxError(`结束标签中存在自关闭斜杠`); }
				return { type: ELEMENT_END, xName, end: position+length };
			}
			const attributes             = new Attributes;
			if ( attributesLiteral ) {
				for ( let name of attributesLiteral.match(ATTRIBUTE)  ) {
					let value                    ;
					if ( name.includes('=') ) {
						( { 1: name, 2: value } = ATTRIBUTE_NAME_VALUE.exec(name)  );
						value = unescape(value.startsWith('"') || value.startsWith('\'') ? value.slice(1, -1) : value);
					}
					if ( name in attributes ) { throw SyntaxError(`标签中出现了重复的属性“${name}”`); }
					else { attributes[name] = value; }
				}
				if ( attributesLiteral.endsWith('/') ) { throw SyntaxError(`标签结尾处的“/”有歧义，无法达到标注标签为自闭合的目的，而是会作为最后一个无引号属性值的结束字符`); }
			}
			return { type: selfClosingSolidus ? ELEMENT_SELF_CLOSING : ELEMENT_START, xName, attributes, end: position+length };
		}
		
	}
	
	else { rest = html.slice(position); }
	
	if ( rest ) {
		let end         = rest.search(TAG_LIKE);
		end = end<0 ? html.length : position+end;
		return { type: TEXT, raw: html.slice(position, end), end };
	}
	
	return { type: EOF, end: html.length };
	
}

class Block                                    extends NULL {
	
	constructor (blockName           , attributes            , emitProperties         , inner                    , END_TAG               ) {
		super();
		this.blockName = blockName;
		this.attributes = attributes;
		if ( inner===undefined$1 ) {
			if ( emitProperties ) {
				if ( attributes.src===undefined$1 ) { throw SyntaxError(`自闭合功能块元素必须存在 src 属性值`); }
				this.src = attributes.src;
				if ( 'lang' in attributes ) { throw SyntaxError(`自闭合功能块元素不支持 lang 属性`); }
			}
		}
		else {
			this.inner = inner;
			if ( emitProperties ) {
				if ( 'src' in attributes ) { throw SyntaxError(`开放功能块元素不能存在 src 属性`); }
				if ( 'lang' in attributes ) {
					if ( !attributes.lang ) { throw SyntaxError(`开放功能块元素的 lang 属性如果设置，值不能为空`); }
					this.lang = attributes.lang;
				}
			}
			if ( END_TAG && END_TAG.test(inner) ) { throw SyntaxError(`“${blockName}”块内包含疑似结束标签的内容（注意 .vue 文件需要确保单行/多行解析模式与传统 HTML 流式解析的结果一致）`); }
		}
	}
	
	blockName           ;
	attributes            ;
	               
	             
	              
	
}

const SCRIPT_END_TAG = newRegExp.i`</script${TAG_EMIT_CHAR}`;

const JS = newRegExp.i`^\s*(?:
	JS|JavaScript(?:\s*1\.\d)?
	|
	(?:ES|ECMAScript|ECMAS?)(?:\s*\d+)?
	|
	ESM
	|
	(?:text|application)\/(?:ECMAScript|JavaScript(?:;\s*version\s*=\s*1\.\d)?)
)\s*$`;

class Script extends Block {
	
	constructor (attributes            , inner                    ) { super('script', attributes, true, inner, SCRIPT_END_TAG); }
	
	get innerJS ()         {
		let inner = this.inner;
		if ( typeof inner!=='string' ) { throw Error(`自闭合的 script 功能块元素必须自行（根据 src 属性）加载 inner 值`); }
		if ( this.lang && !JS.test(this.lang) ) { throw Error(`script 功能块元素如果设置了非 js 的 lang 属性值，那么必须自行提供转译后的 inner，并将 lang 设置为 js`); }
		return inner;
	}
	
}

const Private = (
	/*! j-globals: private (internal) */
	typeof WeakMap==='function'
		? /*#__PURE__*/ function () {
			var Weak = WeakMap;
			var GET = create(null);
			GET.value = Weak.prototype.get;
			var SET = create(null);
			SET.value = Weak.prototype.set;
			function add (weak, THIS) {
				var _THIS = create(null);
				weak.set(THIS, _THIS);
				return _THIS;
			}
			return function Private () {
				var weak = /*#__PURE__*/ defineProperty(/*#__PURE__*/ defineProperty(/*#__PURE__*/ new Weak, 'get', GET), 'set', SET);
				return function _ (THIS) {
					return /*#__PURE__*/ weak.get(THIS) || /*#__PURE__*/ add(weak, THIS);
				};
			};
		}()
		: function Private () { return checkNewline; }
	/*¡ j-globals: private (internal) */
);

const _ = Private();

const SELECTOR = newRegExp`^
	\s*(?:
		${AliasName}\s*
		(?:=\s*
			(?:${localName$1}|(?=\.))
			(?:\.${className})*
		\s*)?;
	\s*)*
$`;

const STYLE_END_TAG = newRegExp.i`</style${TAG_EMIT_CHAR}`;

const CSS = /^\s*(?:text\/)?CSS\s*$/i;

const NAME_IN_CSS = /(?<=[\s,>}{\](+~]|\*\/|^)(?:[A-Z][\w-]*)+(?=[\s,>{}[)+~#:.]|\/\*|$)/g;

class Style extends Block          {
	
	                
	               
	
	constructor (attributes            , inner                    ) {
		
		super('style', attributes, true, inner, STYLE_END_TAG);
		
		const _this        = _(this);
		
		if ( 'abbr.' in attributes ) {
			const literal = attributes['abbr.'];
			if ( literal===undefined$1 ) { throw SyntaxError(`style 功能块元素的“abbr.”属性的缺省值写法还没有实现`); }
			else {
				if ( !SELECTOR.test(literal) ) { throw SyntaxError(`style 块的“abbr.”属性语法错误：\n${literal}`); }
				const abbr           = create(null);
				for ( const pair of literal.split(';') ) {
					const tokens = pair.match(TOKENS);
					if ( tokens ) {
						const componentName         = tokens[0];
						abbr[componentName] = tokens.length>1
							? tokens[1]
							: `.__${componentName}__`;
					}
				}
				_this.abbr = abbr;
			}
		}
		
		if ( 'media' in attributes ) {
			if ( attributes.media===undefined$1 ) { throw SyntaxError(`style 功能块元素的 media 属性必须具有值`); }
			_this.media = attributes.media;
		}
		
	}
	
	get innerCSS ()         {
		let { inner } = this;
		if ( typeof inner!=='string' ) { throw Error(`自闭合的 style 功能块元素必须自行（根据 src 属性）加载 inner 值`); }
		if ( this.lang && !CSS.test(this.lang) ) { throw Error(`style 功能块元素如果设置了非 css 的 lang 属性值，那么必须自行提供转译后的 inner，并将 lang 设置为 css`); }
		const { abbr } = _(this);
		if ( abbr ) { inner = inner.replace(NAME_IN_CSS, (componentName        )         => componentName in abbr ? abbr[componentName] : componentName); }
		return inner;
	}
	
}

const _parentNode = Symbol('#parentNode');

class Node {
	
	                     
	get parentNode ()              { return this[_parentNode] || null; }
	
	         childNodes                           = new Array;
	
	get firstChild ()              {
		return this.childNodes.length ? this.childNodes[0] : null;
	}
	
	get lastChild ()              {
		return this.childNodes.length ? this.childNodes[this.childNodes.length-1] : null;
	}
	
	appendChild                           (node   )    {
		if ( node[_parentNode] ) { node[_parentNode] .childNodes.splice(node[_parentNode] .childNodes.indexOf(node), 1); }
		node[_parentNode] = this;
		this.childNodes.push(node);
		return node;
	}
	
}
freeze(Node.prototype);

class Element extends Node {
	
	constructor (localName        , attributes            , partial          ) {
		super();
		if ( partial && localName in partial ) {
			const { tagName, class: classNames } = partial[localName];
			if ( classNames ) {
				attributes.class = 'class' in attributes
					? attributes.class
						? classNames+' '+attributes.class
						: classNames
					: classNames;
			}
			localName = tagName;
		}
		this.localName = localName;
		this.attributes = attributes;
	}
	
	localName        ;
	attributes            ;
	
	get outerHTML ()         {
		let innerHTML         = '';
		for ( const childNode of this.childNodes ) { innerHTML += childNode.outerHTML; }
		return innerHTML
			? `<${this.localName}${this.attributes}>${innerHTML}</${this.localName}>`
			: `<${this.localName}${this.attributes} />`;
	}
	
	* toSource (tab         = '\t')                           {
		if ( this.childNodes.length ) {
			yield `<${this.localName}${this.attributes}>`;
			for ( const childNode of this.childNodes ) {
				for ( const line of childNode.toSource(tab) ) {
					yield `${tab}${line}`;
				}
			}
			yield `</${this.localName}>`;
		}
		else {
			yield `<${this.localName}${this.attributes} />`;
		}
	}
	
}
freeze(Element.prototype);

const childNodesPropertyDescriptor = PropertyDescriptor(/*#__PURE__*/freeze([]), true, false, true);

class CharacterData extends Node {
	
	constructor (data        ) {
		super();
		defineProperty(this, 'childNodes', childNodesPropertyDescriptor);
		this.data = data;
	}
	
	data        ;
	
}

freeze(CharacterData.prototype);

class Text extends CharacterData {
	
	constructor (data         = '') {
		super(data);
	}
	
	get outerHTML ()         {
		return escapeInnerText(this.data);
	}
	
	* toSource ()                           {
		yield * this.outerHTML.split('&#10;');
	}
	
}
freeze(Text.prototype);

const NT$1 = /\n\t+/g;
const N = /^\n|\n$/g;

function trimTab (raw        )         {
	//Entities.test(raw);// 以后如果要完全剔除“\n”，则需要要先检查解码的正确性，防止“&l”“t;”连起来
	//return raw.replace(/\n\t*/g, '');
	return raw.replace(NT$1, '\n').replace(N, '');
}

const delimiters_0 = '{{';
const delimiters_1 = '}}';

class Mustache extends Array         {
	
	constructor (raw        , v_pre         ) {
		// Vue 会优先解析 <tag>，而且还看 tagName，然后才是 {{}}，这和流式解析矛盾，因此要求避免任何潜在的视觉歧义
		// 如果未来发现不会导致解析报错终止的歧义，则要更严格地，在解码前检查确保连“<”都不存在
		super();
		if ( v_pre ) {
			this.push(unescape(trimTab(raw)));
			return;
		}
		for ( let index         = 0, data        ; ; ) {
			
			const insStart         = raw.indexOf(delimiters_0, index);
			
			if ( insStart<0 ) {
				data = unescape(trimTab(raw.slice(index)));
				data.includes(delimiters_0) && throwSyntaxError(`对“${delimiters_0}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码`);
				this.push(data);
				break;
			}
			data = unescape(trimTab(raw.slice(index, insStart)));
			data.includes(delimiters_0) && throwSyntaxError(`对“${delimiters_0}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码`);
			this.push(data);
			
			const insEnd         = raw.indexOf(delimiters_1, insStart+2);
			insEnd<0 && throwSyntaxError(`template 块中存在未关闭的插值模板标记“${delimiters_0}”，虽然 Vue 会将其作为普通文字处理，但这种情况本身极有可能是误以为插值语法可以包含标签造成的`);
			index = insStart+2;
			data = unescape(raw.slice(index, insEnd));
			data.includes(delimiters_1) && throwSyntaxError(`对“${delimiters_1}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码`);
			this.push(data);
			index = insEnd+2;
		}
	}
	
	toExpression (              )         {
		const expression           = [];
		let isTemplate          = true;
		for ( const each of this ) {
			each && expression.push(isTemplate ? StringLiteral(each) : `(${each})`);
			isTemplate = !isTemplate;
		}
		return expression.join('+');
	}
	
	toData (              )         {
		let data         = '';
		let isTemplate          = true;
		for ( const each of this ) {
			if ( each ) { data += isTemplate ? each : `${delimiters_0}${each}${delimiters_1}`; }// 以后如果要完全剔除“\n”，则需要更复杂的保全逻辑（{{'{{{'}}、{{{k:{b:'}\}\}'} } }}），避免本来没有连在一起的连到一起
			isTemplate = !isTemplate;
		}
		return data;
	}
	
}

const foreign_elements = RegExp(FOREIGN_ELEMENTS.source);
const TEXTAREA_END_TAG = newRegExp`</textarea${TAG_EMIT_CHAR}`;
const STYLE_END_TAG$1 = newRegExp`</STYLE${TAG_EMIT_CHAR}`;
const TITLE_END_TAG = newRegExp`</title${TAG_EMIT_CHAR}`;
const TEXTAREA = /^textarea$/i;
const TNS = /^[\t\n ]+$/;
const SOF_TNS_LT = /^[\t\n ]+</;
const GT_TNS_EOF = />[\t\n ]+$/;
const _ID = /(?<=^|[\s(,:[{/]|\.\.\.)_\w+(?=[\s),\]}/=])/;// 缩小检测范围的话，标识符部分可以只检测“_(?:[a-z]|vm)”

let html         = '';
let index         = 0;
let partial                     ;

function parseAppend (parentNode_xName        , parentNode      , V_PRE         , FOREIGN         )       {
	for ( ; ; ) {
		const tag = Tag(html, index, FOREIGN);
		const { type } = tag;
		if ( type===EOF ) {
			if ( parentNode_xName ) { throw SyntaxError(`template 块中存在未关闭的 ${parentNode_xName} 标签`); }
			index = tag.end;
			return;
		}
		if ( type===TEXT ) {
			const data         = new Mustache(tag.raw , V_PRE).toData();
			data && parentNode.appendChild(new Text(data));
			index = tag.end;
			continue;
		}
		if ( type===COMMENT ) {
			index = tag.end;
			continue;
		}
		const xName = tag.xName ;
		if ( type===ELEMENT_END ) {
			xName===parentNode_xName || throwSyntaxError(parentNode_xName
				? `在 ${parentNode_xName} 配对的结束标签出现前，出现了预期外的结束标签“</${xName}>”`
				: `template 块中凭空出现了“</${xName}>”结束标签`
			);
			index = tag.end;
			return;
		}
		xName==='script' && throwSyntaxError(`Vue 不允许 template 中存在 script 标签`);
		xName==='style' && throwSyntaxError(`Vue 不允许 template 中存在 style 标签（真需要时，考虑使用 jVue 的 STYLE 函数式组件）`);
		const attributes             = tag.attributes ;
		const v_pre          = V_PRE || 'v-pre' in attributes;
		if ( !v_pre && ( ':is' in attributes || 'v-bind:is' in attributes ) ) {}
		else if ( !v_pre && 'is' in attributes ) {
			if ( !foreign_elements.test(attributes.is ) && FOREIGN_ELEMENTS.test(attributes.is ) ) {
				throw SyntaxError(`通过 is 属性，也无法避免 SVG 命名空间中的 foreign 元素的大小写变种“${attributes.is }”，不被 Vue 作为组件对待`);
			}
		}
		else {
			if ( !foreign_elements.test(xName) && FOREIGN_ELEMENTS.test(xName) ) {
				throw SyntaxError(`SVG 命名空间中的 foreign 元素的大小写变种“${xName}”，同样不被 Vue 作为组件对待`);
			}
		}
		if ( !v_pre && 'v-for' in attributes ) {
			const _id = _ID.exec(attributes['v-for'] );
			if ( _id ) { throw ReferenceError(`“v-for”中似乎存在以下划线开头后跟字母的危险变量“${_id[0]}”，这可能使得 Vue 模板编译结果以错误的方式运行`); }
		}
		const element          = parentNode.appendChild(new Element(xName, attributes, partial));
		index = tag.end;
		if ( type===ELEMENT_SELF_CLOSING || VOID_ELEMENTS.test(xName) ) { continue; }
		if ( !v_pre && ( 'v-text' in attributes || 'v-html' in attributes ) ) {
			throw SyntaxError(`开放标签，除非自身或外层节点有 v-pre 属性，否则不能再设置 v-text 或 v-html 属性`);
		}
		const foreign          = FOREIGN || xName==='svg' || xName==='math';
		// iframe：Vue 运行所必须的 IE9+ 刚好允许其中嵌套标签
		// pre
		if ( xName==='textarea' || xName==='title' || xName==='STYLE' ) {
			if ( 'v-text' in attributes || 'v-html' in attributes || v_pre ) {
				throw SyntaxError((
					xName==='textarea' ? `由于 Vue 不能正确对待 ${xName} 标签中的类标签文本（形如标签的文本会被剔除）` :
						xName==='STYLE' ? `非自闭合 ${xName} 组件中的内容为了避免被 Vue 额外修正（形如标签的文本会被剔除）` :
							xName==='title' ? `由于 Vue 不能正确对待 ${xName} 标签中的类标签文本（会试着真的作为标签解析）` :
								``
				)+`，jVue 会将其编译为 v-text 属性，因此标签不能已经具备 v-text 或 v-html，且自身或外层节点不能有 v-pre 属性`);
			}
			let endTagStart         = html.slice(index).search(
				xName==='textarea' ? TEXTAREA_END_TAG :
					xName==='STYLE' ? STYLE_END_TAG$1 :
						xName==='title' ? TITLE_END_TAG :
							null         
			);
			endTagStart<0 && throwSyntaxError(`template 块中存在未关闭的 ${xName} 标签`);
			endTagStart += index;
			const expression         = new Mustache(html.slice(index, endTagStart), v_pre).toExpression();
			if ( expression ) { attributes['v-text'] = expression; }
			index = Tag(html, index = endTagStart, foreign).end;
		}
		else if ( TEXTAREA.test(xName) ) {
			throw SyntaxError(
				`Vue 不会将 textarea 的任何大小写变种中的内容理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，`+
				`jVue 虽可对其进行转写（比如“<component is="${xName}">”或“<${xName} v-text="..." />”），`+
				`但由于缺乏约定（就连 Vue 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），`+
				`并不知道该往什么方向进行`
			);
		}
		else if ( RAW_TEXT_ELEMENTS.test(xName) ) {
			throw SyntaxError(
				`Vue 不会将 style 或 script 的任何大小写变种中的内容理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，`+
				`jVue 虽可对其进行转写（比如“<component is="${xName}">”或“<${xName} v-text="..." />”），`+
				`但由于缺乏约定（就连 Vue 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），`+
				`并不知道该往什么方向进行（除 jVue 推荐的 STYLE 组件用来模拟 style 外）`
			);
		}
		else {
			parseAppend(xName, element, v_pre, foreign);// 不需要改循环实现，因为层数多了 Vue 本身也会爆栈。
		}
	}
}

class Content extends Node {
	
	constructor (inner        , abbr          ) {
		super();
		if ( inner ) {
			partial = abbr;
			html = inner;
			index = 0;
			try { parseAppend('', this, false, false); }
			catch (error) {
				error.message = `${error.message}：\n${Snippet(inner, index)}`;
				throw error;
			}
			finally {
				partial = undefined$1;
				html = '';
			}
			if ( this.firstChild instanceof Text && TNS.test(this.firstChild.data) && SOF_TNS_LT.test(inner) ) { this.childNodes.shift(); }
			if ( this.lastChild instanceof Text && TNS.test(this.lastChild.data) && GT_TNS_EOF.test(inner) ) { this.childNodes.pop(); }
		}
	}
	
	* toSource (tab         = '\t')                           {
		for ( const childNode of this.childNodes ) {
			yield * childNode.toSource(tab);
		}
	}
	
}

const TEMPLATE_END_TAG = newRegExp.i`</template${TAG_EMIT_CHAR}`;

const PARTIAL = newRegExp`^
	\s*(?:
		${AliasName}\s*
		=\s*
			${localOrComponentName}
			(?:\.${className})*
		\s*;
	\s*)*
$`;

const HTML = /^(?:HTML|\s*text\/html\s*)$/i;

class Template extends Block {
	
	               
	              
	                     
	
	constructor (attributes            , inner                    ) {
		
		if ( inner!==undefined$1 && attributes.lang && !HTML.test(attributes.lang) ) {
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError(`.vue 文件的 template 块（非 html 状态下）中，存在可能使得正常结束判定结果模糊的标签语法标记`); }
			super('template', attributes, true, inner, TEMPLATE_END_TAG);
		}
		else {
			super('template', attributes, true, inner, null);
		}
		
		const _this           = _(this);
		
		if ( 'abbr.' in attributes ) {
			const literal = attributes['abbr.'];
			if ( literal===undefined$1 ) { throw SyntaxError(`template 功能块元素的“abbr.”属性的缺省值写法还没有实现`); }
			else {
				if ( !PARTIAL.test(literal) ) { throw SyntaxError(`template 块的“abbr.”属性语法错误：\n${literal}`); }
				const abbr          = create(null);
				for ( const pair of literal.split(';') ) {
					const tokens = pair.match(TOKENS);
					if ( tokens ) {
						const xName         = tokens[0];
						const localName_class           = tokens[1].split('.');
						abbr[xName] = {
							tagName: localName_class.shift() ,
							class: localName_class.length
								? localName_class.join(' ') || `__${xName}__`
								: '',
						};
					}
				}
				_this.abbr = abbr;
			}
		}
		
		if ( 'scoped:keys' in attributes ) {
			if ( attributes['scoped:keys']===undefined$1 ) { throw SyntaxError(`template 功能块元素的 scoped:keys 属性必须具有值`); }
			_this.keys = attributes['scoped:keys'];
		}
		
		if ( 'functional' in attributes ) {
			throw Error(`jVue 暂未支持编译 functional template，因为无法设想这种实际场景，从而也无法进行相应的功能设计`);
			//if ( attributes.functional!==undefined ) { throw SyntaxError(`template 功能块元素的 functional 属性必须是空属性`); }
			//_this.functional = true;
		}
		
	}
	
	get content ()          {
		const _this                                       = _(this);
		if ( _this.content ) { return _this.content; }
		if ( typeof this.inner!=='string' ) { throw Error(`自闭合的 template 功能块元素必须自行（根据 src 属性）加载 inner 值`); }
		if ( this.lang && !HTML.test(this.lang) ) { throw Error(`template 功能块元素如果设置了非 html 的 lang 属性值，那么必须自行提供转译后的 inner，并将 lang 设置为 html`); }
		return _this.content = new Content(this.inner, _this.abbr);
	}
	
	get innerHTML ()         {
		const { childNodes } = this.content;
		if ( childNodes.length!==1 ) { throw Error(`Vue 从 2.0 开始，只允许组件的 template 存在一个根节点`); }
		const rootNode = childNodes[0];
		if ( !( rootNode instanceof Element ) ) { throw Error(`Vue 从 2.0 开始，组件的 template 的根节点必须是元素节点`); }
		return rootNode.outerHTML;
	}
	
}

class CustomBlock extends Block {
	constructor (blockName        , attributes            , inner                    ) {
		if ( inner===undefined$1 ) {
			super(blockName, attributes, false, inner, null);
		}
		else {
			if ( ESCAPABLE_RAW_TEXT_ELEMENTS.test(blockName) ) { throw SyntaxError(`.vue 文件中的自定义块尚没有明确的语义约定，请避免使用 textarea / title 标签及其大小写变种`); }
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError(`.vue 文件的 ${blockName} 自定义块中，存在可能使得正常结束判定结果模糊的标签语法标记`); }
			super(blockName, attributes, false, inner, new RegExp(`^</${blockName}${TAG_EMIT_CHAR}`, 'i'));
		}
	}
}

const SCRIPT_STYLE_TEMPLATE = /^(?:script|style|template)$/i;
const NON_EOL = /[^\n]+/g;
const NON_TAB$1 = /[^\t ]/g;

function parseComponent (sfc     , vue        )       {
	
	let index         = 0;
	
	function throwSyntaxError(message        )        {
		const error              = SyntaxError(message);
		error.message = `${error.message}：\n${Snippet(vue, index)}`;
		throw error;
	}
	
	for ( const length         = vue.length; index!==length; ) {
		
		if ( vue[index]==='\n' ) {
			++index;
			continue;
		}
		
		const tag = Tag(vue, index, false);
		switch ( tag.type ) {
			case ELEMENT_START:
			case ELEMENT_SELF_CLOSING:
				index = tag.end;
				break;
			case COMMENT:
				index = tag.end;
				continue;
			case TEXT:
				throw throwSyntaxError(`.vue 文件中出现了未经标签包裹的“${tag.raw}”`);
			case ELEMENT_END:
				throwSyntaxError(`.vue 文件中凭空出现了“</${tag.xName}>”结束标签`);
		}
		
		const blockName         = tag.xName ;
		switch ( blockName ) {
			case 'script':
			case 'template':
				sfc[blockName] && throwSyntaxError(`一个 .vue 文件中只能有一个 ${blockName} 块`);
				break;
			case 'style':
				break;
			default:
				SCRIPT_STYLE_TEMPLATE.test(blockName) && throwSyntaxError(`.vue 文件顶层的非全小写 script / style / template 标签存在歧义，请避免使用`);
				break;
		}
		
		let inner                    ;
		if ( tag.type===ELEMENT_START ) {
			VOID_ELEMENTS.test(blockName) && throwSyntaxError(`.vue 文件中的自定义块如果是 HTML void 元素（无论大小写），必须自闭合使用、并添加自闭合斜线以避免歧义（因为尚没有明确的扩展约定）`);
			index===length && throwSyntaxError(`开始标签后缺少结束标签“</${blockName}>”`);
			if ( vue.startsWith('\n', index) ) {
				const innerStart         = index+1;
				const endTagStart         = vue.indexOf(`\n</${blockName}>`, index)+1 || throwSyntaxError(vue.includes(`</${blockName}>`, index) ? '开始标签后紧跟换行则启用多行模式，结束标签应在后续某行的行首' : `开始标签后缺少结束标签“</${blockName}>”`);
				index = endTagStart+3+blockName.length;
				inner = endTagStart===innerStart || endTagStart===innerStart+1 ? '' : vue.slice(innerStart, endTagStart-1);
				if ( blockName!=='style' ) {
					inner =
						checkNewline(vue.slice(0, innerStart)).replace(NON_EOL, '')+
						inner;
				}
			}
			else {
				const innerStart         = index;
				index = vue.indexOf('\n', index);
				if ( index<0 ) { index = length; }
				vue.endsWith(`</${blockName}>`, index) || throwSyntaxError(`开始标签后不紧跟换行则启用单行块模式，该行应以对应的结束标签结尾`);
				inner = vue.slice(innerStart, index-3-blockName.length);
				if ( blockName!=='style' ) {
					const lastLineStart         = vue.lastIndexOf('\n', innerStart)+1;
					inner =
						checkNewline(vue.slice(0, lastLineStart)).replace(NON_EOL, '')+
						checkNewline(vue.slice(lastLineStart, innerStart)).replace(NON_TAB$1, ' ')+
						inner;
				}
			}
		}
		
		if ( blockName==='template' ) { sfc.template = new Template(tag.attributes , inner); }
		else if ( blockName==='style' ) { sfc.styles.push(new Style(tag.attributes , inner)); }
		else if ( blockName==='script' ) { sfc.script = new Script(tag.attributes , inner); }
		else { sfc.customBlocks.push(new CustomBlock(blockName, tag.attributes , inner)); }
		
		if ( index!==length ) {
			if ( vue.startsWith('\n', index) ) { ++index; }
			else if ( !vue.startsWith('<!', index) ) { throwSyntaxError(`顶级标签的结束标签后的同一行内不应有除注释以外的内容`); }
		}
		
	}
	
}

const KEYS = /[a-z][a-z0-9]*(?:_[a-z0-9]+)*/ig;

const { compile }                                                                                                  = require('vue-template-compiler');
const { target, transform }                                                                                                 = require('vue-template-es2015-compiler/buble');
const detectGlobals                                                          = require('acorn-globals');
const { minify } = require('terser');

const transformOptions = NULL({
	transforms: function (transforms) {
		for ( const key in transforms ) {
			transforms[key] =
				key==='stripWith' ||// key==='stripWithFunctional' ||
				key==='trailingFunctionCommas' ||
				//key==='destructuring' || key==='parameterDestructuring' ||
				//key==='spreadRest' ||
				key==='numericLiteral';
		}
		return transforms;
	}(NULL         (target({}))),
	objectAssign: 'Object.assign',
});
const detectOptions = NULL({ ecmaVersion: 2014        , sourceType: 'module' });
const minifyOptions = NULL({
	warnings: 'verbose',
	parse: NULL({
		bare_returns: false,
		html5_comments: false,
		shebang: false,
	}),
	compress: NULL({
		warnings: true,
		collapse_vars: false,
		pure_getters: false,
		side_effects: false,
		drop_debugger: false,
		keep_infinity: true,
		typeofs: false,
		expression: true,
		arguments: true,
		computed_props: true,
	}),
	safari10: true,
	ie8: false,
	ecma: 5,
});

const PRE = '(function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return ';
const SUR = '})';
const PRE_LENGTH = PRE.length;
const SUR_LENGTH = -SUR.length;

const VM_C_EXP = /^\(function\(([\w$]+),([\w$]+)\){"use strict";return (\2\(.*\))}\);$/s;

function fetchName (global                  )         { return global ? global.name || '' : ''; }

function NecessaryStringLiteral (body        )         {
	
	if ( !body.startsWith('with(this){return ') || !body.endsWith('}') ) { throw Error(`jVue 内部错误：vue-template-compiler .compile 返回了与预期不符的内容格式`); }
	
	const without = transform(`(function(){${body}})`, transformOptions).code;
	if ( !without.startsWith(PRE) || !without.endsWith(SUR) ) { throw Error(`jVue 内部错误：vue-template-es2015-compiler/buble .transform 返回了与预期不符的内容格式`); }
	const wrapped = `(function(_vm,_c){"use strict";return ${without.slice(PRE_LENGTH, SUR_LENGTH)}});`;
	
	const globals = detectGlobals(wrapped, detectOptions);
	if ( globals && globals.length ) {
		const names         = globals.map(fetchName).join('”“');
		throw names==='_h'
			? Error(`jVue 内部设计时错误地认为新版本的 Vue 不会编译生成对“_h”的引用`)
			: ReferenceError(`template 块中，存在编译后跳过实例属性检查直接作为全局变量的标识符“${names}”`);
	}
	
	const minified = minify(wrapped, minifyOptions);
	if ( minified.error ) { throw minified.error; }
	if ( minified.warnings ) { throw Error(`Terser 压缩警告：\n${minified.warnings.join('\n')}`); }
	
	const vm_c_exp = VM_C_EXP.exec(minified.code);
	if ( !vm_c_exp ) { throw Error(`jVue 内部设计时错误地估计了 Terser 压缩生成的内容格式：\n`+minified.code); }
	return StringLiteral(`${vm_c_exp[1]},${vm_c_exp[3]}`);
	
}

function Render (innerHTML        , ES       )                                                {
	const { errors, render, staticRenderFns } = compile(innerHTML);
	if ( errors.length ) { throw Error(`.vue template 官方编译未通过：\n${errors.join('\n')}`); }
	minifyOptions.ecma = ES;
	return {
		render: NecessaryStringLiteral(render),
		staticRenderFns: staticRenderFns.map(NecessaryStringLiteral),
	};
}

const NULo = /^\0[0-7]/;
const LS_PS = /[\u2028\u2029]/g;
const LF_LS_PS = /[\n\u2028\u2029]/g;
const escape_LS_PS = ($0        )         => $0==='\u2028' ? '\\002028' : '\\002029';
const escape_LF_LS_PS = ($0        )         => $0==='\n' ? '&#x0A;' : $0==='\u2028' ? '&#x2028;' : '&#x2029;';
function VisibleStringLiteral (id        )         {
	const literal         = StringLiteral(id);
	return id.startsWith('\0') ? ( NULo.test(id) ? `'\\x00` : `'\\0` )+literal.slice(2) : literal;
}

function * From (tab        , mode                         , styles         , template                 , from        , eol        )                           {
	
	yield `export * from ${VisibleStringLiteral(from)};${eol}`;
	yield `import { Scope, Template, Render, StaticRenderFns } from ${VisibleStringLiteral(from)};${eol}${eol}`;
	
	yield !template || _(template).keys===undefined$1
		? `export ${mode} scope = /*#__PURE__*/Scope()`
		: `export ${mode} scope = /*#__PURE__*/Scope('${( _(template).keys .match(KEYS) || [] ).join(',')}')`;
	for ( const style of styles ) {
		const { innerCSS } = style;
		for ( const line of innerCSS.split('\n') ) {
			yield `${eol}//${line.replace(LS_PS, escape_LS_PS)}`;
		}
		const { media } = _(style);
		yield media===undefined$1
			? `${eol}.$(${StringLiteral(innerCSS)})`
			: `${eol}.$(${StringLiteral(innerCSS)}, ${StringLiteral(media)})`;
	}
	yield `;${eol}`;
	
	if ( !template ) { return; }
	const { innerHTML } = template;
	const { render, staticRenderFns } = Render(innerHTML, mode==='var' ? 5 : 8);
	
	yield eol;
	yield `export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, scope);${eol}`;
	yield `export ${mode} render = /*#__PURE__*/Render(${render}, scope);${eol}`;
	yield staticRenderFns.length
		? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)}${eol}], scope);${eol}`
		: `export ${mode} staticRenderFns = [];${eol}`;
	for ( const line of template.content.toSource(tab) ) {
		yield `//${tab}${line.replace(LF_LS_PS, escape_LF_LS_PS)}${eol}`;
	}
	
}

const OPTIONS = { swappable: false, stripBOM: true, startsWithASCII: true, throwError: true };
const VUE_EOL = EOL([ LF, CRLF, CR ], [ FF, LS, PS ], true);
const CR_LF = /\r\n?/g;

class SFC extends NULL {
	
	bom               ;
	eol        ;
	tab        ;
	
	constructor (vue                 ) {
		
		super();
		
		if ( typeof vue==='string' ) {
			if ( NON_SCALAR.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
			this.bom = '';
		}
		else if ( isBuffer(vue) ) {
			try { ( { BOM: this.bom, string: vue } = buffer2object(vue, OPTIONS) ); }
			catch (error) { throw Error(`无法解码 Buffer，请确认它是 UTF-8 或 UTF-16 编码的，并且不存在非 Unicode 标量值（U+D800〜U+DFFF 的代理对码点，或超出了 U+10FFFF）`); }
		}
		else { throw TypeError(`new SFC(vue) 时参数只能是 string 或 Buffer`); }
		
		if ( NONCHARACTER.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER.test(vue) ) { throw Error(`.vue 文件所基于的 HTML 字符流中禁止出现除空（U+00）、水平制表（U+09）、换行（U+0A）、换页（U+0C）、回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		
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
	
	script                = null;
	         styles          = [];
	template                  = null;
	         customBlocks                = [];
	
	export (mode                                     , from         = mode==='default' ? 'j-vue?*' : 'j-vue')         {
		const { bom, tab, eol, script, styles, template } = this;
		if ( mode==='default' ) {
			if ( script ) {
				if ( script.inner===undefined$1 ) {
					return bom
						+`export { default } from ${StringLiteral(script.src )};`;
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
						+`import { template } from ${StringLiteral(from)};${eol}`
						+`export default { template: template };`;
				}
				else {
					throw Error(`.vue 如果要 export default，至少要有 script 块或 template 块中的一个`);
				}
			}
		}
		else {
			let code         = bom;
			for ( const chunk of From(tab, mode, styles, template, from, eol) ) { code += chunk; }
			return code;
		}
	}
	
}
freeze(SFC.prototype);

const _default = Default({
	version,
	SFC,
});

module.exports = _default;

//# sourceMappingURL=index.js.map