/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：17.0.4
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

var version = '17.0.4';

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

var Set$1 = typeof Set!=='undefined' ? Set : undefined;

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

var PROTO_BUG = Object.prototype;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var isPrototypeOf = Object.prototype.isPrototypeOf;

var ownKeys = typeof Reflect!=='undefined' ? Reflect.ownKeys : undefined;

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

                                                               
function ShadowChecker (            along        , restNames       , dataNames              , __dev__         )                {
	if ( along[0]==='_' || along[0]==='$' ) { throw Error$1(__dev__.compile_shadow); }
	var index = along.indexOf('.');
	if ( index<0 ) {
		var toName$get = along.slice(0, index) + '$get';
		var toName$set = along.slice(0, index) + '$set';
		if ( toName$get in restNames || toName$set in restNames ) { throw Error$1(__dev__.compile_shadow); }
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

function ToOptions (constructor          , Vue3                   , __dev__                , DID_OPTIONS         , TMP_OPTIONS         )             {
	
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
		__dev__ && check(options, __dev__, DID_OPTIONS, TMP_OPTIONS);
		collectNames(options, constructor);
		TMP_OPTIONS.set(constructor, options);
		return options;
	}
	
	var Super = OPTIONS.supers.get(constructor);
	if ( !Super ) {
		OPTIONS.supers.set(constructor, Super = getPrototypeOf(constructor));
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
					_data.forEach(function (each) {
						if ( typeof each!=='string' ) { throw Error$1(__dev__.compile_type); }
					});
					if ( skipConstructor ) { throw Error$1(__dev__.compile_redefined); }
				}
				OPTIONS.data.set(options, _data);
				var length = _data.length;
				if ( length ) {
					dataNames = create(NULL)         ;
					var i = 0;
					do { dataNames[_data[i]] = null; }
					while ( ++i!==length );
					dataNames = assign(create(NULL), dataNames);
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
	
	__dev__ && check(options, __dev__, DID_OPTIONS, TMP_OPTIONS);
	
	var restNames = collectNames(options, constructor);
	
	if ( Render && Vue3 ) {
		var shadow = Render.shadow;
		if ( shadow ) {
			if ( __dev__ ) {
				if ( skipConstructor && skipData ) { throw Error$1(__dev__.compile_shadow); }
				var shadowChecker                            = ShadowChecker(shadow, restNames, dataNames, __dev__);
			}
			shadowAssigner = ShadowAssigner(shadow);
		}
		options.render = assertFunction(new Render(Vue3));
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
					return created .call(this);
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
					return created .call(this);
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
					return created .call(this);
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
					return created .call(this);
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
					return created .call(this);
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
	
	if ( options.components ) {
		var components = options.components = assign(create(NULL), options.components);
		for ( var name in components ) {
			if ( __dev__ ) {
				if ( /^(?![A-Z])/.test(name) ) { throw Error$1(__dev__.compile_name); }
			}
			var value = components[name];
			if ( isComponentConstructor(value) ) { components[name] = ToOptions(value, Vue3, __dev__, DID_OPTIONS, TMP_OPTIONS); }
		}
	}
	
	return options;
	
}

var OPTIONS = WeakMap$1 && /*#__PURE__*/function () {
	try {
		return Function$1('WeakMap,Map', '"use strict";\
class EasyMap extends WeakMap{into(key){let sub=this.get(key);sub??this.set(key,sub=new EasyMap);return sub}}EasyMap.prototype.get=WeakMap.prototype.get;EasyMap.prototype.set=WeakMap.prototype.set;\
class StrongMap extends Map{}StrongMap.prototype.get=Map.prototype.get;StrongMap.prototype.set=Map.prototype.set;StrongMap.prototype.forEach=Map.prototype.forEach;\
return{objects:new EasyMap,objectsTmp:StrongMap,supers:new EasyMap,rests:new EasyMap,data:new EasyMap}\
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
	var restNames                    = OPTIONS.rests.get(options);
	if ( !restNames ) {
		if ( constructor ) { restNames = OPTIONS.rests.get(constructor); }
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
		if ( constructor ) { OPTIONS.rests.set(constructor, restNames); }
		OPTIONS.rests.set(options, restNames);
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

function forKeys (option                , callback                        ) {
	if ( isArray(option) ) { option.forEach(callback); }
	else { for ( var key in option ) { callback(key); } }
}
function check (options                                                                        , __dev__         , DID_OPTIONS         , TMP_OPTIONS         ) {
	
	( options.extends ? [ options.extends ] : [] ).concat(options.mixins || []).forEach(function (mixin) {
		DID_OPTIONS.has(mixin) || TMP_OPTIONS.has(mixin) || check(mixin, __dev__, DID_OPTIONS, TMP_OPTIONS);
	});
	
	var restNames = new Set$1        ();
	
	forKeys(options.props, function (name) {
		if ( /-|^(?:key$|[oO][nN]|ref$)/.test(name) ) { throw Error$1(__dev__.compile_props); }
		if ( name in PROTO_BUG ) { throw Error$1(__dev__.proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( restNames.size===restNames.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	});
	
	forKeys(options.inject, function (name) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( restNames.size===restNames.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	});
	
	for ( var name in options.methods ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( restNames.size===restNames.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	}
	
	for ( name in options.computed ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( restNames.size===restNames.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	}
	
	( OPTIONS.data.get(options) || [] ).forEach(function (name) {
		if ( restNames.size===restNames.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	});
	
	if ( restNames.has('constructor') ) { throw Error$1(__dev__.proto); }
	
	[ options.name, options.displayName ].forEach(function (name         ) {
		if ( typeof name==='string'
			? /^(?![A-Z])/.test(name) || options.components && name in options.components
			: name!==undefined$1
		) { throw Error$1(__dev__.compile_name); }
	});
	
	options.emits &&
	( isArray(options.emits) ? options.emits : keys(options.emits) ).forEach(function (event) {
		if ( /[A-Z]|^onvnode|(?:capture|once|passive)$/.test('on' + event) ) { throw Error$1(__dev__.compile_emits); }
	});
	
	if (
		options.directives && 'is' in options.directives// 2
		||//@ts-ignore
		options.props && ( isArray(options.props) ? options.props.includes('is') : 'is' in options.props )// 3
	) { throw Error$1(__dev__.compile_is); }
	
	TMP_OPTIONS.set(options, null);
	
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIi4uLy4uL2xpYi9jc3Mta2V5d29yZHMvZGlzdC5qcyIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9EeW5hbWljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCIuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxNy4wLjQnOyIsImV4cG9ydCBkZWZhdWx0IFtcblx0J2FsbCcsXG5cdCdsYW8nLFxuXHQnYXV0bycsXG5cdCdkaXNjJyxcblx0J25vbmUnLFxuXHQnc3BhbicsXG5cdCd0aGFpJyxcblx0J2tobWVyJyxcblx0J29yaXlhJyxcblx0J3RhbWlsJyxcblx0J3Vuc2V0Jyxcblx0J2NpcmNsZScsXG5cdCdoZWJyZXcnLFxuXHQnaW5saW5lJyxcblx0J3JldmVydCcsXG5cdCdzcXVhcmUnLFxuXHQndGVsdWd1Jyxcblx0J2JlbmdhbGknLFxuXHQnZGVjaW1hbCcsXG5cdCdkZWZhdWx0Jyxcblx0J2luaGVyaXQnLFxuXHQnaW5pdGlhbCcsXG5cdCdrYW5uYWRhJyxcblx0J215YW5tYXInLFxuXHQnb3V0c2lkZScsXG5cdCdwZXJzaWFuJyxcblx0J3RpYmV0YW4nLFxuXHQnYXJtZW5pYW4nLFxuXHQnY29udGVudHMnLFxuXHQnZ2VvcmdpYW4nLFxuXHQnZ3VqYXJhdGknLFxuXHQnZ3VybXVraGknLFxuXHQnaGlyYWdhbmEnLFxuXHQna2F0YWthbmEnLFxuXHQnY2FtYm9kaWFuJyxcblx0J21hbGF5YWxhbScsXG5cdCdtb25nb2xpYW4nLFxuXHQnZGV2YW5hZ2FyaScsXG5cdCdub3RyYW5zbGF0ZScsXG5dOyIsImltcG9ydCBDU1NfS0VZV09SRFMgZnJvbSAnbGliOmNzcy1rZXl3b3Jkcyc7XG5cbnZhciBpbmNyZWFzZURpY3Rpb25hcnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHtcblx0MDogJzEnLCAxOiAnMicsIDI6ICczJywgMzogJzQnLCA0OiAnNScsIDU6ICc2JywgNjogJzcnLCA3OiAnOCcsIDg6ICc5JywgOTogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn07XG52YXIgbGF0ZXN0SWRlbnRpZmllciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyAnOScgXTtcbnZhciBsYXN0Q2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSAnOSc7XG52YXIgbGFzdEluZGV4ICAgICAgICAgPSAwO1xuXG52YXIgY3NzX2tleXdvcmQgICAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRsYXRlc3RJZGVudGlmaWVyLmpvaW4gPSBsYXRlc3RJZGVudGlmaWVyLmpvaW47XG5cdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCA9IGxhdGVzdElkZW50aWZpZXIudW5zaGlmdDtcblx0Q1NTX0tFWVdPUkRTLnNoaWZ0ID0gQ1NTX0tFWVdPUkRTLnNoaWZ0O1xuXHRyZXR1cm4gQ1NTX0tFWVdPUkRTLnNoaWZ0KCkgO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJZGVudGlmaWVyICgpICAgICAgICAge1xuXHRcblx0aWYgKCBsYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIGNoYXJhY3RlckluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIGNoYXJhY3RlckluZGV4ICkge1xuXHRcdFx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyWy0tY2hhcmFjdGVySW5kZXhdO1xuXHRcdFx0XHRpZiAoIGNoYXJhY3Rlcj09PSd6JyApIHsgbGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSAnMCc7IH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbY2hhcmFjdGVyXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhc3RJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3Rlcl07XG5cdH1cblx0XG5cdHZhciBpZGVudGlmaWVyICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRpZiAoIGlkZW50aWZpZXI9PT1jc3Nfa2V5d29yZCApIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXIgICAgICAgICAgICAgXTtcblx0XHRpZGVudGlmaWVyID0gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0XHRjc3Nfa2V5d29yZCA9IENTU19LRVlXT1JEUy5zaGlmdCgpIHx8IG51bGw7XG5cdH1cblx0cmV0dXJuIGlkZW50aWZpZXI7XG5cdFxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJytjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gICAgICA9IFN5bWJvbCA/IC8qI19fUFVSRV9fKi9TeW1ib2woJ18nKSAgICAgICAgOiAnXyc7XG5cbmZ1bmN0aW9uICQgICAgICAgICAgICAgICAgICAoICAgICAgICAgY3NzICAgICAgICAgLCBtZWRpYSAgICAgICAgICkgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSB0aGlzW19dKGNzcyk7IH1cblx0aWYgKCBtZWRpYSE9PXVuZGVmaW5lZCApIHsgc3R5bGUubWVkaWEgPSBtZWRpYTsgfVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCB7IF8sICQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIHByZXBhcmVfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gdHlwZW9mIF89PT0nc3ltYm9sJyA/IG51bGwgOiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR2YXIgX2Rlc2NyaXB0b3IgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgO1xuXHRfZGVzY3JpcHRvci52YWx1ZSA9IG51bGw7XG5cdF9kZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IHRydWU7XG5cdF9kZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSAgICAgICApIHsgZGVmaW5lUHJvcGVydHkoc2NvcGUsIF8sIF9kZXNjcmlwdG9yKTsgfTtcbn0oKTtcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzICAgICAgICAgICkgeyByZXR1cm4gbmV3IFJlZ0V4cCgnX18nICsgZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpICsgJ19fJywgJ2cnKTsgfVxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkgeyByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07IH1cblxudmFyIFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbnZhciBTQ09QRSAgICAgICAgICAgICAgPSBTdGF0aWNTY29wZS5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdCQ6IHsgdmFsdWU6ICQsIHdyaXRhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSxcbn0pICAgICAgICAgICAgICAgKTtcblxudmFyIEluaGVyaXRlZFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfICYmIHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKCAqL1xuXHRcdGtleXNba2V5cy5sZW5ndGhdID0ga2V5LyogKSovO1xuXHR9XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgeyBTdGF0aWNTY29wZSwgU0NPUEUsIEluaGVyaXRlZFN0YXRpY1Njb3BlIH07XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBnZXQgKGNhY2hlICAgICAgICAgICAgICwga2V5ICAgICAgICApICAgICAgICAgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhY2hlICAgICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBrZXlzICAgICAgICAsXG5cdFx0aW5kZXggICAgICAgICxcblx0XHR2YWx1ZXMgICAgICAgICAgLFxuXHRcdGtleSAgICAgICAgO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdldChjYWNoZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gdmFsdWVbLS1pbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGdldChjYWNoZSwga2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlWy0taW5kZXhdLCBjYWNoZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK2dldChjYWNoZSwga2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRpZiAoIGxlbmd0aD4xICkge1xuXHRcdFx0dmFsdWUgPSBbIHZhbHVlLCBhcmd1bWVudHNbMV0gXTtcblx0XHRcdGZvciAoIHZhciBpbmRleCA9IDI7IGluZGV4IT09bGVuZ3RoOyArK2luZGV4ICkgeyAoIHZhbHVlICAgICAgICAgIClbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gc2NvcGlmeSh2YWx1ZSwgY2FjaGUpO1xuXHR9ICAgICAgICAgICAgICAgIDtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGdldChjYWNoZSwgX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZXhwb3J0IHsgRHluYW1pY1Njb3BlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImV4cG9ydCBkZWZhdWx0IC9bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKi9pZzsiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IFN0YXRpY1Njb3BlLCBJbmhlcml0ZWRTdGF0aWNTY29wZSwgU0NPUEUgfSBmcm9tICcuL1N0YXRpY1Njb3BlJztcbmltcG9ydCBEeW5hbWljU2NvcGUgZnJvbSAnLi9EeW5hbWljU2NvcGUnO1xuaW1wb3J0IEtFWVMgZnJvbSAnLi9LRVlTJztcblxudmFyIEVNUFRZICAgICAgICAgICA9IFtdO1xuXG5mdW5jdGlvbiBtaXggKHByb3RvcyAgICAgICAgICkgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlICAgICAgICAgICAgICA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byAgICAgICAgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5mdW5jdGlvbiBTY29wZSAoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICkgICAgICAgIHtcblx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgU3RhdGljU2NvcGUgKSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlICAgICAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gbmV3IFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cbn1cblNjb3BlLnByb3RvdHlwZSA9IG51bGwgICAgICAgO1xuXG5leHBvcnQgeyBTY29wZSBhcyBkZWZhdWx0LCBLRVlTIH07IiwiaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFRlbXBsYXRlIChodG1sICAgICAgICAsIHNjb3BlICAgICAgICkgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovc2NvcGVbX10oaHRtbCk7XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbnZhciBOT1RfRVM1ID0gL14oY29uc3xsZSl0IC87XG5cbmZ1bmN0aW9uIFdpdGhTdHJpcHBlZCAocmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0cmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlO1xuXHRyZXR1cm4gcmVuZGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXIgKGNvZGUgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdHJldHVybiBjb2RlWzBdPT09JygnXG5cdFx0PyAvKiNfX1BVUkVfXyovRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybiBjbGFzcyBSZW5kZXIgZXh0ZW5kcyBudWxse2NvbnN0cnVjdG9yJysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9OycpKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0OiAvKiNfX1BVUkVfXyovV2l0aFN0cmlwcGVkKFxuXHRcdFx0LyojX19QVVJFX18qL0Z1bmN0aW9uKE5PVF9FUzUudGVzdChjb2RlKVxuXHRcdFx0XHQ/ICdcInVzZSBzdHJpY3RcIjtyZXR1cm57cmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9fS5yZW5kZXI7J1xuXHRcdFx0XHQ6ICdcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24gcmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9Oydcblx0XHRcdCkoKSAgICAgICAgICBcblx0XHQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGNvZGVzLmxlbmd0aDtcblx0dmFyIGJvZHkgICAgICAgICA9ICddJztcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4OyApIHsgYm9keSA9ICdmdW5jdGlvbigpeycrc2NvcGVfKGNvZGVzWy0taW5kZXhdKSsnfSwnK2JvZHk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHR3aGlsZSAoIGluZGV4ICkgeyBib2R5ID0gJ2Z1bmN0aW9uKCl7Jytjb2Rlc1stLWluZGV4XSsnfSwnK2JvZHk7IH1cblx0fVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVyblsnK2JvZHkpKCk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHlsZSAoY3NzICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBSZWZsZWN0IT09J3VuZGVmaW5lZCcgJiYgUmVmbGVjdC5nZXRQcm90b3R5cGVPZiE9PXVuZGVmaW5lZCA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiAvKiNfX1BVUkVfXyovIE9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgcHJvcGVydHlJc0VudW1lcmFibGUgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmV4cG9ydCB2YXIgdGhhdCAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvU3ltYm9scyAoc2VsZiAgICAgICAgICwgc3ltYm9sTWV0aG9kcyAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdGRlZmluZVByb3BlcnRpZXMoXyA/IF8uY3R4IDogc2VsZiwgc3ltYm9sTWV0aG9kcyk7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvQ29uc3RydWN0b3IgKHNlbGYgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgICAgICAgICAgICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHN5bWJvbE1ldGhvZHMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHN5bWJvbE1ldGhvZHMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvTmFtZXMgKHNlbGYgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgICAgICAgICAgICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCBkYXRhTmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHN5bWJvbE1ldGhvZHMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHN5bWJvbE1ldGhvZHMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHR2YXIgZGF0YSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGRhdGFOYW1lcykgICAgICAgIDtcblx0aWYgKCBfICkge1xuXHRcdHZhciBhY2Nlc3NDYWNoZSA9IF8uYWNjZXNzQ2FjaGU7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gZGF0YU5hbWVzICkge1xuXHRcdFx0ZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdO1xuXHRcdFx0aWYgKCBuYW1lIGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtuYW1lICAgICAgICAgICAgICAgICBdID0gdW5kZWZpbmVkOyB9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGZvciAoIG5hbWUgaW4gZGF0YU5hbWVzICkgeyBkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07IH1cblx0fVxuXHRzaGFkb3dBc3NpZ25lciAmJiBzaGFkb3dBc3NpZ25lcihzZWxmLCBkYXRhKTtcblx0cmV0dXJuIGRhdGE7XG5cdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvRGF0YSAoc2VsZiAgICAgICAgICwgc3ltYm9sTWV0aG9kcyAgICAgICAgICAgICAgICAgICAgICAsIGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIHJlc3ROYW1lcyAgICAgICAsIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0c3ltYm9sTWV0aG9kcyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgc3ltYm9sTWV0aG9kcyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdHZhciBkYXRhID0gY3JlYXRlKE5VTEwpICAgICAgICA7XG5cdGlmICggXyApIHtcblx0XHR2YXIgYWNjZXNzQ2FjaGUgPSBfLmFjY2Vzc0NhY2hlO1xuXHRcdGZvciAoIHZhciBuYW1lIGluIGN0eCApIHtcblx0XHRcdGlmICggISggbmFtZSBpbiByZXN0TmFtZXMgKSApIHtcblx0XHRcdFx0ZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdO1xuXHRcdFx0XHRpZiAoIG5hbWUgaW4gYWNjZXNzQ2FjaGUgKSB7IGFjY2Vzc0NhY2hlW25hbWUgICAgICAgICAgICAgICAgIF0gPSB1bmRlZmluZWQ7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmFyIG5vd05hbWVzID0gS2V5cyhjdHgpO1xuXHRcdHZhciBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PW5vd05hbWVzLmxlbmd0aCApIHtcblx0XHRcdG5hbWUgPSBub3dOYW1lc1tpbmRleCsrXTtcblx0XHRcdGlmICggISggbmFtZSBpbiByZXN0TmFtZXMgKSApIHsgZGF0YVtuYW1lXSA9IGN0eFtuYW1lICAgICAgICAgICAgICAgICBdOyB9XG5cdFx0fVxuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZEYXRhIChzZWxmICAgICAgICAgLCBzeW1ib2xNZXRob2RzICAgICAgICAgICAgICAgICAgICAgICwgY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgc2tpcERhdGEgICAgICAgICAsIGRhdGFOYW1lcyAgICAgICAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgLCBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBza2lwQ29uc3RydWN0b3IgICAgICAgICAsIF9fZGV2X18gICAgICAgICApIHtcblx0XG5cdHZhciBfID0gc2VsZi5fO1xuXHR2YXIgY3R4ID0gXyA/IF8uY3R4IDogc2VsZjtcblx0dmFyIG9sZERlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhjdHgpLCBzeW1ib2xNZXRob2RzKTtcblx0c3ltYm9sTWV0aG9kcyAmJiBkZWZpbmVQcm9wZXJ0aWVzKGN0eCwgc3ltYm9sTWV0aG9kcyk7XG5cdFxuXHR2YXIgcHJldmlvdXMgPSB0aGF0O1xuXHR0aGF0ID0gc2VsZjtcblx0dHJ5IHsgbmV3IGNvbnN0cnVjdG9yKFZ1ZTMpOyB9XG5cdGZpbmFsbHkgeyB0aGF0ID0gcHJldmlvdXM7IH1cblx0XG5cdG93bktleXMob2xkRGVzY3JpcHRvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciBvbGREZXNjcmlwdG9yID0gb2xkRGVzY3JpcHRvcnNba2V5XSA7XG5cdFx0dmFyIG5ld0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBrZXkgICAgICAgICAgICAgICAgICk7XG5cdFx0aWYgKFxuXHRcdFx0IW5ld0Rlc2NyaXB0b3IgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlIT09b2xkRGVzY3JpcHRvci5jb25maWd1cmFibGUgfHxcblx0XHRcdG5ld0Rlc2NyaXB0b3IuZW51bWVyYWJsZSE9PW9sZERlc2NyaXB0b3IuZW51bWVyYWJsZSB8fFxuXHRcdFx0KCBuZXdEZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpXG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0PyBuZXdEZXNjcmlwdG9yLnZhbHVlIT09b2xkRGVzY3JpcHRvci52YWx1ZSB8fCBuZXdEZXNjcmlwdG9yLndyaXRhYmxlIT09b2xkRGVzY3JpcHRvci53cml0YWJsZVxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdDogbmV3RGVzY3JpcHRvci5nZXQhPT1vbGREZXNjcmlwdG9yLmdldCB8fCBuZXdEZXNjcmlwdG9yLnNldCE9PW9sZERlc2NyaXB0b3Iuc2V0XG5cdFx0XHQpXG5cdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZWRlZmluZWQpOyB9XG5cdH0pO1xuXHR2YXIgZGlmS2V5cyA9IG93bktleXMoY3R4KS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdHJldHVybiAhKCBrZXkgaW4gb2xkRGVzY3JpcHRvcnMgKTtcblx0fSk7XG5cdGlmICggc2tpcENvbnN0cnVjdG9yIHx8IHNraXBEYXRhICkge1xuXHRcdGlmICggZGlmS2V5cy5sZW5ndGggKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9kYXRhKTsgfVxuXHR9XG5cdGlmICggZGF0YU5hbWVzICkge1xuXHRcdHZhciBjb3VudCA9IDA7XG5cdFx0Zm9yICggdmFyIGtleSBpbiBkYXRhTmFtZXMgKSB7ICsrY291bnQ7IH1cblx0XHRpZiAoIGNvdW50IT09ZGlmS2V5cy5sZW5ndGggKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9kYXRhKTsgfVxuXHRcdGRpZktleXMuZm9yRWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoICEoIGtleSBpbiBkYXRhTmFtZXMgKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2RhdGEpOyB9XG5cdFx0fSk7XG5cdH1cblx0ZGlmS2V5cy5mb3JFYWNoKGZ1bmN0aW9uICggICAgICAgICAgICAgIGtleSkge1xuXHRcdGlmICgga2V5IGluIHRoaXMgJiYgISgga2V5IGluIHt9ICkgfHwga2V5IGluIHJlc3ROYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3JlZGVmaW5lZCk7IH1cblx0XHRpZiAoIHR5cGVvZiBrZXk9PT0nc3ltYm9sJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3N5bWJvbCk7IH1cblx0XHRpZiAoIGtleVswXT09PSdfJyB8fCBrZXlbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZXNlcnZlZCk7IH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRpZiAoIGtleT09PSdjb25zdHJ1Y3RvcicgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChjdHgsIGtleSkpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX2VudW1lcmFibGUpOyB9XG5cdH0sIGdldFByb3RvdHlwZU9mKGN0eCkpO1xuXHRcblx0dmFyIGRhdGEgPSBjcmVhdGUoTlVMTCkgICAgICAgIDtcblx0ZGlmS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHQoIGRhdGEgICAgICAgICApW2tleV0gPSBjdHhba2V5XTtcblx0XHRpZiAoIF8gJiYga2V5IGluIF8uYWNjZXNzQ2FjaGUgKSB7IF8uYWNjZXNzQ2FjaGVba2V5XSA9IHVuZGVmaW5lZDsgfVxuXHR9KTtcblx0aWYgKCBzaGFkb3dBc3NpZ25lciApIHtcblx0XHRzaGFkb3dDaGVja2VyIChkYXRhKTtcblx0XHRzaGFkb3dBc3NpZ25lcihzZWxmLCBkYXRhKTtcblx0fVxuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBJTklUID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIElOSVQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICA7XG5cdElOSVQubW9kZSA9ICdvcGVuJztcblx0cmV0dXJuIElOSVQ7XG59KCk7XG5cbmZ1bmN0aW9uIGF0dGFjaCAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGVsICYmICggZWwuc2hhZG93Um9vdCB8fCBlbC5hdHRhY2hTaGFkb3coSU5JVCkgKTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93QXNzaWduZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0dmFyIG5hbWVzID0gaW5kZXg8MCA/IG51bGwgOiBhbG9uZy5zbGljZShpbmRleCArIDEpLnNwbGl0KCcuJyk7XG5cdHZhciB0b05hbWUgPSBuYW1lcyA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIG5hbWVzICkge1xuXHRcdGlmICggbmFtZXMubGVuZ3RoPT09MSApIHtcblx0XHRcdHZhciBuYW1lJGdldCA9IG5hbWVzWzBdICsgJyRnZXQnO1xuXHRcdFx0dmFyIG5hbWUkc2V0ID0gbmFtZXNbMF0gKyAnJHNldCc7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0YWxsW25hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0YWxsW25hbWUkZ2V0XSA9IG51bGw7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdG5hbWVzIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICApIHtcblx0XHRcdFx0XHRhbGxbbmFtZSArICckc2V0J10gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWVdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0XHRhbGxbbmFtZSArPSAnJGdldCddID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gdG9OYW1lICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gdG9OYW1lICsgJyRzZXQnO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgLCBkYXRhICAgICApIHtcblx0XHRcdGRhdGFbdG9OYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdGRhdGFbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dDaGVja2VyICggICAgICAgICAgICBhbG9uZyAgICAgICAgLCByZXN0TmFtZXMgICAgICAgLCBkYXRhTmFtZXMgICAgICAgICAgICAgICwgX19kZXZfXyAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRpZiAoIGFsb25nWzBdPT09J18nIHx8IGFsb25nWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHR2YXIgaW5kZXggPSBhbG9uZy5pbmRleE9mKCcuJyk7XG5cdGlmICggaW5kZXg8MCApIHtcblx0XHR2YXIgdG9OYW1lJGdldCA9IGFsb25nLnNsaWNlKDAsIGluZGV4KSArICckZ2V0Jztcblx0XHR2YXIgdG9OYW1lJHNldCA9IGFsb25nLnNsaWNlKDAsIGluZGV4KSArICckc2V0Jztcblx0XHRpZiAoIHRvTmFtZSRnZXQgaW4gcmVzdE5hbWVzIHx8IHRvTmFtZSRzZXQgaW4gcmVzdE5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdGlmICggZGF0YU5hbWVzICkge1xuXHRcdFx0aWYgKCB0b05hbWUkZ2V0IGluIGRhdGFOYW1lcyB8fCB0b05hbWUkc2V0IGluIGRhdGFOYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBkYXRhICAgICAgKSB7XG5cdFx0XHRpZiAoIHRvTmFtZSRnZXQgaW4gZGF0YSB8fCB0b05hbWUkc2V0IGluIGRhdGEgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9zaGFkb3cpOyB9XG5cdFx0fTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGFsb25nPT09J2NvbnN0cnVjdG9yJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XHRpZiAoIGFsb25nIGluIHJlc3ROYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRpZiAoIGRhdGFOYW1lcyApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YU5hbWVzICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc2hhZG93KTsgfVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggYWxvbmcgaW4gZGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3NoYWRvdyk7IH1cblx0XHR9O1xuXHR9XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBTZXQgZnJvbSAnLlNldD8nO1xuaW1wb3J0IE1hcCBmcm9tICcuTWFwPyc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcD8nO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGdldFByb3RvdHlwZU9mIGZyb20gJy5SZWZsZWN0LmdldFByb3RvdHlwZU9mPz1PYmplY3QuZ2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gJy5PYmplY3Quc2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IGdldE93blByb3BlcnR5U3ltYm9scyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scz8nO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBnZXQgZnJvbSAnLlJlZmxlY3QuZ2V0Pyc7XG5pbXBvcnQgYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHk/JztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24/JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGtleXMgZnJvbSAnLk9iamVjdC5rZXlzJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IFBST1RPX0JVRyBmcm9tICcuT2JqZWN0LnByb3RvdHlwZSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IGlzUHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgdGhhdCwgcHJvU3ltYm9scywgcHJvQ29uc3RydWN0b3IsIHByb05hbWVzLCBwcm9EYXRhLCBkZXZEYXRhIH0gZnJvbSAnLi9EYXRhJztcbmltcG9ydCB7IFNoYWRvd0Fzc2lnbmVyLCBTaGFkb3dDaGVja2VyIH0gZnJvbSAnLi9TaGFkb3cnO1xuXG5leHBvcnQgeyBDb21wb25lbnQgYXMgZGVmYXVsdCB9O1xudmFyIENvbXBvbmVudCAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZnJlZXplKC8qI19fUFVSRV9fKi9kZWZpbmVQcm9wZXJ0aWVzKFxuXHRmdW5jdGlvbiBDb21wb25lbnQgKCkgeyByZXR1cm4gdGhhdDsgfSxcblx0e1xuXHRcdHByb3RvdHlwZToge1xuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IC8qI19fUFVSRV9fKi9mcmVlemUoY3JlYXRlKG51bGwsIHtcblx0XHRcdFx0X3JlbmRlcjoge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0XHRcdGdldDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24gX3JlbmRlciAoICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICAgICAgICApIHsgKCB0aGlzLl8gfHwgdGhpcy4kb3B0aW9ucyApLnJlbmRlciA9IHZhbHVlOyB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSkpLFxuXHRcdH0sXG5cdFx0cmVuZGVyOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogdW5kZWZpbmVkLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiByZW5kZXIgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgKSB7ICggdGhhdCAuXyB8fCB0aGF0IC4kb3B0aW9ucyApLnJlbmRlciA9IHZhbHVlOyB9LFxuXHRcdH0sXG5cdFx0Xzoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gdG9PcHRpb25zICggICAgICAgICAgICAgICAgVnVlMyAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0aWYgKCAhaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih0aGlzKSApIHsgdGhyb3cgRXJyb3IoJyEoIHRoaXMgZXh0ZW5kcyBDb21wb25lbnQgKS5fKCknKTsgfVxuXHRcdFx0XHR2YXIgRElEX09QVElPTlMgPSBPUFRJT05TLm9iamVjdHMuaW50byhfX2Rldl9fIHx8IE9QVElPTlMgICAgICAgKS5pbnRvKFZ1ZTMgfHwgT1BUSU9OUyAgICAgICApO1xuXHRcdFx0XHR2YXIgVE1QX09QVElPTlMgPSBuZXcgT1BUSU9OUy5vYmplY3RzVG1wO1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IFRvT3B0aW9ucyhcblx0XHRcdFx0XHR0aGlzLFxuXHRcdFx0XHRcdFZ1ZTMgfHwgdW5kZWZpbmVkLFxuXHRcdFx0XHRcdF9fZGV2X18gPyBERVYucmVkdWNlKGZ1bmN0aW9uIERldiAoZGV2LCBrZXkpIHtcblx0XHRcdFx0XHRcdGRldltrZXldID0gX19kZXZfXyBba2V5XSB8fCBrZXk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGV2O1xuXHRcdFx0XHRcdH0sIGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLFxuXHRcdFx0XHRcdERJRF9PUFRJT05TLFxuXHRcdFx0XHRcdFRNUF9PUFRJT05TXG5cdFx0XHRcdCk7XG5cdFx0XHRcdFRNUF9PUFRJT05TLmZvckVhY2ggKGZ1bmN0aW9uIChvcHRpb25zVmFsdWUsIGNvbnN0cnVjdG9yS2V5KSB7IERJRF9PUFRJT05TLnNldChjb25zdHJ1Y3RvcktleSwgb3B0aW9uc1ZhbHVlKTsgfSk7XG5cdFx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdFx0fSxcblx0XHR9LFxuXHR9XG4pKTtcblxudmFyIF9taXhpbnMgICAgICAgICAgICAgICAgPSBTeW1ib2wgJiYgLyojX19QVVJFX18qL1N5bWJvbCgnX21peGlucycpICAgICAgICAgICAgICAgICA7XG5cbnZhciBfX1BVUkVfXyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdHRyeSB7IHJldHVybiBGdW5jdGlvbignQ29tcG9uZW50LF9taXhpbnMnLCAnXCJ1c2Ugc3RyaWN0XCI7cmV0dXJuKC4uLm1peGlucyk9PmNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e2NvbnN0cnVjdG9yKCl7cmV0dXJuIENvbXBvbmVudCgpfXN0YXRpYyBnZXRbX21peGluc10oKXtyZXR1cm4gbWl4aW5zfX0nKShDb21wb25lbnQsIF9taXhpbnMpOyB9XG5cdGNhdGNoIChlcnJvcikge31cbn0oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1peGluICggICAgICAgICAgKSB7XG5cdHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG5cdFx0PyAvKiNfX1BVUkVfXyovYXBwbHkoX19QVVJFX18sIG51bGwsIGFyZ3VtZW50cyAgICAgICApXG5cdFx0OiBDb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIFRvT3B0aW9ucyAoY29uc3RydWN0b3IgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAsIERJRF9PUFRJT05TICAgICAgICAgLCBUTVBfT1BUSU9OUyAgICAgICAgICkgICAgICAgICAgICAge1xuXHRcblx0dmFyIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgPSBESURfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpIHx8IFRNUF9PUFRJT05TLmdldChjb25zdHJ1Y3Rvcik7XG5cdGlmICggb3B0aW9ucyApIHsgcmV0dXJuIG9wdGlvbnM7IH1cblx0b3B0aW9ucyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgO1xuXHRcblx0aWYgKCBpc01peGlucyhjb25zdHJ1Y3RvcikgKSB7XG5cdFx0dmFyIHN0YXRpY19taXhpbnMgPSBjb25zdHJ1Y3RvcltfbWl4aW5zXSA7XG5cdFx0dmFyIG1peGlucyA9IG9wdGlvbnMubWl4aW5zID0gW10gICAgICAgICAgICAgICAgO1xuXHRcdHZhciBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBtaXhpbnMubGVuZ3RoIT09c3RhdGljX21peGlucy5sZW5ndGggKSB7XG5cdFx0XHR2YXIgbWl4aW4gPSBzdGF0aWNfbWl4aW5zW2luZGV4KytdO1xuXHRcdFx0aWYgKCBpc0NvbXBvbmVudENvbnN0cnVjdG9yKG1peGluKSApIHtcblx0XHRcdFx0dmFyIG1peGluT3B0aW9ucyA9IFRvT3B0aW9ucyhtaXhpbiwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRcdFx0aWYgKCBpc01peGlucyhtaXhpbikgKSB7XG5cdFx0XHRcdFx0dmFyIG1peGluTWl4aW5zID0gbWl4aW5PcHRpb25zLm1peGlucyA7XG5cdFx0XHRcdFx0dmFyIG1peGluSW5kZXggPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggbWl4aW5JbmRleCE9PW1peGluTWl4aW5zLmxlbmd0aCApIHsgbWl4aW5zW21peGlucy5sZW5ndGhdID0gbWl4aW5NaXhpbnNbbWl4aW5JbmRleCsrXTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgeyBtaXhpbnNbbWl4aW5zLmxlbmd0aF0gPSBtaXhpbk9wdGlvbnM7IH1cblx0XHRcdH1cblx0XHRcdGVsc2UgeyBtaXhpbnNbbWl4aW5zLmxlbmd0aF0gPSBtaXhpbiAgICAgICAgICAgICAgOyB9XG5cdFx0fVxuXHRcdF9fZGV2X18gJiYgY2hlY2sob3B0aW9ucywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRjb2xsZWN0TmFtZXMob3B0aW9ucywgY29uc3RydWN0b3IpO1xuXHRcdFRNUF9PUFRJT05TLnNldChjb25zdHJ1Y3Rvciwgb3B0aW9ucyk7XG5cdFx0cmV0dXJuIG9wdGlvbnM7XG5cdH1cblx0XG5cdHZhciBTdXBlciA9IE9QVElPTlMuc3VwZXJzLmdldChjb25zdHJ1Y3Rvcik7XG5cdGlmICggIVN1cGVyICkge1xuXHRcdE9QVElPTlMuc3VwZXJzLnNldChjb25zdHJ1Y3RvciwgU3VwZXIgPSBnZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvcikpO1xuXHRcdFN1cGVyPT09Q29tcG9uZW50IHx8IGlzTWl4aW5zKFN1cGVyKSB8fCBzZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvciwgQ29tcG9uZW50KTtcblx0fVxuXHRpZiAoIFN1cGVyIT09Q29tcG9uZW50ICkge1xuXHRcdHZhciBTdXBlck9wdGlvbnMgPSBUb09wdGlvbnMoU3VwZXIsIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7XG5cdFx0aXNNaXhpbnMoU3VwZXIpXG5cdFx0XHQ/IG9wdGlvbnMubWl4aW5zIC5sZW5ndGg9PT0xXG5cdFx0XHQ/IG9wdGlvbnMuZXh0ZW5kcyA9IFN1cGVyT3B0aW9ucy5taXhpbnMgWzBdXG5cdFx0XHQ6IG9wdGlvbnMubWl4aW5zID0gU3VwZXJPcHRpb25zLm1peGluc1xuXHRcdFx0OiBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnM7XG5cdH1cblx0XG5cdF9fZGV2X18gJiYgZ2V0T3duUHJvcGVydHlTeW1ib2xzKGNvbnN0cnVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChzeW1ib2wpIHtcblx0XHRpZiAoIHN5bWJvbCE9PV9taXhpbnMgJiYgISggc3ltYm9sIGluIFNZTUJPTFMgKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3N5bWJvbCk7IH1cblx0fSk7XG5cdFxuXHR2YXIgc2V0ICAgICAgICAgICAgICAgID0gX19kZXZfXyA/IGRldlNldC5iaW5kKF9fZGV2X18pIDogcHJvU2V0O1xuXHR2YXIgYXNzZXJ0RnVuY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZBc3NlcnRGdW5jdGlvbi5iaW5kKF9fZGV2X18pIDogcHJvQXNzZXJ0RnVuY3Rpb247XG5cdFxuXHR2YXIgc3RhdGljTmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKGNvbnN0cnVjdG9yKTtcblx0aW5kZXggPSBzdGF0aWNOYW1lcy5sZW5ndGg7XG5cdHZhciBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGZhbHNlO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBzdGF0aWNOYW1lID0gc3RhdGljTmFtZXNbLS1pbmRleF07XG5cdFx0aWYgKCBzdGF0aWNOYW1lPT09J1JlbmRlcicgKSB7IHZhciBSZW5kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSAgICAgICAgICAgICAgICAgICAgICAgOyB9XG5cdFx0Ly9AdHMtaWdub3JlXG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWU9PT0nbmFtZScgfHwgc3RhdGljTmFtZT09PSdsZW5ndGgnICkge1xuXHRcdFx0ZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25zdHJ1Y3Rvciwgc3RhdGljTmFtZSk7XG5cdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdGRlc2NyaXB0b3IuZW51bWVyYWJsZSAmJiBzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGFwcGx5KGRlc2NyaXB0b3IuZ2V0ICwgY29uc3RydWN0b3IsIEFSR1MpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWU9PT0nZGF0YScgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdGlmICggY29uc3RydWN0b3Jbc3RhdGljTmFtZV0hPT11bmRlZmluZWQgKSB7IHRocm93IEVycm9yKGlzQXJyYXkoY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pID8gX19kZXZfXy5jb21waWxlX2xheW91dCA6IF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0fVxuXHRcdFx0c2tpcENvbnN0cnVjdG9yID0gdHJ1ZTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWUhPT0ncHJvdG90eXBlJyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBzdGF0aWNOYW1lWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J3NldHVwJyB8fCBzdGF0aWNOYW1lPT09J3dhdGNoJyB8fCBzdGF0aWNOYW1lPT09J21ldGhvZHMnIHx8IHN0YXRpY05hbWU9PT0nY29tcHV0ZWQnIHx8IHN0YXRpY05hbWU9PT0nZXh0ZW5kcycgfHwgc3RhdGljTmFtZT09PSdtaXhpbnMnIHx8XG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdiZWZvcmVDcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2NyZWF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlTW91bnQnIHx8IHN0YXRpY05hbWU9PT0nbW91bnRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVVcGRhdGUnIHx8IHN0YXRpY05hbWU9PT0ndXBkYXRlZCcgfHwgc3RhdGljTmFtZT09PSdhY3RpdmF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nZGVhY3RpdmF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVW5tb3VudCcgfHwgc3RhdGljTmFtZT09PSd1bm1vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlRGVzdHJveScgfHwgc3RhdGljTmFtZT09PSdkZXN0cm95ZWQnIHx8XG5cdFx0XHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRcdFx0c3RhdGljTmFtZT09PSdpbmplY3QnIHx8IHN0YXRpY05hbWU9PT0ncHJvcHMnXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbGF5b3V0KTsgfVxuXHRcdFx0fVxuXHRcdFx0Ly9AdHMtaWdub3JlXG5cdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgY29uc3RydWN0b3Jbc3RhdGljTmFtZV0pO1xuXHRcdH1cblx0fVxuXHRcblx0dmFyIHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcblx0XG5cdHZhciBwcm90b05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpO1xuXHRpbmRleCA9IHByb3RvTmFtZXMubGVuZ3RoO1xuXHR2YXIgd2F0Y2hlcnMgICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2tpcERhdGEgPSBmYWxzZTtcblx0dmFyIGRhdGFOYW1lcyAgICAgICAgICAgICAgID0gbnVsbDtcblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIgcHJvdG9OYW1lID0gcHJvdG9OYW1lc1stLWluZGV4XTtcblx0XHRpZiAoIHByb3RvTmFtZT09PSdfZGF0YScgKSB7XG5cdFx0XHR2YXIgX2RhdGEgPSBnZXQocHJvdG90eXBlLCBwcm90b05hbWUsIHVuZGVmaW5lZCk7XG5cdFx0XHRpZiAoIF9kYXRhICkge1xuXHRcdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdFx0aWYgKCAhaXNBcnJheShfZGF0YSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV90eXBlKTsgfVxuXHRcdFx0XHRcdF9kYXRhLmZvckVhY2goZnVuY3Rpb24gKGVhY2gpIHtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIGVhY2ghPT0nc3RyaW5nJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aWYgKCBza2lwQ29uc3RydWN0b3IgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0T1BUSU9OUy5kYXRhLnNldChvcHRpb25zLCBfZGF0YSk7XG5cdFx0XHRcdHZhciBsZW5ndGggPSBfZGF0YS5sZW5ndGg7XG5cdFx0XHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0XHRcdGRhdGFOYW1lcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHRcdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRcdFx0ZG8geyBkYXRhTmFtZXNbX2RhdGFbaV1dID0gbnVsbDsgfVxuXHRcdFx0XHRcdHdoaWxlICggKytpIT09bGVuZ3RoICk7XG5cdFx0XHRcdFx0ZGF0YU5hbWVzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZGF0YU5hbWVzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRza2lwRGF0YSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdFx0aWYgKCBfZGF0YSE9PXVuZGVmaW5lZCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3R5cGUpOyB9XG5cdFx0XHRcdFx0aWYgKCBza2lwQ29uc3RydWN0b3IgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2tpcENvbnN0cnVjdG9yID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHByb3RvTmFtZVswXT09PSdfJyAmJiAhcHJvdG9OYW1lLnN0YXJ0c1dpdGgoJ193YXRjaDonKSApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0dmFyIHByb3RvTmFtZTEgPSBwcm90b05hbWUuc2xpY2UoMSk7XG5cdFx0XHRcdGlmICggcHJvdG9OYW1lMVswXT09PSdfJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdzZXR1cCcgfHwgcHJvdG9OYW1lMT09PSd3YXRjaCcgfHwgcHJvdG9OYW1lMT09PSdtZXRob2RzJyB8fCBwcm90b05hbWUxPT09J2NvbXB1dGVkJyB8fCBwcm90b05hbWUxPT09J2V4dGVuZHMnIHx8IHByb3RvTmFtZTE9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZW1pdHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcG9uZW50cycgfHwgcHJvdG9OYW1lMT09PSdkaXJlY3RpdmVzJyB8fCBwcm90b05hbWUxPT09J3N0YXRpY1JlbmRlckZucycgfHwgcHJvdG9OYW1lMT09PSd0ZW1wbGF0ZScgfHwgcHJvdG9OYW1lMT09PSdpbmhlcml0QXR0cnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSduYW1lJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nUmVuZGVyJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZGVsaW1pdGVycycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2ZpbHRlcnMnIHx8IHByb3RvTmFtZTE9PT0nY29tbWVudHMnIHx8IHByb3RvTmFtZTE9PT0nZnVuY3Rpb25hbCcgfHwgcHJvdG9OYW1lMT09PSdwcm9wc0RhdGEnIHx8IHByb3RvTmFtZTE9PT0nbW9kZWwnXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbGF5b3V0KTsgfVxuXHRcdFx0fVxuXHRcdFx0c2V0KG9wdGlvbnMsIHByb3RvTmFtZS5zbGljZSgxKSwgZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvdG9OYW1lKTtcblx0XHRcdGlmICggcHJvdG9OYW1lWzBdPT09J18nICkge1xuXHRcdFx0XHR2YXIgaW5kZXhPZlEgPSBwcm90b05hbWUuc2VhcmNoKFdBVENIX09QVElPTlMpO1xuXHRcdFx0XHR2YXIgd2F0Y2hlciA9IHdhdGNoZXJzW3dhdGNoZXJzLmxlbmd0aF0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgIDtcblx0XHRcdFx0aWYgKCBkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdFx0XHRcdHdhdGNoZXIuJCA9IGluZGV4T2ZRPDBcblx0XHRcdFx0XHRcdD8gcHJvdG9OYW1lLnNsaWNlKDcpXG5cdFx0XHRcdFx0XHQ6IHByb3RvTmFtZS5zbGljZSg3LCBpbmRleE9mUSk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5nZXQpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3Iuc2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGluZGV4T2ZRPjAgKSB7XG5cdFx0XHRcdFx0KytpbmRleE9mUTtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkEgPSBwcm90b05hbWUuaW5kZXhPZignOycsIGluZGV4T2ZRKTtcblx0XHRcdFx0XHRcdHZhciBwYWlyID0gaW5kZXhPZkE8MFxuXHRcdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSlcblx0XHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEsIGluZGV4T2ZBKTtcblx0XHRcdFx0XHRcdGluZGV4T2ZRID0gaW5kZXhPZkEgKyAxO1xuXHRcdFx0XHRcdFx0dmFyIGluZGV4T2ZFID0gcGFpci5pbmRleE9mKCc9Jyk7XG5cdFx0XHRcdFx0XHRpbmRleE9mRTwwXG5cdFx0XHRcdFx0XHRcdD8gd2F0Y2hlcltwYWlyXSA9IHRydWVcblx0XHRcdFx0XHRcdFx0OiB3YXRjaGVyW3BhaXIuc2xpY2UoMCwgaW5kZXhPZkUpXSA9IHBhaXIuc2xpY2UoaW5kZXhPZkUgKyAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2hpbGUgKCBpbmRleE9mUSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggcHJvdG9OYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdFx0XHRcdGlmICggcHJvdG9OYW1lIT09J2NvbnN0cnVjdG9yJyB8fCBkZXNjcmlwdG9yLnZhbHVlIT09Y29uc3RydWN0b3IgKSB7XG5cdFx0XHRcdFx0XHQoIG9wdGlvbnMubWV0aG9kcyB8fCAoIG9wdGlvbnMubWV0aG9kcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCggb3B0aW9ucy5jb21wdXRlZCB8fCAoIG9wdGlvbnMuY29tcHV0ZWQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSApW3Byb3RvTmFtZV0gPSBkZXNjcmlwdG9yLnNldCA/IHtcblx0XHRcdFx0XHRcdGdldDogZGVzY3JpcHRvci5nZXQsXG5cdFx0XHRcdFx0XHRzZXQ6IGRlc2NyaXB0b3Iuc2V0XG5cdFx0XHRcdFx0fSA6IGRlc2NyaXB0b3IuZ2V0ICAgICAgIDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0X19kZXZfXyAmJiBjaGVjayhvcHRpb25zLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcblx0dmFyIHJlc3ROYW1lcyA9IGNvbGxlY3ROYW1lcyhvcHRpb25zLCBjb25zdHJ1Y3Rvcik7XG5cdFxuXHRpZiAoIFJlbmRlciAmJiBWdWUzICkge1xuXHRcdHZhciBzaGFkb3cgPSBSZW5kZXIuc2hhZG93O1xuXHRcdGlmICggc2hhZG93ICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIHNraXBDb25zdHJ1Y3RvciAmJiBza2lwRGF0YSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0XHRcdFx0dmFyIHNoYWRvd0NoZWNrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBTaGFkb3dDaGVja2VyKHNoYWRvdywgcmVzdE5hbWVzLCBkYXRhTmFtZXMsIF9fZGV2X18pO1xuXHRcdFx0fVxuXHRcdFx0c2hhZG93QXNzaWduZXIgPSBTaGFkb3dBc3NpZ25lcihzaGFkb3cpO1xuXHRcdH1cblx0XHRvcHRpb25zLnJlbmRlciA9IGFzc2VydEZ1bmN0aW9uKG5ldyBSZW5kZXIoVnVlMykpO1xuXHR9XG5cdFxuXHR2YXIgcHJvdG9TeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3RvdHlwZSkgICAgICAgICAgICAgICAgICAgO1xuXHRpbmRleCA9IHByb3RvU3ltYm9scy5sZW5ndGg7XG5cdHZhciBzeW1ib2xNZXRob2RzID0gaW5kZXggPyBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBwcm90b1N5bWJvbCAgICAgICAgICAgICAgICA9IHByb3RvU3ltYm9sc1stLWluZGV4XTtcblx0XHRzeW1ib2xNZXRob2RzIFtwcm90b1N5bWJvbF0gPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBwcm90b1N5bWJvbCkpO1xuXHR9XG5cdFxuXHRpZiAoIF9fZGV2X18gKSB7IG9wdGlvbnMuZGF0YSA9IGZ1bmN0aW9uIChzZWxmICAgICAgKSB7IHJldHVybiBkZXZEYXRhKHNlbGYgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcywgY29uc3RydWN0b3IsIFZ1ZTMsIHNraXBEYXRhLCBkYXRhTmFtZXMsIHJlc3ROYW1lcywgc2hhZG93QXNzaWduZXIsIHNoYWRvd0NoZWNrZXIsIHNraXBDb25zdHJ1Y3RvciwgX19kZXZfXyk7IH07IH1cblx0ZWxzZSBpZiAoIHNraXBDb25zdHJ1Y3RvciB8fCBza2lwRGF0YSApIHt9XG5cdGVsc2UgaWYgKCBkYXRhTmFtZXMgKSB7IG9wdGlvbnMuZGF0YSA9IGZ1bmN0aW9uIChzZWxmICAgICAgKSB7IHJldHVybiBwcm9OYW1lcyhzZWxmICAgICAgICAgICAsIHN5bWJvbE1ldGhvZHMsIGNvbnN0cnVjdG9yLCBWdWUzLCBkYXRhTmFtZXMgLCBzaGFkb3dBc3NpZ25lcik7IH07IH1cblx0ZWxzZSB7IG9wdGlvbnMuZGF0YSA9IGZ1bmN0aW9uIChzZWxmICAgICAgKSB7IHJldHVybiBwcm9EYXRhKHNlbGYgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcywgY29uc3RydWN0b3IsIFZ1ZTMsIHJlc3ROYW1lcywgc2hhZG93QXNzaWduZXIpOyB9OyB9XG5cdFxuXHRpZiAoIHdhdGNoZXJzLmxlbmd0aCB8fCAhX19kZXZfXyAmJiAoIHNraXBDb25zdHJ1Y3RvciAmJiBzeW1ib2xNZXRob2RzIHx8IHNraXBEYXRhICkgKSB7XG5cdFx0dmFyIGNyZWF0ZWQgPSBvcHRpb25zLmNyZWF0ZWQ7XG5cdFx0c3dpdGNoICggKCBfX2Rldl9fID8gKCBza2lwQ29uc3RydWN0b3IgPyAncycgOiAnbicgKSA6ICdfJyApICsgKCB3YXRjaGVycy5sZW5ndGggPyAndycgOiAnXycgKSArICggY3JlYXRlZCA/ICdjJyA6ICdfJyApICkge1xuXHRcdFx0Y2FzZSAnc3djJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdHByb1N5bWJvbHModGhpcyAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzICk7XG5cdFx0XHRcdFx0JHdhdGNoKHRoaXMsIHdhdGNoZXJzKTtcblx0XHRcdFx0XHRyZXR1cm4gY3JlYXRlZCAuY2FsbCh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzd18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvU3ltYm9scyh0aGlzICAgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3NfYyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9TeW1ib2xzKHRoaXMgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcyApO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5jYWxsKHRoaXMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3NfXyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9TeW1ib2xzKHRoaXMgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcyApO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ253Yyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHN5bWJvbE1ldGhvZHMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVkIC5jYWxsKHRoaXMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ253Xyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHN5bWJvbE1ldGhvZHMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ25fYyc6XG5cdFx0XHRcdG9wdGlvbnMuY3JlYXRlZCA9IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHtcblx0XHRcdFx0XHRwcm9Db25zdHJ1Y3Rvcih0aGlzICAgICAgICAgICAsIHN5bWJvbE1ldGhvZHMsIGNvbnN0cnVjdG9yLCBWdWUzKTtcblx0XHRcdFx0XHRyZXR1cm4gY3JlYXRlZCAuY2FsbCh0aGlzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICduX18nOlxuXHRcdFx0XHRvcHRpb25zLmNyZWF0ZWQgPSBmdW5jdGlvbiBiZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdFx0cHJvQ29uc3RydWN0b3IodGhpcyAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBjb25zdHJ1Y3RvciwgVnVlMyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3djJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdFx0cmV0dXJuIGNyZWF0ZWQgLmNhbGwodGhpcyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnX3dfJzpcblx0XHRcdFx0b3B0aW9ucy5jcmVhdGVkID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRcblx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XG5cdGlmICggb3B0aW9ucy5jb21wb25lbnRzICkge1xuXHRcdHZhciBjb21wb25lbnRzID0gb3B0aW9ucy5jb21wb25lbnRzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgb3B0aW9ucy5jb21wb25lbnRzKTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBjb21wb25lbnRzICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIC9eKD8hW0EtWl0pLy50ZXN0KG5hbWUpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0XHRcdH1cblx0XHRcdHZhciB2YWx1ZSA9IGNvbXBvbmVudHNbbmFtZV07XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IodmFsdWUpICkgeyBjb21wb25lbnRzW25hbWVdID0gVG9PcHRpb25zKHZhbHVlLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpOyB9XG5cdFx0fVxuXHR9XG5cdFxuXHRyZXR1cm4gb3B0aW9ucztcblx0XG59XG5cbnZhciBPUFRJT05TID0gV2Vha01hcCAmJiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBGdW5jdGlvbignV2Vha01hcCxNYXAnLCAnXCJ1c2Ugc3RyaWN0XCI7XFxcbmNsYXNzIEVhc3lNYXAgZXh0ZW5kcyBXZWFrTWFwe2ludG8oa2V5KXtsZXQgc3ViPXRoaXMuZ2V0KGtleSk7c3ViPz90aGlzLnNldChrZXksc3ViPW5ldyBFYXN5TWFwKTtyZXR1cm4gc3VifX1FYXN5TWFwLnByb3RvdHlwZS5nZXQ9V2Vha01hcC5wcm90b3R5cGUuZ2V0O0Vhc3lNYXAucHJvdG90eXBlLnNldD1XZWFrTWFwLnByb3RvdHlwZS5zZXQ7XFxcbmNsYXNzIFN0cm9uZ01hcCBleHRlbmRzIE1hcHt9U3Ryb25nTWFwLnByb3RvdHlwZS5nZXQ9TWFwLnByb3RvdHlwZS5nZXQ7U3Ryb25nTWFwLnByb3RvdHlwZS5zZXQ9TWFwLnByb3RvdHlwZS5zZXQ7U3Ryb25nTWFwLnByb3RvdHlwZS5mb3JFYWNoPU1hcC5wcm90b3R5cGUuZm9yRWFjaDtcXFxucmV0dXJue29iamVjdHM6bmV3IEVhc3lNYXAsb2JqZWN0c1RtcDpTdHJvbmdNYXAsc3VwZXJzOm5ldyBFYXN5TWFwLHJlc3RzOm5ldyBFYXN5TWFwLGRhdGE6bmV3IEVhc3lNYXB9XFxcbicpKFdlYWtNYXAsIE1hcCk7XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufSgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcblxuZnVuY3Rpb24gaXNDb21wb25lbnRDb25zdHJ1Y3RvciAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGFwcGx5KGlzUHJvdG90eXBlT2YsIENvbXBvbmVudCwgWyB2YWx1ZSBdICAgICAgICAgKTsgfVxuXG52YXIgQVJHUyA9IFtdICAgICAgICAgO1xuXG52YXIgX01JWElOUyA9IFsgX21peGlucyBdICAgICAgICAgO1xuZnVuY3Rpb24gaXNNaXhpbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoaGFzT3duUHJvcGVydHksIGNvbnN0cnVjdG9yLCBfTUlYSU5TKTsgfVxuXG52YXIgU1lNQk9MUyA9IC8qI19fUFVSRV9fKi9nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkucmVkdWNlKGZ1bmN0aW9uIChTWU1CT0xTLCBuYW1lKSB7XG5cdGlmICggdHlwZW9mIFN5bWJvbFtuYW1lXT09PSdzeW1ib2wnICkgeyBTWU1CT0xTW1N5bWJvbFtuYW1lXSAgICAgICAgICAgICAgICAgXSA9IG51bGw7IH1cblx0cmV0dXJuIFNZTUJPTFM7XG59LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxudmFyIFdBVENIX09QVElPTlMgPSAvO1thLXo7PV0qJC87XG5mdW5jdGlvbiAkd2F0Y2ggKHRoYXQgICAgICAsIHdhdGNoZXJzICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIGluZGV4ID0gd2F0Y2hlcnMubGVuZ3RoO1xuXHRkbyB7XG5cdFx0dmFyIHdhdGNoZXIgICAgICA9IHdhdGNoZXJzWy0taW5kZXhdO1xuXHRcdHRoYXQuJHdhdGNoKHdhdGNoZXIuJCwgd2F0Y2hlci5oYW5kbGVyLCB3YXRjaGVyKTtcblx0fVxuXHR3aGlsZSAoIGluZGV4ICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZnVuY3Rpb24gY29sbGVjdE5hbWVzIChvcHRpb25zICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgKSAgICAgICAge1xuXHR2YXIgcmVzdE5hbWVzICAgICAgICAgICAgICAgICAgICA9IE9QVElPTlMucmVzdHMuZ2V0KG9wdGlvbnMpO1xuXHRpZiAoICFyZXN0TmFtZXMgKSB7XG5cdFx0aWYgKCBjb25zdHJ1Y3RvciApIHsgcmVzdE5hbWVzID0gT1BUSU9OUy5yZXN0cy5nZXQoY29uc3RydWN0b3IpOyB9XG5cdFx0aWYgKCAhcmVzdE5hbWVzICkge1xuXHRcdFx0cmVzdE5hbWVzID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHRcdFx0dmFyIGV4dGVuZCA9IG9wdGlvbnMuZXh0ZW5kcztcblx0XHRcdGV4dGVuZCAmJiBhc3NpZ24ocmVzdE5hbWVzLCBjb2xsZWN0TmFtZXMoZXh0ZW5kLCBudWxsKSk7XG5cdFx0XHR2YXIgbWl4aW5zID0gb3B0aW9ucy5taXhpbnM7XG5cdFx0XHRpZiAoIG1peGlucyApIHtcblx0XHRcdFx0dmFyIGluZGV4ID0gbWl4aW5zLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpbmRleCApIHsgYXNzaWduKHJlc3ROYW1lcywgY29sbGVjdE5hbWVzKG1peGluc1stLWluZGV4XSwgbnVsbCkpOyB9XG5cdFx0XHR9XG5cdFx0XHR2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuXHRcdFx0dmFyIG5hbWUgICAgICAgIDtcblx0XHRcdGlmICggaXNBcnJheShwcm9wcykgKSB7XG5cdFx0XHRcdGZvciAoIGluZGV4ID0gcHJvcHMubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0bmFtZSA9IHByb3BzWy0taW5kZXhdO1xuXHRcdFx0XHRcdHJlc3ROYW1lc1tuYW1lXSA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgeyBmb3IgKCBuYW1lIGluIHByb3BzICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9IH1cblx0XHRcdHByb3BzID0gb3B0aW9ucy5pbmplY3Q7XG5cdFx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkge1xuXHRcdFx0XHRmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdG5hbWUgPSBwcm9wc1stLWluZGV4XTtcblx0XHRcdFx0XHRyZXN0TmFtZXNbbmFtZV0gPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgZm9yICggbmFtZSBpbiBwcm9wcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMubWV0aG9kcyApIHsgcmVzdE5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkgeyByZXN0TmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0XHRyZXN0TmFtZXMgPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCByZXN0TmFtZXMpO1xuXHRcdH1cblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyBPUFRJT05TLnJlc3RzLnNldChjb25zdHJ1Y3RvciwgcmVzdE5hbWVzKTsgfVxuXHRcdE9QVElPTlMucmVzdHMuc2V0KG9wdGlvbnMsIHJlc3ROYW1lcyk7XG5cdH1cblx0cmV0dXJuIHJlc3ROYW1lcztcbn1cblxuZnVuY3Rpb24gcHJvU2V0ICAgIChvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICwgbmFtZSAgICAgICAgLCB2YWx1ZSAgICkgeyBvYmplY3RbbmFtZV0gPSB2YWx1ZTsgfVxuZnVuY3Rpb24gZGV2U2V0ICAgICggICAgICAgICAgICAgICBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICwgbmFtZSAgICAgICAgLCB2YWx1ZSAgICkge1xuXHRpZiAoIG5hbWUgaW4gb2JqZWN0ICkgeyB0aHJvdyBFcnJvcih0aGlzLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcHJvQXNzZXJ0RnVuY3Rpb24gICAgKGZuICAgKSB7IHJldHVybiBmbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsgfVxuZnVuY3Rpb24gZGV2QXNzZXJ0RnVuY3Rpb24gICAgKCAgICAgICAgICAgICAgIGZuICAgKSB7XG5cdGlmICggdHlwZW9mIGZuIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKHRoaXMuY29tcGlsZV90eXBlKTsgfVxuXHRyZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59XG5cbmZ1bmN0aW9uIGZvcktleXMgKG9wdGlvbiAgICAgICAgICAgICAgICAsIGNhbGxiYWNrICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdGlmICggaXNBcnJheShvcHRpb24pICkgeyBvcHRpb24uZm9yRWFjaChjYWxsYmFjayk7IH1cblx0ZWxzZSB7IGZvciAoIHZhciBrZXkgaW4gb3B0aW9uICkgeyBjYWxsYmFjayhrZXkpOyB9IH1cbn1cbmZ1bmN0aW9uIGNoZWNrIChvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgLCBESURfT1BUSU9OUyAgICAgICAgICwgVE1QX09QVElPTlMgICAgICAgICApIHtcblx0XG5cdCggb3B0aW9ucy5leHRlbmRzID8gWyBvcHRpb25zLmV4dGVuZHMgXSA6IFtdICkuY29uY2F0KG9wdGlvbnMubWl4aW5zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChtaXhpbikge1xuXHRcdERJRF9PUFRJT05TLmhhcyhtaXhpbikgfHwgVE1QX09QVElPTlMuaGFzKG1peGluKSB8fCBjaGVjayhtaXhpbiwgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0fSk7XG5cdFxuXHR2YXIgcmVzdE5hbWVzID0gbmV3IFNldCAgICAgICAgKCk7XG5cdFxuXHRmb3JLZXlzKG9wdGlvbnMucHJvcHMsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCAvLXxeKD86a2V5JHxbb09dW25OXXxyZWYkKS8udGVzdChuYW1lKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Byb3BzKTsgfVxuXHRcdGlmICggbmFtZSBpbiBQUk9UT19CVUcgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucHJvdG8pOyB9XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIHJlc3ROYW1lcy5zaXplPT09cmVzdE5hbWVzLmFkZChuYW1lKS5zaXplICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHR9KTtcblx0XG5cdGZvcktleXMob3B0aW9ucy5pbmplY3QsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIHJlc3ROYW1lcy5zaXplPT09cmVzdE5hbWVzLmFkZChuYW1lKS5zaXplICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHR9KTtcblx0XG5cdGZvciAoIHZhciBuYW1lIGluIG9wdGlvbnMubWV0aG9kcyApIHtcblx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggcmVzdE5hbWVzLnNpemU9PT1yZXN0TmFtZXMuYWRkKG5hbWUpLnNpemUgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdH1cblx0XG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5jb21wdXRlZCApIHtcblx0XHRpZiAoIG5hbWVbMF09PT0nXycgfHwgbmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdGlmICggcmVzdE5hbWVzLnNpemU9PT1yZXN0TmFtZXMuYWRkKG5hbWUpLnNpemUgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdH1cblx0XG5cdCggT1BUSU9OUy5kYXRhLmdldChvcHRpb25zKSB8fCBbXSApLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAoIHJlc3ROYW1lcy5zaXplPT09cmVzdE5hbWVzLmFkZChuYW1lKS5zaXplICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHR9KTtcblx0XG5cdGlmICggcmVzdE5hbWVzLmhhcygnY29uc3RydWN0b3InKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5wcm90byk7IH1cblx0XG5cdFsgb3B0aW9ucy5uYW1lLCBvcHRpb25zLmRpc3BsYXlOYW1lIF0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSAgICAgICAgICkge1xuXHRcdGlmICggdHlwZW9mIG5hbWU9PT0nc3RyaW5nJ1xuXHRcdFx0PyAvXig/IVtBLVpdKS8udGVzdChuYW1lKSB8fCBvcHRpb25zLmNvbXBvbmVudHMgJiYgbmFtZSBpbiBvcHRpb25zLmNvbXBvbmVudHNcblx0XHRcdDogbmFtZSE9PXVuZGVmaW5lZFxuXHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0fSk7XG5cdFxuXHRvcHRpb25zLmVtaXRzICYmXG5cdCggaXNBcnJheShvcHRpb25zLmVtaXRzKSA/IG9wdGlvbnMuZW1pdHMgOiBrZXlzKG9wdGlvbnMuZW1pdHMpICkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoIC9bQS1aXXxeb252bm9kZXwoPzpjYXB0dXJlfG9uY2V8cGFzc2l2ZSkkLy50ZXN0KCdvbicgKyBldmVudCkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9lbWl0cyk7IH1cblx0fSk7XG5cdFxuXHRpZiAoXG5cdFx0b3B0aW9ucy5kaXJlY3RpdmVzICYmICdpcycgaW4gb3B0aW9ucy5kaXJlY3RpdmVzLy8gMlxuXHRcdHx8Ly9AdHMtaWdub3JlXG5cdFx0b3B0aW9ucy5wcm9wcyAmJiAoIGlzQXJyYXkob3B0aW9ucy5wcm9wcykgPyBvcHRpb25zLnByb3BzLmluY2x1ZGVzKCdpcycpIDogJ2lzJyBpbiBvcHRpb25zLnByb3BzICkvLyAzXG5cdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfaXMpOyB9XG5cdFxuXHRUTVBfT1BUSU9OUy5zZXQob3B0aW9ucywgbnVsbCk7XG5cdFxufVxuXG52YXIgREVWID0gW1xuXHQncHJvdG8nLFxuXHQnY29tcGlsZV9uYW1lJyxcblx0J2NvbXBpbGVfcHJvcHMnLFxuXHQnY29tcGlsZV9lbWl0cycsXG5cdCdjb21waWxlX2lzJyxcblx0J2NvbXBpbGVfbGF5b3V0Jyxcblx0J2NvbXBpbGVfcmVzZXJ2ZWQnLFxuXHQnY29tcGlsZV9yZWRlZmluZWQnLFxuXHQnY29tcGlsZV90eXBlJyxcblx0J2NvbXBpbGVfc3ltYm9sJyxcblx0J2NvbXBpbGVfc2hhZG93Jyxcblx0J3J1bnRpbWVfc2hhZG93Jyxcblx0J3J1bnRpbWVfcmVkZWZpbmVkJyxcblx0J3J1bnRpbWVfc3ltYm9sJyxcblx0J3J1bnRpbWVfcmVzZXJ2ZWQnLFxuXHQncnVudGltZV9lbnVtZXJhYmxlJyxcblx0J3J1bnRpbWVfZGF0YScsXG5dICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgIFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4vSWRlbnRpZmllcic7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vVGVtcGxhdGUnO1xuaW1wb3J0IFJlbmRlciwgeyBTdGF0aWNSZW5kZXJGbnMgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmltcG9ydCBTdHlsZSwgeyByZW1vdmUgfSBmcm9tICcuL1N0eWxlLCByZW1vdmUnO1xuaW1wb3J0IENvbXBvbmVudCwgeyBtaXhpbiB9IGZyb20gJy4vQ29tcG9uZW50LCBtaXhpbi8nO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRJZGVudGlmaWVyLFxuXHRTY29wZSxcblx0VGVtcGxhdGUsXG5cdFJlbmRlciwgU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZSwgcmVtb3ZlLFxuXHRDb21wb25lbnQsIG1peGluLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlOiBTdHlsZSwgcmVtb3ZlOiByZW1vdmUsXG5cdENvbXBvbmVudDogQ29tcG9uZW50LCBtaXhpbjogbWl4aW4sXG59KTtcbiJdLCJuYW1lcyI6WyJTeW1ib2wiLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsIlJlZ0V4cCIsIkZ1bmN0aW9uIiwiS2V5cyIsIkVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJnZXQiLCJXZWFrTWFwIiwiTWFwIiwiVHlwZUVycm9yIiwiU2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWMsUUFBUTs7QUNBdEIsbUJBQWU7QUFDZixDQUFDLEtBQUs7QUFDTixDQUFDLEtBQUs7QUFDTixDQUFDLE1BQU07QUFDUCxDQUFDLE1BQU07QUFDUCxDQUFDLE1BQU07QUFDUCxDQUFDLE1BQU07QUFDUCxDQUFDLE1BQU07QUFDUCxDQUFDLE9BQU87QUFDUixDQUFDLE9BQU87QUFDUixDQUFDLE9BQU87QUFDUixDQUFDLE9BQU87QUFDUixDQUFDLFFBQVE7QUFDVCxDQUFDLFFBQVE7QUFDVCxDQUFDLFFBQVE7QUFDVCxDQUFDLFFBQVE7QUFDVCxDQUFDLFFBQVE7QUFDVCxDQUFDLFFBQVE7QUFDVCxDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFNBQVM7QUFDVixDQUFDLFVBQVU7QUFDWCxDQUFDLFVBQVU7QUFDWCxDQUFDLFVBQVU7QUFDWCxDQUFDLFVBQVU7QUFDWCxDQUFDLFVBQVU7QUFDWCxDQUFDLFVBQVU7QUFDWCxDQUFDLFVBQVU7QUFDWCxDQUFDLFdBQVc7QUFDWixDQUFDLFdBQVc7QUFDWixDQUFDLFdBQVc7QUFDWixDQUFDLFlBQVk7QUFDYixDQUFDLGFBQWE7QUFDZCxDQUFDOztBQ3RDRCxJQUFJLGtCQUFrQixpRUFBaUU7QUFDdkYsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztBQUMvRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0FBQ3ZELENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7QUFDdkQsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7QUFDL0MsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdB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QUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDM0YsRUFBRSxLQUFLLDBDQUEwQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNQSxPQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUU7QUFDOUcsRUFBRSxDQUFDLENBQUM7QUFDSjtBQUNBLENBQUM7QUFDRCxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxVQUFVO0FBQ2xEO0FBQ0EsRUFBRSxPQUFPLENBQUMsS0FBSyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDcEcsR0FBRyxFQUFFLE1BQU1BLE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtBQUN2QztBQUNBLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEM7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxJQUFJLEdBQUcsR0FBRztBQUNWLENBQUMsT0FBTztBQUNSLENBQUMsY0FBYztBQUNmLENBQUMsZUFBZTtBQUNoQixDQUFDLGVBQWU7QUFDaEIsQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxnQkFBZ0I7QUFDakIsQ0FBQyxrQkFBa0I7QUFDbkIsQ0FBQyxtQkFBbUI7QUFDcEIsQ0FBQyxjQUFjO0FBQ2YsQ0FBQyxnQkFBZ0I7QUFDakIsQ0FBQyxnQkFBZ0I7QUFDakIsQ0FBQyxnQkFBZ0I7QUFDakIsQ0FBQyxtQkFBbUI7QUFDcEIsQ0FBQyxnQkFBZ0I7QUFDakIsQ0FBQyxrQkFBa0I7QUFDbkIsQ0FBQyxvQkFBb0I7QUFDckIsQ0FBQyxjQUFjO0FBQ2YsQ0FBQzs7QUN6aUJELGNBQWUsT0FBTyxDQUFDO0FBQ3ZCLENBQUMsT0FBTyxFQUFFLE9BQU87QUFDakIsQ0FBQyxVQUFVLEVBQUUsVUFBVTtBQUN2QixDQUFDLEtBQUssRUFBRSxLQUFLO0FBQ2IsQ0FBQyxRQUFRLEVBQUUsUUFBUTtBQUNuQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLGVBQWU7QUFDakQsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzdCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSztBQUNuQyxDQUFDLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvRnJvbnRFbmRSdW50aW1lRGVwZW5kZW5jeS8ifQ==