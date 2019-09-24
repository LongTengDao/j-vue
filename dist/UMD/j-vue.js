/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：15.4.0
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

	var version = '15.4.0';

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
		
		//return latestIdentifier.join('')+'_';
		var identifier         = latestIdentifier.join('');
		if ( lastIndex>2 ) {
			switch ( identifier ) {
				case 'auto':
				case 'none':
				case 'span':
				case 'unset':
				case 'default':
				case 'inherit':
				case 'initial':
				case 'contents':
				case 'notranslate':
					lastCharacter = latestIdentifier[lastIndex] = increaseDictionary[lastCharacter                                     ];
					identifier = latestIdentifier.join('');
			}
		}
		return identifier;
		
	}

	var isArray = Array.isArray;

	var create = Object.create;

	var undefined$1 = void 0;

	var NULL = (
		/*! j-globals: null.prototype (internal) */
		Object.create
			? /*#__PURE__*/ Object.preventExtensions(Object.create(null))
			: null
		/*¡ j-globals: null.prototype (internal) */
	);

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
				if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(NULL); }
				if ( assign ) { assign(exports, addOnOrigin); }
				else { for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
				exports['default'] = exports;
				typeof exports==='function' && exports.prototype && seal(exports.prototype);
				if ( toStringTag ) {
					var descriptor = create(NULL);
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
	 * 模块版本：3.6.0
	 * 许可条款：LGPL-3.0
	 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
	 * 问题反馈：https://GitHub.com/LongTengDao/j-groupify/issues
	 * 项目主页：https://GitHub.com/LongTengDao/j-groupify/
	 */

	var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
	var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
	var GROUP = create(NULL)         ;

	function groupify (branches          , uFlag          , noEscape          )         {
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

	/*¡ j-groupify */

	var create$1 = Object.create;

	var PropertyDescriptor = (
		/*! j-globals: null.PropertyDescriptor (internal) */
		function () {
			function __PURE__ (value_get, set_writable, enumerable, configurable) {
				var propertyDescriptor = create$1(NULL);
				if ( set_writable===true || set_writable===false ) {
					propertyDescriptor.value = value_get;
					propertyDescriptor.writable = set_writable;
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

	var SCOPE              = /*#__PURE__*/ preventExtensions(create(null, { $: PropertyDescriptor($, false, false, false) })               );
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
		return /*#__PURE__*/ scope[_](html);
	}

	var VAR_                    = /*#__PURE__*/ function () {
		try { Function('const v=0'); }
		catch (error) { return 'var '; }
		return 'const ';
	}();

	function Body (body        )         {
		var index         = body.indexOf(',');
		if ( index<0 ) { return 'return this._m('+body+')'; }
		var _vm_this = index ? body.slice(0, index)+'=this,' : '';
		var _c = body.slice(++index, body.indexOf('(', index));
		var _call = body.slice(index);
		return VAR_+_vm_this+_c+'=this._self._c;return '+_call;
	}

	                                                                                                                                      

	function WithStripped (render        ) {
		( render                             )._withStripped = true;
		return render;
	}

	function Render (code                 , scope        )         {
		return /*#__PURE__*/ WithStripped(
			/*#__PURE__*/ Function(
				'"use strict";'+Body(scope ? scope[_](''+code) : ''+code)
			)          
		);
	}

	function StaticRenderFns (codes                                , scope        )           {
		var index         = codes.length;
		var body         = ']';
		if ( scope ) {
			for ( var scope_ = scope[_]; index; ) {
				body = 'function(){'+Body(scope_(''+codes[--index]))+'},'+body;
			}
		}
		else {
			while ( index ) {
				body = 'function(){'+Body(''+codes[--index])+'},'+body;
			}
		}
		return Function('"use strict";return['+body)();
	}

	function render (createElement                                     , context                                                             ) {
		return createElement('style', context.data, context.children);
	}

	var STYLE = create(create(null), {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIlNjb3BlL18udHMiLCJTY29wZS9TdGF0aWNTY29wZS50cyIsIlNjb3BlL0R5bmFtaWNTY29wZS50cyIsIlNjb3BlL0tFWVMudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZS50cyIsIlJlbmRlciwgU3RhdGljUmVuZGVyRm5zLnRzIiwiU1RZTEUudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiT3B0aW9ucy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMTUuNC4wJzsiLCJ2YXIgaW5jcmVhc2VEaWN0aW9uYXJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB7XG5cdDA6ICcxJywgMTogJzInLCAyOiAnMycsIDM6ICc0JywgNDogJzUnLCA1OiAnNicsIDY6ICc3JywgNzogJzgnLCA4OiAnOScsIDk6ICdhJyxcblx0YTogJ2InLCBiOiAnYycsIGM6ICdkJywgZDogJ2UnLCBlOiAnZicsIGY6ICdnJywgZzogJ2gnLFxuXHRoOiAnaScsIGk6ICdqJywgajogJ2snLCBrOiAnbCcsIGw6ICdtJywgbTogJ24nLCBuOiAnbycsXG5cdG86ICdwJywgcDogJ3EnLCBxOiAncicsIHI6ICdzJywgczogJ3QnLCB0OiAndScsXG5cdHU6ICd2JywgdjogJ3cnLCB3OiAneCcsIHg6ICd5JywgeTogJ3onXG59O1xudmFyIGxhdGVzdElkZW50aWZpZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFsgJzknIF07XG52YXIgbGFzdENoYXJhY3RlciAgICAgICAgICAgICAgICAgICAgICAgID0gJzknO1xudmFyIGxhc3RJbmRleCAgICAgICAgID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSAgICAgICAgIHtcblx0XG5cdGlmICggbGFzdENoYXJhY3Rlcj09PSd6JyApIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gJzAnO1xuXHRcdGZvciAoIHZhciBjaGFyYWN0ZXJJbmRleCAgICAgICAgID0gbGFzdEluZGV4OyA7ICkge1xuXHRcdFx0aWYgKCBjaGFyYWN0ZXJJbmRleCApIHtcblx0XHRcdFx0dmFyIGNoYXJhY3RlciAgICAgICAgICAgICAgICAgICAgICAgID0gbGF0ZXN0SWRlbnRpZmllclstLWNoYXJhY3RlckluZGV4XTtcblx0XHRcdFx0aWYgKCBjaGFyYWN0ZXI9PT0neicgKSB7IGxhdGVzdElkZW50aWZpZXJbY2hhcmFjdGVySW5kZXhdID0gJzAnOyB9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGxhdGVzdElkZW50aWZpZXJbY2hhcmFjdGVySW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2NoYXJhY3Rlcl07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyLnVuc2hpZnQoJ2EnKTtcblx0XHRcdFx0KytsYXN0SW5kZXg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXJdO1xuXHR9XG5cdFxuXHQvL3JldHVybiBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpKydfJztcblx0dmFyIGlkZW50aWZpZXIgICAgICAgICA9IGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdGlmICggbGFzdEluZGV4PjIgKSB7XG5cdFx0c3dpdGNoICggaWRlbnRpZmllciApIHtcblx0XHRcdGNhc2UgJ2F1dG8nOlxuXHRcdFx0Y2FzZSAnbm9uZSc6XG5cdFx0XHRjYXNlICdzcGFuJzpcblx0XHRcdGNhc2UgJ3Vuc2V0Jzpcblx0XHRcdGNhc2UgJ2RlZmF1bHQnOlxuXHRcdFx0Y2FzZSAnaW5oZXJpdCc6XG5cdFx0XHRjYXNlICdpbml0aWFsJzpcblx0XHRcdGNhc2UgJ2NvbnRlbnRzJzpcblx0XHRcdGNhc2UgJ25vdHJhbnNsYXRlJzpcblx0XHRcdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XG5cdFx0XHRcdGlkZW50aWZpZXIgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gaWRlbnRpZmllcjtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzICAgICAgICAgICwgdUZsYWcgICAgICAgICAgLCBub0VzY2FwZSAgICAgICAgICApICAgICAgICAge1xuXHR2YXIgZ3JvdXAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyYWN0ZXJdIHx8ICggZ3JvdXBbY2hhcmFjdGVyXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICApLCBicmFuY2guc2xpY2UoY2hhcmFjdGVyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kQ29kZUJyYW5jaChncm91cFtjaGFyYWN0ZXJdIHx8ICggZ3JvdXBbY2hhcmFjdGVyXSA9IGNyZWF0ZShOVUxMKSAgICAgICAgICApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgICAgICAgLCBuZWVkRXNjYXBlICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGJyYW5jaGVzICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCAgICAgICAgICAgPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggICAgICAgICAgPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhcmFjdGVyIGluIGdyb3VwICkge1xuXHRcdGlmICggY2hhcmFjdGVyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyAgICAgICAgID0gc291cmNpZnkoZ3JvdXBbY2hhcmFjdGVyXSwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcmFjdGVyKSApIHsgY2hhcmFjdGVyID0gJ1xcXFwnK2NoYXJhY3RlcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyYWN0ZXIrc3ViX2JyYW5jaGVzKSA6IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gucHVzaChjaGFyYWN0ZXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicrYnJhbmNoZXMuam9pbignfCcpKycpJ1xuXHRcdClcblx0XHQrKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBQcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLm51bGwuUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gICAgICA9IHR5cGVvZiBTeW1ib2w9PT0nZnVuY3Rpb24nXG5cdD8gU3ltYm9sKCdfJykgICAgICAgXG5cdDogJ18nO1xuXG5mdW5jdGlvbiAkICAgICAgICAgICAgICAgICAgKCAgICAgICAgIGNzcyAgICAgICAgICwgbWVkaWEgICAgICAgICApICAgIHtcblx0dmFyIHN0eWxlICAgICAgICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gdGhpc1tfXShjc3MpOyB9XG5cdGlmICggbWVkaWEhPT11bmRlZmluZWQgKSB7XG5cdFx0c3R5bGUubWVkaWEgPSBtZWRpYSAgICAgICAgICA7XG5cdH1cblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdHJldHVybiB0aGlzO1xufVxuXG52YXIgcHJlcGFyZV8gICAgICAgICAgICAgICAgICAgICAgICAgPSB0eXBlb2YgXz09PSdzeW1ib2wnXG5cdFxuXHQ/IGZ1bmN0aW9uICQgKCkge31cblx0XG5cdDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfZGVzY3JpcHRvciA9IFByb3BlcnR5RGVzY3JpcHRvcihmdW5jdGlvbiBfICgpIHt9LCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuXHRcdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSAgICAgICApIHtcblx0XHRcdGRlZmluZVByb3BlcnR5KHNjb3BlLCBfLCBfZGVzY3JpcHRvcik7XG5cdFx0fTtcblx0fSgpO1xuXG5leHBvcnQgeyBfLCAkLCBwcmVwYXJlXyB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otZ3JvdXBpZnknO1xuXG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgXywgJCwgcHJlcGFyZV8gfSBmcm9tICcuL18nO1xuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgICAgICAgICAgKSB7XG5cdHJldHVybiBuZXcgUmVnRXhwKCdfXycrZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpKydfXycsICdnJyk7XG59XG5cbmZ1bmN0aW9uIFJlcGxhY2VyIChzY29wZSAgICAgICAgICAgICApIHtcblx0cmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2VyIChfX2tleV9fICAgICAgICApICAgICAgICAgeyByZXR1cm4gc2NvcGVbX19rZXlfXy5zbGljZSgyLCAtMildOyB9O1xufVxuXG4gICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICBcbiAgICAgXG5cdCAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgXG5cbnZhciBTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICApICAgICAgIHtcblx0cHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG59ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5cbnZhciBTQ09QRSAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovIHByZXZlbnRFeHRlbnNpb25zKGNyZWF0ZShudWxsLCB7ICQ6IFByb3BlcnR5RGVzY3JpcHRvcigkLCBmYWxzZSwgZmFsc2UsIGZhbHNlKSB9KSAgICAgICAgICAgICAgICk7XG5TdGF0aWNTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcblxudmFyIEluaGVyaXRlZFN0YXRpY1Njb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkU3RhdGljU2NvcGUgKCAgICAgICAgICAgICAgICAgICBrZXlzICAgICAgICAgICwgcHJvdG8gICAgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKi9rZXlzLnB1c2goa2V5KTsgfVxuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcbn0gICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgeyBTdGF0aWNTY29wZSwgU0NPUEUsIEluaGVyaXRlZFN0YXRpY1Njb3BlIH07IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IHNsaWNlIGZyb20gJy5BcnJheS5wcm90b3R5cGUuc2xpY2UnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IFN0YXRpY1Njb3BlIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIFNFQVJDSCA9IC9fX1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqX18vaWc7XG5cbmZ1bmN0aW9uIHNjb3BpZnkgKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICwgX3Njb3BlICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBrZXlzICAgICAgICAsXG5cdFx0aW5kZXggICAgICAgICxcblx0XHR2YWx1ZXMgICAgICAgICAgLFxuXHRcdGtleSAgICAgICAgO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF9zY29wZSh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZXMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlW2luZGV4XTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0gX3Njb3BlKGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlW2luZGV4XSwgX3Njb3BlKTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0ga2V5KycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGZvciAoIGtleSBpbiB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdGlmICggKCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgIClba2V5XSApIHsga2V5cyArPSAnICcrX3Njb3BlKGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG5mdW5jdGlvbiBEeW5hbWljU2NvcGUgKGNhY2hlICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7XG5cdHZhciBzY29wZSA9IGZ1bmN0aW9uIHNjb3BlICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gc2NvcGlmeShhcmd1bWVudHMubGVuZ3RoPT09MSA/IHZhbHVlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDApLCBfc2NvcGUpOyB9ICAgICAgICAgICAgICAgIDtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIF9zY29wZShfX2tleV9fLnNsaWNlKDIsIC0yKSk7IH1cblx0ZnVuY3Rpb24gX3Njb3BlIChrZXkgICAgICAgICkgICAgICAgICB7IHJldHVybiBjYWNoZVtrZXldIHx8ICggY2FjaGVba2V5XSA9IElkZW50aWZpZXIoKSApOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZXhwb3J0IHsgRHluYW1pY1Njb3BlIGFzIGRlZmF1bHQgfTsiLCJleHBvcnQgZGVmYXVsdCAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBTdGF0aWNTY29wZSwgSW5oZXJpdGVkU3RhdGljU2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9TdGF0aWNTY29wZSc7XG5pbXBvcnQgRHluYW1pY1Njb3BlIGZyb20gJy4vRHluYW1pY1Njb3BlJztcbmltcG9ydCBLRVlTIGZyb20gJy4vS0VZUyc7XG5cbnZhciBFTVBUWSAgICAgICAgICAgPSBbXTtcblxuZnVuY3Rpb24gbWl4IChwcm90b3MgICAgICAgICApICAgICAgICAgICAgICB7XG5cdHZhciBzY29wZSAgICAgICAgICAgICAgPSBjcmVhdGUoU0NPUEUpO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBwcm90b3MubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgcHJvdG8gICAgICAgID0gcHJvdG9zW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiBwcm90bz09PSdmdW5jdGlvbicgKSB7IHByb3RvID0gcHJvdG8ucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZnVuY3Rpb24gU2NvcGUgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICkgICAgICAgIHtcblx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgU3RhdGljU2NvcGUgKSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlICAgICAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyAgICAgICAgICAgKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZFN0YXRpY1Njb3BlLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gbmV3IFN0YXRpY1Njb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cbn1cblNjb3BlLnByb3RvdHlwZSA9IG51bGwgICAgICAgO1xuXG5leHBvcnQgeyBTY29wZSBhcyBkZWZhdWx0LCBLRVlTIH07IiwiaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFRlbXBsYXRlIChodG1sICAgICAgICAsIHNjb3BlICAgICAgICkgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIHNjb3BlW19dKGh0bWwpO1xufVxuXG5leHBvcnQgeyBUZW1wbGF0ZSBhcyBkZWZhdWx0IH07XG5cbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7IiwiaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcblxudmFyIFZBUl8gICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qLyBmdW5jdGlvbiAoKSB7XG5cdHRyeSB7IEZ1bmN0aW9uKCdjb25zdCB2PTAnKTsgfVxuXHRjYXRjaCAoZXJyb3IpIHsgcmV0dXJuICd2YXIgJzsgfVxuXHRyZXR1cm4gJ2NvbnN0ICc7XG59KCk7XG5cbmZ1bmN0aW9uIEJvZHkgKGJvZHkgICAgICAgICkgICAgICAgICB7XG5cdHZhciBpbmRleCAgICAgICAgID0gYm9keS5pbmRleE9mKCcsJyk7XG5cdGlmICggaW5kZXg8MCApIHsgcmV0dXJuICdyZXR1cm4gdGhpcy5fbSgnK2JvZHkrJyknOyB9XG5cdHZhciBfdm1fdGhpcyA9IGluZGV4ID8gYm9keS5zbGljZSgwLCBpbmRleCkrJz10aGlzLCcgOiAnJztcblx0dmFyIF9jID0gYm9keS5zbGljZSgrK2luZGV4LCBib2R5LmluZGV4T2YoJygnLCBpbmRleCkpO1xuXHR2YXIgX2NhbGwgPSBib2R5LnNsaWNlKGluZGV4KTtcblx0cmV0dXJuIFZBUl8rX3ZtX3RoaXMrX2MrJz10aGlzLl9zZWxmLl9jO3JldHVybiAnK19jYWxsO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5mdW5jdGlvbiBXaXRoU3RyaXBwZWQgKHJlbmRlciAgICAgICAgKSB7XG5cdCggcmVuZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLl93aXRoU3RyaXBwZWQgPSB0cnVlO1xuXHRyZXR1cm4gcmVuZGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVuZGVyIChjb2RlICAgICAgICAgICAgICAgICAsIHNjb3BlICAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qLyBXaXRoU3RyaXBwZWQoXG5cdFx0LyojX19QVVJFX18qLyBGdW5jdGlvbihcblx0XHRcdCdcInVzZSBzdHJpY3RcIjsnK0JvZHkoc2NvcGUgPyBzY29wZVtfXSgnJytjb2RlKSA6ICcnK2NvZGUpXG5cdFx0KSAgICAgICAgICBcblx0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgIHtcblx0dmFyIGluZGV4ICAgICAgICAgPSBjb2Rlcy5sZW5ndGg7XG5cdHZhciBib2R5ICAgICAgICAgPSAnXSc7XG5cdGlmICggc2NvcGUgKSB7XG5cdFx0Zm9yICggdmFyIHNjb3BlXyA9IHNjb3BlW19dOyBpbmRleDsgKSB7XG5cdFx0XHRib2R5ID0gJ2Z1bmN0aW9uKCl7JytCb2R5KHNjb3BlXygnJytjb2Rlc1stLWluZGV4XSkpKyd9LCcrYm9keTtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleCApIHtcblx0XHRcdGJvZHkgPSAnZnVuY3Rpb24oKXsnK0JvZHkoJycrY29kZXNbLS1pbmRleF0pKyd9LCcrYm9keTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bJytib2R5KSgpO1xufVxuIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5cbmZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnRleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJldHVybiBjcmVhdGVFbGVtZW50KCdzdHlsZScsIGNvbnRleHQuZGF0YSwgY29udGV4dC5jaGlsZHJlbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZShjcmVhdGUobnVsbCksIHtcblx0ZnVuY3Rpb25hbDogUHJvcGVydHlEZXNjcmlwdG9yKHRydWUgICAgICAgICwgZmFsc2UsIHRydWUsIGZhbHNlKSxcblx0cmVuZGVyOiBQcm9wZXJ0eURlc2NyaXB0b3IocmVuZGVyLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpXG59KTtcbiIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gU3R5bGUgKGNzcyAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlW19dKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG5leHBvcnQgeyBTdHlsZSwgcmVtb3ZlIH07XG5cbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gT3B0aW9ucyAob3B0aW9ucyAgICAgICAgKSB7IHJldHVybiBvcHRpb25zOyB9OyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCB7IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU1RZTEUgIGZyb20gJy4vU1RZTEUnO1xuaW1wb3J0IHsgU3R5bGUsIHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL09wdGlvbnMnO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRJZGVudGlmaWVyLFxuXHRTY29wZSxcblx0VGVtcGxhdGUsXG5cdFJlbmRlciwgU3RhdGljUmVuZGVyRm5zLFxuXHRTVFlMRSxcblx0U3R5bGUsIHJlbW92ZSxcblx0T3B0aW9ucyxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRJZGVudGlmaWVyOiBJZGVudGlmaWVyLFxuXHRTY29wZTogU2NvcGUsXG5cdFRlbXBsYXRlOiBUZW1wbGF0ZSxcblx0UmVuZGVyOiBSZW5kZXIsXG5cdFN0YXRpY1JlbmRlckZuczogU3RhdGljUmVuZGVyRm5zLFxuXHRTVFlMRTogU1RZTEUsXG5cdFN0eWxlOiBTdHlsZSxcblx0cmVtb3ZlOiByZW1vdmUsXG5cdE9wdGlvbnM6IE9wdGlvbnNcbn0pOyJdLCJuYW1lcyI6WyJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZSxRQUFROztDQ0F2QixJQUFJLGtCQUFrQix3REFBd0Q7Q0FDOUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztDQUMvRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0NBQ3ZELENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Q0FDdkQsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Q0FDL0MsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0NBQ3ZDLENBQUMsQ0FBQztDQUNGLElBQUksZ0JBQWdCLGdDQUFnQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQzVELElBQUksYUFBYSwwQkFBMEIsR0FBRyxDQUFDO0NBQy9DLElBQUksU0FBUyxXQUFXLENBQUMsQ0FBQzs7QUFFMUIsQ0FBZSxTQUFTLFVBQVUsWUFBWTtDQUM5QztDQUNBLENBQUMsS0FBSyxhQUFhLEdBQUcsR0FBRyxHQUFHO0NBQzVCLEVBQUUsYUFBYSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUNwRCxFQUFFLE1BQU0sSUFBSSxjQUFjLFdBQVcsU0FBUyxNQUFNO0NBQ3BELEdBQUcsS0FBSyxjQUFjLEdBQUc7Q0FDekIsSUFBSSxJQUFJLFNBQVMsMEJBQTBCLGdCQUFnQixDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7Q0FDOUUsSUFBSSxLQUFLLFNBQVMsR0FBRyxHQUFHLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtDQUN0RSxTQUFTO0NBQ1QsS0FBSyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUN0RSxLQUFLLE1BQU07Q0FDWCxLQUFLO0NBQ0wsSUFBSTtDQUNKLFFBQVE7Q0FDUixJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNsQyxJQUFJLEVBQUUsU0FBUyxDQUFDO0NBQ2hCLElBQUksTUFBTTtDQUNWLElBQUk7Q0FDSixHQUFHO0NBQ0gsRUFBRTtDQUNGLE1BQU07Q0FDTixFQUFFLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUNsRixFQUFFO0NBQ0Y7Q0FDQTtDQUNBLENBQUMsSUFBSSxVQUFVLFdBQVcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3BELENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxHQUFHO0NBQ3BCLEVBQUUsU0FBUyxVQUFVO0NBQ3JCLEdBQUcsS0FBSyxNQUFNLENBQUM7Q0FDZixHQUFHLEtBQUssTUFBTSxDQUFDO0NBQ2YsR0FBRyxLQUFLLE1BQU0sQ0FBQztDQUNmLEdBQUcsS0FBSyxPQUFPLENBQUM7Q0FDaEIsR0FBRyxLQUFLLFNBQVMsQ0FBQztDQUNsQixHQUFHLEtBQUssU0FBUyxDQUFDO0NBQ2xCLEdBQUcsS0FBSyxTQUFTLENBQUM7Q0FDbEIsR0FBRyxLQUFLLFVBQVUsQ0FBQztDQUNuQixHQUFHLEtBQUssYUFBYTtDQUNyQixJQUFJLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLHNDQUFzQyxDQUFDO0NBQ3pILElBQUksVUFBVSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUMzQyxHQUFHO0NBQ0gsRUFBRTtDQUNGLENBQUMsT0FBTyxVQUFVLENBQUM7Q0FDbkI7Q0FDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQ25ERCxJQUFJLHdCQUF3QixHQUFHLHNCQUFzQixDQUFDO0NBQ3RELElBQUksY0FBYyxHQUFHLGlDQUFpQyxDQUFDO0NBQ3ZELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVTs7Q0FFbEMsU0FBd0IsUUFBUSxFQUFFLFFBQVEsWUFBWSxLQUFLLFlBQVksUUFBUSxvQkFBb0I7RUFDbEcsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVO0VBQ2xDLElBQUksWUFBWSxHQUFHLEtBQUssR0FBRyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztFQUNoRSxNQUFNLElBQUksTUFBTSxXQUFXLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO0VBQ2hJLE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ2xDO0NBRUQsU0FBUyxpQkFBaUIsRUFBRSxLQUFLLFNBQVMsTUFBTSxnQkFBZ0I7RUFDL0QsS0FBSyxNQUFNLEdBQUc7R0FDYixJQUFJLFNBQVMsV0FBVyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDNUYsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0dBQ3BIO09BQ0ksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUU7RUFDM0I7O0NBRUQsU0FBUyxnQkFBZ0IsRUFBRSxLQUFLLFNBQVMsTUFBTSxnQkFBZ0I7RUFDOUQsS0FBSyxNQUFNLEdBQUc7R0FDYixJQUFJLFNBQVMsV0FBVyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3pDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3BHO09BQ0ksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUU7RUFDM0I7O0NBRUQsU0FBUyxRQUFRLEVBQUUsS0FBSyxTQUFTLFVBQVUsbUJBQW1CO0VBQzdELElBQUksUUFBUSxhQUFhLEVBQUUsQ0FBQztFQUM1QixJQUFJLHNCQUFzQixhQUFhLEVBQUUsQ0FBQztFQUMxQyxJQUFJLGFBQWEsWUFBWSxJQUFJLENBQUM7RUFDbEMsTUFBTSxJQUFJLFNBQVMsSUFBSSxLQUFLLEdBQUc7R0FDOUIsS0FBSyxTQUFTLEdBQUc7SUFDaEIsSUFBSSxZQUFZLFdBQVcsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRSxLQUFLLFVBQVUsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO0lBQzdGLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUY7UUFDSSxFQUFFLGFBQWEsR0FBRyxLQUFLLENBQUMsRUFBRTtHQUMvQjtFQUNELHNCQUFzQixDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMzSixPQUFPLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztLQUN2QixFQUFFO0tBQ0YsRUFBRSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxzQkFBc0IsQ0FBQyxNQUFNLElBQUksYUFBYSxFQUFFO01BQzFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7TUFDWCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHOztNQUU1QixhQUFhLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO0VBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NDNUNELElBQUksQ0FBQyxRQUFRLE9BQU8sTUFBTSxHQUFHLFVBQVU7Q0FDdkMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0NBQ2QsR0FBRyxHQUFHLENBQUM7O0NBRVAsU0FBUyxDQUFDLDRCQUE0QixHQUFHLFdBQVcsS0FBSyxjQUFjO0NBQ3ZFLENBQUMsSUFBSSxLQUFLLHFCQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQy9ELENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0NBQ2pELENBQUMsS0FBSyxLQUFLLEdBQUdBLFdBQVMsR0FBRztDQUMxQixFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxXQUFXO0NBQ2hDLEVBQUU7Q0FDRixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDekIsQ0FBQyxPQUFPLElBQUksQ0FBQztDQUNiLENBQUM7O0NBRUQsSUFBSSxRQUFRLDJCQUEyQixPQUFPLENBQUMsR0FBRyxRQUFRO0NBQzFEO0NBQ0EsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFO0NBQ25CO0NBQ0EsR0FBRyxZQUFZO0NBQ2YsRUFBRSxJQUFJLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztDQUM3RSxFQUFFLE9BQU8sU0FBUyxDQUFDLEVBQUUsS0FBSyxTQUFTO0NBQ25DLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Q0FDekMsR0FBRyxDQUFDO0NBQ0osRUFBRSxFQUFFLENBQUM7O0NDbkJMLFNBQVMsTUFBTSxFQUFFLElBQUksWUFBWTtDQUNqQyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztDQUMvRCxDQUFDOztDQUVELFNBQVMsUUFBUSxFQUFFLEtBQUssZUFBZTtDQUN2QyxDQUFDLE9BQU8sU0FBUyxRQUFRLEVBQUUsT0FBTyxrQkFBa0IsRUFBRSxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0NBQzVGLENBQUM7O0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOztDQUVBLElBQUksV0FBVyxHQUFHLFNBQVMsV0FBVyxxQkFBcUIsSUFBSSxrQkFBa0I7Q0FDakYsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDaEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsTUFBTSxVQUFVLEVBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDdEYsQ0FBQyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDNUIsQ0FBQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDaEMsQ0FBQyxNQUFNLElBQUksS0FBSyxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRTtDQUN4RixDQUFDO0NBQ0Q7Q0FDQSxFQUFFOztDQUVGLElBQUksS0FBSyw4QkFBOEIsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0NBQ3pJLFdBQVcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOztDQUU5QixJQUFJLG9CQUFvQixHQUFHLFNBQVMsb0JBQW9CLHFCQUFxQixJQUFJLFlBQVksS0FBSyxxQkFBcUI7Q0FDdkgsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDaEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsTUFBTSxVQUFVLEVBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDdEYsQ0FBQyxNQUFNLElBQUksS0FBSyxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRTtDQUN4RixDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxHQUFHLGdDQUFnQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Q0FDM0UsQ0FBQyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDNUIsQ0FBQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDaEMsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0NBQ3hDLENBQUM7Q0FDRDtDQUNBLEVBQUU7Ozs7Q0N6Q0YsSUFBSSxNQUFNLEdBQUcscUNBQXFDLENBQUM7O0NBRW5ELFNBQVMsT0FBTyxFQUFFLEtBQUssMkJBQTJCLE1BQU0sbUNBQW1DO0NBQzNGLENBQUMsSUFBSSxJQUFJO0NBQ1QsRUFBRSxLQUFLO0NBQ1AsRUFBRSxNQUFNO0NBQ1IsRUFBRSxHQUFHLFNBQVM7Q0FDZCxDQUFDLEtBQUssS0FBSyxHQUFHO0NBQ2QsRUFBRSxTQUFTLE9BQU8sS0FBSztDQUN2QixHQUFHLEtBQUssUUFBUTtDQUNoQixJQUFJLEtBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUc7Q0FDaEMsS0FBSyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMxQixLQUFLO0NBQ0wsU0FBUztDQUNULEtBQUssSUFBSSxHQUFHLEVBQUUsQ0FBQztDQUNmLEtBQUssTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDL0IsS0FBSyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJO0NBQzdDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN6QixNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Q0FDakQsTUFBTTtDQUNOLEtBQUssT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0QyxLQUFLO0NBQ0wsR0FBRyxLQUFLLFFBQVE7Q0FDaEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2QsSUFBSSxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRztDQUMxQixLQUFLLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUk7Q0FDNUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUMxQyxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Q0FDekMsTUFBTTtDQUNOLEtBQUssT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0QyxLQUFLO0NBQ0wsU0FBUztDQUNULEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxHQUFHO0NBQzFCLE1BQU0sS0FBSyxFQUFFLEtBQUssNkJBQTZCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtDQUNsRixNQUFNO0NBQ04sS0FBSyxPQUFPLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2xDLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRTtDQUNGLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDOztDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7Q0FFQSxTQUFTLFlBQVksRUFBRSxLQUFLLDZCQUE2QjtDQUN6RCxDQUFDLElBQUksS0FBSyxHQUFHLFNBQVMsS0FBSyxFQUFFLEtBQUssbUNBQW1DLEVBQUUsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsaUJBQWlCO0NBQzFLLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Q0FDekIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNiLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFFLE1BQU0sVUFBVSxFQUFFLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO0NBQ3RGLENBQUMsU0FBUyxTQUFTLEVBQUUsT0FBTyxrQkFBa0IsRUFBRSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUN0RixDQUFDLFNBQVMsTUFBTSxFQUFFLEdBQUcsa0JBQWtCLEVBQUUsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRTtDQUM5RixDQUFDLE9BQU8sS0FBSyxDQUFDO0NBQ2QsQ0FBQzs7QUNoRUQsWUFBZSxpQ0FBaUM7OzhDQUFDLDdDQ1FqRCxJQUFJLEtBQUssYUFBYSxFQUFFLENBQUM7O0NBRXpCLFNBQVMsR0FBRyxFQUFFLE1BQU0sd0JBQXdCO0NBQzVDLENBQUMsSUFBSSxLQUFLLGdCQUFnQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEMsQ0FBQyxNQUFNLElBQUksTUFBTSxXQUFXLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHO0NBQzlFLEVBQUUsSUFBSSxLQUFLLFVBQVUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ25DLEVBQUUsS0FBSyxPQUFPLEtBQUssR0FBRyxVQUFVLEdBQUcsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0NBQy9ELEVBQUUsTUFBTSxJQUFJLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Q0FDcEQsRUFBRTtDQUNGLENBQUMsT0FBTyxLQUFLLENBQUM7Q0FDZCxDQUFDOztDQUVEOztDQUVBLFNBQVMsS0FBSywrQkFBK0IsSUFBSSxrQkFBa0I7Q0FDbkUsQ0FBQyxLQUFLLElBQUksR0FBR0EsV0FBUyxHQUFHO0NBQ3pCLEVBQUUsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFFO0NBQ3JFLE9BQU8sS0FBSyxJQUFJLFlBQVksV0FBVyxHQUFHLEVBQUUsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUNoRixPQUFPLEtBQUssT0FBTyxJQUFJLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLFlBQVksV0FBVyxHQUFHLEVBQUUsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLGdCQUFnQixDQUFDLENBQUMsRUFBRTtDQUMvSSxPQUFPLEVBQUUsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUM5QyxFQUFFO0NBQ0YsTUFBTTtDQUNOLEVBQUUsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsb0JBQW9CLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLEVBQUU7Q0FDN0ksT0FBTyxLQUFLLElBQUksWUFBWSxXQUFXLEdBQUcsRUFBRSxPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsb0JBQW9CLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUU7Q0FDaEosT0FBTyxLQUFLLE9BQU8sSUFBSSxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxZQUFZLFdBQVcsR0FBRyxFQUFFLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUU7Q0FDaE0sT0FBTyxFQUFFLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFO0NBQzdELEVBQUU7Q0FDRixDQUFDO0NBQ0QsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLFFBQVE7O0NDbEM5QixTQUFTLFFBQVEsRUFBRSxJQUFJLFVBQVUsS0FBSyxpQkFBaUI7Q0FDdkQsQ0FBQyxxQkFBcUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3JDLENBQUM7O0NDQ0QsSUFBSSxJQUFJLG9DQUFvQyxZQUFZO0NBQ3hELENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFO0NBQy9CLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRSxPQUFPLE1BQU0sQ0FBQyxFQUFFO0NBQ2pDLENBQUMsT0FBTyxRQUFRLENBQUM7Q0FDakIsQ0FBQyxFQUFFLENBQUM7O0NBRUosU0FBUyxJQUFJLEVBQUUsSUFBSSxrQkFBa0I7Q0FDckMsQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Q0FDdEQsQ0FBQyxJQUFJLFFBQVEsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztDQUMzRCxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUN4RCxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDL0IsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQztDQUN4RCxDQUFDOztDQUVEOztDQUVBLFNBQVMsWUFBWSxFQUFFLE1BQU0sVUFBVTtDQUN2QyxDQUFDLEVBQUUsTUFBTSwrQkFBK0IsYUFBYSxHQUFHLElBQUksQ0FBQztDQUM3RCxDQUFDLE9BQU8sTUFBTSxDQUFDO0NBQ2YsQ0FBQzs7QUFFRCxDQUFPLFNBQVMsTUFBTSxFQUFFLElBQUksbUJBQW1CLEtBQUssa0JBQWtCO0NBQ3RFLENBQUMscUJBQXFCLFlBQVk7Q0FDbEMsZ0JBQWdCLFFBQVE7Q0FDeEIsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7Q0FDNUQsR0FBRztDQUNILEVBQUUsQ0FBQztDQUNILENBQUM7O0FBRUQsQ0FBTyxTQUFTLGVBQWUsRUFBRSxLQUFLLGtDQUFrQyxLQUFLLG9CQUFvQjtDQUNqRyxDQUFDLElBQUksS0FBSyxXQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7Q0FDbEMsQ0FBQyxJQUFJLElBQUksV0FBVyxHQUFHLENBQUM7Q0FDeEIsQ0FBQyxLQUFLLEtBQUssR0FBRztDQUNkLEVBQUUsTUFBTSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJO0NBQ3hDLEdBQUcsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztDQUNsRSxHQUFHO0NBQ0gsRUFBRTtDQUNGLE1BQU07Q0FDTixFQUFFLFFBQVEsS0FBSyxHQUFHO0NBQ2xCLEdBQUcsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztDQUMxRCxHQUFHO0NBQ0gsRUFBRTtDQUNGLENBQUMsT0FBTyxRQUFRLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUNoRCxDQUFDOztDQzlDRCxTQUFTLE1BQU0sRUFBRSxhQUFhLHVDQUF1QyxPQUFPLCtEQUErRDtDQUMzSSxDQUFDLE9BQU8sYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUMvRCxDQUFDOztBQUVELGFBQWUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtDQUNwQyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLFVBQVUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7Q0FDakUsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO0NBQ3ZELENBQUMsQ0FBQyxDQUFDOztDQ0xILFNBQVMsS0FBSyxFQUFFLEdBQUcsV0FBVyxLQUFLLDRCQUE0QjtDQUMvRCxDQUFDLElBQUksS0FBSyxxQkFBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMvRCxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0NBQ2hFLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2hDLENBQUM7O0NBRUQsU0FBUyxNQUFNLEVBQUUsS0FBSyxtQ0FBbUM7Q0FDekQsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pCLENBQUMsT0FBTyxNQUFNLENBQUM7Q0FDZixDQUFDOztDQ2RjLFNBQVMsT0FBTyxFQUFFLE9BQU8sVUFBVSxFQUFFLE9BQU8sT0FBTyxDQUFDLEVBQUU7O0FDcUJyRSxlQUFlLE9BQU8sQ0FBQztDQUN2QixDQUFDLE9BQU8sRUFBRSxPQUFPO0NBQ2pCLENBQUMsVUFBVSxFQUFFLFVBQVU7Q0FDdkIsQ0FBQyxLQUFLLEVBQUUsS0FBSztDQUNiLENBQUMsUUFBUSxFQUFFLFFBQVE7Q0FDbkIsQ0FBQyxNQUFNLEVBQUUsTUFBTTtDQUNmLENBQUMsZUFBZSxFQUFFLGVBQWU7Q0FDakMsQ0FBQyxLQUFLLEVBQUUsS0FBSztDQUNiLENBQUMsS0FBSyxFQUFFLEtBQUs7Q0FDYixDQUFDLE1BQU0sRUFBRSxNQUFNO0NBQ2YsQ0FBQyxPQUFPLEVBQUUsT0FBTztDQUNqQixDQUFDLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvRnJvbnRFbmRSdW50aW1lRGVwZW5kZW5jeS8ifQ==