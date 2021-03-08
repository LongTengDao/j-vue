/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：21.0.0
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

var version = '21.0.0';

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

var apply = typeof Reflect!=='undefined' ? Reflect.apply : undefined$1;

var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined$1;

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

/*¡ j-regexp */

var Symbol$1 = typeof Symbol!=='undefined' ? Symbol : undefined$1;

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

var NOT_ES5 = /^(cons|le)t /;

function WithStripped (render                                   ) {
	render._withStripped = true;
	return render;
}

function Render (code        , scope        )                                          {
	return code[0]==='('
		? /*#__PURE__*/Function$1('"use strict";return class Render extends null{constructor'+(scope ? scope[_](code) : code)+'};')()                                  
		: /*#__PURE__*/WithStripped(
			/*#__PURE__*/Function$1(NOT_ES5.test(code)
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
	return Function$1('"use strict";return['+body)();
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

var WeakMap$1 = typeof WeakMap!=='undefined' ? WeakMap : undefined$1;

var from = Array.from;

var getPrototypeOf = typeof Reflect!=='undefined' ? Reflect.getPrototypeOf : /*#__PURE__*/ Object.getPrototypeOf;

var setPrototypeOf = Object.setPrototypeOf;

var getOwnPropertyNames = Object.getOwnPropertyNames;

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

var getOwnPropertySymbols = Object.getOwnPropertySymbols;

var defineProperties = Object.defineProperties;

var get$1 = typeof Reflect!=='undefined' ? Reflect.get : undefined$1;

var Keys = Object.keys;

var OwnKeys = typeof Reflect!=='undefined' ? Reflect.ownKeys : undefined$1;

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

var getPrototypeOf$1 = Object.getPrototypeOf;

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
	}, getPrototypeOf$1(ctx));
	
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
			get: undefined$1,
			set: function render (            value                     ) { ( that ._ || that .$options ).render = value; },
		},
		_main: {
			enumerable: false,
			value: function _main (              )       {
				if ( !isComponentConstructor(this) ) { throw TypeError$1('(!Component)._main()'); }
				var Vue = Function$1('return Vue')();
				typeof Vue==='object'
					? Vue.createApp(
						ToOptions(
							this,
							Vue,
							Vue.config.devtools ? ( Vue.config.performance = true, {} ) : undefined$1
						)
					)
					.mount(document$1.body)
					: new ( Vue.extend(
						ToOptions(
							this,
							undefined$1,
							Vue.devtools ? ( Vue.config.performance = true, {} ) : undefined$1
						)
					) )()
					.$mount(( document$1.body.innerHTML = '<br>', 'br' ));
			},
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
		OPTIONS.super.set(constructor, Super = getPrototypeOf(constructor));
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
					staticName==='inject' || staticName==='props'
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
			var _data = get$1(prototype, protoName, undefined$1);
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
					protoName1==='emits' || protoName1==='components' || protoName1==='directives' || protoName1==='staticRenderFns' || protoName1==='template' || protoName1==='inheritAttrs' ||
					protoName1==='name' ||
					protoName1==='Render' ||
					protoName1==='delimiters' ||
					protoName1==='filters' || protoName1==='comments' || protoName1==='functional' || protoName1==='propsData' || protoName1==='model'
				) { throw Error$1(__dev__.compile_layer); }
			}
			set(options, protoName.slice(1), get$1(prototype, protoName, undefined$1));
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
			if ( Vue3 && !options.render && options.template ) {
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
                                                                                

var isComponentConstructor = /*#__PURE__*/isPrototypeOf.bind(Component)                                        ;

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

var prop = /*#__PURE__*/freeze(create(NULL, {
	created: {
		enumerable: true,
		value: function created (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
	bind: {
		enumerable: true,
		value: function bind (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : el[binding.arg] = binding.value; },
	},
	updated: {
		enumerable: true,
		value: function updated (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : binding.oldValue===binding.value || ( el[binding.arg] = binding.value ); },
	},
	componentUpdated: {
		enumerable: true,
		value: function componentUpdated (el     , binding     ) { binding.arg===undefined$1 ? assign(el, binding.value) : binding.oldValue===binding.value || ( el[binding.arg] = binding.value ); },
	},
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

return _export;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvRHluYW1pY1Njb3BlLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCIuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsInYtcHJvcC50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcyMS4wLjAnOyIsImltcG9ydCB0ZXN0IGZyb20gJy5SZWdFeHAucHJvdG90eXBlLnRlc3QnO1xuaW1wb3J0IGpvaW4gZnJvbSAnLkFycmF5LnByb3RvdHlwZS5qb2luJztcbmltcG9ydCB1bnNoaWZ0IGZyb20gJy5BcnJheS5wcm90b3R5cGUudW5zaGlmdCc7XG5cbnZhciBvYmplY3QgPSB7XG5cdCcwJzogJzEnLCAnMSc6ICcyJywgJzInOiAnMycsICczJzogJzQnLCAnNCc6ICc1JywgJzUnOiAnNicsICc2JzogJzcnLCAnNyc6ICc4JywgJzgnOiAnOScsICc5JzogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn0gICAgICAgICA7XG5cbnZhciBsYXN0SXRlbSAgICAgICA9ICd6JztcbnZhciBhcnJheSAgICAgICAgID0gWyBsYXN0SXRlbSBdO1xudmFyIGxhc3RJbmRleCAgICAgICAgID0gYXJyYXkubGVuZ3RoIC0gMTtcblxudmFyIG5vdEtleXdvcmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Rlc3QuYmluZCgvXFxkLyk7XG52YXIgdG9TdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9qb2luLmJpbmQoYXJyYXksICcnKTtcbnZhciBwcmVwZW5kQSAgICAgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL3Vuc2hpZnQuYmluZChhcnJheSwgJ2EnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSAgICAgICAgIHtcblx0aWYgKCBsYXN0SXRlbT09PSc5JyApIHtcblx0XHRhcnJheVtsYXN0SW5kZXhdID0gJ2EnO1xuXHRcdHZhciBzdHJpbmcgICAgICAgIDtcblx0XHRpZiAoIG5vdEtleXdvcmQoc3RyaW5nID0gdG9TdHJpbmcoKSkgKSB7XG5cdFx0XHRsYXN0SXRlbSA9ICdhJztcblx0XHRcdHJldHVybiBzdHJpbmc7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsYXN0SXRlbSE9PSd6JyApIHtcblx0XHRsYXN0SXRlbSA9IGFycmF5W2xhc3RJbmRleF0gPSBvYmplY3RbbGFzdEl0ZW1dO1xuXHRcdHJldHVybiB0b1N0cmluZygpO1xuXHR9XG5cdGxhc3RJdGVtID0gYXJyYXlbbGFzdEluZGV4XSA9ICcwJztcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IGluZGV4OyBhcnJheVtpbmRleF0gPSAnMCcgKSB7XG5cdFx0dmFyIGl0ZW0gICAgICAgPSBhcnJheVstLWluZGV4XSA7XG5cdFx0aWYgKCBpdGVtIT09J3onICkge1xuXHRcdFx0YXJyYXlbaW5kZXhdID0gb2JqZWN0W2l0ZW1dO1xuXHRcdFx0cmV0dXJuIHRvU3RyaW5nKCk7XG5cdFx0fVxuXHR9XG5cdGxhc3RJbmRleCA9IHByZXBlbmRBKCkgLSAxO1xuXHRyZXR1cm4gdG9TdHJpbmcoKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJytjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gICAgICA9IFN5bWJvbCA/IC8qI19fUFVSRV9fKi9TeW1ib2woJ18nKSAgICAgICAgOiAnXyc7XG5cbmZ1bmN0aW9uICQgICAgICAgICAgICAgICAgICAoICAgICAgICAgY3NzICAgICAgICAgLCBtZWRpYSAgICAgICAgICkgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSB0aGlzW19dKGNzcyk7IH1cblx0aWYgKCBtZWRpYSE9PXVuZGVmaW5lZCApIHsgc3R5bGUubWVkaWEgPSBtZWRpYTsgfVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCB7IF8sICQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIHByZXBhcmVfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gdHlwZW9mIF89PT0nc3ltYm9sJyA/IG51bGwgOiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR2YXIgX2Rlc2NyaXB0b3IgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgO1xuXHRfZGVzY3JpcHRvci52YWx1ZSA9IG51bGw7XG5cdF9kZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IHRydWU7XG5cdF9kZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSAgICAgICApIHsgZGVmaW5lUHJvcGVydHkoc2NvcGUsIF8sIF9kZXNjcmlwdG9yKTsgfTtcbn0oKTtcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzICAgICAgICAgICkgICAgICAgICB7IHJldHVybiBSZWdFeHAoJ19fJyArIGdyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSArICdfXycsICdnJyk7IH1cbmZ1bmN0aW9uIFJlcGxhY2VyIChzY29wZSAgICAgICAgICAgICApIHsgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2VyIChfX2tleV9fICAgICAgICApICAgICAgICAgeyByZXR1cm4gc2NvcGVbX19rZXlfXy5zbGljZSgyLCAtMildIDsgfTsgfVxuXG52YXIgU3RhdGljU2NvcGUgPSBmdW5jdGlvbiBTdGF0aWNTY29wZSAoICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfICYmIHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdIF0gPSBJZGVudGlmaWVyKCk7IH1cbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbnZhciBTQ09QRSAgICAgICAgICAgICAgPSBTdGF0aWNTY29wZS5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdCQ6IHsgdmFsdWU6ICQsIHdyaXRhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSxcbn0pICAgICAgICAgICAgICAgKTtcblxudmFyIEluaGVyaXRlZFN0YXRpY1Njb3BlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gSW5oZXJpdGVkU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICAgKSAgICAgICB7XG5cdFx0cHJlcGFyZV8gJiYgcHJlcGFyZV8odGhpcyk7XG5cdFx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdIF0gPSBJZGVudGlmaWVyKCk7IH1cblx0XHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKCAqL1xuXHRcdFx0a2V5c1trZXlzLmxlbmd0aF0gPSBrZXkvKiApKi87XG5cdFx0fVxuXHRcdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHRcdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0fVxuXHRJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcblx0cmV0dXJuIEluaGVyaXRlZFN0YXRpY1Njb3BlO1xufSgpICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbmV4cG9ydCB7IFN0YXRpY1Njb3BlLCBTQ09QRSwgSW5oZXJpdGVkU3RhdGljU2NvcGUgfTtcblxuICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuICAgICBcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiZXhwb3J0IGRlZmF1bHQgL1teXFx4MDAtQFstYHstXFx4N0ZcXHNdW15cXHgwMC0vOi1AWy1gey1cXHg3Rlxcc10qKD86X1teXFx4MDAtLzotQFstYHstXFx4N0ZcXHNdKykqL2c7IiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcblxuaW1wb3J0IEtFWVMgZnJvbSAnLi9LRVlTJztcbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgU3RhdGljU2NvcGUgfSBmcm9tICcuL1N0YXRpY1Njb3BlJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgX19LRVlfXyA9IFJlZ0V4cCgnX18nICsgS0VZUy5zb3VyY2UgKyAnX18nLCAnZycpO1xuXG5mdW5jdGlvbiBnZXQgKGNhY2hlICAgICAgICAgICAgICwga2V5ICAgICAgICApICAgICAgICAgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhY2hlICAgICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBrZXlzICAgICAgICAsXG5cdFx0aW5kZXggICAgICAgICxcblx0XHR2YWx1ZXMgICAgICAgICAgLFxuXHRcdGtleSAgICAgICAgO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdldChjYWNoZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gdmFsdWVbLS1pbmRleF0gO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBnZXQoY2FjaGUsIGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVstLWluZGV4XSwgY2FjaGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtrZXldICkgeyBrZXlzICs9ICcgJytnZXQoY2FjaGUsIGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIER5bmFtaWNTY29wZSAoY2FjaGUgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlID0gZnVuY3Rpb24gc2NvcGUgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7XG5cdFx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0aWYgKCBsZW5ndGg+MSApIHtcblx0XHRcdHZhbHVlID0gWyB2YWx1ZSwgYXJndW1lbnRzWzFdIF07XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggPSAyOyBpbmRleCE9PWxlbmd0aDsgKytpbmRleCApIHsgKCB2YWx1ZSAgICAgICAgICApW2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleF07IH1cblx0XHR9XG5cdFx0cmV0dXJuIHNjb3BpZnkodmFsdWUsIGNhY2hlKTtcblx0fSAgICAgICAgICAgICAgICA7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX19LRVlfXywgX3JlcGxhY2VyKTsgfTtcblx0ZnVuY3Rpb24gX3JlcGxhY2VyIChfX2tleV9fICAgICAgICApICAgICAgICAgeyByZXR1cm4gZ2V0KGNhY2hlLCBfX2tleV9fLnNsaWNlKDIsIC0yKSk7IH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG5leHBvcnQgeyBEeW5hbWljU2NvcGUgYXMgZGVmYXVsdCB9O1xuXG4gICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGlzUHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZic7XG5pbXBvcnQgbWF0Y2ggZnJvbSAnLlN0cmluZy5wcm90b3R5cGUubWF0Y2gnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgU3RhdGljU2NvcGUsIEluaGVyaXRlZFN0YXRpY1Njb3BlLCBTQ09QRSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IER5bmFtaWNTY29wZSBmcm9tICcuL0R5bmFtaWNTY29wZSc7XG5pbXBvcnQgS0VZUyBmcm9tICcuL0tFWVMnO1xuXG5mdW5jdGlvbiB0aHJvd0VtcHR5IChrZXlzICAgICAgICApICAgICAgICB7IHRocm93IEVycm9yKCdTY29wZShcIicgKyBrZXlzICsgJ1wiKScpOyB9XG52YXIgaXNTdGF0aWNTY29wZSA9IC8qI19fUFVSRV9fKi9pc1Byb3RvdHlwZU9mLmJpbmQoU0NPUEUpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG52YXIgbWF0Y2hfY2FsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9tYXRjaC5jYWxsLmJpbmQobWF0Y2gpO1xuXG5mdW5jdGlvbiBtaXggKHByb3RvcyAgICAgICAgICkgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlICAgICAgICAgICAgICA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byAgICAgICAgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG52YXIgU2NvcGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBTY29wZSAoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICkgICAgICAgIHtcblx0XHRpZiAoIGtleXM9PT11bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIHRoaXMgKSB7XG5cdFx0XHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiBpc1N0YXRpY1Njb3BlKHRoaXMucHJvdG90eXBlKSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUodGhpcy5wcm90b3R5cGUpKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggaXNTdGF0aWNTY29wZSh0aGlzKSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZShTQ09QRSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICggdGhpcyApIHtcblx0XHRcdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyB2YXIgc2NvcGUgICAgICAgICAgICAgID0gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKG1hdGNoX2NhbGwoa2V5cywgS0VZUykgfHwgdGhyb3dFbXB0eShrZXlzKSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgaXNTdGF0aWNTY29wZSh0aGlzLnByb3RvdHlwZSkgKSB7IHNjb3BlID0gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKG1hdGNoX2NhbGwoa2V5cywgS0VZUykgfHwgdGhyb3dFbXB0eShrZXlzKSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGUpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCBpc1N0YXRpY1Njb3BlKHRoaXMpICkgeyBzY29wZSA9IG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShtYXRjaF9jYWxsKGtleXMsIEtFWVMpIHx8IHRocm93RW1wdHkoa2V5cyksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMpOyB9XG5cdFx0XHRcdGVsc2UgeyByZXR1cm4gbmV3IFN0YXRpY1Njb3BlKG1hdGNoX2NhbGwoa2V5cywgS0VZUykgfHwgdGhyb3dFbXB0eShrZXlzKSk7IH1cblx0XHRcdFx0SW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG5cdFx0XHRcdHJldHVybiBzY29wZTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyByZXR1cm4gbmV3IFN0YXRpY1Njb3BlKG1hdGNoX2NhbGwoa2V5cywgS0VZUykgfHwgdGhyb3dFbXB0eShrZXlzKSk7IH1cblx0XHR9XG5cdH1cblx0Ly9AdHMtaWdub3JlXG5cdFNjb3BlLnByb3RvdHlwZSA9IG51bGw7XG5cdHJldHVybiBmcmVlemUoU2NvcGUpO1xufSgpO1xuXG5leHBvcnQgeyBTY29wZSBhcyBkZWZhdWx0LCBLRVlTIH07IiwiaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFRlbXBsYXRlIChodG1sICAgICAgICAsIHNjb3BlICAgICAgICkgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovc2NvcGVbX10oaHRtbCk7XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbnZhciBOT1RfRVM1ID0gL14oY29uc3xsZSl0IC87XG5cbmZ1bmN0aW9uIFdpdGhTdHJpcHBlZCAocmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0cmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlO1xuXHRyZXR1cm4gcmVuZGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXIgKGNvZGUgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdHJldHVybiBjb2RlWzBdPT09JygnXG5cdFx0PyAvKiNfX1BVUkVfXyovRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybiBjbGFzcyBSZW5kZXIgZXh0ZW5kcyBudWxse2NvbnN0cnVjdG9yJysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9OycpKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0OiAvKiNfX1BVUkVfXyovV2l0aFN0cmlwcGVkKFxuXHRcdFx0LyojX19QVVJFX18qL0Z1bmN0aW9uKE5PVF9FUzUudGVzdChjb2RlKVxuXHRcdFx0XHQ/ICdcInVzZSBzdHJpY3RcIjtyZXR1cm57cmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9fS5yZW5kZXI7J1xuXHRcdFx0XHQ6ICdcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24gcmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9Oydcblx0XHRcdCkoKSAgICAgICAgICBcblx0XHQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGNvZGVzLmxlbmd0aDtcblx0dmFyIGJvZHkgICAgICAgICA9ICddJztcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4OyApIHsgYm9keSA9ICdmdW5jdGlvbigpeycrc2NvcGVfKGNvZGVzWy0taW5kZXhdKSsnfSwnK2JvZHk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHR3aGlsZSAoIGluZGV4ICkgeyBib2R5ID0gJ2Z1bmN0aW9uKCl7Jytjb2Rlc1stLWluZGV4XSsnfSwnK2JvZHk7IH1cblx0fVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVyblsnK2JvZHkpKCk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHlsZSAoY3NzICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFJlZmxlY3QhPT0ndW5kZWZpbmVkJyA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiAvKiNfX1BVUkVfXyovIE9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgcHJvcGVydHlJc0VudW1lcmFibGUgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnO1xuaW1wb3J0IGVycm9yIGZyb20gJy5jb25zb2xlLmVycm9yJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5leHBvcnQgdmFyIHRoYXQgICAgICAgICAgICAgICAgID0gbnVsbDtcblxuZXhwb3J0IHZhciBOQU1FUyA9IGFzc2lnbiAmJiAvKiNfX1BVUkVfXyovYXNzaWduKGNyZWF0ZShudWxsKSwge1xuXHRfOiBudWxsLFxuXHRfYzogbnVsbCxcblx0X2NvbXB1dGVkV2F0Y2hlcnM6IG51bGwsXG5cdF9kYXRhOiBudWxsLFxuXHRfZGlyZWN0SW5hY3RpdmU6IG51bGwsXG5cdF9ldmVudHM6IG51bGwsXG5cdF9oYXNIb29rRXZlbnQ6IG51bGwsXG5cdF9oYXNNb3ZlOiBudWxsLFxuXHRfaW5hY3RpdmU6IG51bGwsXG5cdF9pc0JlaW5nRGVzdHJveWVkOiBudWxsLFxuXHRfaXNEZXN0cm95ZWQ6IG51bGwsXG5cdF9pc01vdW50ZWQ6IG51bGwsXG5cdF9pc1Z1ZTogbnVsbCxcblx0X2xlYXZpbmc6IG51bGwsXG5cdF9uYW1lOiBudWxsLFxuXHRfcHJvcHM6IG51bGwsXG5cdF9wcm92aWRlZDogbnVsbCxcblx0X3JlZmxvdzogbnVsbCxcblx0X3JlbmRlclByb3h5OiBudWxsLFxuXHRfc2VsZjogbnVsbCxcblx0X3N0YXRpY1RyZWVzOiBudWxsLFxuXHRfdWlkOiBudWxsLFxuXHRfdXBkYXRlOiBudWxsLFxuXHRfdm5vZGU6IG51bGwsXG5cdF93YXRjaGVyOiBudWxsLFxuXHRfd2F0Y2hlcnM6IG51bGwsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb1Byb3RvIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0ZGVmaW5lUHJvcGVydGllcyhfID8gXy5jdHggOiBzZWxmLCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9Db25zdHJ1Y3RvciAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9OYW1lcyAoc2VsZiAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAsIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0cHJvdG9EZXNjcmlwdG9ycyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdHZhciBkYXRhID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGF0YU5hbWVzKSAgICAgICAgO1xuXHRpZiAoIF8gKSB7XG5cdFx0dmFyIGFjY2Vzc0NhY2hlID0gXy5hY2Nlc3NDYWNoZTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBkYXRhTmFtZXMgKSB7XG5cdFx0XHRkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0XHRpZiAoIG5hbWUgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0Zm9yICggbmFtZSBpbiBkYXRhTmFtZXMgKSB7IGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTsgfVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9EYXRhIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgcmVzdE5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHRwcm90b0Rlc2NyaXB0b3JzICYmIGRlZmluZVByb3BlcnRpZXMoY3R4LCBwcm90b0Rlc2NyaXB0b3JzKTtcblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0aWYgKCBfICkge1xuXHRcdHZhciBhY2Nlc3NDYWNoZSA9IF8uYWNjZXNzQ2FjaGU7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIHJlc3ROYW1lcyApICYmIG5hbWVbMF0hPT0nJCcgKSB7XG5cdFx0XHRcdGRhdGFbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRcdFx0aWYgKCBuYW1lIGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBub3dOYW1lcyA9IEtleXMoY3R4KTtcblx0XHR2YXIgaW5kZXggPSBub3dOYW1lcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpbmRleCApIHtcblx0XHRcdG5hbWUgPSBub3dOYW1lc1stLWluZGV4XSA7XG5cdFx0XHRpZiAoICEoIG5hbWUgaW4gcmVzdE5hbWVzICkgJiYgbmFtZVswXSE9PSckJyApIHsgZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdOyB9XG5cdFx0fVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZEYXRhIChzZWxmICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgc2tpcERhdGEgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgLCBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBza2lwQ29uc3RydWN0b3IgICAgICAgICAsIF9fZGV2X18gICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0Zm9yICggdmFyIG5hbWUgaW4gY3R4ICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyAmJiAhKCBuYW1lIGluIE5BTUVTICkgKSB7XG5cdFx0XHRlcnJvcihFcnJvcignW2pWdWUgYnVnXTogdm0uJyArIG5hbWUgKyAnIGlzIHVua25vd24gYnV0IGV4aXN0cycpKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHR2YXIgb2xkRGVzY3JpcHRvcnMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGN0eCksIHByb3RvRGVzY3JpcHRvcnMpO1xuXHRpZiAoIHByb3RvRGVzY3JpcHRvcnMgKSB7XG5cdFx0Zm9yICggdmFyICRuYW1lIGluIHByb3RvRGVzY3JpcHRvcnMgKSB7IGlmICggJG5hbWUgaW4gY3R4ICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVzZXJ2ZWQpOyB9IH1cblx0XHRkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgcHJvdG9EZXNjcmlwdG9ycyk7XG5cdH1cblx0XG5cdHZhciBwcmV2aW91cyA9IHRoYXQ7XG5cdHRoYXQgPSBzZWxmO1xuXHR0cnkgeyBuZXcgY29uc3RydWN0b3IoVnVlMyk7IH1cblx0ZmluYWxseSB7IHRoYXQgPSBwcmV2aW91czsgfVxuXHRcblx0b3duS2V5cyhvbGREZXNjcmlwdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dmFyIG9sZERlc2NyaXB0b3IgPSBvbGREZXNjcmlwdG9yc1trZXldIDtcblx0XHR2YXIgbmV3RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdHgsIGtleSAgICAgICAgICAgICAgICAgKTtcblx0XHRpZiAoXG5cdFx0XHQhbmV3RGVzY3JpcHRvciB8fFxuXHRcdFx0bmV3RGVzY3JpcHRvci5jb25maWd1cmFibGUhPT1vbGREZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSB8fFxuXHRcdFx0bmV3RGVzY3JpcHRvci5lbnVtZXJhYmxlIT09b2xkRGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8XG5cdFx0XHQoIG5ld0Rlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHQ/IG5ld0Rlc2NyaXB0b3IudmFsdWUhPT1vbGREZXNjcmlwdG9yLnZhbHVlIHx8IG5ld0Rlc2NyaXB0b3Iud3JpdGFibGUhPT1vbGREZXNjcmlwdG9yLndyaXRhYmxlXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0OiBuZXdEZXNjcmlwdG9yLmdldCE9PW9sZERlc2NyaXB0b3IuZ2V0IHx8IG5ld0Rlc2NyaXB0b3Iuc2V0IT09b2xkRGVzY3JpcHRvci5zZXRcblx0XHRcdClcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3JlZGVmaW5lZCk7IH1cblx0fSk7XG5cdHZhciBkaWZLZXlzICAgICAgICAgICAgICAgICAgICAgICAgPSBvd25LZXlzKGN0eCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gISgga2V5IGluIG9sZERlc2NyaXB0b3JzICk7XG5cdH0pO1xuXHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHtcblx0XHRpZiAoIGRpZktleXMubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0fVxuXHR2YXIgZGlmTmFtZXMgPSBkaWZLZXlzLmZpbHRlcihmdW5jdGlvbiAoa2V5KSAgICAgICAgICAgICAgICB7XG5cdFx0cmV0dXJuIHR5cGVvZiBrZXk9PT0nc3RyaW5nJyAmJiBrZXlbMF0hPT0nJCc7XG5cdH0pO1xuXHRpZiAoIHNraXBEYXRhICkge1xuXHRcdGlmICggZGlmTmFtZXMubGVuZ3RoICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0fVxuXHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHR2YXIgY291bnQgPSAwO1xuXHRcdGZvciAoIG5hbWUgaW4gZGF0YU5hbWVzICkgeyArK2NvdW50OyB9XG5cdFx0aWYgKCBjb3VudCE9PWRpZk5hbWVzLmxlbmd0aCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0aWYgKCAhKCBuYW1lIGluIGRhdGFOYW1lcyApICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZGF0YSk7IH1cblx0XHR9KTtcblx0fVxuXHRkaWZOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgIG5hbWUpIHtcblx0XHRpZiAoIG5hbWUgaW4gdGhpcyAmJiAhKCBuYW1lIGluIHt9ICkgfHwgbmFtZSBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lPT09J2NvbnN0cnVjdG9yJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XHRpZiAoICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGN0eCwgbmFtZSkpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2VudW1lcmFibGUpOyB9XG5cdH0sIGdldFByb3RvdHlwZU9mKGN0eCkpO1xuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0ZGlmTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdCggZGF0YSAgICAgICAgIClbbmFtZV0gPSBjdHhbbmFtZSAgICAgICAgICAgICAgICAgXTtcblx0XHRpZiAoIF8gJiYgbmFtZSBpbiBfLmFjY2Vzc0NhY2hlICkgeyBfLmFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0fSk7XG5cdGlmICggc2hhZG93QXNzaWduZXIgKSB7XG5cdFx0c2hhZG93Q2hlY2tlciAoZGF0YSk7XG5cdFx0c2hhZG93QXNzaWduZXIoc2VsZiwgZGF0YSk7XG5cdH1cblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBJTklUID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIElOSVQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICA7XG5cdElOSVQubW9kZSA9ICdvcGVuJztcblx0cmV0dXJuIElOSVQ7XG59KCk7XG5cbmZ1bmN0aW9uIGF0dGFjaCAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGVsICYmICggZWwuc2hhZG93Um9vdCB8fCBlbC5hdHRhY2hTaGFkb3coSU5JVCkgKTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93QXNzaWduZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0dmFyIG5hbWVzID0gaW5kZXg8MCA/IG51bGwgOiBhbG9uZy5zbGljZShpbmRleCArIDEpLnNwbGl0KCcuJyk7XG5cdHZhciB0b05hbWUgPSBuYW1lcyA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIG5hbWVzICkge1xuXHRcdGlmICggbmFtZXMubGVuZ3RoPT09MSApIHtcblx0XHRcdHZhciBuYW1lJGdldCA9IG5hbWVzWzBdICsgJyRnZXQnO1xuXHRcdFx0dmFyIG5hbWUkc2V0ID0gbmFtZXNbMF0gKyAnJHNldCc7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0YWxsW25hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0YWxsW25hbWUkZ2V0XSA9IG51bGw7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdG5hbWVzIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICApIHtcblx0XHRcdFx0XHRhbGxbbmFtZSArICckc2V0J10gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWVdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0XHRhbGxbbmFtZSArPSAnJGdldCddID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gdG9OYW1lICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gdG9OYW1lICsgJyRzZXQnO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgLCBkYXRhICAgICApIHtcblx0XHRcdGRhdGFbdG9OYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdGRhdGFbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dDaGVja2VyICggICAgICAgICAgICBhbG9uZyAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgc2hhZG93TmFtZXMgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGlmICggYWxvbmdbMF09PT0nXycgfHwgYWxvbmdbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0aWYgKCBpbmRleDwwICkge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRzZXQnO1xuXHRcdGlmICggdG9OYW1lJGdldCBpbiByZXN0TmFtZXMgfHwgdG9OYW1lJHNldCBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdHNoYWRvd05hbWVzW3RvTmFtZSRzZXRdID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggdG9OYW1lJGdldCBpbiBkYXRhTmFtZXMgfHwgdG9OYW1lJHNldCBpbiBkYXRhTmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgZGF0YSAgICAgICkge1xuXHRcdFx0aWYgKCB0b05hbWUkZ2V0IGluIGRhdGEgfHwgdG9OYW1lJHNldCBpbiBkYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc2hhZG93KTsgfVxuXHRcdH07XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBhbG9uZz09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCBhbG9uZyBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbYWxvbmddID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YU5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9O1xuXHR9XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwPyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgZnJvbSBmcm9tICcuQXJyYXkuZnJvbT8nO1xuaW1wb3J0IGdldFByb3RvdHlwZU9mIGZyb20gJy5SZWZsZWN0LmdldFByb3RvdHlwZU9mPz1PYmplY3QuZ2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gJy5PYmplY3Quc2V0UHJvdG90eXBlT2Y/JztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/JztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0IGZyb20gJy5SZWZsZWN0LmdldD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgT3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBQUk9UT19CVUcgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgdGhhdCwgTkFNRVMsIHByb1Byb3RvLCBwcm9Db25zdHJ1Y3RvciwgcHJvTmFtZXMsIHByb0RhdGEsIGRldkRhdGEgfSBmcm9tICcuL0RhdGEnO1xuaW1wb3J0IHsgU2hhZG93QXNzaWduZXIsIFNoYWRvd0NoZWNrZXIgfSBmcm9tICcuL1NoYWRvdyc7XG5cbmV4cG9ydCB7IENvbXBvbmVudCBhcyBkZWZhdWx0IH07XG52YXIgQ29tcG9uZW50ICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9mcmVlemUoLyojX19QVVJFX18qL2RlZmluZVByb3BlcnRpZXMoXG5cdGZ1bmN0aW9uIENvbXBvbmVudCAoKSB7IHJldHVybiB0aGF0OyB9LFxuXHR7XG5cdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHR9LFxuXHRcdHJlbmRlcjoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6IHVuZGVmaW5lZCxcblx0XHRcdHNldDogZnVuY3Rpb24gcmVuZGVyICggICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICkgeyAoIHRoYXQgLl8gfHwgdGhhdCAuJG9wdGlvbnMgKS5yZW5kZXIgPSB2YWx1ZTsgfSxcblx0XHR9LFxuXHRcdF9tYWluOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfbWFpbiAoICAgICAgICAgICAgICApICAgICAgIHtcblx0XHRcdFx0aWYgKCAhaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih0aGlzKSApIHsgdGhyb3cgVHlwZUVycm9yKCcoIUNvbXBvbmVudCkuX21haW4oKScpOyB9XG5cdFx0XHRcdHZhciBWdWUgPSBGdW5jdGlvbigncmV0dXJuIFZ1ZScpKCk7XG5cdFx0XHRcdHR5cGVvZiBWdWU9PT0nb2JqZWN0J1xuXHRcdFx0XHRcdD8gVnVlLmNyZWF0ZUFwcChcblx0XHRcdFx0XHRcdFRvT3B0aW9ucyhcblx0XHRcdFx0XHRcdFx0dGhpcyxcblx0XHRcdFx0XHRcdFx0VnVlLFxuXHRcdFx0XHRcdFx0XHRWdWUuY29uZmlnLmRldnRvb2xzID8gKCBWdWUuY29uZmlnLnBlcmZvcm1hbmNlID0gdHJ1ZSwge30gKSA6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0XHQubW91bnQoZG9jdW1lbnQuYm9keSlcblx0XHRcdFx0XHQ6IG5ldyAoIFZ1ZS5leHRlbmQoXG5cdFx0XHRcdFx0XHRUb09wdGlvbnMoXG5cdFx0XHRcdFx0XHRcdHRoaXMsXG5cdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdFx0VnVlLmRldnRvb2xzID8gKCBWdWUuY29uZmlnLnBlcmZvcm1hbmNlID0gdHJ1ZSwge30gKSA6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdCkgKSgpXG5cdFx0XHRcdFx0LiRtb3VudCgoIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gJzxicj4nLCAnYnInICkpO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdF90b09wdGlvbnM6IHtcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF90b09wdGlvbnMgKCAgICAgICAgICAgICAgICBWdWUzICAgICAgICAsIF9fZGV2X18gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHRpZiAoICFpc0NvbXBvbmVudENvbnN0cnVjdG9yKHRoaXMpICkgeyB0aHJvdyBUeXBlRXJyb3IoJyghQ29tcG9uZW50KS5fdG9PcHRpb25zKCknKTsgfVxuXHRcdFx0XHRyZXR1cm4gVG9PcHRpb25zKHRoaXMsIFZ1ZTMsIF9fZGV2X18pO1xuXHRcdFx0fSxcblx0XHR9LFxuXHR9XG4pKTtcblxuZnVuY3Rpb24gVG9PcHRpb25zICggICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBESURfT1BUSU9OUyA9IE9QVElPTlMub2JqZWN0cy5pbnRvKF9fZGV2X18gfHwgT1BUSU9OUyAgICAgICApLmludG8oVnVlMyB8fCBPUFRJT05TICAgICAgICk7XG5cdHZhciBUTVBfT1BUSU9OUyA9IG5ldyBPUFRJT05TLm9iamVjdHNUbXA7XG5cdHZhciBvcHRpb25zID0gT3B0aW9ucyhcblx0XHRjb25zdHJ1Y3Rvcixcblx0XHRWdWUzIHx8IHVuZGVmaW5lZCxcblx0XHRfX2Rldl9fID8gREVWLnJlZHVjZShmdW5jdGlvbiBEZXYgKGRldiwga2V5KSB7XG5cdFx0XHRkZXZba2V5XSA9IF9fZGV2X18gW2tleV0gfHwga2V5O1xuXHRcdFx0cmV0dXJuIGRldjtcblx0XHR9LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCxcblx0XHRESURfT1BUSU9OUyxcblx0XHRUTVBfT1BUSU9OU1xuXHQpO1xuXHRUTVBfT1BUSU9OUy5mb3JFYWNoIChmdW5jdGlvbiAob3B0aW9uc1ZhbHVlLCBjb25zdHJ1Y3RvcktleSkgeyBESURfT1BUSU9OUy5zZXQoY29uc3RydWN0b3JLZXksIG9wdGlvbnNWYWx1ZSk7IH0pO1xuXHRyZXR1cm4gb3B0aW9ucztcbn1cblxudmFyIF9taXhpbnMgICAgICAgICAgICAgICAgPSBTeW1ib2wgJiYgLyojX19QVVJFX18qL1N5bWJvbCgnX21peGlucycpICAgICAgICAgICAgICAgICA7XG5cbmZ1bmN0aW9uIF9fUFVSRV9fICggICAgICAgICAgICBTdWIgICAgICwgbWl4aW5zICAgICAgICkge1xuXHRTdWIucHJvdG90eXBlID0gbnVsbDtcblx0U3ViW19taXhpbnNdID0gbWl4aW5zO1xuXHRyZXR1cm4gc2V0UHJvdG90eXBlT2YoU3ViLCBDb21wb25lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW4gKCAgICAgICAgICApIHtcblx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcblx0XHQ/IC8qI19fUFVSRV9fKi9fX1BVUkVfXyhmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0OyB9LCAvKiNfX1BVUkVfXyovZnJvbShhcmd1bWVudHMpKVxuXHRcdDogQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBPcHRpb25zIChjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICwgRElEX09QVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBUTVBfT1BUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAge1xuXHRcblx0dmFyIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgPSBESURfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpIHx8IFRNUF9PUFRJT05TLmdldChjb25zdHJ1Y3Rvcik7XG5cdGlmICggb3B0aW9ucyApIHsgcmV0dXJuIG9wdGlvbnM7IH1cblx0T1BUSU9OUy5jb25zdHJ1Y3Rvci5zZXQob3B0aW9ucyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgLCBjb25zdHJ1Y3Rvcik7XG5cdFxuXHRpZiAoIGlzTWl4aW5zKGNvbnN0cnVjdG9yKSApIHtcblx0XHR2YXIgc3RhdGljX21peGlucyA9IGNvbnN0cnVjdG9yW19taXhpbnNdIDtcblx0XHR2YXIgbWl4aW5zID0gbmV3IE9QVElPTlMuU2V0ICAgICAgICAgICAgKCk7XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHR3aGlsZSAoIGluZGV4IT09c3RhdGljX21peGlucy5sZW5ndGggKSB7XG5cdFx0XHR2YXIgbWl4aW4gPSBzdGF0aWNfbWl4aW5zW2luZGV4KytdIDtcblx0XHRcdGlmICggaXNDb21wb25lbnRDb25zdHJ1Y3RvcihtaXhpbikgKSB7XG5cdFx0XHRcdHZhciBtaXhpbk9wdGlvbnMgPSBPcHRpb25zKG1peGluLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcdFx0XHRpZiAoIGlzTWl4aW5zKG1peGluKSApIHtcblx0XHRcdFx0XHR2YXIgbWl4aW5NaXhpbnMgPSBtaXhpbk9wdGlvbnMubWl4aW5zIDtcblx0XHRcdFx0XHR2YXIgbWl4aW5JbmRleCA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCBtaXhpbkluZGV4IT09bWl4aW5NaXhpbnMubGVuZ3RoICkgeyBtaXhpbnMuYWRkKG1peGluTWl4aW5zW21peGluSW5kZXgrK10gKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgeyBtaXhpbnMuYWRkKG1peGluT3B0aW9ucyk7IH1cblx0XHRcdH1cblx0XHRcdGVsc2UgeyBtaXhpbnMuYWRkKG1peGluICAgICAgICAgICAgICApOyB9XG5cdFx0fVxuXHRcdG9wdGlvbnMubWl4aW5zID0gZnJvbShtaXhpbnMpO1xuXHRcdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXyk7XG5cdFx0Y29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XHRUTVBfT1BUSU9OUy5zZXQoY29uc3RydWN0b3IsIG9wdGlvbnMpO1xuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG5cdFxuXHR2YXIgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuXHRcblx0dmFyIFN1cGVyID0gT1BUSU9OUy5zdXBlci5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoICFTdXBlciApIHtcblx0XHRPUFRJT05TLnN1cGVyLnNldChjb25zdHJ1Y3RvciwgU3VwZXIgPSBnZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvcikpO1xuXHRcdFN1cGVyPT09Q29tcG9uZW50IHx8IGlzTWl4aW5zKFN1cGVyKSB8fCAoIHNldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yLCBDb21wb25lbnQpLCBzZXRQcm90b3R5cGVPZihwcm90b3R5cGUsIG51bGwpICk7XG5cdH1cblx0aWYgKCBTdXBlciE9PUNvbXBvbmVudCApIHtcblx0XHR2YXIgU3VwZXJPcHRpb25zID0gT3B0aW9ucyhTdXBlciwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRpc01peGlucyhTdXBlcilcblx0XHRcdD8gU3VwZXJPcHRpb25zLm1peGlucyAubGVuZ3RoPT09MVxuXHRcdFx0PyBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnMubWl4aW5zIFswXVxuXHRcdFx0OiBvcHRpb25zLm1peGlucyA9IFN1cGVyT3B0aW9ucy5taXhpbnNcblx0XHRcdDogb3B0aW9ucy5leHRlbmRzID0gU3VwZXJPcHRpb25zO1xuXHR9XG5cdFxuXHRfX2Rldl9fICYmIGdldE93blByb3BlcnR5U3ltYm9scyhjb25zdHJ1Y3RvcikuZm9yRWFjaChmdW5jdGlvbiAoc3ltYm9sKSB7XG5cdFx0aWYgKCBzeW1ib2whPT1fbWl4aW5zICYmICEoIHN5bWJvbCBpbiBTWU1CT0xTICkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zeW1ib2wpOyB9XG5cdH0pO1xuXHRcblx0dmFyIHNldCAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZTZXQuYmluZChfX2Rldl9fKSA6IHByb1NldDtcblx0dmFyIGFzc2VydEZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2QXNzZXJ0RnVuY3Rpb24uYmluZChfX2Rldl9fKSA6IHByb0Fzc2VydEZ1bmN0aW9uO1xuXHRcblx0dmFyIHN0YXRpY05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhjb25zdHJ1Y3Rvcik7XG5cdGluZGV4ID0gc3RhdGljTmFtZXMubGVuZ3RoO1xuXHR2YXIgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG5cdHZhciBza2lwQ29uc3RydWN0b3IgPSBmYWxzZTtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgc3RhdGljTmFtZSA9IHN0YXRpY05hbWVzWy0taW5kZXhdIDtcblx0XHRpZiAoIHN0YXRpY05hbWU9PT0nUmVuZGVyJyApIHsgdmFyIFJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdICAgICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSduYW1lJyB8fCBzdGF0aWNOYW1lPT09J2xlbmd0aCcgKSB7XG5cdFx0XHRkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbnN0cnVjdG9yLCBzdGF0aWNOYW1lKTtcblx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmIHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBkZXNjcmlwdG9yLnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgYXBwbHkoZGVzY3JpcHRvci5nZXQgLCBjb25zdHJ1Y3RvciwgQVJHUykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSdkYXRhJyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSE9PXVuZGVmaW5lZCApIHsgdGhyb3cgRXJyb3IoaXNBcnJheShjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSkgPyBfX2Rldl9fLmNvbXBpbGVfbGF5ZXIgOiBfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdH1cblx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBzdGF0aWNOYW1lIT09J3Byb3RvdHlwZScgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggc3RhdGljTmFtZVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdzZXR1cCcgfHwgc3RhdGljTmFtZT09PSd3YXRjaCcgfHwgc3RhdGljTmFtZT09PSdtZXRob2RzJyB8fCBzdGF0aWNOYW1lPT09J2NvbXB1dGVkJyB8fCBzdGF0aWNOYW1lPT09J2V4dGVuZHMnIHx8IHN0YXRpY05hbWU9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nYmVmb3JlQ3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdjcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZU1vdW50JyB8fCBzdGF0aWNOYW1lPT09J21vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVXBkYXRlJyB8fCBzdGF0aWNOYW1lPT09J3VwZGF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2RlYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVubW91bnQnIHx8IHN0YXRpY05hbWU9PT0ndW5tb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZURlc3Ryb3knIHx8IHN0YXRpY05hbWU9PT0nZGVzdHJveWVkJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0naW5qZWN0JyB8fCBzdGF0aWNOYW1lPT09J3Byb3BzJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheWVyKTsgfVxuXHRcdFx0fVxuXHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pO1xuXHRcdH1cblx0fVxuXHRcblx0dmFyIHByb3RvRGVzY3JpcHRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0XG5cdHZhciBwcm90b05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpO1xuXHRpbmRleCA9IHByb3RvTmFtZXMubGVuZ3RoO1xuXHR2YXIgd2F0Y2hlcnMgICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2tpcERhdGEgPSBmYWxzZTtcblx0dmFyIGRhdGFOYW1lcyAgICAgICAgICAgICAgID0gbnVsbDtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgcHJvdG9OYW1lID0gcHJvdG9OYW1lc1stLWluZGV4XSA7XG5cdFx0aWYgKCBwcm90b05hbWU9PT0nX2RhdGEnICkge1xuXHRcdFx0dmFyIF9kYXRhID0gZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpO1xuXHRcdFx0aWYgKCBfZGF0YSApIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggIWlzQXJyYXkoX2RhdGEpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdFx0XHRfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgbGVuZ3RoID0gX2RhdGEubGVuZ3RoO1xuXHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRkYXRhTmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0XHRcdGRvIHsgZGF0YU5hbWVzW19kYXRhW2ldXSA9IG51bGw7IH1cblx0XHRcdFx0XHR3aGlsZSAoICsraSE9PWxlbmd0aCApO1xuXHRcdFx0XHRcdGRhdGFOYW1lcyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRhdGFOYW1lcyk7XG5cdFx0XHRcdFx0X19kZXZfXyAmJiBPUFRJT05TLmRhdGEuc2V0KG9wdGlvbnMsIGRhdGFOYW1lcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0c2tpcERhdGEgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggX2RhdGEhPT11bmRlZmluZWQgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nXycgJiYgISggcHJvdG9OYW1lLnN0YXJ0c1dpdGgoJ193YXRjaCgnKSApICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHR2YXIgcHJvdG9OYW1lMSA9IHByb3RvTmFtZS5zbGljZSgxKTtcblx0XHRcdFx0aWYgKCBwcm90b05hbWUxWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J3NldHVwJyB8fCBwcm90b05hbWUxPT09J3dhdGNoJyB8fCBwcm90b05hbWUxPT09J21ldGhvZHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcHV0ZWQnIHx8IHByb3RvTmFtZTE9PT0nZXh0ZW5kcycgfHwgcHJvdG9OYW1lMT09PSdtaXhpbnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdlbWl0cycgfHwgcHJvdG9OYW1lMT09PSdjb21wb25lbnRzJyB8fCBwcm90b05hbWUxPT09J2RpcmVjdGl2ZXMnIHx8IHByb3RvTmFtZTE9PT0nc3RhdGljUmVuZGVyRm5zJyB8fCBwcm90b05hbWUxPT09J3RlbXBsYXRlJyB8fCBwcm90b05hbWUxPT09J2luaGVyaXRBdHRycycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J25hbWUnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdSZW5kZXInIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdkZWxpbWl0ZXJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZmlsdGVycycgfHwgcHJvdG9OYW1lMT09PSdjb21tZW50cycgfHwgcHJvdG9OYW1lMT09PSdmdW5jdGlvbmFsJyB8fCBwcm90b05hbWUxPT09J3Byb3BzRGF0YScgfHwgcHJvdG9OYW1lMT09PSdtb2RlbCdcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9sYXllcik7IH1cblx0XHRcdH1cblx0XHRcdHNldChvcHRpb25zLCBwcm90b05hbWUuc2xpY2UoMSksIGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvTmFtZSk7XG5cdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSdfJyApIHtcblx0XHRcdFx0dmFyIGluZGV4T2ZRID0gcHJvdG9OYW1lLmxhc3RJbmRleE9mKCcpJyk7XG5cdFx0XHRcdHZhciB3YXRjaGVyID0gd2F0Y2hlcnNbd2F0Y2hlcnMubGVuZ3RoXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gcHJvdG9OYW1lLnNsaWNlKDcsIGluZGV4T2ZRKS50cmltKCk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5nZXQpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3Iuc2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGluZGV4T2ZRICsgMSE9PXByb3RvTmFtZS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aW5kZXhPZlEgKz0gMjtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkEgPSBwcm90b05hbWUuaW5kZXhPZignOycsIGluZGV4T2ZRKTtcblx0XHRcdFx0XHRcdHZhciBwYWlyID0gaW5kZXhPZkE8MFxuXHRcdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSlcblx0XHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEsIGluZGV4T2ZBKTtcblx0XHRcdFx0XHRcdGluZGV4T2ZRID0gaW5kZXhPZkEgKyAxO1xuXHRcdFx0XHRcdFx0aWYgKCBwYWlyICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkUgPSBwYWlyLmluZGV4T2YoJz0nKTtcblx0XHRcdFx0XHRcdFx0aW5kZXhPZkU8MFxuXHRcdFx0XHRcdFx0XHRcdD8gd2F0Y2hlcltwYWlyXSA9IHRydWVcblx0XHRcdFx0XHRcdFx0XHQ6IHdhdGNoZXJbcGFpci5zbGljZSgwLCBpbmRleE9mRSldID0gcGFpci5zbGljZShpbmRleE9mRSArIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoIGluZGV4T2ZRICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nJCcgKSB7XG5cdFx0XHRcdCggcHJvdG9EZXNjcmlwdG9ycyB8fCAoIHByb3RvRGVzY3JpcHRvcnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZSE9PSdjb25zdHJ1Y3RvcicgfHwgZGVzY3JpcHRvci52YWx1ZSE9PWNvbnN0cnVjdG9yICkge1xuXHRcdFx0XHRcdFx0KCBvcHRpb25zLm1ldGhvZHMgfHwgKCBvcHRpb25zLm1ldGhvZHMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQoIG9wdGlvbnMuY29tcHV0ZWQgfHwgKCBvcHRpb25zLmNvbXB1dGVkID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gZGVzY3JpcHRvci5zZXQgPyB7XG5cdFx0XHRcdFx0XHRnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuXHRcdFx0XHRcdFx0c2V0OiBkZXNjcmlwdG9yLnNldFxuXHRcdFx0XHRcdH0gOiBkZXNjcmlwdG9yLmdldCAgICAgICA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHZhciBwcm90b1N5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvdG90eXBlKSAgICAgICAgICAgICAgICAgICA7XG5cdGlmICggKCBpbmRleCA9IHByb3RvU3ltYm9scy5sZW5ndGggKSApIHtcblx0XHRpZiAoICFwcm90b0Rlc2NyaXB0b3JzICkgeyBwcm90b0Rlc2NyaXB0b3JzID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHRkbyB7XG5cdFx0XHR2YXIgcHJvdG9TeW1ib2wgICAgICAgICAgICAgICAgPSBwcm90b1N5bWJvbHNbLS1pbmRleF0gO1xuXHRcdFx0cHJvdG9EZXNjcmlwdG9ycyBbcHJvdG9TeW1ib2xdID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvdG9TeW1ib2wpKTtcblx0XHR9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHR9XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgT1BUSU9OUy5wcm90by5zZXQob3B0aW9ucywgcHJvdG9EZXNjcmlwdG9ycyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIHByb3RvRGVzY3JpcHRvcnMpKTtcblx0XG5cdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXyk7XG5cdFxuXHR2YXIgcmVzdE5hbWVzID0gY29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XG5cdGlmICggUmVuZGVyICYmIFZ1ZTMgKSB7XG5cdFx0dmFyIHNoYWRvdyA9IFJlbmRlci5zaGFkb3c7XG5cdFx0aWYgKCBzaGFkb3cgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICYmIHNraXBEYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0XHR2YXIgc2hhZG93TmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdHZhciBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gU2hhZG93Q2hlY2tlcihzaGFkb3csIHJlc3ROYW1lcywgZGF0YU5hbWVzLCBzaGFkb3dOYW1lcywgX19kZXZfXyk7XG5cdFx0XHRcdE9QVElPTlMuc2hhZG93LnNldChvcHRpb25zLCBzaGFkb3dOYW1lcyk7XG5cdFx0XHR9XG5cdFx0XHRzaGFkb3dBc3NpZ25lciA9IFNoYWRvd0Fzc2lnbmVyKHNoYWRvdyk7XG5cdFx0fVxuXHRcdHZhciBzaGVldCA9IFJlbmRlci5zaGVldDtcblx0XHRpZiAoIHNoZWV0ICkge1xuXHRcdFx0dmFyIHdhdGNoZXJzMiAgICAgICAgICAgID0gW107XG5cdFx0XHRPd25LZXlzKHNoZWV0KS5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgICAgIGtleSwgaW5kZXgpIHtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB0aGlzW2luZGV4XSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgO1xuXHRcdFx0XHR3YXRjaGVyLiQgPSBhc3NlcnRGdW5jdGlvbihzaGVldCBba2V5XSk7XG5cdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGZ1bmN0aW9uICggICAgICAgICAgICBjc3MgICAgICAgICkgeyAoIHRoaXMuJHJlZnNba2V5XSAgICAgICAgICAgICAgICAgICAgICkudGV4dENvbnRlbnQgPSBjc3M7IH07XG5cdFx0XHRcdHdhdGNoZXIuaW1tZWRpYXRlID0gdHJ1ZTtcblx0XHRcdFx0d2F0Y2hlci5mbHVzaCA9ICdzeW5jJztcblx0XHRcdH0sIHdhdGNoZXJzMik7XG5cdFx0XHR3YXRjaGVyczIucmV2ZXJzZSgpO1xuXHRcdFx0dmFyIGJlZm9yZU1vdW50ID0gb3B0aW9ucy5iZWZvcmVNb3VudDtcblx0XHRcdG9wdGlvbnMuYmVmb3JlTW91bnQgPSBiZWZvcmVNb3VudFxuXHRcdFx0XHQ/IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0XHRyZXR1cm4gYXBwbHkoYmVmb3JlTW91bnQgLCB0aGlzLCBBUkdTKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0fTtcblx0XHR9XG5cdFx0b3B0aW9ucy5yZW5kZXIgPSBhc3NlcnRGdW5jdGlvbihuZXcgUmVuZGVyKFZ1ZTMgKSk7XG5cdH1cblx0XG5cdGlmICggX19kZXZfXyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIGRldkRhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgc2tpcERhdGEsIGRhdGFOYW1lcywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lciwgc2hhZG93Q2hlY2tlciwgc2tpcENvbnN0cnVjdG9yLCBfX2Rldl9fKTsgfTsgfVxuXHRlbHNlIGlmICggc2tpcENvbnN0cnVjdG9yIHx8IHNraXBEYXRhICkge31cblx0ZWxzZSBpZiAoIGRhdGFOYW1lcyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb05hbWVzKHNlbGYgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMsIGRhdGFOYW1lcyAsIHNoYWRvd0Fzc2lnbmVyKTsgfTsgfVxuXHRlbHNlIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb0RhdGEoc2VsZiAgICAgICAgICAgLCBwcm90b0Rlc2NyaXB0b3JzLCBjb25zdHJ1Y3RvciwgVnVlMywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lcik7IH07IH1cblx0XG5cdGlmICggd2F0Y2hlcnMubGVuZ3RoIHx8ICFfX2Rldl9fICYmICggc2tpcENvbnN0cnVjdG9yICYmIHByb3RvRGVzY3JpcHRvcnMgfHwgc2tpcERhdGEgKSApIHtcblx0XHR3YXRjaGVycy5sZW5ndGggJiYgd2F0Y2hlcnMucmV2ZXJzZSgpO1xuXHRcdHZhciBjcmVhdGVkID0gb3B0aW9ucy5jcmVhdGVkO1xuXHRcdHN3aXRjaCAoICggX19kZXZfXyA/ICggc2tpcENvbnN0cnVjdG9yID8gJ3MnIDogJ24nICkgOiAnXycgKSArICggd2F0Y2hlcnMubGVuZ3RoID8gJ3cnIDogJ18nICkgKyAoIGNyZWF0ZWQgPyAnYycgOiAnXycgKSApIHtcblx0XHRcdGNhc2UgJ3N3Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Qcm90byh0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMgKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc19fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1Byb3RvKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycyApO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ253Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHByb3RvRGVzY3JpcHRvcnMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbndfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9fJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgcHJvdG9EZXNjcmlwdG9ycywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ193Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBhcHBseShjcmVhdGVkICwgdGhpcywgQVJHUyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRcblx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XG5cdC8vQHRzLWlnbm9yZVxuXHRpZiAoIG9wdGlvbnMuY29tcG9uZW50cyB8fCBvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5kaXNwbGF5TmFtZSApIHtcblx0XHR2YXIgY29tcG9uZW50cyA9IG9wdGlvbnMuY29tcG9uZW50cyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIG9wdGlvbnMuY29tcG9uZW50cyk7XG5cdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0Zm9yICggcGFzY2FsIGluIGNvbXBvbmVudHMgKSB7XG5cdFx0XHRcdGlmICggIXBhc2NhbCB8fCBTVEFSVFNfV0lUSF9MT1dFUkNBU0UudGVzdChwYXNjYWwpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0XHRcdH1cblx0XHRcdGlmICggVnVlMyAmJiAhb3B0aW9ucy5yZW5kZXIgJiYgb3B0aW9ucy50ZW1wbGF0ZSApIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdG9wdGlvbnMubmFtZSAmJiBJTkNMVURFU19VUFBFUkNBU0UudGVzdChvcHRpb25zLm5hbWUuc2xpY2UoMSkpXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfY2FzZSk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdG9wdGlvbnMuZGlzcGxheU5hbWUgJiYgSU5DTFVERVNfVVBQRVJDQVNFLnRlc3Qob3B0aW9ucy5kaXNwbGF5TmFtZS5zbGljZSgxKSlcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9jYXNlKTsgfVxuXHRcdFx0XHRmb3IgKCBwYXNjYWwgaW4gY29tcG9uZW50cyApIHtcblx0XHRcdFx0XHRpZiAoIElOQ0xVREVTX1VQUEVSQ0FTRS50ZXN0KHBhc2NhbC5zbGljZSgxKSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9jYXNlKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAoIHZhciBwYXNjYWwgaW4gY29tcG9uZW50cyApIHtcblx0XHRcdHZhciB2YWx1ZSA9IGNvbXBvbmVudHNbcGFzY2FsXSA7XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IodmFsdWUpICkgeyBjb21wb25lbnRzW3Bhc2NhbF0gPSBPcHRpb25zKHZhbHVlLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpOyB9XG5cdFx0fVxuXHRcdGlmICggIVZ1ZTMgKSB7XG5cdFx0XHR2YXIgY2FzZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdG9wdGlvbnMubmFtZSAmJiBmaXhQYXNjYWwob3B0aW9ucy5uYW1lLCBjYXNlcyk7XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdG9wdGlvbnMuZGlzcGxheU5hbWUgJiYgZml4UGFzY2FsKG9wdGlvbnMuZGlzcGxheU5hbWUsIGNhc2VzKTtcblx0XHRcdGZvciAoIHBhc2NhbCBpbiBjb21wb25lbnRzICkgeyBmaXhQYXNjYWwocGFzY2FsLCBjYXNlcyk7IH1cblx0XHRcdGFzc2lnbihjb21wb25lbnRzLCBjYXNlcywgY29tcG9uZW50cyk7XG5cdFx0fVxuXHR9XG5cdFxuXHRyZXR1cm4gb3B0aW9ucztcblx0XG59XG5cbnZhciBPUFRJT05TID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO1xcXG5jbGFzcyBFYXN5TWFwIGV4dGVuZHMgV2Vha01hcHtpbnRvKGtleSl7bGV0IHN1Yj10aGlzLmdldChrZXkpO3N1Yj8/dGhpcy5zZXQoa2V5LHN1Yj1uZXcgRWFzeU1hcCk7cmV0dXJuIHN1Yn19RWFzeU1hcC5wcm90b3R5cGUuZ2V0PVdlYWtNYXAucHJvdG90eXBlLmdldDtFYXN5TWFwLnByb3RvdHlwZS5zZXQ9V2Vha01hcC5wcm90b3R5cGUuc2V0O1xcXG5jbGFzcyBTdHJvbmdNYXAgZXh0ZW5kcyBNYXB7fVN0cm9uZ01hcC5wcm90b3R5cGUuZ2V0PU1hcC5wcm90b3R5cGUuZ2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuc2V0PU1hcC5wcm90b3R5cGUuc2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuZm9yRWFjaD1NYXAucHJvdG90eXBlLmZvckVhY2g7XFxcbmNsYXNzIFN0cm9uZ1NldCBleHRlbmRzIFNldHt9U3Ryb25nU2V0LnByb3RvdHlwZS5hZGQ9U2V0LnByb3RvdHlwZS5hZGQ7U3Ryb25nU2V0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdPVNldC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXTtcXFxucmV0dXJue29iamVjdHM6bmV3IEVhc3lNYXAsb2JqZWN0c1RtcDpTdHJvbmdNYXAsc3VwZXI6bmV3IEVhc3lNYXAscmVzdDpuZXcgRWFzeU1hcCxkYXRhOm5ldyBFYXN5TWFwLHByb3RvOm5ldyBFYXN5TWFwLGNvbnN0cnVjdG9yOm5ldyBFYXN5TWFwLHNoYWRvdzpuZXcgRWFzeU1hcCxTZXQ6U3Ryb25nU2V0fVxcXG4nKSgpO1xuXHR9XG5cdGNhdGNoIChlcnJvcikge31cbn0oKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG4gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxudmFyIGlzQ29tcG9uZW50Q29uc3RydWN0b3IgPSAvKiNfX1BVUkVfXyovaXNQcm90b3R5cGVPZi5iaW5kKENvbXBvbmVudCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG52YXIgQVJHUyA9IFtdICAgICAgICAgO1xuXG52YXIgX01JWElOUyA9IFsgX21peGlucyBdICAgICAgICAgO1xuZnVuY3Rpb24gaXNNaXhpbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoaGFzT3duUHJvcGVydHksIGNvbnN0cnVjdG9yLCBfTUlYSU5TKTsgfVxuXG52YXIgU1lNQk9MUyA9IC8qI19fUFVSRV9fKi9nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkucmVkdWNlKGZ1bmN0aW9uIChTWU1CT0xTLCBuYW1lKSB7XG5cdGlmICggdHlwZW9mIFN5bWJvbFtuYW1lXT09PSdzeW1ib2wnICkgeyBTWU1CT0xTW1N5bWJvbFtuYW1lXSAgICAgICAgICAgICAgICAgXSA9IG51bGw7IH1cblx0cmV0dXJuIFNZTUJPTFM7XG59LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuZnVuY3Rpb24gJHdhdGNoICh0aGF0ICAgICAgLCB3YXRjaGVycyAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBpbmRleCA9IHdhdGNoZXJzLmxlbmd0aDtcblx0ZG8ge1xuXHRcdHZhciB3YXRjaGVyICAgICAgPSB3YXRjaGVyc1stLWluZGV4XTtcblx0XHR0aGF0LiR3YXRjaCh3YXRjaGVyLiQsIHdhdGNoZXIuaGFuZGxlciwgd2F0Y2hlcik7XG5cdH1cblx0d2hpbGUgKCBpbmRleCApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgXG4gIFxuZnVuY3Rpb24gY29sbGVjdE5hbWVzIChvcHRpb25zICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgKSAgICAgICAge1xuXHR2YXIgcmVzdE5hbWVzICAgICAgICAgICAgICAgICAgICA9IE9QVElPTlMucmVzdC5nZXQob3B0aW9ucyk7XG5cdGlmICggIXJlc3ROYW1lcyApIHtcblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyByZXN0TmFtZXMgPSBPUFRJT05TLnJlc3QuZ2V0KGNvbnN0cnVjdG9yKTsgfVxuXHRcdGlmICggIXJlc3ROYW1lcyApIHtcblx0XHRcdHJlc3ROYW1lcyA9IGNyZWF0ZShOQU1FUyk7XG5cdFx0XHR2YXIgZXh0ZW5kID0gb3B0aW9ucy5leHRlbmRzO1xuXHRcdFx0ZXh0ZW5kICYmIGFzc2lnbihyZXN0TmFtZXMsIGNvbGxlY3ROYW1lcyhleHRlbmQsIG51bGwpKTtcblx0XHRcdHZhciBtaXhpbnMgPSBvcHRpb25zLm1peGlucztcblx0XHRcdGlmICggbWl4aW5zICkgeyBmb3IgKCB2YXIgaW5kZXggPSBtaXhpbnMubGVuZ3RoOyBpbmRleDsgKSB7IGFzc2lnbihyZXN0TmFtZXMsIGNvbGxlY3ROYW1lcyhtaXhpbnNbLS1pbmRleF0gLCBudWxsKSk7IH0gfVxuXHRcdFx0dmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcblx0XHRcdHZhciBuYW1lICAgICAgICA7XG5cdFx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkgeyBmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkgeyByZXN0TmFtZXNbcHJvcHNbLS1pbmRleF0gXSA9IG51bGw7IH0gfVxuXHRcdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdFx0cHJvcHMgPSBvcHRpb25zLmluamVjdDtcblx0XHRcdGlmICggaXNBcnJheShwcm9wcykgKSB7IGZvciAoIGluZGV4ID0gcHJvcHMubGVuZ3RoOyBpbmRleDsgKSB7IHJlc3ROYW1lc1twcm9wc1stLWluZGV4XSBdID0gbnVsbDsgfSB9XG5cdFx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBwcm9wcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMubWV0aG9kcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0XHRyZXN0TmFtZXMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCByZXN0TmFtZXMpO1xuXHRcdH1cblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyBPUFRJT05TLnJlc3Quc2V0KGNvbnN0cnVjdG9yLCByZXN0TmFtZXMpOyB9XG5cdFx0T1BUSU9OUy5yZXN0LnNldChvcHRpb25zLCByZXN0TmFtZXMpO1xuXHR9XG5cdHJldHVybiByZXN0TmFtZXM7XG59XG5cbmZ1bmN0aW9uIHByb1NldCAgICAob2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHsgb2JqZWN0W25hbWVdID0gdmFsdWU7IH1cbmZ1bmN0aW9uIGRldlNldCAgICAoICAgICAgICAgICAgICAgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHtcblx0aWYgKCBuYW1lIGluIG9iamVjdCApIHsgdGhyb3cgRXJyb3IodGhpcy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0b2JqZWN0W25hbWVdID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHByb0Fzc2VydEZ1bmN0aW9uICAgIChmbiAgICkgeyByZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IH1cbmZ1bmN0aW9uIGRldkFzc2VydEZ1bmN0aW9uICAgICggICAgICAgICAgICAgICBmbiAgICkge1xuXHRpZiAoIHR5cGVvZiBmbiE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcih0aGlzLmNvbXBpbGVfdHlwZSk7IH1cblx0cmV0dXJuIGZuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufVxuXG52YXIgSU5DTFVERVNfVVBQRVJDQVNFID0gL1tBLVpdLztcbnZhciBTVEFSVFNfV0lUSF9MT1dFUkNBU0UgPSAvXlthLXpdLztcbnZhciBDSEVDS0VEID0gV2Vha01hcCAmJiAvKiNfX1BVUkVfXyovbmV3IFdlYWtNYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuZnVuY3Rpb24gZm9yS2V5cyAob3B0aW9uICAgICAgICAgICAgICAgICwgY2FsbGJhY2sgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0aWYgKCBpc0FycmF5KG9wdGlvbikgKSB7IG9wdGlvbi5mb3JFYWNoKGNhbGxiYWNrKTsgfVxuXHRlbHNlIHsgZm9yICggdmFyIGtleSBpbiBvcHRpb24gKSB7IGNhbGxiYWNrKGtleSk7IH0gfVxufVxuZnVuY3Rpb24gY2hlY2sgKG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XG5cdHZhciBiZWxvbmcgPSBPUFRJT05TLmNvbnN0cnVjdG9yLmdldChvcHRpb25zKSB8fCBvcHRpb25zO1xuXHR2YXIgb3duS2V5cyA9IENIRUNLRUQuZ2V0KGJlbG9uZyk7XG5cdGlmICggb3duS2V5cyApIHsgcmV0dXJuIG93bktleXM7IH1cblx0dmFyIGFsbEtleXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdCggb3B0aW9ucy5leHRlbmRzID8gWyBvcHRpb25zLmV4dGVuZHMgXSA6IFtdICkuY29uY2F0KG9wdGlvbnMubWl4aW5zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChtaXhpbikge1xuXHRcdHZhciBtaXhpbk5hbWVzID0gY2hlY2sobWl4aW4sIF9fZGV2X18pO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIG1peGluTmFtZXMgKSB7XG5cdFx0XHRpZiAoIG5hbWUgaW4gYWxsS2V5cyAmJiBtaXhpbk5hbWVzW25hbWVdIT09YWxsS2V5c1tuYW1lXSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX292ZXJ3cml0ZSk7IH1cblx0XHR9XG5cdFx0YXNzaWduKGFsbEtleXMsIG1peGluTmFtZXMpO1xuXHR9KTtcblx0XG5cdG93bktleXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0XG5cdHZhciBwcm90b0Rlc2NyaXB0b3JzID0gT1BUSU9OUy5wcm90by5nZXQob3B0aW9ucyk7XG5cdHByb3RvRGVzY3JpcHRvcnMgJiYgT3duS2V5cyhwcm90b0Rlc2NyaXB0b3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRvd25LZXlzIFtrZXldID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5wcm9wcywgZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdGlmICggLy18Xig/OmtleSR8b258cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9wcm9wcyk7IH1cblx0XHRpZiAoIG5hbWUgaW4gUFJPVE9fQlVHICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5pbmplY3QsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZSE9PSdzdHJpbmcnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggbmFtZSBpbiBvd25LZXlzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzIFtuYW1lXSA9IGJlbG9uZztcblx0fSk7XG5cdFxuXHR2YXIgbmFtZSAgICAgICAgO1xuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMuY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25LZXlzW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuZGF0YS5nZXQob3B0aW9ucykgKSB7XG5cdFx0aWYgKCBuYW1lIGluIG93bktleXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bktleXMgW25hbWVdID0gYmVsb25nO1xuXHR9XG5cdFxuXHRmb3IgKCBuYW1lIGluIE9QVElPTlMuc2hhZG93LmdldChvcHRpb25zKSApIHtcblx0XHRpZiAoIG5hbWUgaW4gb3duS2V5cyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duS2V5cyBbbmFtZV0gPSBiZWxvbmc7XG5cdH1cblx0XG5cdGlmICggJ2NvbnN0cnVjdG9yJyBpbiBvd25LZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcblx0T3duS2V5cyhvd25LZXlzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoIGtleSBpbiBhbGxLZXlzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfb3ZlcndyaXRlKTsgfVxuXHR9KTtcblx0YXNzaWduKGFsbEtleXMsIG93bktleXMpO1xuXHRcblx0WyBvcHRpb25zLm5hbWUsIG9wdGlvbnMuZGlzcGxheU5hbWUgXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICAgKSB7XG5cdFx0aWYgKCB0eXBlb2YgbmFtZT09PSdzdHJpbmcnXG5cdFx0XHQ/ICFuYW1lIHx8IFNUQVJUU19XSVRIX0xPV0VSQ0FTRS50ZXN0KG5hbWUpIHx8IG9wdGlvbnMuY29tcG9uZW50cyAmJiBuYW1lIGluIG9wdGlvbnMuY29tcG9uZW50cyAmJiBvcHRpb25zLmNvbXBvbmVudHNbbmFtZV0hPT1vcHRpb25zXG5cdFx0XHQ6IG5hbWUhPT11bmRlZmluZWRcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdH0pO1xuXHRcblx0b3B0aW9ucy5lbWl0cyAmJlxuXHQoIGlzQXJyYXkob3B0aW9ucy5lbWl0cykgPyBvcHRpb25zLmVtaXRzIDogS2V5cyhvcHRpb25zLmVtaXRzKSApLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0aWYgKCB0eXBlb2YgZXZlbnQhPT0nc3RyaW5nJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0aWYgKCAvKD86Y2FwdHVyZXxvbmNlfHBhc3NpdmUpJC9pLnRlc3QoJ29uJyArIGV2ZW50KSB8fCAvXi0/W3ZWXW5vZGUvLnRlc3QoZXZlbnQpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfZW1pdHMpOyB9XG5cdH0pO1xuXHRcblx0aWYgKFxuXHRcdG9wdGlvbnMuZGlyZWN0aXZlcyAmJiAnaXMnIGluIG9wdGlvbnMuZGlyZWN0aXZlcy8vIDJcblx0XHR8fC8vQHRzLWlnbm9yZVxuXHRcdG9wdGlvbnMucHJvcHMgJiYgKCBpc0FycmF5KG9wdGlvbnMucHJvcHMpID8gb3B0aW9ucy5wcm9wcy5pbmNsdWRlcygnaXMnKSA6ICdpcycgaW4gb3B0aW9ucy5wcm9wcyApLy8gM1xuXHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2lzKTsgfVxuXHRcblx0Q0hFQ0tFRC5zZXQoYmVsb25nLCBhbGxLZXlzKTtcblx0cmV0dXJuIGFsbEtleXM7XG5cdFxufVxuXG52YXIgVVBQRVIgPSAvW0EtWl0vO1xuZnVuY3Rpb24gZml4UGFzY2FsIChwYXNjYWwgICAgICAgICwgY2FzZXMgICAgICAgKSB7XG5cdHZhciBGaXJzdCA9IHBhc2NhbFswXSA7XG5cdHZhciBmaXJzdCA9IEZpcnN0LnRvTG93ZXJDYXNlKCk7XG5cdHZhciByZXN0ID0gcGFzY2FsLnNsaWNlKDEpO1xuXHRjYXNlc1tmaXJzdCArIHJlc3RdID0gbnVsbDtcblx0aHlwaGVuYXRlKGZpcnN0LCByZXN0LCBjYXNlcyk7XG5cdGZpcnN0PT09Rmlyc3QgfHwgaHlwaGVuYXRlKEZpcnN0LCByZXN0LCBjYXNlcyk7XG59XG5mdW5jdGlvbiBoeXBoZW5hdGUgKGJlZm9yZSAgICAgICAgLCBhZnRlciAgICAgICAgLCBjYXNlcyAgICAgICApIHtcblx0dmFyIGluZGV4ID0gYWZ0ZXIuc2VhcmNoKFVQUEVSKTtcblx0aWYgKCBpbmRleDwwICkgeyBjYXNlc1tiZWZvcmUgKyBhZnRlcl0gPSBudWxsOyB9XG5cdGVsc2Uge1xuXHRcdGlmICggaW5kZXggKSB7IGJlZm9yZSArPSBhZnRlci5zbGljZSgwLCBpbmRleCk7IH1cblx0XHR2YXIgY2hhciA9IGFmdGVyW2luZGV4XSA7XG5cdFx0YWZ0ZXIgPSBhZnRlci5zbGljZShpbmRleCArIDEpO1xuXHRcdGh5cGhlbmF0ZShiZWZvcmUgKyAnLScgKyBjaGFyLnRvTG93ZXJDYXNlKCksIGFmdGVyLCBjYXNlcyk7XG5cdFx0aHlwaGVuYXRlKGJlZm9yZSArICctJyArIGNoYXIsIGFmdGVyLCBjYXNlcyk7XG5cdFx0YmVmb3JlW2JlZm9yZS5sZW5ndGggLSAxXT09PSctJyB8fCBoeXBoZW5hdGUoYmVmb3JlICsgY2hhciwgYWZ0ZXIsIGNhc2VzKTtcblx0fVxufVxuXG52YXIgREVWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gW1xuXHQncHJvdG8nLFxuXHQnY29tcGlsZV9jYXNlJyxcblx0J2NvbXBpbGVfbmFtZScsXG5cdCdjb21waWxlX3Byb3BzJyxcblx0J2NvbXBpbGVfZW1pdHMnLFxuXHQnY29tcGlsZV9pcycsXG5cdCdjb21waWxlX2xheWVyJyxcblx0J2NvbXBpbGVfcmVzZXJ2ZWQnLFxuXHQnY29tcGlsZV9yZWRlZmluZWQnLFxuXHQnY29tcGlsZV9vdmVyd3JpdGUnLFxuXHQnY29tcGlsZV90eXBlJyxcblx0J2NvbXBpbGVfc3ltYm9sJyxcblx0J2NvbXBpbGVfc2hhZG93Jyxcblx0J3J1bnRpbWVfc2hhZG93Jyxcblx0J3J1bnRpbWVfcmVkZWZpbmVkJyxcblx0J3J1bnRpbWVfc3ltYm9sJyxcblx0J3J1bnRpbWVfcmVzZXJ2ZWQnLFxuXHQncnVudGltZV9lbnVtZXJhYmxlJyxcblx0J3J1bnRpbWVfZGF0YScsXG5dO1xuXG4gICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICBcblx0ICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuXG4gICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgIFxuIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGFzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbj8nO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShOVUxMLCB7XG5cdGNyZWF0ZWQ6IHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVkIChlbCAgICAgLCBiaW5kaW5nICAgICApIHsgYmluZGluZy5hcmc9PT11bmRlZmluZWQgPyBhc3NpZ24oZWwsIGJpbmRpbmcudmFsdWUpIDogZWxbYmluZGluZy5hcmddID0gYmluZGluZy52YWx1ZTsgfSxcblx0fSxcblx0YmluZDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGJpbmQgKGVsICAgICAsIGJpbmRpbmcgICAgICkgeyBiaW5kaW5nLmFyZz09PXVuZGVmaW5lZCA/IGFzc2lnbihlbCwgYmluZGluZy52YWx1ZSkgOiBlbFtiaW5kaW5nLmFyZ10gPSBiaW5kaW5nLnZhbHVlOyB9LFxuXHR9LFxuXHR1cGRhdGVkOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR2YWx1ZTogZnVuY3Rpb24gdXBkYXRlZCAoZWwgICAgICwgYmluZGluZyAgICAgKSB7IGJpbmRpbmcuYXJnPT09dW5kZWZpbmVkID8gYXNzaWduKGVsLCBiaW5kaW5nLnZhbHVlKSA6IGJpbmRpbmcub2xkVmFsdWU9PT1iaW5kaW5nLnZhbHVlIHx8ICggZWxbYmluZGluZy5hcmddID0gYmluZGluZy52YWx1ZSApOyB9LFxuXHR9LFxuXHRjb21wb25lbnRVcGRhdGVkOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50VXBkYXRlZCAoZWwgICAgICwgYmluZGluZyAgICAgKSB7IGJpbmRpbmcuYXJnPT09dW5kZWZpbmVkID8gYXNzaWduKGVsLCBiaW5kaW5nLnZhbHVlKSA6IGJpbmRpbmcub2xkVmFsdWU9PT1iaW5kaW5nLnZhbHVlIHx8ICggZWxbYmluZGluZy5hcmddID0gYmluZGluZy52YWx1ZSApOyB9LFxuXHR9LFxufSkpO1xuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4vSWRlbnRpZmllcic7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vVGVtcGxhdGUnO1xuaW1wb3J0IFJlbmRlciwgeyBTdGF0aWNSZW5kZXJGbnMgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmltcG9ydCBTdHlsZSwgeyByZW1vdmUgfSBmcm9tICcuL1N0eWxlLCByZW1vdmUnO1xuaW1wb3J0IENvbXBvbmVudCwgeyBtaXhpbiB9IGZyb20gJy4vQ29tcG9uZW50LCBtaXhpbi8nO1xuaW1wb3J0IHByb3AgZnJvbSAnLi92LXByb3AnO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRJZGVudGlmaWVyLFxuXHRTY29wZSxcblx0VGVtcGxhdGUsXG5cdFJlbmRlciwgU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZSwgcmVtb3ZlLFxuXHRDb21wb25lbnQsIG1peGluLFxuXHRwcm9wLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlOiBTdHlsZSwgcmVtb3ZlOiByZW1vdmUsXG5cdENvbXBvbmVudDogQ29tcG9uZW50LCBtaXhpbjogbWl4aW4sXG5cdHByb3A6IHByb3AsXG59KTtcbiJdLCJuYW1lcyI6WyJTeW1ib2wiLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsIlJlZ0V4cCIsIkVycm9yIiwiRnVuY3Rpb24iLCJvd25LZXlzIiwiZ2V0UHJvdG90eXBlT2YiLCJUeXBlRXJyb3IiLCJnZXQiLCJXZWFrTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWMsUUFBUTs7Ozs7Ozs7QUNJdEIsSUFBSSxNQUFNLEdBQUc7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LENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDNUksRUFBRTtBQUNGLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxVQUFVLEVBQUUsSUFBSTtBQUNsQixFQUFFLEtBQUssRUFBRSxTQUFTLElBQUksRUFBRSxFQUFFLE9BQU8sT0FBTyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsR0FBR0EsV0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3pJLEVBQUU7QUFDRixDQUFDLE9BQU8sRUFBRTtBQUNWLEVBQUUsVUFBVSxFQUFFLElBQUk7QUFDbEIsRUFBRSxLQUFLLEVBQUUsU0FBUyxPQUFPLEVBQUUsRUFBRSxPQUFPLE9BQU8sT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUdBLFdBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtBQUNwTCxFQUFFO0FBQ0YsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNuQixFQUFFLFVBQVUsRUFBRSxJQUFJO0FBQ2xCLEVBQUUsS0FBSyxFQUFFLFNBQVMsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLE9BQU8sT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUdBLFdBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtBQUM3TCxFQUFFO0FBQ0YsQ0FBQyxDQUFDLENBQUM7O0FDRkgsY0FBZSxPQUFPLENBQUM7QUFDdkIsQ0FBQyxPQUFPLEVBQUUsT0FBTztBQUNqQixDQUFDLFVBQVUsRUFBRSxVQUFVO0FBQ3ZCLENBQUMsS0FBSyxFQUFFLEtBQUs7QUFDYixDQUFDLFFBQVEsRUFBRSxRQUFRO0FBQ25CLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsZUFBZTtBQUNqRCxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU07QUFDN0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ25DLENBQUMsSUFBSSxFQUFFLElBQUk7QUFDWCxDQUFDLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvRnJvbnRFbmRSdW50aW1lRGVwZW5kZW5jeS8ifQ==