/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：13.7.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.jVue = factory());
}(this, function () { 'use strict';

	var version = '13.7.0';

	var increaseDictionary                                                      = {
		0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'a',
		a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
		h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
		o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
		u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
	};
	var latestIdentifier                              = [ '9' ];
	var lastCharacter                        = '9';
	var lastIndex         = 0;

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
		
		//var identifier :string = latestIdentifier.join('');
		//if ( isReservedWord(identifier) ) { lastCharacter = latestIdentifier[lastIndex] = increaseDictionary[lastCharacter]; return latestIdentifier.join(''); }
		//return identifier;
		
		return latestIdentifier.join('');
		
	}

	var isArray = Array.isArray;

	var create = Object.create;

	var undefined$1 = void 0;

	var assign = Object.assign;

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

	var defineProperty = Object.defineProperty;

	var freeze = Object.freeze;

	var seal = Object.seal;

	var Default = (
		/*! j-globals: default (internal) */
		function Default (exports, addOnOrigin) {
			return /*#__PURE__*/ function Module (exports, addOnOrigin) {
				if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(null); }
				if ( assign ) { assign(exports, addOnOrigin); }
				else { for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
				exports['default'] = exports;
				typeof exports==='function' && exports.prototype && seal(exports.prototype);
				if ( toStringTag ) {
					var descriptor = create(null);
					descriptor.value = 'Module';
					defineProperty(exports, toStringTag, descriptor);
				}
				return freeze(exports);
			}(exports, addOnOrigin);
		}
		/*¡ j-globals: default (internal) */
	);

	/*!
	 * 模块名称：j-groupify
	 * 模块功能：将一个字符串数组，转化为分支式优化后的正则表达式匹配组。从属于“简计划”。
	   　　　　　Transform a string array into a branch-style optimized regExp group. Belong to "Plan J".
	 * 模块版本：3.5.0
	 * 许可条款：LGPL-3.0
	 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
	 * 问题反馈：https://GitHub.com/LongTengDao/j-groupify/issues
	 * 项目主页：https://GitHub.com/LongTengDao/j-groupify/
	 */

	var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
	var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
	var GROUP        = create(null);

	function groupify (branches          , uFlag          , noEscape          )         {
		var group        = create(null);
		var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
		for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index]); }
		return sourcify(group, !noEscape);
	}
	function appendPointBranch (group       , branch        )       {
		if ( branch ) {
			var char         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
			appendPointBranch(group[char] || ( group[char] = create(null) ), branch.slice(char.length));
		}
		else { group[''] = GROUP; }
	}

	function appendCodeBranch (group       , branch        )       {
		if ( branch ) {
			var char         = branch.charAt(0);
			appendCodeBranch(group[char] || ( group[char] = create(null) ), branch.slice(1));
		}
		else { group[''] = GROUP; }
	}

	function sourcify (group       , needEscape         )         {
		var branches           = [];
		var singleCharactersBranch           = [];
		var noEmptyBranch          = true;
		for ( var char in group ) {
			if ( char ) {
				var sub_branches         = sourcify(group[char], needEscape);
				if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(char) ) { char = '\\'+char; }
				sub_branches ? branches.push(char+sub_branches) : singleCharactersBranch.push(char);
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

	/*¡ j-groupify */

	var PropertyDescriptor = (
		/*! j-globals: null.PropertyDescriptor (internal) */
		function () {
			function __PURE__ (value_get, set_writable, enumerable, configurable) {
				var propertyDescriptor = create(null);
				if ( set_writable===true ) {
					propertyDescriptor.value = value_get;
					propertyDescriptor.writable = true;
				}
				else if ( set_writable===false ) {
					propertyDescriptor.value = value_get;
					propertyDescriptor.writable = false;
				}
				else {
					propertyDescriptor.get = value_get;
					propertyDescriptor.set = set_writable;
				}
				propertyDescriptor.enumerable = enumerable;
				propertyDescriptor.configurable = configurable;
				return propertyDescriptor;
			}
			return function PropertyDescriptor (value_get, set_writable, enumerable, configurable) {
				return /*#__PURE__*/ __PURE__(value_get, set_writable, enumerable, configurable);
			};
		}()
		/*¡ j-globals: null.PropertyDescriptor (internal) */
	);

	var preventExtensions = Object.preventExtensions;

	var head = document.head;

	var _      = typeof Symbol==='function'
		? Symbol('_')       
		: '_';

	function $                  (         css         , media         )    {
		var style                   = document.createElement('style');
		if ( css ) { style.textContent = this[_](css); }
		if ( media!==undefined$1 ) {
			style.media = media          ;
		}
		head.appendChild(style);
		return this;
	}

	var prepare_                         = typeof _==='symbol'
		
		? function $ () {}
		
		: function () {
			var _descriptor = PropertyDescriptor(function _ () {}, true, false, false);
			return function $ (scope       ) {
				defineProperty(scope, _, _descriptor);
			};
		}();

	function Search (keys          ) {
		return new RegExp('__'+groupify(keys, false, true)+'__', 'g');
	}

	function Replacer (scope             ) {
		return function replacer (__key__        )         { return scope[__key__.slice(2, -2)]; };
	}

	                    
		                     
	     
		           
		                               
	  

	var StaticScope = function StaticScope (                   keys          )       {
		prepare_(this);
		this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
		var _search = Search(keys);
		var _replacer = Replacer(this);
		for ( var index         = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	}                
		                                 
	 ;

	var SCOPE              = /*#__PURE__*/preventExtensions(create(null, { $: PropertyDescriptor($, false, false, false) })               );
	StaticScope.prototype = SCOPE;

	var InheritedStaticScope = function InheritedStaticScope (                   keys          , proto             )       {
		prepare_(this);
		this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
		for ( var index         = keys.length; index; ) { this[keys[--index]] = Identifier(); }
		for ( var key in proto ) { /*key==='_' || key==='$' || */keys.push(key); }
		var _search = Search(keys);
		var _replacer = Replacer(this);
		InheritedStaticScope.prototype = SCOPE;
	}                
		                                                     
	 ;

	var slice = Array.prototype.slice;

	var SEARCH = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;

	function scopify (value                         , _scope                         )         {
		var keys        ,
			index        ,
			values          ,
			key        ;
		if ( value ) {
			switch ( typeof value ) {
				case 'string':
					if ( value.indexOf(' ')<0 ) {
						return _scope(value);
					}
					else {
						keys = '';
						values = value.split(' ');
						for ( index = values.length; index--; ) {
							key = value[index];
							if ( key ) { keys = _scope(key)+' '+keys; }
						}
						return keys && keys.slice(0, -1);
					}
				case 'object':
					keys = '';
					if ( isArray(value) ) {
						for ( index = value.length; index--; ) {
							key = scopify(value[index], _scope);
							if ( key ) { keys = key+' '+keys; }
						}
						return keys && keys.slice(0, -1);
					}
					else {
						for ( key in value ) {
							if ( ( value                           )[key] ) { keys += ' '+_scope(key); }
						}
						return keys && keys.slice(1);
					}
			}
		}
		return '';
	}

	                     
		                        
		                      
		           
		                               
	  

	function DynamicScope (cache             )               {
		var scope = function scope (value                         )         { return scopify(arguments.length===1 ? value : slice.call(arguments, 0), _scope); }                ;
		scope.prototype = cache;
		scope.$ = $;
		scope[_] = function _ (string        ) { return string.replace(SEARCH, _replacer); };
		function _replacer (__key__        )         { return _scope(__key__.slice(2, -2)); }
		function _scope (key        )         { return cache[key] || ( cache[key] = Identifier() ); }
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

	                                        

	function Scope (                             keys         )        {
		if ( keys===undefined$1 ) {
			if ( isArray(this) ) { return DynamicScope(mix(this           )); }
			else if ( this instanceof StaticScope ) { return DynamicScope(create(this)); }
			else if ( typeof this==='function' && this.prototype instanceof StaticScope ) { return DynamicScope(create(this.prototype)); }
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
		return /*#__PURE__*/ scope[_](html);
	}

	var VAR_                    = /*#__PURE__*/ function () {
		try { Function('const v=0'); }
		catch (error) { return 'var '; }
		return 'const ';
	}();

	function Body (body        )         {
		var index         = body.indexOf(',');
		return ( index ? VAR_+body.slice(0, index)+'=this,' : VAR_ )+body.slice(++index, body.indexOf('(', index))+'=this._self._c||this.$createElement;return '+body.slice(index);
	}

	                                                                                                                                      

	function Render (code        , scope        )         {
		return /*#__PURE__*/ Function('"use strict";'+Body(scope ? scope[_](code) : code))          ;
	}

	function StaticRenderFns (codes          , scope        )           {
		var index = codes.length;
		if ( scope ) { for ( var scope_ = scope[_]; index--; ) { codes[index] = Body(scope_(codes[index])); } }
		else { while ( index-- ) { codes[index] = Body(codes[index]); } }
		return Function('"use strict";return[function(){'+codes.join('},function(){')+'}]')();
	}

	function render (createElement                                     , context                                                             ) {
		return createElement('style', context.data, context.children);
	}

	var STYLE = create(null, {
		functional: PropertyDescriptor(true        , false, true, false),
		render: PropertyDescriptor(render, false, true, false)
	});

	function Style (css         , scope        )                   {
		var style                   = document.createElement('style');
		if ( css ) { style.textContent = scope ? scope[_](css) : css; }
		return head.appendChild(style);
	}

	function remove (style                  )                {
		head.removeChild(style);
		return remove;
	}

	function Options (options        ) { return options; }

	var _export = Default({
		version: version,
		Identifier: Identifier,
		Scope: Scope,
		Template: Template,
		Render: Render,
		StaticRenderFns: StaticRenderFns,
		STYLE: STYLE,
		Style: Style,
		remove: remove,
		Options: Options
	});

	return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIlNjb3BlL18udHMiLCJTY29wZS9TdGF0aWNTY29wZS50cyIsIlNjb3BlL0R5bmFtaWNTY29wZS50cyIsIlNjb3BlL0tFWVMudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZS50cyIsIlJlbmRlciwgU3RhdGljUmVuZGVyRm5zLnRzIiwiU1RZTEUudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiT3B0aW9ucy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMTMuNy4wJzsiLCJ2YXIgaW5jcmVhc2VEaWN0aW9uYXJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB7XG5cdDA6ICcxJywgMTogJzInLCAyOiAnMycsIDM6ICc0JywgNDogJzUnLCA1OiAnNicsIDY6ICc3JywgNzogJzgnLCA4OiAnOScsIDk6ICdhJyxcblx0YTogJ2InLCBiOiAnYycsIGM6ICdkJywgZDogJ2UnLCBlOiAnZicsIGY6ICdnJywgZzogJ2gnLFxuXHRoOiAnaScsIGk6ICdqJywgajogJ2snLCBrOiAnbCcsIGw6ICdtJywgbTogJ24nLCBuOiAnbycsXG5cdG86ICdwJywgcDogJ3EnLCBxOiAncicsIHI6ICdzJywgczogJ3QnLCB0OiAndScsXG5cdHU6ICd2JywgdjogJ3cnLCB3OiAneCcsIHg6ICd5JywgeTogJ3onXG59O1xudmFyIGxhdGVzdElkZW50aWZpZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFsgJzknIF07XG52YXIgbGFzdENoYXJhY3RlciAgICAgICAgICAgICAgICAgICAgICAgID0gJzknO1xudmFyIGxhc3RJbmRleCAgICAgICAgID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSAgICAgICAgIHtcblx0XG5cdGlmICggbGFzdENoYXJhY3Rlcj09PSd6JyApIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gJzAnO1xuXHRcdGZvciAoIHZhciBjaGFyYWN0ZXJJbmRleCAgICAgICAgID0gbGFzdEluZGV4OyA7ICkge1xuXHRcdFx0aWYgKCBjaGFyYWN0ZXJJbmRleCApIHtcblx0XHRcdFx0dmFyIGNoYXJhY3RlciAgICAgICAgICAgICAgICAgICAgICAgID0gbGF0ZXN0SWRlbnRpZmllclstLWNoYXJhY3RlckluZGV4XTtcblx0XHRcdFx0aWYgKCBjaGFyYWN0ZXI9PT0neicgKSB7IGxhdGVzdElkZW50aWZpZXJbY2hhcmFjdGVySW5kZXhdID0gJzAnOyB9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGxhdGVzdElkZW50aWZpZXJbY2hhcmFjdGVySW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2NoYXJhY3Rlcl07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyLnVuc2hpZnQoJ2EnKTtcblx0XHRcdFx0KytsYXN0SW5kZXg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXJdO1xuXHR9XG5cdFxuXHQvL3ZhciBpZGVudGlmaWVyIDpzdHJpbmcgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHQvL2lmICggaXNSZXNlcnZlZFdvcmQoaWRlbnRpZmllcikgKSB7IGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3Rlcl07IHJldHVybiBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpOyB9XG5cdC8vcmV0dXJuIGlkZW50aWZpZXI7XG5cdFxuXHRyZXR1cm4gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQICAgICAgICA9IGNyZWF0ZShudWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzICAgICAgICAgICwgdUZsYWcgICAgICAgICAgLCBub0VzY2FwZSAgICAgICAgICApICAgICAgICAge1xuXHR2YXIgZ3JvdXAgICAgICAgID0gY3JlYXRlKG51bGwpO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyICAgICAgICAgPSBTVVJST0dBVEVfUEFJUi50ZXN0KGJyYW5jaCkgPyBicmFuY2guc2xpY2UoMCwgMikgOiBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZFBvaW50QnJhbmNoKGdyb3VwW2NoYXJdIHx8ICggZ3JvdXBbY2hhcl0gPSBjcmVhdGUobnVsbCkgKSwgYnJhbmNoLnNsaWNlKGNoYXIubGVuZ3RoKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXIgICAgICAgICA9IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kQ29kZUJyYW5jaChncm91cFtjaGFyXSB8fCAoIGdyb3VwW2NoYXJdID0gY3JlYXRlKG51bGwpICksIGJyYW5jaC5zbGljZSgxKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIHNvdXJjaWZ5IChncm91cCAgICAgICAsIG5lZWRFc2NhcGUgICAgICAgICApICAgICAgICAge1xuXHR2YXIgYnJhbmNoZXMgICAgICAgICAgID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoICAgICAgICAgICA9IFtdO1xuXHR2YXIgbm9FbXB0eUJyYW5jaCAgICAgICAgICA9IHRydWU7XG5cdGZvciAoIHZhciBjaGFyIGluIGdyb3VwICkge1xuXHRcdGlmICggY2hhciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJdLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyKSApIHsgY2hhciA9ICdcXFxcJytjaGFyOyB9XG5cdFx0XHRzdWJfYnJhbmNoZXMgPyBicmFuY2hlcy5wdXNoKGNoYXIrc3ViX2JyYW5jaGVzKSA6IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gucHVzaChjaGFyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IFByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcubnVsbC5Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG52YXIgXyAgICAgID0gdHlwZW9mIFN5bWJvbD09PSdmdW5jdGlvbidcblx0PyBTeW1ib2woJ18nKSAgICAgICBcblx0OiAnXyc7XG5cbmZ1bmN0aW9uICQgICAgICAgICAgICAgICAgICAoICAgICAgICAgY3NzICAgICAgICAgLCBtZWRpYSAgICAgICAgICkgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSB0aGlzW19dKGNzcyk7IH1cblx0aWYgKCBtZWRpYSE9PXVuZGVmaW5lZCApIHtcblx0XHRzdHlsZS5tZWRpYSA9IG1lZGlhICAgICAgICAgIDtcblx0fVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHRoaXM7XG59XG5cbnZhciBwcmVwYXJlXyAgICAgICAgICAgICAgICAgICAgICAgICA9IHR5cGVvZiBfPT09J3N5bWJvbCdcblx0XG5cdD8gZnVuY3Rpb24gJCAoKSB7fVxuXHRcblx0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF9kZXNjcmlwdG9yID0gUHJvcGVydHlEZXNjcmlwdG9yKGZ1bmN0aW9uIF8gKCkge30sIHRydWUsIGZhbHNlLCBmYWxzZSk7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICQgKHNjb3BlICAgICAgICkge1xuXHRcdFx0ZGVmaW5lUHJvcGVydHkoc2NvcGUsIF8sIF9kZXNjcmlwdG9yKTtcblx0XHR9O1xuXHR9KCk7XG5cbmV4cG9ydCB7IF8sICQsIHByZXBhcmVfIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1ncm91cGlmeSc7XG5cbmltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBQcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLm51bGwuUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBwcmV2ZW50RXh0ZW5zaW9ucyBmcm9tICcuT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBfLCAkLCBwcmVwYXJlXyB9IGZyb20gJy4vXyc7XG5cbmZ1bmN0aW9uIFNlYXJjaCAoa2V5cyAgICAgICAgICApIHtcblx0cmV0dXJuIG5ldyBSZWdFeHAoJ19fJytncm91cGlmeShrZXlzLCBmYWxzZSwgdHJ1ZSkrJ19fJywgJ2cnKTtcbn1cblxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlICAgICAgICAgICAgICkge1xuXHRyZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07XG59XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgIFxuICAgICBcblx0ICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxudmFyIFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxudmFyIFNDT1BFICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi9wcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUobnVsbCwgeyAkOiBQcm9wZXJ0eURlc2NyaXB0b3IoJCwgZmFsc2UsIGZhbHNlLCBmYWxzZSkgfSkgICAgICAgICAgICAgICApO1xuU3RhdGljU2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG5cbnZhciBJbmhlcml0ZWRTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIEluaGVyaXRlZFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICAsIHByb3RvICAgICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICova2V5cy5wdXNoKGtleSk7IH1cblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0SW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG59ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IHsgU3RhdGljU2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRTdGF0aWNTY29wZSB9OyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAsIF9zY29wZSAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAge1xuXHR2YXIga2V5cyAgICAgICAgLFxuXHRcdGluZGV4ICAgICAgICAsXG5cdFx0dmFsdWVzICAgICAgICAgICxcblx0XHRrZXkgICAgICAgIDtcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBfc2NvcGUodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVtpbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IF9zY29wZShrZXkpKycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZS5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVtpbmRleF0sIF9zY29wZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK19zY29wZShrZXkpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHNjb3BpZnkoYXJndW1lbnRzLmxlbmd0aD09PTEgPyB2YWx1ZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSwgX3Njb3BlKTsgfSAgICAgICAgICAgICAgICA7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoU0VBUkNILCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBfc2NvcGUoX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdGZ1bmN0aW9uIF9zY29wZSAoa2V5ICAgICAgICApICAgICAgICAgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IER5bmFtaWNTY29wZSBhcyBkZWZhdWx0IH07IiwiZXhwb3J0IGRlZmF1bHQgL1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqL2lnOyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgU3RhdGljU2NvcGUsIEluaGVyaXRlZFN0YXRpY1Njb3BlLCBTQ09QRSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IER5bmFtaWNTY29wZSBmcm9tICcuL0R5bmFtaWNTY29wZSc7XG5pbXBvcnQgS0VZUyBmcm9tICcuL0tFWVMnO1xuXG52YXIgRU1QVFkgICAgICAgICAgID0gW107XG5cbmZ1bmN0aW9uIG1peCAocHJvdG9zICAgICAgICAgKSAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgICAgICAgICAgICAgID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvICAgICAgICA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9IHByb3RvLnByb3RvdHlwZTsgfVxuXHRcdGZvciAoIHZhciBpZCBpbiBwcm90byApIHsgc2NvcGVbaWRdID0gcHJvdG9baWRdOyB9XG5cdH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmZ1bmN0aW9uIFNjb3BlICggICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICApICAgICAgICB7XG5cdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBEeW5hbWljU2NvcGUobWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSkpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG59XG5TY29wZS5wcm90b3R5cGUgPSBudWxsICAgICAgIDtcblxuZXhwb3J0IHsgU2NvcGUgYXMgZGVmYXVsdCwgS0VZUyB9OyIsImltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCAgICAgICAgLCBzY29wZSAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qLyBzY29wZVtfXShodG1sKTtcbn1cblxuZXhwb3J0IHsgVGVtcGxhdGUgYXMgZGVmYXVsdCB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nOyIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbnZhciBWQVJfICAgICAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi8gZnVuY3Rpb24gKCkge1xuXHR0cnkgeyBGdW5jdGlvbignY29uc3Qgdj0wJyk7IH1cblx0Y2F0Y2ggKGVycm9yKSB7IHJldHVybiAndmFyICc7IH1cblx0cmV0dXJuICdjb25zdCAnO1xufSgpO1xuXG5mdW5jdGlvbiBCb2R5IChib2R5ICAgICAgICApICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGJvZHkuaW5kZXhPZignLCcpO1xuXHRyZXR1cm4gKCBpbmRleCA/IFZBUl8rYm9keS5zbGljZSgwLCBpbmRleCkrJz10aGlzLCcgOiBWQVJfICkrYm9keS5zbGljZSgrK2luZGV4LCBib2R5LmluZGV4T2YoJygnLCBpbmRleCkpKyc9dGhpcy5fc2VsZi5fY3x8dGhpcy4kY3JlYXRlRWxlbWVudDtyZXR1cm4gJytib2R5LnNsaWNlKGluZGV4KTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZXhwb3J0IGZ1bmN0aW9uIFJlbmRlciAoY29kZSAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOycrQm9keShzY29wZSA/IHNjb3BlW19dKGNvZGUpIDogY29kZSkpICAgICAgICAgIDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggPSBjb2Rlcy5sZW5ndGg7XG5cdGlmICggc2NvcGUgKSB7IGZvciAoIHZhciBzY29wZV8gPSBzY29wZVtfXTsgaW5kZXgtLTsgKSB7IGNvZGVzW2luZGV4XSA9IEJvZHkoc2NvcGVfKGNvZGVzW2luZGV4XSkpOyB9IH1cblx0ZWxzZSB7IHdoaWxlICggaW5kZXgtLSApIHsgY29kZXNbaW5kZXhdID0gQm9keShjb2Rlc1tpbmRleF0pOyB9IH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bZnVuY3Rpb24oKXsnK2NvZGVzLmpvaW4oJ30sZnVuY3Rpb24oKXsnKSsnfV0nKSgpO1xufVxuIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5cbmZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnRleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJldHVybiBjcmVhdGVFbGVtZW50KCdzdHlsZScsIGNvbnRleHQuZGF0YSwgY29udGV4dC5jaGlsZHJlbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZShudWxsLCB7XG5cdGZ1bmN0aW9uYWw6IFByb3BlcnR5RGVzY3JpcHRvcih0cnVlICAgICAgICAsIGZhbHNlLCB0cnVlLCBmYWxzZSksXG5cdHJlbmRlcjogUHJvcGVydHlEZXNjcmlwdG9yKHJlbmRlciwgZmFsc2UsIHRydWUsIGZhbHNlKVxufSk7XG4iLCJpbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFN0eWxlIChjc3MgICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgIHtcblx0dmFyIHN0eWxlICAgICAgICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gc2NvcGUgPyBzY29wZVtfXShjc3MpIDogY3NzOyB9XG5cdHJldHVybiBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cblxuZXhwb3J0IHsgU3R5bGUsIHJlbW92ZSB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE9wdGlvbnMgKG9wdGlvbnMgICAgICAgICkgeyByZXR1cm4gb3B0aW9uczsgfTsiLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi9JZGVudGlmaWVyJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnLi9UZW1wbGF0ZSc7XG5pbXBvcnQgeyBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyB9IGZyb20gJy4vUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnO1xuaW1wb3J0IFNUWUxFICBmcm9tICcuL1NUWUxFJztcbmltcG9ydCB7IFN0eWxlLCByZW1vdmUgfSBmcm9tICcuL1N0eWxlLCByZW1vdmUnO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9PcHRpb25zJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0SWRlbnRpZmllcixcblx0U2NvcGUsXG5cdFRlbXBsYXRlLFxuXHRSZW5kZXIsIFN0YXRpY1JlbmRlckZucyxcblx0U1RZTEUsXG5cdFN0eWxlLCByZW1vdmUsXG5cdE9wdGlvbnMsXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0SWRlbnRpZmllcjogSWRlbnRpZmllcixcblx0U2NvcGU6IFNjb3BlLFxuXHRUZW1wbGF0ZTogVGVtcGxhdGUsXG5cdFJlbmRlcjogUmVuZGVyLFxuXHRTdGF0aWNSZW5kZXJGbnM6IFN0YXRpY1JlbmRlckZucyxcblx0U1RZTEU6IFNUWUxFLFxuXHRTdHlsZTogU3R5bGUsXG5cdHJlbW92ZTogcmVtb3ZlLFxuXHRPcHRpb25zOiBPcHRpb25zXG59KTsiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGVBQWUsUUFBUTs7Q0NBdkIsSUFBSSxrQkFB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