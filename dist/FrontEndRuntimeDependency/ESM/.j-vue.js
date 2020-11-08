/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：16.0.0
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
import Map from '.Map?';
import WeakMap from '.WeakMap?';
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
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import ownKeys from '.Reflect.ownKeys?';
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import getPrototypeOf from '.Object.getPrototypeOf';
import propertyIsEnumerable from '.Object.prototype.propertyIsEnumerable';
import Default$1 from '.default';

var version = '16.0.0';

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

function proData (constructor          , self         , symbolMethods                      , Vue3                   , names       , shadowAssigner                       ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	var accessCache = _ && _.accessCache;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = create$1(NULL)        ;
	if ( accessCache ) {
		for ( var name in ctx ) {
			if ( !( name in names ) ) {
				data[name] = ctx[name                 ];
				if ( name in accessCache ) { accessCache[name                 ] = undefined$1; }
			}
		}
	}
	else {
		var keys = Keys(ctx);
		var index = keys.length;
		do {
			var key = keys[--index];
			if ( !( key in names ) && key[0]!=='$' && key[0]!=='_' ) { data[key] = ctx[key]; }
		}
		while ( index );
	}
	shadowAssigner && shadowAssigner(self, data);
	return data;
	
}

function devData (constructor          , self         , symbolMethods                      , Vue3                   , names       , shadowAssigner                       , shadowChecker                           , __dev__         ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	var proto = getPrototypeOf(ctx);
	var accessCache = _ && _.accessCache;
	var oldDescriptors = assign(create$1(NULL), getOwnPropertyDescriptors(ctx), symbolMethods);
	defineProperties(ctx, symbolMethods || {});
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	ownKeys(oldDescriptors).forEach(function (key) {
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
	var difKeys = ownKeys(ctx).filter(function (key) {
		return !( key in oldDescriptors );
	});
	difKeys.forEach(function (key) {
		if ( key in proto && !( key in {} ) || key in names ) { throw Error(__dev__.runtime_redefined); }
		if ( typeof key==='symbol' ) { throw Error(__dev__.runtime_symbol); }
		if ( key[0]==='_' || key[0]==='$' ) { throw Error(__dev__.runtime_reserved); }
		if ( !propertyIsEnumerable.call(ctx, key)) { throw Error(__dev__.runtime_enumerable); }
	});
	
	var data = create$1(NULL)        ;
	difKeys.forEach(function (key) {
		( data         )[key] = ctx[key];
		if ( accessCache && key in accessCache ) { accessCache[key] = undefined$1; }
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

                                                               
function ShadowChecker (            along        , names       , __dev__         )                {
	var index = along.indexOf('.');
	var toName = index<0 ? along.slice(0, index) : along;
	if ( toName in names ) { throw Error(__dev__.compile_shadow); }
	return index<0
		? function (            data      ) {
			if ( hasOwnProperty.call(data, toName + '$get') || hasOwnProperty.call(data, toName + '$set') ) { throw Error(__dev__.runtime_shadow); }
		}
		: function (            data      ) {
			if ( hasOwnProperty.call(data, toName) ) { throw Error(__dev__.runtime_shadow); }
		};
}

function mixin (          ) { return arguments.length ? /*#__PURE__*/apply$1(__PURE__, null, arguments       ) : Component; }
var Component           = /*#__PURE__*/freeze(/*#__PURE__*/defineProperties(
	function () { return that; },
	{
		prototype: {
			configurable: false,
			enumerable: false,
			value: null,
		},
		render: {
			enumerable: true,
			get: undefined$1,
			set: function render (value                     ) { ( that ._ || that .$options ).render = value; },
		},
		_: {
			enumerable: false,
			value: function toOptions (                Vue3        , __dev__                                               ) {
				if ( !( this instanceof ClassAPI ) ) { throw Error('!( this instanceof Component )._()'); }
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
				TMP_OPTIONS.forEach(function (optionsValue, constructorKey) { DID_OPTIONS.set(constructorKey, optionsValue); });
				return options;
			},
		},
	}
));

function ToOptions (constructor          , Vue3                   , __dev__                , DID_OPTIONS                               , TMP_OPTIONS                           )             {
	
	var options                         = DID_OPTIONS.get(constructor) || TMP_OPTIONS.get(constructor);
	if ( options ) { return options; }
	options = create$1(NULL)              ;
	
	if ( isMixins(constructor) ) {
		var static_mixins = constructor[_mixins] ;
		var mixins = options.mixins = []                ;
		var index = 0;
		while ( mixins.length!==static_mixins.length ) {
			var mixin = static_mixins[index++];
			if ( mixin instanceof ClassAPI ) {
				var mixinOptions = ToOptions(mixin, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
				if ( isMixins(mixin) ) {
					var mixinMixins = mixinOptions.mixins ;
					var mixinIndex = 0;
					while ( mixinIndex!==mixinMixins.length ) { mixins[mixins.length] = mixinMixins[mixinIndex++]; }
				}
				else { mixins[mixins.length] = mixinOptions; }
			}
			else { mixins[mixins.length] = mixin              ; }
		}
		collectNames(options);
		return options;
	}
	
	var Super = OPTIONS.supers.get(constructor);
	if ( !Super ) {
		OPTIONS.supers.set(constructor, Super = getPrototypeOf$1(constructor));
		Super===Component || isMixins(Super) || setPrototypeOf(constructor, Component);
	}
	if ( Super!==Component ) {
		var SuperOptions = ToOptions(Super, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS);
		isMixins(Super)
			? options.mixins .length===1
				? options.extends = SuperOptions.mixins [0]
				: options.mixins = SuperOptions.mixins
			: options.extends = SuperOptions;
	}
	
	var prototype = constructor.prototype;
	
	options.data = __dev__
		? function (self      ) { return devData(constructor, self           , symbolMethods, Vue3, names, shadowAssigner, shadowChecker, __dev__); }
		: function (self      ) { return proData(constructor, self           , symbolMethods, Vue3, names, shadowAssigner); };
	
	var set                = __dev__ ? devSet.bind(__dev__) : proSet;
	var assertFunction                           = __dev__ ? devAssertFunction.bind(__dev__) : proAssertFunction;
	
	var staticNames = getOwnPropertyNames(constructor);
	index = staticNames.length;
	var shadowAssigner                        = null;
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
		else if ( staticName!=='prototype' ) {
			if ( __dev__ ) {
				if ( staticName[0]==='_' ) { throw Error(__dev__.compile_reserved); }
				if (
					//@ts-ignore
					staticName==='setup' || staticName==='watch' || staticName==='methods' || staticName==='computed' || staticName==='extends' || staticName==='data' || staticName==='mixins' ||
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
	
	var protoNames = getOwnPropertyNames(prototype);
	index = protoNames.length;
	var watchers            = [];
	while ( index ) {
		var protoName = protoNames[--index];
		if ( protoName[0]==='_' && !protoName.startsWith('_watch:') ) {
			if ( __dev__ ) {
				var protoName1 = protoName.slice(1);
				if ( protoName1[0]==='_' ) { throw Error(__dev__.compile_reserved); }
				if (
					protoName1==='setup' || protoName1==='watch' || protoName1==='methods' || protoName1==='computed' || protoName1==='extends' || protoName1==='data' || protoName1==='mixins' ||
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
				var indexOfQ = protoName.search(WATCH_OPTIONS);
				var watcher = watchers[watchers.length] = create$1(NULL)           ;
				if ( descriptor.hasOwnProperty('value') ) {
					watcher.$ = indexOfQ<0
						? protoName.slice(7)
						: protoName.slice(7, indexOfQ);
					watcher.handler = assertFunction(descriptor.value);
				}
				else {
					watcher.$ = assertFunction(descriptor.get);
					watcher.handler = assertFunction(descriptor.set);
				}
				if ( indexOfQ>0 ) {
					++indexOfQ;
					do {
						var indexOfA = protoName.indexOf(';', indexOfQ);
						var pair = indexOfA<0
							? protoName.slice(indexOfQ)
							: protoName.slice(indexOfQ, indexOfA);
						indexOfQ = indexOfA + 1;
						var indexOfE = pair.indexOf('=');
						indexOfE<0
							? watcher[pair] = true
							: watcher[pair.slice(0, indexOfE)] = pair.slice(indexOfE + 1);
					}
					while ( indexOfQ );
				}
			}
			else {
				if ( __dev__ ) {
					if ( protoName[0]==='$' ) { throw Error(__dev__.compile_reserved); }
				}
				descriptor.hasOwnProperty('value')
					? protoName==='constructor' && descriptor.value===constructor || set(options.methods || ( options.methods = create$1(NULL)                                       ), protoName, assertFunction(descriptor.value))
					: set(options.computed || ( options.computed = create$1(NULL)                                        ), protoName, descriptor.set ? {
						get: descriptor.get,
						set: descriptor.set
					} : descriptor.get);
			}
		}
	}
	
	var protoSymbols = getOwnPropertySymbols(prototype)                   ;
	index = protoSymbols.length;
	var symbolMethods = index ? create$1(NULL)                                                    : null;
	while ( index ) {
		var protoSymbol                = protoSymbols[--index];
		symbolMethods [protoSymbol] = assign(create$1(NULL), getOwnPropertyDescriptor(prototype, protoSymbol));
	}
	
	if ( watchers.length ) {
		var created = options.created;
		options.created = created
			? function watchBeforeCreated (          ) {
				$watch(this, watchers);
				return created .call(this);
			}
			: function watchBeforeCreated (          ) { $watch(this, watchers); };
	}
	
	if ( Render ) {
		if ( Vue3 ) {
			var shadow                     = Render.shadow;
			options.render = assertFunction(new Render(Vue3));
			if ( shadow ) { shadowAssigner = ShadowAssigner(shadow); }
		}
		else {
			if ( !options.render && !options.template ) {
				options.render = __dev__ ? function () { throw Error(__dev__.render); } : render;
			}
		}
	}
	
	var names = collectNames(options);
	
	if ( __dev__ ) {
		getOwnPropertySymbols(constructor).forEach(function (symbol) {
			if ( symbol!==_mixins && !( symbol in SYMBOLS ) ) { throw Error(__dev__.compile_symbol); }
		});
		check(options, names, __dev__);
		if ( shadow ) { var shadowChecker                            = ShadowChecker(shadow, names, __dev__); }
	}
	
	TMP_OPTIONS.set(constructor, options);
	
	if ( options.components ) {
		var components = options.components = assign(create$1(NULL), options.components);
		for ( var name in components ) {
			if ( __dev__ ) {
				if ( !STARTS_WITH_UPPER_CASE.test(name) ) { throw Error(__dev__.compile_name); }
			}
			var value = components[name];
			if ( value instanceof ClassAPI ) { components[name] = ToOptions(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS); }
		}
	}
	
	return options;
	
}

function render ()        { throw Error('render'); }

var SYMBOLS = /*#__PURE__*/getOwnPropertyNames(Symbol).reduce(function (SYMBOLS, name) {
	if ( typeof Symbol[name]==='symbol' ) { SYMBOLS[Symbol[name]                 ] = null; }
	return SYMBOLS;
}, create$1(NULL)                         );

function check (options            , names       , __dev__         ) {
	
	var name        ;
	
	//@ts-ignore
	if ( ( name = options.name ) ) {
		if (
			!STARTS_WITH_UPPER_CASE.test(name)
			||
			options.components && name in options.components
		) { throw Error(__dev__.compile_name); }
	}
	
	if ( options.props ) {
		if ( isArray(options.props) ) { options.props.forEach(function (name) { if ( /-|^(?:key$|[oO][nN]|ref$)/.test(name) ) { throw Error(__dev__.compile_props); } }); }
		else { for ( name in options.props ) { if ( /-|^(?:key$|[oO][nN]|ref$)/.test(name) ) { throw Error(__dev__.compile_props); } } }
	}
	
	options.emits &&
	( isArray(options.emits) ? options.emits : Keys(options.emits) ).forEach(function (event) {
		if ( /[A-Z]|^onvnode|(?:capture|once|passive)$/.test('on' + event) ) { throw Error(__dev__.compile_emits); }
	});
	
	if (
		options.directives && 'is' in options.directives// 2
		||//@ts-ignore
		options.props && ( isArray(options.props) ? options.props.includes('is') : 'is' in options.props )// 3
	) { throw Error(__dev__.compile_is); }
	
}

function isMixins (constructor          ) { return apply$1(hasOwnProperty, constructor, _MIXINS); }

var _mixins                = Symbol && /*#__PURE__*/Symbol('_mixins')                 ;
var _MIXINS = [ _mixins ]         ;
var __PURE__ = /*#__PURE__*/function () {
	try {
		return Function('Component,_mixins', '"use strict";\
return(...mixins)=>\
class extends Component{\
constructor(){return Component()}\
static get[_mixins](){return mixins}\
}\
')(Component, _mixins);
	}
	catch (error) {}
}();

var STARTS_WITH_UPPER_CASE = /^[A-Z]/;
var ARGS = []         ;

var OPTIONS = WeakMap && /*#__PURE__*/function () {
	try {
		return Function('WeakMap,Map', '"use strict";\
class EasyMap extends WeakMap{\
into(key){\
let sub=this.get(key);\
sub??this.set(key,sub=new EasyMap);\
return sub\
}\
}\
EasyMap.prototype.get=WeakMap.prototype.get;\
EasyMap.prototype.set=WeakMap.prototype.set;\
class StrongMap extends Map{}\
StrongMap.prototype.get=Map.prototype.get;\
StrongMap.prototype.set=Map.prototype.set;\
StrongMap.prototype.forEach=Map.prototype.forEach;\
return{\
objects:new EasyMap,\
objectsTmp:StrongMap,\
supers:new EasyMap,\
names:new EasyMap\
}\
')(WeakMap,Map);
	}
	catch (error) {}
}()     
	                                                                         
	                                                  
	                                    
	                                  
 ;
                                                                                  

var ClassAPI = function () {}                                                         ;
ClassAPI.prototype = Component;

var WATCH_OPTIONS = /;[a-z;=]*$/;
function $watch (that      , watchers                    ) {
	var index = watchers.length;
	do {
		var watcher      = watchers[--index];
		that.$watch(watcher.$, watcher.handler, watcher);
	}
	while ( index );
}

                                                
function collectNames (options            )        {
	var names                    = OPTIONS.names.get(options);
	if ( !names ) {
		names = create$1(NULL)         ;
		var props = options.props;
		var name        ;
		if ( isArray(props) ) { for ( index = props.length; index; ) { name = props[--index]; names[name] = null; } }
		else { for ( name in props ) { names[name] = null; } }
		props = options.inject;
		if ( isArray(props) ) { for ( index = props.length; index; ) { name = props[--index]; names[name] = null; } }
		else { for ( name in props ) { names[name] = null; } }
		for ( name in options.methods ) { names[name] = null; }
		for ( name in options.computed ) { names[name] = null; }
		var extend = options.extends;
		if ( extend ) {
			mixin = collectNames(extend);
			assign(names, mixin);
		}
		var mixins = options.mixins;
		if ( mixins ) {
			var index = mixins.length;
			while ( index ) {
				var mixin = collectNames(mixins[--index]);
				assign(names.exceptData, mixin.exceptData);
			}
		}
		OPTIONS.names.set(options, names);
	}
	return names;
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

var DEV = [
	'compile_name',
	'compile_props',
	'compile_emits',
	'compile_is',
	'compile_layout',
	'compile_reserved',
	'compile_redefined',
	'compile_type',
	'compile_symbol',
	'compile_shadow',
	'render',
	'runtime_shadow',
	'runtime_redefined',
	'runtime_symbol',
	'runtime_reserved',
	'runtime_enumerable',
]         ;

var _export$1 = Default$1({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
});

export default _export$1;
export { Component, Identifier, Render, Scope, StaticRenderFns, Style, Template, mixin, remove, version };

/*¡ j-vue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIi4uLy4uL2xpYi9jc3Mta2V5d29yZHMvZGlzdC5qcyIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvdmVyc2lvbj90ZXh0IiwiLi4vLi4vLi4vai1yZWdleHAvc3JjL25ld1JlZ0V4cC50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9jbGVhclJlZ0V4cC50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9ncm91cGlmeS50cyIsIi4uLy4uLy4uL2otcmVnZXhwL3NyYy9leHBvcnQudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9EeW5hbWljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCJDb21wb25lbnQsIG1peGluL0RhdGEudHMiLCJDb21wb25lbnQsIG1peGluL1NoYWRvdy50cyIsIkNvbXBvbmVudCwgbWl4aW4vLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0JzE2LjAuMCc7IiwiZXhwb3J0IGRlZmF1bHQgW1xuXHQnYWxsJyxcblx0J2xhbycsXG5cdCdhdXRvJyxcblx0J2Rpc2MnLFxuXHQnbm9uZScsXG5cdCdzcGFuJyxcblx0J3RoYWknLFxuXHQna2htZXInLFxuXHQnb3JpeWEnLFxuXHQndGFtaWwnLFxuXHQndW5zZXQnLFxuXHQnY2lyY2xlJyxcblx0J2hlYnJldycsXG5cdCdpbmxpbmUnLFxuXHQncmV2ZXJ0Jyxcblx0J3NxdWFyZScsXG5cdCd0ZWx1Z3UnLFxuXHQnYmVuZ2FsaScsXG5cdCdkZWNpbWFsJyxcblx0J2RlZmF1bHQnLFxuXHQnaW5oZXJpdCcsXG5cdCdpbml0aWFsJyxcblx0J2thbm5hZGEnLFxuXHQnbXlhbm1hcicsXG5cdCdvdXRzaWRlJyxcblx0J3BlcnNpYW4nLFxuXHQndGliZXRhbicsXG5cdCdhcm1lbmlhbicsXG5cdCdjb250ZW50cycsXG5cdCdnZW9yZ2lhbicsXG5cdCdndWphcmF0aScsXG5cdCdndXJtdWtoaScsXG5cdCdoaXJhZ2FuYScsXG5cdCdrYXRha2FuYScsXG5cdCdjYW1ib2RpYW4nLFxuXHQnbWFsYXlhbGFtJyxcblx0J21vbmdvbGlhbicsXG5cdCdkZXZhbmFnYXJpJyxcblx0J25vdHJhbnNsYXRlJyxcbl07IiwiaW1wb3J0IENTU19LRVlXT1JEUyBmcm9tICdsaWI6Y3NzLWtleXdvcmRzJztcblxudmFyIGluY3JlYXNlRGljdGlvbmFyeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBsYXRlc3RJZGVudGlmaWVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbICc5JyBdO1xudmFyIGxhc3RDaGFyYWN0ZXIgICAgICAgICAgICAgICAgICAgICAgICA9ICc5JztcbnZhciBsYXN0SW5kZXggICAgICAgICA9IDA7XG5cbnZhciBjc3Nfa2V5d29yZCAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGxhdGVzdElkZW50aWZpZXIuam9pbiA9IGxhdGVzdElkZW50aWZpZXIuam9pbjtcblx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0ID0gbGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0O1xuXHRDU1NfS0VZV09SRFMuc2hpZnQgPSBDU1NfS0VZV09SRFMuc2hpZnQ7XG5cdHJldHVybiBDU1NfS0VZV09SRFMuc2hpZnQoKSA7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIElkZW50aWZpZXIgKCkgICAgICAgICB7XG5cdFxuXHRpZiAoIGxhc3RDaGFyYWN0ZXI9PT0neicgKSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggICAgICAgICA9IGxhc3RJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICAgICAgICAgICAgICAgICA9IGxhdGVzdElkZW50aWZpZXJbLS1jaGFyYWN0ZXJJbmRleF07XG5cdFx0XHRcdGlmICggY2hhcmFjdGVyPT09J3onICkgeyBsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtjaGFyYWN0ZXJdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0KCdhJyk7XG5cdFx0XHRcdCsrbGFzdEluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0dmFyIGlkZW50aWZpZXIgICAgICAgICA9IGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdGlmICggaWRlbnRpZmllcj09PWNzc19rZXl3b3JkICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3RlciAgICAgICAgICAgICBdO1xuXHRcdGlkZW50aWZpZXIgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRcdGNzc19rZXl3b3JkID0gQ1NTX0tFWVdPUkRTLnNoaWZ0KCkgfHwgbnVsbDtcblx0fVxuXHRyZXR1cm4gaWRlbnRpZmllcjtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJleHBvcnQgZGVmYXVsdCAnOC4wLjAnOyIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pz0nO1xuaW1wb3J0IFRIUk9XIGZyb20gJy50aHJvdyc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XS9nO1xudmFyIFNFQVJDSF9FU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIHJhdyA9IHRlbXBsYXRlLnJhdztcblx0dmFyIHNvdXJjZSA9IHJhd1swXTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHZhciBpbmRleCA9IDE7XG5cdGlmICggdGhpcy51bmljb2RlICkge1xuXHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdFx0dmFyIHZhbHVlID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRcdHNvdXJjZSArPSAoIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnID8gdmFsdWUgOiB2YWx1ZS5zb3VyY2UgfHwgVEhST1coVHlwZUVycm9yKHR5cGVvZiB2YWx1ZSkpICkgKyByYXdbaW5kZXgrK10ucmVwbGFjZShTRUFSQ0hfRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKTtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBhcmd1bWVudHNbaW5kZXhdO1xuXHRcdFx0c291cmNlICs9ICggdHlwZW9mIHZhbHVlPT09J3N0cmluZycgPyB2YWx1ZSA6IHZhbHVlLnNvdXJjZSB8fCBUSFJPVyhUeXBlRXJyb3IodHlwZW9mIHZhbHVlKSkgKSArIHJhd1tpbmRleCsrXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIFJlZ0V4cChzb3VyY2UucmVwbGFjZShOVCwgJycpLCB0aGlzLmZsYWdzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmV3UmVnRXhwICh0ZW1wbGF0ZV9mbGFncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0aWYgKCB0eXBlb2YgdGVtcGxhdGVfZmxhZ3M9PT0nb2JqZWN0JyApIHtcblx0XHRyZXR1cm4gLyojX19QVVJFX18qLyBhcHBseShSRSwgeyBmbGFnczogJycsIHVuaWNvZGU6IGZhbHNlIH0sIGFyZ3VtZW50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdH1cblx0dmFyIGNvbnRleHQgICAgICAgICAgPSB7IGZsYWdzOiB0ZW1wbGF0ZV9mbGFncywgdW5pY29kZTogLyojX19QVVJFX18qLyB0ZW1wbGF0ZV9mbGFncy5pbmRleE9mKCd1Jyk+PTAgfTtcblx0cmV0dXJuIGZ1bmN0aW9uIG5ld1JlZ0V4cCAodGVtcGxhdGUgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHRyZXR1cm4gLyojX19QVVJFX18qLyBhcHBseShSRSwgY29udGV4dCwgYXJndW1lbnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0fTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJytjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgbmV3UmVnRXhwIGZyb20gJy4vbmV3UmVnRXhwJztcbmltcG9ydCBjbGVhclJlZ0V4cCBmcm9tICcuL2NsZWFyUmVnRXhwJztcbmltcG9ydCBncm91cGlmeSBmcm9tICcuL2dyb3VwaWZ5JztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0bmV3UmVnRXhwLFxuXHRjbGVhclJlZ0V4cCxcblx0Z3JvdXBpZnksXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRuZXdSZWdFeHA6IG5ld1JlZ0V4cCxcblx0Y2xlYXJSZWdFeHA6IGNsZWFyUmVnRXhwLFxuXHRncm91cGlmeTogZ3JvdXBpZnlcbn0pO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sPyc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbnZhciBfICAgICAgPSBTeW1ib2wgPyAvKiNfX1BVUkVfXyovU3ltYm9sKCdfJykgICAgICAgIDogJ18nO1xuXG5mdW5jdGlvbiAkICAgICAgICAgICAgICAgICAgKCAgICAgICAgIGNzcyAgICAgICAgICwgbWVkaWEgICAgICAgICApICAgIHtcblx0dmFyIHN0eWxlICAgICAgICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gdGhpc1tfXShjc3MpOyB9XG5cdGlmICggbWVkaWEhPT11bmRlZmluZWQgKSB7IHN0eWxlLm1lZGlhID0gbWVkaWE7IH1cblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgeyBfLCAkIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBwcmVwYXJlXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHR5cGVvZiBfPT09J3N5bWJvbCcgPyBudWxsIDogLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIF9kZXNjcmlwdG9yID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgIDtcblx0X2Rlc2NyaXB0b3IudmFsdWUgPSBudWxsO1xuXHRfZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cdF9kZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuXHRfZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuXHRyZXR1cm4gZnVuY3Rpb24gJCAoc2NvcGUgICAgICAgKSB7IGRlZmluZVByb3BlcnR5KHNjb3BlLCBfLCBfZGVzY3JpcHRvcik7IH07XG59KCk7XG5cbmZ1bmN0aW9uIFNlYXJjaCAoa2V5cyAgICAgICAgICApIHsgcmV0dXJuIG5ldyBSZWdFeHAoJ19fJyArIGdyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSArICdfXycsICdnJyk7IH1cbmZ1bmN0aW9uIFJlcGxhY2VyIChzY29wZSAgICAgICAgICAgICApIHsgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2VyIChfX2tleV9fICAgICAgICApICAgICAgICAgeyByZXR1cm4gc2NvcGVbX19rZXlfXy5zbGljZSgyLCAtMildOyB9OyB9XG5cbnZhciBTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICApICAgICAgIHtcblx0cHJlcGFyZV8gJiYgcHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG59ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG52YXIgU0NPUEUgICAgICAgICAgICAgID0gU3RhdGljU2NvcGUucHJvdG90eXBlID0gLyojX19QVVJFX18qL2ZyZWV6ZShjcmVhdGUobnVsbCwge1xuXHQkOiB7IHZhbHVlOiAkLCB3cml0YWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IGZhbHNlIH0sXG59KSAgICAgICAgICAgICAgICk7XG5cbnZhciBJbmhlcml0ZWRTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIEluaGVyaXRlZFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICAsIHByb3RvICAgICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICggKi9cblx0XHRrZXlzW2tleXMubGVuZ3RoXSA9IGtleS8qICkqLztcblx0fVxuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IHsgU3RhdGljU2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRTdGF0aWNTY29wZSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgU3RhdGljU2NvcGUgfSBmcm9tICcuL1N0YXRpY1Njb3BlJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgU0VBUkNIID0gL19fW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSpfXy9pZztcblxuZnVuY3Rpb24gZ2V0IChjYWNoZSAgICAgICAgICAgICAsIGtleSAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGNhY2hlW2tleV0gfHwgKCBjYWNoZVtrZXldID0gSWRlbnRpZmllcigpICk7IH1cblxuZnVuY3Rpb24gc2NvcGlmeSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgLCBjYWNoZSAgICAgICAgICAgICApICAgICAgICAge1xuXHR2YXIga2V5cyAgICAgICAgLFxuXHRcdGluZGV4ICAgICAgICAsXG5cdFx0dmFsdWVzICAgICAgICAgICxcblx0XHRrZXkgICAgICAgIDtcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBnZXQoY2FjaGUsIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWUuc3BsaXQoJyAnKTtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlcy5sZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlWy0taW5kZXhdO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBnZXQoY2FjaGUsIGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVstLWluZGV4XSwgY2FjaGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtrZXldICkgeyBrZXlzICs9ICcgJytnZXQoY2FjaGUsIGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIER5bmFtaWNTY29wZSAoY2FjaGUgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlID0gZnVuY3Rpb24gc2NvcGUgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7XG5cdFx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0aWYgKCBsZW5ndGg+MSApIHtcblx0XHRcdHZhbHVlID0gWyB2YWx1ZSwgYXJndW1lbnRzWzFdIF07XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggPSAyOyBpbmRleCE9PWxlbmd0aDsgKytpbmRleCApIHsgKCB2YWx1ZSAgICAgICAgICApW2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleF07IH1cblx0XHR9XG5cdFx0cmV0dXJuIHNjb3BpZnkodmFsdWUsIGNhY2hlKTtcblx0fSAgICAgICAgICAgICAgICA7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoU0VBUkNILCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBnZXQoY2FjaGUsIF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IER5bmFtaWNTY29wZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG4iLCJleHBvcnQgZGVmYXVsdCAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBTdGF0aWNTY29wZSwgSW5oZXJpdGVkU3RhdGljU2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgRHluYW1pY1Njb3BlIGZyb20gJy4vRHluYW1pY1Njb3BlJztcbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5cbnZhciBFTVBUWSAgICAgICAgICAgPSBbXTtcblxuZnVuY3Rpb24gbWl4IChwcm90b3MgICAgICAgICApICAgICAgICAgICAgICB7XG5cdHZhciBzY29wZSAgICAgICAgICAgICAgPSBjcmVhdGUoU0NPUEUpO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBwcm90b3MubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgcHJvdG8gICAgICAgID0gcHJvdG9zW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiBwcm90bz09PSdmdW5jdGlvbicgKSB7IHByb3RvID0gcHJvdG8ucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZnVuY3Rpb24gU2NvcGUgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICApICAgICAgICB7XG5cdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBEeW5hbWljU2NvcGUobWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSAgICAgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG59XG5TY29wZS5wcm90b3R5cGUgPSBudWxsICAgICAgIDtcblxuZXhwb3J0IHsgU2NvcGUgYXMgZGVmYXVsdCwgS0VZUyB9OyIsImltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCAgICAgICAgLCBzY29wZSAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qL3Njb3BlW19dKGh0bWwpO1xufVxuXG5leHBvcnQgeyBUZW1wbGF0ZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG52YXIgTk9UX0VTNSA9IC9eKGNvbnN8bGUpdCAvO1xuXG5mdW5jdGlvbiBXaXRoU3RyaXBwZWQgKHJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZTtcblx0cmV0dXJuIHJlbmRlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyIChjb2RlICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRyZXR1cm4gY29kZVswXT09PScoJ1xuXHRcdD8gLyojX19QVVJFX18qL0Z1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm4gY2xhc3MgUmVuZGVyIGV4dGVuZHMgbnVsbHtjb25zdHJ1Y3RvcicrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfTsnKSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdDogLyojX19QVVJFX18qL1dpdGhTdHJpcHBlZChcblx0XHRcdC8qI19fUFVSRV9fKi9GdW5jdGlvbihOT1RfRVM1LnRlc3QoY29kZSlcblx0XHRcdFx0PyAnXCJ1c2Ugc3RyaWN0XCI7cmV0dXJue3JlbmRlcigpeycrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfX0ucmVuZGVyOydcblx0XHRcdFx0OiAnXCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uIHJlbmRlcigpeycrKHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSsnfTsnXG5cdFx0XHQpKCkgICAgICAgICAgXG5cdFx0KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBTdGF0aWNSZW5kZXJGbnMgKGNvZGVzICAgICAgICAgICAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgIHtcblx0dmFyIGluZGV4ICAgICAgICAgPSBjb2Rlcy5sZW5ndGg7XG5cdHZhciBib2R5ICAgICAgICAgPSAnXSc7XG5cdGlmICggc2NvcGUgKSB7XG5cdFx0Zm9yICggdmFyIHNjb3BlXyA9IHNjb3BlW19dOyBpbmRleDsgKSB7IGJvZHkgPSAnZnVuY3Rpb24oKXsnK3Njb3BlXyhjb2Rlc1stLWluZGV4XSkrJ30sJytib2R5OyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleCApIHsgYm9keSA9ICdmdW5jdGlvbigpeycrY29kZXNbLS1pbmRleF0rJ30sJytib2R5OyB9XG5cdH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bJytib2R5KSgpO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3R5bGUgKGNzcyAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlW19dKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IEtleXMgZnJvbSAnLk9iamVjdC5rZXlzJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXM/JztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24/JztcbmltcG9ydCBnZXRQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LmdldFByb3RvdHlwZU9mJztcbmltcG9ydCBwcm9wZXJ0eUlzRW51bWVyYWJsZSBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuZXhwb3J0IHZhciB0aGF0ICAgICAgICAgICAgICAgICA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9EYXRhIChjb25zdHJ1Y3RvciAgICAgICAgICAsIHNlbGYgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgICAgICAgICAgICAgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgbmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHZhciBhY2Nlc3NDYWNoZSA9IF8gJiYgXy5hY2Nlc3NDYWNoZTtcblx0c3ltYm9sTWV0aG9kcyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgc3ltYm9sTWV0aG9kcyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdHZhciBkYXRhID0gY3JlYXRlKE5VTEwpICAgICAgICA7XG5cdGlmICggYWNjZXNzQ2FjaGUgKSB7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIG5hbWVzICkgKSB7XG5cdFx0XHRcdGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRcdFx0aWYgKCBuYW1lIGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBrZXlzID0gS2V5cyhjdHgpO1xuXHRcdHZhciBpbmRleCA9IGtleXMubGVuZ3RoO1xuXHRcdGRvIHtcblx0XHRcdHZhciBrZXkgPSBrZXlzWy0taW5kZXhdO1xuXHRcdFx0aWYgKCAhKCBrZXkgaW4gbmFtZXMgKSAmJiBrZXlbMF0hPT0nJCcgJiYga2V5WzBdIT09J18nICkgeyBkYXRhW2tleV0gPSBjdHhba2V5XTsgfVxuXHRcdH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdH1cblx0c2hhZG93QXNzaWduZXIgJiYgc2hhZG93QXNzaWduZXIoc2VsZiwgZGF0YSk7XG5cdHJldHVybiBkYXRhO1xuXHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldkRhdGEgKGNvbnN0cnVjdG9yICAgICAgICAgICwgc2VsZiAgICAgICAgICwgc3ltYm9sTWV0aG9kcyAgICAgICAgICAgICAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCBuYW1lcyAgICAgICAsIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICAsIHNoYWRvd0NoZWNrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0dmFyIHByb3RvID0gZ2V0UHJvdG90eXBlT2YoY3R4KTtcblx0dmFyIGFjY2Vzc0NhY2hlID0gXyAmJiBfLmFjY2Vzc0NhY2hlO1xuXHR2YXIgb2xkRGVzY3JpcHRvcnMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGN0eCksIHN5bWJvbE1ldGhvZHMpO1xuXHRkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgc3ltYm9sTWV0aG9kcyB8fCB7fSk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdG93bktleXMob2xkRGVzY3JpcHRvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciBvbGREZXNjcmlwdG9yID0gb2xkRGVzY3JpcHRvcnNba2V5XSA7XG5cdFx0dmFyIG5ld0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBrZXkgICAgICAgICAgICAgICAgICk7XG5cdFx0aWYgKFxuXHRcdFx0IW5ld0Rlc2NyaXB0b3IgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlIT09b2xkRGVzY3JpcHRvci5jb25maWd1cmFibGUgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuZW51bWVyYWJsZSE9PW9sZERlc2NyaXB0b3IuZW51bWVyYWJsZSB8fFxuXHRcdFx0KCBuZXdEZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0PyBuZXdEZXNjcmlwdG9yLnZhbHVlIT09b2xkRGVzY3JpcHRvci52YWx1ZSB8fCBuZXdEZXNjcmlwdG9yLndyaXRhYmxlIT09b2xkRGVzY3JpcHRvci53cml0YWJsZVxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdDogbmV3RGVzY3JpcHRvci5nZXQhPT1vbGREZXNjcmlwdG9yLmdldCB8fCBuZXdEZXNjcmlwdG9yLnNldCE9PW9sZERlc2NyaXB0b3Iuc2V0XG5cdFx0XHQpXG5cdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdH0pO1xuXHR2YXIgZGlmS2V5cyA9IG93bktleXMoY3R4KS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdHJldHVybiAhKCBrZXkgaW4gb2xkRGVzY3JpcHRvcnMgKTtcblx0fSk7XG5cdGRpZktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0aWYgKCBrZXkgaW4gcHJvdG8gJiYgISgga2V5IGluIHt9ICkgfHwga2V5IGluIG5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVkZWZpbmVkKTsgfVxuXHRcdGlmICggdHlwZW9mIGtleT09PSdzeW1ib2wnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc3ltYm9sKTsgfVxuXHRcdGlmICgga2V5WzBdPT09J18nIHx8IGtleVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoY3R4LCBrZXkpKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9lbnVtZXJhYmxlKTsgfVxuXHR9KTtcblx0XG5cdHZhciBkYXRhID0gY3JlYXRlKE5VTEwpICAgICAgICA7XG5cdGRpZktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0KCBkYXRhICAgICAgICAgKVtrZXldID0gY3R4W2tleV07XG5cdFx0aWYgKCBhY2Nlc3NDYWNoZSAmJiBrZXkgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW2tleV0gPSB1bmRlZmluZWQ7IH1cblx0fSk7XG5cdGlmICggc2hhZG93QXNzaWduZXIgKSB7XG5cdFx0c2hhZG93Q2hlY2tlciAoZGF0YSk7XG5cdFx0c2hhZG93QXNzaWduZXIoc2VsZiwgZGF0YSk7XG5cdH1cblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxudmFyIElOSVQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR2YXIgSU5JVCA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgIDtcblx0SU5JVC5tb2RlID0gJ29wZW4nO1xuXHRyZXR1cm4gSU5JVDtcbn0oKTtcblxuZnVuY3Rpb24gYXR0YWNoICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgeyByZXR1cm4gZWwgJiYgKCBlbC5zaGFkb3dSb290IHx8IGVsLmF0dGFjaFNoYWRvdyhJTklUKSApOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dBc3NpZ25lciAoICAgICAgICAgICAgYWxvbmcgICAgICAgICkgICAgICAgICAgICAgICAgIHtcblx0dmFyIGluZGV4ID0gYWxvbmcuaW5kZXhPZignLicpO1xuXHR2YXIgbmFtZXMgPSBpbmRleDwwID8gbnVsbCA6IGFsb25nLnNsaWNlKGluZGV4ICsgMSkuc3BsaXQoJy4nKTtcblx0dmFyIHRvTmFtZSA9IG5hbWVzID8gYWxvbmcuc2xpY2UoMCwgaW5kZXgpIDogYWxvbmc7XG5cdGlmICggbmFtZXMgKSB7XG5cdFx0aWYgKCBuYW1lcy5sZW5ndGg9PT0xICkge1xuXHRcdFx0dmFyIG5hbWUkZ2V0ID0gbmFtZXNbMF0gKyAnJGdldCc7XG5cdFx0XHR2YXIgbmFtZSRzZXQgPSBuYW1lc1swXSArICckc2V0Jztcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgICAgICAgICAgICAgICAgICAgICAsIGRhdGEgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdHZhciBhbGwgPSBkYXRhW3RvTmFtZV0gPSBjcmVhdGUoTlVMTCkgICAgICAgO1xuXHRcdFx0XHRhbGxbbmFtZSRzZXRdID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGVsICAgICAgICAgICAgICAgICAgICApIHsgc2VsZlt0b05hbWVdIFtuYW1lJGdldF0gPSBhdHRhY2goZWwpOyB9O1xuXHRcdFx0XHRhbGxbbmFtZSRnZXRdID0gbnVsbDtcblx0XHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0bmFtZXMgLmZvckVhY2goZnVuY3Rpb24gKG5hbWUgICAgICAgICkge1xuXHRcdFx0XHRcdGFsbFtuYW1lICsgJyRzZXQnXSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZV0gPSBhdHRhY2goZWwpOyB9O1xuXHRcdFx0XHRcdGFsbFtuYW1lICs9ICckZ2V0J10gPSBudWxsO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmFyIHRvTmFtZSRnZXQgPSB0b05hbWUgKyAnJGdldCc7XG5cdFx0dmFyIHRvTmFtZSRzZXQgPSB0b05hbWUgKyAnJHNldCc7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAsIGRhdGEgICAgICkge1xuXHRcdFx0ZGF0YVt0b05hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lJGdldF0gPSBhdHRhY2goZWwpOyB9O1xuXHRcdFx0ZGF0YVt0b05hbWUkZ2V0XSA9IG51bGw7XG5cdFx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHR9XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGZ1bmN0aW9uIFNoYWRvd0NoZWNrZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICAsIG5hbWVzICAgICAgICwgX19kZXZfXyAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHR2YXIgaW5kZXggPSBhbG9uZy5pbmRleE9mKCcuJyk7XG5cdHZhciB0b05hbWUgPSBpbmRleDwwID8gYWxvbmcuc2xpY2UoMCwgaW5kZXgpIDogYWxvbmc7XG5cdGlmICggdG9OYW1lIGluIG5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRyZXR1cm4gaW5kZXg8MFxuXHRcdD8gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCB0b05hbWUgKyAnJGdldCcpIHx8IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwgdG9OYW1lICsgJyRzZXQnKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9XG5cdFx0OiBmdW5jdGlvbiAoICAgICAgICAgICAgZGF0YSAgICAgICkge1xuXHRcdFx0aWYgKCBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIHRvTmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9zaGFkb3cpOyB9XG5cdFx0fTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbD8nO1xuaW1wb3J0IE1hcCBmcm9tICcuTWFwPyc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcD8nO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGdldFByb3RvdHlwZU9mIGZyb20gJy5SZWZsZWN0LmdldFByb3RvdHlwZU9mPz1PYmplY3QuZ2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gJy5PYmplY3Quc2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IGdldE93blByb3BlcnR5U3ltYm9scyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scz8nO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBnZXQgZnJvbSAnLlJlZmxlY3QuZ2V0Pyc7XG5pbXBvcnQgYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHk/JztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24/JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGtleXMgZnJvbSAnLk9iamVjdC5rZXlzJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyB0aGF0LCBwcm9EYXRhLCBkZXZEYXRhIH0gZnJvbSAnLi9EYXRhJztcbmltcG9ydCB7IFNoYWRvd0Fzc2lnbmVyLCBTaGFkb3dDaGVja2VyIH0gZnJvbSAnLi9TaGFkb3cnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW4gKCAgICAgICAgICApIHsgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAvKiNfX1BVUkVfXyovYXBwbHkoX19QVVJFX18sIG51bGwsIGFyZ3VtZW50cyAgICAgICApIDogQ29tcG9uZW50OyB9XG5cbmV4cG9ydCB7IENvbXBvbmVudCBhcyBkZWZhdWx0IH07XG52YXIgQ29tcG9uZW50ICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9mcmVlemUoLyojX19QVVJFX18qL2RlZmluZVByb3BlcnRpZXMoXG5cdGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoYXQ7IH0sXG5cdHtcblx0XHRwcm90b3R5cGU6IHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiBudWxsLFxuXHRcdH0sXG5cdFx0cmVuZGVyOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiB1bmRlZmluZWQsXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHJlbmRlciAodmFsdWUgICAgICAgICAgICAgICAgICAgICApIHsgKCB0aGF0IC5fIHx8IHRoYXQgLiRvcHRpb25zICkucmVuZGVyID0gdmFsdWU7IH0sXG5cdFx0fSxcblx0XHRfOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB0b09wdGlvbnMgKCAgICAgICAgICAgICAgICBWdWUzICAgICAgICAsIF9fZGV2X18gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHRpZiAoICEoIHRoaXMgaW5zdGFuY2VvZiBDbGFzc0FQSSApICkgeyB0aHJvdyBFcnJvcignISggdGhpcyBpbnN0YW5jZW9mIENvbXBvbmVudCApLl8oKScpOyB9XG5cdFx0XHRcdHZhciBESURfT1BUSU9OUyA9IE9QVElPTlMub2JqZWN0cy5pbnRvKF9fZGV2X18gfHwgT1BUSU9OUyAgICAgICApLmludG8oVnVlMyB8fCBPUFRJT05TICAgICAgICk7XG5cdFx0XHRcdHZhciBUTVBfT1BUSU9OUyA9IG5ldyBPUFRJT05TLm9iamVjdHNUbXA7XG5cdFx0XHRcdHZhciBvcHRpb25zID0gVG9PcHRpb25zKFxuXHRcdFx0XHRcdHRoaXMsXG5cdFx0XHRcdFx0VnVlMyB8fCB1bmRlZmluZWQsXG5cdFx0XHRcdFx0X19kZXZfXyA/IERFVi5yZWR1Y2UoZnVuY3Rpb24gRGV2IChkZXYsIGtleSkge1xuXHRcdFx0XHRcdFx0ZGV2W2tleV0gPSBfX2Rldl9fIFtrZXldIHx8IGtleTtcblx0XHRcdFx0XHRcdHJldHVybiBkZXY7XG5cdFx0XHRcdFx0fSwgY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwsXG5cdFx0XHRcdFx0RElEX09QVElPTlMsXG5cdFx0XHRcdFx0VE1QX09QVElPTlNcblx0XHRcdFx0KTtcblx0XHRcdFx0VE1QX09QVElPTlMuZm9yRWFjaChmdW5jdGlvbiAob3B0aW9uc1ZhbHVlLCBjb25zdHJ1Y3RvcktleSkgeyBESURfT1BUSU9OUy5zZXQoY29uc3RydWN0b3JLZXksIG9wdGlvbnNWYWx1ZSk7IH0pO1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH0sXG5cdFx0fSxcblx0fVxuKSk7XG5cbmZ1bmN0aW9uIFRvT3B0aW9ucyAoY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAsIERJRF9PUFRJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgVE1QX09QVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgIHtcblx0XG5cdHZhciBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgID0gRElEX09QVElPTlMuZ2V0KGNvbnN0cnVjdG9yKSB8fCBUTVBfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoIG9wdGlvbnMgKSB7IHJldHVybiBvcHRpb25zOyB9XG5cdG9wdGlvbnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgIDtcblx0XG5cdGlmICggaXNNaXhpbnMoY29uc3RydWN0b3IpICkge1xuXHRcdHZhciBzdGF0aWNfbWl4aW5zID0gY29uc3RydWN0b3JbX21peGluc10gO1xuXHRcdHZhciBtaXhpbnMgPSBvcHRpb25zLm1peGlucyA9IFtdICAgICAgICAgICAgICAgIDtcblx0XHR2YXIgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggbWl4aW5zLmxlbmd0aCE9PXN0YXRpY19taXhpbnMubGVuZ3RoICkge1xuXHRcdFx0dmFyIG1peGluID0gc3RhdGljX21peGluc1tpbmRleCsrXTtcblx0XHRcdGlmICggbWl4aW4gaW5zdGFuY2VvZiBDbGFzc0FQSSApIHtcblx0XHRcdFx0dmFyIG1peGluT3B0aW9ucyA9IFRvT3B0aW9ucyhtaXhpbiwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRcdFx0aWYgKCBpc01peGlucyhtaXhpbikgKSB7XG5cdFx0XHRcdFx0dmFyIG1peGluTWl4aW5zID0gbWl4aW5PcHRpb25zLm1peGlucyA7XG5cdFx0XHRcdFx0dmFyIG1peGluSW5kZXggPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggbWl4aW5JbmRleCE9PW1peGluTWl4aW5zLmxlbmd0aCApIHsgbWl4aW5zW21peGlucy5sZW5ndGhdID0gbWl4aW5NaXhpbnNbbWl4aW5JbmRleCsrXTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgeyBtaXhpbnNbbWl4aW5zLmxlbmd0aF0gPSBtaXhpbk9wdGlvbnM7IH1cblx0XHRcdH1cblx0XHRcdGVsc2UgeyBtaXhpbnNbbWl4aW5zLmxlbmd0aF0gPSBtaXhpbiAgICAgICAgICAgICAgOyB9XG5cdFx0fVxuXHRcdGNvbGxlY3ROYW1lcyhvcHRpb25zKTtcblx0XHRyZXR1cm4gb3B0aW9ucztcblx0fVxuXHRcblx0dmFyIFN1cGVyID0gT1BUSU9OUy5zdXBlcnMuZ2V0KGNvbnN0cnVjdG9yKTtcblx0aWYgKCAhU3VwZXIgKSB7XG5cdFx0T1BUSU9OUy5zdXBlcnMuc2V0KGNvbnN0cnVjdG9yLCBTdXBlciA9IGdldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yKSk7XG5cdFx0U3VwZXI9PT1Db21wb25lbnQgfHwgaXNNaXhpbnMoU3VwZXIpIHx8IHNldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yLCBDb21wb25lbnQpO1xuXHR9XG5cdGlmICggU3VwZXIhPT1Db21wb25lbnQgKSB7XG5cdFx0dmFyIFN1cGVyT3B0aW9ucyA9IFRvT3B0aW9ucyhTdXBlciwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRpc01peGlucyhTdXBlcilcblx0XHRcdD8gb3B0aW9ucy5taXhpbnMgLmxlbmd0aD09PTFcblx0XHRcdFx0PyBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnMubWl4aW5zIFswXVxuXHRcdFx0XHQ6IG9wdGlvbnMubWl4aW5zID0gU3VwZXJPcHRpb25zLm1peGluc1xuXHRcdFx0OiBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnM7XG5cdH1cblx0XG5cdHZhciBwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cdFxuXHRvcHRpb25zLmRhdGEgPSBfX2Rldl9fXG5cdFx0PyBmdW5jdGlvbiAoc2VsZiAgICAgICkgeyByZXR1cm4gZGV2RGF0YShjb25zdHJ1Y3Rvciwgc2VsZiAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBWdWUzLCBuYW1lcywgc2hhZG93QXNzaWduZXIsIHNoYWRvd0NoZWNrZXIsIF9fZGV2X18pOyB9XG5cdFx0OiBmdW5jdGlvbiAoc2VsZiAgICAgICkgeyByZXR1cm4gcHJvRGF0YShjb25zdHJ1Y3Rvciwgc2VsZiAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBWdWUzLCBuYW1lcywgc2hhZG93QXNzaWduZXIpOyB9O1xuXHRcblx0dmFyIHNldCAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZTZXQuYmluZChfX2Rldl9fKSA6IHByb1NldDtcblx0dmFyIGFzc2VydEZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2QXNzZXJ0RnVuY3Rpb24uYmluZChfX2Rldl9fKSA6IHByb0Fzc2VydEZ1bmN0aW9uO1xuXHRcblx0dmFyIHN0YXRpY05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhjb25zdHJ1Y3Rvcik7XG5cdGluZGV4ID0gc3RhdGljTmFtZXMubGVuZ3RoO1xuXHR2YXIgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIHN0YXRpY05hbWUgPSBzdGF0aWNOYW1lc1stLWluZGV4XTtcblx0XHRpZiAoIHN0YXRpY05hbWU9PT0nUmVuZGVyJyApIHsgdmFyIFJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdICAgICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSduYW1lJyB8fCBzdGF0aWNOYW1lPT09J2xlbmd0aCcgKSB7XG5cdFx0XHRkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbnN0cnVjdG9yLCBzdGF0aWNOYW1lKTtcblx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmIHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBkZXNjcmlwdG9yLnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgYXBwbHkoZGVzY3JpcHRvci5nZXQgLCBjb25zdHJ1Y3RvciwgQVJHUykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggc3RhdGljTmFtZSE9PSdwcm90b3R5cGUnICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIHN0YXRpY05hbWVbMF09PT0nXycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nc2V0dXAnIHx8IHN0YXRpY05hbWU9PT0nd2F0Y2gnIHx8IHN0YXRpY05hbWU9PT0nbWV0aG9kcycgfHwgc3RhdGljTmFtZT09PSdjb21wdXRlZCcgfHwgc3RhdGljTmFtZT09PSdleHRlbmRzJyB8fCBzdGF0aWNOYW1lPT09J2RhdGEnIHx8IHN0YXRpY05hbWU9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nYmVmb3JlQ3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdjcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZU1vdW50JyB8fCBzdGF0aWNOYW1lPT09J21vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVXBkYXRlJyB8fCBzdGF0aWNOYW1lPT09J3VwZGF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2RlYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVubW91bnQnIHx8IHN0YXRpY05hbWU9PT0ndW5tb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZURlc3Ryb3knIHx8IHN0YXRpY05hbWU9PT0nZGVzdHJveWVkJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0naW5qZWN0JyB8fCBzdGF0aWNOYW1lPT09J3Byb3BzJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheW91dCk7IH1cblx0XHRcdH1cblx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0c2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdKTtcblx0XHR9XG5cdH1cblx0XG5cdHZhciBwcm90b05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpO1xuXHRpbmRleCA9IHByb3RvTmFtZXMubGVuZ3RoO1xuXHR2YXIgd2F0Y2hlcnMgICAgICAgICAgICA9IFtdO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBwcm90b05hbWUgPSBwcm90b05hbWVzWy0taW5kZXhdO1xuXHRcdGlmICggcHJvdG9OYW1lWzBdPT09J18nICYmICFwcm90b05hbWUuc3RhcnRzV2l0aCgnX3dhdGNoOicpICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHR2YXIgcHJvdG9OYW1lMSA9IHByb3RvTmFtZS5zbGljZSgxKTtcblx0XHRcdFx0aWYgKCBwcm90b05hbWUxWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J3NldHVwJyB8fCBwcm90b05hbWUxPT09J3dhdGNoJyB8fCBwcm90b05hbWUxPT09J21ldGhvZHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcHV0ZWQnIHx8IHByb3RvTmFtZTE9PT0nZXh0ZW5kcycgfHwgcHJvdG9OYW1lMT09PSdkYXRhJyB8fCBwcm90b05hbWUxPT09J21peGlucycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2VtaXRzJyB8fCBwcm90b05hbWUxPT09J2NvbXBvbmVudHMnIHx8IHByb3RvTmFtZTE9PT0nZGlyZWN0aXZlcycgfHwgcHJvdG9OYW1lMT09PSdzdGF0aWNSZW5kZXJGbnMnIHx8IHByb3RvTmFtZTE9PT0ndGVtcGxhdGUnIHx8IHByb3RvTmFtZTE9PT0naW5oZXJpdEF0dHJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nbmFtZScgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J1JlbmRlcicgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2RlbGltaXRlcnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdmaWx0ZXJzJyB8fCBwcm90b05hbWUxPT09J2NvbW1lbnRzJyB8fCBwcm90b05hbWUxPT09J2Z1bmN0aW9uYWwnIHx8IHByb3RvTmFtZTE9PT0ncHJvcHNEYXRhJyB8fCBwcm90b05hbWUxPT09J21vZGVsJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheW91dCk7IH1cblx0XHRcdH1cblx0XHRcdHNldChvcHRpb25zLCBwcm90b05hbWUuc2xpY2UoMSksIGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvTmFtZSk7XG5cdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSdfJyApIHtcblx0XHRcdFx0dmFyIGluZGV4T2ZRID0gcHJvdG9OYW1lLnNlYXJjaChXQVRDSF9PUFRJT05TKTtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB3YXRjaGVyc1t3YXRjaGVycy5sZW5ndGhdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICA7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHR3YXRjaGVyLiQgPSBpbmRleE9mUTwwXG5cdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZSg3KVxuXHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoNywgaW5kZXhPZlEpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHdhdGNoZXIuJCA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IuZ2V0KTtcblx0XHRcdFx0XHR3YXRjaGVyLmhhbmRsZXIgPSBhc3NlcnRGdW5jdGlvbihkZXNjcmlwdG9yLnNldCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpbmRleE9mUT4wICkge1xuXHRcdFx0XHRcdCsraW5kZXhPZlE7XG5cdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0dmFyIGluZGV4T2ZBID0gcHJvdG9OYW1lLmluZGV4T2YoJzsnLCBpbmRleE9mUSk7XG5cdFx0XHRcdFx0XHR2YXIgcGFpciA9IGluZGV4T2ZBPDBcblx0XHRcdFx0XHRcdFx0PyBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEpXG5cdFx0XHRcdFx0XHRcdDogcHJvdG9OYW1lLnNsaWNlKGluZGV4T2ZRLCBpbmRleE9mQSk7XG5cdFx0XHRcdFx0XHRpbmRleE9mUSA9IGluZGV4T2ZBICsgMTtcblx0XHRcdFx0XHRcdHZhciBpbmRleE9mRSA9IHBhaXIuaW5kZXhPZignPScpO1xuXHRcdFx0XHRcdFx0aW5kZXhPZkU8MFxuXHRcdFx0XHRcdFx0XHQ/IHdhdGNoZXJbcGFpcl0gPSB0cnVlXG5cdFx0XHRcdFx0XHRcdDogd2F0Y2hlcltwYWlyLnNsaWNlKDAsIGluZGV4T2ZFKV0gPSBwYWlyLnNsaWNlKGluZGV4T2ZFICsgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggaW5kZXhPZlEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcblx0XHRcdFx0XHQ/IHByb3RvTmFtZT09PSdjb25zdHJ1Y3RvcicgJiYgZGVzY3JpcHRvci52YWx1ZT09PWNvbnN0cnVjdG9yIHx8IHNldChvcHRpb25zLm1ldGhvZHMgfHwgKCBvcHRpb25zLm1ldGhvZHMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBwcm90b05hbWUsIGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpKVxuXHRcdFx0XHRcdDogc2V0KG9wdGlvbnMuY29tcHV0ZWQgfHwgKCBvcHRpb25zLmNvbXB1dGVkID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIHByb3RvTmFtZSwgZGVzY3JpcHRvci5zZXQgPyB7XG5cdFx0XHRcdFx0XHRnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuXHRcdFx0XHRcdFx0c2V0OiBkZXNjcmlwdG9yLnNldFxuXHRcdFx0XHRcdH0gOiBkZXNjcmlwdG9yLmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHR2YXIgcHJvdG9TeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3RvdHlwZSkgICAgICAgICAgICAgICAgICAgO1xuXHRpbmRleCA9IHByb3RvU3ltYm9scy5sZW5ndGg7XG5cdHZhciBzeW1ib2xNZXRob2RzID0gaW5kZXggPyBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBwcm90b1N5bWJvbCAgICAgICAgICAgICAgICA9IHByb3RvU3ltYm9sc1stLWluZGV4XTtcblx0XHRzeW1ib2xNZXRob2RzIFtwcm90b1N5bWJvbF0gPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBwcm90b1N5bWJvbCkpO1xuXHR9XG5cdFxuXHRpZiAoIHdhdGNoZXJzLmxlbmd0aCApIHtcblx0XHR2YXIgY3JlYXRlZCA9IG9wdGlvbnMuY3JlYXRlZDtcblx0XHRvcHRpb25zLmNyZWF0ZWQgPSBjcmVhdGVkXG5cdFx0XHQ/IGZ1bmN0aW9uIHdhdGNoQmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlZCAuY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdDogZnVuY3Rpb24gd2F0Y2hCZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7ICR3YXRjaCh0aGlzLCB3YXRjaGVycyk7IH07XG5cdH1cblx0XG5cdGlmICggUmVuZGVyICkge1xuXHRcdGlmICggVnVlMyApIHtcblx0XHRcdHZhciBzaGFkb3cgICAgICAgICAgICAgICAgICAgICA9IFJlbmRlci5zaGFkb3c7XG5cdFx0XHRvcHRpb25zLnJlbmRlciA9IGFzc2VydEZ1bmN0aW9uKG5ldyBSZW5kZXIoVnVlMykpO1xuXHRcdFx0aWYgKCBzaGFkb3cgKSB7IHNoYWRvd0Fzc2lnbmVyID0gU2hhZG93QXNzaWduZXIoc2hhZG93KTsgfVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICggIW9wdGlvbnMucmVuZGVyICYmICFvcHRpb25zLnRlbXBsYXRlICkge1xuXHRcdFx0XHRvcHRpb25zLnJlbmRlciA9IF9fZGV2X18gPyBmdW5jdGlvbiAoKSB7IHRocm93IEVycm9yKF9fZGV2X18ucmVuZGVyKTsgfSA6IHJlbmRlcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHZhciBuYW1lcyA9IGNvbGxlY3ROYW1lcyhvcHRpb25zKTtcblx0XG5cdGlmICggX19kZXZfXyApIHtcblx0XHRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY29uc3RydWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKHN5bWJvbCkge1xuXHRcdFx0aWYgKCBzeW1ib2whPT1fbWl4aW5zICYmICEoIHN5bWJvbCBpbiBTWU1CT0xTICkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zeW1ib2wpOyB9XG5cdFx0fSk7XG5cdFx0Y2hlY2sob3B0aW9ucywgbmFtZXMsIF9fZGV2X18pO1xuXHRcdGlmICggc2hhZG93ICkgeyB2YXIgc2hhZG93Q2hlY2tlciAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFNoYWRvd0NoZWNrZXIoc2hhZG93LCBuYW1lcywgX19kZXZfXyk7IH1cblx0fVxuXHRcblx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XG5cdGlmICggb3B0aW9ucy5jb21wb25lbnRzICkge1xuXHRcdHZhciBjb21wb25lbnRzID0gb3B0aW9ucy5jb21wb25lbnRzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgb3B0aW9ucy5jb21wb25lbnRzKTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBjb21wb25lbnRzICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoICFTVEFSVFNfV0lUSF9VUFBFUl9DQVNFLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9uYW1lKTsgfVxuXHRcdFx0fVxuXHRcdFx0dmFyIHZhbHVlID0gY29tcG9uZW50c1tuYW1lXTtcblx0XHRcdGlmICggdmFsdWUgaW5zdGFuY2VvZiBDbGFzc0FQSSApIHsgY29tcG9uZW50c1tuYW1lXSA9IFRvT3B0aW9ucyh2YWx1ZSwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTsgfVxuXHRcdH1cblx0fVxuXHRcblx0cmV0dXJuIG9wdGlvbnM7XG5cdFxufVxuXG5mdW5jdGlvbiByZW5kZXIgKCkgICAgICAgIHsgdGhyb3cgRXJyb3IoJ3JlbmRlcicpOyB9XG5cbnZhciBTWU1CT0xTID0gLyojX19QVVJFX18qL2dldE93blByb3BlcnR5TmFtZXMoU3ltYm9sKS5yZWR1Y2UoZnVuY3Rpb24gKFNZTUJPTFMsIG5hbWUpIHtcblx0aWYgKCB0eXBlb2YgU3ltYm9sW25hbWVdPT09J3N5bWJvbCcgKSB7IFNZTUJPTFNbU3ltYm9sW25hbWVdICAgICAgICAgICAgICAgICBdID0gbnVsbDsgfVxuXHRyZXR1cm4gU1lNQk9MUztcbn0sIGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG5mdW5jdGlvbiBjaGVjayAob3B0aW9ucyAgICAgICAgICAgICwgbmFtZXMgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSB7XG5cdFxuXHR2YXIgbmFtZSAgICAgICAgO1xuXHRcblx0Ly9AdHMtaWdub3JlXG5cdGlmICggKCBuYW1lID0gb3B0aW9ucy5uYW1lICkgKSB7XG5cdFx0aWYgKFxuXHRcdFx0IVNUQVJUU19XSVRIX1VQUEVSX0NBU0UudGVzdChuYW1lKVxuXHRcdFx0fHxcblx0XHRcdG9wdGlvbnMuY29tcG9uZW50cyAmJiBuYW1lIGluIG9wdGlvbnMuY29tcG9uZW50c1xuXHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0fVxuXHRcblx0aWYgKCBvcHRpb25zLnByb3BzICkge1xuXHRcdGlmICggaXNBcnJheShvcHRpb25zLnByb3BzKSApIHsgb3B0aW9ucy5wcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7IGlmICggLy18Xig/OmtleSR8W29PXVtuTl18cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9wcm9wcyk7IH0gfSk7IH1cblx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBvcHRpb25zLnByb3BzICkgeyBpZiAoIC8tfF4oPzprZXkkfFtvT11bbk5dfHJlZiQpLy50ZXN0KG5hbWUpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcHJvcHMpOyB9IH0gfVxuXHR9XG5cdFxuXHRvcHRpb25zLmVtaXRzICYmXG5cdCggaXNBcnJheShvcHRpb25zLmVtaXRzKSA/IG9wdGlvbnMuZW1pdHMgOiBrZXlzKG9wdGlvbnMuZW1pdHMpICkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoIC9bQS1aXXxeb252bm9kZXwoPzpjYXB0dXJlfG9uY2V8cGFzc2l2ZSkkLy50ZXN0KCdvbicgKyBldmVudCkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9lbWl0cyk7IH1cblx0fSk7XG5cdFxuXHRpZiAoXG5cdFx0b3B0aW9ucy5kaXJlY3RpdmVzICYmICdpcycgaW4gb3B0aW9ucy5kaXJlY3RpdmVzLy8gMlxuXHRcdHx8Ly9AdHMtaWdub3JlXG5cdFx0b3B0aW9ucy5wcm9wcyAmJiAoIGlzQXJyYXkob3B0aW9ucy5wcm9wcykgPyBvcHRpb25zLnByb3BzLmluY2x1ZGVzKCdpcycpIDogJ2lzJyBpbiBvcHRpb25zLnByb3BzICkvLyAzXG5cdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfaXMpOyB9XG5cdFxufVxuXG5mdW5jdGlvbiBpc01peGlucyAoY29uc3RydWN0b3IgICAgICAgICAgKSB7IHJldHVybiBhcHBseShoYXNPd25Qcm9wZXJ0eSwgY29uc3RydWN0b3IsIF9NSVhJTlMpOyB9XG5cbnZhciBfbWl4aW5zICAgICAgICAgICAgICAgID0gU3ltYm9sICYmIC8qI19fUFVSRV9fKi9TeW1ib2woJ19taXhpbnMnKSAgICAgICAgICAgICAgICAgO1xudmFyIF9NSVhJTlMgPSBbIF9taXhpbnMgXSAgICAgICAgIDtcbnZhciBfX1BVUkVfXyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdDb21wb25lbnQsX21peGlucycsICdcInVzZSBzdHJpY3RcIjtcXFxucmV0dXJuKC4uLm1peGlucyk9PlxcXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcXFxuY29uc3RydWN0b3IoKXtyZXR1cm4gQ29tcG9uZW50KCl9XFxcbnN0YXRpYyBnZXRbX21peGluc10oKXtyZXR1cm4gbWl4aW5zfVxcXG59XFxcbicpKENvbXBvbmVudCwgX21peGlucyk7XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufSgpO1xuXG52YXIgU1RBUlRTX1dJVEhfVVBQRVJfQ0FTRSA9IC9eW0EtWl0vO1xudmFyIEFSR1MgPSBbXSAgICAgICAgIDtcblxudmFyIE9QVElPTlMgPSBXZWFrTWFwICYmIC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdXZWFrTWFwLE1hcCcsICdcInVzZSBzdHJpY3RcIjtcXFxuY2xhc3MgRWFzeU1hcCBleHRlbmRzIFdlYWtNYXB7XFxcbmludG8oa2V5KXtcXFxubGV0IHN1Yj10aGlzLmdldChrZXkpO1xcXG5zdWI/P3RoaXMuc2V0KGtleSxzdWI9bmV3IEVhc3lNYXApO1xcXG5yZXR1cm4gc3ViXFxcbn1cXFxufVxcXG5FYXN5TWFwLnByb3RvdHlwZS5nZXQ9V2Vha01hcC5wcm90b3R5cGUuZ2V0O1xcXG5FYXN5TWFwLnByb3RvdHlwZS5zZXQ9V2Vha01hcC5wcm90b3R5cGUuc2V0O1xcXG5jbGFzcyBTdHJvbmdNYXAgZXh0ZW5kcyBNYXB7fVxcXG5TdHJvbmdNYXAucHJvdG90eXBlLmdldD1NYXAucHJvdG90eXBlLmdldDtcXFxuU3Ryb25nTWFwLnByb3RvdHlwZS5zZXQ9TWFwLnByb3RvdHlwZS5zZXQ7XFxcblN0cm9uZ01hcC5wcm90b3R5cGUuZm9yRWFjaD1NYXAucHJvdG90eXBlLmZvckVhY2g7XFxcbnJldHVybntcXFxub2JqZWN0czpuZXcgRWFzeU1hcCxcXFxub2JqZWN0c1RtcDpTdHJvbmdNYXAsXFxcbnN1cGVyczpuZXcgRWFzeU1hcCxcXFxubmFtZXM6bmV3IEVhc3lNYXBcXFxufVxcXG4nKShXZWFrTWFwLE1hcCk7XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufSgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxudmFyIENsYXNzQVBJID0gZnVuY3Rpb24gKCkge30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5DbGFzc0FQSS5wcm90b3R5cGUgPSBDb21wb25lbnQ7XG5cbnZhciBXQVRDSF9PUFRJT05TID0gLztbYS16Oz1dKiQvO1xuZnVuY3Rpb24gJHdhdGNoICh0aGF0ICAgICAgLCB3YXRjaGVycyAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBpbmRleCA9IHdhdGNoZXJzLmxlbmd0aDtcblx0ZG8ge1xuXHRcdHZhciB3YXRjaGVyICAgICAgPSB3YXRjaGVyc1stLWluZGV4XTtcblx0XHR0aGF0LiR3YXRjaCh3YXRjaGVyLiQsIHdhdGNoZXIuaGFuZGxlciwgd2F0Y2hlcik7XG5cdH1cblx0d2hpbGUgKCBpbmRleCApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmZ1bmN0aW9uIGNvbGxlY3ROYW1lcyAob3B0aW9ucyAgICAgICAgICAgICkgICAgICAgIHtcblx0dmFyIG5hbWVzICAgICAgICAgICAgICAgICAgICA9IE9QVElPTlMubmFtZXMuZ2V0KG9wdGlvbnMpO1xuXHRpZiAoICFuYW1lcyApIHtcblx0XHRuYW1lcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHR2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuXHRcdHZhciBuYW1lICAgICAgICA7XG5cdFx0aWYgKCBpc0FycmF5KHByb3BzKSApIHsgZm9yICggaW5kZXggPSBwcm9wcy5sZW5ndGg7IGluZGV4OyApIHsgbmFtZSA9IHByb3BzWy0taW5kZXhdOyBuYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdGVsc2UgeyBmb3IgKCBuYW1lIGluIHByb3BzICkgeyBuYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdHByb3BzID0gb3B0aW9ucy5pbmplY3Q7XG5cdFx0aWYgKCBpc0FycmF5KHByb3BzKSApIHsgZm9yICggaW5kZXggPSBwcm9wcy5sZW5ndGg7IGluZGV4OyApIHsgbmFtZSA9IHByb3BzWy0taW5kZXhdOyBuYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdGVsc2UgeyBmb3IgKCBuYW1lIGluIHByb3BzICkgeyBuYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5tZXRob2RzICkgeyBuYW1lc1tuYW1lXSA9IG51bGw7IH1cblx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMuY29tcHV0ZWQgKSB7IG5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdHZhciBleHRlbmQgPSBvcHRpb25zLmV4dGVuZHM7XG5cdFx0aWYgKCBleHRlbmQgKSB7XG5cdFx0XHRtaXhpbiA9IGNvbGxlY3ROYW1lcyhleHRlbmQpO1xuXHRcdFx0YXNzaWduKG5hbWVzLCBtaXhpbik7XG5cdFx0fVxuXHRcdHZhciBtaXhpbnMgPSBvcHRpb25zLm1peGlucztcblx0XHRpZiAoIG1peGlucyApIHtcblx0XHRcdHZhciBpbmRleCA9IG1peGlucy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdFx0XHR2YXIgbWl4aW4gPSBjb2xsZWN0TmFtZXMobWl4aW5zWy0taW5kZXhdKTtcblx0XHRcdFx0YXNzaWduKG5hbWVzLmV4Y2VwdERhdGEsIG1peGluLmV4Y2VwdERhdGEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRPUFRJT05TLm5hbWVzLnNldChvcHRpb25zLCBuYW1lcyk7XG5cdH1cblx0cmV0dXJuIG5hbWVzO1xufVxuXG5mdW5jdGlvbiBwcm9TZXQgICAgKG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgLCBuYW1lICAgICAgICAsIHZhbHVlICAgKSB7IG9iamVjdFtuYW1lXSA9IHZhbHVlOyB9XG5mdW5jdGlvbiBkZXZTZXQgICAgKCAgICAgICAgICAgICAgIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgLCBuYW1lICAgICAgICAsIHZhbHVlICAgKSB7XG5cdGlmICggbmFtZSBpbiBvYmplY3QgKSB7IHRocm93IEVycm9yKHRoaXMuY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdG9iamVjdFtuYW1lXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwcm9Bc3NlcnRGdW5jdGlvbiAgICAoZm4gICApIHsgcmV0dXJuIGZuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyB9XG5mdW5jdGlvbiBkZXZBc3NlcnRGdW5jdGlvbiAgICAoICAgICAgICAgICAgICAgZm4gICApIHtcblx0aWYgKCB0eXBlb2YgZm4hPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IodGhpcy5jb21waWxlX3R5cGUpOyB9XG5cdHJldHVybiBmbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbn1cblxudmFyIERFViA9IFtcblx0J2NvbXBpbGVfbmFtZScsXG5cdCdjb21waWxlX3Byb3BzJyxcblx0J2NvbXBpbGVfZW1pdHMnLFxuXHQnY29tcGlsZV9pcycsXG5cdCdjb21waWxlX2xheW91dCcsXG5cdCdjb21waWxlX3Jlc2VydmVkJyxcblx0J2NvbXBpbGVfcmVkZWZpbmVkJyxcblx0J2NvbXBpbGVfdHlwZScsXG5cdCdjb21waWxlX3N5bWJvbCcsXG5cdCdjb21waWxlX3NoYWRvdycsXG5cdCdyZW5kZXInLFxuXHQncnVudGltZV9zaGFkb3cnLFxuXHQncnVudGltZV9yZWRlZmluZWQnLFxuXHQncnVudGltZV9zeW1ib2wnLFxuXHQncnVudGltZV9yZXNlcnZlZCcsXG5cdCdydW50aW1lX2VudW1lcmFibGUnLFxuXSAgICAgICAgIDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICBcblx0ICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgIFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gXG5cbiAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgXG4gXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCBSZW5kZXIsIHsgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU3R5bGUsIHsgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcbmltcG9ydCBDb21wb25lbnQsIHsgbWl4aW4gfSBmcm9tICcuL0NvbXBvbmVudCwgbWl4aW4vJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0SWRlbnRpZmllcixcblx0U2NvcGUsXG5cdFRlbXBsYXRlLFxuXHRSZW5kZXIsIFN0YXRpY1JlbmRlckZucyxcblx0U3R5bGUsIHJlbW92ZSxcblx0Q29tcG9uZW50LCBtaXhpbixcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRJZGVudGlmaWVyOiBJZGVudGlmaWVyLFxuXHRTY29wZTogU2NvcGUsXG5cdFRlbXBsYXRlOiBUZW1wbGF0ZSxcblx0UmVuZGVyOiBSZW5kZXIsIFN0YXRpY1JlbmRlckZuczogU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZTogU3R5bGUsIHJlbW92ZTogcmVtb3ZlLFxuXHRDb21wb25lbnQ6IENvbXBvbmVudCwgbWl4aW46IG1peGluLFxufSk7XG4iXSwibmFtZXMiOlsidmVyc2lvbiIsInVuZGVmaW5lZCIsImNyZWF0ZSIsImFwcGx5IiwiZ2V0UHJvdG90eXBlT2YiLCJnZXQiLCJrZXlzIiwiRGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjLFFBQVE7O0FDQXRCLG1CQUFlO0FBQ2YsQ0FBQyxLQUFLO0FBQ04sQ0FBQyxLQUFLO0FBQ04sQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxXQUFXO0FBQ1osQ0FBQyxXQUFXO0FBQ1osQ0FBQyxXQUFXO0FBQ1osQ0FBQyxZ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QUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDL0csT0FBTyxFQUFFLE1BQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3hELEVBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDekIsRUFBRSxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDL0csT0FBTyxFQUFFLE1BQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3hELEVBQUUsTUFBTSxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtBQUN6RCxFQUFFLE1BQU0sSUFBSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7QUFDMUQsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQy9CLEVBQUUsS0FBSyxNQUFNLEdBQUc7QUFDaEIsR0FBRyxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsTUFBTSxD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