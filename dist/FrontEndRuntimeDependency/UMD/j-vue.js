/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：17.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global = global || self, global.jVue = factory());
}(this, (function () { 'use strict';

var version = '17.2.0';

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

var isArray = Array.isArray;

var create = Object.create;

var undefined$1 = void 0;

var RegExp$1 = RegExp;

var freeze = Object.freeze;

var defineProperty = Object.defineProperty;

var NULL = (
	/*! j-globals: null.prototype (internal) */
	Object.seal
		? /*#__PURE__*/ Object.preventExtensions(Object.create(null))
		: null
	/*¡ j-globals: null.prototype (internal) */
);

var TypeError$1 = TypeError;

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

var assign = typeof Object!=='undefined' ? Object.assign : undefined;

var Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(NULL); }
			if ( assign ) { assign(exports, addOnOrigin); }
			else { for ( var key in addOnOrigin ) { if ( getOwnPropertyDescriptor(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
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

var Symbol$1 = typeof Symbol!=='undefined' ? Symbol : undefined;

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

function Search (keys          ) { return new RegExp$1('__' + groupify(keys, false, true) + '__', 'g'); }
function Replacer (scope             ) { return function replacer (__key__        )         { return scope[__key__.slice(2, -2)]; }; }

var StaticScope = function StaticScope (                   keys          )       {
	prepare_ && prepare_(this);
	this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
	var _search = Search(keys);
	var _replacer = Replacer(this);
	for ( var index         = keys.length; index; ) { this[keys[--index]] = Identifier(); }
}                
	                                  
	                       
 ;

var SCOPE              = StaticScope.prototype = /*#__PURE__*/freeze(create(null, {
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
	var scope              = create(SCOPE);
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
		else if ( this instanceof StaticScope ) { return DynamicScope(create(this)); }
		else if ( typeof this==='function' && this.prototype instanceof StaticScope ) { return DynamicScope(create(this.prototype               )); }
		else { return DynamicScope(create(SCOPE)); }
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

var Error$1 = Error;

var Map$1 = typeof Map!=='undefined' ? Map : undefined;

var WeakMap$1 = typeof WeakMap!=='undefined' ? WeakMap : undefined;

var getPrototypeOf = typeof Reflect!=='undefined' && Reflect.getPrototypeOf!==undefined$1 ? Reflect.getPrototypeOf : /*#__PURE__*/ Object.getPrototypeOf;

var setPrototypeOf = Object.setPrototypeOf;

var getOwnPropertyNames = Object.getOwnPropertyNames;

var getOwnPropertySymbols = typeof Object!=='undefined' ? Object.getOwnPropertySymbols : undefined;

var defineProperties = Object.defineProperties;

var get$1 = typeof Reflect!=='undefined' ? Reflect.get : undefined;

var apply = typeof Reflect!=='undefined' ? Reflect.apply : undefined;

var keys = Object.keys;

var ownKeys = typeof Reflect!=='undefined' ? Reflect.ownKeys : undefined;

var PROTO_BUG = Object.prototype;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var isPrototypeOf = Object.prototype.isPrototypeOf;

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

var getPrototypeOf$1 = Object.getPrototypeOf;

var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

var that                 = null;

function proSymbols (self         , symbolMethods               ) {
	
	var _ = self._;
	defineProperties(_ ? _.ctx : self, symbolMethods);
	
}

function proConstructor (self         , symbolMethods                      , constructor          , Vue3                   ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
}

function proNames (self         , symbolMethods                      , constructor          , Vue3                   , dataNames       , shadowAssigner                       ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
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

function proData (self         , symbolMethods                      , constructor          , Vue3                   , restNames       , shadowAssigner                       ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = create(NULL)        ;
	if ( _ ) {
		var accessCache = _.accessCache;
		for ( var name in ctx ) {
			if ( !( name in restNames ) ) {
				data[name] = ctx[name                 ];
				if ( name in accessCache ) { accessCache[name                 ] = undefined$1; }
			}
		}
	}
	else {
		var nowNames = keys(ctx);
		var index = 0;
		while ( index!==nowNames.length ) {
			name = nowNames[index++];
			if ( !( name in restNames ) ) { data[name] = ctx[name                 ]; }
		}
	}
	shadowAssigner && shadowAssigner(self, data);
	return data;
	
}

function devData (self         , symbolMethods                      , constructor          , Vue3                   , skipData         , dataNames              , restNames       , shadowAssigner                       , shadowChecker                           , skipConstructor         , __dev__         ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	var oldDescriptors = assign(create(NULL), getOwnPropertyDescriptors(ctx), symbolMethods);
	symbolMethods && defineProperties(ctx, symbolMethods);
	
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
		) { throw Error$1(__dev__.runtime_redefined); }
	});
	var difKeys = ownKeys(ctx).filter(function (key) {
		return !( key in oldDescriptors );
	});
	if ( skipConstructor || skipData ) {
		if ( difKeys.length ) { throw Error$1(__dev__.runtime_data); }
	}
	if ( dataNames ) {
		var count = 0;
		for ( var key in dataNames ) { ++count; }
		if ( count!==difKeys.length ) { throw Error$1(__dev__.runtime_data); }
		difKeys.forEach(function () {
			if ( !( key in dataNames ) ) { throw Error$1(__dev__.runtime_data); }
		});
	}
	difKeys.forEach(function (              key) {
		if ( key in this && !( key in {} ) || key in restNames ) { throw Error$1(__dev__.runtime_redefined); }
		if ( typeof key==='symbol' ) { throw Error$1(__dev__.runtime_symbol); }
		if ( key[0]==='_' || key[0]==='$' ) { throw Error$1(__dev__.runtime_reserved); }
		//@ts-ignore
		if ( key==='constructor' ) { throw Error$1(__dev__.proto); }
		if ( !propertyIsEnumerable.call(ctx, key)) { throw Error$1(__dev__.runtime_enumerable); }
	}, getPrototypeOf$1(ctx));
	
	var data = create(NULL)        ;
	difKeys.forEach(function (key) {
		( data         )[key] = ctx[key];
		if ( _ && key in _.accessCache ) { _.accessCache[key] = undefined$1; }
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
			value: /*#__PURE__*/freeze(create(null, {
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
				if ( !isComponentConstructor(this) ) { throw Error$1('!( this extends Component )._()'); }
				var DID_OPTIONS = OPTIONS.objects.into(__dev__ || OPTIONS       ).into(Vue3 || OPTIONS       );
				var TMP_OPTIONS = new OPTIONS.objectsTmp;
				var options = ToOptions(
					this,
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
			},
		},
	}
));

var _mixins                = Symbol$1 && /*#__PURE__*/Symbol$1('_mixins')                 ;

var __PURE__ = /*#__PURE__*/function () {
	try { return Function$1('Component,_mixins', '"use strict";return(...mixins)=>class extends Component{constructor(){return Component()}static get[_mixins](){return mixins}}')(Component, _mixins); }
	catch (error) {}
}();

function mixin (          ) {
	return arguments.length
		? /*#__PURE__*/apply(__PURE__, null, arguments       )
		: Component;
}

function ToOptions (constructor          , Vue3                   , __dev__                , DID_OPTIONS                               , TMP_OPTIONS                           )             {
	
	var options                         = DID_OPTIONS.get(constructor) || TMP_OPTIONS.get(constructor);
	if ( options ) { return options; }
	options = create(NULL)              ;
	
	if ( isMixins(constructor) ) {
		var static_mixins = constructor[_mixins] ;
		var mixins = options.mixins = []                ;
		var index = 0;
		while ( mixins.length!==static_mixins.length ) {
			var mixin = static_mixins[index++];
			if ( isComponentConstructor(mixin) ) {
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
		__dev__ && check(options, __dev__, constructor);
		collectNames(options, constructor);
		TMP_OPTIONS.set(constructor, options);
		return options;
	}
	
	var Super = OPTIONS.super.get(constructor);
	if ( !Super ) {
		OPTIONS.super.set(constructor, Super = getPrototypeOf(constructor));
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
		if ( symbol!==_mixins && !( symbol in SYMBOLS ) ) { throw Error$1(__dev__.compile_symbol); }
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
				set(options, staticName, apply(descriptor.get , constructor, ARGS));
			}
		}
		else if ( staticName==='data' ) {
			if ( __dev__ ) {
				if ( constructor[staticName]!==undefined$1 ) { throw Error$1(isArray(constructor[staticName]) ? __dev__.compile_layout : __dev__.compile_type); }
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
				) { throw Error$1(__dev__.compile_layout); }
			}
			//@ts-ignore
			set(options, staticName, constructor[staticName]);
		}
	}
	
	var prototype = constructor.prototype;
	
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
		else if ( protoName[0]==='_' && !protoName.startsWith('_watch:') ) {
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
				) { throw Error$1(__dev__.compile_layout); }
			}
			set(options, protoName.slice(1), get$1(prototype, protoName, undefined$1));
		}
		else {
			var descriptor                     = getOwnPropertyDescriptor(prototype, protoName);
			if ( protoName[0]==='_' ) {
				var indexOfQ = protoName.search(WATCH_OPTIONS);
				var watcher = watchers[watchers.length] = create(NULL)           ;
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
					if ( protoName[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
				}
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
	
	__dev__ && check(options, __dev__, constructor);
	
	var restNames = collectNames(options, constructor);
	
	if ( Render && ( Vue3 || !Render.length ) ) {
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
			ownKeys(sheet).forEach(function (                 key, index) {
				var watcher = this[index] = create(NULL)           ;
				watcher.$ = assertFunction(sheet [key]);
				watcher.handler = function (            css        ) { ( this.$refs[key]                     ).textContent = css; };
				watcher.immediate = true;
				watcher.flush = 'sync';
			}, watchers2);
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
	
	var protoSymbols = getOwnPropertySymbols(prototype)                   ;
	index = protoSymbols.length;
	var symbolMethods = index ? create(NULL)                                                    : null;
	while ( index ) {
		var protoSymbol                = protoSymbols[--index];
		symbolMethods [protoSymbol] = assign(create(NULL), getOwnPropertyDescriptor(prototype, protoSymbol));
	}
	
	if ( __dev__ ) { options.data = function (self      ) { return devData(self           , symbolMethods, constructor, Vue3, skipData, dataNames, restNames, shadowAssigner, shadowChecker, skipConstructor, __dev__); }; }
	else if ( skipConstructor || skipData ) ;
	else if ( dataNames ) { options.data = function (self      ) { return proNames(self           , symbolMethods, constructor, Vue3, dataNames , shadowAssigner); }; }
	else { options.data = function (self      ) { return proData(self           , symbolMethods, constructor, Vue3, restNames, shadowAssigner); }; }
	
	if ( watchers.length || !__dev__ && ( skipConstructor && symbolMethods || skipData ) ) {
		var created = options.created;
		switch ( ( __dev__ ? ( skipConstructor ? 's' : 'n' ) : '_' ) + ( watchers.length ? 'w' : '_' ) + ( created ? 'c' : '_' ) ) {
			case 'swc':
				options.created = function beforeCreated (          ) {
					proSymbols(this           , symbolMethods );
					$watch(this, watchers);
					return created .apply(this);
				};
				break;
			case 'sw_':
				options.created = function beforeCreated (          ) {
					proSymbols(this           , symbolMethods );
					$watch(this, watchers);
				};
				break;
			case 's_c':
				options.created = function beforeCreated (          ) {
					proSymbols(this           , symbolMethods );
					return created .apply(this);
				};
				break;
			case 's__':
				options.created = function beforeCreated (          ) {
					proSymbols(this           , symbolMethods );
				};
				break;
			case 'nwc':
				options.created = function beforeCreated (          ) {
					proConstructor(this           , symbolMethods, constructor, Vue3);
					$watch(this, watchers);
					return created .apply(this);
				};
				break;
			case 'nw_':
				options.created = function beforeCreated (          ) {
					proConstructor(this           , symbolMethods, constructor, Vue3);
					$watch(this, watchers);
				};
				break;
			case 'n_c':
				options.created = function beforeCreated (          ) {
					proConstructor(this           , symbolMethods, constructor, Vue3);
					return created .apply(this);
				};
				break;
			case 'n__':
				options.created = function beforeCreated (          ) {
					proConstructor(this           , symbolMethods, constructor, Vue3);
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
		var components = options.components = assign(create(NULL), options.components);
		var cases = create(NULL)         ;
		//@ts-ignore
		options.name && fixPascal(options.name, cases);
		//@ts-ignore
		options.displayName && fixPascal(options.displayName, cases);
		for ( var pascal in components ) {
			if ( __dev__ ) {
				if ( /^(?![A-Z])/.test(pascal) ) { throw Error$1(__dev__.compile_name); }
			}
			var value = components[pascal];
			if ( isComponentConstructor(value) ) { components[pascal] = ToOptions(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS); }
			fixPascal(pascal, cases);
		}
		assign(components, cases);
	}
	
	return options;
	
}

var OPTIONS = WeakMap$1 && /*#__PURE__*/function () {
	try {
		return Function$1('WeakMap,Map', '"use strict";\
class EasyMap extends WeakMap{into(key){let sub=this.get(key);sub??this.set(key,sub=new EasyMap);return sub}}EasyMap.prototype.get=WeakMap.prototype.get;EasyMap.prototype.set=WeakMap.prototype.set;\
class StrongMap extends Map{}StrongMap.prototype.get=Map.prototype.get;StrongMap.prototype.set=Map.prototype.set;StrongMap.prototype.forEach=Map.prototype.forEach;\
return{objects:new EasyMap,objectsTmp:StrongMap,super:new EasyMap,rest:new EasyMap,data:new EasyMap,shadow:new EasyMap}\
')(WeakMap$1, Map$1);
	}
	catch (error) {}
}()     
	                                                                         
	                                                  
	                                   
	                                            
	                                 
	                                   
 ;
                                                                                

function isComponentConstructor (value        )                    { return apply(isPrototypeOf, Component, [ value ]         ); }

var ARGS = []         ;

var _MIXINS = [ _mixins ]         ;
function isMixins (constructor          ) { return apply(hasOwnProperty, constructor, _MIXINS); }

var SYMBOLS = /*#__PURE__*/getOwnPropertyNames(Symbol$1).reduce(function (SYMBOLS, name) {
	if ( typeof Symbol$1[name]==='symbol' ) { SYMBOLS[Symbol$1[name]                 ] = null; }
	return SYMBOLS;
}, create(NULL)                         );

var WATCH_OPTIONS = /;[a-z;=]*$/;
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
			restNames = create(NULL)         ;
			var extend = options.extends;
			extend && assign(restNames, collectNames(extend, null));
			var mixins = options.mixins;
			if ( mixins ) {
				var index = mixins.length;
				while ( index ) { assign(restNames, collectNames(mixins[--index], null)); }
			}
			var props = options.props;
			var name        ;
			if ( isArray(props) ) {
				for ( index = props.length; index; ) {
					name = props[--index];
					restNames[name] = null;
				}
			}
			else { for ( name in props ) { restNames[name] = null; } }
			props = options.inject;
			if ( isArray(props) ) {
				for ( index = props.length; index; ) {
					name = props[--index];
					restNames[name] = null;
				}
			}
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

var CHECKED = WeakMap$1 && /*#__PURE__*/new WeakMap$1                              ();
function forKeys (option                , callback                        ) {
	if ( isArray(option) ) { option.forEach(callback); }
	else { for ( var key in option ) { callback(key); } }
}
function check (options                                                                        , __dev__         , constructor                 ) {
	
	var ownNames = CHECKED.get(constructor || options);
	if ( ownNames ) { return ownNames; }
	var allNames = create(NULL)         ;
	
	( options.extends ? [ options.extends ] : [] ).concat(options.mixins || []).forEach(function (mixin) {
		var mixinNames = check(mixin, __dev__, null);
		for ( var name in mixinNames ) {
			if ( name in allNames ) { throw Error$1(__dev__.compile_overwrite); }
		}
		assign(allNames, mixinNames);
	});
	
	ownNames = create(NULL)         ;
	
	forKeys(options.props, function (name) {
		if ( /-|^(?:key$|[oO][nN]|ref$)/.test(name) ) { throw Error$1(__dev__.compile_props); }
		if ( name in PROTO_BUG ) { throw Error$1(__dev__.proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( name in ownNames  ) { throw Error$1(__dev__.compile_redefined); }
		ownNames [name] = null;
	});
	
	forKeys(options.inject, function (name) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( name in ownNames  ) { throw Error$1(__dev__.compile_redefined); }
		ownNames [name] = null;
	});
	
	var name        ;
	
	for ( name in options.methods ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( name in ownNames ) { throw Error$1(__dev__.compile_redefined); }
		ownNames[name] = null;
	}
	
	for ( name in options.computed ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( name in ownNames ) { throw Error$1(__dev__.compile_redefined); }
		ownNames[name] = null;
	}
	
	for ( name in OPTIONS.data.get(options) ) {
		if ( name in ownNames  ) { throw Error$1(__dev__.compile_redefined); }
		ownNames [name] = null;
	}
	
	for ( name in OPTIONS.shadow.get(options) ) {
		if ( name in ownNames  ) { throw Error$1(__dev__.compile_redefined); }
		ownNames [name] = null;
	}
	
	if ( 'constructor' in ownNames ) { throw Error$1(__dev__.proto); }
	
	for ( name in ownNames ) {
		if ( name in allNames ) { throw Error$1(__dev__.compile_overwrite); }
	}
	assign(allNames, ownNames);
	
	[ options.name, options.displayName ].forEach(function (name         ) {
		if ( typeof name==='string'
			? /^(?![A-Z])/.test(name) || options.components && options.components[name] && options.components[name]!==options
			: name!==undefined$1
		) { throw Error$1(__dev__.compile_name); }
	});
	
	options.emits &&
	( isArray(options.emits) ? options.emits : keys(options.emits) ).forEach(function (event) {
		if ( typeof event==='string' && /[A-Z]|^onvnode|(?:capture|once|passive)$/.test('on' + event) ) { throw Error$1(__dev__.compile_emits); }
	});
	
	if (
		options.directives && 'is' in options.directives// 2
		||//@ts-ignore
		options.props && ( isArray(options.props) ? options.props.includes('is') : 'is' in options.props )// 3
	) { throw Error$1(__dev__.compile_is); }
	
	constructor && CHECKED.set(constructor, allNames);
	CHECKED.set(options, allNames);
	return allNames;
	
}

var UPPER = /[A-Z]/g;
function fixPascal (pascal        , cases       ) {
	if ( pascal[pascal.length - 1]!=='_' ) {
		var first = pascal[0].toLowerCase();
		var rest = pascal.slice(1);
		cases[first + rest] = null;
		hyphenate(first, rest, cases);
	}
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

var _export = Default({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
});

return _export;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIi4uLy4uL2xpYi9jc3Mta2V5d29yZHMvZGlzdC5qcyIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9EeW5hbWljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCIuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxNy4yLjAnOyIsImV4cG9ydCBkZWZhdWx0IFtcblx0J2FsbCcsXG5cdCdsYW8nLFxuXHQnYXV0bycsXG5cdCdkaXNjJyxcblx0J25vbmUnLFxuXHQnc3BhbicsXG5cdCd0aGFpJyxcblx0J2tobWVyJyxcblx0J29yaXlhJyxcblx0J3RhbWlsJyxcblx0J3Vuc2V0Jyxcblx0J2NpcmNsZScsXG5cdCdoZWJyZXcnLFxuXHQnaW5saW5lJyxcblx0J3JldmVydCcsXG5cdCdzcXVhcmUnLFxuXHQndGVsdWd1Jyxcblx0J2JlbmdhbGknLFxuXHQnZGVjaW1hbCcsXG5cdCdkZWZhdWx0Jyxcblx0J2luaGVyaXQnLFxuXHQnaW5pdGlhbCcsXG5cdCdrYW5uYWRhJyxcblx0J215YW5tYXInLFxuXHQnb3V0c2lkZScsXG5cdCdwZXJzaWFuJyxcblx0J3RpYmV0YW4nLFxuXHQnYXJtZW5pYW4nLFxuXHQnY29udGVudHMnLFxuXHQnZ2VvcmdpYW4nLFxuXHQnZ3VqYXJhdGknLFxuXHQnZ3VybXVraGknLFxuXHQnaGlyYWdhbmEnLFxuXHQna2F0YWthbmEnLFxuXHQnY2FtYm9kaWFuJyxcblx0J21hbGF5YWxhbScsXG5cdCdtb25nb2xpYW4nLFxuXHQnZGV2YW5hZ2FyaScsXG5cdCdub3RyYW5zbGF0ZScsXG5dOyIsImltcG9ydCBDU1NfS0VZV09SRFMgZnJvbSAnbGliOmNzcy1rZXl3b3Jkcyc7XG5cbnZhciBpbmNyZWFzZURpY3Rpb25hcnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHtcblx0MDogJzEnLCAxOiAnMicsIDI6ICczJywgMzogJzQnLCA0OiAnNScsIDU6ICc2JywgNjogJzcnLCA3OiAnOCcsIDg6ICc5JywgOTogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn07XG52YXIgbGF0ZXN0SWRlbnRpZmllciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyAnOScgXTtcbnZhciBsYXN0Q2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSAnOSc7XG52YXIgbGFzdEluZGV4ICAgICAgICAgPSAwO1xuXG52YXIgY3NzX2tleXdvcmQgICAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRsYXRlc3RJZGVudGlmaWVyLmpvaW4gPSBsYXRlc3RJZGVudGlmaWVyLmpvaW47XG5cdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCA9IGxhdGVzdElkZW50aWZpZXIudW5zaGlmdDtcblx0Q1NTX0tFWVdPUkRTLnNoaWZ0ID0gQ1NTX0tFWVdPUkRTLnNoaWZ0O1xuXHRyZXR1cm4gQ1NTX0tFWVdPUkRTLnNoaWZ0KCkgO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJZGVudGlmaWVyICgpICAgICAgICAge1xuXHRcblx0aWYgKCBsYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIGNoYXJhY3RlckluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIGNoYXJhY3RlckluZGV4ICkge1xuXHRcdFx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyWy0tY2hhcmFjdGVySW5kZXhdO1xuXHRcdFx0XHRpZiAoIGNoYXJhY3Rlcj09PSd6JyApIHsgbGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSAnMCc7IH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbY2hhcmFjdGVyXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhc3RJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3Rlcl07XG5cdH1cblx0XG5cdHZhciBpZGVudGlmaWVyICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRpZiAoIGlkZW50aWZpZXI9PT1jc3Nfa2V5d29yZCApIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXIgICAgICAgICAgICAgXTtcblx0XHRpZGVudGlmaWVyID0gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0XHRjc3Nfa2V5d29yZCA9IENTU19LRVlXT1JEUy5zaGlmdCgpIHx8IG51bGw7XG5cdH1cblx0cmV0dXJuIGlkZW50aWZpZXI7XG5cdFxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJytjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gICAgICA9IFN5bWJvbCA/IC8qI19fUFVSRV9fKi9TeW1ib2woJ18nKSAgICAgICAgOiAnXyc7XG5cbmZ1bmN0aW9uICQgICAgICAgICAgICAgICAgICAoICAgICAgICAgY3NzICAgICAgICAgLCBtZWRpYSAgICAgICAgICkgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSB0aGlzW19dKGNzcyk7IH1cblx0aWYgKCBtZWRpYSE9PXVuZGVmaW5lZCApIHsgc3R5bGUubWVkaWEgPSBtZWRpYTsgfVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCB7IF8sICQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIHByZXBhcmVfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gdHlwZW9mIF89PT0nc3ltYm9sJyA/IG51bGwgOiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR2YXIgX2Rlc2NyaXB0b3IgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgO1xuXHRfZGVzY3JpcHRvci52YWx1ZSA9IG51bGw7XG5cdF9kZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IHRydWU7XG5cdF9kZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSAgICAgICApIHsgZGVmaW5lUHJvcGVydHkoc2NvcGUsIF8sIF9kZXNjcmlwdG9yKTsgfTtcbn0oKTtcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzICAgICAgICAgICkgeyByZXR1cm4gbmV3IFJlZ0V4cCgnX18nICsgZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpICsgJ19fJywgJ2cnKTsgfVxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkgeyByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07IH1cblxudmFyIFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbnZhciBTQ09QRSAgICAgICAgICAgICAgPSBTdGF0aWNTY29wZS5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdCQ6IHsgdmFsdWU6ICQsIHdyaXRhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSxcbn0pICAgICAgICAgICAgICAgKTtcblxudmFyIEluaGVyaXRlZFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfICYmIHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKCAqL1xuXHRcdGtleXNba2V5cy5sZW5ndGhdID0ga2V5LyogKSovO1xuXHR9XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgeyBTdGF0aWNTY29wZSwgU0NPUEUsIEluaGVyaXRlZFN0YXRpY1Njb3BlIH07XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBnZXQgKGNhY2hlICAgICAgICAgICAgICwga2V5ICAgICAgICApICAgICAgICAgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhY2hlICAgICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBrZXlzICAgICAgICAsXG5cdFx0aW5kZXggICAgICAgICxcblx0XHR2YWx1ZXMgICAgICAgICAgLFxuXHRcdGtleSAgICAgICAgO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdldChjYWNoZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gdmFsdWVbLS1pbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGdldChjYWNoZSwga2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlWy0taW5kZXhdLCBjYWNoZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK2dldChjYWNoZSwga2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRpZiAoIGxlbmd0aD4xICkge1xuXHRcdFx0dmFsdWUgPSBbIHZhbHVlLCBhcmd1bWVudHNbMV0gXTtcblx0XHRcdGZvciAoIHZhciBpbmRleCA9IDI7IGluZGV4IT09bGVuZ3RoOyArK2luZGV4ICkgeyAoIHZhbHVlICAgICAgICAgIClbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gc2NvcGlmeSh2YWx1ZSwgY2FjaGUpO1xuXHR9ICAgICAgICAgICAgICAgIDtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGdldChjYWNoZSwgX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZXhwb3J0IHsgRHluYW1pY1Njb3BlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImV4cG9ydCBkZWZhdWx0IC9bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKi9pZzsiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IFN0YXRpY1Njb3BlLCBJbmhlcml0ZWRTdGF0aWNTY29wZSwgU0NPUEUgfSBmcm9tICcuL1N0YXRpY1Njb3BlJztcbmltcG9ydCBEeW5hbWljU2NvcGUgZnJvbSAnLi9EeW5hbWljU2NvcGUnO1xuaW1wb3J0IEtFWVMgZnJvbSAnLi9LRVlTJztcblxudmFyIEVNUFRZICAgICAgICAgICA9IFtdO1xuXG5mdW5jdGlvbiBtaXggKHByb3RvcyAgICAgICAgICkgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlICAgICAgICAgICAgICA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byAgICAgICAgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5mdW5jdGlvbiBTY29wZSAoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICkgICAgICAgIHtcblx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgU3RhdGljU2NvcGUgKSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlICAgICAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gbmV3IFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cbn1cblNjb3BlLnByb3RvdHlwZSA9IG51bGwgICAgICAgO1xuXG5leHBvcnQgeyBTY29wZSBhcyBkZWZhdWx0LCBLRVlTIH07IiwiaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFRlbXBsYXRlIChodG1sICAgICAgICAsIHNjb3BlICAgICAgICkgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovc2NvcGVbX10oaHRtbCk7XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbnZhciBOT1RfRVM1ID0gL14oY29uc3xsZSl0IC87XG5cbmZ1bmN0aW9uIFdpdGhTdHJpcHBlZCAocmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0cmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlO1xuXHRyZXR1cm4gcmVuZGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXIgKGNvZGUgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdHJldHVybiBjb2RlWzBdPT09JygnXG5cdFx0PyAvKiNfX1BVUkVfXyovRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybiBjbGFzcyBSZW5kZXIgZXh0ZW5kcyBudWxse2NvbnN0cnVjdG9yJysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9OycpKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0OiAvKiNfX1BVUkVfXyovV2l0aFN0cmlwcGVkKFxuXHRcdFx0LyojX19QVVJFX18qL0Z1bmN0aW9uKE5PVF9FUzUudGVzdChjb2RlKVxuXHRcdFx0XHQ/ICdcInVzZSBzdHJpY3RcIjtyZXR1cm57cmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9fS5yZW5kZXI7J1xuXHRcdFx0XHQ6ICdcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24gcmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9Oydcblx0XHRcdCkoKSAgICAgICAgICBcblx0XHQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGNvZGVzLmxlbmd0aDtcblx0dmFyIGJvZHkgICAgICAgICA9ICddJztcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4OyApIHsgYm9keSA9ICdmdW5jdGlvbigpeycrc2NvcGVfKGNvZGVzWy0taW5kZXhdKSsnfSwnK2JvZHk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHR3aGlsZSAoIGluZGV4ICkgeyBib2R5ID0gJ2Z1bmN0aW9uKCl7Jytjb2Rlc1stLWluZGV4XSsnfSwnK2JvZHk7IH1cblx0fVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVyblsnK2JvZHkpKCk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHlsZSAoY3NzICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBSZWZsZWN0IT09J3VuZGVmaW5lZCcgJiYgUmVmbGVjdC5nZXRQcm90b3R5cGVPZiE9PXVuZGVmaW5lZCA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiAvKiNfX1BVUkVfXyovIE9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgcHJvcGVydHlJc0VudW1lcmFibGUgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmV4cG9ydCB2YXIgdGhhdCAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvU3ltYm9scyAoc2VsZiAgICAgICAgICwgc3ltYm9sTWV0aG9kcyAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdGRlZmluZVByb3BlcnRpZXMoXyA/IF8uY3R4IDogc2VsZiwgc3ltYm9sTWV0aG9kcyk7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvQ29uc3RydWN0b3IgKHNlbGYgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgICAgICAgICAgICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHN5bWJvbE1ldGhvZHMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHN5bWJvbE1ldGhvZHMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvTmFtZXMgKHNlbGYgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgICAgICAgICAgICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCBkYXRhTmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHN5bWJvbE1ldGhvZHMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHN5bWJvbE1ldGhvZHMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHR2YXIgZGF0YSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRhdGFOYW1lcykgICAgICAgIDtcblx0aWYgKCBfICkge1xuXHRcdHZhciBhY2Nlc3NDYWNoZSA9IF8uYWNjZXNzQ2FjaGU7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gZGF0YU5hbWVzICkge1xuXHRcdFx0ZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdO1xuXHRcdFx0aWYgKCBuYW1lIGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGZvciAoIG5hbWUgaW4gZGF0YU5hbWVzICkgeyBkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07IH1cblx0fVxuXHRzaGFkb3dBc3NpZ25lciAmJiBzaGFkb3dBc3NpZ25lcihzZWxmLCBkYXRhKTtcblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvRGF0YSAoc2VsZiAgICAgICAgICwgc3ltYm9sTWV0aG9kcyAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIHJlc3ROYW1lcyAgICAgICAsIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0c3ltYm9sTWV0aG9kcyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgc3ltYm9sTWV0aG9kcyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdHZhciBkYXRhID0gY3JlYXRlKE5VTEwpICAgICAgICA7XG5cdGlmICggXyApIHtcblx0XHR2YXIgYWNjZXNzQ2FjaGUgPSBfLmFjY2Vzc0NhY2hlO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIGN0eCApIHtcblx0XHRcdGlmICggISggbmFtZSBpbiByZXN0TmFtZXMgKSApIHtcblx0XHRcdFx0ZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdO1xuXHRcdFx0XHRpZiAoIG5hbWUgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmFyIG5vd05hbWVzID0gS2V5cyhjdHgpO1xuXHRcdHZhciBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PW5vd05hbWVzLmxlbmd0aCApIHtcblx0XHRcdG5hbWUgPSBub3dOYW1lc1tpbmRleCsrXTtcblx0XHRcdGlmICggISggbmFtZSBpbiByZXN0TmFtZXMgKSApIHsgZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdOyB9XG5cdFx0fVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZEYXRhIChzZWxmICAgICAgICAgLCBzeW1ib2xNZXRob2RzICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgc2tpcERhdGEgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgLCBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBza2lwQ29uc3RydWN0b3IgICAgICAgICAsIF9fZGV2X18gICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0dmFyIG9sZERlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhjdHgpLCBzeW1ib2xNZXRob2RzKTtcblx0c3ltYm9sTWV0aG9kcyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgc3ltYm9sTWV0aG9kcyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdG93bktleXMob2xkRGVzY3JpcHRvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciBvbGREZXNjcmlwdG9yID0gb2xkRGVzY3JpcHRvcnNba2V5XSA7XG5cdFx0dmFyIG5ld0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBrZXkgICAgICAgICAgICAgICAgICk7XG5cdFx0aWYgKFxuXHRcdFx0IW5ld0Rlc2NyaXB0b3IgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlIT09b2xkRGVzY3JpcHRvci5jb25maWd1cmFibGUgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuZW51bWVyYWJsZSE9PW9sZERlc2NyaXB0b3IuZW51bWVyYWJsZSB8fFxuXHRcdFx0KCBuZXdEZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0PyBuZXdEZXNjcmlwdG9yLnZhbHVlIT09b2xkRGVzY3JpcHRvci52YWx1ZSB8fCBuZXdEZXNjcmlwdG9yLndyaXRhYmxlIT09b2xkRGVzY3JpcHRvci53cml0YWJsZVxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdDogbmV3RGVzY3JpcHRvci5nZXQhPT1vbGREZXNjcmlwdG9yLmdldCB8fCBuZXdEZXNjcmlwdG9yLnNldCE9PW9sZERlc2NyaXB0b3Iuc2V0XG5cdFx0XHQpXG5cdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdH0pO1xuXHR2YXIgZGlmS2V5cyA9IG93bktleXMoY3R4KS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdHJldHVybiAhKCBrZXkgaW4gb2xkRGVzY3JpcHRvcnMgKTtcblx0fSk7XG5cdGlmICggc2tpcENvbnN0cnVjdG9yIHx8IHNraXBEYXRhICkge1xuXHRcdGlmICggZGlmS2V5cy5sZW5ndGggKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9kYXRhKTsgfVxuXHR9XG5cdGlmICggZGF0YU5hbWVzICkge1xuXHRcdHZhciBjb3VudCA9IDA7XG5cdFx0Zm9yICggdmFyIGtleSBpbiBkYXRhTmFtZXMgKSB7ICsrY291bnQ7IH1cblx0XHRpZiAoIGNvdW50IT09ZGlmS2V5cy5sZW5ndGggKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9kYXRhKTsgfVxuXHRcdGRpZktleXMuZm9yRWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoICEoIGtleSBpbiBkYXRhTmFtZXMgKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0fSk7XG5cdH1cblx0ZGlmS2V5cy5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgIGtleSkge1xuXHRcdGlmICgga2V5IGluIHRoaXMgJiYgISgga2V5IGluIHt9ICkgfHwga2V5IGluIHJlc3ROYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3JlZGVmaW5lZCk7IH1cblx0XHRpZiAoIHR5cGVvZiBrZXk9PT0nc3ltYm9sJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3N5bWJvbCk7IH1cblx0XHRpZiAoIGtleVswXT09PSdfJyB8fCBrZXlbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZXNlcnZlZCk7IH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRpZiAoIGtleT09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChjdHgsIGtleSkpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2VudW1lcmFibGUpOyB9XG5cdH0sIGdldFByb3RvdHlwZU9mKGN0eCkpO1xuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0ZGlmS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHQoIGRhdGEgICAgICAgICApW2tleV0gPSBjdHhba2V5XTtcblx0XHRpZiAoIF8gJiYga2V5IGluIF8uYWNjZXNzQ2FjaGUgKSB7IF8uYWNjZXNzQ2FjaGVba2V5XSA9IHVuZGVmaW5lZDsgfVxuXHR9KTtcblx0aWYgKCBzaGFkb3dBc3NpZ25lciApIHtcblx0XHRzaGFkb3dDaGVja2VyIChkYXRhKTtcblx0XHRzaGFkb3dBc3NpZ25lcihzZWxmLCBkYXRhKTtcblx0fVxuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBJTklUID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIElOSVQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICA7XG5cdElOSVQubW9kZSA9ICdvcGVuJztcblx0cmV0dXJuIElOSVQ7XG59KCk7XG5cbmZ1bmN0aW9uIGF0dGFjaCAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGVsICYmICggZWwuc2hhZG93Um9vdCB8fCBlbC5hdHRhY2hTaGFkb3coSU5JVCkgKTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93QXNzaWduZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0dmFyIG5hbWVzID0gaW5kZXg8MCA/IG51bGwgOiBhbG9uZy5zbGljZShpbmRleCArIDEpLnNwbGl0KCcuJyk7XG5cdHZhciB0b05hbWUgPSBuYW1lcyA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIG5hbWVzICkge1xuXHRcdGlmICggbmFtZXMubGVuZ3RoPT09MSApIHtcblx0XHRcdHZhciBuYW1lJGdldCA9IG5hbWVzWzBdICsgJyRnZXQnO1xuXHRcdFx0dmFyIG5hbWUkc2V0ID0gbmFtZXNbMF0gKyAnJHNldCc7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0YWxsW25hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0YWxsW25hbWUkZ2V0XSA9IG51bGw7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdG5hbWVzIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICApIHtcblx0XHRcdFx0XHRhbGxbbmFtZSArICckc2V0J10gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWVdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0XHRhbGxbbmFtZSArPSAnJGdldCddID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gdG9OYW1lICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gdG9OYW1lICsgJyRzZXQnO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgLCBkYXRhICAgICApIHtcblx0XHRcdGRhdGFbdG9OYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdGRhdGFbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dDaGVja2VyICggICAgICAgICAgICBhbG9uZyAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgc2hhZG93TmFtZXMgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGlmICggYWxvbmdbMF09PT0nXycgfHwgYWxvbmdbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0aWYgKCBpbmRleDwwICkge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gYWxvbmcuc2xpY2UoMCwgaW5kZXgpICsgJyRzZXQnO1xuXHRcdGlmICggdG9OYW1lJGdldCBpbiByZXN0TmFtZXMgfHwgdG9OYW1lJHNldCBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdHNoYWRvd05hbWVzW3RvTmFtZSRzZXRdID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggdG9OYW1lJGdldCBpbiBkYXRhTmFtZXMgfHwgdG9OYW1lJHNldCBpbiBkYXRhTmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgZGF0YSAgICAgICkge1xuXHRcdFx0aWYgKCB0b05hbWUkZ2V0IGluIGRhdGEgfHwgdG9OYW1lJHNldCBpbiBkYXRhICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc2hhZG93KTsgfVxuXHRcdH07XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBhbG9uZz09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCBhbG9uZyBpbiByZXN0TmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0c2hhZG93TmFtZXNbYWxvbmddID0gbnVsbDtcblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YU5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9O1xuXHR9XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBNYXAgZnJvbSAnLk1hcD8nO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXA/JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBnZXRQcm90b3R5cGVPZiBmcm9tICcuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mJztcbmltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnNldFByb3RvdHlwZU9mJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/JztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0IGZyb20gJy5SZWZsZWN0LmdldD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBrZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBQUk9UT19CVUcgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmltcG9ydCB7IHRoYXQsIHByb1N5bWJvbHMsIHByb0NvbnN0cnVjdG9yLCBwcm9OYW1lcywgcHJvRGF0YSwgZGV2RGF0YSB9IGZyb20gJy4vRGF0YSc7XG5pbXBvcnQgeyBTaGFkb3dBc3NpZ25lciwgU2hhZG93Q2hlY2tlciB9IGZyb20gJy4vU2hhZG93JztcblxuZXhwb3J0IHsgQ29tcG9uZW50IGFzIGRlZmF1bHQgfTtcbnZhciBDb21wb25lbnQgICAgICAgICAgID0gLyojX19QVVJFX18qL2ZyZWV6ZSgvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhcblx0ZnVuY3Rpb24gQ29tcG9uZW50ICgpIHsgcmV0dXJuIHRoYXQ7IH0sXG5cdHtcblx0XHRwcm90b3R5cGU6IHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdFx0XHRcdF9yZW5kZXI6IHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRnZXQ6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uIF9yZW5kZXIgKCAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICAgICAgICAgKSB7ICggdGhpcy5fIHx8IHRoaXMuJG9wdGlvbnMgKS5yZW5kZXIgPSB2YWx1ZTsgfSxcblx0XHRcdFx0fSxcblx0XHRcdH0pKSxcblx0XHR9LFxuXHRcdHJlbmRlcjoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6IHVuZGVmaW5lZCxcblx0XHRcdHNldDogZnVuY3Rpb24gcmVuZGVyICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICkgeyAoIHRoYXQgLl8gfHwgdGhhdCAuJG9wdGlvbnMgKS5yZW5kZXIgPSB2YWx1ZTsgfSxcblx0XHR9LFxuXHRcdF86IHtcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHRvT3B0aW9ucyAoICAgICAgICAgICAgICAgIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdGlmICggIWlzQ29tcG9uZW50Q29uc3RydWN0b3IodGhpcykgKSB7IHRocm93IEVycm9yKCchKCB0aGlzIGV4dGVuZHMgQ29tcG9uZW50ICkuXygpJyk7IH1cblx0XHRcdFx0dmFyIERJRF9PUFRJT05TID0gT1BUSU9OUy5vYmplY3RzLmludG8oX19kZXZfXyB8fCBPUFRJT05TICAgICAgICkuaW50byhWdWUzIHx8IE9QVElPTlMgICAgICAgKTtcblx0XHRcdFx0dmFyIFRNUF9PUFRJT05TID0gbmV3IE9QVElPTlMub2JqZWN0c1RtcDtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSBUb09wdGlvbnMoXG5cdFx0XHRcdFx0dGhpcyxcblx0XHRcdFx0XHRWdWUzIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRfX2Rldl9fID8gREVWLnJlZHVjZShmdW5jdGlvbiBEZXYgKGRldiwga2V5KSB7XG5cdFx0XHRcdFx0XHRkZXZba2V5XSA9IF9fZGV2X18gW2tleV0gfHwga2V5O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRldjtcblx0XHRcdFx0XHR9LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCxcblx0XHRcdFx0XHRESURfT1BUSU9OUyxcblx0XHRcdFx0XHRUTVBfT1BUSU9OU1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRUTVBfT1BUSU9OUy5mb3JFYWNoIChmdW5jdGlvbiAob3B0aW9uc1ZhbHVlLCBjb25zdHJ1Y3RvcktleSkgeyBESURfT1BUSU9OUy5zZXQoY29uc3RydWN0b3JLZXksIG9wdGlvbnNWYWx1ZSk7IH0pO1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH0sXG5cdFx0fSxcblx0fVxuKSk7XG5cbnZhciBfbWl4aW5zICAgICAgICAgICAgICAgID0gU3ltYm9sICYmIC8qI19fUFVSRV9fKi9TeW1ib2woJ19taXhpbnMnKSAgICAgICAgICAgICAgICAgO1xuXG52YXIgX19QVVJFX18gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR0cnkgeyByZXR1cm4gRnVuY3Rpb24oJ0NvbXBvbmVudCxfbWl4aW5zJywgJ1widXNlIHN0cmljdFwiO3JldHVybiguLi5taXhpbnMpPT5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtjb25zdHJ1Y3Rvcigpe3JldHVybiBDb21wb25lbnQoKX1zdGF0aWMgZ2V0W19taXhpbnNdKCl7cmV0dXJuIG1peGluc319JykoQ29tcG9uZW50LCBfbWl4aW5zKTsgfVxuXHRjYXRjaCAoZXJyb3IpIHt9XG59KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbiAoICAgICAgICAgICkge1xuXHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuXHRcdD8gLyojX19QVVJFX18qL2FwcGx5KF9fUFVSRV9fLCBudWxsLCBhcmd1bWVudHMgICAgICAgKVxuXHRcdDogQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBUb09wdGlvbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICAgICAgICAgLCBESURfT1BUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIFRNUF9PUFRJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICB7XG5cdFxuXHR2YXIgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICA9IERJRF9PUFRJT05TLmdldChjb25zdHJ1Y3RvcikgfHwgVE1QX09QVElPTlMuZ2V0KGNvbnN0cnVjdG9yKTtcblx0aWYgKCBvcHRpb25zICkgeyByZXR1cm4gb3B0aW9uczsgfVxuXHRvcHRpb25zID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICA7XG5cdFxuXHRpZiAoIGlzTWl4aW5zKGNvbnN0cnVjdG9yKSApIHtcblx0XHR2YXIgc3RhdGljX21peGlucyA9IGNvbnN0cnVjdG9yW19taXhpbnNdIDtcblx0XHR2YXIgbWl4aW5zID0gb3B0aW9ucy5taXhpbnMgPSBbXSAgICAgICAgICAgICAgICA7XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHR3aGlsZSAoIG1peGlucy5sZW5ndGghPT1zdGF0aWNfbWl4aW5zLmxlbmd0aCApIHtcblx0XHRcdHZhciBtaXhpbiA9IHN0YXRpY19taXhpbnNbaW5kZXgrK107XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IobWl4aW4pICkge1xuXHRcdFx0XHR2YXIgbWl4aW5PcHRpb25zID0gVG9PcHRpb25zKG1peGluLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcdFx0XHRpZiAoIGlzTWl4aW5zKG1peGluKSApIHtcblx0XHRcdFx0XHR2YXIgbWl4aW5NaXhpbnMgPSBtaXhpbk9wdGlvbnMubWl4aW5zIDtcblx0XHRcdFx0XHR2YXIgbWl4aW5JbmRleCA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCBtaXhpbkluZGV4IT09bWl4aW5NaXhpbnMubGVuZ3RoICkgeyBtaXhpbnNbbWl4aW5zLmxlbmd0aF0gPSBtaXhpbk1peGluc1ttaXhpbkluZGV4KytdOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7IG1peGluc1ttaXhpbnMubGVuZ3RoXSA9IG1peGluT3B0aW9uczsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IG1peGluc1ttaXhpbnMubGVuZ3RoXSA9IG1peGluICAgICAgICAgICAgICA7IH1cblx0XHR9XG5cdFx0X19kZXZfXyAmJiBjaGVjayhvcHRpb25zLCBfX2Rldl9fLCBjb25zdHJ1Y3Rvcik7XG5cdFx0Y29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XHRUTVBfT1BUSU9OUy5zZXQoY29uc3RydWN0b3IsIG9wdGlvbnMpO1xuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG5cdFxuXHR2YXIgU3VwZXIgPSBPUFRJT05TLnN1cGVyLmdldChjb25zdHJ1Y3Rvcik7XG5cdGlmICggIVN1cGVyICkge1xuXHRcdE9QVElPTlMuc3VwZXIuc2V0KGNvbnN0cnVjdG9yLCBTdXBlciA9IGdldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yKSk7XG5cdFx0U3VwZXI9PT1Db21wb25lbnQgfHwgaXNNaXhpbnMoU3VwZXIpIHx8IHNldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yLCBDb21wb25lbnQpO1xuXHR9XG5cdGlmICggU3VwZXIhPT1Db21wb25lbnQgKSB7XG5cdFx0dmFyIFN1cGVyT3B0aW9ucyA9IFRvT3B0aW9ucyhTdXBlciwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRpc01peGlucyhTdXBlcilcblx0XHRcdD8gU3VwZXJPcHRpb25zLm1peGlucyAubGVuZ3RoPT09MVxuXHRcdFx0PyBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnMubWl4aW5zIFswXVxuXHRcdFx0OiBvcHRpb25zLm1peGlucyA9IFN1cGVyT3B0aW9ucy5taXhpbnNcblx0XHRcdDogb3B0aW9ucy5leHRlbmRzID0gU3VwZXJPcHRpb25zO1xuXHR9XG5cdFxuXHRfX2Rldl9fICYmIGdldE93blByb3BlcnR5U3ltYm9scyhjb25zdHJ1Y3RvcikuZm9yRWFjaChmdW5jdGlvbiAoc3ltYm9sKSB7XG5cdFx0aWYgKCBzeW1ib2whPT1fbWl4aW5zICYmICEoIHN5bWJvbCBpbiBTWU1CT0xTICkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zeW1ib2wpOyB9XG5cdH0pO1xuXHRcblx0dmFyIHNldCAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZTZXQuYmluZChfX2Rldl9fKSA6IHByb1NldDtcblx0dmFyIGFzc2VydEZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2QXNzZXJ0RnVuY3Rpb24uYmluZChfX2Rldl9fKSA6IHByb0Fzc2VydEZ1bmN0aW9uO1xuXHRcblx0dmFyIHN0YXRpY05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhjb25zdHJ1Y3Rvcik7XG5cdGluZGV4ID0gc3RhdGljTmFtZXMubGVuZ3RoO1xuXHR2YXIgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG5cdHZhciBza2lwQ29uc3RydWN0b3IgPSBmYWxzZTtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgc3RhdGljTmFtZSA9IHN0YXRpY05hbWVzWy0taW5kZXhdO1xuXHRcdGlmICggc3RhdGljTmFtZT09PSdSZW5kZXInICkgeyB2YXIgUmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gY29uc3RydWN0b3Jbc3RhdGljTmFtZV0gICAgICAgICAgICAgICAgICAgICAgIDsgfVxuXHRcdC8vQHRzLWlnbm9yZVxuXHRcdGVsc2UgaWYgKCBzdGF0aWNOYW1lPT09J25hbWUnIHx8IHN0YXRpY05hbWU9PT0nbGVuZ3RoJyApIHtcblx0XHRcdGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uc3RydWN0b3IsIHN0YXRpY05hbWUpO1xuXHRcdFx0aWYgKCBkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgJiYgc2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBhcHBseShkZXNjcmlwdG9yLmdldCAsIGNvbnN0cnVjdG9yLCBBUkdTKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBzdGF0aWNOYW1lPT09J2RhdGEnICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdIT09dW5kZWZpbmVkICkgeyB0aHJvdyBFcnJvcihpc0FycmF5KGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdKSA/IF9fZGV2X18uY29tcGlsZV9sYXlvdXQgOiBfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdH1cblx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBzdGF0aWNOYW1lIT09J3Byb3RvdHlwZScgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggc3RhdGljTmFtZVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdzZXR1cCcgfHwgc3RhdGljTmFtZT09PSd3YXRjaCcgfHwgc3RhdGljTmFtZT09PSdtZXRob2RzJyB8fCBzdGF0aWNOYW1lPT09J2NvbXB1dGVkJyB8fCBzdGF0aWNOYW1lPT09J2V4dGVuZHMnIHx8IHN0YXRpY05hbWU9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nYmVmb3JlQ3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdjcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZU1vdW50JyB8fCBzdGF0aWNOYW1lPT09J21vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVXBkYXRlJyB8fCBzdGF0aWNOYW1lPT09J3VwZGF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2RlYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVubW91bnQnIHx8IHN0YXRpY05hbWU9PT0ndW5tb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZURlc3Ryb3knIHx8IHN0YXRpY05hbWU9PT0nZGVzdHJveWVkJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0naW5qZWN0JyB8fCBzdGF0aWNOYW1lPT09J3Byb3BzJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheW91dCk7IH1cblx0XHRcdH1cblx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0c2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdKTtcblx0XHR9XG5cdH1cblx0XG5cdHZhciBwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cdFxuXHR2YXIgcHJvdG9OYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXMocHJvdG90eXBlKTtcblx0aW5kZXggPSBwcm90b05hbWVzLmxlbmd0aDtcblx0dmFyIHdhdGNoZXJzICAgICAgICAgICAgPSBbXTtcblx0dmFyIHNraXBEYXRhID0gZmFsc2U7XG5cdHZhciBkYXRhTmFtZXMgICAgICAgICAgICAgICA9IG51bGw7XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIHByb3RvTmFtZSA9IHByb3RvTmFtZXNbLS1pbmRleF07XG5cdFx0aWYgKCBwcm90b05hbWU9PT0nX2RhdGEnICkge1xuXHRcdFx0dmFyIF9kYXRhID0gZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpO1xuXHRcdFx0aWYgKCBfZGF0YSApIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggIWlzQXJyYXkoX2RhdGEpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfdHlwZSk7IH1cblx0XHRcdFx0XHRfZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBuYW1lIT09J3N0cmluZycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoIHNraXBDb25zdHJ1Y3RvciApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgbGVuZ3RoID0gX2RhdGEubGVuZ3RoO1xuXHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRkYXRhTmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFx0XHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0XHRcdGRvIHsgZGF0YU5hbWVzW19kYXRhW2ldXSA9IG51bGw7IH1cblx0XHRcdFx0XHR3aGlsZSAoICsraSE9PWxlbmd0aCApO1xuXHRcdFx0XHRcdGRhdGFOYW1lcyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRhdGFOYW1lcyk7XG5cdFx0XHRcdFx0X19kZXZfXyAmJiBPUFRJT05TLmRhdGEuc2V0KG9wdGlvbnMsIGRhdGFOYW1lcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0c2tpcERhdGEgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggX2RhdGEhPT11bmRlZmluZWQgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdGlmICggc2tpcENvbnN0cnVjdG9yICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNraXBDb25zdHJ1Y3RvciA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBwcm90b05hbWVbMF09PT0nXycgJiYgIXByb3RvTmFtZS5zdGFydHNXaXRoKCdfd2F0Y2g6JykgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdHZhciBwcm90b05hbWUxID0gcHJvdG9OYW1lLnNsaWNlKDEpO1xuXHRcdFx0XHRpZiAoIHByb3RvTmFtZTFbMF09PT0nXycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nc2V0dXAnIHx8IHByb3RvTmFtZTE9PT0nd2F0Y2gnIHx8IHByb3RvTmFtZTE9PT0nbWV0aG9kcycgfHwgcHJvdG9OYW1lMT09PSdjb21wdXRlZCcgfHwgcHJvdG9OYW1lMT09PSdleHRlbmRzJyB8fCBwcm90b05hbWUxPT09J21peGlucycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2VtaXRzJyB8fCBwcm90b05hbWUxPT09J2NvbXBvbmVudHMnIHx8IHByb3RvTmFtZTE9PT0nZGlyZWN0aXZlcycgfHwgcHJvdG9OYW1lMT09PSdzdGF0aWNSZW5kZXJGbnMnIHx8IHByb3RvTmFtZTE9PT0ndGVtcGxhdGUnIHx8IHByb3RvTmFtZTE9PT0naW5oZXJpdEF0dHJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nbmFtZScgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J1JlbmRlcicgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2RlbGltaXRlcnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdmaWx0ZXJzJyB8fCBwcm90b05hbWUxPT09J2NvbW1lbnRzJyB8fCBwcm90b05hbWUxPT09J2Z1bmN0aW9uYWwnIHx8IHByb3RvTmFtZTE9PT0ncHJvcHNEYXRhJyB8fCBwcm90b05hbWUxPT09J21vZGVsJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheW91dCk7IH1cblx0XHRcdH1cblx0XHRcdHNldChvcHRpb25zLCBwcm90b05hbWUuc2xpY2UoMSksIGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvTmFtZSk7XG5cdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSdfJyApIHtcblx0XHRcdFx0dmFyIGluZGV4T2ZRID0gcHJvdG9OYW1lLnNlYXJjaChXQVRDSF9PUFRJT05TKTtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB3YXRjaGVyc1t3YXRjaGVycy5sZW5ndGhdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICA7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHR3YXRjaGVyLiQgPSBpbmRleE9mUTwwXG5cdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZSg3KVxuXHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoNywgaW5kZXhPZlEpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHdhdGNoZXIuJCA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IuZ2V0KTtcblx0XHRcdFx0XHR3YXRjaGVyLmhhbmRsZXIgPSBhc3NlcnRGdW5jdGlvbihkZXNjcmlwdG9yLnNldCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpbmRleE9mUT4wICkge1xuXHRcdFx0XHRcdCsraW5kZXhPZlE7XG5cdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0dmFyIGluZGV4T2ZBID0gcHJvdG9OYW1lLmluZGV4T2YoJzsnLCBpbmRleE9mUSk7XG5cdFx0XHRcdFx0XHR2YXIgcGFpciA9IGluZGV4T2ZBPDBcblx0XHRcdFx0XHRcdFx0PyBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEpXG5cdFx0XHRcdFx0XHRcdDogcHJvdG9OYW1lLnNsaWNlKGluZGV4T2ZRLCBpbmRleE9mQSk7XG5cdFx0XHRcdFx0XHRpbmRleE9mUSA9IGluZGV4T2ZBICsgMTtcblx0XHRcdFx0XHRcdHZhciBpbmRleE9mRSA9IHBhaXIuaW5kZXhPZignPScpO1xuXHRcdFx0XHRcdFx0aW5kZXhPZkU8MFxuXHRcdFx0XHRcdFx0XHQ/IHdhdGNoZXJbcGFpcl0gPSB0cnVlXG5cdFx0XHRcdFx0XHRcdDogd2F0Y2hlcltwYWlyLnNsaWNlKDAsIGluZGV4T2ZFKV0gPSBwYWlyLnNsaWNlKGluZGV4T2ZFICsgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggaW5kZXhPZlEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZSE9PSdjb25zdHJ1Y3RvcicgfHwgZGVzY3JpcHRvci52YWx1ZSE9PWNvbnN0cnVjdG9yICkge1xuXHRcdFx0XHRcdFx0KCBvcHRpb25zLm1ldGhvZHMgfHwgKCBvcHRpb25zLm1ldGhvZHMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIClbcHJvdG9OYW1lXSA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQoIG9wdGlvbnMuY29tcHV0ZWQgfHwgKCBvcHRpb25zLmNvbXB1dGVkID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gZGVzY3JpcHRvci5zZXQgPyB7XG5cdFx0XHRcdFx0XHRnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuXHRcdFx0XHRcdFx0c2V0OiBkZXNjcmlwdG9yLnNldFxuXHRcdFx0XHRcdH0gOiBkZXNjcmlwdG9yLmdldCAgICAgICA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXywgY29uc3RydWN0b3IpO1xuXHRcblx0dmFyIHJlc3ROYW1lcyA9IGNvbGxlY3ROYW1lcyhvcHRpb25zLCBjb25zdHJ1Y3Rvcik7XG5cdFxuXHRpZiAoIFJlbmRlciAmJiAoIFZ1ZTMgfHwgIVJlbmRlci5sZW5ndGggKSApIHtcblx0XHR2YXIgc2hhZG93ID0gUmVuZGVyLnNoYWRvdztcblx0XHRpZiAoIHNoYWRvdyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBza2lwQ29uc3RydWN0b3IgJiYgc2tpcERhdGEgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zaGFkb3cpOyB9XG5cdFx0XHRcdHZhciBzaGFkb3dOYW1lcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHRcdFx0dmFyIHNoYWRvd0NoZWNrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBTaGFkb3dDaGVja2VyKHNoYWRvdywgcmVzdE5hbWVzLCBkYXRhTmFtZXMsIHNoYWRvd05hbWVzLCBfX2Rldl9fKTtcblx0XHRcdFx0T1BUSU9OUy5zaGFkb3cuc2V0KG9wdGlvbnMsIHNoYWRvd05hbWVzKTtcblx0XHRcdH1cblx0XHRcdHNoYWRvd0Fzc2lnbmVyID0gU2hhZG93QXNzaWduZXIoc2hhZG93KTtcblx0XHR9XG5cdFx0dmFyIHNoZWV0ID0gUmVuZGVyLnNoZWV0O1xuXHRcdGlmICggc2hlZXQgKSB7XG5cdFx0XHR2YXIgd2F0Y2hlcnMyICAgICAgICAgICAgPSBbXTtcblx0XHRcdG93bktleXMoc2hlZXQpLmZvckVhY2goZnVuY3Rpb24gKCAgICAgICAgICAgICAgICAga2V5LCBpbmRleCkge1xuXHRcdFx0XHR2YXIgd2F0Y2hlciA9IHRoaXNbaW5kZXhdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICA7XG5cdFx0XHRcdHdhdGNoZXIuJCA9IGFzc2VydEZ1bmN0aW9uKHNoZWV0IFtrZXldKTtcblx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gZnVuY3Rpb24gKCAgICAgICAgICAgIGNzcyAgICAgICAgKSB7ICggdGhpcy4kcmVmc1trZXldICAgICAgICAgICAgICAgICAgICAgKS50ZXh0Q29udGVudCA9IGNzczsgfTtcblx0XHRcdFx0d2F0Y2hlci5pbW1lZGlhdGUgPSB0cnVlO1xuXHRcdFx0XHR3YXRjaGVyLmZsdXNoID0gJ3N5bmMnO1xuXHRcdFx0fSwgd2F0Y2hlcnMyKTtcblx0XHRcdHZhciBiZWZvcmVNb3VudCA9IG9wdGlvbnMuYmVmb3JlTW91bnQ7XG5cdFx0XHRvcHRpb25zLmJlZm9yZU1vdW50ID0gYmVmb3JlTW91bnRcblx0XHRcdFx0PyBmdW5jdGlvbiBiZWZvcmVCZWZvcmVNb3VudCAoKSB7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzMik7XG5cdFx0XHRcdFx0cmV0dXJuIGJlZm9yZU1vdW50IC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIGJlZm9yZUJlZm9yZU1vdW50ICgpIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMyKTtcblx0XHRcdFx0fTtcblx0XHR9XG5cdFx0b3B0aW9ucy5yZW5kZXIgPSBhc3NlcnRGdW5jdGlvbihuZXcgUmVuZGVyKFZ1ZTMgKSk7XG5cdH1cblx0XG5cdHZhciBwcm90b1N5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvdG90eXBlKSAgICAgICAgICAgICAgICAgICA7XG5cdGluZGV4ID0gcHJvdG9TeW1ib2xzLmxlbmd0aDtcblx0dmFyIHN5bWJvbE1ldGhvZHMgPSBpbmRleCA/IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIHByb3RvU3ltYm9sICAgICAgICAgICAgICAgID0gcHJvdG9TeW1ib2xzWy0taW5kZXhdO1xuXHRcdHN5bWJvbE1ldGhvZHMgW3Byb3RvU3ltYm9sXSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvU3ltYm9sKSk7XG5cdH1cblx0XG5cdGlmICggX19kZXZfXyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIGRldkRhdGEoc2VsZiAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBjb25zdHJ1Y3RvciwgVnVlMywgc2tpcERhdGEsIGRhdGFOYW1lcywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lciwgc2hhZG93Q2hlY2tlciwgc2tpcENvbnN0cnVjdG9yLCBfX2Rldl9fKTsgfTsgfVxuXHRlbHNlIGlmICggc2tpcENvbnN0cnVjdG9yIHx8IHNraXBEYXRhICkge31cblx0ZWxzZSBpZiAoIGRhdGFOYW1lcyApIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb05hbWVzKHNlbGYgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcywgY29uc3RydWN0b3IsIFZ1ZTMsIGRhdGFOYW1lcyAsIHNoYWRvd0Fzc2lnbmVyKTsgfTsgfVxuXHRlbHNlIHsgb3B0aW9ucy5kYXRhID0gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb0RhdGEoc2VsZiAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBjb25zdHJ1Y3RvciwgVnVlMywgcmVzdE5hbWVzLCBzaGFkb3dBc3NpZ25lcik7IH07IH1cblx0XG5cdGlmICggd2F0Y2hlcnMubGVuZ3RoIHx8ICFfX2Rldl9fICYmICggc2tpcENvbnN0cnVjdG9yICYmIHN5bWJvbE1ldGhvZHMgfHwgc2tpcERhdGEgKSApIHtcblx0XHR2YXIgY3JlYXRlZCA9IG9wdGlvbnMuY3JlYXRlZDtcblx0XHRzd2l0Y2ggKCAoIF9fZGV2X18gPyAoIHNraXBDb25zdHJ1Y3RvciA/ICdzJyA6ICduJyApIDogJ18nICkgKyAoIHdhdGNoZXJzLmxlbmd0aCA/ICd3JyA6ICdfJyApICsgKCBjcmVhdGVkID8gJ2MnIDogJ18nICkgKSB7XG5cdFx0XHRjYXNlICdzd2MnOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvU3ltYm9scyh0aGlzICAgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzd18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvU3ltYm9scyh0aGlzICAgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3NfYyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9TeW1ib2xzKHRoaXMgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcyApO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzX18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvU3ltYm9scyh0aGlzICAgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdud2MnOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvQ29uc3RydWN0b3IodGhpcyAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBjb25zdHJ1Y3RvciwgVnVlMyk7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0XHRyZXR1cm4gY3JlYXRlZCAuYXBwbHkodGhpcyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbndfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnbl9jJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb0NvbnN0cnVjdG9yKHRoaXMgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcywgY29uc3RydWN0b3IsIFZ1ZTMpO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5hcHBseSh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICduX18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvQ29uc3RydWN0b3IodGhpcyAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBjb25zdHJ1Y3RvciwgVnVlMyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3djJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdFx0cmV0dXJuIGNyZWF0ZWQgLmFwcGx5KHRoaXMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ193Xyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0XG5cdFRNUF9PUFRJT05TLnNldChjb25zdHJ1Y3Rvciwgb3B0aW9ucyk7XG5cdFxuXHQvL0B0cy1pZ25vcmVcblx0aWYgKCBvcHRpb25zLmNvbXBvbmVudHMgfHwgb3B0aW9ucy5uYW1lIHx8IG9wdGlvbnMuZGlzcGxheU5hbWUgKSB7XG5cdFx0dmFyIGNvbXBvbmVudHMgPSBvcHRpb25zLmNvbXBvbmVudHMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuXHRcdHZhciBjYXNlcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHQvL0B0cy1pZ25vcmVcblx0XHRvcHRpb25zLm5hbWUgJiYgZml4UGFzY2FsKG9wdGlvbnMubmFtZSwgY2FzZXMpO1xuXHRcdC8vQHRzLWlnbm9yZVxuXHRcdG9wdGlvbnMuZGlzcGxheU5hbWUgJiYgZml4UGFzY2FsKG9wdGlvbnMuZGlzcGxheU5hbWUsIGNhc2VzKTtcblx0XHRmb3IgKCB2YXIgcGFzY2FsIGluIGNvbXBvbmVudHMgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggL14oPyFbQS1aXSkvLnRlc3QocGFzY2FsKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdFx0XHR9XG5cdFx0XHR2YXIgdmFsdWUgPSBjb21wb25lbnRzW3Bhc2NhbF07XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IodmFsdWUpICkgeyBjb21wb25lbnRzW3Bhc2NhbF0gPSBUb09wdGlvbnModmFsdWUsIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7IH1cblx0XHRcdGZpeFBhc2NhbChwYXNjYWwsIGNhc2VzKTtcblx0XHR9XG5cdFx0YXNzaWduKGNvbXBvbmVudHMsIGNhc2VzKTtcblx0fVxuXHRcblx0cmV0dXJuIG9wdGlvbnM7XG5cdFxufVxuXG52YXIgT1BUSU9OUyA9IFdlYWtNYXAgJiYgLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ1dlYWtNYXAsTWFwJywgJ1widXNlIHN0cmljdFwiO1xcXG5jbGFzcyBFYXN5TWFwIGV4dGVuZHMgV2Vha01hcHtpbnRvKGtleSl7bGV0IHN1Yj10aGlzLmdldChrZXkpO3N1Yj8/dGhpcy5zZXQoa2V5LHN1Yj1uZXcgRWFzeU1hcCk7cmV0dXJuIHN1Yn19RWFzeU1hcC5wcm90b3R5cGUuZ2V0PVdlYWtNYXAucHJvdG90eXBlLmdldDtFYXN5TWFwLnByb3RvdHlwZS5zZXQ9V2Vha01hcC5wcm90b3R5cGUuc2V0O1xcXG5jbGFzcyBTdHJvbmdNYXAgZXh0ZW5kcyBNYXB7fVN0cm9uZ01hcC5wcm90b3R5cGUuZ2V0PU1hcC5wcm90b3R5cGUuZ2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuc2V0PU1hcC5wcm90b3R5cGUuc2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuZm9yRWFjaD1NYXAucHJvdG90eXBlLmZvckVhY2g7XFxcbnJldHVybntvYmplY3RzOm5ldyBFYXN5TWFwLG9iamVjdHNUbXA6U3Ryb25nTWFwLHN1cGVyOm5ldyBFYXN5TWFwLHJlc3Q6bmV3IEVhc3lNYXAsZGF0YTpuZXcgRWFzeU1hcCxzaGFkb3c6bmV3IEVhc3lNYXB9XFxcbicpKFdlYWtNYXAsIE1hcCk7XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufSgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5mdW5jdGlvbiBpc0NvbXBvbmVudENvbnN0cnVjdG9yICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgeyByZXR1cm4gYXBwbHkoaXNQcm90b3R5cGVPZiwgQ29tcG9uZW50LCBbIHZhbHVlIF0gICAgICAgICApOyB9XG5cbnZhciBBUkdTID0gW10gICAgICAgICA7XG5cbnZhciBfTUlYSU5TID0gWyBfbWl4aW5zIF0gICAgICAgICA7XG5mdW5jdGlvbiBpc01peGlucyAoY29uc3RydWN0b3IgICAgICAgICAgKSB7IHJldHVybiBhcHBseShoYXNPd25Qcm9wZXJ0eSwgY29uc3RydWN0b3IsIF9NSVhJTlMpOyB9XG5cbnZhciBTWU1CT0xTID0gLyojX19QVVJFX18qL2dldE93blByb3BlcnR5TmFtZXMoU3ltYm9sKS5yZWR1Y2UoZnVuY3Rpb24gKFNZTUJPTFMsIG5hbWUpIHtcblx0aWYgKCB0eXBlb2YgU3ltYm9sW25hbWVdPT09J3N5bWJvbCcgKSB7IFNZTUJPTFNbU3ltYm9sW25hbWVdICAgICAgICAgICAgICAgICBdID0gbnVsbDsgfVxuXHRyZXR1cm4gU1lNQk9MUztcbn0sIGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG52YXIgV0FUQ0hfT1BUSU9OUyA9IC87W2Etejs9XSokLztcbmZ1bmN0aW9uICR3YXRjaCAodGhhdCAgICAgICwgd2F0Y2hlcnMgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgaW5kZXggPSB3YXRjaGVycy5sZW5ndGg7XG5cdGRvIHtcblx0XHR2YXIgd2F0Y2hlciAgICAgID0gd2F0Y2hlcnNbLS1pbmRleF07XG5cdFx0dGhhdC4kd2F0Y2god2F0Y2hlci4kLCB3YXRjaGVyLmhhbmRsZXIsIHdhdGNoZXIpO1xuXHR9XG5cdHdoaWxlICggaW5kZXggKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5mdW5jdGlvbiBjb2xsZWN0TmFtZXMgKG9wdGlvbnMgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgICApICAgICAgICB7XG5cdHZhciByZXN0TmFtZXMgICAgICAgICAgICAgICAgICAgID0gT1BUSU9OUy5yZXN0LmdldChvcHRpb25zKTtcblx0aWYgKCAhcmVzdE5hbWVzICkge1xuXHRcdGlmICggY29uc3RydWN0b3IgKSB7IHJlc3ROYW1lcyA9IE9QVElPTlMucmVzdC5nZXQoY29uc3RydWN0b3IpOyB9XG5cdFx0aWYgKCAhcmVzdE5hbWVzICkge1xuXHRcdFx0cmVzdE5hbWVzID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHRcdFx0dmFyIGV4dGVuZCA9IG9wdGlvbnMuZXh0ZW5kcztcblx0XHRcdGV4dGVuZCAmJiBhc3NpZ24ocmVzdE5hbWVzLCBjb2xsZWN0TmFtZXMoZXh0ZW5kLCBudWxsKSk7XG5cdFx0XHR2YXIgbWl4aW5zID0gb3B0aW9ucy5taXhpbnM7XG5cdFx0XHRpZiAoIG1peGlucyApIHtcblx0XHRcdFx0dmFyIGluZGV4ID0gbWl4aW5zLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpbmRleCApIHsgYXNzaWduKHJlc3ROYW1lcywgY29sbGVjdE5hbWVzKG1peGluc1stLWluZGV4XSwgbnVsbCkpOyB9XG5cdFx0XHR9XG5cdFx0XHR2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuXHRcdFx0dmFyIG5hbWUgICAgICAgIDtcblx0XHRcdGlmICggaXNBcnJheShwcm9wcykgKSB7XG5cdFx0XHRcdGZvciAoIGluZGV4ID0gcHJvcHMubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0bmFtZSA9IHByb3BzWy0taW5kZXhdO1xuXHRcdFx0XHRcdHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgeyBmb3IgKCBuYW1lIGluIHByb3BzICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9IH1cblx0XHRcdHByb3BzID0gb3B0aW9ucy5pbmplY3Q7XG5cdFx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkge1xuXHRcdFx0XHRmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdG5hbWUgPSBwcm9wc1stLWluZGV4XTtcblx0XHRcdFx0XHRyZXN0TmFtZXNbbmFtZV0gPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBwcm9wcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMubWV0aG9kcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0XHRyZXN0TmFtZXMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCByZXN0TmFtZXMpO1xuXHRcdH1cblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyBPUFRJT05TLnJlc3Quc2V0KGNvbnN0cnVjdG9yLCByZXN0TmFtZXMpOyB9XG5cdFx0T1BUSU9OUy5yZXN0LnNldChvcHRpb25zLCByZXN0TmFtZXMpO1xuXHR9XG5cdHJldHVybiByZXN0TmFtZXM7XG59XG5cbmZ1bmN0aW9uIHByb1NldCAgICAob2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHsgb2JqZWN0W25hbWVdID0gdmFsdWU7IH1cbmZ1bmN0aW9uIGRldlNldCAgICAoICAgICAgICAgICAgICAgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAsIG5hbWUgICAgICAgICwgdmFsdWUgICApIHtcblx0aWYgKCBuYW1lIGluIG9iamVjdCApIHsgdGhyb3cgRXJyb3IodGhpcy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0b2JqZWN0W25hbWVdID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHByb0Fzc2VydEZ1bmN0aW9uICAgIChmbiAgICkgeyByZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IH1cbmZ1bmN0aW9uIGRldkFzc2VydEZ1bmN0aW9uICAgICggICAgICAgICAgICAgICBmbiAgICkge1xuXHRpZiAoIHR5cGVvZiBmbiE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcih0aGlzLmNvbXBpbGVfdHlwZSk7IH1cblx0cmV0dXJuIGZuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufVxuXG52YXIgQ0hFQ0tFRCA9IFdlYWtNYXAgJiYgLyojX19QVVJFX18qL25ldyBXZWFrTWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCk7XG5mdW5jdGlvbiBmb3JLZXlzIChvcHRpb24gICAgICAgICAgICAgICAgLCBjYWxsYmFjayAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRpZiAoIGlzQXJyYXkob3B0aW9uKSApIHsgb3B0aW9uLmZvckVhY2goY2FsbGJhY2spOyB9XG5cdGVsc2UgeyBmb3IgKCB2YXIga2V5IGluIG9wdGlvbiApIHsgY2FsbGJhY2soa2V5KTsgfSB9XG59XG5mdW5jdGlvbiBjaGVjayAob3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgX19kZXZfXyAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIG93bk5hbWVzID0gQ0hFQ0tFRC5nZXQoY29uc3RydWN0b3IgfHwgb3B0aW9ucyk7XG5cdGlmICggb3duTmFtZXMgKSB7IHJldHVybiBvd25OYW1lczsgfVxuXHR2YXIgYWxsTmFtZXMgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdFxuXHQoIG9wdGlvbnMuZXh0ZW5kcyA/IFsgb3B0aW9ucy5leHRlbmRzIF0gOiBbXSApLmNvbmNhdChvcHRpb25zLm1peGlucyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAobWl4aW4pIHtcblx0XHR2YXIgbWl4aW5OYW1lcyA9IGNoZWNrKG1peGluLCBfX2Rldl9fLCBudWxsKTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBtaXhpbk5hbWVzICkge1xuXHRcdFx0aWYgKCBuYW1lIGluIGFsbE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfb3ZlcndyaXRlKTsgfVxuXHRcdH1cblx0XHRhc3NpZ24oYWxsTmFtZXMsIG1peGluTmFtZXMpO1xuXHR9KTtcblx0XG5cdG93bk5hbWVzID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHRcblx0Zm9yS2V5cyhvcHRpb25zLnByb3BzLCBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmICggLy18Xig/OmtleSR8W29PXVtuTl18cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9wcm9wcyk7IH1cblx0XHRpZiAoIG5hbWUgaW4gUFJPVE9fQlVHICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnByb3RvKTsgfVxuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bk5hbWVzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25OYW1lcyBbbmFtZV0gPSBudWxsO1xuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5pbmplY3QsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWUgaW4gb3duTmFtZXMgICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bk5hbWVzIFtuYW1lXSA9IG51bGw7XG5cdH0pO1xuXHRcblx0dmFyIG5hbWUgICAgICAgIDtcblx0XG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5tZXRob2RzICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bk5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bk5hbWVzW25hbWVdID0gbnVsbDtcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lIGluIG93bk5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRcdG93bk5hbWVzW25hbWVdID0gbnVsbDtcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBPUFRJT05TLmRhdGEuZ2V0KG9wdGlvbnMpICkge1xuXHRcdGlmICggbmFtZSBpbiBvd25OYW1lcyAgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0b3duTmFtZXMgW25hbWVdID0gbnVsbDtcblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBPUFRJT05TLnNoYWRvdy5nZXQob3B0aW9ucykgKSB7XG5cdFx0aWYgKCBuYW1lIGluIG93bk5hbWVzICApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0XHRvd25OYW1lcyBbbmFtZV0gPSBudWxsO1xuXHR9XG5cdFxuXHRpZiAoICdjb25zdHJ1Y3RvcicgaW4gb3duTmFtZXMgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFxuXHRmb3IgKCBuYW1lIGluIG93bk5hbWVzICkge1xuXHRcdGlmICggbmFtZSBpbiBhbGxOYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX292ZXJ3cml0ZSk7IH1cblx0fVxuXHRhc3NpZ24oYWxsTmFtZXMsIG93bk5hbWVzKTtcblx0XG5cdFsgb3B0aW9ucy5uYW1lLCBvcHRpb25zLmRpc3BsYXlOYW1lIF0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSAgICAgICAgICkge1xuXHRcdGlmICggdHlwZW9mIG5hbWU9PT0nc3RyaW5nJ1xuXHRcdFx0PyAvXig/IVtBLVpdKS8udGVzdChuYW1lKSB8fCBvcHRpb25zLmNvbXBvbmVudHMgJiYgb3B0aW9ucy5jb21wb25lbnRzW25hbWVdICYmIG9wdGlvbnMuY29tcG9uZW50c1tuYW1lXSE9PW9wdGlvbnNcblx0XHRcdDogbmFtZSE9PXVuZGVmaW5lZFxuXHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0fSk7XG5cdFxuXHRvcHRpb25zLmVtaXRzICYmXG5cdCggaXNBcnJheShvcHRpb25zLmVtaXRzKSA/IG9wdGlvbnMuZW1pdHMgOiBrZXlzKG9wdGlvbnMuZW1pdHMpICkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoIHR5cGVvZiBldmVudD09PSdzdHJpbmcnICYmIC9bQS1aXXxeb252bm9kZXwoPzpjYXB0dXJlfG9uY2V8cGFzc2l2ZSkkLy50ZXN0KCdvbicgKyBldmVudCkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9lbWl0cyk7IH1cblx0fSk7XG5cdFxuXHRpZiAoXG5cdFx0b3B0aW9ucy5kaXJlY3RpdmVzICYmICdpcycgaW4gb3B0aW9ucy5kaXJlY3RpdmVzLy8gMlxuXHRcdHx8Ly9AdHMtaWdub3JlXG5cdFx0b3B0aW9ucy5wcm9wcyAmJiAoIGlzQXJyYXkob3B0aW9ucy5wcm9wcykgPyBvcHRpb25zLnByb3BzLmluY2x1ZGVzKCdpcycpIDogJ2lzJyBpbiBvcHRpb25zLnByb3BzICkvLyAzXG5cdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfaXMpOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAmJiBDSEVDS0VELnNldChjb25zdHJ1Y3RvciwgYWxsTmFtZXMpO1xuXHRDSEVDS0VELnNldChvcHRpb25zLCBhbGxOYW1lcyk7XG5cdHJldHVybiBhbGxOYW1lcztcblx0XG59XG5cbnZhciBVUFBFUiA9IC9bQS1aXS9nO1xuZnVuY3Rpb24gZml4UGFzY2FsIChwYXNjYWwgICAgICAgICwgY2FzZXMgICAgICAgKSB7XG5cdGlmICggcGFzY2FsW3Bhc2NhbC5sZW5ndGggLSAxXSE9PSdfJyApIHtcblx0XHR2YXIgZmlyc3QgPSBwYXNjYWxbMF0udG9Mb3dlckNhc2UoKTtcblx0XHR2YXIgcmVzdCA9IHBhc2NhbC5zbGljZSgxKTtcblx0XHRjYXNlc1tmaXJzdCArIHJlc3RdID0gbnVsbDtcblx0XHRoeXBoZW5hdGUoZmlyc3QsIHJlc3QsIGNhc2VzKTtcblx0fVxufVxuZnVuY3Rpb24gaHlwaGVuYXRlIChiZWZvcmUgICAgICAgICwgYWZ0ZXIgICAgICAgICwgY2FzZXMgICAgICAgKSB7XG5cdHZhciBpbmRleCA9IGFmdGVyLnNlYXJjaChVUFBFUik7XG5cdGlmICggaW5kZXg8MCApIHsgY2FzZXNbYmVmb3JlICsgYWZ0ZXJdID0gbnVsbDsgfVxuXHRlbHNlIHtcblx0XHRpZiAoIGluZGV4ICkgeyBiZWZvcmUgKz0gYWZ0ZXIuc2xpY2UoMCwgaW5kZXgpOyB9XG5cdFx0dmFyIGNoYXIgPSBhZnRlcltpbmRleF07XG5cdFx0YWZ0ZXIgPSBhZnRlci5zbGljZShpbmRleCArIDEpO1xuXHRcdGh5cGhlbmF0ZShiZWZvcmUgKyAnLScgKyBjaGFyLnRvTG93ZXJDYXNlKCksIGFmdGVyLCBjYXNlcyk7XG5cdFx0aHlwaGVuYXRlKGJlZm9yZSArICctJyArIGNoYXIsIGFmdGVyLCBjYXNlcyk7XG5cdFx0YmVmb3JlW2JlZm9yZS5sZW5ndGggLSAxXT09PSctJyB8fCBoeXBoZW5hdGUoYmVmb3JlICsgY2hhciwgYWZ0ZXIsIGNhc2VzKTtcblx0fVxufVxuXG52YXIgREVWID0gW1xuXHQncHJvdG8nLFxuXHQnY29tcGlsZV9uYW1lJyxcblx0J2NvbXBpbGVfcHJvcHMnLFxuXHQnY29tcGlsZV9lbWl0cycsXG5cdCdjb21waWxlX2lzJyxcblx0J2NvbXBpbGVfbGF5b3V0Jyxcblx0J2NvbXBpbGVfcmVzZXJ2ZWQnLFxuXHQnY29tcGlsZV9yZWRlZmluZWQnLFxuXHQnY29tcGlsZV9vdmVyd3JpdGUnLFxuXHQnY29tcGlsZV90eXBlJyxcblx0J2NvbXBpbGVfc3ltYm9sJyxcblx0J2NvbXBpbGVfc2hhZG93Jyxcblx0J3J1bnRpbWVfc2hhZG93Jyxcblx0J3J1bnRpbWVfcmVkZWZpbmVkJyxcblx0J3J1bnRpbWVfc3ltYm9sJyxcblx0J3J1bnRpbWVfcmVzZXJ2ZWQnLFxuXHQncnVudGltZV9lbnVtZXJhYmxlJyxcblx0J3J1bnRpbWVfZGF0YScsXG5dICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgIFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG4gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcbiAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi9JZGVudGlmaWVyJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnLi9UZW1wbGF0ZSc7XG5pbXBvcnQgUmVuZGVyLCB7IFN0YXRpY1JlbmRlckZucyB9IGZyb20gJy4vUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnO1xuaW1wb3J0IFN0eWxlLCB7IHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5pbXBvcnQgQ29tcG9uZW50LCB7IG1peGluIH0gZnJvbSAnLi9Db21wb25lbnQsIG1peGluLyc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdElkZW50aWZpZXIsXG5cdFNjb3BlLFxuXHRUZW1wbGF0ZSxcblx0UmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlLCByZW1vdmUsXG5cdENvbXBvbmVudCwgbWl4aW4sXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0SWRlbnRpZmllcjogSWRlbnRpZmllcixcblx0U2NvcGU6IFNjb3BlLFxuXHRUZW1wbGF0ZTogVGVtcGxhdGUsXG5cdFJlbmRlcjogUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnM6IFN0YXRpY1JlbmRlckZucyxcblx0U3R5bGU6IFN0eWxlLCByZW1vdmU6IHJlbW92ZSxcblx0Q29tcG9uZW50OiBDb21wb25lbnQsIG1peGluOiBtaXhpbixcbn0pO1xuIl0sIm5hbWVzIjpbIlN5bWJvbCIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwiUmVnRXhwIiwiRnVuY3Rpb24iLCJLZXlzIiwiRXJyb3IiLCJnZXRQcm90b3R5cGVPZiIsImdldCIsIldlYWtNYXAiLCJNYXAiLCJUeXBlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYyxRQUFROztBQ0F0QixtQkFBZTtBQUNmLENBQUMsS0FBSztBQUNOLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsT0FBTztBQUNSLENBQUMsT0FBTztBQUNSLENBQUMsT0FBTztBQUNSLENBQUMsT0FBTztBQUNSLENBQUMsUUFBUTtBQUNULENBQUMsUUFBUTtBQUNULENBQUMsUUFBUTtBQUNULENBQUMsUUFBUTtBQUNULENBQUMsUUFBUTtBQUNULENBQUMsUUFBUTtBQUNULENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsU0FBUztBQUNWLENBQUMsVUFBVTtBQUNYLENBQUMsVUFBVTtBQUNYLENBQUMsVUFBVTtBQUNYLENBQUMsVUFBVTtBQUNYLENBQUMsVUFBVTtBQUNYLENBQUMsVUFBVTtBQUNYLENBQUMsVUFBVTtBQUNYLENBQUMsV0FBVztBQUNaLENBQUMsV0FBVztBQUNaLENBQUMsV0FBVztBQUNaLENBQUMsWUFBWTtBQUNiLENBQUMsYUFBYTtBQUNkLENBQUM7O0FDdENELElBQUksa0JBQWtCLGlFQUFpRTtBQUN2RixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0FBQy9FLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7QUFDdkQsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFH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