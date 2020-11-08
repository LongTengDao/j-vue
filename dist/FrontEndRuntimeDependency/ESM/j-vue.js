/*!@preserve@license
 * 模块名称：j-vue
 * 模块功能：构建后的 .vue 文件的前端运行时依赖。从属于“简计划”。
   　　　　　The front-end runtime dependency for built .vue files. Belong to "Plan J".
 * 模块版本：17.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

var version = '17.0.0';

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
				TMP_OPTIONS.forEach(function (optionsValue, constructorKey) { DID_OPTIONS.set(constructorKey, optionsValue); });
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
		collectNames(options);
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
				descriptor.hasOwnProperty('value')
					? protoName==='constructor' && descriptor.value===constructor || set(options.methods || ( options.methods = create(NULL)                                       ), protoName, assertFunction(descriptor.value))
					: set(options.computed || ( options.computed = create(NULL)                                        ), protoName, descriptor.set ? {
						get: descriptor.get,
						set: descriptor.set
					} : descriptor.get);
			}
		}
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
	
	if ( Render ) {
		if ( Vue3 ) {
			var shadow                     = Render.shadow;
			options.render = assertFunction(new Render(Vue3));
			if ( shadow ) { shadowAssigner = ShadowAssigner(shadow); }
		}
		else {
			if ( !options.render && !options.template ) {
				options.render = __dev__ ? function () { throw Error$1(__dev__.render); } : render;
			}
		}
	}
	
	var names = collectNames(options);
	
	if ( __dev__ ) {
		getOwnPropertySymbols(constructor).forEach(function (symbol) {
			if ( symbol!==_mixins && !( symbol in SYMBOLS ) ) { throw Error$1(__dev__.compile_symbol); }
		});
		check(options, names, __dev__);
		if ( shadow ) { var shadowChecker                            = ShadowChecker(shadow, names, __dev__); }
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

var WATCH_OPTIONS = /;[a-z;=]*$/;
function $watch (that      , watchers                    ) {
	var index = watchers.length;
	do {
		var watcher      = watchers[--index];
		that.$watch(watcher.$, watcher.handler, watcher);
	}
	while ( index );
}

function render ()        { throw Error$1('render'); }

                                                
function collectNames (options            )        {
	var names                    = OPTIONS.names.get(options);
	if ( !names ) {
		names = create(NULL)         ;
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

var SYMBOLS = /*#__PURE__*/getOwnPropertyNames(Symbol$1).reduce(function (SYMBOLS, name) {
	if ( typeof Symbol$1[name]==='symbol' ) { SYMBOLS[Symbol$1[name]                 ] = null; }
	return SYMBOLS;
}, create(NULL)                         );

function check (options            , names       , __dev__         ) {
	
	var name        ;
	
	//@ts-ignore
	if ( ( name = options.name ) ) {
		if (
			/^(?![A-Z])/.test(name)
			||
			options.components && name in options.components
		) { throw Error$1(__dev__.compile_name); }
	}
	
	if ( options.props ) {
		if ( isArray(options.props) ) { options.props.forEach(function (name) { if ( /-|^(?:constructor$|key$|[oO][nN]|ref$)/.test(name) ) { throw Error$1(name==='constructor' ? __dev__.compile_constructor : __dev__.compile_props); } }); }
		else { for ( name in options.props ) { if ( /-|^(?:constructor$|key$|[oO][nN]|ref$)/.test(name) ) { throw Error$1(name==='constructor' ? __dev__.compile_constructor : __dev__.compile_props); } } }
	}
	
	if ( options.computed && 'constructor' in options.computed ) { throw Error$1(__dev__.compile_constructor); }
	
	options.emits &&
	( isArray(options.emits) ? options.emits : keys(options.emits) ).forEach(function (event) {
		if ( /[A-Z]|^onvnode|(?:capture|once|passive)$/.test('on' + event) ) { throw Error$1(__dev__.compile_emits); }
	});
	
	if (
		options.directives && 'is' in options.directives// 2
		||//@ts-ignore
		options.props && ( isArray(options.props) ? options.props.includes('is') : 'is' in options.props )// 3
	) { throw Error$1(__dev__.compile_is); }
	
}

