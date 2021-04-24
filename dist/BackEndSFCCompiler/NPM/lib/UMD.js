/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：26.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jVue = factory());
}(this, (function () { 'use strict';

var version = '26.1.0';

var test = RegExp.prototype.test;

var join = Array.prototype.join;

var unshift = Array.prototype.unshift;

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

var Error$1 = Error;

var isArray = Array.isArray;

var create = Object.create;

var freeze = Object.freeze;

var isPrototypeOf = Object.prototype.isPrototypeOf;

var match = String.prototype.match;

var undefined$1 = void null;

var RegExp$1 = RegExp;

var defineProperty = Object.defineProperty;

var NULL = (
	/*! j-globals: null.prototype (internal) */
	Object.seal
		? /*#__PURE__*/Object.preventExtensions(Object.create(null))
		: null
	/*¡ j-globals: null.prototype (internal) */
);

var TypeError$1 = TypeError;

var apply = typeof Reflect==='undefined' ? undefined$1 : Reflect.apply;

var toStringTag = typeof Symbol==='undefined' ? undefined$1 : Symbol.toStringTag;

var assign = Object.assign;

var PROTO_BUG = Object.prototype;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

var hasOwn = /*#__PURE__*/function () {
	return hasOwnProperty.bind
		? hasOwnProperty.call.bind(hasOwnProperty)
		: function (object, key) { return hasOwnProperty.call(object, key); };
}();// && object!=null

var Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(NULL); }
		if ( assign ) { assign(exports, addOnOrigin); }
		else { for ( var key in addOnOrigin ) { if ( hasOwn(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
		exports.default = exports;
		if ( toStringTag ) {
			var descriptor = create(NULL);
			descriptor.value = 'Module';
			defineProperty(exports, toStringTag, descriptor);
		}
		typeof exports==='function' && exports.prototype && freeze(exports.prototype);
		return freeze(exports);
	}
	/*¡ j-globals: default (internal) */
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

/*¡ j-regexp */

var Symbol$1 = typeof Symbol==='undefined' ? undefined$1 : Symbol;

var document$1 = document;

var head = document.head;

var _      = Symbol$1 ? /*#__PURE__*/Symbol$1('_')        : '_';

function $                  (         css         , media         )    {
	var style                   = document$1.createElement('style');
	if ( css ) { style.textContent = this[_](css); }
	if ( media!==undefined$1 ) { style.media = media; }
	head.appendChild(style);
	return this;
}

var prepare_                                  = typeof _==='symbol' ? null : /*#__PURE__*/function () {
	var _descriptor = create(NULL)                      ;
	_descriptor.value = null;
	_descriptor.writable = true;
	_descriptor.enumerable = true;
	_descriptor.configurable = true;
	return function $ (scope       ) { defineProperty(scope, _, _descriptor); };
}();

function Search (keys          )         { return RegExp$1('__' + groupify(keys, false, true) + '__', 'g'); }
function Replacer (scope             ) { return function replacer (__key__        )         { return scope[__key__.slice(2, -2)] ; }; }

var StaticScope = function StaticScope (                   keys          )       {
	prepare_ && prepare_(this);
	this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
	var _search = Search(keys);
	var _replacer = Replacer(this);
	for ( var index         = keys.length; index; ) { this[keys[--index] ] = Identifier(); }
}                
	                                  
	                       
 ;

var SCOPE              = StaticScope.prototype = /*#__PURE__*/freeze(create(null, {
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

var __KEY__ = RegExp$1('__' + KEYS.source + '__', 'g');

function get$1 (cache             , key        )         { return cache[key] || ( cache[key] = Identifier() ); }

function scopify (value                         , cache             )         {
	var keys        ,
		index        ,
		values          ,
		key        ;
	if ( value ) {
		switch ( typeof value ) {
			case 'string':
				if ( value.indexOf(' ')<0 ) {
					return get$1(cache, value);
				}
				else {
					keys = '';
					values = value.split(' ');
					for ( index = values.length; index; ) {
						key = value[--index] ;
						if ( key ) { keys = get$1(cache, key)+' '+keys; }
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
						if ( ( value                           )[key] ) { keys += ' '+get$1(cache, key); }
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
	function _replacer (__key__        )         { return get$1(cache, __key__.slice(2, -2)); }
	return scope;
}

function throwEmpty (keys        )        { throw Error$1('Scope("' + keys + '")'); }
var isStaticScope = /*#__PURE__*/isPrototypeOf.bind(SCOPE)                                            ;
var match_call                                                          = /*#__PURE__*/match.call.bind(match);

function mix (protos         )              {
	var scope              = create(SCOPE);
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
				else if ( typeof this==='function' && isStaticScope(this.prototype) ) { return DynamicScope(create(this.prototype)); }
				else if ( isStaticScope(this) ) { return DynamicScope(create(this)); }
			}
			return DynamicScope(create(SCOPE));
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

var Function$1 = Function;

var IS_NOT_ES5 = /*#__PURE__*/test.bind(/^(cons|le)t /);

function WithStripped (render                                   ) {
	render._withStripped = true;
	return render;
}

function Render (code        , scope        )                                          {
	return code[0]==='('
		? /*#__PURE__*/Function$1('"use strict";return class Render extends null{constructor' + ( scope ? scope[_](code) : code ) + '};')()                                  
		: /*#__PURE__*/WithStripped(
			/*#__PURE__*/Function$1(/*#__PURE__*/IS_NOT_ES5(code)
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
	return Function$1('"use strict";return[' + body)();
}

function Style (css         , scope        )                   {
	var style                   = document$1.createElement('style');
	if ( css ) { style.textContent = scope ? scope[_](css) : css; }
	return head.appendChild(style);
}

function remove (style                  )                {
	head.removeChild(style);
	return remove;
}

var WeakMap$1 = typeof WeakMap==='undefined' ? undefined$1 : WeakMap;

var from = Array.from;

var getPrototypeOf$1 = typeof Reflect!=='undefined' ? Reflect.getPrototypeOf : /*#__PURE__*/ Object.getPrototypeOf;

var setPrototypeOf = Object.setPrototypeOf;

var getOwnPropertyNames = Object.getOwnPropertyNames;

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

var getOwnPropertySymbols = Object.getOwnPropertySymbols;

var defineProperties = Object.defineProperties;

var get = typeof Reflect==='undefined' ? undefined$1 : Reflect.get;

var Keys = Object.keys;

var OwnKeys = typeof Reflect==='undefined' ? undefined$1 : Reflect.ownKeys;

var window$1 = window;

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

var getPrototypeOf = Object.getPrototypeOf;

var error = console.error;

var that                 = null;

var NAMES = assign && /*#__PURE__*/assign(create(null), {
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
	
	var data = assign(create(NULL), dataNames)        ;
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
	
	var data = create(NULL)        ;
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
			error(Error$1('[jVue bug]: vm.' + name + ' is unknown but exists'));
			break;
		}
	}
	var oldDescriptors = assign(create(NULL), getOwnPropertyDescriptors(ctx), protoDescriptors);
	if ( protoDescriptors ) {
		for ( var $name in protoDescriptors ) { if ( $name in ctx ) { throw Error$1(__dev__.runtime_reserved); } }
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
		) { throw Error$1(__dev__.runtime_redefined); }
	});
	var difKeys                        = OwnKeys(ctx).filter(function (key) {
		return !( key in oldDescriptors );
	});
	if ( skipConstructor ) {
		if ( difKeys.length ) { throw Error$1(__dev__.runtime_data); }
	}
	var difNames = difKeys.filter(function (key)                {
		return typeof key==='string' && key[0]!=='$';
	});
	if ( skipData ) {
		if ( difNames.length ) { throw Error$1(__dev__.runtime_data); }
	}
	if ( dataNames ) {
		var count = 0;
		for ( name in dataNames ) { ++count; }
		if ( count!==difNames.length ) { throw Error$1(__dev__.runtime_data); }
		difNames.forEach(function (name) {
			if ( !( name in dataNames ) ) { throw Error$1(__dev__.runtime_data); }
		});
	}
	difNames.forEach(function (              name) {
		if ( name in this && !( name in {} ) || name in restNames ) { throw Error$1(__dev__.runtime_redefined); }
		if ( name[0]==='_' ) { throw Error$1(__dev__.runtime_reserved); }
		if ( name==='constructor' ) { throw Error$1(__dev__.proto); }
		if ( !propertyIsEnumerable.call(ctx, name)) { throw Error$1(__dev__.runtime_enumerable); }
	}, getPrototypeOf(ctx));
	
	var data = create(NULL)        ;
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
	var INIT = create(NULL)                  ;
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
				var all = data[toName] = create(NULL)       ;
				all[name$set] = function (            el                    ) { self[toName] [name$get] = attach(el); };
				all[name$get] = null;
			}                             ;
		}
		else {
			return function (            self                         , data                         ) {
				var all = data[toName] = create(NULL)       ;
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
	if ( along[0]==='_' || along[0]==='$' ) { throw Error$1(__dev__.compile_shadow); }
	var index = along.indexOf('.');
	if ( index<0 ) {
		var toName$get = along.slice(0, index) + '$get';
		var toName$set = along.slice(0, index) + '$set';
		if ( toName$get in restNames || toName$set in restNames ) { throw Error$1(__dev__.compile_shadow); }
		shadowNames[toName$get] = null;
		shadowNames[toName$set] = null;
		if ( dataNames ) {
			if ( toName$get in dataNames || toName$set in dataNames ) { throw Error$1(__dev__.compile_shadow); }
			return function () {};
		}
		return function (            data      ) {
			if ( toName$get in data || toName$set in data ) { throw Error$1(__dev__.runtime_shadow); }
		};
	}
	else {
		if ( along==='constructor' ) { throw Error$1(__dev__.proto); }
		if ( along in restNames ) { throw Error$1(__dev__.compile_shadow); }
		shadowNames[along] = null;
		if ( dataNames ) {
			if ( along in dataNames ) { throw Error$1(__dev__.compile_shadow); }
			return function () {};
		}
		return function (            data      ) {
			if ( along in data ) { throw Error$1(__dev__.runtime_shadow); }
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
			get: function render (          ) { throw TypeError$1('Component.render='); },
			set: function render (            value                     ) { ( that ._ || that .$options ).render = value; },
		},
		_main: {
			enumerable: false,
			get: function _main (              ) {
				var Component = this;
				if ( !isComponentConstructor(Component) ) { throw TypeError$1('(!Component)._main'); }
				return function _main (             )       {
					if ( once ) { throw Error$1('Component._main()x2'); }
					if ( this!==Component && isComponentConstructor(this) ) { throw TypeError$1('(Component!this)._main()'); }
					var Vue = Function$1('return Vue')();
					if ( typeof Vue==='object' ) {
						var dev =
							'__VUE__' in window$1 &&
							'__VUE_HMR_RUNTIME__' in window$1 &&
							isArray(( window$1        ).devtoolsFormatters);
						var app = Vue.createApp(
							ToOptions(
								Component,
								Vue,
								dev ? create(NULL) : undefined$1
							)
						);
						app.config.isCustomElement = isCustomElement;
						if ( dev ) { app.config.performance = true; }
						app.mount(document$1.body);
					}
					else {
						new ( Vue.extend(
							ToOptions(
								Component,
								undefined$1,
								Vue.devtools ? ( Vue.config.ignoredElements.push(STARTS_WITH_LOWERCASE), Vue.config.performance = true, create(NULL) ) : undefined$1,
								FunctionalComponent2
							)
						) )()
						.$mount(( document$1.body.innerHTML = '<br>', 'br' ));
					}
					once = true;
				};
			},
			set: undefined$1,
		},
		_toOptions: {
			enumerable: false,
			value: function _toOptions (                Vue3        , __dev__                                               ) {
				if ( !isComponentConstructor(this) ) { throw TypeError$1('(!Component)._toOptions()'); }
				return ToOptions(this, Vue3, __dev__, Vue3 ? OPTIONS.fix.get(Vue3) || FunctionalComponentConstructor(Vue3) : FunctionalComponent2);
			},
		},
	}
));
var once = false;

function ToOptions (            constructor          , Vue3        , __dev__                                               , FunctionalComponent                                 ) {
	var DID_OPTIONS = OPTIONS.objects.into(__dev__ || OPTIONS       ).into(FunctionalComponent || OPTIONS       );
	var TMP_OPTIONS = new OPTIONS.objectsTmp;
	var options = Options(
		constructor,
		Vue3 || undefined$1,
		__dev__ ? DEV.reduce(function Dev (dev, key) {
			dev[key] = __dev__ [key] || key;
			return dev;
		}, create(NULL)                                                ) : null,
		DID_OPTIONS,
		TMP_OPTIONS,
		FunctionalComponent || null
	);
	TMP_OPTIONS.forEach (function (optionsValue, constructorKey) { DID_OPTIONS.set(constructorKey, optionsValue); });
	return options;
}

var _mixins                = Symbol$1 && /*#__PURE__*/Symbol$1('_mixins')                 ;

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

function Options (constructor          , Vue3                   , __dev__                , DID_OPTIONS                               , TMP_OPTIONS                           , FunctionalComponent                                       )             {
	
	var options                         = DID_OPTIONS.get(constructor) || TMP_OPTIONS.get(constructor);
	if ( options ) { return options; }
	OPTIONS.constructor.set(options = create(NULL)              , constructor);
	
	if ( isMixins(constructor) ) {
		var static_mixins = constructor[_mixins] ;
		var mixins = new OPTIONS.Set            ();
		var index = 0;
		while ( index!==static_mixins.length ) {
			var mixin = static_mixins[index++] ;
			if ( isComponentConstructor(mixin) ) {
				var mixinOptions = Options(mixin, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS, FunctionalComponent);
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
		var SuperOptions = Options(Super, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS, FunctionalComponent);
		isMixins(Super)
			? SuperOptions.mixins .length===1
			? options.extends = SuperOptions.mixins [0]
			: options.mixins = SuperOptions.mixins
			: options.extends = SuperOptions;
	}
	
	__dev__ && getOwnPropertySymbols(constructor).forEach(function (symbol) {
		if ( symbol!==_mixins && !( symbol in SYMBOLS ) ) { throw Error$1(__dev__.compile_symbol); }
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
				if ( constructor[staticName]!==undefined$1 ) { throw Error$1(isArray(constructor[staticName]) ? __dev__.compile_layer : __dev__.compile_type); }
			}
			skipConstructor = true;
		}
		else if ( staticName!=='prototype' ) {
			if ( __dev__ ) {
				if ( staticName[0]==='_' ) { throw Error$1(__dev__.compile_reserved); }
				if (
					//@ts-ignore
					staticName==='setup' || staticName==='watch' || staticName==='methods' || staticName==='computed' || staticName==='extends' || staticName==='mixins' ||
					//@ts-ignore
					staticName==='beforeCreated' || staticName==='created' || staticName==='beforeMount' || staticName==='mounted' || staticName==='beforeUpdate' || staticName==='updated' || staticName==='activated' || staticName==='deactivated' || staticName==='beforeUnmount' || staticName==='unmounted' || staticName==='beforeDestroy' || staticName==='destroyed' ||
					//@ts-ignore
					staticName==='inject' || staticName==='props' || protoName1==='emits'
				) { throw Error$1(__dev__.compile_layer); }
			}
			//@ts-ignore
			set(options, staticName==='displayName' ? 'name' : staticName, constructor[staticName]);
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
			var _data = get(prototype, protoName, undefined$1);
			if ( _data ) {
				if ( __dev__ ) {
					if ( !isArray(_data) ) { throw Error$1(__dev__.compile_type); }
					_data.forEach(function (name) {
						if ( typeof name!=='string' ) { throw Error$1(__dev__.compile_type); }
						if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
					});
					if ( skipConstructor ) { throw Error$1(__dev__.compile_redefined); }
				}
				var length = _data.length;
				if ( length ) {
					dataNames = create(NULL)         ;
					var i = 0;
					do { dataNames[_data[i]] = null; }
					while ( ++i!==length );
					dataNames = assign(create(NULL), dataNames);
					__dev__ && OPTIONS.data.set(options, dataNames);
				}
				else {
					skipData = true;
				}
			}
			else {
				if ( __dev__ ) {
					if ( _data!==undefined$1 ) { throw Error$1(__dev__.compile_type); }
					if ( skipConstructor ) { throw Error$1(__dev__.compile_redefined); }
				}
				skipConstructor = true;
			}
		}
		else if ( protoName[0]==='_' && !( protoName.startsWith('_watch(') ) ) {
			if ( __dev__ ) {
				var protoName1 = protoName.slice(1);
				if ( protoName1[0]==='_' ) { throw Error$1(__dev__.compile_reserved); }
				if (
					protoName1==='setup' || protoName1==='watch' || protoName1==='methods' || protoName1==='computed' || protoName1==='extends' || protoName1==='mixins' ||
					protoName1==='components' || protoName1==='directives' || protoName1==='staticRenderFns' || protoName1==='template' || protoName1==='inheritAttrs' ||
					protoName1==='name' ||
					protoName1==='Render' ||
					protoName1==='delimiters' ||
					protoName1==='filters' || protoName1==='comments' || protoName1==='functional' || protoName1==='propsData' || protoName1==='model'
				) { throw Error$1(__dev__.compile_layer); }
			}
			set(options, protoName.slice(1), get(prototype, protoName, undefined$1));
		}
		else {
			var descriptor                     = getOwnPropertyDescriptor(prototype, protoName);
			if ( protoName[0]==='_' ) {
				var indexOfQ = protoName.lastIndexOf(')');
				var watcher = watchers[watchers.length] = create(NULL)           ;
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
				( protoDescriptors || ( protoDescriptors = create(NULL)                     ) )[protoName] = assign(create(NULL), descriptor);
			}
			else {
				if ( descriptor.hasOwnProperty('value') ) {
					if ( protoName!=='constructor' || descriptor.value!==constructor ) {
						( options.methods || ( options.methods = create(NULL)                                       ) )[protoName] = assertFunction(descriptor.value);
					}
				}
				else {
					( options.computed || ( options.computed = create(NULL)                                        ) )[protoName] = descriptor.set ? {
						get: descriptor.get,
						set: descriptor.set
					} : descriptor.get       ;
				}
			}
		}
	}
	
	var protoSymbols = getOwnPropertySymbols(prototype)                   ;
	if ( ( index = protoSymbols.length ) ) {
		if ( !protoDescriptors ) { protoDescriptors = create(NULL)                    ; }
		do {
			var protoSymbol                = protoSymbols[--index] ;
			protoDescriptors [protoSymbol] = assign(create(NULL), getOwnPropertyDescriptor(prototype, protoSymbol));
		}
		while ( index );
	}
	protoDescriptors && OPTIONS.proto.set(options, protoDescriptors = assign(create(NULL), protoDescriptors));
	
	__dev__ && check(options, __dev__);
	
	var restNames = collectNames(options, constructor);
	
	if ( Render && Vue3 ) {
		var shadow = Render.shadow;
		if ( shadow ) {
			if ( __dev__ ) {
				if ( skipConstructor && skipData ) { throw Error$1(__dev__.compile_shadow); }
				var shadowNames = create(NULL)         ;
				var shadowChecker                            = ShadowChecker(shadow, restNames, dataNames, shadowNames, __dev__);
				OPTIONS.shadow.set(options, shadowNames);
			}
			shadowAssigner = ShadowAssigner(shadow);
		}
		var sheet = Render.sheet;
		if ( sheet ) {
			var watchers2            = [];
			OwnKeys(sheet).forEach(function (                 key, index) {
				var watcher = this[index] = create(NULL)           ;
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
	if ( options.components || options.name ) {
		var components = options.components = assign(create(NULL), options.components);
		if ( __dev__ ) {
			for ( pascal in components ) {
				if ( !pascal || STARTS_WITH_LOWERCASE.test(pascal) ) { throw Error$1(__dev__.compile_name); }
			}
			if ( Vue3 && FunctionalComponent ) {
				if (
					//@ts-ignore
					options.name && INCLUDES_UPPERCASE.test(options.name.slice(1))
				) { throw Error$1(__dev__.compile_name); }
			}
		}
		for ( var pascal in components ) {
			var value = components[pascal] ;
			if ( isComponentConstructor(value) ) { components[pascal] = Options(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS, FunctionalComponent); }
		}
		if ( FunctionalComponent ) {
			var cases = create(NULL)         ;
			//@ts-ignore
			options.name && fixPascal(options.name, cases, FunctionalComponent);
			for ( pascal in components ) { fixPascal(pascal, cases, FunctionalComponent); }
			assign(components, assign(cases, components));
		}
	}
	
	return options;
	
}

var OPTIONS = /*#__PURE__*/function () {
	try {
		return Function$1('"use strict";\
class EasyMap extends WeakMap{into(key){let sub=this.get(key);sub??this.set(key,sub=new EasyMap);return sub}}EasyMap.prototype.get=WeakMap.prototype.get;EasyMap.prototype.set=WeakMap.prototype.set;\
class StrongMap extends Map{}StrongMap.prototype.get=Map.prototype.get;StrongMap.prototype.set=Map.prototype.set;StrongMap.prototype.forEach=Map.prototype.forEach;\
class StrongSet extends Set{}StrongSet.prototype.add=Set.prototype.add;StrongSet.prototype[Symbol.iterator]=Set.prototype[Symbol.iterator];\
return{objects:new EasyMap,objectsTmp:StrongMap,super:new EasyMap,rest:new EasyMap,data:new EasyMap,proto:new EasyMap,constructor:new EasyMap,shadow:new EasyMap,fix:new EasyMap,Set:StrongSet}\
')();
	}
	catch (error) {}
}()     
	                                                                         
	                                                  
	                                   
	                                            
	                                 
	                                             
	                                           
	                                   
	                                                    
	                    
 ;
                                                                                

var isComponentConstructor = /*#__PURE__*/isPrototypeOf.bind(Component)                                     ;

var ARGS = []         ;

var _MIXINS = [ _mixins ]         ;
function isMixins (constructor          ) { return apply(hasOwnProperty, constructor, _MIXINS); }

var SYMBOLS = /*#__PURE__*/getOwnPropertyNames(Symbol$1).reduce(function (SYMBOLS, name) {
	if ( typeof Symbol$1[name]==='symbol' ) { SYMBOLS[Symbol$1[name]                 ] = null; }
	return SYMBOLS;
}, create(NULL)                         );

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
			restNames = create(NAMES);
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
			restNames = assign(create(NULL), restNames);
		}
		if ( constructor ) { OPTIONS.rest.set(constructor, restNames); }
		OPTIONS.rest.set(options, restNames);
	}
	return restNames;
}

function proSet    (object                       , name        , value   ) { object[name] = value; }
function devSet    (               object                       , name        , value   ) {
	if ( name in object ) { throw Error$1(this.compile_redefined); }
	object[name] = value;
}

function proAssertFunction    (fn   ) { return fn                                          ; }
function devAssertFunction    (               fn   ) {
	if ( typeof fn!=='function' ) { throw TypeError$1(this.compile_type); }
	return fn                                          ;
}

var INCLUDES_UPPERCASE = /[A-Z]/;
var STARTS_WITH_LOWERCASE = /^[a-z]/;
var CHECKED = WeakMap$1 && /*#__PURE__*/new WeakMap$1                                                     ();
function forKeys (option                , callback                        ) {
	if ( isArray(option) ) { option.forEach(callback); }
	else { for ( var key in option ) { callback(key); } }
}
function check (options                                         , __dev__         )                               {
	
	var belong = OPTIONS.constructor.get(options) || options;
	var ownKeys = CHECKED.get(belong);
	if ( ownKeys ) { return ownKeys; }
	var allKeys = create(NULL)                                ;
	
	( options.extends ? [ options.extends ] : [] ).concat(options.mixins || []).forEach(function (mixin) {
		var mixinNames = check(mixin, __dev__);
		for ( var name in mixinNames ) {
			if ( name in allKeys && mixinNames[name]!==allKeys[name] ) { throw Error$1(__dev__.compile_overwrite); }
		}
		assign(allKeys, mixinNames);
	});
	
	ownKeys = create(NULL)                                ;
	
	var protoDescriptors = OPTIONS.proto.get(options);
	protoDescriptors && OwnKeys(protoDescriptors).forEach(function (key) {
		ownKeys [key] = belong;
	});
	
	forKeys(options.props, function (name) {
		if ( typeof name!=='string' ) { throw Error$1(__dev__.compile_type); }
		if ( /-|^(?:key$|on|ref$)/.test(name) ) { throw Error$1(__dev__.compile_props); }
		if ( name in PROTO_BUG ) { throw Error$1(__dev__.proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( name in ownKeys  ) { throw Error$1(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	});
	
	forKeys(options.inject, function (name) {
		if ( typeof name!=='string' ) { throw Error$1(__dev__.compile_type); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( name in ownKeys  ) { throw Error$1(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	});
	
	var name                    ;
	
	for ( name in options.methods ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( name in ownKeys ) { throw Error$1(__dev__.compile_redefined); }
		ownKeys[name] = belong;
	}
	
	for ( name in options.computed ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( name in ownKeys ) { throw Error$1(__dev__.compile_redefined); }
		ownKeys[name] = belong;
	}
	
	for ( name in OPTIONS.data.get(options) ) {
		if ( name in ownKeys  ) { throw Error$1(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	}
	
	for ( name in OPTIONS.shadow.get(options) ) {
		if ( name in ownKeys  ) { throw Error$1(__dev__.compile_redefined); }
		ownKeys [name] = belong;
	}
	
	if ( 'constructor' in ownKeys ) { throw Error$1(__dev__.proto); }
	
	OwnKeys(ownKeys).forEach(function (key) {
		if ( key in allKeys ) { throw Error$1(__dev__.compile_overwrite); }
	});
	assign(allKeys, ownKeys);
	
	if ( typeof options==='object' ) {
		name = options.name;
		if ( typeof name==='string'
			? !name || STARTS_WITH_LOWERCASE.test(name) || options.components && name in options.components && options.components[name]!==options
			: name!==undefined$1
		) { throw Error$1(__dev__.compile_name); }
	}
	
	options.emits &&
	( isArray(options.emits) ? options.emits : Keys(options.emits) ).forEach(function (event) {
		if ( typeof event!=='string' ) { throw Error$1(__dev__.compile_type); }
		if ( /(?:capture|once|passive)$/.test('on' + event.toLowerCase()) || /^-?[vV]node/.test(event) ) { throw Error$1(__dev__.compile_emits); }
	});
	
	if (
		options.directives && 'is' in options.directives// 2
		||//@ts-ignore
		options.props && ( isArray(options.props) ? options.props.includes('is') : 'is' in options.props )// 3
	) { throw Error$1(__dev__.compile_is); }
	
	CHECKED.set(belong, allKeys);
	return allKeys;
	
}

var UPPER = /[A-Z]/;
function fixPascal (pascal        , cases       , FunctionalComponent                                ) {
	var First = pascal[0] ;
	var first = First.toLowerCase();
	var rest = pascal.slice(1);
	FunctionalComponent(cases, first + rest);
	hyphenate(first, rest, cases, FunctionalComponent);
	first===First || hyphenate(First, rest, cases, FunctionalComponent);
}
function hyphenate (before        , after        , cases       , FunctionalComponent                                ) {
	var index = after.search(UPPER);
	if ( index<0 ) { FunctionalComponent(cases, before + after); }
	else {
		if ( index ) { before += after.slice(0, index); }
		var char = after[index] ;
		after = after.slice(index + 1);
		hyphenate(before + '-' + char.toLowerCase(), after, cases, FunctionalComponent);
		hyphenate(before + '-' + char, after, cases, FunctionalComponent);
		before[before.length - 1]==='-' || hyphenate(before + char, after, cases, FunctionalComponent);
	}
}

                                                                           
function FunctionalComponentConstructor (Vue3       ) {
	var openBlock = Vue3.openBlock;
	var createBlock = Vue3.createBlock;
	var cache = create(NULL)         ;
	function FunctionalComponent (cases       , name        ) {
		cases[name] = cache[name] || ( cache[name] = function (prop         , context     ) {
			openBlock();
			return createBlock(name, context.attrs, context.slots);
		} );
	}
	OPTIONS.fix.set(Vue3, FunctionalComponent);
	return FunctionalComponent;
}
function FunctionalComponent2 (cases       , name        ) { cases[name] = null; }

var isCustomElement = /*#__PURE__*/test.bind(/^(?:[ad-jl-ru-z]|b(?!ase-transition$)|c(?!omponent$)|k(?!eep-alive$)|s(?!lot$|uspense$)|t(?!e(?:leport|mplate)$|transition(?:-group)?$))/);

var DEV                               = [
	'proto',
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

var prop = /*#__PURE__*/freeze(create(NULL, {
	
	created: { value: created, enumerable: true },
	bind: { value: created, enumerable: true },
	
	updated: { value: updated, enumerable: true },
	componentUpdated: { value: updated, enumerable: true },
	
}));

var _export = /*#__PURE__*/Default({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
	prop: prop,
});

return _export;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvRHluYW1pY1Njb3BlLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCIuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsInYtcHJvcC50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcyNi4xLjAnOyIsImltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IGpvaW4gZnJvbSAnLkFycmF5LnByb3RvdHlwZS5qb2luJztcbmltcG9ydCB1bnNoaWZ0IGZyb20gJy5BcnJheS5wcm90b3R5cGUudW5zaGlmdCc7XG5cbnZhciBvYmplY3QgPSB7XG5cdCcwJzogJzEnLCAnMSc6ICcyJywgJzInOiAnMycsICczJzogJzQnLCAnNCc6ICc1JywgJzUnOiAnNicsICc2JzogJzcnLCAnNyc6ICc4JywgJzgnOiAnOScsICc5JzogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn0gICAgICAgICA7XG5cbnZhciBsYXN0SXRlbSAgICAgICA9ICd6JztcbnZhciBhcnJheSAgICAgICAgID0gWyBsYXN0SXRlbSBdO1xudmFyIGxhc3RJbmRleCAgICAgICAgID0gYXJyYXkubGVuZ3RoIC0gMTtcblxudmFyIG5vdEtleXdvcmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Rlc3QuYmluZCgvXFxkLyk7XG52YXIgdG9TdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9qb2luLmJpbmQoYXJyYXksICcnKTtcbnZhciBwcmVwZW5kQSAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Vuc2hpZnQuYmluZChhcnJheSwgJ2EnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSAgICAgICAgIHtcblx0aWYgKCBsYXN0SXRlbT09PSc5JyApIHtcblx0XHRhcnJheVtsYXN0SW5kZXhdID0gJ2EnO1xuXHRcdHZhciBzdHJpbmcgICAgICAgIDtcblx0XHRpZiAoIG5vdEtleXdvcmQoc3RyaW5nID0gdG9TdHJpbmcoKSkgKSB7XG5cdFx0XHRsYXN0SXRlbSA9ICdhJztcblx0XHRcdHJldHVybiBzdHJpbmc7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsYXN0SXRlbSE9PSd6JyApIHtcblx0XHRsYXN0SXRlbSA9IGFycmF5W2xhc3RJbmRleF0gPSBvYmplY3RbbGFzdEl0ZW1dO1xuXHRcdHJldHVybiB0b1N0cmluZygpO1xuXHR9XG5cdGxhc3RJdGVtID0gYXJyYXlbbGFzdEluZGV4XSA9ICcwJztcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IGluZGV4OyBhcnJheVtpbmRleF0gPSAnMCcgKSB7XG5cdFx0dmFyIGl0ZW0gICAgICAgPSBhcnJheVstLWluZGV4XSA7XG5cdFx0aWYgKCBpdGVtIT09J3onICkge1xuXHRcdFx0YXJyYXlbaW5kZXhdID0gb2JqZWN0W2l0ZW1dO1xuXHRcdFx0cmV0dXJuIHRvU3RyaW5nKCk7XG5cdFx0fVxuXHR9XG5cdGxhc3RJbmRleCA9IHByZXBlbmRBKCkgLSAxO1xuXHRyZXR1cm4gdG9TdHJpbmcoKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSAvKiNfX1BVUkVfXyovY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdICk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyYWN0ZXJdIHx8ICggZ3JvdXBbY2hhcmFjdGVyXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICApLCBicmFuY2guc2xpY2UoY2hhcmFjdGVyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kQ29kZUJyYW5jaChncm91cFtjaGFyYWN0ZXJdIHx8ICggZ3JvdXBbY2hhcmFjdGVyXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgICAgICAgLCBuZWVkRXNjYXBlICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGJyYW5jaGVzICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCAgICAgICAgICAgPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggICAgICAgICAgPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhcmFjdGVyIGluIGdyb3VwICkge1xuXHRcdGlmICggY2hhcmFjdGVyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyAgICAgICAgID0gc291cmNpZnkoZ3JvdXBbY2hhcmFjdGVyXSAsIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJyArIGNoYXJhY3RlcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyYWN0ZXIgKyBzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXJhY3Rlcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gIDogJ1snICsgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSArICddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonICsgYnJhbmNoZXMuam9pbignfCcpICsgJyknXG5cdFx0KVxuXHRcdCsgKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbD8nO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG52YXIgXyAgICAgID0gU3ltYm9sID8gLyojX19QVVJFX18qL1N5bWJvbCgnXycpICAgICAgICA6ICdfJztcblxuZnVuY3Rpb24gJCAgICAgICAgICAgICAgICAgICggICAgICAgICBjc3MgICAgICAgICAsIG1lZGlhICAgICAgICAgKSAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXNbX10oY3NzKTsgfVxuXHRpZiAoIG1lZGlhIT09dW5kZWZpbmVkICkgeyBzdHlsZS5tZWRpYSA9IG1lZGlhOyB9XG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IHsgXywgJCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgcHJlcGFyZV8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB0eXBlb2YgXz09PSdzeW1ib2wnID8gbnVsbCA6IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHZhciBfZGVzY3JpcHRvciA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICA7XG5cdF9kZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0X2Rlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXHRfZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0cmV0dXJuIGZ1bmN0aW9uICQgKHNjb3BlICAgICAgICkgeyBkZWZpbmVQcm9wZXJ0eShzY29wZSwgXywgX2Rlc2NyaXB0b3IpOyB9O1xufSgpO1xuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIFJlZ0V4cCgnX18nICsgZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpICsgJ19fJywgJ2cnKTsgfVxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkgeyByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV0gOyB9OyB9XG5cbnZhciBTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICApICAgICAgIHtcblx0cHJlcGFyZV8gJiYgcHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF0gXSA9IElkZW50aWZpZXIoKTsgfVxufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxudmFyIFNDT1BFICAgICAgICAgICAgICA9IFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IC8qI19fUFVSRV9fKi9mcmVlemUoY3JlYXRlKG51bGwsIHtcblx0JDogeyB2YWx1ZTogJCwgd3JpdGFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiBmYWxzZSB9LFxufSkgICAgICAgICAgICAgICApO1xuXG52YXIgSW5oZXJpdGVkU3RhdGljU2NvcGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBJbmhlcml0ZWRTdGF0aWNTY29wZSAoICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICAgLCBwcm90byAgICAgICAgICAgICApICAgICAgIHtcblx0XHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0XHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF0gXSA9IElkZW50aWZpZXIoKTsgfVxuXHRcdGZvciAoIHZhciBrZXkgaW4gcHJvdG8gKSB7IC8qa2V5PT09J18nIHx8IGtleT09PSckJyB8fCAoICovXG5cdFx0XHRrZXlzW2tleXMubGVuZ3RoXSA9IGtleS8qICkqLztcblx0XHR9XG5cdFx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdFx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHR9XG5cdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xuXHRyZXR1cm4gSW5oZXJpdGVkU3RhdGljU2NvcGU7XG59KCkgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IHsgU3RhdGljU2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRTdGF0aWNTY29wZSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJleHBvcnQgZGVmYXVsdCAvW15cXHgwMC1AWy1gey1cXHg3Rlxcc11bXlxceDAwLS86LUBbLWB7LVxceDdGXFxzXSooPzpfW15cXHgwMC0vOi1AWy1gey1cXHg3Rlxcc10rKSovZzsiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuXG5pbXBvcnQgS0VZUyBmcm9tICcuL0tFWVMnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBfX0tFWV9fID0gUmVnRXhwKCdfXycgKyBLRVlTLnNvdXJjZSArICdfXycsICdnJyk7XG5cbmZ1bmN0aW9uIGdldCAoY2FjaGUgICAgICAgICAgICAgLCBrZXkgICAgICAgICkgICAgICAgICB7IHJldHVybiBjYWNoZVtrZXldIHx8ICggY2FjaGVba2V5XSA9IElkZW50aWZpZXIoKSApOyB9XG5cbmZ1bmN0aW9uIHNjb3BpZnkgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FjaGUgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGtleXMgICAgICAgICxcblx0XHRpbmRleCAgICAgICAgLFxuXHRcdHZhbHVlcyAgICAgICAgICAsXG5cdFx0a2V5ICAgICAgICA7XG5cdGlmICggdmFsdWUgKSB7XG5cdFx0c3dpdGNoICggdHlwZW9mIHZhbHVlICkge1xuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0aWYgKCB2YWx1ZS5pbmRleE9mKCcgJyk8MCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZ2V0KGNhY2hlLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZXMubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVstLWluZGV4XSA7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGdldChjYWNoZSwga2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlWy0taW5kZXhdLCBjYWNoZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK2dldChjYWNoZSwga2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRpZiAoIGxlbmd0aD4xICkge1xuXHRcdFx0dmFsdWUgPSBbIHZhbHVlLCBhcmd1bWVudHNbMV0gXTtcblx0XHRcdGZvciAoIHZhciBpbmRleCA9IDI7IGluZGV4IT09bGVuZ3RoOyArK2luZGV4ICkgeyAoIHZhbHVlICAgICAgICAgIClbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gc2NvcGlmeSh2YWx1ZSwgY2FjaGUpO1xuXHR9ICAgICAgICAgICAgICAgIDtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfX0tFWV9fLCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBnZXQoY2FjaGUsIF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IER5bmFtaWNTY29wZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCBtYXRjaCBmcm9tICcuU3RyaW5nLnByb3RvdHlwZS5tYXRjaCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBTdGF0aWNTY29wZSwgSW5oZXJpdGVkU3RhdGljU2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgRHluYW1pY1Njb3BlIGZyb20gJy4vRHluYW1pY1Njb3BlJztcbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5cbmZ1bmN0aW9uIHRocm93RW1wdHkgKGtleXMgICAgICAgICkgICAgICAgIHsgdGhyb3cgRXJyb3IoJ1Njb3BlKFwiJyArIGtleXMgKyAnXCIpJyk7IH1cbnZhciBpc1N0YXRpY1Njb3BlID0gLyojX19QVVJFX18qL2lzUHJvdG90eXBlT2YuYmluZChTQ09QRSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbnZhciBtYXRjaF9jYWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL21hdGNoLmNhbGwuYmluZChtYXRjaCk7XG5cbmZ1bmN0aW9uIG1peCAocHJvdG9zICAgICAgICAgKSAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgICAgICAgICAgICAgID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvICAgICAgICA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9IHByb3RvLnByb3RvdHlwZTsgfVxuXHRcdGZvciAoIHZhciBpZCBpbiBwcm90byApIHsgc2NvcGVbaWRdID0gcHJvdG9baWRdOyB9XG5cdH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbnZhciBTY29wZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIFNjb3BlICggICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgKSAgICAgICAge1xuXHRcdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdGhpcyApIHtcblx0XHRcdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKG1peCh0aGlzICAgICAgICAgICApKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIGlzU3RhdGljU2NvcGUodGhpcy5wcm90b3R5cGUpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSkpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCBpc1N0YXRpY1Njb3BlKHRoaXMpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKFNDT1BFKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKCB0aGlzICkge1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHZhciBzY29wZSAgICAgICAgICAgICAgPSBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiBpc1N0YXRpY1Njb3BlKHRoaXMucHJvdG90eXBlKSApIHsgc2NvcGUgPSBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIGlzU3RhdGljU2NvcGUodGhpcykgKSB7IHNjb3BlID0gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKG1hdGNoX2NhbGwoa2V5cywgS0VZUykgfHwgdGhyb3dFbXB0eShrZXlzKSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gdGhpcyk7IH1cblx0XHRcdFx0ZWxzZSB7IHJldHVybiBuZXcgU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpKTsgfVxuXHRcdFx0XHRJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcblx0XHRcdFx0cmV0dXJuIHNjb3BlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHJldHVybiBuZXcgU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpKTsgfVxuXHRcdH1cblx0fVxuXHQvL0B0cy1pZ25vcmVcblx0U2NvcGUucHJvdG90eXBlID0gbnVsbDtcblx0cmV0dXJuIGZyZWV6ZShTY29wZSk7XG59KCk7XG5cbmV4cG9ydCB7IFNjb3BlIGFzIGRlZmF1bHQsIEtFWVMgfTsiLCJpbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gVGVtcGxhdGUgKGh0bWwgICAgICAgICwgc2NvcGUgICAgICAgKSAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi9zY29wZVtfXShodG1sKTtcbn1cblxuZXhwb3J0IHsgVGVtcGxhdGUgYXMgZGVmYXVsdCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5pbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG52YXIgSVNfTk9UX0VTNSA9IC8qI19fUFVSRV9fKi90ZXN0LmJpbmQoL14oY29uc3xsZSl0IC8pO1xuXG5mdW5jdGlvbiBXaXRoU3RyaXBwZWQgKHJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZTtcblx0cmV0dXJuIHJlbmRlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyIChjb2RlICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRyZXR1cm4gY29kZVswXT09PScoJ1xuXHRcdD8gLyojX19QVVJFX18qL0Z1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm4gY2xhc3MgUmVuZGVyIGV4dGVuZHMgbnVsbHtjb25zdHJ1Y3RvcicgKyAoIHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlICkgKyAnfTsnKSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdDogLyojX19QVVJFX18qL1dpdGhTdHJpcHBlZChcblx0XHRcdC8qI19fUFVSRV9fKi9GdW5jdGlvbigvKiNfX1BVUkVfXyovSVNfTk9UX0VTNShjb2RlKVxuXHRcdFx0XHQ/ICdcInVzZSBzdHJpY3RcIjtyZXR1cm57cmVuZGVyKCl7JyArICggc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUgKSArICd9fS5yZW5kZXI7J1xuXHRcdFx0XHQ6ICdcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24gcmVuZGVyKCl7JyArICggc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUgKSArICd9Oydcblx0XHRcdCkoKSAgICAgICAgICBcblx0XHQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGNvZGVzLmxlbmd0aDtcblx0dmFyIGJvZHkgICAgICAgICA9ICddJztcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4OyApIHsgYm9keSA9ICdmdW5jdGlvbigpeycgKyBzY29wZV8oY29kZXNbLS1pbmRleF0gKSArICd9LCcgKyBib2R5OyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleCApIHsgYm9keSA9ICdmdW5jdGlvbigpeycgKyBjb2Rlc1stLWluZGV4XSArICd9LCcgKyBib2R5OyB9XG5cdH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bJyArIGJvZHkpKCk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHlsZSAoY3NzICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFJlZmxlY3QhPT0ndW5kZWZpbmVkJyA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiAvKiNfX1BVUkVfXyovIE9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgcHJvcGVydHlJc0VudW1lcmFibGUgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnO1xuaW1wb3J0IGVycm9yIGZyb20gJy5jb25zb2xlLmVycm9yJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5leHBvcnQgdmFyIHRoYXQgICAgICAgICAgICAgICAgID0gbnVsbDtcblxuZXhwb3J0IHZhciBOQU1FUyA9IGFzc2lnbiAmJiAvKiNfX1BVUkVfXyovYXNzaWduKGNyZWF0ZShudWxsKSwge1xuXHRfOiBudWxsLFxuXHRfYzogbnVsbCxcblx0X2NvbXB1dGVkV2F0Y2hlcnM6IG51bGwsXG5cdF9kYXRhOiBudWxsLFxuXHRfZGlyZWN0SW5hY3RpdmU6IG51bGwsXG5cdF9ldmVudHM6IG51bGwsXG5cdF9oYXNIb29rRXZlbnQ6IG51bGwsXG5cdF9oYXNNb3ZlOiBudWxsLFxuXHRfaW5hY3RpdmU6IG51bGwsXG5cdF9pc0JlaW5nRGVzdHJveWVkOiBudWxsLFxuXHRfaXNEZXN0cm95ZWQ6IG51bGwsXG5cdF9pc01vdW50ZWQ6IG51bGwsXG5cdF9pc1Z1ZTogbnVsbCxcblx0X2xlYXZpbmc6IG51bGwsXG5cdF9uYW1lOiBudWxsLFxuXHRfcHJvcHM6IG51bGwsXG5cdF9wcm92aWRlZDogbnVsbCxcblx0X3JlZmxvdzogbnVsbCxcblx0X3JlbmRlclByb3h5OiBudWxsLFxuXHRfc2VsZjogbnVsbCxcblx0X3N0YXRpY1RyZWVzOiBudWxsLFxuXHRfdWlkOiBudWxsLFxuXHRfdXBkYXRlOiBudWxsLFxuXHRfdm5vZGU6IG51bGwsXG5cdF93YXRjaGVyOiBudWxsLFxuXHRfd2F0Y2hlcnM6IG51bGwsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb1Byb3RvIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0ZGVmaW5lUHJvcGVydGllcyhfID8gXy5jdHggOiBzZWxmLCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9Db25zdHJ1Y3RvciAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9OYW1lcyAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAsIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdHZhciBkYXRhID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGF0YU5hbWVzKSAgICAgICAgO1xuXHRpZiAoIF8gKSB7XG5cdFx0dmFyIGFjY2Vzc0NhY2hlID0gXy5hY2Nlc3NDYWNoZTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBkYXRhTmFtZXMgKSB7XG5cdFx0XHRkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0XHRpZiAoIG5hbWUgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0Zm9yICggbmFtZSBpbiBkYXRhTmFtZXMgKSB7IGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTsgfVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9EYXRhIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIGRlZmluZVByb3BlcnRpZXMoY3R4LCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0aWYgKCBfICkge1xuXHRcdHZhciBhY2Nlc3NDYWNoZSA9IF8uYWNjZXNzQ2FjaGU7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIHJlc3ROYW1lcyApICYmIG5hbWVbMF0hPT0nJCcgKSB7XG5cdFx0XHRcdGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRcdFx0aWYgKCBuYW1lIGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBub3dOYW1lcyA9IEtleXMoY3R4KTtcblx0XHR2YXIgaW5kZXggPSBub3dOYW1lcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpbmRleCApIHtcblx0XHRcdG5hbWUgPSBub3dOYW1lc1stLWluZGV4XSA7XG5cdFx0XHRpZiAoICEoIG5hbWUgaW4gcmVzdE5hbWVzICkgJiYgbmFtZVswXSE9PSckJyApIHsgZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdOyB9XG5cdFx0fVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZEYXRhIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgc2tpcERhdGEgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgLCBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBza2lwQ29uc3RydWN0b3IgICAgICAgICAsIF9fZGV2X18gICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyAmJiAhKCBuYW1lIGluIE5BTUVTICkgKSB7XG5cdFx0XHRlcnJvcihFcnJvcignW2pWdWUgYnVnXTogdm0uJyArIG5hbWUgKyAnIGlzIHVua25vd24gYnV0IGV4aXN0cycpKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHR2YXIgb2xkRGVzY3JpcHRvcnMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGN0eCksIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRpZiAoIHByb3RvRGVzY3JpcHRvcnMgKSB7XG5cdFx0Zm9yICggdmFyICRuYW1lIGluIHByb3RvRGVzY3JpcHRvcnMgKSB7IGlmICggJG5hbWUgaW4gY3R4ICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVzZXJ2ZWQpOyB9IH1cblx0XHRkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdH1cblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0b3duS2V5cyhvbGREZXNjcmlwdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dmFyIG9sZERlc2NyaXB0b3IgPSBvbGREZXNjcmlwdG9yc1trZXldIDtcblx0XHR2YXIgbmV3RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdHgsIGtleSAgICAgICAgICAgICAgICAgKTtcblx0XHRpZiAoXG5cdFx0XHQhbmV3RGVzY3JpcHRvciB8fFxuXHRcdFx0bmV3RGVzY3JpcHRvci5jb25maWd1cmFibGUhPT1vbGREZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSB8fFxuXHRcdFx0bmV3RGVzY3JpcHRvci5lbnVtZXJhYmxlIT09b2xkRGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8XG5cdFx0XHQoIG5ld0Rlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHQ/IG5ld0Rlc2NyaXB0b3IudmFsdWUhPT1vbGREZXNjcmlwdG9yLnZhbHVlIHx8IG5ld0Rlc2NyaXB0b3Iud3JpdGFibGUhPT1vbGREZXNjcmlwdG9yLndyaXRhYmxlXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0OiBuZXdEZXNjcmlwdG9yLmdldCE9PW9sZERlc2NyaXB0b3IuZ2V0IHx8IG5ld0Rlc2NyaXB0b3Iuc2V0IT09b2xkRGVzY3JpcHRvci5zZXRcblx0XHRcdClcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3JlZGVmaW5lZCk7IH1cblx0fSk7XG5cdHZhciBkaWZLZXlzICAgICAgICAgICAgICAgICAgICAgICAgPSBvd25LZXlzKGN0eCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gISgga2V5IGluIG9sZERlc2NyaXB0b3JzICk7XG5cdH0pO1xuXHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHtcblx0XHRpZiAoIGRpZktleXMubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0fVxuXHR2YXIgZGlmTmFtZXMgPSBkaWZLZXlzLmZpbHRlcihmdW5jdGlvbiAoa2V5KSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHR5cGVvZiBrZXk9PT0nc3RyaW5nJyAmJiBrZXlbMF0hPT0nJCc7XG5cdH0pO1xuXHRpZiAoIHNraXBEYXRhICkge1xuXHRcdGlmICggZGlmTmFtZXMubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0fVxuXHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHR2YXIgY291bnQgPSAwO1xuXHRcdGZvciAoIG5hbWUgaW4gZGF0YU5hbWVzICkgeyArK2NvdW50OyB9XG5cdFx0aWYgKCBjb3VudCE9PWRpZk5hbWVzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIGRhdGFOYW1lcyApICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0XHR9KTtcblx0fVxuXHRkaWZOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgIG5hbWUpIHtcblx0XHRpZiAoIG5hbWUgaW4gdGhpcyAmJiAhKCBuYW1lIGluIHt9ICkgfHwgbmFtZSBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lPT09J2NvbnN0cnVjdG9yJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XHRpZiAoICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGN0eCwgbmFtZSkpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2VudW1lcmFibGUpOyB9XG5cdH0sIGdldFByb3RvdHlwZU9mKGN0eCkpO1xuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdCggZGF0YSAgICAgICAgIClbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRpZiAoIF8gJiYgbmFtZSBpbiBfLmFjY2Vzc0NhY2hlICkgeyBfLmFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0fSk7XG5cdGlmICggc2hhZG93QXNzaWduZXIgKSB7XG5cdFx0c2hhZG93Q2hlY2tlciAoZGF0YSk7XG5cdFx0c2hhZG93QXNzaWduZXIoc2VsZiwgZGF0YSk7XG5cdH1cblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBJTklUID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIElOSVQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICA7XG5cdElOSVQubW9kZSA9ICdvcGVuJztcblx0cmV0dXJuIElOSVQ7XG59KCk7XG5cbmZ1bmN0aW9uIGF0dGFjaCAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGVsICYmICggZWwuc2hhZG93Um9vdCB8fCBlbC5hdHRhY2hTaGFkb3coSU5JVCkgKTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93QXNzaWduZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0dmFyIG5hbWVzID0gaW5kZXg8MCA/IG51bGwgOiBhbG9uZy5zbGljZShpbmRleCArIDEpLnNwbGl0KCcuJyk7XG5cdHZhciB0b05hbWUgPSBuYW1lcyA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIG5hbWVzICkge1xuXHRcdGlmICggbmFtZXMubGVuZ3RoPT09MSApIHtcblx0XHRcdHZhciBuYW1lJGdldCA9IG5hbWVzWzBdICsgJyRnZXQnO1xuXHRcdFx0dmFyIG5hbWUkc2V0ID0gbmFtZXNbMF0gKyAnJHNldCc7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0YWxsW25hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0YWxsW25hbWUkZ2V0XSA9IG51bGw7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdG5hbWVzIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICApIHtcblx0XHRcdFx0XHRhbGxbbmFtZSArICckc2V0J10gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWVdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0XHRhbGxbbmFtZSArPSAnJGdldCddID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gdG9OYW1lICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gdG9OYW1lICsgJyRzZXQnO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgLCBkYXRhICAgICApIHtcblx0XHRcdGRhdGFbdG9OYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdGRhdGFbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dDaGVja2VyICggICAgICAgICAgICBhbG9uZyAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgc2hhZG93TmFtZXMgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGlmICggYWxvbmdbMF09PT0nXycgfHwgYWxvbmdbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0aWYgKCBpbmRleDwwICkge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRzZXQnO1xuXHRcdGlmICggdG9OYW1lJGdldCBpbiByZXN0TmFtZXMgfHwgdG9OYW1lJHNldCBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdHNoYWRvd05hbWVzW3RvTmFtZSRzZXRdID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggdG9OYW1lJGdldCBpbiBkYXRhTmFtZXMgfHwgdG9OYW1lJHNldCBpbiBkYXRhTmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgZGF0YSAgICAgICkge1xuXHRcdFx0aWYgKCB0b05hbWUkZ2V0IGluIGRhdGEgfHwgdG9OYW1lJHNldCBpbiBkYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc2hhZG93KTsgfVxuXHRcdH07XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBhbG9uZz09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCBhbG9uZyBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbYWxvbmddID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YU5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9O1xuXHR9XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwPyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgZnJvbSBmcm9tICcuQXJyYXkuZnJvbT8nO1xuaW1wb3J0IGdldFByb3RvdHlwZU9mIGZyb20gJy5SZWZsZWN0LmdldFByb3RvdHlwZU9mPz1PYmplY3QuZ2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gJy5PYmplY3Quc2V0UHJvdG90eXBlT2Y/JztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/JztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0IGZyb20gJy5SZWZsZWN0LmdldD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgT3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBQUk9UT19CVUcgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgd2luZG93IGZyb20gJy53aW5kb3cnO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgdGhhdCwgTkFNRVMsIHByb1Byb3RvLCBwcm9Db25zdHJ1Y3RvciwgcHJvTmFtZXMsIHByb0RhdGEsIGRldkRhdGEgfSBmcm9tICcuL0RhdGEnO1xuaW1wb3J0IHsgU2hhZG93QXNzaWduZXIsIFNoYWRvd0NoZWNrZXIgfSBmcm9tICcuL1NoYWRvdyc7XG5cbmV4cG9ydCB7IENvbXBvbmVudCBhcyBkZWZhdWx0IH07XG52YXIgQ29tcG9uZW50ICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9mcmVlemUoLyojX19QVVJFX18qL2RlZmluZVByb3BlcnRpZXMoXG5cdGZ1bmN0aW9uIENvbXBvbmVudCAoKSB7IHJldHVybiB0aGF0OyB9LFxuXHR7XG5cdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHR9LFxuXHRcdHJlbmRlcjoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIHJlbmRlciAoICAgICAgICAgICkgeyB0aHJvdyBUeXBlRXJyb3IoJ0NvbXBvbmVudC5yZW5kZXI9Jyk7IH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHJlbmRlciAoICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICAgICAgICApIHsgKCB0aGF0IC5fIHx8IHRoYXQgLiRvcHRpb25zICkucmVuZGVyID0gdmFsdWU7IH0sXG5cdFx0fSxcblx0XHRfbWFpbjoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIF9tYWluICggICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgQ29tcG9uZW50ID0gdGhpcztcblx0XHRcdFx0aWYgKCAhaXNDb21wb25lbnRDb25zdHJ1Y3RvcihDb21wb25lbnQpICkgeyB0aHJvdyBUeXBlRXJyb3IoJyghQ29tcG9uZW50KS5fbWFpbicpOyB9XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiBfbWFpbiAoICAgICAgICAgICAgICkgICAgICAge1xuXHRcdFx0XHRcdGlmICggb25jZSApIHsgdGhyb3cgRXJyb3IoJ0NvbXBvbmVudC5fbWFpbigpeDInKTsgfVxuXHRcdFx0XHRcdGlmICggdGhpcyE9PUNvbXBvbmVudCAmJiBpc0NvbXBvbmVudENvbnN0cnVjdG9yKHRoaXMpICkgeyB0aHJvdyBUeXBlRXJyb3IoJyhDb21wb25lbnQhdGhpcykuX21haW4oKScpOyB9XG5cdFx0XHRcdFx0dmFyIFZ1ZSA9IEZ1bmN0aW9uKCdyZXR1cm4gVnVlJykoKTtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBWdWU9PT0nb2JqZWN0JyApIHtcblx0XHRcdFx0XHRcdHZhciBkZXYgPVxuXHRcdFx0XHRcdFx0XHQnX19WVUVfXycgaW4gd2luZG93ICYmXG5cdFx0XHRcdFx0XHRcdCdfX1ZVRV9ITVJfUlVOVElNRV9fJyBpbiB3aW5kb3cgJiZcblx0XHRcdFx0XHRcdFx0aXNBcnJheSgoIHdpbmRvdyAgICAgICAgKS5kZXZ0b29sc0Zvcm1hdHRlcnMpO1xuXHRcdFx0XHRcdFx0dmFyIGFwcCA9IFZ1ZS5jcmVhdGVBcHAoXG5cdFx0XHRcdFx0XHRcdFRvT3B0aW9ucyhcblx0XHRcdFx0XHRcdFx0XHRDb21wb25lbnQsXG5cdFx0XHRcdFx0XHRcdFx0VnVlLFxuXHRcdFx0XHRcdFx0XHRcdGRldiA/IGNyZWF0ZShOVUxMKSA6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0YXBwLmNvbmZpZy5pc0N1c3RvbUVsZW1lbnQgPSBpc0N1c3RvbUVsZW1lbnQ7XG5cdFx0XHRcdFx0XHRpZiAoIGRldiApIHsgYXBwLmNvbmZpZy5wZXJmb3JtYW5jZSA9IHRydWU7IH1cblx0XHRcdFx0XHRcdGFwcC5tb3VudChkb2N1bWVudC5ib2R5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRuZXcgKCBWdWUuZXh0ZW5kKFxuXHRcdFx0XHRcdFx0XHRUb09wdGlvbnMoXG5cdFx0XHRcdFx0XHRcdFx0Q29tcG9uZW50LFxuXHRcdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdFx0XHRWdWUuZGV2dG9vbHMgPyAoIFZ1ZS5jb25maWcuaWdub3JlZEVsZW1lbnRzLnB1c2goU1RBUlRTX1dJVEhfTE9XRVJDQVNFKSwgVnVlLmNvbmZpZy5wZXJmb3JtYW5jZSA9IHRydWUsIGNyZWF0ZShOVUxMKSApIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0XHRcdEZ1bmN0aW9uYWxDb21wb25lbnQyXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCkgKSgpXG5cdFx0XHRcdFx0XHQuJG1vdW50KCggZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnPGJyPicsICdicicgKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG9uY2UgPSB0cnVlO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdHNldDogdW5kZWZpbmVkLFxuXHRcdH0sXG5cdFx0X3RvT3B0aW9uczoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gX3RvT3B0aW9ucyAoICAgICAgICAgICAgICAgIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdGlmICggIWlzQ29tcG9uZW50Q29uc3RydWN0b3IodGhpcykgKSB7IHRocm93IFR5cGVFcnJvcignKCFDb21wb25lbnQpLl90b09wdGlvbnMoKScpOyB9XG5cdFx0XHRcdHJldHVybiBUb09wdGlvbnModGhpcywgVnVlMywgX19kZXZfXywgVnVlMyA/IE9QVElPTlMuZml4LmdldChWdWUzKSB8fCBGdW5jdGlvbmFsQ29tcG9uZW50Q29uc3RydWN0b3IoVnVlMykgOiBGdW5jdGlvbmFsQ29tcG9uZW50Mik7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdH1cbikpO1xudmFyIG9uY2UgPSBmYWxzZTtcblxuZnVuY3Rpb24gVG9PcHRpb25zICggICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBGdW5jdGlvbmFsQ29tcG9uZW50ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBESURfT1BUSU9OUyA9IE9QVElPTlMub2JqZWN0cy5pbnRvKF9fZGV2X18gfHwgT1BUSU9OUyAgICAgICApLmludG8oRnVuY3Rpb25hbENvbXBvbmVudCB8fCBPUFRJT05TICAgICAgICk7XG5cdHZhciBUTVBfT1BUSU9OUyA9IG5ldyBPUFRJT05TLm9iamVjdHNUbXA7XG5cdHZhciBvcHRpb25zID0gT3B0aW9ucyhcblx0XHRjb25zdHJ1Y3Rvcixcblx0XHRWdWUzIHx8IHVuZGVmaW5lZCxcblx0XHRfX2Rldl9fID8gREVWLnJlZHVjZShmdW5jdGlvbiBEZXYgKGRldiwga2V5KSB7XG5cdFx0XHRkZXZba2V5XSA9IF9fZGV2X18gW2tleV0gfHwga2V5O1xuXHRcdFx0cmV0dXJuIGRldjtcblx0XHR9LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCxcblx0XHRESURfT1BUSU9OUyxcblx0XHRUTVBfT1BUSU9OUyxcblx0XHRGdW5jdGlvbmFsQ29tcG9uZW50IHx8IG51bGxcblx0KTtcblx0VE1QX09QVElPTlMuZm9yRWFjaCAoZnVuY3Rpb24gKG9wdGlvbnNWYWx1ZSwgY29uc3RydWN0b3JLZXkpIHsgRElEX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yS2V5LCBvcHRpb25zVmFsdWUpOyB9KTtcblx0cmV0dXJuIG9wdGlvbnM7XG59XG5cbnZhciBfbWl4aW5zICAgICAgICAgICAgICAgID0gU3ltYm9sICYmIC8qI19fUFVSRV9fKi9TeW1ib2woJ19taXhpbnMnKSAgICAgICAgICAgICAgICAgO1xuXG5mdW5jdGlvbiBfX1BVUkVfXyAoICAgICAgICAgICAgU3ViICAgICAsIG1peGlucyAgICAgICApIHtcblx0U3ViLnByb3RvdHlwZSA9IG51bGw7XG5cdFN1YltfbWl4aW5zXSA9IG1peGlucztcblx0cmV0dXJuIHNldFByb3RvdHlwZU9mKFN1YiwgQ29tcG9uZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1peGluICggICAgICAgICAgKSB7XG5cdHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG5cdFx0PyAvKiNfX1BVUkVfXyovX19QVVJFX18oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhhdDsgfSwgLyojX19QVVJFX18qL2Zyb20oYXJndW1lbnRzKSlcblx0XHQ6IENvbXBvbmVudDtcbn1cblxuZnVuY3Rpb24gT3B0aW9ucyAoY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAsIERJRF9PUFRJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgVE1QX09QVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEZ1bmN0aW9uYWxDb21wb25lbnQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgIHtcblx0XG5cdHZhciBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgID0gRElEX09QVElPTlMuZ2V0KGNvbnN0cnVjdG9yKSB8fCBUTVBfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoIG9wdGlvbnMgKSB7IHJldHVybiBvcHRpb25zOyB9XG5cdE9QVElPTlMuY29uc3RydWN0b3Iuc2V0KG9wdGlvbnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICwgY29uc3RydWN0b3IpO1xuXHRcblx0aWYgKCBpc01peGlucyhjb25zdHJ1Y3RvcikgKSB7XG5cdFx0dmFyIHN0YXRpY19taXhpbnMgPSBjb25zdHJ1Y3RvcltfbWl4aW5zXSA7XG5cdFx0dmFyIG1peGlucyA9IG5ldyBPUFRJT05TLlNldCAgICAgICAgICAgICgpO1xuXHRcdHZhciBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PXN0YXRpY19taXhpbnMubGVuZ3RoICkge1xuXHRcdFx0dmFyIG1peGluID0gc3RhdGljX21peGluc1tpbmRleCsrXSA7XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IobWl4aW4pICkge1xuXHRcdFx0XHR2YXIgbWl4aW5PcHRpb25zID0gT3B0aW9ucyhtaXhpbiwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TLCBGdW5jdGlvbmFsQ29tcG9uZW50KTtcblx0XHRcdFx0aWYgKCBpc01peGlucyhtaXhpbikgKSB7XG5cdFx0XHRcdFx0dmFyIG1peGluTWl4aW5zID0gbWl4aW5PcHRpb25zLm1peGlucyA7XG5cdFx0XHRcdFx0dmFyIG1peGluSW5kZXggPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggbWl4aW5JbmRleCE9PW1peGluTWl4aW5zLmxlbmd0aCApIHsgbWl4aW5zLmFkZChtaXhpbk1peGluc1ttaXhpbkluZGV4KytdICk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHsgbWl4aW5zLmFkZChtaXhpbk9wdGlvbnMpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgbWl4aW5zLmFkZChtaXhpbiAgICAgICAgICAgICAgKTsgfVxuXHRcdH1cblx0XHRvcHRpb25zLm1peGlucyA9IGZyb20obWl4aW5zKTtcblx0XHRfX2Rldl9fICYmIGNoZWNrKG9wdGlvbnMsIF9fZGV2X18pO1xuXHRcdGNvbGxlY3ROYW1lcyhvcHRpb25zLCBjb25zdHJ1Y3Rvcik7XG5cdFx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XHRyZXR1cm4gb3B0aW9ucztcblx0fVxuXHRcblx0dmFyIHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcblx0XG5cdHZhciBTdXBlciA9IE9QVElPTlMuc3VwZXIuZ2V0KGNvbnN0cnVjdG9yKTtcblx0aWYgKCAhU3VwZXIgKSB7XG5cdFx0T1BUSU9OUy5zdXBlci5zZXQoY29uc3RydWN0b3IsIFN1cGVyID0gZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IpKTtcblx0XHRTdXBlcj09PUNvbXBvbmVudCB8fCBpc01peGlucyhTdXBlcikgfHwgKCBzZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvciwgQ29tcG9uZW50KSwgc2V0UHJvdG90eXBlT2YocHJvdG90eXBlLCBudWxsKSApO1xuXHR9XG5cdGlmICggU3VwZXIhPT1Db21wb25lbnQgKSB7XG5cdFx0dmFyIFN1cGVyT3B0aW9ucyA9IE9wdGlvbnMoU3VwZXIsIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUywgRnVuY3Rpb25hbENvbXBvbmVudCk7XG5cdFx0aXNNaXhpbnMoU3VwZXIpXG5cdFx0XHQ/IFN1cGVyT3B0aW9ucy5taXhpbnMgLmxlbmd0aD09PTFcblx0XHRcdD8gb3B0aW9ucy5leHRlbmRzID0gU3VwZXJPcHRpb25zLm1peGlucyBbMF1cblx0XHRcdDogb3B0aW9ucy5taXhpbnMgPSBTdXBlck9wdGlvbnMubWl4aW5zXG5cdFx0XHQ6IG9wdGlvbnMuZXh0ZW5kcyA9IFN1cGVyT3B0aW9ucztcblx0fVxuXHRcblx0X19kZXZfXyAmJiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY29uc3RydWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKHN5bWJvbCkge1xuXHRcdGlmICggc3ltYm9sIT09X21peGlucyAmJiAhKCBzeW1ib2wgaW4gU1lNQk9MUyApICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc3ltYm9sKTsgfVxuXHR9KTtcblx0XG5cdHZhciBzZXQgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2U2V0LmJpbmQoX19kZXZfXykgOiBwcm9TZXQ7XG5cdHZhciBhc3NlcnRGdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgID0gX19kZXZfXyA/IGRldkFzc2VydEZ1bmN0aW9uLmJpbmQoX19kZXZfXykgOiBwcm9Bc3NlcnRGdW5jdGlvbjtcblx0XG5cdHZhciBzdGF0aWNOYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXMoY29uc3RydWN0b3IpO1xuXHRpbmRleCA9IHN0YXRpY05hbWVzLmxlbmd0aDtcblx0dmFyIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXHR2YXIgc2tpcENvbnN0cnVjdG9yID0gZmFsc2U7XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIHN0YXRpY05hbWUgPSBzdGF0aWNOYW1lc1stLWluZGV4XSA7XG5cdFx0aWYgKCBzdGF0aWNOYW1lPT09J1JlbmRlcicgKSB7IHZhciBSZW5kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSAgICAgICAgICAgICAgICAgICAgICAgOyB9XG5cdFx0Ly9AdHMtaWdub3JlXG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWU9PT0nbmFtZScgfHwgc3RhdGljTmFtZT09PSdsZW5ndGgnICkge1xuXHRcdFx0ZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25zdHJ1Y3Rvciwgc3RhdGljTmFtZSk7XG5cdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdGRlc2NyaXB0b3IuZW51bWVyYWJsZSAmJiBzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGFwcGx5KGRlc2NyaXB0b3IuZ2V0ICwgY29uc3RydWN0b3IsIEFSR1MpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWU9PT0nZGF0YScgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggY29uc3RydWN0b3Jbc3RhdGljTmFtZV0hPT11bmRlZmluZWQgKSB7IHRocm93IEVycm9yKGlzQXJyYXkoY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pID8gX19kZXZfXy5jb21waWxlX2xheWVyIDogX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHR9XG5cdFx0XHRza2lwQ29uc3RydWN0b3IgPSB0cnVlO1xuXHRcdH1cblx0XHRlbHNlIGlmICggc3RhdGljTmFtZSE9PSdwcm90b3R5cGUnICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIHN0YXRpY05hbWVbMF09PT0nXycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nc2V0dXAnIHx8IHN0YXRpY05hbWU9PT0nd2F0Y2gnIHx8IHN0YXRpY05hbWU9PT0nbWV0aG9kcycgfHwgc3RhdGljTmFtZT09PSdjb21wdXRlZCcgfHwgc3RhdGljTmFtZT09PSdleHRlbmRzJyB8fCBzdGF0aWNOYW1lPT09J21peGlucycgfHxcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J2JlZm9yZUNyZWF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nY3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVNb3VudCcgfHwgc3RhdGljTmFtZT09PSdtb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVwZGF0ZScgfHwgc3RhdGljTmFtZT09PSd1cGRhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2FjdGl2YXRlZCcgfHwgc3RhdGljTmFtZT09PSdkZWFjdGl2YXRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVVbm1vdW50JyB8fCBzdGF0aWNOYW1lPT09J3VubW91bnRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVEZXN0cm95JyB8fCBzdGF0aWNOYW1lPT09J2Rlc3Ryb3llZCcgfHxcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J2luamVjdCcgfHwgc3RhdGljTmFtZT09PSdwcm9wcycgfHwgcHJvdG9OYW1lMT09PSdlbWl0cydcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9sYXllcik7IH1cblx0XHRcdH1cblx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0c2V0KG9wdGlvbnMsIHN0YXRpY05hbWU9PT0nZGlzcGxheU5hbWUnID8gJ25hbWUnIDogc3RhdGljTmFtZSwgY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pO1xuXHRcdH1cblx0fVxuXHRcblx0dmFyIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0XG5cdHZhciBwcm90b05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpO1xuXHRpbmRleCA9IHByb3RvTmFtZXMubGVuZ3RoO1xuXHR2YXIgd2F0Y2hlcnMgICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2tpcERhdGEgPSBmYWxzZTtcblx0dmFyIGRhdGFOYW1lcyAgICAgICAgICAgICAgID0gbnVsbDtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgcHJvdG9OYW1lID0gcHJvdG9OYW1lc1stLWluZGV4XSA7XG5cdFx0aWYgKCBwcm90b05hbWU9PT0nX2RhdGEnICkge1xuXHRcdFx0dmFyIF9kYXRhID0gZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpO1xuXHRcdFx0aWYgKCBfZGF0YSApIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggIWlzQXJyYXkoX2RhdGEpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdFx0XHRfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgbGVuZ3RoID0gX2RhdGEubGVuZ3RoO1xuXHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRkYXRhTmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0XHRcdGRvIHsgZGF0YU5hbWVzW19kYXRhW2ldXSA9IG51bGw7IH1cblx0XHRcdFx0XHR3aGlsZSAoICsraSE9PWxlbmd0aCApO1xuXHRcdFx0XHRcdGRhdGFOYW1lcyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRhdGFOYW1lcyk7XG5cdFx0XHRcdFx0X19kZXZfXyAmJiBPUFRJT05TLmRhdGEuc2V0KG9wdGlvbnMsIGRhdGFOYW1lcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0c2tpcERhdGEgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggX2RhdGEhPT11bmRlZmluZWQgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nXycgJiYgISggcHJvdG9OYW1lLnN0YXJ0c1dpdGgoJ193YXRjaCgnKSApICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHR2YXIgcHJvdG9OYW1lMSA9IHByb3RvTmFtZS5zbGljZSgxKTtcblx0XHRcdFx0aWYgKCBwcm90b05hbWUxWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J3NldHVwJyB8fCBwcm90b05hbWUxPT09J3dhdGNoJyB8fCBwcm90b05hbWUxPT09J21ldGhvZHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcHV0ZWQnIHx8IHByb3RvTmFtZTE9PT0nZXh0ZW5kcycgfHwgcHJvdG9OYW1lMT09PSdtaXhpbnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdjb21wb25lbnRzJyB8fCBwcm90b05hbWUxPT09J2RpcmVjdGl2ZXMnIHx8IHByb3RvTmFtZTE9PT0nc3RhdGljUmVuZGVyRm5zJyB8fCBwcm90b05hbWUxPT09J3RlbXBsYXRlJyB8fCBwcm90b05hbWUxPT09J2luaGVyaXRBdHRycycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J25hbWUnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdSZW5kZXInIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdkZWxpbWl0ZXJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZmlsdGVycycgfHwgcHJvdG9OYW1lMT09PSdjb21tZW50cycgfHwgcHJvdG9OYW1lMT09PSdmdW5jdGlvbmFsJyB8fCBwcm90b05hbWUxPT09J3Byb3BzRGF0YScgfHwgcHJvdG9OYW1lMT09PSdtb2RlbCdcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9sYXllcik7IH1cblx0XHRcdH1cblx0XHRcdHNldChvcHRpb25zLCBwcm90b05hbWUuc2xpY2UoMSksIGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvTmFtZSk7XG5cdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSdfJyApIHtcblx0XHRcdFx0dmFyIGluZGV4T2ZRID0gcHJvdG9OYW1lLmxhc3RJbmRleE9mKCcpJyk7XG5cdFx0XHRcdHZhciB3YXRjaGVyID0gd2F0Y2hlcnNbd2F0Y2hlcnMubGVuZ3RoXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gcHJvdG9OYW1lLnNsaWNlKDcsIGluZGV4T2ZRKS50cmltKCk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5nZXQpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3Iuc2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGluZGV4T2ZRICsgMSE9PXByb3RvTmFtZS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aW5kZXhPZlEgKz0gMjtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkEgPSBwcm90b05hbWUuaW5kZXhPZignOycsIGluZGV4T2ZRKTtcblx0XHRcdFx0XHRcdHZhciBwYWlyID0gaW5kZXhPZkE8MFxuXHRcdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSlcblx0XHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEsIGluZGV4T2ZBKTtcblx0XHRcdFx0XHRcdGluZGV4T2ZRID0gaW5kZXhPZkEgKyAxO1xuXHRcdFx0XHRcdFx0aWYgKCBwYWlyICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkUgPSBwYWlyLmluZGV4T2YoJz0nKTtcblx0XHRcdFx0XHRcdFx0aW5kZXhPZkU8MFxuXHRcdFx0XHRcdFx0XHRcdD8gd2F0Y2hlcltwYWlyXSA9IHRydWVcblx0XHRcdFx0XHRcdFx0XHQ6IHdhdGNoZXJbcGFpci5zbGljZSgwLCBpbmRleE9mRSldID0gcGFpci5zbGljZShpbmRleE9mRSArIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoIGluZGV4T2ZRICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nJCcgKSB7XG5cdFx0XHRcdCggcHJvdG9EZXNjcmlwdG9ycyB8fCAoIHByb3RvRGVzY3JpcHRvcnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZSE9PSdjb25zdHJ1Y3RvcicgfHwgZGVzY3JpcHRvci52YWx1ZSE9PWNvbnN0cnVjdG9yICkge1xuXHRcdFx0XHRcdFx0KCBvcHRpb25zLm1ldGhvZHMgfHwgKCBvcHRpb25zLm1ldGhvZHMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQoIG9wdGlvbnMuY29tcHV0ZWQgfHwgKCBvcHRpb25zLmNvbXB1dGVkID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gZGVzY3JpcHRvci5zZXQgPyB7XG5cdFx0XHRcdFx0XHRnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuXHRcdFx0XHRcdFx0c2V0OiBkZXNjcmlwdG9yLnNldFxuXHRcdFx0XHRcdH0gOiBkZXNjcmlwdG9yLmdldCAgICAgICA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHZhciBwcm90b1N5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvdG90eXBlKSAgICAgICAgICAgICAgICAgICA7XG5cdGlmICggKCBpbmRleCA9IHByb3RvU3ltYm9scy5sZW5ndGggKSApIHtcblx0XHRpZiAoICFwcm90b0Rlc2NyaXB0b3JzICkgeyBwcm90b0Rlc2NyaXB0b3JzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHRkbyB7XG5cdFx0XHR2YXIgcHJvdG9TeW1ib2wgICAgICAgICAgICAgICAgPSBwcm90b1N5bWJvbHNbLS1pbmRleF0gO1xuXHRcdFx0cHJvdG9EZXNjcmlwdG9ycyBbcHJvdG9TeW1ib2xdID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvdG9TeW1ib2wpKTtcblx0XHR9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHR9XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgT1BUSU9OUy5wcm90by5zZXQob3B0aW9ucywgcHJvdG9EZXNjcmlwdG9ycyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIHByb3RvRGVzY3JpcHRvcnMpKTtcblx0XG5cdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXyk7XG5cdFxuXHR2YXIgcmVzdE5hbWVzID0gY29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XG5cdGlmICggUmVuZGVyICYmIFZ1ZTMgKSB7XG5cdFx0dmFyIHNoYWRvdyA9IFJlbmRlci5zaGFkb3c7XG5cdFx0aWYgKCBzaGFkb3cgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICYmIHNraXBEYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0XHR2YXIgc2hhZG93TmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdHZhciBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gU2hhZG93Q2hlY2tlcihzaGFkb3csIHJlc3ROYW1lcywgZGF0YU5hbWVzLCBzaGFkb3dOYW1lcywgX19kZXZfXyk7XG5cdFx0XHRcdE9QVElPTlMuc2hhZG93LnNldChvcHRpb25zLCBzaGFkb3dOYW1lcyk7XG5cdFx0XHR9XG5cdFx0XHRzaGFkb3dBc3NpZ25lciA9IFNoYWRvd0Fzc2lnbmVyKHNoYWRvdyk7XG5cdFx0fVxuXHRcdHZhciBzaGVldCA9IFJlbmRlci5zaGVldDtcblx0XHRpZiAoIHNoZWV0ICkge1xuXHRcdFx0dmFyIHdhdGNoZXJzMiAgICAgICAgICAgID0gW107XG5cdFx0XHRPd25LZXlzKHNoZWV0KS5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgICAgIGtleSwgaW5kZXgpIHtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB0aGlzW2luZGV4XSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHR3YXRjaGVyLiQgPSBhc3NlcnRGdW5jdGlvbihzaGVldCBba2V5XSk7XG5cdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGZ1bmN0aW9uICggICAgICAgICAgICBjc3MgICAgICAgICkgeyAoIHRoaXMuJHJlZnNba2V5XSAgICAgICAgICAgICAgICAgICAgICkudGV4dENvbnRlbnQgPSBjc3M7IH07XG5cdFx0XHRcdHdhdGNoZXIuaW1tZWRpYXRlID0gdHJ1ZTtcblx0XHRcdFx0d2F0Y2hlci5mbHVzaCA9ICdzeW5jJztcblx0XHRcdH0sIHdhdGNoZXJzMik7XG5cdFx0XHR3YXRjaGVyczIucmV2ZXJzZSgpO1xuXHRcdFx0dmFyIGJlZm9yZU1vdW50ID0gb3B0aW9ucy5iZWZvcmVNb3VudDtcblx0XHRcdG9wdGlvbnMuYmVmb3JlTW91bnQgPSBiZWZvcmVNb3VudFxuXHRcdFx0XHQ/IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0XHRyZXR1cm4gYXBwbHkoYmVmb3JlTW91bnQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0fTtcblx0XHR9XG5cdFx0b3B0aW9ucy5yZW5kZXIgPSBhc3NlcnRGdW5jdGlvbihuZXcgUmVuZGVyKFZ1ZTMgKSk7XG5cdH1cblx0XG5cdGlmICggX19kZXZfXyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIGRldkRhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgc2tpcERhdGEsIGRhdGFOYW1lcywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lciwgc2hhZG93Q2hlY2tlciwgc2tpcENvbnN0cnVjdG9yLCBfX2Rldl9fKTsgfTsgfVxuXHRlbHNlIGlmICggc2tpcENvbnN0cnVjdG9yIHx8IHNraXBEYXRhICkge31cblx0ZWxzZSBpZiAoIGRhdGFOYW1lcyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb05hbWVzKHNlbGYgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMsIGRhdGFOYW1lcyAsIHNoYWRvd0Fzc2lnbmVyKTsgfTsgfVxuXHRlbHNlIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb0RhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lcik7IH07IH1cblx0XG5cdGlmICggd2F0Y2hlcnMubGVuZ3RoIHx8ICFfX2Rldl9fICYmICggc2tpcENvbnN0cnVjdG9yICYmIHByb3RvRGVzY3JpcHRvcnMgfHwgc2tpcERhdGEgKSApIHtcblx0XHR3YXRjaGVycy5sZW5ndGggJiYgd2F0Y2hlcnMucmV2ZXJzZSgpO1xuXHRcdHZhciBjcmVhdGVkID0gb3B0aW9ucy5jcmVhdGVkO1xuXHRcdHN3aXRjaCAoICggX19kZXZfXyA/ICggc2tpcENvbnN0cnVjdG9yID8gJ3MnIDogJ24nICkgOiAnXycgKSArICggd2F0Y2hlcnMubGVuZ3RoID8gJ3cnIDogJ18nICkgKyAoIGNyZWF0ZWQgPyAnYycgOiAnXycgKSApIHtcblx0XHRcdGNhc2UgJ3N3Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Qcm90byh0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ253Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbndfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ193Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRcblx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XG5cdC8vQHRzLWlnbm9yZVxuXHRpZiAoIG9wdGlvbnMuY29tcG9uZW50cyB8fCBvcHRpb25zLm5hbWUgKSB7XG5cdFx0dmFyIGNvbXBvbmVudHMgPSBvcHRpb25zLmNvbXBvbmVudHMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuXHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdGZvciAoIHBhc2NhbCBpbiBjb21wb25lbnRzICkge1xuXHRcdFx0XHRpZiAoICFwYXNjYWwgfHwgU1RBUlRTX1dJVEhfTE9XRVJDQVNFLnRlc3QocGFzY2FsKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIFZ1ZTMgJiYgRnVuY3Rpb25hbENvbXBvbmVudCApIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdG9wdGlvbnMubmFtZSAmJiBJTkNMVURFU19VUFBFUkNBU0UudGVzdChvcHRpb25zLm5hbWUuc2xpY2UoMSkpXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yICggdmFyIHBhc2NhbCBpbiBjb21wb25lbnRzICkge1xuXHRcdFx0dmFyIHZhbHVlID0gY29tcG9uZW50c1twYXNjYWxdIDtcblx0XHRcdGlmICggaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih2YWx1ZSkgKSB7IGNvbXBvbmVudHNbcGFzY2FsXSA9IE9wdGlvbnModmFsdWUsIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUywgRnVuY3Rpb25hbENvbXBvbmVudCk7IH1cblx0XHR9XG5cdFx0aWYgKCBGdW5jdGlvbmFsQ29tcG9uZW50ICkge1xuXHRcdFx0dmFyIGNhc2VzID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRvcHRpb25zLm5hbWUgJiYgZml4UGFzY2FsKG9wdGlvbnMubmFtZSwgY2FzZXMsIEZ1bmN0aW9uYWxDb21wb25lbnQpO1xuXHRcdFx0Zm9yICggcGFzY2FsIGluIGNvbXBvbmVudHMgKSB7IGZpeFBhc2NhbChwYXNjYWwsIGNhc2VzLCBGdW5jdGlvbmFsQ29tcG9uZW50KTsgfVxuXHRcdFx0YXNzaWduKGNvbXBvbmVudHMsIGFzc2lnbihjYXNlcywgY29tcG9uZW50cykpO1xuXHRcdH1cblx0fVxuXHRcblx0cmV0dXJuIG9wdGlvbnM7XG5cdFxufVxuXG52YXIgT1BUSU9OUyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtcXFxuY2xhc3MgRWFzeU1hcCBleHRlbmRzIFdlYWtNYXB7aW50byhrZXkpe2xldCBzdWI9dGhpcy5nZXQoa2V5KTtzdWI/P3RoaXMuc2V0KGtleSxzdWI9bmV3IEVhc3lNYXApO3JldHVybiBzdWJ9fUVhc3lNYXAucHJvdG90eXBlLmdldD1XZWFrTWFwLnByb3RvdHlwZS5nZXQ7RWFzeU1hcC5wcm90b3R5cGUuc2V0PVdlYWtNYXAucHJvdG90eXBlLnNldDtcXFxuY2xhc3MgU3Ryb25nTWFwIGV4dGVuZHMgTWFwe31TdHJvbmdNYXAucHJvdG90eXBlLmdldD1NYXAucHJvdG90eXBlLmdldDtTdHJvbmdNYXAucHJvdG90eXBlLnNldD1NYXAucHJvdG90eXBlLnNldDtTdHJvbmdNYXAucHJvdG90eXBlLmZvckVhY2g9TWFwLnByb3RvdHlwZS5mb3JFYWNoO1xcXG5jbGFzcyBTdHJvbmdTZXQgZXh0ZW5kcyBTZXR7fVN0cm9uZ1NldC5wcm90b3R5cGUuYWRkPVNldC5wcm90b3R5cGUuYWRkO1N0cm9uZ1NldC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXT1TZXQucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl07XFxcbnJldHVybntvYmplY3RzOm5ldyBFYXN5TWFwLG9iamVjdHNUbXA6U3Ryb25nTWFwLHN1cGVyOm5ldyBFYXN5TWFwLHJlc3Q6bmV3IEVhc3lNYXAsZGF0YTpuZXcgRWFzeU1hcCxwcm90bzpuZXcgRWFzeU1hcCxjb25zdHJ1Y3RvcjpuZXcgRWFzeU1hcCxzaGFkb3c6bmV3IEVhc3lNYXAsZml4Om5ldyBFYXN5TWFwLFNldDpTdHJvbmdTZXR9XFxcbicpKCk7XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufSgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbnZhciBpc0NvbXBvbmVudENvbnN0cnVjdG9yID0gLyojX19QVVJFX18qL2lzUHJvdG90eXBlT2YuYmluZChDb21wb25lbnQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxudmFyIEFSR1MgPSBbXSAgICAgICAgIDtcblxudmFyIF9NSVhJTlMgPSBbIF9taXhpbnMgXSAgICAgICAgIDtcbmZ1bmN0aW9uIGlzTWl4aW5zIChjb25zdHJ1Y3RvciAgICAgICAgICApIHsgcmV0dXJuIGFwcGx5KGhhc093blByb3BlcnR5LCBjb25zdHJ1Y3RvciwgX01JWElOUyk7IH1cblxudmFyIFNZTUJPTFMgPSAvKiNfX1BVUkVfXyovZ2V0T3duUHJvcGVydHlOYW1lcyhTeW1ib2wpLnJlZHVjZShmdW5jdGlvbiAoU1lNQk9MUywgbmFtZSkge1xuXHRpZiAoIHR5cGVvZiBTeW1ib2xbbmFtZV09PT0nc3ltYm9sJyApIHsgU1lNQk9MU1tTeW1ib2xbbmFtZV0gICAgICAgICAgICAgICAgIF0gPSBudWxsOyB9XG5cdHJldHVybiBTWU1CT0xTO1xufSwgY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbmZ1bmN0aW9uICR3YXRjaCAodGhhdCAgICAgICwgd2F0Y2hlcnMgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgaW5kZXggPSB3YXRjaGVycy5sZW5ndGg7XG5cdGRvIHtcblx0XHR2YXIgd2F0Y2hlciAgICAgID0gd2F0Y2hlcnNbLS1pbmRleF07XG5cdFx0dGhhdC4kd2F0Y2god2F0Y2hlci4kLCB3YXRjaGVyLmhhbmRsZXIsIHdhdGNoZXIpO1xuXHR9XG5cdHdoaWxlICggaW5kZXggKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgIFxuICBcbmZ1bmN0aW9uIGNvbGxlY3ROYW1lcyAob3B0aW9ucyAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICkgICAgICAgIHtcblx0dmFyIHJlc3ROYW1lcyAgICAgICAgICAgICAgICAgICAgPSBPUFRJT05TLnJlc3QuZ2V0KG9wdGlvbnMpO1xuXHRpZiAoICFyZXN0TmFtZXMgKSB7XG5cdFx0aWYgKCBjb25zdHJ1Y3RvciApIHsgcmVzdE5hbWVzID0gT1BUSU9OUy5yZXN0LmdldChjb25zdHJ1Y3Rvcik7IH1cblx0XHRpZiAoICFyZXN0TmFtZXMgKSB7XG5cdFx0XHRyZXN0TmFtZXMgPSBjcmVhdGUoTkFNRVMpO1xuXHRcdFx0dmFyIGV4dGVuZCA9IG9wdGlvbnMuZXh0ZW5kcztcblx0XHRcdGV4dGVuZCAmJiBhc3NpZ24ocmVzdE5hbWVzLCBjb2xsZWN0TmFtZXMoZXh0ZW5kLCBudWxsKSk7XG5cdFx0XHR2YXIgbWl4aW5zID0gb3B0aW9ucy5taXhpbnM7XG5cdFx0XHRpZiAoIG1peGlucyApIHsgZm9yICggdmFyIGluZGV4ID0gbWl4aW5zLmxlbmd0aDsgaW5kZXg7ICkgeyBhc3NpZ24ocmVzdE5hbWVzLCBjb2xsZWN0TmFtZXMobWl4aW5zWy0taW5kZXhdICwgbnVsbCkpOyB9IH1cblx0XHRcdHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XG5cdFx0XHR2YXIgbmFtZSAgICAgICAgO1xuXHRcdFx0aWYgKCBpc0FycmF5KHByb3BzKSApIHsgZm9yICggaW5kZXggPSBwcm9wcy5sZW5ndGg7IGluZGV4OyApIHsgcmVzdE5hbWVzW3Byb3BzWy0taW5kZXhdIF0gPSBudWxsOyB9IH1cblx0XHRcdGVsc2UgeyBmb3IgKCBuYW1lIGluIHByb3BzICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9IH1cblx0XHRcdHByb3BzID0gb3B0aW9ucy5pbmplY3Q7XG5cdFx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkgeyBmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkgeyByZXN0TmFtZXNbcHJvcHNbLS1pbmRleF0gXSA9IG51bGw7IH0gfVxuXHRcdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7IHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7IH1cblx0XHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5jb21wdXRlZCApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdFx0cmVzdE5hbWVzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgcmVzdE5hbWVzKTtcblx0XHR9XG5cdFx0aWYgKCBjb25zdHJ1Y3RvciApIHsgT1BUSU9OUy5yZXN0LnNldChjb25zdHJ1Y3RvciwgcmVzdE5hbWVzKTsgfVxuXHRcdE9QVElPTlMucmVzdC5zZXQob3B0aW9ucywgcmVzdE5hbWVzKTtcblx0fVxuXHRyZXR1cm4gcmVzdE5hbWVzO1xufVxuXG5mdW5jdGlvbiBwcm9TZXQgICAgKG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgLCBuYW1lICAgICAgICAsIHZhbHVlICAgKSB7IG9iamVjdFtuYW1lXSA9IHZhbHVlOyB9XG5mdW5jdGlvbiBkZXZTZXQgICAgKCAgICAgICAgICAgICAgIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgLCBuYW1lICAgICAgICAsIHZhbHVlICAgKSB7XG5cdGlmICggbmFtZSBpbiBvYmplY3QgKSB7IHRocm93IEVycm9yKHRoaXMuY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdG9iamVjdFtuYW1lXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwcm9Bc3NlcnRGdW5jdGlvbiAgICAoZm4gICApIHsgcmV0dXJuIGZuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyB9XG5mdW5jdGlvbiBkZXZBc3NlcnRGdW5jdGlvbiAgICAoICAgICAgICAgICAgICAgZm4gICApIHtcblx0aWYgKCB0eXBlb2YgZm4hPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IodGhpcy5jb21waWxlX3R5cGUpOyB9XG5cdHJldHVybiBmbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbn1cblxudmFyIElOQ0xVREVTX1VQUEVSQ0FTRSA9IC9bQS1aXS87XG52YXIgU1RBUlRTX1dJVEhfTE9XRVJDQVNFID0gL15bYS16XS87XG52YXIgQ0hFQ0tFRCA9IFdlYWtNYXAgJiYgLyojX19QVVJFX18qL25ldyBXZWFrTWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKTtcbmZ1bmN0aW9uIGZvcktleXMgKG9wdGlvbiAgICAgICAgICAgICAgICAsIGNhbGxiYWNrICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdGlmICggaXNBcnJheShvcHRpb24pICkgeyBvcHRpb24uZm9yRWFjaChjYWxsYmFjayk7IH1cblx0ZWxzZSB7IGZvciAoIHZhciBrZXkgaW4gb3B0aW9uICkgeyBjYWxsYmFjayhrZXkpOyB9IH1cbn1cbmZ1bmN0aW9uIGNoZWNrIChvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XG5cdHZhciBiZWxvbmcgPSBPUFRJT05TLmNvbnN0cnVjdG9yLmdldChvcHRpb25zKSB8fCBvcHRpb25zO1xuXHR2YXIgb3duS2V5cyA9IENIRUNLRUQuZ2V0KGJlbG9uZyk7XG5cdGlmICggb3duS2V5cyApIHsgcmV0dXJuIG93bktleXM7IH1cblx0dmFyIGFsbEtleXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdCggb3B0aW9ucy5leHRlbmRzID8gWyBvcHRpb25zLmV4dGVuZHMgXSA6IFtdICkuY29uY2F0KG9wdGlvbnMubWl4aW5zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChtaXhpbikge1xuXHRcdHZhciBtaXhpbk5hbWVzID0gY2hlY2sobWl4aW4sIF9fZGV2X18pO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIG1peGluTmFtZXMgKSB7XG5cdFx0XHRpZiAoIG5hbWUgaW4gYWxsS2V5cyAmJiBtaXhpbk5hbWVzW25hbWVdIT09YWxsS2V5c1tuYW1lXSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX292ZXJ3cml0ZSk7IH1cblx0XHR9XG5cdFx0YXNzaWduKGFsbEtleXMsIG1peGluTmFtZXMpO1xuXHR9KTtcblx0XG5cdG93bktleXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdHZhciBwcm90b0Rlc2NyaXB0b3JzID0gT1BUSU9OUy5wcm90by5nZXQob3B0aW9ucyk7XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgT3duS2V5cyhwcm90b0Rlc2NyaXB0b3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRvd25LZXlzIFtrZXldID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5wcm9wcywgZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdGlmICggLy18Xig/OmtleSR8b258cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9wcm9wcyk7IH1cblx0XHRpZiAoIG5hbWUgaW4gUFJPVE9fQlVHICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5pbmplY3QsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZSBpbiBvd25LZXlzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzIFtuYW1lXSA9IGJlbG9uZztcblx0fSk7XG5cdFxuXHR2YXIgbmFtZSAgICAgICAgICAgICAgICAgICAgO1xuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMuY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuZGF0YS5nZXQob3B0aW9ucykgKSB7XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuc2hhZG93LmdldChvcHRpb25zKSApIHtcblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5cyBbbmFtZV0gPSBiZWxvbmc7XG5cdH1cblx0XG5cdGlmICggJ2NvbnN0cnVjdG9yJyBpbiBvd25LZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcblx0T3duS2V5cyhvd25LZXlzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoIGtleSBpbiBhbGxLZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfb3ZlcndyaXRlKTsgfVxuXHR9KTtcblx0YXNzaWduKGFsbEtleXMsIG93bktleXMpO1xuXHRcblx0aWYgKCB0eXBlb2Ygb3B0aW9ucz09PSdvYmplY3QnICkge1xuXHRcdG5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZT09PSdzdHJpbmcnXG5cdFx0XHQ/ICFuYW1lIHx8IFNUQVJUU19XSVRIX0xPV0VSQ0FTRS50ZXN0KG5hbWUpIHx8IG9wdGlvbnMuY29tcG9uZW50cyAmJiBuYW1lIGluIG9wdGlvbnMuY29tcG9uZW50cyAmJiBvcHRpb25zLmNvbXBvbmVudHNbbmFtZV0hPT1vcHRpb25zXG5cdFx0XHQ6IG5hbWUhPT11bmRlZmluZWRcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdH1cblx0XG5cdG9wdGlvbnMuZW1pdHMgJiZcblx0KCBpc0FycmF5KG9wdGlvbnMuZW1pdHMpID8gb3B0aW9ucy5lbWl0cyA6IEtleXMob3B0aW9ucy5lbWl0cykgKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGlmICggdHlwZW9mIGV2ZW50IT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdGlmICggLyg/OmNhcHR1cmV8b25jZXxwYXNzaXZlKSQvLnRlc3QoJ29uJyArIGV2ZW50LnRvTG93ZXJDYXNlKCkpIHx8IC9eLT9bdlZdbm9kZS8udGVzdChldmVudCkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9lbWl0cyk7IH1cblx0fSk7XG5cdFxuXHRpZiAoXG5cdFx0b3B0aW9ucy5kaXJlY3RpdmVzICYmICdpcycgaW4gb3B0aW9ucy5kaXJlY3RpdmVzLy8gMlxuXHRcdHx8Ly9AdHMtaWdub3JlXG5cdFx0b3B0aW9ucy5wcm9wcyAmJiAoIGlzQXJyYXkob3B0aW9ucy5wcm9wcykgPyBvcHRpb25zLnByb3BzLmluY2x1ZGVzKCdpcycpIDogJ2lzJyBpbiBvcHRpb25zLnByb3BzICkvLyAzXG5cdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfaXMpOyB9XG5cdFxuXHRDSEVDS0VELnNldChiZWxvbmcsIGFsbEtleXMpO1xuXHRyZXR1cm4gYWxsS2V5cztcblx0XG59XG5cbnZhciBVUFBFUiA9IC9bQS1aXS87XG5mdW5jdGlvbiBmaXhQYXNjYWwgKHBhc2NhbCAgICAgICAgLCBjYXNlcyAgICAgICAsIEZ1bmN0aW9uYWxDb21wb25lbnQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgRmlyc3QgPSBwYXNjYWxbMF0gO1xuXHR2YXIgZmlyc3QgPSBGaXJzdC50b0xvd2VyQ2FzZSgpO1xuXHR2YXIgcmVzdCA9IHBhc2NhbC5zbGljZSgxKTtcblx0RnVuY3Rpb25hbENvbXBvbmVudChjYXNlcywgZmlyc3QgKyByZXN0KTtcblx0aHlwaGVuYXRlKGZpcnN0LCByZXN0LCBjYXNlcywgRnVuY3Rpb25hbENvbXBvbmVudCk7XG5cdGZpcnN0PT09Rmlyc3QgfHwgaHlwaGVuYXRlKEZpcnN0LCByZXN0LCBjYXNlcywgRnVuY3Rpb25hbENvbXBvbmVudCk7XG59XG5mdW5jdGlvbiBoeXBoZW5hdGUgKGJlZm9yZSAgICAgICAgLCBhZnRlciAgICAgICAgLCBjYXNlcyAgICAgICAsIEZ1bmN0aW9uYWxDb21wb25lbnQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgaW5kZXggPSBhZnRlci5zZWFyY2goVVBQRVIpO1xuXHRpZiAoIGluZGV4PDAgKSB7IEZ1bmN0aW9uYWxDb21wb25lbnQoY2FzZXMsIGJlZm9yZSArIGFmdGVyKTsgfVxuXHRlbHNlIHtcblx0XHRpZiAoIGluZGV4ICkgeyBiZWZvcmUgKz0gYWZ0ZXIuc2xpY2UoMCwgaW5kZXgpOyB9XG5cdFx0dmFyIGNoYXIgPSBhZnRlcltpbmRleF0gO1xuXHRcdGFmdGVyID0gYWZ0ZXIuc2xpY2UoaW5kZXggKyAxKTtcblx0XHRoeXBoZW5hdGUoYmVmb3JlICsgJy0nICsgY2hhci50b0xvd2VyQ2FzZSgpLCBhZnRlciwgY2FzZXMsIEZ1bmN0aW9uYWxDb21wb25lbnQpO1xuXHRcdGh5cGhlbmF0ZShiZWZvcmUgKyAnLScgKyBjaGFyLCBhZnRlciwgY2FzZXMsIEZ1bmN0aW9uYWxDb21wb25lbnQpO1xuXHRcdGJlZm9yZVtiZWZvcmUubGVuZ3RoIC0gMV09PT0nLScgfHwgaHlwaGVuYXRlKGJlZm9yZSArIGNoYXIsIGFmdGVyLCBjYXNlcywgRnVuY3Rpb25hbENvbXBvbmVudCk7XG5cdH1cbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5mdW5jdGlvbiBGdW5jdGlvbmFsQ29tcG9uZW50Q29uc3RydWN0b3IgKFZ1ZTMgICAgICAgKSB7XG5cdHZhciBvcGVuQmxvY2sgPSBWdWUzLm9wZW5CbG9jaztcblx0dmFyIGNyZWF0ZUJsb2NrID0gVnVlMy5jcmVhdGVCbG9jaztcblx0dmFyIGNhY2hlID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHRmdW5jdGlvbiBGdW5jdGlvbmFsQ29tcG9uZW50IChjYXNlcyAgICAgICAsIG5hbWUgICAgICAgICkge1xuXHRcdGNhc2VzW25hbWVdID0gY2FjaGVbbmFtZV0gfHwgKCBjYWNoZVtuYW1lXSA9IGZ1bmN0aW9uIChwcm9wICAgICAgICAgLCBjb250ZXh0ICAgICApIHtcblx0XHRcdG9wZW5CbG9jaygpO1xuXHRcdFx0cmV0dXJuIGNyZWF0ZUJsb2NrKG5hbWUsIGNvbnRleHQuYXR0cnMsIGNvbnRleHQuc2xvdHMpO1xuXHRcdH0gKTtcblx0fVxuXHRPUFRJT05TLmZpeC5zZXQoVnVlMywgRnVuY3Rpb25hbENvbXBvbmVudCk7XG5cdHJldHVybiBGdW5jdGlvbmFsQ29tcG9uZW50O1xufVxuZnVuY3Rpb24gRnVuY3Rpb25hbENvbXBvbmVudDIgKGNhc2VzICAgICAgICwgbmFtZSAgICAgICAgKSB7IGNhc2VzW25hbWVdID0gbnVsbDsgfVxuXG52YXIgaXNDdXN0b21FbGVtZW50ID0gLyojX19QVVJFX18qL3Rlc3QuYmluZCgvXig/OlthZC1qbC1ydS16XXxiKD8hYXNlLXRyYW5zaXRpb24kKXxjKD8hb21wb25lbnQkKXxrKD8hZWVwLWFsaXZlJCl8cyg/IWxvdCR8dXNwZW5zZSQpfHQoPyFlKD86bGVwb3J0fG1wbGF0ZSkkfHRyYW5zaXRpb24oPzotZ3JvdXApPyQpKS8pO1xuXG52YXIgREVWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gW1xuXHQncHJvdG8nLFxuXHQnY29tcGlsZV9uYW1lJyxcblx0J2NvbXBpbGVfcHJvcHMnLFxuXHQnY29tcGlsZV9lbWl0cycsXG5cdCdjb21waWxlX2lzJyxcblx0J2NvbXBpbGVfbGF5ZXInLFxuXHQnY29tcGlsZV9yZXNlcnZlZCcsXG5cdCdjb21waWxlX3JlZGVmaW5lZCcsXG5cdCdjb21waWxlX292ZXJ3cml0ZScsXG5cdCdjb21waWxlX3R5cGUnLFxuXHQnY29tcGlsZV9zeW1ib2wnLFxuXHQnY29tcGlsZV9zaGFkb3cnLFxuXHQncnVudGltZV9zaGFkb3cnLFxuXHQncnVudGltZV9yZWRlZmluZWQnLFxuXHQncnVudGltZV9zeW1ib2wnLFxuXHQncnVudGltZV9yZXNlcnZlZCcsXG5cdCdydW50aW1lX2VudW1lcmFibGUnLFxuXHQncnVudGltZV9kYXRhJyxcbl07XG5cbiAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgIFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG4gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24/JztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuZnVuY3Rpb24gY3JlYXRlZCAoZWwgICAgICwgYmluZGluZyAgICAgKSB7IGJpbmRpbmcuYXJnPT09dW5kZWZpbmVkID8gYXNzaWduKGVsLCBiaW5kaW5nLnZhbHVlKSA6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggZWxbYmluZGluZy5hcmddID0gYmluZGluZy52YWx1ZSApOyB9XG5mdW5jdGlvbiB1cGRhdGVkIChlbCAgICAgLCBiaW5kaW5nICAgICApIHsgYmluZGluZy5hcmc9PT11bmRlZmluZWQgPyBhc3NpZ24oZWwsIGJpbmRpbmcudmFsdWUpIDogYmluZGluZy5vbGRWYWx1ZT09PWJpbmRpbmcudmFsdWUgfHwgKCBlbFtiaW5kaW5nLmFyZ10gPSBiaW5kaW5nLnZhbHVlICk7IH1cblxuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL2ZyZWV6ZShjcmVhdGUoTlVMTCwge1xuXHRcblx0Y3JlYXRlZDogeyB2YWx1ZTogY3JlYXRlZCwgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRiaW5kOiB7IHZhbHVlOiBjcmVhdGVkLCBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdFxuXHR1cGRhdGVkOiB7IHZhbHVlOiB1cGRhdGVkLCBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGNvbXBvbmVudFVwZGF0ZWQ6IHsgdmFsdWU6IHVwZGF0ZWQsIGVudW1lcmFibGU6IHRydWUgfSxcblx0XG59KSk7XG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi9JZGVudGlmaWVyJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnLi9UZW1wbGF0ZSc7XG5pbXBvcnQgUmVuZGVyLCB7IFN0YXRpY1JlbmRlckZucyB9IGZyb20gJy4vUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnO1xuaW1wb3J0IFN0eWxlLCB7IHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5pbXBvcnQgQ29tcG9uZW50LCB7IG1peGluIH0gZnJvbSAnLi9Db21wb25lbnQsIG1peGluLyc7XG5pbXBvcnQgcHJvcCBmcm9tICcuL3YtcHJvcCc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdElkZW50aWZpZXIsXG5cdFNjb3BlLFxuXHRUZW1wbGF0ZSxcblx0UmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlLCByZW1vdmUsXG5cdENvbXBvbmVudCwgbWl4aW4sXG5cdHByb3AsXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlOiBTdHlsZSwgcmVtb3ZlOiByZW1vdmUsXG5cdENvbXBvbmVudDogQ29tcG9uZW50LCBtaXhpbjogbWl4aW4sXG5cdHByb3A6IHByb3AsXG59KTtcbiJdLCJuYW1lcyI6WyJTeW1ib2wiLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsIlJlZ0V4cCIsImdldCIsIkVycm9yIiwiRnVuY3Rpb24iLCJvd25LZXlzIiwi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TUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0QsR0FBRyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQy9CLEdBQUcsS0FBSyxNQUFNLEdBQUcsRUFBRSxNQUFNLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDM0gsR0FBRyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzdCLEdBQUcsSUFBSSxJQUFJLFNBQVM7QUFDcEIsR0FBRyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN4RyxRQUFRLEVBQUUsTUFBTSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDN0QsR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUMxQixHQUFHLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3hHLFFBQVEsRUFBRSxNQUFNLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRTtB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LEVBQUU7QUFDOUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7QUFDM0M7QUFDQSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUM5QyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQ3ZEO0FBQ0EsQ0FBQyxDQUFDLENBQUM7O0FDSUgsY0FBZSxhQUFhLE9BQU8sQ0FBQztBQUNwQyxDQUFDLE9BQU8sRUFBRSxPQUFPO0FBQ2pCLENBQUMsVUFBVSxFQUFFLFVBQVU7QUFDdkIsQ0FBQyxLQUFLLEVBQUUsS0FBSztBQUNiLENBQUMsUUFBUSxFQUFFLFFBQVE7QUFDbkIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxlQUFlO0FBQ2pELENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtBQUM3QixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUs7QUFDbkMsQ0FBQyxJQUFJLEVBQUUsSUFBSTtBQUNYLENBQUMsQ0FBQzs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9Gcm9udEVuZFJ1bnRpbWVEZXBlbmRlbmN5LyJ9