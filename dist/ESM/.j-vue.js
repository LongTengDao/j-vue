/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：14.3.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

import isArray from '.Array.isArray';
import create$1 from '.Object.create';
import undefined$1 from '.undefined';
import create from '.Object.create?=';
import NULL from '.null.prototype';
import Default from '.default?=';
import RegExp from '.RegExp';
import PropertyDescriptor from '.null.PropertyDescriptor';
import preventExtensions from '.Object.preventExtensions';
import defineProperty from '.Object.defineProperty';
import document from '.document';
import head from '.document.head';
import slice from '.Array.prototype.slice';
import Function from '.Function';
import Default$1 from '.default';

var version = '14.3.0';

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

var version$1 = '3.6.0';

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

var _export = Default(groupify, {
	version: version$1,
	groupify: groupify
});

/*¡ j-groupify */

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

var SCOPE              = /*#__PURE__*/ preventExtensions(create$1(null, { $: PropertyDescriptor($, false, false, false) })               );
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
	var scope              = create$1(SCOPE);
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
		else if ( this instanceof StaticScope ) { return DynamicScope(create$1(this)); }
		else if ( typeof this==='function' && this.prototype instanceof StaticScope ) { return DynamicScope(create$1(this.prototype)); }
		else { return DynamicScope(create$1(SCOPE)); }
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

