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

import isArray from '.Array.isArray';
import create$1 from '.Object.create';
import undefined$1 from '.undefined';
import create from '.Object.create?=';
import Default from '.default';
import RegExp from '.RegExp';
import PropertyDescriptor from '.null.PropertyDescriptor';
import preventExtensions from '.Object.preventExtensions';
import defineProperty from '.Object.defineProperty';
import document from '.document';
import head from '.document.head';
import slice from '.Array.prototype.slice';
import Function from '.Function';

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
var SCOPE = ObjectScope.prototype = /*#__PURE__*/ preventExtensions(create$1(null, { $: PropertyDescriptor($, false, false, false) }));
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
function Scope(keys) {
    if (keys === undefined$1) {
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
var STYLE = create$1(null, {
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

var _export$1 = Default({
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy92ZXJzaW9uP3RleHQiLCIuLi8uLi8uLi9qLWdyb3VwaWZ5L3NyYy9ncm91cGlmeS50cyIsIi4uLy4uLy4uL2otZ3JvdXBpZnkvc3JjL2V4cG9ydC50cyIsIlNjb3BlL18udHMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZS50cyIsIlJlbmRlciwgU3RhdGljUmVuZGVyRm5zLnRzIiwiU1RZTEUudHMiLCJTdHlsZSwgcmVtb3ZlLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICc5LjAuOCc7IiwidmFyIGluY3JlYXNlRGljdGlvbmFyeSA6eyBbY2hhcmFjdGVyIGluICcwJyB8IENoYXJhY3Rlcl0gOkNoYXJhY3RlciB8ICd6JyB9ID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBsYXRlc3RJZGVudGlmaWVyIDooICcwJyB8IENoYXJhY3RlciB8ICd6JyApW10gPSBbICc5JyBdO1xudmFyIGxhc3RDaGFyYWN0ZXIgOicwJyB8IENoYXJhY3RlciB8ICd6JyA9ICc5JztcbnZhciBsYXN0SW5kZXggOm51bWJlciA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIElkZW50aWZpZXIgKCkgOnN0cmluZyB7XG5cdFxuXHRpZiAoIGxhc3RDaGFyYWN0ZXI9PT0neicgKSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggOm51bWJlciA9IGxhc3RJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdHZhciBjaGFyYWN0ZXIgOicwJyB8IENoYXJhY3RlciB8ICd6JyA9IGxhdGVzdElkZW50aWZpZXJbLS1jaGFyYWN0ZXJJbmRleF07XG5cdFx0XHRcdGlmICggY2hhcmFjdGVyPT09J3onICkgeyBsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyW2NoYXJhY3RlckluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtjaGFyYWN0ZXJdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllci51bnNoaWZ0KCdhJyk7XG5cdFx0XHRcdCsrbGFzdEluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJbbGFzdEluZGV4XSA9IGluY3JlYXNlRGljdGlvbmFyeVtsYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0Ly92YXIgaWRlbnRpZmllciA6c3RyaW5nID0gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTtcblx0Ly9pZiAoIGlzUmVzZXJ2ZWRXb3JkKGlkZW50aWZpZXIpICkgeyBsYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllcltsYXN0SW5kZXhdID0gaW5jcmVhc2VEaWN0aW9uYXJ5W2xhc3RDaGFyYWN0ZXJdOyByZXR1cm4gbGF0ZXN0SWRlbnRpZmllci5qb2luKCcnKTsgfVxuXHQvL3JldHVybiBpZGVudGlmaWVyO1xuXHRcblx0cmV0dXJuIGxhdGVzdElkZW50aWZpZXIuam9pbignJyk7XG5cdFxufTtcblxudHlwZSBDaGFyYWN0ZXIgPSAnMScgfCAnMicgfCAnMycgfCAnNCcgfCAnNScgfCAnNicgfCAnNycgfCAnOCcgfCAnOScgfCAnYScgfCAnYicgfCAnYycgfCAnZCcgfCAnZScgfCAnZicgfCAnZycgfCAnaCcgfCAnaScgfCAnaicgfCAnaycgfCAnbCcgfCAnbScgfCAnbicgfCAnbycgfCAncCcgfCAncScgfCAncicgfCAncycgfCAndCcgfCAndScgfCAndicgfCAndycgfCAneCcgfCAneSc7IiwiZXhwb3J0IGRlZmF1bHQgJzMuNC4yJzsiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQIDpHcm91cCA9IGNyZWF0ZShudWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzIDpzdHJpbmdbXSwgdUZsYWc/IDpib29sZWFuLCBub0VzY2FwZT8gOmJvb2xlYW4pIDpzdHJpbmcge1xuXHR2YXIgZ3JvdXAgOkdyb3VwID0gY3JlYXRlKG51bGwpO1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCA6R3JvdXAsIGJyYW5jaCA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyIDpzdHJpbmcgPSBTVVJST0dBVEVfUEFJUi50ZXN0KGJyYW5jaCkgPyBicmFuY2guc2xpY2UoMCwgMikgOiBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZFBvaW50QnJhbmNoKGdyb3VwW2NoYXJdIHx8ICggZ3JvdXBbY2hhcl0gPSBjcmVhdGUobnVsbCkgKSwgYnJhbmNoLnNsaWNlKGNoYXIubGVuZ3RoKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwIDpHcm91cCwgYnJhbmNoIDpzdHJpbmcpIDp2b2lkIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXIgOnN0cmluZyA9IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kQ29kZUJyYW5jaChncm91cFtjaGFyXSB8fCAoIGdyb3VwW2NoYXJdID0gY3JlYXRlKG51bGwpICksIGJyYW5jaC5zbGljZSgxKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIHNvdXJjaWZ5IChncm91cCA6R3JvdXAsIG5lZWRFc2NhcGUgOmJvb2xlYW4pIDpzdHJpbmcge1xuXHR2YXIgYnJhbmNoZXMgOnN0cmluZ1tdID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoIDpzdHJpbmdbXSA9IFtdO1xuXHR2YXIgbm9FbXB0eUJyYW5jaCA6Ym9vbGVhbiA9IHRydWU7XG5cdGZvciAoIHZhciBjaGFyIGluIGdyb3VwICkge1xuXHRcdGlmICggY2hhciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgOnN0cmluZyA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJdLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyKSApIHsgY2hhciA9ICdcXFxcJytjaGFyOyB9XG5cdFx0XHRzdWJfYnJhbmNoZXMgPyBicmFuY2hlcy5wdXNoKGNoYXIrc3ViX2JyYW5jaGVzKSA6IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gucHVzaChjaGFyKTtcblx0XHR9XG5cdFx0ZWxzZSB7IG5vRW1wdHlCcmFuY2ggPSBmYWxzZTsgfVxuXHR9XG5cdHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoICYmIGJyYW5jaGVzLnVuc2hpZnQoc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGg9PT0xID8gc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaFswXSA6ICdbJytzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmpvaW4oJycpKyddJyk7XG5cdHJldHVybiBicmFuY2hlcy5sZW5ndGg9PT0wXG5cdFx0PyAnJ1xuXHRcdDogKCBicmFuY2hlcy5sZW5ndGg9PT0xICYmICggc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggfHwgbm9FbXB0eUJyYW5jaCApXG5cdFx0XHQ/IGJyYW5jaGVzWzBdXG5cdFx0XHQ6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSdcblx0XHQpXG5cdFx0Kyggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbnR5cGUgR3JvdXAgPSB7IFtjaGFyIDpzdHJpbmddIDpHcm91cCB9O1xuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IGdyb3VwaWZ5IGZyb20gJy4vZ3JvdXBpZnknO1xuXG5leHBvcnQgeyB2ZXJzaW9uLCBncm91cGlmeSB9O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KGdyb3VwaWZ5LCB7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdGdyb3VwaWZ5OiBncm91cGlmeVxufSk7IiwiaW1wb3J0IFByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcubnVsbC5Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG52YXIgXyA6J18nID0gdHlwZW9mIFN5bWJvbD09PSdmdW5jdGlvbidcblx0PyBTeW1ib2woJ18nKSBhcyBhbnlcblx0OiAnXyc7XG5cbmZ1bmN0aW9uICQ8VCBleHRlbmRzIFNjb3BlPiAodGhpcyA6VCwgY3NzPyA6c3RyaW5nLCBtZWRpYT8gOnN0cmluZykgOlQge1xuXHR2YXIgc3R5bGUgOkhUTUxTdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSB0aGlzW19dKGNzcyk7IH1cblx0aWYgKCBtZWRpYSE9PXVuZGVmaW5lZCApIHtcblx0XHRzdHlsZS5tZWRpYSA9IG1lZGlhIGFzIHN0cmluZztcblx0fVxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHRoaXM7XG59XG5cbnZhciBwcmVwYXJlXyA6KHNjb3BlIDpTY29wZSkgPT4gdm9pZCA9IHR5cGVvZiBfPT09J3N5bWJvbCdcblx0XG5cdD8gZnVuY3Rpb24gJCAoKSB7fVxuXHRcblx0OiAvKiNfX1BVUkVfXyovIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX2Rlc2NyaXB0b3IgPSBQcm9wZXJ0eURlc2NyaXB0b3IoZnVuY3Rpb24gXyAoKSB7fSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gJCAoc2NvcGUgOlNjb3BlKSB7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eShzY29wZSwgXywgX2Rlc2NyaXB0b3IpO1xuXHRcdH07XG5cdH0oKTtcblxuZXhwb3J0IHsgXywgJCwgcHJlcGFyZV8gfTtcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vJzsiLCJpbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1ncm91cGlmeSc7XG5cbmltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBQcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLm51bGwuUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBwcmV2ZW50RXh0ZW5zaW9ucyBmcm9tICcuT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zJztcblxuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi4vSWRlbnRpZmllcic7XG5pbXBvcnQgeyBfLCAkLCBwcmVwYXJlXyB9IGZyb20gJy4vXyc7XG5cbmZ1bmN0aW9uIFNlYXJjaCAoa2V5cyA6c3RyaW5nW10pIHtcblx0cmV0dXJuIG5ldyBSZWdFeHAoJ19fJytncm91cGlmeShrZXlzLCBmYWxzZSwgdHJ1ZSkrJ19fJywgJ2cnKTtcbn1cblxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlIDpPYmplY3RTY29wZSkge1xuXHRyZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07XG59XG5cbnR5cGUgT2JqZWN0U2NvcGUgPSB7XG5cdFtrZXkgOnN0cmluZ10gOnN0cmluZ1xufSAmIHtcblx0JCA6dHlwZW9mICRcblx0W19dIDooc3RyaW5nIDpzdHJpbmcpID0+IHN0cmluZ1xufTtcblxudmFyIE9iamVjdFNjb3BlID0gZnVuY3Rpb24gT2JqZWN0U2NvcGUgKHRoaXMgOk9iamVjdFNjb3BlLCBrZXlzIDpzdHJpbmdbXSkgOnZvaWQge1xuXHRwcmVwYXJlXyh0aGlzKTtcblx0dGhpc1tfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShfc2VhcmNoLCBfcmVwbGFjZXIpOyB9O1xuXHR2YXIgX3NlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIF9yZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn0gYXMgdW5rbm93biBhcyB7XG5cdG5ldyAoa2V5cyA6c3RyaW5nW10pIDpPYmplY3RTY29wZVxufTtcblxudmFyIFNDT1BFIDpPYmplY3RTY29wZSA9XG5cdE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IC8qI19fUFVSRV9fKi9wcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUobnVsbCwgeyAkOiBQcm9wZXJ0eURlc2NyaXB0b3IoJCwgZmFsc2UsIGZhbHNlLCBmYWxzZSkgfSkpO1xuXG52YXIgSW5oZXJpdGVkT2JqZWN0U2NvcGUgPSBmdW5jdGlvbiBJbmhlcml0ZWRPYmplY3RTY29wZSAodGhpcyA6T2JqZWN0U2NvcGUsIGtleXMgOnN0cmluZ1tdLCBwcm90byA6T2JqZWN0U2NvcGUpIDp2b2lkIHtcblx0cHJlcGFyZV8odGhpcyk7XG5cdHRoaXNbX10gPSBmdW5jdGlvbiBfIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3NlYXJjaCwgX3JlcGxhY2VyKTsgfTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG5cdGZvciAoIHZhciBrZXkgaW4gcHJvdG8gKSB7IC8qa2V5PT09J18nIHx8IGtleT09PSckJyB8fCAqL2tleXMucHVzaChrZXkpOyB9XG5cdHZhciBfc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgX3JlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xufSBhcyB1bmtub3duIGFzIHtcblx0bmV3IChrZXlzIDpzdHJpbmdbXSwgcHJvdG8gOk9iamVjdFNjb3BlKSA6T2JqZWN0U2NvcGVcbn07XG5cbmV4cG9ydCB7IE9iamVjdFNjb3BlLCBTQ09QRSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUgfTsiLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgc2xpY2UgZnJvbSAnLkFycmF5LnByb3RvdHlwZS5zbGljZSc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgT2JqZWN0U2NvcGUgfSBmcm9tICcuL09iamVjdFNjb3BlJztcbmltcG9ydCB7IF8sICQgfSBmcm9tICcuL18nO1xuXG52YXIgU0VBUkNIID0gL19fW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSpfXy9pZztcblxuZnVuY3Rpb24gc2NvcGlmeSAodmFsdWUgOnN0cmluZyB8IG9iamVjdCB8IGFueVtdLCBfc2NvcGUgOihrZXkgOnN0cmluZykgPT4gc3RyaW5nKSA6c3RyaW5nIHtcblx0dmFyIGtleXMgOnN0cmluZyxcblx0XHRpbmRleCA6bnVtYmVyLFxuXHRcdHZhbHVlcyA6c3RyaW5nW10sXG5cdFx0a2V5IDpzdHJpbmc7XG5cdGlmICggdmFsdWUgKSB7XG5cdFx0c3dpdGNoICggdHlwZW9mIHZhbHVlICkge1xuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0aWYgKCB2YWx1ZS5pbmRleE9mKCcgJyk8MCApIHtcblx0XHRcdFx0XHRyZXR1cm4gX3Njb3BlKHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWUuc3BsaXQoJyAnKTtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlcy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gdmFsdWVbaW5kZXhdO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBfc2NvcGUoa2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHNjb3BpZnkodmFsdWVbaW5kZXhdLCBfc2NvcGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIHZhbHVlIGFzIHsgW2tleSA6c3RyaW5nXSA6YW55IH0gKVtrZXldICkgeyBrZXlzICs9ICcgJytfc2NvcGUoa2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxudHlwZSBGdW5jdGlvblNjb3BlID0ge1xuXHQoLi4uYXJncyA6YW55W10pIDpzdHJpbmdcblx0cHJvdG90eXBlIDpPYmplY3RTY29wZVxuXHQkIDp0eXBlb2YgJFxuXHRbX10gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuXG5mdW5jdGlvbiBGdW5jdGlvblNjb3BlIChjYWNoZSA6T2JqZWN0U2NvcGUpIDpGdW5jdGlvblNjb3BlIHtcblx0dmFyIHNjb3BlID0gZnVuY3Rpb24gc2NvcGUgKHZhbHVlIDpzdHJpbmcgfCBvYmplY3QgfCBhbnlbXSkgOnN0cmluZyB7IHJldHVybiBzY29waWZ5KGFyZ3VtZW50cy5sZW5ndGg9PT0xID8gdmFsdWUgOiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCksIF9zY29wZSk7IH0gYXMgRnVuY3Rpb25TY29wZTtcblx0c2NvcGUucHJvdG90eXBlID0gY2FjaGU7XG5cdHNjb3BlLiQgPSAkO1xuXHRzY29wZVtfXSA9IGZ1bmN0aW9uIF8gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIF9zY29wZShfX2tleV9fLnNsaWNlKDIsIC0yKSk7IH1cblx0ZnVuY3Rpb24gX3Njb3BlIChrZXkgOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBjYWNoZVtrZXldIHx8ICggY2FjaGVba2V5XSA9IElkZW50aWZpZXIoKSApOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZXhwb3J0IHsgRnVuY3Rpb25TY29wZSBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuXG5pbXBvcnQgeyBPYmplY3RTY29wZSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9PYmplY3RTY29wZSc7XG5pbXBvcnQgRnVuY3Rpb25TY29wZSBmcm9tICcuL0Z1bmN0aW9uU2NvcGUnO1xuXG52YXIgS0VZUyA9IC9bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKi9pZztcbnZhciBFTVBUWSA6c3RyaW5nW10gPSBbXTtcblxuZnVuY3Rpb24gbWl4IChwcm90b3MgOlNjb3BlW10pIDpPYmplY3RTY29wZSB7XG5cdHZhciBzY29wZSA6T2JqZWN0U2NvcGUgPSBjcmVhdGUoU0NPUEUpO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBwcm90b3MubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgcHJvdG8gOlNjb3BlID0gcHJvdG9zW2luZGV4XTtcblx0XHRpZiAoIHR5cGVvZiBwcm90bz09PSdmdW5jdGlvbicgKSB7IHByb3RvID0gcHJvdG8ucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbnR5cGUgU2NvcGUgPSBPYmplY3RTY29wZSB8IEZ1bmN0aW9uU2NvcGU7XG5cbmZ1bmN0aW9uIFNjb3BlICh0aGlzIDpTY29wZVtdIHwgU2NvcGUgfCBhbnksIGtleXM/IDpzdHJpbmcpIDpTY29wZSB7XG5cdGlmICgga2V5cz09PXVuZGVmaW5lZCApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKG1peCh0aGlzIGFzIFNjb3BlW10pKTsgfVxuXHRcdGVsc2UgaWYgKCB0aGlzIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZSh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZSh0aGlzLnByb3RvdHlwZSkpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZShTQ09QRSkpOyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IG1peCh0aGlzIGFzIFNjb3BlW10pKTsgfVxuXHRcdGVsc2UgaWYgKCB0aGlzIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gdGhpcyk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGUpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBuZXcgT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSk7IH1cblx0fVxufVxuXG5leHBvcnQgeyBTY29wZSBhcyBkZWZhdWx0LCBLRVlTIH07IiwiaW1wb3J0IHsgXyB9IGZyb20gJy4vU2NvcGUvXyc7XG5cbmZ1bmN0aW9uIFRlbXBsYXRlIChodG1sIDpzdHJpbmcsIHNjb3BlIDpTY29wZSkgOnN0cmluZyB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIHNjb3BlW19dKGh0bWwpO1xufVxuXG5leHBvcnQgeyBUZW1wbGF0ZSBhcyBkZWZhdWx0IH07XG5cbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7IiwiaW1wb3J0IEZ1bmN0aW9uIGZyb20gJy5GdW5jdGlvbic7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcblxuZnVuY3Rpb24gQm9keSAoYm9keSA6c3RyaW5nKSA6c3RyaW5nIHtcblx0dmFyIGluZGV4ID0gYm9keS5pbmRleE9mKCcsJyk7XG5cdHJldHVybiAndmFyICcrYm9keS5zbGljZSgwLCBpbmRleCkrJz10aGlzJytib2R5LnNsaWNlKGluZGV4LCBib2R5LmluZGV4T2YoJygnLCBpbmRleCkpKyc9dGhpcy5fc2VsZi5fY3x8dGhpcy4kY3JlYXRlRWxlbWVudDtyZXR1cm4gJytib2R5LnNsaWNlKGluZGV4KzEpO1xufVxuXG50eXBlIFJlbmRlciA9IDxDcmVhdGVFbGVtZW50IGV4dGVuZHMgKC4uLmFyZ3MgOmFueVtdKSA9PiBhbnk+IChjcmVhdGVFbGVtZW50IDpDcmVhdGVFbGVtZW50KSA9PiBSZXR1cm5UeXBlPENyZWF0ZUVsZW1lbnQ+O1xuXG5mdW5jdGlvbiBSZW5kZXIgKGNvZGUgOnN0cmluZywgc2NvcGU/IDpTY29wZSkgOlJlbmRlciB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjsnK0JvZHkoc2NvcGUgPyBzY29wZVtfXShjb2RlKSA6IGNvZGUpKSBhcyBSZW5kZXI7XG59XG5cbmZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgOnN0cmluZ1tdLCBzY29wZT8gOlNjb3BlKSA6UmVuZGVyW10ge1xuXHR2YXIgaW5kZXggPSBjb2Rlcy5sZW5ndGg7XG5cdGlmICggc2NvcGUgKSB7IGZvciAoIHZhciBzY29wZV8gPSBzY29wZVtfXTsgaW5kZXgtLTsgKSB7IGNvZGVzW2luZGV4XSA9IEJvZHkoc2NvcGVfKGNvZGVzW2luZGV4XSkpOyB9IH1cblx0ZWxzZSB7IHdoaWxlICggaW5kZXgtLSApIHsgY29kZXNbaW5kZXhdID0gQm9keShjb2Rlc1tpbmRleF0pOyB9IH1cblx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjtyZXR1cm5bZnVuY3Rpb24oKXsnK2NvZGVzLmpvaW4oJ30sZnVuY3Rpb24oKXsnKSsnfV0nKSgpO1xufVxuXG5leHBvcnQgeyBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyB9OyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IFByb3BlcnR5RGVzY3JpcHRvciBmcm9tICcubnVsbC5Qcm9wZXJ0eURlc2NyaXB0b3InO1xuXG5mdW5jdGlvbiByZW5kZXIgKGNyZWF0ZUVsZW1lbnQgOiguLi5hcmdzIDphbnlbXSkgPT4gYW55LCBjb250ZXh0IDp7IGRhdGEgOmFueSwgY2hpbGRyZW4gOmFueSB9KSB7XG5cdHJldHVybiBjcmVhdGVFbGVtZW50KCdzdHlsZScsIGNvbnRleHQuZGF0YSwgY29udGV4dC5jaGlsZHJlbik7XG59XG5cbnZhciBTVFlMRSA6eyByZW5kZXIgOlJlbmRlciwgZnVuY3Rpb25hbCA6dHJ1ZSB9ID0gY3JlYXRlKG51bGwsIHtcblx0cmVuZGVyOiBQcm9wZXJ0eURlc2NyaXB0b3IocmVuZGVyLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpLFxuXHRmdW5jdGlvbmFsOiBQcm9wZXJ0eURlc2NyaXB0b3IodHJ1ZSwgZmFsc2UsIHRydWUsIGZhbHNlKVxufSk7XG5cbmV4cG9ydCB7IFNUWUxFIGFzIGRlZmF1bHQgfTtcblxuaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSAnLi9SZW5kZXIsIFN0YXRpY1JlbmRlckZucyc7IiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuaGVhZCc7XG5cbmltcG9ydCB7IF8gfSBmcm9tICcuL1Njb3BlL18nO1xuXG5mdW5jdGlvbiBTdHlsZSAoY3NzPyA6c3RyaW5nLCBzY29wZT8gOlNjb3BlKSA6SFRNTFN0eWxlRWxlbWVudCB7XG5cdHZhciBzdHlsZSA6SFRNTFN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkgeyBzdHlsZS50ZXh0Q29udGVudCA9IHNjb3BlID8gc2NvcGVbX10oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoc3R5bGUgOkhUTUxTdHlsZUVsZW1lbnQpIDp0eXBlb2YgcmVtb3ZlIHtcblx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZSk7XG5cdHJldHVybiByZW1vdmU7XG59XG5cbmV4cG9ydCB7IFN0eWxlLCByZW1vdmUgfTtcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJzsiLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuLi92ZXJzaW9uP3RleHQnO1xuaW1wb3J0IElkZW50aWZpZXIgZnJvbSAnLi9JZGVudGlmaWVyJztcbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlLyc7XG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnLi9UZW1wbGF0ZSc7XG5pbXBvcnQgeyBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyB9IGZyb20gJy4vUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnO1xuaW1wb3J0IFNUWUxFICBmcm9tICcuL1NUWUxFJztcbmltcG9ydCB7IFN0eWxlLCByZW1vdmUgfSBmcm9tICcuL1N0eWxlLCByZW1vdmUnO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRJZGVudGlmaWVyLFxuXHRTY29wZSxcblx0VGVtcGxhdGUsXG5cdFJlbmRlciwgU3RhdGljUmVuZGVyRm5zLFxuXHRTVFlMRSxcblx0U3R5bGUsIHJlbW92ZSxcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRJZGVudGlmaWVyOiBJZGVudGlmaWVyLFxuXHRTY29wZTogU2NvcGUsXG5cdFRlbXBsYXRlOiBUZW1wbGF0ZSxcblx0UmVuZGVyOiBSZW5kZXIsXG5cdFN0YXRpY1JlbmRlckZuczogU3RhdGljUmVuZGVyRm5zLFxuXHRTVFlMRTogU1RZTEUsXG5cdFN0eWxlOiBTdHlsZSxcblx0cmVtb3ZlOiByZW1vdmVcbn0pOyJdLCJuYW1lcyI6WyJ2ZXJzaW9uIiwidW5kZWZpbmVkIiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBZSxPQUFPOztB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QUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFO0tBQUU7U0FDbEc7UUFBRSxPQUFRLEtBQUssRUFBRSxFQUFHO1lBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUFFO0tBQUU7SUFDakUsT0FBTyxRQUFRLENBQUMsaUNBQWlDLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0NBQ3RGOztBQ2xCRCxTQUFTLE1BQU0sQ0FBRSxhQUFzQyxFQUFFLE9BQXFDO0lBQzdGLE9BQU8sYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUM5RDtBQUVELElBQUksS0FBSyxHQUF5Q0EsUUFBTSxDQUFDLElBQUksRUFBRTtJQUM5RCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO0lBQ3RELFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7Q0FDeEQsQ0FBQzs7QUNMRixTQUFTLEtBQUssQ0FBRSxHQUFZLEVBQUUsS0FBYTtJQUMxQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5RCxJQUFLLEdBQUcsRUFBRztRQUFFLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7S0FBRTtJQUMvRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDL0I7QUFFRCxTQUFTLE1BQU0sQ0FBRSxLQUF1QjtJQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLE9BQU8sTUFBTSxDQUFDO0NBQ2Q7O0FDS0QsZ0JBQWUsT0FBTyxDQUFDO0lBQ3RCLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLFVBQVUsRUFBRSxVQUFVO0lBQ3RCLEtBQUssRUFBRSxLQUFLO0lBQ1osUUFBUSxFQUFFLFFBQVE7SUFDbEIsTUFBTSxFQUFFLE1BQU07SUFDZCxlQUFlLEVBQUUsZUFBZTtJQUNoQyxLQUFLLEVBQUUsS0FBSztJQUNaLEtBQUssRUFBRSxLQUFLO0lBQ1osTUFBTSxFQUFFLE1BQU07Q0FDZCxDQUFDLENBQUM7Ozs7Ozs7OzsiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjL0Zyb250RW5kUnVudGltZURlcGVuZGVuY3kvIn0=