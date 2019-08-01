/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：9.4.0
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

	var version = '9.4.0';

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIlNjb3BlL18udHMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZS50cyIsIlJlbmRlciwgU3RhdGljUmVuZGVyRm5zLnRzIiwiU1RZTEUudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICc5LjQuMCc7IiwidmFyIGluY3JlYXNlRGljdGlvbmFyeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBsYXRlc3RJZGVudGlmaWVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbICc5JyBdO1xudmFyIGxhc3RDaGFyYWN0ZXIgICAgICAgICAgICAgICAgICAgICAgICA9ICc5JztcbnZhciBsYXN0SW5kZXggICAgICAgICA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIElkZW50aWZpZXIgKCkgICAgICAgICB7XG5cdFxuXHRpZiAoIGxhc3RDaGFyYWN0ZXI9PT0neicgKSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggICAgICAgICA9IGxhc3RJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICAgICAgICAgICAgICAgICA9IGxhdGVzdElkZW50aWZpZXJbLS1jaGFyYWN0ZXJJbmRleF07XG5cdFx0XHRcdGlmICggY2hhcmFjdGVyPT09J3onICkgeyBsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtjaGFyYWN0ZXJdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0KCdhJyk7XG5cdFx0XHRcdCsrbGFzdEluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0Ly92YXIgaWRlbnRpZmllciA6c3RyaW5nID0gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0Ly9pZiAoIGlzUmVzZXJ2ZWRXb3JkKGlkZW50aWZpZXIpICkgeyBsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXJdOyByZXR1cm4gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTsgfVxuXHQvL3JldHVybiBpZGVudGlmaWVyO1xuXHRcblx0cmV0dXJuIGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdFxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCAgICAgICAgPSBjcmVhdGUobnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwICAgICAgICA9IGNyZWF0ZShudWxsKTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciAgICAgICAgID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyXSB8fCAoIGdyb3VwW2NoYXJdID0gY3JlYXRlKG51bGwpICksIGJyYW5jaC5zbGljZShjaGFyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgICAgICAgLCBuZWVkRXNjYXBlICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGJyYW5jaGVzICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCAgICAgICAgICAgPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggICAgICAgICAgPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzICAgICAgICAgPSBzb3VyY2lmeShncm91cFtjaGFyXSwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcikgKSB7IGNoYXIgPSAnXFxcXCcrY2hhcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBQcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLm51bGwuUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gICAgICA9IHR5cGVvZiBTeW1ib2w9PT0nZnVuY3Rpb24nXG5cdD8gU3ltYm9sKCdfJykgICAgICAgXG5cdDogJ18nO1xuXG5mdW5jdGlvbiAkICAgICAgICAgICAgICAgICAgKCAgICAgICAgIGNzcyAgICAgICAgICwgbWVkaWEgICAgICAgICApICAgIHtcblx0dmFyIHN0eWxlICAgICAgICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gdGhpc1tfXShjc3MpOyB9XG5cdGlmICggbWVkaWEhPT11bmRlZmluZWQgKSB7XG5cdFx0c3R5bGUubWVkaWEgPSBtZWRpYSAgICAgICAgICA7XG5cdH1cblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdHJldHVybiB0aGlzO1xufVxuXG52YXIgcHJlcGFyZV8gICAgICAgICAgICAgICAgICAgICAgICAgPSB0eXBlb2YgXz09PSdzeW1ib2wnXG5cdFxuXHQ/IGZ1bmN0aW9uICQgKCkge31cblx0XG5cdDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfZGVzY3JpcHRvciA9IFByb3BlcnR5RGVzY3JpcHRvcihmdW5jdGlvbiBfICgpIHt9LCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuXHRcdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSAgICAgICApIHtcblx0XHRcdGRlZmluZVByb3BlcnR5KHNjb3BlLCBfLCBfZGVzY3JpcHRvcik7XG5cdFx0fTtcblx0fSgpO1xuXG5leHBvcnQgeyBfLCAkLCBwcmVwYXJlXyB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otZ3JvdXBpZnknO1xuXG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgXywgJCwgcHJlcGFyZV8gfSBmcm9tICcuL18nO1xuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgICAgICAgICAgKSB7XG5cdHJldHVybiBuZXcgUmVnRXhwKCdfXycrZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpKydfXycsICdnJyk7XG59XG5cbmZ1bmN0aW9uIFJlcGxhY2VyIChzY29wZSAgICAgICAgICAgICApIHtcblx0cmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2VyIChfX2tleV9fICAgICAgICApICAgICAgICAgeyByZXR1cm4gc2NvcGVbX19rZXlfXy5zbGljZSgyLCAtMildOyB9O1xufVxuXG4gICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbnZhciBPYmplY3RTY29wZSA9IGZ1bmN0aW9uIE9iamVjdFNjb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICApICAgICAgIHtcblx0cHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG59ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbnZhciBTQ09QRSAgICAgICAgICAgICAgPVxuXHRPYmplY3RTY29wZS5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovcHJldmVudEV4dGVuc2lvbnMoY3JlYXRlKG51bGwsIHsgJDogUHJvcGVydHlEZXNjcmlwdG9yKCQsIGZhbHNlLCBmYWxzZSwgZmFsc2UpIH0pKTtcblxudmFyIEluaGVyaXRlZE9iamVjdFNjb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkT2JqZWN0U2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKi9rZXlzLnB1c2goa2V5KTsgfVxuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgeyBPYmplY3RTY29wZSwgU0NPUEUsIEluaGVyaXRlZE9iamVjdFNjb3BlIH07IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IHNsaWNlIGZyb20gJy5BcnJheS5wcm90b3R5cGUuc2xpY2UnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IE9iamVjdFNjb3BlIH0gZnJvbSAnLi9PYmplY3RTY29wZSc7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIFNFQVJDSCA9IC9fX1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqX18vaWc7XG5cbmZ1bmN0aW9uIHNjb3BpZnkgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICwgX3Njb3BlICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBrZXlzICAgICAgICAsXG5cdFx0aW5kZXggICAgICAgICxcblx0XHR2YWx1ZXMgICAgICAgICAgLFxuXHRcdGtleSAgICAgICAgO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF9zY29wZSh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZXMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlW2luZGV4XTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0gX3Njb3BlKGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlW2luZGV4XSwgX3Njb3BlKTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0ga2V5KycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGZvciAoIGtleSBpbiB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdGlmICggKCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgIClba2V5XSApIHsga2V5cyArPSAnICcrX3Njb3BlKGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuZnVuY3Rpb24gRnVuY3Rpb25TY29wZSAoY2FjaGUgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdHZhciBzY29wZSA9IGZ1bmN0aW9uIHNjb3BlICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gc2NvcGlmeShhcmd1bWVudHMubGVuZ3RoPT09MSA/IHZhbHVlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDApLCBfc2NvcGUpOyB9ICAgICAgICAgICAgICAgICA7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoU0VBUkNILCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBfc2NvcGUoX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdGZ1bmN0aW9uIF9zY29wZSAoa2V5ICAgICAgICApICAgICAgICAgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IEZ1bmN0aW9uU2NvcGUgYXMgZGVmYXVsdCB9OyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgT2JqZWN0U2NvcGUsIEluaGVyaXRlZE9iamVjdFNjb3BlLCBTQ09QRSB9IGZyb20gJy4vT2JqZWN0U2NvcGUnO1xuaW1wb3J0IEZ1bmN0aW9uU2NvcGUgZnJvbSAnLi9GdW5jdGlvblNjb3BlJztcblxudmFyIEtFWVMgPSAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7XG52YXIgRU1QVFkgICAgICAgICAgID0gW107XG5cbmZ1bmN0aW9uIG1peCAocHJvdG9zICAgICAgICAgKSAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgICAgICAgICAgICAgID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvICAgICAgICA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9IHByb3RvLnByb3RvdHlwZTsgfVxuXHRcdGZvciAoIHZhciBpZCBpbiBwcm90byApIHsgc2NvcGVbaWRdID0gcHJvdG9baWRdOyB9XG5cdH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5mdW5jdGlvbiBTY29wZSAoICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgKSAgICAgICAge1xuXHRpZiAoIGtleXM9PT11bmRlZmluZWQgKSB7XG5cdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUodGhpcy5wcm90b3R5cGUpKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IHRoaXMpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gbmV3IE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cbn1cblxuZXhwb3J0IHsgU2NvcGUgYXMgZGVmYXVsdCwgS0VZUyB9OyIsImltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCAgICAgICAgLCBzY29wZSAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qLyBzY29wZVtfXShodG1sKTtcbn1cblxuZXhwb3J0IHsgVGVtcGxhdGUgYXMgZGVmYXVsdCB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nOyIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbmZ1bmN0aW9uIEJvZHkgKGJvZHkgICAgICAgICkgICAgICAgICB7XG5cdHZhciBpbmRleCA9IGJvZHkuaW5kZXhPZignLCcpO1xuXHRyZXR1cm4gJ3ZhciAnK2JvZHkuc2xpY2UoMCwgaW5kZXgpKyc9dGhpcycrYm9keS5zbGljZShpbmRleCwgYm9keS5pbmRleE9mKCcoJywgaW5kZXgpKSsnPXRoaXMuX3NlbGYuX2N8fHRoaXMuJGNyZWF0ZUVsZW1lbnQ7cmV0dXJuICcrYm9keS5zbGljZShpbmRleCsxKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZnVuY3Rpb24gUmVuZGVyIChjb2RlICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qLyBGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7JytCb2R5KHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSkgICAgICAgICAgO1xufVxuXG5mdW5jdGlvbiBTdGF0aWNSZW5kZXJGbnMgKGNvZGVzICAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgIHtcblx0dmFyIGluZGV4ID0gY29kZXMubGVuZ3RoO1xuXHRpZiAoIHNjb3BlICkgeyBmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4LS07ICkgeyBjb2Rlc1tpbmRleF0gPSBCb2R5KHNjb3BlXyhjb2Rlc1tpbmRleF0pKTsgfSB9XG5cdGVsc2UgeyB3aGlsZSAoIGluZGV4LS0gKSB7IGNvZGVzW2luZGV4XSA9IEJvZHkoY29kZXNbaW5kZXhdKTsgfSB9XG5cdHJldHVybiBGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7cmV0dXJuW2Z1bmN0aW9uKCl7Jytjb2Rlcy5qb2luKCd9LGZ1bmN0aW9uKCl7JykrJ31dJykoKTtcbn1cblxuZXhwb3J0IHsgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMgfTsiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBQcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLm51bGwuUHJvcGVydHlEZXNjcmlwdG9yJztcblxuZnVuY3Rpb24gcmVuZGVyIChjcmVhdGVFbGVtZW50ICAgICAgICAgICAgICAgICAgICAgICAgICwgY29udGV4dCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRyZXR1cm4gY3JlYXRlRWxlbWVudCgnc3R5bGUnLCBjb250ZXh0LmRhdGEsIGNvbnRleHQuY2hpbGRyZW4pO1xufVxuXG52YXIgU1RZTEUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNyZWF0ZShudWxsLCB7XG5cdHJlbmRlcjogUHJvcGVydHlEZXNjcmlwdG9yKHJlbmRlciwgZmFsc2UsIHRydWUsIGZhbHNlKSxcblx0ZnVuY3Rpb25hbDogUHJvcGVydHlEZXNjcmlwdG9yKHRydWUsIGZhbHNlLCB0cnVlLCBmYWxzZSlcbn0pO1xuXG5leHBvcnQgeyBTVFlMRSBhcyBkZWZhdWx0IH07XG5cbmltcG9ydCB7IFJlbmRlciB9IGZyb20gJy4vUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnOyIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gU3R5bGUgKGNzcyAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlW19dKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG5leHBvcnQgeyBTdHlsZSwgcmVtb3ZlIH07XG5cbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7IiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4vSWRlbnRpZmllcic7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vVGVtcGxhdGUnO1xuaW1wb3J0IHsgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmltcG9ydCBTVFlMRSAgZnJvbSAnLi9TVFlMRSc7XG5pbXBvcnQgeyBTdHlsZSwgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0SWRlbnRpZmllcixcblx0U2NvcGUsXG5cdFRlbXBsYXRlLFxuXHRSZW5kZXIsIFN0YXRpY1JlbmRlckZucyxcblx0U1RZTEUsXG5cdFN0eWxlLCByZW1vdmUsXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0SWRlbnRpZmllcjogSWRlbnRpZmllcixcblx0U2NvcGU6IFNjb3BlLFxuXHRUZW1wbGF0ZTogVGVtcGxhdGUsXG5cdFJlbmRlcjogUmVuZGVyLFxuXHRTdGF0aWNSZW5kZXJGbnM6IFN0YXRpY1JlbmRlckZucyxcblx0U1RZTEU6IFNUWUxFLFxuXHRTdHlsZTogU3R5bGUsXG5cdHJlbW92ZTogcmVtb3ZlXG59KTsiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGVBQWUsT0FBTzs7Q0NBdEIsSUFBSSxrQkFBa0Isd0RBQXdEO0NBQzlFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Q0FDL0UsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFB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Q0FBQztDQUN2RixDQUFDOztDQ2xCRCxTQUFTLE1BQU0sRUFBRSxhQUFhLDJCQUEyQixPQUFPLGdDQUFnQztDQUNoRyxDQUFDLE9BQU8sYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUMvRCxDQUFDOztDQUVELElBQUksS0FBSyx5Q0FBeUMsTUFBTSxDQUFDLElBQUksRUFBRTtDQUMvRCxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7Q0FDdkQsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO0NBQ3pELENBQUMsQ0FBQyxDQUFDOztDQ0xILFNBQVMsS0FBSyxFQUFFLEdBQUcsV0FBVyxLQUFLLDRCQUE0QjtDQUMvRCxDQUFDLElBQUksS0FBSyxxQkFBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMvRCxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0NBQ2hFLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2hDLENBQUM7O0NBRUQsU0FBUyxNQUFNLEVBQUUsS0FBSyxtQ0FBbUM7Q0FDekQsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pCLENBQUMsT0FBTyxNQUFNLENBQUM7Q0FDZixDQUFDOztBQ0tELGVBQWUsT0FBTyxDQUFDO0NBQ3ZCLENBQUMsT0FBTyxFQUFFLE9BQU87Q0FDakIsQ0FBQyxVQUFVLEVBQUUsVUFBVTtDQUN2QixDQUFDLEtBQUssRUFBRSxLQUFLO0NBQ2IsQ0FBQyxRQUFRLEVBQUUsUUFBUTtDQUNuQixDQUFDLE1BQU0sRUFBRSxNQUFNO0NBQ2YsQ0FBQyxlQUFlLEVBQUUsZUFBZTtDQUNqQyxDQUFDLEtBQUssRUFBRSxLQUFLO0NBQ2IsQ0FBQyxLQUFLLEVBQUUsS0FBSztDQUNiLENBQUMsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvRnJvbnRFbmRSdW50aW1lRGVwZW5kZW5jeS8ifQ==