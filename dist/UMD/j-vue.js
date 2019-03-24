﻿/*!
 * 模块名称：jVue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified dependency for built .vue files. Belong to "Plan J".
 * 模块版本：8.8.0
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

    var version = '8.8.0';

    var dictionary = {
        0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'a',
        a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
        h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
        o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
        u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
    };
    var latestIdentifierCharacters = ['9'];
    var latestIdentifierCharacters_lastCharacter = '9';
    var latestIdentifierCharacters_lastCharacterIndex = 0;
    //var RESERVED_KEY :RegExp = /^(?:break|c(?:a(?:se|tch)|lass|on(?:st|tinue))|d(?:e(?:bugger|fault|lete)|o)|e(?:lse|num|x(?:port|tends))|f(?:inally|or|unction)|i(?:f|mport|n(?:stanceof)?)|new|return|s(?:witch|super)|t(?:ry|ypeof)|v(?:ar|oid)|w(?:hile|ith))$/;
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
        //if ( RESERVED_KEY.test(identifier) ) {
        //	latestIdentifierCharacters_lastCharacter = latestIdentifierCharacters[latestIdentifierCharacters_lastCharacterIndex] = dictionary[latestIdentifierCharacters_lastCharacter];
        //	return latestIdentifierCharacters.join('');
        //}
        //return identifier;
        return latestIdentifierCharacters.join('');
    }

    /*!
     * 模块名称：@ltd/j-groupify
     * 模块功能：将一个字符串数组，转化为分支式优化后的正则表达式匹配组。
       　　　　　Transform a string array into a branch-style optimized regExp group.
     * 模块版本：3.2.1
     * 许可条款：LGPL-3.0
     * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
     * 问题反馈：https://GitHub.com/LongTengDao/j-groupify/issues
     * 项目主页：https://GitHub.com/LongTengDao/j-groupify/
     */

    function appendPointBranch(group, key) {
        if (key) {
            var one = key.codePointAt(0) === key.charCodeAt(0);
            var char = one ? key[0] : key.slice(0, 2);
            var index = group.k.indexOf(char);
            if (index === -1) {
                var value = { k: [], v: [] };
                group.k.push(char);
                group.v.push(value);
            }
            else {
                value = group.v[index];
            }
            appendPointBranch(value, key.slice(one ? 1 : 2));
        }
    }
    function appendCodeBranch(group, key) {
        if (key) {
            for (var keys = group.k, index = keys.length, char = key.charAt(0);;) {
                if (index === 0) {
                    var value = { k: [], v: [] };
                    group.k.push(char);
                    group.v.push(value);
                    appendCodeBranch(value, key.slice(1));
                    break;
                }
                if (keys[--index] === char) {
                    appendCodeBranch(group.v[index], key.slice(1));
                    break;
                }
            }
        }
    }
    function sourcify(group, needEscape) {
        var branches = [];
        var singleCharactersBranch = [];
        for (var values = group.v, keys = group.k, length = keys.length, index = 0; index < length; ++index) {
            var char = keys[index];
            var sub_branches = sourcify(values[index], needEscape);
            if (needEscape) {
                switch (char) {
                    case '*':
                    case '+':
                    case '?':
                    case '^':
                    case '$':
                    case '(':
                    case ')':
                    case '[':
                    case ']':
                    case '{':
                    case '|':
                    case '-':
                    case '.':
                    case '\\':
                        char = '\\' + char;
                }
            }
            sub_branches ? branches.push(char + sub_branches) : singleCharactersBranch.push(char);
        }
        singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length === 1 ? singleCharactersBranch[0] : '[' + singleCharactersBranch.join('') + ']');
        return branches.length === 0 ? '' : branches.length === 1 ? branches[0] : '(?:' + branches.join('|') + ')';
    }
    function groupify(branches, uFlag, noEscape) {
        var group = { k: [], v: [] };
        var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
        for (var length = branches.length, index = 0; index < length; ++index) {
            appendBranch(group, branches[index]);
        }
        return sourcify(group, !noEscape);
    }

    /*¡ @ltd/j-groupify */

    var SCOPE = Object.create(null);
    function ObjectScope(keys) {
        this._ = function (string) { return string.replace(search, replacer); };
        var search = Search(keys);
        var replacer = Replacer(this);
        for (var index = keys.length; index;) {
            this[keys[--index]] = Identifier();
        }
    }
    ObjectScope.prototype = SCOPE;
    function InheritedObjectScope(keys, proto) {
        this._ = function (string) { return string.replace(search, replacer); };
        for (var index = keys.length; index;) {
            this[keys[--index]] = Identifier();
        }
        for (var key in proto) {
            key === '_' || keys.push(key);
        }
        var search = Search(keys);
        var replacer = Replacer(this);
        InheritedObjectScope.prototype = SCOPE;
    }
    function Search(keys) {
        return new RegExp('__' + groupify(keys, false, true) + '__', 'g');
    }
    function Replacer(scope) {
        return function replacer(__key__) { return scope[__key__.slice(2, -2)]; };
    }

    var isArray = Array.isArray;

    var slice = Array.prototype.slice;

    var SEARCH = /__[a-z][a-z0-9]*(?:_[a-z0-9]+)*__/ig;
    function FunctionScope(cache) {
        function scope(value) { return scopify(arguments.length === 1 ? value : slice.call(arguments, 0), _scope); }
        scope.prototype = cache;
        scope._ = function (string) { return string.replace(SEARCH, _replacer); };
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

    var create = Object.create;

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
        return scope._(html);
    }
    function Render(code, scope) {
        return Function('with(this){return ' + (scope ? scope._(code) : code) + '}');
    }
    function StaticRenderFns(codes, scope) {
        return Function('return[function(){with(this){return ' + (scope
            ? scope._(codes.join('}},function(){with(this){return '))
            : codes.join('}},function(){with(this){return ')) + '}}]')();
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

    var head = document.documentElement.firstChild;

    function Style(css, scope) {
        var style = document.createElement('style');
        if (css) {
            style.textContent = scope ? scope._(css) : css;
        }
        return head.appendChild(style);
    }
    function remove(style) {
        head.removeChild(style);
        return remove;
    }

    var jVue = Object.create(null, {
        Identifier: { configurable: false, writable: false, value: Identifier },
        Scope: { configurable: false, writable: false, value: Scope },
        Template: { configurable: false, writable: false, value: Template },
        Render: { configurable: false, writable: false, value: Render },
        StaticRenderFns: { configurable: false, writable: false, value: StaticRenderFns },
        STYLE: { configurable: false, writable: false, value: STYLE },
        Style: { configurable: false, writable: false, value: Style },
        remove: { configurable: false, writable: false, value: remove },
        version: { configurable: false, writable: false, value: version },
        default: { configurable: false, get: function () { return this; } }
    });

    return jVue;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi9qLWdyb3VwaWZ5L2Rpc3QvRVNNL2otZ3JvdXBpZnkhbWV0YS5qcyIsIi4uLy4uL2otZ3JvdXBpZnkvc3JjL2V4cG9ydC50cyIsIi4uLy4uL2otZ3JvdXBpZnkvZGlzdC9FU00vai1ncm91cGlmeSEuanMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMudHMiLCJTVFlMRS50cyIsIlN0eWxlLCByZW1vdmUudHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgJzguOC4wJzsiLCJ2YXIgZGljdGlvbmFyeSA6b2JqZWN0ID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcblxudmFyIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzIDpzdHJpbmdbXSA9IFsnOSddO1xudmFyIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgOnN0cmluZyA9ICc5JztcbnZhciBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXggOm51bWJlciA9IDA7XG5cbi8vdmFyIFJFU0VSVkVEX0tFWSA6UmVnRXhwID0gL14oPzpicmVha3xjKD86YSg/OnNlfHRjaCl8bGFzc3xvbig/OnN0fHRpbnVlKSl8ZCg/OmUoPzpidWdnZXJ8ZmF1bHR8bGV0ZSl8byl8ZSg/OmxzZXxudW18eCg/OnBvcnR8dGVuZHMpKXxmKD86aW5hbGx5fG9yfHVuY3Rpb24pfGkoPzpmfG1wb3J0fG4oPzpzdGFuY2VvZik/KXxuZXd8cmV0dXJufHMoPzp3aXRjaHxzdXBlcil8dCg/OnJ5fHlwZW9mKXx2KD86YXJ8b2lkKXx3KD86aGlsZXxpdGgpKSQvO1xuXG5leHBvcnQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSA6c3RyaW5nIHtcblx0XG5cdGlmICggbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3Rlcj09PSd6JyApIHtcblx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggOm51bWJlciA9IGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdGlmICggbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbLS1jaGFyYWN0ZXJJbmRleF09PT0neicgKSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbY2hhcmFjdGVySW5kZXhdID0gJzAnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzW2NoYXJhY3RlckluZGV4XSA9IGRpY3Rpb25hcnlbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbY2hhcmFjdGVySW5kZXhdXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzLnVuc2hpZnQoJ2EnKTtcblx0XHRcdFx0KytsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4XSA9IGRpY3Rpb25hcnlbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3Rlcl07XG5cdH1cblx0XG5cdC8vdmFyIGlkZW50aWZpZXIgOnN0cmluZyA9IGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzLmpvaW4oJycpO1xuXHQvL2lmICggUkVTRVJWRURfS0VZLnRlc3QoaWRlbnRpZmllcikgKSB7XG5cdC8vXHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4XSA9IGRpY3Rpb25hcnlbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3Rlcl07XG5cdC8vXHRyZXR1cm4gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMuam9pbignJyk7XG5cdC8vfVxuXHQvL3JldHVybiBpZGVudGlmaWVyO1xuXHRcblx0cmV0dXJuIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzLmpvaW4oJycpO1xuXHRcbn1cbiIsIi8qIVxuICog5qih5Z2X5ZCN56ew77yaQGx0ZC9qLWdyb3VwaWZ5XG4gKiDmqKHlnZflip/og73vvJrlsIbkuIDkuKrlrZfnrKbkuLLmlbDnu4TvvIzovazljJbkuLrliIbmlK/lvI/kvJjljJblkI7nmoTmraPliJnooajovr7lvI/ljLnphY3nu4TjgIJcbiAgIOOAgOOAgOOAgOOAgOOAgFRyYW5zZm9ybSBhIHN0cmluZyBhcnJheSBpbnRvIGEgYnJhbmNoLXN0eWxlIG9wdGltaXplZCByZWdFeHAgZ3JvdXAuXG4gKiDmqKHlnZfniYjmnKzvvJozLjIuMVxuICog6K645Y+v5p2h5qy+77yaTEdQTC0zLjBcbiAqIOaJgOWxnuS9nOiAhe+8mum+meiFvumBkyA8TG9uZ1RlbmdEYW9ATG9uZ1RlbmdEYW8uY29tPiAod3d3LkxvbmdUZW5nRGFvLmNvbSlcbiAqIOmXrumimOWPjemmiO+8mmh0dHBzOi8vR2l0SHViLmNvbS9Mb25nVGVuZ0Rhby9qLWdyb3VwaWZ5L2lzc3Vlc1xuICog6aG555uu5Li76aG177yaaHR0cHM6Ly9HaXRIdWIuY29tL0xvbmdUZW5nRGFvL2otZ3JvdXBpZnkvXG4gKi8iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5leHBvcnQgeyB2ZXJzaW9uIH07XG5cbnR5cGUgbWFwID0geyBrOiBzdHJpbmdbXSwgdiA6bWFwW10gfTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwIDptYXAsIGtleSA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICgga2V5ICkge1xuXHRcdHZhciBvbmUgOmJvb2xlYW4gPSBrZXkuY29kZVBvaW50QXQoMCk9PT1rZXkuY2hhckNvZGVBdCgwKTtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gb25lID8ga2V5WzBdIDoga2V5LnNsaWNlKDAgLDIpO1xuXHRcdHZhciBpbmRleCA6bnVtYmVyID0gZ3JvdXAuay5pbmRleE9mKGNoYXIpO1xuXHRcdGlmICggaW5kZXg9PT0tMSApIHtcblx0XHRcdHZhciB2YWx1ZSA6bWFwID0geyBrOiBbXSwgdjogW10gfTtcblx0XHRcdGdyb3VwLmsucHVzaChjaGFyKTtcblx0XHRcdGdyb3VwLnYucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHRcdGVsc2UgeyB2YWx1ZSA9IGdyb3VwLnZbaW5kZXhdOyB9XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2godmFsdWUsIGtleS5zbGljZShvbmUgPyAxIDogMikpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwIDptYXAsIGtleSA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICgga2V5ICkge1xuXHRcdGZvciAoIHZhciBrZXlzIDpzdHJpbmdbXSA9IGdyb3VwLmssIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aCwgY2hhciA6c3RyaW5nID0ga2V5LmNoYXJBdCgwKTsgOyApIHtcblx0XHRcdGlmICggaW5kZXg9PT0wICkge1xuXHRcdFx0XHR2YXIgdmFsdWUgOm1hcCA9IHsgazogW10sIHY6IFtdIH07XG5cdFx0XHRcdGdyb3VwLmsucHVzaChjaGFyKTtcblx0XHRcdFx0Z3JvdXAudi5wdXNoKHZhbHVlKTtcblx0XHRcdFx0YXBwZW5kQ29kZUJyYW5jaCh2YWx1ZSwga2V5LnNsaWNlKDEpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGtleXNbLS1pbmRleF09PT1jaGFyICkge1xuXHRcdFx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwLnZbaW5kZXhdLCBrZXkuc2xpY2UoMSkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwIDptYXAsIG5lZWRFc2NhcGUgOmJvb2xlYW4pIDpzdHJpbmcge1xuXHR2YXIgYnJhbmNoZXMgOnN0cmluZ1tdID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoIDpzdHJpbmdbXSA9IFtdO1xuXHRmb3IgKCB2YXIgdmFsdWVzID0gZ3JvdXAudiwga2V5cyA9IGdyb3VwLmssIGxlbmd0aCA9IGtleXMubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0ga2V5c1tpbmRleF07XG5cdFx0dmFyIHN1Yl9icmFuY2hlcyA6c3RyaW5nID0gc291cmNpZnkodmFsdWVzW2luZGV4XSwgbmVlZEVzY2FwZSk7XG5cdFx0aWYgKCBuZWVkRXNjYXBlICkge1xuXHRcdFx0c3dpdGNoICggY2hhciApIHtcblx0XHRcdFx0Y2FzZSAnKic6IGNhc2UgJysnOiBjYXNlICc/JzogY2FzZSAnXic6IGNhc2UgJyQnOiBjYXNlICcoJzogY2FzZSAnKSc6IGNhc2UgJ1snOiBjYXNlICddJzogY2FzZSAneyc6IGNhc2UgJ3wnOiBjYXNlICctJzogY2FzZSAnLic6IGNhc2UgJ1xcXFwnOlxuXHRcdFx0XHRcdGNoYXIgPSAnXFxcXCcrY2hhcjtcblx0XHRcdH1cblx0XHR9XG5cdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTAgPyAnJyA6IGJyYW5jaGVzLmxlbmd0aD09PTEgPyBicmFuY2hlc1swXSA6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgOnN0cmluZ1tdLCB1RmxhZz8gOmJvb2xlYW4sIG5vRXNjYXBlPyA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBncm91cCA6bWFwID0geyBrOiBbXSwgdjogW10gfTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0ICggZnVuY3Rpb24gKCkgOnR5cGVvZiBncm91cGlmeSB7XG5cdGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyA6c3RyaW5nW10sIHVGbGFnPyA6Ym9vbGVhbiwgbm9Fc2NhcGU/IDpib29sZWFuKSA6c3RyaW5nIHtcblx0XHR2YXIgZ3JvdXAgOm1hcCA9IHsgazogW10sIHY6IFtdIH07XG5cdFx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRcdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdFx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xuXHR9XG5cdGdyb3VwaWZ5LnZlcnNpb24gPSB2ZXJzaW9uO1xuXHRyZXR1cm4gZ3JvdXBpZnkuZ3JvdXBpZnkgPSBncm91cGlmeS5kZWZhdWx0ID0gZ3JvdXBpZnk7XG59ICkoKTtcbiIsImltcG9ydCAnLi9qLWdyb3VwaWZ5IW1ldGEuanMnO1xuZXhwb3J0ICogZnJvbSAnLi4vLi4vc3JjL2V4cG9ydCc7XG4vKsKhIEBsdGQvai1ncm91cGlmeSAqLyIsImltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5cbmltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLWdyb3VwaWZ5JztcbmltcG9ydCB7IElkZW50aWZpZXIgfSBmcm9tICcuLi9JZGVudGlmaWVyJztcblxuZXhwb3J0IHR5cGUgT2JqZWN0U2NvcGUgPSB7XG5cdF8gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuXG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuXG5leHBvcnQgdmFyIFNDT1BFIDpPYmplY3RTY29wZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4vKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZShTQ09QRSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBPYmplY3RTY29wZSAodGhpcyA6T2JqZWN0U2NvcGUsIGtleXMgOnN0cmluZ1tdKSA6dm9pZCB7XG5cdHRoaXMuXyA9IGZ1bmN0aW9uIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2Uoc2VhcmNoLCByZXBsYWNlcik7IH07XG5cdHZhciBzZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciByZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn1cblxuT2JqZWN0U2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmhlcml0ZWRPYmplY3RTY29wZSAodGhpcyA6T2JqZWN0U2NvcGUsIGtleXMgOnN0cmluZ1tdLCBwcm90byA6T2JqZWN0U2NvcGUpIDp2b2lkIHtcblx0dGhpcy5fID0gZnVuY3Rpb24gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShzZWFyY2gsIHJlcGxhY2VyKTsgfTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG5cdGZvciAoIHZhciBrZXkgaW4gcHJvdG8gKSB7IGtleT09PSdfJyB8fCBrZXlzLnB1c2goa2V5KTsgfVxuXHR2YXIgc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0SW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gU0NPUEU7XG59XG5cbmZ1bmN0aW9uIFNlYXJjaCAoa2V5cyA6c3RyaW5nW10pIDpSZWdFeHAge1xuXHRyZXR1cm4gbmV3IFJlZ0V4cCgnX18nK2dyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSsnX18nLCAnZycpO1xufVxuXG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUgOk9iamVjdFNjb3BlKSB7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BlW19fa2V5X18uc2xpY2UoMiwgLTIpXTsgfTtcbn1cbiIsImltcG9ydCB7IElkZW50aWZpZXIgfSBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IE9iamVjdFNjb3BlIH0gZnJvbSAnLi9PYmplY3RTY29wZSc7XG5cbmV4cG9ydCB0eXBlIEZ1bmN0aW9uU2NvcGUgPSB7XG5cdCguLi5hcmdzIDphbnlbXSkgOnN0cmluZ1xuXHRwcm90b3R5cGUgOk9iamVjdFNjb3BlXG5cdF8gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuXG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgc2xpY2UgZnJvbSAnLkFycmF5LnByb3RvdHlwZS5zbGljZSc7XG5cbnZhciBTRUFSQ0ggOlJlZ0V4cCA9IC9fX1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqX18vaWc7XG5cbmV4cG9ydCBmdW5jdGlvbiBGdW5jdGlvblNjb3BlICh0aGlzIDp2b2lkLCBjYWNoZSA6T2JqZWN0U2NvcGUpIDpGdW5jdGlvblNjb3BlIHtcblx0ZnVuY3Rpb24gc2NvcGUgKC4uLmFyZ3MgOmFueVtdKSA6c3RyaW5nO1xuXHRmdW5jdGlvbiBzY29wZSAodmFsdWUgOnN0cmluZyB8IG9iamVjdCB8IGFueVtdKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BpZnkoYXJndW1lbnRzLmxlbmd0aD09PTEgPyB2YWx1ZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSwgX3Njb3BlKTsgfVxuXHRzY29wZS5wcm90b3R5cGUgPSBjYWNoZTtcblx0c2NvcGUuXyA9IGZ1bmN0aW9uIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2UoU0VBUkNILCBfcmVwbGFjZXIpOyB9O1xuXHRmdW5jdGlvbiBfcmVwbGFjZXIgKF9fa2V5X18gOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBfc2NvcGUoX19rZXlfXy5zbGljZSgyLCAtMikpOyB9XG5cdGZ1bmN0aW9uIF9zY29wZSAoa2V5IDpzdHJpbmcpIDpzdHJpbmcgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoIGNhY2hlW2tleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG5cbmZ1bmN0aW9uIHNjb3BpZnkgKHZhbHVlIDpzdHJpbmcgfCBvYmplY3QgfCBhbnlbXSwgX3Njb3BlIDooa2V5IDpzdHJpbmcpID0+IHN0cmluZykgOnN0cmluZyB7XG5cdHZhciBrZXlzIDpzdHJpbmcsXG5cdFx0aW5kZXggOm51bWJlcixcblx0XHR2YWx1ZXMgOnN0cmluZ1tdLFxuXHRcdGtleSA6c3RyaW5nO1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdHN3aXRjaCAoIHR5cGVvZiB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdGlmICggdmFsdWUuaW5kZXhPZignICcpPT09IC0xICkge1xuXHRcdFx0XHRcdHJldHVybiBfc2NvcGUodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWVzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSB2YWx1ZVtpbmRleF07XG5cdFx0XHRcdFx0XHRpZiAoIGtleSApIHsga2V5cyA9IF9zY29wZShrZXkpKycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdGlmICggaXNBcnJheSh2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSAoIDxhbnlbXT52YWx1ZSApLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBzY29waWZ5KHZhbHVlW2luZGV4XSwgX3Njb3BlKTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0ga2V5KycgJytrZXlzOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMCwgLTEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGZvciAoIGtleSBpbiB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdGlmICggdmFsdWVba2V5XSApIHsga2V5cyArPSAnICcrX3Njb3BlKGtleSk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gJyc7XG59IiwiaW1wb3J0IHsgT2JqZWN0U2NvcGUsIEluaGVyaXRlZE9iamVjdFNjb3BlLCBTQ09QRSB9IGZyb20gJy4vT2JqZWN0U2NvcGUnO1xuaW1wb3J0IHsgRnVuY3Rpb25TY29wZSB9IGZyb20gJy4vRnVuY3Rpb25TY29wZSc7XG5cbnR5cGUgU2NvcGUgPSBPYmplY3RTY29wZSB8IEZ1bmN0aW9uU2NvcGU7XG5cbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xudmFyIEtFWVMgOlJlZ0V4cCA9IC9bYS16XVthLXowLTldKig/Ol9bYS16MC05XSspKi9pZztcbnZhciBFTVBUWSA6W10gPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2NvcGUgKHRoaXMgOlNjb3BlW10gfCBTY29wZSB8IGFueSwga2V5cz8gOnN0cmluZykgOlNjb3BlIHtcblx0aWYgKCB0eXBlb2Yga2V5cz09PSdzdHJpbmcnICkge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSBtaXgoPFNjb3BlW10+dGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSA8T2JqZWN0U2NvcGU+dGhpcyk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmICggPEZ1bmN0aW9uPnRoaXMgKS5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSA8T2JqZWN0U2NvcGU+KCA8RnVuY3Rpb25TY29wZT50aGlzICkucHJvdG90eXBlKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gbmV3IE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShtaXgoPFNjb3BlW10+dGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKDxPYmplY3RTY29wZT50aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdHlwZW9mIHRoaXM9PT0nZnVuY3Rpb24nICYmICggPEZ1bmN0aW9uPnRoaXMgKS5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKDxPYmplY3RTY29wZT4oIDxGdW5jdGlvblNjb3BlPnRoaXMgKS5wcm90b3R5cGUpKTsgfVxuXHRcdGVsc2UgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUoU0NPUEUpKTsgfVxuXHR9XG59O1xuXG5mdW5jdGlvbiBtaXggKHRoaXMgOnZvaWQsIHByb3RvcyA6U2NvcGVbXSkgOk9iamVjdFNjb3BlIHtcblx0dmFyIHNjb3BlIDpPYmplY3RTY29wZSA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byA6U2NvcGUgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSAoIDxGdW5jdGlvblNjb3BlPnByb3RvICkucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG4iLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcblxuZXhwb3J0IGZ1bmN0aW9uIFRlbXBsYXRlIChodG1sIDpzdHJpbmcsIHNjb3BlIDpTY29wZSkgOnN0cmluZyB7XG5cdHJldHVybiBzY29wZS5fKGh0bWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVuZGVyIChjb2RlIDpzdHJpbmcsIHNjb3BlPyA6U2NvcGUpIDpGdW5jdGlvbiB7XG5cdHJldHVybiBGdW5jdGlvbignd2l0aCh0aGlzKXtyZXR1cm4gJysoIHNjb3BlID8gc2NvcGUuXyhjb2RlKSA6IGNvZGUgKSsnfScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3RhdGljUmVuZGVyRm5zIChjb2RlcyA6c3RyaW5nW10sIHNjb3BlPyA6U2NvcGUpIDpGdW5jdGlvbltdIHtcblx0cmV0dXJuIEZ1bmN0aW9uKFxuXHRcdCdyZXR1cm5bZnVuY3Rpb24oKXt3aXRoKHRoaXMpe3JldHVybiAnKyggc2NvcGVcblx0XHRcdD8gc2NvcGUuXyhjb2Rlcy5qb2luKCd9fSxmdW5jdGlvbigpe3dpdGgodGhpcyl7cmV0dXJuICcpKVxuXHRcdFx0OiBjb2Rlcy5qb2luKCd9fSxmdW5jdGlvbigpe3dpdGgodGhpcyl7cmV0dXJuICcpXG5cdFx0KSsnfX1dJ1xuXHQpKCk7XG59XG4iLCJpbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuXG5leHBvcnQgZGVmYXVsdCA8eyBmdW5jdGlvbmFsIDp0cnVlLCByZW5kZXIgOkZ1bmN0aW9uIH0+T2JqZWN0LmNyZWF0ZShudWxsLCB7XG5cdGZ1bmN0aW9uYWw6IHtcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdHZhbHVlOlxuXHRcdFx0dHJ1ZVxuXHR9LFxuXHRyZW5kZXI6IHtcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdHZhbHVlOlxuXHRcdFx0ZnVuY3Rpb24gcmVuZGVyIChjcmVhdGVFbGVtZW50LCBjb250ZXh0KSB7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVFbGVtZW50KCdzdHlsZScsIGNvbnRleHQuZGF0YSwgY29udGV4dC5jaGlsZHJlbik7XG5cdFx0XHR9XG5cdH1cbn0pOyIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuZG9jdW1lbnQnO1xuaW1wb3J0IGhlYWQgZnJvbSAnLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5maXJzdENoaWxkJztcblxuZXhwb3J0IGZ1bmN0aW9uIFN0eWxlIChjc3M/IDpzdHJpbmcsIHNjb3BlPykgOkhUTUxTdHlsZUVsZW1lbnQge1xuXHR2YXIgc3R5bGUgOkhUTUxTdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlLl8oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50KSA6dHlwZW9mIHJlbW92ZSB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuIiwiaW1wb3J0IE9iamVjdCBmcm9tICcuT2JqZWN0JztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG5pbXBvcnQgeyBJZGVudGlmaWVyIH0gZnJvbSAnLi9JZGVudGlmaWVyJztcbmV4cG9ydCB7IElkZW50aWZpZXIgfTtcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcbmV4cG9ydCB7IFNjb3BlIH07XG5cbmltcG9ydCB7IFRlbXBsYXRlLCBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyB9IGZyb20gJy4vVGVtcGxhdGUsIFJlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmV4cG9ydCB7IFRlbXBsYXRlLCBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyB9O1xuXG5pbXBvcnQgU1RZTEUgIGZyb20gJy4vU1RZTEUnO1xuZXhwb3J0IHsgU1RZTEUgfTtcblxuaW1wb3J0IHsgU3R5bGUsIHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5leHBvcnQgeyBTdHlsZSwgcmVtb3ZlIH07XG5cbnZhciBqVnVlID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG5cdElkZW50aWZpZXI6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogSWRlbnRpZmllciB9LFxuXHRTY29wZTogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBTY29wZSB9LFxuXHRUZW1wbGF0ZTogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBUZW1wbGF0ZSB9LFxuXHRSZW5kZXI6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogUmVuZGVyIH0sXG5cdFN0YXRpY1JlbmRlckZuczogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBTdGF0aWNSZW5kZXJGbnMgfSxcblx0U1RZTEU6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogU1RZTEUgfSxcblx0U3R5bGU6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogU3R5bGUgfSxcblx0cmVtb3ZlOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IHJlbW92ZSB9LFxuXHR2ZXJzaW9uOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IHZlcnNpb24gfSxcblx0ZGVmYXVsdDogeyBjb25maWd1cmFibGU6IGZhbHNlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0gfVxufSk7XG5leHBvcnQgZGVmYXVsdCBqVnVlO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWUsT0FBTzs7SUNBdEIsSUFBSSxVQUFVLEdBQVc7UUFDeEIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7UUFDOUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7UUFDdEQsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7UUFDdEQsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO1FBQzlDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7S0FDdEMsQ0FBQztJQUVGLElBQUksMEJBQTBCLEdBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxJQUFJLHdDQUF3QyxHQUFXLEdBQUcsQ0FBQztJQUMzRCxJQUFJLDZDQUE2QyxHQUFXLENBQUMsQ0FBQztJQUU5RDtBQUVBLGFBQWdCLFVBQVU7UUFFekIsSUFBSyx3Q0FBd0MsS0FBRyxHQUFHLEVBQUc7WUFDckQsd0NBQXdDLEdBQUcsMEJBQTBCLENBQUMsNkNBQTZDLENBQUMsR0FBRyxHQUFHLENB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