/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：25.0.0
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
import freeze from '.Object.freeze';
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
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import getPrototypeOf from '.Object.getPrototypeOf';
import propertyIsEnumerable from '.Object.prototype.propertyIsEnumerable';
import error from '.console.error';
import Default$1 from '.default';

var version$1 = '25.0.0';

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
			if ( value.multiline===M && ( value_source.includes('^') || value_source.includes('$') ) ) { throw SyntaxError('multiline'); }
			if ( value.dotAll===S && value_source.includes('.') ) { throw SyntaxError('dotAll'); }
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
	test.multiline = exec.multiline = source.includes('^') || source.includes('$') ? M : null;
	test.dotAll = exec.dotAll = source.includes('.') ? S : null;
	return re;
}

var RE_bind = /*#__PURE__*/bind.bind(RE       );

function Context (flags        )          {
	return {
		U: !flags.includes('u'),
		I: !flags.includes('i'),
		M: !flags.includes('m'),
		S: !flags.includes('s'),
		flags: flags
	};
}

var CONTEXT          = /*#__PURE__*/Context('');

var newRegExp = /*#__PURE__*/new Proxy(RE, {
	apply: function (RE, thisArg, args                                   ) { return apply(RE, CONTEXT, args); }
	,
	get: function (RE, flags        ) { return RE_bind(Context(flags)); }
	,
	defineProperty: function () { return false; }
	,
	preventExtensions: function () { return false; }
});

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