var DEV = [
	'compile_name',
	'compile_constructor',
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

var _export = Default({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
});

export default _export;
export { Component, Identifier, Render, Scope, StaticRenderFns, Style, Template, mixin, remove, version };

/*¡ j-vue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIi4uLy4uL2xpYi9jc3Mta2V5d29yZHMvZGlzdC5qcyIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLXJlZ2V4cC9zcmMvZ3JvdXBpZnkudHMiLCJTY29wZS9fLnRzIiwiU2NvcGUvU3RhdGljU2NvcGUudHMiLCJTY29wZS9EeW5hbWljU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlN0eWxlLCByZW1vdmUudHMiLCIuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mIiwiQ29tcG9uZW50LCBtaXhpbi9EYXRhLnRzIiwiQ29tcG9uZW50LCBtaXhpbi9TaGFkb3cudHMiLCJDb21wb25lbnQsIG1peGluLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxNy4wLjAnOyIsImV4cG9ydCBkZWZhdWx0IFtcblx0J2FsbCcsXG5cdCdsYW8nLFxuXHQnYXV0bycsXG5cdCdkaXNjJyxcblx0J25vbmUnLFxuXHQnc3BhbicsXG5cdCd0aGFpJyxcblx0J2tobWVyJyxcblx0J29yaXlhJyxcblx0J3RhbWlsJyxcblx0J3Vuc2V0Jyxcblx0J2NpcmNsZScsXG5cdCdoZWJyZXcnLFxuXHQnaW5saW5lJyxcblx0J3JldmVydCcsXG5cdCdzcXVhcmUnLFxuXHQndGVsdWd1Jyxcblx0J2JlbmdhbGknLFxuXHQnZGVjaW1hbCcsXG5cdCdkZWZhdWx0Jyxcblx0J2luaGVyaXQnLFxuXHQnaW5pdGlhbCcsXG5cdCdrYW5uYWRhJyxcblx0J215YW5tYXInLFxuXHQnb3V0c2lkZScsXG5cdCdwZXJzaWFuJyxcblx0J3RpYmV0YW4nLFxuXHQnYXJtZW5pYW4nLFxuXHQnY29udGVudHMnLFxuXHQnZ2VvcmdpYW4nLFxuXHQnZ3VqYXJhdGknLFxuXHQnZ3VybXVraGknLFxuXHQnaGlyYWdhbmEnLFxuXHQna2F0YWthbmEnLFxuXHQnY2FtYm9kaWFuJyxcblx0J21hbGF5YWxhbScsXG5cdCdtb25nb2xpYW4nLFxuXHQnZGV2YW5hZ2FyaScsXG5cdCdub3RyYW5zbGF0ZScsXG5dOyIsImltcG9ydCBDU1NfS0VZV09SRFMgZnJvbSAnbGliOmNzcy1rZXl3b3Jkcyc7XG5cbnZhciBpbmNyZWFzZURpY3Rpb25hcnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHtcblx0MDogJzEnLCAxOiAnMicsIDI6ICczJywgMzogJzQnLCA0OiAnNScsIDU6ICc2JywgNjogJzcnLCA3OiAnOCcsIDg6ICc5JywgOTogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn07XG52YXIgbGF0ZXN0SWRlbnRpZmllciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyAnOScgXTtcbnZhciBsYXN0Q2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSAnOSc7XG52YXIgbGFzdEluZGV4ICAgICAgICAgPSAwO1xuXG52YXIgY3NzX2tleXdvcmQgICAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRsYXRlc3RJZGVudGlmaWVyLmpvaW4gPSBsYXRlc3RJZGVudGlmaWVyLmpvaW47XG5cdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCA9IGxhdGVzdElkZW50aWZpZXIudW5zaGlmdDtcblx0Q1NTX0tFWVdPUkRTLnNoaWZ0ID0gQ1NTX0tFWVdPUkRTLnNoaWZ0O1xuXHRyZXR1cm4gQ1NTX0tFWVdPUkRTLnNoaWZ0KCkgO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJZGVudGlmaWVyICgpICAgICAgICAge1xuXHRcblx0aWYgKCBsYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIGNoYXJhY3RlckluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIGNoYXJhY3RlckluZGV4ICkge1xuXHRcdFx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyWy0tY2hhcmFjdGVySW5kZXhdO1xuXHRcdFx0XHRpZiAoIGNoYXJhY3Rlcj09PSd6JyApIHsgbGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSAnMCc7IH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbY2hhcmFjdGVyXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhc3RJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3Rlcl07XG5cdH1cblx0XG5cdHZhciBpZGVudGlmaWVyICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRpZiAoIGlkZW50aWZpZXI9PT1jc3Nfa2V5d29yZCApIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXIgICAgICAgICAgICAgXTtcblx0XHRpZGVudGlmaWVyID0gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0XHRjc3Nfa2V5d29yZCA9IENTU19LRVlXT1JEUy5zaGlmdCgpIHx8IG51bGw7XG5cdH1cblx0cmV0dXJuIGlkZW50aWZpZXI7XG5cdFxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXJhY3RlcikgKSB7IGNoYXJhY3RlciA9ICdcXFxcJytjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gICAgICA9IFN5bWJvbCA/IC8qI19fUFVSRV9fKi9TeW1ib2woJ18nKSAgICAgICAgOiAnXyc7XG5cbmZ1bmN0aW9uICQgICAgICAgICAgICAgICAgICAoICAgICAgICAgY3NzICAgICAgICAgLCBtZWRpYSAgICAgICAgICkgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSB0aGlzW19dKGNzcyk7IH1cblx0aWYgKCBtZWRpYSE9PXVuZGVmaW5lZCApIHsgc3R5bGUubWVkaWEgPSBtZWRpYTsgfVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCB7IF8sICQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIHByZXBhcmVfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gdHlwZW9mIF89PT0nc3ltYm9sJyA/IG51bGwgOiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR2YXIgX2Rlc2NyaXB0b3IgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgO1xuXHRfZGVzY3JpcHRvci52YWx1ZSA9IG51bGw7XG5cdF9kZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0X2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IHRydWU7XG5cdF9kZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSAgICAgICApIHsgZGVmaW5lUHJvcGVydHkoc2NvcGUsIF8sIF9kZXNjcmlwdG9yKTsgfTtcbn0oKTtcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzICAgICAgICAgICkgeyByZXR1cm4gbmV3IFJlZ0V4cCgnX18nICsgZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpICsgJ19fJywgJ2cnKTsgfVxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkgeyByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07IH1cblxudmFyIFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyAmJiBwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbnZhciBTQ09QRSAgICAgICAgICAgICAgPSBTdGF0aWNTY29wZS5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovZnJlZXplKGNyZWF0ZShudWxsLCB7XG5cdCQ6IHsgdmFsdWU6ICQsIHdyaXRhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UgfSxcbn0pICAgICAgICAgICAgICAgKTtcblxudmFyIEluaGVyaXRlZFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfICYmIHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKCAqL1xuXHRcdGtleXNba2V5cy5sZW5ndGhdID0ga2V5LyogKSovO1xuXHR9XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgeyBTdGF0aWNTY29wZSwgU0NPUEUsIEluaGVyaXRlZFN0YXRpY1Njb3BlIH07XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBnZXQgKGNhY2hlICAgICAgICAgICAgICwga2V5ICAgICAgICApICAgICAgICAgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhY2hlICAgICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBrZXlzICAgICAgICAsXG5cdFx0aW5kZXggICAgICAgICxcblx0XHR2YWx1ZXMgICAgICAgICAgLFxuXHRcdGtleSAgICAgICAgO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdldChjYWNoZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gdmFsdWVbLS1pbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGdldChjYWNoZSwga2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlWy0taW5kZXhdLCBjYWNoZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK2dldChjYWNoZSwga2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRpZiAoIGxlbmd0aD4xICkge1xuXHRcdFx0dmFsdWUgPSBbIHZhbHVlLCBhcmd1bWVudHNbMV0gXTtcblx0XHRcdGZvciAoIHZhciBpbmRleCA9IDI7IGluZGV4IT09bGVuZ3RoOyArK2luZGV4ICkgeyAoIHZhbHVlICAgICAgICAgIClbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gc2NvcGlmeSh2YWx1ZSwgY2FjaGUpO1xuXHR9ICAgICAgICAgICAgICAgIDtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGdldChjYWNoZSwgX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZXhwb3J0IHsgRHluYW1pY1Njb3BlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImV4cG9ydCBkZWZhdWx0IC9bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKi9pZzsiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IFN0YXRpY1Njb3BlLCBJbmhlcml0ZWRTdGF0aWNTY29wZSwgU0NPUEUgfSBmcm9tICcuL1N0YXRpY1Njb3BlJztcbmltcG9ydCBEeW5hbWljU2NvcGUgZnJvbSAnLi9EeW5hbWljU2NvcGUnO1xuaW1wb3J0IEtFWVMgZnJvbSAnLi9LRVlTJztcblxudmFyIEVNUFRZICAgICAgICAgICA9IFtdO1xuXG5mdW5jdGlvbiBtaXggKHByb3RvcyAgICAgICAgICkgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlICAgICAgICAgICAgICA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byAgICAgICAgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5mdW5jdGlvbiBTY29wZSAoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICkgICAgICAgIHtcblx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgU3RhdGljU2NvcGUgKSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlICAgICAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gbmV3IFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cbn1cblNjb3BlLnByb3RvdHlwZSA9IG51bGwgICAgICAgO1xuXG5leHBvcnQgeyBTY29wZSBhcyBkZWZhdWx0LCBLRVlTIH07IiwiaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFRlbXBsYXRlIChodG1sICAgICAgICAsIHNjb3BlICAgICAgICkgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovc2NvcGVbX10oaHRtbCk7XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlIGFzIGRlZmF1bHQgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbnZhciBOT1RfRVM1ID0gL14oY29uc3xsZSl0IC87XG5cbmZ1bmN0aW9uIFdpdGhTdHJpcHBlZCAocmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0cmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlO1xuXHRyZXR1cm4gcmVuZGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXIgKGNvZGUgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdHJldHVybiBjb2RlWzBdPT09JygnXG5cdFx0PyAvKiNfX1BVUkVfXyovRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybiBjbGFzcyBSZW5kZXIgZXh0ZW5kcyBudWxse2NvbnN0cnVjdG9yJysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9OycpKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0OiAvKiNfX1BVUkVfXyovV2l0aFN0cmlwcGVkKFxuXHRcdFx0LyojX19QVVJFX18qL0Z1bmN0aW9uKE5PVF9FUzUudGVzdChjb2RlKVxuXHRcdFx0XHQ/ICdcInVzZSBzdHJpY3RcIjtyZXR1cm57cmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9fS5yZW5kZXI7J1xuXHRcdFx0XHQ6ICdcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24gcmVuZGVyKCl7Jysoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKyd9Oydcblx0XHRcdCkoKSAgICAgICAgICBcblx0XHQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGNvZGVzLmxlbmd0aDtcblx0dmFyIGJvZHkgICAgICAgICA9ICddJztcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4OyApIHsgYm9keSA9ICdmdW5jdGlvbigpeycrc2NvcGVfKGNvZGVzWy0taW5kZXhdKSsnfSwnK2JvZHk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHR3aGlsZSAoIGluZGV4ICkgeyBib2R5ID0gJ2Z1bmN0aW9uKCl7Jytjb2Rlc1stLWluZGV4XSsnfSwnK2JvZHk7IH1cblx0fVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVyblsnK2JvZHkpKCk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHlsZSAoY3NzICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBSZWZsZWN0IT09J3VuZGVmaW5lZCcgJiYgUmVmbGVjdC5nZXRQcm90b3R5cGVPZiE9PXVuZGVmaW5lZCA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiAvKiNfX1BVUkVfXyovIE9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBLZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzPyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSAnLk9iamVjdC5nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgcHJvcGVydHlJc0VudW1lcmFibGUgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbmV4cG9ydCB2YXIgdGhhdCAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvRGF0YSAoY29uc3RydWN0b3IgICAgICAgICAgLCBzZWxmICAgICAgICAgLCBzeW1ib2xNZXRob2RzICAgICAgICAgICAgICAgICAgICAgICwgVnVlMyAgICAgICAgICAgICAgICAgICAsIG5hbWVzICAgICAgICwgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIF8gPSBzZWxmLl87XG5cdHZhciBjdHggPSBfID8gXy5jdHggOiBzZWxmO1xuXHR2YXIgYWNjZXNzQ2FjaGUgPSBfICYmIF8uYWNjZXNzQ2FjaGU7XG5cdHN5bWJvbE1ldGhvZHMgJiYgZGVmaW5lUHJvcGVydGllcyhjdHgsIHN5bWJvbE1ldGhvZHMpO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHR2YXIgZGF0YSA9IGNyZWF0ZShOVUxMKSAgICAgICAgO1xuXHRpZiAoIGFjY2Vzc0NhY2hlICkge1xuXHRcdGZvciAoIHZhciBuYW1lIGluIGN0eCApIHtcblx0XHRcdGlmICggISggbmFtZSBpbiBuYW1lcyApICkge1xuXHRcdFx0XHRkYXRhW25hbWVdID0gY3R4W25hbWUgICAgICAgICAgICAgICAgIF07XG5cdFx0XHRcdGlmICggbmFtZSBpbiBhY2Nlc3NDYWNoZSApIHsgYWNjZXNzQ2FjaGVbbmFtZSAgICAgICAgICAgICAgICAgXSA9IHVuZGVmaW5lZDsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR2YXIga2V5cyA9IEtleXMoY3R4KTtcblx0XHR2YXIgaW5kZXggPSBrZXlzLmxlbmd0aDtcblx0XHRkbyB7XG5cdFx0XHR2YXIga2V5ID0ga2V5c1stLWluZGV4XTtcblx0XHRcdGlmICggISgga2V5IGluIG5hbWVzICkgJiYga2V5WzBdIT09JyQnICYmIGtleVswXSE9PSdfJyApIHsgZGF0YVtrZXldID0gY3R4W2tleV07IH1cblx0XHR9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHR9XG5cdHNoYWRvd0Fzc2lnbmVyICYmIHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcblx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZEYXRhIChjb25zdHJ1Y3RvciAgICAgICAgICAsIHNlbGYgICAgICAgICAsIHN5bWJvbE1ldGhvZHMgICAgICAgICAgICAgICAgICAgICAgLCBWdWUzICAgICAgICAgICAgICAgICAgICwgbmFtZXMgICAgICAgLCBzaGFkb3dBc3NpZ25lciAgICAgICAgICAgICAgICAgICAgICAgLCBzaGFkb3dDaGVja2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSB7XG5cdFxuXHR2YXIgXyA9IHNlbGYuXztcblx0dmFyIGN0eCA9IF8gPyBfLmN0eCA6IHNlbGY7XG5cdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGN0eCk7XG5cdHZhciBhY2Nlc3NDYWNoZSA9IF8gJiYgXy5hY2Nlc3NDYWNoZTtcblx0dmFyIG9sZERlc2NyaXB0b3JzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhjdHgpLCBzeW1ib2xNZXRob2RzKTtcblx0ZGVmaW5lUHJvcGVydGllcyhjdHgsIHN5bWJvbE1ldGhvZHMgfHwge30pO1xuXHRcblx0dmFyIHByZXZpb3VzID0gdGhhdDtcblx0dGhhdCA9IHNlbGY7XG5cdHRyeSB7IG5ldyBjb25zdHJ1Y3RvcihWdWUzKTsgfVxuXHRmaW5hbGx5IHsgdGhhdCA9IHByZXZpb3VzOyB9XG5cdFxuXHRvd25LZXlzKG9sZERlc2NyaXB0b3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHR2YXIgb2xkRGVzY3JpcHRvciA9IG9sZERlc2NyaXB0b3JzW2tleV0gO1xuXHRcdHZhciBuZXdEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN0eCwga2V5ICAgICAgICAgICAgICAgICApO1xuXHRcdGlmIChcblx0XHRcdCFuZXdEZXNjcmlwdG9yIHx8XG5cdFx0XHRuZXdEZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSE9PW9sZERlc2NyaXB0b3IuY29uZmlndXJhYmxlIHx8XG5cdFx0XHRuZXdEZXNjcmlwdG9yLmVudW1lcmFibGUhPT1vbGREZXNjcmlwdG9yLmVudW1lcmFibGUgfHxcblx0XHRcdCggbmV3RGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdD8gbmV3RGVzY3JpcHRvci52YWx1ZSE9PW9sZERlc2NyaXB0b3IudmFsdWUgfHwgbmV3RGVzY3JpcHRvci53cml0YWJsZSE9PW9sZERlc2NyaXB0b3Iud3JpdGFibGVcblx0XHRcdFx0XHQvL0B0cy1pZ25vcmVcblx0XHRcdFx0XHQ6IG5ld0Rlc2NyaXB0b3IuZ2V0IT09b2xkRGVzY3JpcHRvci5nZXQgfHwgbmV3RGVzY3JpcHRvci5zZXQhPT1vbGREZXNjcmlwdG9yLnNldFxuXHRcdFx0KVxuXHRcdCkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfcmVkZWZpbmVkKTsgfVxuXHR9KTtcblx0dmFyIGRpZktleXMgPSBvd25LZXlzKGN0eCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gISgga2V5IGluIG9sZERlc2NyaXB0b3JzICk7XG5cdH0pO1xuXHRkaWZLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGlmICgga2V5IGluIHByb3RvICYmICEoIGtleSBpbiB7fSApIHx8IGtleSBpbiBuYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3JlZGVmaW5lZCk7IH1cblx0XHRpZiAoIHR5cGVvZiBrZXk9PT0nc3ltYm9sJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5ydW50aW1lX3N5bWJvbCk7IH1cblx0XHRpZiAoIGtleVswXT09PSdfJyB8fCBrZXlbMF09PT0nJCcgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9yZXNlcnZlZCk7IH1cblx0XHRpZiAoICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGN0eCwga2V5KSkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfZW51bWVyYWJsZSk7IH1cblx0fSk7XG5cdFxuXHR2YXIgZGF0YSA9IGNyZWF0ZShOVUxMKSAgICAgICAgO1xuXHRkaWZLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdCggZGF0YSAgICAgICAgIClba2V5XSA9IGN0eFtrZXldO1xuXHRcdGlmICggYWNjZXNzQ2FjaGUgJiYga2V5IGluIGFjY2Vzc0NhY2hlICkgeyBhY2Nlc3NDYWNoZVtrZXldID0gdW5kZWZpbmVkOyB9XG5cdH0pO1xuXHRpZiAoIHNoYWRvd0Fzc2lnbmVyICkge1xuXHRcdHNoYWRvd0NoZWNrZXIgKGRhdGEpO1xuXHRcdHNoYWRvd0Fzc2lnbmVyKHNlbGYsIGRhdGEpO1xuXHR9XG5cdHJldHVybiBkYXRhO1xuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGhhc093blByb3BlcnR5IGZyb20gJy5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5JztcbmltcG9ydCBOVUxMIGZyb20gJy5udWxsLnByb3RvdHlwZSc7XG5cbnZhciBJTklUID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dmFyIElOSVQgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICA7XG5cdElOSVQubW9kZSA9ICdvcGVuJztcblx0cmV0dXJuIElOSVQ7XG59KCk7XG5cbmZ1bmN0aW9uIGF0dGFjaCAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIHsgcmV0dXJuIGVsICYmICggZWwuc2hhZG93Um9vdCB8fCBlbC5hdHRhY2hTaGFkb3coSU5JVCkgKTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgZnVuY3Rpb24gU2hhZG93QXNzaWduZXIgKCAgICAgICAgICAgIGFsb25nICAgICAgICApICAgICAgICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGFsb25nLmluZGV4T2YoJy4nKTtcblx0dmFyIG5hbWVzID0gaW5kZXg8MCA/IG51bGwgOiBhbG9uZy5zbGljZShpbmRleCArIDEpLnNwbGl0KCcuJyk7XG5cdHZhciB0b05hbWUgPSBuYW1lcyA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIG5hbWVzICkge1xuXHRcdGlmICggbmFtZXMubGVuZ3RoPT09MSApIHtcblx0XHRcdHZhciBuYW1lJGdldCA9IG5hbWVzWzBdICsgJyRnZXQnO1xuXHRcdFx0dmFyIG5hbWUkc2V0ID0gbmFtZXNbMF0gKyAnJHNldCc7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCAgICAgICAgICAgIHNlbGYgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdFx0XHR2YXIgYWxsID0gZGF0YVt0b05hbWVdID0gY3JlYXRlKE5VTEwpICAgICAgIDtcblx0XHRcdFx0YWxsW25hbWUkc2V0XSA9IGZ1bmN0aW9uICggICAgICAgICAgICBlbCAgICAgICAgICAgICAgICAgICAgKSB7IHNlbGZbdG9OYW1lXSBbbmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0YWxsW25hbWUkZ2V0XSA9IG51bGw7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzZWxmICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0dmFyIGFsbCA9IGRhdGFbdG9OYW1lXSA9IGNyZWF0ZShOVUxMKSAgICAgICA7XG5cdFx0XHRcdG5hbWVzIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lICAgICAgICApIHtcblx0XHRcdFx0XHRhbGxbbmFtZSArICckc2V0J10gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZV0gW25hbWVdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdFx0XHRhbGxbbmFtZSArPSAnJGdldCddID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciB0b05hbWUkZ2V0ID0gdG9OYW1lICsgJyRnZXQnO1xuXHRcdHZhciB0b05hbWUkc2V0ID0gdG9OYW1lICsgJyRzZXQnO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoICAgICAgICAgICAgc2VsZiAgICAgLCBkYXRhICAgICApIHtcblx0XHRcdGRhdGFbdG9OYW1lJHNldF0gPSBmdW5jdGlvbiAoICAgICAgICAgICAgZWwgICAgICAgICAgICAgICAgICAgICkgeyBzZWxmW3RvTmFtZSRnZXRdID0gYXR0YWNoKGVsKTsgfTtcblx0XHRcdGRhdGFbdG9OYW1lJGdldF0gPSBudWxsO1xuXHRcdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0fVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBmdW5jdGlvbiBTaGFkb3dDaGVja2VyICggICAgICAgICAgICBhbG9uZyAgICAgICAgLCBuYW1lcyAgICAgICAsIF9fZGV2X18gICAgICAgICApICAgICAgICAgICAgICAgIHtcblx0dmFyIGluZGV4ID0gYWxvbmcuaW5kZXhPZignLicpO1xuXHR2YXIgdG9OYW1lID0gaW5kZXg8MCA/IGFsb25nLnNsaWNlKDAsIGluZGV4KSA6IGFsb25nO1xuXHRpZiAoIHRvTmFtZSBpbiBuYW1lcyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3NoYWRvdyk7IH1cblx0cmV0dXJuIGluZGV4PDBcblx0XHQ/IGZ1bmN0aW9uICggICAgICAgICAgICBkYXRhICAgICAgKSB7XG5cdFx0XHRpZiAoIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwgdG9OYW1lICsgJyRnZXQnKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIHRvTmFtZSArICckc2V0JykgKSB7IHRocm93IEVycm9yKF9fZGV2X18ucnVudGltZV9zaGFkb3cpOyB9XG5cdFx0fVxuXHRcdDogZnVuY3Rpb24gKCAgICAgICAgICAgIGRhdGEgICAgICApIHtcblx0XHRcdGlmICggaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCB0b05hbWUpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLnJ1bnRpbWVfc2hhZG93KTsgfVxuXHRcdH07XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2w/JztcbmltcG9ydCBNYXAgZnJvbSAnLk1hcD8nO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXA/JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBnZXRQcm90b3R5cGVPZiBmcm9tICcuUmVmbGVjdC5nZXRQcm90b3R5cGVPZj89T2JqZWN0LmdldFByb3RvdHlwZU9mJztcbmltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnNldFByb3RvdHlwZU9mJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/JztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgZ2V0IGZyb20gJy5SZWZsZWN0LmdldD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduPyc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBrZXlzIGZyb20gJy5PYmplY3Qua2V5cyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd25Qcm9wZXJ0eSBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyB0aGF0LCBwcm9EYXRhLCBkZXZEYXRhIH0gZnJvbSAnLi9EYXRhJztcbmltcG9ydCB7IFNoYWRvd0Fzc2lnbmVyLCBTaGFkb3dDaGVja2VyIH0gZnJvbSAnLi9TaGFkb3cnO1xuXG5leHBvcnQgeyBDb21wb25lbnQgYXMgZGVmYXVsdCB9O1xudmFyIENvbXBvbmVudCAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZnJlZXplKC8qI19fUFVSRV9fKi9kZWZpbmVQcm9wZXJ0aWVzKFxuXHRmdW5jdGlvbiBDb21wb25lbnQgKCkgeyByZXR1cm4gdGhhdDsgfSxcblx0e1xuXHRcdHByb3RvdHlwZToge1xuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IC8qI19fUFVSRV9fKi9mcmVlemUoY3JlYXRlKG51bGwsIHtcblx0XHRcdFx0X3JlbmRlcjoge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0XHRcdGdldDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24gX3JlbmRlciAoICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICAgICAgICApIHsgKCB0aGlzLl8gfHwgdGhpcy4kb3B0aW9ucyApLnJlbmRlciA9IHZhbHVlOyB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSkpLFxuXHRcdH0sXG5cdFx0cmVuZGVyOiB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogdW5kZWZpbmVkLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiByZW5kZXIgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgKSB7ICggdGhhdCAuXyB8fCB0aGF0IC4kb3B0aW9ucyApLnJlbmRlciA9IHZhbHVlOyB9LFxuXHRcdH0sXG5cdFx0Xzoge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gdG9PcHRpb25zICggICAgICAgICAgICAgICAgVnVlMyAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRcdFx0aWYgKCAhaXNDb21wb25lbnRDb25zdHJ1Y3Rvcih0aGlzKSApIHsgdGhyb3cgRXJyb3IoJyEoIHRoaXMgZXh0ZW5kcyBDb21wb25lbnQgKS5fKCknKTsgfVxuXHRcdFx0XHR2YXIgRElEX09QVElPTlMgPSBPUFRJT05TLm9iamVjdHMuaW50byhfX2Rldl9fIHx8IE9QVElPTlMgICAgICAgKS5pbnRvKFZ1ZTMgfHwgT1BUSU9OUyAgICAgICApO1xuXHRcdFx0XHR2YXIgVE1QX09QVElPTlMgPSBuZXcgT1BUSU9OUy5vYmplY3RzVG1wO1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IFRvT3B0aW9ucyhcblx0XHRcdFx0XHR0aGlzLFxuXHRcdFx0XHRcdFZ1ZTMgfHwgdW5kZWZpbmVkLFxuXHRcdFx0XHRcdF9fZGV2X18gPyBERVYucmVkdWNlKGZ1bmN0aW9uIERldiAoZGV2LCBrZXkpIHtcblx0XHRcdFx0XHRcdGRldltrZXldID0gX19kZXZfXyBba2V5XSB8fCBrZXk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGV2O1xuXHRcdFx0XHRcdH0sIGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLFxuXHRcdFx0XHRcdERJRF9PUFRJT05TLFxuXHRcdFx0XHRcdFRNUF9PUFRJT05TXG5cdFx0XHRcdCk7XG5cdFx0XHRcdFRNUF9PUFRJT05TLmZvckVhY2goZnVuY3Rpb24gKG9wdGlvbnNWYWx1ZSwgY29uc3RydWN0b3JLZXkpIHsgRElEX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yS2V5LCBvcHRpb25zVmFsdWUpOyB9KTtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdH1cbikpO1xuXG52YXIgX21peGlucyAgICAgICAgICAgICAgICA9IFN5bWJvbCAmJiAvKiNfX1BVUkVfXyovU3ltYm9sKCdfbWl4aW5zJykgICAgICAgICAgICAgICAgIDtcblxudmFyIF9fUFVSRV9fID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0dHJ5IHsgcmV0dXJuIEZ1bmN0aW9uKCdDb21wb25lbnQsX21peGlucycsICdcInVzZSBzdHJpY3RcIjtyZXR1cm4oLi4ubWl4aW5zKT0+Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7Y29uc3RydWN0b3IoKXtyZXR1cm4gQ29tcG9uZW50KCl9c3RhdGljIGdldFtfbWl4aW5zXSgpe3JldHVybiBtaXhpbnN9fScpKENvbXBvbmVudCwgX21peGlucyk7IH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW4gKCAgICAgICAgICApIHtcblx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcblx0XHQ/IC8qI19fUFVSRV9fKi9hcHBseShfX1BVUkVfXywgbnVsbCwgYXJndW1lbnRzICAgICAgIClcblx0XHQ6IENvbXBvbmVudDtcbn1cblxuZnVuY3Rpb24gVG9PcHRpb25zIChjb25zdHJ1Y3RvciAgICAgICAgICAsIFZ1ZTMgICAgICAgICAgICAgICAgICAgLCBfX2Rldl9fICAgICAgICAgICAgICAgICwgRElEX09QVElPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBUTVBfT1BUSU9OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAge1xuXHRcblx0dmFyIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgPSBESURfT1BUSU9OUy5nZXQoY29uc3RydWN0b3IpIHx8IFRNUF9PUFRJT05TLmdldChjb25zdHJ1Y3Rvcik7XG5cdGlmICggb3B0aW9ucyApIHsgcmV0dXJuIG9wdGlvbnM7IH1cblx0b3B0aW9ucyA9IGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgO1xuXHRcblx0aWYgKCBpc01peGlucyhjb25zdHJ1Y3RvcikgKSB7XG5cdFx0dmFyIHN0YXRpY19taXhpbnMgPSBjb25zdHJ1Y3RvcltfbWl4aW5zXSA7XG5cdFx0dmFyIG1peGlucyA9IG9wdGlvbnMubWl4aW5zID0gW10gICAgICAgICAgICAgICAgO1xuXHRcdHZhciBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBtaXhpbnMubGVuZ3RoIT09c3RhdGljX21peGlucy5sZW5ndGggKSB7XG5cdFx0XHR2YXIgbWl4aW4gPSBzdGF0aWNfbWl4aW5zW2luZGV4KytdO1xuXHRcdFx0aWYgKCBpc0NvbXBvbmVudENvbnN0cnVjdG9yKG1peGluKSApIHtcblx0XHRcdFx0dmFyIG1peGluT3B0aW9ucyA9IFRvT3B0aW9ucyhtaXhpbiwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRcdFx0aWYgKCBpc01peGlucyhtaXhpbikgKSB7XG5cdFx0XHRcdFx0dmFyIG1peGluTWl4aW5zID0gbWl4aW5PcHRpb25zLm1peGlucyA7XG5cdFx0XHRcdFx0dmFyIG1peGluSW5kZXggPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggbWl4aW5JbmRleCE9PW1peGluTWl4aW5zLmxlbmd0aCApIHsgbWl4aW5zW21peGlucy5sZW5ndGhdID0gbWl4aW5NaXhpbnNbbWl4aW5JbmRleCsrXTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgeyBtaXhpbnNbbWl4aW5zLmxlbmd0aF0gPSBtaXhpbk9wdGlvbnM7IH1cblx0XHRcdH1cblx0XHRcdGVsc2UgeyBtaXhpbnNbbWl4aW5zLmxlbmd0aF0gPSBtaXhpbiAgICAgICAgICAgICAgOyB9XG5cdFx0fVxuXHRcdGNvbGxlY3ROYW1lcyhvcHRpb25zKTtcblx0XHRyZXR1cm4gb3B0aW9ucztcblx0fVxuXHRcblx0dmFyIFN1cGVyID0gT1BUSU9OUy5zdXBlcnMuZ2V0KGNvbnN0cnVjdG9yKTtcblx0aWYgKCAhU3VwZXIgKSB7XG5cdFx0T1BUSU9OUy5zdXBlcnMuc2V0KGNvbnN0cnVjdG9yLCBTdXBlciA9IGdldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yKSk7XG5cdFx0U3VwZXI9PT1Db21wb25lbnQgfHwgaXNNaXhpbnMoU3VwZXIpIHx8IHNldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yLCBDb21wb25lbnQpO1xuXHR9XG5cdGlmICggU3VwZXIhPT1Db21wb25lbnQgKSB7XG5cdFx0dmFyIFN1cGVyT3B0aW9ucyA9IFRvT3B0aW9ucyhTdXBlciwgVnVlMywgX19kZXZfXywgRElEX09QVElPTlMsIFRNUF9PUFRJT05TKTtcblx0XHRpc01peGlucyhTdXBlcilcblx0XHRcdD8gb3B0aW9ucy5taXhpbnMgLmxlbmd0aD09PTFcblx0XHRcdFx0PyBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnMubWl4aW5zIFswXVxuXHRcdFx0XHQ6IG9wdGlvbnMubWl4aW5zID0gU3VwZXJPcHRpb25zLm1peGluc1xuXHRcdFx0OiBvcHRpb25zLmV4dGVuZHMgPSBTdXBlck9wdGlvbnM7XG5cdH1cblx0XG5cdHZhciBwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cdFxuXHRvcHRpb25zLmRhdGEgPSBfX2Rldl9fXG5cdFx0PyBmdW5jdGlvbiAoc2VsZiAgICAgICkgeyByZXR1cm4gZGV2RGF0YShjb25zdHJ1Y3Rvciwgc2VsZiAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBWdWUzLCBuYW1lcywgc2hhZG93QXNzaWduZXIsIHNoYWRvd0NoZWNrZXIsIF9fZGV2X18pOyB9XG5cdFx0OiBmdW5jdGlvbiAoc2VsZiAgICAgICkgeyByZXR1cm4gcHJvRGF0YShjb25zdHJ1Y3Rvciwgc2VsZiAgICAgICAgICAgLCBzeW1ib2xNZXRob2RzLCBWdWUzLCBuYW1lcywgc2hhZG93QXNzaWduZXIpOyB9O1xuXHRcblx0dmFyIHNldCAgICAgICAgICAgICAgICA9IF9fZGV2X18gPyBkZXZTZXQuYmluZChfX2Rldl9fKSA6IHByb1NldDtcblx0dmFyIGFzc2VydEZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBfX2Rldl9fID8gZGV2QXNzZXJ0RnVuY3Rpb24uYmluZChfX2Rldl9fKSA6IHByb0Fzc2VydEZ1bmN0aW9uO1xuXHRcblx0dmFyIHN0YXRpY05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhjb25zdHJ1Y3Rvcik7XG5cdGluZGV4ID0gc3RhdGljTmFtZXMubGVuZ3RoO1xuXHR2YXIgc2hhZG93QXNzaWduZXIgICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIHN0YXRpY05hbWUgPSBzdGF0aWNOYW1lc1stLWluZGV4XTtcblx0XHRpZiAoIHN0YXRpY05hbWU9PT0nUmVuZGVyJyApIHsgdmFyIFJlbmRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdICAgICAgICAgICAgICAgICAgICAgICA7IH1cblx0XHQvL0B0cy1pZ25vcmVcblx0XHRlbHNlIGlmICggc3RhdGljTmFtZT09PSduYW1lJyB8fCBzdGF0aWNOYW1lPT09J2xlbmd0aCcgKSB7XG5cdFx0XHRkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbnN0cnVjdG9yLCBzdGF0aWNOYW1lKTtcblx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlICYmIHNldChvcHRpb25zLCBzdGF0aWNOYW1lLCBkZXNjcmlwdG9yLnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzZXQob3B0aW9ucywgc3RhdGljTmFtZSwgYXBwbHkoZGVzY3JpcHRvci5nZXQgLCBjb25zdHJ1Y3RvciwgQVJHUykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICggc3RhdGljTmFtZSE9PSdwcm90b3R5cGUnICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIHN0YXRpY05hbWVbMF09PT0nXycgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9yZXNlcnZlZCk7IH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nc2V0dXAnIHx8IHN0YXRpY05hbWU9PT0nd2F0Y2gnIHx8IHN0YXRpY05hbWU9PT0nbWV0aG9kcycgfHwgc3RhdGljTmFtZT09PSdjb21wdXRlZCcgfHwgc3RhdGljTmFtZT09PSdleHRlbmRzJyB8fCBzdGF0aWNOYW1lPT09J2RhdGEnIHx8IHN0YXRpY05hbWU9PT0nbWl4aW5zJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0nYmVmb3JlQ3JlYXRlZCcgfHwgc3RhdGljTmFtZT09PSdjcmVhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZU1vdW50JyB8fCBzdGF0aWNOYW1lPT09J21vdW50ZWQnIHx8IHN0YXRpY05hbWU9PT0nYmVmb3JlVXBkYXRlJyB8fCBzdGF0aWNOYW1lPT09J3VwZGF0ZWQnIHx8IHN0YXRpY05hbWU9PT0nYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2RlYWN0aXZhdGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZVVubW91bnQnIHx8IHN0YXRpY05hbWU9PT0ndW5tb3VudGVkJyB8fCBzdGF0aWNOYW1lPT09J2JlZm9yZURlc3Ryb3knIHx8IHN0YXRpY05hbWU9PT0nZGVzdHJveWVkJyB8fFxuXHRcdFx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHN0YXRpY05hbWU9PT0naW5qZWN0JyB8fCBzdGF0aWNOYW1lPT09J3Byb3BzJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheW91dCk7IH1cblx0XHRcdH1cblx0XHRcdC8vQHRzLWlnbm9yZVxuXHRcdFx0c2V0KG9wdGlvbnMsIHN0YXRpY05hbWUsIGNvbnN0cnVjdG9yW3N0YXRpY05hbWVdKTtcblx0XHR9XG5cdH1cblx0XG5cdHZhciBwcm90b05hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpO1xuXHRpbmRleCA9IHByb3RvTmFtZXMubGVuZ3RoO1xuXHR2YXIgd2F0Y2hlcnMgICAgICAgICAgICA9IFtdO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBwcm90b05hbWUgPSBwcm90b05hbWVzWy0taW5kZXhdO1xuXHRcdGlmICggcHJvdG9OYW1lWzBdPT09J18nICYmICFwcm90b05hbWUuc3RhcnRzV2l0aCgnX3dhdGNoOicpICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHR2YXIgcHJvdG9OYW1lMSA9IHByb3RvTmFtZS5zbGljZSgxKTtcblx0XHRcdFx0aWYgKCBwcm90b05hbWUxWzBdPT09J18nICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfcmVzZXJ2ZWQpOyB9XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J3NldHVwJyB8fCBwcm90b05hbWUxPT09J3dhdGNoJyB8fCBwcm90b05hbWUxPT09J21ldGhvZHMnIHx8IHByb3RvTmFtZTE9PT0nY29tcHV0ZWQnIHx8IHByb3RvTmFtZTE9PT0nZXh0ZW5kcycgfHwgcHJvdG9OYW1lMT09PSdkYXRhJyB8fCBwcm90b05hbWUxPT09J21peGlucycgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2VtaXRzJyB8fCBwcm90b05hbWUxPT09J2NvbXBvbmVudHMnIHx8IHByb3RvTmFtZTE9PT0nZGlyZWN0aXZlcycgfHwgcHJvdG9OYW1lMT09PSdzdGF0aWNSZW5kZXJGbnMnIHx8IHByb3RvTmFtZTE9PT0ndGVtcGxhdGUnIHx8IHByb3RvTmFtZTE9PT0naW5oZXJpdEF0dHJzJyB8fFxuXHRcdFx0XHRcdHByb3RvTmFtZTE9PT0nbmFtZScgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J1JlbmRlcicgfHxcblx0XHRcdFx0XHRwcm90b05hbWUxPT09J2RlbGltaXRlcnMnIHx8XG5cdFx0XHRcdFx0cHJvdG9OYW1lMT09PSdmaWx0ZXJzJyB8fCBwcm90b05hbWUxPT09J2NvbW1lbnRzJyB8fCBwcm90b05hbWUxPT09J2Z1bmN0aW9uYWwnIHx8IHByb3RvTmFtZTE9PT0ncHJvcHNEYXRhJyB8fCBwcm90b05hbWUxPT09J21vZGVsJ1xuXHRcdFx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2xheW91dCk7IH1cblx0XHRcdH1cblx0XHRcdHNldChvcHRpb25zLCBwcm90b05hbWUuc2xpY2UoMSksIGdldChwcm90b3R5cGUsIHByb3RvTmFtZSwgdW5kZWZpbmVkKSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3RvTmFtZSk7XG5cdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSdfJyApIHtcblx0XHRcdFx0dmFyIGluZGV4T2ZRID0gcHJvdG9OYW1lLnNlYXJjaChXQVRDSF9PUFRJT05TKTtcblx0XHRcdFx0dmFyIHdhdGNoZXIgPSB3YXRjaGVyc1t3YXRjaGVycy5sZW5ndGhdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICA7XG5cdFx0XHRcdGlmICggZGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSApIHtcblx0XHRcdFx0XHR3YXRjaGVyLiQgPSBpbmRleE9mUTwwXG5cdFx0XHRcdFx0XHQ/IHByb3RvTmFtZS5zbGljZSg3KVxuXHRcdFx0XHRcdFx0OiBwcm90b05hbWUuc2xpY2UoNywgaW5kZXhPZlEpO1xuXHRcdFx0XHRcdHdhdGNoZXIuaGFuZGxlciA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHdhdGNoZXIuJCA9IGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IuZ2V0KTtcblx0XHRcdFx0XHR3YXRjaGVyLmhhbmRsZXIgPSBhc3NlcnRGdW5jdGlvbihkZXNjcmlwdG9yLnNldCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpbmRleE9mUT4wICkge1xuXHRcdFx0XHRcdCsraW5kZXhPZlE7XG5cdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0dmFyIGluZGV4T2ZBID0gcHJvdG9OYW1lLmluZGV4T2YoJzsnLCBpbmRleE9mUSk7XG5cdFx0XHRcdFx0XHR2YXIgcGFpciA9IGluZGV4T2ZBPDBcblx0XHRcdFx0XHRcdFx0PyBwcm90b05hbWUuc2xpY2UoaW5kZXhPZlEpXG5cdFx0XHRcdFx0XHRcdDogcHJvdG9OYW1lLnNsaWNlKGluZGV4T2ZRLCBpbmRleE9mQSk7XG5cdFx0XHRcdFx0XHRpbmRleE9mUSA9IGluZGV4T2ZBICsgMTtcblx0XHRcdFx0XHRcdHZhciBpbmRleE9mRSA9IHBhaXIuaW5kZXhPZignPScpO1xuXHRcdFx0XHRcdFx0aW5kZXhPZkU8MFxuXHRcdFx0XHRcdFx0XHQ/IHdhdGNoZXJbcGFpcl0gPSB0cnVlXG5cdFx0XHRcdFx0XHRcdDogd2F0Y2hlcltwYWlyLnNsaWNlKDAsIGluZGV4T2ZFKV0gPSBwYWlyLnNsaWNlKGluZGV4T2ZFICsgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggaW5kZXhPZlEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggX19kZXZfXyApIHtcblx0XHRcdFx0XHRpZiAoIHByb3RvTmFtZVswXT09PSckJyApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX3Jlc2VydmVkKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcblx0XHRcdFx0XHQ/IHByb3RvTmFtZT09PSdjb25zdHJ1Y3RvcicgJiYgZGVzY3JpcHRvci52YWx1ZT09PWNvbnN0cnVjdG9yIHx8IHNldChvcHRpb25zLm1ldGhvZHMgfHwgKCBvcHRpb25zLm1ldGhvZHMgPSBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBwcm90b05hbWUsIGFzc2VydEZ1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpKVxuXHRcdFx0XHRcdDogc2V0KG9wdGlvbnMuY29tcHV0ZWQgfHwgKCBvcHRpb25zLmNvbXB1dGVkID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIHByb3RvTmFtZSwgZGVzY3JpcHRvci5zZXQgPyB7XG5cdFx0XHRcdFx0XHRnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuXHRcdFx0XHRcdFx0c2V0OiBkZXNjcmlwdG9yLnNldFxuXHRcdFx0XHRcdH0gOiBkZXNjcmlwdG9yLmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHR2YXIgcHJvdG9TeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3RvdHlwZSkgICAgICAgICAgICAgICAgICAgO1xuXHRpbmRleCA9IHByb3RvU3ltYm9scy5sZW5ndGg7XG5cdHZhciBzeW1ib2xNZXRob2RzID0gaW5kZXggPyBjcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHZhciBwcm90b1N5bWJvbCAgICAgICAgICAgICAgICA9IHByb3RvU3ltYm9sc1stLWluZGV4XTtcblx0XHRzeW1ib2xNZXRob2RzIFtwcm90b1N5bWJvbF0gPSBhc3NpZ24oY3JlYXRlKE5VTEwpLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBwcm90b1N5bWJvbCkpO1xuXHR9XG5cdFxuXHRpZiAoIHdhdGNoZXJzLmxlbmd0aCApIHtcblx0XHR2YXIgY3JlYXRlZCA9IG9wdGlvbnMuY3JlYXRlZDtcblx0XHRvcHRpb25zLmNyZWF0ZWQgPSBjcmVhdGVkXG5cdFx0XHQ/IGZ1bmN0aW9uIHdhdGNoQmVmb3JlQ3JlYXRlZCAoICAgICAgICAgICkge1xuXHRcdFx0XHQkd2F0Y2godGhpcywgd2F0Y2hlcnMpO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlZCAuY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdDogZnVuY3Rpb24gd2F0Y2hCZWZvcmVDcmVhdGVkICggICAgICAgICAgKSB7ICR3YXRjaCh0aGlzLCB3YXRjaGVycyk7IH07XG5cdH1cblx0XG5cdGlmICggUmVuZGVyICkge1xuXHRcdGlmICggVnVlMyApIHtcblx0XHRcdHZhciBzaGFkb3cgICAgICAgICAgICAgICAgICAgICA9IFJlbmRlci5zaGFkb3c7XG5cdFx0XHRvcHRpb25zLnJlbmRlciA9IGFzc2VydEZ1bmN0aW9uKG5ldyBSZW5kZXIoVnVlMykpO1xuXHRcdFx0aWYgKCBzaGFkb3cgKSB7IHNoYWRvd0Fzc2lnbmVyID0gU2hhZG93QXNzaWduZXIoc2hhZG93KTsgfVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICggIW9wdGlvbnMucmVuZGVyICYmICFvcHRpb25zLnRlbXBsYXRlICkge1xuXHRcdFx0XHRvcHRpb25zLnJlbmRlciA9IF9fZGV2X18gPyBmdW5jdGlvbiAoKSB7IHRocm93IEVycm9yKF9fZGV2X18ucmVuZGVyKTsgfSA6IHJlbmRlcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHZhciBuYW1lcyA9IGNvbGxlY3ROYW1lcyhvcHRpb25zKTtcblx0XG5cdGlmICggX19kZXZfXyApIHtcblx0XHRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY29uc3RydWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKHN5bWJvbCkge1xuXHRcdFx0aWYgKCBzeW1ib2whPT1fbWl4aW5zICYmICEoIHN5bWJvbCBpbiBTWU1CT0xTICkgKSB7IHRocm93IEVycm9yKF9fZGV2X18uY29tcGlsZV9zeW1ib2wpOyB9XG5cdFx0fSk7XG5cdFx0Y2hlY2sob3B0aW9ucywgbmFtZXMsIF9fZGV2X18pO1xuXHRcdGlmICggc2hhZG93ICkgeyB2YXIgc2hhZG93Q2hlY2tlciAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFNoYWRvd0NoZWNrZXIoc2hhZG93LCBuYW1lcywgX19kZXZfXyk7IH1cblx0fVxuXHRcblx0VE1QX09QVElPTlMuc2V0KGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcblx0XG5cdGlmICggb3B0aW9ucy5jb21wb25lbnRzICkge1xuXHRcdHZhciBjb21wb25lbnRzID0gb3B0aW9ucy5jb21wb25lbnRzID0gYXNzaWduKGNyZWF0ZShOVUxMKSwgb3B0aW9ucy5jb21wb25lbnRzKTtcblx0XHRmb3IgKCB2YXIgbmFtZSBpbiBjb21wb25lbnRzICkge1xuXHRcdFx0aWYgKCBfX2Rldl9fICkge1xuXHRcdFx0XHRpZiAoIC9eKD8hW0EtWl0pLy50ZXN0KG5hbWUpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfbmFtZSk7IH1cblx0XHRcdH1cblx0XHRcdHZhciB2YWx1ZSA9IGNvbXBvbmVudHNbbmFtZV07XG5cdFx0XHRpZiAoIGlzQ29tcG9uZW50Q29uc3RydWN0b3IodmFsdWUpICkgeyBjb21wb25lbnRzW25hbWVdID0gVG9PcHRpb25zKHZhbHVlLCBWdWUzLCBfX2Rldl9fLCBESURfT1BUSU9OUywgVE1QX09QVElPTlMpOyB9XG5cdFx0fVxuXHR9XG5cdFxuXHRyZXR1cm4gb3B0aW9ucztcblx0XG59XG5cbnZhciBPUFRJT05TID0gV2Vha01hcCAmJiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBGdW5jdGlvbignV2Vha01hcCxNYXAnLCAnXCJ1c2Ugc3RyaWN0XCI7XFxcbmNsYXNzIEVhc3lNYXAgZXh0ZW5kcyBXZWFrTWFwe2ludG8oa2V5KXtsZXQgc3ViPXRoaXMuZ2V0KGtleSk7c3ViPz90aGlzLnNldChrZXksc3ViPW5ldyBFYXN5TWFwKTtyZXR1cm4gc3VifX1FYXN5TWFwLnByb3RvdHlwZS5nZXQ9V2Vha01hcC5wcm90b3R5cGUuZ2V0O0Vhc3lNYXAucHJvdG90eXBlLnNldD1XZWFrTWFwLnByb3RvdHlwZS5zZXQ7XFxcbmNsYXNzIFN0cm9uZ01hcCBleHRlbmRzIE1hcHt9U3Ryb25nTWFwLnByb3RvdHlwZS5nZXQ9TWFwLnByb3RvdHlwZS5nZXQ7U3Ryb25nTWFwLnByb3RvdHlwZS5zZXQ9TWFwLnByb3RvdHlwZS5zZXQ7U3Ryb25nTWFwLnByb3RvdHlwZS5mb3JFYWNoPU1hcC5wcm90b3R5cGUuZm9yRWFjaDtcXFxucmV0dXJue29iamVjdHM6bmV3IEVhc3lNYXAsb2JqZWN0c1RtcDpTdHJvbmdNYXAsc3VwZXJzOm5ldyBFYXN5TWFwLG5hbWVzOm5ldyBFYXN5TWFwfVxcXG4nKShXZWFrTWFwLCBNYXApO1xuXHR9XG5cdGNhdGNoIChlcnJvcikge31cbn0oKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmZ1bmN0aW9uIGlzQ29tcG9uZW50Q29uc3RydWN0b3IgKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgICAgICB7IHJldHVybiBhcHBseShpc1Byb3RvdHlwZU9mLCBDb21wb25lbnQsIFsgdmFsdWUgXSAgICAgICAgICk7IH1cblxudmFyIEFSR1MgPSBbXSAgICAgICAgIDtcblxudmFyIF9NSVhJTlMgPSBbIF9taXhpbnMgXSAgICAgICAgIDtcbmZ1bmN0aW9uIGlzTWl4aW5zIChjb25zdHJ1Y3RvciAgICAgICAgICApIHsgcmV0dXJuIGFwcGx5KGhhc093blByb3BlcnR5LCBjb25zdHJ1Y3RvciwgX01JWElOUyk7IH1cblxuZnVuY3Rpb24gcHJvU2V0ICAgIChvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICwgbmFtZSAgICAgICAgLCB2YWx1ZSAgICkgeyBvYmplY3RbbmFtZV0gPSB2YWx1ZTsgfVxuZnVuY3Rpb24gZGV2U2V0ICAgICggICAgICAgICAgICAgICBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICwgbmFtZSAgICAgICAgLCB2YWx1ZSAgICkge1xuXHRpZiAoIG5hbWUgaW4gb2JqZWN0ICkgeyB0aHJvdyBFcnJvcih0aGlzLmNvbXBpbGVfcmVkZWZpbmVkKTsgfVxuXHRvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcHJvQXNzZXJ0RnVuY3Rpb24gICAgKGZuICAgKSB7IHJldHVybiBmbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsgfVxuZnVuY3Rpb24gZGV2QXNzZXJ0RnVuY3Rpb24gICAgKCAgICAgICAgICAgICAgIGZuICAgKSB7XG5cdGlmICggdHlwZW9mIGZuIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKHRoaXMuY29tcGlsZV90eXBlKTsgfVxuXHRyZXR1cm4gZm4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59XG5cbnZhciBXQVRDSF9PUFRJT05TID0gLztbYS16Oz1dKiQvO1xuZnVuY3Rpb24gJHdhdGNoICh0aGF0ICAgICAgLCB3YXRjaGVycyAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHZhciBpbmRleCA9IHdhdGNoZXJzLmxlbmd0aDtcblx0ZG8ge1xuXHRcdHZhciB3YXRjaGVyICAgICAgPSB3YXRjaGVyc1stLWluZGV4XTtcblx0XHR0aGF0LiR3YXRjaCh3YXRjaGVyLiQsIHdhdGNoZXIuaGFuZGxlciwgd2F0Y2hlcik7XG5cdH1cblx0d2hpbGUgKCBpbmRleCApO1xufVxuXG5mdW5jdGlvbiByZW5kZXIgKCkgICAgICAgIHsgdGhyb3cgRXJyb3IoJ3JlbmRlcicpOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZnVuY3Rpb24gY29sbGVjdE5hbWVzIChvcHRpb25zICAgICAgICAgICAgKSAgICAgICAge1xuXHR2YXIgbmFtZXMgICAgICAgICAgICAgICAgICAgID0gT1BUSU9OUy5uYW1lcy5nZXQob3B0aW9ucyk7XG5cdGlmICggIW5hbWVzICkge1xuXHRcdG5hbWVzID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXHRcdHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XG5cdFx0dmFyIG5hbWUgICAgICAgIDtcblx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkgeyBmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkgeyBuYW1lID0gcHJvcHNbLS1pbmRleF07IG5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IG5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0cHJvcHMgPSBvcHRpb25zLmluamVjdDtcblx0XHRpZiAoIGlzQXJyYXkocHJvcHMpICkgeyBmb3IgKCBpbmRleCA9IHByb3BzLmxlbmd0aDsgaW5kZXg7ICkgeyBuYW1lID0gcHJvcHNbLS1pbmRleF07IG5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gcHJvcHMgKSB7IG5hbWVzW25hbWVdID0gbnVsbDsgfSB9XG5cdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zLm1ldGhvZHMgKSB7IG5hbWVzW25hbWVdID0gbnVsbDsgfVxuXHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucy5jb21wdXRlZCApIHsgbmFtZXNbbmFtZV0gPSBudWxsOyB9XG5cdFx0dmFyIGV4dGVuZCA9IG9wdGlvbnMuZXh0ZW5kcztcblx0XHRpZiAoIGV4dGVuZCApIHtcblx0XHRcdG1peGluID0gY29sbGVjdE5hbWVzKGV4dGVuZCk7XG5cdFx0XHRhc3NpZ24obmFtZXMsIG1peGluKTtcblx0XHR9XG5cdFx0dmFyIG1peGlucyA9IG9wdGlvbnMubWl4aW5zO1xuXHRcdGlmICggbWl4aW5zICkge1xuXHRcdFx0dmFyIGluZGV4ID0gbWl4aW5zLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaW5kZXggKSB7XG5cdFx0XHRcdHZhciBtaXhpbiA9IGNvbGxlY3ROYW1lcyhtaXhpbnNbLS1pbmRleF0pO1xuXHRcdFx0XHRhc3NpZ24obmFtZXMuZXhjZXB0RGF0YSwgbWl4aW4uZXhjZXB0RGF0YSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdE9QVElPTlMubmFtZXMuc2V0KG9wdGlvbnMsIG5hbWVzKTtcblx0fVxuXHRyZXR1cm4gbmFtZXM7XG59XG5cbnZhciBTWU1CT0xTID0gLyojX19QVVJFX18qL2dldE93blByb3BlcnR5TmFtZXMoU3ltYm9sKS5yZWR1Y2UoZnVuY3Rpb24gKFNZTUJPTFMsIG5hbWUpIHtcblx0aWYgKCB0eXBlb2YgU3ltYm9sW25hbWVdPT09J3N5bWJvbCcgKSB7IFNZTUJPTFNbU3ltYm9sW25hbWVdICAgICAgICAgICAgICAgICBdID0gbnVsbDsgfVxuXHRyZXR1cm4gU1lNQk9MUztcbn0sIGNyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG5mdW5jdGlvbiBjaGVjayAob3B0aW9ucyAgICAgICAgICAgICwgbmFtZXMgICAgICAgLCBfX2Rldl9fICAgICAgICAgKSB7XG5cdFxuXHR2YXIgbmFtZSAgICAgICAgO1xuXHRcblx0Ly9AdHMtaWdub3JlXG5cdGlmICggKCBuYW1lID0gb3B0aW9ucy5uYW1lICkgKSB7XG5cdFx0aWYgKFxuXHRcdFx0L14oPyFbQS1aXSkvLnRlc3QobmFtZSlcblx0XHRcdHx8XG5cdFx0XHRvcHRpb25zLmNvbXBvbmVudHMgJiYgbmFtZSBpbiBvcHRpb25zLmNvbXBvbmVudHNcblx0XHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX25hbWUpOyB9XG5cdH1cblx0XG5cdGlmICggb3B0aW9ucy5wcm9wcyApIHtcblx0XHRpZiAoIGlzQXJyYXkob3B0aW9ucy5wcm9wcykgKSB7IG9wdGlvbnMucHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkgeyBpZiAoIC8tfF4oPzpjb25zdHJ1Y3RvciR8a2V5JHxbb09dW25OXXxyZWYkKS8udGVzdChuYW1lKSApIHsgdGhyb3cgRXJyb3IobmFtZT09PSdjb25zdHJ1Y3RvcicgPyBfX2Rldl9fLmNvbXBpbGVfY29uc3RydWN0b3IgOiBfX2Rldl9fLmNvbXBpbGVfcHJvcHMpOyB9IH0pOyB9XG5cdFx0ZWxzZSB7IGZvciAoIG5hbWUgaW4gb3B0aW9ucy5wcm9wcyApIHsgaWYgKCAvLXxeKD86Y29uc3RydWN0b3IkfGtleSR8W29PXVtuTl18cmVmJCkvLnRlc3QobmFtZSkgKSB7IHRocm93IEVycm9yKG5hbWU9PT0nY29uc3RydWN0b3InID8gX19kZXZfXy5jb21waWxlX2NvbnN0cnVjdG9yIDogX19kZXZfXy5jb21waWxlX3Byb3BzKTsgfSB9IH1cblx0fVxuXHRcblx0aWYgKCBvcHRpb25zLmNvbXB1dGVkICYmICdjb25zdHJ1Y3RvcicgaW4gb3B0aW9ucy5jb21wdXRlZCApIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2NvbnN0cnVjdG9yKTsgfVxuXHRcblx0b3B0aW9ucy5lbWl0cyAmJlxuXHQoIGlzQXJyYXkob3B0aW9ucy5lbWl0cykgPyBvcHRpb25zLmVtaXRzIDoga2V5cyhvcHRpb25zLmVtaXRzKSApLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0aWYgKCAvW0EtWl18Xm9udm5vZGV8KD86Y2FwdHVyZXxvbmNlfHBhc3NpdmUpJC8udGVzdCgnb24nICsgZXZlbnQpICkgeyB0aHJvdyBFcnJvcihfX2Rldl9fLmNvbXBpbGVfZW1pdHMpOyB9XG5cdH0pO1xuXHRcblx0aWYgKFxuXHRcdG9wdGlvbnMuZGlyZWN0aXZlcyAmJiAnaXMnIGluIG9wdGlvbnMuZGlyZWN0aXZlcy8vIDJcblx0XHR8fC8vQHRzLWlnbm9yZVxuXHRcdG9wdGlvbnMucHJvcHMgJiYgKCBpc0FycmF5KG9wdGlvbnMucHJvcHMpID8gb3B0aW9ucy5wcm9wcy5pbmNsdWRlcygnaXMnKSA6ICdpcycgaW4gb3B0aW9ucy5wcm9wcyApLy8gM1xuXHQpIHsgdGhyb3cgRXJyb3IoX19kZXZfXy5jb21waWxlX2lzKTsgfVxuXHRcbn1cblxudmFyIERFViA9IFtcblx0J2NvbXBpbGVfbmFtZScsXG5cdCdjb21waWxlX2NvbnN0cnVjdG9yJyxcblx0J2NvbXBpbGVfcHJvcHMnLFxuXHQnY29tcGlsZV9lbWl0cycsXG5cdCdjb21waWxlX2lzJyxcblx0J2NvbXBpbGVfbGF5b3V0Jyxcblx0J2NvbXBpbGVfcmVzZXJ2ZWQnLFxuXHQnY29tcGlsZV9yZWRlZmluZWQnLFxuXHQnY29tcGlsZV90eXBlJyxcblx0J2NvbXBpbGVfc3ltYm9sJyxcblx0J2NvbXBpbGVfc2hhZG93Jyxcblx0J3JlbmRlcicsXG5cdCdydW50aW1lX3NoYWRvdycsXG5cdCdydW50aW1lX3JlZGVmaW5lZCcsXG5cdCdydW50aW1lX3N5bWJvbCcsXG5cdCdydW50aW1lX3Jlc2VydmVkJyxcblx0J3J1bnRpbWVfZW51bWVyYWJsZScsXG5dICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgIFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgXG5cdCAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICBcbiBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4vSWRlbnRpZmllcic7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vVGVtcGxhdGUnO1xuaW1wb3J0IFJlbmRlciwgeyBTdGF0aWNSZW5kZXJGbnMgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmltcG9ydCBTdHlsZSwgeyByZW1vdmUgfSBmcm9tICcuL1N0eWxlLCByZW1vdmUnO1xuaW1wb3J0IENvbXBvbmVudCwgeyBtaXhpbiB9IGZyb20gJy4vQ29tcG9uZW50LCBtaXhpbi8nO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRJZGVudGlmaWVyLFxuXHRTY29wZSxcblx0VGVtcGxhdGUsXG5cdFJlbmRlciwgU3RhdGljUmVuZGVyRm5zLFxuXHRTdHlsZSwgcmVtb3ZlLFxuXHRDb21wb25lbnQsIG1peGluLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFN0eWxlOiBTdHlsZSwgcmVtb3ZlOiByZW1vdmUsXG5cdENvbXBvbmVudDogQ29tcG9uZW50LCBtaXhpbjogbWl4aW4sXG59KTtcbiJdLCJuYW1lcyI6WyJTeW1ib2wiLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsIlJlZ0V4cCIsIkZ1bmN0aW9uIiwia2V5cyIsIktleXMiLCJnZXRQcm90b3R5cGVPZiIsIkVycm9yIiwiZ2V0IiwiV2Vha01hcCIsIk1hcCIsIlR5cGVFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxjQUFjLFFBQVE7O0FDQXRCLG1CQUFlO0FBQ2YsQ0FBQyxLQUFLO0FBQ04sQ0FBQyxLQUFLO0FBQ04sQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxXQUFXO0FBQ1osQ0FBQyxXQUFXO0FBQ1osQ0FBQyxXQUFXO0FBQ1osQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxhQUFhO0FBQ2QsQ0FBQzs7QUN0Q0QsSUFBSSxrQkFBa0IsaUVBQWlFO0FBQ3ZGLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxF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Q0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNQSxPQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUU7QUFDOUcsRUFBRSxDQUFDLENBQUM7QUFDSjtBQUNBLENBQUM7QUFDRCxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxVQUFVO0FBQ2xEO0FBQ0EsRUFBRSxPQUFPLENBQUMsS0FBSyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDcEcsR0FBRyxFQUFFLE1BQU1BLE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtBQUN2QztBQUNBLENBQUM7QUFDRDtBQUNBLElBQUksR0FBRyxHQUFHO0FBQ1YsQ0FBQyxjQUFjO0FBQ2YsQ0FBQyxxQkFBcUI7QUFDdEIsQ0FBQyxlQUFlO0FBQ2hCLENBQUMsZUFBZTtBQUNoQixDQUFDLFlBQVk7QUFDYixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLGtCQUFrQjtBQUNuQixDQUFDLG1CQUFtQjtBQUNwQixDQUFDLGNBQWM7QUFDZixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLFFBQVE7QUFDVCxDQUFDLGdCQUFnQjtBQUNqQixDQUFDLG1CQUFtQjtBQUNwQixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLGtCQUFrQjtBQUNuQixDQUFDLG9CQUFvQjtBQUNyQixDQUFDOztBQ3RaRCxjQUFlLE9BQU8sQ0FBQztBQUN2QixDQUFDLE9BQU8sRUFBRSxPQUFPO0FBQ2pCLENBQUMsVUFBVSxFQUFFLFVBQVU7QUFDdkIsQ0FBQyxLQUFLLEVBQUUsS0FBSztBQUNiLENBQUMsUUFBUSxFQUFFLFFBQVE7QUFDbkIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxlQUFlO0FBQ2pELENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtBQUM3QixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUs7QUFDbkMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9Gcm9udEVuZFJ1bnRpbWVEZXBlbmRlbmN5LyJ9