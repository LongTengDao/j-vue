'use strict';

const version = '17.0.0';

const Error$1 = Error;

const TypeError$1 = TypeError;

const SyntaxError$1 = SyntaxError;

const isBuffer = Buffer.isBuffer;

const freeze = Object.freeze;

const undefined$1 = void 0;

const RegExp$1 = RegExp;

const throwError = (
	/*! j-globals: throw.Error (internal) */
	function throwError (message) {
		throw Error$1(message);
	}
	/*¡ j-globals: throw.Error (internal) */
);

const hasOwnProperty = Object.prototype.hasOwnProperty;

const toString = Object.prototype.toString;

const isArray = (
	/*! j-globals: Array.isArray (polyfill) */
	Array.isArray || function isArray (value) {
		return /*#__PURE__*/ toString.apply(value)==='[object Array]';
	}
	/*¡ j-globals: Array.isArray (polyfill) */
);

const Reflect_apply = Reflect.apply;

const Array$1 = Array;

const NULL = (
	/*! j-globals: null.prototype (internal) */
	Object.seal
		? /*#__PURE__*/ Object.preventExtensions(Object.create(null))
		: null
	/*¡ j-globals: null.prototype (internal) */
);

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var hasOwn = getOwnPropertyDescriptor
	? function (object, key) { return /*#__PURE__*/ getOwnPropertyDescriptor(object, key); }
	: function (object, key) { return /*#__PURE__*/ hasOwnProperty.call(object, key); };// && object!=null

var create = Object.create;

const test = RegExp.prototype.test;

const create$1 = Object.create;

const Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

const toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

const defineProperty = Object.defineProperty;

const assign = Object.assign;

const Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create$1(NULL); }
			if ( assign ) { assign(exports, addOnOrigin); }
			else { for ( var key in addOnOrigin ) { if ( Object_getOwnPropertyDescriptor(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
			exports.default = exports;
			if ( toStringTag ) {
				var descriptor = create$1(NULL);
				descriptor.value = 'Module';
				defineProperty(exports, toStringTag, descriptor);
			}
			typeof exports==='function' && exports.prototype && freeze(exports.prototype);
			return freeze(exports);
		}(exports, addOnOrigin);
	}
	/*¡ j-globals: default (internal) */
);

/*!@preserve@license
 * 模块名称：ES
 * 模块功能：ECMAScript 语法相关共享实用程序。从属于“简计划”。
   　　　　　ECMAScript syntax util. Belong to "Plan J".
 * 模块版本：0.11.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-es/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-es/
 */

var Cf = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC38]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/g;

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

                                           

function StringLiteral (value        )         {
	return '\''
		+value
		.replace(CANT_IN_SINGLE_QUOTE, staticallyEscape            )
		.replace(Cf, dynamicallyEscape            )
		+'\'';
}

/*¡ ES */

