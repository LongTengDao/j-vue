/*!
 * 模块名称：jVue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified dependency for built .vue files. Belong to "Plan J".
 * 模块版本：8.10.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

var version = '8.10.0';

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
        if (index < 0) {
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

var SCOPE = 
/*#__PURE__*/
Object.preventExtensions(Object.create(null));
var ObjectScope = function ObjectScope(keys) {
    this._ = function (string) { return string.replace(search, replacer); };
    var search = Search(keys);
    var replacer = Replacer(this);
    for (var index = keys.length; index;) {
        this[keys[--index]] = Identifier();
    }
};
ObjectScope.prototype = SCOPE;
var InheritedObjectScope = function InheritedObjectScope(keys, proto) {
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
};
function Search(keys) {
    return RegExp('__' + groupify(keys, false, true) + '__', 'g');
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

export default jVue;
export { Identifier, Render, STYLE, Scope, StaticRenderFns, Style, Template, remove, version };

/*¡ jVue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi9qLWdyb3VwaWZ5L2Rpc3QvRVNNL2otZ3JvdXBpZnkhbWV0YS5qcyIsIi4uLy4uL2otZ3JvdXBpZnkvc3JjL2V4cG9ydC50cyIsIi4uLy4uL2otZ3JvdXBpZnkvZGlzdC9FU00vai1ncm91cGlmeSEuanMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS8udHMiLCJUZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMudHMiLCJTVFlMRS50cyIsIlN0eWxlLCByZW1vdmUudHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgJzguMTAuMCc7IiwidmFyIGRpY3Rpb25hcnkgOntcblx0JzAnIDonMScsICcxJyA6JzInLCAnMicgOiczJywgJzMnIDonNCcsICc0JyA6JzUnLCAnNScgOic2JywgJzYnIDonNycsICc3JyA6JzgnLCAnOCcgOic5JywgJzknIDonYScsXG5cdCdhJyA6J2InLCAnYicgOidjJywgJ2MnIDonZCcsICdkJyA6J2UnLCAnZScgOidmJywgJ2YnIDonZycsICdnJyA6J2gnLFxuXHQnaCcgOidpJywgJ2knIDonaicsICdqJyA6J2snLCAnaycgOidsJywgJ2wnIDonbScsICdtJyA6J24nLCAnbicgOidvJyxcblx0J28nIDoncCcsICdwJyA6J3EnLCAncScgOidyJywgJ3InIDoncycsICdzJyA6J3QnLCAndCcgOid1Jyxcblx0J3UnIDondicsICd2JyA6J3cnLCAndycgOid4JywgJ3gnIDoneScsICd5JyA6J3onLCAneicgOicwJ1xufSA9IHtcblx0MDogJzEnLCAxOiAnMicsIDI6ICczJywgMzogJzQnLCA0OiAnNScsIDU6ICc2JywgNjogJzcnLCA3OiAnOCcsIDg6ICc5JywgOTogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneicsIHo6ICcwJ1xufTtcblxudmFyIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzIDooIGtleW9mIHR5cGVvZiBkaWN0aW9uYXJ5IClbXSA9IFsnOSddO1xudmFyIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgOmtleW9mIHR5cGVvZiBkaWN0aW9uYXJ5ID0gJzknO1xudmFyIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleCA6bnVtYmVyID0gMDtcblxuLy92YXIgUkVTRVJWRURfS0VZIDpSZWdFeHAgPSAvXig/OmJyZWFrfGMoPzphKD86c2V8dGNoKXxsYXNzfG9uKD86c3R8dGludWUpKXxkKD86ZSg/OmJ1Z2dlcnxmYXVsdHxsZXRlKXxvKXxlKD86bHNlfG51bXx4KD86cG9ydHx0ZW5kcykpfGYoPzppbmFsbHl8b3J8dW5jdGlvbil8aSg/OmZ8bXBvcnR8big/OnN0YW5jZW9mKT8pfG5ld3xyZXR1cm58cyg/OndpdGNofHN1cGVyKXx0KD86cnl8eXBlb2YpfHYoPzphcnxvaWQpfHcoPzpoaWxlfGl0aCkpJC87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIElkZW50aWZpZXIgKCkgOnN0cmluZyB7XG5cdFxuXHRpZiAoIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXI9PT0neicgKSB7XG5cdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzW2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIGNoYXJhY3RlckluZGV4IDpudW1iZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIGNoYXJhY3RlckluZGV4ICkge1xuXHRcdFx0XHRpZiAoIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzWy0tY2hhcmFjdGVySW5kZXhdPT09J3onICkge1xuXHRcdFx0XHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzW2NoYXJhY3RlckluZGV4XSA9ICcwJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tjaGFyYWN0ZXJJbmRleF0gPSBkaWN0aW9uYXJ5W2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzW2NoYXJhY3RlckluZGV4XV07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVycy51bnNoaWZ0KCdhJyk7XG5cdFx0XHRcdCsrbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzW2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleF0gPSBkaWN0aW9uYXJ5W2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJdO1xuXHR9XG5cdFxuXHQvL3ZhciBpZGVudGlmaWVyIDpzdHJpbmcgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVycy5qb2luKCcnKTtcblx0Ly9pZiAoIFJFU0VSVkVEX0tFWS50ZXN0KGlkZW50aWZpZXIpICkge1xuXHQvL1x0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlciA9IGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzW2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleF0gPSBkaWN0aW9uYXJ5W2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJdO1xuXHQvL1x0cmV0dXJuIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzLmpvaW4oJycpO1xuXHQvL31cblx0Ly9yZXR1cm4gaWRlbnRpZmllcjtcblx0XG5cdHJldHVybiBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVycy5qb2luKCcnKTtcblx0XG59O1xuIiwiLyohXG4gKiDmqKHlnZflkI3np7DvvJpAbHRkL2otZ3JvdXBpZnlcbiAqIOaooeWdl+WKn+iDve+8muWwhuS4gOS4quWtl+espuS4suaVsOe7hO+8jOi9rOWMluS4uuWIhuaUr+W8j+S8mOWMluWQjueahOato+WImeihqOi+vuW8j+WMuemFjee7hOOAglxuICAg44CA44CA44CA44CA44CAVHJhbnNmb3JtIGEgc3RyaW5nIGFycmF5IGludG8gYSBicmFuY2gtc3R5bGUgb3B0aW1pemVkIHJlZ0V4cCBncm91cC5cbiAqIOaooeWdl+eJiOacrO+8mjMuMy4xXG4gKiDorrjlj6/mnaHmrL7vvJpMR1BMLTMuMFxuICog5omA5bGe5L2c6ICF77ya6b6Z6IW+6YGTIDxMb25nVGVuZ0Rhb0BMb25nVGVuZ0Rhby5jb20+ICh3d3cuTG9uZ1RlbmdEYW8uY29tKVxuICog6Zeu6aKY5Y+N6aaI77yaaHR0cHM6Ly9HaXRIdWIuY29tL0xvbmdUZW5nRGFvL2otZ3JvdXBpZnkvaXNzdWVzXG4gKiDpobnnm67kuLvpobXvvJpodHRwczovL0dpdEh1Yi5jb20vTG9uZ1RlbmdEYW8vai1ncm91cGlmeS9cbiAqLyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwIDptYXAsIGtleSA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICgga2V5ICkge1xuXHRcdHZhciBvbmUgOmJvb2xlYW4gPSBrZXkuY29kZVBvaW50QXQoMCk9PT1rZXkuY2hhckNvZGVBdCgwKTtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gb25lID8ga2V5WzBdIDoga2V5LnNsaWNlKDAsIDIpO1xuXHRcdHZhciBpbmRleCA6bnVtYmVyID0gZ3JvdXAuay5pbmRleE9mKGNoYXIpO1xuXHRcdGlmICggaW5kZXg8MCApIHtcblx0XHRcdHZhciB2YWx1ZSA6bWFwID0geyBrOiBbXSwgdjogW10gfTtcblx0XHRcdGdyb3VwLmsucHVzaChjaGFyKTtcblx0XHRcdGdyb3VwLnYucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHRcdGVsc2UgeyB2YWx1ZSA9IGdyb3VwLnZbaW5kZXhdOyB9XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2godmFsdWUsIGtleS5zbGljZShvbmUgPyAxIDogMikpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwIDptYXAsIGtleSA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICgga2V5ICkge1xuXHRcdGZvciAoIHZhciBrZXlzIDpzdHJpbmdbXSA9IGdyb3VwLmssIGluZGV4IDpudW1iZXIgPSBrZXlzLmxlbmd0aCwgY2hhciA6c3RyaW5nID0ga2V5LmNoYXJBdCgwKTsgOyApIHtcblx0XHRcdGlmICggaW5kZXg9PT0wICkge1xuXHRcdFx0XHR2YXIgdmFsdWUgOm1hcCA9IHsgazogW10sIHY6IFtdIH07XG5cdFx0XHRcdGdyb3VwLmsucHVzaChjaGFyKTtcblx0XHRcdFx0Z3JvdXAudi5wdXNoKHZhbHVlKTtcblx0XHRcdFx0YXBwZW5kQ29kZUJyYW5jaCh2YWx1ZSwga2V5LnNsaWNlKDEpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGtleXNbLS1pbmRleF09PT1jaGFyICkge1xuXHRcdFx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwLnZbaW5kZXhdLCBrZXkuc2xpY2UoMSkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwIDptYXAsIG5lZWRFc2NhcGUgOmJvb2xlYW4pIDpzdHJpbmcge1xuXHR2YXIgYnJhbmNoZXMgOnN0cmluZ1tdID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoIDpzdHJpbmdbXSA9IFtdO1xuXHRmb3IgKCB2YXIgdmFsdWVzID0gZ3JvdXAudiwga2V5cyA9IGdyb3VwLmssIGxlbmd0aCA9IGtleXMubGVuZ3RoLCBpbmRleCA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0ga2V5c1tpbmRleF07XG5cdFx0dmFyIHN1Yl9icmFuY2hlcyA6c3RyaW5nID0gc291cmNpZnkodmFsdWVzW2luZGV4XSwgbmVlZEVzY2FwZSk7XG5cdFx0aWYgKCBuZWVkRXNjYXBlICkge1xuXHRcdFx0c3dpdGNoICggY2hhciApIHtcblx0XHRcdFx0Y2FzZSAnKic6XG5cdFx0XHRcdGNhc2UgJysnOlxuXHRcdFx0XHRjYXNlICc/Jzpcblx0XHRcdFx0Y2FzZSAnXic6XG5cdFx0XHRcdGNhc2UgJyQnOlxuXHRcdFx0XHRjYXNlICcoJzpcblx0XHRcdFx0Y2FzZSAnKSc6XG5cdFx0XHRcdGNhc2UgJ1snOlxuXHRcdFx0XHRjYXNlICddJzpcblx0XHRcdFx0Y2FzZSAneyc6XG5cdFx0XHRcdGNhc2UgJ3wnOlxuXHRcdFx0XHRjYXNlICctJzpcblx0XHRcdFx0Y2FzZSAnLic6XG5cdFx0XHRcdGNhc2UgJ1xcXFwnOlxuXHRcdFx0XHRcdGNoYXIgPSAnXFxcXCcrY2hhcjtcblx0XHRcdH1cblx0XHR9XG5cdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTAgPyAnJyA6IGJyYW5jaGVzLmxlbmd0aD09PTEgPyBicmFuY2hlc1swXSA6ICcoPzonK2JyYW5jaGVzLmpvaW4oJ3wnKSsnKSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgOnN0cmluZ1tdLCB1RmxhZz8gOmJvb2xlYW4sIG5vRXNjYXBlPyA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBncm91cCA6bWFwID0geyBrOiBbXSwgdjogW10gfTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IChcblx0LyojX19QVVJFX18qL1xuXHRmdW5jdGlvbiAoKSB7XG5cdFx0ZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzIDpzdHJpbmdbXSwgdUZsYWc/IDpib29sZWFuLCBub0VzY2FwZT8gOmJvb2xlYW4pIDpzdHJpbmcge1xuXHRcdFx0dmFyIGdyb3VwIDptYXAgPSB7IGs6IFtdLCB2OiBbXSB9O1xuXHRcdFx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRcdFx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0XHRcdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcblx0XHR9XG5cdFx0Z3JvdXBpZnkudmVyc2lvbiA9IHZlcnNpb247XG5cdFx0cmV0dXJuIGdyb3VwaWZ5Lmdyb3VwaWZ5ID0gZ3JvdXBpZnkuZGVmYXVsdCA9IGdyb3VwaWZ5O1xuXHR9KClcbik7XG5cbnR5cGUgbWFwID0geyBrIDpzdHJpbmdbXSwgdiA6bWFwW10gfTtcbiIsImltcG9ydCAnLi9qLWdyb3VwaWZ5IW1ldGEuanMnO1xuZXhwb3J0ICogZnJvbSAnLi4vLi4vc3JjL2V4cG9ydCc7XG5leHBvcnQgeyBkZWZhdWx0IH0gZnJvbSAnLi4vLi4vc3JjL2V4cG9ydCc7XG4vKsKhIEBsdGQvai1ncm91cGlmeSAqLyIsImltcG9ydCB7IGdyb3VwaWZ5IH0gZnJvbSAnQGx0ZC9qLWdyb3VwaWZ5JztcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmltcG9ydCBJZGVudGlmaWVyIGZyb20gJy4uL0lkZW50aWZpZXInO1xuXG5leHBvcnQgdmFyIFNDT1BFIDpPYmplY3RTY29wZSA9XG5cdC8qI19fUFVSRV9fKi9cblx0T2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5leHBvcnQgdmFyIE9iamVjdFNjb3BlID0gZnVuY3Rpb24gT2JqZWN0U2NvcGUgKHRoaXMgOk9iamVjdFNjb3BlLCBrZXlzIDpLZXlbXSkgOnZvaWQge1xuXHR0aGlzLl8gPSBmdW5jdGlvbiAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHNlYXJjaCwgcmVwbGFjZXIpOyB9O1xuXHR2YXIgc2VhcmNoIDpSZWdFeHAgPSBTZWFyY2goa2V5cyk7XG5cdHZhciByZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cbn0gYXMgdW5rbm93biBhcyB7XG5cdG5ldyAoa2V5cyA6S2V5W10pIDpPYmplY3RTY29wZVxufTtcbmV4cG9ydCB0eXBlIE9iamVjdFNjb3BlID0ge1xuXHRfIDooc3RyaW5nIDpzdHJpbmcpID0+IHN0cmluZ1xuXHRhMF8wIDpzdHJpbmdcbn07XG5leHBvcnQgdHlwZSBLZXkgPSAnYTBfMCc7XG5cbk9iamVjdFNjb3BlLnByb3RvdHlwZSA9IFNDT1BFO1xuXG5leHBvcnQgdmFyIEluaGVyaXRlZE9iamVjdFNjb3BlID0gZnVuY3Rpb24gSW5oZXJpdGVkT2JqZWN0U2NvcGUgKHRoaXMgOk9iamVjdFNjb3BlLCBrZXlzIDpLZXlbXSwgcHJvdG8gOk9iamVjdFNjb3BlKSA6dm9pZCB7XG5cdHRoaXMuXyA9IGZ1bmN0aW9uIChzdHJpbmcgOnN0cmluZykgeyByZXR1cm4gc3RyaW5nLnJlcGxhY2Uoc2VhcmNoLCByZXBsYWNlcik7IH07XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxuXHRmb3IgKCB2YXIga2V5IGluIHByb3RvICkgeyBrZXk9PT0nXycgfHwga2V5cy5wdXNoKDxLZXk+a2V5KTsgfVxuXHR2YXIgc2VhcmNoIDpSZWdFeHAgPSBTZWFyY2goa2V5cyk7XG5cdHZhciByZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcbn0gYXMgdW5rbm93biBhcyB7XG5cdG5ldyAoa2V5cyA6S2V5W10sIHByb3RvIDpPYmplY3RTY29wZSkgOk9iamVjdFNjb3BlXG59O1xuXG5mdW5jdGlvbiBTZWFyY2ggKGtleXMgOnN0cmluZ1tdKSA6UmVnRXhwIHtcblx0cmV0dXJuIFJlZ0V4cCgnX18nK2dyb3VwaWZ5KGtleXMsIGZhbHNlLCB0cnVlKSsnX18nLCAnZycpO1xufVxuXG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUgOk9iamVjdFNjb3BlKSB7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIHNjb3BlWzxLZXk+X19rZXlfXy5zbGljZSgyLCAtMildOyB9O1xufVxuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IHNsaWNlIGZyb20gJy5BcnJheS5wcm90b3R5cGUuc2xpY2UnO1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuLi9JZGVudGlmaWVyJztcbmltcG9ydCB7IE9iamVjdFNjb3BlLCBLZXkgfSBmcm9tICcuL09iamVjdFNjb3BlJztcblxudmFyIFNFQVJDSCA6UmVnRXhwID0gL19fW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSpfXy9pZztcblxuZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb25TY29wZTtcbmZ1bmN0aW9uIEZ1bmN0aW9uU2NvcGUgKGNhY2hlIDpPYmplY3RTY29wZSkgOkZ1bmN0aW9uU2NvcGUge1xuXHRmdW5jdGlvbiBzY29wZSAoLi4uYXJncyA6YW55W10pIDpzdHJpbmc7XG5cdGZ1bmN0aW9uIHNjb3BlICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10pIDpzdHJpbmcgeyByZXR1cm4gc2NvcGlmeShhcmd1bWVudHMubGVuZ3RoPT09MSA/IHZhbHVlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDApLCBfc2NvcGUpOyB9XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS5fID0gZnVuY3Rpb24gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIF9zY29wZShfX2tleV9fLnNsaWNlKDIsIC0yKSk7IH1cblx0ZnVuY3Rpb24gX3Njb3BlIChrZXkgOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBjYWNoZVs8S2V5PmtleV0gfHwgKCBjYWNoZVs8S2V5PmtleV0gPSBJZGVudGlmaWVyKCkgKTsgfVxuXHRyZXR1cm4gc2NvcGU7XG59XG50eXBlIEZ1bmN0aW9uU2NvcGUgPSB7XG5cdCguLi5hcmdzIDphbnlbXSkgOnN0cmluZ1xuXHRwcm90b3R5cGUgOk9iamVjdFNjb3BlXG5cdF8gOihzdHJpbmcgOnN0cmluZykgPT4gc3RyaW5nXG59O1xuXG5mdW5jdGlvbiBzY29waWZ5ICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10sIF9zY29wZSA6KGtleSA6c3RyaW5nKSA9PiBzdHJpbmcpIDpzdHJpbmcge1xuXHR2YXIga2V5cyA6c3RyaW5nLFxuXHRcdGluZGV4IDpudW1iZXIsXG5cdFx0dmFsdWVzIDpzdHJpbmdbXSxcblx0XHRrZXkgOnN0cmluZztcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRpZiAoIHZhbHVlLmluZGV4T2YoJyAnKT09PSAtMSApIHtcblx0XHRcdFx0XHRyZXR1cm4gX3Njb3BlKHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZXlzID0gJyc7XG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWUuc3BsaXQoJyAnKTtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9IHZhbHVlcy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRcdFx0a2V5ID0gdmFsdWVbaW5kZXhdO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBfc2NvcGUoa2V5KSsnICcra2V5czsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gdmFsdWUubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHNjb3BpZnkodmFsdWVbaW5kZXhdLCBfc2NvcGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoPHsgW2tleSA6c3RyaW5nXSA6YW55IH0+dmFsdWUpW2tleV0gKSB7IGtleXMgKz0gJyAnK19zY29wZShrZXkpOyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBrZXlzICYmIGtleXMuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xufSIsImltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuXG5pbXBvcnQgeyBPYmplY3RTY29wZSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUsIFNDT1BFLCBLZXkgfSBmcm9tICcuL09iamVjdFNjb3BlJztcbmltcG9ydCBGdW5jdGlvblNjb3BlIGZyb20gJy4vRnVuY3Rpb25TY29wZSc7XG5cbnZhciBLRVlTIDpSZWdFeHAgPSAvW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSovaWc7XG52YXIgRU1QVFkgOktleVtdID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IFNjb3BlO1xudHlwZSBTY29wZSA9IE9iamVjdFNjb3BlIHwgRnVuY3Rpb25TY29wZTtcbmZ1bmN0aW9uIFNjb3BlICh0aGlzIDpTY29wZVtdIHwgU2NvcGUgfCBhbnksIGtleXM/IDpzdHJpbmcpIDpTY29wZSB7XG5cdGlmICggdHlwZW9mIGtleXM9PT0nc3RyaW5nJyApIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBuZXcgSW5oZXJpdGVkT2JqZWN0U2NvcGUoPEtleVtdPmtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IG1peCh0aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKDxLZXlbXT5rZXlzLm1hdGNoKEtFWVMpIHx8IEVNUFRZLCBJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSB0aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIG5ldyBJbmhlcml0ZWRPYmplY3RTY29wZSg8S2V5W10+a2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGUpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBuZXcgT2JqZWN0U2NvcGUoPEtleVtdPmtleXMubWF0Y2goS0VZUykgfHwgRU1QVFkpOyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShtaXgodGhpcykpOyB9XG5cdFx0ZWxzZSBpZiAoIHRoaXMgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKHRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm90b3R5cGUgaW5zdGFuY2VvZiBPYmplY3RTY29wZSApIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKHRoaXMucHJvdG90eXBlKSk7IH1cblx0XHRlbHNlIHsgcmV0dXJuIEZ1bmN0aW9uU2NvcGUoY3JlYXRlKFNDT1BFKSk7IH1cblx0fVxufVxuXG5mdW5jdGlvbiBtaXggKHByb3RvcyA6U2NvcGVbXSkgOk9iamVjdFNjb3BlIHtcblx0dmFyIHNjb3BlIDpPYmplY3RTY29wZSA9IGNyZWF0ZShTQ09QRSk7XG5cdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IHByb3Rvcy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBwcm90byA6U2NvcGUgPSBwcm90b3NbaW5kZXhdO1xuXHRcdGlmICggdHlwZW9mIHByb3RvPT09J2Z1bmN0aW9uJyApIHsgcHJvdG8gPSBwcm90by5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlWzxLZXk+aWRdID0gcHJvdG9bPEtleT5pZF07IH1cblx0fVxuXHRyZXR1cm4gc2NvcGU7XG59XG4iLCJpbXBvcnQgRnVuY3Rpb24gZnJvbSAnLkZ1bmN0aW9uJztcblxuaW1wb3J0IFNjb3BlIGZyb20gJy4vU2NvcGUvJztcblxuZXhwb3J0IGZ1bmN0aW9uIFRlbXBsYXRlIChodG1sIDpzdHJpbmcsIHNjb3BlIDpTY29wZSkgOnN0cmluZyB7XG5cdHJldHVybiBzY29wZS5fKGh0bWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVuZGVyIChjb2RlIDpzdHJpbmcsIHNjb3BlPyA6U2NvcGUpIDpGdW5jdGlvbiB7XG5cdHJldHVybiBGdW5jdGlvbignd2l0aCh0aGlzKXtyZXR1cm4gJysoIHNjb3BlID8gc2NvcGUuXyhjb2RlKSA6IGNvZGUgKSsnfScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU3RhdGljUmVuZGVyRm5zIChjb2RlcyA6c3RyaW5nW10sIHNjb3BlPyA6U2NvcGUpIDpGdW5jdGlvbltdIHtcblx0cmV0dXJuIEZ1bmN0aW9uKFxuXHRcdCdyZXR1cm5bZnVuY3Rpb24oKXt3aXRoKHRoaXMpe3JldHVybiAnKyggc2NvcGVcblx0XHRcdD8gc2NvcGUuXyhjb2Rlcy5qb2luKCd9fSxmdW5jdGlvbigpe3dpdGgodGhpcyl7cmV0dXJuICcpKVxuXHRcdFx0OiBjb2Rlcy5qb2luKCd9fSxmdW5jdGlvbigpe3dpdGgodGhpcyl7cmV0dXJuICcpXG5cdFx0KSsnfX1dJ1xuXHQpKCk7XG59XG4iLCJpbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKG51bGwsIHtcblx0ZnVuY3Rpb25hbDoge1xuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0dmFsdWU6XG5cdFx0XHR0cnVlXG5cdH0sXG5cdHJlbmRlcjoge1xuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0dmFsdWU6XG5cdFx0XHRmdW5jdGlvbiByZW5kZXIgKGNyZWF0ZUVsZW1lbnQgOkZ1bmN0aW9uLCBjb250ZXh0IDpOb25OdWxsYWJsZTxhbnk+KSB7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVFbGVtZW50KCdzdHlsZScsIGNvbnRleHQuZGF0YSwgY29udGV4dC5jaGlsZHJlbik7XG5cdFx0XHR9XG5cdH1cbn0pO1xuIiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy5kb2N1bWVudCc7XG5pbXBvcnQgaGVhZCBmcm9tICcuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmZpcnN0Q2hpbGQnO1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuXG5leHBvcnQgZnVuY3Rpb24gU3R5bGUgKGNzcz8gOnN0cmluZywgc2NvcGU/IDpTY29wZSkgOkhUTUxTdHlsZUVsZW1lbnQge1xuXHR2YXIgc3R5bGUgOkhUTUxTdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRpZiAoIGNzcyApIHsgc3R5bGUudGV4dENvbnRlbnQgPSBzY29wZSA/IHNjb3BlLl8oY3NzKSA6IGNzczsgfVxuXHRyZXR1cm4gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50KSA6dHlwZW9mIHJlbW92ZSB7XG5cdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXHRyZXR1cm4gcmVtb3ZlO1xufVxuIiwiaW1wb3J0IE9iamVjdCBmcm9tICcuT2JqZWN0JztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG5pbXBvcnQgSWRlbnRpZmllciBmcm9tICcuL0lkZW50aWZpZXInO1xuZXhwb3J0IHsgSWRlbnRpZmllciB9O1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZS8nO1xuZXhwb3J0IHsgU2NvcGUgfTtcblxuaW1wb3J0IHsgVGVtcGxhdGUsIFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH0gZnJvbSAnLi9UZW1wbGF0ZSwgUmVuZGVyLCBTdGF0aWNSZW5kZXJGbnMnO1xuZXhwb3J0IHsgVGVtcGxhdGUsIFJlbmRlciwgU3RhdGljUmVuZGVyRm5zIH07XG5cbmltcG9ydCBTVFlMRSAgZnJvbSAnLi9TVFlMRSc7XG5leHBvcnQgeyBTVFlMRSB9O1xuXG5pbXBvcnQgeyBTdHlsZSwgcmVtb3ZlIH0gZnJvbSAnLi9TdHlsZSwgcmVtb3ZlJztcbmV4cG9ydCB7IFN0eWxlLCByZW1vdmUgfTtcblxudmFyIGpWdWUgPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcblx0SWRlbnRpZmllcjogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBJZGVudGlmaWVyIH0sXG5cdFNjb3BlOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IFNjb3BlIH0sXG5cdFRlbXBsYXRlOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IFRlbXBsYXRlIH0sXG5cdFJlbmRlcjogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBSZW5kZXIgfSxcblx0U3RhdGljUmVuZGVyRm5zOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IFN0YXRpY1JlbmRlckZucyB9LFxuXHRTVFlMRTogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBTVFlMRSB9LFxuXHRTdHlsZTogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBTdHlsZSB9LFxuXHRyZW1vdmU6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogcmVtb3ZlIH0sXG5cdHZlcnNpb246IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogdmVyc2lvbiB9LFxuXHRkZWZhdWx0OiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSB9XG59KTtcbmV4cG9ydCBkZWZhdWx0IGpWdWU7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxjQUFlLFFBQVE7O0FDQXZCLElBQUksVUFBVSxHQU1WO0lBQ0gsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FB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RyxDQUFDO0tBQUU7SUFDOUQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQy9CO0FBRUQsU0FBZ0IsTUFBTSxDQUFFLEtBQXVCO0lBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsT0FBTyxNQUFNLENBQUM7Q0FDZDs7QUNNRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtJQUM5QixVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtJQUN2RSxLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUM3RCxRQUFRLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtJQUNuRSxNQUFNLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtJQUMvRCxlQUFlLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRTtJQUNqRixLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUM3RCxLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUM3RCxNQUFNLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtJQUMvRCxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtJQUNqRSxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxjQUFjLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRTtDQUNuRSxDQUFDLENBQUM7Ozs7Ozs7OzsiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyJ9