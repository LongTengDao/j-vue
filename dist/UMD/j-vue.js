/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：9.0.8
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

    var version = '9.0.8';

    var increaseDictionary = {
        0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'a',
        a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
        h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
        o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
        u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
    };
    var latestIdentifier = ['9'];
    var lastCharacter = '9';
    var lastIndex = 0;
    function Identifier() {
        if (lastCharacter === 'z') {
            lastCharacter = latestIdentifier[lastIndex] = '0';
            for (var characterIndex = lastIndex;;) {
                if (characterIndex) {
                    var character = latestIdentifier[--characterIndex];
                    if (character === 'z') {
                        latestIdentifier[characterIndex] = '0';
                    }
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

    var create$1 = Object.create || (
    	/*! j-globals: Object.create (polyfill) */
    	/*#__PURE__*/ function () {
    		var NULL;
    		if ( document.domain ) {
    			try { dom = new ActiveXObject('htmlfile'); }
    			catch (error) { }
    		}
    		if ( dom ) {
    			dom.write('<script><\/script>');
    			dom.close();
    			NULL = dom.parentWindow.Object.prototype;
    		}
    		else {
    			dom = document.createElement('iframe');
    			dom.style.display = 'none';
    			var parent = document.body || document.documentElement;
    			parent.appendChild(dom);
    			dom.src = 'javascript:';
    			NULL = dom.contentWindow.Object.prototype;
    			parent.removeChild(dom);
    		}
    		var dom = null;
    		delete NULL.constructor;
    		delete NULL.hasOwnProperty;
    		delete NULL.isPrototypeOf;
    		delete NULL.propertyIsEnumerable;
    		delete NULL.toLocaleString;
    		delete NULL.toString;
    		delete NULL.valueOf;
    		var Null = function () {};
    		Null.prototype = NULL;
    		var constructor = function () {};
    		function __PURE__ (o, properties) {
    			if ( properties!==undefined$1 ) { throw TypeError('CAN NOT defineProperties in ES 3 Object.create polyfill'); }
    			if ( o===null ) { return new Null; }
    			if ( typeof o!=='object' && typeof o!=='function' ) { throw TypeError('Object prototype may only be an Object or null: '+o); }
    			constructor.prototype = o;
    			var created = new constructor;
    			constructor.prototype = NULL;
    			return created;
    		}
    		return function create (o, properties) {
    			return /*#__PURE__*/ __PURE__(o, properties);
    		};
    	}()
    	/*¡ j-globals: Object.create (polyfill) */
    );

    var assign = Object.assign;

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

    var defineProperty = Object.defineProperty;

    var freeze = Object.freeze;

    var Default = (
    	/*! j-globals: default (internal) */
    	function Default (exports, addOnOrigin) {
    		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
    			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(null); }
    			if ( assign ) { assign(exports, addOnOrigin); }
    			else { for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
    			exports['default'] = exports;
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
     * 模块版本：3.4.2
     * 许可条款：LGPL-3.0
     * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
     * 问题反馈：https://GitHub.com/LongTengDao/j-groupify/issues
     * 项目主页：https://GitHub.com/LongTengDao/j-groupify/
     */

    var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
    var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    var GROUP = create$1(null);
    function groupify(branches, uFlag, noEscape) {
        var group = create$1(null);
        var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
        for (var length = branches.length, index = 0; index < length; ++index) {
            appendBranch(group, branches[index]);
        }
        return sourcify(group, !noEscape);
    }
    function appendPointBranch(group, branch) {
        if (branch) {
            var char = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
            appendPointBranch(group[char] || (group[char] = create$1(null)), branch.slice(char.length));
        }
        else {
            group[''] = GROUP;
        }
    }
    function appendCodeBranch(group, branch) {
        if (branch) {
            var char = branch.charAt(0);
            appendCodeBranch(group[char] || (group[char] = create$1(null)), branch.slice(1));
        }
        else {
            group[''] = GROUP;
        }
    }
    function sourcify(group, needEscape) {
        var branches = [];
        var singleCharactersBranch = [];
        var noEmptyBranch = true;
        for (var char in group) {
            if (char) {
                var sub_branches = sourcify(group[char], needEscape);
                if (needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(char)) {
                    char = '\\' + char;
                }
                sub_branches ? branches.push(char + sub_branches) : singleCharactersBranch.push(char);
            }
            else {
                noEmptyBranch = false;
            }
        }
        singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length === 1 ? singleCharactersBranch[0] : '[' + singleCharactersBranch.join('') + ']');
        return branches.length === 0
            ? ''
            : (branches.length === 1 && (singleCharactersBranch.length || noEmptyBranch)
                ? branches[0]
                : '(?:' + branches.join('|') + ')')
                + (noEmptyBranch ? '' : '?');
    }

    /*¡ j-groupify */

    var PropertyDescriptor = (
    	/*! j-globals: null.PropertyDescriptor (internal) */
    	/*#__PURE__*/ function () {
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

    var _ = typeof Symbol === 'function'
        ? Symbol('_')
        : '_';
    function $(css, media) {
        var style = document.createElement('style');
        if (css) {
            style.textContent = this[_](css);
        }
        if (media !== undefined$1) {
            style.media = media;
        }
        head.appendChild(style);
        return this;
    }
    var prepare_ = typeof _ === 'symbol'
        ? function $() { }
        : /*#__PURE__*/ function () {
            var _descriptor = PropertyDescriptor(function _() { }, true, false, false);
            return function $(scope) {
                defineProperty(scope, _, _descriptor);
            };
        }();

    function Search(keys) {
        return new RegExp('__' + groupify(keys, false, true) + '__', 'g');
    }
    function Replacer(scope) {
        return function replacer(__key__) { return scope[__key__.slice(2, -2)]; };
    }
    var ObjectScope = function ObjectScope(keys) {
        prepare_(this);
        this[_] = function _(string) { return string.replace(_search, _replacer); };
        var _search = Search(keys);
        var _replacer = Replacer(this);
        for (var index = keys.length; index;) {
            this[keys[--index]] = Identifier();
        }
    };
    var SCOPE = ObjectScope.prototype = /*#__PURE__*/ preventExtensions(create(null, { $: PropertyDescriptor($, false, false, false) }));
    var InheritedObjectScope = function InheritedObjectScope(keys, proto) {
        prepare_(this);
        this[_] = function _(string) { return string.replace(_search, _replacer); };
        for (var index = keys.length; index;) {
            this[keys[--index]] = Identifier();
        }
        for (var key in proto) { /*key==='_' || key==='$' || */
            keys.push(key);
        }
        var _search = Search(keys);
        var _replacer = Replacer(this);
        InheritedObjectScope.prototype = SCOPE;
    };

    var slice = Array.prototype.slice;

    var SEARCH = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;
    function scopify(value, _scope) {
        var keys, index, values, key;
        if (value) {
            switch (typeof value) {
                case 'string':
                    if (value.indexOf(' ') < 0) {
                        return _scope(value);
                    }
                    else {
                        keys = '';
                        values = value.split(' ');
                        for (index = values.length; index--;) {
                            key = value[index];
                            if (key) {
                                keys = _scope(key) + ' ' + keys;
                            }
                        }
                        return keys && keys.slice(0, -1);
                    }
                case 'object':
                    keys = '';
                    if (isArray(value)) {
                        for (index = value.length; index--;) {
                            key = scopify(value[index], _scope);
                            if (key) {
                                keys = key + ' ' + keys;
                            }
                        }
                        return keys && keys.slice(0, -1);
                    }
                    else {
                        for (key in value) {
                            if (value[key]) {
                                keys += ' ' + _scope(key);
                            }
                        }
                        return keys && keys.slice(1);
                    }
            }
        }
        return '';
    }
    function FunctionScope(cache) {
        var scope = function scope(value) { return scopify(arguments.length === 1 ? value : slice.call(arguments, 0), _scope); };
        scope.prototype = cache;
        scope.$ = $;
        scope[_] = function _(string) { return string.replace(SEARCH, _replacer); };
        function _replacer(__key__) { return _scope(__key__.slice(2, -2)); }
        function _scope(key) { return cache[key] || (cache[key] = Identifier()); }
        return scope;
    }

    var KEYS = /[a-z][a-z0-9]*(?:_[a-z0-9]+)*/ig;
    var EMPTY = [];
    function mix(protos) {
        var scope = create(SCOPE);
        for (var length = protos.length, index = 0; index < length; ++index) {
            var proto = protos[index];
            if (typeof proto === 'function') {
                proto = proto.prototype;
            }
            for (var id in proto) {
                scope[id] = proto[id];
            }
        }
        return scope;
    }
    function Scope(keys) {
        if (keys === undefined$1) {
            if (isArray(this)) {
                return FunctionScope(mix(this));
            }
            else if (this instanceof ObjectScope) {
                return FunctionScope(create(this));
            }
            else if (typeof this === 'function' && this.prototype instanceof ObjectScope) {
                return FunctionScope(create(this.prototype));
            }
            else {
                return FunctionScope(create(SCOPE));
            }
        }
        else {
            if (isArray(this)) {
                return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = mix(this));
            }
            else if (this instanceof ObjectScope) {
                return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = this);
            }
            else if (typeof this === 'function' && this.prototype instanceof ObjectScope) {
                return new InheritedObjectScope(keys.match(KEYS) || EMPTY, InheritedObjectScope.prototype = this.prototype);
            }
            else {
                return new ObjectScope(keys.match(KEYS) || EMPTY);
            }
        }
    }

    function Template(html, scope) {
        return /*#__PURE__*/ scope[_](html);
    }

    function Body(body) {
        var index = body.indexOf(',');
        return 'var ' + body.slice(0, index) + '=this' + body.slice(index, body.indexOf('(', index)) + '=this._self._c||this.$createElement;return ' + body.slice(index + 1);
    }
    function Render(code, scope) {
        return /*#__PURE__*/ Function('"use strict";' + Body(scope ? scope[_](code) : code));
    }
    function StaticRenderFns(codes, scope) {
        var index = codes.length;
        if (scope) {
            for (var scope_ = scope[_]; index--;) {
                codes[index] = Body(scope_(codes[index]));
            }
        }
        else {
            while (index--) {
                codes[index] = Body(codes[index]);
            }
        }
        return Function('"use strict";return[function(){' + codes.join('},function(){') + '}]')();
    }

    function render(createElement, context) {
        return createElement('style', context.data, context.children);
    }
    var STYLE = create(null, {
        render: PropertyDescriptor(render, false, true, false),
        functional: PropertyDescriptor(true, false, true, false)
    });

    function Style(css, scope) {
        var style = document.createElement('style');
        if (css) {
            style.textContent = scope ? scope[_](css) : css;
        }
        return head.appendChild(style);
    }
    function remove(style) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIlNjb3BlL18udHMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZS50cyIsIlJlbmRlciwgU3RhdGljUmVuZGVyRm5zLnRzIiwiU1RZTEUudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICc5LjAuOCc7IiwidmFyIGluY3JlYXNlRGljdGlvbmFyeSA6eyBbY2hhcmFjdGVyIGluICcwJyB8IENoYXJhY3Rlcl0gOkNoYXJhY3RlciB8ICd6JyB9ID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBsYXRlc3RJZGVudGlmaWVyIDooICcwJyB8IENoYXJhY3RlciB8ICd6JyApW10gPSBbICc5JyBdO1xudmFyIGxhc3RDaGFyYWN0ZXIgOicwJyB8IENoYXJhY3RlciB8ICd6JyA9ICc5JztcbnZhciBsYXN0SW5kZXggOm51bWJlciA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIElkZW50aWZpZXIgKCkgOnN0cmluZyB7XG5cdFxuXHRpZiAoIGxhc3RDaGFyYWN0ZXI9PT0neicgKSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggOm51bWJlciA9IGxhc3RJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdHZhciBjaGFyYWN0ZXIgOicwJyB8IENoYXJhY3RlciB8ICd6JyA9IGxhdGVzdElkZW50aWZpZXJbLS1jaGFyYWN0ZXJJbmRleF07XG5cdFx0XHRcdGlmICggY2hhcmFjdGVyPT09J3onICkgeyBsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtjaGFyYWN0ZXJdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0KCdhJyk7XG5cdFx0XHRcdCsrbGFzdEluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0Ly92YXIgaWRlbnRpZmllciA6c3RyaW5nID0gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0Ly9pZiAoIGlzUmVzZXJ2ZWRXb3JkKGlkZW50aWZpZXIpICkgeyBsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXJdOyByZXR1cm4gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTsgfVxuXHQvL3JldHVybiBpZGVudGlmaWVyO1xuXHRcblx0cmV0dXJuIGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdFxufTtcblxudHlwZSBDaGFyYWN0ZXIgPSAnMScgfCAnMicgfCAnMycgfCAnNCcgfCAnNScgfCAnNicgfCAnNycgfCAnOCcgfCAnOScgfCAnYScgfCAnYicgfCAnYycgfCAnZCcgfCAnZScgfCAnZicgfCAnZycgfCAnaCcgfCAnaScgfCAnaicgfCAnaycgfCAnbCcgfCAnbScgfCAnbicgfCAnbycgfCAncCcgfCAncScgfCAncicgfCAncycgfCAndCcgfCAndScgfCAndicgfCAndycgfCAneCcgfCAneSc7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCA6R3JvdXAgPSBjcmVhdGUobnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyA6c3RyaW5nW10sIHVGbGFnPyA6Ym9vbGVhbiwgbm9Fc2NhcGU/IDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGdyb3VwIDpHcm91cCA9IGNyZWF0ZShudWxsKTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgOkdyb3VwLCBicmFuY2ggOnN0cmluZykgOnZvaWQge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyXSB8fCAoIGdyb3VwW2NoYXJdID0gY3JlYXRlKG51bGwpICksIGJyYW5jaC5zbGljZShjaGFyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCA6R3JvdXAsIGJyYW5jaCA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyIDpzdHJpbmcgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgOkdyb3VwLCBuZWVkRXNjYXBlIDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGJyYW5jaGVzIDpzdHJpbmdbXSA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCA6c3RyaW5nW10gPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggOmJvb2xlYW4gPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzIDpzdHJpbmcgPSBzb3VyY2lmeShncm91cFtjaGFyXSwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcikgKSB7IGNoYXIgPSAnXFxcXCcrY2hhcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG50eXBlIEdyb3VwID0geyBbY2hhciA6c3RyaW5nXSA6R3JvdXAgfTtcbiIsImltcG9ydCBQcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLm51bGwuUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gOidfJyA9IHR5cGVvZiBTeW1ib2w9PT0nZnVuY3Rpb24nXG5cdD8gU3ltYm9sKCdfJykgYXMgYW55XG5cdDogJ18nO1xuXG5mdW5jdGlvbiAkPFQgZXh0ZW5kcyBTY29wZT4gKHRoaXMgOlQsIGNzcz8gOnN0cmluZywgbWVkaWE/IDpzdHJpbmcpIDpUIHtcblx0dmFyIHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gdGhpc1tfXShjc3MpOyB9XG5cdGlmICggbWVkaWEhPT11bmRlZmluZWQgKSB7XG5cdFx0c3R5bGUubWVkaWEgPSBtZWRpYSBhcyBzdHJpbmc7XG5cdH1cblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdHJldHVybiB0aGlzO1xufVxuXG52YXIgcHJlcGFyZV8gOihzY29wZSA6U2NvcGUpID0+IHZvaWQgPSB0eXBlb2YgXz09PSdzeW1ib2wnXG5cdFxuXHQ/IGZ1bmN0aW9uICQgKCkge31cblx0XG5cdDogLyojX19QVVJFX18qLyBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF9kZXNjcmlwdG9yID0gUHJvcGVydHlEZXNjcmlwdG9yKGZ1bmN0aW9uIF8gKCkge30sIHRydWUsIGZhbHNlLCBmYWxzZSk7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICQgKHNjb3BlIDpTY29wZSkge1xuXHRcdFx0ZGVmaW5lUHJvcGVydHkoc2NvcGUsIF8sIF9kZXNjcmlwdG9yKTtcblx0XHR9O1xuXHR9KCk7XG5cbmV4cG9ydCB7IF8sICQsIHByZXBhcmVfIH07XG5cbmltcG9ydCBTY29wZSBmcm9tICcuLyc7IiwiaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otZ3JvdXBpZnknO1xuXG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgXywgJCwgcHJlcGFyZV8gfSBmcm9tICcuL18nO1xuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgOnN0cmluZ1tdKSB7XG5cdHJldHVybiBuZXcgUmVnRXhwKCdfXycrZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpKydfXycsICdnJyk7XG59XG5cbmZ1bmN0aW9uIFJlcGxhY2VyIChzY29wZSA6T2JqZWN0U2NvcGUpIHtcblx0cmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2VyIChfX2tleV9fIDpzdHJpbmcpIDpzdHJpbmcgeyByZXR1cm4gc2NvcGVbX19rZXlfXy5zbGljZSgyLCAtMildOyB9O1xufVxuXG50eXBlIE9iamVjdFNjb3BlID0ge1xuXHRba2V5IDpzdHJpbmddIDpzdHJpbmdcbn0gJiB7XG5cdCQgOnR5cGVvZiAkXG5cdFtfXSA6KHN0cmluZyA6c3RyaW5nKSA9PiBzdHJpbmdcbn07XG5cbnZhciBPYmplY3RTY29wZSA9IGZ1bmN0aW9uIE9iamVjdFNjb3BlICh0aGlzIDpPYmplY3RTY29wZSwga2V5cyA6c3RyaW5nW10pIDp2b2lkIHtcblx0cHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG59IGFzIHVua25vd24gYXMge1xuXHRuZXcgKGtleXMgOnN0cmluZ1tdKSA6T2JqZWN0U2NvcGVcbn07XG5cbnZhciBTQ09QRSA6T2JqZWN0U2NvcGUgPVxuXHRPYmplY3RTY29wZS5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovcHJldmVudEV4dGVuc2lvbnMoY3JlYXRlKG51bGwsIHsgJDogUHJvcGVydHlEZXNjcmlwdG9yKCQsIGZhbHNlLCBmYWxzZSwgZmFsc2UpIH0pKTtcblxudmFyIEluaGVyaXRlZE9iamVjdFNjb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkT2JqZWN0U2NvcGUgKHRoaXMgOk9iamVjdFNjb3BlLCBrZXlzIDpzdHJpbmdbXSwgcHJvdG8gOk9iamVjdFNjb3BlKSA6dm9pZCB7XG5cdHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyAvKmtleT09PSdfJyB8fCBrZXk9PT0nJCcgfHwgKi9rZXlzLnB1c2goa2V5KTsgfVxuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcbn0gYXMgdW5rbm93biBhcyB7XG5cdG5ldyAoa2V5cyA6c3RyaW5nW10sIHByb3RvIDpPYmplY3RTY29wZSkgOk9iamVjdFNjb3BlXG59O1xuXG5leHBvcnQgeyBPYmplY3RTY29wZSwgU0NPUEUsIEluaGVyaXRlZE9iamVjdFNjb3BlIH07IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IHNsaWNlIGZyb20gJy5BcnJheS5wcm90b3R5cGUuc2xpY2UnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IE9iamVjdFNjb3BlIH0gZnJvbSAnLi9PYmplY3RTY29wZSc7XG5pbXBvcnQgeyBfLCAkIH0gZnJvbSAnLi9fJztcblxudmFyIFNFQVJDSCA9IC9fX1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqX18vaWc7XG5cbmZ1bmN0aW9uIHNjb3BpZnkgKHZhbHVlIDpzdHJpbmcgfCBvYmplY3QgfCBhbnlbXSwgX3Njb3BlIDooa2V5IDpzdHJpbmcpID0+IHN0cmluZykgOnN0cmluZyB7XG5cdHZhciBrZXlzIDpzdHJpbmcsXG5cdFx0aW5kZXggOm51bWJlcixcblx0XHR2YWx1ZXMgOnN0cmluZ1tdLFxuXHRcdGtleSA6c3RyaW5nO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF9zY29wZSh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZXMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlW2luZGV4XTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0gX3Njb3BlKGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlW2luZGV4XSwgX3Njb3BlKTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0ga2V5KycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGZvciAoIGtleSBpbiB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdGlmICggKCB2YWx1ZSBhcyB7IFtrZXkgOnN0cmluZ10gOmFueSB9IClba2V5XSApIHsga2V5cyArPSAnICcrX3Njb3BlKGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59XG5cbnR5cGUgRnVuY3Rpb25TY29wZSA9IHtcblx0KC4uLmFyZ3MgOmFueVtdKSA6c3RyaW5nXG5cdHByb3RvdHlwZSA6T2JqZWN0U2NvcGVcblx0JCA6dHlwZW9mICRcblx0W19dIDooc3RyaW5nIDpzdHJpbmcpID0+IHN0cmluZ1xufTtcblxuZnVuY3Rpb24gRnVuY3Rpb25TY29wZSAoY2FjaGUgOk9iamVjdFNjb3BlKSA6RnVuY3Rpb25TY29wZSB7XG5cdHZhciBzY29wZSA9IGZ1bmN0aW9uIHNjb3BlICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10pIDpzdHJpbmcgeyByZXR1cm4gc2NvcGlmeShhcmd1bWVudHMubGVuZ3RoPT09MSA/IHZhbHVlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDApLCBfc2NvcGUpOyB9IGFzIEZ1bmN0aW9uU2NvcGU7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoU0VBUkNILCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBfc2NvcGUoX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdGZ1bmN0aW9uIF9zY29wZSAoa2V5IDpzdHJpbmcpIDpzdHJpbmcgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmV4cG9ydCB7IEZ1bmN0aW9uU2NvcGUgYXMgZGVmYXVsdCB9OyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgT2JqZWN0U2NvcGUsIEluaGVyaXRlZE9iamVjdFNjb3BlLCBTQ09QRSB9IGZyb20gJy4vT2JqZWN0U2NvcGUnO1xuaW1wb3J0IEZ1bmN0aW9uU2NvcGUgZnJvbSAnLi9GdW5jdGlvblNjb3BlJztcblxudmFyIEtFWVMgPSAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7XG52YXIgRU1QVFkgOnN0cmluZ1tdID0gW107XG5cbmZ1bmN0aW9uIG1peCAocHJvdG9zIDpTY29wZVtdKSA6T2JqZWN0U2NvcGUge1xuXHR2YXIgc2NvcGUgOk9iamVjdFNjb3BlID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvIDpTY29wZSA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9IHByb3RvLnByb3RvdHlwZTsgfVxuXHRcdGZvciAoIHZhciBpZCBpbiBwcm90byApIHsgc2NvcGVbaWRdID0gcHJvdG9baWRdOyB9XG5cdH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG50eXBlIFNjb3BlID0gT2JqZWN0U2NvcGUgfCBGdW5jdGlvblNjb3BlO1xuXG5mdW5jdGlvbiBTY29wZSAodGhpcyA6U2NvcGVbXSB8IFNjb3BlIHwgYW55LCBrZXlzPyA6c3RyaW5nKSA6U2NvcGUge1xuXHRpZiAoIGtleXM9PT11bmRlZmluZWQgKSB7XG5cdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShtaXgodGhpcyBhcyBTY29wZVtdKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUodGhpcy5wcm90b3R5cGUpKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcyBhcyBTY29wZVtdKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IHRoaXMpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gbmV3IE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cbn1cblxuZXhwb3J0IHsgU2NvcGUgYXMgZGVmYXVsdCwgS0VZUyB9OyIsImltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCA6c3RyaW5nLCBzY29wZSA6U2NvcGUpIDpzdHJpbmcge1xuXHRyZXR1cm4gLyojX19QVVJFX18qLyBzY29wZVtfXShodG1sKTtcbn1cblxuZXhwb3J0IHsgVGVtcGxhdGUgYXMgZGVmYXVsdCB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nOyIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5cbmZ1bmN0aW9uIEJvZHkgKGJvZHkgOnN0cmluZykgOnN0cmluZyB7XG5cdHZhciBpbmRleCA9IGJvZHkuaW5kZXhPZignLCcpO1xuXHRyZXR1cm4gJ3ZhciAnK2JvZHkuc2xpY2UoMCwgaW5kZXgpKyc9dGhpcycrYm9keS5zbGljZShpbmRleCwgYm9keS5pbmRleE9mKCcoJywgaW5kZXgpKSsnPXRoaXMuX3NlbGYuX2N8fHRoaXMuJGNyZWF0ZUVsZW1lbnQ7cmV0dXJuICcrYm9keS5zbGljZShpbmRleCsxKTtcbn1cblxudHlwZSBSZW5kZXIgPSA8Q3JlYXRlRWxlbWVudCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAoY3JlYXRlRWxlbWVudCA6Q3JlYXRlRWxlbWVudCkgPT4gUmV0dXJuVHlwZTxDcmVhdGVFbGVtZW50PjtcblxuZnVuY3Rpb24gUmVuZGVyIChjb2RlIDpzdHJpbmcsIHNjb3BlPyA6U2NvcGUpIDpSZW5kZXIge1xuXHRyZXR1cm4gLyojX19QVVJFX18qLyBGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7JytCb2R5KHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlKSkgYXMgUmVuZGVyO1xufVxuXG5mdW5jdGlvbiBTdGF0aWNSZW5kZXJGbnMgKGNvZGVzIDpzdHJpbmdbXSwgc2NvcGU/IDpTY29wZSkgOlJlbmRlcltdIHtcblx0dmFyIGluZGV4ID0gY29kZXMubGVuZ3RoO1xuXHRpZiAoIHNjb3BlICkgeyBmb3IgKCB2YXIgc2NvcGVfID0gc2NvcGVbX107IGluZGV4LS07ICkgeyBjb2Rlc1tpbmRleF0gPSBCb2R5KHNjb3BlXyhjb2Rlc1tpbmRleF0pKTsgfSB9XG5cdGVsc2UgeyB3aGlsZSAoIGluZGV4LS0gKSB7IGNvZGVzW2luZGV4XSA9IEJvZHkoY29kZXNbaW5kZXhdKTsgfSB9XG5cdHJldHVybiBGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7cmV0dXJuW2Z1bmN0aW9uKCl7Jytjb2Rlcy5qb2luKCd9LGZ1bmN0aW9uKCl7JykrJ31dJykoKTtcbn1cblxuZXhwb3J0IHsgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMgfTsiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBQcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLm51bGwuUHJvcGVydHlEZXNjcmlwdG9yJztcblxuZnVuY3Rpb24gcmVuZGVyIChjcmVhdGVFbGVtZW50IDooLi4uYXJncyA6YW55W10pID0+IGFueSwgY29udGV4dCA6eyBkYXRhIDphbnksIGNoaWxkcmVuIDphbnkgfSkge1xuXHRyZXR1cm4gY3JlYXRlRWxlbWVudCgnc3R5bGUnLCBjb250ZXh0LmRhdGEsIGNvbnRleHQuY2hpbGRyZW4pO1xufVxuXG52YXIgU1RZTEUgOnsgcmVuZGVyIDpSZW5kZXIsIGZ1bmN0aW9uYWwgOnRydWUgfSA9IGNyZWF0ZShudWxsLCB7XG5cdHJlbmRlcjogUHJvcGVydHlEZXNjcmlwdG9yKHJlbmRlciwgZmFsc2UsIHRydWUsIGZhbHNlKSxcblx0ZnVuY3Rpb25hbDogUHJvcGVydHlEZXNjcmlwdG9yKHRydWUsIGZhbHNlLCB0cnVlLCBmYWxzZSlcbn0pO1xuXG5leHBvcnQgeyBTVFlMRSBhcyBkZWZhdWx0IH07XG5cbmltcG9ydCB7IFJlbmRlciB9IGZyb20gJy4vUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnOyIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gU3R5bGUgKGNzcz8gOnN0cmluZywgc2NvcGU/IDpTY29wZSkgOkhUTUxTdHlsZUVsZW1lbnQge1xuXHR2YXIgc3R5bGUgOkhUTUxTdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlW19dKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUgKHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50KSA6dHlwZW9mIHJlbW92ZSB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuXG5leHBvcnQgeyBTdHlsZSwgcmVtb3ZlIH07XG5cbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7IiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4vSWRlbnRpZmllcic7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vVGVtcGxhdGUnO1xuaW1wb3J0IHsgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmltcG9ydCBTVFlMRSAgZnJvbSAnLi9TVFlMRSc7XG5pbXBvcnQgeyBTdHlsZSwgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0SWRlbnRpZmllcixcblx0U2NvcGUsXG5cdFRlbXBsYXRlLFxuXHRSZW5kZXIsIFN0YXRpY1JlbmRlckZucyxcblx0U1RZTEUsXG5cdFN0eWxlLCByZW1vdmUsXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0SWRlbnRpZmllcjogSWRlbnRpZmllcixcblx0U2NvcGU6IFNjb3BlLFxuXHRUZW1wbGF0ZTogVGVtcGxhdGUsXG5cdFJlbmRlcjogUmVuZGVyLFxuXHRTdGF0aWNSZW5kZXJGbnM6IFN0YXRpY1JlbmRlckZucyxcblx0U1RZTEU6IFNUWUxFLFxuXHRTdHlsZTogU3R5bGUsXG5cdHJlbW92ZTogcmVtb3ZlXG59KTsiXSwibmFtZXMiOlsiY3JlYXRlIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtCQUFlLE9BQU87O0lDQXRCLElBQUksa0JBQWtCLEdBQXdEO1FBQzdFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO1FBQzlFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxF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