const from = (
	/*! j-globals: Buffer.from (fallback) */
	typeof Buffer==='function' && hasOwn(Buffer, 'from') ? Buffer.from : undefined$1
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
		? RegExp$1('[\\uD800-\\uDFFF]', 'u')
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
			if ( throwError ) { throw Error$1('残破的 UTF-8 BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( firstByte===0xFF ) {
		if ( length>1 && buffer[1]===0xFE ) {
			if ( throwError && length%2 ) { throw Error$1('UTF-16 的字节数必须为 2 的倍数'); }
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(2); }
			encoding = 'ucs2';
			BOM = '\uFEFF';
			UTF = '16LE';
		}
		else {
			if ( throwError ) { throw Error$1('残破的 UTF-16LE BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( firstByte===0xFE ) {
		if ( length>1 && buffer[1]===0xFF ) {
			if ( throwError && length%2 ) { throw Error$1('UTF-16 的字节数必须为 2 的倍数'); }
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
			if ( throwError ) { throw Error$1('残破的 UTF-16BE BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( options && options.startsWithASCII ) {
		if ( firstByte===0x00 ) {
			if ( throwError ) {
				if ( length>2 && buffer[2]===0x00 ) { throw Error$1('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error$1('UTF-16 的字节数必须为 2 的倍数'); }
			}
			buffer.swap16();
			if ( !options.swappable ) { swapped = buffer; }
			encoding = 'ucs2';
			UTF = '16BE';
		}
		else if ( length>1 && buffer[1]===0x00 ) {
			if ( throwError ) {
				if ( length>3 && buffer[3]===0x00 ) { throw Error$1('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error$1('UTF-16 的字节数必须为 2 的倍数'); }
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
			if ( NON_SCALAR.test(string) ) { throw Error$1('代理对码点不能单独出现'); }
		}
		else {
			swapped && swapped.swap16();
			throw Error$1('文件中存在超出 Unicode 表示范围的内容');
		}
	}
	else { swapped && swapped.swap16(); }
	return { BOM, UTF, string };
	
}

/*¡ j-utf */

const THROW = (
	/*! j-globals: throw (internal) */
	function THROW (error) {
		throw error;
	}
	/*¡ j-globals: throw (internal) */
);

/*!@preserve@license
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：8.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var NT = /[\n\t]/g;
var SEARCH_ESCAPE = /\\./g;
function graveAccentReplacer ($$        ) { return $$==='\\`' ? '`' : $$; }

function RE (               template                      ) {
	var raw = template.raw;
	var source = raw[0];
	var length = arguments.length;
	var index = 1;
	if ( this.unicode ) {
		while ( index<length ) {
			var value = arguments[index];
			source += ( typeof value==='string' ? value : value.source || THROW(TypeError$1(typeof value)) ) + raw[index++].replace(SEARCH_ESCAPE, graveAccentReplacer);
		}
	}
	else {
		while ( index<length ) {
			var value = arguments[index];
			source += ( typeof value==='string' ? value : value.source || THROW(TypeError$1(typeof value)) ) + raw[index++];
		}
	}
	return RegExp$1(source.replace(NT, ''), this.flags);
}

function newRegExp (template_flags                               )                                                          {
	if ( typeof template_flags==='object' ) {
		return /*#__PURE__*/ Reflect_apply(RE, { flags: '', unicode: false }, arguments                                                               );
	}
	var context          = { flags: template_flags, unicode: /*#__PURE__*/ template_flags.indexOf('u')>=0 };
	return function newRegExp (template                      )         {
		return /*#__PURE__*/ Reflect_apply(RE, context, arguments                                                               );
	};
}

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP = create$1(NULL)         ;

function groupify (branches                   , uFlag          , noEscape          )         {
	var group = create$1(NULL)         ;
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index]); }
	return sourcify(group, !noEscape);
}
function appendPointBranch (group       , branch        )       {
	if ( branch ) {
		var character         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch(group[character] || ( group[character] = create$1(NULL)          ), branch.slice(character.length));
	}
	else { group[''] = GROUP; }
}

function appendCodeBranch (group       , branch        )       {
	if ( branch ) {
		var character         = branch.charAt(0);
		appendCodeBranch(group[character] || ( group[character] = create$1(NULL)          ), branch.slice(1));
	}
	else { group[''] = GROUP; }
}

function sourcify (group       , needEscape         )         {
	var branches           = [];
	var singleCharactersBranch           = [];
	var noEmptyBranch          = true;
	for ( var character in group ) {
		if ( character ) {
			var sub_branches         = sourcify(group[character], needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(character) ) { character = '\\'+character; }
			sub_branches ? branches.push(character+sub_branches) : singleCharactersBranch.push(character);
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

const KEYS = /[a-z][a-z0-9]*(?:_[a-z0-9]+)*/ig;

const KEY = newRegExp('i')`^${KEYS}$`;
const NameIs__Key__ = (Name        )          => KEY.test(Name);
const NameAs__Key__ = (Name        )         => {
	if ( KEY.test(Name) ) { return `__${Name}__`; }
	throw Error$1(`“${Name}”不满足自动生成动态值的条件`);
};

const NONCHARACTER = newRegExp('u')`[
	\uFDD0-\uFDEF
	\uFFFE\u{1FFFE}\u{2FFFE}\u{3FFFE}\u{4FFFE}\u{5FFFE}\u{6FFFE}\u{7FFFE}\u{8FFFE}\u{9FFFE}\u{AFFFE}\u{BFFFE}\u{CFFFE}\u{DFFFE}\u{EFFFE}\u{FFFFE}\u{10FFFE}
	\uFFFF\u{1FFFF}\u{2FFFF}\u{3FFFF}\u{4FFFF}\u{5FFFF}\u{6FFFF}\u{7FFFF}\u{8FFFF}\u{9FFFF}\u{AFFFF}\u{BFFFF}\u{CFFFF}\u{DFFFF}\u{EFFFF}\u{FFFFF}\u{10FFFF}
]`;
const CONTROL_CHARACTER = /[\x01-\x08\x0B\x0E-\x1F\x7F-\x9F]/;

const ASCII_WHITESPACE = /[\t\n\f\r ]/;
const ASCII_ALPHA = /[A-Za-z]/;

const TOKENS = /[^\t\n\f\r=; ]+/g;
const PCENCharWithoutDot = /[\-\w\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]/u.source.slice(1, -1);// /[\u{10000}-\u{EFFFF}]/u => /(?:[\uD800-\uDB7F][\uDC00-\uDFFF])/
const NON_PCENChar = newRegExp('u')`
	[^.${PCENCharWithoutDot}]
`;
/* AliasName: */const AliasName = newRegExp('u')`
	[A-Z][${PCENCharWithoutDot}]*
`;
/* AliasName: */const _AliasName_ = newRegExp('u')`^${AliasName}$`;
/* AliasName: */const isAliasName = (name        ) => _AliasName_.test(name);
const localOrComponentNameWithoutDot = newRegExp('u')`
	[A-Za-z][${PCENCharWithoutDot}]*
`;
const _localOrComponentNameDotable_ = newRegExp('u')`
	^
	[A-Za-z][.${PCENCharWithoutDot}]*
	$
`;
const isLocalOrComponentNameDotable = (name        ) => _localOrComponentNameDotable_.test(name);
const localNameWithoutDot = newRegExp('u')`
	[a-z][${PCENCharWithoutDot}]*
`;
const className = newRegExp('u')`
	(?:
		-
		(?:
			-
		|
			[A-Z_a-z\x80-\u{10FFFF}]
		)
	|
		[A-Z_a-z\x80-\u{10FFFF}]
	)
	[-\w\x80-\u{10FFFF}]*
`;

const ATTRIBUTE_NAME = /[^\x00\t\n\f\r "'<>/=]+/;
const UNQUOTED_ATTRIBUTE_VALUE = /[^\x00\t\n\f\r "'=<>`]+/;//// /[^\t\n\f\r "'=<>`][^\t\n\f\r >]*|(?=>)/; // HTML5 以前的标准宽松一些，实际 HTML 解析则更宽松。但 jVue 目前的整体设计原则是抛出一切不规范的错误，另外顺带提示反引号这个十分特殊的 IE 漏洞的存在
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
const ATTRIBUTE = newRegExp('g')`
	${ATTRIBUTE_NAME}
	(?:
		${ASCII_WHITESPACE}*
		=
		${ASCII_WHITESPACE}*
		(?:
			"[^\x00"]*"
			|
			'[^\x00']*'
			|
			${UNQUOTED_ATTRIBUTE_VALUE}
		)
	)?`;

const TAG_NAME = newRegExp`${ASCII_ALPHA}[^\x00\t\n\f\r />]*`;
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

/*!@preserve@license
 * 模块名称：j-eol
 * 模块功能：换行符相关共享实用程序。从属于“简计划”。
   　　　　　EOL util. Belong to "Plan J".
 * 模块版本：1.5.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-eol/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-eol/
 */

var clearRegExp = '$_' in RegExp$1
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

var NEED_TO_ESCAPE_IN_REGEXP$1 = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR$1 = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP$1 = create$1(NULL)         ;

function groupify$1 (branches                   , uFlag          , noEscape          )         {
	var group = create$1(NULL)         ;
	var appendBranch = uFlag ? appendPointBranch$1 : appendCodeBranch$1;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index]); }
	return sourcify$1(group, !noEscape);
}
function appendPointBranch$1 (group       , branch        )       {
	if ( branch ) {
		var character         = SURROGATE_PAIR$1.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch$1(group[character] || ( group[character] = create$1(NULL)          ), branch.slice(character.length));
	}
	else { group[''] = GROUP$1; }
}

function appendCodeBranch$1 (group       , branch        )       {
	if ( branch ) {
		var character         = branch.charAt(0);
		appendCodeBranch$1(group[character] || ( group[character] = create$1(NULL)          ), branch.slice(1));
	}
	else { group[''] = GROUP$1; }
}

function sourcify$1 (group       , needEscape         )         {
	var branches           = [];
	var singleCharactersBranch           = [];
	var noEmptyBranch          = true;
	for ( var character in group ) {
		if ( character ) {
			var sub_branches         = sourcify$1(group[character], needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP$1.test(character) ) { character = '\\'+character; }
			sub_branches ? branches.push(character+sub_branches) : singleCharactersBranch.push(character);
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

var FLAGS = /\/([a-fh-z]*)g([a-fh-z]*)$/;

function removeGlobal (regExp        ) {
	var flags = FLAGS.exec(''+regExp);
	return flags ? RegExp$1(regExp, flags[1]+flags[2]) : regExp;
}

function EOL                     (allow                , disallow_uniform                              , uniform_disallow                              ) {
	
	var DISALLOW        ;
	var FIRST         ;
	if ( typeof disallow_uniform==='object' ) {
		DISALLOW = isArray(disallow_uniform) ? RegExp$1(groupify$1(disallow_uniform)) : removeGlobal(disallow_uniform);
		FIRST = !uniform_disallow;
	}
	else if ( typeof uniform_disallow==='object' ) {
		DISALLOW = isArray(uniform_disallow) ? RegExp$1(groupify$1(uniform_disallow)) : removeGlobal(uniform_disallow);
		FIRST = !disallow_uniform;
	}
	else {
		FIRST = !( uniform_disallow || disallow_uniform );
	}
	var ALLOW = isArray(allow)
		? FIRST
			? RegExp$1(groupify$1(allow))
			: RegExp$1(groupify$1(allow), 'g')
		: allow;
	
	return function EOL (string        )           {
		if ( DISALLOW && DISALLOW.test(string) ) { throw clearRegExp(SyntaxError$1)('存在禁用换行符'); }
		var eols = clearRegExp(string.match(ALLOW))                ;
		if ( !eols ) { return ''; }
		if ( FIRST ) { return eols[0]; }
		var eol = eols[0];
		for ( var length = eols.length, index = 1; index<length; ++index ) { if ( eols[index]!==eol ) { throw SyntaxError$1('存在多种换行符'); } }
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

const NON_ASCII = /[^\x00-\x7F]/u;
const NON_TAB = /[^\t\x20]/g;
const Snippet = (whole        , errorPosition        )         => {
	
	const linesAroundError                                      = [];
	let linesAroundError_length         = 0;
	const linesBeforeError           = whole.slice(0, errorPosition).split('\n');
	const errorLineNumber         = linesBeforeError.length;
	
	if ( errorLineNumber>1 ) {
		linesAroundError[linesAroundError_length++] = {
			number: errorLineNumber-1+'',
			value: linesBeforeError[errorLineNumber-2],
		};
	}
	
	const errorLineEnd         = whole.indexOf('\n', errorPosition);
	linesAroundError[linesAroundError_length++] = {
		number: errorLineNumber+'',
		value: linesBeforeError[errorLineNumber-1]+( errorLineEnd<0
			? whole.slice(errorPosition)
			: whole.slice(errorPosition, errorLineEnd)
		),
	};
	linesAroundError[linesAroundError_length++] = {
		number: '',
		value: linesBeforeError[errorLineNumber-1].replace(NON_ASCII, '\u3000').replace(NON_TAB, '\x20')+'^',
	};
	
	let maxLengthOfLineNumber        ;
	if ( errorLineEnd<0 ) { maxLengthOfLineNumber = ( errorLineNumber+'' ).length; }
	else {
		maxLengthOfLineNumber = ( errorLineNumber+1+'' ).length;
		const nextEnd         = whole.indexOf('\n', errorLineEnd+1);
		const next         = nextEnd<0
			? whole.slice(errorLineEnd+1)
			: whole.slice(errorLineEnd+1, nextEnd);
		linesAroundError[linesAroundError_length++] = {
			number: errorLineNumber+1+'',
			value: next,
		};
	}
	
	const errorSnippet           = [];
	let index = 0;
	while ( index<linesAroundError_length ) {
		let { number, value } = linesAroundError[index];
		number = number ? number.padStart(maxLengthOfLineNumber, '0') : ' '.repeat(maxLengthOfLineNumber);
		errorSnippet[index++] = `${number}\t|${value}`;
	}
	return errorSnippet.join('\n');
	
};

const VOID_ELEMENTS = /^(?:area|b(?:r|ase(?:font)?|gsound)|co(?:l|mmand)|embed|hr|i(?:m(?:g|age)|nput|sindex)|keygen|link|meta|param|source|track|wbr|frame|nextid)$/i;

const RAW_TEXT_ELEMENTS = /^s(?:cript|tyle)$/i;

const ESCAPABLE_RAW_TEXT_ELEMENTS = /^t(?:extarea|itle)$/i;

const FOREIGN_ELEMENTS = /^(?:animate(?:Motion|Transform)?|c(?:ircle|lipPath|olor\-profile|ursor)|d(?:e(?:fs|sc)|iscard)|ellipse|f(?:e(?:Blend|Co(?:lorMatrix|mpo(?:nentTransfer|site)|nvolveMatrix)|D(?:i(?:ffuseLighting|s(?:placementMap|tanceLight))|ropShadow)|F(?:lood|unc[ABGR])|GaussianBlur|Image|M(?:erge(?:Node)?|orphology)|Offset|PointLight|Sp(?:ecularLighting|otLight)|T(?:ile|urbulence))|ilter|o(?:nt\-face|reignObject))|g(?:lyph)?|hatch(?:path)?|image|line(?:arGradient)?|m(?:a(?:rker|sk)|e(?:sh(?:gradient|patch|row)?|tadata)|issing\-glyph|path)|p(?:at(?:h|tern)|oly(?:gon|line))|r(?:adialGradient|ect)|s(?:et|olidcolor|top|vg|witch|ymbol)|t(?:ext(?:Path)?|itle|span)|u(?:nknown|se)|view)$/i;

const ReferenceError$1 = ReferenceError;

const RangeError$1 = RangeError;

const parseInt$1 = parseInt;

const fromCodePoint = String.fromCodePoint;

const keys = Object.keys;

const getOwnPropertySymbols = typeof Object!=='undefined' ? Object.getOwnPropertySymbols : undefined;

const Null = (
	/*! j-globals: null.constructor (internal) */
	/*#__PURE__*/ function () {
		var assign = Object.assign || function assign (target, source) {
			var keys$1, index, key;
			for ( keys$1 = keys(source), index = 0; index<keys$1.length;++index ) {
				key = keys$1[index];
				target[key] = source[key];
			}
			if ( getOwnPropertySymbols ) {
				for ( keys$1 = getOwnPropertySymbols(source), index = 0; index<keys$1.length;++index ) {
					key = keys$1[index];
					if ( Object_getOwnPropertyDescriptor(source, key).enumerable ) { [key] = source[key]; }
				}
			}
			return target;
		};
		function Nullify (constructor) {
			delete constructor.prototype.constructor;
			freeze(constructor.prototype);
			return constructor;
		}
		var Null = function (origin) {
			return origin===undefined$1
				? this
				: typeof origin==='function'
					? /*#__PURE__*/ Nullify(origin)
					: /*#__PURE__*/ assign(/*#__PURE__*/ create(NULL), origin);
		};
		delete Null.name;
		//try { delete Null.length; } catch (error) {}
		Null.prototype = null;
		freeze(Null);
		return Null;
	}()
	/*¡ j-globals: null.constructor (internal) */
);

const SEMICOLON_ENTITIES = /*#__PURE__*/ Null({
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

const CONTINUE_ENTITIES = /*#__PURE__*/ Null({ Aacute:0, aacute:0, Acirc:0, acirc:0, acute:0, AElig:0, aelig:0, Agrave:0, agrave:0, amp:0, AMP:0, Aring:0, aring:0, Atilde:0, atilde:0, Auml:0, auml:0, brvbar:0, Ccedil:0, ccedil:0, cedil:0, cent:0, copy:0, COPY:0, curren:0, deg:0, divide:0, Eacute:0, eacute:0, Ecirc:0, ecirc:0, Egrave:0, egrave:0, ETH:0, eth:0, Euml:0, euml:0, frac12:0, frac14:0, frac34:0, gt:0, GT:0, Iacute:0, iacute:0, Icirc:0, icirc:0, iexcl:0, Igrave:0, igrave:0, iquest:0, Iuml:0, iuml:0, laquo:0, lt:0, LT:0, macr:0, micro:0, middot:0, nbsp:0, not:0, Ntilde:0, ntilde:0, Oacute:0, oacute:0, Ocirc:0, ocirc:0, Ograve:0, ograve:0, ordf:0, ordm:0, Oslash:0, oslash:0, Otilde:0, otilde:0, Ouml:0, ouml:0, para:0, plusmn:0, pound:0, quot:0, QUOT:0, raquo:0, reg:0, REG:0, sect:0, shy:0, sup1:0, sup2:0, sup3:0, szlig:0, THORN:0, thorn:0, times:0, Uacute:0, uacute:0, Ucirc:0, ucirc:0, Ugrave:0, ugrave:0, uml:0, Uuml:0, uuml:0, Yacute:0, yacute:0, yen:0, yuml:0 });

const ESCAPABLE_INNER_TEXT = /[\t\n\r\x20&<\xA0\u2000-\u200A\u2028\u2029\u202F\u3000]/g;// 除了必须转义的，还有防止被 Vue 编译器剔除的空白
const escapableInnerTextReplacer = ($0        ) => `&#${$0.charCodeAt(0)};`;
const escapeInnerText = (text        )         => text.replace(ESCAPABLE_INNER_TEXT, escapableInnerTextReplacer);

const ESCAPABLE_ATTRIBUTE_VALUE = /["&]/g;
const escapableAttributeValueReplacer = ($0        ) => $0==='"' ? '&quot;' : '&amp;';
const escapeAttributeValue = (text        )         => text.replace(ESCAPABLE_ATTRIBUTE_VALUE, escapableAttributeValueReplacer);

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

const unescape_or_return = (ambiguous_ampersand        , inner        )         => {
	if ( inner[0]==='#' ) {
		const codePoint         = ambiguous_ampersand[2]==='x'
			? parseInt$1(inner.slice(2), 16)
			: parseInt$1(inner.slice(1), 10);
		if ( codePoint===0x00 || 0xD800<=codePoint && codePoint<=0xDFFF || 0x10FFFF<codePoint ) { return '\uFFFD'; }
		return fromCodePoint(codePoint in CONTROL_TO_CHAR ? CONTROL_TO_CHAR[codePoint                                ] : codePoint);
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

const unescape_or_throw = (ambiguous_ampersand        , named         )         => {
	if ( ambiguous_ampersand.length===1 ) { throw SyntaxError$1(`孤立的“&”没有作为 HTML 实体存在`); }
	if ( !ambiguous_ampersand || ambiguous_ampersand[ambiguous_ampersand.length - 1]!==';' ) { throw SyntaxError$1(`HTML 实体“${ambiguous_ampersand}”后缺少“;”`); }
	if ( named ) {
		if ( named in SEMICOLON_ENTITIES ) { return SEMICOLON_ENTITIES[named]; }
		throw ReferenceError$1(`未知的 HTML 实体名称“${ambiguous_ampersand}”`);
	}
	const codePoint         = ambiguous_ampersand[2]==='x' ? parseInt$1(ambiguous_ampersand.slice(3, -1), 16) : parseInt$1(ambiguous_ampersand.slice(2, -1), 10);
	if ( codePoint===0x00 ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值为空（U+0000）码点`); }
	if ( codePoint>0x10FFFF ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值超出了 Unicode 的最大范围（U+10FFFF）`); }
	const unicode         = fromCodePoint(codePoint);
	if ( NON_SCALAR.test(unicode) ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值是单个代理对码点（U+D800〜U+DFFF）`); }
	if ( NONCHARACTER.test(unicode) ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值是永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
	if ( CONTROL_CHARACTER.test(unicode) || codePoint===0x0D ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值是除水平制表（U+0009）换行（U+000A）换页（U+000C）以外的控制字符（U+0000〜U+001F、U+007F〜U+009F）`); }
	return unicode;
};

const unescape = (string        , fallback          )         =>
	fallback
		? string.replace(ENTITIES_TO_TRY, unescape_or_return)
		: string.replace(ENTITIES, unescape_or_throw);

const WeakMap$1 = WeakMap;

const Proxy$1 = Proxy;

const Reflect_construct = Reflect.construct;

const Reflect_defineProperty = Reflect.defineProperty;

const Reflect_deleteProperty = Reflect.deleteProperty;

const Reflect_ownKeys = Reflect.ownKeys;

const setPrototypeOf = Object.setPrototypeOf;

const getOwnPropertyDescriptor$1 = (
	/*! j-globals: null.getOwnPropertyDescriptor (internal) */
	function () {
		function __PURE__ (descriptor) {
			var propertyDescriptor = create(NULL);
			if ( descriptor.hasOwnProperty('value') ) {
				propertyDescriptor.value = descriptor.value;
				propertyDescriptor.writable = descriptor.writable;
			}
			else {
				propertyDescriptor.get = descriptor.get;
				propertyDescriptor.set = descriptor.set;
			}
			propertyDescriptor.enumerable = descriptor.enumerable;
			propertyDescriptor.configurable = descriptor.configurable;
			return propertyDescriptor;
		}
		return function getOwnPropertyDescriptor (object, key) {
			return /*#__PURE__*/__PURE__(/*#__PURE__*/Object_getOwnPropertyDescriptor(object, key));
		};
	}()
	/*¡ j-globals: null.getOwnPropertyDescriptor (internal) */
);

var ownKeys = typeof Reflect==='object' ? Reflect.ownKeys : Object.getOwnPropertyNames;
const getOwnPropertyDescriptors = (
	/*! j-globals: null.getOwnPropertyDescriptors (internal) */
	function getOwnPropertyDescriptors (object) {
		var descriptorMap = /*#__PURE__*/ create(NULL);
		for ( var keys = /*#__PURE__*/ ownKeys(object), length = keys.length, index = 0; index<length; ++index ) {
			var key = keys[index];
			descriptorMap[key] = /*#__PURE__*/ getOwnPropertyDescriptor$1(object, key);
		}
		return descriptorMap;
	}
	/*¡ j-globals: null.getOwnPropertyDescriptors (internal) */
);

const NodeList = (
	/*! j-globals: Array (internal) */
	/*#__PURE__*/function () {
		const DELETED = new Proxy$1({}, {
			defineProperty: () => true,// index
			set: () => true,// length
		});
		const weak = new WeakMap;
		weak.get = weak.get;
		weak.set = weak.set;
		const properties = getOwnPropertyDescriptors(freeze(class extends Array$1 {
			static [Symbol.species] = class extends null { constructor () { return DELETED; } };
			constructor () { return super(); }
			get slice () { }
			get concat () { }
			get map () { }
			get flat () { }
			get flatMap () { }
			set __proto__ (proto) { setPrototypeOf(this, weak.get(proto) ?? weak.set(proto, create$1(proto, properties)).get(proto)); }
		}.prototype));
		return freeze(properties.constructor.value);
	}()
	/*¡ j-globals: Array (internal) */
);

/*!@preserve@license
 * 模块名称：j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。从属于“简计划”。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string. Belong to "Plan J".
 * 模块版本：7.0.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const target2keeper = new WeakMap$1                
	                                                                      
	                                                                         
 ;
const proxy2target = new WeakMap$1     
	                             
	                                                 
	                                                   
 ;
const target2proxy = new WeakMap$1     
	                                                  
	                                                   
 ;

const handlers                       = /*#__PURE__*/ assign(create$1(NULL), {
	defineProperty:                 (target                   , key   , descriptor                    )          => {
		if ( Reflect_defineProperty(target, key, assign(create$1(NULL), descriptor)) ) {
			const keeper = target2keeper.get(target) ;
			keeper.includes(key) || ( keeper[keeper.length] = key );
			return true;
		}
		return false;
	},
	deleteProperty:                 (target                   , key   )          => {
		if ( Reflect_deleteProperty(target, key) ) {
			const keeper = target2keeper.get(target) ;
			const index = keeper.indexOf(key);
			index<0 || keeper.splice(index, 1);
			return true;
		}
		return false;
	},
	ownKeys:                    (target   )                      => target2keeper.get(target) ,
	construct:                                     (target                         , args   , newTarget     )    => orderify(Reflect_construct(target, args, newTarget)),
	apply:                                        (target                              , thisArg   , args   )    => orderify(Reflect_apply(target, thisArg, args)),
});

const newProxy =                                              (target   , keeper           )    => {
	target2keeper.set(target, keeper);
	const proxy = new Proxy$1   (target, handlers);
	proxy2target.set(proxy, target);
	return proxy;
};

const orderify =                    (object   )    => {
	if ( proxy2target.has(object) ) { return object; }
	let proxy = target2proxy.get(object)                 ;
	if ( proxy ) { return proxy; }
	proxy = newProxy(object, assign(new NodeList          (), Reflect_ownKeys(object)));
	target2proxy.set(object, proxy);
	return proxy;
};

const Null$1 = /*#__PURE__*/ function (         ) {
	function throwConstructing ()        { throw TypeError$1(`Super constructor Null cannot be invoked with 'new'`); }
	function throwApplying ()        { throw TypeError$1(`Super constructor Null cannot be invoked without 'new'`); }
	const Nullify = (constructor                             ) => {
		delete constructor.prototype.constructor;
		freeze(constructor.prototype);
		return constructor;
	};
	function Null (           constructor                              ) {
		return new.target
			? new.target===Null
				? /*#__PURE__*/ throwConstructing()
				: /*#__PURE__*/ newProxy(this, new NodeList     ())
			: typeof constructor==='function'
				? /*#__PURE__*/ Nullify(constructor)
				: /*#__PURE__*/ throwApplying();
	}
	//@ts-ignore
	Null.prototype = null;
	defineProperty(Null, 'name', assign(create$1(NULL), { value: '', configurable: false }));
	//delete Null.length;
	freeze(Null);
	return Null;
}()                                           ;

/*¡ j-orderify */

const EMPTY        = undefined$1;

class Attributes extends Null$1         {
	
	constructor () { return super()                   ; }
	
	get [Symbol.toStringTag] () { return 'SFC.*.Attributes'; }
	
	                                                                
	                                                                            
	[Symbol.toPrimitive] (                  hint                                 )                  {
		if ( hint==='number' ) { return keys(this).length; }
		let literal         = '';
		for ( const name in this ) {
			const value = this[name];
			literal += value===EMPTY ? ` ${name}` : ` ${name}="${escapeAttributeValue(value)}"`;
		}
		return literal;
	}
	
	static 'default' = Null$1(Attributes);
	
}

const ELEMENT_START      = 1.1;
const ELEMENT_END      = 1.2;
const ELEMENT_SELF_CLOSING      = 1.3;
const TEXT    = 3;
const COMMENT    = 8;
const EOF    = 0;

const PLAINTEXT = /^plaintext$/i;
const LISTING = /^listing/i;
const XMP = /^xmp$/i;

//const BAD_ENTITY = /&[a-z][a-z\d]*[^a-z\d;]/;

const _PROP = /^\.(?:[\w$]+|\[[\w$]+])$/;
const V_DIR = /^v-(?:slot|on|bind):/;

const Tag = (html        , position        , foreign          = false, SHORTHAND          = false) => {
	
	let rest        ;
	
	if ( html[position]==='<' ) {
		
		if ( html[position+1]==='!' ) {
			if ( !html.startsWith('--', position+2) ) { throw SyntaxError$1(html.startsWith('[CDATA[', position+2) && !foreign ? `“<![CDATA[”“]]>”语法只能用于 foreign 元素（MathML 或 SVG）内` : `标准的注释语法应由“<!--”而非“ <!”开启`); }
			if ( html[position+4]==='>' || html.startsWith('->', position+4) ) { throw SyntaxError$1(`紧随“<!--”注释开始语法之后出现的“>”或“->”会造成注释意外中断`); }
			const end         = html.indexOf('-->', position+4);
			if ( end<0 ) { throw SyntaxError$1(html.includes('--!>', position+4) ? '应使用“-->”而非“--!>”关闭注释节点' : '存在未关闭的注释节点'); }
			const data         = html.slice(position+4, end);
			if ( data.includes('--!>') ) { throw SyntaxError$1(`“--!>”会造成注释意外中断`); }
			return { type: COMMENT, data, end: end+3 };
		}
		
		if ( html[position+1]==='?' ) { throw SyntaxError$1(foreign ? `不知该如何对待“<?”开启的 XML 指令/声明` : `在 HTML 上下文中，“<?”XML 指令/声明只会被作为注释对待，而且其引号属性并不安全`); }
		
		rest = html.slice(position);
		
		if ( IS_TAG.test(rest) ) {
			const _ = TAG.exec(rest);
			if ( !_ ) { throw SyntaxError$1('标签格式有误'); }
			const { 0: { length }, 1: endSolidus, 2: xName, 3: attributesLiteral, 4: selfClosingSolidus } = _;
			if ( endSolidus ) {
				if ( attributesLiteral ) { throw SyntaxError$1(`结束标签中存在属性`); }
				if ( selfClosingSolidus ) { throw SyntaxError$1(`结束标签中存在自关闭斜杠`); }
				return { type: ELEMENT_END, xName, end: position+length };
			}
			
			const attributes             = new Attributes;
			if ( attributesLiteral ) {
				const pairs = attributesLiteral.match(ATTRIBUTE) ;
				const { length } = pairs;
				let index = 0;
				if ( SHORTHAND && pairs.includes('v-pre') ) { SHORTHAND = false; }
				while ( index!==length ) {
					let name = pairs[index++];
					let value                    ;
					if ( name.includes('=') ) {
						( { 1: name, 2: value } = ATTRIBUTE_NAME_VALUE.exec(name)  );
						value[0]==='"' || value[0]==='\'' ? value.slice(1, -1) : value;
						//if ( BAD_ENTITY.test(value) && (
						//	name==='href' ? xName==='a' || xName==='area' :
						//	name==='src' && ( xName==='img' || xName==='iframe' || xName==='source' || xName==='video' || xName==='audio' || xName==='track' )
						//) ) { throw Error(`${xName} 标签中的 ${name} 属性值 ${value} 中存在可疑的实体，无论它是否是 URI 参数，请明确转义`); }
						value = unescape(value);
					}
					if ( SHORTHAND ) {
						switch ( name[0] ) {
							case '.':
								if ( _PROP.test(name) ) {
									{
										throw SyntaxError$1(`Vue 3 中 v-bind 已不再支持 .prop 修饰符，无法为您转译“${name}”`);
									}
								}
								break;
							case '#':
							case '@':
							case ':':
								if ( name.length===1 || name[1]==='.' ) { throw SyntaxError$1(`: @ # 的 arg 不能为空`); }
								break;
							case 'v':
								if ( V_DIR.test(name) ) {
									name = name[2]==='s' ? `#${name.slice(7)}` :
										name[2]==='o' ? `@${name.slice(5)}` :
											name.slice(6);
									if ( name.length===1 || name[1]==='.' ) { throw SyntaxError$1(`v-bind: v-on: v-slot: 的 arg 不能为空`); }
								}
								break;
						}
					}
					if ( name in attributes ) { throw SyntaxError$1(`标签中出现了重复的属性“${name}”`); }
					if (
						( name[0]===':' ? name.slice(1) : ':' + name ) in attributes
						&&
						( name[0]===':' ? name[1]!=='@' && name[1]!=='#' : name[0]!=='@' && name[0]!=='#' )
					) {
						throw SyntaxError$1(`标签中出现了重复的属性“${name[0]===':' ? name.slice(1) : ':' + name}”和“${name}”`);
					}
					attributes[name] = value;
				}
				if ( attributesLiteral[attributesLiteral.length - 1]==='/' ) { throw SyntaxError$1(`标签结尾处的“/”有歧义，无法达到标注标签为自闭合的目的，而是会作为最后一个无引号属性值的结束字符`); }
			}
			if ( selfClosingSolidus ) {
				return { type: ELEMENT_SELF_CLOSING, xName, attributes, end: position+length };
			}
			else {
				if ( VOID_ELEMENTS.test(xName) ) { throw SyntaxError$1(`.vue 文件中如果出现 HTML void 元素（无论大小写；即便已经过时、废弃或是非标准），必须自闭合使用并添加自闭合斜线以避免歧义（因为尚没有明确的扩展约定）`); }
				if ( PLAINTEXT.test(xName) ) { throw SyntaxError$1(`已过时的 ${xName} 标签没有结束方式，除非自闭合，否则${xName==='plaintext' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”）`); }
				if ( LISTING.test(xName) && !rest.startsWith('</', length) ) { throw SyntaxError$1(`已过时的 ${xName} 标签内容处理方式不定，除非自闭合或内容为空，否则${xName==='listing' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”或“<${xName} v-text="..." />”）`); }
				return { type: ELEMENT_START, xName, attributes, end: position+length };
			}
		}
		
	}
	
	else { rest = html.slice(position); }
	
	if ( rest ) {
		let end         = rest.search(TAG_LIKE);
		end = end<0 ? html.length : position+end;
		return { type: TEXT, raw: html.slice(position, end), end };
	}
	
	return { type: EOF, end: html.length };
	
};

const Set$1 = Set;

const process$1 = process;

const NaN = 0/0;

const gen = {
	2: {
		Select: {
			const: 'function genSelect (el, value, modifiers) {\n	addHandler(el, \'change\', `\n		{\n			const VALUE = _value ?? \'_value\';\n			const { multiple, options } = $event.target;\n			if ( $event = multiple ? [] : void null ) {\n				let length = 0;\n				for ( const option of options ) {\n					if ( option.selected ) {\n						$event[length++] = ${modifiers && modifiers.number ? \'_n\' : \'\'}(VALUE in option ? option[VALUE] : option.value);\n					}\n				}\n			}\n			else {\n				for ( const option of options ) {\n					if ( option.selected ) {\n						$event           = ${modifiers && modifiers.number ? \'_n\' : \'\'}(VALUE in option ? option[VALUE] : option.value); break;\n					}\n				}\n			}\n		}\n		${genAssignmentCode(value, \'$event\')}`, null, true);\n}\n',
			var: 'function genSelect (el, value, modifiers) {\n	addHandler(el, \'change\', `\n		$event = {\n			v: $event.target.multiple ? [] : void null,\n			i: 0,\n			s: $event.target.options,\n			$: 0,\n			_: _value || \'_value\',\n		};\n		if ( $event.v ) {\n			while ( $event.i<$event.s.length ) {\n				if ( ( $event.$ = $event.s[$event.i++] ).selected ) {\n					$event.v[$event.v.length] = ${modifiers && modifiers.number ? \'_n\' : \'\'}($event.$[$event._ in $event.$ ? $event._ : \'value\']);\n				}\n			}\n		}\n		else {\n			while ( $event.i<$event.s.length ) {\n				if ( ( $event.$ = $event.s[$event.i++] ).selected ) {\n					$event.v                         = ${modifiers && modifiers.number ? \'_n\' : \'\'}($event.$[$event._ in $event.$ ? $event._ : \'value\']); break;\n				}\n			}\n		}\n		${genAssignmentCode(value, \'$event.v\')}`, null, true);\n}\n',
		},
		CheckboxModel: {
			const: 'function genCheckboxModel (el, value, modifiers) {\n	const valueBinding = getBindingAttr(el, \'value\') || \'null\';\n	const trueValueBinding = getBindingAttr(el, \'true-value\') || \'true\';\n	const falseValueBinding = getBindingAttr(el, \'false-value\') || \'false\';\n	addProp(el, \'checked\', `[].constructor.isArray(${value}) ? _i(${value}, ${valueBinding})>-1 : ${trueValueBinding===\'true\' ? `( ${value} )` : `_q(${value}, ${trueValueBinding})`}`);\n	addHandler(el, \'change\', `\n		$event = { _: $event.target.checked, v: ${value} };\n		if ( [].constructor.isArray($event.v) ) {\n			$event._\n				? _i($event.v, $event._ = ${modifiers && modifiers.number ? \'_n\' : \'\'}(${valueBinding}))<0\n					? $event.v = [ ...$event.v, $event._ ]\n					: $event = 0\n				: ( $event._ = _i($event.v, ${modifiers && modifiers.number ? \'_n\' : \'\'}(${valueBinding})) )<0\n					? $event = 0\n					: --( $event.v = [ ...$event.v ] ).copyWithin($event._, $event._ + 1).length;\n		}\n		else { $event.v = $event.checked ? ( ${trueValueBinding} ) : ( ${falseValueBinding} ); }\n		$event && ${genAssignmentCode(value, \'$event.v\')}`, null, true);\n}\n',
			var: 'function genCheckboxModel (el, value, modifiers) {\n	const valueBinding = getBindingAttr(el, \'value\') || \'null\';\n	const trueValueBinding = getBindingAttr(el, \'true-value\') || \'true\';\n	const falseValueBinding = getBindingAttr(el, \'false-value\') || \'false\';\n	addProp(el, \'checked\', `[].constructor.isArray(${value}) ? _i(${value}, ${valueBinding})>-1 : ${trueValueBinding===\'true\' ? `( ${value} )` : `_q(${value}, ${trueValueBinding})`}`);\n	addHandler(el, \'change\', `\n		$event = { _: $event.target.checked, v: ${value}, l: 0 };\n		if ( [].constructor.isArray($event.v) ) {\n			if ( $event._ ) {\n				_i($event.v, $event._ = ${modifiers && modifiers.number ? \'_n\' : \'\'}(${valueBinding}))<0\n					? ( $event.v = $event.v.slice(), $event.v[$event.v.length] = $event._, $event.v )\n					: $event = 0;\n			}\n			else {\n				if ( ( $event._ = _i($event.v, ${modifiers && modifiers.number ? \'_n\' : \'\'}(${valueBinding})) )<0 ) { $event = 0; }\n				else {\n					$event.v = $event.v.slice();\n					$event.l = $event.v.length - 1;\n					while ( $event._<$event.l ) { $event.v[$event._] = $event.v[++$event._]; }\n					$event.v.length = $event.l;\n				}\n			}\n		}\n		else { $event.v = $event.checked ? ( ${trueValueBinding} ) : ( ${falseValueBinding} ); }\n		$event && ${genAssignmentCode(value, \'$event.v\')}`, null, true);\n}\n',
		},
	},
	3: { },
};

const forAliasRE = /\s(?:in|of)\s/s;
const slotRE = /^(?:#|v-slot$)/;// /^(?:#|v-slot(?::|$))/;
const emptySlotScopeToken = '_empty_';
const SLOT_DIRECTIVE = /^v-(?:once|for|if|else(?:-if)?|bind)$/;
const BAD_SLOT_NAME = /^[$_]/;// Vue2: $hasNormal $key $stable _normalized __proto__ // Vue3: $stable _*
const BAD_V_SLOT_NAME = /^#[$_]/;// /^(?:#|v-slot:)[$_]/;
const BAD_SCOPE = '__proto__';
const BAD_KEY = '__proto__';
const BAD_REF = '__proto__';
const BAD_INS = /\r(?!\n)|[\u2028\u2029]/;
const NON_ASCII$1 = '\\u3007\\u4E00-\\u9FA5';
const NON_ASCII_SIMPLE_PATH = newRegExp`
	^\s*
		(?:
			[A-Za-z_$]
			[\w$]*
		)?
		[${NON_ASCII$1}]
		[\w$${NON_ASCII$1}]*
	\s*$
`;
const BUILT_IN = new Set$1(`
	keep-alive
	slot
	suspense
	teleport
	template
	transition
	transition-group
`.match(/\S+/g) );
const STYLE_BY_COMPONENT_IS   
	                                                                                                                             
	                                                                                                                 
	                                                                      
         = null;

const { parse, acornInjectPlugins, rollup, minify }                                  = require('@ltd/j-es-plus');
const { simple }                              = require('acorn-walk');
const findGlobals                                      = require('@ltd/acorn-globals');
const transpileModule                             = require('@ltd/j-ts');

const { 3: compile3, 2: compile2 }   
	                                                                                                    
	                                                                                                        
  = ( () => {
	
	const Const3dom = Replacer(
		[ `|| node.tag === 'style'` ],
		[ `makeMap('style,iframe,script,noscript', true)`, `makeMap('style,script', true)` ],
		[ /compilerCore\.isBuiltInType\(tag, ([^)]+)\)/g, (match        , p1        ) => `tag===${p1.replace(/\B[A-Z]/g, (W        ) => `-${W.toLowerCase()}`).toLowerCase()}`, 2 ],
	);
	const Const3core = Replacer(
		[ /!shared\.isGloballyWhitelisted\([^)]*\)|identifier\.name !== `(?:require|arguments)`/g, 'true', 4 ],
		[ /isBuiltInType\(tag, ([^)]+)\)/g, (match        , p1        ) => `tag===${p1.replace(/\B[A-Z]/g, (W        ) => `-${W.toLowerCase()}`).toLowerCase()}`, 4 ],
	);
	const Let3core = Replacer(
		[ /push\(`const /g, 'push\(`let ', NaN ],
	);
	
	const Var2 = (content        ) =>
		content
		.replace(`el.tag === 'style' ||`, '')
		.replace(/(var simplePathRE = \/)(.*?\*)/s, (match        , pre        , aim        ) => pre + aim.replace(/(?<=\$)/g, NON_ASCII$1) + '$|' + aim)
		.replace(RegExp$1(`function gen(${keys(gen[2]).join('|')}) \\((.*?)\\n}\\n`, 'gs'), (func        , name                     ) => gen[2][name].var)
		.replace(/undefined(?='\) \+|'\r?\n|")|(?<=')\$\$v(?=')/g, (origin        ) => ( { undefined: 'void null', $$v: '$event' }[origin                       ] ));
	const Const2 = (content        ) =>
		content
		.replace(RegExp$1(`function gen(${keys(gen[2]).join('|')}) \\((.*?)\\n}\\n`, 'gs'), (func        , name                     ) => gen[2][name].const)
		.replace(/function\((|\$event|" \+ alias \+ iterator1 \+ iterator2 \+ "|" \+ slotScope \+ ")\){/g, (match        , p1        )         => `(${p1})=>{`);
	const Let2 = (content        ) =>
		content
		.replace(/const /g, 'let ');
	
	const _prod         = process$1.env.NODE_ENV==='production' ? '.prod' : '';
	
	const filename3core         = require.resolve(`@vue/compiler-dom/node_modules/@vue/compiler-core/dist/compiler-core.cjs${_prod}.js`);
	const filename3dom         = require.resolve(`@vue/compiler-dom/dist/compiler-dom.cjs${_prod}.js`);
	let content3core         = require('fs').readFileSync(filename3core, 'utf8');
	let content3dom         = require('fs').readFileSync(filename3dom, 'utf8');
	const Compile3 = (content_dom        , content_core        ) => {
		return Exports                                    (content_dom, filename3dom, Null({
			'@vue/compiler-core': Exports                                     (content_core, filename3core),
		})).compile;
	};
	
	const filename2         = require.resolve('vue-template-compiler/build.js');
	let content2         = require('fs').readFileSync(filename2, 'utf8');
	const Compile2 = (content        ) => Exports                                        (content, filename2).compile;
	
	return {
		3: {
			var ()        {
				throw Error$1(`Vue 3 无法运行在 ES 5 中，请使用 const 或 let 模式`);
			},
			const: Compile3(
				content3dom = Const3dom(content3dom),
				content3core = Const3core(content3core),
			),
			let: Compile3(
				content3dom,
				Let3core(content3core),
			),
		},
		2: {
			var: Compile2(
				content2 = Var2(content2),
			),
			const: Compile2(
				content2 = Const2(content2),
			),
			let: Compile2(
				Let2(content2),
			),
		},
	};
	
	function Replacer (...replacers   
		                                                                         
		                                                                                           
	) {
		return function replacer (            content        ) {
			for ( let [ search, replacer = '', count = 1 ] of replacers ) {
				if ( search instanceof RegExp$1 && search.global===( count===1 ) ) { throw Error$1(`jVue 内部错误`); }
				content = content.replace(search, (...args          ) => {
					--count;
					return typeof replacer==='function' ? replacer(...args) : replacer;
				});
				if ( count ) { throw Error$1(`jVue 内部版本依赖错误`); }
			}
			return content;
		};
	}
	
	function Exports    (content        , filename        , cache            ) {
		const module_require = ( require('module').createRequire ?? require('module').createRequireFromPath )(filename);
		const module = Null({ exports: {}      });
		require('vm').compileFunction(
			content,
			[ 'exports', 'require', 'module', '__filename', '__dirname' ],
			{ filename }
		).call(module.exports, module.exports, cache ? (id        ) => cache[id] ?? module_require(id) : module_require, module, filename, require('path').dirname(filename));
		return module.exports;
	}
	
} )();

class Block                                    {
	
	          constructor (blockName           , attributes            , emitProperties         , inner                    , END_TAG               ) {
		this.blockName = blockName;
		this.attributes = attributes;
		if ( inner===undefined$1 ) {
			if ( emitProperties ) {
				if ( attributes.src===EMPTY ) { throw SyntaxError$1(`自闭合功能块元素必须存在 src 属性值`); }
				this.src = attributes.src;
				if ( 'lang' in attributes ) { throw SyntaxError$1(`自闭合功能块元素不支持 lang 属性`); }
			}
		}
		else {
			this.inner = inner;
			if ( emitProperties ) {
				if ( 'src' in attributes ) { throw SyntaxError$1(`开放功能块元素不能存在 src 属性`); }
				if ( 'lang' in attributes ) {
					if ( !attributes.lang ) { throw SyntaxError$1(`开放功能块元素的 lang 属性如果设置，值不能为空`); }
					this.lang = attributes.lang;
				}
			}
			if ( END_TAG && END_TAG.test(inner) ) { throw SyntaxError$1(`“${blockName}”块内包含疑似结束标签的内容（注意 .vue 文件需要确保单行/多行解析模式与传统 HTML 流式解析的结果一致）`); }
		}
		return this;
	}
	
	         blockName           ;
	         attributes            ;
	inner         ;
	         src         ;
	         lang         ;
	
}
freeze(Block.prototype);

const Private = (
	/*! j-globals: private (internal) */
	/*#__PURE__*/ function (WeakMap) {
		function createNULL () { return create$1(NULL); }
		var GET = createNULL();
		GET.value = WeakMap.prototype.get;
		var SET = createNULL();
		SET.value = WeakMap.prototype.set;
		return function Private (PRIVATE) {
			var _This = typeof PRIVATE==='function'
				? 'prototype' in PRIVATE
					? function (THIS) { return new PRIVATE(THIS); }
					: PRIVATE
				: PRIVATE===undefined
					? createNULL
					:PRIVATE===null ? createNULL : function () { return create$1(PRIVATE); };
			var weak = /*#__PURE__*/defineProperty(/*#__PURE__*/defineProperty(/*#__PURE__*/new WeakMap, 'get', GET), 'set', SET);
			function _ (THIS) { return /*#__PURE__*/weak.get(THIS); }
			_.new = function (THIS) {
				var _THIS = _This(THIS);
				weak.set(THIS, _THIS);
				return _THIS;
			};
			return _;
		};
	}(WeakMap)
	/*¡ j-globals: private (internal) */
);

const _ = Private()                    ;

const SCRIPT_END_TAG = newRegExp('i')`</script${TAG_EMIT_CHAR}`;

/* TODO:
<https://mimesniff.spec.whatwg.org/#javascript-mime-type>
A JavaScript MIME type is any MIME type whose essence is one of the following:
application/ecmascript
application/javascript
application/x-ecmascript
application/x-javascript
text/ecmascript
text/javascript
text/javascript1.0
text/javascript1.1
text/javascript1.2
text/javascript1.3
text/javascript1.4
text/javascript1.5
text/jscript
text/livescript
text/x-ecmascript
text/x-javascript
*/
const JS = newRegExp('i')`^${ASCII_WHITESPACE}*(?:
	JS|JavaScript(?:${ASCII_WHITESPACE}*1\.\d)?|JSX
	|
	(?:ES|ECMAScript|ECMAS?)(?:${ASCII_WHITESPACE}*\d+)?
	|
	ESM
	|
	(?:text|application)\/(?:ECMAScript|JavaScript(?:;${ASCII_WHITESPACE}*version${ASCII_WHITESPACE}*=${ASCII_WHITESPACE}*1\.\d)?)
)${ASCII_WHITESPACE}*$`;
const TS = newRegExp('i')`^${ASCII_WHITESPACE}*T(?:S|ypeScript)${ASCII_WHITESPACE}*$`;
const TSX = newRegExp('i')`^${ASCII_WHITESPACE}*TSX${ASCII_WHITESPACE}*$`;

class Script extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.Script'; }
	
	constructor (attributes            , inner                    ) {
		super('script', attributes, true, inner, SCRIPT_END_TAG);
		_.new(this);
		return this;
	}
	
	get innerJS ()         {
		let inner                     = _(this).innerJS;
		if ( inner===undefined$1 ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error$1(`自闭合的 script 功能块元素必须自行加载 src 属性所要求的 inner 值`); }
			const { lang } = this;
			if ( lang && !JS.test(lang) ) {
				if ( TS.test(lang) ) { inner = transpileModule(inner, false); }
				else if ( TSX.test(lang) ) { inner = transpileModule(inner, true); }
				else { throw Error$1(`script 功能块元素如果设置了非 js / jsx / ts / tsx 的 lang 属性值，那么必须自行提供转译后的 innerJS`); }
			}
		}
		return inner;
	}
	set innerJS (value        ) {
		if ( typeof ( value            )!=='string' ) { throw TypeError$1(`innerJS 只能被赋值字符串`); }
		_(this).innerJS = value;
	}
	
}
freeze(Script.prototype);

class ScriptSetup extends Script {
	
	get [Symbol.toStringTag] () { return 'SFC.ScriptSetup'; }
	
	constructor (attributes            , inner                    ) {
		throw Error$1(`jVue 暂未支持编译 script setup`);///
	}
	
	///innerJS
	
}

freeze(ScriptSetup.prototype);

const throwSyntaxError = (
	/*! j-globals: throw.SyntaxError (internal) */
	function throwSyntaxError (message) {
		throw SyntaxError(message);
	}
	/*¡ j-globals: throw.SyntaxError (internal) */
);

if ( /k/i.test('\u212A') || /s/i.test('\u017F') ) { throw Error$1(`ks`); }
const {
	
	charset,
	IMPORT,
	namespace,
	media,
	page,
	'font-face': font_face,
	'*keyframes': keyframes,
	supports,
	document: document$1,
	
	'url-prefix(': url_prefix_,
	'domain(': domain_,
	
	from: from$1,
	to,
	none,
	DEFAULT,
	inherit,
	initial,
	unset,
	
} = new Proxy$1({}                                                    , {
	get (is, keyword        ) {
		keyword = keyword.toLowerCase();
		const KEYWORD = RegExp$1('^' + keyword.replace('(', '\\(').replace('*', '(?:-[a-z][\\da-z]*-)?') + '$', 'i');
		return { [keyword]: (text        )          => KEYWORD.test(text) }[keyword];
	}
});

const nonASCII = /\x80-\uFFFF/;
const hex_digit = /[0-9A-F]/i;
const escape = newRegExp('i')`
	\\
	(?:
		${hex_digit}{1,6}
		(?:[\t\n\f ]|\r\n?)?
		|
		[^\n\f\r]
	)
`;
const ws = /\t\n\f\r /;
const ident_token_start = newRegExp('i')`
	(?:
		-
		(?:
			-
		|
			[a-z_${nonASCII}]
		|
			${escape}
		)
	|
		[a-z_${nonASCII}]
	|
		${escape}
	)
`;
const ident_token = newRegExp('i')`
	${ident_token_start}
	(?:
		[-\w${nonASCII}]
	|
		${escape}
	)*
`;
const hash_token = newRegExp('i')`
	#
	(?:
		[-\w${nonASCII}]
	|
		${escape}
	)*
`;
const string_token = newRegExp`
	"
	(?:\\(?:\r\n?|.)|[^\\"\n\f\r])*
	"?
|
	'
	(?:\\(?:\r\n?|.)|[^\\'\n\f\r])*
	'?
`;
const url_token = newRegExp('i')`
	url
	(?:
		\(
		[${ws}]*
		(?![${ws}"'])
		(?:
			${escape}
		|
			[^)]
		)*
		\)?
	|
		-prefix\([${ws}]*\)
	)
|
	domain\([${ws}]*	[a-z\d\-.:]*	[${ws}]*\)
`;
const number_token = newRegExp('i')`
	[-+]?
	(?:\d+(?:\.\d+)?|\.\d+)
	(?:e[+-]?\d+)?
`;
const CDO_token = '<!--';
const CDC_token = '-->';

const TOKENS$1 = newRegExp('gis')`
	(?:
		[${ws}]+
	|
		/\*.*?\*/
	)+
|
	/\*.*
|
	${url_token}
	|
	${ident_token}\(?
	|
	@${ident_token}
|
	${number_token}(?:${ident_token}|%)?
|
	${hash_token}
|
	${string_token}
|
	${CDO_token}
|
	${CDC_token}
|
	.
`;

const BAD_URL = newRegExp('i')`
	^
	url\(
	(?!
	[${ws}]*
	(?:${escape}|[^${ws}"'()\\])*
	[${ws}]*
	\)
	$
	)
`;
const NUMBER = /[\d.]/;
const COMMENT$1 = /\/\*.*?\*\//gs;
const IDENT = newRegExp('i')`
	^
	${ident_token}
	$
`;
const FUNCTION = newRegExp('i')`
	^
	${ident_token}\(
	$
`;

const comment = 'c';
const whitespace = 'w';
const ident = 'i';
const at_keyword = 'a';
const function$ = 'f';
const hash = 'h';
const string = 's';
const number = 'n';
const dimension = 'd';
const percentage = 'p';
const url = 'u';

const IdentLike = (literal        ) =>
	IDENT.test(literal) ? ident :
		FUNCTION.test(literal) ?
			url_prefix_(literal) ? throwSyntaxError(`function-token "url-prefix" 不在标准中，而它此刻的内容又存在歧义`) :
				domain_(literal) ? throwSyntaxError(`function-token "domain" 不在标准中，而它此刻的内容又存在歧义`) :
					function$ :
			BAD_URL.test(literal) ? throwSyntaxError(`bad-url-token`) :
				url;

const Numeric = (literal        ) => {
	const rest = literal.replace(number_token, '');
	return rest ? rest==='%' ? percentage : dimension : number;
};

                                                                                           
	                                                                                     
	                                                                                    
const Type = (literal        )       => {
	switch ( literal[0] ) {
		case '\t':
		case '\n':
		case '\f':
		case '\r':
		case ' ':
			return whitespace;
		case '!':
			return literal       ;
		case '"':
			return literal[literal.length - 1]==='"' && literal.length!==1 ? literal.includes('\t') ? throwSyntaxError(`CSS 2 不允许字符串中存在 TAB`) : string : throwSyntaxError(`bad-string-token`);
		case '#':
			return hash;
		case '$':
		case '%':
		case '&':
			return literal                   ;
		case '\'':
			return literal[literal.length - 1]==='\'' && literal.length!==1 ? literal.includes('\t') ? throwSyntaxError(`CSS 2 不允许字符串中存在 TAB`) : string : throwSyntaxError(`bad-string-token`);
		case '(':
		case ')':
		case '*':
			return literal                   ;
		case '+':
			return literal==='+' ? literal : Numeric(literal);
		case ',':
			return literal       ;
		case '-':
			if ( literal==='-' ) { return literal; }
			if ( NUMBER.test(literal[1]) ) { return Numeric(literal); }
			if ( literal==='-->' ) { throw SyntaxError$1(`用于 SFC 的 CSS 中不应用到 CDC-token`); }
			break;
		case '.':
			return literal==='.' ? literal : Numeric(literal);
		case '/':
			if ( literal==='/' ) { return literal; }
			literal = literal.replace(COMMENT$1, '');
			return literal
				? literal[0]==='/'
					? throwSyntaxError(`bad-comment-token`)
					: whitespace
				: comment;
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			return Numeric(literal);
		case ':':
		case ';':
			return literal             ;
		case '<':
			return literal==='<' ? literal : throwSyntaxError(`用于 SFC 的 CSS 中不应用到 CDO-token`);
		case '=':
		case '>':
		case '?':
			return literal                   ;
		case '@':
			return literal==='@' ? literal : at_keyword;
		case '[':
			return literal       ;
		case '\\':
			if ( literal==='\\' ) { throw SyntaxError$1(`bad escape`); }
			break;
		case ']':
		case '^':
		case '`':
		case '{':
		case '|':
		case '}':
		case '~':
			return literal                                           ;
	}
	return IdentLike(literal);
};

let literal         = '';
let type      ;

const parse$1 = (sheet       , source        )       => {
	let layer        = sheet;
	const literals           = source.match(TOKENS$1) ?? [];
	const { length } = literals;
	let types = '';
	let index = 0;
	while ( index!==length ) { types += Type(literals[index++]); }
	for ( index = 0; index!==length; ++index ) {
		type = ( types                                       )[index];
		literal = literals[index];
		layer = layer.appendToken() ?? throwSyntaxError(`CSS 中出现了 ${layer.constructor.name} 上下文不允许的内容“${literal}”：\n${literals.slice(0, index).join('')}`);
	}
	layer===sheet || layer.parent===sheet && !layer.block || throwSyntaxError(`CSS 终止处尚有未完成的结构`);
};

const typeSelectors                                                    = [];

const clear = ()       => {
	literal = '';
	typeSelectors.length = 0;
};

class TypeSelector {
	
	         parent                                  ;
	cssText        ;
	         ns_         ;
	
	constructor (parent                                  , literal        , ns_         ) {
		this.parent = parent;
		this.cssText = literal;
		this.ns_ = ns_;
		return this;
	}
	
}

freeze(TypeSelector.prototype);

class ClassSelector {
	
	         parent                                  ;
	         literal        ;
	
	constructor (parent                                  , literal        ) {
		this.parent = parent;
		this.literal = literal;
		return this;
	}
	
	get cssText () { return `.${this.literal}`; }
	
}

freeze(ClassSelector.prototype);

class SquareBracketBlock extends Array$1         {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.SquareBracketBlock'; }
	
	         parent                                  ;
	
	constructor (parent                                  ) {
		super();
		this.parent = parent;
		return this;
	}
	
	appendToken (                        )                                                               {
		switch ( type ) {
			case ']':
				const lastItem = this[this.length-1];
				( lastItem===' ' || lastItem==='/**/' ) && --this.length;
				return this.parent;
			case whitespace:
				this.length && ( this[this.length] = ' ' );
				return this;
			case ident:
			case '~':
			case '|':
			case '^':
			case '$':
			case '*':
			case '=':
			case string:
				this[this.length] = literal;
				return this;
			case comment:
				this.length && ( this[this.length] = '/**/' );
				return this;
		}
		return null;
	}
	
	get cssText ()         { return `[${this.join('')}]`; }
	
}
freeze(SquareBracketBlock.prototype);

class ParenthesisBlock extends NodeList                                                                                {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.ParenthesisBlock'; }
	
	         parent                                                                      ;
	                 name        ;
	
	constructor (parent                                                                      , name        ) {
		super();
		this.parent = parent;
		this.name = name;
		return this;
	}
	
	appendToken (                      )                                                                                                   {
		switch ( type ) {
			case whitespace:
				this.length && ( this[this.length] = ' ' );
				return this;
			case function$:
			case '(':
				const parenthesisBlock = new ParenthesisBlock(this, literal.slice(0, -1));
				this[this.length] = parenthesisBlock;
				return parenthesisBlock;
			case '[':
				const squareBracketBlock = new SquareBracketBlock(this);
				this[this.length] = squareBracketBlock;
				return squareBracketBlock;
			case ')':
				const lastItem = this[this.length-1];
				( lastItem===' ' || lastItem==='/**/' ) && --this.length;
				return this.parent;
			case comment:
				this.length && ( this[this.length] = '/**/' );
				return this;
			case ']':
			case '{':
			case '}':
			case '`':
			case '^':
			case '@':
			case '<':
			case '=':
			case ';':
			case '&':
			case '%':
			case at_keyword:
				return null;
			/*
			case TOKEN.ident:
			case TOKEN.hash:
			case TOKEN.string:
			case TOKEN.number:
			case TOKEN.dimension:
			case TOKEN.percentage:
			case TOKEN.url:
			case '!':
			case '$':
			case '*':
			case '+':
			case ',':
			case '-':
			case '.':
			case '/':
			case ':':
			case '>':
			case '?':
			case '|':
			case '~':
			*/
		}
		this[this.length] = literal;
		return this;
	}
	
	get cssText ()         {
		let cssText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index] ;
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		return `${this.name}(${cssText})`;
	}
	
}
freeze(ParenthesisBlock.prototype);

class Declaration extends Array$1                            {// property or descriptor
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.*.Declaration'; }
	
	         parent                                ;
	         name        ;
	        colon          = false;
	///private semicolon :boolean = false;
	
	constructor (parent                                , name        ) {
		super();
		this.parent = parent;
		this.name = name;
		return this;
	}
	
	appendToken (                 )                                                                                                 {
		if ( this.colon ) {
			switch ( type ) {
				case ';':
					///this.semicolon = true;
					return this.parent;
				case function$:
					const parenthesisBlock = new ParenthesisBlock(this, literal.slice(0, -1));
					this[this.length] = parenthesisBlock;
					return parenthesisBlock;
				case '}':
					return this.parent.appendToken()                           ;
				case '?':
				case '/':
				case '-':
				case '+':
				case ',':
				case '*':
				case '!':
				case ident:
				case hash:
				case string:
				case number:
				case dimension:
				case percentage:
				case url:
					this[this.length] = literal;
					return this;
				case whitespace:
					this.length && ( this[this.length] = ' ' );
					return this;
				case comment:
					this.length && ( this[this.length] = '/**/' );
					return this;
			}
		}
		else {
			if ( type===':' ) {
				this.colon = true;
				return this;
			}
			if ( type===whitespace || type===comment ) { return this; }
		}
		return null;
	}
	
	get cssText ()         {
		let cssText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		return `${this.name}:${cssText};`;
	}
	
	                                                                               
	* beautify (                 )                                     {
		let cssText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			cssText = ( typeof child==='string' ? child : child.cssText )+cssText;
		}
		yield `${this.name}:${cssText[0]===' ' ? '' : ' '}${cssText};`;
	}
	
}
freeze(Declaration.prototype);

const IDENT$1 = newRegExp('i')`^${ident_token}$`;

class Declarations extends Array$1              {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.QualifiedRule.Declarations'; }
	
	         parent               ;
	
	constructor (parent               ) {
		super();
		this.parent = parent;
		return this;
	}
	
	appendToken (                  )                                                                              {
		switch ( type ) {
			case whitespace:
			case comment:
				return this;
			case ident:
				return this[this.length] = new Declaration(this, literal);
			case '}':
				return this.parent.parent;
		}
		return null;
	}
	
}

freeze(Declarations.prototype);

const replaceTypeSelector = (func                  , qualifiedRule               )          => {
	
	let { length } = func;
	if ( !length ) { return false; }
	
	const indexes = [];
	let indexes_length = 0;
	
	let index = 1;
	for ( ; index!==length; ++index ) {
		if ( func[index]==='/**/' ) {
			const previousItem = func[index-1];
			if ( previousItem==='.' || previousItem===':' || previousItem==='|' || func[index+1]==='|' ) { indexes[indexes_length++] = index; }
		}
	}
	if ( indexes_length ) {
		length -= indexes_length;
		do { func.splice(indexes[--indexes_length], 1); }
		while ( indexes_length )
		indexes.length = 0;
	}
	
	for ( index = 0; index!==length; ++index ) {
		if ( func[index]==='|' && func[index+1]==='|' ) {
			if ( func[index+2]==='|' ) { return true; }
			func[index] = '||';
			indexes[indexes_length++] = ++index;
		}
	}
	if ( indexes_length ) {
		length -= indexes_length;
		do { func.splice(indexes[--indexes_length], 1); }
		while ( indexes_length )
		indexes.length = 0;
	}
	
	index = 0;
	for ( const { classSelectorsPART } = qualifiedRule; index!==length; ++index ) {
		let item = func[index];
		if ( item==='.' ) {
			if ( typeof ( item = func[index+1] )!=='string' || !IDENT$1.test(item) || func[index+2]==='|' ) { return true; }
			func[index] = classSelectorsPART[classSelectorsPART.length] = new ClassSelector(func, item);
			indexes[indexes_length++] = ++index;
		}
		else if ( item===':' ) {
			if ( typeof ( item = func[index+1] )==='string' && IDENT$1.test(item) ) {
				if ( func[index+2]==='|' ) { return true; }
				++index;
			}
		}
		else if ( item==='*' ) {
			if ( func[index+1]==='|' && ( item = func[index += 2] )!=='*' ) {
				if ( typeof item!=='string' || !IDENT$1.test(item) ) { return true; }
				func[index] = typeSelectors[typeSelectors.length] = new TypeSelector(func, item, true);
			}
		}
		else if ( item==='|' ) { return true; }
		else if ( typeof item==='string' ) {
			if ( IDENT$1.test(item) ) {
				if ( func[index+1]==='|' ) {
					item = func[index += 2];
					if ( item!=='*' ) {
						if ( typeof item!=='string' || !IDENT$1.test(item) ) { return true; }
						func[index] = typeSelectors[typeSelectors.length] = new TypeSelector(func, item, true);
					}
				}
				else {
					func[index] = typeSelectors[typeSelectors.length] = new TypeSelector(func, item, false);
				}
			}
		}
		else if ( item instanceof ParenthesisBlock && replaceTypeSelector(item, qualifiedRule) ) { return true; }
	}
	while ( indexes_length ) { func.splice(indexes[--indexes_length], 1); }
	
	return false;
	
};

class QualifiedRule extends Array$1                                                                                {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.QualifiedRule'; }
	
	         parent                                         ;
	         block              ;
	#func                          = null;
	#l            = 0;
	classSelectorsPART                  = [];
	         classSelectors                    = [ this.classSelectorsPART ];
	
	constructor (parent                                         ) {
		super();
		this.parent = parent;
		this.block = new Declarations(this);
		return this;
	}
	
	appendToken (                     not          )                                                                              {
		if ( this.#func ) {
			if ( replaceTypeSelector(this.#func, this) ) { return null; }
			this.#func = null;
		}
		else if ( this.#l ) {
			if ( type==='|' ) {
				if ( this.#l===2 ) { return null; }
				this.#l = 2;
				return this;
			}
			else {
				let { length } = this;
				if ( !length ) { return null; }
				let lastItem = this[length-1];
				if ( this.#l===2 ) {
					this[lastItem===' ' || lastItem==='/**/' ? length-1 : length] = '||';
					return this;
				}
				if ( lastItem==='/**/' ) {
					if ( !--length ) { return null; }
					lastItem = this[length-1];
				}
				if ( lastItem!=='*' ) {
					const lastIndex = typeSelectors.length-1;
					if ( lastItem!==typeSelectors[lastIndex] ) { return null; }
					typeSelectors.length = lastIndex;
				}
				this[length] = '|';
				return this;
			}
		}
		switch ( type ) {
			case whitespace: {/// [0]
				const lastItem = this[this.length-1];
				if ( lastItem===',' || lastItem==='+' || lastItem==='>' || lastItem==='||' ) { return this; }
				this[this.length] = ' ';
				return this;
			}
			case ':':
				this[this.length] = type;
				return this;
			case '.':
				this[this.length] = type;
				return this;
			case ident:
				const lastItem = this[this.length-1];
				if ( lastItem===':' || not ) { this[this.length] = literal; }
				else {
					lastItem==='.'
						? this[this.length-1] = this.classSelectorsPART[this.classSelectorsPART.length] = new ClassSelector(this, literal)
						: this[this.length] = typeSelectors[typeSelectors.length] = new TypeSelector(this, literal, lastItem==='|');
				}
				return this;
			case ',':
				this.classSelectors[this.classSelectors.length] = this.classSelectorsPART = [];
			case '+':
			case '>': {
				const lastItem = this[this.length-1];
				this[lastItem===' ' || lastItem==='/**/' ? this.length-1 : this.length] = literal;
				return this;
			}
			case '|':
				this.#l = 1;
				return this;
			case '*':
			case '~':
			case '!':
			case '$':
			case '/':
			case hash:
			case percentage:// not style rule
				this[this.length] = literal;
				return this;
			case '[':
				const squareBracketBlock = new SquareBracketBlock(this);
				this[this.length] = squareBracketBlock;
				return squareBracketBlock;
			case function$:
				if ( this[this.length-1]!==':' ) { break; }
				const parenthesisBlock = new ParenthesisBlock(this, literal.slice(0, -1));
				this[this.length] = parenthesisBlock;
				this.#func = parenthesisBlock;
				return parenthesisBlock;
			case '{': {
				const lastItem = this[this.length-1];
				( lastItem===' ' || lastItem==='/**/' ) && --this.length;
				return this.block;
			}
			case comment: {/// [0]
				const lastItem = this[this.length-1];
				if ( lastItem===',' || lastItem==='+' || lastItem==='>' || lastItem==='||' || lastItem==='|' || lastItem==='.' || lastItem===':' ) { return this; }
				this[this.length] = '/**/';
				return this;
			}
		}
		return null;
	}
	
	selectorTextAt (                     index        )         {
		let start = 0;
		for ( ; index; --index ) { start = this.indexOf(',', start)+1; }
		let selectorText = '';
		let end = this.indexOf(',', start);
		if ( end<0 ) { end = this.length; }
		while ( start!==end ) {
			const child = this[start++] ;
			selectorText += typeof child==='string' ? child : child.cssText;
		}
		return selectorText;
	}
	
	        get selectorText ()         {
		let selectorText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index] ;
			selectorText = ( typeof child==='string' ? child : child.cssText )+selectorText;
		}
		return selectorText;
	}
	
	get cssText ()         {
		const { block } = this;
		let blockText = '';
		let index = block.length;
		while ( index ) { blockText = block[--index].cssText+blockText; }
		return blockText && `${this.selectorText}{${blockText.slice(0, -1)}}`;
	}
	
	                                                                                 
	* beautify (                   )                                     {
		const { block } = this;
		let blockText = '';
		let index = block.length;
		while ( index ) { blockText = block[--index].cssText+' '+blockText; }
		if ( blockText ) { yield `${this.selectorText} { ${blockText}}`; }
	}
	
}
freeze(QualifiedRule.prototype);

const isCSSWideKeywords = (literal        ) => inherit(literal) || initial(literal) || unset(literal);
const notCustomIdent = (literal        ) => DEFAULT(literal) || isCSSWideKeywords(literal);

class KeyframesRule extends Array$1                {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.KeyframesRule'; }
	
	         parent                         ;
	         #keyword        ;
	keyframesNameLiteral         = '';
	#blocked          = false;
	get block () { return true         ; }
	
	constructor (parent                         , keyword        ) {
		super();
		this.parent = parent;
		this.#keyword = keyword;
		return this;
	}
	
	appendToken (                   )                                                                 {
		switch ( type ) {
			case whitespace:
			case comment:
				return this;
			case ident:
				if ( this.#blocked ) {
					if ( !from$1(literal) && !to(literal) ) { break; }
					const qualifiedRule = new QualifiedRule(this);
					this[this.length] = qualifiedRule;
					return qualifiedRule.appendToken(true)                 ;
				}
				else {
					const { keyframesNameLiteral } = this;
					if ( keyframesNameLiteral ) { break; }
					if ( none(literal) || notCustomIdent(literal) ) { break; }
					this.keyframesNameLiteral = literal;
					return this;
				}
			case string:
				if ( this.keyframesNameLiteral ) { break; }
				this.keyframesNameLiteral = literal;
				return this;
			case '{':
				if ( !this.keyframesNameLiteral || this.#blocked ) { break; }
				this.#blocked = true;
				return this;
			case '}':
				if ( !this.#blocked ) { break; }
				return this.parent;
			case percentage:
				if ( !this.#blocked ) { break; }
				const qualifiedRule = new QualifiedRule(this);
				this[this.length] = qualifiedRule;
				return qualifiedRule.appendToken()                 ;
		}
		return null;
	}
	
	get cssText ()         {
		const { keyframesNameLiteral } = this;
		let blockText = '';
		let index = this.length;
		while ( index ) { blockText = this[--index].cssText+blockText; }
		return `@${this.#keyword}${keyframesNameLiteral[0]==='"' || keyframesNameLiteral[0]==='\'' ? '' : ' '}${keyframesNameLiteral}{${blockText}}`;
	}
	
	* beautify (                     tab         = '\t')                                     {
		yield `@${this.#keyword} ${this.keyframesNameLiteral} {`;
		const { length } = this;
		let index = 0;
		while ( index!==length ) {
			for ( const line of this[index++].beautify(tab) ) {
				yield tab+line;
			}
		}
		yield `}`;
	}
	
}
freeze(KeyframesRule.prototype);

class Multi extends Array$1 {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule.Multi'; }
	
	         parent                 ;
	                 declaration             ;
	                 styleRule               ;
	#d     ;
	#sr     ;
	
	constructor (parent                 ) {
		super();
		this.parent = parent;
		this.#d = this.declaration = new Declaration(parent, literal);
		this.#sr = ( this.styleRule = new QualifiedRule(parent) ).appendToken();// may not style rule
		return this;
	}
	
	appendToken (           ) {
		const d = this.#d.appendToken();
		const sr = this.#sr.appendToken();
		if ( d && sr ) {
			this.#d = d;
			this.#sr = sr;
			return this;
		}
		if ( d ) {
			this.parent[this.parent.length] = this.declaration;
			return d;
		}
		if ( sr ) {
			this.parent[this.parent.length] = this.styleRule;
			return sr;
		}
		return null;
	}
	
}

freeze(Multi.prototype);

class DeclarationList extends Array$1                                                       {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule.DeclarationList'; }
	
	         parent        ;
	         #noAt          = false;
	         #noQualified          = false;
	         #noDeclaration          = false;
	
	constructor (parent        ) {
		super();
		this.parent = parent;
		const parent_parent = parent.parent;
		if ( parent_parent instanceof DeclarationList && page(parent_parent.parent.name) ) {
			this.#noAt = true;
			this.#noQualified = true;
			return;
		}
		const { name } = parent;
		if ( media(name) ) { this.#noDeclaration = true; }
		//else if ( is.keyframes(name) ) {
		//	this.#noAt = true;
		//	this.#noDeclaration = true;
		//}
		else if ( font_face(name) ) {
			this.#noAt = true;
			this.#noQualified = true;
		}
		else if ( page(name) ) { this.#noQualified = true; }
		else if ( supports(name) || document$1(name) ) { this.#noDeclaration = true; }
		return this;
	}
	
	appendToken (                     )                                                                                                                     {
		switch ( type ) {
			case whitespace:
			case comment:
				return this;
			case at_keyword:
				if ( this.#noAt ) { break; }
				const name = literal.slice(1);
				if ( charset(name) || IMPORT(name) || namespace(name) ) { break; }
				const atRule = keyframes(name) ? new KeyframesRule(this, name) : new AtRule(this, name);
				this[this.length] = atRule;
				return atRule;
			case ident:
				if ( this.#noDeclaration ) {
					if ( this.#noQualified ) { break; }
					const styleRule = new QualifiedRule(this);// may not style rule
					this[this.length] = styleRule;
					return styleRule.appendToken()                 ;
				}
				if ( this.#noQualified ) {
					const declaration = new Declaration(this, literal);
					this[this.length] = declaration;
					return declaration;
				}
				return new Multi(this);
			case '*':
			case '.':
			case ':':
			case '[':
			///case '|':
			case '$':
			case hash:
			///case TOKEN.percentage:// not style rule
				if ( this.#noQualified ) { break; }
				const styleRule = new QualifiedRule(this);
				this[this.length] = styleRule;
				return styleRule.appendToken()                                      ;
			case '}':
				return this.parent.parent;
		}
		return null;
	}
	
}

freeze(DeclarationList.prototype);

class AtRule extends Array$1                                                 {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.AtRule'; }
	
	         parent                         ;
	         name        ;
	block                         = null;
	///private semicolon :boolean = false;
	
	constructor (parent                         , name        ) {
		super();
		this.parent = parent;
		this.name = name;
		return this;
	}
	
	appendToken (            )                                                                                  {
		switch ( type ) {
			case whitespace:
				this.length && ( this[this.length] = ' ' );
				return this;
			case function$:
			case '(': {
				const parenthesisBlock = new ParenthesisBlock(this, literal.slice(0, -1));
				this[this.length] = parenthesisBlock;
				return parenthesisBlock;
			}
			case ident:
			case string:
			case url:
			case ':':
			case ',':
				this[this.length] = literal;
				return this;
			case '{': {
				if ( /*is.charset(this.name) || is.import(this.name) || */namespace(this.name) ) { break; }
				const lastIndex = this.length-1;
				if ( lastIndex>=0 ) {
					const lastItem = this[lastIndex];
					if ( lastItem===' ' || lastItem==='/**/' ) { this.length = lastIndex; }
				}
				return this.block = new DeclarationList(this);
			}
			case ';': {
				const { name } = this;
				if ( media(name) || page(name) || font_face(name) || /*is.keyframes(name) || */supports(name) || document$1(name) ) { break; }
				///this.semicolon = true;
				return this.parent;
			}
			case '}': {
				const { name } = this;
				if ( media(name) || page(name) || font_face(name) || /*is.keyframes(name) || */supports(name) || document$1(name) ) { break; }
				return this.parent.appendToken()                           ;
			}
			case comment:
				this.length && ( this[this.length] = '/**/' );
				return this;
		}
		return null;
	}
	
	get cssText ()         {
		let atText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		const { block } = this;
		if ( block ) {
			let blockText = '';
			let index = block.length;
			while ( index ) { blockText = block[--index].cssText+blockText; }
			return `@${this.name}${atText ? ' ' : ''}${atText}{${blockText && blockText[blockText.length - 1]===';' ? blockText.slice(0, -1) : blockText}}`;
		}
		else {
			return `@${this.name}${atText ? ' ' : ''}${atText};`;
		}
	}
	
	* beautify (              tab         = '\t')                                     {
		let atText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		const { block } = this;
		if ( block ) {
			yield `@${this.name}${atText ? ' ' : ''}${atText} {`;
			let index = 0;
			const { length } = block;
			while ( index!==length ) {
				for ( const line of block[index++].beautify(tab) ) {
					yield tab+line;
				}
			}
			yield `}`;
		}
		else {
			yield `@${this.name}${atText ? ' ' : ''}${atText};`;
		}
	}
	
}
freeze(AtRule.prototype);

class ImportRule extends Array$1                            {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet.ImportRule'; }
	
	         parent       ;
	         name         = 'import';
	get block () { return false         ; }
	///private semicolon :boolean = false;
	
	constructor (parent       ) {
		super();
		this.parent = parent;
		return this;
	}
	
	appendToken (                )                                               {
		switch ( type ) {
			case whitespace:
				this.length && ( this[this.length] = ' ' );
				return this;
			case function$:
			case '(':
				const parenthesisBlock = new ParenthesisBlock(this, literal.slice(0, -1));
				this[this.length] = parenthesisBlock;
				return parenthesisBlock;
			case ident:
			case string:
			case url:
			case ':':
			case ',':
				this[this.length] = literal;
				return this;
			case ';': {
				///this.semicolon = true;
				return this.parent;
			}
			case comment:
				this.length && ( this[this.length] = '/**/' );
				return this;
		}
		return null;
	}
	
	get cssText ()         {
		let atText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		return `@import ${atText};`;
	}
	
	                                                                              
	* beautify (                )                                     {
		let atText = '';
		let index = this.length;
		while ( index ) {
			const child = this[--index];
			atText = ( typeof child==='string' ? child : child.cssText )+atText;
		}
		yield `@import ${atText};`;
	}
	
}
freeze(ImportRule.prototype);

const NULL_SURROGATE = /[\x00\uD800-\uDFFF]/u;
const NON_PRINTABLE = /[\x00-\x08\x0B\x0E-\x1F\x7F]/;
const NOT_CHANGES = /\\.|[^\\\x80-\x9F]+/gs;

const checkScoped = (rules                                            , start        , __KEY__                                                              )       => {
	const { length } = rules;
	let index = start;
	while ( index!==length ) {
		const rule = rules[index++];
		switch ( rule.constructor ) {
			case QualifiedRule:
				const { classSelectors } = rule                 ;
				const { length } = classSelectors;
				let index = 0;
				do {
					const classSelectorsPART = classSelectors[index];
					const { length } = classSelectorsPART;
					if ( length ) {
						let index = 0;
						do { if ( !__KEY__.test(classSelectorsPART[index].literal) ) { throw ReferenceError$1(`.${classSelectorsPART[index].literal} 将对全局生效`); } }
						while ( ++index!==length )
					}
					else { throw ReferenceError$1(`${( rule                  ).selectorTextAt(index)} 将对全局生效`); }
				}
				while ( ++index!==length )
				break;
			case AtRule:
				const { block } = rule          ;
				block && checkScoped(block, 0, __KEY__);
				break;
			case KeyframesRule:
				const { keyframesNameLiteral } = rule                 ;
				if ( !__KEY__.test(keyframesNameLiteral[0]==='"' || keyframesNameLiteral[0]==='\'' ? keyframesNameLiteral.slice(1, -1) : keyframesNameLiteral) ) { throw ReferenceError$1(`@keyframes ${keyframesNameLiteral} 将对全局生效`); }
				break;
		}
	}
};

class Sheet extends Array$1                                                      {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet'; }
	
	#imports_length         = 0;
	#namespaces_length         = 0;
	
	constructor (inner        , abbr           ) {
		super();
		if ( !inner ) { return; }
		if ( inner[0]==='\uFEFF' ) { throw SyntaxError$1(`CSS 中 UTF BOM（U+FEFF）算作普通字符，处于起始位置时很可能是误用`); }
		if ( NULL_SURROGATE.test(inner) ) { throw SyntaxError$1(`CSS 中 NUL（U+00）或残破的代理对码点（U+D800〜U+DFFF）字面量会被替换为 U+FFFD，请避免使用`); }
		if ( NON_PRINTABLE.test(inner) ) { throw SyntaxError$1(`CSS 中不能出现除 TAB、LF、FF、CR 以外的控制字符字面量`); }
		if ( inner.replace(NOT_CHANGES, '') ) { throw SyntaxError$1(`U+80～U+9F 字面量在 CSS 2 和 3 之间表现不同，请避免使用`); }
		try {
			parse$1(this, inner);
			if ( abbr ) {
				const { length } = typeSelectors;
				let index = 0;
				while ( index!==length ) {
					const typeSelector = typeSelectors[index++];
					let { cssText } = typeSelector;
					/* AliasName: */if ( isAliasName(cssText) ) {
						typeSelector.cssText = typeSelector.ns_
							? ( cssText = abbr(cssText) )[0]==='.'//!newRegExp('i')`^${TOKEN.ident_token_start}`.test(cssText = abbr(cssText))
								? '*'+cssText
								: cssText
							: abbr(cssText);
					}
				}
			}
		}
		finally { clear(); }
		return this;
	}
	
	checkScoped (__KEY__                                                              )       {
		checkScoped(this, this.#imports_length+this.#namespaces_length, __KEY__);
	}
	
	appendToken (           )                                                                                                        {
		switch ( type ) {
			case whitespace:
			case comment:
				return this;
			case at_keyword:
				const name = literal.slice(1);
				if ( charset(name) ) {
					if ( this.length ) { break; }
					throw SyntaxError$1(`用于 SFC 的 CSS 中不应用到 @charset`);// return new AtRule(this, name);
				}
				let atRule;
				if ( IMPORT(name) ) {
					if ( this.length!==this.#imports_length ) { break; }
					++this.#imports_length;
					atRule = new ImportRule(this);
				}
				else if ( namespace(name) ) {
					if ( this.length!==this.#imports_length+this.#namespaces_length ) { break; }
					++this.#namespaces_length;
					atRule = new AtRule(this, name);
				}
				else { atRule = keyframes(name) ? new KeyframesRule(this, name) : new AtRule(this, name); }
				return this[this.length] = atRule;
			case ident:
			case '*':
			case '.':
			case ':':
			case '[':
			///case '|':
			case '$':
			case hash:
				const styleRule = new QualifiedRule(this);
				this[this.length] = styleRule;
				return styleRule.appendToken()                                    ;
		}
		return null;
	}
	
	get cssText ()         {
		let cssText = '';
		let index = 0;
		const { length } = this;
		while ( index!==length ) { cssText += this[index++].cssText; }
		return cssText && cssText[cssText.length - 1]===';' ? cssText.slice(0, -1) : cssText;
	}
	
	* beautify (             tab         = '\t')                                     {
		const { length } = this;
		let index = 0;
		while ( index!==length ) { yield * this[index++].beautify(tab); }
	}
	
}
freeze(Sheet.prototype);

/* AliasName: */const SELECTOR = newRegExp('u')`^
	${ASCII_WHITESPACE}*(?:
		${AliasName}${ASCII_WHITESPACE}*
		(?:=${ASCII_WHITESPACE}*
			(?:${localNameWithoutDot}|(?=\.))
			(?:\.${className})*
		${ASCII_WHITESPACE}*)?;
	${ASCII_WHITESPACE}*)*
$`;

const STYLE_END_TAG = newRegExp('i')`</style${TAG_EMIT_CHAR}`;

const CSS = newRegExp('i')`^${ASCII_WHITESPACE}*(?:text\/)?CSS${ASCII_WHITESPACE}*$`;

const defaultSelector = (Name        )         => `.${NameAs__Key__(Name)}`;

class Style extends Block          {
	
	get [Symbol.toStringTag] () { return 'SFC.Style'; }
	
	constructor (attributes            , inner                    ) {
		
		super('style', attributes, true, inner, STYLE_END_TAG);
		
		if ( 'module' in attributes ) { throw Error$1(`jVue 暂未支持编译 style module`); }
		if ( 'scoped' in attributes ) { throw Error$1(`jVue 暂未支持编译 style scoped`); }
		if ( 'vars' in attributes ) { throw Error$1(`jVue 暂未支持编译 style vars`); }
		
		const _this          = _.new(this);
		
		_this.allowGlobal = '.global' in attributes && ( attributes['.global']===EMPTY || throwSyntaxError(`style 块的“.global”属性不能具有值`) );
		
		if ( '.abbr' in attributes ) {
			const literal = attributes['.abbr'];
			if ( literal===EMPTY ) { _this.abbr = defaultSelector; }
			else {
				if ( !SELECTOR.test(literal) ) { throw SyntaxError$1(`style 块的“.abbr”属性语法错误：\n${literal}`); }
				const abbr = create$1(NULL)            ;
				const pairs = literal.split(';');
				const { length } = pairs;
				let index = 0;
				while ( index!==length ) {
					const tokens = pairs[index++].match(TOKENS);
					if ( tokens ) {
						const componentName         = tokens[0];
						abbr[componentName] = tokens.length>1 ? tokens[1] : defaultSelector(componentName);
					}
				}
				_this.abbr = (componentName        )         => {
					if ( componentName in abbr ) { return abbr[componentName]; }
					throw Error$1(`style 块中存在被遗漏的伪标签名 ${componentName} 选择器`);
				};
			}
		}
		
		if ( 'media' in attributes ) {
			if ( attributes.media===EMPTY ) { throw SyntaxError$1(`style 功能块元素的 media 属性必须具有值`); }
			_this.media = attributes.media;
		}
		
		return this;
		
	}
	
	get sheet ()        {
		const _this          = _(this);
		let inner                     = _this.innerCSS;
		if ( inner===undefined$1 ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error$1(`自闭合的 style 功能块元素必须自行根据 src 属性加载 inner 值`); }
			const { lang } = this;
			if ( lang && !CSS.test(lang) ) { throw Error$1(`style 功能块元素如果设置了非 css 的 lang 属性值，那么必须自行提供转译后的 innerCSS`); }
		}
		if ( _this.sheet && _this.cache===inner ) { return _this.sheet; }
		const sheet = new Sheet(inner, _this.abbr);
		_this.sheet = sheet;
		_this.cache = inner;
		return sheet;
	}
	
	get innerCSS ()         {
		return this.sheet.cssText;
	}
	set innerCSS (value        ) {
		if ( typeof ( value            )!=='string' ) { throw TypeError$1(`innerCSS 只能被赋值字符串`); }
		_(this).innerCSS = value;
	}
	
}
freeze(Style.prototype);

const parserOptions = Null({
	ecmaVersion: 2014,
	sourceType: 'module',// use strict mode
	allowReserved: true,
}         );

const NAMES           = [];

const Pattern = (node         )       => {
	switch ( node.type ) {
		case 'Identifier':
			const { name } = node;
			if ( name[0]==='_' || name[0]==='$' ) { NAMES[NAMES.length] = name; }
			break;
		case 'ObjectPattern':// { Pattern }
			let propertyIndex         = 0;
			for ( const { properties } = node, { length } = properties; propertyIndex!==length; ) {
				const property = properties[propertyIndex++];
				switch ( property.type ) {
					case 'Property':// { key: valuePattern }
						Pattern(property.value);
						break;
					case 'RestElement':// { ...argumentPattern }
						Pattern(property.argument);
						break;
					default:
						throw Error$1(`Unrecognized pattern type: ${property.type}`);
				}
			}
			break;
		case 'ArrayPattern':// [ , Pattern ]
			let elementIndex = 0;
			for ( const { elements } = node, { length } = elements; elementIndex!==length; ) {
				const element = elements[elementIndex++];
				element && Pattern(element);
			}
			break;
		case 'RestElement':
			Pattern(node.argument);// [ ...argumentPattern ] (...argumentPattern)
			break;
		case 'AssignmentPattern':// leftPattern = right
			Pattern(node.left);
			break;
		default:
			throw Error$1(`Unrecognized pattern type: ${node.type}`);
	}
};
const Params = (parameters        , min        , max        , attribute        )       => {
	let program         ;
	try { program = parse(`(${parameters})=>{}`, parserOptions)       ; }
	catch (error) {
		const index         = error.pos-1;
		throw SyntaxError$1(`${attribute}的内容“${parameters.slice(0, index)}”✗“${parameters.slice(index)}”解析失败`);
	}
	const { body } = program;
	if ( body.length!==1 ) { throw SyntaxError$1(`${attribute}的内容的解析结果不符合预期`); }
	const body_0 = body[0];
	if ( body_0.type!=='ExpressionStatement' ) { throw SyntaxError$1(`${attribute}的内容的解析结果不符合预期`); }
	const { expression } = body_0;
	if ( expression.type!=='ArrowFunctionExpression' ) { throw SyntaxError$1(`${attribute}的内容的解析结果不符合预期`); }
	const block = expression.body;
	if ( block.type!=='BlockStatement' || block.body.length!==0 ) { throw SyntaxError$1(`${attribute}的内容的解析结果不符合预期`); }
	const { params } = expression;
	const { length } = params;
	if ( length<min || max<length ) { throw SyntaxError$1(`${attribute}的内容的解析结果数量 ${length} 不符合预期的 ${min}～${max}`); }
	if ( !length ) { return; }
	NAMES.length = 0;
	let index = 0;
	while ( index!==length ) { Pattern(params[index++]); }
	if ( NAMES.length ) { throw ReferenceError$1(`${attribute}创建了以“_”或“$”开头的局部变量“${NAMES.join('”“')}”，这可能使得内层 Vue 模板编译结果以错误的方式运行`); }
};

const VOID                             = Null({ value: 0, writable: false, enumerable: false, configurable: false });

class Node extends NodeList       {
	
	          constructor () { return super()                   ; }
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Node'; }
	
	parentNode              = null;
	
	          void () { defineProperty(this, 'length', VOID); }
	
	//get childNodes () :NodeList<Element | Text> { return this; }
	get firstChild ()              { return this.length ? this[0]  : null; }
	get lastChild ()              { return this.length ? this[this.length-1]  : null; }
	
	appendChild                 (            node   )    {
		node.parentNode?.splice(node.parentNode.indexOf(node), 1);
		node.parentNode = this;
		this[this.length] = node;
		return node;
	}
	
	                                  
	                                                                                 
	
}
freeze(Node.prototype);

class Element extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Element'; }
	
	constructor (localName        , attributes            , __class__                    , shadowRoot                                                            ) {
		super();
		if ( __class__ ) {
			attributes.class = attributes.class
				? __class__+' '+attributes.class
				: __class__;
		}
		this.localName = localName;
		this.attributes = attributes;
		this.#shadowRoot = shadowRoot;
		return this;
	}
	
	         localName        ;
	         attributes            ;
	         #shadowRoot                                                   ;
	
	get outerHTML () {
		let innerHTML         = '';
		let index = this.length;
		while ( index ) { innerHTML = this[--index] .outerHTML+innerHTML; }
		if ( this.#shadowRoot ) {
			innerHTML = `<teleport v-if="${this.#shadowRoot.along}$get" :to="${this.#shadowRoot.along}$get">${innerHTML}</teleport>`;
			return this.#shadowRoot.aside
				? `<${this.localName}${this.attributes} :ref="${this.#shadowRoot.along}$set" />${innerHTML}`
				: `<${this.localName}${this.attributes} :ref="${this.#shadowRoot.along}$set">${innerHTML}</${this.localName}>`;
		}
		else {
			return innerHTML
				? `<${this.localName}${this.attributes}>${innerHTML}</${this.localName}>`
				: `<${this.localName}${this.attributes} />`;
		}
	}
	
	* beautify (               tab         = '\t')                                     {
		if ( this.#shadowRoot ) {
			const teleport = `<teleport v-if="${this.#shadowRoot.along}$get" :to="${this.#shadowRoot.along}$get">`;
			if ( this.#shadowRoot.aside ) {
				yield `<${this.localName}${this.attributes} :ref="${this.#shadowRoot.along}$set" />`;
				yield teleport;
				const { length } = this;
				let index = 0;
				while ( index!==length ) {
					for ( const line of this[index++] .beautify(tab) ) {
						yield `${tab}${line}`;
					}
				}
				yield `</teleport>`;
			}
			else {
				yield `<${this.localName}${this.attributes} :ref="${this.#shadowRoot.along}$set">`;
				yield tab + teleport;
				const { length } = this;
				let index = 0;
				while ( index!==length ) {
					for ( const line of this[index++] .beautify(tab) ) {
						yield `${tab}${tab}${line}`;
					}
				}
				yield `${tab}</teleport>`;
				yield `</${this.localName}>`;
			}
		}
		else {
			if ( this.length ) {
				yield `<${this.localName}${this.attributes}>`;
				const { length } = this;
				let index = 0;
				while ( index!==length ) {
					for ( const line of this[index++] .beautify(tab) ) {
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
	
}
freeze(Element.prototype);

class CharacterData extends Node {
	
	          constructor (data        ) {
		super();
		this.void();
		this.data = data;
		return this;
	}
	
	                                                    
	
	         data        ;
	
}

freeze(CharacterData.prototype);

class Text extends CharacterData {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Text'; }
	
	constructor (data         = '') { return super(data)                   ; }
	
	//get wholeText () :string { return this.data; }
	
	get outerHTML () {
		return escapeInnerText(this.data);
	}
	
	* beautify (          )                                     {
		yield * this.outerHTML.split('&#10;');
	}
	
}
freeze(Text.prototype);

class RawText extends Text {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.RawText'; }
	
	constructor (data        ) { return super(data)                   ; }
	
	get outerHTML () {
		return this.data;
	}
	
	* beautify (          )                                     {
		yield * this.outerHTML.split('\n');
	}
	
}

freeze(RawText.prototype);

const NT$1 = /\n\t+|\f\t*|\r\n?\t*/g;
const N = /^\n|\n$/g;

const OPEN_LIKE = /{(?:{+|$)/g;
const escapeOpenLike = ($$        ) => `{{'${$$}'}}`;

const trimTab = (raw        )         => {
	//Entities.test(raw);// 以后如果要完全剔除“\n”，则需要要先检查解码的正确性，防止“&l”“t;”连起来
	//return raw.replace(/\n\t*/g, '');
	return raw.replace(NT$1, '\n').replace(N, '');
};

const DELIMITERS_0 = '{{';
const DELIMITERS_1 = '}}';

class Mustache extends Array$1         {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Mustache'; }
	
	         #pre          = false;
	
	constructor (raw        , v_pre         , delimiters_0        , delimiters_1        ) {
		// Vue 会优先解析 <tag>，而且还看 tagName，然后才是 {{}}，这和流式解析矛盾，因此要求避免任何潜在的视觉歧义
		// 如果未来发现不会导致解析报错终止的歧义，则要更严格地，在解码前检查确保连“<”都不存在
		super();
		if ( v_pre ) {
			this.#pre = true;
			this[this.length] = unescape(trimTab(raw));
			return;
		}
		let index         = 0;
		for ( ; ; ) {
			
			const insStart         = raw.indexOf(delimiters_0, index);
			
			if ( insStart<0 ) {
				const data         = unescape(trimTab(raw.slice(index)));
				data.includes(delimiters_0) && throwSyntaxError(`对“${delimiters_0}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
				this[this.length] = data;
				break;
			}
			let data         = unescape(trimTab(raw.slice(index, insStart)));
			data.includes(delimiters_0) && throwSyntaxError(`对“${delimiters_0}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
			this[this.length] = data;
			
			const insEnd         = raw.indexOf(delimiters_1, insStart+2);
			insEnd<0 && throwSyntaxError(`template 块中存在未关闭的插值模板标记“${delimiters_0}”，虽然 Vue 会将其作为普通文字处理，但这种情况本身极有可能是误以为插值语法可以包含标签造成的`);
			index = insStart+2;
			index===insEnd && throwSyntaxError(`插值为空可能导致 Vue 尝试匹配更长的结果而造成错误`);
			data = unescape(raw.slice(index, insEnd));
			BAD_INS.test(data) && throwSyntaxError(`插值中存在 CR（后无 LF）、LS（U+2028）、PS（U+2029）会导致 Vue 无法按预期解析`);
			data.includes(delimiters_1) && throwSyntaxError(`对“${delimiters_1}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
			this[this.length] = data;
			index = insEnd+2;
		}
		return this;
	}
	
	toExpression (              )         {
		const expression           = [];
		let expression_length = 0;
		let isTemplate          = true;
		let index = 0;
		const { length } = this;
		do {
			const each = this[index++];
			each && ( expression[expression_length++] = isTemplate ? StringLiteral(each) : `(${each})` );
			isTemplate = !isTemplate;
		}
		while ( index!==length )
		return expression.join('+');
	}
	
	toData (              )         {
		if ( this.#pre ) { return this[0]; }
		let data         = '';
		let isTemplate          = true;
		let index = 0;
		const { length } = this;
		do {
			const each = this[index++];
			if ( isTemplate ) {
				data += each.replace(OPEN_LIKE, escapeOpenLike);
				isTemplate = false;
			}
			else {
				data.includes('}}') && throwSyntaxError(`插值中不能存在原生结束标记“}}”，因为可能出现“{{ {'}}':{ }} }}”的情况，没有简单的方式进行统一转义`);
				data += `{{${each && each[each.length - 1]==='}' ? each+' ' : each}}}`;
				isTemplate = true;
			}
		}
		while ( index!==length )
		return data;
	}
	
}

const CSS$1 = (css        ) => new Sheet(css).cssText;

const TRIM = /^\s*\(?|\)?\s*$/g;
const void_elements = RegExp$1(VOID_ELEMENTS, '');
const foreign_elements = RegExp$1(FOREIGN_ELEMENTS, '');
const TEXTAREA_END_TAG = newRegExp('i')`</textarea${TAG_EMIT_CHAR}`;
const STYLE_END_TAG$1 = newRegExp('i')`</style${TAG_EMIT_CHAR}`;
//const TITLE_END_TAG = newRegExp('i')`</title${TAG_EMIT_CHAR}`;
const TEXTAREA = /^textarea$/i;
const TNS = /^[\t\n\f\r ]+$/;
const SOF_TNS_LT = /^[\t\n\f\r ]+</;
const GT_TNS_EOF = />[\t\n\f\r ]+$/;
const NATIVE_D = /\.(?:native|\d+)(?:$|\.)/;
const PROP_SYNC = /\.(?:prop|sync)(?:$|\.)/;
const BIND_PROP_SYNC = /^:.*?\.(?:prop|sync)(?:$|\.)/s;
const V_MODEL_ = /^v-model(?::|(?=\.)(?!(?:\.(?:lazy|number|trim))+$))/;
const STARTS_WITH_LOWERCASE_AND_NOT = /^(?:[abd-z]|(?!component$))/;
const ON_UPPER_CASE_ONCE = /[A-Z]|^[^.]*(?:capture|once|passive)(?:\.|$)/;
const ATTR_ON = /^:?on/i;
const ATTR_ = /^:?_/;
const HTML5 = `
	body
	blockquote
	main header footer
	article section nav aside
	h1 h2 h3 h4 h5 h6
	p
	div
	span
`.match(/\S+/g) ;
const HTML_5 = newRegExp('i')`^${groupify(HTML5)}$`;
const SVG_MathML = newRegExp('i')`^${groupify(`
	annotation-xml
	color-profile
	font-face
	font-face-src
	font-face-uri
	font-face-format
	font-face-name
	missing-glyph
`.match(/\S+/g) )}$`;
const NON_HTML = /[^\dA-Za-z]/;
const STARTS_WITH_UPPERCASE = /^(?![A-Za-z])/;

const xSlot = (attributes            ) => {
	if ( 'v-slot' in attributes ) { return false; }
	for ( const name in attributes ) { if ( name[0]==='#' ) { return false; } }
	return true;
};

const checkNameBeing = (xName        , attributes            , is         )       => {
	if ( 'v-html' in attributes && ( xName==='xmp' || xName==='plaintext' || xName==='listing' ) ) {
		throw SyntaxError$1(is
			? `请避免 is 已废弃的 xmp、plaintext 或 listing 元素并在其上使用 v-html，它的实际行为（可能）是 v-text`
			: `请避免在已废弃的 xmp、plaintext 或 listing 标签上使用 v-html，它的实际行为（可能）是 v-text`
		);
	}
	{
		if ( compatible_template || compatible_render ) {
				if ( !foreign_elements.test(xName) && FOREIGN_ELEMENTS.test(xName) ) {
					compatible_template = false;
					compatible_render = false;
					//throw SyntaxError(is ? `通过 is 属性，也无法避免 SVG 命名空间中的 foreign 元素的大写变种“${xName}”，不被 Vue 2 作为组件对待` : `SVG 命名空间中的 foreign 标签的大写变种“${xName}”，同样不被 Vue 2 作为组件对待`);
				}
		}
	}
};

let html         = '';
let index         = 0;

let partial                 = null;
let partial_with_tagName         = '';

let delimiters_0         = '';
let delimiters_1         = '';

let compatible_template          = true;
let compatible_render          = true;

let shadow_name         = '';
let shadow_hasNames          = false;
const shadow_names = new Set$1        ();
const SHADOW = /^#([a-z]\w*)(?:(\.)([a-z]\w*))?#$/i;
const Shadow = ($name_names$        ) => {
	const { 1: name, 2: hasNames = '', 3: names = '' } = SHADOW.exec($name_names$) || throwError(`${$name_names$} 格式不符合预期`);
	if ( shadow_name ) {
		if ( name!==shadow_name ) { throw Error$1(`不支持多路径 shadow，请使用子命名区分`); }
		( shadow_hasNames = !!hasNames ) && shadow_names.add(names);
	}
	else {
		shadow_name = name;
		if ( !hasNames===shadow_hasNames ) { throw Error$1(`不能既访问子命名 shadow，又访问简单 shadow`); }
		if ( shadow_hasNames && shadow_names.size===shadow_names.add(names).size ) { throw Error$1(`出现了重复的 shadow“${$name_names$}”`); }
	}
	if ( compatible_render || compatible_template ) {
		compatible_render = false;
		compatible_template = false;
	}
	return name + hasNames + names;
};

const parseAppend = (parentNode_XName        , parentNode                   , V_PRE         , FOREIGN         , V_FOR         )       => {
	for ( ; ; ) {
		const tag = Tag(html, index, FOREIGN, !V_PRE);
		const { type } = tag;
		if ( type===EOF ) {
			if ( parentNode_XName ) { throw SyntaxError$1(`template 块中存在未关闭的 ${parentNode_XName} 标签`); }
			index = tag.end;
			break;
		}
		if ( type===TEXT ) {
			const data         = new Mustache(tag.raw , V_PRE, delimiters_0, delimiters_1).toData();
			data && parentNode.appendChild(new Text(data));
			index = tag.end;
			continue;
		}
		if ( type===COMMENT ) {
			index = tag.end;
			continue;
		}
		const XName = tag.xName ;
		if ( type===ELEMENT_END ) {
			if ( XName!==parentNode_XName ) {
				throw SyntaxError$1(parentNode_XName
					? `在 ${parentNode_XName} 配对的结束标签出现前，出现了预期外的结束标签“</${XName}>”`
					: `template 块中凭空出现了“</${XName}>”结束标签`
				);
			}
			index = tag.end;
			break;
		}
		let xName         = XName;
		let __class__                    ;
		if ( partial ) {
			let alias = XName;
			let addOn = '';
			///if ( XName.includes('.') ) {
			///	const _ = XName.split('.');
			///	alias = _[0];
			///	addOn = ' ' + _.slice(1).join(' ');
			///}
			/* AliasName: */
			if ( isAliasName(alias) ) {
				if ( alias in partial ) {
					const _ = partial[alias];
					xName = _.tagName==='_' ? alias + '_' : _.tagName;
					__class__ = _.class + addOn;
				}
				else if ( partial_with_tagName && NameIs__Key__(alias) ) {
					xName = partial_with_tagName==='_' ? alias + '_' : partial_with_tagName;
					__class__ = `__${alias}__` + addOn;
				}
			}
		}
		const notComponent = STARTS_WITH_LOWERCASE_AND_NOT.test(xName);
		let afterColon = xName;
		if ( notComponent ) {
			const index = xName.indexOf(':');
			if ( index>0 ) {
				if ( xName.lastIndexOf(':')!==index ) { throw Error$1(`“${xName}”中含有多个“:”，并不是一个合格的标签名`); }
				if ( NON_PCENChar.test(xName.slice(0, index)) ) { throw Error$1(`“${xName}”的命名空间中含有不符合限定的字符，并不是一个合格的标签名`); }
				afterColon = xName.slice(index + 1);
				if ( STARTS_WITH_UPPERCASE.test(afterColon) ) { throw Error$1(`“${xName}”的后半部分没有以字母开头，并不是一个合格的原生标签或自定义元素名`); }
				if ( afterColon.includes('-') ) {
					if ( NON_PCENChar.test(afterColon) ) { throw Error$1(`“${xName}”的后半部分中含有不符合限定的字符，并不是一个合格的自定义元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				}
				else {
					if ( NON_HTML.test(afterColon) ) { throw Error$1(`HTML 原生标签中不会包含“${xName}”的后半部分这种含有特殊字符的元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				}
				
			}
			else {
				if ( xName.includes('-') ) {
					if ( NON_PCENChar.test(xName) ) { throw Error$1(`“${xName}”中含有不符合限定的字符，并不是一个合格的自定义元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				}
				else {
					if ( NON_HTML.test(xName) ) { throw Error$1(`HTML 原生标签中不会包含“${xName}”这种含有特殊字符的元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				}
			}
		}
		if ( xName==='script' ) { throw SyntaxError$1(`Vue 不允许 template 中存在 script 标签`); }
		const attributes             = tag.attributes ;
		const v_pre          = V_PRE || 'v-pre' in attributes;
		const v_for          = v_pre ? false : V_FOR || 'v-for' in attributes;
		let shadowRoot                = null;
		if ( v_pre ) {
			if ( !V_PRE && xName==='template'
				&& !( 'v-if' in attributes )
				&& !('v-else-if' in attributes)
				&& !('v-else' in attributes)
				&& !( 'v-for' in attributes )
				&& xSlot(attributes)
			) {
				throw SyntaxError$1(`应当避免没有 v-if/else-if/else/for/slot 指令的 template 元素，这在 Vue 2 与 3 中存在歧义，且没有必要（真需要时，考虑使用“<component is="template">”，或在其上级标签上设置 v-pre）`);
			}
		}
		else {
			{
				if ( 'v-is' in attributes ) { throw SyntaxError$1(`v-is 是 Vue 3 新增的内置指令，在单文件组件模板中不可能需要被用到；在 Vue 2 中也请避开使用`); }
			}
			if ( xName==='component' ) {
				if ( ':is' in attributes ) ;
				else if ( 'is' in attributes ) { checkNameBeing(attributes.is , attributes, true); }
				else { throw SyntaxError$1(`component 组件不能缺少 is 属性`); }
			}
			else {
				if ( !notComponent && ( ':is' in attributes || 'is' in attributes ) ) {
					throw Error$1(xName==='slot'
						? `is 在 Vue 2 的 slot 组件上是无效的${':is' in attributes ? '，即便使用 v-bind: 结果也是一样' : ''}；在 Vue 3 中，在 Vue 3 中，由于存在与 Vue 2 混淆的可能，请避免使用`
						: BUILT_IN.has(xName)
							? `is 属性不应当出现在 ${xName} 上`
							: `Vue 2 单文件组件模板中不可能必须在非 component 上设置 is 属性；在 Vue 3 中，由于存在与 Vue 2 混淆的可能，请避免使用 is 作为其它组件的参数（如果“${xName}”不是组件，请避免使用大写字母开头）`
					);
				}
				checkNameBeing(xName, attributes, false);
				//if ( 3 ) {
				//	if ( STYLE_BY_COMPONENT_IS && xName==='style' ) {
				//		if ( ':is' in attributes || 'is' in attributes ) { throw SyntaxError(STYLE_BY_COMPONENT_IS.is); }
				//	}
				//	checkNameBeing(xName, attributes, false);
				//}
				//if ( 2 ) {
				//	if ( ':is' in attributes ) {
				//		if ( STYLE_BY_COMPONENT_IS && xName==='style' ) { throw SyntaxError(STYLE_BY_COMPONENT_IS.is); }
				//	}
				//	else if ( 'is' in attributes ) {
				//		if ( STYLE_BY_COMPONENT_IS && xName==='style' ) { throw SyntaxError(STYLE_BY_COMPONENT_IS.is); }
				//		checkNameBeing(attributes.is!, attributes, true);
				//	}
				//	else { checkNameBeing(xName, attributes, false); }
				//}
			}
			if ( 'inline-template' in attributes ) { throw Error$1(`jVue 不支持包含 inline-template 的模板编译，且该功能在 Vue 3 中已经被废弃`); }
			if ( 'v-cloak' in attributes ) { throw SyntaxError$1(`单文件组件模板中不可能用到 v-cloak 指令`); }
			if ( 'v-for' in attributes ) {
				const value = attributes['v-for'] ;
				const index = value.search(forAliasRE);
				if ( index<0 ) { throw SyntaxError$1(`“v-for="${value}"”的格式有误`); }
				Params(value.slice(0, index).replace(TRIM, ''), 1, 3, `“v-for="${value}"”中的“of/in”前`);
			}
			{
				if ( v_for && 'ref' in attributes ) {
					throw SyntaxError$1(`Vue 3 不再支持在有 v-for 的标签及其内部标签上设置 ref，请用 :ref 模式代替`);
				}
			}
			if ( xName==='slot' ) {
				if ( BAD_SLOT_NAME.test(attributes['name'] || 'default') ) { throw ReferenceError$1(`“$”或“_”开头的 slot name 可能无法按预期工作`); }
				for ( let name in attributes ) {
					const bind = name[0]===':';
					if ( bind ) {
						{
							if ( PROP_SYNC.test(name) ) { throw SyntaxError$1(`Vue 3 中 v-bind: 已不再支持 .prop、.sync 修饰符`); }
						}
						name = name.slice(1);
					}
					else if ( name.startsWith('v-') && !SLOT_DIRECTIVE.test(name) || name[0]==='@' || name[0]==='#' ) {
						throw SyntaxError$1(`slot 组件上除 v-pre、v-once、v-for、v-if、v-else-if、v-else 和 v-bind 以外的指令都会被忽略，如果想要绑定 ${name} 为作用域属性，请使用 v-bind:${name}`);
					}
					if ( name===BAD_SCOPE ) { throw ReferenceError$1(`使用“${BAD_SCOPE}”作为 scope 无法按预期工作`); }
					if ( name==='key' || name==='ref' ) { throw SyntaxError$1(`${name}（key、ref）在 slot 组件上是无效的${bind ? '，即便使用 v-bind: 结果也是一样' : ''}`); }
				}
			}
			else {
				if ( compatible_template ) {
					if (
						xName==='BaseTransition' || xName==='Suspense' || xName==='Teleport' || xName==='KeepAlive' || xName==='Transition' || xName==='TransitionGroup'
					) { compatible_template = false; }
				}
				if ( compatible_render ) {
					if (
						///xName==='KeepAlive' || xName==='Transition' || xName==='TransitionGroup' ||
						xName==='base-transition' || xName==='suspense' || xName==='teleport' ||
						xName==='template' && ( 'key' in attributes || ':key' in attributes )
					) { compatible_render = false; }
				}
				if ( 'v-if' in attributes || 'v-else-if' in attributes || 'v-else' in attributes ) {
					if ( 'v-for' in attributes ) { throw Error$1(`v-for 和 v-if 等的优先级在 Vue 2 和 3 中不同，请避免同时使用`); }///compatible_template = false;
				}
				else if ( xName==='template' && !( 'v-for' in attributes ) && xSlot(attributes) ) {
					throw SyntaxError$1(`应当避免没有 v-if/else-if/else/for/slot 指令的 template 元素，这在 Vue 2 与 3 中存在歧义，且没有必要（真需要时，考虑使用“<component is="template">”，或在其上级标签上设置 v-pre）`);
				}
				{
					if ( 'slot' in attributes || ':slot' in attributes ) { throw SyntaxError$1(`slot 已被 v-slot 取代（如果只是碰巧重名，请使用 :slot.camel）`); }
					if ( 'slot-scope' in attributes ) { throw SyntaxError$1(`slot-scope 已被 v-slot 取代（如果只是碰巧重名，请使用 :slot-scope）`); }
					if ( 'scope' in attributes && xName==='template' ) { throw SyntaxError$1(`template scope 已被 v-slot 取代`); }
				}
				let already = '';
				for ( const name in attributes ) {
					if ( name[0]==='@' ) {
						if ( name[1]==='_' ) { throw ReferenceError$1(`“_”开头的 listener 可能无法按预期工作`); }
						{
							if ( NATIVE_D.test(name) ) { throw Error$1(`Vue 3 中 v-on 已不再支持 .native、键位数字修饰符`); }
							if ( ON_UPPER_CASE_ONCE.test('on' + name.slice(name[0]==='@' ? 1 : 5)) ) { throw Error$1(`Vue 3 中事件名不应出现大写，且不应以 capture、once、passive 结尾以免与 .capture、.once、.passive 修饰符编译的结果混淆`); }
						}
						if ( compatible_template && NON_ASCII_SIMPLE_PATH.test(attributes[name] ) ) { compatible_template = false; }
					}
					else {
						if ( ATTR_.test(name) ) { throw ReferenceError$1(`“_”开头的 attr 可能无法按预期工作`); }
						{
							if ( ATTR_ON.test(name) ) { throw ReferenceError$1(`Vue 3 中合并了 listeners 和 attrs 的通道，因此 attrs 的内容不能以 on 起始`); }
							if ( BIND_PROP_SYNC.test(name) ) { throw SyntaxError$1(`Vue 3 中 v-bind: 已不再支持 .prop、.sync 修饰符`); }
						}
						{
							if ( compatible_render && V_MODEL_.test(name) ) { compatible_render = false; }
						}
						if ( slotRE.test(name) ) {
							if ( already ) { throw SyntaxError$1(`不能同时存在多个插槽指令“${already}”和“${name}”`); }
							already = name;
							if ( name[0]==='#' && name[name.length - 1]==='#' && name.length>1 ) {
								if ( BUILT_IN.has(xName) ) { throw Error$1(`jVue 借用了插槽缩写语法表示 Shadow DOM，并以“#”结尾加以区分，该功能不能用在 ${xName} 标签上`); }
								if ( !notComponent ) { throw Error$1(`jVue 借用了插槽缩写语法表示 Shadow DOM，并以“#”结尾加以区分，该功能不能用在组件标签${xName==='component' ? ` component 上` : `上（如果 ${xName} 不是组件，请避免使用大写字母开头）`}`); }
								if ( xName.includes('-') ? SVG_MathML.test(xName) : !HTML_5.test(xName) ) { throw Error$1(`HTML 原生标签中，只有 ${HTML5.join('、')} 支持 Shadow DOM，其中不包括“${xName}”`); }
								if ( attributes[name]!==EMPTY ) { throw Error$1(`jVue 借用了插槽缩写语法表示 Shadow DOM，并以“#”结尾加以区分，该功能不支持属性值`); }
								shadowRoot = Shadow(name);
							}
							else {
								const value = attributes[name];
								if ( xName==='template' ) {
									if ( !( 'localName' in parentNode ) ) { throw Error$1(`插槽所在的 template 必须位于组件标签内`); }
									if ( STARTS_WITH_LOWERCASE_AND_NOT.test(parentNode.localName) ) {
										throw Error$1(`插槽所在的 template 必须位于组件标签的根层` + ( BUILT_IN.has(parentNode.localName) ? `` : `（如果 ${parentNode.localName} 是组件，则请避免使用小写字母开头）` ));
									}
								}
								else {
									if ( notComponent ) { throw Error$1(`插槽只能出现在 template 或组件上` + ( BUILT_IN.has(xName) ? `` : `（如果 ${xName} 是组件，则请避免使用小写字母开头）`)); }
									if ( name!=='v-slot' && name!=='#default' ) { throw SyntaxError$1(`具名插槽只能出现在 template 上`); }
									if ( value===EMPTY ) { throw Error$1(`无值的默认插槽 v-slot 指令没有必要显式地写在组件上`); }
								}
								if ( value===emptySlotScopeToken ) { throw ReferenceError$1(`“${emptySlotScopeToken}”是保留字，编译结果相当于留空`); }
								value===EMPTY ||
								Params(value, 0, 1, `${name}="${value}"中`);
								if ( BAD_V_SLOT_NAME.test(name) ) { throw ReferenceError$1(`“$”或“_”开头的 slot name 可能无法按预期工作`); }
							}
						}
					}
				}
				if ( shadowRoot ) { delete attributes[shadowRoot]; }
				if ( attributes['key']===BAD_KEY ) { throw ReferenceError$1(`使用“${BAD_KEY}”作为 key 无法按预期工作`); }
				if ( attributes['ref']===BAD_REF ) { throw ReferenceError$1(`使用“${BAD_REF}”作为 ref 无法按预期工作`); }
			}
		}
		if ( compatible_template && xName==='style' && !STYLE_BY_COMPONENT_IS ) { compatible_template = false; }
		const element          = parentNode.appendChild(new Element(
			 xName,
			attributes,
			__class__,
			shadowRoot ? { along: shadowRoot, aside: void_elements.test(xName) || 'localName' in parentNode } : null,
		));
		index = tag.end;
		if ( type===ELEMENT_SELF_CLOSING ) { continue; }
		const foreign          = FOREIGN || xName==='svg' || xName==='math';
		if ( void_elements.test(xName) ) { throw SyntaxError$1(`template 文件中如果出现 HTML void 元素（小写；即便已经过时、废弃或是非标准），宜添加自闭合斜线以避免歧义`); }
		if ( html.startsWith('</', index) ) {
			if ( LISTING.test(xName) ) { throw SyntaxError$1(`已过时的 ${XName} 标签内容处理方式不定，除非自闭合或内容为空，否则${XName==='listing' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”或“<${xName} v-text="..." />”）`); }
			if ( PLAINTEXT.test(xName) || XMP.test(xName) || XMP.test(XName) && ( xName = XName ) ) {
				throw SyntaxError$1(
					`已${PLAINTEXT.test(xName) ? '过时' : '废弃'}的 ${xName} 标签${xName==='plaintext' || xName==='xmp' ? '' : '（不论大小写）'}被开放式使用时，需将内容完全按原状对待，` +
					`jVue 虽可以通过 v-text 模拟这一行为、避免被 Vue 按标签嵌套模式解析，` +
					`但由于缺乏相关约定，不确定如何处理插值和空白，所以无法处理。` +
					( v_pre ? `v-pre 时虽然不再存在插值，但却也无法使用 v-text。` : `（真需要时，考虑使用“<component is="${xName}">”或“<${xName} v-text="..." />”）` )
				);
			}
			if ( RAW_TEXT_ELEMENTS.test(XName)!==RAW_TEXT_ELEMENTS.test(xName) ) { throw SyntaxError$1(`由于存在内容解析歧义，开放式标签名和其简写不能一个是原始文本元素，而另一个不是`); }// xmp plaintext listing
			if (
				(
					TEXTAREA.test(XName)// || XName==='title'
				)!==(
					TEXTAREA.test(xName)// || xName==='title'
				)
			) { throw SyntaxError$1(`由于存在内容解析歧义，开放式标签名和其简写不能一个是可转义原始文本元素，而另一个不是`); }
			if ( RAW_TEXT_ELEMENTS.test(xName) && xName!=='style' || TEXTAREA.test(xName) && xName!=='textarea' ) {
				throw SyntaxError$1(
					`Vue 2 不会将 textarea、style 或 script 的任何大写变种理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，` +
					`jVue 虽可对其进行转写（比如“<${xName} v-text="..." />”或“<component is="${xName}">”），` +
					`但由于缺乏约定（就连 Vue 2 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），` +
					`并不知道该往什么方向进行`
				);
			}
			if ( !v_pre && ( 'v-text' in attributes || 'v-html' in attributes ) ) { throw SyntaxError$1(`开放式标签，除非自身或外层节点有 v-pre 指令，否则不能再设置 v-text 或 v-html 指令`); }
			if ( xName==='iframe' || xName==='noscript' || xName==='noembed' || xName==='noframes' ) { throw Error$1(`在支持 Vue 运行的环境下，不应有用 ${xName} 标签来包含内容的需要，因此暂未开启兼容转写功能支持`); }
			// <pre>\n
			if (
				xName==='textarea' || xName==='style'// || xName==='title'
			) {
				let endTagStart         = html.slice(index).search(
					xName==='textarea' ? TEXTAREA_END_TAG :
						xName==='style' ? STYLE_END_TAG$1 :
							//xName==='title' ? TITLE_END_TAG :
							null         
				);
				if ( endTagStart<0 ) { throw SyntaxError$1(`template 块中存在未关闭的 ${XName} 标签`); }
				endTagStart += index;
				const inner = html.slice(index, endTagStart);
				if ( xName==='style' ) {
					if ( v_pre ) {
						const css = CSS$1(inner);
						css && element.appendChild(new RawText(css));
					}
					else {
						const expression         = new Mustache(inner, v_pre, delimiters_0, delimiters_1).toExpression();
						if ( expression ) { attributes['v-text'] = expression; }
					}
				}
				else {
					const mustache = new Mustache(inner, v_pre, delimiters_0, delimiters_1);
					if ( mustache.length!==1 && xName==='textarea' ) { throw Error$1(`有插值的 textarea 标签这种用例没有意义`); }
					if ( mustache[0] ) {
						v_pre
							? element.appendChild(new Text(( xName==='textarea' ? '\n' : '' ) + mustache[0]))
							: attributes['v-text'] = mustache.toExpression();
					}
				}
				const tag = Tag(html, index = endTagStart, foreign);
				if ( tag.xName!==XName ) { throw SyntaxError$1(`${XName} 的结束标记 ${html.slice(endTagStart, tag.end)} 不符合严谨性预期`); }
				index = tag.end;
				continue;
			}
		}
		parseAppend(XName, element, v_pre, foreign, v_for);// 不需要改循环实现，因为层数多了 Vue 本身也会爆栈。
	}
};

class Content extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content'; }
	
	constructor (inner        , _         ) {
		if ( !inner ) { return super()                   ; }
		if ( NON_SCALAR.test(inner) ) { throw Error$1(`HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
		if ( NONCHARACTER.test(inner) ) { throw Error$1(`HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER.test(inner) ) { throw Error$1(`HTML 字符流中禁止出现除 NUL 空（U+00）、TAB 水平制表（U+09）、LF 换行（U+0A）、FF 换页（U+0C）、CR 回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		delimiters_0 = _.delimiters_0;
		delimiters_1 = _.delimiters_1;
		partial = _.abbr ?? null;
		partial_with_tagName = partial?.['']?.tagName ?? '';
		html = inner;
		index = 0;
		compatible_template = true;
		compatible_render = true;
		super();
		try {
			parseAppend('', this, false, false, false);
			if ( shadow_name ) { _.shadow = shadow_hasNames ? [ shadow_name, ...shadow_names ].join('.') : shadow_name; }
		}
		catch (error) {
			error.message = `${error.message}：\n${Snippet(inner, index)}`;
			throw error;
		}
		finally {
			partial = null;
			html = '';
			shadow_name = '';
			shadow_names.clear();
		}
		if ( !compatible_template ) { this.#compatible_template = false; }
		if ( !compatible_render ) { this.#compatible_render = false; }
		this.firstChild instanceof Text && TNS.test(this.firstChild.data) && SOF_TNS_LT.test(inner) && this.shift();
		this.lastChild instanceof Text && TNS.test(this.lastChild.data) && GT_TNS_EOF.test(inner) && --this.length;
		return this;
	}
	
	         #compatible_template          = true;
	         #compatible_render          = true;
	
	get outerHTML () {
		const { length } = this;
		if ( length ) {
			let { outerHTML } = this[0] ;
			if ( outerHTML[0]==='#' ) { outerHTML = '&#35;' + outerHTML.slice(1); }
			let index = 1;
			while ( index!==length ) { outerHTML += this[index++] .outerHTML; }
			compatible_template = this.#compatible_template;
			compatible_render = this.#compatible_render;
			return outerHTML;
		}
		compatible_template = this.#compatible_template;
		compatible_render = this.#compatible_render;
		return '';
	}
	
	* beautify (               tab         = '\t')                                     {
		const { length } = this;
		let index = 0;
		while ( index!==length ) { yield * this[index++] .beautify(tab); }
	}
	
}

const TEMPLATE_END_TAG = newRegExp('i')`</template${TAG_EMIT_CHAR}`;

/* AliasName: */const PARTIAL = newRegExp('u')`^
	${ASCII_WHITESPACE}*(?:
		${AliasName}${ASCII_WHITESPACE}*
		=${ASCII_WHITESPACE}*
			${localOrComponentNameWithoutDot}
			(?:(?:\.${className})*|\.?)
		${ASCII_WHITESPACE}*;
	${ASCII_WHITESPACE}*)*
$`;
/* AliasName: */const PARTIAL_WITH_TAG = newRegExp('u')`^
	${ASCII_WHITESPACE}*(?:
		${AliasName}${ASCII_WHITESPACE}*;
	${ASCII_WHITESPACE}*)*
$`;

const HTML = newRegExp('i')`^(?:HTML|${ASCII_WHITESPACE}*text/html${ASCII_WHITESPACE}*)$`;

let compatible_render$1          = true;

const isVue2Compatible = (content         ) => {
	let index = 0;
	for ( const { length } = content; index!==length; ) {
		const child = content[index++];
		if ( !( child instanceof Element ) ) {
			return false;//throw Error(`从 Vue 2 开始，组件的 template 的根节点必须是元素节点`);
		}
		if ( child.localName==='template' || child.localName==='slot' ) {
			return false;//throw Error(`从 Vue 2 开始，组件的 template 的根节点必须是元素节点，且不能为 template 或 slot 元素`);
		}
	}
	if ( content.length!==1 ) {
		if ( !content.length ) {
			return false;//throw Error(`从 Vue 2 开始，组件的 template 中不得为空`);
		}
		{///
			if ( !( 'v-if' in ( content[0]            ).attributes ) ) {
				return false;//throw Error(`Vue 2 只允许组件的 template 存在一个根节点`);
			}
			const lastIndex = content.length - 1;
			let index = 1;
			while ( index!==lastIndex ) {
				if ( !( 'v-else-if' in ( content[index++]            ).attributes ) ) {
					return false;//throw Error(`Vue 2 只允许组件的 template 存在一个根节点`);
				}
			}
			const { attributes } = content[lastIndex]           ;
			if ( !( 'v-else-if' in attributes ) && !( 'v-else' in attributes ) ) {
				return false;//throw Error(`Vue 2 只允许组件的 template 存在一个根节点`);
			}
		}
	}
	return true;
};

class Template extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.Template'; }
	
	constructor (attributes            , inner                    ) {
		
		if ( inner!==undefined$1 && attributes.lang && !HTML.test(attributes.lang) ) {
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError$1(`.vue 文件的 template 块（非 html 状态下）中，存在标签语法标记，这可能模糊正常结束判定的结果`); }
			super('template', attributes, true, inner, TEMPLATE_END_TAG);
		}
		else {
			super('template', attributes, true, inner, null);
		}
		
		if ( 'functional' in attributes ) {
			throw Error$1(`jVue 暂未支持编译 functional template，因为无法设想这种实际场景，从而也无法进行相应的功能设计，且该功能在 Vue 3 中已经被废弃`);
			//if ( attributes.functional!==EMPTY ) { throw SyntaxError(`template 功能块元素的 functional 属性必须是空属性`); }
			//_this.functional = true;
		}
		
		const _this          = _.new(this);
		
		if ( '.keys' in attributes ) {
			const _keys = attributes['.keys'];
			if ( _keys===EMPTY ) { throw SyntaxError$1(`template 功能块的 .keys 属性必须具有值`); }
			const keys = _keys.match(KEYS);
			if ( !keys ) { throw SyntaxError$1(`template 功能块的 .keys 属性值未匹配到可用的内容`); }
			_this.keys = keys;
		}
		
		if ( '.abbr' in attributes ) {
			const literal = attributes['.abbr'];
			if ( literal===EMPTY ) { throw SyntaxError$1(`template 功能块的“.abbr”属性必须具有值`); }
			if ( !PARTIAL.test(literal) ) { throw SyntaxError$1(`template 功能块的“.abbr”属性语法错误：\n${literal}`); }
			const abbr = _this.abbr = create$1(NULL)           ;
			const pairs = literal.split(';');
			let index = pairs.length;
			while ( index ) {
				const tokens = pairs[--index].match(TOKENS);
				if ( tokens ) {
					const xName         = tokens[0];
					if ( xName in abbr ) { throw SyntaxError$1(`template 功能块的“.abbr”属性值中存在重复的条目“${xName}”`); }
					const localName_class = tokens[1].split('.');
					abbr[xName] = {
						tagName: localName_class.shift() ,
						class: localName_class.length
							? localName_class.join(' ') || NameAs__Key__(xName)
							: '',
					};
				}
			}
		}
		for ( const name in attributes ) {
			if ( name.startsWith('.abbr:') ) {
				const tagName = name.slice(6);
				if ( tagName!=='_' && !isLocalOrComponentNameDotable(tagName) ) { throw SyntaxError$1(`template 功能块的“${name}”属性的标签名部分不符合要求`); }
				const abbr = _this.abbr ?? ( _this.abbr = create$1(NULL)            );
				const literal = attributes[name];
				if ( literal===EMPTY ) {
					if ( '' in abbr ) { throw SyntaxError$1(`template 功能块的无值“.abbr:*”属性只能有一个`); }
					abbr[''] = { tagName };
				}
				else {
					if ( !PARTIAL_WITH_TAG.test(literal) ) { throw SyntaxError$1(`template 功能块的“${name}”属性语法错误：\n${literal}`); }
					const pairs = literal.split(';');
					let index = pairs.length;
					while ( index ) {
						const tokens = pairs[--index].match(TOKENS);
						if ( tokens ) {
							const xName         = tokens[0];
							if ( xName in abbr ) { throw SyntaxError$1(`template 功能块的“${name}”属性值中存在重复的条目“${xName}”`); }
							abbr[xName] = { tagName, class: NameAs__Key__(xName) };
						}
					}
				}
			}
		}
		
		let notYet = true;
		for ( const name in attributes ) {
			if ( name.startsWith('.delimiters:') ) {
				if ( !notYet ) { throw SyntaxError$1(`template 功能块只能存在一个 .delimiters:* 格式的属性`); }
				notYet = false;
				const delimiters = attributes[name];
				if ( !delimiters ) { throw SyntaxError$1(`template 功能块的 ${name} 属性值不得为空`); }
				const { 0: delimiters_0, 1: delimiters_1, length } = delimiters.split(name.slice(12));
				if ( !delimiters_0 || !delimiters_1 || length!==2 ) { throw SyntaxError$1(`template 功能块的 ${name}="${attributes[name]}" 属性存在语法错误`); }
				_this.delimiters_0 = delimiters_0;
				_this.delimiters_1 = delimiters_1;
			}
		}
		if ( notYet ) {
			_this.delimiters_0 = DELIMITERS_0;
			_this.delimiters_1 = DELIMITERS_1;
		}
		
		return this;
		
	}
	
	get content ()          {
		const _this          = _(this);
		let inner                     = _this.innerHTML;
		if ( inner===undefined$1 ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error$1(`自闭合的 template 功能块元素必须自行加载 src 属性所要求的 inner 值`); }
			if ( this.lang && !HTML.test(this.lang) ) { throw Error$1(`template 功能块元素如果设置了非 html 的 lang 属性值，那么必须自行提供转译后的 innerHTML`); }
			_this.cache = inner;
		}
		if ( _this.content && _this.cache===inner ) { return _this.content; }
		const content = new Content(inner, _this);
		_this.content = content;
		_this.cache = inner;
		return content;
	}
	
	get innerHTML ()         {
		const { content } = this;
		compatible_render$1 = compatible_render && isVue2Compatible(content);
		return content.outerHTML;
	}
	set innerHTML (value        ) {
		if ( typeof ( value            )!=='string' ) { throw TypeError$1(`innerHTML 只能被赋值字符串`); }
		_(this).innerHTML = value;
	}
	
}
freeze(Template.prototype);

class CustomBlock extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.CustomBlock'; }
	
	constructor (blockName        , attributes            , inner                    ) {
		if ( inner===undefined$1 ) {
			return super(blockName, attributes, false, inner, null)                   ;
		}
		else {
			if ( ESCAPABLE_RAW_TEXT_ELEMENTS.test(blockName) ) { throw SyntaxError$1(`.vue 文件中的自定义块尚没有明确的语义约定，请避免使用 textarea / title 标签及其大小写变种`); }
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError$1(`.vue 文件的 ${blockName} 自定义块中，存在标签语法标记，这可能模糊正常结束判定的结果`); }
			return super(blockName, attributes, false, inner, new RegExp$1(`^</${blockName}${TAG_EMIT_CHAR}`, 'i'))                   ;
		}
	}
	
}
freeze(CustomBlock.prototype);

const SCRIPT_STYLE_TEMPLATE = /^(?:script|style|template)$/i;
const NON_EOL = /[^\n\r\u2028\u2029]+/g;
const NON_TAB$1 = /[^\t ]/g;
const parseComponent = (sfc     , vue        )       => {
	
	const eol = sfc.eol || '\n';
	const eol_0 = eol[0];
	const eol_length = eol.length;
	
	let index = 0;
	
	try {
		for ( const { length } = vue; index!==length; ) {
			
			if ( vue[index]===eol_0 ) {
				index += eol_length;
				continue;
			}
			
			const tag = Tag(vue, index);
			switch ( tag.type ) {
				case ELEMENT_START:
				case ELEMENT_SELF_CLOSING:
					index = tag.end;
					break;
				case COMMENT:
					index = tag.end;
					continue;
				case TEXT:
					throw SyntaxError$1(`.vue 文件中出现了未经标签包裹的“${tag.raw}”`);
				case ELEMENT_END:
					throw SyntaxError$1(`.vue 文件中凭空出现了“</${tag.xName}>”结束标签`);
			}
			
			const blockName         = tag.xName ;
			switch ( blockName ) {
				case 'script':
					if ( 'setup' in tag.attributes  ? sfc.scriptSetup : sfc.script ) { throw SyntaxError$1(`一个 .vue 文件中只能有一个 script${'setup' in tag.attributes  ? ' setup' : ''} 块`); }
					break;
				case 'template':
					if ( sfc.template ) { throw SyntaxError$1(`一个 .vue 文件中只能有一个 template 块`); }
					break;
				case 'style':
					break;
				default:
					if ( SCRIPT_STYLE_TEMPLATE.test(blockName) ) { throw SyntaxError$1(`.vue 文件顶层的非全小写 script / style / template 标签存在歧义，请避免使用`); }
					break;
			}
			
			let inner                    ;
			if ( tag.type===ELEMENT_START ) {
				if ( index===length ) { throw SyntaxError$1(`开始标签后缺少结束标签“</${blockName}>”`); }
				if ( vue[index]===eol_0 ) {
					const innerStart = index+eol_length;
					const endTagStart = vue.indexOf(`${eol}</${blockName}>`, index)+eol_length;
					if ( endTagStart<eol_length ) { throw SyntaxError$1(vue.includes(`</${blockName}>`, index) ? '开始标签后紧跟换行则启用多行模式，结束标签应在后续某行的行首' : `开始标签后缺少结束标签“</${blockName}>”`); }
					index = endTagStart+3+blockName.length;
					inner = endTagStart===innerStart || endTagStart-eol_length===innerStart ? '' : vue.slice(innerStart, endTagStart-eol_length);
					if ( blockName!=='style' ) {
						inner =
							checkNewline(vue.slice(0, innerStart)).replace(NON_EOL, '')+
							inner;
					}
				}
				else {
					const innerStart = index;
					index = vue.indexOf(eol_0, index);
					if ( index<0 ) { index = length; }
					if ( !vue.endsWith(`</${blockName}>`, index) ) { throw SyntaxError$1(`开始标签后不紧跟换行则启用单行块模式，该行应以对应的结束标签结尾`); }
					inner = vue.slice(innerStart, index-3-blockName.length);
					if ( blockName!=='style' ) {
						const previousLineEnd = vue.lastIndexOf(eol_0, innerStart);
						const lastLineStart = previousLineEnd<0 ? 0 : previousLineEnd+eol_length;
						inner =
							checkNewline(vue.slice(0, lastLineStart)).replace(NON_EOL, '')+
							checkNewline(vue.slice(lastLineStart, innerStart)).replace(NON_TAB$1, ' ')+
							inner;
					}
				}
			}
			
			if ( blockName==='template' ) { sfc.template = new Template(tag.attributes , inner); }
			else if ( blockName==='style' ) { sfc.styles[sfc.styles.length] = new Style(tag.attributes , inner); }
			else if ( blockName==='script' ) {
				if ( 'setup' in tag.attributes  ) {
					if ( 'src' in tag.attributes  ) { throw SyntaxError$1(`src 属性不能使用在 script setup 块上`); }
					if ( sfc.script && 'src' in sfc.script.attributes ) { throw SyntaxError$1(`src 属性不能使用在同时具有 script setup 块的 .vue 文件内的 script 块上`); }
					sfc.scriptSetup = new ScriptSetup(tag.attributes , inner);
				}
				else {
					if ( 'src' in tag.attributes  && sfc.scriptSetup ) { throw SyntaxError$1(`src 属性不能使用在同时具有 script setup 块的 .vue 文件内的 script 块上`); }
					sfc.script = new Script(tag.attributes , inner);
				}
			}
			else { sfc.customBlocks[sfc.customBlocks.length] = new CustomBlock(blockName, tag.attributes , inner); }
			
			if ( index!==length ) {
				if ( vue[index]===eol_0 ) { index += eol_length; }
				else if ( !vue.startsWith('<!', index) ) { throw SyntaxError$1(`顶级标签的结束标签后的同一行内不应有除注释以外的内容`); }
			}
			
		}
	}
	catch (error) {
		error.message = `${error.message}：\n${Snippet(vue, index)}`;
		throw error;
	}
	
};

const WeakSet$1 = WeakSet;

const byReversedStart = (a            , b            )         => b.start - a.start;

let shorthandValues                     ;
//const __Proto__ :String = Object('__proto__');
let _$        ;
let _vm         ;
let _this         ;
const visitors = Null({
	ObjectExpression ({ properties }                  )       {
		let index         = properties.length;
		while ( index ) {
			const property = properties[--index];
			if ( property.shorthand ) { shorthandValues.add(property.value); }
		}
	},
	ObjectPattern ({ properties }               )       {
		let index         = properties.length;
		while ( index ) {
			const property = properties[--index];
			if ( property.shorthand ) {
				let { value } = property;
				if ( value.type==='AssignmentPattern' ) { value = value.left; }
				//if ( value.name==='__proto__' ) { value.name = __Proto__; }
				shorthandValues.add(value);
			}
		}
	},
	VariablePattern (identifier            )       {// 赋值
		if ( identifier.name[0]==='_' ) {
			if ( !_$ ) { throw Error$1(`不要对实例下的下划线开头格式的私有属性（“${identifier.name}”）进行赋值！`); }
			--_$;
		}
	},
	Identifier (identifier            )       {// 引用
		if ( identifier.name==='_vm' ) {
			if ( _vm ) { throw Error$1(`不应出现对“_vm”的直接访问。`); }
			_vm = true;
		}
		else if ( identifier.name==='arguments' ) { throw Error$1(`“arguments”可能存在歧义，请避免使用。`); }
	},
	ThisExpression ()       {
		if ( _this ) { throw Error$1(`直接访问“this”可能导致难以预料的结果，最好避免。`); }
		_this = true;
	},
});

const parserOptions$1 = Null({
	ecmaVersion: 5            ,
	sourceType: 'module'         ,// use strict mode
	allowReserved: true         ,
	///preserveParens: true,
});
let ecma           = 5;
const MinifyOptionsBODY = () => Null({
	warnings: 'verbose',
	parse: Null({
		html5_comments: false,
	}         ),
	compress: Null({
		warnings: true,
		//collapse_vars: false,
		pure_getters: true,
		drop_debugger: false,
		typeofs: false,
		expression: true,
		keep_fargs: false,
		arguments: true,
		passes: 2,
		unsafe_arrows: true,
		unsafe_methods: true,
	}         ),
	output: Null({
		inline_script: false,
		beautify: false,
	}         ),
	safari10: true,
	ie8: false,
	ecma,
}         );
/*const MinifyOptionsFUNC = () => {
	const options = MinifyOptionsBODY();
	return Null({
		...options,
		compress: Null({
			...options.compress,
			//collapse_vars: false,
			defaults: false,
			arrows: true,
			pure_getters: false,
			keep_fargs: true,
			arguments: false,
			side_effects: true,//
			//keep_fnames: false,
		} as const),
		mangle: false,
		output: Null({
			inline_script: false,
			beautify: true,
			indent_level: 0,
			//preserve_annotations: true,//comments: () => true,
		} as const),
	} as const);
};*/
const MinifyBODY = (files        ) => {
	const { error, warnings, code } = minify(files, MinifyOptionsBODY());
	if ( error ) { throw error; }
	if ( warnings ) {
		const filtered = warnings.filter((warning        ) => !/^Dropping unused function argument \$event \[\d+:\d+,\d+]$/.test(warning));
		if ( filtered.length ) { throw Error$1(`Terser 压缩警告：\n${filtered.join('\n')}`); }
	}
	return code ;
};

const CONST_RETURN = /^(?:cons|le)t ({ [\w :,]+ }) = Vue\n(.*)$/s;

const with_this__return_ = 'with(this){return ';

const _$s = 'conslqikbveugdp'.split('').map($ => `_${$}`);// tmf
const _function____use_strict__return_ = {
	var: `(function(){"use strict";var _vm = this, ${_$s.map(_$ => `${_$} = _vm.${_$}`).join(', ')}; return `,
	let: `(function(){"use strict";let _vm = this, { ${_$s.join(', ')} } = _vm._self; return `,
	const: `(function(){"use strict";const _vm = this, { ${_$s.join(', ')} } = _vm._self; return `,
}         ;

let MODE                         ;
let BODY         ;

const NecessaryStringLiteral = (body        , name                       )         => {
	if ( !body.startsWith(with_this__return_) ) { throw Error$1(`jVue 内部错误：vue-template-compiler .compile 返回了与预期不符的内容格式`); }
	const func         = `${_function____use_strict__return_[MODE]}${body.slice(with_this__return_.length, -1)};});`;
	const AST = parse(func, parserOptions$1);
	const globals = findGlobals(AST);
	_$ = 1 + _$s.length;
	_vm = _this = false;
	shorthandValues = new WeakSet$1;
	simple(AST, visitors);
	let _vm_func         = '';
	let index         = 0;
	const identifiers = ( globals.nodes()                 ).sort(byReversedStart);
	let i = identifiers.length;
	while ( i ) {
		const identifier = identifiers[--i];
		let name         = identifier.name          ;
		const { start } = identifier;
		if ( start!==index ) { _vm_func += func.slice(index, start); }
		name = func.slice(start, index = identifier.end);
		if ( shorthandValues.has(identifier) ) {
			_vm_func += //identifier.name==='__proto__' ? '["__proto__"]:' :
				name + ':';
		}
		_vm_func += '_vm.' + name;
	}
	if ( index!==func.length ) { _vm_func += func.slice(index); }
	if ( BODY ) { _vm_func = MinifyBODY(_vm_func); }
	body = _vm_func.slice(_vm_func.indexOf(';') + 1, _vm_func.lastIndexOf('}'));
	return BODY
		? StringLiteral(body)
		: ecma===5 ? `function(){${body}}` : `{[${name}](){${body}}}[${name}]`;
};

const onError = (error             )        => { throw Error$1(`.vue template 官方编译未通过：\n       ${error.message}`); };
const isCustomElement = test.bind(/^(?![A-Z]|base-transition$|component$|keep-alive$|s(?:lot|uspense)$|te(?:mplate|leport)$)/);
const Render3 = (innerHTML        , mode                 , body         , shadow         )         => {
	const { code } = compile3[mode](innerHTML, {
		onError,
		isCustomElement,
		mode: 'function',
		prefixIdentifiers: true,
		cacheHandlers: true,
		hoistStatic: true,
	});
	const { 1: params, 2: rest } = CONST_RETURN.exec(code) ?? throwError(`jVue 内部错误：@dom/compiler-dom .compile 返回了与预期不符的内容格式`);
	let Render         = `"use strict";(${params})=>{${rest}};`;
	ecma = parserOptions$1.ecmaVersion = 2014;
	const globals = findGlobals(parse(Render, parserOptions$1));
	globals.size && throwError(`jVue 内部错误：@dom/compiler-dom .compile 返回的内容与预期不符（存在变量泄漏：“${globals.names().join('”“')}”）`);
	if ( body ) { Render = MinifyBODY(Render); }
	Render = Render.slice(13, -1);
	const index = Render.indexOf('=>');
	const left = Render.slice(0, index);
	const right = Render.slice(index + 2);
	return body
		? StringLiteral(left + ( right[0]==='{' ? right : `{return${right[0]==='(' ? '' : ' '}${right}}`) + (shadow ? `static shadow=${StringLiteral(shadow)}` : ''))
		: `class { constructor ${left} ${right[0]==='{' ? right : `{ return ${right}; }`} ${shadow ? `static shadow = ${StringLiteral(shadow)}; ` : ''}}`;
};

const Render2 = (innerHTML        , mode                         , body         )                                                                           => {
	const { errors, tips, render, staticRenderFns } = compile2[mode](innerHTML);
	if ( errors.length ) { throw Error$1(`.vue template 官方编译未通过：\n       ${errors.join('\n       ')}`); }
	if ( tips.length ) { throw Error$1(`.vue template 官方编译建议：\n       ${tips.join('\n       ')}`); }
	BODY = body;
	MODE = mode;
	ecma = parserOptions$1.ecmaVersion = mode==='var' ? 5 : 2014;
	return {
		render: NecessaryStringLiteral(render, `'render'`),
		staticRenderFns: staticRenderFns.map(NecessaryStringLiteral),
	};
};

const NULo = /^\x00[0-7]/;
const LF_CR_LS_PS = /[\n\r\u2028\u2029]/g;
const escapeCSS_LF_CR_LS_PS = ($0        )         => $0==='\n' ? '\\00000A' : $0==='\r' ? '\\00000D' : $0==='\u2028' ? '\\002028' : '\\002029';
const escapeHTML_LF_CR_LS_PS = ($0        )         => $0==='\n' ? '&#x0A;' : $0==='\r' ? '&#0D;' : $0==='\u2028' ? '&#x2028;' : '&#x2029;';
const VisibleStringLiteral = (id        )         => {
	const literal         = StringLiteral(id);
	return id[0]==='\x00' ? ( NULo.test(id) ? `'\\x00` : `'\\0` )+literal.slice(2) : literal;
};

const __KEY__ = newRegExp('i')`^__${KEYS}__$`;

function * From (tab        , mode                         , styles         , template                 , from               , eol        ) {
	
	if ( from===null ) {
		const { length } = styles;
		if ( length ) {
			const style = styles[0];
			if ( _(style).media!==undefined$1 ) { throw Error$1(`当前模式下，style 标签上的 media 属性无法被保留`); }
			yield `export ${mode} style = ${StringLiteral(style.innerCSS)};${eol}`;
			for ( const line of style.sheet.beautify(tab) ) {
				yield `//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}${eol}`;
			}
			yield eol;
			if ( length===1 ) {
				yield `export ${mode} styles = [ style ];`;
			}
			else {
				yield `export ${mode} styles = [ style,${eol}`;
				let index = 1;
				while ( index!==length ) {
					const style = styles[index++];
					if ( _(style).media!==undefined$1 ) { throw Error$1(`当前模式下，style 标签上的 media 属性无法被保留`); }
					yield `${tab}${StringLiteral(style.innerCSS)},${eol}`;
					for ( const line of style.sheet.beautify(tab) ) {
						yield `${tab}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}${eol}`;
					}
				}
				yield `];`;
			}
		}
		else {
			yield `export ${mode} styles = [ ];`;
		}
		yield eol;
		if ( template ) {
			yield eol;
			const { innerHTML } = template;
			const __ = compatible_template ? '' : '//';
			const { render, staticRenderFns } = Render2(innerHTML, mode, false);
			yield `${__}export ${mode} template = ${StringLiteral(innerHTML)};${eol}`;
			if ( mode!=='var' ) {
				yield `export ${mode} Render = ${Render3(innerHTML, mode, false, _(template).shadow)};${eol}`;/// (); import!
			}
			if ( compatible_render$1 ) {
				yield `export ${mode} render = ${render};${eol}`;
				yield `render._withStripped = true;${eol}`;
				yield staticRenderFns.length
					? `export ${mode} staticRenderFns = [${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}];${eol}`
					: `export ${mode} staticRenderFns = [ ];${eol}`;
			}
			for ( const line of template.content.beautify(tab) ) {
				yield `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`;
			}
		}
		yield eol;
		return;
	}
	
	const _from_ = VisibleStringLiteral(from);
	yield `export { Identifier, Scope, Style, remove, Component } from ${_from_};${eol}`;
	yield `import { Scope, Template, Render as _Render, StaticRenderFns } from ${_from_};${eol}${eol}`;
	
	const scopeKeys = template && _(template).keys;
	const scope = scopeKeys ? 'scopeObject' : 'scopeFunction';
	yield scopeKeys
		? `export ${mode} ${scope} = /*#__PURE__*/Scope('${scopeKeys.join(',')}')`
		: `export ${mode} ${scope} = /*#__PURE__*/Scope()`;
	
	const { length } = styles;
	if ( length ) {
		const checkScoped = scopeKeys ? RegExp$1(`^__${groupify(scopeKeys)}__$`) : __KEY__;
		let index = 0;
		while ( index!==length ) {
			const style = styles[index++];
			const { sheet } = style;
			const { allowGlobal, media } = _(style);
			allowGlobal || sheet.checkScoped(checkScoped);
			for ( const line of sheet.beautify(tab) ) {
				yield `${eol}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}`;
			}
			yield media===undefined$1
				? `${eol}.$(${StringLiteral(style.innerCSS)})`
				: `${eol}.$(${StringLiteral(style.innerCSS)}, ${StringLiteral(media)})`;
		}
	}
	
	yield `;${eol}`;
	
	if ( template ) {
		const { innerHTML } = template;
		const __ = compatible_template ? '' : '//';
		const { render, staticRenderFns } = Render2(innerHTML, mode, true);
		const lines = [];
		let lines_length = 0;
		for ( const line of template.content.beautify(tab) ) { lines[lines_length++] = `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`; }
		yield eol;
		let index = 0;
		while ( index!==lines_length ) { yield lines[index++]; }
		if ( mode!=='var' ) {
			yield `export ${mode} Render = /*#__PURE__*/_Render(${Render3(innerHTML, mode, true, _(template).shadow)}, ${scope});${eol}`;/// (); import or ~~runtime~~?
		}
		if ( compatible_render$1 ) {
			yield `export ${mode} render = /*#__PURE__*/_Render(${render}, ${scope});${eol}`;
			yield staticRenderFns.length
				? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}], ${scope});${eol}`
				: `export ${mode} staticRenderFns = [ ];${eol}`;
			yield eol;
		}
		index = 0;
		while ( index!==lines_length ) { yield lines[index++]; }
		yield `${__}export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, ${scope});${eol}`;
	}
	
}

const URIError$1 = URIError;

const rollupOptions = {
	onwarn (warning     )       {
		if ( typeof warning==='string' ) { throw Error$1(warning); }
		const { code } = warning;
		if ( code!=='UNUSED_EXTERNAL_IMPORT'/* && code!=='THIS_IS_UNDEFINED'*/ ) { throw warning; }
	},
	acornInjectPlugins,
	strictDeprecations: true,
	treeshake: false,
	context: 'this',
}         ;

const TRUE = Null({
	format: 'es',
	sourcemap: true,
}         );
const FALSE = Null({
	format: 'es',
	sourcemap: false,
}         );
const INLINE = Null({
	format: 'es',
	sourcemap: 'inline',
}         );
const one = async (sfc     , { 'var': x_var, 'j-vue': from, '?j-vue': x_from = from===null ? '?j-vue=' : '?j-vue', map = false, src, lang }   
	                               
	                  
	                        
	                         
	                                    
	                                                              
 )                                               => {
	if ( lang ) {
		const { script } = sfc;
		if ( script && script.lang ) { script.innerJS = await lang(script.lang, script.inner ); }
	}
	const main         = sfc.export('default', x_from)          ;
	let round         = 1;
	const bundle = await rollup(assign(create$1(NULL), rollupOptions, {
		acorn: Null({
			ecmaVersion: x_var==='var' ? 5 : 2014,
			allowReserved: true,
			sourceType: 'module',
			allowAwaitOutsideFunction: x_var!=='var',
			//preserveParens: true,
		}         ),
		input: '/'+'_'.repeat(main.length),
		external: (path        )          => path!==x_from,
		plugins: [
			Null({
				resolveId (path        )         {
					if ( round===1 || path===x_from ) { return path; }
					throw URIError$1(path);
				},
				async load ()                  {
					if ( round===1 ) {
						round = 2;
						return main;
					}
					if ( round===3 ) { throw Error$1('3'); }
					round = 3;
					const { template, styles } = sfc;
					if ( src ) {
						if ( template && template.src ) { template.inner = await src(template.src); }
						const { length } = styles;
						let index = 0;
						while ( index!==length ) {
							const style = styles[index++];
							if ( style.src ) { style.inner = await src(style.src); }
						}
					}
					if ( lang ) {
						if ( template && template.lang ) { template.innerHTML = await lang(template.lang, template.inner ); }
						const { length } = styles;
						let index = 0;
						while ( index!==length ) {
							const style = styles[index++];
							if ( style.lang ) { style.innerCSS = await lang(style.lang, style.inner ); }
						}
					}
					return sfc.export(x_var, from)          ;
				},
			})
		],
	}));
	const { output } = await bundle.generate(map==='inline' ? INLINE : map===true ? TRUE : FALSE);
	if ( output.length!==1 ) { throw Error$1(''+output.length); }
	const only = output[0];
	return map===true ? { code: only.code, map: only.map } : only.code;
};

const OPTIONS = { swappable: false, stripBOM: true, startsWithASCII: true, throwError: true }         ;
const VUE_EOL = EOL([ LF, CRLF, CR ], [ FF, LS, PS ], true);

const ES_EOL = /\r\n?|[\n\u2028\u2029]/g;

class SFC {
	
	get [Symbol.toStringTag] () { return 'SFC'; }
	
	bom               ;
	eol                               ;
	tab        ;
	
	constructor (vue                 ) {
		
		if ( isBuffer(vue) ) {
			try {
				const { BOM, string } = buffer2object(vue, OPTIONS);
				this.bom = BOM;
				vue = string;
			}
			catch (error) { throw Error$1(`无法解码 Buffer，请确认它是 UTF-8 或 UTF-16 编码的，并且不存在非 Unicode 标量值（U+D800〜U+DFFF）的代理对码点，或超出了 U+10FFFF）`); }
		}
		else if ( typeof vue==='string' ) {
			if ( NON_SCALAR.test(vue) ) { throw Error$1(`.vue 文件所基于的 HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
			this.bom = '';
		}
		else { throw TypeError$1(`new SFC(vue) 时参数只能是 string 或 Buffer`); }
		
		if ( NONCHARACTER.test(vue) ) { throw Error$1(`.vue 文件所基于的 HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER.test(vue) ) { throw Error$1(`.vue 文件所基于的 HTML 字符流中禁止出现除 NUL 空（U+00）、TAB 水平制表（U+09）、LF 换行（U+0A）、FF 换页（U+0C）、CR 回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		
		try { this.eol = VUE_EOL(vue); }
		catch (error) {
			throw SyntaxError$1(
				`.vue 文件的换行符必须是 LF（U+0A）、CRLF（U+0D U+0A）或 CR（U+0D）中的唯一一个`+
				`，而且`+// script 标签内容前
				`不得包含对 JS 是换行符、而对 HTML 和 CSS 不是换行符的 LS（U+2028）或 PS（U+2029），也不得包含对 CSS 是换行符、而对 HTML 和 JS 不是换行符的 FF（U+0C）`//，否则源图映射的行号和列号可能出错
			);
		}
		
		this.tab = vue.includes('\t') ? '\t' : '';
		
		parseComponent(this, vue);
		
		return this;
		
	}
	
	script                = null;
	scriptSetup                     = null;
	         styles          = [];
	template                  = null;
	         customBlocks                = [];
	
	export (           mode                                         
		                               
		                  
		                        
		                           
		                                      
		                                                                
	 , from                )                                                        {
		if ( typeof mode==='object' ) { return one(this, mode); }
		const { bom, tab, eol, script, styles, template } = this;
		if ( mode==='default' ) {
			if ( script ) {
				if ( script.inner===undefined$1 ) {
					return bom
						+`export { default } from ${StringLiteral(script.src )};`;
				}
				else {
					return bom+
						script.innerJS.replace(ES_EOL, eol);
				}
			}
			else {
				throw Error$1(`由于 Vue 2 和 3 所需的 render 函数不同，.vue 的 script 块现在不能省略`);
			}
		}
		else {
			let code         = bom;
			for ( const chunk of From(tab, mode, styles, template, from===null ? null : from===undefined$1 ? 'j-vue' : from, eol) ) { code += chunk; }
			return code;
		}
	}
	
}
freeze(SFC.prototype);

const _tsd = 'declare module \'*?j-vue=\' {\n	export const style :string;\n	export const styles :string[];\n	export const template :string;\n	export const Render :jVue.Render3Constructor;\n	export const render :jVue.Render2;\n	export const staticRenderFns :jVue.Render2[];\n	\n	import type * as jVue from \'j-vue\';\n}\n\ndeclare module \'*?j-vue\' {\n	export { Identifier, Scope, Style, remove, Component, mixin } from \'j-vue\';\n	\n	export const scopeFunction :jVue.Scope<void>;\n	export const scopeObject :jVue.Scope<string>;\n	export const template :string;\n	export const Render :jVue.Render3Constructor;\n	export const render :jVue.Render2;\n	export const staticRenderFns :jVue.Render2[];\n	\n	import type * as jVue from \'j-vue\';\n}\n\ndeclare module \'j-vue\' {\n	export type _Vue = Vue$;\n	export type {\n		SubComponent as _Component,\n		ObjectAPI as _ObjectAPI,\n		Vue3 as _Vue3,\n	};\n	\n	export const version :string;\n	\n	export function Identifier () :string;\n	\n	export const Scope :{\n		<Keys extends string> (this :void | Scope<string | void> | readonly Scope<string | void>[], keys :string) :Scope<Keys>;\n		                      (this :void | Scope<string | void> | readonly Scope<string | void>[]              ) :Scope<void>;\n		readonly prototype :null;\n	};\n	export type Scope<Keys extends string | void> = (\n		Keys extends string ? { readonly [Key in Keys] :string } :\n		Keys extends void ? { (...args :any) :string; readonly prototype? :{ readonly [key :string] :string }; } :\n	never ) & {\n		readonly $ :<T extends Scope<string | void>> (this :T, css? :string, media? :string) => T;\n		readonly [_]? :(string :string) => string;\n		readonly _? :(string :string) => string;\n	};\n	const _ :unique symbol;\n	\n	export function Template (html :string, scope :Scope<string | void>) :string;\n	export function Render (code :string, scope? :Scope<string | void>) :Render2 | Render3Constructor;\n	export function StaticRenderFns (codes :readonly string[], scope? :Scope<string | void>) :Render2[];\n	export type Render3Constructor = {\n		new (Vue3 :Vue3) :Render3;\n		readonly shadow? :string;\n	};\n	export type Render3 = (this :Vue) => VNode | ( VNode | string )[];\n	export type Render2 = (this :Vue, h :$createElement) => VNode;\n	type $createElement = {\n		(this :void, type :string | NonArray, props? :NonArray | null, children? :( VNode | string )[]) :VNode;\n		(this :void, type :string | NonArray,                          children  :( VNode | string )[]) :VNode;\n	};\n	type VNode = NonArray;\n	type NonArray<T extends object = object> = { readonly [index :number] :never } & T;\n	\n	export function Style (css? :string, scope? :Scope<string | void>) :HTMLStyleElement;\n	export function remove (style :HTMLStyleElement) :typeof remove;\n	\n	export abstract class Component<Sub extends SubComponent<Sub>> extends SubComponent<Sub> { protected constructor () }\n	export function mixin<Mixins extends object> (...mixins :( ClassAPI | ObjectAPI )[]) :\n		{ [Name in keyof typeof Component] :typeof Component[Name] } &\n		{ readonly [_mixins] :readonly ( ClassAPI | ObjectAPI )[] } &\n		{ new<Sub extends Component<Sub>> () :\n				Component<Sub> &\n				{ [Name in OwnNames<Mixins>] :Mixins[Name] }\n		};\n	const _mixins :unique symbol;\n	\n	export { exports as default };\n	const exports :Readonly<{\n		version :typeof version,\n		Identifier :typeof Identifier,\n		Scope :typeof Scope,\n		Template :typeof Template,\n		Render :typeof Render,\n		StaticRenderFns :typeof StaticRenderFns,\n		Style :typeof Style,\n		remove :typeof remove,\n		Component :typeof Component,\n		mixin :typeof mixin,\n		default :typeof exports,\n	}>;\n	\n	type ClassAPI = typeof AnyComponent;\n	abstract class AnyComponent<Sub extends SubComponent<Sub>> extends SubComponent<Sub> {\n		protected constructor ();\n		get _inject () :any;\n		get _props () :any;\n		get _directives () :any;\n	}\n	abstract class SubComponent<Sub extends Vue> extends Vue {\n		\n		protected _beforeCreated? () :void | Promise<void>;\n		protected _created? () :void | Promise<void>;\n		protected _beforeMount? () :void | Promise<void>;\n		protected _mounted? () :void | Promise<void>;\n		protected _beforeUpdate? () :void | Promise<void>;\n		protected _updated? () :void | Promise<void>;\n		protected _activated? () :void | Promise<void>;\n		protected _deactivated? () :void | Promise<void>;\n		protected _beforeUnmount? () :void | Promise<void>;\n		protected _unmounted? () :void | Promise<void>;\n		/**@deprecated*/\n		protected _beforeDestroy? () :void | Promise<void>;\n		/**@deprecated*/\n		protected _destroyed? () :void | Promise<void>;\n		\n		protected _render? () :VNode | ( VNode | string )[];\n		protected _provide? () :{ [key :string] :unknown };\n		\n		get _inject () :void | Inject<Sub>;\n		get _props () :void | Props<Sub>;\n		get _directives () :void | Directives<Sub>;\n		\n		static readonly directives :void | Directives<Vue>;\n		static readonly provide :void | { [key :string] :unknown };\n		\n		static render :void | Render2 | Render3;\n		\n		static readonly Render :void | Render3Constructor;\n		static readonly staticRenderFns :void | readonly Render2[];\n		static readonly template :void | string;\n		static readonly inheritAttrs :void | boolean;\n		static readonly components :void | { readonly [name :string] :ClassAPI | ObjectAPI };\n		static readonly emits :void | Emits;\n		\n		static readonly _ :(this :ClassAPI, Vue3? :Vue3, __dev__? :{\n			readonly [Error in\n				| \'compile_name\'\n				| \'compile_constructor\'\n				| \'compile_props\'\n				| \'compile_emits\'\n				| \'compile_is\'\n				| \'compile_layout\'\n				| \'compile_reserved\'\n				| \'compile_redefined\'\n				| \'compile_type\'\n				| \'compile_symbol\'\n				| \'compile_shadow\'\n				| \'render\'\n				| \'runtime_shadow\'\n				| \'runtime_redefined\'\n				| \'runtime_symbol\'\n				| \'runtime_reserved\'\n				| \'runtime_enumerable\'\n			]? :string\n		}) => ObjectAPI;\n		protected constructor (Vue3? :Vue3);\n		\n		private _Render :void;\n		\n		private _staticRenderFns :void;\n		private _template :void;\n		private _inheritAttrs :void;\n		private _components :void;\n		private _emits :void;\n		\n		private _mixins :void;\n		private _extends :void;\n		private _data :void;\n		private _watch :void;\n		private _methods :void;\n		private _computed :void;\n		private _setup :void;\n		\n		private _delimiters :void;\n		\n		/**@deprecated*/\n		private _filters :void;\n		/**@deprecated*/\n		private _comments :void;\n		/**@deprecated*/\n		private _functional :void;\n		/**@deprecated*/\n		private _propsData :void;\n		/**@deprecated*/\n		private _model :void;\n		\n		private static readonly beforeCreated :void;\n		private static readonly created :void;\n		private static readonly beforeMount :void;\n		private static readonly mounted :void;\n		private static readonly beforeUpdate :void;\n		private static readonly updated :void;\n		private static readonly activated :void;\n		private static readonly deactivated :void;\n		private static readonly beforeUnmount :void;\n		private static readonly unmounted :void;\n		/**@deprecated*/\n		private static readonly beforeDestroy :void;\n		/**@deprecated*/\n		private static readonly destroyed :void;\n		\n		private static readonly inject :void;\n		private static readonly props :void;\n		\n		private static readonly mixins :void;\n		private static readonly extends :void;\n		private static readonly data :void;\n		private static readonly watch :void;\n		private static readonly methods :void;\n		private static readonly computed :void;\n		private static readonly setup :void;\n		\n		private static readonly delimiters :void;\n		\n		/**@deprecated*/\n		private static readonly filters :void;\n		/**@deprecated*/\n		private static readonly comments :void;\n		/**@deprecated*/\n		private static readonly functional :void;\n		/**@deprecated*/\n		private static readonly propsData :void;\n		/**@deprecated*/\n		private static readonly model :void;\n		\n	}\n	\n	type OwnNames<T> = Extract<OwnKeys<T>, string>;\n	type OwnKeys<T> = Exclude<keyof T,\n		\'_beforeCreated\' | \'_created\' | \'_beforeMount\' | \'_mounted\' | \'_beforeUpdate\' | \'_updated\' | \'_activated\' | \'_deactivated\' | \'_beforeUnmount\' | \'_unmounted\' | \'_beforeDestroy\' | \'_destroyed\' |\n		\'_render\' | \'_provide\' |\n		\'_inject\' | \'_props\' | \'_directives\' |\n		\'_Render\' |\n		\'_staticRenderFns\' | \'_template\' | \'_inheritAttrs\' | \'_components\' | \'_emits\' | \'_mixins\' |\n		\'_extends\' | \'_data\' | \'_watch\' | \'_methods\' | \'_computed\' | \'_setup\' |\n		\'_delimiters\' |\n		\'_filters\' | \'_comments\' | \'_functional\' | \'_propsData\' | \'_model\' |\n		\'_\' |\n		\'$emit\' |\n		\'$watch\' |\n		\'$nextTick\' |\n		\'$forceUpdate\' |\n		\'$scopedSlots\' | \'$options\' | \'$parent\' | \'$slots\' | \'$attrs\' | \'$refs\' | \'$root\' |\n		\'$el\' |\n		\'$data\' | \'$props\' |\n		\'$createElement\' |\n		\'$children\' | \'$listeners\' | \'$destroy\' | \'$delete\' | \'$mount\' | \'$once\' | \'$set\' | \'$off\' | \'$on\' |\n		\'$\'\n		>;\n	\n	const Vue :{ new () :Vue };\n	type Vue = Readonly<Vue_>;\n	abstract class Vue_ extends Vue$ { private _? :never }\n	abstract class Vue$ {\n		\n		$emit (this :this, event :string, ...args :unknown[]) :this;\n		\n		$watch        (this :this, exp :string                          , cb :<Value> (this :this, value :Value, oldValue  :Value) => void, options? :{ deep? :boolean, immediate? :false  , flush? :\'pre\' | \'post\' | \'sync\' }) :{ () :void };\n		$watch        (this :this, exp :string                          , cb :<Value> (this :this, value :Value, oldValue? :Value) => void, options? :{ deep? :boolean, immediate? :boolean, flush? :\'pre\' | \'post\' | \'sync\' }) :{ () :void };\n		$watch<Value> (this :this, fn :(this :this, self :this) => Value, cb :        (this :this, value :Value, oldValue  :Value) => void, options? :{ deep? :boolean, immediate? :false  , flush? :\'pre\' | \'post\' | \'sync\' }) :{ () :void };\n		$watch<Value> (this :this, fn :(this :this, self :this) => Value, cb :        (this :this, value :Value, oldValue? :Value) => void, options? :{ deep? :boolean, immediate? :boolean, flush? :\'pre\' | \'post\' | \'sync\' }) :{ () :void };\n		\n		$nextTick (this :this, callback :(this :this) => void | Promise<void>) :void;\n		$nextTick () :Promise<void>;\n		\n		$forceUpdate (this :this) :void;\n		\n		$scopedSlots? :ScopedSlots;\n		$options :Readonly<ObjectAPI>;\n		$parent? :Vue;\n		$slots? :ScopedSlots;\n		$attrs :{ readonly [name :string] :unknown };\n		$refs :{ readonly [name :string] :unknown };\n		$root :Vue;\n		\n		private $el? :never;\n		\n		private $data? :never;\n		private $props? :never;\n		\n		/**@deprecated*/\n		private $createElement? :$createElement;\n		\n		/**@deprecated*/\n		private $isServer? :never;\n		/**@deprecated*/\n		private $children? :never;\n		/**@deprecated*/\n		private $listeners? :never;\n		/**@deprecated*/\n		private $destroy? :never;\n		/**@deprecated*/\n		private $delete? :never;\n		/**@deprecated*/\n		private $mount? :never;\n		/**@deprecated*/\n		private $once? :never;\n		/**@deprecated*/\n		private $set? :never;\n		/**@deprecated*/\n		private $off? :never;\n		/**@deprecated*/\n		private $on? :never;\n		\n		private $? :never;\n		\n	}\n	\n	type Props<This extends Vue> =\n		Exclude<OwnNames<This>, \'is\'>[] |\n		NonArray<{\n			[Key in Exclude<OwnNames<This>, \'is\'>]? :\n			ConstructorType<This[Key]> | ConstructorType<This[Key]>[] |\n			NonArray<{\n				type? :ConstructorType<This[Key]> | ConstructorType<This[Key]>[],\n				validator? (value :unknown) :value is This[Key],\n			} & ( {\n				default? :This[Key] extends object ? { (this :void, props? :{ readonly [name :string] :unknown }) :This[Key] } : This[Key] | { (this :void, props? :{ readonly [name :string] :unknown }) :This[Key] },\n				required? :false,\n			} | {\n				default? :never,\n				required? :boolean,\n			})>\n		}>;\n	type ConstructorType<T> = {\n		new (...args :any) :\n			T extends boolean ? Boolean :\n			T extends number ? Number :\n			T extends string ? String :\n			T extends symbol ? Symbol :\n			T extends bigint ? BigInt :\n			T\n	};\n	\n	type Inject<This extends Vue> =\n		OwnNames<This>[] |\n		NonArray<{\n			[Key in OwnKeys<This>]? :\n			string | symbol |\n			{\n				from? :string | symbol,\n				default? :This[Key] extends object ? { (this :void) :This[Key] } : This[Key] | { (this :void) :This[Key] },\n			}\n		}>;\n	\n	type Emits =\n		string[] |\n		NonArray<{ [event :string] :null | { (this :void, ...args :readonly unknown[]) :boolean } }>;\n	\n	type Directives<This extends Vue> = { [name :string] :Directive<This> };\n	type Directive<This extends Vue> =\n		{\n			(\n				this :void,\n				el :Element,\n				binding :{\n					/**@deprecated*/\n					readonly expression? :undefined,\n					/**@deprecated*/\n					readonly name? :undefined,\n					readonly instance :This,\n					readonly value? :unknown,\n					readonly oldValue? :unknown,\n					readonly arg? :unknown,\n					readonly modifiers :{ readonly [Modifier in string]? :true },\n					readonly dir :Directive<This>,\n				} | {\n					/**@deprecated*/\n					readonly expression? :string,\n					/**@deprecated*/\n					readonly name :string,\n					readonly instance? :undefined,\n					readonly value? :unknown,\n					readonly oldValue? :unknown,\n					readonly arg? :unknown,\n					readonly modifiers :{ readonly [Modifier in string]? :true },\n					readonly dir? :undefined,\n				},\n				vNode :VNode & { /**@deprecated*/ readonly context? :This },\n				previousVNode? :VNode & { /**@deprecated*/ readonly context? :This },\n			) :void | Promise<void>\n		} | {\n			[Hook in \'created\' | \'beforeMount\' | \'mounted\'  | \'beforeUpdate\' | \'updated\'                        | \'beforeUnmount\' | \'unmounted\']? :{\n				(\n					this :void,\n					el :Element,\n					binding :{\n						/**@deprecated*/\n						readonly expression? :void,\n						/**@deprecated*/\n						readonly name? :void,\n						readonly instance :This,\n						readonly value? :unknown,\n						readonly oldValue? :Hook extends \'beforeUpdate\' | \'updated\' ? unknown : void,\n						readonly arg? :unknown,\n						readonly modifiers :{ readonly [Modifier in string]? :true },\n						readonly dir :Directive<This>,\n					},\n					vNode :VNode & { /**@deprecated*/ readonly context? :void },\n					previousVNode :Hook extends \'beforeUpdate\' | \'updated\' ? VNode & { /**@deprecated*/ readonly context? :void } : void,\n				) :void | Promise<void>\n			}\n		} & {\n			/**@deprecated*/\n			[Hook in             \'bind\'/*   */ | \'inserted\'                  | \'update\'/**/ | \'componentUpdated\'                  | \'unbind\'   ]? :{\n				(\n					this :void,\n					el :Element,\n					binding :{\n						/**@deprecated*/\n						readonly expression? :string,\n						/**@deprecated*/\n						readonly name :string,\n						readonly instance? :void,\n						readonly value? :unknown,\n						readonly oldValue? :Hook extends \'update\' | \'componentUpdated\' ? unknown : void,\n						readonly arg? :unknown,\n						readonly modifiers :{ readonly [Modifier in string]? :true },\n						readonly dir? :void,\n					},\n					vNode :VNode & { /**@deprecated*/ readonly context :This },\n					previousVNode :Hook extends \'update\' | \'componentUpdated\' ? VNode & { /**@deprecated*/ readonly context :This } : void,\n				) :void | Promise<void>\n			}\n		};\n	\n	type ScopedSlots = {\n		readonly [Name in string]? :(this :void, arg :unknown) => readonly VNode[] | undefined\n	};\n	\n	interface ObjectAPI {\n		\n		inheritAttrs? :boolean,\n		template? :string,\n		render? :Render2 | Render3,\n		staticRenderFns? :Render2[],\n		directives? :Directives<Vue>,\n		components? :{ [name :string] :ObjectAPI },\n		provide? :\n			{ [key :string] :unknown } |\n			{ (this :Vue) :{ [key :string] :unknown } },\n		emits? :Emits,\n		\n		inject? :Inject<Vue>,\n		props? :Props<Vue>,\n		\n		/**@deprecated*/\n		filters? :void,\n		/**@deprecated*/\n		comments? :void,\n		/**@deprecated*/\n		functional? :void,\n		/**@deprecated*/\n		propsData? :void,\n		/**@deprecated*/\n		model? :void,\n		\n		beforeCreated? (this :Vue) :void | Promise<void>,\n		created? (this :Vue) :void | Promise<void>,\n		beforeMount? (this :Vue) :void | Promise<void>,\n		mounted? (this :Vue) :void | Promise<void>,\n		beforeUpdate? (this :Vue) :void | Promise<void>,\n		updated? (this :Vue) :void | Promise<void>,\n		activated? (this :Vue) :void | Promise<void>,\n		deactivated? (this :Vue) :void | Promise<void>,\n		beforeUnmount? (this :Vue) :void | Promise<void>,\n		unmounted? (this :Vue) :void | Promise<void>,\n		/**@deprecated*/\n		beforeDestroy? (this :Vue) :void | Promise<void>,\n		/**@deprecated*/\n		destroyed? (this :Vue) :void | Promise<void>,\n		\n		delimiters? :[ string, string ],\n		\n		extends? :ObjectAPI,\n		data? (this :Vue, self :Vue) :{ [name :string] :unknown },\n		watch? :{\n			[exp :string] :\n				{ <Value> (this :Vue, value :Value, oldValue? :Value) :void } |\n				{\n					handler<Value> (this :Vue, value :Value, oldValue? :Value) :void,\n					deep? :boolean,\n					immediate? :boolean,\n					flush? :\'pre\' | \'post\' | \'sync\',\n				}\n		},\n		methods? :{ [name :string] :{ (this :Vue, ...args :unknown[]) :any } },\n		computed? :{\n			[name :string] :\n				{ (this :Vue) :unknown } |\n				{\n					get? (this :Vue) :unknown,\n					set (this :Vue, value :unknown) :void | Promise<void>,\n				}\n		},\n		setup? (\n			this :void,\n			props :{ readonly [name :string] :unknown },\n			{} :{\n				readonly attrs :{ readonly [name :string] :unknown },\n				readonly slots :ScopedSlots,\n				readonly emit :(this :void, event :string, ...args :unknown[]) => void,\n			},\n		) :{ [name :string] :unknown } | Render3,\n		\n		mixins? :ObjectAPI[],\n		\n	}\n	\n	type Vue3 = Readonly<{\n		h (this :void, type :string | NonArray, props? :NonArray | null, children? :( VNode | string )[] | { (this :void, arg :unknown) :VNode[] | undefined } | { [name :string] :{ (this :void, arg :unknown) :VNode[] | undefined } }) :VNode;\n		h (this :void, type :string | NonArray,                          children  :( VNode | string )[] | { (this :void, arg :unknown) :VNode[] | undefined }                                                                          ) :VNode;\n	} & { [API in\n		| \'BaseTransition\'\n		| \'Comment\'\n		| \'Fragment\'\n		| \'KeepAlive\'\n		| \'Static\'\n		| \'Suspense\'\n		| \'Teleport\'\n		| \'Text\'\n		| \'Transition\'\n		| \'TransitionGroup\'\n		| \'callWithAsyncErrorHandling\'\n		| \'callWithErrorHandling\'\n		| \'camelize\'\n		| \'capitalize\'\n		| \'cloneVNode\'\n		| \'compile\'\n		| \'computed\'\n		| \'createApp\'\n		| \'createBlock\'\n		| \'createCommentVNode\'\n		| \'createHydrationRenderer\'\n		| \'createRenderer\'\n		| \'createSSRApp\'\n		| \'createSlots\'\n		| \'createStaticVNode\'\n		| \'createTextVNode\'\n		| \'createVNode\'\n		| \'customRef\'\n		| \'defineAsyncComponent\'\n		| \'defineComponent\'\n		| \'getCurrentInstance\'\n		| \'getTransitionRawChildren\'\n		| \'handleError\'\n		| \'hydrate\'\n		| \'initCustomFormatter\'\n		| \'inject\'\n		| \'isProxy\'\n		| \'isReactive\'\n		| \'isReadonly\'\n		| \'isRef\'\n		| \'isVNode\'\n		| \'markRaw\'\n		| \'mergeProps\'\n		| \'nextTick\'\n		| \'onActivated\'\n		| \'onBeforeMount\'\n		| \'onBeforeUnmount\'\n		| \'onBeforeUpdate\'\n		| \'onDeactivated\'\n		| \'onErrorCaptured\'\n		| \'onMounted\'\n		| \'onRenderTracked\'\n		| \'onRenderTriggered\'\n		| \'onUnmounted\'\n		| \'onUpdated\'\n		| \'openBlock\'\n		| \'popScopeId\'\n		| \'provide\'\n		| \'proxyRefs\'\n		| \'pushScopeId\'\n		| \'queuePostFlushCb\'\n		| \'reactive\'\n		| \'readonly\'\n		| \'ref\'\n		| \'registerRuntimeCompiler\'\n		| \'render\'\n		| \'renderList\'\n		| \'renderSlot\'\n		| \'resolveComponent\'\n		| \'resolveDirective\'\n		| \'resolveDynamicComponent\'\n		| \'resolveTransitionHooks\'\n		| \'setBlockTracking\'\n		| \'setDevtoolsHook\'\n		| \'setTransitionHooks\'\n		| \'shallowReactive\'\n		| \'shallowReadonly\'\n		| \'shallowRef\'\n		| \'ssrContextKey\'\n		| \'ssrUtils\'\n		| \'toDisplayString\'\n		| \'toHandlers\'\n		| \'toRaw\'\n		| \'toRef\'\n		| \'toRefs\'\n		| \'transformVNodeArgs\'\n		| \'triggerRef\'\n		| \'unref\'\n		| \'useCssModule\'\n		| \'useCssVars\'\n		| \'useSSRContext\'\n		| \'useTransitionState\'\n		| \'vModelCheckbox\'\n		| \'vModelDynamic\'\n		| \'vModelRadio\'\n		| \'vModelSelect\'\n		| \'vModelText\'\n		| \'vShow\'\n		| \'version\'\n		| \'warn\'\n		| \'watch\'\n		| \'watchEffect\'\n		| \'withCtx\'\n		| \'withDirectives\'\n		| \'withKeys\'\n		| \'withModifiers\'\n		| \'withScopeId\'\n	] :any }>;\n	\n}\n';

const _ID_ = /'(\*?\??j-vue=?)'/g;

const tsd = _tsd.replace(/(?:\r?\n\texport type [_{][^;]*;)+/, '');

const TSD = (ids                                 ) => tsd.replace(_ID_, (_id_        , id    ) => StringLiteral(ids?.[id] ?? id));

const _default = Default({
	version,
	SFC,
	CSS: CSS$1,
	TSD,
});

module.exports = _default;

//# sourceMappingURL=index.js.map