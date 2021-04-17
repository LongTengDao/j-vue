/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：26.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

import test from '.RegExp.prototype.test';
import join from '.Array.prototype.join';
import unshift from '.Array.prototype.unshift';
import Error from '.Error';
import isArray from '.Array.isArray';
import create$1 from '.Object.create';
import freeze$1 from '.Object.freeze';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import match from '.String.prototype.match';
import undefined$1 from '.undefined';
import RegExp from '.RegExp';
import defineProperty from '.Object.defineProperty';
import NULL from '.null.prototype';
import bind from '.Function.prototype.bind?';
import exec from '.RegExp.prototype.exec';
import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import freeze from '.Object.freeze?';
import apply from '.Reflect.apply?';
import Proxy from '.Proxy?';
import create from '.Object.create?=';
import Default from '.default?=';
import Symbol from '.Symbol?';
import document from '.document';
import head from '.document.head';
import Function from '.Function';
import WeakMap from '.WeakMap?';
import from from '.Array.from?';
import getPrototypeOf$1 from '.Reflect.getPrototypeOf?=Object.getPrototypeOf';
import setPrototypeOf from '.Object.setPrototypeOf?';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import getOwnPropertyDescriptor from '.Object.getOwnPropertyDescriptor';
import getOwnPropertySymbols from '.Object.getOwnPropertySymbols?';
import defineProperties from '.Object.defineProperties';
import get$1 from '.Reflect.get?';
import assign from '.Object.assign?';
import Keys from '.Object.keys';
import OwnKeys from '.Reflect.ownKeys?';
import PROTO_BUG from '.Object.prototype';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import window from '.window';
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import getPrototypeOf from '.Object.getPrototypeOf';
import propertyIsEnumerable from '.Object.prototype.propertyIsEnumerable';
import error from '.console.error';
import Default$1 from '.default';

var version$1 = '26.0.0';

var object = {
	'0': '1', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6', '6': '7', '7': '8', '8': '9', '9': 'a',
	a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
	h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
	o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
	u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
}         ;

var lastItem       = 'z';
var array         = [ lastItem ];
var lastIndex         = array.length - 1;

var notKeyword                                            = /*#__PURE__*/test.bind(/\d/);
var toString                           = /*#__PURE__*/join.bind(array, '');
var prependA                           = /*#__PURE__*/unshift.bind(array, 'a');

function Identifier ()         {
	if ( lastItem==='9' ) {
		array[lastIndex] = 'a';
		var string        ;
		if ( notKeyword(string = toString()) ) {
			lastItem = 'a';
			return string;
		}
	}
	else if ( lastItem!=='z' ) {
		lastItem = array[lastIndex] = object[lastItem];
		return toString();
	}
	lastItem = array[lastIndex] = '0';
	for ( var index         = lastIndex; index; array[index] = '0' ) {
		var item       = array[--index] ;
		if ( item!=='z' ) {
			array[index] = object[item];
			return toString();
		}
	}
	lastIndex = prependA() - 1;
	return toString();
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

var version = '8.0.0';

var Test                                           = bind
	? /*#__PURE__*/bind.bind(test       )       
	: function (re) {
		return function (string) {
			return test.call(re, string);
		};
	};

var Exec                                           = bind
	? /*#__PURE__*/bind.bind(exec       )       
	: function (re) {
		return function (string) {
			return exec.call(re, string);
		};
	};

function theRegExp (re        )         {
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	var source = test.source = exec.source = re.source;
	test.unicode = exec.unicode = re.unicode;
	test.ignoreCase = exec.ignoreCase = re.ignoreCase;
	test.multiline = exec.multiline = source.indexOf('^')<0 && source.indexOf('$')<0 ? null : re.multiline;
	test.dotAll = exec.dotAll = source.indexOf('.')<0 ? null : re.dotAll;
	return re;
}

var NT = /[\n\t]+/g;
var ESCAPE = /\\./g;
function graveAccentReplacer ($$        ) { return $$==='\\`' ? '`' : $$; }

var includes = ''.includes       
	? function (that        , searchString        ) { return that.includes(searchString); }
	: function (that        , searchString        ) { return that.indexOf(searchString)>-1; };

function RE (               template                      ) {
	var U = this.U;
	var I = this.I;
	var M = this.M;
	var S = this.S;
	var raw = template.raw;
	var source = raw[0] .replace(NT, '');
	var index = 1;
	var length = arguments.length;
	while ( index!==length ) {
		var value            
			                       
			                          
			                             
			                            
			                         
		  = arguments[index];
		if ( typeof value==='string' ) { source += value; }
		else {
			var value_source = value.source;
			if ( typeof value_source!=='string' ) { throw TypeError('source'); }
			if ( value.unicode===U ) { throw SyntaxError('unicode'); }
			if ( value.ignoreCase===I ) { throw SyntaxError('ignoreCase'); }
			if ( value.multiline===M && ( includes(value_source, '^') || includes(value_source, '$') ) ) { throw SyntaxError('multiline'); }
			if ( value.dotAll===S && includes(value_source, '.') ) { throw SyntaxError('dotAll'); }
			source += value_source;
		}
		source += raw[index++] .replace(NT, '');
	}
	var re         = RegExp(U ? source = source.replace(ESCAPE, graveAccentReplacer) : source, this.flags);
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	test.source = exec.source = source;
	test.unicode = exec.unicode = U;
	test.ignoreCase = exec.ignoreCase = I;
	test.multiline = exec.multiline = includes(source, '^') || includes(source, '$') ? M : null;
	test.dotAll = exec.dotAll = includes(source, '.') ? S : null;
	return re;
}

var RE_bind = bind && /*#__PURE__*/bind.bind(RE       );

function Context (flags        )          {
	return {
		U: !includes(flags, 'u'),
		I: !includes(flags, 'i'),
		M: !includes(flags, 'm'),
		S: !includes(flags, 's'),
		flags: flags
	};
}

var CONTEXT          = /*#__PURE__*/Context('');

var newRegExp = Proxy
	? /*#__PURE__*/new Proxy(RE, {
		apply: function (RE, thisArg, args                                   ) { return apply(RE, CONTEXT, args); }
		,
		get: function (RE, flags        ) { return RE_bind(Context(flags)); }
		,
		defineProperty: function () { return false; }
		,
		preventExtensions: function () { return false; }
	})
	: /*#__PURE__*/function () {
		RE.apply = RE.apply;
		var newRegExp = function () { return RE.apply(CONTEXT, arguments       ); }       ;
		for ( var flags = 63; flags--; ) {
			( function (context) {
				newRegExp[context.flags] = function () { return RE.apply(context, arguments       ); };
			} )(Context(
				( flags & 32 ? '' : 'g' ) +
				( flags & 16 ? '' : 'i' ) +
				( flags &  8 ? '' : 'm' ) +
				( flags &  4 ? '' : 's' ) +
				( flags &  2 ? '' : 'u' ) +
				( flags &  1 ? '' : 'y' )
			));
		}
		return freeze ? freeze(newRegExp) : newRegExp;
	}();

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
var GROUP = /*#__PURE__*/create(NULL)         ;

function groupify (branches                   , uFlag          , noEscape          )         {
	var group = create(NULL)         ;
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index] ); }
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
			var sub_branches         = sourcify(group[character] , needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(character) ) { character = '\\' + character; }
			sub_branches ? branches.push(character + sub_branches) : singleCharactersBranch.push(character);
		}
		else { noEmptyBranch = false; }
	}
	singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length===1 ? singleCharactersBranch[0]  : '[' + singleCharactersBranch.join('') + ']');
	return branches.length===0
		? ''
		: ( branches.length===1 && ( singleCharactersBranch.length || noEmptyBranch )
			? branches[0]
			: '(?:' + branches.join('|') + ')'
		)
		+ ( noEmptyBranch ? '' : '?' );
}

