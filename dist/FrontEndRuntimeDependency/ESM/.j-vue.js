/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：19.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

import isArray from '.Array.isArray';
import create$1 from '.Object.create';
import undefined$1 from '.undefined';
import RegExp from '.RegExp';
import freeze from '.Object.freeze';
import defineProperty from '.Object.defineProperty';
import NULL from '.null.prototype';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import REGEXP from '.RegExp.prototype';
import test from '.RegExp.prototype.test';
import exec from '.RegExp.prototype.exec';
import getOwnPropertySymbols from '.Object.getOwnPropertySymbols?';
import apply from '.Reflect.apply?=';
import create from '.Object.create?=';
import Default from '.default?=';
import Symbol from '.Symbol?';
import document from '.document';
import head from '.document.head';
import Function from '.Function';
import Error from '.Error';
import WeakMap from '.WeakMap?';
import from from '.Array.from?';
import getPrototypeOf$1 from '.Reflect.getPrototypeOf?=Object.getPrototypeOf';
import setPrototypeOf from '.Object.setPrototypeOf';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import getOwnPropertyDescriptor from '.Object.getOwnPropertyDescriptor';
import defineProperties from '.Object.defineProperties';
import get$1 from '.Reflect.get?';
import apply$1 from '.Reflect.apply?';
import assign from '.Object.assign?';
import Keys from '.Object.keys';
import OwnKeys from '.Reflect.ownKeys?';
import PROTO_BUG from '.Object.prototype';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import getPrototypeOf from '.Object.getPrototypeOf';
import propertyIsEnumerable from '.Object.prototype.propertyIsEnumerable';
import error from '.console.error';
import Default$1 from '.default';

var version = '19.0.0';

var CSS_KEYWORDS = [
	'all',
	'lao',
	'auto',
	'disc',
	'none',
	'span',
	'thai',
	'khmer',
	'oriya',
	'tamil',
	'unset',
	'circle',
	'hebrew',
	'inline',
	'revert',
	'square',
	'telugu',
	'bengali',
	'decimal',
	'default',
	'inherit',
	'initial',
	'kannada',
	'myanmar',
	'outside',
	'persian',
	'tibetan',
	'armenian',
	'contents',
	'georgian',
	'gujarati',
	'gurmukhi',
	'hiragana',
	'katakana',
	'cambodian',
	'malayalam',
	'mongolian',
	'devanagari',
	'notranslate',
];

var increaseDictionary                                                               = {
	0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'a',
	a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
	h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
	o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
	u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
};
var latestIdentifier                              = [ '9' ];
var lastCharacter                        = '9';
var lastIndex         = 0;

var css_keyword                = /*#__PURE__*/function () {
	latestIdentifier.join = latestIdentifier.join;
	latestIdentifier.unshift = latestIdentifier.unshift;
	CSS_KEYWORDS.shift = CSS_KEYWORDS.shift;
	return CSS_KEYWORDS.shift() ;
}();

function Identifier ()         {
	
	if ( lastCharacter==='z' ) {
		lastCharacter = latestIdentifier[lastIndex] = '0';
		for ( var characterIndex         = lastIndex; ; ) {
			if ( characterIndex ) {
				var character                        = latestIdentifier[--characterIndex];
				if ( character==='z' ) { latestIdentifier[characterIndex] = '0'; }
				else {
					latestIdentifier[characterIndex] = increaseDictionary[character];
					break;
				}
			}
			else {
				latestIdentifier.unshift('a');
				++lastIndex;
				break;
			}
		}
	}
	else {
		lastCharacter = latestIdentifier[lastIndex] = increaseDictionary[lastCharacter];
	}
	
	var identifier         = latestIdentifier.join('');
	if ( identifier===css_keyword ) {
		lastCharacter = latestIdentifier[lastIndex] = increaseDictionary[lastCharacter             ];
		identifier = latestIdentifier.join('');
		css_keyword = CSS_KEYWORDS.shift() || null;
	}
	return identifier;
	
}

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

var version$1 = '8.0.0';

var test_bind                                           = test.bind ? /*#__PURE__*/test.bind.bind(test       )        : function (re        ) { return function (string        ) { return test.call(re, string); }; };
var exec_bind                                           = exec.bind ? /*#__PURE__*/exec.bind.bind(exec       )        : function (re        ) { return function (string        ) { return exec.call(re, string); }; };
var symbols = getOwnPropertySymbols ? /*#__PURE__*/getOwnPropertySymbols(REGEXP).reverse() : null;
var values = symbols && /*#__PURE__*/symbols.map(function (symbol) { return REGEXP[symbol]; });

var NT = /[\n\t]/g;
var SEARCH_ESCAPE = /\\./g;
function graveAccentReplacer ($$        ) { return $$==='\\`' ? '`' : $$; }

function RE (               template                      ) {
	var raw = template.raw;
	var source = raw[0];
	var length = arguments.length;
	var index = 1;
	var value                 ;
	if ( this.U ) {
		while ( index<length ) {
			value = arguments[index];
			source += ( typeof value==='string' ? value : this.check(value) ) + raw[index++];
		}
	}
	else {
		while ( index<length ) {
			value = arguments[index];
			source += ( typeof value==='string' ? value : this.check(value) ) + raw[index++].replace(SEARCH_ESCAPE, graveAccentReplacer);
		}
	}
	var re = RegExp(source = source.replace(NT, ''), this.flags);
	this.addon(re.test = test_bind(re), re.exec = exec_bind(re), source);
	if ( symbols ) {
		index = symbols.length;
		while ( index ) { re[symbols[--index]] = values [index]; }
	}
	return re;
}

function check (               re        ) {
	var source = re.source;
	if ( !source ) { throw TypeError(typeof re); }
	if ( re.unicode===this.U ) { throw SyntaxError('unicode'); }
	if ( re.ignoreCase===this.I ) { throw SyntaxError('ignoreCase'); }
	if ( re.multiline===this.M && ( source.indexOf('^')>=0 || source.indexOf('$')>=0 ) ) { throw SyntaxError('multiline'); }
	if ( re.dotAll===this.S && source.indexOf('.')>=0 ) { throw SyntaxError('dotAll'); }
	return source;
}

function addon (               test       , exec       , source        ) {
	test.source = exec.source = source;
	test.unicode = exec.unicode = this.U;
	test.ignoreCase = exec.ignoreCase = this.I;
	test.multiline = exec.multiline = source.indexOf('^')<0 && source.indexOf('$')<0 ? null : this.M;
	test.dotAll = exec.dotAll = source.indexOf('.')<0 ? null : this.S;
}

var CONTEXT          = {
	flags: '',
	U: true,
	I: true,
	M: true,
	S: true,
	check: check,
	addon: addon
};

function newRegExp (flags_template                               )                                                        {
	if ( typeof flags_template==='string' ) {
		var context          = {
			flags: flags_template,
			U: /*#__PURE__*/ flags_template.indexOf('u')<0,
			I: /*#__PURE__*/ flags_template.indexOf('i')<0,
			M: /*#__PURE__*/ flags_template.indexOf('m')<0,
			S: /*#__PURE__*/ flags_template.indexOf('s')<0,
			check: check,
			addon: addon
		};
		return function newRegExp (template                      )         {
			return /*#__PURE__*/ apply(RE, context, arguments                                       );
		};
	}
	return /*#__PURE__*/ apply(RE, CONTEXT, arguments                                       );
}

var clearRegExp = '$_' in RegExp
	? /*#__PURE__*/function () {
		var REGEXP = /^/;
		REGEXP.test = REGEXP.test;
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
var GROUP = create(NULL)         ;

function groupify (branches                   , uFlag          , noEscape          )         {
	var group = create(NULL)         ;
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index]); }
	return sourcify(group, !noEscape);
}
function appendPointBranch (group       , branch        )       {
	if ( branch ) {
		var character         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch(group[character] || ( group[character] = create(NULL)          ), branch.slice(character.length));
	}
	else { group[''] = GROUP; }
}

