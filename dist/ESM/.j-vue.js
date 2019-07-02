/*!
 * 模块名称：j-vue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified front-end dependency for built .vue files. Belong to "Plan J".
 * 模块版本：9.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

import isArray from '.Array.isArray';
import create$1 from '.Object.create';
import create from '.Object.create?=';
import Default from '.default';
import RegExp from '.RegExp';
import defineProperty from '.Object.defineProperty';
import preventExtensions from '.Object.preventExtensions';
import document from '.document';
import head from '.document.head';
import undefined$1 from '.undefined';
import slice from '.Array.prototype.slice';
import Function from '.Function';
import Object from '.Object';

var version = '9.0.0';

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

var version$1 = '3.4.2';

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

var _export = Default(groupify, {
    version: version$1,
    groupify: groupify
});

/*¡ j-groupify */

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
        var _descriptor = create$1(null);
        _descriptor.value = function _() { };
        _descriptor.writable = true;
        return function $(scope) {
            defineProperty(scope, _, _descriptor);
        };
    }();

var SCOPE = 
/*#__PURE__*/
function () {
    var descriptor = create$1(null);
    descriptor.value = $;
    return preventExtensions(defineProperty(create$1(null), '$', descriptor));
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
            return FunctionScope(create$1(this));
        }
        else if (typeof this === 'function' && this.prototype instanceof ObjectScope) {
            return FunctionScope(create$1(this.prototype));
        }
        else {
            return FunctionScope(create$1(SCOPE));
        }
    }
}
function mix(protos) {
    var scope = create$1(SCOPE);
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

var _export$1 = Default(null, {
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

export default _export$1;
export { Identifier, Render, STYLE, Scope, StaticRenderFns, Style, Template, remove, version };

/*¡ j-vue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy92ZXJzaW9uP3RleHQiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIi4uLy4uLy4uL2otZ3JvdXBpZnkvc3JjL2V4cG9ydC50cyIsIlNjb3BlL18udHMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMudHMiLCJTVFlMRS50cyIsIlN0eWxlLCByZW1vdmUudHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgJzkuMC4wJzsiLCJ2YXIgZGljdGlvbmFyeSA6e1xuXHQnMCcgOicxJywgJzEnIDonMicsICcyJyA6JzMnLCAnMycgOic0JywgJzQnIDonNScsICc1JyA6JzYnLCAnNicgOic3JywgJzcnIDonOCcsICc4JyA6JzknLCAnOScgOidhJyxcblx0J2EnIDonYicsICdiJyA6J2MnLCAnYycgOidkJywgJ2QnIDonZScsICdlJyA6J2YnLCAnZicgOidnJywgJ2cnIDonaCcsXG5cdCdoJyA6J2knLCAnaScgOidqJywgJ2onIDonaycsICdrJyA6J2wnLCAnbCcgOidtJywgJ20nIDonbicsICduJyA6J28nLFxuXHQnbycgOidwJywgJ3AnIDoncScsICdxJyA6J3InLCAncicgOidzJywgJ3MnIDondCcsICd0JyA6J3UnLFxuXHQndScgOid2JywgJ3YnIDondycsICd3JyA6J3gnLCAneCcgOid5JywgJ3knIDoneicsICd6JyA6JzAnXG59ID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6JywgejogJzAnXG59O1xuXG52YXIgbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMgOigga2V5b2YgdHlwZW9mIGRpY3Rpb25hcnkgKVtdID0gWyc5J107XG52YXIgbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlciA6a2V5b2YgdHlwZW9mIGRpY3Rpb25hcnkgPSAnOSc7XG52YXIgbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4IDpudW1iZXIgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJZGVudGlmaWVyICgpIDpzdHJpbmcge1xuXHRcblx0aWYgKCBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gJzAnO1xuXHRcdGZvciAoIHZhciBjaGFyYWN0ZXJJbmRleCA6bnVtYmVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4OyA7ICkge1xuXHRcdFx0aWYgKCBjaGFyYWN0ZXJJbmRleCApIHtcblx0XHRcdFx0aWYgKCBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1stLWNoYXJhY3RlckluZGV4XT09PSd6JyApIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tjaGFyYWN0ZXJJbmRleF0gPSAnMCc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbY2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tjaGFyYWN0ZXJJbmRleF1dO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0Ly92YXIgaWRlbnRpZmllciA6c3RyaW5nID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMuam9pbignJyk7XG5cdC8vaWYgKCBpc1Jlc2VydmVkV29yZChpZGVudGlmaWVyKSApIHtcblx0Ly9cdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyXTtcblx0Ly9cdHJldHVybiBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVycy5qb2luKCcnKTtcblx0Ly99XG5cdC8vcmV0dXJuIGlkZW50aWZpZXI7XG5cdFxuXHRyZXR1cm4gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMuam9pbignJyk7XG5cdFxufTtcbiIsImV4cG9ydCBkZWZhdWx0ICczLjQuMic7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCA6R3JvdXAgPSBjcmVhdGUobnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyA6c3RyaW5nW10sIHVGbGFnPyA6Ym9vbGVhbiwgbm9Fc2NhcGU/IDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGdyb3VwIDpHcm91cCA9IGNyZWF0ZShudWxsKTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgOkdyb3VwLCBicmFuY2ggOnN0cmluZykgOnZvaWQge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyXSB8fCAoIGdyb3VwW2NoYXJdID0gY3JlYXRlKG51bGwpICksIGJyYW5jaC5zbGljZShjaGFyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCA6R3JvdXAsIGJyYW5jaCA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyIDpzdHJpbmcgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgOkdyb3VwLCBuZWVkRXNjYXBlIDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGJyYW5jaGVzIDpzdHJpbmdbXSA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCA6c3RyaW5nW10gPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggOmJvb2xlYW4gPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzIDpzdHJpbmcgPSBzb3VyY2lmeShncm91cFtjaGFyXSwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcikgKSB7IGNoYXIgPSAnXFxcXCcrY2hhcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG50eXBlIEdyb3VwID0geyBbY2hhciA6c3RyaW5nXSA6R3JvdXAgfTtcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBncm91cGlmeSBmcm9tICcuL2dyb3VwaWZ5JztcblxuZXhwb3J0IHsgdmVyc2lvbiwgZ3JvdXBpZnkgfTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdChncm91cGlmeSwge1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRncm91cGlmeTogZ3JvdXBpZnlcbn0pOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5leHBvcnQgdmFyIF8gOidfJyA9IHR5cGVvZiBTeW1ib2w9PT0nZnVuY3Rpb24nXG5cdD8gU3ltYm9sKCdfJykgYXMgYW55XG5cdDogJ18nO1xuXG5leHBvcnQgZnVuY3Rpb24gJDxUIGV4dGVuZHMgU2NvcGU+ICh0aGlzIDpULCBjc3M/IDpzdHJpbmcsIG1lZGlhPyA6c3RyaW5nKSA6VCB7XG5cdHZhciBzdHlsZSA6SFRNTFN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXNbX10oY3NzKTsgfVxuXHRpZiAoIG1lZGlhIT09dW5kZWZpbmVkICkge1xuXHRcdHN0eWxlLm1lZGlhID0gbWVkaWEgYXMgc3RyaW5nO1xuXHR9XG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IHZhciBwcmVwYXJlXyA6KHNjb3BlIDpTY29wZSkgPT4gdm9pZCA9IHR5cGVvZiBfPT09J3N5bWJvbCdcblx0XG5cdD8gZnVuY3Rpb24gJCAoKSB7fVxuXHRcblx0OiAvKiNfX1BVUkVfXyovIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX2Rlc2NyaXB0b3IgPSBjcmVhdGUobnVsbCk7XG5cdFx0X2Rlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiBfICgpIHt9O1xuXHRcdF9kZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gJCAoc2NvcGUgOlNjb3BlKSB7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eShzY29wZSwgXywgX2Rlc2NyaXB0b3IpO1xuXHRcdH07XG5cdH0oKTtcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vJzsiLCJpbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1ncm91cGlmeSc7XG5cbmltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBwcmV2ZW50RXh0ZW5zaW9ucyBmcm9tICcuT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBfLCAkLCBwcmVwYXJlXyB9IGZyb20gJy4vXyc7XG5cbmV4cG9ydCB2YXIgU0NPUEUgOk9iamVjdFNjb3BlID1cblx0LyojX19QVVJFX18qL1xuXHRmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBjcmVhdGUobnVsbCk7XG5cdFx0ZGVzY3JpcHRvci52YWx1ZSA9ICQ7XG5cdFx0cmV0dXJuIHByZXZlbnRFeHRlbnNpb25zKGRlZmluZVByb3BlcnR5KGNyZWF0ZShudWxsKSwgJyQnLCBkZXNjcmlwdG9yKSk7XG5cdH0oKTtcblxuZXhwb3J0IHZhciBPYmplY3RTY29wZSA9IGZ1bmN0aW9uIE9iamVjdFNjb3BlICh0aGlzIDpPYmplY3RTY29wZSwga2V5cyA6c3RyaW5nW10pIDp2b2lkIHtcblx0cHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG59IGFzIHVua25vd24gYXMge1xuXHRuZXcgKGtleXMgOnN0cmluZ1tdKSA6T2JqZWN0U2NvcGVcbn07XG5leHBvcnQgdHlwZSBPYmplY3RTY29wZSA9IHtcblx0W2tleSA6c3RyaW5nXSA6c3RyaW5nXG59ICYge1xuXHQkIDp0eXBlb2YgJFxuXHRbX10gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuXG5PYmplY3RTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcblxuZXhwb3J0IHZhciBJbmhlcml0ZWRPYmplY3RTY29wZSA9IGZ1bmN0aW9uIEluaGVyaXRlZE9iamVjdFNjb3BlICh0aGlzIDpPYmplY3RTY29wZSwga2V5cyA6c3RyaW5nW10sIHByb3RvIDpPYmplY3RTY29wZSkgOnZvaWQge1xuXHRwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsgLyprZXk9PT0nXycgfHwga2V5PT09JyQnIHx8ICova2V5cy5wdXNoKGtleSk7IH1cblx0dmFyIF9zZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciBfcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0SW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG59IGFzIHVua25vd24gYXMge1xuXHRuZXcgKGtleXMgOnN0cmluZ1tdLCBwcm90byA6T2JqZWN0U2NvcGUpIDpPYmplY3RTY29wZVxufTtcblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzIDpzdHJpbmdbXSkge1xuXHRyZXR1cm4gbmV3IFJlZ0V4cCgnX18nK2dyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSsnX18nLCAnZycpO1xufVxuXG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUgOk9iamVjdFNjb3BlKSB7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BlW19fa2V5X18uc2xpY2UoMiwgLTIpXTsgfTtcbn1cbiIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBPYmplY3RTY29wZSB9IGZyb20gJy4vT2JqZWN0U2NvcGUnO1xuaW1wb3J0IHsgXywgJCB9IGZyb20gJy4vXyc7XG5cbnZhciBTRUFSQ0ggPSAvX19bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKl9fL2lnO1xuXG5leHBvcnQgZGVmYXVsdCBGdW5jdGlvblNjb3BlO1xuZnVuY3Rpb24gRnVuY3Rpb25TY29wZSAoY2FjaGUgOk9iamVjdFNjb3BlKSA6RnVuY3Rpb25TY29wZSB7XG5cdHZhciBzY29wZSA9IGZ1bmN0aW9uIHNjb3BlICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10pIDpzdHJpbmcgeyByZXR1cm4gc2NvcGlmeShhcmd1bWVudHMubGVuZ3RoPT09MSA/IHZhbHVlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDApLCBfc2NvcGUpOyB9IGFzIEZ1bmN0aW9uU2NvcGU7XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS4kID0gJDtcblx0c2NvcGVbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoU0VBUkNILCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBfc2NvcGUoX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdGZ1bmN0aW9uIF9zY29wZSAoa2V5IDpzdHJpbmcpIDpzdHJpbmcgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG50eXBlIEZ1bmN0aW9uU2NvcGUgPSB7XG5cdCguLi5hcmdzIDphbnlbXSkgOnN0cmluZ1xuXHRwcm90b3R5cGUgOk9iamVjdFNjb3BlXG5cdCQgOnR5cGVvZiAkXG5cdFtfXSA6KHN0cmluZyA6c3RyaW5nKSA9PiBzdHJpbmdcbn07XG5cbmZ1bmN0aW9uIHNjb3BpZnkgKHZhbHVlIDpzdHJpbmcgfCBvYmplY3QgfCBhbnlbXSwgX3Njb3BlIDooa2V5IDpzdHJpbmcpID0+IHN0cmluZykgOnN0cmluZyB7XG5cdHZhciBrZXlzIDpzdHJpbmcsXG5cdFx0aW5kZXggOm51bWJlcixcblx0XHR2YWx1ZXMgOnN0cmluZ1tdLFxuXHRcdGtleSA6c3RyaW5nO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPT09IC0xICkge1xuXHRcdFx0XHRcdHJldHVybiBfc2NvcGUodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVtpbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IF9zY29wZShrZXkpKycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZS5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gc2NvcGlmeSh2YWx1ZVtpbmRleF0sIF9zY29wZSk7XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IGtleSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICg8eyBba2V5IDpzdHJpbmddIDphbnkgfT52YWx1ZSlba2V5XSApIHsga2V5cyArPSAnICcrX3Njb3BlKGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5cbmltcG9ydCB7IE9iamVjdFNjb3BlLCBJbmhlcml0ZWRPYmplY3RTY29wZSwgU0NPUEUgfSBmcm9tICcuL09iamVjdFNjb3BlJztcbmltcG9ydCBGdW5jdGlvblNjb3BlIGZyb20gJy4vRnVuY3Rpb25TY29wZSc7XG5cbmV4cG9ydCB2YXIgS0VZUyA9IC9bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKi9pZztcbnZhciBFTVBUWSA6c3RyaW5nW10gPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgU2NvcGU7XG50eXBlIFNjb3BlID0gT2JqZWN0U2NvcGUgfCBGdW5jdGlvblNjb3BlO1xuZnVuY3Rpb24gU2NvcGUgKHRoaXMgOlNjb3BlW10gfCBTY29wZSB8IGFueSwga2V5cz8gOnN0cmluZykgOlNjb3BlIHtcblx0aWYgKCB0eXBlb2Yga2V5cz09PSdzdHJpbmcnICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSBtaXgodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUobWl4KHRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0aGlzIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSkpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZShTQ09QRSkpOyB9XG5cdH1cbn1cblxuZnVuY3Rpb24gbWl4IChwcm90b3MgOlNjb3BlW10pIDpPYmplY3RTY29wZSB7XG5cdHZhciBzY29wZSA6T2JqZWN0U2NvcGUgPSBjcmVhdGUoU0NPUEUpO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBwcm90b3MubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgcHJvdG8gOlNjb3BlID0gcHJvdG9zW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiBwcm90bz09PSdmdW5jdGlvbicgKSB7IHByb3RvID0gcHJvdG8ucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG4iLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG5leHBvcnQgZnVuY3Rpb24gVGVtcGxhdGUgKGh0bWwgOnN0cmluZywgc2NvcGUgOlNjb3BlKSA6c3RyaW5nIHtcblx0cmV0dXJuIHNjb3BlW19dKGh0bWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVuZGVyIChjb2RlIDpzdHJpbmcsIHNjb3BlPyA6U2NvcGUpIDpGdW5jdGlvbiB7XG5cdHJldHVybiBGdW5jdGlvbihcblx0XHQnXCJ1c2Ugc3RyaWN0XCI7dmFyIF92bT10aGlzLF9oPV92bS4kY3JlYXRlRWxlbWVudCxfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiAnK1xuXHRcdCggc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUgKVxuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3RhdGljUmVuZGVyRm5zIChjb2RlcyA6c3RyaW5nW10sIHNjb3BlPyA6U2NvcGUpIDpGdW5jdGlvbltdIHtcblx0aWYgKCBzY29wZSApIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggPSBjb2Rlcy5sZW5ndGgsIHNjb3BlXyA9IHNjb3BlW19dOyBpbmRleC0tOyApIHtcblx0XHRcdGNvZGVzW2luZGV4XSA9IHNjb3BlXyhjb2Rlc1tpbmRleF0pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gRnVuY3Rpb24oXG5cdFx0J1widXNlIHN0cmljdFwiO3JldHVybltmdW5jdGlvbigpe3ZhciBfdm09dGhpcyxfaD1fdm0uJGNyZWF0ZUVsZW1lbnQsX2M9X3ZtLl9zZWxmLl9jfHxfaDtyZXR1cm4gJytcblx0XHRjb2Rlcy5qb2luKCd9LGZ1bmN0aW9uKCl7dmFyIF92bT10aGlzLF9oPV92bS4kY3JlYXRlRWxlbWVudCxfYz1fdm0uX3NlbGYuX2N8fF9oO3JldHVybiAnKStcblx0XHQnfV0nXG5cdCkoKTtcbn1cbiIsImltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUobnVsbCwge1xuXHRmdW5jdGlvbmFsOiB7XG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHR2YWx1ZTpcblx0XHRcdHRydWVcblx0fSxcblx0cmVuZGVyOiB7XG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHR2YWx1ZTpcblx0XHRcdGZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCA6RnVuY3Rpb24sIGNvbnRleHQgOk5vbk51bGxhYmxlPGFueT4pIHtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywgY29udGV4dC5kYXRhLCBjb250ZXh0LmNoaWxkcmVuKTtcblx0XHRcdH1cblx0fVxufSk7XG4iLCJpbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5oZWFkJztcblxuaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG5leHBvcnQgZnVuY3Rpb24gU3R5bGUgKGNzcz8gOnN0cmluZywgc2NvcGU/IDpTY29wZSkgOkhUTUxTdHlsZUVsZW1lbnQge1xuXHR2YXIgc3R5bGUgOkhUTUxTdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlW19dKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSA6SFRNTFN0eWxlRWxlbWVudCkgOnR5cGVvZiByZW1vdmUge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uL3ZlcnNpb24/dGV4dCc7XG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmltcG9ydCB7IFRlbXBsYXRlLCBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyB9IGZyb20gJy4vVGVtcGxhdGUsIFJlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmltcG9ydCBTVFlMRSAgZnJvbSAnLi9TVFlMRSc7XG5pbXBvcnQgeyBTdHlsZSwgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0SWRlbnRpZmllcixcblx0U2NvcGUsXG5cdFRlbXBsYXRlLCBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyxcblx0U1RZTEUsXG5cdFN0eWxlLCByZW1vdmUsXG59O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KG51bGwsIHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0SWRlbnRpZmllcjogSWRlbnRpZmllcixcblx0U2NvcGU6IFNjb3BlLFxuXHRUZW1wbGF0ZTogVGVtcGxhdGUsXG5cdFJlbmRlcjogUmVuZGVyLFxuXHRTdGF0aWNSZW5kZXJGbnM6IFN0YXRpY1JlbmRlckZucyxcblx0U1RZTEU6IFNUWUxFLFxuXHRTdHlsZTogU3R5bGUsXG5cdHJlbW92ZTogcmVtb3ZlXG59KTsiXSwibmFtZXMiOlsidmVyc2lvbiIsInVuZGVmaW5lZCIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWUsT0FBTzs7QUNBdEIsSUFBSSxVQUFVLEdBTVY7SUFDSCxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztJQUM5RSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztJQUN0RCxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztJQUN0RCxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7SUFDOUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0NBQzlDLENBQUM7QUFFRixJQUFJLDBCQUEwQixH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QUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDcEM7S0FDRDtJQUNELE9BQU8sUUFBUSxDQUNkLCtGQUErRjtRQUMvRixLQUFLLENBQUMsSUFBSSxDQUFDLDZFQUE2RSxDQUFDO1FBQ3pGLElBQUksQ0FDSixFQUFFLENBQUM7Q0FDSjs7QUN6QkQsWUFBZSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtJQUNsQyxVQUFVLEVBQUU7UUFDWCxZQUFZLEVBQUUsS0FBSztRQUNuQixVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFDSixJQUFJO0tBQ0w7SUFDRCxNQUFNLEVBQUU7UUFDUCxZQUFZLEVBQUUsS0FBSztRQUNuQixVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFDSixTQUFTLE1BQU0sQ0FBRSxhQUF1QixFQUFFLE9BQXlCO1lBQ2xFLE9BQU8sYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5RDtLQUNGO0NBQ0QsQ0FBQyxDQUFDOztTQ2JhLEtBQUssQ0FBRSxHQUFZLEVBQUUsS0FBYTtJQUNqRCxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5RCxJQUFLLEdBQUcsRUFBRztRQUFFLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7S0FBRTtJQUMvRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDL0I7QUFFRCxTQUFnQixNQUFNLENBQUUsS0FBdUI7SUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixPQUFPLE1BQU0sQ0FBQztDQUNkOztBQ0VELGdCQUFlLE9BQU8sQ0FBQyxJQUFJLEVBQUU7SUFDNUIsT0FBTyxFQUFFLE9BQU87SUFDaEIsVUFBVSxFQUFFLFVBQVU7SUFDdEIsS0FBSyxFQUFFLEtBQUs7SUFDWixRQUFRLEVBQUUsUUFBUTtJQUNsQixNQUFNLEVBQUUsTUFBTTtJQUNkLGVBQWUsRUFBRSxlQUFlO0lBQ2hDLEtBQUssRUFBRSxLQUFLO0lBQ1osS0FBSyxFQUFFLEtBQUs7SUFDWixNQUFNLEVBQUUsTUFBTTtDQUNkLENBQUMsQ0FBQzs7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvRnJvbnRFbmRSdW50aW1lRGVwZW5kZW5jeS8ifQ==