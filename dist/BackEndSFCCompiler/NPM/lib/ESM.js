﻿/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：25.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

var version = '25.1.0';

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

var undefined$1 = void 0;

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

var hasOwn = hasOwnProperty.bind
	? /*#__PURE__*/hasOwnProperty.call.bind(hasOwnProperty)
	: function (object, key) { return /*#__PURE__*/hasOwnProperty.call(object, key); };// && object!=null

var Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
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
		}(exports, addOnOrigin);
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
						var dev = isArray(( window$1                                ).devtoolsFormatters);
						var app = Vue.createApp(
							ToOptions(
								Component,
								Vue,
								dev ? create(NULL) : undefined$1
							)
						);
						defineProperty(app.config, 'isCustomElement', { value: test.bind(STARTS_WITH_LOWERCASE), writable: true });
						if ( dev ) {
							THROW_IRREPARABLE = false;
							app.config.performance = true;
						}
						app.mount(document$1.body);
					}
					else {
						new ( Vue.extend(
							ToOptions(
								Component,
								undefined$1,
								Vue.devtools ? ( Vue.config.ignoredElements.push(STARTS_WITH_LOWERCASE), Vue.config.performance = true, create(NULL) ) : undefined$1
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
		}, create(NULL)                                                ) : null,
		DID_OPTIONS,
		TMP_OPTIONS
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

function Options (constructor          , Vue3                   , __dev__                , DID_OPTIONS                               , TMP_OPTIONS                           )             {
	
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
	if ( options.components || options.name || options.displayName ) {
		var components = options.components = assign(create(NULL), options.components);
		if ( __dev__ ) {
			for ( pascal in components ) {
				if ( !pascal || STARTS_WITH_LOWERCASE.test(pascal) ) { throw Error$1(__dev__.compile_name); }
			}
			if ( THROW_IRREPARABLE && Vue3 && !options.render && options.template ) {
				if (
					//@ts-ignore
					options.name && INCLUDES_UPPERCASE.test(options.name.slice(1))
				) { throw Error$1(__dev__.compile_case); }
				if (
					//@ts-ignore
					options.displayName && INCLUDES_UPPERCASE.test(options.displayName.slice(1))
				) { throw Error$1(__dev__.compile_case); }
				for ( pascal in components ) {
					if ( INCLUDES_UPPERCASE.test(pascal.slice(1)) ) { throw Error$1(__dev__.compile_case); }
				}
			}
		}
		for ( var pascal in components ) {
			var value = components[pascal] ;
			if ( isComponentConstructor(value) ) { components[pascal] = Options(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS); }
		}
		if ( !Vue3 ) {
			var cases = create(NULL)         ;
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
		return Function$1('"use strict";\
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

var THROW_IRREPARABLE = true;
var INCLUDES_UPPERCASE = /[A-Z]/;
var STARTS_WITH_LOWERCASE = /^[a-z]/;
var CHECKED = WeakMap$1 && /*#__PURE__*/new WeakMap$1                                                     ();
function forKeys (option                , callback                        ) {
	if ( isArray(option) ) { option.forEach(callback); }
	else { for ( var key in option ) { callback(key); } }
}
function check (options                                                                        , __dev__         )                               {
	
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
	
	var name        ;
	
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
	
	[ options.name, options.displayName ].forEach(function (name         ) {
		if ( typeof name==='string'
			? !name || STARTS_WITH_LOWERCASE.test(name) || options.components && name in options.components && options.components[name]!==options
			: name!==undefined$1
		) { throw Error$1(__dev__.compile_name); }
	});
	
	options.emits &&
	( isArray(options.emits) ? options.emits : Keys(options.emits) ).forEach(function (event) {
		if ( typeof event!=='string' ) { throw Error$1(__dev__.compile_type); }
		if ( /(?:capture|once|passive)$/i.test('on' + event) || /^-?[vV]node/.test(event) ) { throw Error$1(__dev__.compile_emits); }
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

var prop = /*#__PURE__*/freeze(create(NULL, {
	
	created: { value: created, enumerable: true },
	bind: { value: created, enumerable: true },
	
	updated: { value: updated, enumerable: true },
	componentUpdated: { value: updated, enumerable: true },
	
}));

var _export = Default({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
	prop: prop,
});

export default _export;
export { Component, Identifier, Render, Scope, StaticRenderFns, Style, Template, mixin, prop, remove, version };

/*¡ j-vue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvRHluYW1pY1Njb3BlLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCIuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsInYtcHJvcC50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcyNS4xLjAnOyIsImltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IGpvaW4gZnJvbSAnLkFycmF5LnByb3RvdHlwZS5qb2luJztcbmltcG9ydCB1bnNoaWZ0IGZyb20gJy5BcnJheS5wcm90b3R5cGUudW5zaGlmdCc7XG5cbnZhciBvYmplY3QgPSB7XG5cdCcwJzogJzEnLCAnMSc6ICcyJywgJzInOiAnMycsICczJzogJzQnLCAnNCc6ICc1JywgJzUnOiAnNicsICc2JzogJzcnLCAnNyc6ICc4JywgJzgnOiAnOScsICc5JzogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn0gICAgICAgICA7XG5cbnZhciBsYXN0SXRlbSAgICAgICA9ICd6JztcbnZhciBhcnJheSAgICAgICAgID0gWyBsYXN0SXRlbSBdO1xudmFyIGxhc3RJbmRleCAgICAgICAgID0gYXJyYXkubGVuZ3RoIC0gMTtcblxudmFyIG5vdEtleXdvcmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Rlc3QuYmluZCgvXFxkLyk7XG52YXIgdG9TdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9qb2luLmJpbmQoYXJyYXksICcnKTtcbnZhciBwcmVwZW5kQSAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Vuc2hpZnQuYmluZChhcnJheSwgJ2EnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSAgICAgICAgIHtcblx0aWYgKCBsYXN0SXRlbT09PSc5JyApIHtcblx0XHRhcnJheVtsYXN0SW5kZXhdID0gJ2EnO1xuXHRcdHZhciBzdHJpbmcgICAgICAgIDtcblx0XHRpZiAoIG5vdEtleXdvcmQoc3RyaW5nID0gdG9TdHJpbmcoKSkgKSB7XG5cdFx0XHRsYXN0SXRlbSA9ICdhJztcblx0XHRcdHJldHVybiBzdHJpbmc7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsYXN0SXRlbSE9PSd6JyApIHtcblx0XHRsYXN0SXRlbSA9IGFycmF5W2xhc3RJbmRleF0gPSBvYmplY3RbbGFzdEl0ZW1dO1xuXHRcdHJldHVybiB0b1N0cmluZygpO1xuXHR9XG5cdGxhc3RJdGVtID0gYXJyYXlbbGFzdEluZGV4XSA9ICcwJztcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IGluZGV4OyBhcnJheVtpbmRleF0gPSAnMCcgKSB7XG5cdFx0dmFyIGl0ZW0gICAgICAgPSBhcnJheVstLWluZGV4XSA7XG5cdFx0aWYgKCBpdGVtIT09J3onICkge1xuXHRcdFx0YXJyYXlbaW5kZXhdID0gb2JqZWN0W2l0ZW1dO1xuXHRcdFx0cmV0dXJuIHRvU3RyaW5nKCk7XG5cdFx0fVxuXHR9XG5cdGxhc3RJbmRleCA9IHByZXBlbmRBKCkgLSAxO1xuXHRyZXR1cm4gdG9TdHJpbmcoKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSAvKiNfX1BVUkVfXyovY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdICk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyYWN0ZXJdIHx8ICggZ3JvdXBbY2hhcmFjdGVyXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICApLCBicmFuY2guc2xpY2UoY2hhcmFjdGVyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kQ29kZUJyYW5jaChncm91cFtjaGFyYWN0ZXJdIHx8ICggZ3JvdXBbY2hhcmFjdGVyXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgICAgICAgLCBuZWVkRXNjYXBlICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGJyYW5jaGVzICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCAgICAgICAgICAgPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggICAgICAgICAgPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhcmFjdGVyIGluIGdyb3VwICkge1xuXHRcdGlmICggY2hhcmFjdGVyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyAgICAgICAgID0gc291cmNpZnkoZ3JvdXBbY2hhcmFjdGVyXSAsIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJyArIGNoYXJhY3RlcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyYWN0ZXIgKyBzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXJhY3Rlcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gIDogJ1snICsgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSArICddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonICsgYnJhbmNoZXMuam9pbignfCcpICsgJyknXG5cdFx0KVxuXHRcdCsgKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbD8nO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG52YXIgXyAgICAgID0gU3ltYm9sID8gLyojX19QVVJFX18qL1N5bWJvbCgnXycpICAgICAgICA6ICdfJztcblxuZnVuY3Rpb24gJCAgICAgICAgICAgICAgICAgICggICAgICAgICBjc3MgICAgICAgICAsIG1lZGlhICAgICAgICAgKSAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXNbX10oY3NzKTsgfVxuXHRpZiAoIG1lZGlhIT09dW5kZWZpbmVkICkgeyBzdHlsZS5tZWRpYSA9IG1lZGlhOyB9XG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IHsgXywgJCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgcHJlcGFyZV8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB0eXBlb2YgXz09PSdzeW1ib2wnID8gbnVsbCA6IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHZhciBfZGVzY3JpcHRvciA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICA7XG5cdF9kZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0X2Rlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXHRfZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0cmV0dXJuIGZ1bmN0aW9uICQgKHNjb3BlICAgICAgICkgeyBkZWZpbmVQcm9wZXJ0eShzY29wZSwgXywgX2Rlc2NyaXB0b3IpOyB9O1xufSgpO1xuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIFJlZ0V4cCgnX18nICsgZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpICsgJ19fJywgJ2cnKTsgfVxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkgeyByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV0gOyB9OyB9XG5cbnZhciBTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICApICAgICAgIHtcblx0cHJlcGFyZV8gJiYgcHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF0gXSA9IElkZW50aWZpZXIoKTsgfVxufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxudmFyIFNDT1BFICAgICAgICAgICAgICA9IFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IC8qI19fUFVSRV9fKi9mcmVlemUoY3JlYXRlKG51bGwsIHtcblx0JDogeyB2YWx1ZTogJCwgd3JpdGFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiBmYWxzZSB9LFxufSkgICAgICAgICAgICAgICApO1xuXG52YXIgSW5oZXJpdGVkU3RhdGljU2NvcGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBJbmhlcml0ZWRTdGF0aWNTY29wZSAoICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICAgLCBwcm90byAgICAgICAgICAgICApICAgICAgIHtcblx0XHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0XHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF0gXSA9IElkZW50aWZpZXIoKTsgfVxuXHRcdGZvciAoIHZhciBrZXkgaW4gcHJvdG8gKSB7IC8qa2V5PT09J18nIHx8IGtleT09PSckJyB8fCAoICovXG5cdFx0XHRrZXlzW2tleXMubGVuZ3RoXSA9IGtleS8qICkqLztcblx0XHR9XG5cdFx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdFx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHR9XG5cdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xuXHRyZXR1cm4gSW5oZXJpdGVkU3RhdGljU2NvcGU7XG59KCkgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IHsgU3RhdGljU2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRTdGF0aWNTY29wZSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJleHBvcnQgZGVmYXVsdCAvW15cXHgwMC1AWy1gey1cXHg3Rlxcc11bXlxceDAwLS86LUBbLWB7LVxceDdGXFxzXSooPzpfW15cXHgwMC0vOi1AWy1gey1cXHg3Rlxcc10rKSovZzsiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuXG5pbXBvcnQgS0VZUyBmcm9tICcuL0tFWVMnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBfX0tFWV9fID0gUmVnRXhwKCdfXycgKyBLRVlTLnNvdXJjZSArICdfXycsICdnJyk7XG5cbmZ1bmN0aW9uIGdldCAoY2FjaGUgICAgICAgICAgICAgLCBrZXkgICAgICAgICkgICAgICAgICB7IHJldHVybiBjYWNoZVtrZXldIHx8ICggY2FjaGVba2V5XSA9IElkZW50aWZpZXIoKSApOyB9XG5cbmZ1bmN0aW9uIHNjb3BpZnkgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FjaGUgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGtleXMgICAgICAgICxcblx0XHRpbmRleCAgICAgICAgLFxuXHRcdHZhbHVlcyAgICAgICAgICAsXG5cdFx0a2V5ICAgICAgICA7XG5cdGlmICggdmFsdWUgKSB7XG5cdFx0c3dpdGNoICggdHlwZW9mIHZhbHVlICkge1xuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0aWYgKCB2YWx1ZS5pbmRleE9mKCcgJyk8MCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZ2V0KGNhY2hlLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZXMubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVstLWluZGV4XSA7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGdldChjYWNoZSwga2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlWy0taW5kZXhdLCBjYWNoZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK2dldChjYWNoZSwga2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRpZiAoIGxlbmd0aD4xICkge1xuXHRcdFx0dmFsdWUgPSBbIHZhbHVlLCBhcmd1bWVudHNbMV0gXTtcblx0XHRcdGZvciAoIHZhciBpbmRleCA9IDI7IGluZGV4IT09bGVuZ3RoOyArK2luZGV4ICkgeyAoIHZhbHVlICAgICAgICAgIClbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gc2NvcGlmeSh2YWx1ZSwgY2FjaGUpO1xuXHR9ICAgICAgICAgICAgICAgIDtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfX0tFWV9fLCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBnZXQoY2FjaGUsIF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IER5bmFtaWNTY29wZSBhcyBkZWZhdWx0IH07XG5cbiAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCBtYXRjaCBmcm9tICcuU3RyaW5nLnByb3RvdHlwZS5tYXRjaCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBTdGF0aWNTY29wZSwgSW5oZXJpdGVkU3RhdGljU2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgRHluYW1pY1Njb3BlIGZyb20gJy4vRHluYW1pY1Njb3BlJztcbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5cbmZ1bmN0aW9uIHRocm93RW1wdHkgKGtleXMgICAgICAgICkgICAgICAgIHsgdGhyb3cgRXJyb3IoJ1Njb3BlKFwiJyArIGtleXMgKyAnXCIpJyk7IH1cbnZhciBpc1N0YXRpY1Njb3BlID0gLyojX19QVVJFX18qL2lzUHJvdG90eXBlT2YuYmluZChTQ09QRSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbnZhciBtYXRjaF9jYWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL21hdGNoLmNhbGwuYmluZChtYXRjaCk7XG5cbmZ1bmN0aW9uIG1peCAocHJvdG9zICAgICAgICAgKSAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgICAgICAgICAgICAgID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvICAgICAgICA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9IHByb3RvLnByb3RvdHlwZTsgfVxuXHRcdGZvciAoIHZhciBpZCBpbiBwcm90byApIHsgc2NvcGVbaWRdID0gcHJvdG9baWRdOyB9XG5cdH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbnZhciBTY29wZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIFNjb3BlICggICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgKSAgICAgICAge1xuXHRcdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdGhpcyApIHtcblx0XHRcdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKG1peCh0aGlzICAgICAgICAgICApKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIGlzU3RhdGljU2NvcGUodGhpcy5wcm90b3R5cGUpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSkpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCBpc1N0YXRpY1Njb3BlKHRoaXMpICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKFNDT1BFKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKCB0aGlzICkge1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHZhciBzY29wZSAgICAgICAgICAgICAgPSBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiBpc1N0YXRpY1Njb3BlKHRoaXMucHJvdG90eXBlKSApIHsgc2NvcGUgPSBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIGlzU3RhdGljU2NvcGUodGhpcykgKSB7IHNjb3BlID0gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKG1hdGNoX2NhbGwoa2V5cywgS0VZUykgfHwgdGhyb3dFbXB0eShrZXlzKSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gdGhpcyk7IH1cblx0XHRcdFx0ZWxzZSB7IHJldHVybiBuZXcgU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpKTsgfVxuXHRcdFx0XHRJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcblx0XHRcdFx0cmV0dXJuIHNjb3BlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHJldHVybiBuZXcgU3RhdGljU2NvcGUobWF0Y2hfY2FsbChrZXlzLCBLRVlTKSB8fCB0aHJvd0VtcHR5KGtleXMpKTsgfVxuXHRcdH1cblx0fVxuXHQvL0B0cy1pZ25vcmVcblx0U2NvcGUucHJvdG90eXBlID0gbnVsbDtcblx0cmV0dXJuIGZyZWV6ZShTY29wZSk7XG59KCk7XG5cbmV4cG9ydCB7IFNjb3BlIGFzIGRlZmF1bHQsIEtFWVMgfTsiLCJpbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gVGVtcGxhdGUgKGh0bWwgICAgICAgICwgc2NvcGUgICAgICAgKSAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi9zY29wZVtfXShodG1sKTtcbn1cblxuZXhwb3J0IHsgVGVtcGxhdGUgYXMgZGVmYXVsdCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5pbXBvcnQgdGVzdCBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS50ZXN0JztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG52YXIgSVNfTk9UX0VTNSA9IC8qI19fUFVSRV9fKi90ZXN0LmJpbmQoL14oY29uc3xsZSl0IC8pO1xuXG5mdW5jdGlvbiBXaXRoU3RyaXBwZWQgKHJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZTtcblx0cmV0dXJuIHJlbmRlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyIChjb2RlICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRyZXR1cm4gY29kZVswXT09PScoJ1xuXHRcdD8gLyojX19QVVJFX18qL0Z1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm4gY2xhc3MgUmVuZGVyIGV4dGVuZHMgbnVsbHtjb25zdHJ1Y3RvcicgKyAoIHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlICkgKyAnfTsnKSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdDogLyojX19QVVJFX18qL1dpdGhTdHJpcHBlZChcblx0XHRcdC8qI19fUFVSRV9fKi9GdW5jdGlvbigvKiNfX1BVUkVfXyovSVNfTk9UX0VTNShjb2RlKVxuXHRcdFx0XHQ/ICdcInVzZSBzdHJpY3RcIjtyZXR1cm57cmVuZGVyKCl7JyArICggc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUgKSArICd9fS5yZW5kZXI7J1xuXHRcdFx0XHQ6ICdcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24gcmVuZGVyKCl7JyArICggc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUgKSArICd9Oydcblx0XHRcdCkoKSAgICAgICAgICBcblx0XHQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGNvZGVzLmxlbmd0aDtcblx0dmFyIGJvZHkgICAgICAgICA9ICddJztcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4OyApIHsgYm9keSA9ICdmdW5jdGlvbigpeycgKyBzY29wZV8oY29kZXNbLS1pbmRleF0gKSArICd9LCcgKyBib2R5OyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleCApIHsgYm9keSA9ICdmdW5jdGlvbigpeycgKyBjb2Rlc1stLWluZGV4XSArICd9LCcgKyBib2R5OyB9XG5cdH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bJyArIGJvZHkpKCk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHlsZSAoY3NzICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFJlZmxlY3QhPT0ndW5kZWZpbmVkJyA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiAvKiNfX1BVUkVfXyovIE9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgcHJvcGVydHlJc0VudW1lcmFibGUgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnO1xuaW1wb3J0IGVycm9yIGZyb20gJy5jb25zb2xlLmVycm9yJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5leHBvcnQgdmFyIHRoYXQgICAgICAgICAgICAgICAgID0gbnVsbDtcblxuZXhwb3J0IHZhciBOQU1FUyA9IGFzc2lnbiAmJiAvKiNfX1BVUkVfXyovYXNzaWduKGNyZWF0ZShudWxsKSwge1xuXHRfOiBudWxsLFxuXHRfYzogbnVsbCxcblx0X2NvbXB1dGVkV2F0Y2hlcnM6IG51bGwsXG5cdF9kYXRhOiBudWxsLFxuXHRfZGlyZWN0SW5hY3RpdmU6IG51bGwsXG5cdF9ldmVudHM6IG51bGwsXG5cdF9oYXNIb29rRXZlbnQ6IG51bGwsXG5cdF9oYXNNb3ZlOiBudWxsLFxuXHRfaW5hY3RpdmU6IG51bGwsXG5cdF9pc0JlaW5nRGVzdHJveWVkOiBudWxsLFxuXHRfaXNEZXN0cm95ZWQ6IG51bGwsXG5cdF9pc01vdW50ZWQ6IG51bGwsXG5cdF9pc1Z1ZTogbnVsbCxcblx0X2xlYXZpbmc6IG51bGwsXG5cdF9uYW1lOiBudWxsLFxuXHRfcHJvcHM6IG51bGwsXG5cdF9wcm92aWRlZDogbnVsbCxcblx0X3JlZmxvdzogbnVsbCxcblx0X3JlbmRlclByb3h5OiBudWxsLFxuXHRfc2VsZjogbnVsbCxcblx0X3N0YXRpY1RyZWVzOiBudWxsLFxuXHRfdWlkOiBudWxsLFxuXHRfdXBkYXRlOiBudWxsLFxuXHRfdm5vZGU6IG51bGwsXG5cdF93YXRjaGVyOiBudWxsLFxuXHRfd2F0Y2hlcnM6IG51bGwsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb1Byb3RvIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0ZGVmaW5lUHJvcGVydGllcyhfID8gXy5jdHggOiBzZWxmLCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9Db25zdHJ1Y3RvciAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9OYW1lcyAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAsIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdHZhciBkYXRhID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGF0YU5hbWVzKSAgICAgICAgO1xuXHRpZiAoIF8gKSB7XG5cdFx0dmFyIGFjY2Vzc0NhY2hlID0gXy5hY2Nlc3NDYWNoZTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBkYXRhTmFtZXMgKSB7XG5cdFx0XHRkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0XHRpZiAoIG5hbWUgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0Zm9yICggbmFtZSBpbiBkYXRhTmFtZXMgKSB7IGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTsgfVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9EYXRhIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIGRlZmluZVByb3BlcnRpZXMoY3R4LCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0aWYgKCBfICkge1xuXHRcdHZhciBhY2Nlc3NDYWNoZSA9IF8uYWNjZXNzQ2FjaGU7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIHJlc3ROYW1lcyApICYmIG5hbWVbMF0hPT0nJCcgKSB7XG5cdFx0XHRcdGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRcdFx0aWYgKCBuYW1lIGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBub3dOYW1lcyA9IEtleXMoY3R4KTtcblx0XHR2YXIgaW5kZXggPSBub3dOYW1lcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpbmRleCApIHtcblx0XHRcdG5hbWUgPSBub3dOYW1lc1stLWluZGV4XSA7XG5cdFx0XHRpZiAoICEoIG5hbWUgaW4gcmVzdE5hbWVzICkgJiYgbmFtZVswXSE9PSckJyApIHsgZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdOyB9XG5cdFx0fVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZEYXRhIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgc2tpcERhdGEgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgLCBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBza2lwQ29uc3RydWN0b3IgICAgICAgICAsIF9fZGV2X18gICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyAmJiAhKCBuYW1lIGluIE5BTUVTICkgKSB7XG5cdFx0XHRlcnJvcihFcnJvcignW2pWdWUgYnVnXTogdm0uJyArIG5hbWUgKyAnIGlzIHVua25vd24gYnV0IGV4aXN0cycpKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHR2YXIgb2xkRGVzY3JpcHRvcnMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGN0eCksIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRpZiAoIHByb3RvRGVzY3JpcHRvcnMgKSB7XG5cdFx0Zm9yICggdmFyICRuYW1lIGluIHByb3RvRGVzY3JpcHRvcnMgKSB7IGlmICggJG5hbWUgaW4gY3R4ICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVzZXJ2ZWQpOyB9IH1cblx0XHRkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdH1cblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0b3duS2V5cyhvbGREZXNjcmlwdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dmFyIG9sZERlc2NyaXB0b3IgPSBvbGREZXNjcmlwdG9yc1trZXldIDtcblx0XHR2YXIgbmV3RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdHgsIGtleSAgICAgICAgICAgICAgICAgKTtcblx0XHRpZiAoXG5cdFx0XHQhbmV3RGVzY3JpcHRvciB8fFxuXHRcdFx0bmV3RGVzY3JpcHRvci5jb25maWd1cmFibGUhPT1vbGREZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSB8fFxuXHRcdFx0bmV3RGVzY3JpcHRvci5lbnVtZXJhYmxlIT09b2xkRGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8XG5cdFx0XHQoIG5ld0Rlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHQ/IG5ld0Rlc2NyaXB0b3IudmFsdWUhPT1vbGREZXNjcmlwdG9yLnZhbHVlIHx8IG5ld0Rlc2NyaXB0b3Iud3JpdGFibGUhPT1vbGREZXNjcmlwdG9yLndyaXRhYmxlXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0OiBuZXdEZXNjcmlwdG9yLmdldCE9PW9sZERlc2NyaXB0b3IuZ2V0IHx8IG5ld0Rlc2NyaXB0b3Iuc2V0IT09b2xkRGVzY3JpcHRvci5zZXRcblx0XHRcdClcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3JlZGVmaW5lZCk7IH1cblx0fSk7XG5cdHZhciBkaWZLZXlzICAgICAgICAgICAgICAgICAgICAgICAgPSBvd25LZXlzKGN0eCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gISgga2V5IGluIG9sZERlc2NyaXB0b3JzICk7XG5cdH0pO1xuXHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHtcblx0XHRpZiAoIGRpZktleXMubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0fVxuXHR2YXIgZGlmTmFtZXMgPSBkaWZLZXlzLmZpbHRlcihmdW5jdGlvbiAoa2V5KSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHR5cGVvZiBrZXk9PT0nc3RyaW5nJyAmJiBrZXlbMF0hPT0nJCc7XG5cdH0pO1xuXHRpZiAoIHNraXBEYXRhICkge1xuXHRcdGlmICggZGlmTmFtZXMubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0fVxuXHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHR2YXIgY291bnQgPSAwO1xuXHRcdGZvciAoIG5hbWUgaW4gZGF0YU5hbWVzICkgeyArK2NvdW50OyB9XG5cdFx0aWYgKCBjb3VudCE9PWRpZk5hbWVzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIGRhdGFOYW1lcyApICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0XHR9KTtcblx0fVxuXHRkaWZOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgIG5hbWUpIHtcblx0XHRpZiAoIG5hbWUgaW4gdGhpcyAmJiAhKCBuYW1lIGluIHt9ICkgfHwgbmFtZSBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lPT09J2NvbnN0cnVjdG9yJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XHRpZiAoICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGN0eCwgbmFtZSkpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2VudW1lcmFibGUpOyB9XG5cdH0sIGdldFByb3RvdHlwZU9mKGN0eCkpO1xuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdCggZGF0YSAgICAgICAgIClbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRpZiAoIF8gJiYgbmFtZSBpbiBfLmFjY2Vzc0NhY2hlICkgeyBfLmFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0fSk7XG5cdGlmICggc2hhZG93QXNzaWduZXIgKSB7XG5cdFx0c2hhZG93Q2hlY2tlciAoZGF0YSk7XG5cdFx0c2hhZG93QXNzaWduZXIoc2VsZiwgZGF0YSk7XG5cdH1cblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBJTklUID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIElOSVQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICA7XG5cdElOSVQubW9kZSA9ICdvcGVuJztcblx0cmV0dXJuIElOSVQ7XG59KCk7XG5cbmZ1bmN0aW9uIGF0dGFjaCAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGVsICYmICggZWwuc2hhZG93Um9vdCB8fCBlbC5hdHRhY2hTaGFkb3coSU5JVCkgKTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93QXNzaWduZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0dmFyIG5hbWVzID0gaW5kZXg8MCA/IG51bGwgOiBhbG9uZy5zbGljZShpbmRleCArIDEpLnNwbGl0KCcuJyk7XG5cdHZhciB0b05hbWUgPSBuYW1lcyA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIG5hbWVzICkge1xuXHRcdGlmICggbmFtZXMubGVuZ3RoPT09MSApIHtcblx0XHRcdHZhciBuYW1lJGdldCA9IG5hbWVzWzBdICsgJyRnZXQnO1xuXHRcdFx0dmFyIG5hbWUkc2V0ID0gbmFtZXNbMF0gKyAnJHNldCc7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0YWxsW25hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0YWxsW25hbWUkZ2V0XSA9IG51bGw7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdG5hbWVzIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICApIHtcblx0XHRcdFx0XHRhbGxbbmFtZSArICckc2V0J10gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWVdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0XHRhbGxbbmFtZSArPSAnJGdldCddID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gdG9OYW1lICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gdG9OYW1lICsgJyRzZXQnO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgLCBkYXRhICAgICApIHtcblx0XHRcdGRhdGFbdG9OYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdGRhdGFbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dDaGVja2VyICggICAgICAgICAgICBhbG9uZyAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgc2hhZG93TmFtZXMgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGlmICggYWxvbmdbMF09PT0nXycgfHwgYWxvbmdbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0aWYgKCBpbmRleDwwICkge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRzZXQnO1xuXHRcdGlmICggdG9OYW1lJGdldCBpbiByZXN0TmFtZXMgfHwgdG9OYW1lJHNldCBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdHNoYWRvd05hbWVzW3RvTmFtZSRzZXRdID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggdG9OYW1lJGdldCBpbiBkYXRhTmFtZXMgfHwgdG9OYW1lJHNldCBpbiBkYXRhTmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgZGF0YSAgICAgICkge1xuXHRcdFx0aWYgKCB0b05hbWUkZ2V0IGluIGRhdGEgfHwgdG9OYW1lJHNldCBpbiBkYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc2hhZG93KTsgfVxuXHRcdH07XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBhbG9uZz09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCBhbG9uZyBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbYWxvbmddID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YU5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9O1xuXHR9XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwPyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgZnJvbSBmcm9tICcuQXJyYXkuZnJvbT8nO1xuaW1wb3J0IGdldFByb3RvdHlwZU9mIGZyb20gJy5SZWZsZWN0LmdldFByb3RvdHlwZU9mPz1PYmplY3QuZ2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gJy5PYmplY3Quc2V0UHJvdG90eXBlT2Y/JztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/JztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgZ2V0IGZyb20gJy5SZWZsZWN0LmdldD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgT3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBQUk9UT19CVUcgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgd2luZG93IGZyb20gJy53aW5kb3cnO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgdGhhdCwgTkFNRVMsIHByb1Byb3RvLCBwcm9Db25zdHJ1Y3RvciwgcHJvTmFtZXMsIHByb0RhdGEsIGRldkRhdGEgfSBmcm9tICcuL0RhdGEnO1xuaW1wb3J0IHsgU2hhZG93QXNzaWduZXIsIFNoYWRvd0NoZWNrZXIgfSBmcm9tICcuL1NoYWRvdyc7XG5cbmV4cG9ydCB7IENvbXBvbmVudCBhcyBkZWZhdWx0IH07XG52YXIgQ29tcG9uZW50ICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9mcmVlemUoLyojX19QVVJFX18qL2RlZmluZVByb3BlcnRpZXMoXG5cdGZ1bmN0aW9uIENvbXBvbmVudCAoKSB7IHJldHVybiB0aGF0OyB9LFxuXHR7XG5cdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHR9LFxuXHRcdHJlbmRlcjoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIHJlbmRlciAoICAgICAgICAgICkgeyB0aHJvdyBUeXBlRXJyb3IoJ0NvbXBvbmVudC5yZW5kZXI9Jyk7IH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHJlbmRlciAoICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICAgICAgICApIHsgKCB0aGF0IC5fIHx8IHRoYXQgLiRvcHRpb25zICkucmVuZGVyID0gdmFsdWU7IH0sXG5cdFx0fSxcblx0XHRfbWFpbjoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIF9tYWluICggICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgQ29tcG9uZW50ID0gdGhpcztcblx0XHRcdFx0aWYgKCAhaXNDb21wb25lbnRDb25zdHJ1Y3RvcihDb21wb25lbnQpICkgeyB0aHJvdyBUeXBlRXJyb3IoJyghQ29tcG9uZW50KS5fbWFpbicpOyB9XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiBfbWFpbiAoICAgICAgICAgICAgICkgICAgICAge1xuXHRcdFx0XHRcdGlmICggb25jZSApIHsgdGhyb3cgRXJyb3IoJ0NvbXBvbmVudC5fbWFpbigpeDInKTsgfVxuXHRcdFx0XHRcdGlmICggdGhpcyE9PUNvbXBvbmVudCAmJiBpc0NvbXBvbmVudENvbnN0cnVjdG9yKHRoaXMpICkgeyB0aHJvdyBUeXBlRXJyb3IoJyhDb21wb25lbnQhdGhpcykuX21haW4oKScpOyB9XG5cdFx0XHRcdFx0dmFyIFZ1ZSA9IEZ1bmN0aW9uKCdyZXR1cm4gVnVlJykoKTtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBWdWU9PT0nb2JqZWN0JyApIHtcblx0XHRcdFx0XHRcdHZhciBkZXYgPSBpc0FycmF5KCggd2luZG93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmRldnRvb2xzRm9ybWF0dGVycyk7XG5cdFx0XHRcdFx0XHR2YXIgYXBwID0gVnVlLmNyZWF0ZUFwcChcblx0XHRcdFx0XHRcdFx0VG9PcHRpb25zKFxuXHRcdFx0XHRcdFx0XHRcdENvbXBvbmVudCxcblx0XHRcdFx0XHRcdFx0XHRWdWUsXG5cdFx0XHRcdFx0XHRcdFx0ZGV2ID8gY3JlYXRlKE5VTEwpIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRkZWZpbmVQcm9wZXJ0eShhcHAuY29uZmlnLCAnaXNDdXN0b21FbGVtZW50JywgeyB2YWx1ZTogdGVzdC5iaW5kKFNUQVJUU19XSVRIX0xPV0VSQ0FTRSksIHdyaXRhYmxlOiB0cnVlIH0pO1xuXHRcdFx0XHRcdFx0aWYgKCBkZXYgKSB7XG5cdFx0XHRcdFx0XHRcdFRIUk9XX0lSUkVQQVJBQkxFID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGFwcC5jb25maWcucGVyZm9ybWFuY2UgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YXBwLm1vdW50KGRvY3VtZW50LmJvZHkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdG5ldyAoIFZ1ZS5leHRlbmQoXG5cdFx0XHRcdFx0XHRcdFRvT3B0aW9ucyhcblx0XHRcdFx0XHRcdFx0XHRDb21wb25lbnQsXG5cdFx0XHRcdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0XHRcdFZ1ZS5kZXZ0b29scyA/ICggVnVlLmNvbmZpZy5pZ25vcmVkRWxlbWVudHMucHVzaChTVEFSVFNfV0lUSF9MT1dFUkNBU0UpLCBWdWUuY29uZmlnLnBlcmZvcm1hbmNlID0gdHJ1ZSwgY3JlYXRlKE5VTEwpICkgOiB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KSApKClcblx0XHRcdFx0XHRcdC4kbW91bnQoKCBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9ICc8YnI+JywgJ2JyJyApKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0b25jZSA9IHRydWU7XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiB1bmRlZmluZWQsXG5cdFx0fSxcblx0XHRfdG9PcHRpb25zOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfdG9PcHRpb25zICggICAgICAgICAgICAgICAgVnVlMyAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0aWYgKCAhaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih0aGlzKSApIHsgdGhyb3cgVHlwZUVycm9yKCcoIUNvbXBvbmVudCkuX3RvT3B0aW9ucygpJyk7IH1cblx0XHRcdFx0cmV0dXJuIFRvT3B0aW9ucyh0aGlzLCBWdWUzLCBfX2Rldl9fKTtcblx0XHRcdH0sXG5cdFx0fSxcblx0fVxuKSk7XG52YXIgb25jZSA9IGZhbHNlO1xuXG5mdW5jdGlvbiBUb09wdGlvbnMgKCAgICAgICAgICAgIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIERJRF9PUFRJT05TID0gT1BUSU9OUy5vYmplY3RzLmludG8oX19kZXZfXyB8fCBPUFRJT05TICAgICAgICkuaW50byhWdWUzIHx8IE9QVElPTlMgICAgICAgKTtcblx0dmFyIFRNUF9PUFRJT05TID0gbmV3IE9QVElPTlMub2JqZWN0c1RtcDtcblx0dmFyIG9wdGlvbnMgPSBPcHRpb25zKFxuXHRcdGNvbnN0cnVjdG9yLFxuXHRcdFZ1ZTMgfHwgdW5kZWZpbmVkLFxuXHRcdF9fZGV2X18gPyBERVYucmVkdWNlKGZ1bmN0aW9uIERldiAoZGV2LCBrZXkpIHtcblx0XHRcdGRldltrZXldID0gX19kZXZfXyBba2V5XSB8fCBrZXk7XG5cdFx0XHRyZXR1cm4gZGV2O1xuXHRcdH0sIGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLFxuXHRcdERJRF9PUFRJT05TLFxuXHRcdFRNUF9PUFRJT05TXG5cdCk7XG5cdFRNUF9PUFRJT05TLmZvckVhY2ggKGZ1bmN0aW9uIChvcHRpb25zVmFsdWUsIGNvbnN0cnVjdG9yS2V5KSB7IERJRF9PUFRJT05TLnNldChjb25zdHJ1Y3RvcktleSwgb3B0aW9uc1ZhbHVlKTsgfSk7XG5cdHJldHVybiBvcHRpb25zO1xufVxuXG52YXIgX21peGlucyAgICAgICAgICAgICAgICA9IFN5bWJvbCAmJiAvKiNfX1BVUkVfXyovU3ltYm9sKCdfbWl4aW5zJykgICAgICAgICAgICAgICAgIDtcblxuZnVuY3Rpb24gX19QVVJFX18gKCAgICAgICAgICAgIFN1YiAgICAgLCBtaXhpbnMgICAgICAgKSB7XG5cdFN1Yi5wcm90b3R5cGUgPSBudWxsO1xuXHRTdWJbX21peGluc10gPSBtaXhpbnM7XG5cdHJldHVybiBzZXRQcm90b3R5cGVPZihTdWIsIENvbXBvbmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbiAoICAgICAgICAgICkge1xuXHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuXHRcdD8gLyojX19QVVJFX18qL19fUFVSRV9fKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoYXQ7IH0sIC8qI19fUFVSRV9fKi9mcm9tKGFyZ3VtZW50cykpXG5cdFx0OiBDb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIE9wdGlvbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICAgICAgICAgLCBESURfT1BUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIFRNUF9PUFRJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICB7XG5cdFxuXHR2YXIgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICA9IERJRF9PUFRJT05TLmdldChjb25zdHJ1Y3RvcikgfHwgVE1QX09QVElPTlMuZ2V0KGNvbnN0cnVjdG9yKTtcblx0aWYgKCBvcHRpb25zICkgeyByZXR1cm4gb3B0aW9uczsgfVxuXHRPUFRJT05TLmNvbnN0cnVjdG9yLnNldChvcHRpb25zID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yKTtcblx0XG5cdGlmICggaXNNaXhpbnMoY29uc3RydWN0b3IpICkge1xuXHRcdHZhciBzdGF0aWNfbWl4aW5zID0gY29uc3RydWN0b3JbX21peGluc10gO1xuXHRcdHZhciBtaXhpbnMgPSBuZXcgT1BUSU9OUy5TZXQgICAgICAgICAgICAoKTtcblx0XHR2YXIgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1zdGF0aWNfbWl4aW5zLmxlbmd0aCApIHtcblx0XHRcdHZhciBtaXhpbiA9IHN0YXRpY19taXhpbnNbaW5kZXgrK10gO1xuXHRcdFx0aWYgKCBpc0NvbXBvbmVudENvbnN0cnVjdG9yKG1peGluKSApIHtcblx0XHRcdFx0dmFyIG1peGluT3B0aW9ucyA9IE9wdGlvbnMobWl4aW4sIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7XG5cdFx0XHRcdGlmICggaXNNaXhpbnMobWl4aW4pICkge1xuXHRcdFx0XHRcdHZhciBtaXhpbk1peGlucyA9IG1peGluT3B0aW9ucy5taXhpbnMgO1xuXHRcdFx0XHRcdHZhciBtaXhpbkluZGV4ID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoIG1peGluSW5kZXghPT1taXhpbk1peGlucy5sZW5ndGggKSB7IG1peGlucy5hZGQobWl4aW5NaXhpbnNbbWl4aW5JbmRleCsrXSApOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7IG1peGlucy5hZGQobWl4aW5PcHRpb25zKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IG1peGlucy5hZGQobWl4aW4gICAgICAgICAgICAgICk7IH1cblx0XHR9XG5cdFx0b3B0aW9ucy5taXhpbnMgPSBmcm9tKG1peGlucyk7XG5cdFx0X19kZXZfXyAmJiBjaGVjayhvcHRpb25zLCBfX2Rldl9fKTtcblx0XHRjb2xsZWN0TmFtZXMob3B0aW9ucywgY29uc3RydWN0b3IpO1xuXHRcdFRNUF9PUFRJT05TLnNldChjb25zdHJ1Y3Rvciwgb3B0aW9ucyk7XG5cdFx0cmV0dXJuIG9wdGlvbnM7XG5cdH1cblx0XG5cdHZhciBwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cdFxuXHR2YXIgU3VwZXIgPSBPUFRJT05TLnN1cGVyLmdldChjb25zdHJ1Y3Rvcik7XG5cdGlmICggIVN1cGVyICkge1xuXHRcdE9QVElPTlMuc3VwZXIuc2V0KGNvbnN0cnVjdG9yLCBTdXBlciA9IGdldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yKSk7XG5cdFx0U3VwZXI9PT1Db21wb25lbnQgfHwgaXNNaXhpbnMoU3VwZXIpIHx8ICggc2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IsIENvbXBvbmVudCksIHNldFByb3RvdHlwZU9mKHByb3RvdHlwZSwgbnVsbCkgKTtcblx0fVxuXHRpZiAoIFN1cGVyIT09Q29tcG9uZW50ICkge1xuXHRcdHZhciBTdXBlck9wdGlvbnMgPSBPcHRpb25zKFN1cGVyLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcdGlzTWl4aW5zKFN1cGVyKVxuXHRcdFx0PyBTdXBlck9wdGlvbnMubWl4aW5zIC5sZW5ndGg9PT0xXG5cdFx0XHQ/IG9wdGlvbnMuZXh0ZW5kcyA9IFN1cGVyT3B0aW9ucy5taXhpbnMgWzBdXG5cdFx0XHQ6IG9wdGlvbnMubWl4aW5zID0gU3VwZXJPcHRpb25zLm1peGluc1xuXHRcdFx0OiBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnM7XG5cdH1cblx0XG5cdF9fZGV2X18gJiYgZ2V0T3duUHJvcGVydHlTeW1ib2xzKGNvbnN0cnVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChzeW1ib2wpIHtcblx0XHRpZiAoIHN5bWJvbCE9PV9taXhpbnMgJiYgISggc3ltYm9sIGluIFNZTUJPTFMgKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3N5bWJvbCk7IH1cblx0fSk7XG5cdFxuXHR2YXIgc2V0ICAgICAgICAgICAgICAgID0gX19kZXZfXyA/IGRldlNldC5iaW5kKF9fZGV2X18pIDogcHJvU2V0O1xuXHR2YXIgYXNzZXJ0RnVuY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZBc3NlcnRGdW5jdGlvbi5iaW5kKF9fZGV2X18pIDogcHJvQXNzZXJ0RnVuY3Rpb247XG5cdFxuXHR2YXIgc3RhdGljTmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKGNvbnN0cnVjdG9yKTtcblx0aW5kZXggPSBzdGF0aWNOYW1lcy5sZW5ndGg7XG5cdHZhciBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGZhbHNlO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBzdGF0aWNOYW1lID0gc3RhdGljTmFtZXNbLS1pbmRleF0gO1xuXHRcdGlmICggc3RhdGljTmFtZT09PSdSZW5kZXInICkgeyB2YXIgUmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gY29uc3RydWN0b3Jbc3RhdGljTmFtZV0gICAgICAgICAgICAgICAgICAgICAgIDsgfVxuXHRcdC8vQHRzLWlnbm9yZVxuXHRcdGVsc2UgaWYgKCBzdGF0aWNOYW1lPT09J25hbWUnIHx8IHN0YXRpY05hbWU9PT0nbGVuZ3RoJyApIHtcblx0XHRcdGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uc3RydWN0b3IsIHN0YXRpY05hbWUpO1xuXHRcdFx0aWYgKCBkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgJiYgc2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBhcHBseShkZXNjcmlwdG9yLmdldCAsIGNvbnN0cnVjdG9yLCBBUkdTKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBzdGF0aWNOYW1lPT09J2RhdGEnICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdIT09dW5kZWZpbmVkICkgeyB0aHJvdyBFcnJvcihpc0FycmF5KGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdKSA/IF9fZGV2X18uY29tcGlsZV9sYXllciA6IF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0fVxuXHRcdFx0c2tpcENvbnN0cnVjdG9yID0gdHJ1ZTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWUhPT0ncHJvdG90eXBlJyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBzdGF0aWNOYW1lWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J3NldHVwJyB8fCBzdGF0aWNOYW1lPT09J3dhdGNoJyB8fCBzdGF0aWNOYW1lPT09J21ldGhvZHMnIHx8IHN0YXRpY05hbWU9PT0nY29tcHV0ZWQnIHx8IHN0YXRpY05hbWU9PT0nZXh0ZW5kcycgfHwgc3RhdGljTmFtZT09PSdtaXhpbnMnIHx8XG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdiZWZvcmVDcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2NyZWF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlTW91bnQnIHx8IHN0YXRpY05hbWU9PT0nbW91bnRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVVcGRhdGUnIHx8IHN0YXRpY05hbWU9PT0ndXBkYXRlZCcgfHwgc3RhdGljTmFtZT09PSdhY3RpdmF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nZGVhY3RpdmF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVW5tb3VudCcgfHwgc3RhdGljTmFtZT09PSd1bm1vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlRGVzdHJveScgfHwgc3RhdGljTmFtZT09PSdkZXN0cm95ZWQnIHx8XG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdpbmplY3QnIHx8IHN0YXRpY05hbWU9PT0ncHJvcHMnIHx8IHByb3RvTmFtZTE9PT0nZW1pdHMnXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbGF5ZXIpOyB9XG5cdFx0XHR9XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSk7XG5cdFx0fVxuXHR9XG5cdFxuXHR2YXIgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXHRcblx0dmFyIHByb3RvTmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvdHlwZSk7XG5cdGluZGV4ID0gcHJvdG9OYW1lcy5sZW5ndGg7XG5cdHZhciB3YXRjaGVycyAgICAgICAgICAgID0gW107XG5cdHZhciBza2lwRGF0YSA9IGZhbHNlO1xuXHR2YXIgZGF0YU5hbWVzICAgICAgICAgICAgICAgPSBudWxsO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBwcm90b05hbWUgPSBwcm90b05hbWVzWy0taW5kZXhdIDtcblx0XHRpZiAoIHByb3RvTmFtZT09PSdfZGF0YScgKSB7XG5cdFx0XHR2YXIgX2RhdGEgPSBnZXQocHJvdG90eXBlLCBwcm90b05hbWUsIHVuZGVmaW5lZCk7XG5cdFx0XHRpZiAoIF9kYXRhICkge1xuXHRcdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdFx0aWYgKCAhaXNBcnJheShfZGF0YSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdF9kYXRhLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIG5hbWUhPT0nc3RyaW5nJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHRcdFx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBsZW5ndGggPSBfZGF0YS5sZW5ndGg7XG5cdFx0XHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0XHRcdGRhdGFOYW1lcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHRcdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRcdFx0ZG8geyBkYXRhTmFtZXNbX2RhdGFbaV1dID0gbnVsbDsgfVxuXHRcdFx0XHRcdHdoaWxlICggKytpIT09bGVuZ3RoICk7XG5cdFx0XHRcdFx0ZGF0YU5hbWVzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGF0YU5hbWVzKTtcblx0XHRcdFx0XHRfX2Rldl9fICYmIE9QVElPTlMuZGF0YS5zZXQob3B0aW9ucywgZGF0YU5hbWVzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRza2lwRGF0YSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdFx0aWYgKCBfZGF0YSE9PXVuZGVmaW5lZCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHRcdFx0aWYgKCBza2lwQ29uc3RydWN0b3IgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2tpcENvbnN0cnVjdG9yID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHByb3RvTmFtZVswXT09PSdfJyAmJiAhKCBwcm90b05hbWUuc3RhcnRzV2l0aCgnX3dhdGNoKCcpICkgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdHZhciBwcm90b05hbWUxID0gcHJvdG9OYW1lLnNsaWNlKDEpO1xuXHRcdFx0XHRpZiAoIHByb3RvTmFtZTFbMF09PT0nXycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nc2V0dXAnIHx8IHByb3RvTmFtZTE9PT0nd2F0Y2gnIHx8IHByb3RvTmFtZTE9PT0nbWV0aG9kcycgfHwgcHJvdG9OYW1lMT09PSdjb21wdXRlZCcgfHwgcHJvdG9OYW1lMT09PSdleHRlbmRzJyB8fCBwcm90b05hbWUxPT09J21peGlucycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2NvbXBvbmVudHMnIHx8IHByb3RvTmFtZTE9PT0nZGlyZWN0aXZlcycgfHwgcHJvdG9OYW1lMT09PSdzdGF0aWNSZW5kZXJGbnMnIHx8IHByb3RvTmFtZTE9PT0ndGVtcGxhdGUnIHx8IHByb3RvTmFtZTE9PT0naW5oZXJpdEF0dHJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nbmFtZScgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J1JlbmRlcicgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2RlbGltaXRlcnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdmaWx0ZXJzJyB8fCBwcm90b05hbWUxPT09J2NvbW1lbnRzJyB8fCBwcm90b05hbWUxPT09J2Z1bmN0aW9uYWwnIHx8IHByb3RvTmFtZTE9PT0ncHJvcHNEYXRhJyB8fCBwcm90b05hbWUxPT09J21vZGVsJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheWVyKTsgfVxuXHRcdFx0fVxuXHRcdFx0c2V0KG9wdGlvbnMsIHByb3RvTmFtZS5zbGljZSgxKSwgZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvdG9OYW1lKTtcblx0XHRcdGlmICggcHJvdG9OYW1lWzBdPT09J18nICkge1xuXHRcdFx0XHR2YXIgaW5kZXhPZlEgPSBwcm90b05hbWUubGFzdEluZGV4T2YoJyknKTtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB3YXRjaGVyc1t3YXRjaGVycy5sZW5ndGhdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICA7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHR3YXRjaGVyLiQgPSBwcm90b05hbWUuc2xpY2UoNywgaW5kZXhPZlEpLnRyaW0oKTtcblx0XHRcdFx0XHR3YXRjaGVyLmhhbmRsZXIgPSBhc3NlcnRGdW5jdGlvbihkZXNjcmlwdG9yLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR3YXRjaGVyLiQgPSBhc3NlcnRGdW5jdGlvbihkZXNjcmlwdG9yLmdldCk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5zZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaW5kZXhPZlEgKyAxIT09cHJvdG9OYW1lLmxlbmd0aCApIHtcblx0XHRcdFx0XHRpbmRleE9mUSArPSAyO1xuXHRcdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRcdHZhciBpbmRleE9mQSA9IHByb3RvTmFtZS5pbmRleE9mKCc7JywgaW5kZXhPZlEpO1xuXHRcdFx0XHRcdFx0dmFyIHBhaXIgPSBpbmRleE9mQTwwXG5cdFx0XHRcdFx0XHRcdD8gcHJvdG9OYW1lLnNsaWNlKGluZGV4T2ZRKVxuXHRcdFx0XHRcdFx0XHQ6IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSwgaW5kZXhPZkEpO1xuXHRcdFx0XHRcdFx0aW5kZXhPZlEgPSBpbmRleE9mQSArIDE7XG5cdFx0XHRcdFx0XHRpZiAoIHBhaXIgKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBpbmRleE9mRSA9IHBhaXIuaW5kZXhPZignPScpO1xuXHRcdFx0XHRcdFx0XHRpbmRleE9mRTwwXG5cdFx0XHRcdFx0XHRcdFx0PyB3YXRjaGVyW3BhaXJdID0gdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdDogd2F0Y2hlcltwYWlyLnNsaWNlKDAsIGluZGV4T2ZFKV0gPSBwYWlyLnNsaWNlKGluZGV4T2ZFICsgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggaW5kZXhPZlEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIHByb3RvTmFtZVswXT09PSckJyApIHtcblx0XHRcdFx0KCBwcm90b0Rlc2NyaXB0b3JzIHx8ICggcHJvdG9EZXNjcmlwdG9ycyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGVzY3JpcHRvcik7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdFx0XHRcdGlmICggcHJvdG9OYW1lIT09J2NvbnN0cnVjdG9yJyB8fCBkZXNjcmlwdG9yLnZhbHVlIT09Y29uc3RydWN0b3IgKSB7XG5cdFx0XHRcdFx0XHQoIG9wdGlvbnMubWV0aG9kcyB8fCAoIG9wdGlvbnMubWV0aG9kcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCggb3B0aW9ucy5jb21wdXRlZCB8fCAoIG9wdGlvbnMuY29tcHV0ZWQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSApW3Byb3RvTmFtZV0gPSBkZXNjcmlwdG9yLnNldCA/IHtcblx0XHRcdFx0XHRcdGdldDogZGVzY3JpcHRvci5nZXQsXG5cdFx0XHRcdFx0XHRzZXQ6IGRlc2NyaXB0b3Iuc2V0XG5cdFx0XHRcdFx0fSA6IGRlc2NyaXB0b3IuZ2V0ICAgICAgIDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0dmFyIHByb3RvU3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhwcm90b3R5cGUpICAgICAgICAgICAgICAgICAgIDtcblx0aWYgKCAoIGluZGV4ID0gcHJvdG9TeW1ib2xzLmxlbmd0aCApICkge1xuXHRcdGlmICggIXByb3RvRGVzY3JpcHRvcnMgKSB7IHByb3RvRGVzY3JpcHRvcnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgIDsgfVxuXHRcdGRvIHtcblx0XHRcdHZhciBwcm90b1N5bWJvbCAgICAgICAgICAgICAgICA9IHByb3RvU3ltYm9sc1stLWluZGV4XSA7XG5cdFx0XHRwcm90b0Rlc2NyaXB0b3JzIFtwcm90b1N5bWJvbF0gPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBwcm90b1N5bWJvbCkpO1xuXHRcdH1cblx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdH1cblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBPUFRJT05TLnByb3RvLnNldChvcHRpb25zLCBwcm90b0Rlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgcHJvdG9EZXNjcmlwdG9ycykpO1xuXHRcblx0X19kZXZfXyAmJiBjaGVjayhvcHRpb25zLCBfX2Rldl9fKTtcblx0XG5cdHZhciByZXN0TmFtZXMgPSBjb2xsZWN0TmFtZXMob3B0aW9ucywgY29uc3RydWN0b3IpO1xuXHRcblx0aWYgKCBSZW5kZXIgJiYgVnVlMyApIHtcblx0XHR2YXIgc2hhZG93ID0gUmVuZGVyLnNoYWRvdztcblx0XHRpZiAoIHNoYWRvdyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBza2lwQ29uc3RydWN0b3IgJiYgc2tpcERhdGEgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRcdHZhciBzaGFkb3dOYW1lcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHRcdFx0dmFyIHNoYWRvd0NoZWNrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBTaGFkb3dDaGVja2VyKHNoYWRvdywgcmVzdE5hbWVzLCBkYXRhTmFtZXMsIHNoYWRvd05hbWVzLCBfX2Rldl9fKTtcblx0XHRcdFx0T1BUSU9OUy5zaGFkb3cuc2V0KG9wdGlvbnMsIHNoYWRvd05hbWVzKTtcblx0XHRcdH1cblx0XHRcdHNoYWRvd0Fzc2lnbmVyID0gU2hhZG93QXNzaWduZXIoc2hhZG93KTtcblx0XHR9XG5cdFx0dmFyIHNoZWV0ID0gUmVuZGVyLnNoZWV0O1xuXHRcdGlmICggc2hlZXQgKSB7XG5cdFx0XHR2YXIgd2F0Y2hlcnMyICAgICAgICAgICAgPSBbXTtcblx0XHRcdE93bktleXMoc2hlZXQpLmZvckVhY2goZnVuY3Rpb24gKCAgICAgICAgICAgICAgICAga2V5LCBpbmRleCkge1xuXHRcdFx0XHR2YXIgd2F0Y2hlciA9IHRoaXNbaW5kZXhdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICA7XG5cdFx0XHRcdHdhdGNoZXIuJCA9IGFzc2VydEZ1bmN0aW9uKHNoZWV0IFtrZXldKTtcblx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGNzcyAgICAgICAgKSB7ICggdGhpcy4kcmVmc1trZXldICAgICAgICAgICAgICAgICAgICAgKS50ZXh0Q29udGVudCA9IGNzczsgfTtcblx0XHRcdFx0d2F0Y2hlci5pbW1lZGlhdGUgPSB0cnVlO1xuXHRcdFx0XHR3YXRjaGVyLmZsdXNoID0gJ3N5bmMnO1xuXHRcdFx0fSwgd2F0Y2hlcnMyKTtcblx0XHRcdHdhdGNoZXJzMi5yZXZlcnNlKCk7XG5cdFx0XHR2YXIgYmVmb3JlTW91bnQgPSBvcHRpb25zLmJlZm9yZU1vdW50O1xuXHRcdFx0b3B0aW9ucy5iZWZvcmVNb3VudCA9IGJlZm9yZU1vdW50XG5cdFx0XHRcdD8gZnVuY3Rpb24gYmVmb3JlQmVmb3JlTW91bnQgKCkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVyczIpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShiZWZvcmVNb3VudCAsIHRoaXMsIEFSR1MpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdDogZnVuY3Rpb24gYmVmb3JlQmVmb3JlTW91bnQgKCkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVyczIpO1xuXHRcdFx0XHR9O1xuXHRcdH1cblx0XHRvcHRpb25zLnJlbmRlciA9IGFzc2VydEZ1bmN0aW9uKG5ldyBSZW5kZXIoVnVlMyApKTtcblx0fVxuXHRcblx0aWYgKCBfX2Rldl9fICkgeyBvcHRpb25zLmRhdGEgPSBmdW5jdGlvbiAoc2VsZiAgICAgICkgeyByZXR1cm4gZGV2RGF0YShzZWxmICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzLCBza2lwRGF0YSwgZGF0YU5hbWVzLCByZXN0TmFtZXMsIHNoYWRvd0Fzc2lnbmVyLCBzaGFkb3dDaGVja2VyLCBza2lwQ29uc3RydWN0b3IsIF9fZGV2X18pOyB9OyB9XG5cdGVsc2UgaWYgKCBza2lwQ29uc3RydWN0b3IgfHwgc2tpcERhdGEgKSB7fVxuXHRlbHNlIGlmICggZGF0YU5hbWVzICkgeyBvcHRpb25zLmRhdGEgPSBmdW5jdGlvbiAoc2VsZiAgICAgICkgeyByZXR1cm4gcHJvTmFtZXMoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgZGF0YU5hbWVzICwgc2hhZG93QXNzaWduZXIpOyB9OyB9XG5cdGVsc2UgeyBvcHRpb25zLmRhdGEgPSBmdW5jdGlvbiAoc2VsZiAgICAgICkgeyByZXR1cm4gcHJvRGF0YShzZWxmICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzLCByZXN0TmFtZXMsIHNoYWRvd0Fzc2lnbmVyKTsgfTsgfVxuXHRcblx0aWYgKCB3YXRjaGVycy5sZW5ndGggfHwgIV9fZGV2X18gJiYgKCBza2lwQ29uc3RydWN0b3IgJiYgcHJvdG9EZXNjcmlwdG9ycyB8fCBza2lwRGF0YSApICkge1xuXHRcdHdhdGNoZXJzLmxlbmd0aCAmJiB3YXRjaGVycy5yZXZlcnNlKCk7XG5cdFx0dmFyIGNyZWF0ZWQgPSBvcHRpb25zLmNyZWF0ZWQ7XG5cdFx0c3dpdGNoICggKCBfX2Rldl9fID8gKCBza2lwQ29uc3RydWN0b3IgPyAncycgOiAnbicgKSA6ICdfJyApICsgKCB3YXRjaGVycy5sZW5ndGggPyAndycgOiAnXycgKSArICggY3JlYXRlZCA/ICdjJyA6ICdfJyApICkge1xuXHRcdFx0Y2FzZSAnc3djJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdFx0cmV0dXJuIGFwcGx5KGNyZWF0ZWQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzd18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvUHJvdG8odGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICk7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzX2MnOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvUHJvdG8odGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICk7XG5cdFx0XHRcdFx0cmV0dXJuIGFwcGx5KGNyZWF0ZWQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzX18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvUHJvdG8odGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbndjJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdFx0cmV0dXJuIGFwcGx5KGNyZWF0ZWQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdud18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvQ29uc3RydWN0b3IodGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMyk7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICduX2MnOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvQ29uc3RydWN0b3IodGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMyk7XG5cdFx0XHRcdFx0cmV0dXJuIGFwcGx5KGNyZWF0ZWQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICduX18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvQ29uc3RydWN0b3IodGhpcyAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3djJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdFx0cmV0dXJuIGFwcGx5KGNyZWF0ZWQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdfd18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdFxuXHRUTVBfT1BUSU9OUy5zZXQoY29uc3RydWN0b3IsIG9wdGlvbnMpO1xuXHRcblx0Ly9AdHMtaWdub3JlXG5cdGlmICggb3B0aW9ucy5jb21wb25lbnRzIHx8IG9wdGlvbnMubmFtZSB8fCBvcHRpb25zLmRpc3BsYXlOYW1lICkge1xuXHRcdHZhciBjb21wb25lbnRzID0gb3B0aW9ucy5jb21wb25lbnRzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgb3B0aW9ucy5jb21wb25lbnRzKTtcblx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRmb3IgKCBwYXNjYWwgaW4gY29tcG9uZW50cyApIHtcblx0XHRcdFx0aWYgKCAhcGFzY2FsIHx8IFNUQVJUU19XSVRIX0xPV0VSQ0FTRS50ZXN0KHBhc2NhbCkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9uYW1lKTsgfVxuXHRcdFx0fVxuXHRcdFx0aWYgKCBUSFJPV19JUlJFUEFSQUJMRSAmJiBWdWUzICYmICFvcHRpb25zLnJlbmRlciAmJiBvcHRpb25zLnRlbXBsYXRlICkge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0b3B0aW9ucy5uYW1lICYmIElOQ0xVREVTX1VQUEVSQ0FTRS50ZXN0KG9wdGlvbnMubmFtZS5zbGljZSgxKSlcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9jYXNlKTsgfVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0b3B0aW9ucy5kaXNwbGF5TmFtZSAmJiBJTkNMVURFU19VUFBFUkNBU0UudGVzdChvcHRpb25zLmRpc3BsYXlOYW1lLnNsaWNlKDEpKVxuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2Nhc2UpOyB9XG5cdFx0XHRcdGZvciAoIHBhc2NhbCBpbiBjb21wb25lbnRzICkge1xuXHRcdFx0XHRcdGlmICggSU5DTFVERVNfVVBQRVJDQVNFLnRlc3QocGFzY2FsLnNsaWNlKDEpKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2Nhc2UpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yICggdmFyIHBhc2NhbCBpbiBjb21wb25lbnRzICkge1xuXHRcdFx0dmFyIHZhbHVlID0gY29tcG9uZW50c1twYXNjYWxdIDtcblx0XHRcdGlmICggaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih2YWx1ZSkgKSB7IGNvbXBvbmVudHNbcGFzY2FsXSA9IE9wdGlvbnModmFsdWUsIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7IH1cblx0XHR9XG5cdFx0aWYgKCAhVnVlMyApIHtcblx0XHRcdHZhciBjYXNlcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0b3B0aW9ucy5uYW1lICYmIGZpeFBhc2NhbChvcHRpb25zLm5hbWUsIGNhc2VzKTtcblx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0b3B0aW9ucy5kaXNwbGF5TmFtZSAmJiBmaXhQYXNjYWwob3B0aW9ucy5kaXNwbGF5TmFtZSwgY2FzZXMpO1xuXHRcdFx0Zm9yICggcGFzY2FsIGluIGNvbXBvbmVudHMgKSB7IGZpeFBhc2NhbChwYXNjYWwsIGNhc2VzKTsgfVxuXHRcdFx0YXNzaWduKGNvbXBvbmVudHMsIGNhc2VzLCBjb21wb25lbnRzKTtcblx0XHR9XG5cdH1cblx0XG5cdHJldHVybiBvcHRpb25zO1xuXHRcbn1cblxudmFyIE9QVElPTlMgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7XFxcbmNsYXNzIEVhc3lNYXAgZXh0ZW5kcyBXZWFrTWFwe2ludG8oa2V5KXtsZXQgc3ViPXRoaXMuZ2V0KGtleSk7c3ViPz90aGlzLnNldChrZXksc3ViPW5ldyBFYXN5TWFwKTtyZXR1cm4gc3VifX1FYXN5TWFwLnByb3RvdHlwZS5nZXQ9V2Vha01hcC5wcm90b3R5cGUuZ2V0O0Vhc3lNYXAucHJvdG90eXBlLnNldD1XZWFrTWFwLnByb3RvdHlwZS5zZXQ7XFxcbmNsYXNzIFN0cm9uZ01hcCBleHRlbmRzIE1hcHt9U3Ryb25nTWFwLnByb3RvdHlwZS5nZXQ9TWFwLnByb3RvdHlwZS5nZXQ7U3Ryb25nTWFwLnByb3RvdHlwZS5zZXQ9TWFwLnByb3RvdHlwZS5zZXQ7U3Ryb25nTWFwLnByb3RvdHlwZS5mb3JFYWNoPU1hcC5wcm90b3R5cGUuZm9yRWFjaDtcXFxuY2xhc3MgU3Ryb25nU2V0IGV4dGVuZHMgU2V0e31TdHJvbmdTZXQucHJvdG90eXBlLmFkZD1TZXQucHJvdG90eXBlLmFkZDtTdHJvbmdTZXQucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl09U2V0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdO1xcXG5yZXR1cm57b2JqZWN0czpuZXcgRWFzeU1hcCxvYmplY3RzVG1wOlN0cm9uZ01hcCxzdXBlcjpuZXcgRWFzeU1hcCxyZXN0Om5ldyBFYXN5TWFwLGRhdGE6bmV3IEVhc3lNYXAscHJvdG86bmV3IEVhc3lNYXAsY29uc3RydWN0b3I6bmV3IEVhc3lNYXAsc2hhZG93Om5ldyBFYXN5TWFwLFNldDpTdHJvbmdTZXR9XFxcbicpKCk7XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufSgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICBcbiA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG52YXIgaXNDb21wb25lbnRDb25zdHJ1Y3RvciA9IC8qI19fUFVSRV9fKi9pc1Byb3RvdHlwZU9mLmJpbmQoQ29tcG9uZW50KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbnZhciBBUkdTID0gW10gICAgICAgICA7XG5cbnZhciBfTUlYSU5TID0gWyBfbWl4aW5zIF0gICAgICAgICA7XG5mdW5jdGlvbiBpc01peGlucyAoY29uc3RydWN0b3IgICAgICAgICAgKSB7IHJldHVybiBhcHBseShoYXNPd25Qcm9wZXJ0eSwgY29uc3RydWN0b3IsIF9NSVhJTlMpOyB9XG5cbnZhciBTWU1CT0xTID0gLyojX19QVVJFX18qL2dldE93blByb3BlcnR5TmFtZXMoU3ltYm9sKS5yZWR1Y2UoZnVuY3Rpb24gKFNZTUJPTFMsIG5hbWUpIHtcblx0aWYgKCB0eXBlb2YgU3ltYm9sW25hbWVdPT09J3N5bWJvbCcgKSB7IFNZTUJPTFNbU3ltYm9sW25hbWVdICAgICAgICAgICAgICAgICBdID0gbnVsbDsgfVxuXHRyZXR1cm4gU1lNQk9MUztcbn0sIGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG5mdW5jdGlvbiAkd2F0Y2ggKHRoYXQgICAgICAsIHdhdGNoZXJzICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIGluZGV4ID0gd2F0Y2hlcnMubGVuZ3RoO1xuXHRkbyB7XG5cdFx0dmFyIHdhdGNoZXIgICAgICA9IHdhdGNoZXJzWy0taW5kZXhdO1xuXHRcdHRoYXQuJHdhdGNoKHdhdGNoZXIuJCwgd2F0Y2hlci5oYW5kbGVyLCB3YXRjaGVyKTtcblx0fVxuXHR3aGlsZSAoIGluZGV4ICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICBcbiAgXG5mdW5jdGlvbiBjb2xsZWN0TmFtZXMgKG9wdGlvbnMgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgICApICAgICAgICB7XG5cdHZhciByZXN0TmFtZXMgICAgICAgICAgICAgICAgICAgID0gT1BUSU9OUy5yZXN0LmdldChvcHRpb25zKTtcblx0aWYgKCAhcmVzdE5hbWVzICkge1xuXHRcdGlmICggY29uc3RydWN0b3IgKSB7IHJlc3ROYW1lcyA9IE9QVElPTlMucmVzdC5nZXQoY29uc3RydWN0b3IpOyB9XG5cdFx0aWYgKCAhcmVzdE5hbWVzICkge1xuXHRcdFx0cmVzdE5hbWVzID0gY3JlYXRlKE5BTUVTKTtcblx0XHRcdHZhciBleHRlbmQgPSBvcHRpb25zLmV4dGVuZHM7XG5cdFx0XHRleHRlbmQgJiYgYXNzaWduKHJlc3ROYW1lcywgY29sbGVjdE5hbWVzKGV4dGVuZCwgbnVsbCkpO1xuXHRcdFx0dmFyIG1peGlucyA9IG9wdGlvbnMubWl4aW5zO1xuXHRcdFx0aWYgKCBtaXhpbnMgKSB7IGZvciAoIHZhciBpbmRleCA9IG1peGlucy5sZW5ndGg7IGluZGV4OyApIHsgYXNzaWduKHJlc3ROYW1lcywgY29sbGVjdE5hbWVzKG1peGluc1stLWluZGV4XSAsIG51bGwpKTsgfSB9XG5cdFx0XHR2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuXHRcdFx0dmFyIG5hbWUgICAgICAgIDtcblx0XHRcdGlmICggaXNBcnJheShwcm9wcykgKSB7IGZvciAoIGluZGV4ID0gcHJvcHMubGVuZ3RoOyBpbmRleDsgKSB7IHJlc3ROYW1lc1twcm9wc1stLWluZGV4XSBdID0gbnVsbDsgfSB9XG5cdFx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBwcm9wcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRwcm9wcyA9IG9wdGlvbnMuaW5qZWN0O1xuXHRcdFx0aWYgKCBpc0FycmF5KHByb3BzKSApIHsgZm9yICggaW5kZXggPSBwcm9wcy5sZW5ndGg7IGluZGV4OyApIHsgcmVzdE5hbWVzW3Byb3BzWy0taW5kZXhdIF0gPSBudWxsOyB9IH1cblx0XHRcdGVsc2UgeyBmb3IgKCBuYW1lIGluIHByb3BzICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9IH1cblx0XHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5tZXRob2RzICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMuY29tcHV0ZWQgKSB7IHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7IH1cblx0XHRcdHJlc3ROYW1lcyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIHJlc3ROYW1lcyk7XG5cdFx0fVxuXHRcdGlmICggY29uc3RydWN0b3IgKSB7IE9QVElPTlMucmVzdC5zZXQoY29uc3RydWN0b3IsIHJlc3ROYW1lcyk7IH1cblx0XHRPUFRJT05TLnJlc3Quc2V0KG9wdGlvbnMsIHJlc3ROYW1lcyk7XG5cdH1cblx0cmV0dXJuIHJlc3ROYW1lcztcbn1cblxuZnVuY3Rpb24gcHJvU2V0ICAgIChvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICwgbmFtZSAgICAgICAgLCB2YWx1ZSAgICkgeyBvYmplY3RbbmFtZV0gPSB2YWx1ZTsgfVxuZnVuY3Rpb24gZGV2U2V0ICAgICggICAgICAgICAgICAgICBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICwgbmFtZSAgICAgICAgLCB2YWx1ZSAgICkge1xuXHRpZiAoIG5hbWUgaW4gb2JqZWN0ICkgeyB0aHJvdyBFcnJvcih0aGlzLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcHJvQXNzZXJ0RnVuY3Rpb24gICAgKGZuICAgKSB7IHJldHVybiBmbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsgfVxuZnVuY3Rpb24gZGV2QXNzZXJ0RnVuY3Rpb24gICAgKCAgICAgICAgICAgICAgIGZuICAgKSB7XG5cdGlmICggdHlwZW9mIGZuIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKHRoaXMuY29tcGlsZV90eXBlKTsgfVxuXHRyZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59XG5cbnZhciBUSFJPV19JUlJFUEFSQUJMRSA9IHRydWU7XG52YXIgSU5DTFVERVNfVVBQRVJDQVNFID0gL1tBLVpdLztcbnZhciBTVEFSVFNfV0lUSF9MT1dFUkNBU0UgPSAvXlthLXpdLztcbnZhciBDSEVDS0VEID0gV2Vha01hcCAmJiAvKiNfX1BVUkVfXyovbmV3IFdlYWtNYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuZnVuY3Rpb24gZm9yS2V5cyAob3B0aW9uICAgICAgICAgICAgICAgICwgY2FsbGJhY2sgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0aWYgKCBpc0FycmF5KG9wdGlvbikgKSB7IG9wdGlvbi5mb3JFYWNoKGNhbGxiYWNrKTsgfVxuXHRlbHNlIHsgZm9yICggdmFyIGtleSBpbiBvcHRpb24gKSB7IGNhbGxiYWNrKGtleSk7IH0gfVxufVxuZnVuY3Rpb24gY2hlY2sgKG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XG5cdHZhciBiZWxvbmcgPSBPUFRJT05TLmNvbnN0cnVjdG9yLmdldChvcHRpb25zKSB8fCBvcHRpb25zO1xuXHR2YXIgb3duS2V5cyA9IENIRUNLRUQuZ2V0KGJlbG9uZyk7XG5cdGlmICggb3duS2V5cyApIHsgcmV0dXJuIG93bktleXM7IH1cblx0dmFyIGFsbEtleXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdCggb3B0aW9ucy5leHRlbmRzID8gWyBvcHRpb25zLmV4dGVuZHMgXSA6IFtdICkuY29uY2F0KG9wdGlvbnMubWl4aW5zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChtaXhpbikge1xuXHRcdHZhciBtaXhpbk5hbWVzID0gY2hlY2sobWl4aW4sIF9fZGV2X18pO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIG1peGluTmFtZXMgKSB7XG5cdFx0XHRpZiAoIG5hbWUgaW4gYWxsS2V5cyAmJiBtaXhpbk5hbWVzW25hbWVdIT09YWxsS2V5c1tuYW1lXSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX292ZXJ3cml0ZSk7IH1cblx0XHR9XG5cdFx0YXNzaWduKGFsbEtleXMsIG1peGluTmFtZXMpO1xuXHR9KTtcblx0XG5cdG93bktleXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdHZhciBwcm90b0Rlc2NyaXB0b3JzID0gT1BUSU9OUy5wcm90by5nZXQob3B0aW9ucyk7XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgT3duS2V5cyhwcm90b0Rlc2NyaXB0b3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRvd25LZXlzIFtrZXldID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5wcm9wcywgZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdGlmICggLy18Xig/OmtleSR8b258cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9wcm9wcyk7IH1cblx0XHRpZiAoIG5hbWUgaW4gUFJPVE9fQlVHICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5pbmplY3QsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZSBpbiBvd25LZXlzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzIFtuYW1lXSA9IGJlbG9uZztcblx0fSk7XG5cdFxuXHR2YXIgbmFtZSAgICAgICAgO1xuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMuY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuZGF0YS5nZXQob3B0aW9ucykgKSB7XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuc2hhZG93LmdldChvcHRpb25zKSApIHtcblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5cyBbbmFtZV0gPSBiZWxvbmc7XG5cdH1cblx0XG5cdGlmICggJ2NvbnN0cnVjdG9yJyBpbiBvd25LZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcblx0T3duS2V5cyhvd25LZXlzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoIGtleSBpbiBhbGxLZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfb3ZlcndyaXRlKTsgfVxuXHR9KTtcblx0YXNzaWduKGFsbEtleXMsIG93bktleXMpO1xuXHRcblx0WyBvcHRpb25zLm5hbWUsIG9wdGlvbnMuZGlzcGxheU5hbWUgXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICAgKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZT09PSdzdHJpbmcnXG5cdFx0XHQ/ICFuYW1lIHx8IFNUQVJUU19XSVRIX0xPV0VSQ0FTRS50ZXN0KG5hbWUpIHx8IG9wdGlvbnMuY29tcG9uZW50cyAmJiBuYW1lIGluIG9wdGlvbnMuY29tcG9uZW50cyAmJiBvcHRpb25zLmNvbXBvbmVudHNbbmFtZV0hPT1vcHRpb25zXG5cdFx0XHQ6IG5hbWUhPT11bmRlZmluZWRcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdH0pO1xuXHRcblx0b3B0aW9ucy5lbWl0cyAmJlxuXHQoIGlzQXJyYXkob3B0aW9ucy5lbWl0cykgPyBvcHRpb25zLmVtaXRzIDogS2V5cyhvcHRpb25zLmVtaXRzKSApLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0aWYgKCB0eXBlb2YgZXZlbnQhPT0nc3RyaW5nJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0aWYgKCAvKD86Y2FwdHVyZXxvbmNlfHBhc3NpdmUpJC9pLnRlc3QoJ29uJyArIGV2ZW50KSB8fCAvXi0/W3ZWXW5vZGUvLnRlc3QoZXZlbnQpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfZW1pdHMpOyB9XG5cdH0pO1xuXHRcblx0aWYgKFxuXHRcdG9wdGlvbnMuZGlyZWN0aXZlcyAmJiAnaXMnIGluIG9wdGlvbnMuZGlyZWN0aXZlcy8vIDJcblx0XHR8fC8vQHRzLWlnbm9yZVxuXHRcdG9wdGlvbnMucHJvcHMgJiYgKCBpc0FycmF5KG9wdGlvbnMucHJvcHMpID8gb3B0aW9ucy5wcm9wcy5pbmNsdWRlcygnaXMnKSA6ICdpcycgaW4gb3B0aW9ucy5wcm9wcyApLy8gM1xuXHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2lzKTsgfVxuXHRcblx0Q0hFQ0tFRC5zZXQoYmVsb25nLCBhbGxLZXlzKTtcblx0cmV0dXJuIGFsbEtleXM7XG5cdFxufVxuXG52YXIgVVBQRVIgPSAvW0EtWl0vO1xuZnVuY3Rpb24gZml4UGFzY2FsIChwYXNjYWwgICAgICAgICwgY2FzZXMgICAgICAgKSB7XG5cdHZhciBGaXJzdCA9IHBhc2NhbFswXSA7XG5cdHZhciBmaXJzdCA9IEZpcnN0LnRvTG93ZXJDYXNlKCk7XG5cdHZhciByZXN0ID0gcGFzY2FsLnNsaWNlKDEpO1xuXHRjYXNlc1tmaXJzdCArIHJlc3RdID0gbnVsbDtcblx0aHlwaGVuYXRlKGZpcnN0LCByZXN0LCBjYXNlcyk7XG5cdGZpcnN0PT09Rmlyc3QgfHwgaHlwaGVuYXRlKEZpcnN0LCByZXN0LCBjYXNlcyk7XG59XG5mdW5jdGlvbiBoeXBoZW5hdGUgKGJlZm9yZSAgICAgICAgLCBhZnRlciAgICAgICAgLCBjYXNlcyAgICAgICApIHtcblx0dmFyIGluZGV4ID0gYWZ0ZXIuc2VhcmNoKFVQUEVSKTtcblx0aWYgKCBpbmRleDwwICkgeyBjYXNlc1tiZWZvcmUgKyBhZnRlcl0gPSBudWxsOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggaW5kZXggKSB7IGJlZm9yZSArPSBhZnRlci5zbGljZSgwLCBpbmRleCk7IH1cblx0XHR2YXIgY2hhciA9IGFmdGVyW2luZGV4XSA7XG5cdFx0YWZ0ZXIgPSBhZnRlci5zbGljZShpbmRleCArIDEpO1xuXHRcdGh5cGhlbmF0ZShiZWZvcmUgKyAnLScgKyBjaGFyLnRvTG93ZXJDYXNlKCksIGFmdGVyLCBjYXNlcyk7XG5cdFx0aHlwaGVuYXRlKGJlZm9yZSArICctJyArIGNoYXIsIGFmdGVyLCBjYXNlcyk7XG5cdFx0YmVmb3JlW2JlZm9yZS5sZW5ndGggLSAxXT09PSctJyB8fCBoeXBoZW5hdGUoYmVmb3JlICsgY2hhciwgYWZ0ZXIsIGNhc2VzKTtcblx0fVxufVxuXG52YXIgREVWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gW1xuXHQncHJvdG8nLFxuXHQnY29tcGlsZV9jYXNlJyxcblx0J2NvbXBpbGVfbmFtZScsXG5cdCdjb21waWxlX3Byb3BzJyxcblx0J2NvbXBpbGVfZW1pdHMnLFxuXHQnY29tcGlsZV9pcycsXG5cdCdjb21waWxlX2xheWVyJyxcblx0J2NvbXBpbGVfcmVzZXJ2ZWQnLFxuXHQnY29tcGlsZV9yZWRlZmluZWQnLFxuXHQnY29tcGlsZV9vdmVyd3JpdGUnLFxuXHQnY29tcGlsZV90eXBlJyxcblx0J2NvbXBpbGVfc3ltYm9sJyxcblx0J2NvbXBpbGVfc2hhZG93Jyxcblx0J3J1bnRpbWVfc2hhZG93Jyxcblx0J3J1bnRpbWVfcmVkZWZpbmVkJyxcblx0J3J1bnRpbWVfc3ltYm9sJyxcblx0J3J1bnRpbWVfcmVzZXJ2ZWQnLFxuXHQncnVudGltZV9lbnVtZXJhYmxlJyxcblx0J3J1bnRpbWVfZGF0YScsXG5dO1xuXG4gICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICBcblx0ICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgIFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gXG5cbiAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgXG4gXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmZ1bmN0aW9uIGNyZWF0ZWQgKGVsICAgICAsIGJpbmRpbmcgICAgICkgeyBiaW5kaW5nLmFyZz09PXVuZGVmaW5lZCA/IGFzc2lnbihlbCwgYmluZGluZy52YWx1ZSkgOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIGVsW2JpbmRpbmcuYXJnXSA9IGJpbmRpbmcudmFsdWUgKTsgfVxuZnVuY3Rpb24gdXBkYXRlZCAoZWwgICAgICwgYmluZGluZyAgICAgKSB7IGJpbmRpbmcuYXJnPT09dW5kZWZpbmVkID8gYXNzaWduKGVsLCBiaW5kaW5nLnZhbHVlKSA6IGJpbmRpbmcub2xkVmFsdWU9PT1iaW5kaW5nLnZhbHVlIHx8ICggZWxbYmluZGluZy5hcmddID0gYmluZGluZy52YWx1ZSApOyB9XG5cbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9mcmVlemUoY3JlYXRlKE5VTEwsIHtcblx0XG5cdGNyZWF0ZWQ6IHsgdmFsdWU6IGNyZWF0ZWQsIGVudW1lcmFibGU6IHRydWUgfSxcblx0YmluZDogeyB2YWx1ZTogY3JlYXRlZCwgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRcblx0dXBkYXRlZDogeyB2YWx1ZTogdXBkYXRlZCwgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRjb21wb25lbnRVcGRhdGVkOiB7IHZhbHVlOiB1cGRhdGVkLCBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdFxufSkpO1xuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4vSWRlbnRpZmllcic7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vVGVtcGxhdGUnO1xuaW1wb3J0IFJlbmRlciwgeyBTdGF0aWNSZW5kZXJGbnMgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmltcG9ydCBTdHlsZSwgeyByZW1vdmUgfSBmcm9tICcuL1N0eWxlLCByZW1vdmUnO1xuaW1wb3J0IENvbXBvbmVudCwgeyBtaXhpbiB9IGZyb20gJy4vQ29tcG9uZW50LCBtaXhpbi8nO1xuaW1wb3J0IHByb3AgZnJvbSAnLi92LXByb3AnO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRJZGVudGlmaWVyLFxuXHRTY29wZSxcblx0VGVtcGxhdGUsXG5cdFJlbmRlciwgU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZSwgcmVtb3ZlLFxuXHRDb21wb25lbnQsIG1peGluLFxuXHRwcm9wLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlOiBTdHlsZSwgcmVtb3ZlOiByZW1vdmUsXG5cdENvbXBvbmVudDogQ29tcG9uZW50LCBtaXhpbjogbWl4aW4sXG5cdHByb3A6IHByb3AsXG59KTtcbiJdLCJuYW1lcyI6WyJTeW1ib2wiLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsIlJlZ0V4cCIsImdldCIsIkVycm9yIiwiRnVuY3Rpb24iLCJvd25LZXlzIiwiVHlwZUVycm9yIiwid2luZG93IiwiZ2V0UHJvdG90eXBlT2YiLCJXZWFrTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGNBQWMsUUFBUTs7Ozs7Ozs7QUNJdEIsSUFBSSxNQUFNLEdBQUc7QUFDYixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0FBQ25HLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7QUFDdkQsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztBQUN2RCxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztBQUMvQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7QUFDdkMsQ0FBQyxVQUFVO0FBQ1g7QUFDQSxJQUFJLFFBQVEsU0FBUyxHQUFHLENBQUM7QUFDekIsSUFBSSxLQUFLLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUNqQyxJQUFJLFNBQVMsV0FBVyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztB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