var STYLE = create$1(create$1(null), {
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

var _export$1 = Default$1({
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

export default _export$1;
export { Identifier, Options, Render, STYLE, Scope, StaticRenderFns, Style, Template, remove, version };

/*¡ j-vue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy92ZXJzaW9uP3RleHQiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIi4uLy4uLy4uL2otZ3JvdXBpZnkvc3JjL2V4cG9ydC50cyIsIlNjb3BlL18udHMiLCJTY29wZS9TdGF0aWNTY29wZS50cyIsIlNjb3BlL0R5bmFtaWNTY29wZS50cyIsIlNjb3BlL0tFWVMudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZS50cyIsIlJlbmRlciwgU3RhdGljUmVuZGVyRm5zLnRzIiwiU1RZTEUudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiT3B0aW9ucy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMTQuMy4wJzsiLCJ2YXIgaW5jcmVhc2VEaWN0aW9uYXJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB7XG5cdDA6ICcxJywgMTogJzInLCAyOiAnMycsIDM6ICc0JywgNDogJzUnLCA1OiAnNicsIDY6ICc3JywgNzogJzgnLCA4OiAnOScsIDk6ICdhJyxcblx0YTogJ2InLCBiOiAnYycsIGM6ICdkJywgZDogJ2UnLCBlOiAnZicsIGY6ICdnJywgZzogJ2gnLFxuXHRoOiAnaScsIGk6ICdqJywgajogJ2snLCBrOiAnbCcsIGw6ICdtJywgbTogJ24nLCBuOiAnbycsXG5cdG86ICdwJywgcDogJ3EnLCBxOiAncicsIHI6ICdzJywgczogJ3QnLCB0OiAndScsXG5cdHU6ICd2JywgdjogJ3cnLCB3OiAneCcsIHg6ICd5JywgeTogJ3onXG59O1xudmFyIGxhdGVzdElkZW50aWZpZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFsgJzknIF07XG52YXIgbGFzdENoYXJhY3RlciAgICAgICAgICAgICAgICAgICAgICAgID0gJzknO1xudmFyIGxhc3RJbmRleCAgICAgICAgID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSAgICAgICAgIHtcblx0XG5cdGlmICggbGFzdENoYXJhY3Rlcj09PSd6JyApIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gJzAnO1xuXHRcdGZvciAoIHZhciBjaGFyYWN0ZXJJbmRleCAgICAgICAgID0gbGFzdEluZGV4OyA7ICkge1xuXHRcdFx0aWYgKCBjaGFyYWN0ZXJJbmRleCApIHtcblx0XHRcdFx0dmFyIGNoYXJhY3RlciAgICAgICAgICAgICAgICAgICAgICAgID0gbGF0ZXN0SWRlbnRpZmllclstLWNoYXJhY3RlckluZGV4XTtcblx0XHRcdFx0aWYgKCBjaGFyYWN0ZXI9PT0neicgKSB7IGxhdGVzdElkZW50aWZpZXJbY2hhcmFjdGVySW5kZXhdID0gJzAnOyB9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGxhdGVzdElkZW50aWZpZXJbY2hhcmFjdGVySW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2NoYXJhY3Rlcl07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyLnVuc2hpZnQoJ2EnKTtcblx0XHRcdFx0KytsYXN0SW5kZXg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXJdO1xuXHR9XG5cdFxuXHQvL3ZhciBpZGVudGlmaWVyIDpzdHJpbmcgPSBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHQvL2lmICggaXNSZXNlcnZlZFdvcmQoaWRlbnRpZmllcikgKSB7IGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3Rlcl07IHJldHVybiBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpOyB9XG5cdC8vcmV0dXJuIGlkZW50aWZpZXI7XG5cdFxuXHRyZXR1cm4gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJleHBvcnQgZGVmYXVsdCAnMy42LjAnOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBTVVJST0dBVEVfUEFJUi50ZXN0KGJyYW5jaCkgPyBicmFuY2guc2xpY2UoMCwgMikgOiBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZFBvaW50QnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZShjaGFyYWN0ZXIubGVuZ3RoKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZSgxKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIHNvdXJjaWZ5IChncm91cCAgICAgICAsIG5lZWRFc2NhcGUgICAgICAgICApICAgICAgICAge1xuXHR2YXIgYnJhbmNoZXMgICAgICAgICAgID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoICAgICAgICAgICA9IFtdO1xuXHR2YXIgbm9FbXB0eUJyYW5jaCAgICAgICAgICA9IHRydWU7XG5cdGZvciAoIHZhciBjaGFyYWN0ZXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyYWN0ZXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzICAgICAgICAgPSBzb3VyY2lmeShncm91cFtjaGFyYWN0ZXJdLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyYWN0ZXIpICkgeyBjaGFyYWN0ZXIgPSAnXFxcXCcrY2hhcmFjdGVyOyB9XG5cdFx0XHRzdWJfYnJhbmNoZXMgPyBicmFuY2hlcy5wdXNoKGNoYXJhY3RlcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXJhY3Rlcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IGdyb3VwaWZ5IGZyb20gJy4vZ3JvdXBpZnknO1xuXG5leHBvcnQgeyB2ZXJzaW9uLCBncm91cGlmeSB9O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoZ3JvdXBpZnksIHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0Z3JvdXBpZnk6IGdyb3VwaWZ5XG59KTsiLCJpbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbnZhciBfICAgICAgPSB0eXBlb2YgU3ltYm9sPT09J2Z1bmN0aW9uJ1xuXHQ/IFN5bWJvbCgnXycpICAgICAgIFxuXHQ6ICdfJztcblxuZnVuY3Rpb24gJCAgICAgICAgICAgICAgICAgICggICAgICAgICBjc3MgICAgICAgICAsIG1lZGlhICAgICAgICAgKSAgICB7XG5cdHZhciBzdHlsZSAgICAgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXNbX10oY3NzKTsgfVxuXHRpZiAoIG1lZGlhIT09dW5kZWZpbmVkICkge1xuXHRcdHN0eWxlLm1lZGlhID0gbWVkaWEgICAgICAgICAgO1xuXHR9XG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gdGhpcztcbn1cblxudmFyIHByZXBhcmVfICAgICAgICAgICAgICAgICAgICAgICAgID0gdHlwZW9mIF89PT0nc3ltYm9sJ1xuXHRcblx0PyBmdW5jdGlvbiAkICgpIHt9XG5cdFxuXHQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX2Rlc2NyaXB0b3IgPSBQcm9wZXJ0eURlc2NyaXB0b3IoZnVuY3Rpb24gXyAoKSB7fSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gJCAoc2NvcGUgICAgICAgKSB7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eShzY29wZSwgXywgX2Rlc2NyaXB0b3IpO1xuXHRcdH07XG5cdH0oKTtcblxuZXhwb3J0IHsgXywgJCwgcHJlcGFyZV8gfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLWdyb3VwaWZ5JztcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IFByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcubnVsbC5Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zIGZyb20gJy5PYmplY3QucHJldmVudEV4dGVuc2lvbnMnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IF8sICQsIHByZXBhcmVfIH0gZnJvbSAnLi9fJztcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzICAgICAgICAgICkge1xuXHRyZXR1cm4gbmV3IFJlZ0V4cCgnX18nK2dyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSsnX18nLCAnZycpO1xufVxuXG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUgICAgICAgICAgICAgKSB7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlciAoX19rZXlfXyAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHNjb3BlW19fa2V5X18uc2xpY2UoMiwgLTIpXTsgfTtcbn1cblxuICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgXG4gICAgIFxuXHQgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuXG52YXIgU3RhdGljU2NvcGUgPSBmdW5jdGlvbiBTdGF0aWNTY29wZSAoICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICAgKSAgICAgICB7XG5cdHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nICAgICAgICApIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxufSAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG52YXIgU0NPUEUgICAgICAgICAgICAgID0gLyojX19QVVJFX18qLyBwcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUobnVsbCwgeyAkOiBQcm9wZXJ0eURlc2NyaXB0b3IoJCwgZmFsc2UsIGZhbHNlLCBmYWxzZSkgfSkgICAgICAgICAgICAgICApO1xuU3RhdGljU2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG5cbnZhciBJbmhlcml0ZWRTdGF0aWNTY29wZSA9IGZ1bmN0aW9uIEluaGVyaXRlZFN0YXRpY1Njb3BlICggICAgICAgICAgICAgICAgICAga2V5cyAgICAgICAgICAsIHByb3RvICAgICAgICAgICAgICkgICAgICAge1xuXHRwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyAgICAgICAgKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICova2V5cy5wdXNoKGtleSk7IH1cblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0SW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG59ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IHsgU3RhdGljU2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRTdGF0aWNTY29wZSB9OyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBTdGF0aWNTY29wZSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAsIF9zY29wZSAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAge1xuXHR2YXIga2V5cyAgICAgICAgLFxuXHRcdGluZGV4ICAgICAgICAsXG5cdFx0dmFsdWVzICAgICAgICAgICxcblx0XHRrZXkgICAgICAgIDtcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBfc2NvcGUodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVtpbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IF9zY29wZShrZXkpKycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZS5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVtpbmRleF0sIF9zY29wZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICApW2tleV0gKSB7IGtleXMgKz0gJyAnK19zY29wZShrZXkpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuZnVuY3Rpb24gRHluYW1pY1Njb3BlIChjYWNoZSAgICAgICAgICAgICApICAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHNjb3BpZnkoYXJndW1lbnRzLmxlbmd0aD09PTEgPyB2YWx1ZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSwgX3Njb3BlKTsgfSAgICAgICAgICAgICAgICA7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgICAgICAgICkgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoU0VBUkNILCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gICAgICAgICkgICAgICAgICB7IHJldHVybiBfc2NvcGUoX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdGZ1bmN0aW9uIF9zY29wZSAoa2V5ICAgICAgICApICAgICAgICAgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IER5bmFtaWNTY29wZSBhcyBkZWZhdWx0IH07IiwiZXhwb3J0IGRlZmF1bHQgL1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqL2lnOyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgU3RhdGljU2NvcGUsIEluaGVyaXRlZFN0YXRpY1Njb3BlLCBTQ09QRSB9IGZyb20gJy4vU3RhdGljU2NvcGUnO1xuaW1wb3J0IER5bmFtaWNTY29wZSBmcm9tICcuL0R5bmFtaWNTY29wZSc7XG5pbXBvcnQgS0VZUyBmcm9tICcuL0tFWVMnO1xuXG52YXIgRU1QVFkgICAgICAgICAgID0gW107XG5cbmZ1bmN0aW9uIG1peCAocHJvdG9zICAgICAgICAgKSAgICAgICAgICAgICAge1xuXHR2YXIgc2NvcGUgICAgICAgICAgICAgID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvICAgICAgICA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9IHByb3RvLnByb3RvdHlwZTsgfVxuXHRcdGZvciAoIHZhciBpZCBpbiBwcm90byApIHsgc2NvcGVbaWRdID0gcHJvdG9baWRdOyB9XG5cdH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmZ1bmN0aW9uIFNjb3BlICggICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgICAgICAgICApICAgICAgICB7XG5cdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBEeW5hbWljU2NvcGUobWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIER5bmFtaWNTY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIFN0YXRpY1Njb3BlICkgeyByZXR1cm4gRHluYW1pY1Njb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSkpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBEeW5hbWljU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkU3RhdGljU2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkU3RhdGljU2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgICAgICAgICAgICkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBTdGF0aWNTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRTdGF0aWNTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBTdGF0aWNTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG59XG5TY29wZS5wcm90b3R5cGUgPSBudWxsICAgICAgIDtcblxuZXhwb3J0IHsgU2NvcGUgYXMgZGVmYXVsdCwgS0VZUyB9OyIsImltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCAgICAgICAgLCBzY29wZSAgICAgICApICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qLyBzY29wZVtfXShodG1sKTtcbn1cblxuZXhwb3J0IHsgVGVtcGxhdGUgYXMgZGVmYXVsdCB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nOyIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbnZhciBWQVJfICAgICAgICAgICAgICAgICAgICA9IC8qI19fUFVSRV9fKi8gZnVuY3Rpb24gKCkge1xuXHR0cnkgeyBGdW5jdGlvbignY29uc3Qgdj0wJyk7IH1cblx0Y2F0Y2ggKGVycm9yKSB7IHJldHVybiAndmFyICc7IH1cblx0cmV0dXJuICdjb25zdCAnO1xufSgpO1xuXG5mdW5jdGlvbiBCb2R5IChib2R5ICAgICAgICApICAgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGJvZHkuaW5kZXhPZignLCcpO1xuXHRyZXR1cm4gKCBpbmRleCA/IFZBUl8rYm9keS5zbGljZSgwLCBpbmRleCkrJz10aGlzLCcgOiBWQVJfICkrYm9keS5zbGljZSgrK2luZGV4LCBib2R5LmluZGV4T2YoJygnLCBpbmRleCkpKyc9dGhpcy5fc2VsZi5fY3x8dGhpcy4kY3JlYXRlRWxlbWVudDtyZXR1cm4gJytib2R5LnNsaWNlKGluZGV4KTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuZXhwb3J0IGZ1bmN0aW9uIFJlbmRlciAoY29kZSAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOycrQm9keShzY29wZSA/IHNjb3BlW19dKGNvZGUpIDogY29kZSkpICAgICAgICAgIDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgICAgICAgICAgLCBzY29wZSAgICAgICAgKSAgICAgICAgICAge1xuXHR2YXIgaW5kZXggPSBjb2Rlcy5sZW5ndGg7XG5cdGlmICggc2NvcGUgKSB7IGZvciAoIHZhciBzY29wZV8gPSBzY29wZVtfXTsgaW5kZXgtLTsgKSB7IGNvZGVzW2luZGV4XSA9IEJvZHkoc2NvcGVfKGNvZGVzW2luZGV4XSkpOyB9IH1cblx0ZWxzZSB7IHdoaWxlICggaW5kZXgtLSApIHsgY29kZXNbaW5kZXhdID0gQm9keShjb2Rlc1tpbmRleF0pOyB9IH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bZnVuY3Rpb24oKXsnK2NvZGVzLmpvaW4oJ30sZnVuY3Rpb24oKXsnKSsnfV0nKSgpO1xufVxuIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5cbmZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbnRleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdHJldHVybiBjcmVhdGVFbGVtZW50KCdzdHlsZScsIGNvbnRleHQuZGF0YSwgY29udGV4dC5jaGlsZHJlbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZShjcmVhdGUobnVsbCksIHtcblx0ZnVuY3Rpb25hbDogUHJvcGVydHlEZXNjcmlwdG9yKHRydWUgICAgICAgICwgZmFsc2UsIHRydWUsIGZhbHNlKSxcblx0cmVuZGVyOiBQcm9wZXJ0eURlc2NyaXB0b3IocmVuZGVyLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpXG59KTtcbiIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gU3R5bGUgKGNzcyAgICAgICAgICwgc2NvcGUgICAgICAgICkgICAgICAgICAgICAgICAgICAge1xuXHR2YXIgc3R5bGUgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlW19dKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUgKHN0eWxlICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG5leHBvcnQgeyBTdHlsZSwgcmVtb3ZlIH07XG5cbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gT3B0aW9ucyAob3B0aW9ucyAgICAgICAgKSB7IHJldHVybiBvcHRpb25zOyB9OyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCB7IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU1RZTEUgIGZyb20gJy4vU1RZTEUnO1xuaW1wb3J0IHsgU3R5bGUsIHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL09wdGlvbnMnO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRJZGVudGlmaWVyLFxuXHRTY29wZSxcblx0VGVtcGxhdGUsXG5cdFJlbmRlciwgU3RhdGljUmVuZGVyRm5zLFxuXHRTVFlMRSxcblx0U3R5bGUsIHJlbW92ZSxcblx0T3B0aW9ucyxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRJZGVudGlmaWVyOiBJZGVudGlmaWVyLFxuXHRTY29wZTogU2NvcGUsXG5cdFRlbXBsYXRlOiBUZW1wbGF0ZSxcblx0UmVuZGVyOiBSZW5kZXIsXG5cdFN0YXRpY1JlbmRlckZuczogU3RhdGljUmVuZGVyRm5zLFxuXHRTVFlMRTogU1RZTEUsXG5cdFN0eWxlOiBTdHlsZSxcblx0cmVtb3ZlOiByZW1vdmUsXG5cdE9wdGlvbnM6IE9wdGlvbnNcbn0pOyJdLCJuYW1lcyI6WyJ2ZXJzaW9uIiwidW5kZWZpbmVkIiwiY3JlYXRlIiwiRGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBZSxRQUFROztBQ0F2QixJQUFJLGtCQUFrQix3REFBd0Q7Q0FDN0UsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Q0FDOUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Q0FDdEQsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFD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O0NBQy9COztBQUVELFNBQVMsTUFBTSxFQUFFLEtBQUssbUNBQW1DO0NBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEIsT0FBTyxNQUFNLENBQUM7Q0FDZDs7QUNkYyxTQUFTLE9BQU8sRUFBRSxPQUFPLFVBQVUsRUFBRSxPQUFPLE9BQU8sQ0FBQyxFQUFFOztBQ3FCckUsZ0JBQWVDLFNBQU8sQ0FBQztDQUN0QixPQUFPLEVBQUUsT0FBTztDQUNoQixVQUFVLEVBQUUsVUFBVTtDQUN0QixLQUFLLEVBQUUsS0FBSztDQUNaLFFBQVEsRUFBRSxRQUFRO0NBQ2xCLE1BQU0sRUFBRSxNQUFNO0NBQ2QsZUFBZSxFQUFFLGVBQWU7Q0FDaEMsS0FBSyxFQUFFLEtBQUs7Q0FDWixLQUFLLEVBQUUsS0FBSztDQUNaLE1BQU0sRUFBRSxNQUFNO0NBQ2QsT0FBTyxFQUFFLE9BQU87Q0FDaEIsQ0FBQzs7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvRnJvbnRFbmRSdW50aW1lRGVwZW5kZW5jeS8ifQ==