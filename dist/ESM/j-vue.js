/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：9.0.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

var version = '9.0.1';

var dictionary = {
    0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'a',
    a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
    h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
    o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
    u: 'v', v: 'w', w: 'x', x: 'y', y: 'z', z: '0'
};
var latestIdentifierCharacters = ['9'];
var latestIdentifierCharacters_lastCharacter = '9';
var latestIdentifierCharacters_lastCharacterIndex = 0;
function Identifier() {
    if (latestIdentifierCharacters_lastCharacter === 'z') {
        latestIdentifierCharacters_lastCharacter = latestIdentifierCharacters[latestIdentifierCharacters_lastCharacterIndex] = '0';
        for (var characterIndex = latestIdentifierCharacters_lastCharacterIndex;;) {
            if (characterIndex) {
                if (latestIdentifierCharacters[--characterIndex] === 'z') {
                    latestIdentifierCharacters[characterIndex] = '0';
                }
                else {
                    latestIdentifierCharacters[characterIndex] = dictionary[latestIdentifierCharacters[characterIndex]];
                    break;
                }
            }
            else {
                latestIdentifierCharacters.unshift('a');
                ++latestIdentifierCharacters_lastCharacterIndex;
                break;
            }
        }
    }
    else {
        latestIdentifierCharacters_lastCharacter = latestIdentifierCharacters[latestIdentifierCharacters_lastCharacterIndex] = dictionary[latestIdentifierCharacters_lastCharacter];
    }
    //var identifier :string = latestIdentifierCharacters.join('');
    //if ( isReservedWord(identifier) ) {
    //	latestIdentifierCharacters_lastCharacter = latestIdentifierCharacters[latestIdentifierCharacters_lastCharacterIndex] = dictionary[latestIdentifierCharacters_lastCharacter];
    //	return latestIdentifierCharacters.join('');
    //}
    //return identifier;
    return latestIdentifierCharacters.join('');
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
		}
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
	/*#__PURE__*/ function () {
		if ( !assign && !{ 'toString': null }.propertyIsEnumerable('toString') ) { var keys = [ 'constructor', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'valueOf', 'toLocaleString', 'toString' ]; }
		if ( freeze && toStringTag ) { var toStringTagPropertyDescriptor = create$1(null); toStringTagPropertyDescriptor.value = 'Module'; }
		function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create$1(null); }
			if ( assign ) { assign(exports, addOnOrigin); }
			else {
				for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
				if ( keys ) { for ( var index = 7; index--; ) { if ( hasOwnProperty.call(addOnOrigin, key = keys[index]) ) { exports[key] = addOnOrigin[key]; } } }
			}
			exports['default'] = exports;
			toStringTagPropertyDescriptor && defineProperty(exports, toStringTag, toStringTagPropertyDescriptor);
			return freeze ? freeze(exports) : exports;
		}
		return function Default (exports, addOnOrigin) {
			return /*#__PURE__*/ Module(exports, addOnOrigin);
		};
	}()
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
        var _descriptor = create(null);
        _descriptor.value = function _() { };
        _descriptor.writable = true;
        return function $(scope) {
            defineProperty(scope, _, _descriptor);
        };
    }();

var SCOPE = 
/*#__PURE__*/
function () {
    var descriptor = create(null);
    descriptor.value = $;
    return preventExtensions(defineProperty(create(null), '$', descriptor));
}();
var ObjectScope = function ObjectScope(keys) {
    prepare_(this);
    this[_] = function _(string) { return string.replace(_search, _replacer); };
    var _search = Search(keys);
    var _replacer = Replacer(this);
    for (var index = keys.length; index;) {
        this[keys[--index]] = Identifier();
    }
};
ObjectScope.prototype = SCOPE;
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
function Search(keys) {
    return new RegExp('__' + groupify(keys, false, true) + '__', 'g');
}
function Replacer(scope) {
    return function replacer(__key__) { return scope[__key__.slice(2, -2)]; };
}

var slice = Array.prototype.slice;

