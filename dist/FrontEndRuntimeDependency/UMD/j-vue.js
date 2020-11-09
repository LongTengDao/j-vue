/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：17.0.2
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

var version = '17.0.2';

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

function proData (constructor          , self         , symbolMethods                      , Vue3                   , names       , shadowAssigner                       ) {
	
	var _ = self._;
	var ctx = _ ? _.ctx : self;
	var accessCache = _ && _.accessCache;
	symbolMethods && defineProperties(ctx, symbolMethods);
	
	var previous = that;
	that = self;
	try { new constructor(Vue3); }
	finally { that = previous; }
	
	var data = create(NULL)        ;
	if ( accessCache ) {
		for ( var name in ctx ) {
			if ( !( name in names ) ) {
				data[name] = ctx[name                 ];
				if ( name in accessCache ) { accessCache[name                 ] = undefined$1; }
			}
		}
	}
	else {
		var keys$1 = keys(ctx);
		var index = keys$1.length;
		do {
			var key = keys$1[--index];
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
	var proto = getPrototypeOf$1(ctx);
	var accessCache = _ && _.accessCache;
	var oldDescriptors = assign(create(NULL), getOwnPropertyDescriptors(ctx), symbolMethods);
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
		) { throw Error$1(__dev__.runtime_redefined); }
	});
	var difKeys = ownKeys(ctx).filter(function (key) {
		return !( key in oldDescriptors );
	});
	difKeys.forEach(function (key) {
		if ( key in proto && !( key in {} ) || key in names ) { throw Error$1(__dev__.runtime_redefined); }
		if ( typeof key==='symbol' ) { throw Error$1(__dev__.runtime_symbol); }
		if ( key[0]==='_' || key[0]==='$' ) { throw Error$1(__dev__.runtime_reserved); }
		if ( !propertyIsEnumerable.call(ctx, key)) { throw Error$1(__dev__.runtime_enumerable); }
	});
	
	var data = create(NULL)        ;
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

                                                               
function ShadowChecker (            along        , names       , __dev__         )                {
	var index = along.indexOf('.');
	var toName = index<0 ? along.slice(0, index) : along;
	if ( toName in names ) { throw Error$1(__dev__.compile_shadow); }
	return index<0
		? function (            data      ) {
			if ( hasOwnProperty.call(data, toName + '$get') || hasOwnProperty.call(data, toName + '$set') ) { throw Error$1(__dev__.runtime_shadow); }
		}
		: function (            data      ) {
			if ( hasOwnProperty.call(data, toName) ) { throw Error$1(__dev__.runtime_shadow); }
		};
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
		else if ( staticName!=='prototype' ) {
			if ( __dev__ ) {
				if ( staticName[0]==='_' ) { throw Error$1(__dev__.compile_reserved); }
				if (
					//@ts-ignore
					staticName==='setup' || staticName==='watch' || staticName==='methods' || staticName==='computed' || staticName==='extends' || staticName==='data' || staticName==='mixins' ||
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
	while ( index ) {
		var protoName = protoNames[--index];
		if ( protoName[0]==='_' && !protoName.startsWith('_watch:') ) {
			if ( __dev__ ) {
				var protoName1 = protoName.slice(1);
				if ( protoName1[0]==='_' ) { throw Error$1(__dev__.compile_reserved); }
				if (
					protoName1==='setup' || protoName1==='watch' || protoName1==='methods' || protoName1==='computed' || protoName1==='extends' || protoName1==='data' || protoName1==='mixins' ||
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
					( options.computed || ( options.computed = create(NULL)                                        ) )[protoName] = descriptor.set ? { get: descriptor.get, set: descriptor.set } : descriptor.get       ;
				}
			}
		}
	}
	
	__dev__ && check(options, __dev__, DID_OPTIONS, TMP_OPTIONS);
	
	var names = collectNames(options, constructor);
	
	if ( Render && Vue3 ) {
		var shadow = Render.shadow;
		if ( shadow ) {
			if ( __dev__ ) { var shadowChecker                            = ShadowChecker(shadow, names, __dev__); }
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
	
	if ( watchers.length ) {
		var created = options.created;
		options.created = created
			? function watchBeforeCreated (          ) {
				$watch(this, watchers);
				return created .call(this);
			}
			: function watchBeforeCreated (          ) { $watch(this, watchers); };
	}
	
	options.data = __dev__
		? function (self      ) { return devData(constructor, self           , symbolMethods, Vue3, names, shadowAssigner, shadowChecker, __dev__); }
		: function (self      ) { return proData(constructor, self           , symbolMethods, Vue3, names, shadowAssigner); };
	
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
return{objects:new EasyMap,objectsTmp:StrongMap,supers:new EasyMap,names:new EasyMap}\
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
	var names                    = OPTIONS.names.get(options);
	if ( !names ) {
		if ( constructor ) { names = OPTIONS.names.get(constructor); }
		if ( !names ) {
			names = create(NULL)         ;
			var extend = options.extends;
			extend && assign(names, collectNames(extend, null));
			var mixins = options.mixins;
			if ( mixins ) {
				var index = mixins.length;
				while ( index ) { assign(names, collectNames(mixins[--index], null)); }
			}
			var props = options.props;
			var name        ;
			if ( isArray(props) ) { for ( index = props.length; index; ) { name = props[--index]; names[name] = null; } }
			else { for ( name in props ) { names[name] = null; } }
			props = options.inject;
			if ( isArray(props) ) { for ( index = props.length; index; ) { name = props[--index]; names[name] = null; } }
			else { for ( name in props ) { names[name] = null; } }
			for ( name in options.methods ) { names[name] = null; }
			for ( name in options.computed ) { names[name] = null; }
		}
		if ( constructor ) { OPTIONS.names.set(constructor, names); }
		OPTIONS.names.set(options, names);
	}
	return names;
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
function check (options                                         , __dev__         , DID_OPTIONS         , TMP_OPTIONS         ) {
	
	( options.extends ? [ options.extends ] : [] ).concat(options.mixins || []).forEach(function (mixin) {
		DID_OPTIONS.has(mixin) || TMP_OPTIONS.has(mixin) || check(mixin, __dev__, DID_OPTIONS, TMP_OPTIONS);
	});
	
	var names = new Set$1        ();
	
	forKeys(options.props, function (name) {
		if ( /-|^(?:key$|[oO][nN]|ref$)/.test(name) ) { throw Error$1(__dev__.compile_props); }
		if ( name in PROTO_BUG ) { throw Error$1(__dev__.compile_proto); }
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( names.size===names.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	});
	
	forKeys(options.inject, function (name) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( names.size===names.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	});
	
	for ( name in options.methods ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( names.size===names.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	}
	
	for ( name in options.computed ) {
		if ( name[0]==='_' || name[0]==='$' ) { throw Error$1(__dev__.compile_reserved); }
		if ( names.size===names.add(name).size ) { throw Error$1(__dev__.compile_redefined); }
	}
	
	var name = options.name;
	if ( name ) {
		if (
			/^(?![A-Z])/.test(name)
			||
			options.components && name in options.components
		) { throw Error$1(__dev__.compile_name); }
	}
	
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
	'compile_name',
	'compile_proto',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIi4uLy4uL2xpYi9jc3Mta2V5d29yZHMvZGlzdC5qcyIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9EeW5hbWljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCIuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxNy4wLjInOyIsImV4cG9ydCBkZWZhdWx0IFtcblx0J2FsbCcsXG5cdCdsYW8nLFxuXHQnYXV0bycsXG5cdCdkaXNjJyxcblx0J25vbmUnLFxuXHQnc3BhbicsXG5cdCd0aGFpJyxcblx0J2tobWVyJyxcblx0J29yaXlhJyxcblx0J3RhbWlsJyxcblx0J3Vuc2V0Jyxcblx0J2NpcmNsZScsXG5cdCdoZWJyZXcnLFxuXHQnaW5saW5lJyxcblx0J3JldmVydCcsXG5cdCdzcXVhcmUnLFxuXHQndGVsdWd1Jyxcblx0J2JlbmdhbGknLFxuXHQnZGVjaW1hbCcsXG5cdCdkZWZhdWx0Jyxcblx0J2luaGVyaXQnLFxuXHQnaW5pdGlhbCcsXG5cdCdrYW5uYWRhJyxcblx0J215YW5tYXInLFxuXHQnb3V0c2lkZScsXG5cdCdwZXJzaWFuJyxcblx0J3RpYmV0YW4nLFxuXHQnYXJtZW5pYW4nLFxuXHQnY29udGVudHMnLFxuXHQnZ2VvcmdpYW4nLFxuXHQnZ3VqYXJhdGknLFxuXHQnZ3VybXVraGknLFxuXHQnaGlyYWdhbmEnLFxuXHQna2F0YWthbmEnLFxuXHQnY2FtYm9kaWFuJyxcblx0J21hbGF5YWxhbScsXG5cdCdtb25nb2xpYW4nLFxuXHQnZGV2YW5hZ2FyaScsXG5cdCdub3RyYW5zbGF0ZScsXG5dOyIsImltcG9ydCBDU1NfS0VZV09SRFMgZnJvbSAnbGliOmNzcy1rZXl3b3Jkcyc7XG5cbnZhciBpbmNyZWFzZURpY3Rpb25hcnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHtcblx0MDogJzEnLCAxOiAnMicsIDI6ICczJywgMzogJzQnLCA0OiAnNScsIDU6ICc2JywgNjogJzcnLCA3OiAnOCcsIDg6ICc5JywgOTogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn07XG52YXIgbGF0ZXN0SWRlbnRpZmllciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyAnOScgXTtcbnZhciBsYXN0Q2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSAnOSc7XG52YXIgbGFzdEluZGV4ICAgICAgICAgPSAwO1xuXG52YXIgY3NzX2tleXdvcmQgICAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRsYXRlc3RJZGVudGlmaWVyLmpvaW4gPSBsYXRlc3RJZGVudGlmaWVyLmpvaW47XG5cdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCA9IGxhdGVzdElkZW50aWZpZXIudW5zaGlmdDtcblx0Q1NTX0tFWVdPUkRTLnNoaWZ0ID0gQ1NTX0tFWVdPUkRTLnNoaWZ0O1xuXHRyZXR1cm4gQ1NTX0tFWVdPUkRTLnNoaWZ0KCkgO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJZGVudGlmaWVyICgpICAgICAgICAge1xuXHRcblx0aWYgKCBsYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIGNoYXJhY3RlckluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIGNoYXJhY3RlckluZGV4ICkge1xuXHRcdFx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyWy0tY2hhcmFjdGVySW5kZXhdO1xuXHRcdFx0XHRpZiAoIGNoYXJhY3Rlcj09PSd6JyApIHsgbGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSAnMCc7IH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbY2hhcmFjdGVyXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhc3RJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3Rlcl07XG5cdH1cblx0XG5cdHZhciBpZGVudGlmaWVyICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRpZiAoIGlkZW50aWZpZXI9PT1jc3Nfa2V5d29yZCApIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXIgICAgICAgICAgICAgXTtcblx0XHRpZGVudGlmaWVyID0gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0XHRjc3Nfa2V5d29yZCA9IENTU19LRVlXT1JEUy5zaGlmdCgpIHx8IG51bGw7XG5cdH1cblx0cmV0dXJuIGlkZW50aWZpZXI7XG5cdFxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJytjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gICAgICA9IFN5bWJvbCA/IC8qI19fUFVSRV9fKi9TeW1ib2woJ18nKSAgICAgICAgOiAnXyc7XG5cbmZ1bmN0aW9uICQgICAgICAgICAgICAgICAgICAoICAgICAgICAgY3NzICAgICAgICAgLCBtZWRpYSAgICAgICAgICkgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSB0aGlzW19dKGNzcyk7IH1cblx0aWYgKCBtZWRpYSE9PXVuZGVmaW5lZCApIHsgc3R5bGUubWVkaWEgPSBtZWRpYTsgfVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCB7IF8sICQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIHByZXBhcmVfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gdHlwZW9mIF89PT0nc3ltYm9sJyA/IG51bGwgOiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR2YXIgX2Rlc2NyaXB0b3IgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgO1xuXHRfZGVzY3JpcHRvci52YWx1ZSA9IG51bGw7XG5cdF9kZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IHRydWU7XG5cdF9kZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSAgICAgICApIHsgZGVmaW5lUHJvcGVydHkoc2NvcGUsIF8sIF9kZXNjcmlwdG9yKTsgfTtcbn0oKTtcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzICAgICAgICAgICkgeyByZXR1cm4gbmV3IFJlZ0V4cCgnX18nICsgZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpICsgJ19fJywgJ2cnKTsgfVxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkgeyByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07IH1cblxudmFyIFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbnZhciBTQ09QRSAgICAgICAgICAgICAgPSBTdGF0aWNTY29wZS5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdCQ6IHsgdmFsdWU6ICQsIHdyaXRhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSxcbn0pICAgICAgICAgICAgICAgKTtcblxudmFyIEluaGVyaXRlZFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfICYmIHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKCAqL1xuXHRcdGtleXNba2V5cy5sZW5ndGhdID0ga2V5LyogKSovO1xuXHR9XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgeyBTdGF0aWNTY29wZSwgU0NPUEUsIEluaGVyaXRlZFN0YXRpY1Njb3BlIH07XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBnZXQgKGNhY2hlICAgICAgICAgICAgICwga2V5ICAgICAgICApICAgICAgICAgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhY2hlICAgICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBrZXlzICAgICAgICAsXG5cdFx0aW5kZXggICAgICAgICxcblx0XHR2YWx1ZXMgICAgICAgICAgLFxuXHRcdGtleSAgICAgICAgO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdldChjYWNoZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gdmFsdWVbLS1pbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGdldChjYWNoZSwga2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlWy0taW5kZXhdLCBjYWNoZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK2dldChjYWNoZSwga2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRpZiAoIGxlbmd0aD4xICkge1xuXHRcdFx0dmFsdWUgPSBbIHZhbHVlLCBhcmd1bWVudHNbMV0gXTtcblx0XHRcdGZvciAoIHZhciBpbmRleCA9IDI7IGluZGV4IT09bGVuZ3RoOyArK2luZGV4ICkgeyAoIHZhbHVlICAgICAgICAgIClbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gc2NvcGlmeSh2YWx1ZSwgY2FjaGUpO1xuXHR9ICAgICAgICAgICAgICAgIDtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGdldChjYWNoZSwgX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZXhwb3J0IHsgRHluYW1pY1Njb3BlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImV4cG9ydCBkZWZhdWx0IC9bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKi9pZzsiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IFN0YXRpY1Njb3BlLCBJbmhlcml0ZWRTdGF0aWNTY29wZSwgU0NPUEUgfSBmcm9tICcuL1N0YXRpY1Njb3BlJztcbmltcG9ydCBEeW5hbWljU2NvcGUgZnJvbSAnLi9EeW5hbWljU2NvcGUnO1xuaW1wb3J0IEtFWVMgZnJvbSAnLi9LRVlTJztcblxudmFyIEVNUFRZICAgICAgICAgICA9IFtdO1xuXG5mdW5jdGlvbiBtaXggKHByb3RvcyAgICAgICAgICkgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlICAgICAgICAgICAgICA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byAgICAgICAgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5mdW5jdGlvbiBTY29wZSAoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICkgICAgICAgIHtcblx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgU3RhdGljU2NvcGUgKSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlICAgICAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gbmV3IFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cbn1cblNjb3BlLnByb3RvdHlwZSA9IG51bGwgICAgICAgO1xuXG5leHBvcnQgeyBTY29wZSBhcyBkZWZhdWx0LCBLRVlTIH07IiwiaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFRlbXBsYXRlIChodG1sICAgICAgICAsIHNjb3BlICAgICAgICkgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovc2NvcGVbX10oaHRtbCk7XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbnZhciBOT1RfRVM1ID0gL14oY29uc3xsZSl0IC87XG5cbmZ1bmN0aW9uIFdpdGhTdHJpcHBlZCAocmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0cmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlO1xuXHRyZXR1cm4gcmVuZGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXIgKGNvZGUgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdHJldHVybiBjb2RlWzBdPT09JygnXG5cdFx0PyAvKiNfX1BVUkVfXyovRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybiBjbGFzcyBSZW5kZXIgZXh0ZW5kcyBudWxse2NvbnN0cnVjdG9yJysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9OycpKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0OiAvKiNfX1BVUkVfXyovV2l0aFN0cmlwcGVkKFxuXHRcdFx0LyojX19QVVJFX18qL0Z1bmN0aW9uKE5PVF9FUzUudGVzdChjb2RlKVxuXHRcdFx0XHQ/ICdcInVzZSBzdHJpY3RcIjtyZXR1cm57cmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9fS5yZW5kZXI7J1xuXHRcdFx0XHQ6ICdcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24gcmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9Oydcblx0XHRcdCkoKSAgICAgICAgICBcblx0XHQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGNvZGVzLmxlbmd0aDtcblx0dmFyIGJvZHkgICAgICAgICA9ICddJztcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4OyApIHsgYm9keSA9ICdmdW5jdGlvbigpeycrc2NvcGVfKGNvZGVzWy0taW5kZXhdKSsnfSwnK2JvZHk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHR3aGlsZSAoIGluZGV4ICkgeyBib2R5ID0gJ2Z1bmN0aW9uKCl7Jytjb2Rlc1stLWluZGV4XSsnfSwnK2JvZHk7IH1cblx0fVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVyblsnK2JvZHkpKCk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHlsZSAoY3NzICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBSZWZsZWN0IT09J3VuZGVmaW5lZCcgJiYgUmVmbGVjdC5nZXRQcm90b3R5cGVPZiE9PXVuZGVmaW5lZCA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiAvKiNfX1BVUkVfXyovIE9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgcHJvcGVydHlJc0VudW1lcmFibGUgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmV4cG9ydCB2YXIgdGhhdCAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvRGF0YSAoY29uc3RydWN0b3IgICAgICAgICAgLCBzZWxmICAgICAgICAgLCBzeW1ib2xNZXRob2RzICAgICAgICAgICAgICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIG5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHR2YXIgYWNjZXNzQ2FjaGUgPSBfICYmIF8uYWNjZXNzQ2FjaGU7XG5cdHN5bWJvbE1ldGhvZHMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHN5bWJvbE1ldGhvZHMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHR2YXIgZGF0YSA9IGNyZWF0ZShOVUxMKSAgICAgICAgO1xuXHRpZiAoIGFjY2Vzc0NhY2hlICkge1xuXHRcdGZvciAoIHZhciBuYW1lIGluIGN0eCApIHtcblx0XHRcdGlmICggISggbmFtZSBpbiBuYW1lcyApICkge1xuXHRcdFx0XHRkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0XHRcdGlmICggbmFtZSBpbiBhY2Nlc3NDYWNoZSApIHsgYWNjZXNzQ2FjaGVbbmFtZSAgICAgICAgICAgICAgICAgXSA9IHVuZGVmaW5lZDsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR2YXIga2V5cyA9IEtleXMoY3R4KTtcblx0XHR2YXIgaW5kZXggPSBrZXlzLmxlbmd0aDtcblx0XHRkbyB7XG5cdFx0XHR2YXIga2V5ID0ga2V5c1stLWluZGV4XTtcblx0XHRcdGlmICggISgga2V5IGluIG5hbWVzICkgJiYga2V5WzBdIT09JyQnICYmIGtleVswXSE9PSdfJyApIHsgZGF0YVtrZXldID0gY3R4W2tleV07IH1cblx0XHR9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZEYXRhIChjb25zdHJ1Y3RvciAgICAgICAgICAsIHNlbGYgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgICAgICAgICAgICAgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgbmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgLCBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGN0eCk7XG5cdHZhciBhY2Nlc3NDYWNoZSA9IF8gJiYgXy5hY2Nlc3NDYWNoZTtcblx0dmFyIG9sZERlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhjdHgpLCBzeW1ib2xNZXRob2RzKTtcblx0ZGVmaW5lUHJvcGVydGllcyhjdHgsIHN5bWJvbE1ldGhvZHMgfHwge30pO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHRvd25LZXlzKG9sZERlc2NyaXB0b3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHR2YXIgb2xkRGVzY3JpcHRvciA9IG9sZERlc2NyaXB0b3JzW2tleV0gO1xuXHRcdHZhciBuZXdEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN0eCwga2V5ICAgICAgICAgICAgICAgICApO1xuXHRcdGlmIChcblx0XHRcdCFuZXdEZXNjcmlwdG9yIHx8XG5cdFx0XHRuZXdEZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSE9PW9sZERlc2NyaXB0b3IuY29uZmlndXJhYmxlIHx8XG5cdFx0XHRuZXdEZXNjcmlwdG9yLmVudW1lcmFibGUhPT1vbGREZXNjcmlwdG9yLmVudW1lcmFibGUgfHxcblx0XHRcdCggbmV3RGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdD8gbmV3RGVzY3JpcHRvci52YWx1ZSE9PW9sZERlc2NyaXB0b3IudmFsdWUgfHwgbmV3RGVzY3JpcHRvci53cml0YWJsZSE9PW9sZERlc2NyaXB0b3Iud3JpdGFibGVcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHQ6IG5ld0Rlc2NyaXB0b3IuZ2V0IT09b2xkRGVzY3JpcHRvci5nZXQgfHwgbmV3RGVzY3JpcHRvci5zZXQhPT1vbGREZXNjcmlwdG9yLnNldFxuXHRcdFx0KVxuXHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVkZWZpbmVkKTsgfVxuXHR9KTtcblx0dmFyIGRpZktleXMgPSBvd25LZXlzKGN0eCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gISgga2V5IGluIG9sZERlc2NyaXB0b3JzICk7XG5cdH0pO1xuXHRkaWZLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGlmICgga2V5IGluIHByb3RvICYmICEoIGtleSBpbiB7fSApIHx8IGtleSBpbiBuYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3JlZGVmaW5lZCk7IH1cblx0XHRpZiAoIHR5cGVvZiBrZXk9PT0nc3ltYm9sJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3N5bWJvbCk7IH1cblx0XHRpZiAoIGtleVswXT09PSdfJyB8fCBrZXlbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGN0eCwga2V5KSkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZW51bWVyYWJsZSk7IH1cblx0fSk7XG5cdFxuXHR2YXIgZGF0YSA9IGNyZWF0ZShOVUxMKSAgICAgICAgO1xuXHRkaWZLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdCggZGF0YSAgICAgICAgIClba2V5XSA9IGN0eFtrZXldO1xuXHRcdGlmICggYWNjZXNzQ2FjaGUgJiYga2V5IGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtrZXldID0gdW5kZWZpbmVkOyB9XG5cdH0pO1xuXHRpZiAoIHNoYWRvd0Fzc2lnbmVyICkge1xuXHRcdHNoYWRvd0NoZWNrZXIgKGRhdGEpO1xuXHRcdHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHR9XG5cdHJldHVybiBkYXRhO1xuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBJTklUID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIElOSVQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICA7XG5cdElOSVQubW9kZSA9ICdvcGVuJztcblx0cmV0dXJuIElOSVQ7XG59KCk7XG5cbmZ1bmN0aW9uIGF0dGFjaCAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGVsICYmICggZWwuc2hhZG93Um9vdCB8fCBlbC5hdHRhY2hTaGFkb3coSU5JVCkgKTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93QXNzaWduZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0dmFyIG5hbWVzID0gaW5kZXg8MCA/IG51bGwgOiBhbG9uZy5zbGljZShpbmRleCArIDEpLnNwbGl0KCcuJyk7XG5cdHZhciB0b05hbWUgPSBuYW1lcyA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIG5hbWVzICkge1xuXHRcdGlmICggbmFtZXMubGVuZ3RoPT09MSApIHtcblx0XHRcdHZhciBuYW1lJGdldCA9IG5hbWVzWzBdICsgJyRnZXQnO1xuXHRcdFx0dmFyIG5hbWUkc2V0ID0gbmFtZXNbMF0gKyAnJHNldCc7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0YWxsW25hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0YWxsW25hbWUkZ2V0XSA9IG51bGw7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdG5hbWVzIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICApIHtcblx0XHRcdFx0XHRhbGxbbmFtZSArICckc2V0J10gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWVdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0XHRhbGxbbmFtZSArPSAnJGdldCddID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gdG9OYW1lICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gdG9OYW1lICsgJyRzZXQnO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgLCBkYXRhICAgICApIHtcblx0XHRcdGRhdGFbdG9OYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdGRhdGFbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dDaGVja2VyICggICAgICAgICAgICBhbG9uZyAgICAgICAgLCBuYW1lcyAgICAgICAsIF9fZGV2X18gICAgICAgICApICAgICAgICAgICAgICAgIHtcblx0dmFyIGluZGV4ID0gYWxvbmcuaW5kZXhPZignLicpO1xuXHR2YXIgdG9OYW1lID0gaW5kZXg8MCA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIHRvTmFtZSBpbiBuYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0cmV0dXJuIGluZGV4PDBcblx0XHQ/IGZ1bmN0aW9uICggICAgICAgICAgICBkYXRhICAgICAgKSB7XG5cdFx0XHRpZiAoIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwgdG9OYW1lICsgJyRnZXQnKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIHRvTmFtZSArICckc2V0JykgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9zaGFkb3cpOyB9XG5cdFx0fVxuXHRcdDogZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCB0b05hbWUpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc2hhZG93KTsgfVxuXHRcdH07XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBTZXQgZnJvbSAnLlNldD8nO1xuaW1wb3J0IE1hcCBmcm9tICcuTWFwPyc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcD8nO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGdldFByb3RvdHlwZU9mIGZyb20gJy5SZWZsZWN0LmdldFByb3RvdHlwZU9mPz1PYmplY3QuZ2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gJy5PYmplY3Quc2V0UHJvdG90eXBlT2YnO1xuaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IGdldE93blByb3BlcnR5U3ltYm9scyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scz8nO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzJztcbmltcG9ydCBnZXQgZnJvbSAnLlJlZmxlY3QuZ2V0Pyc7XG5pbXBvcnQgYXBwbHkgZnJvbSAnLlJlZmxlY3QuYXBwbHk/JztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24/JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGtleXMgZnJvbSAnLk9iamVjdC5rZXlzJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IFBST1RPX0JVRyBmcm9tICcuT2JqZWN0LnByb3RvdHlwZSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IGlzUHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZic7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgdGhhdCwgcHJvRGF0YSwgZGV2RGF0YSB9IGZyb20gJy4vRGF0YSc7XG5pbXBvcnQgeyBTaGFkb3dBc3NpZ25lciwgU2hhZG93Q2hlY2tlciB9IGZyb20gJy4vU2hhZG93JztcblxuZXhwb3J0IHsgQ29tcG9uZW50IGFzIGRlZmF1bHQgfTtcbnZhciBDb21wb25lbnQgICAgICAgICAgID0gLyojX19QVVJFX18qL2ZyZWV6ZSgvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhcblx0ZnVuY3Rpb24gQ29tcG9uZW50ICgpIHsgcmV0dXJuIHRoYXQ7IH0sXG5cdHtcblx0XHRwcm90b3R5cGU6IHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdFx0XHRcdF9yZW5kZXI6IHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRnZXQ6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uIF9yZW5kZXIgKCAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICAgICAgICAgKSB7ICggdGhpcy5fIHx8IHRoaXMuJG9wdGlvbnMgKS5yZW5kZXIgPSB2YWx1ZTsgfSxcblx0XHRcdFx0fSxcblx0XHRcdH0pKSxcblx0XHR9LFxuXHRcdHJlbmRlcjoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6IHVuZGVmaW5lZCxcblx0XHRcdHNldDogZnVuY3Rpb24gcmVuZGVyICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICkgeyAoIHRoYXQgLl8gfHwgdGhhdCAuJG9wdGlvbnMgKS5yZW5kZXIgPSB2YWx1ZTsgfSxcblx0XHR9LFxuXHRcdF86IHtcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHRvT3B0aW9ucyAoICAgICAgICAgICAgICAgIFZ1ZTMgICAgICAgICwgX19kZXZfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XHRcdGlmICggIWlzQ29tcG9uZW50Q29uc3RydWN0b3IodGhpcykgKSB7IHRocm93IEVycm9yKCchKCB0aGlzIGV4dGVuZHMgQ29tcG9uZW50ICkuXygpJyk7IH1cblx0XHRcdFx0dmFyIERJRF9PUFRJT05TID0gT1BUSU9OUy5vYmplY3RzLmludG8oX19kZXZfXyB8fCBPUFRJT05TICAgICAgICkuaW50byhWdWUzIHx8IE9QVElPTlMgICAgICAgKTtcblx0XHRcdFx0dmFyIFRNUF9PUFRJT05TID0gbmV3IE9QVElPTlMub2JqZWN0c1RtcDtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSBUb09wdGlvbnMoXG5cdFx0XHRcdFx0dGhpcyxcblx0XHRcdFx0XHRWdWUzIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRfX2Rldl9fID8gREVWLnJlZHVjZShmdW5jdGlvbiBEZXYgKGRldiwga2V5KSB7XG5cdFx0XHRcdFx0XHRkZXZba2V5XSA9IF9fZGV2X18gW2tleV0gfHwga2V5O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRldjtcblx0XHRcdFx0XHR9LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCxcblx0XHRcdFx0XHRESURfT1BUSU9OUyxcblx0XHRcdFx0XHRUTVBfT1BUSU9OU1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRUTVBfT1BUSU9OUy5mb3JFYWNoIChmdW5jdGlvbiAob3B0aW9uc1ZhbHVlLCBjb25zdHJ1Y3RvcktleSkgeyBESURfT1BUSU9OUy5zZXQoY29uc3RydWN0b3JLZXksIG9wdGlvbnNWYWx1ZSk7IH0pO1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH0sXG5cdFx0fSxcblx0fVxuKSk7XG5cbnZhciBfbWl4aW5zICAgICAgICAgICAgICAgID0gU3ltYm9sICYmIC8qI19fUFVSRV9fKi9TeW1ib2woJ19taXhpbnMnKSAgICAgICAgICAgICAgICAgO1xuXG52YXIgX19QVVJFX18gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR0cnkgeyByZXR1cm4gRnVuY3Rpb24oJ0NvbXBvbmVudCxfbWl4aW5zJywgJ1widXNlIHN0cmljdFwiO3JldHVybiguLi5taXhpbnMpPT5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtjb25zdHJ1Y3Rvcigpe3JldHVybiBDb21wb25lbnQoKX1zdGF0aWMgZ2V0W19taXhpbnNdKCl7cmV0dXJuIG1peGluc319JykoQ29tcG9uZW50LCBfbWl4aW5zKTsgfVxuXHRjYXRjaCAoZXJyb3IpIHt9XG59KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbiAoICAgICAgICAgICkge1xuXHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuXHRcdD8gLyojX19QVVJFX18qL2FwcGx5KF9fUFVSRV9fLCBudWxsLCBhcmd1bWVudHMgICAgICAgKVxuXHRcdDogQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBUb09wdGlvbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICAgICAgICAgLCBESURfT1BUSU9OUyAgICAgICAgICwgVE1QX09QVElPTlMgICAgICAgICApICAgICAgICAgICAgIHtcblx0XG5cdHZhciBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgID0gRElEX09QVElPTlMuZ2V0KGNvbnN0cnVjdG9yKSB8fCBUTVBfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoIG9wdGlvbnMgKSB7IHJldHVybiBvcHRpb25zOyB9XG5cdG9wdGlvbnMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgIDtcblx0XG5cdGlmICggaXNNaXhpbnMoY29uc3RydWN0b3IpICkge1xuXHRcdHZhciBzdGF0aWNfbWl4aW5zID0gY29uc3RydWN0b3JbX21peGluc10gO1xuXHRcdHZhciBtaXhpbnMgPSBvcHRpb25zLm1peGlucyA9IFtdICAgICAgICAgICAgICAgIDtcblx0XHR2YXIgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggbWl4aW5zLmxlbmd0aCE9PXN0YXRpY19taXhpbnMubGVuZ3RoICkge1xuXHRcdFx0dmFyIG1peGluID0gc3RhdGljX21peGluc1tpbmRleCsrXTtcblx0XHRcdGlmICggaXNDb21wb25lbnRDb25zdHJ1Y3RvcihtaXhpbikgKSB7XG5cdFx0XHRcdHZhciBtaXhpbk9wdGlvbnMgPSBUb09wdGlvbnMobWl4aW4sIFZ1ZTMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7XG5cdFx0XHRcdGlmICggaXNNaXhpbnMobWl4aW4pICkge1xuXHRcdFx0XHRcdHZhciBtaXhpbk1peGlucyA9IG1peGluT3B0aW9ucy5taXhpbnMgO1xuXHRcdFx0XHRcdHZhciBtaXhpbkluZGV4ID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoIG1peGluSW5kZXghPT1taXhpbk1peGlucy5sZW5ndGggKSB7IG1peGluc1ttaXhpbnMubGVuZ3RoXSA9IG1peGluTWl4aW5zW21peGluSW5kZXgrK107IH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHsgbWl4aW5zW21peGlucy5sZW5ndGhdID0gbWl4aW5PcHRpb25zOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgbWl4aW5zW21peGlucy5sZW5ndGhdID0gbWl4aW4gICAgICAgICAgICAgIDsgfVxuXHRcdH1cblx0XHRfX2Rldl9fICYmIGNoZWNrKG9wdGlvbnMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7XG5cdFx0Y29sbGVjdE5hbWVzKG9wdGlvbnMsIGNvbnN0cnVjdG9yKTtcblx0XHRUTVBfT1BUSU9OUy5zZXQoY29uc3RydWN0b3IsIG9wdGlvbnMpO1xuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG5cdFxuXHR2YXIgU3VwZXIgPSBPUFRJT05TLnN1cGVycy5nZXQoY29uc3RydWN0b3IpO1xuXHRpZiAoICFTdXBlciApIHtcblx0XHRPUFRJT05TLnN1cGVycy5zZXQoY29uc3RydWN0b3IsIFN1cGVyID0gZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IpKTtcblx0XHRTdXBlcj09PUNvbXBvbmVudCB8fCBpc01peGlucyhTdXBlcikgfHwgc2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IsIENvbXBvbmVudCk7XG5cdH1cblx0aWYgKCBTdXBlciE9PUNvbXBvbmVudCApIHtcblx0XHR2YXIgU3VwZXJPcHRpb25zID0gVG9PcHRpb25zKFN1cGVyLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHRcdGlzTWl4aW5zKFN1cGVyKVxuXHRcdFx0PyBvcHRpb25zLm1peGlucyAubGVuZ3RoPT09MVxuXHRcdFx0XHQ/IG9wdGlvbnMuZXh0ZW5kcyA9IFN1cGVyT3B0aW9ucy5taXhpbnMgWzBdXG5cdFx0XHRcdDogb3B0aW9ucy5taXhpbnMgPSBTdXBlck9wdGlvbnMubWl4aW5zXG5cdFx0XHQ6IG9wdGlvbnMuZXh0ZW5kcyA9IFN1cGVyT3B0aW9ucztcblx0fVxuXHRcblx0X19kZXZfXyAmJiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY29uc3RydWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKHN5bWJvbCkge1xuXHRcdGlmICggc3ltYm9sIT09X21peGlucyAmJiAhKCBzeW1ib2wgaW4gU1lNQk9MUyApICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfc3ltYm9sKTsgfVxuXHR9KTtcblx0XG5cdHZhciBzZXQgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2U2V0LmJpbmQoX19kZXZfXykgOiBwcm9TZXQ7XG5cdHZhciBhc3NlcnRGdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgID0gX19kZXZfXyA/IGRldkFzc2VydEZ1bmN0aW9uLmJpbmQoX19kZXZfXykgOiBwcm9Bc3NlcnRGdW5jdGlvbjtcblx0XG5cdHZhciBzdGF0aWNOYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXMoY29uc3RydWN0b3IpO1xuXHRpbmRleCA9IHN0YXRpY05hbWVzLmxlbmd0aDtcblx0dmFyIHNoYWRvd0Fzc2lnbmVyICAgICAgICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBzdGF0aWNOYW1lID0gc3RhdGljTmFtZXNbLS1pbmRleF07XG5cdFx0aWYgKCBzdGF0aWNOYW1lPT09J1JlbmRlcicgKSB7IHZhciBSZW5kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSAgICAgICAgICAgICAgICAgICAgICAgOyB9XG5cdFx0Ly9AdHMtaWdub3JlXG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWU9PT0nbmFtZScgfHwgc3RhdGljTmFtZT09PSdsZW5ndGgnICkge1xuXHRcdFx0ZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25zdHJ1Y3Rvciwgc3RhdGljTmFtZSk7XG5cdFx0XHRpZiAoIGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgKSB7XG5cdFx0XHRcdGRlc2NyaXB0b3IuZW51bWVyYWJsZSAmJiBzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGFwcGx5KGRlc2NyaXB0b3IuZ2V0ICwgY29uc3RydWN0b3IsIEFSR1MpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHN0YXRpY05hbWUhPT0ncHJvdG90eXBlJyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCBzdGF0aWNOYW1lWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J3NldHVwJyB8fCBzdGF0aWNOYW1lPT09J3dhdGNoJyB8fCBzdGF0aWNOYW1lPT09J21ldGhvZHMnIHx8IHN0YXRpY05hbWU9PT0nY29tcHV0ZWQnIHx8IHN0YXRpY05hbWU9PT0nZXh0ZW5kcycgfHwgc3RhdGljTmFtZT09PSdkYXRhJyB8fCBzdGF0aWNOYW1lPT09J21peGlucycgfHxcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J2JlZm9yZUNyZWF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nY3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVNb3VudCcgfHwgc3RhdGljTmFtZT09PSdtb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVwZGF0ZScgfHwgc3RhdGljTmFtZT09PSd1cGRhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2FjdGl2YXRlZCcgfHwgc3RhdGljTmFtZT09PSdkZWFjdGl2YXRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVVbm1vdW50JyB8fCBzdGF0aWNOYW1lPT09J3VubW91bnRlZCcgfHwgc3RhdGljTmFtZT09PSdiZWZvcmVEZXN0cm95JyB8fCBzdGF0aWNOYW1lPT09J2Rlc3Ryb3llZCcgfHxcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHRzdGF0aWNOYW1lPT09J2luamVjdCcgfHwgc3RhdGljTmFtZT09PSdwcm9wcydcblx0XHRcdFx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9sYXlvdXQpOyB9XG5cdFx0XHR9XG5cdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBjb25zdHJ1Y3RvcltzdGF0aWNOYW1lXSk7XG5cdFx0fVxuXHR9XG5cdFxuXHR2YXIgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuXHRcblx0dmFyIHByb3RvTmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvdHlwZSk7XG5cdGluZGV4ID0gcHJvdG9OYW1lcy5sZW5ndGg7XG5cdHZhciB3YXRjaGVycyAgICAgICAgICAgID0gW107XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIHByb3RvTmFtZSA9IHByb3RvTmFtZXNbLS1pbmRleF07XG5cdFx0aWYgKCBwcm90b05hbWVbMF09PT0nXycgJiYgIXByb3RvTmFtZS5zdGFydHNXaXRoKCdfd2F0Y2g6JykgKSB7XG5cdFx0XHRpZiAoIF9fZGV2X18gKSB7XG5cdFx0XHRcdHZhciBwcm90b05hbWUxID0gcHJvdG9OYW1lLnNsaWNlKDEpO1xuXHRcdFx0XHRpZiAoIHByb3RvTmFtZTFbMF09PT0nXycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nc2V0dXAnIHx8IHByb3RvTmFtZTE9PT0nd2F0Y2gnIHx8IHByb3RvTmFtZTE9PT0nbWV0aG9kcycgfHwgcHJvdG9OYW1lMT09PSdjb21wdXRlZCcgfHwgcHJvdG9OYW1lMT09PSdleHRlbmRzJyB8fCBwcm90b05hbWUxPT09J2RhdGEnIHx8IHByb3RvTmFtZTE9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZW1pdHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcG9uZW50cycgfHwgcHJvdG9OYW1lMT09PSdkaXJlY3RpdmVzJyB8fCBwcm90b05hbWUxPT09J3N0YXRpY1JlbmRlckZucycgfHwgcHJvdG9OYW1lMT09PSd0ZW1wbGF0ZScgfHwgcHJvdG9OYW1lMT09PSdpbmhlcml0QXR0cnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSduYW1lJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nUmVuZGVyJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nZGVsaW1pdGVycycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2ZpbHRlcnMnIHx8IHByb3RvTmFtZTE9PT0nY29tbWVudHMnIHx8IHByb3RvTmFtZTE9PT0nZnVuY3Rpb25hbCcgfHwgcHJvdG9OYW1lMT09PSdwcm9wc0RhdGEnIHx8IHByb3RvTmFtZTE9PT0nbW9kZWwnXG5cdFx0XHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbGF5b3V0KTsgfVxuXHRcdFx0fVxuXHRcdFx0c2V0KG9wdGlvbnMsIHByb3RvTmFtZS5zbGljZSgxKSwgZ2V0KHByb3RvdHlwZSwgcHJvdG9OYW1lLCB1bmRlZmluZWQpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvdG9OYW1lKTtcblx0XHRcdGlmICggcHJvdG9OYW1lWzBdPT09J18nICkge1xuXHRcdFx0XHR2YXIgaW5kZXhPZlEgPSBwcm90b05hbWUuc2VhcmNoKFdBVENIX09QVElPTlMpO1xuXHRcdFx0XHR2YXIgd2F0Y2hlciA9IHdhdGNoZXJzW3dhdGNoZXJzLmxlbmd0aF0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgIDtcblx0XHRcdFx0aWYgKCBkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdFx0XHRcdHdhdGNoZXIuJCA9IGluZGV4T2ZRPDBcblx0XHRcdFx0XHRcdD8gcHJvdG9OYW1lLnNsaWNlKDcpXG5cdFx0XHRcdFx0XHQ6IHByb3RvTmFtZS5zbGljZSg3LCBpbmRleE9mUSk7XG5cdFx0XHRcdFx0d2F0Y2hlci5oYW5kbGVyID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0d2F0Y2hlci4kID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci5nZXQpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3Iuc2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGluZGV4T2ZRPjAgKSB7XG5cdFx0XHRcdFx0KytpbmRleE9mUTtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXhPZkEgPSBwcm90b05hbWUuaW5kZXhPZignOycsIGluZGV4T2ZRKTtcblx0XHRcdFx0XHRcdHZhciBwYWlyID0gaW5kZXhPZkE8MFxuXHRcdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZShpbmRleE9mUSlcblx0XHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEsIGluZGV4T2ZBKTtcblx0XHRcdFx0XHRcdGluZGV4T2ZRID0gaW5kZXhPZkEgKyAxO1xuXHRcdFx0XHRcdFx0dmFyIGluZGV4T2ZFID0gcGFpci5pbmRleE9mKCc9Jyk7XG5cdFx0XHRcdFx0XHRpbmRleE9mRTwwXG5cdFx0XHRcdFx0XHRcdD8gd2F0Y2hlcltwYWlyXSA9IHRydWVcblx0XHRcdFx0XHRcdFx0OiB3YXRjaGVyW3BhaXIuc2xpY2UoMCwgaW5kZXhPZkUpXSA9IHBhaXIuc2xpY2UoaW5kZXhPZkUgKyAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2hpbGUgKCBpbmRleE9mUSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRcdGlmICggcHJvdG9OYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICkge1xuXHRcdFx0XHRcdGlmICggcHJvdG9OYW1lIT09J2NvbnN0cnVjdG9yJyB8fCBkZXNjcmlwdG9yLnZhbHVlIT09Y29uc3RydWN0b3IgKSB7XG5cdFx0XHRcdFx0XHQoIG9wdGlvbnMubWV0aG9kcyB8fCAoIG9wdGlvbnMubWV0aG9kcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKVtwcm90b05hbWVdID0gYXNzZXJ0RnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCggb3B0aW9ucy5jb21wdXRlZCB8fCAoIG9wdGlvbnMuY29tcHV0ZWQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSApW3Byb3RvTmFtZV0gPSBkZXNjcmlwdG9yLnNldCA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvci5nZXQgICAgICAgO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHRfX2Rldl9fICYmIGNoZWNrKG9wdGlvbnMsIF9fZGV2X18sIERJRF9PUFRJT05TLCBUTVBfT1BUSU9OUyk7XG5cdFxuXHR2YXIgbmFtZXMgPSBjb2xsZWN0TmFtZXMob3B0aW9ucywgY29uc3RydWN0b3IpO1xuXHRcblx0aWYgKCBSZW5kZXIgJiYgVnVlMyApIHtcblx0XHR2YXIgc2hhZG93ID0gUmVuZGVyLnNoYWRvdztcblx0XHRpZiAoIHNoYWRvdyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHsgdmFyIHNoYWRvd0NoZWNrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBTaGFkb3dDaGVja2VyKHNoYWRvdywgbmFtZXMsIF9fZGV2X18pOyB9XG5cdFx0XHRzaGFkb3dBc3NpZ25lciA9IFNoYWRvd0Fzc2lnbmVyKHNoYWRvdyk7XG5cdFx0fVxuXHRcdG9wdGlvbnMucmVuZGVyID0gYXNzZXJ0RnVuY3Rpb24obmV3IFJlbmRlcihWdWUzKSk7XG5cdH1cblx0XG5cdHZhciBwcm90b1N5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvdG90eXBlKSAgICAgICAgICAgICAgICAgICA7XG5cdGluZGV4ID0gcHJvdG9TeW1ib2xzLmxlbmd0aDtcblx0dmFyIHN5bWJvbE1ldGhvZHMgPSBpbmRleCA/IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIHByb3RvU3ltYm9sICAgICAgICAgICAgICAgID0gcHJvdG9TeW1ib2xzWy0taW5kZXhdO1xuXHRcdHN5bWJvbE1ldGhvZHMgW3Byb3RvU3ltYm9sXSA9IGFzc2lnbihjcmVhdGUoTlVMTCksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvU3ltYm9sKSk7XG5cdH1cblx0XG5cdGlmICggd2F0Y2hlcnMubGVuZ3RoICkge1xuXHRcdHZhciBjcmVhdGVkID0gb3B0aW9ucy5jcmVhdGVkO1xuXHRcdG9wdGlvbnMuY3JlYXRlZCA9IGNyZWF0ZWRcblx0XHRcdD8gZnVuY3Rpb24gd2F0Y2hCZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7XG5cdFx0XHRcdCR3YXRjaCh0aGlzLCB3YXRjaGVycyk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVkIC5jYWxsKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0OiBmdW5jdGlvbiB3YXRjaEJlZm9yZUNyZWF0ZWQgKCAgICAgICAgICApIHsgJHdhdGNoKHRoaXMsIHdhdGNoZXJzKTsgfTtcblx0fVxuXHRcblx0b3B0aW9ucy5kYXRhID0gX19kZXZfX1xuXHRcdD8gZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIGRldkRhdGEoY29uc3RydWN0b3IsIHNlbGYgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcywgVnVlMywgbmFtZXMsIHNoYWRvd0Fzc2lnbmVyLCBzaGFkb3dDaGVja2VyLCBfX2Rldl9fKTsgfVxuXHRcdDogZnVuY3Rpb24gKHNlbGYgICAgICApIHsgcmV0dXJuIHByb0RhdGEoY29uc3RydWN0b3IsIHNlbGYgICAgICAgICAgICwgc3ltYm9sTWV0aG9kcywgVnVlMywgbmFtZXMsIHNoYWRvd0Fzc2lnbmVyKTsgfTtcblx0XG5cdFRNUF9PUFRJT05TLnNldChjb25zdHJ1Y3Rvciwgb3B0aW9ucyk7XG5cdFxuXHRpZiAoIG9wdGlvbnMuY29tcG9uZW50cyApIHtcblx0XHR2YXIgY29tcG9uZW50cyA9IG9wdGlvbnMuY29tcG9uZW50cyA9IGFzc2lnbihjcmVhdGUoTlVMTCksIG9wdGlvbnMuY29tcG9uZW50cyk7XG5cdFx0Zm9yICggdmFyIG5hbWUgaW4gY29tcG9uZW50cyApIHtcblx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0aWYgKCAvXig/IVtBLVpdKS8udGVzdChuYW1lKSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdFx0XHR9XG5cdFx0XHR2YXIgdmFsdWUgPSBjb21wb25lbnRzW25hbWVdO1xuXHRcdFx0aWYgKCBpc0NvbXBvbmVudENvbnN0cnVjdG9yKHZhbHVlKSApIHsgY29tcG9uZW50c1tuYW1lXSA9IFRvT3B0aW9ucyh2YWx1ZSwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTsgfVxuXHRcdH1cblx0fVxuXHRcblx0cmV0dXJuIG9wdGlvbnM7XG5cdFxufVxuXG52YXIgT1BUSU9OUyA9IFdlYWtNYXAgJiYgLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ1dlYWtNYXAsTWFwJywgJ1widXNlIHN0cmljdFwiO1xcXG5jbGFzcyBFYXN5TWFwIGV4dGVuZHMgV2Vha01hcHtpbnRvKGtleSl7bGV0IHN1Yj10aGlzLmdldChrZXkpO3N1Yj8/dGhpcy5zZXQoa2V5LHN1Yj1uZXcgRWFzeU1hcCk7cmV0dXJuIHN1Yn19RWFzeU1hcC5wcm90b3R5cGUuZ2V0PVdlYWtNYXAucHJvdG90eXBlLmdldDtFYXN5TWFwLnByb3RvdHlwZS5zZXQ9V2Vha01hcC5wcm90b3R5cGUuc2V0O1xcXG5jbGFzcyBTdHJvbmdNYXAgZXh0ZW5kcyBNYXB7fVN0cm9uZ01hcC5wcm90b3R5cGUuZ2V0PU1hcC5wcm90b3R5cGUuZ2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuc2V0PU1hcC5wcm90b3R5cGUuc2V0O1N0cm9uZ01hcC5wcm90b3R5cGUuZm9yRWFjaD1NYXAucHJvdG90eXBlLmZvckVhY2g7XFxcbnJldHVybntvYmplY3RzOm5ldyBFYXN5TWFwLG9iamVjdHNUbXA6U3Ryb25nTWFwLHN1cGVyczpuZXcgRWFzeU1hcCxuYW1lczpuZXcgRWFzeU1hcH1cXFxuJykoV2Vha01hcCwgTWFwKTtcblx0fVxuXHRjYXRjaCAoZXJyb3IpIHt9XG59KCkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcblxuZnVuY3Rpb24gaXNDb21wb25lbnRDb25zdHJ1Y3RvciAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGFwcGx5KGlzUHJvdG90eXBlT2YsIENvbXBvbmVudCwgWyB2YWx1ZSBdICAgICAgICAgKTsgfVxuXG52YXIgQVJHUyA9IFtdICAgICAgICAgO1xuXG52YXIgX01JWElOUyA9IFsgX21peGlucyBdICAgICAgICAgO1xuZnVuY3Rpb24gaXNNaXhpbnMgKGNvbnN0cnVjdG9yICAgICAgICAgICkgeyByZXR1cm4gYXBwbHkoaGFzT3duUHJvcGVydHksIGNvbnN0cnVjdG9yLCBfTUlYSU5TKTsgfVxuXG52YXIgU1lNQk9MUyA9IC8qI19fUFVSRV9fKi9nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkucmVkdWNlKGZ1bmN0aW9uIChTWU1CT0xTLCBuYW1lKSB7XG5cdGlmICggdHlwZW9mIFN5bWJvbFtuYW1lXT09PSdzeW1ib2wnICkgeyBTWU1CT0xTW1N5bWJvbFtuYW1lXSAgICAgICAgICAgICAgICAgXSA9IG51bGw7IH1cblx0cmV0dXJuIFNZTUJPTFM7XG59LCBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxudmFyIFdBVENIX09QVElPTlMgPSAvO1thLXo7PV0qJC87XG5mdW5jdGlvbiAkd2F0Y2ggKHRoYXQgICAgICAsIHdhdGNoZXJzICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIGluZGV4ID0gd2F0Y2hlcnMubGVuZ3RoO1xuXHRkbyB7XG5cdFx0dmFyIHdhdGNoZXIgICAgICA9IHdhdGNoZXJzWy0taW5kZXhdO1xuXHRcdHRoYXQuJHdhdGNoKHdhdGNoZXIuJCwgd2F0Y2hlci5oYW5kbGVyLCB3YXRjaGVyKTtcblx0fVxuXHR3aGlsZSAoIGluZGV4ICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZnVuY3Rpb24gY29sbGVjdE5hbWVzIChvcHRpb25zICAgICAgICAgICAgLCBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgKSAgICAgICAge1xuXHR2YXIgbmFtZXMgICAgICAgICAgICAgICAgICAgID0gT1BUSU9OUy5uYW1lcy5nZXQob3B0aW9ucyk7XG5cdGlmICggIW5hbWVzICkge1xuXHRcdGlmICggY29uc3RydWN0b3IgKSB7IG5hbWVzID0gT1BUSU9OUy5uYW1lcy5nZXQoY29uc3RydWN0b3IpOyB9XG5cdFx0aWYgKCAhbmFtZXMgKSB7XG5cdFx0XHRuYW1lcyA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0XHRcdHZhciBleHRlbmQgPSBvcHRpb25zLmV4dGVuZHM7XG5cdFx0XHRleHRlbmQgJiYgYXNzaWduKG5hbWVzLCBjb2xsZWN0TmFtZXMoZXh0ZW5kLCBudWxsKSk7XG5cdFx0XHR2YXIgbWl4aW5zID0gb3B0aW9ucy5taXhpbnM7XG5cdFx0XHRpZiAoIG1peGlucyApIHtcblx0XHRcdFx0dmFyIGluZGV4ID0gbWl4aW5zLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpbmRleCApIHsgYXNzaWduKG5hbWVzLCBjb2xsZWN0TmFtZXMobWl4aW5zWy0taW5kZXhdLCBudWxsKSk7IH1cblx0XHRcdH1cblx0XHRcdHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XG5cdFx0XHR2YXIgbmFtZSAgICAgICAgO1xuXHRcdFx0aWYgKCBpc0FycmF5KHByb3BzKSApIHsgZm9yICggaW5kZXggPSBwcm9wcy5sZW5ndGg7IGluZGV4OyApIHsgbmFtZSA9IHByb3BzWy0taW5kZXhdOyBuYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IG5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRwcm9wcyA9IG9wdGlvbnMuaW5qZWN0O1xuXHRcdFx0aWYgKCBpc0FycmF5KHByb3BzKSApIHsgZm9yICggaW5kZXggPSBwcm9wcy5sZW5ndGg7IGluZGV4OyApIHsgbmFtZSA9IHByb3BzWy0taW5kZXhdOyBuYW1lc1tuYW1lXSA9IG51bGw7IH0gfVxuXHRcdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IG5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMubWV0aG9kcyApIHsgbmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMuY29tcHV0ZWQgKSB7IG5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdH1cblx0XHRpZiAoIGNvbnN0cnVjdG9yICkgeyBPUFRJT05TLm5hbWVzLnNldChjb25zdHJ1Y3RvciwgbmFtZXMpOyB9XG5cdFx0T1BUSU9OUy5uYW1lcy5zZXQob3B0aW9ucywgbmFtZXMpO1xuXHR9XG5cdHJldHVybiBuYW1lcztcbn1cblxuZnVuY3Rpb24gcHJvU2V0ICAgIChvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICwgbmFtZSAgICAgICAgLCB2YWx1ZSAgICkgeyBvYmplY3RbbmFtZV0gPSB2YWx1ZTsgfVxuZnVuY3Rpb24gZGV2U2V0ICAgICggICAgICAgICAgICAgICBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICwgbmFtZSAgICAgICAgLCB2YWx1ZSAgICkge1xuXHRpZiAoIG5hbWUgaW4gb2JqZWN0ICkgeyB0aHJvdyBFcnJvcih0aGlzLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcHJvQXNzZXJ0RnVuY3Rpb24gICAgKGZuICAgKSB7IHJldHVybiBmbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsgfVxuZnVuY3Rpb24gZGV2QXNzZXJ0RnVuY3Rpb24gICAgKCAgICAgICAgICAgICAgIGZuICAgKSB7XG5cdGlmICggdHlwZW9mIGZuIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKHRoaXMuY29tcGlsZV90eXBlKTsgfVxuXHRyZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59XG5cbmZ1bmN0aW9uIGZvcktleXMgKG9wdGlvbiAgICAgICAgICAgICAgICAsIGNhbGxiYWNrICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdGlmICggaXNBcnJheShvcHRpb24pICkgeyBvcHRpb24uZm9yRWFjaChjYWxsYmFjayk7IH1cblx0ZWxzZSB7IGZvciAoIHZhciBrZXkgaW4gb3B0aW9uICkgeyBjYWxsYmFjayhrZXkpOyB9IH1cbn1cbmZ1bmN0aW9uIGNoZWNrIChvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIF9fZGV2X18gICAgICAgICAsIERJRF9PUFRJT05TICAgICAgICAgLCBUTVBfT1BUSU9OUyAgICAgICAgICkge1xuXHRcblx0KCBvcHRpb25zLmV4dGVuZHMgPyBbIG9wdGlvbnMuZXh0ZW5kcyBdIDogW10gKS5jb25jYXQob3B0aW9ucy5taXhpbnMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKG1peGluKSB7XG5cdFx0RElEX09QVElPTlMuaGFzKG1peGluKSB8fCBUTVBfT1BUSU9OUy5oYXMobWl4aW4pIHx8IGNoZWNrKG1peGluLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpO1xuXHR9KTtcblx0XG5cdHZhciBuYW1lcyA9IG5ldyBTZXQgICAgICAgICgpO1xuXHRcblx0Zm9yS2V5cyhvcHRpb25zLnByb3BzLCBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmICggLy18Xig/OmtleSR8W29PXVtuTl18cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9wcm9wcyk7IH1cblx0XHRpZiAoIG5hbWUgaW4gUFJPVE9fQlVHICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcHJvdG8pOyB9XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWVzLnNpemU9PT1uYW1lcy5hZGQobmFtZSkuc2l6ZSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0fSk7XG5cdFxuXHRmb3JLZXlzKG9wdGlvbnMuaW5qZWN0LCBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lcy5zaXplPT09bmFtZXMuYWRkKG5hbWUpLnNpemUgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdH0pO1xuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7XG5cdFx0aWYgKCBuYW1lWzBdPT09J18nIHx8IG5hbWVbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoIG5hbWVzLnNpemU9PT1uYW1lcy5hZGQobmFtZSkuc2l6ZSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3JlZGVmaW5lZCk7IH1cblx0fVxuXHRcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zLmNvbXB1dGVkICkge1xuXHRcdGlmICggbmFtZVswXT09PSdfJyB8fCBuYW1lWzBdPT09JyQnICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0aWYgKCBuYW1lcy5zaXplPT09bmFtZXMuYWRkKG5hbWUpLnNpemUgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZWRlZmluZWQpOyB9XG5cdH1cblx0XG5cdHZhciBuYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRpZiAoIG5hbWUgKSB7XG5cdFx0aWYgKFxuXHRcdFx0L14oPyFbQS1aXSkvLnRlc3QobmFtZSlcblx0XHRcdHx8XG5cdFx0XHRvcHRpb25zLmNvbXBvbmVudHMgJiYgbmFtZSBpbiBvcHRpb25zLmNvbXBvbmVudHNcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdH1cblx0XG5cdG9wdGlvbnMuZW1pdHMgJiZcblx0KCBpc0FycmF5KG9wdGlvbnMuZW1pdHMpID8gb3B0aW9ucy5lbWl0cyA6IGtleXMob3B0aW9ucy5lbWl0cykgKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGlmICggL1tBLVpdfF5vbnZub2RlfCg/OmNhcHR1cmV8b25jZXxwYXNzaXZlKSQvLnRlc3QoJ29uJyArIGV2ZW50KSApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2VtaXRzKTsgfVxuXHR9KTtcblx0XG5cdGlmIChcblx0XHRvcHRpb25zLmRpcmVjdGl2ZXMgJiYgJ2lzJyBpbiBvcHRpb25zLmRpcmVjdGl2ZXMvLyAyXG5cdFx0fHwvL0B0cy1pZ25vcmVcblx0XHRvcHRpb25zLnByb3BzICYmICggaXNBcnJheShvcHRpb25zLnByb3BzKSA/IG9wdGlvbnMucHJvcHMuaW5jbHVkZXMoJ2lzJykgOiAnaXMnIGluIG9wdGlvbnMucHJvcHMgKS8vIDNcblx0KSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9pcyk7IH1cblx0XG5cdFRNUF9PUFRJT05TLnNldChvcHRpb25zLCBudWxsKTtcblx0XG59XG5cbnZhciBERVYgPSBbXG5cdCdjb21waWxlX25hbWUnLFxuXHQnY29tcGlsZV9wcm90bycsXG5cdCdjb21waWxlX3Byb3BzJyxcblx0J2NvbXBpbGVfZW1pdHMnLFxuXHQnY29tcGlsZV9pcycsXG5cdCdjb21waWxlX2xheW91dCcsXG5cdCdjb21waWxlX3Jlc2VydmVkJyxcblx0J2NvbXBpbGVfcmVkZWZpbmVkJyxcblx0J2NvbXBpbGVfdHlwZScsXG5cdCdjb21waWxlX3N5bWJvbCcsXG5cdCdjb21waWxlX3NoYWRvdycsXG5cdCdydW50aW1lX3NoYWRvdycsXG5cdCdydW50aW1lX3JlZGVmaW5lZCcsXG5cdCdydW50aW1lX3N5bWJvbCcsXG5cdCdydW50aW1lX3Jlc2VydmVkJyxcblx0J3J1bnRpbWVfZW51bWVyYWJsZScsXG5dICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgIFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4vSWRlbnRpZmllcic7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vVGVtcGxhdGUnO1xuaW1wb3J0IFJlbmRlciwgeyBTdGF0aWNSZW5kZXJGbnMgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmltcG9ydCBTdHlsZSwgeyByZW1vdmUgfSBmcm9tICcuL1N0eWxlLCByZW1vdmUnO1xuaW1wb3J0IENvbXBvbmVudCwgeyBtaXhpbiB9IGZyb20gJy4vQ29tcG9uZW50LCBtaXhpbi8nO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRJZGVudGlmaWVyLFxuXHRTY29wZSxcblx0VGVtcGxhdGUsXG5cdFJlbmRlciwgU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZSwgcmVtb3ZlLFxuXHRDb21wb25lbnQsIG1peGluLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlOiBTdHlsZSwgcmVtb3ZlOiByZW1vdmUsXG5cdENvbXBvbmVudDogQ29tcG9uZW50LCBtaXhpbjogbWl4aW4sXG59KTtcbiJdLCJuYW1lcyI6WyJTeW1ib2wiLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsIlJlZ0V4cCIsIkZ1bmN0aW9uIiwia2V5cyIsIktleXMiLCJnZXRQcm90b3R5cGVPZiIsIkVycm9yIiwiZ2V0IiwiV2Vha01hcCIsIk1hcCIsIlR5cGVFcnJvciIsIlNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjLFFBQVE7O0FDQXRCLG1CQUFlO0FBQ2YsQ0FBQyxLQUFLO0FBQ04sQ0FBQyxLQUFLO0FBQ04sQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFP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QixDQUFDLG1CQUFtQjtBQUNwQixDQUFDLGNBQWM7QUFDZixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLG1CQUFtQjtBQUNwQixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLGtCQUFrQjtBQUNuQixDQUFDLG9CQUFvQjtBQUNyQixDQUFDOztBQ2xiRCxjQUFlLE9BQU8sQ0FBQztBQUN2QixDQUFDLE9BQU8sRUFBRSxPQUFPO0FBQ2pCLENBQUMsVUFBVSxFQUFFLFVBQVU7QUFDdkIsQ0FBQyxLQUFLLEVBQUUsS0FBSztBQUNiLENBQUMsUUFBUSxFQUFFLFFBQVE7QUFDbkIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxlQUFlO0FBQ2pELENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtBQUM3QixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUs7QUFDbkMsQ0FBQyxDQUFDOzs7Ozs7OzsiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL0Zyb250RW5kUnVudGltZURlcGVuZGVuY3kvIn0=