/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：9.5.0
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

	var version = '9.5.0';

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

	                    
		                     
	     
		           
		                               
	  

	var ObjectScope = function ObjectScope (                   keys          )       {
		prepare_(this);
		this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
		var _search = Search(keys);
		var _replacer = Replacer(this);
		for ( var index         = keys.length; index; ) { this[keys[--index]] = Identifier(); }
	}                
		                                 
	 ;

	var SCOPE              =
		ObjectScope.prototype = /*#__PURE__*/preventExtensions(create(null, { $: PropertyDescriptor($, false, false, false) }));

	var InheritedObjectScope = function InheritedObjectScope (                   keys          , proto             )       {
		prepare_(this);
		this[_] = function _ (string        ) { return string.replace(_search, _replacer); };
		for ( var index         = keys.length; index; ) { this[keys[--index]] = Identifier(); }
		for ( var key in proto ) { /*key==='_' || key==='$' || */keys.push(key); }
		var _search = Search(keys);
		var _replacer = Replacer(this);
		InheritedObjectScope.prototype = SCOPE;
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

	                      
		                        
		                      
		           
		                               
	  

	function FunctionScope (cache             )                {
		var scope = function scope (value                         )         { return scopify(arguments.length===1 ? value : slice.call(arguments, 0), _scope); }                 ;
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
			if ( isArray(this) ) { return FunctionScope(mix(this           )); }
			else if ( this instanceof ObjectScope ) { return FunctionScope(create(this)); }
			else if ( typeof this==='function' && this.prototype instanceof ObjectScope ) { return FunctionScope(create(this.prototype)); }
			else { return FunctionScope(create(SCOPE)); }
		}
		else {
			if ( isArray(this) ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = mix(this           )); }
			else if ( this instanceof ObjectScope ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = this); }
			else if ( typeof this==='function' && this.prototype instanceof ObjectScope ) { return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = this.prototype); }
			else { return new ObjectScope(keys.match(KEYS) || EMPTY); }
		}
	}

	function Template (html        , scope       )         {
		return /*#__PURE__*/ scope[_](html);
	}

	function Body (body        )         {
		var index = body.indexOf(',');
		return 'var '+body.slice(0, index)+'=this'+body.slice(index, body.indexOf('(', index))+'=this._self._c||this.$createElement;return '+body.slice(index+1);
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

	function render (createElement                         , context                              ) {
		return createElement('style', context.data, context.children);
	}

	var STYLE                                       = create(null, {
		render: PropertyDescriptor(render, false, true, false),
		functional: PropertyDescriptor(true, false, true, false)
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

	var _export = Default({
		version: version,
		Identifier: Identifier,
		Scope: Scope,
		Template: Template,
		Render: Render,
		StaticRenderFns: StaticRenderFns,
		STYLE: STYLE,
		Style: Style,
		remove: remove
	});

	return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIlNjb3BlL18udHMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS9LRVlTLnRzIiwiU2NvcGUvLnRzIiwiVGVtcGxhdGUudHMiLCJSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlNUWUxFLnRzIiwiU3R5bGUsIHJlbW92ZS50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnOS41LjAnOyIsInZhciBpbmNyZWFzZURpY3Rpb25hcnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHtcblx0MDogJzEnLCAxOiAnMicsIDI6ICczJywgMzogJzQnLCA0OiAnNScsIDU6ICc2JywgNjogJzcnLCA3OiAnOCcsIDg6ICc5JywgOTogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn07XG52YXIgbGF0ZXN0SWRlbnRpZmllciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyAnOScgXTtcbnZhciBsYXN0Q2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSAnOSc7XG52YXIgbGFzdEluZGV4ICAgICAgICAgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJZGVudGlmaWVyICgpICAgICAgICAge1xuXHRcblx0aWYgKCBsYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIGNoYXJhY3RlckluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIGNoYXJhY3RlckluZGV4ICkge1xuXHRcdFx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgPSBsYXRlc3RJZGVudGlmaWVyWy0tY2hhcmFjdGVySW5kZXhdO1xuXHRcdFx0XHRpZiAoIGNoYXJhY3Rlcj09PSd6JyApIHsgbGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSAnMCc7IH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbY2hhcmFjdGVyXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhc3RJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3Rlcl07XG5cdH1cblx0XG5cdC8vdmFyIGlkZW50aWZpZXIgOnN0cmluZyA9IGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdC8vaWYgKCBpc1Jlc2VydmVkV29yZChpZGVudGlmaWVyKSApIHsgbGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTsgcmV0dXJuIGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7IH1cblx0Ly9yZXR1cm4gaWRlbnRpZmllcjtcblx0XG5cdHJldHVybiBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgICAgICAgID0gY3JlYXRlKG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCAgICAgICAgPSBjcmVhdGUobnVsbCk7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoY2hhci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciAgICAgICAgID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJdIHx8ICggZ3JvdXBbY2hhcl0gPSBjcmVhdGUobnVsbCkgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyAgICAgICAgID0gc291cmNpZnkoZ3JvdXBbY2hhcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXIpICkgeyBjaGFyID0gJ1xcXFwnK2NoYXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicrYnJhbmNoZXMuam9pbignfCcpKycpJ1xuXHRcdClcblx0XHQrKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbnZhciBfICAgICAgPSB0eXBlb2YgU3ltYm9sPT09J2Z1bmN0aW9uJ1xuXHQ/IFN5bWJvbCgnXycpICAgICAgIFxuXHQ6ICdfJztcblxuZnVuY3Rpb24gJCAgICAgICAgICAgICAgICAgICggICAgICAgICBjc3MgICAgICAgICAsIG1lZGlhICAgICAgICAgKSAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXNbX10oY3NzKTsgfVxuXHRpZiAoIG1lZGlhIT09dW5kZWZpbmVkICkge1xuXHRcdHN0eWxlLm1lZGlhID0gbWVkaWEgICAgICAgICAgO1xuXHR9XG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gdGhpcztcbn1cblxudmFyIHByZXBhcmVfICAgICAgICAgICAgICAgICAgICAgICAgID0gdHlwZW9mIF89PT0nc3ltYm9sJ1xuXHRcblx0PyBmdW5jdGlvbiAkICgpIHt9XG5cdFxuXHQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX2Rlc2NyaXB0b3IgPSBQcm9wZXJ0eURlc2NyaXB0b3IoZnVuY3Rpb24gXyAoKSB7fSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gJCAoc2NvcGUgICAgICAgKSB7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eShzY29wZSwgXywgX2Rlc2NyaXB0b3IpO1xuXHRcdH07XG5cdH0oKTtcblxuZXhwb3J0IHsgXywgJCwgcHJlcGFyZV8gfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLWdyb3VwaWZ5JztcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IFByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcubnVsbC5Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zIGZyb20gJy5PYmplY3QucHJldmVudEV4dGVuc2lvbnMnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IF8sICQsIHByZXBhcmVfIH0gZnJvbSAnLi9fJztcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzICAgICAgICAgICkge1xuXHRyZXR1cm4gbmV3IFJlZ0V4cCgnX18nK2dyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSsnX18nLCAnZycpO1xufVxuXG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUgICAgICAgICAgICAgKSB7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHNjb3BlW19fa2V5X18uc2xpY2UoMiwgLTIpXTsgfTtcbn1cblxuICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG52YXIgT2JqZWN0U2NvcGUgPSBmdW5jdGlvbiBPYmplY3RTY29wZSAoICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG52YXIgU0NPUEUgICAgICAgICAgICAgID1cblx0T2JqZWN0U2NvcGUucHJvdG90eXBlID0gLyojX19QVVJFX18qL3ByZXZlbnRFeHRlbnNpb25zKGNyZWF0ZShudWxsLCB7ICQ6IFByb3BlcnR5RGVzY3JpcHRvcigkLCBmYWxzZSwgZmFsc2UsIGZhbHNlKSB9KSk7XG5cbnZhciBJbmhlcml0ZWRPYmplY3RTY29wZSA9IGZ1bmN0aW9uIEluaGVyaXRlZE9iamVjdFNjb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICAsIHByb3RvICAgICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICova2V5cy5wdXNoKGtleSk7IH1cblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0SW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG59ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IHsgT2JqZWN0U2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRPYmplY3RTY29wZSB9OyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBPYmplY3RTY29wZSB9IGZyb20gJy4vT2JqZWN0U2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAsIF9zY29wZSAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAge1xuXHR2YXIga2V5cyAgICAgICAgLFxuXHRcdGluZGV4ICAgICAgICAsXG5cdFx0dmFsdWVzICAgICAgICAgICxcblx0XHRrZXkgICAgICAgIDtcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBfc2NvcGUodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVtpbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IF9zY29wZShrZXkpKycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZS5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVtpbmRleF0sIF9zY29wZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK19zY29wZShrZXkpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbmZ1bmN0aW9uIEZ1bmN0aW9uU2NvcGUgKGNhY2hlICAgICAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHNjb3BpZnkoYXJndW1lbnRzLmxlbmd0aD09PTEgPyB2YWx1ZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSwgX3Njb3BlKTsgfSAgICAgICAgICAgICAgICAgO1xuXHRzY29wZS5wcm90b3R5cGUgPSBjYWNoZTtcblx0c2NvcGUuJCA9ICQ7XG5cdHNjb3BlW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKFNFQVJDSCwgX3JlcGxhY2VyKTsgfTtcblx0ZnVuY3Rpb24gX3JlcGxhY2VyIChfX2tleV9fICAgICAgICApICAgICAgICAgeyByZXR1cm4gX3Njb3BlKF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRmdW5jdGlvbiBfc2NvcGUgKGtleSAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIGNhY2hlW2tleV0gfHwgKCBjYWNoZVtrZXldID0gSWRlbnRpZmllcigpICk7IH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG5leHBvcnQgeyBGdW5jdGlvblNjb3BlIGFzIGRlZmF1bHQgfTsiLCJleHBvcnQgZGVmYXVsdCAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBPYmplY3RTY29wZSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9PYmplY3RTY29wZSc7XG5pbXBvcnQgRnVuY3Rpb25TY29wZSBmcm9tICcuL0Z1bmN0aW9uU2NvcGUnO1xuaW1wb3J0IEtFWVMgZnJvbSAnLi9LRVlTJztcblxudmFyIEVNUFRZICAgICAgICAgICA9IFtdO1xuXG5mdW5jdGlvbiBtaXggKHByb3RvcyAgICAgICAgICkgICAgICAgICAgICAgIHtcblx0dmFyIHNjb3BlICAgICAgICAgICAgICA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byAgICAgICAgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZnVuY3Rpb24gU2NvcGUgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICkgICAgICAgIHtcblx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUobWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKHRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG59XG5cbmV4cG9ydCB7IFNjb3BlIGFzIGRlZmF1bHQsIEtFWVMgfTsiLCJpbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gVGVtcGxhdGUgKGh0bWwgICAgICAgICwgc2NvcGUgICAgICAgKSAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gc2NvcGVbX10oaHRtbCk7XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlIGFzIGRlZmF1bHQgfTtcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJzsiLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG5mdW5jdGlvbiBCb2R5IChib2R5ICAgICAgICApICAgICAgICAge1xuXHR2YXIgaW5kZXggPSBib2R5LmluZGV4T2YoJywnKTtcblx0cmV0dXJuICd2YXIgJytib2R5LnNsaWNlKDAsIGluZGV4KSsnPXRoaXMnK2JvZHkuc2xpY2UoaW5kZXgsIGJvZHkuaW5kZXhPZignKCcsIGluZGV4KSkrJz10aGlzLl9zZWxmLl9jfHx0aGlzLiRjcmVhdGVFbGVtZW50O3JldHVybiAnK2JvZHkuc2xpY2UoaW5kZXgrMSk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmZ1bmN0aW9uIFJlbmRlciAoY29kZSAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOycrQm9keShzY29wZSA/IHNjb3BlW19dKGNvZGUpIDogY29kZSkpICAgICAgICAgIDtcbn1cblxuZnVuY3Rpb24gU3RhdGljUmVuZGVyRm5zIChjb2RlcyAgICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGNvZGVzLmxlbmd0aDtcblx0aWYgKCBzY29wZSApIHsgZm9yICggdmFyIHNjb3BlXyA9IHNjb3BlW19dOyBpbmRleC0tOyApIHsgY29kZXNbaW5kZXhdID0gQm9keShzY29wZV8oY29kZXNbaW5kZXhdKSk7IH0gfVxuXHRlbHNlIHsgd2hpbGUgKCBpbmRleC0tICkgeyBjb2Rlc1tpbmRleF0gPSBCb2R5KGNvZGVzW2luZGV4XSk7IH0gfVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybltmdW5jdGlvbigpeycrY29kZXMuam9pbignfSxmdW5jdGlvbigpeycpKyd9XScpKCk7XG59XG5cbmV4cG9ydCB7IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH07IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5cbmZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnRleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywgY29udGV4dC5kYXRhLCBjb250ZXh0LmNoaWxkcmVuKTtcbn1cblxudmFyIFNUWUxFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjcmVhdGUobnVsbCwge1xuXHRyZW5kZXI6IFByb3BlcnR5RGVzY3JpcHRvcihyZW5kZXIsIGZhbHNlLCB0cnVlLCBmYWxzZSksXG5cdGZ1bmN0aW9uYWw6IFByb3BlcnR5RGVzY3JpcHRvcih0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpXG59KTtcblxuZXhwb3J0IHsgU1RZTEUgYXMgZGVmYXVsdCB9O1xuXG5pbXBvcnQgeyBSZW5kZXIgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJzsiLCJpbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFN0eWxlIChjc3MgICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAgICAgICAgICAgIHtcblx0dmFyIHN0eWxlICAgICAgICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gc2NvcGUgPyBzY29wZVtfXShjc3MpIDogY3NzOyB9XG5cdHJldHVybiBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cblxuZXhwb3J0IHsgU3R5bGUsIHJlbW92ZSB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCB7IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU1RZTEUgIGZyb20gJy4vU1RZTEUnO1xuaW1wb3J0IHsgU3R5bGUsIHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdElkZW50aWZpZXIsXG5cdFNjb3BlLFxuXHRUZW1wbGF0ZSxcblx0UmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFLFxuXHRTdHlsZSwgcmVtb3ZlLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlcixcblx0U3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFOiBTVFlMRSxcblx0U3R5bGU6IFN0eWxlLFxuXHRyZW1vdmU6IHJlbW92ZVxufSk7Il0sIm5hbWVzIjpbInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxlQUFlLE9BQU87O0NDQXRCLElBQUksa0JBQWtCLHdEQUF3RDtDQUM5RSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0NBQy9FLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFF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QyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUN2RixDQUFDOztDQ2xCRCxTQUFTLE1BQU0sRUFBRSxhQUFhLDJCQUEyQixPQUFPLGdDQUFnQztDQUNoRyxDQUFDLE9BQU8sYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUMvRCxDQUFDOztDQUVELElBQUksS0FBSyx5Q0FBeUMsTUFBTSxDQUFDLElBQUksRUFBRTtDQUMvRCxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7Q0FDdkQsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO0NBQ3pELENBQUMsQ0FBQyxDQUFDOztDQ0xILFNBQVMsS0FBSyxFQUFFLEdBQUcsV0FBVyxLQUFLLDRCQUE0QjtDQUMvRCxDQUFDLElBQUksS0FBSyxxQkFBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMvRCxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0NBQ2hFLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2hDLENBQUM7O0NBRUQsU0FBUyxNQUFNLEVBQUUsS0FBSyxtQ0FBbUM7Q0FDekQsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pCLENBQUMsT0FBTyxNQUFNLENBQUM7Q0FDZixDQUFDOztBQ0tELGVBQWUsT0FBTyxDQUFDO0NBQ3ZCLENBQUMsT0FBTyxFQUFFLE9BQU87Q0FDakIsQ0FBQyxVQUFVLEVBQUUsVUFBVTtDQUN2QixDQUFDLEtBQUssRUFBRSxLQUFLO0NBQ2IsQ0FBQyxRQUFRLEVBQUUsUUFBUTtDQUNuQixDQUFDLE1BQU0sRUFBRSxNQUFNO0NBQ2YsQ0FBQyxlQUFlLEVBQUUsZUFBZTtDQUNqQyxDQUFDLEtBQUssRUFBRSxLQUFLO0NBQ2IsQ0FBQyxLQUFLLEVBQUUsS0FBSztDQUNiLENBQUMsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvRnJvbnRFbmRSdW50aW1lRGVwZW5kZW5jeS8ifQ==