Default({
	version: version,
	newRegExp: newRegExp,
	theRegExp: theRegExp,
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
function Replacer (scope             ) { return function replacer (__key__        )         { return scope[__key__.slice(2, -2)] ; }; }

var StaticScope = function StaticScope (                   keys          )       {
	prepare_ && prepare_(this);
	this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
	var _search = Search(keys);
	var _replacer = Replacer(this);
	for ( var index         = keys.length; index; ) { this[keys[--index] ] = Identifier(); }
}                
	                                  
	                       
 ;

var SCOPE              = StaticScope.prototype = /*#__PURE__*/freeze$1(create$1(null, {
	$: { value: $, writable: false, enumerable: false, configurable: false },
})               );

var InheritedStaticScope = /*#__PURE__*/function () {
	function InheritedStaticScope (                   keys          , proto             )       {
		prepare_ && prepare_(this);
		this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
		for ( var index         = keys.length; index; ) { this[keys[--index] ] = Identifier(); }
		for ( var key in proto ) { /*key==='_' || key==='$' || ( */
			keys[keys.length] = key/* )*/;
		}
		var _search = Search(keys);
		var _replacer = Replacer(this);
	}
	InheritedStaticScope.prototype = SCOPE;
	return InheritedStaticScope;
}()                
	                                                      
	                       
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
						key = value[--index] ;
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

function throwEmpty (keys        )        { throw Error('Scope("' + keys + '")'); }
var isStaticScope = /*#__PURE__*/isPrototypeOf.bind(SCOPE)                                            ;
var match_call                                                          = /*#__PURE__*/match.call.bind(match);

function mix (protos         )              {
	var scope              = create$1(SCOPE);
	for ( var length         = protos.length, index = 0; index<length; ++index ) {
		var proto        = protos[index];
		if ( typeof proto==='function' ) { proto = proto.prototype; }
		for ( var id in proto ) { scope[id] = proto[id]; }
	}
	return scope;
}

                                        

var Scope = /*#__PURE__*/function () {
	function Scope (                              keys         )        {
		if ( keys===undefined$1 ) {
			if ( this ) {
				if ( isArray(this) ) { return DynamicScope(mix(this           )); }
				else if ( typeof this==='function' && isStaticScope(this.prototype) ) { return DynamicScope(create$1(this.prototype)); }
				else if ( isStaticScope(this) ) { return DynamicScope(create$1(this)); }
			}
			return DynamicScope(create$1(SCOPE));
		}
		else {
			if ( this ) {
				if ( isArray(this) ) { var scope              = new InheritedStaticScope(match_call(keys, KEYS) || throwEmpty(keys), InheritedStaticScope.prototype = mix(this           )); }
				else if ( typeof this==='function' && isStaticScope(this.prototype) ) { scope = new InheritedStaticScope(match_call(keys, KEYS) || throwEmpty(keys), InheritedStaticScope.prototype = this.prototype); }
				else if ( isStaticScope(this) ) { scope = new InheritedStaticScope(match_call(keys, KEYS) || throwEmpty(keys), InheritedStaticScope.prototype = this); }
				else { return new StaticScope(match_call(keys, KEYS) || throwEmpty(keys)); }
				InheritedStaticScope.prototype = SCOPE;
				return scope;
			}
			else { return new StaticScope(match_call(keys, KEYS) || throwEmpty(keys)); }
		}
	}
	//@ts-ignore
	Scope.prototype = null;
	return freeze$1(Scope);
}();

function Template (html        , scope       )         {
	return /*#__PURE__*/scope[_](html);
}

var IS_NOT_ES5 = /*#__PURE__*/test.bind(/^(cons|le)t /);

function WithStripped (render                                   ) {
	render._withStripped = true;
	return render;
}

function Render (code        , scope        )                                          {
	return code[0]==='('
		? /*#__PURE__*/Function('"use strict";return class Render extends null{constructor' + ( scope ? scope[_](code) : code ) + '};')()                                  
		: /*#__PURE__*/WithStripped(
			/*#__PURE__*/Function(/*#__PURE__*/IS_NOT_ES5(code)
				? '"use strict";return{render(){' + ( scope ? scope[_](code) : code ) + '}}.render;'
				: '"use strict";return function render(){' + ( scope ? scope[_](code) : code ) + '};'
			)()          
		);
}
function StaticRenderFns (codes                   , scope        )           {
	var index         = codes.length;
	var body         = ']';
	if ( scope ) {
		for ( var scope_ = scope[_]; index; ) { body = 'function(){' + scope_(codes[--index] ) + '},' + body; }
	}
	else {
		while ( index ) { body = 'function(){' + codes[--index] + '},' + body; }
	}
	return Function('"use strict";return[' + body)();
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
			name = nowNames[--index] ;
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

var Component           = /*#__PURE__*/freeze$1(/*#__PURE__*/defineProperties(
	function Component () { return that; },
	{
		prototype: {
			configurable: false,
			enumerable: false,
			value: null,
		},
		render: {
			enumerable: false,
			get: function render (          ) { throw TypeError('Component.render='); },
			set: function render (            value                     ) { ( that ._ || that .$options ).render = value; },
		},
		_main: {
			enumerable: false,
			get: function _main (              ) {
				var Component = this;
				if ( !isComponentConstructor(Component) ) { throw TypeError('(!Component)._main'); }
				return function _main (             )       {
					if ( once ) { throw Error('Component._main()x2'); }
					if ( this!==Component && isComponentConstructor(this) ) { throw TypeError('(Component!this)._main()'); }
					var Vue = Function('return Vue')();
					if ( typeof Vue==='object' ) {
						var dev = isArray(( window                                ).devtoolsFormatters);
						var app = Vue.createApp(
							ToOptions(
								Component,
								Vue,
								dev ? create$1(NULL) : undefined$1
							)
						);
						defineProperty(app.config, 'isCustomElement', { value: test.bind(STARTS_WITH_LOWERCASE), writable: true });
						if ( dev ) {
							THROW_IRREPARABLE = false;
							app.config.performance = true;
						}
						app.mount(document.body);
					}
					else {
						new ( Vue.extend(
							ToOptions(
								Component,
								undefined$1,
								Vue.devtools ? ( Vue.config.ignoredElements.push(STARTS_WITH_LOWERCASE), Vue.config.performance = true, create$1(NULL) ) : undefined$1
							)
						) )()
						.$mount(( document.body.innerHTML = '<br>', 'br' ));
					}
					once = true;
				};
			},
			set: undefined$1,
		},
		_toOptions: {
			enumerable: false,
			value: function _toOptions (                Vue3        , __dev__                                               ) {
				if ( !isComponentConstructor(this) ) { throw TypeError('(!Component)._toOptions()'); }
				return ToOptions(this, Vue3, __dev__);
			},
		},
	}
));
var once = false;

function ToOptions (            constructor          , Vue3        , __dev__                                               ) {
	var DID_OPTIONS = OPTIONS.objects.into(__dev__ || OPTIONS       ).into(Vue3 || OPTIONS       );
	var TMP_OPTIONS = new OPTIONS.objectsTmp;
	var options = Options(
		constructor,
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
}

var _mixins                = Symbol && /*#__PURE__*/Symbol('_mixins')                 ;

function __PURE__ (            Sub     , mixins       ) {
	Sub.prototype = null;
	Sub[_mixins] = mixins;
	return setPrototypeOf(Sub, Component);
}

function mixin (          ) {
	return arguments.length
		? /*#__PURE__*/__PURE__(function () { return that; }, /*#__PURE__*/from(arguments))
		: Component;
}

function Options (constructor          , Vue3                   , __dev__                , DID_OPTIONS                               , TMP_OPTIONS                           )             {
	
	var options                         = DID_OPTIONS.get(constructor) || TMP_OPTIONS.get(constructor);
	if ( options ) { return options; }
	OPTIONS.constructor.set(options = create$1(NULL)              , constructor);
	
	if ( isMixins(constructor) ) {
		var static_mixins = constructor[_mixins] ;
		var mixins = new OPTIONS.Set            ();
		var index = 0;
		while ( index!==static_mixins.length ) {
			var mixin = static_mixins[index++] ;
			if ( isComponentConstructor(mixin) ) {
				var mixinOptions = Options(mixin, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
				if ( isMixins(mixin) ) {
					var mixinMixins = mixinOptions.mixins ;
					var mixinIndex = 0;
					while ( mixinIndex!==mixinMixins.length ) { mixins.add(mixinMixins[mixinIndex++] ); }
				}
				else { mixins.add(mixinOptions); }
			}
			else { mixins.add(mixin              ); }
		}
		options.mixins = from(mixins);
		__dev__ && check(options, __dev__);
		collectNames(options, constructor);
		TMP_OPTIONS.set(constructor, options);
		return options;
	}
	
	var prototype = constructor.prototype;
	
	var Super = OPTIONS.super.get(constructor);
	if ( !Super ) {
		OPTIONS.super.set(constructor, Super = getPrototypeOf$1(constructor));
		Super===Component || isMixins(Super) || ( setPrototypeOf(constructor, Component), setPrototypeOf(prototype, null) );
	}
	if ( Super!==Component ) {
		var SuperOptions = Options(Super, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
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
		var staticName = staticNames[--index] ;
		if ( staticName==='Render' ) { var Render                                  = constructor[staticName]                       ; }
		//@ts-ignore
		else if ( staticName==='name' || staticName==='length' ) {
			descriptor = getOwnPropertyDescriptor(constructor, staticName);
			if ( descriptor.hasOwnProperty('value') ) {
				descriptor.enumerable && set(options, staticName, descriptor.value);
			}
			else {
				set(options, staticName, apply(descriptor.get , constructor, ARGS));
			}
		}
		else if ( staticName==='data' ) {
			if ( __dev__ ) {
				if ( constructor[staticName]!==undefined$1 ) { throw Error(isArray(constructor[staticName]) ? __dev__.compile_layer : __dev__.compile_type); }
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
					staticName==='inject' || staticName==='props' || protoName1==='emits'
				) { throw Error(__dev__.compile_layer); }
			}
			//@ts-ignore
			set(options, staticName, constructor[staticName]);
		}
	}
	
	var protoDescriptors                          = null;
	
	var protoNames = getOwnPropertyNames(prototype);
	index = protoNames.length;
	var watchers            = [];
	var skipData = false;
	var dataNames               = null;
	while ( index ) {
		var protoName = protoNames[--index] ;
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
					protoName1==='components' || protoName1==='directives' || protoName1==='staticRenderFns' || protoName1==='template' || protoName1==='inheritAttrs' ||
					protoName1==='name' ||
					protoName1==='Render' ||
					protoName1==='delimiters' ||
					protoName1==='filters' || protoName1==='comments' || protoName1==='functional' || protoName1==='propsData' || protoName1==='model'
				) { throw Error(__dev__.compile_layer); }
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
			var protoSymbol                = protoSymbols[--index] ;
			protoDescriptors [protoSymbol] = assign(create$1(NULL), getOwnPropertyDescriptor(prototype, protoSymbol));
		}
		while ( index );
	}
	protoDescriptors && OPTIONS.proto.set(options, protoDescriptors = assign(create$1(NULL), protoDescriptors));
	
	__dev__ && check(options, __dev__);
	
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
					return apply(beforeMount , this, ARGS);
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
					return apply(created , this, ARGS);
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
					return apply(created , this, ARGS);
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
					return apply(created , this, ARGS);
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
					return apply(created , this, ARGS);
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
					return apply(created , this, ARGS);
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
		if ( __dev__ ) {
			for ( pascal in components ) {
				if ( !pascal || STARTS_WITH_LOWERCASE.test(pascal) ) { throw Error(__dev__.compile_name); }
			}
			if ( THROW_IRREPARABLE && Vue3 && !options.render && options.template ) {
				if (
					//@ts-ignore
					options.name && INCLUDES_UPPERCASE.test(options.name.slice(1))
				) { throw Error(__dev__.compile_case); }
				if (
					//@ts-ignore
					options.displayName && INCLUDES_UPPERCASE.test(options.displayName.slice(1))
				) { throw Error(__dev__.compile_case); }
				for ( pascal in components ) {
					if ( INCLUDES_UPPERCASE.test(pascal.slice(1)) ) { throw Error(__dev__.compile_case); }
				}
			}
		}
		for ( var pascal in components ) {
			var value = components[pascal] ;
			if ( isComponentConstructor(value) ) { components[pascal] = Options(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS); }
		}
		if ( !Vue3 ) {
			var cases = create$1(NULL)         ;
			//@ts-ignore
			options.name && fixPascal(options.name, cases);
			//@ts-ignore
			options.displayName && fixPascal(options.displayName, cases);
			for ( pascal in components ) { fixPascal(pascal, cases); }
			assign(components, cases, components);
		}
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
                                                                                

var isComponentConstructor = /*#__PURE__*/isPrototypeOf.bind(Component)                                     ;

var ARGS = []         ;

var _MIXINS = [ _mixins ]         ;
function isMixins (constructor          ) { return apply(hasOwnProperty, constructor, _MIXINS); }

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
			if ( mixins ) { for ( var index = mixins.length; index; ) { assign(restNames, collectNames(mixins[--index] , null)); } }
			var props = options.props;
			var name        ;
			if ( isArray(props) ) { for ( index = props.length; index; ) { restNames[props[--index] ] = null; } }
			else { for ( name in props ) { restNames[name] = null; } }
			props = options.inject;
			if ( isArray(props) ) { for ( index = props.length; index; ) { restNames[props[--index] ] = null; } }
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

var THROW_IRREPARABLE = true;
var INCLUDES_UPPERCASE = /[A-Z]/;
var STARTS_WITH_LOWERCASE = /^[a-z]/;
var CHECKED = WeakMap && /*#__PURE__*/new WeakMap                                                     ();
function forKeys (option                , callback                        ) {
	if ( isArray(option) ) { option.forEach(callback); }
	else { for ( var key in option ) { callback(key); } }
}
function check (options                                                                        , __dev__         )                               {
	
	var belong = OPTIONS.constructor.get(options) || options;
	var ownKeys = CHECKED.get(belong);
	if ( ownKeys ) { return ownKeys; }
	var allKeys = create$1(NULL)                                ;
	
	( options.extends ? [ options.extends ] : [] ).concat(options.mixins || []).forEach(function (mixin) {
		var mixinNames = check(mixin, __dev__);
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
		if ( typeof name!=='string' ) { throw Error(__dev__.compile_type); }
		if ( /-|^(?:key$|on|ref$)/.test(name) ) { throw Error(__dev__.compile_props); }
		if ( name in PROTO_BUG ) { throw Error(__dev__.proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error(__dev__.compile_reserved); }
		if ( name in ownKeys  ) { throw Error(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	});
	
	forKeys(options.inject, function (name) {
		if ( typeof name!=='string' ) { throw Error(__dev__.compile_type); }
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
			? !name || STARTS_WITH_LOWERCASE.test(name) || options.components && name in options.components && options.components[name]!==options
			: name!==undefined$1
		) { throw Error(__dev__.compile_name); }
	});
	
	options.emits &&
	( isArray(options.emits) ? options.emits : Keys(options.emits) ).forEach(function (event) {
		if ( typeof event!=='string' ) { throw Error(__dev__.compile_type); }
		if ( /(?:capture|once|passive)$/i.test('on' + event) || /^-?[vV]node/.test(event) ) { throw Error(__dev__.compile_emits); }
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
	var First = pascal[0] ;
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
		var char = after[index] ;
		after = after.slice(index + 1);
		hyphenate(before + '-' + char.toLowerCase(), after, cases);
		hyphenate(before + '-' + char, after, cases);
		before[before.length - 1]==='-' || hyphenate(before + char, after, cases);
	}
}

var DEV                               = [
	'proto',
	'compile_case',
	'compile_name',
	'compile_props',
	'compile_emits',
	'compile_is',
	'compile_layer',
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
];

function created (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) :                                     ( el[binding.arg] = binding.value ); }
function updated (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : binding.oldValue===binding.value || ( el[binding.arg] = binding.value ); }

var prop = /*#__PURE__*/freeze$1(create$1(NULL, {
	
	created: { value: created, enumerable: true },
	bind: { value: created, enumerable: true },
	
	updated: { value: updated, enumerable: true },
	componentUpdated: { value: updated, enumerable: true },
	
}));

var _export = Default$1({
	version: version$1,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
	prop: prop,
});

export default _export;
export { Component, Identifier, Render, Scope, StaticRenderFns, Style, Template, mixin, prop, remove, version$1 as version };

/*¡ j-vue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvdmVyc2lvbj90ZXh0IiwiLi4vLi4vLi4vai1yZWdleHAvc3JjL3RoZVJlZ0V4cC50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9uZXdSZWdFeHAudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvY2xlYXJSZWdFeHAudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZXhwb3J0LnRzIiwiU2NvcGUvXy50cyIsIlNjb3BlL1N0YXRpY1Njb3BlLnRzIiwiU2NvcGUvS0VZUy50cyIsIlNjb3BlL0R5bmFtaWNTY29wZS50cyIsIlNjb3BlLy50cyIsIlRlbXBsYXRlLnRzIiwiUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsInYtcHJvcC50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcyNi4wLjAnOyIsImltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IGpvaW4gZnJvbSAnLkFycmF5LnByb3RvdHlwZS5qb2luJztcbmltcG9ydCB1bnNoaWZ0IGZyb20gJy5BcnJheS5wcm90b3R5cGUudW5zaGlmdCc7XG5cbnZhciBvYmplY3QgPSB7XG5cdCcwJzogJzEnLCAnMSc6ICcyJywgJzInOiAnMycsICczJzogJzQnLCAnNCc6ICc1JywgJzUnOiAnNicsICc2JzogJzcnLCAnNyc6ICc4JywgJzgnOiAnOScsICc5JzogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn0gICAgICAgICA7XG5cbnZhciBsYXN0SXRlbSAgICAgICA9ICd6JztcbnZhciBhcnJheSAgICAgICAgID0gWyBsYXN0SXRlbSBdO1xudmFyIGxhc3RJbmRleCAgICAgICAgID0gYXJyYXkubGVuZ3RoIC0gMTtcblxudmFyIG5vdEtleXdvcmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Rlc3QuYmluZCgvXFxkLyk7XG52YXIgdG9TdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9qb2luLmJpbmQoYXJyYXksICcnKTtcbnZhciBwcmVwZW5kQSAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Vuc2hpZnQuYmluZChhcnJheSwgJ2EnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSAgICAgICAgIHtcblx0aWYgKCBsYXN0SXRlbT09PSc5JyApIHtcblx0XHRhcnJheVtsYXN0SW5kZXhdID0gJ2EnO1xuXHRcdHZhciBzdHJpbmcgICAgICAgIDtcblx0XHRpZiAoIG5vdEtleXdvcmQoc3RyaW5nID0gdG9TdHJpbmcoKSkgKSB7XG5cdFx0XHRsYXN0SXRlbSA9ICdhJztcblx0XHRcdHJldHVybiBzdHJpbmc7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsYXN0SXRlbSE9PSd6JyApIHtcblx0XHRsYXN0SXRlbSA9IGFycmF5W2xhc3RJbmRleF0gPSBvYmplY3RbbGFzdEl0ZW1dO1xuXHRcdHJldHVybiB0b1N0cmluZygpO1xuXHR9XG5cdGxhc3RJdGVtID0gYXJyYXlbbGFzdEluZGV4XSA9ICcwJztcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IGluZGV4OyBhcnJheVtpbmRleF0gPSAnMCcgKSB7XG5cdFx0dmFyIGl0ZW0gICAgICAgPSBhcnJheVstLWluZGV4XSA7XG5cdFx0aWYgKCBpdGVtIT09J3onICkge1xuXHRcdFx0YXJyYXlbaW5kZXhdID0gb2JqZWN0W2l0ZW1dO1xuXHRcdFx0cmV0dXJuIHRvU3RyaW5nKCk7XG5cdFx0fVxuXHR9XG5cdGxhc3RJbmRleCA9IHByZXBlbmRBKCkgLSAxO1xuXHRyZXR1cm4gdG9TdHJpbmcoKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiZXhwb3J0IGRlZmF1bHQnOC4wLjAnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aGVSZWdFeHAgKHJlICAgICAgICApICAgICAgICAge1xuXHR2YXIgdGVzdCA9IHJlLnRlc3QgPSBUZXN0KHJlKTtcblx0dmFyIGV4ZWMgPSByZS5leGVjID0gRXhlYyhyZSk7XG5cdHZhciBzb3VyY2UgPSB0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gcmUuc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSByZS51bmljb2RlO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSByZS5pZ25vcmVDYXNlO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gc291cmNlLmluZGV4T2YoJ14nKTwwICYmIHNvdXJjZS5pbmRleE9mKCckJyk8MCA/IG51bGwgOiByZS5tdWx0aWxpbmU7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBzb3VyY2UuaW5kZXhPZignLicpPDAgPyBudWxsIDogcmUuZG90QWxsO1xuXHRyZXR1cm4gcmU7XG59O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemU/JztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbnZhciBpbmNsdWRlcyA9ICcnLmluY2x1ZGVzICAgICAgIFxuXHQ/IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluY2x1ZGVzKHNlYXJjaFN0cmluZyk7IH1cblx0OiBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmRleE9mKHNlYXJjaFN0cmluZyk+LTE7IH07XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICckJykgKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ211bHRpbGluZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmRvdEFsbD09PVMgJiYgaW5jbHVkZXModmFsdWVfc291cmNlLCAnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gVTtcblx0dGVzdC5pZ25vcmVDYXNlID0gZXhlYy5pZ25vcmVDYXNlID0gSTtcblx0dGVzdC5tdWx0aWxpbmUgPSBleGVjLm11bHRpbGluZSA9IGluY2x1ZGVzKHNvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyhzb3VyY2UsICckJykgPyBNIDogbnVsbDtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IGluY2x1ZGVzKHNvdXJjZSwgJy4nKSA/IFMgOiBudWxsO1xuXHRyZXR1cm4gcmU7XG59XG5cbnZhciBSRV9iaW5kID0gYmluZCAmJiAvKiNfX1BVUkVfXyovYmluZC5iaW5kKFJFICAgICAgICk7XG5cbmZ1bmN0aW9uIENvbnRleHQgKGZsYWdzICAgICAgICApICAgICAgICAgIHtcblx0cmV0dXJuIHtcblx0XHRVOiAhaW5jbHVkZXMoZmxhZ3MsICd1JyksXG5cdFx0STogIWluY2x1ZGVzKGZsYWdzLCAnaScpLFxuXHRcdE06ICFpbmNsdWRlcyhmbGFncywgJ20nKSxcblx0XHRTOiAhaW5jbHVkZXMoZmxhZ3MsICdzJyksXG5cdFx0ZmxhZ3M6IGZsYWdzXG5cdH07XG59XG5cbnZhciBDT05URVhUICAgICAgICAgID0gLyojX19QVVJFX18qL0NvbnRleHQoJycpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm94eVxuXHQ/IC8qI19fUFVSRV9fKi9uZXcgUHJveHkoUkUsIHtcblx0XHRhcHBseTogZnVuY3Rpb24gKFJFLCB0aGlzQXJnLCBhcmdzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHsgcmV0dXJuIGFwcGx5KFJFLCBDT05URVhULCBhcmdzKTsgfVxuXHRcdCxcblx0XHRnZXQ6IGZ1bmN0aW9uIChSRSwgZmxhZ3MgICAgICAgICkgeyByZXR1cm4gUkVfYmluZChDb250ZXh0KGZsYWdzKSk7IH1cblx0XHQsXG5cdFx0ZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0LFxuXHRcdHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9KVxuXHQ6IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdFx0UkUuYXBwbHkgPSBSRS5hcHBseTtcblx0XHR2YXIgbmV3UmVnRXhwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUkUuYXBwbHkoQ09OVEVYVCwgYXJndW1lbnRzICAgICAgICk7IH0gICAgICAgO1xuXHRcdGZvciAoIHZhciBmbGFncyA9IDYzOyBmbGFncy0tOyApIHtcblx0XHRcdCggZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRcdFx0bmV3UmVnRXhwW2NvbnRleHQuZmxhZ3NdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUkUuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzICAgICAgICk7IH07XG5cdFx0XHR9ICkoQ29udGV4dChcblx0XHRcdFx0KCBmbGFncyAmIDMyID8gJycgOiAnZycgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAxNiA/ICcnIDogJ2knICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDggPyAnJyA6ICdtJyApICtcblx0XHRcdFx0KCBmbGFncyAmICA0ID8gJycgOiAncycgKSArXG5cdFx0XHRcdCggZmxhZ3MgJiAgMiA/ICcnIDogJ3UnICkgK1xuXHRcdFx0XHQoIGZsYWdzICYgIDEgPyAnJyA6ICd5JyApXG5cdFx0XHQpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZyZWV6ZSA/IGZyZWV6ZShuZXdSZWdFeHApIDogbmV3UmVnRXhwO1xuXHR9KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG4gICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFJFR0VYUCA9IC9eLztcblx0XHRSRUdFWFAudGVzdCA9IFJFR0VYUC50ZXN0O1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSAvKiNfX1BVUkVfXyovY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdICk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyYWN0ZXJdIHx8ICggZ3JvdXBbY2hhcmFjdGVyXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICApLCBicmFuY2guc2xpY2UoY2hhcmFjdGVyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kQ29kZUJyYW5jaChncm91cFtjaGFyYWN0ZXJdIHx8ICggZ3JvdXBbY2hhcmFjdGVyXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgICAgICAgLCBuZWVkRXNjYXBlICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGJyYW5jaGVzICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCAgICAgICAgICAgPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggICAgICAgICAgPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhcmFjdGVyIGluIGdyb3VwICkge1xuXHRcdGlmICggY2hhcmFjdGVyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyAgICAgICAgID0gc291cmNpZnkoZ3JvdXBbY2hhcmFjdGVyXSAsIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJyArIGNoYXJhY3RlcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyYWN0ZXIgKyBzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXJhY3Rlcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gIDogJ1snICsgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSArICddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonICsgYnJhbmNoZXMuam9pbignfCcpICsgJyknXG5cdFx0KVxuXHRcdCsgKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCB0aGVSZWdFeHAgZnJvbSAnLi90aGVSZWdFeHAnO1xuaW1wb3J0IG5ld1JlZ0V4cCBmcm9tICcuL25ld1JlZ0V4cCc7XG5pbXBvcnQgY2xlYXJSZWdFeHAgZnJvbSAnLi9jbGVhclJlZ0V4cCc7XG5pbXBvcnQgZ3JvdXBpZnkgZnJvbSAnLi9ncm91cGlmeSc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdG5ld1JlZ0V4cCxcblx0dGhlUmVnRXhwLFxuXHRjbGVhclJlZ0V4cCxcblx0Z3JvdXBpZnksXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRuZXdSZWdFeHA6IG5ld1JlZ0V4cCxcblx0dGhlUmVnRXhwOiB0aGVSZWdFeHAsXG5cdGNsZWFyUmVnRXhwOiBjbGVhclJlZ0V4cCxcblx0Z3JvdXBpZnk6IGdyb3VwaWZ5XG59KTtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbD8nO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG52YXIgXyAgICAgID0gU3ltYm9sID8gLyojX19QVVJFX18qL1N5bWJvbCgnXycpICAgICAgICA6ICdfJztcblxuZnVuY3Rpb24gJCAgICAgICAgICAgICAgICAgICggICAgICAgICBjc3MgICAgICAgICAsIG1lZGlhICAgICAgICAgKSAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXNbX10oY3NzKTsgfVxuXHRpZiAoIG1lZGlhIT09dW5kZWZpbmVkICkgeyBzdHlsZS5tZWRpYSA9IG1lZGlhOyB9XG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IHsgXywgJCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgcHJlcGFyZV8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB0eXBlb2YgXz09PSdzeW1ib2wnID8gbnVsbCA6IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHZhciBfZGVzY3JpcHRvciA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICA7XG5cdF9kZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0X2Rlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXHRfZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0cmV0dXJuIGZ1bmN0aW9uICQgKHNjb3BlICAgICAgICkgeyBkZWZpbmVQcm9wZXJ0eShzY29wZSwgXywgX2Rlc2NyaXB0b3IpOyB9O1xufSgpO1xuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIFJlZ0V4cCgnX18nICsgZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpICsgJ19fJywgJ2cnKTsgfVxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkgeyByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV0gOyB9OyB9XG5cbnZhciBTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICApICAgICAgIHtcblx0cHJlcGFyZV8gJiYgcHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF0gXSA9IElkZW50aWZpZXIoKTsgfVxufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxudmFyIFNDT1BFICAgICAgICAgICAgICA9IFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IC8qI19fUFVSRV9fKi9mcmVlemUoY3JlYXRlKG51bGwsIHtcblx0JDogeyB2YWx1ZTogJCwgd3JpdGFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiBmYWxzZSB9LFxufSkgICAgICAgICAgICAgICApO1xuXG52YXIgSW5oZXJpdGVkU3RhdGljU2NvcGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBJbmhlcml0ZWRTdGF0aWNTY29wZSAoICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICAgLCBwcm90byAgICAgICAgICAgICApICAgICAgIHtcblx0XHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0XHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF0gXSA9IElkZW50aWZpZXIoKTsgfVxuXHRcdGZvciAoIHZhciBrZXkgaW4gcHJvdG8gKSB7IC8qa2V5PT09J18nIHx8IGtleT09PSckJyB8fCAoICovXG5cdFx0XHRrZXlzW2tleXMubGVuZ3RoXSA9IGtleS8qICkqLztcblx0XHR9XG5cdFx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdFx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHR9XG5cdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xuXHRyZXR1cm4gSW5oZXJpdGVkU3RhdGljU2NvcGU7XG59KCkgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IHsgU3RhdGljU2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRTdGF0aWNTY29wZSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJleHBvcnQgZGVmYXVsdCAvW15cXHgwMC1AWy1gey1cXHg3Rlxcc11bXlxceDAwLS86LUBbLWB7LVxceDdGXFxzXSooPzpfW15cXHgwMC0vOi1AWy1gey1cXHg3Rlxcc10rKSovZzsiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuXG5pbXBvcnQgS0VZUyBmcm9tICcuL0tFWVMnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBfX0tFWV9fID0gUmVnRXhwKCdfXycgKyBLRVlTLnNvdXJjZSArICdfXycsICdnJyk7XG5cbmZ1bmN0aW9uIGdldCAoY2FjaGUgICAgICAgICAgICAgLCBrZXkgICAgICAgICkgICAgICAgICB7IHJldHVybiBjYWNoZVtrZXldIHx8ICggY2FjaGVba2V5XSA9IElkZW50aWZpZXIoKSApOyB9XG5cbmZ1bmN0aW9uIHNjb3BpZnkgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FjaGUgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGtleXMgICAgICAgICxcblx0XHRpbmRleCAgICAgICAgLFxuXHRcdHZhbHVlcyAgICAgICAgICAsXG5cdFx0a2V5ICAgICAgICA7XG5cdGlmICggdmFsdWUgKSB7XG5cdFx0c3dpdGNoICggdHlwZW9mIHZhbHVlICkge1xuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0aWYgKCB2YWx1ZS5pbmRleE9mKCcgJyk8MCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZ2V0KGNhY2hlLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZXMubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVstLWluZGV4XSA7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGdldChjYWNoZSwga2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlWy0taW5kZXhdLCBjYWNoZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK2dldChjYWNoZSwga2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRpZiAoIGxlbmd0aD4xICkge1xuXHRcdFx0dmFsdWUgPSBbIHZhbHVlLCBhcmd1bWVudHNbMV0gXTtcblx0XHRcdGZvciAoIHZhciBpbmRleCA9IDI7IGluZGV4IT09bGVuZ3RoOyArK2luZGV4ICkgeyAoIHZhbHVlICAgICAgICAgIClbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gc2NvcGlmeSh2YWx1ZSwgY2FjaGUpO1xuXHR9ICAgICAgICAgICAgICAgIDtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfX0tFWV9fLCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBnZXQoY2FjaGUsIF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IER5bmFtaWNTY29wZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCBtYXRjaCBmcm9tICcuU3RyaW5nLnByb3RvdHlwZS5tYXRjaCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBTdGF0aWNTY29wZSwgSW5oZXJpdGVkU3RhdGljU2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgRHluYW1pY1Njb3BlIGZyb20gJy4vRHluYW1pY1Njb3BlJztcbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5cbmZ1bmN0aW9uIHRocm93RW1wdHkgKGtleXMgICAgICAgICkgICAgICAgIHsgdGhyb3cgRXJyb3IoJ1Njb3BlKFwiJyArIGtleXMgKyAnXCIpJyk7IH1cbnZhciBpc1N0YXRpY1Njb3BlID0gLyojX19QVVJFX18qL2lzUHJvdG90eXBlT2YuYmluZChTQ09QRSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbnZhciBtYXRjaF9jYWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL21hdGNoLmNhbGwuYmluZChtYXRjaCk7XG5cbmZ1bmN0aW9uIG1peCAocHJvdG9zICAgICAgICAgKSAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgICAgICAgICAgICAgID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvICAgICAgICA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9IHByb3RvLnByb3RvdHlwZTsgfVxuXHRcdGZvciAoIHZhciBpZCBpbiBwcm90byApIHsgc2NvcGVbaWRdID0gcHJvdG9baWRdOyB9XG5cdH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbnZhciBTY29wZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIFNjb3BlICggICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgKSAgICAgICAge1xuXHRcdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdGhpcyApIHtcblx0XHRcdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKG1peCh0aGlzICAgICAgICAgICApKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIGlzU3RhdGljU2NvcGUodGhpcy5wcm90b3R5cGUpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSkpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCBpc1N0YXRpY1Njb3BlKHRoaXMpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKFNDT1BFKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKCB0aGlzICkge1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHZhciBzY29wZSAgICAgICAgICAgICAgPSBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiBpc1N0YXRpY1Njb3BlKHRoaXMucHJvdG90eXBlKSApIHsgc2NvcGUgPSBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIGlzU3RhdGljU2NvcGUodGhpcykgKSB7IHNjb3BlID0gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKG1hdGNoX2NhbGwoa2V5cywgS0VZUykgfHwgdGhyb3dFbXB0eShrZXlzKSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gdGhpcyk7IH1cblx0XHRcdFx0ZWxzZSB7IHJldHVybiBuZXcgU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpKTsgfVxuXHRcdFx0XHRJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcblx0XHRcdFx0cmV0dXJuIHNjb3BlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHJldHVybiBuZXcgU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpKTsgfVxuXHRcdH1cblx0fVxuXHQvL0B0cy1pZ25vcmVcblx0U2NvcGUucHJvdG90eXBlID0gbnVsbDtcblx0cmV0dXJuIGZyZWV6ZShTY29wZSk7XG59KCk7XG5cbmV4cG9ydCB7IFNjb3BlIGFzIGRlZmF1bHQsIEtFWVMgfTsiLCJpbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gVGVtcGxhdGUgKGh0bWwgICAgICAgICwgc2NvcGUgICAgICAgKSAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi9zY29wZVtfXShodG1sKTtcbn1cblxuZXhwb3J0IHsgVGVtcGxhdGUgYXMgZGVmYXVsdCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5pbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG52YXIgSVNfTk9UX0VTNSA9IC8qI19fUFVSRV9fKi90ZXN0LmJpbmQoL14oY29uc3xsZSl0IC8pO1xuXG5mdW5jdGlvbiBXaXRoU3RyaXBwZWQgKHJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZTtcblx0cmV0dXJuIHJlbmRlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyIChjb2RlICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRyZXR1cm4gY29kZVswXT09PScoJ1xuXHRcdD8gLyojX19QVVJFX18qL0Z1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm4gY2xhc3MgUmVuZGVyIGV4dGVuZHMgbnVsbHtjb25zdHJ1Y3RvcicgKyAoIHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlICkgKyAnfTsnKSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdDogLyojX19QVVJFX18qL1dpdGhTdHJpcHBlZChcblx0XHRcdC8qI19fUFVSRV9fKi9GdW5jdGlvbigvKiNfX1BVUkVfXyovSVNfTk9UX0VTNShjb2RlKVxuXHRcdFx0XHQ/ICdcInVzZSBzdHJpY3RcIjtyZXR1cm57cmVuZGVyKCl7JyArICggc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUgKSArICd9fS5yZW5kZXI7J1xuXHRcdFx0XHQ6ICdcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24gcmVuZGVyKCl7JyArICggc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUgKSArICd9Oydcblx0XHRcdCkoKSAgICAgICAgICBcblx0XHQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGNvZGVzLmxlbmd0aDtcblx0dmFyIGJvZHkgICAgICAgICA9ICddJztcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4OyApIHsgYm9keSA9ICdmdW5jdGlvbigpeycgKyBzY29wZV8oY29kZXNbLS1pbmRleF0gKSArICd9LCcgKyBib2R5OyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleCApIHsgYm9keSA9ICdmdW5jdGlvbigpeycgKyBjb2Rlc1stLWluZGV4XSArICd9LCcgKyBib2R5OyB9XG5cdH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bJyArIGJvZHkpKCk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHlsZSAoY3NzICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgS2V5cyBmcm9tICcuT2JqZWN0LmtleXMnO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz8nO1xuaW1wb3J0IGdldE93blByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbj8nO1xuaW1wb3J0IGdldFByb3RvdHlwZU9mIGZyb20gJy5PYmplY3QuZ2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IHByb3BlcnR5SXNFbnVtZXJhYmxlIGZyb20gJy5PYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlJztcbmltcG9ydCBlcnJvciBmcm9tICcuY29uc29sZS5lcnJvcic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuZXhwb3J0IHZhciB0aGF0ICAgICAgICAgICAgICAgICA9IG51bGw7XG5cbmV4cG9ydCB2YXIgTkFNRVMgPSBhc3NpZ24gJiYgLyojX19QVVJFX18qL2Fzc2lnbihjcmVhdGUobnVsbCksIHtcblx0XzogbnVsbCxcblx0X2M6IG51bGwsXG5cdF9jb21wdXRlZFdhdGNoZXJzOiBudWxsLFxuXHRfZGF0YTogbnVsbCxcblx0X2RpcmVjdEluYWN0aXZlOiBudWxsLFxuXHRfZXZlbnRzOiBudWxsLFxuXHRfaGFzSG9va0V2ZW50OiBudWxsLFxuXHRfaGFzTW92ZTogbnVsbCxcblx0X2luYWN0aXZlOiBudWxsLFxuXHRfaXNCZWluZ0Rlc3Ryb3llZDogbnVsbCxcblx0X2lzRGVzdHJveWVkOiBudWxsLFxuXHRfaXNNb3VudGVkOiBudWxsLFxuXHRfaXNWdWU6IG51bGwsXG5cdF9sZWF2aW5nOiBudWxsLFxuXHRfbmFtZTogbnVsbCxcblx0X3Byb3BzOiBudWxsLFxuXHRfcHJvdmlkZWQ6IG51bGwsXG5cdF9yZWZsb3c6IG51bGwsXG5cdF9yZW5kZXJQcm94eTogbnVsbCxcblx0X3NlbGY6IG51bGwsXG5cdF9zdGF0aWNUcmVlczogbnVsbCxcblx0X3VpZDogbnVsbCxcblx0X3VwZGF0ZTogbnVsbCxcblx0X3Zub2RlOiBudWxsLFxuXHRfd2F0Y2hlcjogbnVsbCxcblx0X3dhdGNoZXJzOiBudWxsLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9Qcm90byAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdGRlZmluZVByb3BlcnRpZXMoXyA/IF8uY3R4IDogc2VsZiwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvQ29uc3RydWN0b3IgKHNlbGYgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvTmFtZXMgKHNlbGYgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCBkYXRhTmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHR2YXIgZGF0YSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRhdGFOYW1lcykgICAgICAgIDtcblx0aWYgKCBfICkge1xuXHRcdHZhciBhY2Nlc3NDYWNoZSA9IF8uYWNjZXNzQ2FjaGU7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gZGF0YU5hbWVzICkge1xuXHRcdFx0ZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdO1xuXHRcdFx0aWYgKCBuYW1lIGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGZvciAoIG5hbWUgaW4gZGF0YU5hbWVzICkgeyBkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07IH1cblx0fVxuXHRzaGFkb3dBc3NpZ25lciAmJiBzaGFkb3dBc3NpZ25lcihzZWxmLCBkYXRhKTtcblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvRGF0YSAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIHJlc3ROYW1lcyAgICAgICAsIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdHZhciBkYXRhID0gY3JlYXRlKE5VTEwpICAgICAgICA7XG5cdGlmICggXyApIHtcblx0XHR2YXIgYWNjZXNzQ2FjaGUgPSBfLmFjY2Vzc0NhY2hlO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIGN0eCApIHtcblx0XHRcdGlmICggISggbmFtZSBpbiByZXN0TmFtZXMgKSAmJiBuYW1lWzBdIT09JyQnICkge1xuXHRcdFx0XHRkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0XHRcdGlmICggbmFtZSBpbiBhY2Nlc3NDYWNoZSApIHsgYWNjZXNzQ2FjaGVbbmFtZSAgICAgICAgICAgICAgICAgXSA9IHVuZGVmaW5lZDsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR2YXIgbm93TmFtZXMgPSBLZXlzKGN0eCk7XG5cdFx0dmFyIGluZGV4ID0gbm93TmFtZXMubGVuZ3RoO1xuXHRcdHdoaWxlICggaW5kZXggKSB7XG5cdFx0XHRuYW1lID0gbm93TmFtZXNbLS1pbmRleF0gO1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIHJlc3ROYW1lcyApICYmIG5hbWVbMF0hPT0nJCcgKSB7IGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTsgfVxuXHRcdH1cblx0fVxuXHRzaGFkb3dBc3NpZ25lciAmJiBzaGFkb3dBc3NpZ25lcihzZWxmLCBkYXRhKTtcblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV2RGF0YSAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIHNraXBEYXRhICAgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICwgc2hhZG93Q2hlY2tlciAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc2tpcENvbnN0cnVjdG9yICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdGZvciAoIHZhciBuYW1lIGluIGN0eCApIHtcblx0XHRpZiAoIG5hbWVbMF09PT0nXycgJiYgISggbmFtZSBpbiBOQU1FUyApICkge1xuXHRcdFx0ZXJyb3IoRXJyb3IoJ1tqVnVlIGJ1Z106IHZtLicgKyBuYW1lICsgJyBpcyB1bmtub3duIGJ1dCBleGlzdHMnKSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0dmFyIG9sZERlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhjdHgpLCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0aWYgKCBwcm90b0Rlc2NyaXB0b3JzICkge1xuXHRcdGZvciAoIHZhciAkbmFtZSBpbiBwcm90b0Rlc2NyaXB0b3JzICkgeyBpZiAoICRuYW1lIGluIGN0eCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3Jlc2VydmVkKTsgfSB9XG5cdFx0ZGVmaW5lUHJvcGVydGllcyhjdHgsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHR9XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdG93bktleXMob2xkRGVzY3JpcHRvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciBvbGREZXNjcmlwdG9yID0gb2xkRGVzY3JpcHRvcnNba2V5XSA7XG5cdFx0dmFyIG5ld0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBrZXkgICAgICAgICAgICAgICAgICk7XG5cdFx0aWYgKFxuXHRcdFx0IW5ld0Rlc2NyaXB0b3IgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlIT09b2xkRGVzY3JpcHRvci5jb25maWd1cmFibGUgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuZW51bWVyYWJsZSE9PW9sZERlc2NyaXB0b3IuZW51bWVyYWJsZSB8fFxuXHRcdFx0KCBuZXdEZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0PyBuZXdEZXNjcmlwdG9yLnZhbHVlIT09b2xkRGVzY3JpcHRvci52YWx1ZSB8fCBuZXdEZXNjcmlwdG9yLndyaXRhYmxlIT09b2xkRGVzY3JpcHRvci53cml0YWJsZVxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdDogbmV3RGVzY3JpcHRvci5nZXQhPT1vbGREZXNjcmlwdG9yLmdldCB8fCBuZXdEZXNjcmlwdG9yLnNldCE9PW9sZERlc2NyaXB0b3Iuc2V0XG5cdFx0XHQpXG5cdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdH0pO1xuXHR2YXIgZGlmS2V5cyAgICAgICAgICAgICAgICAgICAgICAgID0gb3duS2V5cyhjdHgpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmV0dXJuICEoIGtleSBpbiBvbGREZXNjcmlwdG9ycyApO1xuXHR9KTtcblx0aWYgKCBza2lwQ29uc3RydWN0b3IgKSB7XG5cdFx0aWYgKCBkaWZLZXlzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdH1cblx0dmFyIGRpZk5hbWVzID0gZGlmS2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB0eXBlb2Yga2V5PT09J3N0cmluZycgJiYga2V5WzBdIT09JyQnO1xuXHR9KTtcblx0aWYgKCBza2lwRGF0YSApIHtcblx0XHRpZiAoIGRpZk5hbWVzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdH1cblx0aWYgKCBkYXRhTmFtZXMgKSB7XG5cdFx0dmFyIGNvdW50ID0gMDtcblx0XHRmb3IgKCBuYW1lIGluIGRhdGFOYW1lcyApIHsgKytjb3VudDsgfVxuXHRcdGlmICggY291bnQhPT1kaWZOYW1lcy5sZW5ndGggKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9kYXRhKTsgfVxuXHRcdGRpZk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdGlmICggISggbmFtZSBpbiBkYXRhTmFtZXMgKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0fSk7XG5cdH1cblx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoICAgICAgICAgICAgICBuYW1lKSB7XG5cdFx0aWYgKCBuYW1lIGluIHRoaXMgJiYgISggbmFtZSBpbiB7fSApIHx8IG5hbWUgaW4gcmVzdE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVkZWZpbmVkKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZT09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChjdHgsIG5hbWUpKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9lbnVtZXJhYmxlKTsgfVxuXHR9LCBnZXRQcm90b3R5cGVPZihjdHgpKTtcblx0XG5cdHZhciBkYXRhID0gY3JlYXRlKE5VTEwpICAgICAgICA7XG5cdGRpZk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHQoIGRhdGEgICAgICAgICApW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0aWYgKCBfICYmIG5hbWUgaW4gXy5hY2Nlc3NDYWNoZSApIHsgXy5hY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdH0pO1xuXHRpZiAoIHNoYWRvd0Fzc2lnbmVyICkge1xuXHRcdHNoYWRvd0NoZWNrZXIgKGRhdGEpO1xuXHRcdHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHR9XG5cdHJldHVybiBkYXRhO1xuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgSU5JVCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHZhciBJTklUID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgO1xuXHRJTklULm1vZGUgPSAnb3Blbic7XG5cdHJldHVybiBJTklUO1xufSgpO1xuXG5mdW5jdGlvbiBhdHRhY2ggKCAgICAgICAgICAgIGVsICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICB7IHJldHVybiBlbCAmJiAoIGVsLnNoYWRvd1Jvb3QgfHwgZWwuYXR0YWNoU2hhZG93KElOSVQpICk7IH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGZ1bmN0aW9uIFNoYWRvd0Fzc2lnbmVyICggICAgICAgICAgICBhbG9uZyAgICAgICAgKSAgICAgICAgICAgICAgICAge1xuXHR2YXIgaW5kZXggPSBhbG9uZy5pbmRleE9mKCcuJyk7XG5cdHZhciBuYW1lcyA9IGluZGV4PDAgPyBudWxsIDogYWxvbmcuc2xpY2UoaW5kZXggKyAxKS5zcGxpdCgnLicpO1xuXHR2YXIgdG9OYW1lID0gbmFtZXMgPyBhbG9uZy5zbGljZSgwLCBpbmRleCkgOiBhbG9uZztcblx0aWYgKCBuYW1lcyApIHtcblx0XHRpZiAoIG5hbWVzLmxlbmd0aD09PTEgKSB7XG5cdFx0XHR2YXIgbmFtZSRnZXQgPSBuYW1lc1swXSArICckZ2V0Jztcblx0XHRcdHZhciBuYW1lJHNldCA9IG5hbWVzWzBdICsgJyRzZXQnO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdGFsbFtuYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWUkZ2V0XSA9IGF0dGFjaChlbCk7IH07XG5cdFx0XHRcdGFsbFtuYW1lJGdldF0gPSBudWxsO1xuXHRcdFx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgICAgICAgICAgICAgICAgICAgICAsIGRhdGEgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdHZhciBhbGwgPSBkYXRhW3RvTmFtZV0gPSBjcmVhdGUoTlVMTCkgICAgICAgO1xuXHRcdFx0XHRuYW1lcyAuZm9yRWFjaChmdW5jdGlvbiAobmFtZSAgICAgICAgKSB7XG5cdFx0XHRcdFx0YWxsW25hbWUgKyAnJHNldCddID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGVsICAgICAgICAgICAgICAgICAgICApIHsgc2VsZlt0b05hbWVdIFtuYW1lXSA9IGF0dGFjaChlbCk7IH07XG5cdFx0XHRcdFx0YWxsW25hbWUgKz0gJyRnZXQnXSA9IG51bGw7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR2YXIgdG9OYW1lJGdldCA9IHRvTmFtZSArICckZ2V0Jztcblx0XHR2YXIgdG9OYW1lJHNldCA9IHRvTmFtZSArICckc2V0Jztcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICwgZGF0YSAgICAgKSB7XG5cdFx0XHRkYXRhW3RvTmFtZSRzZXRdID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGVsICAgICAgICAgICAgICAgICAgICApIHsgc2VsZlt0b05hbWUkZ2V0XSA9IGF0dGFjaChlbCk7IH07XG5cdFx0XHRkYXRhW3RvTmFtZSRnZXRdID0gbnVsbDtcblx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdH1cbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93Q2hlY2tlciAoICAgICAgICAgICAgYWxvbmcgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgZGF0YU5hbWVzICAgICAgICAgICAgICAsIHNoYWRvd05hbWVzICAgICAgICwgX19kZXZfXyAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRpZiAoIGFsb25nWzBdPT09J18nIHx8IGFsb25nWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHR2YXIgaW5kZXggPSBhbG9uZy5pbmRleE9mKCcuJyk7XG5cdGlmICggaW5kZXg8MCApIHtcblx0XHR2YXIgdG9OYW1lJGdldCA9IGFsb25nLnNsaWNlKDAsIGluZGV4KSArICckZ2V0Jztcblx0XHR2YXIgdG9OYW1lJHNldCA9IGFsb25nLnNsaWNlKDAsIGluZGV4KSArICckc2V0Jztcblx0XHRpZiAoIHRvTmFtZSRnZXQgaW4gcmVzdE5hbWVzIHx8IHRvTmFtZSRzZXQgaW4gcmVzdE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdHNoYWRvd05hbWVzW3RvTmFtZSRnZXRdID0gbnVsbDtcblx0XHRzaGFkb3dOYW1lc1t0b05hbWUkc2V0XSA9IG51bGw7XG5cdFx0aWYgKCBkYXRhTmFtZXMgKSB7XG5cdFx0XHRpZiAoIHRvTmFtZSRnZXQgaW4gZGF0YU5hbWVzIHx8IHRvTmFtZSRzZXQgaW4gZGF0YU5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggdG9OYW1lJGdldCBpbiBkYXRhIHx8IHRvTmFtZSRzZXQgaW4gZGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9O1xuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggYWxvbmc9PT0nY29uc3RydWN0b3InICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcdGlmICggYWxvbmcgaW4gcmVzdE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdHNoYWRvd05hbWVzW2Fsb25nXSA9IG51bGw7XG5cdFx0aWYgKCBkYXRhTmFtZXMgKSB7XG5cdFx0XHRpZiAoIGFsb25nIGluIGRhdGFOYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBkYXRhICAgICAgKSB7XG5cdFx0XHRpZiAoIGFsb25nIGluIGRhdGEgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9zaGFkb3cpOyB9XG5cdFx0fTtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sPyc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcD8nO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGZyb20gZnJvbSAnLkFycmF5LmZyb20/JztcbmltcG9ydCBnZXRQcm90b3R5cGVPZiBmcm9tICcuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mJztcbmltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnNldFByb3RvdHlwZU9mPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGdldE93blByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlTeW1ib2xzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzPyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IGdldCBmcm9tICcuUmVmbGVjdC5nZXQ/JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT8nO1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbj8nO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgS2V5cyBmcm9tICcuT2JqZWN0LmtleXMnO1xuaW1wb3J0IE93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz8nO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgUFJPVE9fQlVHIGZyb20gJy5PYmplY3QucHJvdG90eXBlJztcbmltcG9ydCBoYXNPd25Qcm9wZXJ0eSBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IHdpbmRvdyBmcm9tICcud2luZG93JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IHRoYXQsIE5BTUVTLCBwcm9Qcm90bywgcHJvQ29uc3RydWN0b3IsIHByb05hbWVzLCBwcm9EYXRhLCBkZXZEYXRhIH0gZnJvbSAnLi9EYXRhJztcbmltcG9ydCB7IFNoYWRvd0Fzc2lnbmVyLCBTaGFkb3dDaGVja2VyIH0gZnJvbSAnLi9TaGFkb3cnO1xuXG5leHBvcnQgeyBDb21wb25lbnQgYXMgZGVmYXVsdCB9O1xudmFyIENvbXBvbmVudCAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZnJlZXplKC8qI19fUFVSRV9fKi9kZWZpbmVQcm9wZXJ0aWVzKFxuXHRmdW5jdGlvbiBDb21wb25lbnQgKCkgeyByZXR1cm4gdGhhdDsgfSxcblx0e1xuXHRcdHByb3RvdHlwZToge1xuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IG51bGwsXG5cdFx0fSxcblx0XHRyZW5kZXI6IHtcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiByZW5kZXIgKCAgICAgICAgICApIHsgdGhyb3cgVHlwZUVycm9yKCdDb21wb25lbnQucmVuZGVyPScpOyB9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiByZW5kZXIgKCAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICAgICAgICAgKSB7ICggdGhhdCAuXyB8fCB0aGF0IC4kb3B0aW9ucyApLnJlbmRlciA9IHZhbHVlOyB9LFxuXHRcdH0sXG5cdFx0X21haW46IHtcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBfbWFpbiAoICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIENvbXBvbmVudCA9IHRoaXM7XG5cdFx0XHRcdGlmICggIWlzQ29tcG9uZW50Q29uc3RydWN0b3IoQ29tcG9uZW50KSApIHsgdGhyb3cgVHlwZUVycm9yKCcoIUNvbXBvbmVudCkuX21haW4nKTsgfVxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gX21haW4gKCAgICAgICAgICAgICApICAgICAgIHtcblx0XHRcdFx0XHRpZiAoIG9uY2UgKSB7IHRocm93IEVycm9yKCdDb21wb25lbnQuX21haW4oKXgyJyk7IH1cblx0XHRcdFx0XHRpZiAoIHRoaXMhPT1Db21wb25lbnQgJiYgaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih0aGlzKSApIHsgdGhyb3cgVHlwZUVycm9yKCcoQ29tcG9uZW50IXRoaXMpLl9tYWluKCknKTsgfVxuXHRcdFx0XHRcdHZhciBWdWUgPSBGdW5jdGlvbigncmV0dXJuIFZ1ZScpKCk7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgVnVlPT09J29iamVjdCcgKSB7XG5cdFx0XHRcdFx0XHR2YXIgZGV2ID0gaXNBcnJheSgoIHdpbmRvdyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5kZXZ0b29sc0Zvcm1hdHRlcnMpO1xuXHRcdFx0XHRcdFx0dmFyIGFwcCA9IFZ1ZS5jcmVhdGVBcHAoXG5cdFx0XHRcdFx0XHRcdFRvT3B0aW9ucyhcblx0XHRcdFx0XHRcdFx0XHRDb21wb25lbnQsXG5cdFx0XHRcdFx0XHRcdFx0VnVlLFxuXHRcdFx0XHRcdFx0XHRcdGRldiA/IGNyZWF0ZShOVUxMKSA6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0ZGVmaW5lUHJvcGVydHkoYXBwLmNvbmZpZywgJ2lzQ3VzdG9tRWxlbWVudCcsIHsgdmFsdWU6IHRlc3QuYmluZChTVEFSVFNfV0lUSF9MT1dFUkNBU0UpLCB3cml0YWJsZTogdHJ1ZSB9KTtcblx0XHRcdFx0XHRcdGlmICggZGV2ICkge1xuXHRcdFx0XHRcdFx0XHRUSFJPV19JUlJFUEFSQUJMRSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRhcHAuY29uZmlnLnBlcmZvcm1hbmNlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGFwcC5tb3VudChkb2N1bWVudC5ib2R5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRuZXcgKCBWdWUuZXh0ZW5kKFxuXHRcdFx0XHRcdFx0XHRUb09wdGlvbnMoXG5cdFx0XHRcdFx0XHRcdFx0Q29tcG9uZW50LFxuXHRcdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdFx0XHRWdWUuZGV2dG9vbHMgPyAoIFZ1ZS5jb25maWcuaWdub3JlZEVsZW1lbnRzLnB1c2goU1RBUlRTX1dJVEhfTE9XRVJDQVNFKSwgVnVlLmNvbmZpZy5wZXJmb3JtYW5jZSA9IHRydWUsIGNyZWF0ZShOVUxMKSApIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCkgKSgpXG5cdFx0XHRcdFx0XHQuJG1vdW50KCggZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnPGJyPicsICdicicgKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG9uY2UgPSB0cnVlO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdHNldDogdW5kZWZpbmVkLFxuXHRcdH0sXG5cdFx0X3RvT3B0aW9uczoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gX3RvT3B0aW9ucyAoICAgICAgICAgICAgICAgIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdGlmICggIWlzQ29tcG9uZW50Q29uc3RydWN0b3IodGhpcykgKSB7IHRocm93IFR5cGVFcnJvcignKCFDb21wb25lbnQpLl90b09wdGlvbnMoKScpOyB9XG5cdFx0XHRcdHJldHVybiBUb09wdGlvbnModGhpcywgVnVlMywgX19kZXZfXyk7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdH1cbikpO1xudmFyIG9uY2UgPSBmYWxzZTtcblxuZnVuY3Rpb24gVG9PcHRpb25zICggICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBESURfT1BUSU9OUyA9IE9QVElPTlMub2JqZWN0cy5pbnRvKF9fZGV2X18gfHwgT1BUSU9OUyAgICAgICApLmludG8oVnVlMyB8fCBPUFRJT05TICAgICAgICk7XG5cdHZhciBUTVBfT1BUSU9OUyA9IG5ldyBPUFRJT05TLm9iamVjdHNUbXA7XG5cdHZhciBvcHRpb25zID0gT3B0aW9ucyhcblx0XHRjb25zdHJ1Y3Rvcixcblx0XHRWdWUzIHx8IHVuZGVmaW5lZCxcblx0XHRfX2Rldl9fID8gREVWLnJlZHVjZShmdW5jdGlvbiBEZXYgKGRldiwga2V5KSB7XG5cdFx0XHRkZXZba2V5XSA9IF9fZGV2X18gW2tleV0gfHwga2V5O1xuXHRcdFx0cmV0dXJuIGRldjtcblx0XHR9LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCxcblx0XHRESURfT1BUSU9OUyxcblx0XHRUTVBfT1BUSU9OU1xuXHQpO1xuXHRUTVBfT1BUSU9OUy5mb3JFYWNoIChmdW5jdGlvbiAob3B0aW9uc1ZhbHVlLCBjb25zdHJ1Y3RvcktleSkgeyBESURfT1BUSU9OUy5zZXQoY29uc3RydWN0b3JLZXksIG9wdGlvbnNWYWx1ZSk7IH0pO1xuXHRyZXR1cm4gb3B0aW9ucztcbn1cblxudmFyIF9taXhpbnMgICAgICAgICAgICAgICAgPSBTeW1ib2wgJiYgLyojX19QVVJFX18qL1N5bWJvbCgnX21peGlucycpICAgICAgICAgICAgICAgICA7XG5cbmZ1bmN0aW9uIF9fUFVSRV9fICggICAgICAgICAgICBTdWIgICAgICwgbWl4aW5zICAgICAgICkge1xuXHRTdWIucHJvdG90eXBlID0gbnVsbDtcblx0U3ViW19taXhpbnNdID0gbWl4aW5zO1xuXHRyZXR1cm4gc2V0UHJvdG90eXBlT2YoU3ViLCBDb21wb25lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW4gKCAgICAgICAgICApIHtcblx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcblx0XHQ/IC8qI19fUFVSRV9fKi9fX1BVUkVfXyhmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0OyB9LCAvKiNfX1BVUkVfXyovZnJvbShhcmd1bWVudHMpKVxuXHRcdDogQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBPcHRpb25zIChjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICwgRElEX09QVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBUTVBfT1BUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAge1xuXHRcblx0dmFyIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgPSBESURfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpIHx8IFRNUF9PUFRJT05TLmdldChjb25zdHJ1Y3Rvcik7XG5cdGlmICggb3B0aW9ucyApIHsgcmV0dXJuIG9wdGlvbnM7IH1cblx0T1BUSU9OUy5jb25zdHJ1Y3Rvci5zZXQob3B0aW9ucyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgLCBjb25zdHJ1Y3Rvcik7XG5cdFxuXHRpZiAoIGlzTWl4aW5zKGNvbnN0cnVjdG9yKSApIHtcblx0XHR2YXIgc3RhdGljX21peGlucyA9IGNvbnN0cnVjdG9yW19taXhpbnNdIDtcblx0XHR2YXIgbWl4aW5zID0gbmV3IE9QVElPTlMuU2V0ICAgICAgICAgICAgKCk7XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHR3aGlsZSAoIGluZGV4IT09c3RhdGljX21peGlucy5sZW5ndGggKSB7XG5cdFx0XHR2YXIgbWl4aW4gPSBzdGF0aWNfbWl4aW5zW2luZGV4KytdIDtcblx0XHRcdGlmICggaXNDb21wb25lbnRDb25zdHJ1Y3RvcihtaXhpbikgKSB7XG5cdFx0XHRcdHZhciBtaXhpbk9wdGlvbnMgPSBPcHRpb25zKG1peGluLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcdFx0XHRpZiAoIGlzTWl4aW5zKG1peGluKSApIHtcblx0XHRcdFx0XHR2YXIgbWl4aW5NaXhpbnMgPSBtaXhpbk9wdGlvbnMubWl4aW5zIDtcblx0XHRcdFx0XHR2YXIgbWl4aW5JbmRleCA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCBtaXhpbkluZGV4IT09bWl4aW5NaXhpbnMubGVuZ3RoICkgeyBtaXhpbnMuYWRkKG1peGluTWl4aW5zW21peGluSW5kZXgrK10gKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgeyBtaXhpbnMuYWRkKG1peGluT3B0aW9ucyk7IH1cblx0XHRcdH1cblx0XHRcdGVsc2UgeyBtaXhpbnMuYWRkKG1peGluICAgICAgICAgICAgICApOyB9XG5cdFx0fVxuXHRcdG9wdGlvbnMubWl4aW5zID0gZnJvbShtaXhpbnMpO1xuXHRcdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXyk7XG5cdFx0Y29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XHRUTVBfT1BUSU9OUy5zZXQoY29uc3RydWN0b3IsIG9wdGlvbnMpO1xuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG5cdFxuXHR2YXIgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuXHRcblx0dmFyIFN1cGVyID0gT1BUSU9OUy5zdXBlci5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoICFTdXBlciApIHtcblx0XHRPUFRJT05TLnN1cGVyLnNldChjb25zdHJ1Y3RvciwgU3VwZXIgPSBnZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvcikpO1xuXHRcdFN1cGVyPT09Q29tcG9uZW50IHx8IGlzTWl4aW5zKFN1cGVyKSB8fCAoIHNldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yLCBDb21wb25lbnQpLCBzZXRQcm90b3R5cGVPZihwcm90b3R5cGUsIG51bGwpICk7XG5cdH1cblx0aWYgKCBTdXBlciE9PUNvbXBvbmVudCApIHtcblx0XHR2YXIgU3VwZXJPcHRpb25zID0gT3B0aW9ucyhTdXBlciwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRpc01peGlucyhTdXBlcilcblx0XHRcdD8gU3VwZXJPcHRpb25zLm1peGlucyAubGVuZ3RoPT09MVxuXHRcdFx0PyBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnMubWl4aW5zIFswXVxuXHRcdFx0OiBvcHRpb25zLm1peGlucyA9IFN1cGVyT3B0aW9ucy5taXhpbnNcblx0XHRcdDogb3B0aW9ucy5leHRlbmRzID0gU3VwZXJPcHRpb25zO1xuXHR9XG5cdFxuXHRfX2Rldl9fICYmIGdldE93blByb3BlcnR5U3ltYm9scyhjb25zdHJ1Y3RvcikuZm9yRWFjaChmdW5jdGlvbiAoc3ltYm9sKSB7XG5cdFx0aWYgKCBzeW1ib2whPT1fbWl4aW5zICYmICEoIHN5bWJvbCBpbiBTWU1CT0xTICkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zeW1ib2wpOyB9XG5cdH0pO1xuXHRcblx0dmFyIHNldCAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZTZXQuYmluZChfX2Rldl9fKSA6IHByb1NldDtcblx0dmFyIGFzc2VydEZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2QXNzZXJ0RnVuY3Rpb24uYmluZChfX2Rldl9fKSA6IHByb0Fzc2VydEZ1bmN0aW9uO1xuXHRcblx0dmFyIHN0YXRpY05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhjb25zdHJ1Y3Rvcik7XG5cdGluZGV4ID0gc3RhdGljTmFtZXMubGVuZ3RoO1xuXHR2YXIgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG5cdHZhciBza2lwQ29uc3RydWN0b3IgPSBmYWxzZTtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgc3RhdGljTmFtZSA9IHN0YXRpY05hbWVzWy0taW5kZXhdIDtcblx0XHRpZiAoIHN0YXRpY05hbWU9PT0nUmVuZGVyJyApIHsgdmFyIFJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdICAgICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSduYW1lJyB8fCBzdGF0aWNOYW1lPT09J2xlbmd0aCcgKSB7XG5cdFx0XHRkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbnN0cnVjdG9yLCBzdGF0aWNOYW1lKTtcblx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmIHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBkZXNjcmlwdG9yLnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgYXBwbHkoZGVzY3JpcHRvci5nZXQgLCBjb25zdHJ1Y3RvciwgQVJHUykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSdkYXRhJyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSE9PXVuZGVmaW5lZCApIHsgdGhyb3cgRXJyb3IoaXNBcnJheShjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSkgPyBfX2Rldl9fLmNvbXBpbGVfbGF5ZXIgOiBfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdH1cblx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBzdGF0aWNOYW1lIT09J3Byb3RvdHlwZScgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggc3RhdGljTmFtZVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdzZXR1cCcgfHwgc3RhdGljTmFtZT09PSd3YXRjaCcgfHwgc3RhdGljTmFtZT09PSdtZXRob2RzJyB8fCBzdGF0aWNOYW1lPT09J2NvbXB1dGVkJyB8fCBzdGF0aWNOYW1lPT09J2V4dGVuZHMnIHx8IHN0YXRpY05hbWU9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nYmVmb3JlQ3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdjcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZU1vdW50JyB8fCBzdGF0aWNOYW1lPT09J21vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVXBkYXRlJyB8fCBzdGF0aWNOYW1lPT09J3VwZGF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2RlYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVubW91bnQnIHx8IHN0YXRpY05hbWU9PT0ndW5tb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZURlc3Ryb3knIHx8IHN0YXRpY05hbWU9PT0nZGVzdHJveWVkJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0naW5qZWN0JyB8fCBzdGF0aWNOYW1lPT09J3Byb3BzJyB8fCBwcm90b05hbWUxPT09J2VtaXRzJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheWVyKTsgfVxuXHRcdFx0fVxuXHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pO1xuXHRcdH1cblx0fVxuXHRcblx0dmFyIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0XG5cdHZhciBwcm90b05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpO1xuXHRpbmRleCA9IHByb3RvTmFtZXMubGVuZ3RoO1xuXHR2YXIgd2F0Y2hlcnMgICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2tpcERhdGEgPSBmYWxzZTtcblx0dmFyIGRhdGFOYW1lcyAgICAgICAgICAgICAgID0gbnVsbDtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgcHJvdG9OYW1lID0gcHJvdG9OYW1lc1stLWluZGV4XSA7XG5cdFx0aWYgKCBwcm90b05hbWU9PT0nX2RhdGEnICkge1xuXHRcdFx0dmFyIF9kYXRhID0gZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpO1xuXHRcdFx0aWYgKCBfZGF0YSApIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggIWlzQXJyYXkoX2RhdGEpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdFx0XHRfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgbGVuZ3RoID0gX2RhdGEubGVuZ3RoO1xuXHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRkYXRhTmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0XHRcdGRvIHsgZGF0YU5hbWVzW19kYXRhW2ldXSA9IG51bGw7IH1cblx0XHRcdFx0XHR3aGlsZSAoICsraSE9PWxlbmd0aCApO1xuXHRcdFx0XHRcdGRhdGFOYW1lcyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRhdGFOYW1lcyk7XG5cdFx0XHRcdFx0X19kZXZfXyAmJiBPUFRJT05TLmRhdGEuc2V0KG9wdGlvbnMsIGRhdGFOYW1lcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0c2tpcERhdGEgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggX2RhdGEhPT11bmRlZmluZWQgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nXycgJiYgISggcHJvdG9OYW1lLnN0YXJ0c1dpdGgoJ193YXRjaCgnKSApICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHR2YXIgcHJvdG9OYW1lMSA9IHByb3RvTmFtZS5zbGljZSgxKTtcblx0XHRcdFx0aWYgKCBwcm90b05hbWUxWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J3NldHVwJyB8fCBwcm90b05hbWUxPT09J3dhdGNoJyB8fCBwcm90b05hbWUxPT09J21ldGhvZHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcHV0ZWQnIHx8IHByb3RvTmFtZTE9PT0nZXh0ZW5kcycgfHwgcHJvdG9OYW1lMT09PSdtaXhpbnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdjb21wb25lbnRzJyB8fCBwcm90b05hbWUxPT09J2RpcmVjdGl2ZXMnIHx8IHByb3RvTmFtZTE9PT0nc3RhdGljUmVuZGVyRm5zJyB8fCBwcm90b05hbWUxPT09J3RlbXBsYXRlJyB8fCBwcm90b05hbWUxPT09J2luaGVyaXRBdHRycycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J25hbWUnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdSZW5kZXInIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdkZWxpbWl0ZXJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZmlsdGVycycgfHwgcHJvdG9OYW1lMT09PSdjb21tZW50cycgfHwgcHJvdG9OYW1lMT09PSdmdW5jdGlvbmFsJyB8fCBwcm90b05hbWUxPT09J3Byb3BzRGF0YScgfHwgcHJvdG9OYW1lMT09PSdtb2RlbCdcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9sYXllcik7IH1cblx0XHRcdH1cblx0XHRcdHNldChvcHRpb25zLCBwcm90b05hbWUuc2xpY2UoMSksIGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvTmFtZSk7XG5cdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSdfJyApIHtcblx0XHRcdFx0dmFyIGluZGV4T2ZRID0gcHJvdG9OYW1lLmxhc3RJbmRleE9mKCcpJyk7XG5cdFx0XHRcdHZhciB3YXRjaGVyID0gd2F0Y2hlcnNbd2F0Y2hlcnMubGVuZ3RoXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gcHJvdG9OYW1lLnNsaWNlKDcsIGluZGV4T2ZRKS50cmltKCk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5nZXQpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3Iuc2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGluZGV4T2ZRICsgMSE9PXByb3RvTmFtZS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aW5kZXhPZlEgKz0gMjtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkEgPSBwcm90b05hbWUuaW5kZXhPZignOycsIGluZGV4T2ZRKTtcblx0XHRcdFx0XHRcdHZhciBwYWlyID0gaW5kZXhPZkE8MFxuXHRcdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSlcblx0XHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEsIGluZGV4T2ZBKTtcblx0XHRcdFx0XHRcdGluZGV4T2ZRID0gaW5kZXhPZkEgKyAxO1xuXHRcdFx0XHRcdFx0aWYgKCBwYWlyICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkUgPSBwYWlyLmluZGV4T2YoJz0nKTtcblx0XHRcdFx0XHRcdFx0aW5kZXhPZkU8MFxuXHRcdFx0XHRcdFx0XHRcdD8gd2F0Y2hlcltwYWlyXSA9IHRydWVcblx0XHRcdFx0XHRcdFx0XHQ6IHdhdGNoZXJbcGFpci5zbGljZSgwLCBpbmRleE9mRSldID0gcGFpci5zbGljZShpbmRleE9mRSArIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoIGluZGV4T2ZRICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nJCcgKSB7XG5cdFx0XHRcdCggcHJvdG9EZXNjcmlwdG9ycyB8fCAoIHByb3RvRGVzY3JpcHRvcnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZSE9PSdjb25zdHJ1Y3RvcicgfHwgZGVzY3JpcHRvci52YWx1ZSE9PWNvbnN0cnVjdG9yICkge1xuXHRcdFx0XHRcdFx0KCBvcHRpb25zLm1ldGhvZHMgfHwgKCBvcHRpb25zLm1ldGhvZHMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQoIG9wdGlvbnMuY29tcHV0ZWQgfHwgKCBvcHRpb25zLmNvbXB1dGVkID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gZGVzY3JpcHRvci5zZXQgPyB7XG5cdFx0XHRcdFx0XHRnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuXHRcdFx0XHRcdFx0c2V0OiBkZXNjcmlwdG9yLnNldFxuXHRcdFx0XHRcdH0gOiBkZXNjcmlwdG9yLmdldCAgICAgICA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHZhciBwcm90b1N5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvdG90eXBlKSAgICAgICAgICAgICAgICAgICA7XG5cdGlmICggKCBpbmRleCA9IHByb3RvU3ltYm9scy5sZW5ndGggKSApIHtcblx0XHRpZiAoICFwcm90b0Rlc2NyaXB0b3JzICkgeyBwcm90b0Rlc2NyaXB0b3JzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHRkbyB7XG5cdFx0XHR2YXIgcHJvdG9TeW1ib2wgICAgICAgICAgICAgICAgPSBwcm90b1N5bWJvbHNbLS1pbmRleF0gO1xuXHRcdFx0cHJvdG9EZXNjcmlwdG9ycyBbcHJvdG9TeW1ib2xdID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvdG9TeW1ib2wpKTtcblx0XHR9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHR9XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgT1BUSU9OUy5wcm90by5zZXQob3B0aW9ucywgcHJvdG9EZXNjcmlwdG9ycyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIHByb3RvRGVzY3JpcHRvcnMpKTtcblx0XG5cdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXyk7XG5cdFxuXHR2YXIgcmVzdE5hbWVzID0gY29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XG5cdGlmICggUmVuZGVyICYmIFZ1ZTMgKSB7XG5cdFx0dmFyIHNoYWRvdyA9IFJlbmRlci5zaGFkb3c7XG5cdFx0aWYgKCBzaGFkb3cgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICYmIHNraXBEYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0XHR2YXIgc2hhZG93TmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdHZhciBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gU2hhZG93Q2hlY2tlcihzaGFkb3csIHJlc3ROYW1lcywgZGF0YU5hbWVzLCBzaGFkb3dOYW1lcywgX19kZXZfXyk7XG5cdFx0XHRcdE9QVElPTlMuc2hhZG93LnNldChvcHRpb25zLCBzaGFkb3dOYW1lcyk7XG5cdFx0XHR9XG5cdFx0XHRzaGFkb3dBc3NpZ25lciA9IFNoYWRvd0Fzc2lnbmVyKHNoYWRvdyk7XG5cdFx0fVxuXHRcdHZhciBzaGVldCA9IFJlbmRlci5zaGVldDtcblx0XHRpZiAoIHNoZWV0ICkge1xuXHRcdFx0dmFyIHdhdGNoZXJzMiAgICAgICAgICAgID0gW107XG5cdFx0XHRPd25LZXlzKHNoZWV0KS5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgICAgIGtleSwgaW5kZXgpIHtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB0aGlzW2luZGV4XSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHR3YXRjaGVyLiQgPSBhc3NlcnRGdW5jdGlvbihzaGVldCBba2V5XSk7XG5cdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGZ1bmN0aW9uICggICAgICAgICAgICBjc3MgICAgICAgICkgeyAoIHRoaXMuJHJlZnNba2V5XSAgICAgICAgICAgICAgICAgICAgICkudGV4dENvbnRlbnQgPSBjc3M7IH07XG5cdFx0XHRcdHdhdGNoZXIuaW1tZWRpYXRlID0gdHJ1ZTtcblx0XHRcdFx0d2F0Y2hlci5mbHVzaCA9ICdzeW5jJztcblx0XHRcdH0sIHdhdGNoZXJzMik7XG5cdFx0XHR3YXRjaGVyczIucmV2ZXJzZSgpO1xuXHRcdFx0dmFyIGJlZm9yZU1vdW50ID0gb3B0aW9ucy5iZWZvcmVNb3VudDtcblx0XHRcdG9wdGlvbnMuYmVmb3JlTW91bnQgPSBiZWZvcmVNb3VudFxuXHRcdFx0XHQ/IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0XHRyZXR1cm4gYXBwbHkoYmVmb3JlTW91bnQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0fTtcblx0XHR9XG5cdFx0b3B0aW9ucy5yZW5kZXIgPSBhc3NlcnRGdW5jdGlvbihuZXcgUmVuZGVyKFZ1ZTMgKSk7XG5cdH1cblx0XG5cdGlmICggX19kZXZfXyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIGRldkRhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgc2tpcERhdGEsIGRhdGFOYW1lcywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lciwgc2hhZG93Q2hlY2tlciwgc2tpcENvbnN0cnVjdG9yLCBfX2Rldl9fKTsgfTsgfVxuXHRlbHNlIGlmICggc2tpcENvbnN0cnVjdG9yIHx8IHNraXBEYXRhICkge31cblx0ZWxzZSBpZiAoIGRhdGFOYW1lcyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb05hbWVzKHNlbGYgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMsIGRhdGFOYW1lcyAsIHNoYWRvd0Fzc2lnbmVyKTsgfTsgfVxuXHRlbHNlIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb0RhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lcik7IH07IH1cblx0XG5cdGlmICggd2F0Y2hlcnMubGVuZ3RoIHx8ICFfX2Rldl9fICYmICggc2tpcENvbnN0cnVjdG9yICYmIHByb3RvRGVzY3JpcHRvcnMgfHwgc2tpcERhdGEgKSApIHtcblx0XHR3YXRjaGVycy5sZW5ndGggJiYgd2F0Y2hlcnMucmV2ZXJzZSgpO1xuXHRcdHZhciBjcmVhdGVkID0gb3B0aW9ucy5jcmVhdGVkO1xuXHRcdHN3aXRjaCAoICggX19kZXZfXyA/ICggc2tpcENvbnN0cnVjdG9yID8gJ3MnIDogJ24nICkgOiAnXycgKSArICggd2F0Y2hlcnMubGVuZ3RoID8gJ3cnIDogJ18nICkgKyAoIGNyZWF0ZWQgPyAnYycgOiAnXycgKSApIHtcblx0XHRcdGNhc2UgJ3N3Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Qcm90byh0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ253Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbndfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ193Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRcblx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XG5cdC8vQHRzLWlnbm9yZVxuXHRpZiAoIG9wdGlvbnMuY29tcG9uZW50cyB8fCBvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5kaXNwbGF5TmFtZSApIHtcblx0XHR2YXIgY29tcG9uZW50cyA9IG9wdGlvbnMuY29tcG9uZW50cyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIG9wdGlvbnMuY29tcG9uZW50cyk7XG5cdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0Zm9yICggcGFzY2FsIGluIGNvbXBvbmVudHMgKSB7XG5cdFx0XHRcdGlmICggIXBhc2NhbCB8fCBTVEFSVFNfV0lUSF9MT1dFUkNBU0UudGVzdChwYXNjYWwpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0XHRcdH1cblx0XHRcdGlmICggVEhST1dfSVJSRVBBUkFCTEUgJiYgVnVlMyAmJiAhb3B0aW9ucy5yZW5kZXIgJiYgb3B0aW9ucy50ZW1wbGF0ZSApIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdG9wdGlvbnMubmFtZSAmJiBJTkNMVURFU19VUFBFUkNBU0UudGVzdChvcHRpb25zLm5hbWUuc2xpY2UoMSkpXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfY2FzZSk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdG9wdGlvbnMuZGlzcGxheU5hbWUgJiYgSU5DTFVERVNfVVBQRVJDQVNFLnRlc3Qob3B0aW9ucy5kaXNwbGF5TmFtZS5zbGljZSgxKSlcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9jYXNlKTsgfVxuXHRcdFx0XHRmb3IgKCBwYXNjYWwgaW4gY29tcG9uZW50cyApIHtcblx0XHRcdFx0XHRpZiAoIElOQ0xVREVTX1VQUEVSQ0FTRS50ZXN0KHBhc2NhbC5zbGljZSgxKSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9jYXNlKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAoIHZhciBwYXNjYWwgaW4gY29tcG9uZW50cyApIHtcblx0XHRcdHZhciB2YWx1ZSA9IGNvbXBvbmVudHNbcGFzY2FsXSA7XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IodmFsdWUpICkgeyBjb21wb25lbnRzW3Bhc2NhbF0gPSBPcHRpb25zKHZhbHVlLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpOyB9XG5cdFx0fVxuXHRcdGlmICggIVZ1ZTMgKSB7XG5cdFx0XHR2YXIgY2FzZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdG9wdGlvbnMubmFtZSAmJiBmaXhQYXNjYWwob3B0aW9ucy5uYW1lLCBjYXNlcyk7XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdG9wdGlvbnMuZGlzcGxheU5hbWUgJiYgZml4UGFzY2FsKG9wdGlvbnMuZGlzcGxheU5hbWUsIGNhc2VzKTtcblx0XHRcdGZvciAoIHBhc2NhbCBpbiBjb21wb25lbnRzICkgeyBmaXhQYXNjYWwocGFzY2FsLCBjYXNlcyk7IH1cblx0XHRcdGFzc2lnbihjb21wb25lbnRzLCBjYXNlcywgY29tcG9uZW50cyk7XG5cdFx0fVxuXHR9XG5cdFxuXHRyZXR1cm4gb3B0aW9ucztcblx0XG59XG5cbnZhciBPUFRJT05TID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO1xcXG5jbGFzcyBFYXN5TWFwIGV4dGVuZHMgV2Vha01hcHtpbnRvKGtleSl7bGV0IHN1Yj10aGlzLmdldChrZXkpO3N1Yj8/dGhpcy5zZXQoa2V5LHN1Yj1uZXcgRWFzeU1hcCk7cmV0dXJuIHN1Yn19RWFzeU1hcC5wcm90b3R5cGUuZ2V0PVdlYWtNYXAucHJvdG90eXBlLmdldDtFYXN5TWFwLnByb3RvdHlwZS5zZXQ9V2Vha01hcC5wcm90b3R5cGUuc2V0O1xcXG5jbGFzcyBTdHJvbmdNYXAgZXh0ZW5kcyBNYXB7fVN0cm9uZ01hcC5wcm90b3R5cGUuZ2V0PU1hcC5wcm90b3R5cGUuZ2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuc2V0PU1hcC5wcm90b3R5cGUuc2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuZm9yRWFjaD1NYXAucHJvdG90eXBlLmZvckVhY2g7XFxcbmNsYXNzIFN0cm9uZ1NldCBleHRlbmRzIFNldHt9U3Ryb25nU2V0LnByb3RvdHlwZS5hZGQ9U2V0LnByb3RvdHlwZS5hZGQ7U3Ryb25nU2V0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdPVNldC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXTtcXFxucmV0dXJue29iamVjdHM6bmV3IEVhc3lNYXAsb2JqZWN0c1RtcDpTdHJvbmdNYXAsc3VwZXI6bmV3IEVhc3lNYXAscmVzdDpuZXcgRWFzeU1hcCxkYXRhOm5ldyBFYXN5TWFwLHByb3RvOm5ldyBFYXN5TWFwLGNvbnN0cnVjdG9yOm5ldyBFYXN5TWFwLHNoYWRvdzpuZXcgRWFzeU1hcCxTZXQ6U3Ryb25nU2V0fVxcXG4nKSgpO1xuXHR9XG5cdGNhdGNoIChlcnJvcikge31cbn0oKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG4gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxudmFyIGlzQ29tcG9uZW50Q29uc3RydWN0b3IgPSAvKiNfX1BVUkVfXyovaXNQcm90b3R5cGVPZi5iaW5kKENvbXBvbmVudCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG52YXIgQVJHUyA9IFtdICAgICAgICAgO1xuXG52YXIgX01JWElOUyA9IFsgX21peGlucyBdICAgICAgICAgO1xuZnVuY3Rpb24gaXNNaXhpbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoaGFzT3duUHJvcGVydHksIGNvbnN0cnVjdG9yLCBfTUlYSU5TKTsgfVxuXG52YXIgU1lNQk9MUyA9IC8qI19fUFVSRV9fKi9nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkucmVkdWNlKGZ1bmN0aW9uIChTWU1CT0xTLCBuYW1lKSB7XG5cdGlmICggdHlwZW9mIFN5bWJvbFtuYW1lXT09PSdzeW1ib2wnICkgeyBTWU1CT0xTW1N5bWJvbFtuYW1lXSAgICAgICAgICAgICAgICAgXSA9IG51bGw7IH1cblx0cmV0dXJuIFNZTUJPTFM7XG59LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuZnVuY3Rpb24gJHdhdGNoICh0aGF0ICAgICAgLCB3YXRjaGVycyAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBpbmRleCA9IHdhdGNoZXJzLmxlbmd0aDtcblx0ZG8ge1xuXHRcdHZhciB3YXRjaGVyICAgICAgPSB3YXRjaGVyc1stLWluZGV4XTtcblx0XHR0aGF0LiR3YXRjaCh3YXRjaGVyLiQsIHdhdGNoZXIuaGFuZGxlciwgd2F0Y2hlcik7XG5cdH1cblx0d2hpbGUgKCBpbmRleCApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG4gIFxuZnVuY3Rpb24gY29sbGVjdE5hbWVzIChvcHRpb25zICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgKSAgICAgICAge1xuXHR2YXIgcmVzdE5hbWVzICAgICAgICAgICAgICAgICAgICA9IE9QVElPTlMucmVzdC5nZXQob3B0aW9ucyk7XG5cdGlmICggIXJlc3ROYW1lcyApIHtcblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyByZXN0TmFtZXMgPSBPUFRJT05TLnJlc3QuZ2V0KGNvbnN0cnVjdG9yKTsgfVxuXHRcdGlmICggIXJlc3ROYW1lcyApIHtcblx0XHRcdHJlc3ROYW1lcyA9IGNyZWF0ZShOQU1FUyk7XG5cdFx0XHR2YXIgZXh0ZW5kID0gb3B0aW9ucy5leHRlbmRzO1xuXHRcdFx0ZXh0ZW5kICYmIGFzc2lnbihyZXN0TmFtZXMsIGNvbGxlY3ROYW1lcyhleHRlbmQsIG51bGwpKTtcblx0XHRcdHZhciBtaXhpbnMgPSBvcHRpb25zLm1peGlucztcblx0XHRcdGlmICggbWl4aW5zICkgeyBmb3IgKCB2YXIgaW5kZXggPSBtaXhpbnMubGVuZ3RoOyBpbmRleDsgKSB7IGFzc2lnbihyZXN0TmFtZXMsIGNvbGxlY3ROYW1lcyhtaXhpbnNbLS1pbmRleF0gLCBudWxsKSk7IH0gfVxuXHRcdFx0dmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcblx0XHRcdHZhciBuYW1lICAgICAgICA7XG5cdFx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkgeyBmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkgeyByZXN0TmFtZXNbcHJvcHNbLS1pbmRleF0gXSA9IG51bGw7IH0gfVxuXHRcdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdFx0cHJvcHMgPSBvcHRpb25zLmluamVjdDtcblx0XHRcdGlmICggaXNBcnJheShwcm9wcykgKSB7IGZvciAoIGluZGV4ID0gcHJvcHMubGVuZ3RoOyBpbmRleDsgKSB7IHJlc3ROYW1lc1twcm9wc1stLWluZGV4XSBdID0gbnVsbDsgfSB9XG5cdFx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBwcm9wcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMubWV0aG9kcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0XHRyZXN0TmFtZXMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCByZXN0TmFtZXMpO1xuXHRcdH1cblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyBPUFRJT05TLnJlc3Quc2V0KGNvbnN0cnVjdG9yLCByZXN0TmFtZXMpOyB9XG5cdFx0T1BUSU9OUy5yZXN0LnNldChvcHRpb25zLCByZXN0TmFtZXMpO1xuXHR9XG5cdHJldHVybiByZXN0TmFtZXM7XG59XG5cbmZ1bmN0aW9uIHByb1NldCAgICAob2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHsgb2JqZWN0W25hbWVdID0gdmFsdWU7IH1cbmZ1bmN0aW9uIGRldlNldCAgICAoICAgICAgICAgICAgICAgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHtcblx0aWYgKCBuYW1lIGluIG9iamVjdCApIHsgdGhyb3cgRXJyb3IodGhpcy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0b2JqZWN0W25hbWVdID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHByb0Fzc2VydEZ1bmN0aW9uICAgIChmbiAgICkgeyByZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IH1cbmZ1bmN0aW9uIGRldkFzc2VydEZ1bmN0aW9uICAgICggICAgICAgICAgICAgICBmbiAgICkge1xuXHRpZiAoIHR5cGVvZiBmbiE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcih0aGlzLmNvbXBpbGVfdHlwZSk7IH1cblx0cmV0dXJuIGZuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufVxuXG52YXIgVEhST1dfSVJSRVBBUkFCTEUgPSB0cnVlO1xudmFyIElOQ0xVREVTX1VQUEVSQ0FTRSA9IC9bQS1aXS87XG52YXIgU1RBUlRTX1dJVEhfTE9XRVJDQVNFID0gL15bYS16XS87XG52YXIgQ0hFQ0tFRCA9IFdlYWtNYXAgJiYgLyojX19QVVJFX18qL25ldyBXZWFrTWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKTtcbmZ1bmN0aW9uIGZvcktleXMgKG9wdGlvbiAgICAgICAgICAgICAgICAsIGNhbGxiYWNrICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdGlmICggaXNBcnJheShvcHRpb24pICkgeyBvcHRpb24uZm9yRWFjaChjYWxsYmFjayk7IH1cblx0ZWxzZSB7IGZvciAoIHZhciBrZXkgaW4gb3B0aW9uICkgeyBjYWxsYmFjayhrZXkpOyB9IH1cbn1cbmZ1bmN0aW9uIGNoZWNrIChvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFxuXHR2YXIgYmVsb25nID0gT1BUSU9OUy5jb25zdHJ1Y3Rvci5nZXQob3B0aW9ucykgfHwgb3B0aW9ucztcblx0dmFyIG93bktleXMgPSBDSEVDS0VELmdldChiZWxvbmcpO1xuXHRpZiAoIG93bktleXMgKSB7IHJldHVybiBvd25LZXlzOyB9XG5cdHZhciBhbGxLZXlzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFxuXHQoIG9wdGlvbnMuZXh0ZW5kcyA/IFsgb3B0aW9ucy5leHRlbmRzIF0gOiBbXSApLmNvbmNhdChvcHRpb25zLm1peGlucyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAobWl4aW4pIHtcblx0XHR2YXIgbWl4aW5OYW1lcyA9IGNoZWNrKG1peGluLCBfX2Rldl9fKTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBtaXhpbk5hbWVzICkge1xuXHRcdFx0aWYgKCBuYW1lIGluIGFsbEtleXMgJiYgbWl4aW5OYW1lc1tuYW1lXSE9PWFsbEtleXNbbmFtZV0gKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9vdmVyd3JpdGUpOyB9XG5cdFx0fVxuXHRcdGFzc2lnbihhbGxLZXlzLCBtaXhpbk5hbWVzKTtcblx0fSk7XG5cdFxuXHRvd25LZXlzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFxuXHR2YXIgcHJvdG9EZXNjcmlwdG9ycyA9IE9QVElPTlMucHJvdG8uZ2V0KG9wdGlvbnMpO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIE93bktleXMocHJvdG9EZXNjcmlwdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0b3duS2V5cyBba2V5XSA9IGJlbG9uZztcblx0fSk7XG5cdFxuXHRmb3JLZXlzKG9wdGlvbnMucHJvcHMsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRpZiAoIC8tfF4oPzprZXkkfG9ufHJlZiQpLy50ZXN0KG5hbWUpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcHJvcHMpOyB9XG5cdFx0aWYgKCBuYW1lIGluIFBST1RPX0JVRyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZSBpbiBvd25LZXlzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzIFtuYW1lXSA9IGJlbG9uZztcblx0fSk7XG5cdFxuXHRmb3JLZXlzKG9wdGlvbnMuaW5qZWN0LCBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmICggdHlwZW9mIG5hbWUhPT0nc3RyaW5nJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5cyBbbmFtZV0gPSBiZWxvbmc7XG5cdH0pO1xuXHRcblx0dmFyIG5hbWUgICAgICAgIDtcblx0XG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5tZXRob2RzICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5c1tuYW1lXSA9IGJlbG9uZztcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5c1tuYW1lXSA9IGJlbG9uZztcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBPUFRJT05TLmRhdGEuZ2V0KG9wdGlvbnMpICkge1xuXHRcdGlmICggbmFtZSBpbiBvd25LZXlzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzIFtuYW1lXSA9IGJlbG9uZztcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBPUFRJT05TLnNoYWRvdy5nZXQob3B0aW9ucykgKSB7XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRpZiAoICdjb25zdHJ1Y3RvcicgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XG5cdE93bktleXMob3duS2V5cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0aWYgKCBrZXkgaW4gYWxsS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX292ZXJ3cml0ZSk7IH1cblx0fSk7XG5cdGFzc2lnbihhbGxLZXlzLCBvd25LZXlzKTtcblx0XG5cdFsgb3B0aW9ucy5uYW1lLCBvcHRpb25zLmRpc3BsYXlOYW1lIF0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSAgICAgICAgICkge1xuXHRcdGlmICggdHlwZW9mIG5hbWU9PT0nc3RyaW5nJ1xuXHRcdFx0PyAhbmFtZSB8fCBTVEFSVFNfV0lUSF9MT1dFUkNBU0UudGVzdChuYW1lKSB8fCBvcHRpb25zLmNvbXBvbmVudHMgJiYgbmFtZSBpbiBvcHRpb25zLmNvbXBvbmVudHMgJiYgb3B0aW9ucy5jb21wb25lbnRzW25hbWVdIT09b3B0aW9uc1xuXHRcdFx0OiBuYW1lIT09dW5kZWZpbmVkXG5cdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9uYW1lKTsgfVxuXHR9KTtcblx0XG5cdG9wdGlvbnMuZW1pdHMgJiZcblx0KCBpc0FycmF5KG9wdGlvbnMuZW1pdHMpID8gb3B0aW9ucy5lbWl0cyA6IEtleXMob3B0aW9ucy5lbWl0cykgKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGlmICggdHlwZW9mIGV2ZW50IT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdGlmICggLyg/OmNhcHR1cmV8b25jZXxwYXNzaXZlKSQvaS50ZXN0KCdvbicgKyBldmVudCkgfHwgL14tP1t2Vl1ub2RlLy50ZXN0KGV2ZW50KSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2VtaXRzKTsgfVxuXHR9KTtcblx0XG5cdGlmIChcblx0XHRvcHRpb25zLmRpcmVjdGl2ZXMgJiYgJ2lzJyBpbiBvcHRpb25zLmRpcmVjdGl2ZXMvLyAyXG5cdFx0fHwvL0B0cy1pZ25vcmVcblx0XHRvcHRpb25zLnByb3BzICYmICggaXNBcnJheShvcHRpb25zLnByb3BzKSA/IG9wdGlvbnMucHJvcHMuaW5jbHVkZXMoJ2lzJykgOiAnaXMnIGluIG9wdGlvbnMucHJvcHMgKS8vIDNcblx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9pcyk7IH1cblx0XG5cdENIRUNLRUQuc2V0KGJlbG9uZywgYWxsS2V5cyk7XG5cdHJldHVybiBhbGxLZXlzO1xuXHRcbn1cblxudmFyIFVQUEVSID0gL1tBLVpdLztcbmZ1bmN0aW9uIGZpeFBhc2NhbCAocGFzY2FsICAgICAgICAsIGNhc2VzICAgICAgICkge1xuXHR2YXIgRmlyc3QgPSBwYXNjYWxbMF0gO1xuXHR2YXIgZmlyc3QgPSBGaXJzdC50b0xvd2VyQ2FzZSgpO1xuXHR2YXIgcmVzdCA9IHBhc2NhbC5zbGljZSgxKTtcblx0Y2FzZXNbZmlyc3QgKyByZXN0XSA9IG51bGw7XG5cdGh5cGhlbmF0ZShmaXJzdCwgcmVzdCwgY2FzZXMpO1xuXHRmaXJzdD09PUZpcnN0IHx8IGh5cGhlbmF0ZShGaXJzdCwgcmVzdCwgY2FzZXMpO1xufVxuZnVuY3Rpb24gaHlwaGVuYXRlIChiZWZvcmUgICAgICAgICwgYWZ0ZXIgICAgICAgICwgY2FzZXMgICAgICAgKSB7XG5cdHZhciBpbmRleCA9IGFmdGVyLnNlYXJjaChVUFBFUik7XG5cdGlmICggaW5kZXg8MCApIHsgY2FzZXNbYmVmb3JlICsgYWZ0ZXJdID0gbnVsbDsgfVxuXHRlbHNlIHtcblx0XHRpZiAoIGluZGV4ICkgeyBiZWZvcmUgKz0gYWZ0ZXIuc2xpY2UoMCwgaW5kZXgpOyB9XG5cdFx0dmFyIGNoYXIgPSBhZnRlcltpbmRleF0gO1xuXHRcdGFmdGVyID0gYWZ0ZXIuc2xpY2UoaW5kZXggKyAxKTtcblx0XHRoeXBoZW5hdGUoYmVmb3JlICsgJy0nICsgY2hhci50b0xvd2VyQ2FzZSgpLCBhZnRlciwgY2FzZXMpO1xuXHRcdGh5cGhlbmF0ZShiZWZvcmUgKyAnLScgKyBjaGFyLCBhZnRlciwgY2FzZXMpO1xuXHRcdGJlZm9yZVtiZWZvcmUubGVuZ3RoIC0gMV09PT0nLScgfHwgaHlwaGVuYXRlKGJlZm9yZSArIGNoYXIsIGFmdGVyLCBjYXNlcyk7XG5cdH1cbn1cblxudmFyIERFViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFtcblx0J3Byb3RvJyxcblx0J2NvbXBpbGVfY2FzZScsXG5cdCdjb21waWxlX25hbWUnLFxuXHQnY29tcGlsZV9wcm9wcycsXG5cdCdjb21waWxlX2VtaXRzJyxcblx0J2NvbXBpbGVfaXMnLFxuXHQnY29tcGlsZV9sYXllcicsXG5cdCdjb21waWxlX3Jlc2VydmVkJyxcblx0J2NvbXBpbGVfcmVkZWZpbmVkJyxcblx0J2NvbXBpbGVfb3ZlcndyaXRlJyxcblx0J2NvbXBpbGVfdHlwZScsXG5cdCdjb21waWxlX3N5bWJvbCcsXG5cdCdjb21waWxlX3NoYWRvdycsXG5cdCdydW50aW1lX3NoYWRvdycsXG5cdCdydW50aW1lX3JlZGVmaW5lZCcsXG5cdCdydW50aW1lX3N5bWJvbCcsXG5cdCdydW50aW1lX3Jlc2VydmVkJyxcblx0J3J1bnRpbWVfZW51bWVyYWJsZScsXG5cdCdydW50aW1lX2RhdGEnLFxuXTtcblxuICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICBcblx0ICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuXG4gICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgIFxuIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGFzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbj8nO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5mdW5jdGlvbiBjcmVhdGVkIChlbCAgICAgLCBiaW5kaW5nICAgICApIHsgYmluZGluZy5hcmc9PT11bmRlZmluZWQgPyBhc3NpZ24oZWwsIGJpbmRpbmcudmFsdWUpIDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBlbFtiaW5kaW5nLmFyZ10gPSBiaW5kaW5nLnZhbHVlICk7IH1cbmZ1bmN0aW9uIHVwZGF0ZWQgKGVsICAgICAsIGJpbmRpbmcgICAgICkgeyBiaW5kaW5nLmFyZz09PXVuZGVmaW5lZCA/IGFzc2lnbihlbCwgYmluZGluZy52YWx1ZSkgOiBiaW5kaW5nLm9sZFZhbHVlPT09YmluZGluZy52YWx1ZSB8fCAoIGVsW2JpbmRpbmcuYXJnXSA9IGJpbmRpbmcudmFsdWUgKTsgfVxuXG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShOVUxMLCB7XG5cdFxuXHRjcmVhdGVkOiB7IHZhbHVlOiBjcmVhdGVkLCBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGJpbmQ6IHsgdmFsdWU6IGNyZWF0ZWQsIGVudW1lcmFibGU6IHRydWUgfSxcblx0XG5cdHVwZGF0ZWQ6IHsgdmFsdWU6IHVwZGF0ZWQsIGVudW1lcmFibGU6IHRydWUgfSxcblx0Y29tcG9uZW50VXBkYXRlZDogeyB2YWx1ZTogdXBkYXRlZCwgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRcbn0pKTtcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCBSZW5kZXIsIHsgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU3R5bGUsIHsgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcbmltcG9ydCBDb21wb25lbnQsIHsgbWl4aW4gfSBmcm9tICcuL0NvbXBvbmVudCwgbWl4aW4vJztcbmltcG9ydCBwcm9wIGZyb20gJy4vdi1wcm9wJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0SWRlbnRpZmllcixcblx0U2NvcGUsXG5cdFRlbXBsYXRlLFxuXHRSZW5kZXIsIFN0YXRpY1JlbmRlckZucyxcblx0U3R5bGUsIHJlbW92ZSxcblx0Q29tcG9uZW50LCBtaXhpbixcblx0cHJvcCxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRJZGVudGlmaWVyOiBJZGVudGlmaWVyLFxuXHRTY29wZTogU2NvcGUsXG5cdFRlbXBsYXRlOiBUZW1wbGF0ZSxcblx0UmVuZGVyOiBSZW5kZXIsIFN0YXRpY1JlbmRlckZuczogU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZTogU3R5bGUsIHJlbW92ZTogcmVtb3ZlLFxuXHRDb21wb25lbnQ6IENvbXBvbmVudCwgbWl4aW46IG1peGluLFxuXHRwcm9wOiBwcm9wLFxufSk7XG4iXSwibmFtZXMiOlsidW5kZWZpbmVkIiwiY3JlYXRlIiwiZnJlZXplIiwib3duS2V5cyIsImdldFByb3RvdHlwZU9mIiwiZ2V0IiwiRGVmYXVsdCIsInZlcnNpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQkFBYyxRQUFROztBQ0l0QixJQUFJLE1BQU0sR0FBRztBQUNiLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7QUFDbkcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztBQUN2RCxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcs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QUNoQyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMzRCxHQUFHLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDL0IsR0FBRyxLQUFLLE1BQU0sR0FBRyxFQUFFLE1BQU0sSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUMzSCxHQUFHLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDN0IsR0FBRyxJQUFJLElBQUksU0FBUztBQUNwQixHQUFHLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3hHLFFBQVEsRUFBRSxNQUFNLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUM3RCxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzFCLEdBQUcsS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDeEcsUUFBUSxFQUFFLE1BQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJ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