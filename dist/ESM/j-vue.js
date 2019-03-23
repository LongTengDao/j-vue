/*!
 * 模块名称：jVue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified dependency for built .vue files. Belong to "Plan J".
 * 模块版本：8.7.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

var version = '8.7.0';

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

export default jVue;
export { Identifier, Render, STYLE, Scope, StaticRenderFns, Style, Template, remove, version };

/*¡ jVue */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIklkZW50aWZpZXIudHMiLCIuLi8uLi9qLWdyb3VwaWZ5L2Rpc3QvRVNNL2otZ3JvdXBpZnkhbWV0YS5qcyIsIi4uLy4uL2otZ3JvdXBpZnkvc3JjL2V4cG9ydC50cyIsIi4uLy4uL2otZ3JvdXBpZnkvZGlzdC9FU00vai1ncm91cGlmeSEuanMiLCJTY29wZS9PYmplY3RTY29wZS50cyIsIlNjb3BlL0Z1bmN0aW9uU2NvcGUudHMiLCJTY29wZS50cyIsIlRlbXBsYXRlLCBSZW5kZXIsIFN0YXRpY1JlbmRlckZucy50cyIsIlNUWUxFLnRzIiwiU3R5bGUsIHJlbW92ZS50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnOC43LjAnOyIsInZhciBkaWN0aW9uYXJ5IDpvYmplY3QgPSB7XG5cdDA6ICcxJywgMTogJzInLCAyOiAnMycsIDM6ICc0JywgNDogJzUnLCA1OiAnNicsIDY6ICc3JywgNzogJzgnLCA4OiAnOScsIDk6ICdhJyxcblx0YTogJ2InLCBiOiAnYycsIGM6ICdkJywgZDogJ2UnLCBlOiAnZicsIGY6ICdnJywgZzogJ2gnLFxuXHRoOiAnaScsIGk6ICdqJywgajogJ2snLCBrOiAnbCcsIGw6ICdtJywgbTogJ24nLCBuOiAnbycsXG5cdG86ICdwJywgcDogJ3EnLCBxOiAncicsIHI6ICdzJywgczogJ3QnLCB0OiAndScsXG5cdHU6ICd2JywgdjogJ3cnLCB3OiAneCcsIHg6ICd5JywgeTogJ3onXG59O1xuXG52YXIgbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMgOnN0cmluZ1tdID0gWyc5J107XG52YXIgbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlciA6c3RyaW5nID0gJzknO1xudmFyIGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleCA6bnVtYmVyID0gMDtcblxuLy92YXIgUkVTRVJWRURfS0VZIDpSZWdFeHAgPSAvXig/OmJyZWFrfGMoPzphKD86c2V8dGNoKXxsYXNzfG9uKD86c3R8dGludWUpKXxkKD86ZSg/OmJ1Z2dlcnxmYXVsdHxsZXRlKXxvKXxlKD86bHNlfG51bXx4KD86cG9ydHx0ZW5kcykpfGYoPzppbmFsbHl8b3J8dW5jdGlvbil8aSg/OmZ8bXBvcnR8big/OnN0YW5jZW9mKT8pfG5ld3xyZXR1cm58cyg/OndpdGNofHN1cGVyKXx0KD86cnl8eXBlb2YpfHYoPzphcnxvaWQpfHcoPzpoaWxlfGl0aCkpJC87XG5cbmV4cG9ydCBmdW5jdGlvbiBJZGVudGlmaWVyICgpIDpzdHJpbmcge1xuXHRcblx0aWYgKCBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyPT09J3onICkge1xuXHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gJzAnO1xuXHRcdGZvciAoIHZhciBjaGFyYWN0ZXJJbmRleCA6bnVtYmVyID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNfbGFzdENoYXJhY3RlckluZGV4OyA7ICkge1xuXHRcdFx0aWYgKCBjaGFyYWN0ZXJJbmRleCApIHtcblx0XHRcdFx0aWYgKCBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1stLWNoYXJhY3RlckluZGV4XT09PSd6JyApIHtcblx0XHRcdFx0XHRsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tjaGFyYWN0ZXJJbmRleF0gPSAnMCc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnNbY2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tjaGFyYWN0ZXJJbmRleF1dO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2xhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXJJbmRleDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyXTtcblx0fVxuXHRcblx0Ly92YXIgaWRlbnRpZmllciA6c3RyaW5nID0gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMuam9pbignJyk7XG5cdC8vaWYgKCBSRVNFUlZFRF9LRVkudGVzdChpZGVudGlmaWVyKSApIHtcblx0Ly9cdGxhdGVzdElkZW50aWZpZXJDaGFyYWN0ZXJzX2xhc3RDaGFyYWN0ZXIgPSBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc1tsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVySW5kZXhdID0gZGljdGlvbmFyeVtsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVyc19sYXN0Q2hhcmFjdGVyXTtcblx0Ly9cdHJldHVybiBsYXRlc3RJZGVudGlmaWVyQ2hhcmFjdGVycy5qb2luKCcnKTtcblx0Ly99XG5cdC8vcmV0dXJuIGlkZW50aWZpZXI7XG5cdFxuXHRyZXR1cm4gbGF0ZXN0SWRlbnRpZmllckNoYXJhY3RlcnMuam9pbignJyk7XG5cdFxufVxuIiwiLyohXG4gKiDmqKHlnZflkI3np7DvvJpAbHRkL2otZ3JvdXBpZnlcbiAqIOaooeWdl+WKn+iDve+8muWwhuS4gOS4quWtl+espuS4suaVsOe7hO+8jOi9rOWMluS4uuWIhuaUr+W8j+S8mOWMluWQjueahOato+WImeihqOi+vuW8j+WMuemFjee7hOOAglxuICAg44CA44CA44CA44CA44CAVHJhbnNmb3JtIGEgc3RyaW5nIGFycmF5IGludG8gYSBicmFuY2gtc3R5bGUgb3B0aW1pemVkIHJlZ0V4cCBncm91cC5cbiAqIOaooeWdl+eJiOacrO+8mjMuMi4xXG4gKiDorrjlj6/mnaHmrL7vvJpMR1BMLTMuMFxuICog5omA5bGe5L2c6ICF77ya6b6Z6IW+6YGTIDxMb25nVGVuZ0Rhb0BMb25nVGVuZ0Rhby5jb20+ICh3d3cuTG9uZ1RlbmdEYW8uY29tKVxuICog6Zeu6aKY5Y+N6aaI77yaaHR0cHM6Ly9HaXRIdWIuY29tL0xvbmdUZW5nRGFvL2otZ3JvdXBpZnkvaXNzdWVzXG4gKiDpobnnm67kuLvpobXvvJpodHRwczovL0dpdEh1Yi5jb20vTG9uZ1RlbmdEYW8vai1ncm91cGlmeS9cbiAqLyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxudHlwZSBtYXAgPSB7IGs6IHN0cmluZ1tdLCB2IDptYXBbXSB9O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgOm1hcCwga2V5IDpzdHJpbmcpIDp2b2lkIHtcblx0aWYgKCBrZXkgKSB7XG5cdFx0dmFyIG9uZSA6Ym9vbGVhbiA9IGtleS5jb2RlUG9pbnRBdCgwKT09PWtleS5jaGFyQ29kZUF0KDApO1xuXHRcdHZhciBjaGFyIDpzdHJpbmcgPSBvbmUgPyBrZXlbMF0gOiBrZXkuc2xpY2UoMCAsMik7XG5cdFx0dmFyIGluZGV4IDpudW1iZXIgPSBncm91cC5rLmluZGV4T2YoY2hhcik7XG5cdFx0aWYgKCBpbmRleD09PS0xICkge1xuXHRcdFx0dmFyIHZhbHVlIDptYXAgPSB7IGs6IFtdLCB2OiBbXSB9O1xuXHRcdFx0Z3JvdXAuay5wdXNoKGNoYXIpO1xuXHRcdFx0Z3JvdXAudi5wdXNoKHZhbHVlKTtcblx0XHR9XG5cdFx0ZWxzZSB7IHZhbHVlID0gZ3JvdXAudltpbmRleF07IH1cblx0XHRhcHBlbmRQb2ludEJyYW5jaCh2YWx1ZSwga2V5LnNsaWNlKG9uZSA/IDEgOiAyKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgOm1hcCwga2V5IDpzdHJpbmcpIDp2b2lkIHtcblx0aWYgKCBrZXkgKSB7XG5cdFx0Zm9yICggdmFyIGtleXMgOnN0cmluZ1tdID0gZ3JvdXAuaywgaW5kZXggOm51bWJlciA9IGtleXMubGVuZ3RoLCBjaGFyIDpzdHJpbmcgPSBrZXkuY2hhckF0KDApOyA7ICkge1xuXHRcdFx0aWYgKCBpbmRleD09PTAgKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA6bWFwID0geyBrOiBbXSwgdjogW10gfTtcblx0XHRcdFx0Z3JvdXAuay5wdXNoKGNoYXIpO1xuXHRcdFx0XHRncm91cC52LnB1c2godmFsdWUpO1xuXHRcdFx0XHRhcHBlbmRDb2RlQnJhbmNoKHZhbHVlLCBrZXkuc2xpY2UoMSkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICgga2V5c1stLWluZGV4XT09PWNoYXIgKSB7XG5cdFx0XHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXAudltpbmRleF0sIGtleS5zbGljZSgxKSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgOm1hcCwgbmVlZEVzY2FwZSA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBicmFuY2hlcyA6c3RyaW5nW10gPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggOnN0cmluZ1tdID0gW107XG5cdGZvciAoIHZhciB2YWx1ZXMgPSBncm91cC52LCBrZXlzID0gZ3JvdXAuaywgbGVuZ3RoID0ga2V5cy5sZW5ndGgsIGluZGV4ID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdHZhciBjaGFyIDpzdHJpbmcgPSBrZXlzW2luZGV4XTtcblx0XHR2YXIgc3ViX2JyYW5jaGVzIDpzdHJpbmcgPSBzb3VyY2lmeSh2YWx1ZXNbaW5kZXhdLCBuZWVkRXNjYXBlKTtcblx0XHRpZiAoIG5lZWRFc2NhcGUgKSB7XG5cdFx0XHRzd2l0Y2ggKCBjaGFyICkge1xuXHRcdFx0XHRjYXNlICcqJzogY2FzZSAnKyc6IGNhc2UgJz8nOiBjYXNlICdeJzogY2FzZSAnJCc6IGNhc2UgJygnOiBjYXNlICcpJzogY2FzZSAnWyc6IGNhc2UgJ10nOiBjYXNlICd7JzogY2FzZSAnfCc6IGNhc2UgJy0nOiBjYXNlICcuJzogY2FzZSAnXFxcXCc6XG5cdFx0XHRcdFx0Y2hhciA9ICdcXFxcJytjaGFyO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRzdWJfYnJhbmNoZXMgPyBicmFuY2hlcy5wdXNoKGNoYXIrc3ViX2JyYW5jaGVzKSA6IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gucHVzaChjaGFyKTtcblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MCA/ICcnIDogYnJhbmNoZXMubGVuZ3RoPT09MSA/IGJyYW5jaGVzWzBdIDogJyg/OicrYnJhbmNoZXMuam9pbignfCcpKycpJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyA6c3RyaW5nW10sIHVGbGFnPyA6Ym9vbGVhbiwgbm9Fc2NhcGU/IDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGdyb3VwIDptYXAgPSB7IGs6IFtdLCB2OiBbXSB9O1xuXHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdGZvciAoIHZhciBsZW5ndGggOm51bWJlciA9IGJyYW5jaGVzLmxlbmd0aCwgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgYXBwZW5kQnJhbmNoKGdyb3VwLCBicmFuY2hlc1tpbmRleF0pOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKCBmdW5jdGlvbiAoKSA6dHlwZW9mIGdyb3VwaWZ5IHtcblx0ZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzIDpzdHJpbmdbXSwgdUZsYWc/IDpib29sZWFuLCBub0VzY2FwZT8gOmJvb2xlYW4pIDpzdHJpbmcge1xuXHRcdHZhciBncm91cCA6bWFwID0geyBrOiBbXSwgdjogW10gfTtcblx0XHR2YXIgYXBwZW5kQnJhbmNoID0gdUZsYWcgPyBhcHBlbmRQb2ludEJyYW5jaCA6IGFwcGVuZENvZGVCcmFuY2g7XG5cdFx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0XHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG5cdH1cblx0Z3JvdXBpZnkudmVyc2lvbiA9IHZlcnNpb247XG5cdHJldHVybiBncm91cGlmeS5ncm91cGlmeSA9IGdyb3VwaWZ5LmRlZmF1bHQgPSBncm91cGlmeTtcbn0gKSgpO1xuIiwiaW1wb3J0ICcuL2otZ3JvdXBpZnkhbWV0YS5qcyc7XG5leHBvcnQgKiBmcm9tICcuLi8uLi9zcmMvZXhwb3J0Jztcbi8qwqEgQGx0ZC9qLWdyb3VwaWZ5ICovIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxuaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otZ3JvdXBpZnknO1xuaW1wb3J0IHsgSWRlbnRpZmllciB9IGZyb20gJy4uL0lkZW50aWZpZXInO1xuXG5leHBvcnQgdHlwZSBPYmplY3RTY29wZSA9IHtcblx0XyA6KHN0cmluZyA6c3RyaW5nKSA9PiBzdHJpbmdcbn07XG5cbmltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmV4cG9ydCB2YXIgU0NPUEUgOk9iamVjdFNjb3BlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbi8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKFNDT1BFKTtcblxuZXhwb3J0IGZ1bmN0aW9uIE9iamVjdFNjb3BlICh0aGlzIDpPYmplY3RTY29wZSwga2V5cyA6c3RyaW5nW10pIDp2b2lkIHtcblx0dGhpcy5fID0gZnVuY3Rpb24gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShzZWFyY2gsIHJlcGxhY2VyKTsgfTtcblx0dmFyIHNlYXJjaCA9IFNlYXJjaChrZXlzKTtcblx0dmFyIHJlcGxhY2VyID0gUmVwbGFjZXIodGhpcyk7XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4OyApIHsgdGhpc1trZXlzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTsgfVxufVxuXG5PYmplY3RTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluaGVyaXRlZE9iamVjdFNjb3BlICh0aGlzIDpPYmplY3RTY29wZSwga2V5cyA6c3RyaW5nW10sIHByb3RvIDpPYmplY3RTY29wZSkgOnZvaWQge1xuXHR0aGlzLl8gPSBmdW5jdGlvbiAoc3RyaW5nIDpzdHJpbmcpIHsgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHNlYXJjaCwgcmVwbGFjZXIpOyB9O1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGtleXMubGVuZ3RoOyBpbmRleDsgKSB7IHRoaXNba2V5c1stLWluZGV4XV0gPSBJZGVudGlmaWVyKCk7IH1cblx0Zm9yICggdmFyIGtleSBpbiBwcm90byApIHsga2V5PT09J18nIHx8IGtleXMucHVzaChrZXkpOyB9XG5cdHZhciBzZWFyY2ggPSBTZWFyY2goa2V5cyk7XG5cdHZhciByZXBsYWNlciA9IFJlcGxhY2VyKHRoaXMpO1xuXHRJbmhlcml0ZWRPYmplY3RTY29wZS5wcm90b3R5cGUgPSBTQ09QRTtcbn1cblxuZnVuY3Rpb24gU2VhcmNoIChrZXlzIDpzdHJpbmdbXSkgOlJlZ0V4cCB7XG5cdHJldHVybiBuZXcgUmVnRXhwKCdfXycrZ3JvdXBpZnkoa2V5cywgZmFsc2UsIHRydWUpKydfXycsICdnJyk7XG59XG5cbmZ1bmN0aW9uIFJlcGxhY2VyIChzY29wZSA6T2JqZWN0U2NvcGUpIHtcblx0cmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2VyIChfX2tleV9fIDpzdHJpbmcpIDpzdHJpbmcgeyByZXR1cm4gc2NvcGVbX19rZXlfXy5zbGljZSgyLCAtMildOyB9O1xufVxuIiwiaW1wb3J0IHsgSWRlbnRpZmllciB9IGZyb20gJy4uL0lkZW50aWZpZXInO1xuaW1wb3J0IHsgT2JqZWN0U2NvcGUgfSBmcm9tICcuL09iamVjdFNjb3BlJztcblxuZXhwb3J0IHR5cGUgRnVuY3Rpb25TY29wZSA9IHtcblx0KC4uLmFyZ3MgOmFueVtdKSA6c3RyaW5nXG5cdHByb3RvdHlwZSA6T2JqZWN0U2NvcGVcblx0XyA6KHN0cmluZyA6c3RyaW5nKSA9PiBzdHJpbmdcbn07XG5cbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxudmFyIFNFQVJDSCA6UmVnRXhwID0gL19fW2Etel1bYS16MC05XSooPzpfW2EtejAtOV0rKSpfXy9pZztcblxuZXhwb3J0IGZ1bmN0aW9uIEZ1bmN0aW9uU2NvcGUgKHRoaXMgOnZvaWQsIGNhY2hlIDpPYmplY3RTY29wZSkgOkZ1bmN0aW9uU2NvcGUge1xuXHRmdW5jdGlvbiBzY29wZSAoLi4uYXJncyA6YW55W10pIDpzdHJpbmc7XG5cdGZ1bmN0aW9uIHNjb3BlICh2YWx1ZSA6c3RyaW5nIHwgb2JqZWN0IHwgYW55W10pIDpzdHJpbmcgeyByZXR1cm4gc2NvcGlmeShhcmd1bWVudHMubGVuZ3RoPT09MSA/IHZhbHVlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDApLCBfc2NvcGUpOyB9XG5cdHNjb3BlLnByb3RvdHlwZSA9IGNhY2hlO1xuXHRzY29wZS5fID0gZnVuY3Rpb24gKHN0cmluZyA6c3RyaW5nKSB7IHJldHVybiBzdHJpbmcucmVwbGFjZShTRUFSQ0gsIF9yZXBsYWNlcik7IH07XG5cdGZ1bmN0aW9uIF9yZXBsYWNlciAoX19rZXlfXyA6c3RyaW5nKSA6c3RyaW5nIHsgcmV0dXJuIF9zY29wZShfX2tleV9fLnNsaWNlKDIsIC0yKSk7IH1cblx0ZnVuY3Rpb24gX3Njb3BlIChrZXkgOnN0cmluZykgOnN0cmluZyB7IHJldHVybiBjYWNoZVtrZXldIHx8ICggY2FjaGVba2V5XSA9IElkZW50aWZpZXIoKSApOyB9XG5cdHJldHVybiBzY29wZTtcbn1cblxuZnVuY3Rpb24gc2NvcGlmeSAodmFsdWUgOnN0cmluZyB8IG9iamVjdCB8IGFueVtdLCBfc2NvcGUgOihrZXkgOnN0cmluZykgPT4gc3RyaW5nKSA6c3RyaW5nIHtcblx0dmFyIGtleXMgOnN0cmluZyxcblx0XHRpbmRleCA6bnVtYmVyLFxuXHRcdHZhbHVlcyA6c3RyaW5nW10sXG5cdFx0a2V5IDpzdHJpbmc7XG5cdGlmICggdmFsdWUgKSB7XG5cdFx0c3dpdGNoICggdHlwZW9mIHZhbHVlICkge1xuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0aWYgKCB2YWx1ZS5pbmRleE9mKCcgJyk9PT0gLTEgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF9zY29wZSh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5cyA9ICcnO1xuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cdFx0XHRcdFx0Zm9yICggaW5kZXggPSB2YWx1ZXMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHZhbHVlW2luZGV4XTtcblx0XHRcdFx0XHRcdGlmICgga2V5ICkgeyBrZXlzID0gX3Njb3BlKGtleSkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdGtleXMgPSAnJztcblx0XHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0XHRmb3IgKCBpbmRleCA9ICggPGFueVtdPnZhbHVlICkubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0XHRcdGtleSA9IHNjb3BpZnkodmFsdWVbaW5kZXhdLCBfc2NvcGUpO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgKSB7IGtleXMgPSBrZXkrJyAnK2tleXM7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGtleXMgJiYga2V5cy5zbGljZSgwLCAtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICgga2V5IGluIHZhbHVlICkge1xuXHRcdFx0XHRcdFx0aWYgKCB2YWx1ZVtrZXldICkgeyBrZXlzICs9ICcgJytfc2NvcGUoa2V5KTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4ga2V5cyAmJiBrZXlzLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn0iLCJpbXBvcnQgeyBPYmplY3RTY29wZSwgSW5oZXJpdGVkT2JqZWN0U2NvcGUsIFNDT1BFIH0gZnJvbSAnLi9TY29wZS9PYmplY3RTY29wZSc7XG5pbXBvcnQgeyBGdW5jdGlvblNjb3BlIH0gZnJvbSAnLi9TY29wZS9GdW5jdGlvblNjb3BlJztcblxudHlwZSBTY29wZSA9IE9iamVjdFNjb3BlIHwgRnVuY3Rpb25TY29wZTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG52YXIgS0VZUyA6UmVnRXhwID0gL1thLXpdW2EtejAtOV0qKD86X1thLXowLTldKykqL2lnO1xudmFyIEVNUFRZIDpbXSA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTY29wZSAodGhpcyA6U2NvcGVbXSB8IFNjb3BlIHwgYW55LCBrZXlzPyA6c3RyaW5nKSA6U2NvcGUge1xuXHRpZiAoIHR5cGVvZiBrZXlzPT09J3N0cmluZycgKSB7XG5cdFx0aWYgKCBpc0FycmF5KHRoaXMpICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IG1peCg8U2NvcGVbXT50aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IDxPYmplY3RTY29wZT50aGlzKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgKCA8RnVuY3Rpb24+dGhpcyApLnByb3RvdHlwZSBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gbmV3IEluaGVyaXRlZE9iamVjdFNjb3BlKGtleXMubWF0Y2goS0VZUykgfHwgRU1QVFksIEluaGVyaXRlZE9iamVjdFNjb3BlLnByb3RvdHlwZSA9IDxPYmplY3RTY29wZT4oIDxGdW5jdGlvblNjb3BlPnRoaXMgKS5wcm90b3R5cGUpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBuZXcgT2JqZWN0U2NvcGUoa2V5cy5tYXRjaChLRVlTKSB8fCBFTVBUWSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGlzQXJyYXkodGhpcykgKSB7IHJldHVybiBGdW5jdGlvblNjb3BlKG1peCg8U2NvcGVbXT50aGlzKSk7IH1cblx0XHRlbHNlIGlmICggdGhpcyBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUoPE9iamVjdFNjb3BlPnRoaXMpKTsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgdGhpcz09PSdmdW5jdGlvbicgJiYgKCA8RnVuY3Rpb24+dGhpcyApLnByb3RvdHlwZSBpbnN0YW5jZW9mIE9iamVjdFNjb3BlICkgeyByZXR1cm4gRnVuY3Rpb25TY29wZShjcmVhdGUoPE9iamVjdFNjb3BlPiggPEZ1bmN0aW9uU2NvcGU+dGhpcyApLnByb3RvdHlwZSkpOyB9XG5cdFx0ZWxzZSB7IHJldHVybiBGdW5jdGlvblNjb3BlKGNyZWF0ZShTQ09QRSkpOyB9XG5cdH1cbn07XG5cbmZ1bmN0aW9uIG1peCAodGhpcyA6dm9pZCwgcHJvdG9zIDpTY29wZVtdKSA6T2JqZWN0U2NvcGUge1xuXHR2YXIgc2NvcGUgOk9iamVjdFNjb3BlID0gY3JlYXRlKFNDT1BFKTtcblx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gcHJvdG9zLmxlbmd0aCwgaW5kZXggPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0dmFyIHByb3RvIDpTY29wZSA9IHByb3Rvc1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgcHJvdG89PT0nZnVuY3Rpb24nICkgeyBwcm90byA9ICggPEZ1bmN0aW9uU2NvcGU+cHJvdG8gKS5wcm90b3R5cGU7IH1cblx0XHRmb3IgKCB2YXIgaWQgaW4gcHJvdG8gKSB7IHNjb3BlW2lkXSA9IHByb3RvW2lkXTsgfVxuXHR9XG5cdHJldHVybiBzY29wZTtcbn1cbiIsImltcG9ydCBGdW5jdGlvbiBmcm9tICcuRnVuY3Rpb24nO1xuXG5pbXBvcnQgU2NvcGUgZnJvbSAnLi9TY29wZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBUZW1wbGF0ZSAoaHRtbCA6c3RyaW5nLCBzY29wZSA6U2NvcGUpIDpzdHJpbmcge1xuXHRyZXR1cm4gc2NvcGUuXyhodG1sKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlbmRlciAoY29kZSA6c3RyaW5nLCBzY29wZT8gOlNjb3BlKSA6RnVuY3Rpb24ge1xuXHRyZXR1cm4gRnVuY3Rpb24oJ3dpdGgodGhpcyl7cmV0dXJuICcrKCBzY29wZSA/IHNjb3BlLl8oY29kZSkgOiBjb2RlICkrJ30nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXRpY1JlbmRlckZucyAoY29kZXMgOnN0cmluZ1tdLCBzY29wZT8gOlNjb3BlKSA6RnVuY3Rpb25bXSB7XG5cdHJldHVybiBGdW5jdGlvbihcblx0XHQncmV0dXJuW2Z1bmN0aW9uKCl7d2l0aCh0aGlzKXtyZXR1cm4gJysoIHNjb3BlXG5cdFx0XHQ/IHNjb3BlLl8oY29kZXMuam9pbignfX0sZnVuY3Rpb24oKXt3aXRoKHRoaXMpe3JldHVybiAnKSlcblx0XHRcdDogY29kZXMuam9pbignfX0sZnVuY3Rpb24oKXt3aXRoKHRoaXMpe3JldHVybiAnKVxuXHRcdCkrJ319XSdcblx0KSgpO1xufVxuIiwiaW1wb3J0IE9iamVjdCBmcm9tICcuT2JqZWN0JztcblxuZXhwb3J0IGRlZmF1bHQgPHsgZnVuY3Rpb25hbCA6dHJ1ZSwgcmVuZGVyIDpGdW5jdGlvbiB9Pk9iamVjdC5jcmVhdGUobnVsbCwge1xuXHRmdW5jdGlvbmFsOiB7XG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHR2YWx1ZTpcblx0XHRcdHRydWVcblx0fSxcblx0cmVuZGVyOiB7XG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHR2YWx1ZTpcblx0XHRcdGZ1bmN0aW9uIHJlbmRlciAoY3JlYXRlRWxlbWVudCwgY29udGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudCgnc3R5bGUnLCBjb250ZXh0LmRhdGEsIGNvbnRleHQuY2hpbGRyZW4pO1xuXHRcdFx0fVxuXHR9XG59KTsiLCJpbXBvcnQgZG9jdW1lbnQgZnJvbSAnLmRvY3VtZW50JztcbmltcG9ydCBoZWFkIGZyb20gJy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZmlyc3RDaGlsZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBTdHlsZSAoY3NzPyA6c3RyaW5nLCBzY29wZT8pIDpIVE1MU3R5bGVFbGVtZW50IHtcblx0dmFyIHN0eWxlIDpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0aWYgKCBjc3MgKSB7IHN0eWxlLnRleHRDb250ZW50ID0gc2NvcGUgPyBzY29wZS5fKGNzcykgOiBjc3M7IH1cblx0cmV0dXJuIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSA6SFRNTFN0eWxlRWxlbWVudCkgOnR5cGVvZiByZW1vdmUge1xuXHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHJlbW92ZTtcbn1cbiIsImltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IHsgSWRlbnRpZmllciB9IGZyb20gJy4vSWRlbnRpZmllcic7XG5leHBvcnQgeyBJZGVudGlmaWVyIH07XG5cbmltcG9ydCBTY29wZSBmcm9tICcuL1Njb3BlJztcbmV4cG9ydCB7IFNjb3BlIH07XG5cbmltcG9ydCB7IFRlbXBsYXRlLCBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyB9IGZyb20gJy4vVGVtcGxhdGUsIFJlbmRlciwgU3RhdGljUmVuZGVyRm5zJztcbmV4cG9ydCB7IFRlbXBsYXRlLCBSZW5kZXIsIFN0YXRpY1JlbmRlckZucyB9O1xuXG5pbXBvcnQgU1RZTEUgIGZyb20gJy4vU1RZTEUnO1xuZXhwb3J0IHsgU1RZTEUgfTtcblxuaW1wb3J0IHsgU3R5bGUsIHJlbW92ZSB9IGZyb20gJy4vU3R5bGUsIHJlbW92ZSc7XG5leHBvcnQgeyBTdHlsZSwgcmVtb3ZlIH07XG5cbnZhciBqVnVlID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG5cdElkZW50aWZpZXI6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogSWRlbnRpZmllciB9LFxuXHRTY29wZTogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBTY29wZSB9LFxuXHRUZW1wbGF0ZTogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBUZW1wbGF0ZSB9LFxuXHRSZW5kZXI6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogUmVuZGVyIH0sXG5cdFN0YXRpY1JlbmRlckZuczogeyBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBTdGF0aWNSZW5kZXJGbnMgfSxcblx0U1RZTEU6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogU1RZTEUgfSxcblx0U3R5bGU6IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogU3R5bGUgfSxcblx0cmVtb3ZlOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IHJlbW92ZSB9LFxuXHR2ZXJzaW9uOiB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IHZlcnNpb24gfSxcblx0ZGVmYXVsdDogeyBjb25maWd1cmFibGU6IGZhbHNlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0gfVxufSk7XG5leHBvcnQgZGVmYXVsdCBqVnVlO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsY0FBZSxPQUFPOztBQ0F0QixJQUFJLFVBQVUsR0FBVztJQUN4QixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMs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R0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUFFO0lBQzlELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMvQjtBQUVELFNBQWdCLE1BQU0sQ0FBRSxLQUF1QjtJQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLE9BQU8sTUFBTSxDQUFDO0NBQ2Q7O0FDUUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDOUIsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7SUFDdkUsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDN0QsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7SUFDbkUsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDL0QsZUFBZSxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUU7SUFDakYsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDN0QsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDN0QsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDL0QsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7SUFDakUsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsY0FBYyxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUU7Q0FDbkUsQ0FBQyxDQUFDOzs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8ifQ==