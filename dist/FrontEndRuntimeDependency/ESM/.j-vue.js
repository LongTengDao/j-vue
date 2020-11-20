/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：18.0.0
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
import apply from '.Reflect.apply?=';
import THROW from '.throw';
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
import getOwnPropertySymbols from '.Object.getOwnPropertySymbols?';
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

var version = '18.0.0';

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
			source += ( typeof value==='string' ? value : value.source || THROW(TypeError(typeof value)) ) + raw[index++].replace(SEARCH_ESCAPE, graveAccentReplacer);
		}
	}
	else {
		while ( index<length ) {
			var value = arguments[index];
			source += ( typeof value==='string' ? value : value.source || THROW(TypeError(typeof value)) ) + raw[index++];
		}
	}
	return RegExp(source.replace(NT, ''), this.flags);
}

function newRegExp (template_flags                               )                                                          {
	if ( typeof template_flags==='object' ) {
		return /*#__PURE__*/ apply(RE, { flags: '', unicode: false }, arguments                                                               );
	}
	var context          = { flags: template_flags, unicode: /*#__PURE__*/ template_flags.indexOf('u')>=0 };
	return function newRegExp (template                      )         {
		return /*#__PURE__*/ apply(RE, context, arguments                                                               );
	};
}

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

function Search (keys          ) { return new RegExp('__' + groupify(keys, false, true) + '__', 'g'); }
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

var SEARCH = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;

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
	scope[_] = function _ (string        ) { return string.replace(SEARCH, _replacer); };
	function _replacer (__key__        )         { return get(cache, __key__.slice(2, -2)); }
	return scope;
}

