/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：9.0.10
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

    var version = '9.0.10';

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIlNjb3BlL18udHMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZS50cyIsIlJlbmRlciwgU3RhdGljUmVuZGVyRm5zLnRzIiwiU1RZTEUudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICc5LjAuMTAnOyIsInZhciBpbmNyZWFzZURpY3Rpb25hcnkgOnsgW2NoYXJhY3RlciBpbiAnMCcgfCBDaGFyYWN0ZXJdIDpDaGFyYWN0ZXIgfCAneicgfSA9IHtcblx0MDogJzEnLCAxOiAnMicsIDI6ICczJywgMzogJzQnLCA0OiAnNScsIDU6ICc2JywgNjogJzcnLCA3OiAnOCcsIDg6ICc5JywgOTogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn07XG52YXIgbGF0ZXN0SWRlbnRpZmllciA6KCAnMCcgfCBDaGFyYWN0ZXIgfCAneicgKVtdID0gWyAnOScgXTtcbnZhciBsYXN0Q2hhcmFjdGVyIDonMCcgfCBDaGFyYWN0ZXIgfCAneicgPSAnOSc7XG52YXIgbGFzdEluZGV4IDpudW1iZXIgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJZGVudGlmaWVyICgpIDpzdHJpbmcge1xuXHRcblx0aWYgKCBsYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIGNoYXJhY3RlckluZGV4IDpudW1iZXIgPSBsYXN0SW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIGNoYXJhY3RlckluZGV4ICkge1xuXHRcdFx0XHR2YXIgY2hhcmFjdGVyIDonMCcgfCBDaGFyYWN0ZXIgfCAneicgPSBsYXRlc3RJZGVudGlmaWVyWy0tY2hhcmFjdGVySW5kZXhdO1xuXHRcdFx0XHRpZiAoIGNoYXJhY3Rlcj09PSd6JyApIHsgbGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSAnMCc7IH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllcltjaGFyYWN0ZXJJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbY2hhcmFjdGVyXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxhdGVzdElkZW50aWZpZXIudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhc3RJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyW2xhc3RJbmRleF0gPSBpbmNyZWFzZURpY3Rpb25hcnlbbGFzdENoYXJhY3Rlcl07XG5cdH1cblx0XG5cdC8vdmFyIGlkZW50aWZpZXIgOnN0cmluZyA9IGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdC8vaWYgKCBpc1Jlc2VydmVkV29yZChpZGVudGlmaWVyKSApIHsgbGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTsgcmV0dXJuIGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7IH1cblx0Ly9yZXR1cm4gaWRlbnRpZmllcjtcblx0XG5cdHJldHVybiBsYXRlc3RJZGVudGlmaWVyLmpvaW4oJycpO1xuXHRcbn07XG5cbnR5cGUgQ2hhcmFjdGVyID0gJzEnIHwgJzInIHwgJzMnIHwgJzQnIHwgJzUnIHwgJzYnIHwgJzcnIHwgJzgnIHwgJzknIHwgJ2EnIHwgJ2InIHwgJ2MnIHwgJ2QnIHwgJ2UnIHwgJ2YnIHwgJ2cnIHwgJ2gnIHwgJ2knIHwgJ2onIHwgJ2snIHwgJ2wnIHwgJ20nIHwgJ24nIHwgJ28nIHwgJ3AnIHwgJ3EnIHwgJ3InIHwgJ3MnIHwgJ3QnIHwgJ3UnIHwgJ3YnIHwgJ3cnIHwgJ3gnIHwgJ3knOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgOkdyb3VwID0gY3JlYXRlKG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgOnN0cmluZ1tdLCB1RmxhZz8gOmJvb2xlYW4sIG5vRXNjYXBlPyA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBncm91cCA6R3JvdXAgPSBjcmVhdGUobnVsbCk7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwIDpHcm91cCwgYnJhbmNoIDpzdHJpbmcpIDp2b2lkIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXIgOnN0cmluZyA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoY2hhci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgOkdyb3VwLCBicmFuY2ggOnN0cmluZykgOnZvaWQge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJdIHx8ICggZ3JvdXBbY2hhcl0gPSBjcmVhdGUobnVsbCkgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwIDpHcm91cCwgbmVlZEVzY2FwZSA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBicmFuY2hlcyA6c3RyaW5nW10gPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggOnN0cmluZ1tdID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoIDpib29sZWFuID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyA6c3RyaW5nID0gc291cmNpZnkoZ3JvdXBbY2hhcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXIpICkgeyBjaGFyID0gJ1xcXFwnK2NoYXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicrYnJhbmNoZXMuam9pbignfCcpKycpJ1xuXHRcdClcblx0XHQrKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxudHlwZSBHcm91cCA9IHsgW2NoYXIgOnN0cmluZ10gOkdyb3VwIH07XG4iLCJpbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbnZhciBfIDonXycgPSB0eXBlb2YgU3ltYm9sPT09J2Z1bmN0aW9uJ1xuXHQ/IFN5bWJvbCgnXycpIGFzIGFueVxuXHQ6ICdfJztcblxuZnVuY3Rpb24gJDxUIGV4dGVuZHMgU2NvcGU+ICh0aGlzIDpULCBjc3M/IDpzdHJpbmcsIG1lZGlhPyA6c3RyaW5nKSA6VCB7XG5cdHZhciBzdHlsZSA6SFRNTFN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXNbX10oY3NzKTsgfVxuXHRpZiAoIG1lZGlhIT09dW5kZWZpbmVkICkge1xuXHRcdHN0eWxlLm1lZGlhID0gbWVkaWEgYXMgc3RyaW5nO1xuXHR9XG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gdGhpcztcbn1cblxudmFyIHByZXBhcmVfIDooc2NvcGUgOlNjb3BlKSA9PiB2b2lkID0gdHlwZW9mIF89PT0nc3ltYm9sJ1xuXHRcblx0PyBmdW5jdGlvbiAkICgpIHt9XG5cdFxuXHQ6IC8qI19fUFVSRV9fKi8gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfZGVzY3JpcHRvciA9IFByb3BlcnR5RGVzY3JpcHRvcihmdW5jdGlvbiBfICgpIHt9LCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuXHRcdHJldHVybiBmdW5jdGlvbiAkIChzY29wZSA6U2NvcGUpIHtcblx0XHRcdGRlZmluZVByb3BlcnR5KHNjb3BlLCBfLCBfZGVzY3JpcHRvcik7XG5cdFx0fTtcblx0fSgpO1xuXG5leHBvcnQgeyBfLCAkLCBwcmVwYXJlXyB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi8nOyIsImltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLWdyb3VwaWZ5JztcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IFByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcubnVsbC5Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zIGZyb20gJy5PYmplY3QucHJldmVudEV4dGVuc2lvbnMnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IF8sICQsIHByZXBhcmVfIH0gZnJvbSAnLi9fJztcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzIDpzdHJpbmdbXSkge1xuXHRyZXR1cm4gbmV3IFJlZ0V4cCgnX18nK2dyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSsnX18nLCAnZycpO1xufVxuXG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUgOk9iamVjdFNjb3BlKSB7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BlW19fa2V5X18uc2xpY2UoMiwgLTIpXTsgfTtcbn1cblxudHlwZSBPYmplY3RTY29wZSA9IHtcblx0W2tleSA6c3RyaW5nXSA6c3RyaW5nXG59ICYge1xuXHQkIDp0eXBlb2YgJFxuXHRbX10gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuXG52YXIgT2JqZWN0U2NvcGUgPSBmdW5jdGlvbiBPYmplY3RTY29wZSAodGhpcyA6T2JqZWN0U2NvcGUsIGtleXMgOnN0cmluZ1tdKSA6dm9pZCB7XG5cdHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxufSBhcyB1bmtub3duIGFzIHtcblx0bmV3IChrZXlzIDpzdHJpbmdbXSkgOk9iamVjdFNjb3BlXG59O1xuXG52YXIgU0NPUEUgOk9iamVjdFNjb3BlID1cblx0T2JqZWN0U2NvcGUucHJvdG90eXBlID0gLyojX19QVVJFX18qL3ByZXZlbnRFeHRlbnNpb25zKGNyZWF0ZShudWxsLCB7ICQ6IFByb3BlcnR5RGVzY3JpcHRvcigkLCBmYWxzZSwgZmFsc2UsIGZhbHNlKSB9KSk7XG5cbnZhciBJbmhlcml0ZWRPYmplY3RTY29wZSA9IGZ1bmN0aW9uIEluaGVyaXRlZE9iamVjdFNjb3BlICh0aGlzIDpPYmplY3RTY29wZSwga2V5cyA6c3RyaW5nW10sIHByb3RvIDpPYmplY3RTY29wZSkgOnZvaWQge1xuXHRwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICova2V5cy5wdXNoKGtleSk7IH1cblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0SW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG59IGFzIHVua25vd24gYXMge1xuXHRuZXcgKGtleXMgOnN0cmluZ1tdLCBwcm90byA6T2JqZWN0U2NvcGUpIDpPYmplY3RTY29wZVxufTtcblxuZXhwb3J0IHsgT2JqZWN0U2NvcGUsIFNDT1BFLCBJbmhlcml0ZWRPYmplY3RTY29wZSB9OyIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBPYmplY3RTY29wZSB9IGZyb20gJy4vT2JqZWN0U2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10sIF9zY29wZSA6KGtleSA6c3RyaW5nKSA9PiBzdHJpbmcpIDpzdHJpbmcge1xuXHR2YXIga2V5cyA6c3RyaW5nLFxuXHRcdGluZGV4IDpudW1iZXIsXG5cdFx0dmFsdWVzIDpzdHJpbmdbXSxcblx0XHRrZXkgOnN0cmluZztcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKTwwICkge1xuXHRcdFx0XHRcdHJldHVybiBfc2NvcGUodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVtpbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IF9zY29wZShrZXkpKycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZS5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVtpbmRleF0sIF9zY29wZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggdmFsdWUgYXMgeyBba2V5IDpzdHJpbmddIDphbnkgfSApW2tleV0gKSB7IGtleXMgKz0gJyAnK19zY29wZShrZXkpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xufVxuXG50eXBlIEZ1bmN0aW9uU2NvcGUgPSB7XG5cdCguLi5hcmdzIDphbnlbXSkgOnN0cmluZ1xuXHRwcm90b3R5cGUgOk9iamVjdFNjb3BlXG5cdCQgOnR5cGVvZiAkXG5cdFtfXSA6KHN0cmluZyA6c3RyaW5nKSA9PiBzdHJpbmdcbn07XG5cbmZ1bmN0aW9uIEZ1bmN0aW9uU2NvcGUgKGNhY2hlIDpPYmplY3RTY29wZSkgOkZ1bmN0aW9uU2NvcGUge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgOnN0cmluZyB8IG9iamVjdCB8IGFueVtdKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BpZnkoYXJndW1lbnRzLmxlbmd0aD09PTEgPyB2YWx1ZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSwgX3Njb3BlKTsgfSBhcyBGdW5jdGlvblNjb3BlO1xuXHRzY29wZS5wcm90b3R5cGUgPSBjYWNoZTtcblx0c2NvcGUuJCA9ICQ7XG5cdHNjb3BlW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKFNFQVJDSCwgX3JlcGxhY2VyKTsgfTtcblx0ZnVuY3Rpb24gX3JlcGxhY2VyIChfX2tleV9fIDpzdHJpbmcpIDpzdHJpbmcgeyByZXR1cm4gX3Njb3BlKF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRmdW5jdGlvbiBfc2NvcGUgKGtleSA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIGNhY2hlW2tleV0gfHwgKCBjYWNoZVtrZXldID0gSWRlbnRpZmllcigpICk7IH1cblx0cmV0dXJuIHNjb3BlO1xufVxuXG5leHBvcnQgeyBGdW5jdGlvblNjb3BlIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IE9iamVjdFNjb3BlLCBJbmhlcml0ZWRPYmplY3RTY29wZSwgU0NPUEUgfSBmcm9tICcuL09iamVjdFNjb3BlJztcbmltcG9ydCBGdW5jdGlvblNjb3BlIGZyb20gJy4vRnVuY3Rpb25TY29wZSc7XG5cbnZhciBLRVlTID0gL1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqL2lnO1xudmFyIEVNUFRZIDpzdHJpbmdbXSA9IFtdO1xuXG5mdW5jdGlvbiBtaXggKHByb3RvcyA6U2NvcGVbXSkgOk9iamVjdFNjb3BlIHtcblx0dmFyIHNjb3BlIDpPYmplY3RTY29wZSA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byA6U2NvcGUgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cblxudHlwZSBTY29wZSA9IE9iamVjdFNjb3BlIHwgRnVuY3Rpb25TY29wZTtcblxuZnVuY3Rpb24gU2NvcGUgKHRoaXMgOlNjb3BlW10gfCBTY29wZSB8IGFueSwga2V5cz8gOnN0cmluZykgOlNjb3BlIHtcblx0aWYgKCBrZXlzPT09dW5kZWZpbmVkICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUobWl4KHRoaXMgYXMgU2NvcGVbXSkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKHRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMgYXMgU2NvcGVbXSkpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG59XG5cbmV4cG9ydCB7IFNjb3BlIGFzIGRlZmF1bHQsIEtFWVMgfTsiLCJpbXBvcnQgeyBfIH0gZnJvbSAnLi9TY29wZS9fJztcblxuZnVuY3Rpb24gVGVtcGxhdGUgKGh0bWwgOnN0cmluZywgc2NvcGUgOlNjb3BlKSA6c3RyaW5nIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gc2NvcGVbX10oaHRtbCk7XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlIGFzIGRlZmF1bHQgfTtcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJzsiLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG5mdW5jdGlvbiBCb2R5IChib2R5IDpzdHJpbmcpIDpzdHJpbmcge1xuXHR2YXIgaW5kZXggPSBib2R5LmluZGV4T2YoJywnKTtcblx0cmV0dXJuICd2YXIgJytib2R5LnNsaWNlKDAsIGluZGV4KSsnPXRoaXMnK2JvZHkuc2xpY2UoaW5kZXgsIGJvZHkuaW5kZXhPZignKCcsIGluZGV4KSkrJz10aGlzLl9zZWxmLl9jfHx0aGlzLiRjcmVhdGVFbGVtZW50O3JldHVybiAnK2JvZHkuc2xpY2UoaW5kZXgrMSk7XG59XG5cbnR5cGUgUmVuZGVyID0gPENyZWF0ZUVsZW1lbnQgZXh0ZW5kcyAoLi4uYXJncyA6YW55W10pID0+IGFueT4gKGNyZWF0ZUVsZW1lbnQgOkNyZWF0ZUVsZW1lbnQpID0+IFJldHVyblR5cGU8Q3JlYXRlRWxlbWVudD47XG5cbmZ1bmN0aW9uIFJlbmRlciAoY29kZSA6c3RyaW5nLCBzY29wZT8gOlNjb3BlKSA6UmVuZGVyIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOycrQm9keShzY29wZSA/IHNjb3BlW19dKGNvZGUpIDogY29kZSkpIGFzIFJlbmRlcjtcbn1cblxuZnVuY3Rpb24gU3RhdGljUmVuZGVyRm5zIChjb2RlcyA6c3RyaW5nW10sIHNjb3BlPyA6U2NvcGUpIDpSZW5kZXJbXSB7XG5cdHZhciBpbmRleCA9IGNvZGVzLmxlbmd0aDtcblx0aWYgKCBzY29wZSApIHsgZm9yICggdmFyIHNjb3BlXyA9IHNjb3BlW19dOyBpbmRleC0tOyApIHsgY29kZXNbaW5kZXhdID0gQm9keShzY29wZV8oY29kZXNbaW5kZXhdKSk7IH0gfVxuXHRlbHNlIHsgd2hpbGUgKCBpbmRleC0tICkgeyBjb2Rlc1tpbmRleF0gPSBCb2R5KGNvZGVzW2luZGV4XSk7IH0gfVxuXHRyZXR1cm4gRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiO3JldHVybltmdW5jdGlvbigpeycrY29kZXMuam9pbignfSxmdW5jdGlvbigpeycpKyd9XScpKCk7XG59XG5cbmV4cG9ydCB7IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH07IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5udWxsLlByb3BlcnR5RGVzY3JpcHRvcic7XG5cbmZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCA6KC4uLmFyZ3MgOmFueVtdKSA9PiBhbnksIGNvbnRleHQgOnsgZGF0YSA6YW55LCBjaGlsZHJlbiA6YW55IH0pIHtcblx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywgY29udGV4dC5kYXRhLCBjb250ZXh0LmNoaWxkcmVuKTtcbn1cblxudmFyIFNUWUxFIDp7IHJlbmRlciA6UmVuZGVyLCBmdW5jdGlvbmFsIDp0cnVlIH0gPSBjcmVhdGUobnVsbCwge1xuXHRyZW5kZXI6IFByb3BlcnR5RGVzY3JpcHRvcihyZW5kZXIsIGZhbHNlLCB0cnVlLCBmYWxzZSksXG5cdGZ1bmN0aW9uYWw6IFByb3BlcnR5RGVzY3JpcHRvcih0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpXG59KTtcblxuZXhwb3J0IHsgU1RZTEUgYXMgZGVmYXVsdCB9O1xuXG5pbXBvcnQgeyBSZW5kZXIgfSBmcm9tICcuL1JlbmRlciwgU3RhdGljUmVuZGVyRm5zJzsiLCJpbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFN0eWxlIChjc3M/IDpzdHJpbmcsIHNjb3BlPyA6U2NvcGUpIDpIVE1MU3R5bGVFbGVtZW50IHtcblx0dmFyIHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gc2NvcGUgPyBzY29wZVtfXShjc3MpIDogY3NzOyB9XG5cdHJldHVybiBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSA6SFRNTFN0eWxlRWxlbWVudCkgOnR5cGVvZiByZW1vdmUge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cblxuZXhwb3J0IHsgU3R5bGUsIHJlbW92ZSB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCB7IFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU1RZTEUgIGZyb20gJy4vU1RZTEUnO1xuaW1wb3J0IHsgU3R5bGUsIHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdElkZW50aWZpZXIsXG5cdFNjb3BlLFxuXHRUZW1wbGF0ZSxcblx0UmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFLFxuXHRTdHlsZSwgcmVtb3ZlLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlcixcblx0U3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFOiBTVFlMRSxcblx0U3R5bGU6IFN0eWxlLFxuXHRyZW1vdmU6IHJlbW92ZVxufSk7Il0sIm5hbWVzIjpbImNyZWF0ZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZSxRQUFROztJQ0F2QixJQUFJLGtCQUFrQixHQUF3RDtRQUM3RSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztRQUM5RSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcs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