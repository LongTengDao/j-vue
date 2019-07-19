/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：9.2.0
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

    var version = '9.2.0';

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
     * 模块版本：3.4.2
     * 许可条款：LGPL-3.0
     * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
     * 问题反馈：https://GitHub.com/LongTengDao/j-groupify/issues
     * 项目主页：https://GitHub.com/LongTengDao/j-groupify/
     */

    var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
    var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    var GROUP = create(null);
    function groupify(branches, uFlag, noEscape) {
        var group = create(null);
        var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
        for (var length = branches.length, index = 0; index < length; ++index) {
            appendBranch(group, branches[index]);
        }
        return sourcify(group, !noEscape);
    }
    function appendPointBranch(group, branch) {
        if (branch) {
            var char = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
            appendPointBranch(group[char] || (group[char] = create(null)), branch.slice(char.length));
        }
        else {
            group[''] = GROUP;
        }
    }
    function appendCodeBranch(group, branch) {
        if (branch) {
            var char = branch.charAt(0);
            appendCodeBranch(group[char] || (group[char] = create(null)), branch.slice(1));
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
        : function () {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIlNjb3BlL18udHMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZS50cyIsIlJlbmRlciwgU3RhdGljUmVuZGVyRm5zLnRzIiwiU1RZTEUudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICc5LjIuMCc7IiwidmFyIGluY3JlYXNlRGljdGlvbmFyeSA6eyBbY2hhcmFjdGVyIGluICcwJyB8IENoYXJhY3Rlcl0gOkNoYXJhY3RlciB8ICd6JyB9ID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBsYXRlc3RJZGVudGlmaWVyIDooICcwJyB8IENoYXJhY3RlciB8ICd6JyApW10gPSBbICc5JyBdO1xudmFyIGxhc3RDaGFyYWN0ZXIgOicwJyB8IENoYXJhY3RlciB8ICd6JyA9ICc5JztcbnZhciBsYXN0SW5kZXggOm51bWJlciA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIElkZW50aWZpZXIgKCkgOnN0cmluZyB7XG5cdFxuXHRpZiAoIGxhc3RDaGFyYWN0ZXI9PT0neicgKSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggOm51bWJlciA9IGxhc3RJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdHZhciBjaGFyYWN0ZXIgOicwJyB8IENoYXJhY3RlciB8ICd6JyA9IGxhdGVzdElkZW50aWZpZXJbLS1jaGFyYWN0ZXJJbmRleF07XG5cdFx0XHRcdGlmICggY2hhcmFjdGVyPT09J3onICkgeyBsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtjaGFyYWN0ZXJdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0KCdhJyk7XG5cdFx0XHRcdCsrbGFzdEluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0Ly92YXIgaWRlbnRpZmllciA6c3RyaW5nID0gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0Ly9pZiAoIGlzUmVzZXJ2ZWRXb3JkKGlkZW50aWZpZXIpICkgeyBsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXJdOyByZXR1cm4gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTsgfVxuXHQvL3JldHVybiBpZGVudGlmaWVyO1xuXHRcblx0cmV0dXJuIGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdFxufTtcblxudHlwZSBDaGFyYWN0ZXIgPSAnMScgfCAnMicgfCAnMycgfCAnNCcgfCAnNScgfCAnNicgfCAnNycgfCAnOCcgfCAnOScgfCAnYScgfCAnYicgfCAnYycgfCAnZCcgfCAnZScgfCAnZicgfCAnZycgfCAnaCcgfCAnaScgfCAnaicgfCAnaycgfCAnbCcgfCAnbScgfCAnbicgfCAnbycgfCAncCcgfCAncScgfCAncicgfCAncycgfCAndCcgfCAndScgfCAndicgfCAndycgfCAneCcgfCAneSc7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCA6R3JvdXAgPSBjcmVhdGUobnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyA6c3RyaW5nW10sIHVGbGFnPyA6Ym9vbGVhbiwgbm9Fc2NhcGU/IDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGdyb3VwIDpHcm91cCA9IGNyZWF0ZShudWxsKTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgOkdyb3VwLCBicmFuY2ggOnN0cmluZykgOnZvaWQge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyXSB8fCAoIGdyb3VwW2NoYXJdID0gY3JlYXRlKG51bGwpICksIGJyYW5jaC5zbGljZShjaGFyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCA6R3JvdXAsIGJyYW5jaCA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyIDpzdHJpbmcgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgOkdyb3VwLCBuZWVkRXNjYXBlIDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGJyYW5jaGVzIDpzdHJpbmdbXSA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCA6c3RyaW5nW10gPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggOmJvb2xlYW4gPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzIDpzdHJpbmcgPSBzb3VyY2lmeShncm91cFtjaGFyXSwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcikgKSB7IGNoYXIgPSAnXFxcXCcrY2hhcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG50eXBlIEdyb3VwID0geyBbY2hhciA6c3RyaW5nXSA6R3JvdXAgfTtcbiIsImltcG9ydCBQcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLm51bGwuUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxudmFyIF8gOidfJyA9IHR5cGVvZiBTeW1ib2w9PT0nZnVuY3Rpb24nXG5cdD8gU3ltYm9sKCdfJykgYXMgYW55XG5cdDogJ18nO1xuXG5mdW5jdGlvbiAkPFQgZXh0ZW5kcyBTY29wZT4gKHRoaXMgOlQsIGNzcz8gOnN0cmluZywgbWVkaWE/IDpzdHJpbmcpIDpUIHtcblx0dmFyIHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gdGhpc1tfXShjc3MpOyB9XG5cdGlmICggbWVkaWEhPT11bmRlZmluZWQgKSB7XG5cdFx0c3R5bGUubWVkaWEgPSBtZWRpYSBhcyBzdHJpbmc7XG5cdH1cblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdHJldHVybiB0aGlzO1xufVxuXG52YXIgcHJlcGFyZV8gOihzY29wZSA6U2NvcGUpID0+IHZvaWQgPSB0eXBlb2YgXz09PSdzeW1ib2wnXG5cdFxuXHQ/IGZ1bmN0aW9uICQgKCkge31cblx0XG5cdDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfZGVzY3JpcHRvciA9IFByb3BlcnR5RGVzY3JpcHRvcihmdW5jdGlvbiBfICgpIHt9LCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuXHRcdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSA6U2NvcGUpIHtcblx0XHRcdGRlZmluZVByb3BlcnR5KHNjb3BlLCBfLCBfZGVzY3JpcHRvcik7XG5cdFx0fTtcblx0fSgpO1xuXG5leHBvcnQgeyBfLCAkLCBwcmVwYXJlXyB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi8nOyIsImltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLWdyb3VwaWZ5JztcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IFByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcubnVsbC5Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zIGZyb20gJy5PYmplY3QucHJldmVudEV4dGVuc2lvbnMnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IF8sICQsIHByZXBhcmVfIH0gZnJvbSAnLi9fJztcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzIDpzdHJpbmdbXSkge1xuXHRyZXR1cm4gbmV3IFJlZ0V4cCgnX18nK2dyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSsnX18nLCAnZycpO1xufVxuXG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUgOk9iamVjdFNjb3BlKSB7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BlW19fa2V5X18uc2xpY2UoMiwgLTIpXTsgfTtcbn1cblxudHlwZSBPYmplY3RTY29wZSA9IHtcblx0W2tleSA6c3RyaW5nXSA6c3RyaW5nXG59ICYge1xuXHQkIDp0eXBlb2YgJFxuXHRbX10gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuXG52YXIgT2JqZWN0U2NvcGUgPSBmdW5jdGlvbiBPYmplY3RTY29wZSAodGhpcyA6T2JqZWN0U2NvcGUsIGtleXMgOnN0cmluZ1tdKSA6dm9pZCB7XG5cdHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxufSBhcyB1bmtub3duIGFzIHtcblx0bmV3IChrZXlzIDpzdHJpbmdbXSkgOk9iamVjdFNjb3BlXG59O1xuXG52YXIgU0NPUEUgOk9iamVjdFNjb3BlID1cblx0T2JqZWN0U2NvcGUucHJvdG90eXBlID0gLyojX19QVVJFX18qL3ByZXZlbnRFeHRlbnNpb25zKGNyZWF0ZShudWxsLCB7ICQ6IFByb3BlcnR5RGVzY3JpcHRvcigkLCBmYWxzZSwgZmFsc2UsIGZhbHNlKSB9KSk7XG5cbnZhciBJbmhlcml0ZWRPYmplY3RTY29wZSA9IGZ1bmN0aW9uIEluaGVyaXRlZE9iamVjdFNjb3BlICh0aGlzIDpPYmplY3RTY29wZSwga2V5cyA6c3RyaW5nW10sIHByb3RvIDpPYmplY3RTY29wZSkgOnZvaWQge1xuXHRwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICova2V5cy5wdXNoKGtleSk7IH1cblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0SW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG59IGFzIHVua25vd24gYXMge1xuXHRuZXcgKGtleXMgOnN0cmluZ1tdLCBwcm90byA6T2JqZWN0U2NvcGUpIDpPYmplY3RTY29wZVxufTtcblxuZXhwb3J0IHsgT2JqZWN0U2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRPYmplY3RTY29wZSB9OyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBPYmplY3RTY29wZSB9IGZyb20gJy4vT2JqZWN0U2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10sIF9zY29wZSA6KGtleSA6c3RyaW5nKSA9PiBzdHJpbmcpIDpzdHJpbmcge1xuXHR2YXIga2V5cyA6c3RyaW5nLFxuXHRcdGluZGV4IDpudW1iZXIsXG5cdFx0dmFsdWVzIDpzdHJpbmdbXSxcblx0XHRrZXkgOnN0cmluZztcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBfc2NvcGUodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVtpbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IF9zY29wZShrZXkpKycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZS5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVtpbmRleF0sIF9zY29wZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgYXMgeyBba2V5IDpzdHJpbmddIDphbnkgfSApW2tleV0gKSB7IGtleXMgKz0gJyAnK19zY29wZShrZXkpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xufVxuXG50eXBlIEZ1bmN0aW9uU2NvcGUgPSB7XG5cdCguLi5hcmdzIDphbnlbXSkgOnN0cmluZ1xuXHRwcm90b3R5cGUgOk9iamVjdFNjb3BlXG5cdCQgOnR5cGVvZiAkXG5cdFtfXSA6KHN0cmluZyA6c3RyaW5nKSA9PiBzdHJpbmdcbn07XG5cbmZ1bmN0aW9uIEZ1bmN0aW9uU2NvcGUgKGNhY2hlIDpPYmplY3RTY29wZSkgOkZ1bmN0aW9uU2NvcGUge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgOnN0cmluZyB8IG9iamVjdCB8IGFueVtdKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BpZnkoYXJndW1lbnRzLmxlbmd0aD09PTEgPyB2YWx1ZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSwgX3Njb3BlKTsgfSBhcyBGdW5jdGlvblNjb3BlO1xuXHRzY29wZS5wcm90b3R5cGUgPSBjYWNoZTtcblx0c2NvcGUuJCA9ICQ7XG5cdHNjb3BlW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKFNFQVJDSCwgX3JlcGxhY2VyKTsgfTtcblx0ZnVuY3Rpb24gX3JlcGxhY2VyIChfX2tleV9fIDpzdHJpbmcpIDpzdHJpbmcgeyByZXR1cm4gX3Njb3BlKF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRmdW5jdGlvbiBfc2NvcGUgKGtleSA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIGNhY2hlW2tleV0gfHwgKCBjYWNoZVtrZXldID0gSWRlbnRpZmllcigpICk7IH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG5leHBvcnQgeyBGdW5jdGlvblNjb3BlIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IE9iamVjdFNjb3BlLCBJbmhlcml0ZWRPYmplY3RTY29wZSwgU0NPUEUgfSBmcm9tICcuL09iamVjdFNjb3BlJztcbmltcG9ydCBGdW5jdGlvblNjb3BlIGZyb20gJy4vRnVuY3Rpb25TY29wZSc7XG5cbnZhciBLRVlTID0gL1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqL2lnO1xudmFyIEVNUFRZIDpzdHJpbmdbXSA9IFtdO1xuXG5mdW5jdGlvbiBtaXggKHByb3RvcyA6U2NvcGVbXSkgOk9iamVjdFNjb3BlIHtcblx0dmFyIHNjb3BlIDpPYmplY3RTY29wZSA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byA6U2NvcGUgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cblxudHlwZSBTY29wZSA9IE9iamVjdFNjb3BlIHwgRnVuY3Rpb25TY29wZTtcblxuZnVuY3Rpb24gU2NvcGUgKHRoaXMgOlNjb3BlW10gfCBTY29wZSB8IGFueSwga2V5cz8gOnN0cmluZykgOlNjb3BlIHtcblx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUobWl4KHRoaXMgYXMgU2NvcGVbXSkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKHRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgYXMgU2NvcGVbXSkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG59XG5cbmV4cG9ydCB7IFNjb3BlIGFzIGRlZmF1bHQsIEtFWVMgfTsiLCJpbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gVGVtcGxhdGUgKGh0bWwgOnN0cmluZywgc2NvcGUgOlNjb3BlKSA6c3RyaW5nIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gc2NvcGVbX10oaHRtbCk7XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlIGFzIGRlZmF1bHQgfTtcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJzsiLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG5mdW5jdGlvbiBCb2R5IChib2R5IDpzdHJpbmcpIDpzdHJpbmcge1xuXHR2YXIgaW5kZXggPSBib2R5LmluZGV4T2YoJywnKTtcblx0cmV0dXJuICd2YXIgJytib2R5LnNsaWNlKDAsIGluZGV4KSsnPXRoaXMnK2JvZHkuc2xpY2UoaW5kZXgsIGJvZHkuaW5kZXhPZignKCcsIGluZGV4KSkrJz10aGlzLl9zZWxmLl9jfHx0aGlzLiRjcmVhdGVFbGVtZW50O3JldHVybiAnK2JvZHkuc2xpY2UoaW5kZXgrMSk7XG59XG5cbnR5cGUgUmVuZGVyID0gPENyZWF0ZUVsZW1lbnQgZXh0ZW5kcyAoLi4uYXJncyA6YW55W10pID0+IGFueT4gKGNyZWF0ZUVsZW1lbnQgOkNyZWF0ZUVsZW1lbnQpID0+IFJldHVyblR5cGU8Q3JlYXRlRWxlbWVudD47XG5cbmZ1bmN0aW9uIFJlbmRlciAoY29kZSA6c3RyaW5nLCBzY29wZT8gOlNjb3BlKSA6UmVuZGVyIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOycrQm9keShzY29wZSA/IHNjb3BlW19dKGNvZGUpIDogY29kZSkpIGFzIFJlbmRlcjtcbn1cblxuZnVuY3Rpb24gU3RhdGljUmVuZGVyRm5zIChjb2RlcyA6c3RyaW5nW10sIHNjb3BlPyA6U2NvcGUpIDpSZW5kZXJbXSB7XG5cdHZhciBpbmRleCA9IGNvZGVzLmxlbmd0aDtcblx0aWYgKCBzY29wZSApIHsgZm9yICggdmFyIHNjb3BlXyA9IHNjb3BlW19dOyBpbmRleC0tOyApIHsgY29kZXNbaW5kZXhdID0gQm9keShzY29wZV8oY29kZXNbaW5kZXhdKSk7IH0gfVxuXHRlbHNlIHsgd2hpbGUgKCBpbmRleC0tICkgeyBjb2Rlc1tpbmRleF0gPSBCb2R5KGNvZGVzW2luZGV4XSk7IH0gfVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybltmdW5jdGlvbigpeycrY29kZXMuam9pbignfSxmdW5jdGlvbigpeycpKyd9XScpKCk7XG59XG5cbmV4cG9ydCB7IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH07IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5cbmZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCA6KC4uLmFyZ3MgOmFueVtdKSA9PiBhbnksIGNvbnRleHQgOnsgZGF0YSA6YW55LCBjaGlsZHJlbiA6YW55IH0pIHtcblx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywgY29udGV4dC5kYXRhLCBjb250ZXh0LmNoaWxkcmVuKTtcbn1cblxudmFyIFNUWUxFIDp7IHJlbmRlciA6UmVuZGVyLCBmdW5jdGlvbmFsIDp0cnVlIH0gPSBjcmVhdGUobnVsbCwge1xuXHRyZW5kZXI6IFByb3BlcnR5RGVzY3JpcHRvcihyZW5kZXIsIGZhbHNlLCB0cnVlLCBmYWxzZSksXG5cdGZ1bmN0aW9uYWw6IFByb3BlcnR5RGVzY3JpcHRvcih0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpXG59KTtcblxuZXhwb3J0IHsgU1RZTEUgYXMgZGVmYXVsdCB9O1xuXG5pbXBvcnQgeyBSZW5kZXIgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJzsiLCJpbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFN0eWxlIChjc3M/IDpzdHJpbmcsIHNjb3BlPyA6U2NvcGUpIDpIVE1MU3R5bGVFbGVtZW50IHtcblx0dmFyIHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gc2NvcGUgPyBzY29wZVtfXShjc3MpIDogY3NzOyB9XG5cdHJldHVybiBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSA6SFRNTFN0eWxlRWxlbWVudCkgOnR5cGVvZiByZW1vdmUge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cblxuZXhwb3J0IHsgU3R5bGUsIHJlbW92ZSB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCB7IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU1RZTEUgIGZyb20gJy4vU1RZTEUnO1xuaW1wb3J0IHsgU3R5bGUsIHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdElkZW50aWZpZXIsXG5cdFNjb3BlLFxuXHRUZW1wbGF0ZSxcblx0UmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFLFxuXHRTdHlsZSwgcmVtb3ZlLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlcixcblx0U3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFOiBTVFlMRSxcblx0U3R5bGU6IFN0eWxlLFxuXHRyZW1vdmU6IHJlbW92ZVxufSk7Il0sIm5hbWVzIjpbInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZSxPQUFPOztJQ0F0QixJQUFJLGtCQUFrQixHQUF3RDtRQUM3RSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztRQUM5RSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztRQUN0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