var KEYS = /[a-z][a-z0-9]*(?:_[a-z0-9]+)*/ig;

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
		__dev__ && check(options, __dev__);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIi4uLy4uL2xpYi9jc3Mta2V5d29yZHMvZGlzdC5qcyIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvdmVyc2lvbj90ZXh0IiwiLi4vLi4vLi4vai1yZWdleHAvc3JjL25ld1JlZ0V4cC50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9jbGVhclJlZ0V4cC50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9ncm91cGlmeS50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9leHBvcnQudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9EeW5hbWljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCJDb21wb25lbnQsIG1peGluL0RhdGEudHMiLCJDb21wb25lbnQsIG1peGluL1NoYWRvdy50cyIsIkNvbXBvbmVudCwgbWl4aW4vLnRzIiwidi1wcm9wLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0JzE4LjAuMCc7IiwiZXhwb3J0IGRlZmF1bHQgW1xuXHQnYWxsJyxcblx0J2xhbycsXG5cdCdhdXRvJyxcblx0J2Rpc2MnLFxuXHQnbm9uZScsXG5cdCdzcGFuJyxcblx0J3RoYWknLFxuXHQna2htZXInLFxuXHQnb3JpeWEnLFxuXHQndGFtaWwnLFxuXHQndW5zZXQnLFxuXHQnY2lyY2xlJyxcblx0J2hlYnJldycsXG5cdCdpbmxpbmUnLFxuXHQncmV2ZXJ0Jyxcblx0J3NxdWFyZScsXG5cdCd0ZWx1Z3UnLFxuXHQnYmVuZ2FsaScsXG5cdCdkZWNpbWFsJyxcblx0J2RlZmF1bHQnLFxuXHQnaW5oZXJpdCcsXG5cdCdpbml0aWFsJyxcblx0J2thbm5hZGEnLFxuXHQnbXlhbm1hcicsXG5cdCdvdXRzaWRlJyxcblx0J3BlcnNpYW4nLFxuXHQndGliZXRhbicsXG5cdCdhcm1lbmlhbicsXG5cdCdjb250ZW50cycsXG5cdCdnZW9yZ2lhbicsXG5cdCdndWphcmF0aScsXG5cdCdndXJtdWtoaScsXG5cdCdoaXJhZ2FuYScsXG5cdCdrYXRha2FuYScsXG5cdCdjYW1ib2RpYW4nLFxuXHQnbWFsYXlhbGFtJyxcblx0J21vbmdvbGlhbicsXG5cdCdkZXZhbmFnYXJpJyxcblx0J25vdHJhbnNsYXRlJyxcbl07IiwiaW1wb3J0IENTU19LRVlXT1JEUyBmcm9tICdsaWI6Y3NzLWtleXdvcmRzJztcblxudmFyIGluY3JlYXNlRGljdGlvbmFyeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBsYXRlc3RJZGVudGlmaWVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbICc5JyBdO1xudmFyIGxhc3RDaGFyYWN0ZXIgICAgICAgICAgICAgICAgICAgICAgICA9ICc5JztcbnZhciBsYXN0SW5kZXggICAgICAgICA9IDA7XG5cbnZhciBjc3Nfa2V5d29yZCAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGxhdGVzdElkZW50aWZpZXIuam9pbiA9IGxhdGVzdElkZW50aWZpZXIuam9pbjtcblx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0ID0gbGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0O1xuXHRDU1NfS0VZV09SRFMuc2hpZnQgPSBDU1NfS0VZV09SRFMuc2hpZnQ7XG5cdHJldHVybiBDU1NfS0VZV09SRFMuc2hpZnQoKSA7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIElkZW50aWZpZXIgKCkgICAgICAgICB7XG5cdFxuXHRpZiAoIGxhc3RDaGFyYWN0ZXI9PT0neicgKSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggICAgICAgICA9IGxhc3RJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICAgICAgICAgICAgICAgICA9IGxhdGVzdElkZW50aWZpZXJbLS1jaGFyYWN0ZXJJbmRleF07XG5cdFx0XHRcdGlmICggY2hhcmFjdGVyPT09J3onICkgeyBsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtjaGFyYWN0ZXJdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0KCdhJyk7XG5cdFx0XHRcdCsrbGFzdEluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0dmFyIGlkZW50aWZpZXIgICAgICAgICA9IGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdGlmICggaWRlbnRpZmllcj09PWNzc19rZXl3b3JkICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3RlciAgICAgICAgICAgICBdO1xuXHRcdGlkZW50aWZpZXIgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRcdGNzc19rZXl3b3JkID0gQ1NTX0tFWVdPUkRTLnNoaWZ0KCkgfHwgbnVsbDtcblx0fVxuXHRyZXR1cm4gaWRlbnRpZmllcjtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJleHBvcnQgZGVmYXVsdCAnOC4wLjAnOyIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pz0nO1xuaW1wb3J0IFRIUk9XIGZyb20gJy50aHJvdyc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XS9nO1xudmFyIFNFQVJDSF9FU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIHJhdyA9IHRlbXBsYXRlLnJhdztcblx0dmFyIHNvdXJjZSA9IHJhd1swXTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHZhciBpbmRleCA9IDE7XG5cdGlmICggdGhpcy51bmljb2RlICkge1xuXHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdFx0dmFyIHZhbHVlID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRcdHNvdXJjZSArPSAoIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnID8gdmFsdWUgOiB2YWx1ZS5zb3VyY2UgfHwgVEhST1coVHlwZUVycm9yKHR5cGVvZiB2YWx1ZSkpICkgKyByYXdbaW5kZXgrK10ucmVwbGFjZShTRUFSQ0hfRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKTtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBhcmd1bWVudHNbaW5kZXhdO1xuXHRcdFx0c291cmNlICs9ICggdHlwZW9mIHZhbHVlPT09J3N0cmluZycgPyB2YWx1ZSA6IHZhbHVlLnNvdXJjZSB8fCBUSFJPVyhUeXBlRXJyb3IodHlwZW9mIHZhbHVlKSkgKSArIHJhd1tpbmRleCsrXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIFJlZ0V4cChzb3VyY2UucmVwbGFjZShOVCwgJycpLCB0aGlzLmZsYWdzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmV3UmVnRXhwICh0ZW1wbGF0ZV9mbGFncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0aWYgKCB0eXBlb2YgdGVtcGxhdGVfZmxhZ3M9PT0nb2JqZWN0JyApIHtcblx0XHRyZXR1cm4gLyojX19QVVJFX18qLyBhcHBseShSRSwgeyBmbGFnczogJycsIHVuaWNvZGU6IGZhbHNlIH0sIGFyZ3VtZW50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdH1cblx0dmFyIGNvbnRleHQgICAgICAgICAgPSB7IGZsYWdzOiB0ZW1wbGF0ZV9mbGFncywgdW5pY29kZTogLyojX19QVVJFX18qLyB0ZW1wbGF0ZV9mbGFncy5pbmRleE9mKCd1Jyk+PTAgfTtcblx0cmV0dXJuIGZ1bmN0aW9uIG5ld1JlZ0V4cCAodGVtcGxhdGUgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHRyZXR1cm4gLyojX19QVVJFX18qLyBhcHBseShSRSwgY29udGV4dCwgYXJndW1lbnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0fTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJytjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgbmV3UmVnRXhwIGZyb20gJy4vbmV3UmVnRXhwJztcbmltcG9ydCBjbGVhclJlZ0V4cCBmcm9tICcuL2NsZWFyUmVnRXhwJztcbmltcG9ydCBncm91cGlmeSBmcm9tICcuL2dyb3VwaWZ5JztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0bmV3UmVnRXhwLFxuXHRjbGVhclJlZ0V4cCxcblx0Z3JvdXBpZnksXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRuZXdSZWdFeHA6IG5ld1JlZ0V4cCxcblx0Y2xlYXJSZWdFeHA6IGNsZWFyUmVnRXhwLFxuXHRncm91cGlmeTogZ3JvdXBpZnlcbn0pO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sPyc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbnZhciBfICAgICAgPSBTeW1ib2wgPyAvKiNfX1BVUkVfXyovU3ltYm9sKCdfJykgICAgICAgIDogJ18nO1xuXG5mdW5jdGlvbiAkICAgICAgICAgICAgICAgICAgKCAgICAgICAgIGNzcyAgICAgICAgICwgbWVkaWEgICAgICAgICApICAgIHtcblx0dmFyIHN0eWxlICAgICAgICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gdGhpc1tfXShjc3MpOyB9XG5cdGlmICggbWVkaWEhPT11bmRlZmluZWQgKSB7IHN0eWxlLm1lZGlhID0gbWVkaWE7IH1cblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgeyBfLCAkIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBwcmVwYXJlXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHR5cGVvZiBfPT09J3N5bWJvbCcgPyBudWxsIDogLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIF9kZXNjcmlwdG9yID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgIDtcblx0X2Rlc2NyaXB0b3IudmFsdWUgPSBudWxsO1xuXHRfZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cdF9kZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuXHRfZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuXHRyZXR1cm4gZnVuY3Rpb24gJCAoc2NvcGUgICAgICAgKSB7IGRlZmluZVByb3BlcnR5KHNjb3BlLCBfLCBfZGVzY3JpcHRvcik7IH07XG59KCk7XG5cbmZ1bmN0aW9uIFNlYXJjaCAoa2V5cyAgICAgICAgICApIHsgcmV0dXJuIG5ldyBSZWdFeHAoJ19fJyArIGdyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSArICdfXycsICdnJyk7IH1cbmZ1bmN0aW9uIFJlcGxhY2VyIChzY29wZSAgICAgICAgICAgICApIHsgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2VyIChfX2tleV9fICAgICAgICApICAgICAgICAgeyByZXR1cm4gc2NvcGVbX19rZXlfXy5zbGljZSgyLCAtMildOyB9OyB9XG5cbnZhciBTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICApICAgICAgIHtcblx0cHJlcGFyZV8gJiYgcHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG59ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG52YXIgU0NPUEUgICAgICAgICAgICAgID0gU3RhdGljU2NvcGUucHJvdG90eXBlID0gLyojX19QVVJFX18qL2ZyZWV6ZShjcmVhdGUobnVsbCwge1xuXHQkOiB7IHZhbHVlOiAkLCB3cml0YWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IGZhbHNlIH0sXG59KSAgICAgICAgICAgICAgICk7XG5cbnZhciBJbmhlcml0ZWRTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIEluaGVyaXRlZFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICAsIHByb3RvICAgICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICggKi9cblx0XHRrZXlzW2tleXMubGVuZ3RoXSA9IGtleS8qICkqLztcblx0fVxuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IHsgU3RhdGljU2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRTdGF0aWNTY29wZSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgU3RhdGljU2NvcGUgfSBmcm9tICcuL1N0YXRpY1Njb3BlJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgU0VBUkNIID0gL19fW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSpfXy9pZztcblxuZnVuY3Rpb24gZ2V0IChjYWNoZSAgICAgICAgICAgICAsIGtleSAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGNhY2hlW2tleV0gfHwgKCBjYWNoZVtrZXldID0gSWRlbnRpZmllcigpICk7IH1cblxuZnVuY3Rpb24gc2NvcGlmeSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgLCBjYWNoZSAgICAgICAgICAgICApICAgICAgICAge1xuXHR2YXIga2V5cyAgICAgICAgLFxuXHRcdGluZGV4ICAgICAgICAsXG5cdFx0dmFsdWVzICAgICAgICAgICxcblx0XHRrZXkgICAgICAgIDtcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBnZXQoY2FjaGUsIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWUuc3BsaXQoJyAnKTtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlcy5sZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlWy0taW5kZXhdO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBnZXQoY2FjaGUsIGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVstLWluZGV4XSwgY2FjaGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtrZXldICkgeyBrZXlzICs9ICcgJytnZXQoY2FjaGUsIGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIER5bmFtaWNTY29wZSAoY2FjaGUgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlID0gZnVuY3Rpb24gc2NvcGUgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7XG5cdFx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0aWYgKCBsZW5ndGg+MSApIHtcblx0XHRcdHZhbHVlID0gWyB2YWx1ZSwgYXJndW1lbnRzWzFdIF07XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggPSAyOyBpbmRleCE9PWxlbmd0aDsgKytpbmRleCApIHsgKCB2YWx1ZSAgICAgICAgICApW2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleF07IH1cblx0XHR9XG5cdFx0cmV0dXJuIHNjb3BpZnkodmFsdWUsIGNhY2hlKTtcblx0fSAgICAgICAgICAgICAgICA7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoU0VBUkNILCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBnZXQoY2FjaGUsIF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IER5bmFtaWNTY29wZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG4iLCJleHBvcnQgZGVmYXVsdCAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBTdGF0aWNTY29wZSwgSW5oZXJpdGVkU3RhdGljU2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgRHluYW1pY1Njb3BlIGZyb20gJy4vRHluYW1pY1Njb3BlJztcbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5cbnZhciBFTVBUWSAgICAgICAgICAgPSBbXTtcblxuZnVuY3Rpb24gbWl4IChwcm90b3MgICAgICAgICApICAgICAgICAgICAgICB7XG5cdHZhciBzY29wZSAgICAgICAgICAgICAgPSBjcmVhdGUoU0NPUEUpO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBwcm90b3MubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgcHJvdG8gICAgICAgID0gcHJvdG9zW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiBwcm90bz09PSdmdW5jdGlvbicgKSB7IHByb3RvID0gcHJvdG8ucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZnVuY3Rpb24gU2NvcGUgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICApICAgICAgICB7XG5cdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBEeW5hbWljU2NvcGUobWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSAgICAgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG59XG5TY29wZS5wcm90b3R5cGUgPSBudWxsICAgICAgIDtcblxuZXhwb3J0IHsgU2NvcGUgYXMgZGVmYXVsdCwgS0VZUyB9OyIsImltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCAgICAgICAgLCBzY29wZSAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qL3Njb3BlW19dKGh0bWwpO1xufVxuXG5leHBvcnQgeyBUZW1wbGF0ZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG52YXIgTk9UX0VTNSA9IC9eKGNvbnN8bGUpdCAvO1xuXG5mdW5jdGlvbiBXaXRoU3RyaXBwZWQgKHJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZTtcblx0cmV0dXJuIHJlbmRlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyIChjb2RlICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRyZXR1cm4gY29kZVswXT09PScoJ1xuXHRcdD8gLyojX19QVVJFX18qL0Z1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm4gY2xhc3MgUmVuZGVyIGV4dGVuZHMgbnVsbHtjb25zdHJ1Y3RvcicrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfTsnKSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdDogLyojX19QVVJFX18qL1dpdGhTdHJpcHBlZChcblx0XHRcdC8qI19fUFVSRV9fKi9GdW5jdGlvbihOT1RfRVM1LnRlc3QoY29kZSlcblx0XHRcdFx0PyAnXCJ1c2Ugc3RyaWN0XCI7cmV0dXJue3JlbmRlcigpeycrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfX0ucmVuZGVyOydcblx0XHRcdFx0OiAnXCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uIHJlbmRlcigpeycrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfTsnXG5cdFx0XHQpKCkgICAgICAgICAgXG5cdFx0KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBTdGF0aWNSZW5kZXJGbnMgKGNvZGVzICAgICAgICAgICAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgIHtcblx0dmFyIGluZGV4ICAgICAgICAgPSBjb2Rlcy5sZW5ndGg7XG5cdHZhciBib2R5ICAgICAgICAgPSAnXSc7XG5cdGlmICggc2NvcGUgKSB7XG5cdFx0Zm9yICggdmFyIHNjb3BlXyA9IHNjb3BlW19dOyBpbmRleDsgKSB7IGJvZHkgPSAnZnVuY3Rpb24oKXsnK3Njb3BlXyhjb2Rlc1stLWluZGV4XSkrJ30sJytib2R5OyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleCApIHsgYm9keSA9ICdmdW5jdGlvbigpeycrY29kZXNbLS1pbmRleF0rJ30sJytib2R5OyB9XG5cdH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bJytib2R5KSgpO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3R5bGUgKGNzcyAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlW19dKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IEtleXMgZnJvbSAnLk9iamVjdC5rZXlzJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXM/JztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24/JztcbmltcG9ydCBnZXRQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LmdldFByb3RvdHlwZU9mJztcbmltcG9ydCBwcm9wZXJ0eUlzRW51bWVyYWJsZSBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSc7XG5pbXBvcnQgZXJyb3IgZnJvbSAnLmNvbnNvbGUuZXJyb3InO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmV4cG9ydCB2YXIgdGhhdCAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG5leHBvcnQgdmFyIE5BTUVTID0gYXNzaWduICYmIC8qI19fUFVSRV9fKi9hc3NpZ24oY3JlYXRlKG51bGwpLCB7XG5cdF86IG51bGwsXG5cdF9jOiBudWxsLFxuXHRfY29tcHV0ZWRXYXRjaGVyczogbnVsbCxcblx0X2RhdGE6IG51bGwsXG5cdF9kaXJlY3RJbmFjdGl2ZTogbnVsbCxcblx0X2V2ZW50czogbnVsbCxcblx0X2hhc0hvb2tFdmVudDogbnVsbCxcblx0X2hhc01vdmU6IG51bGwsXG5cdF9pbmFjdGl2ZTogbnVsbCxcblx0X2lzQmVpbmdEZXN0cm95ZWQ6IG51bGwsXG5cdF9pc0Rlc3Ryb3llZDogbnVsbCxcblx0X2lzTW91bnRlZDogbnVsbCxcblx0X2lzVnVlOiBudWxsLFxuXHRfbGVhdmluZzogbnVsbCxcblx0X25hbWU6IG51bGwsXG5cdF9wcm9wczogbnVsbCxcblx0X3Byb3ZpZGVkOiBudWxsLFxuXHRfcmVmbG93OiBudWxsLFxuXHRfcmVuZGVyUHJveHk6IG51bGwsXG5cdF9zZWxmOiBudWxsLFxuXHRfc3RhdGljVHJlZXM6IG51bGwsXG5cdF91aWQ6IG51bGwsXG5cdF91cGRhdGU6IG51bGwsXG5cdF92bm9kZTogbnVsbCxcblx0X3dhdGNoZXI6IG51bGwsXG5cdF93YXRjaGVyczogbnVsbCxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvUHJvdG8gKHNlbGYgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHRkZWZpbmVQcm9wZXJ0aWVzKF8gPyBfLmN0eCA6IHNlbGYsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb0NvbnN0cnVjdG9yIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIGRlZmluZVByb3BlcnRpZXMoY3R4LCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb05hbWVzIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgZGF0YU5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIGRlZmluZVByb3BlcnRpZXMoY3R4LCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0dmFyIGRhdGEgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBkYXRhTmFtZXMpICAgICAgICA7XG5cdGlmICggXyApIHtcblx0XHR2YXIgYWNjZXNzQ2FjaGUgPSBfLmFjY2Vzc0NhY2hlO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIGRhdGFOYW1lcyApIHtcblx0XHRcdGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRcdGlmICggbmFtZSBpbiBhY2Nlc3NDYWNoZSApIHsgYWNjZXNzQ2FjaGVbbmFtZSAgICAgICAgICAgICAgICAgXSA9IHVuZGVmaW5lZDsgfVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRmb3IgKCBuYW1lIGluIGRhdGFOYW1lcyApIHsgZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdOyB9XG5cdH1cblx0c2hhZG93QXNzaWduZXIgJiYgc2hhZG93QXNzaWduZXIoc2VsZiwgZGF0YSk7XG5cdHJldHVybiBkYXRhO1xuXHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb0RhdGEgKHNlbGYgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHR2YXIgZGF0YSA9IGNyZWF0ZShOVUxMKSAgICAgICAgO1xuXHRpZiAoIF8gKSB7XG5cdFx0dmFyIGFjY2Vzc0NhY2hlID0gXy5hY2Nlc3NDYWNoZTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBjdHggKSB7XG5cdFx0XHRpZiAoICEoIG5hbWUgaW4gcmVzdE5hbWVzICkgJiYgbmFtZVswXSE9PSckJyApIHtcblx0XHRcdFx0ZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdO1xuXHRcdFx0XHRpZiAoIG5hbWUgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmFyIG5vd05hbWVzID0gS2V5cyhjdHgpO1xuXHRcdHZhciBpbmRleCA9IG5vd05hbWVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdFx0bmFtZSA9IG5vd05hbWVzWy0taW5kZXhdO1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIHJlc3ROYW1lcyApICYmIG5hbWVbMF0hPT0nJCcgKSB7IGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTsgfVxuXHRcdH1cblx0fVxuXHRzaGFkb3dBc3NpZ25lciAmJiBzaGFkb3dBc3NpZ25lcihzZWxmLCBkYXRhKTtcblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV2RGF0YSAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIHNraXBEYXRhICAgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICwgc2hhZG93Q2hlY2tlciAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc2tpcENvbnN0cnVjdG9yICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdGZvciAoIHZhciBuYW1lIGluIGN0eCApIHtcblx0XHRpZiAoIG5hbWVbMF09PT0nXycgJiYgISggbmFtZSBpbiBOQU1FUyApICkge1xuXHRcdFx0ZXJyb3IoRXJyb3IoJ1tqVnVlIGJ1Z106IHZtLicgKyBuYW1lICsgJyBpcyB1bmtub3duIGJ1dCBleGlzdHMnKSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0dmFyIG9sZERlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhjdHgpLCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0aWYgKCBwcm90b0Rlc2NyaXB0b3JzICkge1xuXHRcdGZvciAoIHZhciAkbmFtZSBpbiBwcm90b0Rlc2NyaXB0b3JzICkgeyBpZiAoICRuYW1lIGluIGN0eCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3Jlc2VydmVkKTsgfSB9XG5cdFx0ZGVmaW5lUHJvcGVydGllcyhjdHgsIHByb3RvRGVzY3JpcHRvcnMpO1xuXHR9XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdG93bktleXMob2xkRGVzY3JpcHRvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciBvbGREZXNjcmlwdG9yID0gb2xkRGVzY3JpcHRvcnNba2V5XSA7XG5cdFx0dmFyIG5ld0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBrZXkgICAgICAgICAgICAgICAgICk7XG5cdFx0aWYgKFxuXHRcdFx0IW5ld0Rlc2NyaXB0b3IgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlIT09b2xkRGVzY3JpcHRvci5jb25maWd1cmFibGUgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuZW51bWVyYWJsZSE9PW9sZERlc2NyaXB0b3IuZW51bWVyYWJsZSB8fFxuXHRcdFx0KCBuZXdEZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0PyBuZXdEZXNjcmlwdG9yLnZhbHVlIT09b2xkRGVzY3JpcHRvci52YWx1ZSB8fCBuZXdEZXNjcmlwdG9yLndyaXRhYmxlIT09b2xkRGVzY3JpcHRvci53cml0YWJsZVxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdDogbmV3RGVzY3JpcHRvci5nZXQhPT1vbGREZXNjcmlwdG9yLmdldCB8fCBuZXdEZXNjcmlwdG9yLnNldCE9PW9sZERlc2NyaXB0b3Iuc2V0XG5cdFx0XHQpXG5cdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdH0pO1xuXHR2YXIgZGlmS2V5cyAgICAgICAgICAgICAgICAgICAgICAgID0gb3duS2V5cyhjdHgpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmV0dXJuICEoIGtleSBpbiBvbGREZXNjcmlwdG9ycyApO1xuXHR9KTtcblx0aWYgKCBza2lwQ29uc3RydWN0b3IgKSB7XG5cdFx0aWYgKCBkaWZLZXlzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdH1cblx0dmFyIGRpZk5hbWVzID0gZGlmS2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB0eXBlb2Yga2V5PT09J3N0cmluZycgJiYga2V5WzBdIT09JyQnO1xuXHR9KTtcblx0aWYgKCBza2lwRGF0YSApIHtcblx0XHRpZiAoIGRpZk5hbWVzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdH1cblx0aWYgKCBkYXRhTmFtZXMgKSB7XG5cdFx0dmFyIGNvdW50ID0gMDtcblx0XHRmb3IgKCBuYW1lIGluIGRhdGFOYW1lcyApIHsgKytjb3VudDsgfVxuXHRcdGlmICggY291bnQhPT1kaWZOYW1lcy5sZW5ndGggKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9kYXRhKTsgfVxuXHRcdGRpZk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdGlmICggISggbmFtZSBpbiBkYXRhTmFtZXMgKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0fSk7XG5cdH1cblx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoICAgICAgICAgICAgICBuYW1lKSB7XG5cdFx0aWYgKCBuYW1lIGluIHRoaXMgJiYgISggbmFtZSBpbiB7fSApIHx8IG5hbWUgaW4gcmVzdE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVkZWZpbmVkKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZT09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChjdHgsIG5hbWUpKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9lbnVtZXJhYmxlKTsgfVxuXHR9LCBnZXRQcm90b3R5cGVPZihjdHgpKTtcblx0XG5cdHZhciBkYXRhID0gY3JlYXRlKE5VTEwpICAgICAgICA7XG5cdGRpZk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHQoIGRhdGEgICAgICAgICApW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0aWYgKCBfICYmIG5hbWUgaW4gXy5hY2Nlc3NDYWNoZSApIHsgXy5hY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdH0pO1xuXHRpZiAoIHNoYWRvd0Fzc2lnbmVyICkge1xuXHRcdHNoYWRvd0NoZWNrZXIgKGRhdGEpO1xuXHRcdHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHR9XG5cdHJldHVybiBkYXRhO1xuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxudmFyIElOSVQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR2YXIgSU5JVCA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgIDtcblx0SU5JVC5tb2RlID0gJ29wZW4nO1xuXHRyZXR1cm4gSU5JVDtcbn0oKTtcblxuZnVuY3Rpb24gYXR0YWNoICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgeyByZXR1cm4gZWwgJiYgKCBlbC5zaGFkb3dSb290IHx8IGVsLmF0dGFjaFNoYWRvdyhJTklUKSApOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dBc3NpZ25lciAoICAgICAgICAgICAgYWxvbmcgICAgICAgICkgICAgICAgICAgICAgICAgIHtcblx0dmFyIGluZGV4ID0gYWxvbmcuaW5kZXhPZignLicpO1xuXHR2YXIgbmFtZXMgPSBpbmRleDwwID8gbnVsbCA6IGFsb25nLnNsaWNlKGluZGV4ICsgMSkuc3BsaXQoJy4nKTtcblx0dmFyIHRvTmFtZSA9IG5hbWVzID8gYWxvbmcuc2xpY2UoMCwgaW5kZXgpIDogYWxvbmc7XG5cdGlmICggbmFtZXMgKSB7XG5cdFx0aWYgKCBuYW1lcy5sZW5ndGg9PT0xICkge1xuXHRcdFx0dmFyIG5hbWUkZ2V0ID0gbmFtZXNbMF0gKyAnJGdldCc7XG5cdFx0XHR2YXIgbmFtZSRzZXQgPSBuYW1lc1swXSArICckc2V0Jztcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgICAgICAgICAgICAgICAgICAgICAsIGRhdGEgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdHZhciBhbGwgPSBkYXRhW3RvTmFtZV0gPSBjcmVhdGUoTlVMTCkgICAgICAgO1xuXHRcdFx0XHRhbGxbbmFtZSRzZXRdID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGVsICAgICAgICAgICAgICAgICAgICApIHsgc2VsZlt0b05hbWVdIFtuYW1lJGdldF0gPSBhdHRhY2goZWwpOyB9O1xuXHRcdFx0XHRhbGxbbmFtZSRnZXRdID0gbnVsbDtcblx0XHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0bmFtZXMgLmZvckVhY2goZnVuY3Rpb24gKG5hbWUgICAgICAgICkge1xuXHRcdFx0XHRcdGFsbFtuYW1lICsgJyRzZXQnXSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZV0gPSBhdHRhY2goZWwpOyB9O1xuXHRcdFx0XHRcdGFsbFtuYW1lICs9ICckZ2V0J10gPSBudWxsO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmFyIHRvTmFtZSRnZXQgPSB0b05hbWUgKyAnJGdldCc7XG5cdFx0dmFyIHRvTmFtZSRzZXQgPSB0b05hbWUgKyAnJHNldCc7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAsIGRhdGEgICAgICkge1xuXHRcdFx0ZGF0YVt0b05hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lJGdldF0gPSBhdHRhY2goZWwpOyB9O1xuXHRcdFx0ZGF0YVt0b05hbWUkZ2V0XSA9IG51bGw7XG5cdFx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHR9XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGZ1bmN0aW9uIFNoYWRvd0NoZWNrZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICAsIHJlc3ROYW1lcyAgICAgICAsIGRhdGFOYW1lcyAgICAgICAgICAgICAgLCBzaGFkb3dOYW1lcyAgICAgICAsIF9fZGV2X18gICAgICAgICApICAgICAgICAgICAgICAgIHtcblx0aWYgKCBhbG9uZ1swXT09PSdfJyB8fCBhbG9uZ1swXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0dmFyIGluZGV4ID0gYWxvbmcuaW5kZXhPZignLicpO1xuXHRpZiAoIGluZGV4PDAgKSB7XG5cdFx0dmFyIHRvTmFtZSRnZXQgPSBhbG9uZy5zbGljZSgwLCBpbmRleCkgKyAnJGdldCc7XG5cdFx0dmFyIHRvTmFtZSRzZXQgPSBhbG9uZy5zbGljZSgwLCBpbmRleCkgKyAnJHNldCc7XG5cdFx0aWYgKCB0b05hbWUkZ2V0IGluIHJlc3ROYW1lcyB8fCB0b05hbWUkc2V0IGluIHJlc3ROYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRzaGFkb3dOYW1lc1t0b05hbWUkZ2V0XSA9IG51bGw7XG5cdFx0c2hhZG93TmFtZXNbdG9OYW1lJHNldF0gPSBudWxsO1xuXHRcdGlmICggZGF0YU5hbWVzICkge1xuXHRcdFx0aWYgKCB0b05hbWUkZ2V0IGluIGRhdGFOYW1lcyB8fCB0b05hbWUkc2V0IGluIGRhdGFOYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBkYXRhICAgICAgKSB7XG5cdFx0XHRpZiAoIHRvTmFtZSRnZXQgaW4gZGF0YSB8fCB0b05hbWUkc2V0IGluIGRhdGEgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9zaGFkb3cpOyB9XG5cdFx0fTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGFsb25nPT09J2NvbnN0cnVjdG9yJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XHRpZiAoIGFsb25nIGluIHJlc3ROYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRzaGFkb3dOYW1lc1thbG9uZ10gPSBudWxsO1xuXHRcdGlmICggZGF0YU5hbWVzICkge1xuXHRcdFx0aWYgKCBhbG9uZyBpbiBkYXRhTmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgZGF0YSAgICAgICkge1xuXHRcdFx0aWYgKCBhbG9uZyBpbiBkYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc2hhZG93KTsgfVxuXHRcdH07XG5cdH1cbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbD8nO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXA/JztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBmcm9tIGZyb20gJy5BcnJheS5mcm9tPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLlJlZmxlY3QuZ2V0UHJvdG90eXBlT2Y/PU9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgc2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5zZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGdldE93blByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlTeW1ib2xzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzPyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IGdldCBmcm9tICcuUmVmbGVjdC5nZXQ/JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT8nO1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbj8nO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgS2V5cyBmcm9tICcuT2JqZWN0LmtleXMnO1xuaW1wb3J0IE93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz8nO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgUFJPVE9fQlVHIGZyb20gJy5PYmplY3QucHJvdG90eXBlJztcbmltcG9ydCBoYXNPd25Qcm9wZXJ0eSBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyB0aGF0LCBOQU1FUywgcHJvUHJvdG8sIHByb0NvbnN0cnVjdG9yLCBwcm9OYW1lcywgcHJvRGF0YSwgZGV2RGF0YSB9IGZyb20gJy4vRGF0YSc7XG5pbXBvcnQgeyBTaGFkb3dBc3NpZ25lciwgU2hhZG93Q2hlY2tlciB9IGZyb20gJy4vU2hhZG93JztcblxuZXhwb3J0IHsgQ29tcG9uZW50IGFzIGRlZmF1bHQgfTtcbnZhciBDb21wb25lbnQgICAgICAgICAgID0gLyojX19QVVJFX18qL2ZyZWV6ZSgvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhcblx0ZnVuY3Rpb24gQ29tcG9uZW50ICgpIHsgcmV0dXJuIHRoYXQ7IH0sXG5cdHtcblx0XHRwcm90b3R5cGU6IHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdFx0XHRcdF9yZW5kZXI6IHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRnZXQ6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uIF9yZW5kZXIgKCAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICAgICAgICAgKSB7ICggdGhpcy5fIHx8IHRoaXMuJG9wdGlvbnMgKS5yZW5kZXIgPSB2YWx1ZTsgfSxcblx0XHRcdFx0fSxcblx0XHRcdH0pKSxcblx0XHR9LFxuXHRcdHJlbmRlcjoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6IHVuZGVmaW5lZCxcblx0XHRcdHNldDogZnVuY3Rpb24gcmVuZGVyICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICkgeyAoIHRoYXQgLl8gfHwgdGhhdCAuJG9wdGlvbnMgKS5yZW5kZXIgPSB2YWx1ZTsgfSxcblx0XHR9LFxuXHRcdF86IHtcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHRvT3B0aW9ucyAoICAgICAgICAgICAgICAgIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdGlmICggIWlzQ29tcG9uZW50Q29uc3RydWN0b3IodGhpcykgKSB7IHRocm93IEVycm9yKCchKCB0aGlzIGV4dGVuZHMgQ29tcG9uZW50ICkuXygpJyk7IH1cblx0XHRcdFx0dmFyIERJRF9PUFRJT05TID0gT1BUSU9OUy5vYmplY3RzLmludG8oX19kZXZfXyB8fCBPUFRJT05TICAgICAgICkuaW50byhWdWUzIHx8IE9QVElPTlMgICAgICAgKTtcblx0XHRcdFx0dmFyIFRNUF9PUFRJT05TID0gbmV3IE9QVElPTlMub2JqZWN0c1RtcDtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSBUb09wdGlvbnMoXG5cdFx0XHRcdFx0dGhpcyxcblx0XHRcdFx0XHRWdWUzIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRfX2Rldl9fID8gREVWLnJlZHVjZShmdW5jdGlvbiBEZXYgKGRldiwga2V5KSB7XG5cdFx0XHRcdFx0XHRkZXZba2V5XSA9IF9fZGV2X18gW2tleV0gfHwga2V5O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRldjtcblx0XHRcdFx0XHR9LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCxcblx0XHRcdFx0XHRESURfT1BUSU9OUyxcblx0XHRcdFx0XHRUTVBfT1BUSU9OU1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRUTVBfT1BUSU9OUy5mb3JFYWNoIChmdW5jdGlvbiAob3B0aW9uc1ZhbHVlLCBjb25zdHJ1Y3RvcktleSkgeyBESURfT1BUSU9OUy5zZXQoY29uc3RydWN0b3JLZXksIG9wdGlvbnNWYWx1ZSk7IH0pO1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH0sXG5cdFx0fSxcblx0fVxuKSk7XG5cbnZhciBfbWl4aW5zICAgICAgICAgICAgICAgID0gU3ltYm9sICYmIC8qI19fUFVSRV9fKi9TeW1ib2woJ19taXhpbnMnKSAgICAgICAgICAgICAgICAgO1xuXG52YXIgX19QVVJFX18gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR0cnkgeyByZXR1cm4gRnVuY3Rpb24oJ0NvbXBvbmVudCxfbWl4aW5zJywgJ1widXNlIHN0cmljdFwiO3JldHVybiguLi5taXhpbnMpPT5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtjb25zdHJ1Y3Rvcigpe3JldHVybiBDb21wb25lbnQoKX1zdGF0aWMgZ2V0W19taXhpbnNdKCl7cmV0dXJuIG1peGluc319JykoQ29tcG9uZW50LCBfbWl4aW5zKTsgfVxuXHRjYXRjaCAoZXJyb3IpIHt9XG59KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbiAoICAgICAgICAgICkge1xuXHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuXHRcdD8gLyojX19QVVJFX18qL2FwcGx5KF9fUFVSRV9fLCBudWxsLCBhcmd1bWVudHMgICAgICAgKVxuXHRcdDogQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBUb09wdGlvbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICAgICAgICAgLCBESURfT1BUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIFRNUF9PUFRJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICB7XG5cdFxuXHR2YXIgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICA9IERJRF9PUFRJT05TLmdldChjb25zdHJ1Y3RvcikgfHwgVE1QX09QVElPTlMuZ2V0KGNvbnN0cnVjdG9yKTtcblx0aWYgKCBvcHRpb25zICkgeyByZXR1cm4gb3B0aW9uczsgfVxuXHRPUFRJT05TLmNvbnN0cnVjdG9yLnNldChvcHRpb25zID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yKTtcblx0XG5cdGlmICggaXNNaXhpbnMoY29uc3RydWN0b3IpICkge1xuXHRcdHZhciBzdGF0aWNfbWl4aW5zID0gY29uc3RydWN0b3JbX21peGluc10gO1xuXHRcdHZhciBtaXhpbnMgPSBuZXcgT1BUSU9OUy5TZXQgICAgICAgICAgICAoKTtcblx0XHR2YXIgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1zdGF0aWNfbWl4aW5zLmxlbmd0aCApIHtcblx0XHRcdHZhciBtaXhpbiA9IHN0YXRpY19taXhpbnNbaW5kZXgrK107XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IobWl4aW4pICkge1xuXHRcdFx0XHR2YXIgbWl4aW5PcHRpb25zID0gVG9PcHRpb25zKG1peGluLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcdFx0XHRpZiAoIGlzTWl4aW5zKG1peGluKSApIHtcblx0XHRcdFx0XHR2YXIgbWl4aW5NaXhpbnMgPSBtaXhpbk9wdGlvbnMubWl4aW5zIDtcblx0XHRcdFx0XHR2YXIgbWl4aW5JbmRleCA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCBtaXhpbkluZGV4IT09bWl4aW5NaXhpbnMubGVuZ3RoICkgeyBtaXhpbnMuYWRkKG1peGluTWl4aW5zW21peGluSW5kZXgrK10pOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7IG1peGlucy5hZGQobWl4aW5PcHRpb25zKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IG1peGlucy5hZGQobWl4aW4gICAgICAgICAgICAgICk7IH1cblx0XHR9XG5cdFx0b3B0aW9ucy5taXhpbnMgPSBmcm9tKG1peGlucyk7XG5cdFx0X19kZXZfXyAmJiBjaGVjayhvcHRpb25zLCBfX2Rldl9fKTtcblx0XHRjb2xsZWN0TmFtZXMob3B0aW9ucywgY29uc3RydWN0b3IpO1xuXHRcdFRNUF9PUFRJT05TLnNldChjb25zdHJ1Y3Rvciwgb3B0aW9ucyk7XG5cdFx0cmV0dXJuIG9wdGlvbnM7XG5cdH1cblx0XG5cdHZhciBTdXBlciA9IE9QVElPTlMuc3VwZXIuZ2V0KGNvbnN0cnVjdG9yKTtcblx0aWYgKCAhU3VwZXIgKSB7XG5cdFx0T1BUSU9OUy5zdXBlci5zZXQoY29uc3RydWN0b3IsIFN1cGVyID0gZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IpKTtcblx0XHRTdXBlcj09PUNvbXBvbmVudCB8fCBpc01peGlucyhTdXBlcikgfHwgc2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IsIENvbXBvbmVudCk7XG5cdH1cblx0aWYgKCBTdXBlciE9PUNvbXBvbmVudCApIHtcblx0XHR2YXIgU3VwZXJPcHRpb25zID0gVG9PcHRpb25zKFN1cGVyLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcdGlzTWl4aW5zKFN1cGVyKVxuXHRcdFx0PyBTdXBlck9wdGlvbnMubWl4aW5zIC5sZW5ndGg9PT0xXG5cdFx0XHQ/IG9wdGlvbnMuZXh0ZW5kcyA9IFN1cGVyT3B0aW9ucy5taXhpbnMgWzBdXG5cdFx0XHQ6IG9wdGlvbnMubWl4aW5zID0gU3VwZXJPcHRpb25zLm1peGluc1xuXHRcdFx0OiBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnM7XG5cdH1cblx0XG5cdF9fZGV2X18gJiYgZ2V0T3duUHJvcGVydHlTeW1ib2xzKGNvbnN0cnVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChzeW1ib2wpIHtcblx0XHRpZiAoIHN5bWJvbCE9PV9taXhpbnMgJiYgISggc3ltYm9sIGluIFNZTUJPTFMgKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3N5bWJvbCk7IH1cblx0fSk7XG5cdFxuXHR2YXIgc2V0ICAgICAgICAgICAgICAgID0gX19kZXZfXyA/IGRldlNldC5iaW5kKF9fZGV2X18pIDogcHJvU2V0O1xuXHR2YXIgYXNzZXJ0RnVuY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZBc3NlcnRGdW5jdGlvbi5iaW5kKF9fZGV2X18pIDogcHJvQXNzZXJ0RnVuY3Rpb247XG5cdFxuXHR2YXIgc3RhdGljTmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKGNvbnN0cnVjdG9yKTtcblx0aW5kZXggPSBzdGF0aWNOYW1lcy5sZW5ndGg7XG5cdHZhciBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGZhbHNlO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBzdGF0aWNOYW1lID0gc3RhdGljTmFtZXNbLS1pbmRleF07XG5cdFx0aWYgKCBzdGF0aWNOYW1lPT09J1JlbmRlcicgKSB7IHZhciBSZW5kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSAgICAgICAgICAgICAgICAgICAgICAgOyB9XG5cdFx0Ly9AdHMtaWdub3JlXG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWU9PT0nbmFtZScgfHwgc3RhdGljTmFtZT09PSdsZW5ndGgnICkge1xuXHRcdFx0ZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25zdHJ1Y3Rvciwgc3RhdGljTmFtZSk7XG5cdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdGRlc2NyaXB0b3IuZW51bWVyYWJsZSAmJiBzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGFwcGx5KGRlc2NyaXB0b3IuZ2V0ICwgY29uc3RydWN0b3IsIEFSR1MpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWU9PT0nZGF0YScgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggY29uc3RydWN0b3Jbc3RhdGljTmFtZV0hPT11bmRlZmluZWQgKSB7IHRocm93IEVycm9yKGlzQXJyYXkoY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pID8gX19kZXZfXy5jb21waWxlX2xheW91dCA6IF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0fVxuXHRcdFx0c2tpcENvbnN0cnVjdG9yID0gdHJ1ZTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWUhPT0ncHJvdG90eXBlJyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBzdGF0aWNOYW1lWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J3NldHVwJyB8fCBzdGF0aWNOYW1lPT09J3dhdGNoJyB8fCBzdGF0aWNOYW1lPT09J21ldGhvZHMnIHx8IHN0YXRpY05hbWU9PT0nY29tcHV0ZWQnIHx8IHN0YXRpY05hbWU9PT0nZXh0ZW5kcycgfHwgc3RhdGljTmFtZT09PSdtaXhpbnMnIHx8XG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdiZWZvcmVDcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2NyZWF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlTW91bnQnIHx8IHN0YXRpY05hbWU9PT0nbW91bnRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVVcGRhdGUnIHx8IHN0YXRpY05hbWU9PT0ndXBkYXRlZCcgfHwgc3RhdGljTmFtZT09PSdhY3RpdmF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nZGVhY3RpdmF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVW5tb3VudCcgfHwgc3RhdGljTmFtZT09PSd1bm1vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlRGVzdHJveScgfHwgc3RhdGljTmFtZT09PSdkZXN0cm95ZWQnIHx8XG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdpbmplY3QnIHx8IHN0YXRpY05hbWU9PT0ncHJvcHMnXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbGF5b3V0KTsgfVxuXHRcdFx0fVxuXHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pO1xuXHRcdH1cblx0fVxuXHRcblx0dmFyIHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcblx0dmFyIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0XG5cdHZhciBwcm90b05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpO1xuXHRpbmRleCA9IHByb3RvTmFtZXMubGVuZ3RoO1xuXHR2YXIgd2F0Y2hlcnMgICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2tpcERhdGEgPSBmYWxzZTtcblx0dmFyIGRhdGFOYW1lcyAgICAgICAgICAgICAgID0gbnVsbDtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgcHJvdG9OYW1lID0gcHJvdG9OYW1lc1stLWluZGV4XTtcblx0XHRpZiAoIHByb3RvTmFtZT09PSdfZGF0YScgKSB7XG5cdFx0XHR2YXIgX2RhdGEgPSBnZXQocHJvdG90eXBlLCBwcm90b05hbWUsIHVuZGVmaW5lZCk7XG5cdFx0XHRpZiAoIF9kYXRhICkge1xuXHRcdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdFx0aWYgKCAhaXNBcnJheShfZGF0YSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdF9kYXRhLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIG5hbWUhPT0nc3RyaW5nJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHRcdFx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBsZW5ndGggPSBfZGF0YS5sZW5ndGg7XG5cdFx0XHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0XHRcdGRhdGFOYW1lcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHRcdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRcdFx0ZG8geyBkYXRhTmFtZXNbX2RhdGFbaV1dID0gbnVsbDsgfVxuXHRcdFx0XHRcdHdoaWxlICggKytpIT09bGVuZ3RoICk7XG5cdFx0XHRcdFx0ZGF0YU5hbWVzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGF0YU5hbWVzKTtcblx0XHRcdFx0XHRfX2Rldl9fICYmIE9QVElPTlMuZGF0YS5zZXQob3B0aW9ucywgZGF0YU5hbWVzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRza2lwRGF0YSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdFx0aWYgKCBfZGF0YSE9PXVuZGVmaW5lZCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHRcdFx0aWYgKCBza2lwQ29uc3RydWN0b3IgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2tpcENvbnN0cnVjdG9yID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHByb3RvTmFtZVswXT09PSdfJyAmJiAhKCBwcm90b05hbWUuc3RhcnRzV2l0aCgnX3dhdGNoKCcpICkgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdHZhciBwcm90b05hbWUxID0gcHJvdG9OYW1lLnNsaWNlKDEpO1xuXHRcdFx0XHRpZiAoIHByb3RvTmFtZTFbMF09PT0nXycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nc2V0dXAnIHx8IHByb3RvTmFtZTE9PT0nd2F0Y2gnIHx8IHByb3RvTmFtZTE9PT0nbWV0aG9kcycgfHwgcHJvdG9OYW1lMT09PSdjb21wdXRlZCcgfHwgcHJvdG9OYW1lMT09PSdleHRlbmRzJyB8fCBwcm90b05hbWUxPT09J21peGlucycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2VtaXRzJyB8fCBwcm90b05hbWUxPT09J2NvbXBvbmVudHMnIHx8IHByb3RvTmFtZTE9PT0nZGlyZWN0aXZlcycgfHwgcHJvdG9OYW1lMT09PSdzdGF0aWNSZW5kZXJGbnMnIHx8IHByb3RvTmFtZTE9PT0ndGVtcGxhdGUnIHx8IHByb3RvTmFtZTE9PT0naW5oZXJpdEF0dHJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nbmFtZScgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J1JlbmRlcicgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2RlbGltaXRlcnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdmaWx0ZXJzJyB8fCBwcm90b05hbWUxPT09J2NvbW1lbnRzJyB8fCBwcm90b05hbWUxPT09J2Z1bmN0aW9uYWwnIHx8IHByb3RvTmFtZTE9PT0ncHJvcHNEYXRhJyB8fCBwcm90b05hbWUxPT09J21vZGVsJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheW91dCk7IH1cblx0XHRcdH1cblx0XHRcdHNldChvcHRpb25zLCBwcm90b05hbWUuc2xpY2UoMSksIGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvTmFtZSk7XG5cdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSdfJyApIHtcblx0XHRcdFx0dmFyIGluZGV4T2ZRID0gcHJvdG9OYW1lLmxhc3RJbmRleE9mKCcpJyk7XG5cdFx0XHRcdHZhciB3YXRjaGVyID0gd2F0Y2hlcnNbd2F0Y2hlcnMubGVuZ3RoXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gcHJvdG9OYW1lLnNsaWNlKDcsIGluZGV4T2ZRKS50cmltKCk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5nZXQpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3Iuc2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGluZGV4T2ZRICsgMSE9PXByb3RvTmFtZS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aW5kZXhPZlEgKz0gMjtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkEgPSBwcm90b05hbWUuaW5kZXhPZignOycsIGluZGV4T2ZRKTtcblx0XHRcdFx0XHRcdHZhciBwYWlyID0gaW5kZXhPZkE8MFxuXHRcdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSlcblx0XHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEsIGluZGV4T2ZBKTtcblx0XHRcdFx0XHRcdGluZGV4T2ZRID0gaW5kZXhPZkEgKyAxO1xuXHRcdFx0XHRcdFx0aWYgKCBwYWlyICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkUgPSBwYWlyLmluZGV4T2YoJz0nKTtcblx0XHRcdFx0XHRcdFx0aW5kZXhPZkU8MFxuXHRcdFx0XHRcdFx0XHRcdD8gd2F0Y2hlcltwYWlyXSA9IHRydWVcblx0XHRcdFx0XHRcdFx0XHQ6IHdhdGNoZXJbcGFpci5zbGljZSgwLCBpbmRleE9mRSldID0gcGFpci5zbGljZShpbmRleE9mRSArIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoIGluZGV4T2ZRICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nJCcgKSB7XG5cdFx0XHRcdCggcHJvdG9EZXNjcmlwdG9ycyB8fCAoIHByb3RvRGVzY3JpcHRvcnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZSE9PSdjb25zdHJ1Y3RvcicgfHwgZGVzY3JpcHRvci52YWx1ZSE9PWNvbnN0cnVjdG9yICkge1xuXHRcdFx0XHRcdFx0KCBvcHRpb25zLm1ldGhvZHMgfHwgKCBvcHRpb25zLm1ldGhvZHMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQoIG9wdGlvbnMuY29tcHV0ZWQgfHwgKCBvcHRpb25zLmNvbXB1dGVkID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gZGVzY3JpcHRvci5zZXQgPyB7XG5cdFx0XHRcdFx0XHRnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuXHRcdFx0XHRcdFx0c2V0OiBkZXNjcmlwdG9yLnNldFxuXHRcdFx0XHRcdH0gOiBkZXNjcmlwdG9yLmdldCAgICAgICA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHZhciBwcm90b1N5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvdG90eXBlKSAgICAgICAgICAgICAgICAgICA7XG5cdGlmICggKCBpbmRleCA9IHByb3RvU3ltYm9scy5sZW5ndGggKSApIHtcblx0XHRpZiAoICFwcm90b0Rlc2NyaXB0b3JzICkgeyBwcm90b0Rlc2NyaXB0b3JzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHRkbyB7XG5cdFx0XHR2YXIgcHJvdG9TeW1ib2wgICAgICAgICAgICAgICAgPSBwcm90b1N5bWJvbHNbLS1pbmRleF07XG5cdFx0XHRwcm90b0Rlc2NyaXB0b3JzIFtwcm90b1N5bWJvbF0gPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBwcm90b1N5bWJvbCkpO1xuXHRcdH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdH1cblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBPUFRJT05TLnByb3RvLnNldChvcHRpb25zLCBwcm90b0Rlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgcHJvdG9EZXNjcmlwdG9ycykpO1xuXHRcblx0X19kZXZfXyAmJiBjaGVjayhvcHRpb25zLCBfX2Rldl9fKTtcblx0XG5cdHZhciByZXN0TmFtZXMgPSBjb2xsZWN0TmFtZXMob3B0aW9ucywgY29uc3RydWN0b3IpO1xuXHRcblx0aWYgKCBSZW5kZXIgJiYgVnVlMyApIHtcblx0XHR2YXIgc2hhZG93ID0gUmVuZGVyLnNoYWRvdztcblx0XHRpZiAoIHNoYWRvdyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBza2lwQ29uc3RydWN0b3IgJiYgc2tpcERhdGEgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRcdHZhciBzaGFkb3dOYW1lcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHRcdFx0dmFyIHNoYWRvd0NoZWNrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBTaGFkb3dDaGVja2VyKHNoYWRvdywgcmVzdE5hbWVzLCBkYXRhTmFtZXMsIHNoYWRvd05hbWVzLCBfX2Rldl9fKTtcblx0XHRcdFx0T1BUSU9OUy5zaGFkb3cuc2V0KG9wdGlvbnMsIHNoYWRvd05hbWVzKTtcblx0XHRcdH1cblx0XHRcdHNoYWRvd0Fzc2lnbmVyID0gU2hhZG93QXNzaWduZXIoc2hhZG93KTtcblx0XHR9XG5cdFx0dmFyIHNoZWV0ID0gUmVuZGVyLnNoZWV0O1xuXHRcdGlmICggc2hlZXQgKSB7XG5cdFx0XHR2YXIgd2F0Y2hlcnMyICAgICAgICAgICAgPSBbXTtcblx0XHRcdE93bktleXMoc2hlZXQpLmZvckVhY2goZnVuY3Rpb24gKCAgICAgICAgICAgICAgICAga2V5LCBpbmRleCkge1xuXHRcdFx0XHR2YXIgd2F0Y2hlciA9IHRoaXNbaW5kZXhdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICA7XG5cdFx0XHRcdHdhdGNoZXIuJCA9IGFzc2VydEZ1bmN0aW9uKHNoZWV0IFtrZXldKTtcblx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGNzcyAgICAgICAgKSB7ICggdGhpcy4kcmVmc1trZXldICAgICAgICAgICAgICAgICAgICAgKS50ZXh0Q29udGVudCA9IGNzczsgfTtcblx0XHRcdFx0d2F0Y2hlci5pbW1lZGlhdGUgPSB0cnVlO1xuXHRcdFx0XHR3YXRjaGVyLmZsdXNoID0gJ3N5bmMnO1xuXHRcdFx0fSwgd2F0Y2hlcnMyKTtcblx0XHRcdHdhdGNoZXJzMi5yZXZlcnNlKCk7XG5cdFx0XHR2YXIgYmVmb3JlTW91bnQgPSBvcHRpb25zLmJlZm9yZU1vdW50O1xuXHRcdFx0b3B0aW9ucy5iZWZvcmVNb3VudCA9IGJlZm9yZU1vdW50XG5cdFx0XHRcdD8gZnVuY3Rpb24gYmVmb3JlQmVmb3JlTW91bnQgKCkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVyczIpO1xuXHRcdFx0XHRcdHJldHVybiBiZWZvcmVNb3VudCAuYXBwbHkodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0OiBmdW5jdGlvbiBiZWZvcmVCZWZvcmVNb3VudCAoKSB7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzMik7XG5cdFx0XHRcdH07XG5cdFx0fVxuXHRcdG9wdGlvbnMucmVuZGVyID0gYXNzZXJ0RnVuY3Rpb24obmV3IFJlbmRlcihWdWUzICkpO1xuXHR9XG5cdFxuXHRpZiAoIF9fZGV2X18gKSB7IG9wdGlvbnMuZGF0YSA9IGZ1bmN0aW9uIChzZWxmICAgICAgKSB7IHJldHVybiBkZXZEYXRhKHNlbGYgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMsIHNraXBEYXRhLCBkYXRhTmFtZXMsIHJlc3ROYW1lcywgc2hhZG93QXNzaWduZXIsIHNoYWRvd0NoZWNrZXIsIHNraXBDb25zdHJ1Y3RvciwgX19kZXZfXyk7IH07IH1cblx0ZWxzZSBpZiAoIHNraXBDb25zdHJ1Y3RvciB8fCBza2lwRGF0YSApIHt9XG5cdGVsc2UgaWYgKCBkYXRhTmFtZXMgKSB7IG9wdGlvbnMuZGF0YSA9IGZ1bmN0aW9uIChzZWxmICAgICAgKSB7IHJldHVybiBwcm9OYW1lcyhzZWxmICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzLCBkYXRhTmFtZXMgLCBzaGFkb3dBc3NpZ25lcik7IH07IH1cblx0ZWxzZSB7IG9wdGlvbnMuZGF0YSA9IGZ1bmN0aW9uIChzZWxmICAgICAgKSB7IHJldHVybiBwcm9EYXRhKHNlbGYgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMsIHJlc3ROYW1lcywgc2hhZG93QXNzaWduZXIpOyB9OyB9XG5cdFxuXHRpZiAoIHdhdGNoZXJzLmxlbmd0aCB8fCAhX19kZXZfXyAmJiAoIHNraXBDb25zdHJ1Y3RvciAmJiBwcm90b0Rlc2NyaXB0b3JzIHx8IHNraXBEYXRhICkgKSB7XG5cdFx0d2F0Y2hlcnMubGVuZ3RoICYmIHdhdGNoZXJzLnJldmVyc2UoKTtcblx0XHR2YXIgY3JlYXRlZCA9IG9wdGlvbnMuY3JlYXRlZDtcblx0XHRzd2l0Y2ggKCAoIF9fZGV2X18gPyAoIHNraXBDb25zdHJ1Y3RvciA/ICdzJyA6ICduJyApIDogJ18nICkgKyAoIHdhdGNoZXJzLmxlbmd0aCA/ICd3JyA6ICdfJyApICsgKCBjcmVhdGVkID8gJ2MnIDogJ18nICkgKSB7XG5cdFx0XHRjYXNlICdzd2MnOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvUHJvdG8odGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICk7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0XHRyZXR1cm4gY3JlYXRlZCAuYXBwbHkodGhpcyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzX18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvUHJvdG8odGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbndjJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdFx0cmV0dXJuIGNyZWF0ZWQgLmFwcGx5KHRoaXMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ253Xyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ25fYyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHRyZXR1cm4gY3JlYXRlZCAuYXBwbHkodGhpcyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ193Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdfd18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdFxuXHRUTVBfT1BUSU9OUy5zZXQoY29uc3RydWN0b3IsIG9wdGlvbnMpO1xuXHRcblx0Ly9AdHMtaWdub3JlXG5cdGlmICggb3B0aW9ucy5jb21wb25lbnRzIHx8IG9wdGlvbnMubmFtZSB8fCBvcHRpb25zLmRpc3BsYXlOYW1lICkge1xuXHRcdHZhciBjb21wb25lbnRzID0gb3B0aW9ucy5jb21wb25lbnRzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgb3B0aW9ucy5jb21wb25lbnRzKTtcblx0XHR2YXIgY2FzZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0Ly9AdHMtaWdub3JlXG5cdFx0b3B0aW9ucy5uYW1lICYmIGZpeFBhc2NhbChvcHRpb25zLm5hbWUsIGNhc2VzKTtcblx0XHQvL0B0cy1pZ25vcmVcblx0XHRvcHRpb25zLmRpc3BsYXlOYW1lICYmIGZpeFBhc2NhbChvcHRpb25zLmRpc3BsYXlOYW1lLCBjYXNlcyk7XG5cdFx0Zm9yICggdmFyIHBhc2NhbCBpbiBjb21wb25lbnRzICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoICFwYXNjYWwgfHwgU1RBUlRTX1dJVEhfTE9XRVJDQVNFLnRlc3QocGFzY2FsKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdFx0XHR9XG5cdFx0XHR2YXIgdmFsdWUgPSBjb21wb25lbnRzW3Bhc2NhbF07XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IodmFsdWUpICkgeyBjb21wb25lbnRzW3Bhc2NhbF0gPSBUb09wdGlvbnModmFsdWUsIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7IH1cblx0XHRcdGZpeFBhc2NhbChwYXNjYWwsIGNhc2VzKTtcblx0XHR9XG5cdFx0YXNzaWduKGNvbXBvbmVudHMsIGNhc2VzLCBjb21wb25lbnRzKTtcblx0fVxuXHRcblx0cmV0dXJuIG9wdGlvbnM7XG5cdFxufVxuXG52YXIgT1BUSU9OUyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtcXFxuY2xhc3MgRWFzeU1hcCBleHRlbmRzIFdlYWtNYXB7aW50byhrZXkpe2xldCBzdWI9dGhpcy5nZXQoa2V5KTtzdWI/P3RoaXMuc2V0KGtleSxzdWI9bmV3IEVhc3lNYXApO3JldHVybiBzdWJ9fUVhc3lNYXAucHJvdG90eXBlLmdldD1XZWFrTWFwLnByb3RvdHlwZS5nZXQ7RWFzeU1hcC5wcm90b3R5cGUuc2V0PVdlYWtNYXAucHJvdG90eXBlLnNldDtcXFxuY2xhc3MgU3Ryb25nTWFwIGV4dGVuZHMgTWFwe31TdHJvbmdNYXAucHJvdG90eXBlLmdldD1NYXAucHJvdG90eXBlLmdldDtTdHJvbmdNYXAucHJvdG90eXBlLnNldD1NYXAucHJvdG90eXBlLnNldDtTdHJvbmdNYXAucHJvdG90eXBlLmZvckVhY2g9TWFwLnByb3RvdHlwZS5mb3JFYWNoO1xcXG5jbGFzcyBTdHJvbmdTZXQgZXh0ZW5kcyBTZXR7fVN0cm9uZ1NldC5wcm90b3R5cGUuYWRkPVNldC5wcm90b3R5cGUuYWRkO1N0cm9uZ1NldC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXT1TZXQucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl07XFxcbnJldHVybntvYmplY3RzOm5ldyBFYXN5TWFwLG9iamVjdHNUbXA6U3Ryb25nTWFwLHN1cGVyOm5ldyBFYXN5TWFwLHJlc3Q6bmV3IEVhc3lNYXAsZGF0YTpuZXcgRWFzeU1hcCxwcm90bzpuZXcgRWFzeU1hcCxjb25zdHJ1Y3RvcjpuZXcgRWFzeU1hcCxzaGFkb3c6bmV3IEVhc3lNYXAsU2V0OlN0cm9uZ1NldH1cXFxuJykoKTtcblx0fVxuXHRjYXRjaCAoZXJyb3IpIHt9XG59KCkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmZ1bmN0aW9uIGlzQ29tcG9uZW50Q29uc3RydWN0b3IgKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgICAgICB7IHJldHVybiBhcHBseShpc1Byb3RvdHlwZU9mLCBDb21wb25lbnQsIFsgdmFsdWUgXSAgICAgICAgICk7IH1cblxudmFyIEFSR1MgPSBbXSAgICAgICAgIDtcblxudmFyIF9NSVhJTlMgPSBbIF9taXhpbnMgXSAgICAgICAgIDtcbmZ1bmN0aW9uIGlzTWl4aW5zIChjb25zdHJ1Y3RvciAgICAgICAgICApIHsgcmV0dXJuIGFwcGx5KGhhc093blByb3BlcnR5LCBjb25zdHJ1Y3RvciwgX01JWElOUyk7IH1cblxudmFyIFNZTUJPTFMgPSAvKiNfX1BVUkVfXyovZ2V0T3duUHJvcGVydHlOYW1lcyhTeW1ib2wpLnJlZHVjZShmdW5jdGlvbiAoU1lNQk9MUywgbmFtZSkge1xuXHRpZiAoIHR5cGVvZiBTeW1ib2xbbmFtZV09PT0nc3ltYm9sJyApIHsgU1lNQk9MU1tTeW1ib2xbbmFtZV0gICAgICAgICAgICAgICAgIF0gPSBudWxsOyB9XG5cdHJldHVybiBTWU1CT0xTO1xufSwgY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbmZ1bmN0aW9uICR3YXRjaCAodGhhdCAgICAgICwgd2F0Y2hlcnMgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgaW5kZXggPSB3YXRjaGVycy5sZW5ndGg7XG5cdGRvIHtcblx0XHR2YXIgd2F0Y2hlciAgICAgID0gd2F0Y2hlcnNbLS1pbmRleF07XG5cdFx0dGhhdC4kd2F0Y2god2F0Y2hlci4kLCB3YXRjaGVyLmhhbmRsZXIsIHdhdGNoZXIpO1xuXHR9XG5cdHdoaWxlICggaW5kZXggKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgIFxuICBcbmZ1bmN0aW9uIGNvbGxlY3ROYW1lcyAob3B0aW9ucyAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICkgICAgICAgIHtcblx0dmFyIHJlc3ROYW1lcyAgICAgICAgICAgICAgICAgICAgPSBPUFRJT05TLnJlc3QuZ2V0KG9wdGlvbnMpO1xuXHRpZiAoICFyZXN0TmFtZXMgKSB7XG5cdFx0aWYgKCBjb25zdHJ1Y3RvciApIHsgcmVzdE5hbWVzID0gT1BUSU9OUy5yZXN0LmdldChjb25zdHJ1Y3Rvcik7IH1cblx0XHRpZiAoICFyZXN0TmFtZXMgKSB7XG5cdFx0XHRyZXN0TmFtZXMgPSBjcmVhdGUoTkFNRVMpO1xuXHRcdFx0dmFyIGV4dGVuZCA9IG9wdGlvbnMuZXh0ZW5kcztcblx0XHRcdGV4dGVuZCAmJiBhc3NpZ24ocmVzdE5hbWVzLCBjb2xsZWN0TmFtZXMoZXh0ZW5kLCBudWxsKSk7XG5cdFx0XHR2YXIgbWl4aW5zID0gb3B0aW9ucy5taXhpbnM7XG5cdFx0XHRpZiAoIG1peGlucyApIHsgZm9yICggdmFyIGluZGV4ID0gbWl4aW5zLmxlbmd0aDsgaW5kZXg7ICkgeyBhc3NpZ24ocmVzdE5hbWVzLCBjb2xsZWN0TmFtZXMobWl4aW5zWy0taW5kZXhdLCBudWxsKSk7IH0gfVxuXHRcdFx0dmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcblx0XHRcdHZhciBuYW1lICAgICAgICA7XG5cdFx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkgeyBmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkgeyByZXN0TmFtZXNbcHJvcHNbLS1pbmRleF1dID0gbnVsbDsgfSB9XG5cdFx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBwcm9wcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRwcm9wcyA9IG9wdGlvbnMuaW5qZWN0O1xuXHRcdFx0aWYgKCBpc0FycmF5KHByb3BzKSApIHsgZm9yICggaW5kZXggPSBwcm9wcy5sZW5ndGg7IGluZGV4OyApIHsgcmVzdE5hbWVzW3Byb3BzWy0taW5kZXhdXSA9IG51bGw7IH0gfVxuXHRcdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7IHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7IH1cblx0XHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5jb21wdXRlZCApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdFx0cmVzdE5hbWVzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgcmVzdE5hbWVzKTtcblx0XHR9XG5cdFx0aWYgKCBjb25zdHJ1Y3RvciApIHsgT1BUSU9OUy5yZXN0LnNldChjb25zdHJ1Y3RvciwgcmVzdE5hbWVzKTsgfVxuXHRcdE9QVElPTlMucmVzdC5zZXQob3B0aW9ucywgcmVzdE5hbWVzKTtcblx0fVxuXHRyZXR1cm4gcmVzdE5hbWVzO1xufVxuXG5mdW5jdGlvbiBwcm9TZXQgICAgKG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgLCBuYW1lICAgICAgICAsIHZhbHVlICAgKSB7IG9iamVjdFtuYW1lXSA9IHZhbHVlOyB9XG5mdW5jdGlvbiBkZXZTZXQgICAgKCAgICAgICAgICAgICAgIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgLCBuYW1lICAgICAgICAsIHZhbHVlICAgKSB7XG5cdGlmICggbmFtZSBpbiBvYmplY3QgKSB7IHRocm93IEVycm9yKHRoaXMuY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdG9iamVjdFtuYW1lXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwcm9Bc3NlcnRGdW5jdGlvbiAgICAoZm4gICApIHsgcmV0dXJuIGZuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyB9XG5mdW5jdGlvbiBkZXZBc3NlcnRGdW5jdGlvbiAgICAoICAgICAgICAgICAgICAgZm4gICApIHtcblx0aWYgKCB0eXBlb2YgZm4hPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IodGhpcy5jb21waWxlX3R5cGUpOyB9XG5cdHJldHVybiBmbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbn1cblxudmFyIFNUQVJUU19XSVRIX0xPV0VSQ0FTRSA9IC9eW2Etel0vO1xudmFyIENIRUNLRUQgPSBXZWFrTWFwICYmIC8qI19fUFVSRV9fKi9uZXcgV2Vha01hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCk7XG5mdW5jdGlvbiBmb3JLZXlzIChvcHRpb24gICAgICAgICAgICAgICAgLCBjYWxsYmFjayAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRpZiAoIGlzQXJyYXkob3B0aW9uKSApIHsgb3B0aW9uLmZvckVhY2goY2FsbGJhY2spOyB9XG5cdGVsc2UgeyBmb3IgKCB2YXIga2V5IGluIG9wdGlvbiApIHsgY2FsbGJhY2soa2V5KTsgfSB9XG59XG5mdW5jdGlvbiBjaGVjayAob3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgX19kZXZfXyAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcblx0dmFyIGJlbG9uZyA9IE9QVElPTlMuY29uc3RydWN0b3IuZ2V0KG9wdGlvbnMpIHx8IG9wdGlvbnM7XG5cdHZhciBvd25LZXlzID0gQ0hFQ0tFRC5nZXQoYmVsb25nKTtcblx0aWYgKCBvd25LZXlzICkgeyByZXR1cm4gb3duS2V5czsgfVxuXHR2YXIgYWxsS2V5cyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRcblx0KCBvcHRpb25zLmV4dGVuZHMgPyBbIG9wdGlvbnMuZXh0ZW5kcyBdIDogW10gKS5jb25jYXQob3B0aW9ucy5taXhpbnMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKG1peGluKSB7XG5cdFx0dmFyIG1peGluTmFtZXMgPSBjaGVjayhtaXhpbiwgX19kZXZfXyk7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gbWl4aW5OYW1lcyApIHtcblx0XHRcdGlmICggbmFtZSBpbiBhbGxLZXlzICYmIG1peGluTmFtZXNbbmFtZV0hPT1hbGxLZXlzW25hbWVdICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfb3ZlcndyaXRlKTsgfVxuXHRcdH1cblx0XHRhc3NpZ24oYWxsS2V5cywgbWl4aW5OYW1lcyk7XG5cdH0pO1xuXHRcblx0b3duS2V5cyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRcblx0dmFyIHByb3RvRGVzY3JpcHRvcnMgPSBPUFRJT05TLnByb3RvLmdldChvcHRpb25zKTtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBPd25LZXlzKHByb3RvRGVzY3JpcHRvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdG93bktleXMgW2tleV0gPSBiZWxvbmc7XG5cdH0pO1xuXHRcblx0Zm9yS2V5cyhvcHRpb25zLnByb3BzLCBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmICggLy18Xig/OmtleSR8W29PXVtuTl18cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9wcm9wcyk7IH1cblx0XHRpZiAoIG5hbWUgaW4gUFJPVE9fQlVHICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5pbmplY3QsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5cyBbbmFtZV0gPSBiZWxvbmc7XG5cdH0pO1xuXHRcblx0dmFyIG5hbWUgICAgICAgIDtcblx0XG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5tZXRob2RzICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5c1tuYW1lXSA9IGJlbG9uZztcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5c1tuYW1lXSA9IGJlbG9uZztcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBPUFRJT05TLmRhdGEuZ2V0KG9wdGlvbnMpICkge1xuXHRcdGlmICggbmFtZSBpbiBvd25LZXlzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzIFtuYW1lXSA9IGJlbG9uZztcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBPUFRJT05TLnNoYWRvdy5nZXQob3B0aW9ucykgKSB7XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRpZiAoICdjb25zdHJ1Y3RvcicgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XG5cdE93bktleXMob3duS2V5cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0aWYgKCBrZXkgaW4gYWxsS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX292ZXJ3cml0ZSk7IH1cblx0fSk7XG5cdGFzc2lnbihhbGxLZXlzLCBvd25LZXlzKTtcblx0XG5cdFsgb3B0aW9ucy5uYW1lLCBvcHRpb25zLmRpc3BsYXlOYW1lIF0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSAgICAgICAgICkge1xuXHRcdGlmICggdHlwZW9mIG5hbWU9PT0nc3RyaW5nJ1xuXHRcdFx0PyAhbmFtZSB8fCBTVEFSVFNfV0lUSF9MT1dFUkNBU0UudGVzdChuYW1lKSB8fCBvcHRpb25zLmNvbXBvbmVudHMgJiYgb3B0aW9ucy5jb21wb25lbnRzW25hbWVdICYmIG9wdGlvbnMuY29tcG9uZW50c1tuYW1lXSE9PW9wdGlvbnNcblx0XHRcdDogbmFtZSE9PXVuZGVmaW5lZFxuXHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0fSk7XG5cdFxuXHRvcHRpb25zLmVtaXRzICYmXG5cdCggaXNBcnJheShvcHRpb25zLmVtaXRzKSA/IG9wdGlvbnMuZW1pdHMgOiBLZXlzKG9wdGlvbnMuZW1pdHMpICkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoIHR5cGVvZiBldmVudD09PSdzdHJpbmcnICYmIC9eb24tP3Zub2RlfCg/OmNhcHR1cmV8b25jZXxwYXNzaXZlKSQvLnRlc3QoJ29uJyArIGV2ZW50KSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2VtaXRzKTsgfVxuXHR9KTtcblx0XG5cdGlmIChcblx0XHRvcHRpb25zLmRpcmVjdGl2ZXMgJiYgJ2lzJyBpbiBvcHRpb25zLmRpcmVjdGl2ZXMvLyAyXG5cdFx0fHwvL0B0cy1pZ25vcmVcblx0XHRvcHRpb25zLnByb3BzICYmICggaXNBcnJheShvcHRpb25zLnByb3BzKSA/IG9wdGlvbnMucHJvcHMuaW5jbHVkZXMoJ2lzJykgOiAnaXMnIGluIG9wdGlvbnMucHJvcHMgKS8vIDNcblx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9pcyk7IH1cblx0XG5cdENIRUNLRUQuc2V0KGJlbG9uZywgYWxsS2V5cyk7XG5cdHJldHVybiBhbGxLZXlzO1xuXHRcbn1cblxudmFyIFVQUEVSID0gL1tBLVpdLztcbmZ1bmN0aW9uIGZpeFBhc2NhbCAocGFzY2FsICAgICAgICAsIGNhc2VzICAgICAgICkge1xuXHR2YXIgRmlyc3QgPSBwYXNjYWxbMF07XG5cdHZhciBmaXJzdCA9IEZpcnN0LnRvTG93ZXJDYXNlKCk7XG5cdHZhciByZXN0ID0gcGFzY2FsLnNsaWNlKDEpO1xuXHRjYXNlc1tmaXJzdCArIHJlc3RdID0gbnVsbDtcblx0aHlwaGVuYXRlKGZpcnN0LCByZXN0LCBjYXNlcyk7XG5cdGZpcnN0PT09Rmlyc3QgfHwgaHlwaGVuYXRlKEZpcnN0LCByZXN0LCBjYXNlcyk7XG59XG5mdW5jdGlvbiBoeXBoZW5hdGUgKGJlZm9yZSAgICAgICAgLCBhZnRlciAgICAgICAgLCBjYXNlcyAgICAgICApIHtcblx0dmFyIGluZGV4ID0gYWZ0ZXIuc2VhcmNoKFVQUEVSKTtcblx0aWYgKCBpbmRleDwwICkgeyBjYXNlc1tiZWZvcmUgKyBhZnRlcl0gPSBudWxsOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggaW5kZXggKSB7IGJlZm9yZSArPSBhZnRlci5zbGljZSgwLCBpbmRleCk7IH1cblx0XHR2YXIgY2hhciA9IGFmdGVyW2luZGV4XTtcblx0XHRhZnRlciA9IGFmdGVyLnNsaWNlKGluZGV4ICsgMSk7XG5cdFx0aHlwaGVuYXRlKGJlZm9yZSArICctJyArIGNoYXIudG9Mb3dlckNhc2UoKSwgYWZ0ZXIsIGNhc2VzKTtcblx0XHRoeXBoZW5hdGUoYmVmb3JlICsgJy0nICsgY2hhciwgYWZ0ZXIsIGNhc2VzKTtcblx0XHRiZWZvcmVbYmVmb3JlLmxlbmd0aCAtIDFdPT09Jy0nIHx8IGh5cGhlbmF0ZShiZWZvcmUgKyBjaGFyLCBhZnRlciwgY2FzZXMpO1xuXHR9XG59XG5cbnZhciBERVYgPSBbXG5cdCdwcm90bycsXG5cdCdjb21waWxlX25hbWUnLFxuXHQnY29tcGlsZV9wcm9wcycsXG5cdCdjb21waWxlX2VtaXRzJyxcblx0J2NvbXBpbGVfaXMnLFxuXHQnY29tcGlsZV9sYXlvdXQnLFxuXHQnY29tcGlsZV9yZXNlcnZlZCcsXG5cdCdjb21waWxlX3JlZGVmaW5lZCcsXG5cdCdjb21waWxlX292ZXJ3cml0ZScsXG5cdCdjb21waWxlX3R5cGUnLFxuXHQnY29tcGlsZV9zeW1ib2wnLFxuXHQnY29tcGlsZV9zaGFkb3cnLFxuXHQncnVudGltZV9zaGFkb3cnLFxuXHQncnVudGltZV9yZWRlZmluZWQnLFxuXHQncnVudGltZV9zeW1ib2wnLFxuXHQncnVudGltZV9yZXNlcnZlZCcsXG5cdCdydW50aW1lX2VudW1lcmFibGUnLFxuXHQncnVudGltZV9kYXRhJyxcbl0gICAgICAgICA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICBcblx0ICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuXG4gICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgIFxuIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24/JztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL2ZyZWV6ZShjcmVhdGUoTlVMTCwge1xuXHRiZWZvcmVNb3VudDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGJlZm9yZU1vdW50IChlbCAgICAgLCBiaW5kaW5nICAgICApIHsgYmluZGluZy5hcmc9PT11bmRlZmluZWQgPyBhc3NpZ24oZWwsIGJpbmRpbmcudmFsdWUpIDogZWxbYmluZGluZy5hcmddID0gYmluZGluZy52YWx1ZTsgfSxcblx0fSxcblx0YmluZDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGJpbmQgKGVsICAgICAsIGJpbmRpbmcgICAgICkgeyBiaW5kaW5nLmFyZz09PXVuZGVmaW5lZCA/IGFzc2lnbihlbCwgYmluZGluZy52YWx1ZSkgOiBlbFtiaW5kaW5nLmFyZ10gPSBiaW5kaW5nLnZhbHVlOyB9LFxuXHR9LFxuXHR1cGRhdGVkOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR2YWx1ZTogZnVuY3Rpb24gdXBkYXRlZCAoZWwgICAgICwgYmluZGluZyAgICAgKSB7IGJpbmRpbmcuYXJnPT09dW5kZWZpbmVkID8gYXNzaWduKGVsLCBiaW5kaW5nLnZhbHVlKSA6IGVsW2JpbmRpbmcuYXJnXSA9IGJpbmRpbmcudmFsdWU7IH0sXG5cdH0sXG5cdGNvbXBvbmVudFVwZGF0ZWQ6IHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRVcGRhdGVkIChlbCAgICAgLCBiaW5kaW5nICAgICApIHsgYmluZGluZy5hcmc9PT11bmRlZmluZWQgPyBhc3NpZ24oZWwsIGJpbmRpbmcudmFsdWUpIDogZWxbYmluZGluZy5hcmddID0gYmluZGluZy52YWx1ZTsgfSxcblx0fSxcbn0pKTtcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCBSZW5kZXIsIHsgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU3R5bGUsIHsgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcbmltcG9ydCBDb21wb25lbnQsIHsgbWl4aW4gfSBmcm9tICcuL0NvbXBvbmVudCwgbWl4aW4vJztcbmltcG9ydCBwcm9wIGZyb20gJy4vdi1wcm9wJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0SWRlbnRpZmllcixcblx0U2NvcGUsXG5cdFRlbXBsYXRlLFxuXHRSZW5kZXIsIFN0YXRpY1JlbmRlckZucyxcblx0U3R5bGUsIHJlbW92ZSxcblx0Q29tcG9uZW50LCBtaXhpbixcblx0cHJvcCxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRJZGVudGlmaWVyOiBJZGVudGlmaWVyLFxuXHRTY29wZTogU2NvcGUsXG5cdFRlbXBsYXRlOiBUZW1wbGF0ZSxcblx0UmVuZGVyOiBSZW5kZXIsIFN0YXRpY1JlbmRlckZuczogU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZTogU3R5bGUsIHJlbW92ZTogcmVtb3ZlLFxuXHRDb21wb25lbnQ6IENvbXBvbmVudCwgbWl4aW46IG1peGluLFxuXHRwcm9wOiBwcm9wLFxufSk7XG4iXSwibmFtZXMiOlsidmVyc2lvbiIsInVuZGVmaW5lZCIsImNyZWF0ZSIsIm93bktleXMiLCJhcHBseSIsImdldFByb3RvdHlwZU9mIiwiZ2V0IiwiRGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUMsRUFBRSxFQUFFO0FBQzFILEdBQUcsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUM3QixHQUFHLElBQUksSUFBSSxTQUFTO0FBQ3BCLEdBQUcsS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdkcsUUFBUSxFQUFFLE1BQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQzdELEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDMUIsR0FBRyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN2RyxRQUFRLEVBQUUsTUFBTSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDN0QsR0FBRyxNQUFNLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQzlELEdBQUcsTUFBTSxJQUFJLElBQUksT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtBQUMvRCxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUNBLFFBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMvQyxHQUFHO0FBQ0gs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QUFHRCxXQUFTLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDaEosRUFBRTtBQUNGLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxVQUFVLEVBQUUsSUFBSTtBQUNsQixFQUFFLEtBQUssRUFBRSxTQUFTLElBQUksRUFBRSxFQUFFLE9BQU8sT0FBTyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsR0FBR0EsV0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3pJLEVBQUU7QUFDRixDQUFDLE9BQU8sRUFBRTtBQUNWLEVBQUUsVUFBVSxFQUFFLElBQUk7QUFDbEIsRUFBRSxLQUFLLEVBQUUsU0FBUyxPQUFPLEVBQUUsRUFBRSxPQUFPLE9BQU8sT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUdBLFdBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1SSxFQUFFO0FBQ0YsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNuQixFQUFFLFVBQVUsRUFBRSxJQUFJO0FBQ2xCLEVBQUUsS0FBSyxFQUFFLFNBQVMsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLE9BQU8sT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUdBLFdBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNySixFQUFFO0FBQ0YsQ0FBQyxDQUFDLENBQUM7O0FDRkgsZ0JBQWVNLFNBQU8sQ0FBQztBQUN2QixDQUFDLE9BQU8sRUFBRSxPQUFPO0FBQ2pCLENBQUMsVUFBVSxFQUFFLFVBQVU7QUFDdkIsQ0FBQyxLQUFLLEVBQUUsS0FBSztBQUNiLENBQUMsUUFBUSxFQUFFLFFBQVE7QUFDbkIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxlQUFlO0FBQ2pELENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtBQUM3QixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUs7QUFDbkMsQ0FBQyxJQUFJLEVBQUUsSUFBSTtBQUNYLENBQUMsQ0FBQzs7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvRnJvbnRFbmRSdW50aW1lRGVwZW5kZW5jeS8ifQ==