function appendCodeBranch (group       , branch        )       {
	if ( branch ) {
		var character         = branch.charAt(0);
		appendCodeBranch(group[character] || ( group[character] = create(NULL)          ), branch.slice(1));
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

var _export = Default({
	version: version$1,
	newRegExp: newRegExp,
	clearRegExp: clearRegExp,
	groupify: groupify
});

/*¡ j-regexp */

var _      = Symbol ? /*#__PURE__*/Symbol('_')        : '_';

function $                  (         css         , media         )    {
	var style                   = document.createElement('style');
	if ( css ) { style.textContent = this[_](css); }
	if ( media!==undefined$1 ) { style.media = media; }
	head.appendChild(style);
	return this;
}

var prepare_                                  = typeof _==='symbol' ? null : /*#__PURE__*/function () {
	var _descriptor = create$1(NULL)                      ;
	_descriptor.value = null;
	_descriptor.writable = true;
	_descriptor.enumerable = true;
	_descriptor.configurable = true;
	return function $ (scope       ) { defineProperty(scope, _, _descriptor); };
}();

function Search (keys          )         { return RegExp('__' + groupify(keys, false, true) + '__', 'g'); }
function Replacer (scope             ) { return function replacer (__key__        )         { return scope[__key__.slice(2, -2)]; }; }

var StaticScope = function StaticScope (                   keys          )       {
	prepare_ && prepare_(this);
	this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
	var _search = Search(keys);
	var _replacer = Replacer(this);
	for ( var index         = keys.length; index; ) { this[keys[--index]] = Identifier(); }
}                
	                                  
	                       
 ;

var SCOPE              = StaticScope.prototype = /*#__PURE__*/freeze(create$1(null, {
	$: { value: $, writable: false, enumerable: false, configurable: false },
})               );

var InheritedStaticScope = function InheritedStaticScope (                   keys          , proto             )       {
	prepare_ && prepare_(this);
	this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
	for ( var index         = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	for ( var key in proto ) { /*key==='_' || key==='$' || ( */
		keys[keys.length] = key/* )*/;
	}
	var _search = Search(keys);
	var _replacer = Replacer(this);
	InheritedStaticScope.prototype = SCOPE;
}                
	                                                      
	                       
 ;

var KEYS = /[^\x00-@[-`{-\x7F\s][^\x00-/:-@[-`{-\x7F\s]*(?:_[^\x00-/:-@[-`{-\x7F\s]+)*/g;

var __KEY__ = RegExp('__' + KEYS.source + '__', 'g');

function get (cache             , key        )         { return cache[key] || ( cache[key] = Identifier() ); }

function scopify (value                         , cache             )         {
	var keys        ,
		index        ,
		values          ,
		key        ;
	if ( value ) {
		switch ( typeof value ) {
			case 'string':
				if ( value.indexOf(' ')<0 ) {
					return get(cache, value);
				}
				else {
					keys = '';
					values = value.split(' ');
					for ( index = values.length; index; ) {
						key = value[--index];
						if ( key ) { keys = get(cache, key)+' '+keys; }
					}
					return keys && keys.slice(0, -1);
				}
			case 'object':
				keys = '';
				if ( isArray(value) ) {
					for ( index = value.length; index; ) {
						key = scopify(value[--index], cache);
						if ( key ) { keys = key+' '+keys; }
					}
					return keys && keys.slice(0, -1);
				}
				else {
					for ( key in value ) {
						if ( ( value                           )[key] ) { keys += ' '+get(cache, key); }
					}
					return keys && keys.slice(1);
				}
		}
	}
	return '';
}

function DynamicScope (cache             )               {
	var scope = function scope (value                         )         {
		var length = arguments.length;
		if ( length>1 ) {
			value = [ value, arguments[1] ];
			for ( var index = 2; index!==length; ++index ) { ( value          )[index] = arguments[index]; }
		}
		return scopify(value, cache);
	}                ;
	scope.prototype = cache;
	scope.$ = $;
	scope[_] = function _ (string        ) { return string.replace(__KEY__, _replacer); };
	function _replacer (__key__        )         { return get(cache, __key__.slice(2, -2)); }
	return scope;
}

var EMPTY           = [];

function mix (protos         )              {
	var scope              = create$1(SCOPE);
	for ( var length         = protos.length, index = 0; index<length; ++index ) {
		var proto        = protos[index];
		if ( typeof proto==='function' ) { proto = proto.prototype; }
		for ( var id in proto ) { scope[id] = proto[id]; }
	}
	return scope;
}

                                        

function Scope (                              keys         )        {
	if ( keys===undefined$1 ) {
		if ( isArray(this) ) { return DynamicScope(mix(this           )); }
		else if ( this instanceof StaticScope ) { return DynamicScope(create$1(this)); }
		else if ( typeof this==='function' && this.prototype instanceof StaticScope ) { return DynamicScope(create$1(this.prototype               )); }
		else { return DynamicScope(create$1(SCOPE)); }
	}
	else {
		if ( isArray(this) ) { return new InheritedStaticScope(keys.match(KEYS) || EMPTY, InheritedStaticScope.prototype = mix(this           )); }
		else if ( this instanceof StaticScope ) { return new InheritedStaticScope(keys.match(KEYS) || EMPTY, InheritedStaticScope.prototype = this); }
		else if ( typeof this==='function' && this.prototype instanceof StaticScope ) { return new InheritedStaticScope(keys.match(KEYS) || EMPTY, InheritedStaticScope.prototype = this.prototype); }
		else { return new StaticScope(keys.match(KEYS) || EMPTY); }
	}
}
Scope.prototype = null       ;

function Template (html        , scope       )         {
	return /*#__PURE__*/scope[_](html);
}

var NOT_ES5 = /^(cons|le)t /;

function WithStripped (render                                   ) {
	render._withStripped = true;
	return render;
}

function Render (code        , scope        )                                          {
	return code[0]==='('
		? /*#__PURE__*/Function('"use strict";return class Render extends null{constructor'+(scope ? scope[_](code) : code)+'};')()                                  
		: /*#__PURE__*/WithStripped(
			/*#__PURE__*/Function(NOT_ES5.test(code)
				? '"use strict";return{render(){'+(scope ? scope[_](code) : code)+'}}.render;'
				: '"use strict";return function render(){'+(scope ? scope[_](code) : code)+'};'
			)()          
		);
}
function StaticRenderFns (codes                   , scope        )           {
	var index         = codes.length;
	var body         = ']';
	if ( scope ) {
		for ( var scope_ = scope[_]; index; ) { body = 'function(){'+scope_(codes[--index])+'},'+body; }
	}
	else {
		while ( index ) { body = 'function(){'+codes[--index]+'},'+body; }
	}
	return Function('"use strict";return['+body)();
}

function Style (css         , scope        )                   {
	var style                   = document.createElement('style');
	if ( css ) { style.textContent = scope ? scope[_](css) : css; }
	return head.appendChild(style);
}

function remove (style                  )                {
	head.removeChild(style);
	return remove;
}

var that                 = null;

var NAMES = assign && /*#__PURE__*/assign(create$1(null), {
	_: null,
	_c: null,
	_computedWatchers: null,
	_data: null,
	_directInactive: null,
	_events: null,
	_hasHookEvent: null,
	_hasMove: null,
	_inactive: null,
	_isBeingDestroyed: null,
	_isDestroyed: null,
	_isMounted: null,
	_isVue: null,
	_leaving: null,
	_name: null,
	_props: null,
	_provided: null,
	_reflow: null,
	_renderProxy: null,
	_self: null,
	_staticTrees: null,
	_uid: null,
	_update: null,
	_vnode: null,
	_watcher: null,
	_watchers: null,
});

function proProto (self         , protoDescriptors                  ) {
	
	var _ = self._;
	defineProperties(_ ? _.ctx : self, protoDescriptors);
	
}

function proConstructor (self         , protoDescriptors                         , constructor          , Vue3                   ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	protoDescriptors && defineProperties(ctx, protoDescriptors);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
}

function proNames (self         , protoDescriptors                         , constructor          , Vue3                   , dataNames       , shadowAssigner                       ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	protoDescriptors && defineProperties(ctx, protoDescriptors);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = assign(create$1(NULL), dataNames)        ;
	if ( _ ) {
		var accessCache = _.accessCache;
		for ( var name in dataNames ) {
			data[name] = ctx[name                 ];
			if ( name in accessCache ) { accessCache[name                 ] = undefined$1; }
		}
	}
	else {
		for ( name in dataNames ) { data[name] = ctx[name                 ]; }
	}
	shadowAssigner && shadowAssigner(self, data);
	return data;
	
}

function proData (self         , protoDescriptors                         , constructor          , Vue3                   , restNames       , shadowAssigner                       ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	protoDescriptors && defineProperties(ctx, protoDescriptors);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = create$1(NULL)        ;
	if ( _ ) {
		var accessCache = _.accessCache;
		for ( var name in ctx ) {
			if ( !( name in restNames ) && name[0]!=='$' ) {
				data[name] = ctx[name                 ];
				if ( name in accessCache ) { accessCache[name                 ] = undefined$1; }
			}
		}
	}
	else {
		var nowNames = Keys(ctx);
		var index = nowNames.length;
		while ( index ) {
			name = nowNames[--index];
			if ( !( name in restNames ) && name[0]!=='$' ) { data[name] = ctx[name                 ]; }
		}
	}
	shadowAssigner && shadowAssigner(self, data);
	return data;
	
}

function devData (self         , protoDescriptors                         , constructor          , Vue3                   , skipData         , dataNames              , restNames       , shadowAssigner                       , shadowChecker                           , skipConstructor         , __dev__         ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	for ( var name in ctx ) {
		if ( name[0]==='_' && !( name in NAMES ) ) {
			error(Error('[jVue bug]: vm.' + name + ' is unknown but exists'));
			break;
		}
	}
	var oldDescriptors = assign(create$1(NULL), getOwnPropertyDescriptors(ctx), protoDescriptors);
	if ( protoDescriptors ) {
		for ( var $name in protoDescriptors ) { if ( $name in ctx ) { throw Error(__dev__.runtime_reserved); } }
		defineProperties(ctx, protoDescriptors);
	}
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	OwnKeys(oldDescriptors).forEach(function (key) {
		var oldDescriptor = oldDescriptors[key] ;
		var newDescriptor = getOwnPropertyDescriptor(ctx, key                 );
		if (
			!newDescriptor ||
			newDescriptor.configurable!==oldDescriptor.configurable ||
			newDescriptor.enumerable!==oldDescriptor.enumerable ||
			( newDescriptor.hasOwnProperty('value')
					//@ts-ignore
					? newDescriptor.value!==oldDescriptor.value || newDescriptor.writable!==oldDescriptor.writable
					//@ts-ignore
					: newDescriptor.get!==oldDescriptor.get || newDescriptor.set!==oldDescriptor.set
			)
		) { throw Error(__dev__.runtime_redefined); }
	});
	var difKeys                        = OwnKeys(ctx).filter(function (key) {
		return !( key in oldDescriptors );
	});
	if ( skipConstructor ) {
		if ( difKeys.length ) { throw Error(__dev__.runtime_data); }
	}
	var difNames = difKeys.filter(function (key)                {
		return typeof key==='string' && key[0]!=='$';
	});
	if ( skipData ) {
		if ( difNames.length ) { throw Error(__dev__.runtime_data); }
	}
	if ( dataNames ) {
		var count = 0;
		for ( name in dataNames ) { ++count; }
		if ( count!==difNames.length ) { throw Error(__dev__.runtime_data); }
		difNames.forEach(function (name) {
			if ( !( name in dataNames ) ) { throw Error(__dev__.runtime_data); }
		});
	}
	difNames.forEach(function (              name) {
		if ( name in this && !( name in {} ) || name in restNames ) { throw Error(__dev__.runtime_redefined); }
		if ( name[0]==='_' ) { throw Error(__dev__.runtime_reserved); }
		if ( name==='constructor' ) { throw Error(__dev__.proto); }
		if ( !propertyIsEnumerable.call(ctx, name)) { throw Error(__dev__.runtime_enumerable); }
	}, getPrototypeOf(ctx));
	
	var data = create$1(NULL)        ;
	difNames.forEach(function (name) {
		( data         )[name] = ctx[name                 ];
		if ( _ && name in _.accessCache ) { _.accessCache[name                 ] = undefined$1; }
	});
	if ( shadowAssigner ) {
		shadowChecker (data);
		shadowAssigner(self, data);
	}
	return data;
	
}

var INIT = /*#__PURE__*/function () {
	var INIT = create$1(NULL)                  ;
	INIT.mode = 'open';
	return INIT;
}();

function attach (            el                    )                    { return el && ( el.shadowRoot || el.attachShadow(INIT) ); }

                                                                               
function ShadowAssigner (            along        )                 {
	var index = along.indexOf('.');
	var names = index<0 ? null : along.slice(index + 1).split('.');
	var toName = names ? along.slice(0, index) : along;
	if ( names ) {
		if ( names.length===1 ) {
			var name$get = names[0] + '$get';
			var name$set = names[0] + '$set';
			return function (            self                         , data                         ) {
				var all = data[toName] = create$1(NULL)       ;
				all[name$set] = function (            el                    ) { self[toName] [name$get] = attach(el); };
				all[name$get] = null;
			}                             ;
		}
		else {
			return function (            self                         , data                         ) {
				var all = data[toName] = create$1(NULL)       ;
				names .forEach(function (name        ) {
					all[name + '$set'] = function (            el                    ) { self[toName] [name] = attach(el); };
					all[name += '$get'] = null;
				});
			}                             ;
		}
	}
	else {
		var toName$get = toName + '$get';
		var toName$set = toName + '$set';
		return function (            self     , data     ) {
			data[toName$set] = function (            el                    ) { self[toName$get] = attach(el); };
			data[toName$get] = null;
		}                             ;
	}
}

                                                               
function ShadowChecker (            along        , restNames       , dataNames              , shadowNames       , __dev__         )                {
	if ( along[0]==='_' || along[0]==='$' ) { throw Error(__dev__.compile_shadow); }
	var index = along.indexOf('.');
	if ( index<0 ) {
		var toName$get = along.slice(0, index) + '$get';
		var toName$set = along.slice(0, index) + '$set';
		if ( toName$get in restNames || toName$set in restNames ) { throw Error(__dev__.compile_shadow); }
		shadowNames[toName$get] = null;
		shadowNames[toName$set] = null;
		if ( dataNames ) {
			if ( toName$get in dataNames || toName$set in dataNames ) { throw Error(__dev__.compile_shadow); }
			return function () {};
		}
		return function (            data      ) {
			if ( toName$get in data || toName$set in data ) { throw Error(__dev__.runtime_shadow); }
		};
	}
	else {
		if ( along==='constructor' ) { throw Error(__dev__.proto); }
		if ( along in restNames ) { throw Error(__dev__.compile_shadow); }
		shadowNames[along] = null;
		if ( dataNames ) {
			if ( along in dataNames ) { throw Error(__dev__.compile_shadow); }
			return function () {};
		}
		return function (            data      ) {
			if ( along in data ) { throw Error(__dev__.runtime_shadow); }
		};
	}
}

var Component           = /*#__PURE__*/freeze(/*#__PURE__*/defineProperties(
	function Component () { return that; },
	{
		prototype: {
			configurable: false,
			enumerable: false,
			value: /*#__PURE__*/freeze(create$1(null, {
				_render: {
					enumerable: false,
					get: undefined$1,
					set: function _render (               value                     ) { ( this._ || this.$options ).render = value; },
				},
			})),
		},
		render: {
			enumerable: false,
			get: undefined$1,
			set: function render (value                     ) { ( that ._ || that .$options ).render = value; },
		},
		_: {
			enumerable: false,
			value: function toOptions (                Vue3        , __dev__                                               ) {
				if ( !isComponentConstructor(this) ) { throw Error('!( this extends Component )._()'); }
				var DID_OPTIONS = OPTIONS.objects.into(__dev__ || OPTIONS       ).into(Vue3 || OPTIONS       );
				var TMP_OPTIONS = new OPTIONS.objectsTmp;
				var options = ToOptions(
					this,
					Vue3 || undefined$1,
					__dev__ ? DEV.reduce(function Dev (dev, key) {
						dev[key] = __dev__ [key] || key;
						return dev;
					}, create$1(NULL)                                                ) : null,
					DID_OPTIONS,
					TMP_OPTIONS
				);
				TMP_OPTIONS.forEach (function (optionsValue, constructorKey) { DID_OPTIONS.set(constructorKey, optionsValue); });
				return options;
			},
		},
	}
));

var _mixins                = Symbol && /*#__PURE__*/Symbol('_mixins')                 ;

var __PURE__ = /*#__PURE__*/function () {
	try { return Function('Component,_mixins', '"use strict";return(...mixins)=>class extends Component{constructor(){return Component()}static get[_mixins](){return mixins}}')(Component, _mixins); }
	catch (error) {}
}();

function mixin (          ) {
	return arguments.length
		? /*#__PURE__*/apply$1(__PURE__, null, arguments       )
		: Component;
}

function ToOptions (constructor          , Vue3                   , __dev__                , DID_OPTIONS                               , TMP_OPTIONS                           )             {
	
	var options                         = DID_OPTIONS.get(constructor) || TMP_OPTIONS.get(constructor);
	if ( options ) { return options; }
	OPTIONS.constructor.set(options = create$1(NULL)              , constructor);
	
	if ( isMixins(constructor) ) {
		var static_mixins = constructor[_mixins] ;
		var mixins = new OPTIONS.Set            ();
		var index = 0;
		while ( index!==static_mixins.length ) {
			var mixin = static_mixins[index++];
			if ( isComponentConstructor(mixin) ) {
				var mixinOptions = ToOptions(mixin, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
				if ( isMixins(mixin) ) {
					var mixinMixins = mixinOptions.mixins ;
					var mixinIndex = 0;
					while ( mixinIndex!==mixinMixins.length ) { mixins.add(mixinMixins[mixinIndex++]); }
				}
				else { mixins.add(mixinOptions); }
			}
			else { mixins.add(mixin              ); }
		}
		options.mixins = from(mixins);
		__dev__ && check$1(options, __dev__);
		collectNames(options, constructor);
		TMP_OPTIONS.set(constructor, options);
		return options;
	}
	
	var Super = OPTIONS.super.get(constructor);
	if ( !Super ) {
		OPTIONS.super.set(constructor, Super = getPrototypeOf$1(constructor));
		Super===Component || isMixins(Super) || setPrototypeOf(constructor, Component);
	}
	if ( Super!==Component ) {
		var SuperOptions = ToOptions(Super, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
		isMixins(Super)
			? SuperOptions.mixins .length===1
			? options.extends = SuperOptions.mixins [0]
			: options.mixins = SuperOptions.mixins
			: options.extends = SuperOptions;
	}
	
	__dev__ && getOwnPropertySymbols(constructor).forEach(function (symbol) {
		if ( symbol!==_mixins && !( symbol in SYMBOLS ) ) { throw Error(__dev__.compile_symbol); }
	});
	
	var set                = __dev__ ? devSet.bind(__dev__) : proSet;
	var assertFunction                           = __dev__ ? devAssertFunction.bind(__dev__) : proAssertFunction;
	
	var staticNames = getOwnPropertyNames(constructor);
	index = staticNames.length;
	var shadowAssigner                        = null;
	var skipConstructor = false;
	while ( index ) {
		var staticName = staticNames[--index];
		if ( staticName==='Render' ) { var Render                                  = constructor[staticName]                       ; }
		//@ts-ignore
		else if ( staticName==='name' || staticName==='length' ) {
			descriptor = getOwnPropertyDescriptor(constructor, staticName);
			if ( descriptor.hasOwnProperty('value') ) {
				descriptor.enumerable && set(options, staticName, descriptor.value);
			}
			else {
				set(options, staticName, apply$1(descriptor.get , constructor, ARGS));
			}
		}
		else if ( staticName==='data' ) {
			if ( __dev__ ) {
				if ( constructor[staticName]!==undefined$1 ) { throw Error(isArray(constructor[staticName]) ? __dev__.compile_layout : __dev__.compile_type); }
			}
			skipConstructor = true;
		}
		else if ( staticName!=='prototype' ) {
			if ( __dev__ ) {
				if ( staticName[0]==='_' ) { throw Error(__dev__.compile_reserved); }
				if (
					//@ts-ignore
					staticName==='setup' || staticName==='watch' || staticName==='methods' || staticName==='computed' || staticName==='extends' || staticName==='mixins' ||
					//@ts-ignore
					staticName==='beforeCreated' || staticName==='created' || staticName==='beforeMount' || staticName==='mounted' || staticName==='beforeUpdate' || staticName==='updated' || staticName==='activated' || staticName==='deactivated' || staticName==='beforeUnmount' || staticName==='unmounted' || staticName==='beforeDestroy' || staticName==='destroyed' ||
					//@ts-ignore
					staticName==='inject' || staticName==='props'
				) { throw Error(__dev__.compile_layout); }
			}
			//@ts-ignore
			set(options, staticName, constructor[staticName]);
		}
	}
	
	var prototype = constructor.prototype;
	var protoDescriptors                          = null;
	
	var protoNames = getOwnPropertyNames(prototype);
	index = protoNames.length;
	var watchers            = [];
	var skipData = false;
	var dataNames               = null;
	while ( index ) {
		var protoName = protoNames[--index];
		if ( protoName==='_data' ) {
			var _data = get$1(prototype, protoName, undefined$1);
			if ( _data ) {
				if ( __dev__ ) {
					if ( !isArray(_data) ) { throw Error(__dev__.compile_type); }
					_data.forEach(function (name) {
						if ( typeof name!=='string' ) { throw Error(__dev__.compile_type); }
						if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
					});
					if ( skipConstructor ) { throw Error(__dev__.compile_redefined); }
				}
				var length = _data.length;
				if ( length ) {
					dataNames = create$1(NULL)         ;
					var i = 0;
					do { dataNames[_data[i]] = null; }
					while ( ++i!==length );
					dataNames = assign(create$1(NULL), dataNames);
					__dev__ && OPTIONS.data.set(options, dataNames);
				}
				else {
					skipData = true;
				}
			}
			else {
				if ( __dev__ ) {
					if ( _data!==undefined$1 ) { throw Error(__dev__.compile_type); }
					if ( skipConstructor ) { throw Error(__dev__.compile_redefined); }
				}
				skipConstructor = true;
			}
		}
		else if ( protoName[0]==='_' && !( protoName.startsWith('_watch(') ) ) {
			if ( __dev__ ) {
				var protoName1 = protoName.slice(1);
				if ( protoName1[0]==='_' ) { throw Error(__dev__.compile_reserved); }
				if (
					protoName1==='setup' || protoName1==='watch' || protoName1==='methods' || protoName1==='computed' || protoName1==='extends' || protoName1==='mixins' ||
					protoName1==='emits' || protoName1==='components' || protoName1==='directives' || protoName1==='staticRenderFns' || protoName1==='template' || protoName1==='inheritAttrs' ||
					protoName1==='name' ||
					protoName1==='Render' ||
					protoName1==='delimiters' ||
					protoName1==='filters' || protoName1==='comments' || protoName1==='functional' || protoName1==='propsData' || protoName1==='model'
				) { throw Error(__dev__.compile_layout); }
			}
			set(options, protoName.slice(1), get$1(prototype, protoName, undefined$1));
		}
		else {
			var descriptor                     = getOwnPropertyDescriptor(prototype, protoName);
			if ( protoName[0]==='_' ) {
				var indexOfQ = protoName.lastIndexOf(')');
				var watcher = watchers[watchers.length] = create$1(NULL)           ;
				if ( descriptor.hasOwnProperty('value') ) {
					watcher.$ = protoName.slice(7, indexOfQ).trim();
					watcher.handler = assertFunction(descriptor.value);
				}
				else {
					watcher.$ = assertFunction(descriptor.get);
					watcher.handler = assertFunction(descriptor.set);
				}
				if ( indexOfQ + 1!==protoName.length ) {
					indexOfQ += 2;
					do {
						var indexOfA = protoName.indexOf(';', indexOfQ);
						var pair = indexOfA<0
							? protoName.slice(indexOfQ)
							: protoName.slice(indexOfQ, indexOfA);
						indexOfQ = indexOfA + 1;
						if ( pair ) {
							var indexOfE = pair.indexOf('=');
							indexOfE<0
								? watcher[pair] = true
								: watcher[pair.slice(0, indexOfE)] = pair.slice(indexOfE + 1);
						}
					}
					while ( indexOfQ );
				}
			}
			else if ( protoName[0]==='$' ) {
				( protoDescriptors || ( protoDescriptors = create$1(NULL)                     ) )[protoName] = assign(create$1(NULL), descriptor);
			}
			else {
				if ( descriptor.hasOwnProperty('value') ) {
					if ( protoName!=='constructor' || descriptor.value!==constructor ) {
						( options.methods || ( options.methods = create$1(NULL)                                       ) )[protoName] = assertFunction(descriptor.value);
					}
				}
				else {
					( options.computed || ( options.computed = create$1(NULL)                                        ) )[protoName] = descriptor.set ? {
						get: descriptor.get,
						set: descriptor.set
					} : descriptor.get       ;
				}
			}
		}
	}
	
	var protoSymbols = getOwnPropertySymbols(prototype)                   ;
	if ( ( index = protoSymbols.length ) ) {
		if ( !protoDescriptors ) { protoDescriptors = create$1(NULL)                    ; }
		do {
			var protoSymbol                = protoSymbols[--index];
			protoDescriptors [protoSymbol] = assign(create$1(NULL), getOwnPropertyDescriptor(prototype, protoSymbol));
		}
		while ( index );
	}
	protoDescriptors && OPTIONS.proto.set(options, protoDescriptors = assign(create$1(NULL), protoDescriptors));
	
	__dev__ && check$1(options, __dev__);
	
	var restNames = collectNames(options, constructor);
	
	if ( Render && Vue3 ) {
		var shadow = Render.shadow;
		if ( shadow ) {
			if ( __dev__ ) {
				if ( skipConstructor && skipData ) { throw Error(__dev__.compile_shadow); }
				var shadowNames = create$1(NULL)         ;
				var shadowChecker                            = ShadowChecker(shadow, restNames, dataNames, shadowNames, __dev__);
				OPTIONS.shadow.set(options, shadowNames);
			}
			shadowAssigner = ShadowAssigner(shadow);
		}
		var sheet = Render.sheet;
		if ( sheet ) {
			var watchers2            = [];
			OwnKeys(sheet).forEach(function (                 key, index) {
				var watcher = this[index] = create$1(NULL)           ;
				watcher.$ = assertFunction(sheet [key]);
				watcher.handler = function (            css        ) { ( this.$refs[key]                     ).textContent = css; };
				watcher.immediate = true;
				watcher.flush = 'sync';
			}, watchers2);
			watchers2.reverse();
			var beforeMount = options.beforeMount;
			options.beforeMount = beforeMount
				? function beforeBeforeMount () {
					$watch(this, watchers2);
					return beforeMount .apply(this);
				}
				: function beforeBeforeMount () {
					$watch(this, watchers2);
				};
		}
		options.render = assertFunction(new Render(Vue3 ));
	}
	
	if ( __dev__ ) { options.data = function (self      ) { return devData(self           , protoDescriptors, constructor, Vue3, skipData, dataNames, restNames, shadowAssigner, shadowChecker, skipConstructor, __dev__); }; }
	else if ( skipConstructor || skipData ) ;
	else if ( dataNames ) { options.data = function (self      ) { return proNames(self           , protoDescriptors, constructor, Vue3, dataNames , shadowAssigner); }; }
	else { options.data = function (self      ) { return proData(self           , protoDescriptors, constructor, Vue3, restNames, shadowAssigner); }; }
	
	if ( watchers.length || !__dev__ && ( skipConstructor && protoDescriptors || skipData ) ) {
		watchers.length && watchers.reverse();
		var created = options.created;
		switch ( ( __dev__ ? ( skipConstructor ? 's' : 'n' ) : '_' ) + ( watchers.length ? 'w' : '_' ) + ( created ? 'c' : '_' ) ) {
			case 'swc':
				options.created = function beforeCreated (          ) {
					proProto(this           , protoDescriptors );
					$watch(this, watchers);
					return created .apply(this);
				};
				break;
			case 'sw_':
				options.created = function beforeCreated (          ) {
					proProto(this           , protoDescriptors );
					$watch(this, watchers);
				};
				break;
			case 's_c':
				options.created = function beforeCreated (          ) {
					proProto(this           , protoDescriptors );
					return created .apply(this);
				};
				break;
			case 's__':
				options.created = function beforeCreated (          ) {
					proProto(this           , protoDescriptors );
				};
				break;
			case 'nwc':
				options.created = function beforeCreated (          ) {
					proConstructor(this           , protoDescriptors, constructor, Vue3);
					$watch(this, watchers);
					return created .apply(this);
				};
				break;
			case 'nw_':
				options.created = function beforeCreated (          ) {
					proConstructor(this           , protoDescriptors, constructor, Vue3);
					$watch(this, watchers);
				};
				break;
			case 'n_c':
				options.created = function beforeCreated (          ) {
					proConstructor(this           , protoDescriptors, constructor, Vue3);
					return created .apply(this);
				};
				break;
			case 'n__':
				options.created = function beforeCreated (          ) {
					proConstructor(this           , protoDescriptors, constructor, Vue3);
				};
				break;
			case '_wc':
				options.created = function beforeCreated (          ) {
					$watch(this, watchers);
					return created .apply(this);
				};
				break;
			case '_w_':
				options.created = function beforeCreated (          ) {
					$watch(this, watchers);
				};
				break;
		}
	}
	
	TMP_OPTIONS.set(constructor, options);
	
	//@ts-ignore
	if ( options.components || options.name || options.displayName ) {
		var components = options.components = assign(create$1(NULL), options.components);
		var cases = create$1(NULL)         ;
		//@ts-ignore
		options.name && fixPascal(options.name, cases);
		//@ts-ignore
		options.displayName && fixPascal(options.displayName, cases);
		for ( var pascal in components ) {
			if ( __dev__ ) {
				if ( !pascal || STARTS_WITH_LOWERCASE.test(pascal) ) { throw Error(__dev__.compile_name); }
			}
			var value = components[pascal];
			if ( isComponentConstructor(value) ) { components[pascal] = ToOptions(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS); }
			fixPascal(pascal, cases);
		}
		assign(components, cases, components);
	}
	
	return options;
	
}

var OPTIONS = /*#__PURE__*/function () {
	try {
		return Function('"use strict";\
class EasyMap extends WeakMap{into(key){let sub=this.get(key);sub??this.set(key,sub=new EasyMap);return sub}}EasyMap.prototype.get=WeakMap.prototype.get;EasyMap.prototype.set=WeakMap.prototype.set;\
class StrongMap extends Map{}StrongMap.prototype.get=Map.prototype.get;StrongMap.prototype.set=Map.prototype.set;StrongMap.prototype.forEach=Map.prototype.forEach;\
class StrongSet extends Set{}StrongSet.prototype.add=Set.prototype.add;StrongSet.prototype[Symbol.iterator]=Set.prototype[Symbol.iterator];\
return{objects:new EasyMap,objectsTmp:StrongMap,super:new EasyMap,rest:new EasyMap,data:new EasyMap,proto:new EasyMap,constructor:new EasyMap,shadow:new EasyMap,Set:StrongSet}\
')();
	}
	catch (error) {}
}()     
	                                                                         
	                                                  
	                                   
	                                            
	                                 
	                                             
	                                           
	                                   
	                    
 ;
                                                                                

function isComponentConstructor (value        )                    { return apply$1(isPrototypeOf, Component, [ value ]         ); }

var ARGS = []         ;

var _MIXINS = [ _mixins ]         ;
function isMixins (constructor          ) { return apply$1(hasOwnProperty, constructor, _MIXINS); }

var SYMBOLS = /*#__PURE__*/getOwnPropertyNames(Symbol).reduce(function (SYMBOLS, name) {
	if ( typeof Symbol[name]==='symbol' ) { SYMBOLS[Symbol[name]                 ] = null; }
	return SYMBOLS;
}, create$1(NULL)                         );

function $watch (that      , watchers                    ) {
	var index = watchers.length;
	do {
		var watcher      = watchers[--index];
		that.$watch(watcher.$, watcher.handler, watcher);
	}
	while ( index );
}

                                  
	                  
	             
  
function collectNames (options            , constructor                 )        {
	var restNames                    = OPTIONS.rest.get(options);
	if ( !restNames ) {
		if ( constructor ) { restNames = OPTIONS.rest.get(constructor); }
		if ( !restNames ) {
			restNames = create$1(NAMES);
			var extend = options.extends;
			extend && assign(restNames, collectNames(extend, null));
			var mixins = options.mixins;
			if ( mixins ) { for ( var index = mixins.length; index; ) { assign(restNames, collectNames(mixins[--index], null)); } }
			var props = options.props;
			var name        ;
			if ( isArray(props) ) { for ( index = props.length; index; ) { restNames[props[--index]] = null; } }
			else { for ( name in props ) { restNames[name] = null; } }
			props = options.inject;
			if ( isArray(props) ) { for ( index = props.length; index; ) { restNames[props[--index]] = null; } }
			else { for ( name in props ) { restNames[name] = null; } }
			for ( name in options.methods ) { restNames[name] = null; }
			for ( name in options.computed ) { restNames[name] = null; }
			restNames = assign(create$1(NULL), restNames);
		}
		if ( constructor ) { OPTIONS.rest.set(constructor, restNames); }
		OPTIONS.rest.set(options, restNames);
	}
	return restNames;
}

function proSet    (object                       , name        , value   ) { object[name] = value; }
function devSet    (               object                       , name        , value   ) {
	if ( name in object ) { throw Error(this.compile_redefined); }
	object[name] = value;
}

function proAssertFunction    (fn   ) { return fn                                          ; }
function devAssertFunction    (               fn   ) {
	if ( typeof fn!=='function' ) { throw TypeError(this.compile_type); }
	return fn                                          ;
}

var STARTS_WITH_LOWERCASE = /^[a-z]/;
var CHECKED = WeakMap && /*#__PURE__*/new WeakMap                                                     ();
function forKeys (option                , callback                        ) {
	if ( isArray(option) ) { option.forEach(callback); }
	else { for ( var key in option ) { callback(key); } }
}
function check$1 (options                                                                        , __dev__         )                               {
	
	var belong = OPTIONS.constructor.get(options) || options;
	var ownKeys = CHECKED.get(belong);
	if ( ownKeys ) { return ownKeys; }
	var allKeys = create$1(NULL)                                ;
	
	( options.extends ? [ options.extends ] : [] ).concat(options.mixins || []).forEach(function (mixin) {
		var mixinNames = check$1(mixin, __dev__);
		for ( var name in mixinNames ) {
			if ( name in allKeys && mixinNames[name]!==allKeys[name] ) { throw Error(__dev__.compile_overwrite); }
		}
		assign(allKeys, mixinNames);
	});
	
	ownKeys = create$1(NULL)                                ;
	
	var protoDescriptors = OPTIONS.proto.get(options);
	protoDescriptors && OwnKeys(protoDescriptors).forEach(function (key) {
		ownKeys [key] = belong;
	});
	
	forKeys(options.props, function (name) {
		if ( /-|^(?:key$|[oO][nN]|ref$)/.test(name) ) { throw Error(__dev__.compile_props); }
		if ( name in PROTO_BUG ) { throw Error(__dev__.proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys  ) { throw Error(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	});
	
	forKeys(options.inject, function (name) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys  ) { throw Error(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	});
	
	var name        ;
	
	for ( name in options.methods ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys ) { throw Error(__dev__.compile_redefined); }
		ownKeys[name] = belong;
	}
	
	for ( name in options.computed ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys ) { throw Error(__dev__.compile_redefined); }
		ownKeys[name] = belong;
	}
	
	for ( name in OPTIONS.data.get(options) ) {
		if ( name in ownKeys  ) { throw Error(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	}
	
	for ( name in OPTIONS.shadow.get(options) ) {
		if ( name in ownKeys  ) { throw Error(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	}
	
	if ( 'constructor' in ownKeys ) { throw Error(__dev__.proto); }
	
	OwnKeys(ownKeys).forEach(function (key) {
		if ( key in allKeys ) { throw Error(__dev__.compile_overwrite); }
	});
	assign(allKeys, ownKeys);
	
	[ options.name, options.displayName ].forEach(function (name         ) {
		if ( typeof name==='string'
			? !name || STARTS_WITH_LOWERCASE.test(name) || options.components && options.components[name] && options.components[name]!==options
			: name!==undefined$1
		) { throw Error(__dev__.compile_name); }
	});
	
	options.emits &&
	( isArray(options.emits) ? options.emits : Keys(options.emits) ).forEach(function (event) {
		if ( typeof event==='string' && /^on-?vnode|(?:capture|once|passive)$/.test('on' + event) ) { throw Error(__dev__.compile_emits); }
	});
	
	if (
		options.directives && 'is' in options.directives// 2
		||//@ts-ignore
		options.props && ( isArray(options.props) ? options.props.includes('is') : 'is' in options.props )// 3
	) { throw Error(__dev__.compile_is); }
	
	CHECKED.set(belong, allKeys);
	return allKeys;
	
}

var UPPER = /[A-Z]/;
function fixPascal (pascal        , cases       ) {
	var First = pascal[0];
	var first = First.toLowerCase();
	var rest = pascal.slice(1);
	cases[first + rest] = null;
	hyphenate(first, rest, cases);
	first===First || hyphenate(First, rest, cases);
}
function hyphenate (before        , after        , cases       ) {
	var index = after.search(UPPER);
	if ( index<0 ) { cases[before + after] = null; }
	else {
		if ( index ) { before += after.slice(0, index); }
		var char = after[index];
		after = after.slice(index + 1);
		hyphenate(before + '-' + char.toLowerCase(), after, cases);
		hyphenate(before + '-' + char, after, cases);
		before[before.length - 1]==='-' || hyphenate(before + char, after, cases);
	}
}

var DEV = [
	'proto',
	'compile_name',
	'compile_props',
	'compile_emits',
	'compile_is',
	'compile_layout',
	'compile_reserved',
	'compile_redefined',
	'compile_overwrite',
	'compile_type',
	'compile_symbol',
	'compile_shadow',
	'runtime_shadow',
	'runtime_redefined',
	'runtime_symbol',
	'runtime_reserved',
	'runtime_enumerable',
	'runtime_data',
]         ;

var prop = /*#__PURE__*/freeze(create$1(NULL, {
	beforeMount: {
		enumerable: true,
		value: function beforeMount (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
	bind: {
		enumerable: true,
		value: function bind (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
	updated: {
		enumerable: true,
		value: function updated (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
	componentUpdated: {
		enumerable: true,
		value: function componentUpdated (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
}));

var _export$1 = Default$1({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
	prop: prop,
});

export default _export$1;
export { Component, Identifier, Render, Scope, StaticRenderFns, Style, Template, mixin, prop, remove, version };

/*¡ j-vue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIi4uLy4uL2xpYi9jc3Mta2V5d29yZHMvZGlzdC5qcyIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvdmVyc2lvbj90ZXh0IiwiLi4vLi4vLi4vai1yZWdleHAvc3JjL25ld1JlZ0V4cC50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9jbGVhclJlZ0V4cC50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9ncm91cGlmeS50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9leHBvcnQudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvRHluYW1pY1Njb3BlLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCJDb21wb25lbnQsIG1peGluL0RhdGEudHMiLCJDb21wb25lbnQsIG1peGluL1NoYWRvdy50cyIsIkNvbXBvbmVudCwgbWl4aW4vLnRzIiwidi1wcm9wLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0JzE5LjAuMCc7IiwiZXhwb3J0IGRlZmF1bHQgW1xuXHQnYWxsJyxcblx0J2xhbycsXG5cdCdhdXRvJyxcblx0J2Rpc2MnLFxuXHQnbm9uZScsXG5cdCdzcGFuJyxcblx0J3RoYWknLFxuXHQna2htZXInLFxuXHQnb3JpeWEnLFxuXHQndGFtaWwnLFxuXHQndW5zZXQnLFxuXHQnY2lyY2xlJyxcblx0J2hlYnJldycsXG5cdCdpbmxpbmUnLFxuXHQncmV2ZXJ0Jyxcblx0J3NxdWFyZScsXG5cdCd0ZWx1Z3UnLFxuXHQnYmVuZ2FsaScsXG5cdCdkZWNpbWFsJyxcblx0J2RlZmF1bHQnLFxuXHQnaW5oZXJpdCcsXG5cdCdpbml0aWFsJyxcblx0J2thbm5hZGEnLFxuXHQnbXlhbm1hcicsXG5cdCdvdXRzaWRlJyxcblx0J3BlcnNpYW4nLFxuXHQndGliZXRhbicsXG5cdCdhcm1lbmlhbicsXG5cdCdjb250ZW50cycsXG5cdCdnZW9yZ2lhbicsXG5cdCdndWphcmF0aScsXG5cdCdndXJtdWtoaScsXG5cdCdoaXJhZ2FuYScsXG5cdCdrYXRha2FuYScsXG5cdCdjYW1ib2RpYW4nLFxuXHQnbWFsYXlhbGFtJyxcblx0J21vbmdvbGlhbicsXG5cdCdkZXZhbmFnYXJpJyxcblx0J25vdHJhbnNsYXRlJyxcbl07IiwiaW1wb3J0IENTU19LRVlXT1JEUyBmcm9tICdsaWI6Y3NzLWtleXdvcmRzJztcblxudmFyIGluY3JlYXNlRGljdGlvbmFyeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBsYXRlc3RJZGVudGlmaWVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbICc5JyBdO1xudmFyIGxhc3RDaGFyYWN0ZXIgICAgICAgICAgICAgICAgICAgICAgICA9ICc5JztcbnZhciBsYXN0SW5kZXggICAgICAgICA9IDA7XG5cbnZhciBjc3Nfa2V5d29yZCAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGxhdGVzdElkZW50aWZpZXIuam9pbiA9IGxhdGVzdElkZW50aWZpZXIuam9pbjtcblx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0ID0gbGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0O1xuXHRDU1NfS0VZV09SRFMuc2hpZnQgPSBDU1NfS0VZV09SRFMuc2hpZnQ7XG5cdHJldHVybiBDU1NfS0VZV09SRFMuc2hpZnQoKSA7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIElkZW50aWZpZXIgKCkgICAgICAgICB7XG5cdFxuXHRpZiAoIGxhc3RDaGFyYWN0ZXI9PT0neicgKSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggICAgICAgICA9IGxhc3RJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICAgICAgICAgICAgICAgICA9IGxhdGVzdElkZW50aWZpZXJbLS1jaGFyYWN0ZXJJbmRleF07XG5cdFx0XHRcdGlmICggY2hhcmFjdGVyPT09J3onICkgeyBsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtjaGFyYWN0ZXJdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0KCdhJyk7XG5cdFx0XHRcdCsrbGFzdEluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0dmFyIGlkZW50aWZpZXIgICAgICAgICA9IGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdGlmICggaWRlbnRpZmllcj09PWNzc19rZXl3b3JkICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3RlciAgICAgICAgICAgICBdO1xuXHRcdGlkZW50aWZpZXIgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRcdGNzc19rZXl3b3JkID0gQ1NTX0tFWVdPUkRTLnNoaWZ0KCkgfHwgbnVsbDtcblx0fVxuXHRyZXR1cm4gaWRlbnRpZmllcjtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJleHBvcnQgZGVmYXVsdCc4LjAuMCc7IiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBSRUdFWFAgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcblxudmFyIHRlc3RfYmluZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHRlc3QuYmluZCA/IC8qI19fUFVSRV9fKi90ZXN0LmJpbmQuYmluZCh0ZXN0ICAgICAgICkgICAgICAgIDogZnVuY3Rpb24gKHJlICAgICAgICApIHsgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpOyB9OyB9O1xudmFyIGV4ZWNfYmluZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGV4ZWMuYmluZCA/IC8qI19fUFVSRV9fKi9leGVjLmJpbmQuYmluZChleGVjICAgICAgICkgICAgICAgIDogZnVuY3Rpb24gKHJlICAgICAgICApIHsgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gZXhlYy5jYWxsKHJlLCBzdHJpbmcpOyB9OyB9O1xudmFyIHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyAvKiNfX1BVUkVfXyovZ2V0T3duUHJvcGVydHlTeW1ib2xzKFJFR0VYUCkucmV2ZXJzZSgpIDogbnVsbDtcbnZhciB2YWx1ZXMgPSBzeW1ib2xzICYmIC8qI19fUFVSRV9fKi9zeW1ib2xzLm1hcChmdW5jdGlvbiAoc3ltYm9sKSB7IHJldHVybiBSRUdFWFBbc3ltYm9sXTsgfSk7XG5cbnZhciBOVCA9IC9bXFxuXFx0XS9nO1xudmFyIFNFQVJDSF9FU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIHJhdyA9IHRlbXBsYXRlLnJhdztcblx0dmFyIHNvdXJjZSA9IHJhd1swXTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHZhciBpbmRleCA9IDE7XG5cdHZhciB2YWx1ZSAgICAgICAgICAgICAgICAgO1xuXHRpZiAoIHRoaXMuVSApIHtcblx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRcdHZhbHVlID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRcdHNvdXJjZSArPSAoIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnID8gdmFsdWUgOiB0aGlzLmNoZWNrKHZhbHVlKSApICsgcmF3W2luZGV4KytdO1xuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRcdHZhbHVlID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRcdHNvdXJjZSArPSAoIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnID8gdmFsdWUgOiB0aGlzLmNoZWNrKHZhbHVlKSApICsgcmF3W2luZGV4KytdLnJlcGxhY2UoU0VBUkNIX0VTQ0FQRSwgZ3JhdmVBY2NlbnRSZXBsYWNlcik7XG5cdFx0fVxuXHR9XG5cdHZhciByZSA9IFJlZ0V4cChzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShOVCwgJycpLCB0aGlzLmZsYWdzKTtcblx0dGhpcy5hZGRvbihyZS50ZXN0ID0gdGVzdF9iaW5kKHJlKSwgcmUuZXhlYyA9IGV4ZWNfYmluZChyZSksIHNvdXJjZSk7XG5cdGlmICggc3ltYm9scyApIHtcblx0XHRpbmRleCA9IHN5bWJvbHMubGVuZ3RoO1xuXHRcdHdoaWxlICggaW5kZXggKSB7IHJlW3N5bWJvbHNbLS1pbmRleF1dID0gdmFsdWVzIFtpbmRleF07IH1cblx0fVxuXHRyZXR1cm4gcmU7XG59XG5cbmZ1bmN0aW9uIGNoZWNrICggICAgICAgICAgICAgICByZSAgICAgICAgKSB7XG5cdHZhciBzb3VyY2UgPSByZS5zb3VyY2U7XG5cdGlmICggIXNvdXJjZSApIHsgdGhyb3cgVHlwZUVycm9yKHR5cGVvZiByZSk7IH1cblx0aWYgKCByZS51bmljb2RlPT09dGhpcy5VICkgeyB0aHJvdyBTeW50YXhFcnJvcigndW5pY29kZScpOyB9XG5cdGlmICggcmUuaWdub3JlQ2FzZT09PXRoaXMuSSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ2lnbm9yZUNhc2UnKTsgfVxuXHRpZiAoIHJlLm11bHRpbGluZT09PXRoaXMuTSAmJiAoIHNvdXJjZS5pbmRleE9mKCdeJyk+PTAgfHwgc291cmNlLmluZGV4T2YoJyQnKT49MCApICkgeyB0aHJvdyBTeW50YXhFcnJvcignbXVsdGlsaW5lJyk7IH1cblx0aWYgKCByZS5kb3RBbGw9PT10aGlzLlMgJiYgc291cmNlLmluZGV4T2YoJy4nKT49MCApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ2RvdEFsbCcpOyB9XG5cdHJldHVybiBzb3VyY2U7XG59XG5cbmZ1bmN0aW9uIGFkZG9uICggICAgICAgICAgICAgICB0ZXN0ICAgICAgICwgZXhlYyAgICAgICAsIHNvdXJjZSAgICAgICAgKSB7XG5cdHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSBzb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHRoaXMuVTtcblx0dGVzdC5pZ25vcmVDYXNlID0gZXhlYy5pZ25vcmVDYXNlID0gdGhpcy5JO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gc291cmNlLmluZGV4T2YoJ14nKTwwICYmIHNvdXJjZS5pbmRleE9mKCckJyk8MCA/IG51bGwgOiB0aGlzLk07XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBzb3VyY2UuaW5kZXhPZignLicpPDAgPyBudWxsIDogdGhpcy5TO1xufVxuXG52YXIgQ09OVEVYVCAgICAgICAgICA9IHtcblx0ZmxhZ3M6ICcnLFxuXHRVOiB0cnVlLFxuXHRJOiB0cnVlLFxuXHRNOiB0cnVlLFxuXHRTOiB0cnVlLFxuXHRjaGVjazogY2hlY2ssXG5cdGFkZG9uOiBhZGRvblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmV3UmVnRXhwIChmbGFnc190ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdGlmICggdHlwZW9mIGZsYWdzX3RlbXBsYXRlPT09J3N0cmluZycgKSB7XG5cdFx0dmFyIGNvbnRleHQgICAgICAgICAgPSB7XG5cdFx0XHRmbGFnczogZmxhZ3NfdGVtcGxhdGUsXG5cdFx0XHRVOiAvKiNfX1BVUkVfXyovIGZsYWdzX3RlbXBsYXRlLmluZGV4T2YoJ3UnKTwwLFxuXHRcdFx0STogLyojX19QVVJFX18qLyBmbGFnc190ZW1wbGF0ZS5pbmRleE9mKCdpJyk8MCxcblx0XHRcdE06IC8qI19fUFVSRV9fKi8gZmxhZ3NfdGVtcGxhdGUuaW5kZXhPZignbScpPDAsXG5cdFx0XHRTOiAvKiNfX1BVUkVfXyovIGZsYWdzX3RlbXBsYXRlLmluZGV4T2YoJ3MnKTwwLFxuXHRcdFx0Y2hlY2s6IGNoZWNrLFxuXHRcdFx0YWRkb246IGFkZG9uXG5cdFx0fTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gbmV3UmVnRXhwICh0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAge1xuXHRcdFx0cmV0dXJuIC8qI19fUFVSRV9fKi8gYXBwbHkoUkUsIGNvbnRleHQsIGFyZ3VtZW50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gLyojX19QVVJFX18qLyBhcHBseShSRSwgQ09OVEVYVCwgYXJndW1lbnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdHZhciBSRUdFWFAgPSAvXi87XG5cdFx0UkVHRVhQLnRlc3QgPSBSRUdFWFAudGVzdDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBTVVJST0dBVEVfUEFJUi50ZXN0KGJyYW5jaCkgPyBicmFuY2guc2xpY2UoMCwgMikgOiBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZFBvaW50QnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZShjaGFyYWN0ZXIubGVuZ3RoKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZSgxKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIHNvdXJjaWZ5IChncm91cCAgICAgICAsIG5lZWRFc2NhcGUgICAgICAgICApICAgICAgICAge1xuXHR2YXIgYnJhbmNoZXMgICAgICAgICAgID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoICAgICAgICAgICA9IFtdO1xuXHR2YXIgbm9FbXB0eUJyYW5jaCAgICAgICAgICA9IHRydWU7XG5cdGZvciAoIHZhciBjaGFyYWN0ZXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyYWN0ZXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzICAgICAgICAgPSBzb3VyY2lmeShncm91cFtjaGFyYWN0ZXJdLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyYWN0ZXIpICkgeyBjaGFyYWN0ZXIgPSAnXFxcXCcrY2hhcmFjdGVyOyB9XG5cdFx0XHRzdWJfYnJhbmNoZXMgPyBicmFuY2hlcy5wdXNoKGNoYXJhY3RlcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXJhY3Rlcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IG5ld1JlZ0V4cCBmcm9tICcuL25ld1JlZ0V4cCc7XG5pbXBvcnQgY2xlYXJSZWdFeHAgZnJvbSAnLi9jbGVhclJlZ0V4cCc7XG5pbXBvcnQgZ3JvdXBpZnkgZnJvbSAnLi9ncm91cGlmeSc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdG5ld1JlZ0V4cCxcblx0Y2xlYXJSZWdFeHAsXG5cdGdyb3VwaWZ5LFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQ/PSc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0bmV3UmVnRXhwOiBuZXdSZWdFeHAsXG5cdGNsZWFyUmVnRXhwOiBjbGVhclJlZ0V4cCxcblx0Z3JvdXBpZnk6IGdyb3VwaWZ5XG59KTtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbD8nO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG52YXIgXyAgICAgID0gU3ltYm9sID8gLyojX19QVVJFX18qL1N5bWJvbCgnXycpICAgICAgICA6ICdfJztcblxuZnVuY3Rpb24gJCAgICAgICAgICAgICAgICAgICggICAgICAgICBjc3MgICAgICAgICAsIG1lZGlhICAgICAgICAgKSAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXNbX10oY3NzKTsgfVxuXHRpZiAoIG1lZGlhIT09dW5kZWZpbmVkICkgeyBzdHlsZS5tZWRpYSA9IG1lZGlhOyB9XG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IHsgXywgJCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgcHJlcGFyZV8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB0eXBlb2YgXz09PSdzeW1ib2wnID8gbnVsbCA6IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHZhciBfZGVzY3JpcHRvciA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICA7XG5cdF9kZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0X2Rlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXHRfZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0cmV0dXJuIGZ1bmN0aW9uICQgKHNjb3BlICAgICAgICkgeyBkZWZpbmVQcm9wZXJ0eShzY29wZSwgXywgX2Rlc2NyaXB0b3IpOyB9O1xufSgpO1xuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIFJlZ0V4cCgnX18nICsgZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpICsgJ19fJywgJ2cnKTsgfVxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkgeyByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07IH1cblxudmFyIFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbnZhciBTQ09QRSAgICAgICAgICAgICAgPSBTdGF0aWNTY29wZS5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdCQ6IHsgdmFsdWU6ICQsIHdyaXRhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSxcbn0pICAgICAgICAgICAgICAgKTtcblxudmFyIEluaGVyaXRlZFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfICYmIHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKCAqL1xuXHRcdGtleXNba2V5cy5sZW5ndGhdID0ga2V5LyogKSovO1xuXHR9XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgeyBTdGF0aWNTY29wZSwgU0NPUEUsIEluaGVyaXRlZFN0YXRpY1Njb3BlIH07XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImV4cG9ydCBkZWZhdWx0IC9bXlxceDAwLUBbLWB7LVxceDdGXFxzXVteXFx4MDAtLzotQFstYHstXFx4N0ZcXHNdKig/Ol9bXlxceDAwLS86LUBbLWB7LVxceDdGXFxzXSspKi9nOyIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5cbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IFN0YXRpY1Njb3BlIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIF9fS0VZX18gPSBSZWdFeHAoJ19fJyArIEtFWVMuc291cmNlICsgJ19fJywgJ2cnKTtcblxuZnVuY3Rpb24gZ2V0IChjYWNoZSAgICAgICAgICAgICAsIGtleSAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGNhY2hlW2tleV0gfHwgKCBjYWNoZVtrZXldID0gSWRlbnRpZmllcigpICk7IH1cblxuZnVuY3Rpb24gc2NvcGlmeSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgLCBjYWNoZSAgICAgICAgICAgICApICAgICAgICAge1xuXHR2YXIga2V5cyAgICAgICAgLFxuXHRcdGluZGV4ICAgICAgICAsXG5cdFx0dmFsdWVzICAgICAgICAgICxcblx0XHRrZXkgICAgICAgIDtcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBnZXQoY2FjaGUsIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWUuc3BsaXQoJyAnKTtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlcy5sZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlWy0taW5kZXhdO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBnZXQoY2FjaGUsIGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVstLWluZGV4XSwgY2FjaGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtrZXldICkgeyBrZXlzICs9ICcgJytnZXQoY2FjaGUsIGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIER5bmFtaWNTY29wZSAoY2FjaGUgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlID0gZnVuY3Rpb24gc2NvcGUgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7XG5cdFx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0aWYgKCBsZW5ndGg+MSApIHtcblx0XHRcdHZhbHVlID0gWyB2YWx1ZSwgYXJndW1lbnRzWzFdIF07XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggPSAyOyBpbmRleCE9PWxlbmd0aDsgKytpbmRleCApIHsgKCB2YWx1ZSAgICAgICAgICApW2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleF07IH1cblx0XHR9XG5cdFx0cmV0dXJuIHNjb3BpZnkodmFsdWUsIGNhY2hlKTtcblx0fSAgICAgICAgICAgICAgICA7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX19LRVlfXywgX3JlcGxhY2VyKTsgfTtcblx0ZnVuY3Rpb24gX3JlcGxhY2VyIChfX2tleV9fICAgICAgICApICAgICAgICAgeyByZXR1cm4gZ2V0KGNhY2hlLCBfX2tleV9fLnNsaWNlKDIsIC0yKSk7IH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG5leHBvcnQgeyBEeW5hbWljU2NvcGUgYXMgZGVmYXVsdCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBTdGF0aWNTY29wZSwgSW5oZXJpdGVkU3RhdGljU2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgRHluYW1pY1Njb3BlIGZyb20gJy4vRHluYW1pY1Njb3BlJztcbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5cbnZhciBFTVBUWSAgICAgICAgICAgPSBbXTtcblxuZnVuY3Rpb24gbWl4IChwcm90b3MgICAgICAgICApICAgICAgICAgICAgICB7XG5cdHZhciBzY29wZSAgICAgICAgICAgICAgPSBjcmVhdGUoU0NPUEUpO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBwcm90b3MubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgcHJvdG8gICAgICAgID0gcHJvdG9zW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiBwcm90bz09PSdmdW5jdGlvbicgKSB7IHByb3RvID0gcHJvdG8ucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZnVuY3Rpb24gU2NvcGUgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICApICAgICAgICB7XG5cdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBEeW5hbWljU2NvcGUobWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSAgICAgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG59XG5TY29wZS5wcm90b3R5cGUgPSBudWxsICAgICAgIDtcblxuZXhwb3J0IHsgU2NvcGUgYXMgZGVmYXVsdCwgS0VZUyB9OyIsImltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCAgICAgICAgLCBzY29wZSAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qL3Njb3BlW19dKGh0bWwpO1xufVxuXG5leHBvcnQgeyBUZW1wbGF0ZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG52YXIgTk9UX0VTNSA9IC9eKGNvbnN8bGUpdCAvO1xuXG5mdW5jdGlvbiBXaXRoU3RyaXBwZWQgKHJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZTtcblx0cmV0dXJuIHJlbmRlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyIChjb2RlICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRyZXR1cm4gY29kZVswXT09PScoJ1xuXHRcdD8gLyojX19QVVJFX18qL0Z1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm4gY2xhc3MgUmVuZGVyIGV4dGVuZHMgbnVsbHtjb25zdHJ1Y3RvcicrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfTsnKSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdDogLyojX19QVVJFX18qL1dpdGhTdHJpcHBlZChcblx0XHRcdC8qI19fUFVSRV9fKi9GdW5jdGlvbihOT1RfRVM1LnRlc3QoY29kZSlcblx0XHRcdFx0PyAnXCJ1c2Ugc3RyaWN0XCI7cmV0dXJue3JlbmRlcigpeycrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfX0ucmVuZGVyOydcblx0XHRcdFx0OiAnXCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uIHJlbmRlcigpeycrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfTsnXG5cdFx0XHQpKCkgICAgICAgICAgXG5cdFx0KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBTdGF0aWNSZW5kZXJGbnMgKGNvZGVzICAgICAgICAgICAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgIHtcblx0dmFyIGluZGV4ICAgICAgICAgPSBjb2Rlcy5sZW5ndGg7XG5cdHZhciBib2R5ICAgICAgICAgPSAnXSc7XG5cdGlmICggc2NvcGUgKSB7XG5cdFx0Zm9yICggdmFyIHNjb3BlXyA9IHNjb3BlW19dOyBpbmRleDsgKSB7IGJvZHkgPSAnZnVuY3Rpb24oKXsnK3Njb3BlXyhjb2Rlc1stLWluZGV4XSkrJ30sJytib2R5OyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleCApIHsgYm9keSA9ICdmdW5jdGlvbigpeycrY29kZXNbLS1pbmRleF0rJ30sJytib2R5OyB9XG5cdH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bJytib2R5KSgpO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3R5bGUgKGNzcyAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlW19dKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IEtleXMgZnJvbSAnLk9iamVjdC5rZXlzJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXM/JztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24/JztcbmltcG9ydCBnZXRQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LmdldFByb3RvdHlwZU9mJztcbmltcG9ydCBwcm9wZXJ0eUlzRW51bWVyYWJsZSBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSc7XG5pbXBvcnQgZXJyb3IgZnJvbSAnLmNvbnNvbGUuZXJyb3InO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmV4cG9ydCB2YXIgdGhhdCAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG5leHBvcnQgdmFyIE5BTUVTID0gYXNzaWduICYmIC8qI19fUFVSRV9fKi9hc3NpZ24oY3JlYXRlKG51bGwpLCB7XG5cdF86IG51bGwsXG5cdF9jOiBudWxsLFxuXHRfY29tcHV0ZWRXYXRjaGVyczogbnVsbCxcblx0X2RhdGE6IG51bGwsXG5cdF9kaXJlY3RJbmFjdGl2ZTogbnVsbCxcblx0X2V2ZW50czogbnVsbCxcblx0X2hhc0hvb2tFdmVudDogbnVsbCxcblx0X2hhc01vdmU6IG51bGwsXG5cdF9pbmFjdGl2ZTogbnVsbCxcblx0X2lzQmVpbmdEZXN0cm95ZWQ6IG51bGwsXG5cdF9pc0Rlc3Ryb3llZDogbnVsbCxcblx0X2lzTW91bnRlZDogbnVsbCxcblx0X2lzVnVlOiBudWxsLFxuXHRfbGVhdmluZzogbnVsbCxcblx0X25hbWU6IG51bGwsXG5cdF9wcm9wczogbnVsbCxcblx0X3Byb3ZpZGVkOiBudWxsLFxuXHRfcmVmbG93OiBudWxsLFxuXHRfcmVuZGVyUHJveHk6IG51bGwsXG5cdF9zZWxmOiBudWxsLFxuXHRfc3RhdGljVHJlZXM6IG51bGwsXG5cdF91aWQ6IG51bGwsXG5cdF91cGRhdGU6IG51bGwsXG5cdF92bm9kZTogbnVsbCxcblx0X3dhdGNoZXI6IG51bGwsXG5cdF93YXRjaGVyczogbnVsbCxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvUHJvdG8gKHNlbGYgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHRkZWZpbmVQcm9wZXJ0aWVzKF8gPyBfLmN0eCA6IHNlbGYsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb0NvbnN0cnVjdG9yIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIGRlZmluZVByb3BlcnRpZXMoY3R4LCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb05hbWVzIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgZGF0YU5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIGRlZmluZVByb3BlcnRpZXMoY3R4LCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0dmFyIGRhdGEgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBkYXRhTmFtZXMpICAgICAgICA7XG5cdGlmICggXyApIHtcblx0XHR2YXIgYWNjZXNzQ2FjaGUgPSBfLmFjY2Vzc0NhY2hlO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIGRhdGFOYW1lcyApIHtcblx0XHRcdGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRcdGlmICggbmFtZSBpbiBhY2Nlc3NDYWNoZSApIHsgYWNjZXNzQ2FjaGVbbmFtZSAgICAgICAgICAgICAgICAgXSA9IHVuZGVmaW5lZDsgfVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRmb3IgKCBuYW1lIGluIGRhdGFOYW1lcyApIHsgZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdOyB9XG5cdH1cblx0c2hhZG93QXNzaWduZXIgJiYgc2hhZG93QXNzaWduZXIoc2VsZiwgZGF0YSk7XG5cdHJldHVybiBkYXRhO1xuXHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb0RhdGEgKHNlbGYgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHR2YXIgZGF0YSA9IGNyZWF0ZShOVUxMKSAgICAgICAgO1xuXHRpZiAoIF8gKSB7XG5cdFx0dmFyIGFjY2Vzc0NhY2hlID0gXy5hY2Nlc3NDYWNoZTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBjdHggKSB7XG5cdFx0XHRpZiAoICEoIG5hbWUgaW4gcmVzdE5hbWVzICkgJiYgbmFtZVswXSE9PSckJyApIHtcblx0XHRcdFx0ZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdO1xuXHRcdFx0XHRpZiAoIG5hbWUgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmFyIG5vd05hbWVzID0gS2V5cyhjdHgpO1xuXHRcdHZhciBpbmRleCA9IG5vd05hbWVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdFx0bmFtZSA9IG5vd05hbWVzWy0taW5kZXhdO1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIHJlc3ROYW1lcyApICYmIG5hbWVbMF0hPT0nJCcgKSB7IGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTsgfVxuXHRcdH1cblx0fVxuXHRzaGFkb3dBc3NpZ25lciAmJiBzaGFkb3dBc3NpZ25lcihzZWxmLCBkYXRhKTtcblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV2RGF0YSAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIHNraXBEYXRhICAgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICwgc2hhZG93Q2hlY2tlciAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc2tpcENvbnN0cnVjdG9yICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdGZvciAoIHZhciBuYW1lIGluIGN0eCApIHtcblx0XHRpZiAoIG5hbWVbMF09PT0nXycgJiYgISggbmFtZSBpbiBOQU1FUyApICkge1xuXHRcdFx0ZXJyb3IoRXJyb3IoJ1tqVnVlIGJ1Z106IHZtLicgKyBuYW1lICsgJyBpcyB1bmtub3duIGJ1dCBleGlzdHMnKSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0dmFyIG9sZERlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhjdHgpLCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0aWYgKCBwcm90b0Rlc2NyaXB0b3JzICkge1xuXHRcdGZvciAoIHZhciAkbmFtZSBpbiBwcm90b0Rlc2NyaXB0b3JzICkgeyBpZiAoICRuYW1lIGluIGN0eCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3Jlc2VydmVkKTsgfSB9XG5cdFx0ZGVmaW5lUHJvcGVydGllcyhjdHgsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHR9XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdG93bktleXMob2xkRGVzY3JpcHRvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciBvbGREZXNjcmlwdG9yID0gb2xkRGVzY3JpcHRvcnNba2V5XSA7XG5cdFx0dmFyIG5ld0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBrZXkgICAgICAgICAgICAgICAgICk7XG5cdFx0aWYgKFxuXHRcdFx0IW5ld0Rlc2NyaXB0b3IgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlIT09b2xkRGVzY3JpcHRvci5jb25maWd1cmFibGUgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuZW51bWVyYWJsZSE9PW9sZERlc2NyaXB0b3IuZW51bWVyYWJsZSB8fFxuXHRcdFx0KCBuZXdEZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0PyBuZXdEZXNjcmlwdG9yLnZhbHVlIT09b2xkRGVzY3JpcHRvci52YWx1ZSB8fCBuZXdEZXNjcmlwdG9yLndyaXRhYmxlIT09b2xkRGVzY3JpcHRvci53cml0YWJsZVxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdDogbmV3RGVzY3JpcHRvci5nZXQhPT1vbGREZXNjcmlwdG9yLmdldCB8fCBuZXdEZXNjcmlwdG9yLnNldCE9PW9sZERlc2NyaXB0b3Iuc2V0XG5cdFx0XHQpXG5cdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdH0pO1xuXHR2YXIgZGlmS2V5cyAgICAgICAgICAgICAgICAgICAgICAgID0gb3duS2V5cyhjdHgpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmV0dXJuICEoIGtleSBpbiBvbGREZXNjcmlwdG9ycyApO1xuXHR9KTtcblx0aWYgKCBza2lwQ29uc3RydWN0b3IgKSB7XG5cdFx0aWYgKCBkaWZLZXlzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdH1cblx0dmFyIGRpZk5hbWVzID0gZGlmS2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB0eXBlb2Yga2V5PT09J3N0cmluZycgJiYga2V5WzBdIT09JyQnO1xuXHR9KTtcblx0aWYgKCBza2lwRGF0YSApIHtcblx0XHRpZiAoIGRpZk5hbWVzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdH1cblx0aWYgKCBkYXRhTmFtZXMgKSB7XG5cdFx0dmFyIGNvdW50ID0gMDtcblx0XHRmb3IgKCBuYW1lIGluIGRhdGFOYW1lcyApIHsgKytjb3VudDsgfVxuXHRcdGlmICggY291bnQhPT1kaWZOYW1lcy5sZW5ndGggKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9kYXRhKTsgfVxuXHRcdGRpZk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdGlmICggISggbmFtZSBpbiBkYXRhTmFtZXMgKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0fSk7XG5cdH1cblx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoICAgICAgICAgICAgICBuYW1lKSB7XG5cdFx0aWYgKCBuYW1lIGluIHRoaXMgJiYgISggbmFtZSBpbiB7fSApIHx8IG5hbWUgaW4gcmVzdE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVkZWZpbmVkKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZT09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChjdHgsIG5hbWUpKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9lbnVtZXJhYmxlKTsgfVxuXHR9LCBnZXRQcm90b3R5cGVPZihjdHgpKTtcblx0XG5cdHZhciBkYXRhID0gY3JlYXRlKE5VTEwpICAgICAgICA7XG5cdGRpZk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHQoIGRhdGEgICAgICAgICApW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0aWYgKCBfICYmIG5hbWUgaW4gXy5hY2Nlc3NDYWNoZSApIHsgXy5hY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdH0pO1xuXHRpZiAoIHNoYWRvd0Fzc2lnbmVyICkge1xuXHRcdHNoYWRvd0NoZWNrZXIgKGRhdGEpO1xuXHRcdHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHR9XG5cdHJldHVybiBkYXRhO1xuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgSU5JVCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHZhciBJTklUID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgO1xuXHRJTklULm1vZGUgPSAnb3Blbic7XG5cdHJldHVybiBJTklUO1xufSgpO1xuXG5mdW5jdGlvbiBhdHRhY2ggKCAgICAgICAgICAgIGVsICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICB7IHJldHVybiBlbCAmJiAoIGVsLnNoYWRvd1Jvb3QgfHwgZWwuYXR0YWNoU2hhZG93KElOSVQpICk7IH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGZ1bmN0aW9uIFNoYWRvd0Fzc2lnbmVyICggICAgICAgICAgICBhbG9uZyAgICAgICAgKSAgICAgICAgICAgICAgICAge1xuXHR2YXIgaW5kZXggPSBhbG9uZy5pbmRleE9mKCcuJyk7XG5cdHZhciBuYW1lcyA9IGluZGV4PDAgPyBudWxsIDogYWxvbmcuc2xpY2UoaW5kZXggKyAxKS5zcGxpdCgnLicpO1xuXHR2YXIgdG9OYW1lID0gbmFtZXMgPyBhbG9uZy5zbGljZSgwLCBpbmRleCkgOiBhbG9uZztcblx0aWYgKCBuYW1lcyApIHtcblx0XHRpZiAoIG5hbWVzLmxlbmd0aD09PTEgKSB7XG5cdFx0XHR2YXIgbmFtZSRnZXQgPSBuYW1lc1swXSArICckZ2V0Jztcblx0XHRcdHZhciBuYW1lJHNldCA9IG5hbWVzWzBdICsgJyRzZXQnO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdGFsbFtuYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWUkZ2V0XSA9IGF0dGFjaChlbCk7IH07XG5cdFx0XHRcdGFsbFtuYW1lJGdldF0gPSBudWxsO1xuXHRcdFx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgICAgICAgICAgICAgICAgICAgICAsIGRhdGEgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdHZhciBhbGwgPSBkYXRhW3RvTmFtZV0gPSBjcmVhdGUoTlVMTCkgICAgICAgO1xuXHRcdFx0XHRuYW1lcyAuZm9yRWFjaChmdW5jdGlvbiAobmFtZSAgICAgICAgKSB7XG5cdFx0XHRcdFx0YWxsW25hbWUgKyAnJHNldCddID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGVsICAgICAgICAgICAgICAgICAgICApIHsgc2VsZlt0b05hbWVdIFtuYW1lXSA9IGF0dGFjaChlbCk7IH07XG5cdFx0XHRcdFx0YWxsW25hbWUgKz0gJyRnZXQnXSA9IG51bGw7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR2YXIgdG9OYW1lJGdldCA9IHRvTmFtZSArICckZ2V0Jztcblx0XHR2YXIgdG9OYW1lJHNldCA9IHRvTmFtZSArICckc2V0Jztcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICwgZGF0YSAgICAgKSB7XG5cdFx0XHRkYXRhW3RvTmFtZSRzZXRdID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGVsICAgICAgICAgICAgICAgICAgICApIHsgc2VsZlt0b05hbWUkZ2V0XSA9IGF0dGFjaChlbCk7IH07XG5cdFx0XHRkYXRhW3RvTmFtZSRnZXRdID0gbnVsbDtcblx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdH1cbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93Q2hlY2tlciAoICAgICAgICAgICAgYWxvbmcgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgZGF0YU5hbWVzICAgICAgICAgICAgICAsIHNoYWRvd05hbWVzICAgICAgICwgX19kZXZfXyAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRpZiAoIGFsb25nWzBdPT09J18nIHx8IGFsb25nWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHR2YXIgaW5kZXggPSBhbG9uZy5pbmRleE9mKCcuJyk7XG5cdGlmICggaW5kZXg8MCApIHtcblx0XHR2YXIgdG9OYW1lJGdldCA9IGFsb25nLnNsaWNlKDAsIGluZGV4KSArICckZ2V0Jztcblx0XHR2YXIgdG9OYW1lJHNldCA9IGFsb25nLnNsaWNlKDAsIGluZGV4KSArICckc2V0Jztcblx0XHRpZiAoIHRvTmFtZSRnZXQgaW4gcmVzdE5hbWVzIHx8IHRvTmFtZSRzZXQgaW4gcmVzdE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdHNoYWRvd05hbWVzW3RvTmFtZSRnZXRdID0gbnVsbDtcblx0XHRzaGFkb3dOYW1lc1t0b05hbWUkc2V0XSA9IG51bGw7XG5cdFx0aWYgKCBkYXRhTmFtZXMgKSB7XG5cdFx0XHRpZiAoIHRvTmFtZSRnZXQgaW4gZGF0YU5hbWVzIHx8IHRvTmFtZSRzZXQgaW4gZGF0YU5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggdG9OYW1lJGdldCBpbiBkYXRhIHx8IHRvTmFtZSRzZXQgaW4gZGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9O1xuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggYWxvbmc9PT0nY29uc3RydWN0b3InICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcdGlmICggYWxvbmcgaW4gcmVzdE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdHNoYWRvd05hbWVzW2Fsb25nXSA9IG51bGw7XG5cdFx0aWYgKCBkYXRhTmFtZXMgKSB7XG5cdFx0XHRpZiAoIGFsb25nIGluIGRhdGFOYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBkYXRhICAgICAgKSB7XG5cdFx0XHRpZiAoIGFsb25nIGluIGRhdGEgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9zaGFkb3cpOyB9XG5cdFx0fTtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sPyc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcD8nO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGZyb20gZnJvbSAnLkFycmF5LmZyb20/JztcbmltcG9ydCBnZXRQcm90b3R5cGVPZiBmcm9tICcuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mJztcbmltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnNldFByb3RvdHlwZU9mJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/JztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0IGZyb20gJy5SZWZsZWN0LmdldD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgT3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBQUk9UT19CVUcgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IHRoYXQsIE5BTUVTLCBwcm9Qcm90bywgcHJvQ29uc3RydWN0b3IsIHByb05hbWVzLCBwcm9EYXRhLCBkZXZEYXRhIH0gZnJvbSAnLi9EYXRhJztcbmltcG9ydCB7IFNoYWRvd0Fzc2lnbmVyLCBTaGFkb3dDaGVja2VyIH0gZnJvbSAnLi9TaGFkb3cnO1xuXG5leHBvcnQgeyBDb21wb25lbnQgYXMgZGVmYXVsdCB9O1xudmFyIENvbXBvbmVudCAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZnJlZXplKC8qI19fUFVSRV9fKi9kZWZpbmVQcm9wZXJ0aWVzKFxuXHRmdW5jdGlvbiBDb21wb25lbnQgKCkgeyByZXR1cm4gdGhhdDsgfSxcblx0e1xuXHRcdHByb3RvdHlwZToge1xuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IC8qI19fUFVSRV9fKi9mcmVlemUoY3JlYXRlKG51bGwsIHtcblx0XHRcdFx0X3JlbmRlcjoge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0XHRcdGdldDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24gX3JlbmRlciAoICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICAgICAgICApIHsgKCB0aGlzLl8gfHwgdGhpcy4kb3B0aW9ucyApLnJlbmRlciA9IHZhbHVlOyB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSkpLFxuXHRcdH0sXG5cdFx0cmVuZGVyOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogdW5kZWZpbmVkLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiByZW5kZXIgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgKSB7ICggdGhhdCAuXyB8fCB0aGF0IC4kb3B0aW9ucyApLnJlbmRlciA9IHZhbHVlOyB9LFxuXHRcdH0sXG5cdFx0Xzoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gdG9PcHRpb25zICggICAgICAgICAgICAgICAgVnVlMyAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0aWYgKCAhaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih0aGlzKSApIHsgdGhyb3cgRXJyb3IoJyEoIHRoaXMgZXh0ZW5kcyBDb21wb25lbnQgKS5fKCknKTsgfVxuXHRcdFx0XHR2YXIgRElEX09QVElPTlMgPSBPUFRJT05TLm9iamVjdHMuaW50byhfX2Rldl9fIHx8IE9QVElPTlMgICAgICAgKS5pbnRvKFZ1ZTMgfHwgT1BUSU9OUyAgICAgICApO1xuXHRcdFx0XHR2YXIgVE1QX09QVElPTlMgPSBuZXcgT1BUSU9OUy5vYmplY3RzVG1wO1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IFRvT3B0aW9ucyhcblx0XHRcdFx0XHR0aGlzLFxuXHRcdFx0XHRcdFZ1ZTMgfHwgdW5kZWZpbmVkLFxuXHRcdFx0XHRcdF9fZGV2X18gPyBERVYucmVkdWNlKGZ1bmN0aW9uIERldiAoZGV2LCBrZXkpIHtcblx0XHRcdFx0XHRcdGRldltrZXldID0gX19kZXZfXyBba2V5XSB8fCBrZXk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGV2O1xuXHRcdFx0XHRcdH0sIGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLFxuXHRcdFx0XHRcdERJRF9PUFRJT05TLFxuXHRcdFx0XHRcdFRNUF9PUFRJT05TXG5cdFx0XHRcdCk7XG5cdFx0XHRcdFRNUF9PUFRJT05TLmZvckVhY2ggKGZ1bmN0aW9uIChvcHRpb25zVmFsdWUsIGNvbnN0cnVjdG9yS2V5KSB7IERJRF9PUFRJT05TLnNldChjb25zdHJ1Y3RvcktleSwgb3B0aW9uc1ZhbHVlKTsgfSk7XG5cdFx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdFx0fSxcblx0XHR9LFxuXHR9XG4pKTtcblxudmFyIF9taXhpbnMgICAgICAgICAgICAgICAgPSBTeW1ib2wgJiYgLyojX19QVVJFX18qL1N5bWJvbCgnX21peGlucycpICAgICAgICAgICAgICAgICA7XG5cbnZhciBfX1BVUkVfXyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHRyeSB7IHJldHVybiBGdW5jdGlvbignQ29tcG9uZW50LF9taXhpbnMnLCAnXCJ1c2Ugc3RyaWN0XCI7cmV0dXJuKC4uLm1peGlucyk9PmNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e2NvbnN0cnVjdG9yKCl7cmV0dXJuIENvbXBvbmVudCgpfXN0YXRpYyBnZXRbX21peGluc10oKXtyZXR1cm4gbWl4aW5zfX0nKShDb21wb25lbnQsIF9taXhpbnMpOyB9XG5cdGNhdGNoIChlcnJvcikge31cbn0oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1peGluICggICAgICAgICAgKSB7XG5cdHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG5cdFx0PyAvKiNfX1BVUkVfXyovYXBwbHkoX19QVVJFX18sIG51bGwsIGFyZ3VtZW50cyAgICAgICApXG5cdFx0OiBDb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIFRvT3B0aW9ucyAoY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAsIERJRF9PUFRJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgVE1QX09QVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgIHtcblx0XG5cdHZhciBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgID0gRElEX09QVElPTlMuZ2V0KGNvbnN0cnVjdG9yKSB8fCBUTVBfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoIG9wdGlvbnMgKSB7IHJldHVybiBvcHRpb25zOyB9XG5cdE9QVElPTlMuY29uc3RydWN0b3Iuc2V0KG9wdGlvbnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICwgY29uc3RydWN0b3IpO1xuXHRcblx0aWYgKCBpc01peGlucyhjb25zdHJ1Y3RvcikgKSB7XG5cdFx0dmFyIHN0YXRpY19taXhpbnMgPSBjb25zdHJ1Y3RvcltfbWl4aW5zXSA7XG5cdFx0dmFyIG1peGlucyA9IG5ldyBPUFRJT05TLlNldCAgICAgICAgICAgICgpO1xuXHRcdHZhciBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PXN0YXRpY19taXhpbnMubGVuZ3RoICkge1xuXHRcdFx0dmFyIG1peGluID0gc3RhdGljX21peGluc1tpbmRleCsrXTtcblx0XHRcdGlmICggaXNDb21wb25lbnRDb25zdHJ1Y3RvcihtaXhpbikgKSB7XG5cdFx0XHRcdHZhciBtaXhpbk9wdGlvbnMgPSBUb09wdGlvbnMobWl4aW4sIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7XG5cdFx0XHRcdGlmICggaXNNaXhpbnMobWl4aW4pICkge1xuXHRcdFx0XHRcdHZhciBtaXhpbk1peGlucyA9IG1peGluT3B0aW9ucy5taXhpbnMgO1xuXHRcdFx0XHRcdHZhciBtaXhpbkluZGV4ID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoIG1peGluSW5kZXghPT1taXhpbk1peGlucy5sZW5ndGggKSB7IG1peGlucy5hZGQobWl4aW5NaXhpbnNbbWl4aW5JbmRleCsrXSk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHsgbWl4aW5zLmFkZChtaXhpbk9wdGlvbnMpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgbWl4aW5zLmFkZChtaXhpbiAgICAgICAgICAgICAgKTsgfVxuXHRcdH1cblx0XHRvcHRpb25zLm1peGlucyA9IGZyb20obWl4aW5zKTtcblx0XHRfX2Rldl9fICYmIGNoZWNrKG9wdGlvbnMsIF9fZGV2X18pO1xuXHRcdGNvbGxlY3ROYW1lcyhvcHRpb25zLCBjb25zdHJ1Y3Rvcik7XG5cdFx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XHRyZXR1cm4gb3B0aW9ucztcblx0fVxuXHRcblx0dmFyIFN1cGVyID0gT1BUSU9OUy5zdXBlci5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoICFTdXBlciApIHtcblx0XHRPUFRJT05TLnN1cGVyLnNldChjb25zdHJ1Y3RvciwgU3VwZXIgPSBnZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvcikpO1xuXHRcdFN1cGVyPT09Q29tcG9uZW50IHx8IGlzTWl4aW5zKFN1cGVyKSB8fCBzZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvciwgQ29tcG9uZW50KTtcblx0fVxuXHRpZiAoIFN1cGVyIT09Q29tcG9uZW50ICkge1xuXHRcdHZhciBTdXBlck9wdGlvbnMgPSBUb09wdGlvbnMoU3VwZXIsIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7XG5cdFx0aXNNaXhpbnMoU3VwZXIpXG5cdFx0XHQ/IFN1cGVyT3B0aW9ucy5taXhpbnMgLmxlbmd0aD09PTFcblx0XHRcdD8gb3B0aW9ucy5leHRlbmRzID0gU3VwZXJPcHRpb25zLm1peGlucyBbMF1cblx0XHRcdDogb3B0aW9ucy5taXhpbnMgPSBTdXBlck9wdGlvbnMubWl4aW5zXG5cdFx0XHQ6IG9wdGlvbnMuZXh0ZW5kcyA9IFN1cGVyT3B0aW9ucztcblx0fVxuXHRcblx0X19kZXZfXyAmJiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY29uc3RydWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKHN5bWJvbCkge1xuXHRcdGlmICggc3ltYm9sIT09X21peGlucyAmJiAhKCBzeW1ib2wgaW4gU1lNQk9MUyApICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc3ltYm9sKTsgfVxuXHR9KTtcblx0XG5cdHZhciBzZXQgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2U2V0LmJpbmQoX19kZXZfXykgOiBwcm9TZXQ7XG5cdHZhciBhc3NlcnRGdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgID0gX19kZXZfXyA/IGRldkFzc2VydEZ1bmN0aW9uLmJpbmQoX19kZXZfXykgOiBwcm9Bc3NlcnRGdW5jdGlvbjtcblx0XG5cdHZhciBzdGF0aWNOYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXMoY29uc3RydWN0b3IpO1xuXHRpbmRleCA9IHN0YXRpY05hbWVzLmxlbmd0aDtcblx0dmFyIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXHR2YXIgc2tpcENvbnN0cnVjdG9yID0gZmFsc2U7XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIHN0YXRpY05hbWUgPSBzdGF0aWNOYW1lc1stLWluZGV4XTtcblx0XHRpZiAoIHN0YXRpY05hbWU9PT0nUmVuZGVyJyApIHsgdmFyIFJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdICAgICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSduYW1lJyB8fCBzdGF0aWNOYW1lPT09J2xlbmd0aCcgKSB7XG5cdFx0XHRkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbnN0cnVjdG9yLCBzdGF0aWNOYW1lKTtcblx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmIHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBkZXNjcmlwdG9yLnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgYXBwbHkoZGVzY3JpcHRvci5nZXQgLCBjb25zdHJ1Y3RvciwgQVJHUykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSdkYXRhJyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSE9PXVuZGVmaW5lZCApIHsgdGhyb3cgRXJyb3IoaXNBcnJheShjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSkgPyBfX2Rldl9fLmNvbXBpbGVfbGF5b3V0IDogX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHR9XG5cdFx0XHRza2lwQ29uc3RydWN0b3IgPSB0cnVlO1xuXHRcdH1cblx0XHRlbHNlIGlmICggc3RhdGljTmFtZSE9PSdwcm90b3R5cGUnICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIHN0YXRpY05hbWVbMF09PT0nXycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nc2V0dXAnIHx8IHN0YXRpY05hbWU9PT0nd2F0Y2gnIHx8IHN0YXRpY05hbWU9PT0nbWV0aG9kcycgfHwgc3RhdGljTmFtZT09PSdjb21wdXRlZCcgfHwgc3RhdGljTmFtZT09PSdleHRlbmRzJyB8fCBzdGF0aWNOYW1lPT09J21peGlucycgfHxcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J2JlZm9yZUNyZWF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nY3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVNb3VudCcgfHwgc3RhdGljTmFtZT09PSdtb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVwZGF0ZScgfHwgc3RhdGljTmFtZT09PSd1cGRhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2FjdGl2YXRlZCcgfHwgc3RhdGljTmFtZT09PSdkZWFjdGl2YXRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVVbm1vdW50JyB8fCBzdGF0aWNOYW1lPT09J3VubW91bnRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVEZXN0cm95JyB8fCBzdGF0aWNOYW1lPT09J2Rlc3Ryb3llZCcgfHxcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J2luamVjdCcgfHwgc3RhdGljTmFtZT09PSdwcm9wcydcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9sYXlvdXQpOyB9XG5cdFx0XHR9XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSk7XG5cdFx0fVxuXHR9XG5cdFxuXHR2YXIgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuXHR2YXIgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXHRcblx0dmFyIHByb3RvTmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvdHlwZSk7XG5cdGluZGV4ID0gcHJvdG9OYW1lcy5sZW5ndGg7XG5cdHZhciB3YXRjaGVycyAgICAgICAgICAgID0gW107XG5cdHZhciBza2lwRGF0YSA9IGZhbHNlO1xuXHR2YXIgZGF0YU5hbWVzICAgICAgICAgICAgICAgPSBudWxsO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBwcm90b05hbWUgPSBwcm90b05hbWVzWy0taW5kZXhdO1xuXHRcdGlmICggcHJvdG9OYW1lPT09J19kYXRhJyApIHtcblx0XHRcdHZhciBfZGF0YSA9IGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKTtcblx0XHRcdGlmICggX2RhdGEgKSB7XG5cdFx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0XHRpZiAoICFpc0FycmF5KF9kYXRhKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHRcdFx0X2RhdGEuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgbmFtZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdFx0XHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aWYgKCBza2lwQ29uc3RydWN0b3IgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGxlbmd0aCA9IF9kYXRhLmxlbmd0aDtcblx0XHRcdFx0aWYgKCBsZW5ndGggKSB7XG5cdFx0XHRcdFx0ZGF0YU5hbWVzID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHRcdFx0XHRcdHZhciBpID0gMDtcblx0XHRcdFx0XHRkbyB7IGRhdGFOYW1lc1tfZGF0YVtpXV0gPSBudWxsOyB9XG5cdFx0XHRcdFx0d2hpbGUgKCArK2khPT1sZW5ndGggKTtcblx0XHRcdFx0XHRkYXRhTmFtZXMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBkYXRhTmFtZXMpO1xuXHRcdFx0XHRcdF9fZGV2X18gJiYgT1BUSU9OUy5kYXRhLnNldChvcHRpb25zLCBkYXRhTmFtZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHNraXBEYXRhID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0XHRpZiAoIF9kYXRhIT09dW5kZWZpbmVkICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdFx0XHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHRza2lwQ29uc3RydWN0b3IgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggcHJvdG9OYW1lWzBdPT09J18nICYmICEoIHByb3RvTmFtZS5zdGFydHNXaXRoKCdfd2F0Y2goJykgKSApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0dmFyIHByb3RvTmFtZTEgPSBwcm90b05hbWUuc2xpY2UoMSk7XG5cdFx0XHRcdGlmICggcHJvdG9OYW1lMVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdzZXR1cCcgfHwgcHJvdG9OYW1lMT09PSd3YXRjaCcgfHwgcHJvdG9OYW1lMT09PSdtZXRob2RzJyB8fCBwcm90b05hbWUxPT09J2NvbXB1dGVkJyB8fCBwcm90b05hbWUxPT09J2V4dGVuZHMnIHx8IHByb3RvTmFtZTE9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZW1pdHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcG9uZW50cycgfHwgcHJvdG9OYW1lMT09PSdkaXJlY3RpdmVzJyB8fCBwcm90b05hbWUxPT09J3N0YXRpY1JlbmRlckZucycgfHwgcHJvdG9OYW1lMT09PSd0ZW1wbGF0ZScgfHwgcHJvdG9OYW1lMT09PSdpbmhlcml0QXR0cnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSduYW1lJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nUmVuZGVyJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZGVsaW1pdGVycycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2ZpbHRlcnMnIHx8IHByb3RvTmFtZTE9PT0nY29tbWVudHMnIHx8IHByb3RvTmFtZTE9PT0nZnVuY3Rpb25hbCcgfHwgcHJvdG9OYW1lMT09PSdwcm9wc0RhdGEnIHx8IHByb3RvTmFtZTE9PT0nbW9kZWwnXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbGF5b3V0KTsgfVxuXHRcdFx0fVxuXHRcdFx0c2V0KG9wdGlvbnMsIHByb3RvTmFtZS5zbGljZSgxKSwgZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvdG9OYW1lKTtcblx0XHRcdGlmICggcHJvdG9OYW1lWzBdPT09J18nICkge1xuXHRcdFx0XHR2YXIgaW5kZXhPZlEgPSBwcm90b05hbWUubGFzdEluZGV4T2YoJyknKTtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB3YXRjaGVyc1t3YXRjaGVycy5sZW5ndGhdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICA7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHR3YXRjaGVyLiQgPSBwcm90b05hbWUuc2xpY2UoNywgaW5kZXhPZlEpLnRyaW0oKTtcblx0XHRcdFx0XHR3YXRjaGVyLmhhbmRsZXIgPSBhc3NlcnRGdW5jdGlvbihkZXNjcmlwdG9yLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR3YXRjaGVyLiQgPSBhc3NlcnRGdW5jdGlvbihkZXNjcmlwdG9yLmdldCk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5zZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaW5kZXhPZlEgKyAxIT09cHJvdG9OYW1lLmxlbmd0aCApIHtcblx0XHRcdFx0XHRpbmRleE9mUSArPSAyO1xuXHRcdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRcdHZhciBpbmRleE9mQSA9IHByb3RvTmFtZS5pbmRleE9mKCc7JywgaW5kZXhPZlEpO1xuXHRcdFx0XHRcdFx0dmFyIHBhaXIgPSBpbmRleE9mQTwwXG5cdFx0XHRcdFx0XHRcdD8gcHJvdG9OYW1lLnNsaWNlKGluZGV4T2ZRKVxuXHRcdFx0XHRcdFx0XHQ6IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSwgaW5kZXhPZkEpO1xuXHRcdFx0XHRcdFx0aW5kZXhPZlEgPSBpbmRleE9mQSArIDE7XG5cdFx0XHRcdFx0XHRpZiAoIHBhaXIgKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBpbmRleE9mRSA9IHBhaXIuaW5kZXhPZignPScpO1xuXHRcdFx0XHRcdFx0XHRpbmRleE9mRTwwXG5cdFx0XHRcdFx0XHRcdFx0PyB3YXRjaGVyW3BhaXJdID0gdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdDogd2F0Y2hlcltwYWlyLnNsaWNlKDAsIGluZGV4T2ZFKV0gPSBwYWlyLnNsaWNlKGluZGV4T2ZFICsgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggaW5kZXhPZlEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIHByb3RvTmFtZVswXT09PSckJyApIHtcblx0XHRcdFx0KCBwcm90b0Rlc2NyaXB0b3JzIHx8ICggcHJvdG9EZXNjcmlwdG9ycyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGVzY3JpcHRvcik7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdFx0XHRcdGlmICggcHJvdG9OYW1lIT09J2NvbnN0cnVjdG9yJyB8fCBkZXNjcmlwdG9yLnZhbHVlIT09Y29uc3RydWN0b3IgKSB7XG5cdFx0XHRcdFx0XHQoIG9wdGlvbnMubWV0aG9kcyB8fCAoIG9wdGlvbnMubWV0aG9kcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCggb3B0aW9ucy5jb21wdXRlZCB8fCAoIG9wdGlvbnMuY29tcHV0ZWQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSApW3Byb3RvTmFtZV0gPSBkZXNjcmlwdG9yLnNldCA/IHtcblx0XHRcdFx0XHRcdGdldDogZGVzY3JpcHRvci5nZXQsXG5cdFx0XHRcdFx0XHRzZXQ6IGRlc2NyaXB0b3Iuc2V0XG5cdFx0XHRcdFx0fSA6IGRlc2NyaXB0b3IuZ2V0ICAgICAgIDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0dmFyIHByb3RvU3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhwcm90b3R5cGUpICAgICAgICAgICAgICAgICAgIDtcblx0aWYgKCAoIGluZGV4ID0gcHJvdG9TeW1ib2xzLmxlbmd0aCApICkge1xuXHRcdGlmICggIXByb3RvRGVzY3JpcHRvcnMgKSB7IHByb3RvRGVzY3JpcHRvcnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgIDsgfVxuXHRcdGRvIHtcblx0XHRcdHZhciBwcm90b1N5bWJvbCAgICAgICAgICAgICAgICA9IHByb3RvU3ltYm9sc1stLWluZGV4XTtcblx0XHRcdHByb3RvRGVzY3JpcHRvcnMgW3Byb3RvU3ltYm9sXSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvU3ltYm9sKSk7XG5cdFx0fVxuXHRcdHdoaWxlICggaW5kZXggKTtcblx0fVxuXHRwcm90b0Rlc2NyaXB0b3JzICYmIE9QVElPTlMucHJvdG8uc2V0KG9wdGlvbnMsIHByb3RvRGVzY3JpcHRvcnMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBwcm90b0Rlc2NyaXB0b3JzKSk7XG5cdFxuXHRfX2Rldl9fICYmIGNoZWNrKG9wdGlvbnMsIF9fZGV2X18pO1xuXHRcblx0dmFyIHJlc3ROYW1lcyA9IGNvbGxlY3ROYW1lcyhvcHRpb25zLCBjb25zdHJ1Y3Rvcik7XG5cdFxuXHRpZiAoIFJlbmRlciAmJiBWdWUzICkge1xuXHRcdHZhciBzaGFkb3cgPSBSZW5kZXIuc2hhZG93O1xuXHRcdGlmICggc2hhZG93ICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIHNraXBDb25zdHJ1Y3RvciAmJiBza2lwRGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRcdFx0dmFyIHNoYWRvd05hbWVzID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHRcdFx0XHR2YXIgc2hhZG93Q2hlY2tlciAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFNoYWRvd0NoZWNrZXIoc2hhZG93LCByZXN0TmFtZXMsIGRhdGFOYW1lcywgc2hhZG93TmFtZXMsIF9fZGV2X18pO1xuXHRcdFx0XHRPUFRJT05TLnNoYWRvdy5zZXQob3B0aW9ucywgc2hhZG93TmFtZXMpO1xuXHRcdFx0fVxuXHRcdFx0c2hhZG93QXNzaWduZXIgPSBTaGFkb3dBc3NpZ25lcihzaGFkb3cpO1xuXHRcdH1cblx0XHR2YXIgc2hlZXQgPSBSZW5kZXIuc2hlZXQ7XG5cdFx0aWYgKCBzaGVldCApIHtcblx0XHRcdHZhciB3YXRjaGVyczIgICAgICAgICAgICA9IFtdO1xuXHRcdFx0T3duS2V5cyhzaGVldCkuZm9yRWFjaChmdW5jdGlvbiAoICAgICAgICAgICAgICAgICBrZXksIGluZGV4KSB7XG5cdFx0XHRcdHZhciB3YXRjaGVyID0gdGhpc1tpbmRleF0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgIDtcblx0XHRcdFx0d2F0Y2hlci4kID0gYXNzZXJ0RnVuY3Rpb24oc2hlZXQgW2tleV0pO1xuXHRcdFx0XHR3YXRjaGVyLmhhbmRsZXIgPSBmdW5jdGlvbiAoICAgICAgICAgICAgY3NzICAgICAgICApIHsgKCB0aGlzLiRyZWZzW2tleV0gICAgICAgICAgICAgICAgICAgICApLnRleHRDb250ZW50ID0gY3NzOyB9O1xuXHRcdFx0XHR3YXRjaGVyLmltbWVkaWF0ZSA9IHRydWU7XG5cdFx0XHRcdHdhdGNoZXIuZmx1c2ggPSAnc3luYyc7XG5cdFx0XHR9LCB3YXRjaGVyczIpO1xuXHRcdFx0d2F0Y2hlcnMyLnJldmVyc2UoKTtcblx0XHRcdHZhciBiZWZvcmVNb3VudCA9IG9wdGlvbnMuYmVmb3JlTW91bnQ7XG5cdFx0XHRvcHRpb25zLmJlZm9yZU1vdW50ID0gYmVmb3JlTW91bnRcblx0XHRcdFx0PyBmdW5jdGlvbiBiZWZvcmVCZWZvcmVNb3VudCAoKSB7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzMik7XG5cdFx0XHRcdFx0cmV0dXJuIGJlZm9yZU1vdW50IC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0fTtcblx0XHR9XG5cdFx0b3B0aW9ucy5yZW5kZXIgPSBhc3NlcnRGdW5jdGlvbihuZXcgUmVuZGVyKFZ1ZTMgKSk7XG5cdH1cblx0XG5cdGlmICggX19kZXZfXyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIGRldkRhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgc2tpcERhdGEsIGRhdGFOYW1lcywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lciwgc2hhZG93Q2hlY2tlciwgc2tpcENvbnN0cnVjdG9yLCBfX2Rldl9fKTsgfTsgfVxuXHRlbHNlIGlmICggc2tpcENvbnN0cnVjdG9yIHx8IHNraXBEYXRhICkge31cblx0ZWxzZSBpZiAoIGRhdGFOYW1lcyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb05hbWVzKHNlbGYgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMsIGRhdGFOYW1lcyAsIHNoYWRvd0Fzc2lnbmVyKTsgfTsgfVxuXHRlbHNlIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb0RhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lcik7IH07IH1cblx0XG5cdGlmICggd2F0Y2hlcnMubGVuZ3RoIHx8ICFfX2Rldl9fICYmICggc2tpcENvbnN0cnVjdG9yICYmIHByb3RvRGVzY3JpcHRvcnMgfHwgc2tpcERhdGEgKSApIHtcblx0XHR3YXRjaGVycy5sZW5ndGggJiYgd2F0Y2hlcnMucmV2ZXJzZSgpO1xuXHRcdHZhciBjcmVhdGVkID0gb3B0aW9ucy5jcmVhdGVkO1xuXHRcdHN3aXRjaCAoICggX19kZXZfXyA/ICggc2tpcENvbnN0cnVjdG9yID8gJ3MnIDogJ24nICkgOiAnXycgKSArICggd2F0Y2hlcnMubGVuZ3RoID8gJ3cnIDogJ18nICkgKyAoIGNyZWF0ZWQgPyAnYycgOiAnXycgKSApIHtcblx0XHRcdGNhc2UgJ3N3Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Qcm90byh0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzd18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvUHJvdG8odGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICk7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzX2MnOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvUHJvdG8odGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICk7XG5cdFx0XHRcdFx0cmV0dXJuIGNyZWF0ZWQgLmFwcGx5KHRoaXMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3NfXyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Qcm90byh0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdud2MnOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvQ29uc3RydWN0b3IodGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMyk7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0XHRyZXR1cm4gY3JlYXRlZCAuYXBwbHkodGhpcyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbndfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICduX18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvQ29uc3RydWN0b3IodGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3djJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdFx0cmV0dXJuIGNyZWF0ZWQgLmFwcGx5KHRoaXMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ193Xyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0XG5cdFRNUF9PUFRJT05TLnNldChjb25zdHJ1Y3Rvciwgb3B0aW9ucyk7XG5cdFxuXHQvL0B0cy1pZ25vcmVcblx0aWYgKCBvcHRpb25zLmNvbXBvbmVudHMgfHwgb3B0aW9ucy5uYW1lIHx8IG9wdGlvbnMuZGlzcGxheU5hbWUgKSB7XG5cdFx0dmFyIGNvbXBvbmVudHMgPSBvcHRpb25zLmNvbXBvbmVudHMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuXHRcdHZhciBjYXNlcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHQvL0B0cy1pZ25vcmVcblx0XHRvcHRpb25zLm5hbWUgJiYgZml4UGFzY2FsKG9wdGlvbnMubmFtZSwgY2FzZXMpO1xuXHRcdC8vQHRzLWlnbm9yZVxuXHRcdG9wdGlvbnMuZGlzcGxheU5hbWUgJiYgZml4UGFzY2FsKG9wdGlvbnMuZGlzcGxheU5hbWUsIGNhc2VzKTtcblx0XHRmb3IgKCB2YXIgcGFzY2FsIGluIGNvbXBvbmVudHMgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggIXBhc2NhbCB8fCBTVEFSVFNfV0lUSF9MT1dFUkNBU0UudGVzdChwYXNjYWwpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0XHRcdH1cblx0XHRcdHZhciB2YWx1ZSA9IGNvbXBvbmVudHNbcGFzY2FsXTtcblx0XHRcdGlmICggaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih2YWx1ZSkgKSB7IGNvbXBvbmVudHNbcGFzY2FsXSA9IFRvT3B0aW9ucyh2YWx1ZSwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTsgfVxuXHRcdFx0Zml4UGFzY2FsKHBhc2NhbCwgY2FzZXMpO1xuXHRcdH1cblx0XHRhc3NpZ24oY29tcG9uZW50cywgY2FzZXMsIGNvbXBvbmVudHMpO1xuXHR9XG5cdFxuXHRyZXR1cm4gb3B0aW9ucztcblx0XG59XG5cbnZhciBPUFRJT05TID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO1xcXG5jbGFzcyBFYXN5TWFwIGV4dGVuZHMgV2Vha01hcHtpbnRvKGtleSl7bGV0IHN1Yj10aGlzLmdldChrZXkpO3N1Yj8/dGhpcy5zZXQoa2V5LHN1Yj1uZXcgRWFzeU1hcCk7cmV0dXJuIHN1Yn19RWFzeU1hcC5wcm90b3R5cGUuZ2V0PVdlYWtNYXAucHJvdG90eXBlLmdldDtFYXN5TWFwLnByb3RvdHlwZS5zZXQ9V2Vha01hcC5wcm90b3R5cGUuc2V0O1xcXG5jbGFzcyBTdHJvbmdNYXAgZXh0ZW5kcyBNYXB7fVN0cm9uZ01hcC5wcm90b3R5cGUuZ2V0PU1hcC5wcm90b3R5cGUuZ2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuc2V0PU1hcC5wcm90b3R5cGUuc2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuZm9yRWFjaD1NYXAucHJvdG90eXBlLmZvckVhY2g7XFxcbmNsYXNzIFN0cm9uZ1NldCBleHRlbmRzIFNldHt9U3Ryb25nU2V0LnByb3RvdHlwZS5hZGQ9U2V0LnByb3RvdHlwZS5hZGQ7U3Ryb25nU2V0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdPVNldC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXTtcXFxucmV0dXJue29iamVjdHM6bmV3IEVhc3lNYXAsb2JqZWN0c1RtcDpTdHJvbmdNYXAsc3VwZXI6bmV3IEVhc3lNYXAscmVzdDpuZXcgRWFzeU1hcCxkYXRhOm5ldyBFYXN5TWFwLHByb3RvOm5ldyBFYXN5TWFwLGNvbnN0cnVjdG9yOm5ldyBFYXN5TWFwLHNoYWRvdzpuZXcgRWFzeU1hcCxTZXQ6U3Ryb25nU2V0fVxcXG4nKSgpO1xuXHR9XG5cdGNhdGNoIChlcnJvcikge31cbn0oKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG4gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZnVuY3Rpb24gaXNDb21wb25lbnRDb25zdHJ1Y3RvciAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGFwcGx5KGlzUHJvdG90eXBlT2YsIENvbXBvbmVudCwgWyB2YWx1ZSBdICAgICAgICAgKTsgfVxuXG52YXIgQVJHUyA9IFtdICAgICAgICAgO1xuXG52YXIgX01JWElOUyA9IFsgX21peGlucyBdICAgICAgICAgO1xuZnVuY3Rpb24gaXNNaXhpbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoaGFzT3duUHJvcGVydHksIGNvbnN0cnVjdG9yLCBfTUlYSU5TKTsgfVxuXG52YXIgU1lNQk9MUyA9IC8qI19fUFVSRV9fKi9nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkucmVkdWNlKGZ1bmN0aW9uIChTWU1CT0xTLCBuYW1lKSB7XG5cdGlmICggdHlwZW9mIFN5bWJvbFtuYW1lXT09PSdzeW1ib2wnICkgeyBTWU1CT0xTW1N5bWJvbFtuYW1lXSAgICAgICAgICAgICAgICAgXSA9IG51bGw7IH1cblx0cmV0dXJuIFNZTUJPTFM7XG59LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuZnVuY3Rpb24gJHdhdGNoICh0aGF0ICAgICAgLCB3YXRjaGVycyAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBpbmRleCA9IHdhdGNoZXJzLmxlbmd0aDtcblx0ZG8ge1xuXHRcdHZhciB3YXRjaGVyICAgICAgPSB3YXRjaGVyc1stLWluZGV4XTtcblx0XHR0aGF0LiR3YXRjaCh3YXRjaGVyLiQsIHdhdGNoZXIuaGFuZGxlciwgd2F0Y2hlcik7XG5cdH1cblx0d2hpbGUgKCBpbmRleCApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG4gIFxuZnVuY3Rpb24gY29sbGVjdE5hbWVzIChvcHRpb25zICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgKSAgICAgICAge1xuXHR2YXIgcmVzdE5hbWVzICAgICAgICAgICAgICAgICAgICA9IE9QVElPTlMucmVzdC5nZXQob3B0aW9ucyk7XG5cdGlmICggIXJlc3ROYW1lcyApIHtcblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyByZXN0TmFtZXMgPSBPUFRJT05TLnJlc3QuZ2V0KGNvbnN0cnVjdG9yKTsgfVxuXHRcdGlmICggIXJlc3ROYW1lcyApIHtcblx0XHRcdHJlc3ROYW1lcyA9IGNyZWF0ZShOQU1FUyk7XG5cdFx0XHR2YXIgZXh0ZW5kID0gb3B0aW9ucy5leHRlbmRzO1xuXHRcdFx0ZXh0ZW5kICYmIGFzc2lnbihyZXN0TmFtZXMsIGNvbGxlY3ROYW1lcyhleHRlbmQsIG51bGwpKTtcblx0XHRcdHZhciBtaXhpbnMgPSBvcHRpb25zLm1peGlucztcblx0XHRcdGlmICggbWl4aW5zICkgeyBmb3IgKCB2YXIgaW5kZXggPSBtaXhpbnMubGVuZ3RoOyBpbmRleDsgKSB7IGFzc2lnbihyZXN0TmFtZXMsIGNvbGxlY3ROYW1lcyhtaXhpbnNbLS1pbmRleF0sIG51bGwpKTsgfSB9XG5cdFx0XHR2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuXHRcdFx0dmFyIG5hbWUgICAgICAgIDtcblx0XHRcdGlmICggaXNBcnJheShwcm9wcykgKSB7IGZvciAoIGluZGV4ID0gcHJvcHMubGVuZ3RoOyBpbmRleDsgKSB7IHJlc3ROYW1lc1twcm9wc1stLWluZGV4XV0gPSBudWxsOyB9IH1cblx0XHRcdGVsc2UgeyBmb3IgKCBuYW1lIGluIHByb3BzICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9IH1cblx0XHRcdHByb3BzID0gb3B0aW9ucy5pbmplY3Q7XG5cdFx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkgeyBmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkgeyByZXN0TmFtZXNbcHJvcHNbLS1pbmRleF1dID0gbnVsbDsgfSB9XG5cdFx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBwcm9wcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMubWV0aG9kcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0XHRyZXN0TmFtZXMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCByZXN0TmFtZXMpO1xuXHRcdH1cblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyBPUFRJT05TLnJlc3Quc2V0KGNvbnN0cnVjdG9yLCByZXN0TmFtZXMpOyB9XG5cdFx0T1BUSU9OUy5yZXN0LnNldChvcHRpb25zLCByZXN0TmFtZXMpO1xuXHR9XG5cdHJldHVybiByZXN0TmFtZXM7XG59XG5cbmZ1bmN0aW9uIHByb1NldCAgICAob2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHsgb2JqZWN0W25hbWVdID0gdmFsdWU7IH1cbmZ1bmN0aW9uIGRldlNldCAgICAoICAgICAgICAgICAgICAgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHtcblx0aWYgKCBuYW1lIGluIG9iamVjdCApIHsgdGhyb3cgRXJyb3IodGhpcy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0b2JqZWN0W25hbWVdID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHByb0Fzc2VydEZ1bmN0aW9uICAgIChmbiAgICkgeyByZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IH1cbmZ1bmN0aW9uIGRldkFzc2VydEZ1bmN0aW9uICAgICggICAgICAgICAgICAgICBmbiAgICkge1xuXHRpZiAoIHR5cGVvZiBmbiE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcih0aGlzLmNvbXBpbGVfdHlwZSk7IH1cblx0cmV0dXJuIGZuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufVxuXG52YXIgU1RBUlRTX1dJVEhfTE9XRVJDQVNFID0gL15bYS16XS87XG52YXIgQ0hFQ0tFRCA9IFdlYWtNYXAgJiYgLyojX19QVVJFX18qL25ldyBXZWFrTWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKTtcbmZ1bmN0aW9uIGZvcktleXMgKG9wdGlvbiAgICAgICAgICAgICAgICAsIGNhbGxiYWNrICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdGlmICggaXNBcnJheShvcHRpb24pICkgeyBvcHRpb24uZm9yRWFjaChjYWxsYmFjayk7IH1cblx0ZWxzZSB7IGZvciAoIHZhciBrZXkgaW4gb3B0aW9uICkgeyBjYWxsYmFjayhrZXkpOyB9IH1cbn1cbmZ1bmN0aW9uIGNoZWNrIChvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFxuXHR2YXIgYmVsb25nID0gT1BUSU9OUy5jb25zdHJ1Y3Rvci5nZXQob3B0aW9ucykgfHwgb3B0aW9ucztcblx0dmFyIG93bktleXMgPSBDSEVDS0VELmdldChiZWxvbmcpO1xuXHRpZiAoIG93bktleXMgKSB7IHJldHVybiBvd25LZXlzOyB9XG5cdHZhciBhbGxLZXlzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFxuXHQoIG9wdGlvbnMuZXh0ZW5kcyA/IFsgb3B0aW9ucy5leHRlbmRzIF0gOiBbXSApLmNvbmNhdChvcHRpb25zLm1peGlucyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAobWl4aW4pIHtcblx0XHR2YXIgbWl4aW5OYW1lcyA9IGNoZWNrKG1peGluLCBfX2Rldl9fKTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBtaXhpbk5hbWVzICkge1xuXHRcdFx0aWYgKCBuYW1lIGluIGFsbEtleXMgJiYgbWl4aW5OYW1lc1tuYW1lXSE9PWFsbEtleXNbbmFtZV0gKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9vdmVyd3JpdGUpOyB9XG5cdFx0fVxuXHRcdGFzc2lnbihhbGxLZXlzLCBtaXhpbk5hbWVzKTtcblx0fSk7XG5cdFxuXHRvd25LZXlzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFxuXHR2YXIgcHJvdG9EZXNjcmlwdG9ycyA9IE9QVElPTlMucHJvdG8uZ2V0KG9wdGlvbnMpO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIE93bktleXMocHJvdG9EZXNjcmlwdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0b3duS2V5cyBba2V5XSA9IGJlbG9uZztcblx0fSk7XG5cdFxuXHRmb3JLZXlzKG9wdGlvbnMucHJvcHMsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCAvLXxeKD86a2V5JHxbb09dW25OXXxyZWYkKS8udGVzdChuYW1lKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Byb3BzKTsgfVxuXHRcdGlmICggbmFtZSBpbiBQUk9UT19CVUcgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5cyBbbmFtZV0gPSBiZWxvbmc7XG5cdH0pO1xuXHRcblx0Zm9yS2V5cyhvcHRpb25zLmluamVjdCwgZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZSBpbiBvd25LZXlzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzIFtuYW1lXSA9IGJlbG9uZztcblx0fSk7XG5cdFxuXHR2YXIgbmFtZSAgICAgICAgO1xuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMuY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuZGF0YS5nZXQob3B0aW9ucykgKSB7XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuc2hhZG93LmdldChvcHRpb25zKSApIHtcblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5cyBbbmFtZV0gPSBiZWxvbmc7XG5cdH1cblx0XG5cdGlmICggJ2NvbnN0cnVjdG9yJyBpbiBvd25LZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcblx0T3duS2V5cyhvd25LZXlzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoIGtleSBpbiBhbGxLZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfb3ZlcndyaXRlKTsgfVxuXHR9KTtcblx0YXNzaWduKGFsbEtleXMsIG93bktleXMpO1xuXHRcblx0WyBvcHRpb25zLm5hbWUsIG9wdGlvbnMuZGlzcGxheU5hbWUgXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICAgKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZT09PSdzdHJpbmcnXG5cdFx0XHQ/ICFuYW1lIHx8IFNUQVJUU19XSVRIX0xPV0VSQ0FTRS50ZXN0KG5hbWUpIHx8IG9wdGlvbnMuY29tcG9uZW50cyAmJiBvcHRpb25zLmNvbXBvbmVudHNbbmFtZV0gJiYgb3B0aW9ucy5jb21wb25lbnRzW25hbWVdIT09b3B0aW9uc1xuXHRcdFx0OiBuYW1lIT09dW5kZWZpbmVkXG5cdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9uYW1lKTsgfVxuXHR9KTtcblx0XG5cdG9wdGlvbnMuZW1pdHMgJiZcblx0KCBpc0FycmF5KG9wdGlvbnMuZW1pdHMpID8gb3B0aW9ucy5lbWl0cyA6IEtleXMob3B0aW9ucy5lbWl0cykgKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGlmICggdHlwZW9mIGV2ZW50PT09J3N0cmluZycgJiYgL15vbi0/dm5vZGV8KD86Y2FwdHVyZXxvbmNlfHBhc3NpdmUpJC8udGVzdCgnb24nICsgZXZlbnQpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfZW1pdHMpOyB9XG5cdH0pO1xuXHRcblx0aWYgKFxuXHRcdG9wdGlvbnMuZGlyZWN0aXZlcyAmJiAnaXMnIGluIG9wdGlvbnMuZGlyZWN0aXZlcy8vIDJcblx0XHR8fC8vQHRzLWlnbm9yZVxuXHRcdG9wdGlvbnMucHJvcHMgJiYgKCBpc0FycmF5KG9wdGlvbnMucHJvcHMpID8gb3B0aW9ucy5wcm9wcy5pbmNsdWRlcygnaXMnKSA6ICdpcycgaW4gb3B0aW9ucy5wcm9wcyApLy8gM1xuXHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2lzKTsgfVxuXHRcblx0Q0hFQ0tFRC5zZXQoYmVsb25nLCBhbGxLZXlzKTtcblx0cmV0dXJuIGFsbEtleXM7XG5cdFxufVxuXG52YXIgVVBQRVIgPSAvW0EtWl0vO1xuZnVuY3Rpb24gZml4UGFzY2FsIChwYXNjYWwgICAgICAgICwgY2FzZXMgICAgICAgKSB7XG5cdHZhciBGaXJzdCA9IHBhc2NhbFswXTtcblx0dmFyIGZpcnN0ID0gRmlyc3QudG9Mb3dlckNhc2UoKTtcblx0dmFyIHJlc3QgPSBwYXNjYWwuc2xpY2UoMSk7XG5cdGNhc2VzW2ZpcnN0ICsgcmVzdF0gPSBudWxsO1xuXHRoeXBoZW5hdGUoZmlyc3QsIHJlc3QsIGNhc2VzKTtcblx0Zmlyc3Q9PT1GaXJzdCB8fCBoeXBoZW5hdGUoRmlyc3QsIHJlc3QsIGNhc2VzKTtcbn1cbmZ1bmN0aW9uIGh5cGhlbmF0ZSAoYmVmb3JlICAgICAgICAsIGFmdGVyICAgICAgICAsIGNhc2VzICAgICAgICkge1xuXHR2YXIgaW5kZXggPSBhZnRlci5zZWFyY2goVVBQRVIpO1xuXHRpZiAoIGluZGV4PDAgKSB7IGNhc2VzW2JlZm9yZSArIGFmdGVyXSA9IG51bGw7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBpbmRleCApIHsgYmVmb3JlICs9IGFmdGVyLnNsaWNlKDAsIGluZGV4KTsgfVxuXHRcdHZhciBjaGFyID0gYWZ0ZXJbaW5kZXhdO1xuXHRcdGFmdGVyID0gYWZ0ZXIuc2xpY2UoaW5kZXggKyAxKTtcblx0XHRoeXBoZW5hdGUoYmVmb3JlICsgJy0nICsgY2hhci50b0xvd2VyQ2FzZSgpLCBhZnRlciwgY2FzZXMpO1xuXHRcdGh5cGhlbmF0ZShiZWZvcmUgKyAnLScgKyBjaGFyLCBhZnRlciwgY2FzZXMpO1xuXHRcdGJlZm9yZVtiZWZvcmUubGVuZ3RoIC0gMV09PT0nLScgfHwgaHlwaGVuYXRlKGJlZm9yZSArIGNoYXIsIGFmdGVyLCBjYXNlcyk7XG5cdH1cbn1cblxudmFyIERFViA9IFtcblx0J3Byb3RvJyxcblx0J2NvbXBpbGVfbmFtZScsXG5cdCdjb21waWxlX3Byb3BzJyxcblx0J2NvbXBpbGVfZW1pdHMnLFxuXHQnY29tcGlsZV9pcycsXG5cdCdjb21waWxlX2xheW91dCcsXG5cdCdjb21waWxlX3Jlc2VydmVkJyxcblx0J2NvbXBpbGVfcmVkZWZpbmVkJyxcblx0J2NvbXBpbGVfb3ZlcndyaXRlJyxcblx0J2NvbXBpbGVfdHlwZScsXG5cdCdjb21waWxlX3N5bWJvbCcsXG5cdCdjb21waWxlX3NoYWRvdycsXG5cdCdydW50aW1lX3NoYWRvdycsXG5cdCdydW50aW1lX3JlZGVmaW5lZCcsXG5cdCdydW50aW1lX3N5bWJvbCcsXG5cdCdydW50aW1lX3Jlc2VydmVkJyxcblx0J3J1bnRpbWVfZW51bWVyYWJsZScsXG5cdCdydW50aW1lX2RhdGEnLFxuXSAgICAgICAgIDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICBcblx0ICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgIFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gXG5cbiAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgXG4gXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9mcmVlemUoY3JlYXRlKE5VTEwsIHtcblx0YmVmb3JlTW91bnQ6IHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBiZWZvcmVNb3VudCAoZWwgICAgICwgYmluZGluZyAgICAgKSB7IGJpbmRpbmcuYXJnPT09dW5kZWZpbmVkID8gYXNzaWduKGVsLCBiaW5kaW5nLnZhbHVlKSA6IGVsW2JpbmRpbmcuYXJnXSA9IGJpbmRpbmcudmFsdWU7IH0sXG5cdH0sXG5cdGJpbmQ6IHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBiaW5kIChlbCAgICAgLCBiaW5kaW5nICAgICApIHsgYmluZGluZy5hcmc9PT11bmRlZmluZWQgPyBhc3NpZ24oZWwsIGJpbmRpbmcudmFsdWUpIDogZWxbYmluZGluZy5hcmddID0gYmluZGluZy52YWx1ZTsgfSxcblx0fSxcblx0dXBkYXRlZDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZWQgKGVsICAgICAsIGJpbmRpbmcgICAgICkgeyBiaW5kaW5nLmFyZz09PXVuZGVmaW5lZCA/IGFzc2lnbihlbCwgYmluZGluZy52YWx1ZSkgOiBlbFtiaW5kaW5nLmFyZ10gPSBiaW5kaW5nLnZhbHVlOyB9LFxuXHR9LFxuXHRjb21wb25lbnRVcGRhdGVkOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50VXBkYXRlZCAoZWwgICAgICwgYmluZGluZyAgICAgKSB7IGJpbmRpbmcuYXJnPT09dW5kZWZpbmVkID8gYXNzaWduKGVsLCBiaW5kaW5nLnZhbHVlKSA6IGVsW2JpbmRpbmcuYXJnXSA9IGJpbmRpbmcudmFsdWU7IH0sXG5cdH0sXG59KSk7XG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi9JZGVudGlmaWVyJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnLi9UZW1wbGF0ZSc7XG5pbXBvcnQgUmVuZGVyLCB7IFN0YXRpY1JlbmRlckZucyB9IGZyb20gJy4vUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnO1xuaW1wb3J0IFN0eWxlLCB7IHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5pbXBvcnQgQ29tcG9uZW50LCB7IG1peGluIH0gZnJvbSAnLi9Db21wb25lbnQsIG1peGluLyc7XG5pbXBvcnQgcHJvcCBmcm9tICcuL3YtcHJvcCc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdElkZW50aWZpZXIsXG5cdFNjb3BlLFxuXHRUZW1wbGF0ZSxcblx0UmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlLCByZW1vdmUsXG5cdENvbXBvbmVudCwgbWl4aW4sXG5cdHByb3AsXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0SWRlbnRpZmllcjogSWRlbnRpZmllcixcblx0U2NvcGU6IFNjb3BlLFxuXHRUZW1wbGF0ZTogVGVtcGxhdGUsXG5cdFJlbmRlcjogUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnM6IFN0YXRpY1JlbmRlckZucyxcblx0U3R5bGU6IFN0eWxlLCByZW1vdmU6IHJlbW92ZSxcblx0Q29tcG9uZW50OiBDb21wb25lbnQsIG1peGluOiBtaXhpbixcblx0cHJvcDogcHJvcCxcbn0pO1xuIl0sIm5hbWVzIjpbInZlcnNpb24iLCJ1bmRlZmluZWQiLCJjcmVhdGUiLCJvd25LZXlzIiwiYXBwbHkiLCJjaGVjayIsImdldFByb3RvdHlwZU9mIiwiZ2V0IiwiRGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjLFFBQVE7O0FDQXRC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LEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQzFILEdBQUcsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUM3QixHQUFHLElBQUksSUFBSSxTQUFTO0FBQ3BCLEdBQUcsS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdkcsUUFBUSxFQUFFLE1BQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQzdELEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDMUIsR0FBRyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN2RyxRQUFRLEVBQUUsTUFBTSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDN0QsR0FBRyxNQUFNLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQzlELEdBQUcsTUFBTSxJQUFJLElBQUksT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtBQUMvRCxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUNBLFFBQU0sQ0FBQyxJQUFJLENBQUMsRUFB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QUFPLE9BQU8sT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUdELFdBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNoSixFQUFFO0FBQ0YsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLFVBQVUsRUFBRSxJQUFJO0FBQ2xCLEVBQUUsS0FBSyxFQUFFLFNBQVMsSUFBSSxFQUFFLEVBQUUsT0FBTyxPQUFPLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxHQUFHQSxXQUFTLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDekksRUFBRTtBQUNGLENBQUMsT0FBTyxFQUFFO0FBQ1YsRUFBRSxVQUFVLEVBQUUsSUFBSTtBQUNsQixFQUFFLEtBQUssRUFBRSxTQUFTLE9BQU8sRUFBRSxFQUFFLE9BQU8sT0FBTyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsR0FBR0EsV0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzVJLEVBQUU7QUFDRixDQUFDLGdCQUFnQixFQUFFO0FBQ25CLEVBQUUsVUFBVSxFQUFFLElBQUk7QUFDbEIsRUFBRSxLQUFLLEVBQUUsU0FBUyxnQkFBZ0IsRUFBRSxFQUFFLE9BQU8sT0FBTyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsR0FBR0EsV0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3JKLEVBQUU7QUFDRixDQUFDLENBQUMsQ0FBQzs7QUNGSCxnQkFBZU8sU0FBTyxDQUFDO0FBQ3ZCLENBQUMsT0FBTyxFQUFFLE9BQU87QUFDakIsQ0FBQyxVQUFVLEVBQUUsVUFBVTtBQUN2QixDQUFDLEtBQUssRUFBRSxLQUFLO0FBQ2IsQ0FBQyxRQUFRLEVBQUUsUUFBUTtBQUNuQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLGVBQWU7QUFDakQsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzdCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSztBQUNuQyxDQUFDLElBQUksRUFBRSxJQUFJO0FBQ1gsQ0FBQyxDQUFDOzs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9Gcm9udEVuZFJ1bnRpbWVEZXBlbmRlbmN5LyJ9