var SCOPE              = StaticScope.prototype = /*#__PURE__*/freeze(create$1(null, {
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
	return freeze(Scope);
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

var Component           = /*#__PURE__*/freeze(/*#__PURE__*/defineProperties(
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
					if ( this!==Component && isComponentConstructor(this) ) { throw TypeError('(Component!this)._main()'); }
					var Vue = Function('return Vue')();
					if ( typeof Vue==='object' ) {
						//@ts-ignore
						var __dev__ = getOwnPropertyDescriptor(Vue.createApp(create$1(NULL)).config, 'isNativeTag') .writable ? undefined$1 : create$1(NULL);
						var app = Vue.createApp(
							ToOptions(
								Component,
								Vue,
								__dev__
							)
						);
						if ( __dev__ ) { defineProperty(app.config, 'isCustomElement', { value: test.bind(/^[a-z][^-]*?-/) }).performance = true; }
						app.mount(document.body);
					}
					else {
						new ( Vue.extend(
							ToOptions(
								Component,
								undefined$1,
								Vue.devtools ? ( Vue.config.ignoredElements.push(/^[a-z][^-]*?-/), Vue.config.performance = true, create$1(NULL) ) : undefined$1
							)
						) )()
						.$mount(( document.body.innerHTML = '<br>', 'br' ));
					}
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
			if ( Vue3 && !options.render && options.template ) {
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

var prop = /*#__PURE__*/freeze(create$1(NULL, {
	
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvdmVyc2lvbj90ZXh0IiwiLi4vLi4vLi4vai1yZWdleHAvc3JjL3RoZVJlZ0V4cC50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9uZXdSZWdFeHAudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvY2xlYXJSZWdFeHAudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZXhwb3J0LnRzIiwiU2NvcGUvXy50cyIsIlNjb3BlL1N0YXRpY1Njb3BlLnRzIiwiU2NvcGUvS0VZUy50cyIsIlNjb3BlL0R5bmFtaWNTY29wZS50cyIsIlNjb3BlLy50cyIsIlRlbXBsYXRlLnRzIiwiUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsInYtcHJvcC50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcyNS4wLjAnOyIsImltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IGpvaW4gZnJvbSAnLkFycmF5LnByb3RvdHlwZS5qb2luJztcbmltcG9ydCB1bnNoaWZ0IGZyb20gJy5BcnJheS5wcm90b3R5cGUudW5zaGlmdCc7XG5cbnZhciBvYmplY3QgPSB7XG5cdCcwJzogJzEnLCAnMSc6ICcyJywgJzInOiAnMycsICczJzogJzQnLCAnNCc6ICc1JywgJzUnOiAnNicsICc2JzogJzcnLCAnNyc6ICc4JywgJzgnOiAnOScsICc5JzogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn0gICAgICAgICA7XG5cbnZhciBsYXN0SXRlbSAgICAgICA9ICd6JztcbnZhciBhcnJheSAgICAgICAgID0gWyBsYXN0SXRlbSBdO1xudmFyIGxhc3RJbmRleCAgICAgICAgID0gYXJyYXkubGVuZ3RoIC0gMTtcblxudmFyIG5vdEtleXdvcmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Rlc3QuYmluZCgvXFxkLyk7XG52YXIgdG9TdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9qb2luLmJpbmQoYXJyYXksICcnKTtcbnZhciBwcmVwZW5kQSAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Vuc2hpZnQuYmluZChhcnJheSwgJ2EnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSAgICAgICAgIHtcblx0aWYgKCBsYXN0SXRlbT09PSc5JyApIHtcblx0XHRhcnJheVtsYXN0SW5kZXhdID0gJ2EnO1xuXHRcdHZhciBzdHJpbmcgICAgICAgIDtcblx0XHRpZiAoIG5vdEtleXdvcmQoc3RyaW5nID0gdG9TdHJpbmcoKSkgKSB7XG5cdFx0XHRsYXN0SXRlbSA9ICdhJztcblx0XHRcdHJldHVybiBzdHJpbmc7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsYXN0SXRlbSE9PSd6JyApIHtcblx0XHRsYXN0SXRlbSA9IGFycmF5W2xhc3RJbmRleF0gPSBvYmplY3RbbGFzdEl0ZW1dO1xuXHRcdHJldHVybiB0b1N0cmluZygpO1xuXHR9XG5cdGxhc3RJdGVtID0gYXJyYXlbbGFzdEluZGV4XSA9ICcwJztcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IGluZGV4OyBhcnJheVtpbmRleF0gPSAnMCcgKSB7XG5cdFx0dmFyIGl0ZW0gICAgICAgPSBhcnJheVstLWluZGV4XSA7XG5cdFx0aWYgKCBpdGVtIT09J3onICkge1xuXHRcdFx0YXJyYXlbaW5kZXhdID0gb2JqZWN0W2l0ZW1dO1xuXHRcdFx0cmV0dXJuIHRvU3RyaW5nKCk7XG5cdFx0fVxuXHR9XG5cdGxhc3RJbmRleCA9IHByZXBlbmRBKCkgLSAxO1xuXHRyZXR1cm4gdG9TdHJpbmcoKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiZXhwb3J0IGRlZmF1bHQnOC4wLjAnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aGVSZWdFeHAgKHJlICAgICAgICApICAgICAgICAge1xuXHR2YXIgdGVzdCA9IHJlLnRlc3QgPSBUZXN0KHJlKTtcblx0dmFyIGV4ZWMgPSByZS5leGVjID0gRXhlYyhyZSk7XG5cdHZhciBzb3VyY2UgPSB0ZXN0LnNvdXJjZSA9IGV4ZWMuc291cmNlID0gcmUuc291cmNlO1xuXHR0ZXN0LnVuaWNvZGUgPSBleGVjLnVuaWNvZGUgPSByZS51bmljb2RlO1xuXHR0ZXN0Lmlnbm9yZUNhc2UgPSBleGVjLmlnbm9yZUNhc2UgPSByZS5pZ25vcmVDYXNlO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gc291cmNlLmluZGV4T2YoJ14nKTwwICYmIHNvdXJjZS5pbmRleE9mKCckJyk8MCA/IG51bGwgOiByZS5tdWx0aWxpbmU7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBzb3VyY2UuaW5kZXhPZignLicpPDAgPyBudWxsIDogcmUuZG90QWxsO1xuXHRyZXR1cm4gcmU7XG59O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIHZhbHVlX3NvdXJjZS5pbmNsdWRlcygnXicpIHx8IHZhbHVlX3NvdXJjZS5pbmNsdWRlcygnJCcpICkgKSB7IHRocm93IFN5bnRheEVycm9yKCdtdWx0aWxpbmUnKTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5kb3RBbGw9PT1TICYmIHZhbHVlX3NvdXJjZS5pbmNsdWRlcygnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gVTtcblx0dGVzdC5pZ25vcmVDYXNlID0gZXhlYy5pZ25vcmVDYXNlID0gSTtcblx0dGVzdC5tdWx0aWxpbmUgPSBleGVjLm11bHRpbGluZSA9IHNvdXJjZS5pbmNsdWRlcygnXicpIHx8IHNvdXJjZS5pbmNsdWRlcygnJCcpID8gTSA6IG51bGw7XG5cdHRlc3QuZG90QWxsID0gZXhlYy5kb3RBbGwgPSBzb3VyY2UuaW5jbHVkZXMoJy4nKSA/IFMgOiBudWxsO1xuXHRyZXR1cm4gcmU7XG59XG5cbnZhciBSRV9iaW5kID0gLyojX19QVVJFX18qL2JpbmQuYmluZChSRSAgICAgICApO1xuXG5mdW5jdGlvbiBDb250ZXh0IChmbGFncyAgICAgICAgKSAgICAgICAgICB7XG5cdHJldHVybiB7XG5cdFx0VTogIWZsYWdzLmluY2x1ZGVzKCd1JyksXG5cdFx0STogIWZsYWdzLmluY2x1ZGVzKCdpJyksXG5cdFx0TTogIWZsYWdzLmluY2x1ZGVzKCdtJyksXG5cdFx0UzogIWZsYWdzLmluY2x1ZGVzKCdzJyksXG5cdFx0ZmxhZ3M6IGZsYWdzXG5cdH07XG59XG5cbnZhciBDT05URVhUICAgICAgICAgID0gLyojX19QVVJFX18qL0NvbnRleHQoJycpO1xuXG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovbmV3IFByb3h5KFJFLCB7XG5cdGFwcGx5OiBmdW5jdGlvbiAoUkUsIHRoaXNBcmcsIGFyZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoUkUsIENPTlRFWFQsIGFyZ3MpOyB9XG5cdCxcblx0Z2V0OiBmdW5jdGlvbiAoUkUsIGZsYWdzICAgICAgICApIHsgcmV0dXJuIFJFX2JpbmQoQ29udGV4dChmbGFncykpOyB9XG5cdCxcblx0ZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdCxcblx0cHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9XG59KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICAgICBcbiAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5cbnZhciBjbGVhclJlZ0V4cCA9ICckXycgaW4gUmVnRXhwXG5cdD8gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdFJFR0VYUC50ZXN0ID0gUkVHRVhQLnRlc3Q7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRcdFJFR0VYUC50ZXN0KCcnKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9KClcblx0OiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGVhclJlZ0V4cDsiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCA9IC8qI19fUFVSRV9fKi9jcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0gKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBTVVJST0dBVEVfUEFJUi50ZXN0KGJyYW5jaCkgPyBicmFuY2guc2xpY2UoMCwgMikgOiBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZFBvaW50QnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZShjaGFyYWN0ZXIubGVuZ3RoKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZSgxKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIHNvdXJjaWZ5IChncm91cCAgICAgICAsIG5lZWRFc2NhcGUgICAgICAgICApICAgICAgICAge1xuXHR2YXIgYnJhbmNoZXMgICAgICAgICAgID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoICAgICAgICAgICA9IFtdO1xuXHR2YXIgbm9FbXB0eUJyYW5jaCAgICAgICAgICA9IHRydWU7XG5cdGZvciAoIHZhciBjaGFyYWN0ZXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyYWN0ZXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzICAgICAgICAgPSBzb3VyY2lmeShncm91cFtjaGFyYWN0ZXJdICwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcmFjdGVyKSApIHsgY2hhcmFjdGVyID0gJ1xcXFwnICsgY2hhcmFjdGVyOyB9XG5cdFx0XHRzdWJfYnJhbmNoZXMgPyBicmFuY2hlcy5wdXNoKGNoYXJhY3RlciArIHN1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSAgOiAnWycgKyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpICsgJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicgKyBicmFuY2hlcy5qb2luKCd8JykgKyAnKSdcblx0XHQpXG5cdFx0KyAoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IHRoZVJlZ0V4cCBmcm9tICcuL3RoZVJlZ0V4cCc7XG5pbXBvcnQgbmV3UmVnRXhwIGZyb20gJy4vbmV3UmVnRXhwJztcbmltcG9ydCBjbGVhclJlZ0V4cCBmcm9tICcuL2NsZWFyUmVnRXhwJztcbmltcG9ydCBncm91cGlmeSBmcm9tICcuL2dyb3VwaWZ5JztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0bmV3UmVnRXhwLFxuXHR0aGVSZWdFeHAsXG5cdGNsZWFyUmVnRXhwLFxuXHRncm91cGlmeSxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdG5ld1JlZ0V4cDogbmV3UmVnRXhwLFxuXHR0aGVSZWdFeHA6IHRoZVJlZ0V4cCxcblx0Y2xlYXJSZWdFeHA6IGNsZWFyUmVnRXhwLFxuXHRncm91cGlmeTogZ3JvdXBpZnlcbn0pO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sPyc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbnZhciBfICAgICAgPSBTeW1ib2wgPyAvKiNfX1BVUkVfXyovU3ltYm9sKCdfJykgICAgICAgIDogJ18nO1xuXG5mdW5jdGlvbiAkICAgICAgICAgICAgICAgICAgKCAgICAgICAgIGNzcyAgICAgICAgICwgbWVkaWEgICAgICAgICApICAgIHtcblx0dmFyIHN0eWxlICAgICAgICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gdGhpc1tfXShjc3MpOyB9XG5cdGlmICggbWVkaWEhPT11bmRlZmluZWQgKSB7IHN0eWxlLm1lZGlhID0gbWVkaWE7IH1cblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgeyBfLCAkIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBwcmVwYXJlXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHR5cGVvZiBfPT09J3N5bWJvbCcgPyBudWxsIDogLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIF9kZXNjcmlwdG9yID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgIDtcblx0X2Rlc2NyaXB0b3IudmFsdWUgPSBudWxsO1xuXHRfZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cdF9kZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuXHRfZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuXHRyZXR1cm4gZnVuY3Rpb24gJCAoc2NvcGUgICAgICAgKSB7IGRlZmluZVByb3BlcnR5KHNjb3BlLCBfLCBfZGVzY3JpcHRvcik7IH07XG59KCk7XG5cbmZ1bmN0aW9uIFNlYXJjaCAoa2V5cyAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gUmVnRXhwKCdfXycgKyBncm91cGlmeShrZXlzLCBmYWxzZSwgdHJ1ZSkgKyAnX18nLCAnZycpOyB9XG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUgICAgICAgICAgICAgKSB7IHJldHVybiBmdW5jdGlvbiByZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHNjb3BlW19fa2V5X18uc2xpY2UoMiwgLTIpXSA7IH07IH1cblxudmFyIFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XSBdID0gSWRlbnRpZmllcigpOyB9XG59ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG52YXIgU0NPUEUgICAgICAgICAgICAgID0gU3RhdGljU2NvcGUucHJvdG90eXBlID0gLyojX19QVVJFX18qL2ZyZWV6ZShjcmVhdGUobnVsbCwge1xuXHQkOiB7IHZhbHVlOiAkLCB3cml0YWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IGZhbHNlIH0sXG59KSAgICAgICAgICAgICAgICk7XG5cbnZhciBJbmhlcml0ZWRTdGF0aWNTY29wZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIEluaGVyaXRlZFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICAsIHByb3RvICAgICAgICAgICAgICkgICAgICAge1xuXHRcdHByZXBhcmVfICYmIHByZXBhcmVfKHRoaXMpO1xuXHRcdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XSBdID0gSWRlbnRpZmllcigpOyB9XG5cdFx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICggKi9cblx0XHRcdGtleXNba2V5cy5sZW5ndGhdID0ga2V5LyogKSovO1xuXHRcdH1cblx0XHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0XHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdH1cblx0SW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG5cdHJldHVybiBJbmhlcml0ZWRTdGF0aWNTY29wZTtcbn0oKSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgeyBTdGF0aWNTY29wZSwgU0NPUEUsIEluaGVyaXRlZFN0YXRpY1Njb3BlIH07XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImV4cG9ydCBkZWZhdWx0IC9bXlxceDAwLUBbLWB7LVxceDdGXFxzXVteXFx4MDAtLzotQFstYHstXFx4N0ZcXHNdKig/Ol9bXlxceDAwLS86LUBbLWB7LVxceDdGXFxzXSspKi9nOyIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5cbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IFN0YXRpY1Njb3BlIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIF9fS0VZX18gPSBSZWdFeHAoJ19fJyArIEtFWVMuc291cmNlICsgJ19fJywgJ2cnKTtcblxuZnVuY3Rpb24gZ2V0IChjYWNoZSAgICAgICAgICAgICAsIGtleSAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGNhY2hlW2tleV0gfHwgKCBjYWNoZVtrZXldID0gSWRlbnRpZmllcigpICk7IH1cblxuZnVuY3Rpb24gc2NvcGlmeSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgLCBjYWNoZSAgICAgICAgICAgICApICAgICAgICAge1xuXHR2YXIga2V5cyAgICAgICAgLFxuXHRcdGluZGV4ICAgICAgICAsXG5cdFx0dmFsdWVzICAgICAgICAgICxcblx0XHRrZXkgICAgICAgIDtcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBnZXQoY2FjaGUsIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWUuc3BsaXQoJyAnKTtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlcy5sZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlWy0taW5kZXhdIDtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0gZ2V0KGNhY2hlLCBrZXkpKycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZS5sZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHNjb3BpZnkodmFsdWVbLS1pbmRleF0sIGNhY2hlKTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0ga2V5KycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGZvciAoIGtleSBpbiB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdGlmICggKCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgIClba2V5XSApIHsga2V5cyArPSAnICcrZ2V0KGNhY2hlLCBrZXkpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBEeW5hbWljU2NvcGUgKGNhY2hlICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7XG5cdHZhciBzY29wZSA9IGZ1bmN0aW9uIHNjb3BlICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAge1xuXHRcdHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdGlmICggbGVuZ3RoPjEgKSB7XG5cdFx0XHR2YWx1ZSA9IFsgdmFsdWUsIGFyZ3VtZW50c1sxXSBdO1xuXHRcdFx0Zm9yICggdmFyIGluZGV4ID0gMjsgaW5kZXghPT1sZW5ndGg7ICsraW5kZXggKSB7ICggdmFsdWUgICAgICAgICAgKVtpbmRleF0gPSBhcmd1bWVudHNbaW5kZXhdOyB9XG5cdFx0fVxuXHRcdHJldHVybiBzY29waWZ5KHZhbHVlLCBjYWNoZSk7XG5cdH0gICAgICAgICAgICAgICAgO1xuXHRzY29wZS5wcm90b3R5cGUgPSBjYWNoZTtcblx0c2NvcGUuJCA9ICQ7XG5cdHNjb3BlW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9fS0VZX18sIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGdldChjYWNoZSwgX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZXhwb3J0IHsgRHluYW1pY1Njb3BlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IG1hdGNoIGZyb20gJy5TdHJpbmcucHJvdG90eXBlLm1hdGNoJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IFN0YXRpY1Njb3BlLCBJbmhlcml0ZWRTdGF0aWNTY29wZSwgU0NPUEUgfSBmcm9tICcuL1N0YXRpY1Njb3BlJztcbmltcG9ydCBEeW5hbWljU2NvcGUgZnJvbSAnLi9EeW5hbWljU2NvcGUnO1xuaW1wb3J0IEtFWVMgZnJvbSAnLi9LRVlTJztcblxuZnVuY3Rpb24gdGhyb3dFbXB0eSAoa2V5cyAgICAgICAgKSAgICAgICAgeyB0aHJvdyBFcnJvcignU2NvcGUoXCInICsga2V5cyArICdcIiknKTsgfVxudmFyIGlzU3RhdGljU2NvcGUgPSAvKiNfX1BVUkVfXyovaXNQcm90b3R5cGVPZi5iaW5kKFNDT1BFKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xudmFyIG1hdGNoX2NhbGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovbWF0Y2guY2FsbC5iaW5kKG1hdGNoKTtcblxuZnVuY3Rpb24gbWl4IChwcm90b3MgICAgICAgICApICAgICAgICAgICAgICB7XG5cdHZhciBzY29wZSAgICAgICAgICAgICAgPSBjcmVhdGUoU0NPUEUpO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBwcm90b3MubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgcHJvdG8gICAgICAgID0gcHJvdG9zW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiBwcm90bz09PSdmdW5jdGlvbicgKSB7IHByb3RvID0gcHJvdG8ucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxudmFyIFNjb3BlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gU2NvcGUgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICApICAgICAgICB7XG5cdFx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB0aGlzICkge1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBEeW5hbWljU2NvcGUobWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgaXNTdGF0aWNTY29wZSh0aGlzLnByb3RvdHlwZSkgKSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlKSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIGlzU3RhdGljU2NvcGUodGhpcykgKSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKHRoaXMpKTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUoU0NPUEUpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIHRoaXMgKSB7XG5cdFx0XHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgdmFyIHNjb3BlICAgICAgICAgICAgICA9IG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShtYXRjaF9jYWxsKGtleXMsIEtFWVMpIHx8IHRocm93RW1wdHkoa2V5cyksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IG1peCh0aGlzICAgICAgICAgICApKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIGlzU3RhdGljU2NvcGUodGhpcy5wcm90b3R5cGUpICkgeyBzY29wZSA9IG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShtYXRjaF9jYWxsKGtleXMsIEtFWVMpIHx8IHRocm93RW1wdHkoa2V5cyksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggaXNTdGF0aWNTY29wZSh0aGlzKSApIHsgc2NvcGUgPSBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdFx0XHRlbHNlIHsgcmV0dXJuIG5ldyBTdGF0aWNTY29wZShtYXRjaF9jYWxsKGtleXMsIEtFWVMpIHx8IHRocm93RW1wdHkoa2V5cykpOyB9XG5cdFx0XHRcdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xuXHRcdFx0XHRyZXR1cm4gc2NvcGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgcmV0dXJuIG5ldyBTdGF0aWNTY29wZShtYXRjaF9jYWxsKGtleXMsIEtFWVMpIHx8IHRocm93RW1wdHkoa2V5cykpOyB9XG5cdFx0fVxuXHR9XG5cdC8vQHRzLWlnbm9yZVxuXHRTY29wZS5wcm90b3R5cGUgPSBudWxsO1xuXHRyZXR1cm4gZnJlZXplKFNjb3BlKTtcbn0oKTtcblxuZXhwb3J0IHsgU2NvcGUgYXMgZGVmYXVsdCwgS0VZUyB9OyIsImltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCAgICAgICAgLCBzY29wZSAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qL3Njb3BlW19dKGh0bWwpO1xufVxuXG5leHBvcnQgeyBUZW1wbGF0ZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcbmltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbnZhciBJU19OT1RfRVM1ID0gLyojX19QVVJFX18qL3Rlc3QuYmluZCgvXihjb25zfGxlKXQgLyk7XG5cbmZ1bmN0aW9uIFdpdGhTdHJpcHBlZCAocmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0cmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlO1xuXHRyZXR1cm4gcmVuZGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXIgKGNvZGUgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdHJldHVybiBjb2RlWzBdPT09JygnXG5cdFx0PyAvKiNfX1BVUkVfXyovRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybiBjbGFzcyBSZW5kZXIgZXh0ZW5kcyBudWxse2NvbnN0cnVjdG9yJyArICggc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUgKSArICd9OycpKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0OiAvKiNfX1BVUkVfXyovV2l0aFN0cmlwcGVkKFxuXHRcdFx0LyojX19QVVJFX18qL0Z1bmN0aW9uKC8qI19fUFVSRV9fKi9JU19OT1RfRVM1KGNvZGUpXG5cdFx0XHRcdD8gJ1widXNlIHN0cmljdFwiO3JldHVybntyZW5kZXIoKXsnICsgKCBzY29wZSA/IHNjb3BlW19dKGNvZGUpIDogY29kZSApICsgJ319LnJlbmRlcjsnXG5cdFx0XHRcdDogJ1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbiByZW5kZXIoKXsnICsgKCBzY29wZSA/IHNjb3BlW19dKGNvZGUpIDogY29kZSApICsgJ307J1xuXHRcdFx0KSgpICAgICAgICAgIFxuXHRcdCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gU3RhdGljUmVuZGVyRm5zIChjb2RlcyAgICAgICAgICAgICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICB7XG5cdHZhciBpbmRleCAgICAgICAgID0gY29kZXMubGVuZ3RoO1xuXHR2YXIgYm9keSAgICAgICAgID0gJ10nO1xuXHRpZiAoIHNjb3BlICkge1xuXHRcdGZvciAoIHZhciBzY29wZV8gPSBzY29wZVtfXTsgaW5kZXg7ICkgeyBib2R5ID0gJ2Z1bmN0aW9uKCl7JyArIHNjb3BlXyhjb2Rlc1stLWluZGV4XSApICsgJ30sJyArIGJvZHk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHR3aGlsZSAoIGluZGV4ICkgeyBib2R5ID0gJ2Z1bmN0aW9uKCl7JyArIGNvZGVzWy0taW5kZXhdICsgJ30sJyArIGJvZHk7IH1cblx0fVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVyblsnICsgYm9keSkoKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0eWxlIChjc3MgICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgIHtcblx0dmFyIHN0eWxlICAgICAgICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gc2NvcGUgPyBzY29wZVtfXShjc3MpIDogY3NzOyB9XG5cdHJldHVybiBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZSAoc3R5bGUgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgIHtcblx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZSk7XG5cdHJldHVybiByZW1vdmU7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgcHJvcGVydHlJc0VudW1lcmFibGUgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnO1xuaW1wb3J0IGVycm9yIGZyb20gJy5jb25zb2xlLmVycm9yJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5leHBvcnQgdmFyIHRoYXQgICAgICAgICAgICAgICAgID0gbnVsbDtcblxuZXhwb3J0IHZhciBOQU1FUyA9IGFzc2lnbiAmJiAvKiNfX1BVUkVfXyovYXNzaWduKGNyZWF0ZShudWxsKSwge1xuXHRfOiBudWxsLFxuXHRfYzogbnVsbCxcblx0X2NvbXB1dGVkV2F0Y2hlcnM6IG51bGwsXG5cdF9kYXRhOiBudWxsLFxuXHRfZGlyZWN0SW5hY3RpdmU6IG51bGwsXG5cdF9ldmVudHM6IG51bGwsXG5cdF9oYXNIb29rRXZlbnQ6IG51bGwsXG5cdF9oYXNNb3ZlOiBudWxsLFxuXHRfaW5hY3RpdmU6IG51bGwsXG5cdF9pc0JlaW5nRGVzdHJveWVkOiBudWxsLFxuXHRfaXNEZXN0cm95ZWQ6IG51bGwsXG5cdF9pc01vdW50ZWQ6IG51bGwsXG5cdF9pc1Z1ZTogbnVsbCxcblx0X2xlYXZpbmc6IG51bGwsXG5cdF9uYW1lOiBudWxsLFxuXHRfcHJvcHM6IG51bGwsXG5cdF9wcm92aWRlZDogbnVsbCxcblx0X3JlZmxvdzogbnVsbCxcblx0X3JlbmRlclByb3h5OiBudWxsLFxuXHRfc2VsZjogbnVsbCxcblx0X3N0YXRpY1RyZWVzOiBudWxsLFxuXHRfdWlkOiBudWxsLFxuXHRfdXBkYXRlOiBudWxsLFxuXHRfdm5vZGU6IG51bGwsXG5cdF93YXRjaGVyOiBudWxsLFxuXHRfd2F0Y2hlcnM6IG51bGwsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb1Byb3RvIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0ZGVmaW5lUHJvcGVydGllcyhfID8gXy5jdHggOiBzZWxmLCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9Db25zdHJ1Y3RvciAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9OYW1lcyAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAsIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdHZhciBkYXRhID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGF0YU5hbWVzKSAgICAgICAgO1xuXHRpZiAoIF8gKSB7XG5cdFx0dmFyIGFjY2Vzc0NhY2hlID0gXy5hY2Nlc3NDYWNoZTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBkYXRhTmFtZXMgKSB7XG5cdFx0XHRkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0XHRpZiAoIG5hbWUgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0Zm9yICggbmFtZSBpbiBkYXRhTmFtZXMgKSB7IGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTsgfVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9EYXRhIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIGRlZmluZVByb3BlcnRpZXMoY3R4LCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0aWYgKCBfICkge1xuXHRcdHZhciBhY2Nlc3NDYWNoZSA9IF8uYWNjZXNzQ2FjaGU7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIHJlc3ROYW1lcyApICYmIG5hbWVbMF0hPT0nJCcgKSB7XG5cdFx0XHRcdGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRcdFx0aWYgKCBuYW1lIGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBub3dOYW1lcyA9IEtleXMoY3R4KTtcblx0XHR2YXIgaW5kZXggPSBub3dOYW1lcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpbmRleCApIHtcblx0XHRcdG5hbWUgPSBub3dOYW1lc1stLWluZGV4XSA7XG5cdFx0XHRpZiAoICEoIG5hbWUgaW4gcmVzdE5hbWVzICkgJiYgbmFtZVswXSE9PSckJyApIHsgZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdOyB9XG5cdFx0fVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZEYXRhIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgc2tpcERhdGEgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgLCBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBza2lwQ29uc3RydWN0b3IgICAgICAgICAsIF9fZGV2X18gICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyAmJiAhKCBuYW1lIGluIE5BTUVTICkgKSB7XG5cdFx0XHRlcnJvcihFcnJvcignW2pWdWUgYnVnXTogdm0uJyArIG5hbWUgKyAnIGlzIHVua25vd24gYnV0IGV4aXN0cycpKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHR2YXIgb2xkRGVzY3JpcHRvcnMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGN0eCksIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRpZiAoIHByb3RvRGVzY3JpcHRvcnMgKSB7XG5cdFx0Zm9yICggdmFyICRuYW1lIGluIHByb3RvRGVzY3JpcHRvcnMgKSB7IGlmICggJG5hbWUgaW4gY3R4ICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVzZXJ2ZWQpOyB9IH1cblx0XHRkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdH1cblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0b3duS2V5cyhvbGREZXNjcmlwdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dmFyIG9sZERlc2NyaXB0b3IgPSBvbGREZXNjcmlwdG9yc1trZXldIDtcblx0XHR2YXIgbmV3RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdHgsIGtleSAgICAgICAgICAgICAgICAgKTtcblx0XHRpZiAoXG5cdFx0XHQhbmV3RGVzY3JpcHRvciB8fFxuXHRcdFx0bmV3RGVzY3JpcHRvci5jb25maWd1cmFibGUhPT1vbGREZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSB8fFxuXHRcdFx0bmV3RGVzY3JpcHRvci5lbnVtZXJhYmxlIT09b2xkRGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8XG5cdFx0XHQoIG5ld0Rlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHQ/IG5ld0Rlc2NyaXB0b3IudmFsdWUhPT1vbGREZXNjcmlwdG9yLnZhbHVlIHx8IG5ld0Rlc2NyaXB0b3Iud3JpdGFibGUhPT1vbGREZXNjcmlwdG9yLndyaXRhYmxlXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0OiBuZXdEZXNjcmlwdG9yLmdldCE9PW9sZERlc2NyaXB0b3IuZ2V0IHx8IG5ld0Rlc2NyaXB0b3Iuc2V0IT09b2xkRGVzY3JpcHRvci5zZXRcblx0XHRcdClcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3JlZGVmaW5lZCk7IH1cblx0fSk7XG5cdHZhciBkaWZLZXlzICAgICAgICAgICAgICAgICAgICAgICAgPSBvd25LZXlzKGN0eCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gISgga2V5IGluIG9sZERlc2NyaXB0b3JzICk7XG5cdH0pO1xuXHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHtcblx0XHRpZiAoIGRpZktleXMubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0fVxuXHR2YXIgZGlmTmFtZXMgPSBkaWZLZXlzLmZpbHRlcihmdW5jdGlvbiAoa2V5KSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHR5cGVvZiBrZXk9PT0nc3RyaW5nJyAmJiBrZXlbMF0hPT0nJCc7XG5cdH0pO1xuXHRpZiAoIHNraXBEYXRhICkge1xuXHRcdGlmICggZGlmTmFtZXMubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0fVxuXHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHR2YXIgY291bnQgPSAwO1xuXHRcdGZvciAoIG5hbWUgaW4gZGF0YU5hbWVzICkgeyArK2NvdW50OyB9XG5cdFx0aWYgKCBjb3VudCE9PWRpZk5hbWVzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIGRhdGFOYW1lcyApICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0XHR9KTtcblx0fVxuXHRkaWZOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgIG5hbWUpIHtcblx0XHRpZiAoIG5hbWUgaW4gdGhpcyAmJiAhKCBuYW1lIGluIHt9ICkgfHwgbmFtZSBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lPT09J2NvbnN0cnVjdG9yJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XHRpZiAoICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGN0eCwgbmFtZSkpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2VudW1lcmFibGUpOyB9XG5cdH0sIGdldFByb3RvdHlwZU9mKGN0eCkpO1xuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdCggZGF0YSAgICAgICAgIClbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRpZiAoIF8gJiYgbmFtZSBpbiBfLmFjY2Vzc0NhY2hlICkgeyBfLmFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0fSk7XG5cdGlmICggc2hhZG93QXNzaWduZXIgKSB7XG5cdFx0c2hhZG93Q2hlY2tlciAoZGF0YSk7XG5cdFx0c2hhZG93QXNzaWduZXIoc2VsZiwgZGF0YSk7XG5cdH1cblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBJTklUID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIElOSVQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICA7XG5cdElOSVQubW9kZSA9ICdvcGVuJztcblx0cmV0dXJuIElOSVQ7XG59KCk7XG5cbmZ1bmN0aW9uIGF0dGFjaCAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGVsICYmICggZWwuc2hhZG93Um9vdCB8fCBlbC5hdHRhY2hTaGFkb3coSU5JVCkgKTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93QXNzaWduZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0dmFyIG5hbWVzID0gaW5kZXg8MCA/IG51bGwgOiBhbG9uZy5zbGljZShpbmRleCArIDEpLnNwbGl0KCcuJyk7XG5cdHZhciB0b05hbWUgPSBuYW1lcyA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIG5hbWVzICkge1xuXHRcdGlmICggbmFtZXMubGVuZ3RoPT09MSApIHtcblx0XHRcdHZhciBuYW1lJGdldCA9IG5hbWVzWzBdICsgJyRnZXQnO1xuXHRcdFx0dmFyIG5hbWUkc2V0ID0gbmFtZXNbMF0gKyAnJHNldCc7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0YWxsW25hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0YWxsW25hbWUkZ2V0XSA9IG51bGw7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdG5hbWVzIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICApIHtcblx0XHRcdFx0XHRhbGxbbmFtZSArICckc2V0J10gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWVdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0XHRhbGxbbmFtZSArPSAnJGdldCddID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gdG9OYW1lICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gdG9OYW1lICsgJyRzZXQnO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgLCBkYXRhICAgICApIHtcblx0XHRcdGRhdGFbdG9OYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdGRhdGFbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dDaGVja2VyICggICAgICAgICAgICBhbG9uZyAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgc2hhZG93TmFtZXMgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGlmICggYWxvbmdbMF09PT0nXycgfHwgYWxvbmdbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0aWYgKCBpbmRleDwwICkge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRzZXQnO1xuXHRcdGlmICggdG9OYW1lJGdldCBpbiByZXN0TmFtZXMgfHwgdG9OYW1lJHNldCBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdHNoYWRvd05hbWVzW3RvTmFtZSRzZXRdID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggdG9OYW1lJGdldCBpbiBkYXRhTmFtZXMgfHwgdG9OYW1lJHNldCBpbiBkYXRhTmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgZGF0YSAgICAgICkge1xuXHRcdFx0aWYgKCB0b05hbWUkZ2V0IGluIGRhdGEgfHwgdG9OYW1lJHNldCBpbiBkYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc2hhZG93KTsgfVxuXHRcdH07XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBhbG9uZz09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCBhbG9uZyBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbYWxvbmddID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YU5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9O1xuXHR9XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwPyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgZnJvbSBmcm9tICcuQXJyYXkuZnJvbT8nO1xuaW1wb3J0IGdldFByb3RvdHlwZU9mIGZyb20gJy5SZWZsZWN0LmdldFByb3RvdHlwZU9mPz1PYmplY3QuZ2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gJy5PYmplY3Quc2V0UHJvdG90eXBlT2Y/JztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/JztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgZ2V0IGZyb20gJy5SZWZsZWN0LmdldD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgT3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBQUk9UT19CVUcgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyB0aGF0LCBOQU1FUywgcHJvUHJvdG8sIHByb0NvbnN0cnVjdG9yLCBwcm9OYW1lcywgcHJvRGF0YSwgZGV2RGF0YSB9IGZyb20gJy4vRGF0YSc7XG5pbXBvcnQgeyBTaGFkb3dBc3NpZ25lciwgU2hhZG93Q2hlY2tlciB9IGZyb20gJy4vU2hhZG93JztcblxuZXhwb3J0IHsgQ29tcG9uZW50IGFzIGRlZmF1bHQgfTtcbnZhciBDb21wb25lbnQgICAgICAgICAgID0gLyojX19QVVJFX18qL2ZyZWV6ZSgvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhcblx0ZnVuY3Rpb24gQ29tcG9uZW50ICgpIHsgcmV0dXJuIHRoYXQ7IH0sXG5cdHtcblx0XHRwcm90b3R5cGU6IHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiBudWxsLFxuXHRcdH0sXG5cdFx0cmVuZGVyOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogZnVuY3Rpb24gcmVuZGVyICggICAgICAgICAgKSB7IHRocm93IFR5cGVFcnJvcignQ29tcG9uZW50LnJlbmRlcj0nKTsgfSxcblx0XHRcdHNldDogZnVuY3Rpb24gcmVuZGVyICggICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICkgeyAoIHRoYXQgLl8gfHwgdGhhdCAuJG9wdGlvbnMgKS5yZW5kZXIgPSB2YWx1ZTsgfSxcblx0XHR9LFxuXHRcdF9tYWluOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogZnVuY3Rpb24gX21haW4gKCAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdHZhciBDb21wb25lbnQgPSB0aGlzO1xuXHRcdFx0XHRpZiAoICFpc0NvbXBvbmVudENvbnN0cnVjdG9yKENvbXBvbmVudCkgKSB7IHRocm93IFR5cGVFcnJvcignKCFDb21wb25lbnQpLl9tYWluJyk7IH1cblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIF9tYWluICggICAgICAgICAgICAgKSAgICAgICB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzIT09Q29tcG9uZW50ICYmIGlzQ29tcG9uZW50Q29uc3RydWN0b3IodGhpcykgKSB7IHRocm93IFR5cGVFcnJvcignKENvbXBvbmVudCF0aGlzKS5fbWFpbigpJyk7IH1cblx0XHRcdFx0XHR2YXIgVnVlID0gRnVuY3Rpb24oJ3JldHVybiBWdWUnKSgpO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIFZ1ZT09PSdvYmplY3QnICkge1xuXHRcdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0XHR2YXIgX19kZXZfXyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihWdWUuY3JlYXRlQXBwKGNyZWF0ZShOVUxMKSkuY29uZmlnLCAnaXNOYXRpdmVUYWcnKSAud3JpdGFibGUgPyB1bmRlZmluZWQgOiBjcmVhdGUoTlVMTCk7XG5cdFx0XHRcdFx0XHR2YXIgYXBwID0gVnVlLmNyZWF0ZUFwcChcblx0XHRcdFx0XHRcdFx0VG9PcHRpb25zKFxuXHRcdFx0XHRcdFx0XHRcdENvbXBvbmVudCxcblx0XHRcdFx0XHRcdFx0XHRWdWUsXG5cdFx0XHRcdFx0XHRcdFx0X19kZXZfX1xuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKCBfX2Rldl9fICkgeyBkZWZpbmVQcm9wZXJ0eShhcHAuY29uZmlnLCAnaXNDdXN0b21FbGVtZW50JywgeyB2YWx1ZTogdGVzdC5iaW5kKC9eW2Etel1bXi1dKj8tLykgfSkucGVyZm9ybWFuY2UgPSB0cnVlOyB9XG5cdFx0XHRcdFx0XHRhcHAubW91bnQoZG9jdW1lbnQuYm9keSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0bmV3ICggVnVlLmV4dGVuZChcblx0XHRcdFx0XHRcdFx0VG9PcHRpb25zKFxuXHRcdFx0XHRcdFx0XHRcdENvbXBvbmVudCxcblx0XHRcdFx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHRcdFx0VnVlLmRldnRvb2xzID8gKCBWdWUuY29uZmlnLmlnbm9yZWRFbGVtZW50cy5wdXNoKC9eW2Etel1bXi1dKj8tLyksIFZ1ZS5jb25maWcucGVyZm9ybWFuY2UgPSB0cnVlLCBjcmVhdGUoTlVMTCkgKSA6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpICkoKVxuXHRcdFx0XHRcdFx0LiRtb3VudCgoIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gJzxicj4nLCAnYnInICkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IHVuZGVmaW5lZCxcblx0XHR9LFxuXHRcdF90b09wdGlvbnM6IHtcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF90b09wdGlvbnMgKCAgICAgICAgICAgICAgICBWdWUzICAgICAgICAsIF9fZGV2X18gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHRpZiAoICFpc0NvbXBvbmVudENvbnN0cnVjdG9yKHRoaXMpICkgeyB0aHJvdyBUeXBlRXJyb3IoJyghQ29tcG9uZW50KS5fdG9PcHRpb25zKCknKTsgfVxuXHRcdFx0XHRyZXR1cm4gVG9PcHRpb25zKHRoaXMsIFZ1ZTMsIF9fZGV2X18pO1xuXHRcdFx0fSxcblx0XHR9LFxuXHR9XG4pKTtcblxuZnVuY3Rpb24gVG9PcHRpb25zICggICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBESURfT1BUSU9OUyA9IE9QVElPTlMub2JqZWN0cy5pbnRvKF9fZGV2X18gfHwgT1BUSU9OUyAgICAgICApLmludG8oVnVlMyB8fCBPUFRJT05TICAgICAgICk7XG5cdHZhciBUTVBfT1BUSU9OUyA9IG5ldyBPUFRJT05TLm9iamVjdHNUbXA7XG5cdHZhciBvcHRpb25zID0gT3B0aW9ucyhcblx0XHRjb25zdHJ1Y3Rvcixcblx0XHRWdWUzIHx8IHVuZGVmaW5lZCxcblx0XHRfX2Rldl9fID8gREVWLnJlZHVjZShmdW5jdGlvbiBEZXYgKGRldiwga2V5KSB7XG5cdFx0XHRkZXZba2V5XSA9IF9fZGV2X18gW2tleV0gfHwga2V5O1xuXHRcdFx0cmV0dXJuIGRldjtcblx0XHR9LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCxcblx0XHRESURfT1BUSU9OUyxcblx0XHRUTVBfT1BUSU9OU1xuXHQpO1xuXHRUTVBfT1BUSU9OUy5mb3JFYWNoIChmdW5jdGlvbiAob3B0aW9uc1ZhbHVlLCBjb25zdHJ1Y3RvcktleSkgeyBESURfT1BUSU9OUy5zZXQoY29uc3RydWN0b3JLZXksIG9wdGlvbnNWYWx1ZSk7IH0pO1xuXHRyZXR1cm4gb3B0aW9ucztcbn1cblxudmFyIF9taXhpbnMgICAgICAgICAgICAgICAgPSBTeW1ib2wgJiYgLyojX19QVVJFX18qL1N5bWJvbCgnX21peGlucycpICAgICAgICAgICAgICAgICA7XG5cbmZ1bmN0aW9uIF9fUFVSRV9fICggICAgICAgICAgICBTdWIgICAgICwgbWl4aW5zICAgICAgICkge1xuXHRTdWIucHJvdG90eXBlID0gbnVsbDtcblx0U3ViW19taXhpbnNdID0gbWl4aW5zO1xuXHRyZXR1cm4gc2V0UHJvdG90eXBlT2YoU3ViLCBDb21wb25lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW4gKCAgICAgICAgICApIHtcblx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcblx0XHQ/IC8qI19fUFVSRV9fKi9fX1BVUkVfXyhmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0OyB9LCAvKiNfX1BVUkVfXyovZnJvbShhcmd1bWVudHMpKVxuXHRcdDogQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBPcHRpb25zIChjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICwgRElEX09QVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBUTVBfT1BUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAge1xuXHRcblx0dmFyIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgPSBESURfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpIHx8IFRNUF9PUFRJT05TLmdldChjb25zdHJ1Y3Rvcik7XG5cdGlmICggb3B0aW9ucyApIHsgcmV0dXJuIG9wdGlvbnM7IH1cblx0T1BUSU9OUy5jb25zdHJ1Y3Rvci5zZXQob3B0aW9ucyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgLCBjb25zdHJ1Y3Rvcik7XG5cdFxuXHRpZiAoIGlzTWl4aW5zKGNvbnN0cnVjdG9yKSApIHtcblx0XHR2YXIgc3RhdGljX21peGlucyA9IGNvbnN0cnVjdG9yW19taXhpbnNdIDtcblx0XHR2YXIgbWl4aW5zID0gbmV3IE9QVElPTlMuU2V0ICAgICAgICAgICAgKCk7XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHR3aGlsZSAoIGluZGV4IT09c3RhdGljX21peGlucy5sZW5ndGggKSB7XG5cdFx0XHR2YXIgbWl4aW4gPSBzdGF0aWNfbWl4aW5zW2luZGV4KytdIDtcblx0XHRcdGlmICggaXNDb21wb25lbnRDb25zdHJ1Y3RvcihtaXhpbikgKSB7XG5cdFx0XHRcdHZhciBtaXhpbk9wdGlvbnMgPSBPcHRpb25zKG1peGluLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcdFx0XHRpZiAoIGlzTWl4aW5zKG1peGluKSApIHtcblx0XHRcdFx0XHR2YXIgbWl4aW5NaXhpbnMgPSBtaXhpbk9wdGlvbnMubWl4aW5zIDtcblx0XHRcdFx0XHR2YXIgbWl4aW5JbmRleCA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCBtaXhpbkluZGV4IT09bWl4aW5NaXhpbnMubGVuZ3RoICkgeyBtaXhpbnMuYWRkKG1peGluTWl4aW5zW21peGluSW5kZXgrK10gKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgeyBtaXhpbnMuYWRkKG1peGluT3B0aW9ucyk7IH1cblx0XHRcdH1cblx0XHRcdGVsc2UgeyBtaXhpbnMuYWRkKG1peGluICAgICAgICAgICAgICApOyB9XG5cdFx0fVxuXHRcdG9wdGlvbnMubWl4aW5zID0gZnJvbShtaXhpbnMpO1xuXHRcdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXyk7XG5cdFx0Y29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XHRUTVBfT1BUSU9OUy5zZXQoY29uc3RydWN0b3IsIG9wdGlvbnMpO1xuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG5cdFxuXHR2YXIgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuXHRcblx0dmFyIFN1cGVyID0gT1BUSU9OUy5zdXBlci5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoICFTdXBlciApIHtcblx0XHRPUFRJT05TLnN1cGVyLnNldChjb25zdHJ1Y3RvciwgU3VwZXIgPSBnZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvcikpO1xuXHRcdFN1cGVyPT09Q29tcG9uZW50IHx8IGlzTWl4aW5zKFN1cGVyKSB8fCAoIHNldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yLCBDb21wb25lbnQpLCBzZXRQcm90b3R5cGVPZihwcm90b3R5cGUsIG51bGwpICk7XG5cdH1cblx0aWYgKCBTdXBlciE9PUNvbXBvbmVudCApIHtcblx0XHR2YXIgU3VwZXJPcHRpb25zID0gT3B0aW9ucyhTdXBlciwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRpc01peGlucyhTdXBlcilcblx0XHRcdD8gU3VwZXJPcHRpb25zLm1peGlucyAubGVuZ3RoPT09MVxuXHRcdFx0PyBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnMubWl4aW5zIFswXVxuXHRcdFx0OiBvcHRpb25zLm1peGlucyA9IFN1cGVyT3B0aW9ucy5taXhpbnNcblx0XHRcdDogb3B0aW9ucy5leHRlbmRzID0gU3VwZXJPcHRpb25zO1xuXHR9XG5cdFxuXHRfX2Rldl9fICYmIGdldE93blByb3BlcnR5U3ltYm9scyhjb25zdHJ1Y3RvcikuZm9yRWFjaChmdW5jdGlvbiAoc3ltYm9sKSB7XG5cdFx0aWYgKCBzeW1ib2whPT1fbWl4aW5zICYmICEoIHN5bWJvbCBpbiBTWU1CT0xTICkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zeW1ib2wpOyB9XG5cdH0pO1xuXHRcblx0dmFyIHNldCAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZTZXQuYmluZChfX2Rldl9fKSA6IHByb1NldDtcblx0dmFyIGFzc2VydEZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2QXNzZXJ0RnVuY3Rpb24uYmluZChfX2Rldl9fKSA6IHByb0Fzc2VydEZ1bmN0aW9uO1xuXHRcblx0dmFyIHN0YXRpY05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhjb25zdHJ1Y3Rvcik7XG5cdGluZGV4ID0gc3RhdGljTmFtZXMubGVuZ3RoO1xuXHR2YXIgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG5cdHZhciBza2lwQ29uc3RydWN0b3IgPSBmYWxzZTtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgc3RhdGljTmFtZSA9IHN0YXRpY05hbWVzWy0taW5kZXhdIDtcblx0XHRpZiAoIHN0YXRpY05hbWU9PT0nUmVuZGVyJyApIHsgdmFyIFJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdICAgICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSduYW1lJyB8fCBzdGF0aWNOYW1lPT09J2xlbmd0aCcgKSB7XG5cdFx0XHRkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbnN0cnVjdG9yLCBzdGF0aWNOYW1lKTtcblx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmIHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBkZXNjcmlwdG9yLnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgYXBwbHkoZGVzY3JpcHRvci5nZXQgLCBjb25zdHJ1Y3RvciwgQVJHUykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSdkYXRhJyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSE9PXVuZGVmaW5lZCApIHsgdGhyb3cgRXJyb3IoaXNBcnJheShjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSkgPyBfX2Rldl9fLmNvbXBpbGVfbGF5ZXIgOiBfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdH1cblx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBzdGF0aWNOYW1lIT09J3Byb3RvdHlwZScgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggc3RhdGljTmFtZVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdzZXR1cCcgfHwgc3RhdGljTmFtZT09PSd3YXRjaCcgfHwgc3RhdGljTmFtZT09PSdtZXRob2RzJyB8fCBzdGF0aWNOYW1lPT09J2NvbXB1dGVkJyB8fCBzdGF0aWNOYW1lPT09J2V4dGVuZHMnIHx8IHN0YXRpY05hbWU9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nYmVmb3JlQ3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdjcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZU1vdW50JyB8fCBzdGF0aWNOYW1lPT09J21vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVXBkYXRlJyB8fCBzdGF0aWNOYW1lPT09J3VwZGF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2RlYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVubW91bnQnIHx8IHN0YXRpY05hbWU9PT0ndW5tb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZURlc3Ryb3knIHx8IHN0YXRpY05hbWU9PT0nZGVzdHJveWVkJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0naW5qZWN0JyB8fCBzdGF0aWNOYW1lPT09J3Byb3BzJyB8fCBwcm90b05hbWUxPT09J2VtaXRzJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheWVyKTsgfVxuXHRcdFx0fVxuXHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pO1xuXHRcdH1cblx0fVxuXHRcblx0dmFyIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0XG5cdHZhciBwcm90b05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpO1xuXHRpbmRleCA9IHByb3RvTmFtZXMubGVuZ3RoO1xuXHR2YXIgd2F0Y2hlcnMgICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2tpcERhdGEgPSBmYWxzZTtcblx0dmFyIGRhdGFOYW1lcyAgICAgICAgICAgICAgID0gbnVsbDtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgcHJvdG9OYW1lID0gcHJvdG9OYW1lc1stLWluZGV4XSA7XG5cdFx0aWYgKCBwcm90b05hbWU9PT0nX2RhdGEnICkge1xuXHRcdFx0dmFyIF9kYXRhID0gZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpO1xuXHRcdFx0aWYgKCBfZGF0YSApIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggIWlzQXJyYXkoX2RhdGEpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdFx0XHRfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgbGVuZ3RoID0gX2RhdGEubGVuZ3RoO1xuXHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRkYXRhTmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0XHRcdGRvIHsgZGF0YU5hbWVzW19kYXRhW2ldXSA9IG51bGw7IH1cblx0XHRcdFx0XHR3aGlsZSAoICsraSE9PWxlbmd0aCApO1xuXHRcdFx0XHRcdGRhdGFOYW1lcyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRhdGFOYW1lcyk7XG5cdFx0XHRcdFx0X19kZXZfXyAmJiBPUFRJT05TLmRhdGEuc2V0KG9wdGlvbnMsIGRhdGFOYW1lcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0c2tpcERhdGEgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggX2RhdGEhPT11bmRlZmluZWQgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nXycgJiYgISggcHJvdG9OYW1lLnN0YXJ0c1dpdGgoJ193YXRjaCgnKSApICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHR2YXIgcHJvdG9OYW1lMSA9IHByb3RvTmFtZS5zbGljZSgxKTtcblx0XHRcdFx0aWYgKCBwcm90b05hbWUxWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J3NldHVwJyB8fCBwcm90b05hbWUxPT09J3dhdGNoJyB8fCBwcm90b05hbWUxPT09J21ldGhvZHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcHV0ZWQnIHx8IHByb3RvTmFtZTE9PT0nZXh0ZW5kcycgfHwgcHJvdG9OYW1lMT09PSdtaXhpbnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdjb21wb25lbnRzJyB8fCBwcm90b05hbWUxPT09J2RpcmVjdGl2ZXMnIHx8IHByb3RvTmFtZTE9PT0nc3RhdGljUmVuZGVyRm5zJyB8fCBwcm90b05hbWUxPT09J3RlbXBsYXRlJyB8fCBwcm90b05hbWUxPT09J2luaGVyaXRBdHRycycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J25hbWUnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdSZW5kZXInIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdkZWxpbWl0ZXJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZmlsdGVycycgfHwgcHJvdG9OYW1lMT09PSdjb21tZW50cycgfHwgcHJvdG9OYW1lMT09PSdmdW5jdGlvbmFsJyB8fCBwcm90b05hbWUxPT09J3Byb3BzRGF0YScgfHwgcHJvdG9OYW1lMT09PSdtb2RlbCdcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9sYXllcik7IH1cblx0XHRcdH1cblx0XHRcdHNldChvcHRpb25zLCBwcm90b05hbWUuc2xpY2UoMSksIGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvTmFtZSk7XG5cdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSdfJyApIHtcblx0XHRcdFx0dmFyIGluZGV4T2ZRID0gcHJvdG9OYW1lLmxhc3RJbmRleE9mKCcpJyk7XG5cdFx0XHRcdHZhciB3YXRjaGVyID0gd2F0Y2hlcnNbd2F0Y2hlcnMubGVuZ3RoXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gcHJvdG9OYW1lLnNsaWNlKDcsIGluZGV4T2ZRKS50cmltKCk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5nZXQpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3Iuc2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGluZGV4T2ZRICsgMSE9PXByb3RvTmFtZS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aW5kZXhPZlEgKz0gMjtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkEgPSBwcm90b05hbWUuaW5kZXhPZignOycsIGluZGV4T2ZRKTtcblx0XHRcdFx0XHRcdHZhciBwYWlyID0gaW5kZXhPZkE8MFxuXHRcdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSlcblx0XHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEsIGluZGV4T2ZBKTtcblx0XHRcdFx0XHRcdGluZGV4T2ZRID0gaW5kZXhPZkEgKyAxO1xuXHRcdFx0XHRcdFx0aWYgKCBwYWlyICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkUgPSBwYWlyLmluZGV4T2YoJz0nKTtcblx0XHRcdFx0XHRcdFx0aW5kZXhPZkU8MFxuXHRcdFx0XHRcdFx0XHRcdD8gd2F0Y2hlcltwYWlyXSA9IHRydWVcblx0XHRcdFx0XHRcdFx0XHQ6IHdhdGNoZXJbcGFpci5zbGljZSgwLCBpbmRleE9mRSldID0gcGFpci5zbGljZShpbmRleE9mRSArIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoIGluZGV4T2ZRICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nJCcgKSB7XG5cdFx0XHRcdCggcHJvdG9EZXNjcmlwdG9ycyB8fCAoIHByb3RvRGVzY3JpcHRvcnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZSE9PSdjb25zdHJ1Y3RvcicgfHwgZGVzY3JpcHRvci52YWx1ZSE9PWNvbnN0cnVjdG9yICkge1xuXHRcdFx0XHRcdFx0KCBvcHRpb25zLm1ldGhvZHMgfHwgKCBvcHRpb25zLm1ldGhvZHMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQoIG9wdGlvbnMuY29tcHV0ZWQgfHwgKCBvcHRpb25zLmNvbXB1dGVkID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gZGVzY3JpcHRvci5zZXQgPyB7XG5cdFx0XHRcdFx0XHRnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuXHRcdFx0XHRcdFx0c2V0OiBkZXNjcmlwdG9yLnNldFxuXHRcdFx0XHRcdH0gOiBkZXNjcmlwdG9yLmdldCAgICAgICA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHZhciBwcm90b1N5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvdG90eXBlKSAgICAgICAgICAgICAgICAgICA7XG5cdGlmICggKCBpbmRleCA9IHByb3RvU3ltYm9scy5sZW5ndGggKSApIHtcblx0XHRpZiAoICFwcm90b0Rlc2NyaXB0b3JzICkgeyBwcm90b0Rlc2NyaXB0b3JzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHRkbyB7XG5cdFx0XHR2YXIgcHJvdG9TeW1ib2wgICAgICAgICAgICAgICAgPSBwcm90b1N5bWJvbHNbLS1pbmRleF0gO1xuXHRcdFx0cHJvdG9EZXNjcmlwdG9ycyBbcHJvdG9TeW1ib2xdID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvdG9TeW1ib2wpKTtcblx0XHR9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHR9XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgT1BUSU9OUy5wcm90by5zZXQob3B0aW9ucywgcHJvdG9EZXNjcmlwdG9ycyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIHByb3RvRGVzY3JpcHRvcnMpKTtcblx0XG5cdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXyk7XG5cdFxuXHR2YXIgcmVzdE5hbWVzID0gY29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XG5cdGlmICggUmVuZGVyICYmIFZ1ZTMgKSB7XG5cdFx0dmFyIHNoYWRvdyA9IFJlbmRlci5zaGFkb3c7XG5cdFx0aWYgKCBzaGFkb3cgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICYmIHNraXBEYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0XHR2YXIgc2hhZG93TmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdHZhciBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gU2hhZG93Q2hlY2tlcihzaGFkb3csIHJlc3ROYW1lcywgZGF0YU5hbWVzLCBzaGFkb3dOYW1lcywgX19kZXZfXyk7XG5cdFx0XHRcdE9QVElPTlMuc2hhZG93LnNldChvcHRpb25zLCBzaGFkb3dOYW1lcyk7XG5cdFx0XHR9XG5cdFx0XHRzaGFkb3dBc3NpZ25lciA9IFNoYWRvd0Fzc2lnbmVyKHNoYWRvdyk7XG5cdFx0fVxuXHRcdHZhciBzaGVldCA9IFJlbmRlci5zaGVldDtcblx0XHRpZiAoIHNoZWV0ICkge1xuXHRcdFx0dmFyIHdhdGNoZXJzMiAgICAgICAgICAgID0gW107XG5cdFx0XHRPd25LZXlzKHNoZWV0KS5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgICAgIGtleSwgaW5kZXgpIHtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB0aGlzW2luZGV4XSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHR3YXRjaGVyLiQgPSBhc3NlcnRGdW5jdGlvbihzaGVldCBba2V5XSk7XG5cdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGZ1bmN0aW9uICggICAgICAgICAgICBjc3MgICAgICAgICkgeyAoIHRoaXMuJHJlZnNba2V5XSAgICAgICAgICAgICAgICAgICAgICkudGV4dENvbnRlbnQgPSBjc3M7IH07XG5cdFx0XHRcdHdhdGNoZXIuaW1tZWRpYXRlID0gdHJ1ZTtcblx0XHRcdFx0d2F0Y2hlci5mbHVzaCA9ICdzeW5jJztcblx0XHRcdH0sIHdhdGNoZXJzMik7XG5cdFx0XHR3YXRjaGVyczIucmV2ZXJzZSgpO1xuXHRcdFx0dmFyIGJlZm9yZU1vdW50ID0gb3B0aW9ucy5iZWZvcmVNb3VudDtcblx0XHRcdG9wdGlvbnMuYmVmb3JlTW91bnQgPSBiZWZvcmVNb3VudFxuXHRcdFx0XHQ/IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0XHRyZXR1cm4gYXBwbHkoYmVmb3JlTW91bnQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0fTtcblx0XHR9XG5cdFx0b3B0aW9ucy5yZW5kZXIgPSBhc3NlcnRGdW5jdGlvbihuZXcgUmVuZGVyKFZ1ZTMgKSk7XG5cdH1cblx0XG5cdGlmICggX19kZXZfXyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIGRldkRhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgc2tpcERhdGEsIGRhdGFOYW1lcywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lciwgc2hhZG93Q2hlY2tlciwgc2tpcENvbnN0cnVjdG9yLCBfX2Rldl9fKTsgfTsgfVxuXHRlbHNlIGlmICggc2tpcENvbnN0cnVjdG9yIHx8IHNraXBEYXRhICkge31cblx0ZWxzZSBpZiAoIGRhdGFOYW1lcyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb05hbWVzKHNlbGYgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMsIGRhdGFOYW1lcyAsIHNoYWRvd0Fzc2lnbmVyKTsgfTsgfVxuXHRlbHNlIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb0RhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lcik7IH07IH1cblx0XG5cdGlmICggd2F0Y2hlcnMubGVuZ3RoIHx8ICFfX2Rldl9fICYmICggc2tpcENvbnN0cnVjdG9yICYmIHByb3RvRGVzY3JpcHRvcnMgfHwgc2tpcERhdGEgKSApIHtcblx0XHR3YXRjaGVycy5sZW5ndGggJiYgd2F0Y2hlcnMucmV2ZXJzZSgpO1xuXHRcdHZhciBjcmVhdGVkID0gb3B0aW9ucy5jcmVhdGVkO1xuXHRcdHN3aXRjaCAoICggX19kZXZfXyA/ICggc2tpcENvbnN0cnVjdG9yID8gJ3MnIDogJ24nICkgOiAnXycgKSArICggd2F0Y2hlcnMubGVuZ3RoID8gJ3cnIDogJ18nICkgKyAoIGNyZWF0ZWQgPyAnYycgOiAnXycgKSApIHtcblx0XHRcdGNhc2UgJ3N3Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Qcm90byh0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ253Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbndfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ193Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRcblx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XG5cdC8vQHRzLWlnbm9yZVxuXHRpZiAoIG9wdGlvbnMuY29tcG9uZW50cyB8fCBvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5kaXNwbGF5TmFtZSApIHtcblx0XHR2YXIgY29tcG9uZW50cyA9IG9wdGlvbnMuY29tcG9uZW50cyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIG9wdGlvbnMuY29tcG9uZW50cyk7XG5cdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0Zm9yICggcGFzY2FsIGluIGNvbXBvbmVudHMgKSB7XG5cdFx0XHRcdGlmICggIXBhc2NhbCB8fCBTVEFSVFNfV0lUSF9MT1dFUkNBU0UudGVzdChwYXNjYWwpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0XHRcdH1cblx0XHRcdGlmICggVnVlMyAmJiAhb3B0aW9ucy5yZW5kZXIgJiYgb3B0aW9ucy50ZW1wbGF0ZSApIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdG9wdGlvbnMubmFtZSAmJiBJTkNMVURFU19VUFBFUkNBU0UudGVzdChvcHRpb25zLm5hbWUuc2xpY2UoMSkpXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfY2FzZSk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdG9wdGlvbnMuZGlzcGxheU5hbWUgJiYgSU5DTFVERVNfVVBQRVJDQVNFLnRlc3Qob3B0aW9ucy5kaXNwbGF5TmFtZS5zbGljZSgxKSlcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9jYXNlKTsgfVxuXHRcdFx0XHRmb3IgKCBwYXNjYWwgaW4gY29tcG9uZW50cyApIHtcblx0XHRcdFx0XHRpZiAoIElOQ0xVREVTX1VQUEVSQ0FTRS50ZXN0KHBhc2NhbC5zbGljZSgxKSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9jYXNlKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAoIHZhciBwYXNjYWwgaW4gY29tcG9uZW50cyApIHtcblx0XHRcdHZhciB2YWx1ZSA9IGNvbXBvbmVudHNbcGFzY2FsXSA7XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IodmFsdWUpICkgeyBjb21wb25lbnRzW3Bhc2NhbF0gPSBPcHRpb25zKHZhbHVlLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpOyB9XG5cdFx0fVxuXHRcdGlmICggIVZ1ZTMgKSB7XG5cdFx0XHR2YXIgY2FzZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdG9wdGlvbnMubmFtZSAmJiBmaXhQYXNjYWwob3B0aW9ucy5uYW1lLCBjYXNlcyk7XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdG9wdGlvbnMuZGlzcGxheU5hbWUgJiYgZml4UGFzY2FsKG9wdGlvbnMuZGlzcGxheU5hbWUsIGNhc2VzKTtcblx0XHRcdGZvciAoIHBhc2NhbCBpbiBjb21wb25lbnRzICkgeyBmaXhQYXNjYWwocGFzY2FsLCBjYXNlcyk7IH1cblx0XHRcdGFzc2lnbihjb21wb25lbnRzLCBjYXNlcywgY29tcG9uZW50cyk7XG5cdFx0fVxuXHR9XG5cdFxuXHRyZXR1cm4gb3B0aW9ucztcblx0XG59XG5cbnZhciBPUFRJT05TID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO1xcXG5jbGFzcyBFYXN5TWFwIGV4dGVuZHMgV2Vha01hcHtpbnRvKGtleSl7bGV0IHN1Yj10aGlzLmdldChrZXkpO3N1Yj8/dGhpcy5zZXQoa2V5LHN1Yj1uZXcgRWFzeU1hcCk7cmV0dXJuIHN1Yn19RWFzeU1hcC5wcm90b3R5cGUuZ2V0PVdlYWtNYXAucHJvdG90eXBlLmdldDtFYXN5TWFwLnByb3RvdHlwZS5zZXQ9V2Vha01hcC5wcm90b3R5cGUuc2V0O1xcXG5jbGFzcyBTdHJvbmdNYXAgZXh0ZW5kcyBNYXB7fVN0cm9uZ01hcC5wcm90b3R5cGUuZ2V0PU1hcC5wcm90b3R5cGUuZ2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuc2V0PU1hcC5wcm90b3R5cGUuc2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuZm9yRWFjaD1NYXAucHJvdG90eXBlLmZvckVhY2g7XFxcbmNsYXNzIFN0cm9uZ1NldCBleHRlbmRzIFNldHt9U3Ryb25nU2V0LnByb3RvdHlwZS5hZGQ9U2V0LnByb3RvdHlwZS5hZGQ7U3Ryb25nU2V0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdPVNldC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXTtcXFxucmV0dXJue29iamVjdHM6bmV3IEVhc3lNYXAsb2JqZWN0c1RtcDpTdHJvbmdNYXAsc3VwZXI6bmV3IEVhc3lNYXAscmVzdDpuZXcgRWFzeU1hcCxkYXRhOm5ldyBFYXN5TWFwLHByb3RvOm5ldyBFYXN5TWFwLGNvbnN0cnVjdG9yOm5ldyBFYXN5TWFwLHNoYWRvdzpuZXcgRWFzeU1hcCxTZXQ6U3Ryb25nU2V0fVxcXG4nKSgpO1xuXHR9XG5cdGNhdGNoIChlcnJvcikge31cbn0oKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG4gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxudmFyIGlzQ29tcG9uZW50Q29uc3RydWN0b3IgPSAvKiNfX1BVUkVfXyovaXNQcm90b3R5cGVPZi5iaW5kKENvbXBvbmVudCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG52YXIgQVJHUyA9IFtdICAgICAgICAgO1xuXG52YXIgX01JWElOUyA9IFsgX21peGlucyBdICAgICAgICAgO1xuZnVuY3Rpb24gaXNNaXhpbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoaGFzT3duUHJvcGVydHksIGNvbnN0cnVjdG9yLCBfTUlYSU5TKTsgfVxuXG52YXIgU1lNQk9MUyA9IC8qI19fUFVSRV9fKi9nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkucmVkdWNlKGZ1bmN0aW9uIChTWU1CT0xTLCBuYW1lKSB7XG5cdGlmICggdHlwZW9mIFN5bWJvbFtuYW1lXT09PSdzeW1ib2wnICkgeyBTWU1CT0xTW1N5bWJvbFtuYW1lXSAgICAgICAgICAgICAgICAgXSA9IG51bGw7IH1cblx0cmV0dXJuIFNZTUJPTFM7XG59LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuZnVuY3Rpb24gJHdhdGNoICh0aGF0ICAgICAgLCB3YXRjaGVycyAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBpbmRleCA9IHdhdGNoZXJzLmxlbmd0aDtcblx0ZG8ge1xuXHRcdHZhciB3YXRjaGVyICAgICAgPSB3YXRjaGVyc1stLWluZGV4XTtcblx0XHR0aGF0LiR3YXRjaCh3YXRjaGVyLiQsIHdhdGNoZXIuaGFuZGxlciwgd2F0Y2hlcik7XG5cdH1cblx0d2hpbGUgKCBpbmRleCApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG4gIFxuZnVuY3Rpb24gY29sbGVjdE5hbWVzIChvcHRpb25zICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgKSAgICAgICAge1xuXHR2YXIgcmVzdE5hbWVzICAgICAgICAgICAgICAgICAgICA9IE9QVElPTlMucmVzdC5nZXQob3B0aW9ucyk7XG5cdGlmICggIXJlc3ROYW1lcyApIHtcblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyByZXN0TmFtZXMgPSBPUFRJT05TLnJlc3QuZ2V0KGNvbnN0cnVjdG9yKTsgfVxuXHRcdGlmICggIXJlc3ROYW1lcyApIHtcblx0XHRcdHJlc3ROYW1lcyA9IGNyZWF0ZShOQU1FUyk7XG5cdFx0XHR2YXIgZXh0ZW5kID0gb3B0aW9ucy5leHRlbmRzO1xuXHRcdFx0ZXh0ZW5kICYmIGFzc2lnbihyZXN0TmFtZXMsIGNvbGxlY3ROYW1lcyhleHRlbmQsIG51bGwpKTtcblx0XHRcdHZhciBtaXhpbnMgPSBvcHRpb25zLm1peGlucztcblx0XHRcdGlmICggbWl4aW5zICkgeyBmb3IgKCB2YXIgaW5kZXggPSBtaXhpbnMubGVuZ3RoOyBpbmRleDsgKSB7IGFzc2lnbihyZXN0TmFtZXMsIGNvbGxlY3ROYW1lcyhtaXhpbnNbLS1pbmRleF0gLCBudWxsKSk7IH0gfVxuXHRcdFx0dmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcblx0XHRcdHZhciBuYW1lICAgICAgICA7XG5cdFx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkgeyBmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkgeyByZXN0TmFtZXNbcHJvcHNbLS1pbmRleF0gXSA9IG51bGw7IH0gfVxuXHRcdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdFx0cHJvcHMgPSBvcHRpb25zLmluamVjdDtcblx0XHRcdGlmICggaXNBcnJheShwcm9wcykgKSB7IGZvciAoIGluZGV4ID0gcHJvcHMubGVuZ3RoOyBpbmRleDsgKSB7IHJlc3ROYW1lc1twcm9wc1stLWluZGV4XSBdID0gbnVsbDsgfSB9XG5cdFx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBwcm9wcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMubWV0aG9kcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0XHRyZXN0TmFtZXMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCByZXN0TmFtZXMpO1xuXHRcdH1cblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyBPUFRJT05TLnJlc3Quc2V0KGNvbnN0cnVjdG9yLCByZXN0TmFtZXMpOyB9XG5cdFx0T1BUSU9OUy5yZXN0LnNldChvcHRpb25zLCByZXN0TmFtZXMpO1xuXHR9XG5cdHJldHVybiByZXN0TmFtZXM7XG59XG5cbmZ1bmN0aW9uIHByb1NldCAgICAob2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHsgb2JqZWN0W25hbWVdID0gdmFsdWU7IH1cbmZ1bmN0aW9uIGRldlNldCAgICAoICAgICAgICAgICAgICAgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHtcblx0aWYgKCBuYW1lIGluIG9iamVjdCApIHsgdGhyb3cgRXJyb3IodGhpcy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0b2JqZWN0W25hbWVdID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHByb0Fzc2VydEZ1bmN0aW9uICAgIChmbiAgICkgeyByZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IH1cbmZ1bmN0aW9uIGRldkFzc2VydEZ1bmN0aW9uICAgICggICAgICAgICAgICAgICBmbiAgICkge1xuXHRpZiAoIHR5cGVvZiBmbiE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcih0aGlzLmNvbXBpbGVfdHlwZSk7IH1cblx0cmV0dXJuIGZuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufVxuXG52YXIgSU5DTFVERVNfVVBQRVJDQVNFID0gL1tBLVpdLztcbnZhciBTVEFSVFNfV0lUSF9MT1dFUkNBU0UgPSAvXlthLXpdLztcbnZhciBDSEVDS0VEID0gV2Vha01hcCAmJiAvKiNfX1BVUkVfXyovbmV3IFdlYWtNYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuZnVuY3Rpb24gZm9yS2V5cyAob3B0aW9uICAgICAgICAgICAgICAgICwgY2FsbGJhY2sgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0aWYgKCBpc0FycmF5KG9wdGlvbikgKSB7IG9wdGlvbi5mb3JFYWNoKGNhbGxiYWNrKTsgfVxuXHRlbHNlIHsgZm9yICggdmFyIGtleSBpbiBvcHRpb24gKSB7IGNhbGxiYWNrKGtleSk7IH0gfVxufVxuZnVuY3Rpb24gY2hlY2sgKG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XG5cdHZhciBiZWxvbmcgPSBPUFRJT05TLmNvbnN0cnVjdG9yLmdldChvcHRpb25zKSB8fCBvcHRpb25zO1xuXHR2YXIgb3duS2V5cyA9IENIRUNLRUQuZ2V0KGJlbG9uZyk7XG5cdGlmICggb3duS2V5cyApIHsgcmV0dXJuIG93bktleXM7IH1cblx0dmFyIGFsbEtleXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdCggb3B0aW9ucy5leHRlbmRzID8gWyBvcHRpb25zLmV4dGVuZHMgXSA6IFtdICkuY29uY2F0KG9wdGlvbnMubWl4aW5zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChtaXhpbikge1xuXHRcdHZhciBtaXhpbk5hbWVzID0gY2hlY2sobWl4aW4sIF9fZGV2X18pO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIG1peGluTmFtZXMgKSB7XG5cdFx0XHRpZiAoIG5hbWUgaW4gYWxsS2V5cyAmJiBtaXhpbk5hbWVzW25hbWVdIT09YWxsS2V5c1tuYW1lXSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX292ZXJ3cml0ZSk7IH1cblx0XHR9XG5cdFx0YXNzaWduKGFsbEtleXMsIG1peGluTmFtZXMpO1xuXHR9KTtcblx0XG5cdG93bktleXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdHZhciBwcm90b0Rlc2NyaXB0b3JzID0gT1BUSU9OUy5wcm90by5nZXQob3B0aW9ucyk7XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgT3duS2V5cyhwcm90b0Rlc2NyaXB0b3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRvd25LZXlzIFtrZXldID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5wcm9wcywgZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdGlmICggLy18Xig/OmtleSR8b258cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9wcm9wcyk7IH1cblx0XHRpZiAoIG5hbWUgaW4gUFJPVE9fQlVHICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5pbmplY3QsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZSBpbiBvd25LZXlzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzIFtuYW1lXSA9IGJlbG9uZztcblx0fSk7XG5cdFxuXHR2YXIgbmFtZSAgICAgICAgO1xuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMuY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuZGF0YS5nZXQob3B0aW9ucykgKSB7XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuc2hhZG93LmdldChvcHRpb25zKSApIHtcblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5cyBbbmFtZV0gPSBiZWxvbmc7XG5cdH1cblx0XG5cdGlmICggJ2NvbnN0cnVjdG9yJyBpbiBvd25LZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcblx0T3duS2V5cyhvd25LZXlzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoIGtleSBpbiBhbGxLZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfb3ZlcndyaXRlKTsgfVxuXHR9KTtcblx0YXNzaWduKGFsbEtleXMsIG93bktleXMpO1xuXHRcblx0WyBvcHRpb25zLm5hbWUsIG9wdGlvbnMuZGlzcGxheU5hbWUgXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICAgKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZT09PSdzdHJpbmcnXG5cdFx0XHQ/ICFuYW1lIHx8IFNUQVJUU19XSVRIX0xPV0VSQ0FTRS50ZXN0KG5hbWUpIHx8IG9wdGlvbnMuY29tcG9uZW50cyAmJiBuYW1lIGluIG9wdGlvbnMuY29tcG9uZW50cyAmJiBvcHRpb25zLmNvbXBvbmVudHNbbmFtZV0hPT1vcHRpb25zXG5cdFx0XHQ6IG5hbWUhPT11bmRlZmluZWRcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdH0pO1xuXHRcblx0b3B0aW9ucy5lbWl0cyAmJlxuXHQoIGlzQXJyYXkob3B0aW9ucy5lbWl0cykgPyBvcHRpb25zLmVtaXRzIDogS2V5cyhvcHRpb25zLmVtaXRzKSApLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0aWYgKCB0eXBlb2YgZXZlbnQhPT0nc3RyaW5nJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0aWYgKCAvKD86Y2FwdHVyZXxvbmNlfHBhc3NpdmUpJC9pLnRlc3QoJ29uJyArIGV2ZW50KSB8fCAvXi0/W3ZWXW5vZGUvLnRlc3QoZXZlbnQpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfZW1pdHMpOyB9XG5cdH0pO1xuXHRcblx0aWYgKFxuXHRcdG9wdGlvbnMuZGlyZWN0aXZlcyAmJiAnaXMnIGluIG9wdGlvbnMuZGlyZWN0aXZlcy8vIDJcblx0XHR8fC8vQHRzLWlnbm9yZVxuXHRcdG9wdGlvbnMucHJvcHMgJiYgKCBpc0FycmF5KG9wdGlvbnMucHJvcHMpID8gb3B0aW9ucy5wcm9wcy5pbmNsdWRlcygnaXMnKSA6ICdpcycgaW4gb3B0aW9ucy5wcm9wcyApLy8gM1xuXHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2lzKTsgfVxuXHRcblx0Q0hFQ0tFRC5zZXQoYmVsb25nLCBhbGxLZXlzKTtcblx0cmV0dXJuIGFsbEtleXM7XG5cdFxufVxuXG52YXIgVVBQRVIgPSAvW0EtWl0vO1xuZnVuY3Rpb24gZml4UGFzY2FsIChwYXNjYWwgICAgICAgICwgY2FzZXMgICAgICAgKSB7XG5cdHZhciBGaXJzdCA9IHBhc2NhbFswXSA7XG5cdHZhciBmaXJzdCA9IEZpcnN0LnRvTG93ZXJDYXNlKCk7XG5cdHZhciByZXN0ID0gcGFzY2FsLnNsaWNlKDEpO1xuXHRjYXNlc1tmaXJzdCArIHJlc3RdID0gbnVsbDtcblx0aHlwaGVuYXRlKGZpcnN0LCByZXN0LCBjYXNlcyk7XG5cdGZpcnN0PT09Rmlyc3QgfHwgaHlwaGVuYXRlKEZpcnN0LCByZXN0LCBjYXNlcyk7XG59XG5mdW5jdGlvbiBoeXBoZW5hdGUgKGJlZm9yZSAgICAgICAgLCBhZnRlciAgICAgICAgLCBjYXNlcyAgICAgICApIHtcblx0dmFyIGluZGV4ID0gYWZ0ZXIuc2VhcmNoKFVQUEVSKTtcblx0aWYgKCBpbmRleDwwICkgeyBjYXNlc1tiZWZvcmUgKyBhZnRlcl0gPSBudWxsOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggaW5kZXggKSB7IGJlZm9yZSArPSBhZnRlci5zbGljZSgwLCBpbmRleCk7IH1cblx0XHR2YXIgY2hhciA9IGFmdGVyW2luZGV4XSA7XG5cdFx0YWZ0ZXIgPSBhZnRlci5zbGljZShpbmRleCArIDEpO1xuXHRcdGh5cGhlbmF0ZShiZWZvcmUgKyAnLScgKyBjaGFyLnRvTG93ZXJDYXNlKCksIGFmdGVyLCBjYXNlcyk7XG5cdFx0aHlwaGVuYXRlKGJlZm9yZSArICctJyArIGNoYXIsIGFmdGVyLCBjYXNlcyk7XG5cdFx0YmVmb3JlW2JlZm9yZS5sZW5ndGggLSAxXT09PSctJyB8fCBoeXBoZW5hdGUoYmVmb3JlICsgY2hhciwgYWZ0ZXIsIGNhc2VzKTtcblx0fVxufVxuXG52YXIgREVWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gW1xuXHQncHJvdG8nLFxuXHQnY29tcGlsZV9jYXNlJyxcblx0J2NvbXBpbGVfbmFtZScsXG5cdCdjb21waWxlX3Byb3BzJyxcblx0J2NvbXBpbGVfZW1pdHMnLFxuXHQnY29tcGlsZV9pcycsXG5cdCdjb21waWxlX2xheWVyJyxcblx0J2NvbXBpbGVfcmVzZXJ2ZWQnLFxuXHQnY29tcGlsZV9yZWRlZmluZWQnLFxuXHQnY29tcGlsZV9vdmVyd3JpdGUnLFxuXHQnY29tcGlsZV90eXBlJyxcblx0J2NvbXBpbGVfc3ltYm9sJyxcblx0J2NvbXBpbGVfc2hhZG93Jyxcblx0J3J1bnRpbWVfc2hhZG93Jyxcblx0J3J1bnRpbWVfcmVkZWZpbmVkJyxcblx0J3J1bnRpbWVfc3ltYm9sJyxcblx0J3J1bnRpbWVfcmVzZXJ2ZWQnLFxuXHQncnVudGltZV9lbnVtZXJhYmxlJyxcblx0J3J1bnRpbWVfZGF0YScsXG5dO1xuXG4gICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICBcblx0ICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuXG4gICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgIFxuIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGFzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbj8nO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5mdW5jdGlvbiBjcmVhdGVkIChlbCAgICAgLCBiaW5kaW5nICAgICApIHsgYmluZGluZy5hcmc9PT11bmRlZmluZWQgPyBhc3NpZ24oZWwsIGJpbmRpbmcudmFsdWUpIDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBlbFtiaW5kaW5nLmFyZ10gPSBiaW5kaW5nLnZhbHVlICk7IH1cbmZ1bmN0aW9uIHVwZGF0ZWQgKGVsICAgICAsIGJpbmRpbmcgICAgICkgeyBiaW5kaW5nLmFyZz09PXVuZGVmaW5lZCA/IGFzc2lnbihlbCwgYmluZGluZy52YWx1ZSkgOiBiaW5kaW5nLm9sZFZhbHVlPT09YmluZGluZy52YWx1ZSB8fCAoIGVsW2JpbmRpbmcuYXJnXSA9IGJpbmRpbmcudmFsdWUgKTsgfVxuXG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShOVUxMLCB7XG5cdFxuXHRjcmVhdGVkOiB7IHZhbHVlOiBjcmVhdGVkLCBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGJpbmQ6IHsgdmFsdWU6IGNyZWF0ZWQsIGVudW1lcmFibGU6IHRydWUgfSxcblx0XG5cdHVwZGF0ZWQ6IHsgdmFsdWU6IHVwZGF0ZWQsIGVudW1lcmFibGU6IHRydWUgfSxcblx0Y29tcG9uZW50VXBkYXRlZDogeyB2YWx1ZTogdXBkYXRlZCwgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRcbn0pKTtcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCBSZW5kZXIsIHsgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU3R5bGUsIHsgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcbmltcG9ydCBDb21wb25lbnQsIHsgbWl4aW4gfSBmcm9tICcuL0NvbXBvbmVudCwgbWl4aW4vJztcbmltcG9ydCBwcm9wIGZyb20gJy4vdi1wcm9wJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0SWRlbnRpZmllcixcblx0U2NvcGUsXG5cdFRlbXBsYXRlLFxuXHRSZW5kZXIsIFN0YXRpY1JlbmRlckZucyxcblx0U3R5bGUsIHJlbW92ZSxcblx0Q29tcG9uZW50LCBtaXhpbixcblx0cHJvcCxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRJZGVudGlmaWVyOiBJZGVudGlmaWVyLFxuXHRTY29wZTogU2NvcGUsXG5cdFRlbXBsYXRlOiBUZW1wbGF0ZSxcblx0UmVuZGVyOiBSZW5kZXIsIFN0YXRpY1JlbmRlckZuczogU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZTogU3R5bGUsIHJlbW92ZTogcmVtb3ZlLFxuXHRDb21wb25lbnQ6IENvbXBvbmVudCwgbWl4aW46IG1peGluLFxuXHRwcm9wOiBwcm9wLFxufSk7XG4iXSwibmFtZXMiOlsidW5kZWZpbmVkIiwiY3JlYXRlIiwib3duS2V5cyIsImdldFByb3RvdHlwZU9mIiwiZ2V0IiwiRGVmYXVsdCIsInZlcnNpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWMsUUFBUTs7QUNJdEIsSUFBSSxNQUFNLEdBQUc7QUFDYixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0FBQ25HLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7QUFDdkQsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztBQUN2RCxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztBQUMvQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxH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