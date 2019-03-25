﻿/*!
 * 模块名称：jVue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified dependency for built .vue files. Belong to "Plan J".
 * 模块版本：8.9.0
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

    var version = '8.9.0';

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

    var isArray = Array.isArray;

    var create = Object.create;

    /*!
     * 模块名称：@ltd/j-groupify
     * 模块功能：将一个字符串数组，转化为分支式优化后的正则表达式匹配组。
       　　　　　Transform a string array into a branch-style optimized regExp group.
     * 模块版本：3.3.1
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi9qLWdyb3VwaWZ5L2Rpc3QvRVNNL2otZ3JvdXBpZnkhbWV0YS5qcyIsIi4uLy4uL2otZ3JvdXBpZnkvc3JjL2V4cG9ydC50cyIsIi4uLy4uL2otZ3JvdXBpZnkvZGlzdC9FU00vai1ncm91cGlmeSEuanMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMudHMiLCJTVFlMRS50cyIsIlN0eWxlLCByZW1vdmUudHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgJzguOS4wJzsiLCJ2YXIgZGljdGlvbmFyeSA6b2JqZWN0ID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcblxudmFyIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzIDpzdHJpbmdbXSA9IFsnOSddO1xudmFyIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgOnN0cmluZyA9ICc5JztcbnZhciBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXggOm51bWJlciA9IDA7XG5cbi8vdmFyIFJFU0VSVkVEX0tFWSA6UmVnRXhwID0gL14oPzpicmVha3xjKD86YSg/OnNlfHRjaCl8bGFzc3xvbig/OnN0fHRpbnVlKSl8ZCg/OmUoPzpidWdnZXJ8ZmF1bHR8bGV0ZSl8byl8ZSg/OmxzZXxudW18eCg/OnBvcnR8dGVuZHMpKXxmKD86aW5hbGx5fG9yfHVuY3Rpb24pfGkoPzpmfG1wb3J0fG4oPzpzdGFuY2VvZik/KXxuZXd8cmV0dXJufHMoPzp3aXRjaHxzdXBlcil8dCg/OnJ5fHlwZW9mKXx2KD86YXJ8b2lkKXx3KD86aGlsZXxpdGgpKSQvO1xuXG5leHBvcnQgZnVuY3Rpb24gSWRlbnRpZmllciAoKSA6c3RyaW5nIHtcblx0XG5cdGlmICggbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3Rlcj09PSd6JyApIHtcblx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4XSA9ICcwJztcblx0XHRmb3IgKCB2YXIgY2hhcmFjdGVySW5kZXggOm51bWJlciA9IGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleDsgOyApIHtcblx0XHRcdGlmICggY2hhcmFjdGVySW5kZXggKSB7XG5cdFx0XHRcdGlmICggbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbLS1jaGFyYWN0ZXJJbmRleF09PT0neicgKSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbY2hhcmFjdGVySW5kZXhdID0gJzAnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzW2NoYXJhY3RlckluZGV4XSA9IGRpY3Rpb25hcnlbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbY2hhcmFjdGVySW5kZXhdXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzLnVuc2hpZnQoJ2EnKTtcblx0XHRcdFx0KytsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4XSA9IGRpY3Rpb25hcnlbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3Rlcl07XG5cdH1cblx0XG5cdC8vdmFyIGlkZW50aWZpZXIgOnN0cmluZyA9IGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzLmpvaW4oJycpO1xuXHQvL2lmICggUkVTRVJWRURfS0VZLnRlc3QoaWRlbnRpZmllcikgKSB7XG5cdC8vXHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4XSA9IGRpY3Rpb25hcnlbbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3Rlcl07XG5cdC8vXHRyZXR1cm4gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMuam9pbignJyk7XG5cdC8vfVxuXHQvL3JldHVybiBpZGVudGlmaWVyO1xuXHRcblx0cmV0dXJuIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzLmpvaW4oJycpO1xuXHRcbn1cbiIsIi8qIVxuICog5qih5Z2X5ZCN56ew77yaQGx0ZC9qLWdyb3VwaWZ5XG4gKiDmqKHlnZflip/og73vvJrlsIbkuIDkuKrlrZfnrKbkuLLmlbDnu4TvvIzovazljJbkuLrliIbmlK/lvI/kvJjljJblkI7nmoTmraPliJnooajovr7lvI/ljLnphY3nu4TjgIJcbiAgIOOAgOOAgOOAgOOAgOOAgFRyYW5zZm9ybSBhIHN0cmluZyBhcnJheSBpbnRvIGEgYnJhbmNoLXN0eWxlIG9wdGltaXplZCByZWdFeHAgZ3JvdXAuXG4gKiDmqKHlnZfniYjmnKzvvJozLjMuMVxuICog6K645Y+v5p2h5qy+77yaTEdQTC0zLjBcbiAqIOaJgOWxnuS9nOiAhe+8mum+meiFvumBkyA8TG9uZ1RlbmdEYW9ATG9uZ1RlbmdEYW8uY29tPiAod3d3LkxvbmdUZW5nRGFvLmNvbSlcbiAqIOmXrumimOWPjemmiO+8mmh0dHBzOi8vR2l0SHViLmNvbS9Mb25nVGVuZ0Rhby9qLWdyb3VwaWZ5L2lzc3Vlc1xuICog6aG555uu5Li76aG177yaaHR0cHM6Ly9HaXRIdWIuY29tL0xvbmdUZW5nRGFvL2otZ3JvdXBpZnkvXG4gKi8iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5leHBvcnQgeyB2ZXJzaW9uIH07XG5cbnR5cGUgbWFwID0geyBrOiBzdHJpbmdbXSwgdiA6bWFwW10gfTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwIDptYXAsIGtleSA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICgga2V5ICkge1xuXHRcdHZhciBvbmUgOmJvb2xlYW4gPSBrZXkuY29kZVBvaW50QXQoMCk9PT1rZXkuY2hhckNvZGVBdCgwKTtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gb25lID8ga2V5WzBdIDoga2V5LnNsaWNlKDAgLDIpO1xuXHRcdHZhciBpbmRleCA6bnVtYmVyID0gZ3JvdXAuay5pbmRleE9mKGNoYXIpO1xuXHRcdGlmICggaW5kZXg9PT0tMSApIHtcblx0XHRcdHZhciB2YWx1ZSA6bWFwID0geyBrOiBbXSwgdjogW10gfTtcblx0XHRcdGdyb3VwLmsucHVzaChjaGFyKTtcblx0XHRcdGdyb3VwLnYucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHRcdGVsc2UgeyB2YWx1ZSA9IGdyb3VwLnZbaW5kZXhdOyB9XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2godmFsdWUsIGtleS5zbGljZShvbmUgPyAxIDogMikpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwIDptYXAsIGtleSA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICgga2V5ICkge1xuXHRcdGZvciAoIHZhciBrZXlzIDpzdHJpbmdbXSA9IGdyb3VwLmssIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aCwgY2hhciA6c3RyaW5nID0ga2V5LmNoYXJBdCgwKTsgOyApIHtcblx0XHRcdGlmICggaW5kZXg9PT0wICkge1xuXHRcdFx0XHR2YXIgdmFsdWUgOm1hcCA9IHsgazogW10sIHY6IFtdIH07XG5cdFx0XHRcdGdyb3VwLmsucHVzaChjaGFyKTtcblx0XHRcdFx0Z3JvdXAudi5wdXNoKHZhbHVlKTtcblx0XHRcdFx0YXBwZW5kQ29kZUJyYW5jaCh2YWx1ZSwga2V5LnNsaWNlKDEpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGtleXNbLS1pbmRleF09PT1jaGFyICkge1xuXHRcdFx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwLnZbaW5kZXhdLCBrZXkuc2xpY2UoMSkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwIDptYXAsIG5lZWRFc2NhcGUgOmJvb2xlYW4pIDpzdHJpbmcge1xuXHR2YXIgYnJhbmNoZXMgOnN0cmluZ1tdID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoIDpzdHJpbmdbXSA9IFtdO1xuXHRmb3IgKCB2YXIgdmFsdWVzID0gZ3JvdXAudiwga2V5cyA9IGdyb3VwLmssIGxlbmd0aCA9IGtleXMubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0ga2V5c1tpbmRleF07XG5cdFx0dmFyIHN1Yl9icmFuY2hlcyA6c3RyaW5nID0gc291cmNpZnkodmFsdWVzW2luZGV4XSwgbmVlZEVzY2FwZSk7XG5cdFx0aWYgKCBuZWVkRXNjYXBlICkge1xuXHRcdFx0c3dpdGNoICggY2hhciApIHtcblx0XHRcdFx0Y2FzZSAnKic6IGNhc2UgJysnOiBjYXNlICc/JzogY2FzZSAnXic6IGNhc2UgJyQnOiBjYXNlICcoJzogY2FzZSAnKSc6IGNhc2UgJ1snOiBjYXNlICddJzogY2FzZSAneyc6IGNhc2UgJ3wnOiBjYXNlICctJzogY2FzZSAnLic6IGNhc2UgJ1xcXFwnOlxuXHRcdFx0XHRcdGNoYXIgPSAnXFxcXCcrY2hhcjtcblx0XHRcdH1cblx0XHR9XG5cdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTAgPyAnJyA6IGJyYW5jaGVzLmxlbmd0aD09PTEgPyBicmFuY2hlc1swXSA6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgOnN0cmluZ1tdLCB1RmxhZz8gOmJvb2xlYW4sIG5vRXNjYXBlPyA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBncm91cCA6bWFwID0geyBrOiBbXSwgdjogW10gfTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0ICggZnVuY3Rpb24gKCkgOnR5cGVvZiBncm91cGlmeSB7XG5cdGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyA6c3RyaW5nW10sIHVGbGFnPyA6Ym9vbGVhbiwgbm9Fc2NhcGU/IDpib29sZWFuKSA6c3RyaW5nIHtcblx0XHR2YXIgZ3JvdXAgOm1hcCA9IHsgazogW10sIHY6IFtdIH07XG5cdFx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRcdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdFx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xuXHR9XG5cdGdyb3VwaWZ5LnZlcnNpb24gPSB2ZXJzaW9uO1xuXHRyZXR1cm4gZ3JvdXBpZnkuZ3JvdXBpZnkgPSBncm91cGlmeS5kZWZhdWx0ID0gZ3JvdXBpZnk7XG59ICkoKTtcbiIsImltcG9ydCAnLi9qLWdyb3VwaWZ5IW1ldGEuanMnO1xuZXhwb3J0ICogZnJvbSAnLi4vLi4vc3JjL2V4cG9ydCc7XG4vKsKhIEBsdGQvai1ncm91cGlmeSAqLyIsImltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLWdyb3VwaWZ5JztcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmltcG9ydCB7IElkZW50aWZpZXIgfSBmcm9tICcuLi9JZGVudGlmaWVyJztcblxuZXhwb3J0IHZhciBTQ09QRSA6T2JqZWN0U2NvcGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoU0NPUEUpO1xuXG5leHBvcnQgdHlwZSBPYmplY3RTY29wZSA9IHtcblx0XyA6KHN0cmluZyA6c3RyaW5nKSA9PiBzdHJpbmdcbn07XG5leHBvcnQgZnVuY3Rpb24gT2JqZWN0U2NvcGUgKHRoaXMgOk9iamVjdFNjb3BlLCBrZXlzIDpzdHJpbmdbXSkgOnZvaWQge1xuXHR0aGlzLl8gPSBmdW5jdGlvbiAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHNlYXJjaCwgcmVwbGFjZXIpOyB9O1xuXHR2YXIgc2VhcmNoID0gU2VhcmNoKGtleXMpO1xuXHR2YXIgcmVwbGFjZXIgPSBSZXBsYWNlcih0aGlzKTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkgeyB0aGlzW2tleXNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpOyB9XG59XG5cbk9iamVjdFNjb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xuXG5leHBvcnQgZnVuY3Rpb24gSW5oZXJpdGVkT2JqZWN0U2NvcGUgKHRoaXMgOk9iamVjdFNjb3BlLCBrZXlzIDpzdHJpbmdbXSwgcHJvdG8gOk9iamVjdFNjb3BlKSA6dm9pZCB7XG5cdHRoaXMuXyA9IGZ1bmN0aW9uIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2Uoc2VhcmNoLCByZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyBrZXk9PT0nXycgfHwga2V5cy5wdXNoKGtleSk7IH1cblx0dmFyIHNlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIHJlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xufVxuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgOnN0cmluZ1tdKSA6UmVnRXhwIHtcblx0cmV0dXJuIG5ldyBSZWdFeHAoJ19fJytncm91cGlmeShrZXlzLCBmYWxzZSwgdHJ1ZSkrJ19fJywgJ2cnKTtcbn1cblxuZnVuY3Rpb24gUmVwbGFjZXIgKHNjb3BlIDpPYmplY3RTY29wZSkge1xuXHRyZXR1cm4gZnVuY3Rpb24gcmVwbGFjZXIgKF9fa2V5X18gOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBzY29wZVtfX2tleV9fLnNsaWNlKDIsIC0yKV07IH07XG59XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgc2xpY2UgZnJvbSAnLkFycmF5LnByb3RvdHlwZS5zbGljZSc7XG5cbmltcG9ydCB7IElkZW50aWZpZXIgfSBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IE9iamVjdFNjb3BlIH0gZnJvbSAnLi9PYmplY3RTY29wZSc7XG5cbnZhciBTRUFSQ0ggOlJlZ0V4cCA9IC9fX1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqX18vaWc7XG5cbmV4cG9ydCB0eXBlIEZ1bmN0aW9uU2NvcGUgPSB7XG5cdCguLi5hcmdzIDphbnlbXSkgOnN0cmluZ1xuXHRwcm90b3R5cGUgOk9iamVjdFNjb3BlXG5cdF8gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZ1bmN0aW9uU2NvcGUgKHRoaXMgOnZvaWQsIGNhY2hlIDpPYmplY3RTY29wZSkgOkZ1bmN0aW9uU2NvcGUge1xuXHRmdW5jdGlvbiBzY29wZSAoLi4uYXJncyA6YW55W10pIDpzdHJpbmc7XG5cdGZ1bmN0aW9uIHNjb3BlICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10pIDpzdHJpbmcgeyByZXR1cm4gc2NvcGlmeShhcmd1bWVudHMubGVuZ3RoPT09MSA/IHZhbHVlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDApLCBfc2NvcGUpOyB9XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS5fID0gZnVuY3Rpb24gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIF9zY29wZShfX2tleV9fLnNsaWNlKDIsIC0yKSk7IH1cblx0ZnVuY3Rpb24gX3Njb3BlIChrZXkgOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBjYWNoZVtrZXldIHx8ICggY2FjaGVba2V5XSA9IElkZW50aWZpZXIoKSApOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZnVuY3Rpb24gc2NvcGlmeSAodmFsdWUgOnN0cmluZyB8IG9iamVjdCB8IGFueVtdLCBfc2NvcGUgOihrZXkgOnN0cmluZykgPT4gc3RyaW5nKSA6c3RyaW5nIHtcblx0dmFyIGtleXMgOnN0cmluZyxcblx0XHRpbmRleCA6bnVtYmVyLFxuXHRcdHZhbHVlcyA6c3RyaW5nW10sXG5cdFx0a2V5IDpzdHJpbmc7XG5cdGlmICggdmFsdWUgKSB7XG5cdFx0c3dpdGNoICggdHlwZW9mIHZhbHVlICkge1xuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0aWYgKCB2YWx1ZS5pbmRleE9mKCcgJyk9PT0gLTEgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF9zY29wZSh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZXMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlW2luZGV4XTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0gX3Njb3BlKGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9ICggPGFueVtdPnZhbHVlICkubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHNjb3BpZnkodmFsdWVbaW5kZXhdLCBfc2NvcGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCB2YWx1ZVtrZXldICkgeyBrZXlzICs9ICcgJytfc2NvcGUoa2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn0iLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcblxuaW1wb3J0IHsgT2JqZWN0U2NvcGUsIEluaGVyaXRlZE9iamVjdFNjb3BlLCBTQ09QRSB9IGZyb20gJy4vT2JqZWN0U2NvcGUnO1xuaW1wb3J0IHsgRnVuY3Rpb25TY29wZSB9IGZyb20gJy4vRnVuY3Rpb25TY29wZSc7XG5cbnZhciBLRVlTIDpSZWdFeHAgPSAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7XG52YXIgRU1QVFkgOltdID0gW107XG5cbmV4cG9ydCB0eXBlIFNjb3BlID0gT2JqZWN0U2NvcGUgfCBGdW5jdGlvblNjb3BlO1xuZXhwb3J0IGZ1bmN0aW9uIFNjb3BlICh0aGlzIDpTY29wZVtdIHwgU2NvcGUgfCBhbnksIGtleXM/IDpzdHJpbmcpIDpTY29wZSB7XG5cdGlmICggdHlwZW9mIGtleXM9PT0nc3RyaW5nJyApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gbWl4KDxTY29wZVtdPnRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0aGlzIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gPE9iamVjdFNjb3BlPnRoaXMpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiAoIDxGdW5jdGlvbj50aGlzICkucHJvdG90eXBlIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gPE9iamVjdFNjb3BlPiggPEZ1bmN0aW9uU2NvcGU+dGhpcyApLnByb3RvdHlwZSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIG5ldyBPYmplY3RTY29wZShrZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggaXNBcnJheSh0aGlzKSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUobWl4KDxTY29wZVtdPnRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0aGlzIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZSg8T2JqZWN0U2NvcGU+dGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiB0aGlzPT09J2Z1bmN0aW9uJyAmJiAoIDxGdW5jdGlvbj50aGlzICkucHJvdG90eXBlIGluc3RhbmNlb2YgT2JqZWN0U2NvcGUgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZSg8T2JqZWN0U2NvcGU+KCA8RnVuY3Rpb25TY29wZT50aGlzICkucHJvdG90eXBlKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxufVxuXG5mdW5jdGlvbiBtaXggKHRoaXMgOnZvaWQsIHByb3RvcyA6U2NvcGVbXSkgOk9iamVjdFNjb3BlIHtcblx0dmFyIHNjb3BlIDpPYmplY3RTY29wZSA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byA6U2NvcGUgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSAoIDxGdW5jdGlvblNjb3BlPnByb3RvICkucHJvdG90eXBlOyB9XG5cdFx0Zm9yICggdmFyIGlkIGluIHByb3RvICkgeyBzY29wZVtpZF0gPSBwcm90b1tpZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG4iLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IHsgU2NvcGUgfSBmcm9tICcuL1Njb3BlLyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCA6c3RyaW5nLCBzY29wZSA6U2NvcGUpIDpzdHJpbmcge1xuXHRyZXR1cm4gc2NvcGUuXyhodG1sKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlbmRlciAoY29kZSA6c3RyaW5nLCBzY29wZT8gOlNjb3BlKSA6RnVuY3Rpb24ge1xuXHRyZXR1cm4gRnVuY3Rpb24oJ3dpdGgodGhpcyl7cmV0dXJuICcrKCBzY29wZSA/IHNjb3BlLl8oY29kZSkgOiBjb2RlICkrJ30nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgOnN0cmluZ1tdLCBzY29wZT8gOlNjb3BlKSA6RnVuY3Rpb25bXSB7XG5cdHJldHVybiBGdW5jdGlvbihcblx0XHQncmV0dXJuW2Z1bmN0aW9uKCl7d2l0aCh0aGlzKXtyZXR1cm4gJysoIHNjb3BlXG5cdFx0XHQ/IHNjb3BlLl8oY29kZXMuam9pbignfX0sZnVuY3Rpb24oKXt3aXRoKHRoaXMpe3JldHVybiAnKSlcblx0XHRcdDogY29kZXMuam9pbignfX0sZnVuY3Rpb24oKXt3aXRoKHRoaXMpe3JldHVybiAnKVxuXHRcdCkrJ319XSdcblx0KSgpO1xufVxuIiwiaW1wb3J0IE9iamVjdCBmcm9tICcuT2JqZWN0JztcblxuZXhwb3J0IGRlZmF1bHQgPHsgZnVuY3Rpb25hbCA6dHJ1ZSwgcmVuZGVyIDpGdW5jdGlvbiB9Pk9iamVjdC5jcmVhdGUobnVsbCwge1xuXHRmdW5jdGlvbmFsOiB7XG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHR2YWx1ZTpcblx0XHRcdHRydWVcblx0fSxcblx0cmVuZGVyOiB7XG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHR2YWx1ZTpcblx0XHRcdGZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCwgY29udGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudCgnc3R5bGUnLCBjb250ZXh0LmRhdGEsIGNvbnRleHQuY2hpbGRyZW4pO1xuXHRcdFx0fVxuXHR9XG59KTsiLCJpbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZmlyc3RDaGlsZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBTdHlsZSAoY3NzPyA6c3RyaW5nLCBzY29wZT8pIDpIVE1MU3R5bGVFbGVtZW50IHtcblx0dmFyIHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gc2NvcGUgPyBzY29wZS5fKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSA6SFRNTFN0eWxlRWxlbWVudCkgOnR5cGVvZiByZW1vdmUge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cbiIsImltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IHsgSWRlbnRpZmllciB9IGZyb20gJy4vSWRlbnRpZmllcic7XG5leHBvcnQgeyBJZGVudGlmaWVyIH07XG5cbmltcG9ydCB7IFNjb3BlIH0gZnJvbSAnLi9TY29wZS8nO1xuZXhwb3J0IHsgU2NvcGUgfTtcblxuaW1wb3J0IHsgVGVtcGxhdGUsIFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9UZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnO1xuZXhwb3J0IHsgVGVtcGxhdGUsIFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH07XG5cbmltcG9ydCBTVFlMRSAgZnJvbSAnLi9TVFlMRSc7XG5leHBvcnQgeyBTVFlMRSB9O1xuXG5pbXBvcnQgeyBTdHlsZSwgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcbmV4cG9ydCB7IFN0eWxlLCByZW1vdmUgfTtcblxudmFyIGpWdWUgPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcblx0SWRlbnRpZmllcjogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBJZGVudGlmaWVyIH0sXG5cdFNjb3BlOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IFNjb3BlIH0sXG5cdFRlbXBsYXRlOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IFRlbXBsYXRlIH0sXG5cdFJlbmRlcjogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBSZW5kZXIgfSxcblx0U3RhdGljUmVuZGVyRm5zOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IFN0YXRpY1JlbmRlckZucyB9LFxuXHRTVFlMRTogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBTVFlMRSB9LFxuXHRTdHlsZTogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBTdHlsZSB9LFxuXHRyZW1vdmU6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogcmVtb3ZlIH0sXG5cdHZlcnNpb246IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogdmVyc2lvbiB9LFxuXHRkZWZhdWx0OiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSB9XG59KTtcbmV4cG9ydCBkZWZhdWx0IGpWdWU7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZSxPQUFPOztJQ0F0QixJQUFJLFVBQVUsR0FBVztRQUN4QixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztRQUM5RSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztRQUN0RCxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztRQUN0RCxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7UUFDOUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztLQUN0QyxDQUFDO0lBRUYsSUFBSSwwQkFBMEIsR0FBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELElBQUksd0NBQXdDLEdBQVcsR0FBRyxDQUFDO0lBQzNELElBQUksNkNBQTZDLEdBQVcsQ0FBQyxDQUFDO0lBRTlEO0FBRUEsYUFBZ0IsVUFBVTtRQUV6QixJQUFLLHdDQUF3QyxLQUFHLEdBQUcsRUFBRztZQUNyRCx3Q0FBd0MsR0FBRywwQkFBMEIsQ0FBQyw2Q0FBNkMsQ0FBQyxHQUFHLEdBQUcs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