var SEARCH = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;
function FunctionScope(cache) {
    var scope = function scope(value) { return scopify(arguments.length === 1 ? value : slice.call(arguments, 0), _scope); };
    scope.prototype = cache;
    scope.$ = $;
    scope[_] = function _(string) { return string.replace(SEARCH, _replacer); };
    function _replacer(__key__) { return _scope(__key__.slice(2, -2)); }
    function _scope(key) { return cache[key] || (cache[key] = Identifier()); }
    return scope;
}
function scopify(value, _scope) {
    var keys, index, values, key;
    if (value) {
        switch (typeof value) {
            case 'string':
                if (value.indexOf(' ') === -1) {
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

var KEYS = /[a-z][a-z0-9]*(?:_[a-z0-9]+)*/ig;
var EMPTY = [];
function Scope(keys) {
    if (typeof keys === 'string') {
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
    else {
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
}
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

function Template(html, scope) {
    return scope[_](html);
}
function Render(code, scope) {
    return Function('"use strict";var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return ' +
        (scope ? scope[_](code) : code));
}
function StaticRenderFns(codes, scope) {
    if (scope) {
        for (var index = codes.length, scope_ = scope[_]; index--;) {
            codes[index] = scope_(codes[index]);
        }
    }
    return Function('"use strict";return[function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return ' +
        codes.join('},function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return ') +
        '}]')();
}

var STYLE = Object.create(null, {
    functional: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: true
    },
    render: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: function render(createElement, context) {
            return createElement('style', context.data, context.children);
        }
    }
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

var _export = Default(null, {
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

export default _export;
export { Identifier, Render, STYLE, Scope, StaticRenderFns, Style, Template, remove, version };

/*¡ j-vue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIlNjb3BlL18udHMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMudHMiLCJTVFlMRS50cyIsIlN0eWxlLCByZW1vdmUudHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgJzkuMC4xJzsiLCJ2YXIgZGljdGlvbmFyeSA6e1xuXHQnMCcgOicxJywgJzEnIDonMicsICcyJyA6JzMnLCAnMycgOic0JywgJzQnIDonNScsICc1JyA6JzYnLCAnNicgOic3JywgJzcnIDonOCcsICc4JyA6JzknLCAnOScgOidhJyxcblx0J2EnIDonYicsICdiJyA6J2MnLCAnYycgOidkJywgJ2QnIDonZScsICdlJyA6J2YnLCAnZicgOidnJywgJ2cnIDonaCcsXG5cdCdoJyA6J2knLCAnaScgOidqJywgJ2onIDonaycsICdrJyA6J2wnLCAnbCcgOidtJywgJ20nIDonbicsICduJyA6J28nLFxuXHQnbycgOidwJywgJ3AnIDoncScsICdxJyA6J3InLCAncicgOidzJywgJ3MnIDondCcsICd0JyA6J3UnLFxuXHQndScgOid2JywgJ3YnIDondycsICd3JyA6J3gnLCAneCcgOid5JywgJ3knIDoneicsICd6JyA6JzAnXG59ID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6JywgejogJzAnXG59O1xuXG52YXIgbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMgOigga2V5b2YgdHlwZW9mIGRpY3Rpb25hcnkgKVtdID0gWyc5J107XG52YXIgbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlciA6a2V5b2YgdHlwZW9mIGRpY3Rpb25hcnkgPSAnOSc7XG52YXIgbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4IDpudW1iZXIgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJZGVudGlmaWVyICgpIDpzdHJpbmcge1xuXHRcblx0aWYgKCBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gJzAnO1xuXHRcdGZvciAoIHZhciBjaGFyYWN0ZXJJbmRleCA6bnVtYmVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4OyA7ICkge1xuXHRcdFx0aWYgKCBjaGFyYWN0ZXJJbmRleCApIHtcblx0XHRcdFx0aWYgKCBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1stLWNoYXJhY3RlckluZGV4XT09PSd6JyApIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tjaGFyYWN0ZXJJbmRleF0gPSAnMCc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbY2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tjaGFyYWN0ZXJJbmRleF1dO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0Ly92YXIgaWRlbnRpZmllciA6c3RyaW5nID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMuam9pbignJyk7XG5cdC8vaWYgKCBpc1Jlc2VydmVkV29yZChpZGVudGlmaWVyKSApIHtcblx0Ly9cdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyXTtcblx0Ly9cdHJldHVybiBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVycy5qb2luKCcnKTtcblx0Ly99XG5cdC8vcmV0dXJuIGlkZW50aWZpZXI7XG5cdFxuXHRyZXR1cm4gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMuam9pbignJyk7XG5cdFxufTtcbiIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgOkdyb3VwID0gY3JlYXRlKG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgOnN0cmluZ1tdLCB1RmxhZz8gOmJvb2xlYW4sIG5vRXNjYXBlPyA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBncm91cCA6R3JvdXAgPSBjcmVhdGUobnVsbCk7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwIDpHcm91cCwgYnJhbmNoIDpzdHJpbmcpIDp2b2lkIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXIgOnN0cmluZyA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoY2hhci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgOkdyb3VwLCBicmFuY2ggOnN0cmluZykgOnZvaWQge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJdIHx8ICggZ3JvdXBbY2hhcl0gPSBjcmVhdGUobnVsbCkgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwIDpHcm91cCwgbmVlZEVzY2FwZSA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBicmFuY2hlcyA6c3RyaW5nW10gPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggOnN0cmluZ1tdID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoIDpib29sZWFuID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyA6c3RyaW5nID0gc291cmNpZnkoZ3JvdXBbY2hhcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXIpICkgeyBjaGFyID0gJ1xcXFwnK2NoYXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicrYnJhbmNoZXMuam9pbignfCcpKycpJ1xuXHRcdClcblx0XHQrKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxudHlwZSBHcm91cCA9IHsgW2NoYXIgOnN0cmluZ10gOkdyb3VwIH07XG4iLCJpbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmhlYWQnO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuZXhwb3J0IHZhciBfIDonXycgPSB0eXBlb2YgU3ltYm9sPT09J2Z1bmN0aW9uJ1xuXHQ/IFN5bWJvbCgnXycpIGFzIGFueVxuXHQ6ICdfJztcblxuZXhwb3J0IGZ1bmN0aW9uICQ8VCBleHRlbmRzIFNjb3BlPiAodGhpcyA6VCwgY3NzPyA6c3RyaW5nLCBtZWRpYT8gOnN0cmluZykgOlQge1xuXHR2YXIgc3R5bGUgOkhUTUxTdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSB0aGlzW19dKGNzcyk7IH1cblx0aWYgKCBtZWRpYSE9PXVuZGVmaW5lZCApIHtcblx0XHRzdHlsZS5tZWRpYSA9IG1lZGlhIGFzIHN0cmluZztcblx0fVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCB2YXIgcHJlcGFyZV8gOihzY29wZSA6U2NvcGUpID0+IHZvaWQgPSB0eXBlb2YgXz09PSdzeW1ib2wnXG5cdFxuXHQ/IGZ1bmN0aW9uICQgKCkge31cblx0XG5cdDogLyojX19QVVJFX18qLyBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF9kZXNjcmlwdG9yID0gY3JlYXRlKG51bGwpO1xuXHRcdF9kZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gXyAoKSB7fTtcblx0XHRfZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICQgKHNjb3BlIDpTY29wZSkge1xuXHRcdFx0ZGVmaW5lUHJvcGVydHkoc2NvcGUsIF8sIF9kZXNjcmlwdG9yKTtcblx0XHR9O1xuXHR9KCk7XG5cbmltcG9ydCBTY29wZSBmcm9tICcuLyc7IiwiaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otZ3JvdXBpZnknO1xuXG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLk9iamVjdC5kZWZpbmVQcm9wZXJ0eSc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgXywgJCwgcHJlcGFyZV8gfSBmcm9tICcuL18nO1xuXG5leHBvcnQgdmFyIFNDT1BFIDpPYmplY3RTY29wZSA9XG5cdC8qI19fUFVSRV9fKi9cblx0ZnVuY3Rpb24gKCkge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gY3JlYXRlKG51bGwpO1xuXHRcdGRlc2NyaXB0b3IudmFsdWUgPSAkO1xuXHRcdHJldHVybiBwcmV2ZW50RXh0ZW5zaW9ucyhkZWZpbmVQcm9wZXJ0eShjcmVhdGUobnVsbCksICckJywgZGVzY3JpcHRvcikpO1xuXHR9KCk7XG5cbmV4cG9ydCB2YXIgT2JqZWN0U2NvcGUgPSBmdW5jdGlvbiBPYmplY3RTY29wZSAodGhpcyA6T2JqZWN0U2NvcGUsIGtleXMgOnN0cmluZ1tdKSA6dm9pZCB7XG5cdHByZXBhcmVfKHRoaXMpO1xuXHR0aGlzW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9zZWFyY2gsIF9yZXBsYWNlcik7IH07XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxufSBhcyB1bmtub3duIGFzIHtcblx0bmV3IChrZXlzIDpzdHJpbmdbXSkgOk9iamVjdFNjb3BlXG59O1xuZXhwb3J0IHR5cGUgT2JqZWN0U2NvcGUgPSB7XG5cdFtrZXkgOnN0cmluZ10gOnN0cmluZ1xufSAmIHtcblx0JCA6dHlwZW9mICRcblx0W19dIDooc3RyaW5nIDpzdHJpbmcpID0+IHN0cmluZ1xufTtcblxuT2JqZWN0U2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG5cbmV4cG9ydCB2YXIgSW5oZXJpdGVkT2JqZWN0U2NvcGUgPSBmdW5jdGlvbiBJbmhlcml0ZWRPYmplY3RTY29wZSAodGhpcyA6T2JqZWN0U2NvcGUsIGtleXMgOnN0cmluZ1tdLCBwcm90byA6T2JqZWN0U2NvcGUpIDp2b2lkIHtcblx0cHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG5cdGZvciAoIHZhciBrZXkgaW4gcHJvdG8gKSB7IC8qa2V5PT09J18nIHx8IGtleT09PSckJyB8fCAqL2tleXMucHVzaChrZXkpOyB9XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xufSBhcyB1bmtub3duIGFzIHtcblx0bmV3IChrZXlzIDpzdHJpbmdbXSwgcHJvdG8gOk9iamVjdFNjb3BlKSA6T2JqZWN0U2NvcGVcbn07XG5cbmZ1bmN0aW9uIFNlYXJjaCAoa2V5cyA6c3RyaW5nW10pIHtcblx0cmV0dXJuIG5ldyBSZWdFeHAoJ19fJytncm91cGlmeShrZXlzLCBmYWxzZSwgdHJ1ZSkrJ19fJywgJ2cnKTtcbn1cblxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlIDpPYmplY3RTY29wZSkge1xuXHRyZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07XG59XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgc2xpY2UgZnJvbSAnLkFycmF5LnByb3RvdHlwZS5zbGljZSc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgT2JqZWN0U2NvcGUgfSBmcm9tICcuL09iamVjdFNjb3BlJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgU0VBUkNIID0gL19fW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSpfXy9pZztcblxuZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb25TY29wZTtcbmZ1bmN0aW9uIEZ1bmN0aW9uU2NvcGUgKGNhY2hlIDpPYmplY3RTY29wZSkgOkZ1bmN0aW9uU2NvcGUge1xuXHR2YXIgc2NvcGUgPSBmdW5jdGlvbiBzY29wZSAodmFsdWUgOnN0cmluZyB8IG9iamVjdCB8IGFueVtdKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BpZnkoYXJndW1lbnRzLmxlbmd0aD09PTEgPyB2YWx1ZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSwgX3Njb3BlKTsgfSBhcyBGdW5jdGlvblNjb3BlO1xuXHRzY29wZS5wcm90b3R5cGUgPSBjYWNoZTtcblx0c2NvcGUuJCA9ICQ7XG5cdHNjb3BlW19dID0gZnVuY3Rpb24gXyAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKFNFQVJDSCwgX3JlcGxhY2VyKTsgfTtcblx0ZnVuY3Rpb24gX3JlcGxhY2VyIChfX2tleV9fIDpzdHJpbmcpIDpzdHJpbmcgeyByZXR1cm4gX3Njb3BlKF9fa2V5X18uc2xpY2UoMiwgLTIpKTsgfVxuXHRmdW5jdGlvbiBfc2NvcGUgKGtleSA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIGNhY2hlW2tleV0gfHwgKCBjYWNoZVtrZXldID0gSWRlbnRpZmllcigpICk7IH1cblx0cmV0dXJuIHNjb3BlO1xufVxudHlwZSBGdW5jdGlvblNjb3BlID0ge1xuXHQoLi4uYXJncyA6YW55W10pIDpzdHJpbmdcblx0cHJvdG90eXBlIDpPYmplY3RTY29wZVxuXHQkIDp0eXBlb2YgJFxuXHRbX10gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10sIF9zY29wZSA6KGtleSA6c3RyaW5nKSA9PiBzdHJpbmcpIDpzdHJpbmcge1xuXHR2YXIga2V5cyA6c3RyaW5nLFxuXHRcdGluZGV4IDpudW1iZXIsXG5cdFx0dmFsdWVzIDpzdHJpbmdbXSxcblx0XHRrZXkgOnN0cmluZztcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKT09PSAtMSApIHtcblx0XHRcdFx0XHRyZXR1cm4gX3Njb3BlKHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWUuc3BsaXQoJyAnKTtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlcy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gdmFsdWVbaW5kZXhdO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBfc2NvcGUoa2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHNjb3BpZnkodmFsdWVbaW5kZXhdLCBfc2NvcGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoPHsgW2tleSA6c3RyaW5nXSA6YW55IH0+dmFsdWUpW2tleV0gKSB7IGtleXMgKz0gJyAnK19zY29wZShrZXkpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xufSIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuXG5pbXBvcnQgeyBPYmplY3RTY29wZSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9PYmplY3RTY29wZSc7XG5pbXBvcnQgRnVuY3Rpb25TY29wZSBmcm9tICcuL0Z1bmN0aW9uU2NvcGUnO1xuXG5leHBvcnQgdmFyIEtFWVMgPSAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7XG52YXIgRU1QVFkgOnN0cmluZ1tdID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IFNjb3BlO1xudHlwZSBTY29wZSA9IE9iamVjdFNjb3BlIHwgRnVuY3Rpb25TY29wZTtcbmZ1bmN0aW9uIFNjb3BlICh0aGlzIDpTY29wZVtdIHwgU2NvcGUgfCBhbnksIGtleXM/IDpzdHJpbmcpIDpTY29wZSB7XG5cdGlmICggdHlwZW9mIGtleXM9PT0nc3RyaW5nJyApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gbWl4KHRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0aGlzIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gdGhpcyk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGUpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBuZXcgT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKG1peCh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiB0aGlzLnByb3RvdHlwZSBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUodGhpcy5wcm90b3R5cGUpKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG59XG5cbmZ1bmN0aW9uIG1peCAocHJvdG9zIDpTY29wZVtdKSA6T2JqZWN0U2NvcGUge1xuXHR2YXIgc2NvcGUgOk9iamVjdFNjb3BlID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvIDpTY29wZSA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9IHByb3RvLnByb3RvdHlwZTsgfVxuXHRcdGZvciAoIHZhciBpZCBpbiBwcm90byApIHsgc2NvcGVbaWRdID0gcHJvdG9baWRdOyB9XG5cdH1cblx0cmV0dXJuIHNjb3BlO1xufVxuIiwiaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcblxuZXhwb3J0IGZ1bmN0aW9uIFRlbXBsYXRlIChodG1sIDpzdHJpbmcsIHNjb3BlIDpTY29wZSkgOnN0cmluZyB7XG5cdHJldHVybiBzY29wZVtfXShodG1sKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlbmRlciAoY29kZSA6c3RyaW5nLCBzY29wZT8gOlNjb3BlKSA6RnVuY3Rpb24ge1xuXHRyZXR1cm4gRnVuY3Rpb24oXG5cdFx0J1widXNlIHN0cmljdFwiO3ZhciBfdm09dGhpcyxfaD1fdm0uJGNyZWF0ZUVsZW1lbnQsX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gJytcblx0XHQoIHNjb3BlID8gc2NvcGVbX10oY29kZSkgOiBjb2RlIClcblx0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgOnN0cmluZ1tdLCBzY29wZT8gOlNjb3BlKSA6RnVuY3Rpb25bXSB7XG5cdGlmICggc2NvcGUgKSB7XG5cdFx0Zm9yICggdmFyIGluZGV4ID0gY29kZXMubGVuZ3RoLCBzY29wZV8gPSBzY29wZVtfXTsgaW5kZXgtLTsgKSB7XG5cdFx0XHRjb2Rlc1tpbmRleF0gPSBzY29wZV8oY29kZXNbaW5kZXhdKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIEZ1bmN0aW9uKFxuXHRcdCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bZnVuY3Rpb24oKXt2YXIgX3ZtPXRoaXMsX2g9X3ZtLiRjcmVhdGVFbGVtZW50LF9jPV92bS5fc2VsZi5fY3x8X2g7cmV0dXJuICcrXG5cdFx0Y29kZXMuam9pbignfSxmdW5jdGlvbigpe3ZhciBfdm09dGhpcyxfaD1fdm0uJGNyZWF0ZUVsZW1lbnQsX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gJykrXG5cdFx0J31dJ1xuXHQpKCk7XG59XG4iLCJpbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKG51bGwsIHtcblx0ZnVuY3Rpb25hbDoge1xuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0dmFsdWU6XG5cdFx0XHR0cnVlXG5cdH0sXG5cdHJlbmRlcjoge1xuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0dmFsdWU6XG5cdFx0XHRmdW5jdGlvbiByZW5kZXIgKGNyZWF0ZUVsZW1lbnQgOkZ1bmN0aW9uLCBjb250ZXh0IDpOb25OdWxsYWJsZTxhbnk+KSB7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVFbGVtZW50KCdzdHlsZScsIGNvbnRleHQuZGF0YSwgY29udGV4dC5jaGlsZHJlbik7XG5cdFx0XHR9XG5cdH1cbn0pO1xuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcblxuZXhwb3J0IGZ1bmN0aW9uIFN0eWxlIChjc3M/IDpzdHJpbmcsIHNjb3BlPyA6U2NvcGUpIDpIVE1MU3R5bGVFbGVtZW50IHtcblx0dmFyIHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gc2NvcGUgPyBzY29wZVtfXShjc3MpIDogY3NzOyB9XG5cdHJldHVybiBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZSAoc3R5bGUgOkhUTUxTdHlsZUVsZW1lbnQpIDp0eXBlb2YgcmVtb3ZlIHtcblx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZSk7XG5cdHJldHVybiByZW1vdmU7XG59XG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi9JZGVudGlmaWVyJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5pbXBvcnQgeyBUZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMgfSBmcm9tICcuL1RlbXBsYXRlLCBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7XG5pbXBvcnQgU1RZTEUgIGZyb20gJy4vU1RZTEUnO1xuaW1wb3J0IHsgU3R5bGUsIHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5cbmV4cG9ydCB7XG5cdHZlcnNpb24sXG5cdElkZW50aWZpZXIsXG5cdFNjb3BlLFxuXHRUZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFLFxuXHRTdHlsZSwgcmVtb3ZlLFxufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdChudWxsLCB7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdElkZW50aWZpZXI6IElkZW50aWZpZXIsXG5cdFNjb3BlOiBTY29wZSxcblx0VGVtcGxhdGU6IFRlbXBsYXRlLFxuXHRSZW5kZXI6IFJlbmRlcixcblx0U3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFOiBTVFlMRSxcblx0U3R5bGU6IFN0eWxlLFxuXHRyZW1vdmU6IHJlbW92ZVxufSk7Il0sIm5hbWVzIjpbImNyZWF0ZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxjQUFlLE9BQU87O0FDQXRCLElBQUksVUFBVSxHQU1WO0lBQ0gsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7SUFDOUUs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