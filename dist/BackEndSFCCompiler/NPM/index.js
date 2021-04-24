'use strict';

const version$3 = '26.1.0';

const Error$1 = Error;

const TypeError$1 = TypeError;

const SyntaxError$1 = SyntaxError;

const isBuffer = Buffer.isBuffer;

const freeze = Object.freeze;

const undefined$1 = void null;

const test = RegExp.prototype.test;

const bind = Function.prototype.bind;

const RegExp$1 = RegExp;

const Infinity = 1/0;

const Object$1 = Object;

const throwError = (
	/*! j-globals: throw.Error (internal) */
	function throwError (message) {
		throw Error$1(message);
	}
	/*¡ j-globals: throw.Error (internal) */
);

const hasOwnProperty = Object.prototype.hasOwnProperty;

const toString = Object.prototype.toString;

const isArray = (
	/*! j-globals: Array.isArray (polyfill) */
	Array.isArray || function isArray (value) {
		return /*#__PURE__*/ toString.apply(value)==='[object Array]';
	}
	/*¡ j-globals: Array.isArray (polyfill) */
);

const has$2 = typeof Map==='undefined' ? undefined$1 : Map.prototype.has;

const apply$1 = Reflect.apply;

const Array$1 = Array;

const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

const NULL = (
	/*! j-globals: null.prototype (internal) */
	Object.seal
		? /*#__PURE__*/Object.preventExtensions(Object.create(null))
		: null
	/*¡ j-globals: null.prototype (internal) */
);

var ARGS$1 = { length: 0 };

var isEnum = /*#__PURE__*/propertyIsEnumerable.call.bind(propertyIsEnumerable);
var hasOwn = /*#__PURE__*/function () {
	return hasOwnProperty.bind
		? hasOwnProperty.call.bind(hasOwnProperty)
		: function (object, key) { return hasOwnProperty.call(object, key); };
}();// && object!=null

var create$1 = Object.create;

const isMap = (
	/*! j-globals: class.isMap (internal) */
	has$2
		? function isMap (value) {
			try { apply$1(has$2, value, ARGS$1); }
			catch (error) { return false; }
			return true;
		}
		: function isMap () { return false; }
	/*¡ j-globals: class.isMap (internal) */
);

const has$1 = typeof Set==='undefined' ? undefined$1 : Set.prototype.has;

const isSet = (
	/*! j-globals: class.isSet (internal) */
	has$1
		? function isSet (value) {
			try { apply$1(has$1, value, ARGS$1); }
			catch (error) { return false; }
			return true;
		}
		: function isSet () { return false; }
	/*¡ j-globals: class.isSet (internal) */
);

const valueOf = Date.prototype.valueOf;

const isDate = (
	/*! j-globals: class.isDate (internal) */
	function isDate (value) {
		try { apply$1(valueOf, value, ARGS$1); }
		catch (error) { return false; }
		return true;
	}
	/*¡ j-globals: class.isDate (internal) */
);

var ARGS = { length: 1, 0: '' };
const isRegExp = (
	/*! j-globals: class.isRegExp (internal) */
	function isRegExp (value) {
		try { apply$1(test, value, ARGS); }
		catch (error) { return false; }
		return true;
	}
	/*¡ j-globals: class.isRegExp (internal) */
);

const create = Object.create;

const toStringTag = Symbol.toStringTag;

const defineProperty = Object.defineProperty;

const Object_assign = Object.assign;

const Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(NULL); }
		if ( Object_assign ) { Object_assign(exports, addOnOrigin); }
		else { for ( var key in addOnOrigin ) { if ( hasOwn(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } } }
		exports.default = exports;
		if ( toStringTag ) {
			var descriptor = create(NULL);
			descriptor.value = 'Module';
			defineProperty(exports, toStringTag, descriptor);
		}
		typeof exports==='function' && exports.prototype && freeze(exports.prototype);
		return freeze(exports);
	}
	/*¡ j-globals: default (internal) */
);

/*!@preserve@license
 * 模块名称：j-es
 * 模块功能：ECMAScript 语法相关共享实用程序。从属于“简计划”。
   　　　　　ECMAScript syntax util. Belong to "Plan J".
 * 模块版本：0.12.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-es/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-es/
 */

var version$2 = '0.12.0';

var RESERVED_WORD_ES3 = /^(?:break|c(?:a(?:se|tch)|lass|on(?:st|tinue))|d(?:o|e(?:bugger|fault|lete))|e(?:lse|num|x(?:port|tends))|f(?:alse|inally|or|unction)|i(?:f|mport|n(?:stanceof)?)|n(?:ew|ull)|return|s(?:uper|witch)|t(?:h(?:is|row)|r(?:y|ue)|ypeof)|v(?:ar|oid)|w(?:hile|ith))$/;

var RESERVED_WORD_ESM = /^(?:arguments|break|c(?:a(?:se|tch)|lass|on(?:st|tinue))|d(?:o|e(?:bugger|fault|lete))|e(?:lse|num|val|x(?:port|tends))|f(?:alse|inally|or|unction)|i(?:f|mp(?:lements|ort)|n(?:stanceof|terface)?)|let|n(?:ew|ull)|p(?:ackage|r(?:ivate|otected)|ublic)|return|s(?:tatic|uper|witch)|t(?:h(?:is|row)|r(?:y|ue)|ypeof)|v(?:ar|oid)|w(?:hile|ith)|yield)$/;

var IDENTIFIER_NAME_ES6 = /^(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D3-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDF00-\uDF1C\uDF27\uDF30-\uDF50\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD46\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E\uDC5F\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*$/;

var IDENTIFIER_NAME_ES5 = /^[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u021F\u0222-\u0233\u0250-\u02AD\u02B0-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u02EE\u037A\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D7\u03DA-\u03F3\u0400-\u0481\u048C-\u04C4\u04C7\u04C8\u04CB\u04CC\u04D0-\u04F5\u04F8\u04F9\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0640-\u064A\u0671-\u06D3\u06D5\u06E5\u06E6\u06FA-\u06FC\u0710\u0712-\u072C\u0780-\u07A5\u0905-\u0939\u093D\u0950\u0958-\u0961\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B36-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CDE\u0CE0\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D60\u0D61\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F6A\u0F88-\u0F8B\u1000-\u1021\u1023-\u1027\u1029\u102A\u1050-\u1055\u10A0-\u10C5\u10D0-\u10F6\u1100-\u1159\u115F-\u11A2\u11A8-\u11F9\u1200-\u1206\u1208-\u1246\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1286\u1288\u128A-\u128D\u1290-\u12AE\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12CE\u12D0-\u12D6\u12D8-\u12EE\u12F0-\u130E\u1310\u1312-\u1315\u1318-\u131E\u1320-\u1346\u1348-\u135A\u13A0-\u13F4\u1401-\u166C\u166F-\u1676\u1681-\u169A\u16A0-\u16EA\u1780-\u17B3\u1820-\u1877\u1880-\u18A8\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u207F\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2131\u2133-\u2139\u2160-\u2183\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303A\u3041-\u3094\u309D\u309E\u30A1-\u30FA\u30FC-\u30FE\u3105-\u312C\u3131-\u318E\u31A0-\u31B7\u3400-\u4DB5\u4E00-\u9FA5\uA000-\uA48C\uAC00-\uD7A3\uF900-\uFA2D\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE72\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u021F\u0222-\u0233\u0250-\u02AD\u02B0-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u02EE\u0300-\u034E\u0360-\u0362\u037A\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D7\u03DA-\u03F3\u0400-\u0481\u0483-\u0486\u048C-\u04C4\u04C7\u04C8\u04CB\u04CC\u04D0-\u04F5\u04F8\u04F9\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05A1\u05A3-\u05B9\u05BB-\u05BD\u05BF\u05C1\u05C2\u05C4\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0640-\u0655\u0660-\u0669\u0670-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u06F0-\u06FC\u0710-\u072C\u0730-\u074A\u0780-\u07B0\u0901-\u0903\u0905-\u0939\u093C-\u094D\u0950-\u0954\u0958-\u0963\u0966-\u096F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A02\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A59-\u0A5C\u0A5E\u0A66-\u0A74\u0A81-\u0A83\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B36-\u0B39\u0B3C-\u0B43\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE7-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C60\u0C61\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3E-\u0D43\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D60\u0D61\u0D66-\u0D6F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC\u0EDD\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6A\u0F71-\u0F84\u0F86-\u0F8B\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1021\u1023-\u1027\u1029\u102A\u102C-\u1032\u1036-\u1039\u1040-\u1049\u1050-\u1059\u10A0-\u10C5\u10D0-\u10F6\u1100-\u1159\u115F-\u11A2\u11A8-\u11F9\u1200-\u1206\u1208-\u1246\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1286\u1288\u128A-\u128D\u1290-\u12AE\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12CE\u12D0-\u12D6\u12D8-\u12EE\u12F0-\u130E\u1310\u1312-\u1315\u1318-\u131E\u1320-\u1346\u1348-\u135A\u1369-\u1371\u13A0-\u13F4\u1401-\u166C\u166F-\u1676\u1681-\u169A\u16A0-\u16EA\u1780-\u17D3\u17E0-\u17E9\u1810-\u1819\u1820-\u1877\u1880-\u18A9\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u207F\u20D0-\u20DC\u20E1\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2131\u2133-\u2139\u2160-\u2183\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303A\u3041-\u3094\u3099\u309A\u309D\u309E\u30A1-\u30FE\u3105-\u312C\u3131-\u318E\u31A0-\u31B7\u3400-\u4DB5\u4E00-\u9FA5\uA000-\uA48C\uAC00-\uD7A3\uF900-\uFA2D\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE20-\uFE23\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE72\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF65-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/;

var IDENTIFIER_NAME_ES3 = /^[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u01F5\u01FA-\u0217\u0250-\u02A8\u02B0-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u037A\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D6\u03DA\u03DC\u03DE\u03E0\u03E2-\u03F3\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E-\u0481\u0490-\u04C4\u04C7\u04C8\u04CB\u04CC\u04D0-\u04EB\u04EE-\u04F5\u04F8\u04F9\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0640-\u064A\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D3\u06D5\u06E5\u06E6\u0905-\u0939\u093D\u0950\u0958-\u0961\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B36-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CDE\u0CE0\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D60\u0D61\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F69\u0F88-\u0F8B\u10A0-\u10C5\u10D0-\u10F6\u1100-\u1159\u115F-\u11A2\u11A8-\u11F9\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u207F\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u2131\u2133-\u2138\u2160-\u2182\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3041-\u3094\u309D\u309E\u30A1-\u30FA\u30FC-\u30FE\u3105-\u312C\u3131-\u318E\u4E00-\u9FA5\uAC00-\uD7A3\uF900-\uFA2D\uFB00-\uFB06\uFB13-\uFB17\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE72\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u01F5\u01FA-\u0217\u0250-\u02A8\u02B0-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u0300-\u0345\u0360\u0361\u037A\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D6\u03DA\u03DC\u03DE\u03E0\u03E2-\u03F3\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E-\u0481\u0483-\u0486\u0490-\u04C4\u04C7\u04C8\u04CB\u04CC\u04D0-\u04EB\u04EE-\u04F5\u04F8\u04F9\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05A1\u05A3-\u05B9\u05BB-\u05BD\u05BF\u05C1\u05C2\u05C4\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0640-\u0652\u0660-\u0669\u0670-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0901-\u0903\u0905-\u0939\u093C-\u094D\u0950-\u0954\u0958-\u0963\u0966-\u096F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A02\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A59-\u0A5C\u0A5E\u0A66-\u0A74\u0A81-\u0A83\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B36-\u0B39\u0B3C-\u0B43\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE7-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C60\u0C61\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3E-\u0D43\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D60\u0D61\u0D66-\u0D6F\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC\u0EDD\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F69\u0F71-\u0F84\u0F86-\u0F8B\u0F90-\u0F95\u0F97\u0F99-\u0FAD\u0FB1-\u0FB7\u0FB9\u10A0-\u10C5\u10D0-\u10F6\u1100-\u1159\u115F-\u11A2\u11A8-\u11F9\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u207F\u20D0-\u20DC\u20E1\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u2131\u2133-\u2138\u2160-\u2182\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3041-\u3094\u3099\u309A\u309D\u309E\u30A1-\u30FE\u3105-\u312C\u3131-\u318E\u4E00-\u9FA5\uAC00-\uD7A3\uF900-\uFA2D\uFB00-\uFB06\uFB13-\uFB17\uFB1E-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE20-\uFE23\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE72\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF65-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/;

var Cf = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC38]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/g;

var _Infinity = -Infinity;

var is$1                                                = Object$1.is || function is (value        ) { return value===0 && 1/value<0; };
function NumericLiteral (value        )         {
	return value===Infinity || value===_Infinity || value!==value
		? /*#__PURE__*/ throwError('NumericLiteral('+value+')')
		: ( is$1(value, -0) ? '-' : '' )+value;
}

var CANT_IN_SINGLE_QUOTE = /[\n\r'\\\u2028\u2029]/g;
function staticallyEscape (cant_in_single_quote                              )         {
	return CHAR_TO_ESCAPED[cant_in_single_quote];
}

var CHAR_TO_ESCAPED = { '\n': '\\n', '\r': '\\r', '\'': '\\\'', '\\': '\\\\', '\u2028': '\\u2028', '\u2029': '\\u2029' };
function dynamicallyEscape (char_in_cf        )         {
	if ( char_in_cf.length>1 ) {
		return dynamicallyEscape(char_in_cf.charAt(0))+dynamicallyEscape(char_in_cf.charAt(1));
	}
	var hex         = char_in_cf.charCodeAt(0).toString(16).toUpperCase();
	switch ( hex.length ) {
		case 4:
			return '\\u'+hex;
		case 3:
			return '\\u0'+hex;
		case 2:
			return '\\x'+hex;
	}
	return '\\x0'+hex;
}

                                           

function StringLiteral (value        )         {
	return '\''
		+value
		.replace(CANT_IN_SINGLE_QUOTE, staticallyEscape            )
		.replace(Cf, dynamicallyEscape            )
		+'\'';
}

var EOL$2 = /\\[^\s\S]|[\n\r\/\u2028\u2029]/g;
function EOL_replacer (part        ) {
	switch ( part ) {
		case '\n':
		case '\\\n':
			return '\\n';
		case '\r':
		case '\\\r':
			return '\\r';
		case '/':
			return '\\/';
		case '\u2028':
		case '\\\u2028':
			return '\\u2028';
		case '\u2029':
		case '\\\u2029':
			return '\\u2029';
	}
	return part;
}
var AS_ES5 = ''+RegExp$1('')==='//' || ''+RegExp$1('/')==='///' || ''+RegExp$1('\n')==='/\n/'
	? function AS_ES5 (literal        ) {
		var index         = literal.length;
		while ( literal.charAt(--index)!=='/' ) { }
		var source         = literal.slice(1, index);
		source = source ? source.replace(EOL$2, EOL_replacer) : '(?:)';
		return '/'+source+literal.slice(index);
	}
	: function (literal        ) { return literal; };
var MAYBE_ES3 = /\/[gim]*$/;
var SLASH_NUL = /(?!^)\/(?![a-z]*$)|\x00|\\[\s\S]/g;
function SLASH_NUL_replacer (part        ) { return part==='\x00' ? '\\x00' : part==='/' ? '\\/' : part; }
function RegularExpressionLiteral (value        )         {
	var literal         = AS_ES5(''+value);
	return MAYBE_ES3.test(literal)
		? literal.replace(Cf, dynamicallyEscape            ).replace(SLASH_NUL, SLASH_NUL_replacer)
		: literal;
}

function BigIntLiteral (value        )         {
	return value+'n';
}

var test_bind$2 = bind
	? /*#__PURE__*/ bind.bind(test)                                                                       
	: function (            re        ) {
		return function (            string        ) {
			return test.call(re, string);
		};
	};

var IS_LIKE_SAFE_INTEGER = /*#__PURE__*/ test_bind$2(/^(?:0|[1-9]\d{0,15})$/);
var IS_LIKE_ARRAY_INDEX = /*#__PURE__*/ test_bind$2(/^(?:0|[1-4]\d{0,9}|[5-9]\d{0,8})$/);
function isArrayIndex (key        )          {
	return IS_LIKE_ARRAY_INDEX(key) && key       <4294967295;
}
function isIntegerIndex (key        )          {
	return IS_LIKE_SAFE_INTEGER(key) && key       <=9007199254740991;
}
var IS_RESERVED_WORD_ES3 = /*#__PURE__*/ test_bind$2(RESERVED_WORD_ES3);
var IS_RESERVED_WORD_ESM = /*#__PURE__*/ test_bind$2(RESERVED_WORD_ESM);
function isReservedWord (name        , noStrict          )          {
	return noStrict
		? IS_RESERVED_WORD_ES3(name)
		: IS_RESERVED_WORD_ESM(name);
}
var IS_IDENTIFIER_NAME_ES6 = /*#__PURE__*/ test_bind$2(IDENTIFIER_NAME_ES6);
var IS_IDENTIFIER_NAME_ES3 = /*#__PURE__*/ test_bind$2(IDENTIFIER_NAME_ES3);
var IS_IDENTIFIER_NAME_ES5 = /*#__PURE__*/ test_bind$2(IDENTIFIER_NAME_ES5);
function isIdentifierName (name        , ES         )          {
	if ( ES ) {
		if ( ES>=6 ) { return IS_IDENTIFIER_NAME_ES6(name); }
		if ( ES>=5 ) { return IS_IDENTIFIER_NAME_ES5(name); }
	}
	return IS_IDENTIFIER_NAME_ES3(name);
}
function isIdentifier (id        , ES         , noStrict          )          {
	return isIdentifierName(id, ES) && !isReservedWord(id, noStrict);
}
function isPropertyName (key        , ES         )          {
	return isIdentifierName(key, ES)
		? ES >=5 || !IS_RESERVED_WORD_ES3(key)
		: isIntegerIndex(key);
}
function PropertyName (key        , ES         )         {
	return isPropertyName(key, ES) ? key : StringLiteral(key);// ['__proto__']
}
function PropertyAccessor (key        , ES         )         {
	if ( isIdentifierName(key, ES) ) { if ( ES >=5 || !IS_RESERVED_WORD_ES3(key) ) { return '.' + key; } }
	else { if ( isIntegerIndex(key) ) { return '[' + key + ']'; } }
	return '[' + StringLiteral(key) + ']';
}
function PropertyAccessors (keys          , ES         )         {
	var propertyAccessors         = '';
	for ( var length = keys.length, index = 0; index<length; ++index ) {
		propertyAccessors += PropertyAccessor(keys[index] , ES);
	}
	return propertyAccessors;
}

function Primitive                                       
	                 
		                   
		                  
		             
	     
		                                     
			              
			                                                      
			                  
			               
		           
	   (
	value                      ,
	key              ,
	object        ,
	options         
)         {
	switch ( value ) {
		case null:
			return 'null';
		case true:
			return 'true';
		case false:
			return 'false';
		case undefined$1:
			return options.undefined || '';
		case Infinity:
			return options.Infinity || '';
		case _Infinity:
			return options.Infinity ? '-'+options.Infinity : '';
	}
	if ( value!==value ) { return options.NaN || ''; }
	switch ( typeof value ) {
		case 'number':
			return ( is$1(value, -0) ? '-' : '' )+value;
		case 'string':
			return StringLiteral(value);
		case 'bigint':
			return options.bigint ? options.bigint(value, key, object) : '';
		case 'object':
			return (
				options.Array && isArray(value) ? options.Array(value, key, object) :
					options.Map && isMap(value) ? options.Map(value, key, object) :
						options.Set && isSet(value) ? options.Set(value, key, object) :
							options.Date && isDate(value) ? options.Date(value, key, object) :
								options.RegExp && isRegExp(value) ? options.RegExp(value, key, object) :
									options.object ? options.object(value, key, object) : ''
			);
		case 'function':
			return options['function'] ? options['function'](value, key, object) : '';
		case 'symbol':
			return options.symbol ? options.symbol(value, key, object) : '';
	}
	return options.unknown ? options.unknown(value, key, object) : '';
}

function ObjectLiteral (object                        , options   
	            
	                                          
	                                           
	                  
	                                            
	                     
	                                           
	                                           
	                   
 )         {
	var pairs           = [];
	var pairs_length         = 0;
	var open         = '{';
	var close         = '}';
	var _colon_         = ( options.key_colon || '' )+':'+( options.colon_value || '' );
	var ES         = options.ES || 0;
	for ( var key in object ) {
		if ( hasOwnProperty.call(object, key) ) {
			var value = Primitive(object[key                ], key, object, options      );
			if ( value ) {
				if ( key==='__proto__' && !options.__safe__ ) {
					if ( ES>=6 ) { key = '[\'__proto__\']'       ; }
					else {
						open = '/*#__PURE__*/function(p,o){o.__proto__=_.p;return o}({'+( options.open_first || '' )+'p'+_colon_+value+( options.last_close || '' )+'},{';
						close = '})';
						value = 'null';
					}
				}
				else { key = PropertyName(key, ES)       ; }
				pairs[pairs_length++] = key+_colon_+value;
			}
		}
	}
	return open+(
		pairs_length
			? ( options.open_first || '' )+pairs.join(( options.value_comma || '' )+','+( options.comma_next || '' ))+( options.last_close || '' )
			: ( options.open_close || '' )
	)+close;
}

function ArrayLiteral (
	array                 ,
	options   
		            
		                                   
		                                    
		                    
		                                    
		                                    
	 
)         {
	var items          ;
	var length = array.length;
	if ( length===1 ) {
		var item = Primitive(array[0], 0, array, options      );
		if ( item || options.ES >=5 ) { items = [ item ]; }
		else {
			return '/*#__PURE__*/function(){var a=['+( options.open_first || '' )+( options.last_close || '' )+'];a.length=1;return a}()';
		}
	}
	else {
		items = [];
		for ( var index = 0; index<length; ++index ) {
			items[index] = Primitive(array[index], index, array, options      );
		}
	}
	return '['+(
		items.length
			? ( options.open_first || '' )+items.join(( options.item_comma || '' )+','+( options.comma_next || '' ))+( options.last_close || '' )
			: options.open_close || ''
	)+']';
}

var IS_SAFE = /*#__PURE__*/ test_bind$2(/^[`~!@#%^&*()\-=+[{\]}\\|;:'",<.>\/?\s]/);

function exportify (
	object     ,
	options   
		            
		                              
		                          
		                     
		                    
		                    
		                   
		                     
		                     
		                    
		                    
		                         
		                        
		                       
		                   
	 
)         {
	if ( typeof object!=='object' || object===null || isArray(object) || isMap(object) || isSet(object) || isDate(object) || isRegExp(object) ) {
		var $default$ = Primitive(object, undefined$1       , undefined$1       , options      );
		if ( $default$ ) {
			$default$ = ( options.default_value || '' ) + $default$;
			return ( IS_SAFE($default$) ? 'export default' + $default$ : 'export default ' + $default$ ) + ( options.value_semicolon || '' ) + ';';
		}
		return '';
	}
	var ES         = options.ES || 0;
	var gteES6          = ES>=6;
	var export_$_ = 'export ' + ( options['let'] || ( gteES6 ? 'const' : 'var' ) ) + ' ';
	var _equal_         = ( options.identifier_equal || '' ) + '=' + ( options.equal_value || '' );
	var _colon_         = ( options.key_colon || '' ) + ':' + ( options.colon_value || '' );
	var semicolon_         = ( options.value_semicolon || '' ) + ';' + ( options.semicolon_next || '' );
	var named         = '';
	var pairs           = [];
	var pairs_length         = 0;
	var open         = '{';
	var close         = '}';
	for ( var key in object ) {
		if ( hasOwnProperty.call(object, key) ) {
			var value = Primitive(object[key], key, object, options      );
			if ( value ) {
				if ( isIdentifier(key, ES) ) {
					named += export_$_ + key + _equal_ + value + semicolon_;
					if ( gteES6 ) { pairs[pairs_length++] = key; }
					else if ( key==='__proto__' && !options.__safe__ ) {
						open = '/*#__PURE__*/function(o){o.__proto__=__proto__;return o}({';
						close = '})';
						pairs[pairs_length++] = '__proto__' + _colon_ + 'null';
					}
					else { pairs[pairs_length++] = key + _colon_ + key; }
				}
				else { pairs[pairs_length++] = PropertyName(key, ES) + _colon_ + value; }
			}
		}
	}
	return named +
		'export default' + ( options.default_value || '' ) + open + (
			pairs_length
				? ( options.open_first || '' ) + pairs.join(( options.value_comma || '' ) + ',' + ( options.comma_next || '' )) + ( options.last_close || '' )
				: ( options.open_close || '' )
		) + close + ';';
}

Default({
	
	version: version$2,
	
	isReservedWord: isReservedWord,
	
	isIdentifierName: isIdentifierName,
	isIdentifier: isIdentifier,
	isArrayIndex: isArrayIndex,
	isIntegerIndex: isIntegerIndex,
	isPropertyName: isPropertyName,
	PropertyName: PropertyName,
	PropertyAccessor: PropertyAccessor,
	PropertyAccessors: PropertyAccessors,
	
	StringLiteral: StringLiteral,
	NumericLiteral: NumericLiteral,
	BigIntLiteral: BigIntLiteral,
	RegularExpressionLiteral: RegularExpressionLiteral,
	
	ObjectLiteral: ObjectLiteral,
	ArrayLiteral: ArrayLiteral,
	
	exportify: exportify
	
});

/*¡ j-es */

const from = (
	/*! j-globals: Buffer.from (fallback) */
	typeof Buffer==='function' && /*#__PURE__*/Buffer.hasOwnProperty('from') ? Buffer.from : undefined$1
	/*¡ j-globals: Buffer.from (fallback) */
);

const RegExp_prototype = RegExp.prototype;

/*!@preserve@license
 * 模块名称：j-utf
 * 模块功能：UTF 相关共享实用程序。从属于“简计划”。
   　　　　　UTF util. Belong to "Plan J".
 * 模块版本：4.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-utf/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-utf/
 */

var NON_SCALAR = (
	'unicode' in RegExp_prototype
		? RegExp$1('[\\uD800-\\uDFFF]', 'u')
		: /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
);

function buffer2object (buffer        , options          )                                                                          {
	
	var length         = buffer.length;
	if ( !length ) { return { BOM: '', UTF: '', string: '' }; }
	
	var throwError          = !options || options.throwError!==false;
	var encoding                    ;
	var swapped                    ;
	var BOM               ;
	var UTF                            ;
	
	var code         = buffer[0] ;
	if ( code===0xEF ) {
		if ( length>2 && buffer[1]===0xBB && buffer[2]===0xBF ) {
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(3); }
			BOM = '\uFEFF';
			UTF = '8';
		}
		else {
			if ( throwError ) { throw Error$1('残破的 UTF-8 BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( code===0xFF ) {
		if ( length>1 && buffer[1]===0xFE ) {
			if ( throwError && length%2 ) { throw Error$1('UTF-16 的字节数必须为 2 的倍数'); }
			if ( !options || options.stripBOM!==false ) { buffer = buffer.slice(2); }
			encoding = 'ucs2';
			BOM = '\uFEFF';
			UTF = '16LE';
		}
		else {
			if ( throwError ) { throw Error$1('残破的 UTF-16LE BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( code===0xFE ) {
		if ( length>1 && buffer[1]===0xFF ) {
			if ( throwError && length%2 ) { throw Error$1('UTF-16 的字节数必须为 2 的倍数'); }
			buffer.swap16();
			if ( options ) {
				if ( !options.swappable ) { swapped = buffer; }
				if ( options.stripBOM!==false ) { buffer = buffer.slice(2); }
			}
			else {
				swapped = buffer;
				buffer = buffer.slice(2);
			}
			encoding = 'ucs2';
			BOM = '\uFEFF';
			UTF = '16BE';
		}
		else {
			if ( throwError ) { throw Error$1('残破的 UTF-16BE BOM 头'); }
			BOM = '';
			UTF = '';
		}
	}
	else if ( options && options.startsWithASCII ) {
		if ( code===0x00 ) {
			if ( throwError ) {
				if ( length>2 && buffer[2]===0x00 ) { throw Error$1('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error$1('UTF-16 的字节数必须为 2 的倍数'); }
			}
			buffer.swap16();
			if ( !options.swappable ) { swapped = buffer; }
			encoding = 'ucs2';
			UTF = '16BE';
		}
		else if ( length>1 && buffer[1]===0x00 ) {
			if ( throwError ) {
				if ( length>3 && buffer[3]===0x00 ) { throw Error$1('暂不支持 UTF-32 编码'); }
				if ( length%2 ) { throw Error$1('UTF-16 的字节数必须为 2 的倍数'); }
			}
			encoding = 'ucs2';
			UTF = '16LE';
		}
		else {
			UTF = '8';
		}
		BOM = '';
	}
	else {
		BOM = '';
		UTF = '';
	}
	
	var string         = encoding ? buffer.toString(encoding) : buffer.toString();
	if ( throwError ) {
		if ( from(string, encoding).equals(buffer) ) {
			swapped && swapped.swap16();
			if ( NON_SCALAR.test(string) ) { throw Error$1('代理对码点不能单独出现'); }
		}
		else {
			swapped && swapped.swap16();
			throw Error$1('文件中存在超出 Unicode 表示范围的内容');
		}
	}
	else { swapped && swapped.swap16(); }
	return { BOM: BOM, UTF: UTF, string: string };
	
}

/*¡ j-utf */

const exec = RegExp.prototype.exec;

const Proxy$1 = Proxy;

/*!@preserve@license
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：8.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var Test$2                                           = bind
	? /*#__PURE__*/bind.bind(test       )       
	: function (re) {
		return function (string) {
			return test.call(re, string);
		};
	};

var Exec$2                                           = bind
	? /*#__PURE__*/bind.bind(exec       )       
	: function (re) {
		return function (string) {
			return exec.call(re, string);
		};
	};

function theRegExp$1 (re        )         {
	var test = re.test = Test$2(re);
	var exec = re.exec = Exec$2(re);
	var source = test.source = exec.source = re.source;
	test.unicode = exec.unicode = re.unicode;
	test.ignoreCase = exec.ignoreCase = re.ignoreCase;
	test.multiline = exec.multiline = source.indexOf('^')<0 && source.indexOf('$')<0 ? null : re.multiline;
	test.dotAll = exec.dotAll = source.indexOf('.')<0 ? null : re.dotAll;
	return re;
}

var NT$3 = /[\n\t]+/g;
var ESCAPE$3 = /\\./g;
function graveAccentReplacer$2 ($$        ) { return $$==='\\`' ? '`' : $$; }

var includes$2 = ''.includes       
	? function (that        , searchString        ) { return that.includes(searchString); }
	: function (that        , searchString        ) { return that.indexOf(searchString)>-1; };

function RE$2 (               template                      ) {
	var U = this.U;
	var I = this.I;
	var M = this.M;
	var S = this.S;
	var raw = template.raw;
	var source = raw[0] .replace(NT$3, '');
	var index = 1;
	var length = arguments.length;
	while ( index!==length ) {
		var value            
			                       
			                          
			                             
			                            
			                         
		  = arguments[index];
		if ( typeof value==='string' ) { source += value; }
		else {
			var value_source = value.source;
			if ( typeof value_source!=='string' ) { throw TypeError$1('source'); }
			if ( value.unicode===U ) { throw SyntaxError$1('unicode'); }
			if ( value.ignoreCase===I ) { throw SyntaxError$1('ignoreCase'); }
			if ( value.multiline===M && ( includes$2(value_source, '^') || includes$2(value_source, '$') ) ) { throw SyntaxError$1('multiline'); }
			if ( value.dotAll===S && includes$2(value_source, '.') ) { throw SyntaxError$1('dotAll'); }
			source += value_source;
		}
		source += raw[index++] .replace(NT$3, '');
	}
	var re         = RegExp$1(U ? source = source.replace(ESCAPE$3, graveAccentReplacer$2) : source, this.flags);
	var test = re.test = Test$2(re);
	var exec = re.exec = Exec$2(re);
	test.source = exec.source = source;
	test.unicode = exec.unicode = U;
	test.ignoreCase = exec.ignoreCase = I;
	test.multiline = exec.multiline = includes$2(source, '^') || includes$2(source, '$') ? M : null;
	test.dotAll = exec.dotAll = includes$2(source, '.') ? S : null;
	return re;
}

var RE_bind$2 = bind && /*#__PURE__*/bind.bind(RE$2       );

function Context$2 (flags        )          {
	return {
		U: !includes$2(flags, 'u'),
		I: !includes$2(flags, 'i'),
		M: !includes$2(flags, 'm'),
		S: !includes$2(flags, 's'),
		flags: flags
	};
}

var CONTEXT$2          = /*#__PURE__*/Context$2('');

var newRegExp$2 = Proxy$1
	? /*#__PURE__*/new Proxy$1(RE$2, {
		apply: function (RE, thisArg, args                                   ) { return apply$1(RE, CONTEXT$2, args); }
		,
		get: function (RE, flags        ) { return RE_bind$2(Context$2(flags)); }
		,
		defineProperty: function () { return false; }
		,
		preventExtensions: function () { return false; }
	})
	: /*#__PURE__*/function () {
		RE$2.apply = RE$2.apply;
		var newRegExp = function () { return RE$2.apply(CONTEXT$2, arguments       ); }       ;
		for ( var flags = 63; flags--; ) {
			( function (context) {
				newRegExp[context.flags] = function () { return RE$2.apply(context, arguments       ); };
			} )(Context$2(
				( flags & 32 ? '' : 'g' ) +
				( flags & 16 ? '' : 'i' ) +
				( flags &  8 ? '' : 'm' ) +
				( flags &  4 ? '' : 's' ) +
				( flags &  2 ? '' : 'u' ) +
				( flags &  1 ? '' : 'y' )
			));
		}
		return freeze ? freeze(newRegExp) : newRegExp;
	}();

var NEED_TO_ESCAPE_IN_REGEXP$1 = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR$1 = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP$1 = /*#__PURE__*/create(NULL)         ;

function groupify$1 (branches                   , uFlag          , noEscape          )         {
	var group = create(NULL)         ;
	var appendBranch = uFlag ? appendPointBranch$1 : appendCodeBranch$1;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index] ); }
	return sourcify$1(group, !noEscape);
}
function appendPointBranch$1 (group       , branch        )       {
	if ( branch ) {
		var character         = SURROGATE_PAIR$1.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch$1(group[character] || ( group[character] = create(NULL)          ), branch.slice(character.length));
	}
	else { group[''] = GROUP$1; }
}

function appendCodeBranch$1 (group       , branch        )       {
	if ( branch ) {
		var character         = branch.charAt(0);
		appendCodeBranch$1(group[character] || ( group[character] = create(NULL)          ), branch.slice(1));
	}
	else { group[''] = GROUP$1; }
}

function sourcify$1 (group       , needEscape         )         {
	var branches           = [];
	var singleCharactersBranch           = [];
	var noEmptyBranch          = true;
	for ( var character in group ) {
		if ( character ) {
			var sub_branches         = sourcify$1(group[character] , needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP$1.test(character) ) { character = '\\' + character; }
			sub_branches ? branches.push(character + sub_branches) : singleCharactersBranch.push(character);
		}
		else { noEmptyBranch = false; }
	}
	singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length===1 ? singleCharactersBranch[0]  : '[' + singleCharactersBranch.join('') + ']');
	return branches.length===0
		? ''
		: ( branches.length===1 && ( singleCharactersBranch.length || noEmptyBranch )
			? branches[0]
			: '(?:' + branches.join('|') + ')'
		)
		+ ( noEmptyBranch ? '' : '?' );
}

/*¡ j-regexp */

const KEYS = /[^\x00-@[-`{-\x7F\s][^\x00-/:-@[-`{-\x7F\s]*(?:_[^\x00-/:-@[-`{-\x7F\s]+)*/g;

const NameIs__Key__ = newRegExp$2`^${KEYS}$`.test;
const NameAs__Key__ = (Name        )         => {
	if ( NameIs__Key__(Name) ) { return `__${Name}__`; }
	throw SyntaxError$1(`“${Name}”不满足自动生成动态值的条件`);
};

const NONCHARACTER = newRegExp$2.u`[
	\uFDD0-\uFDEF
	\uFFFE\u{1FFFE}\u{2FFFE}\u{3FFFE}\u{4FFFE}\u{5FFFE}\u{6FFFE}\u{7FFFE}\u{8FFFE}\u{9FFFE}\u{AFFFE}\u{BFFFE}\u{CFFFE}\u{DFFFE}\u{EFFFE}\u{FFFFE}\u{10FFFE}
	\uFFFF\u{1FFFF}\u{2FFFF}\u{3FFFF}\u{4FFFF}\u{5FFFF}\u{6FFFF}\u{7FFFF}\u{8FFFF}\u{9FFFF}\u{AFFFF}\u{BFFFF}\u{CFFFF}\u{DFFFF}\u{EFFFF}\u{FFFFF}\u{10FFFF}
]`;
const CONTROL_CHARACTER = /[\x01-\x08\x0B\x0E-\x1F\x7F-\x9F]/;

const ASCII_WHITESPACE = /[\t\n\f\r ]/.source;
const ASCII_ALPHA = /[A-Za-z]/;

const TOKENS$1 = /[^\t\n\f\r=; ]+/g;
const PCENCharWithoutDot = /[\-\w\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]/u.source.slice(1, -1);// /[\u{10000}-\u{EFFFF}]/u => /(?:[\uD800-\uDB7F][\uDC00-\uDFFF])/
const NON_PCENChar = newRegExp$2.u`	[^.${PCENCharWithoutDot}]	`;
const AliasName = /[A-Z][\-.\w:\x80-\u{10FFFF}]*/u;//newRegExp.u`	[A-Z][${PCENCharWithoutDot}]*	`;
const startsWithUpperCase = test.bind(/^[A-Z]/);
const localOrComponentNameWithoutDot = newRegExp$2.u`	[A-Za-z][${PCENCharWithoutDot}]*	`;
const _localOrComponentNameDotable_ = newRegExp$2.u`^	[A-Za-z][.${PCENCharWithoutDot}]*	$`;
const isLocalOrComponentNameDotable = (name        ) => _localOrComponentNameDotable_.test(name);
const localNameWithoutDot = newRegExp$2.u`	[a-z][${PCENCharWithoutDot}]*	`;
const className = newRegExp$2.u`
	(?:
		-
		(?:
			-
		|
			[A-Z_a-z\x80-\u{10FFFF}]
		)
	|
		[A-Z_a-z\x80-\u{10FFFF}]
	)
	[-\w\x80-\u{10FFFF}]*
`;

const ATTRIBUTE_NAME = /[^\x00\t\n\f\r "'<>/=]+/;
const UNQUOTED_ATTRIBUTE_VALUE = /[^\x00\t\n\f\r "'=<>`]+/;//// /[^\t\n\f\r "'=<>`][^\t\n\f\r >]*|(?=>)/; // HTML5 以前的标准宽松一些，实际 HTML 解析则更宽松。但 jVue 目前的整体设计原则是抛出一切不规范的错误，另外顺带提示反引号这个十分特殊的 IE 漏洞的存在
const ATTRIBUTE_NAME_VALUE = newRegExp$2       `
	(${ATTRIBUTE_NAME})
	${ASCII_WHITESPACE}*
	=
	${ASCII_WHITESPACE}*
	(
		"[^"]*"
		|
		'[^']*'
		|
		${UNQUOTED_ATTRIBUTE_VALUE}
	)`.exec;
const ATTRIBUTE = newRegExp$2.g`
	${ATTRIBUTE_NAME}
	(?:
		${ASCII_WHITESPACE}*
		=
		${ASCII_WHITESPACE}*
		(?:
			"[^\x00"]*"
			|
			'[^\x00']*'
			|
			${UNQUOTED_ATTRIBUTE_VALUE}
		)
	)?`;

const TAG_NAME = newRegExp$2`${ASCII_ALPHA}[^\x00\t\n\f\r />]*`;
const TAG = newRegExp$2               `
	^
	<
	(/?)
	(${TAG_NAME})
	((?:
		${ASCII_WHITESPACE}+
		${ATTRIBUTE}
	)*)
	${ASCII_WHITESPACE}*
	(/?)
	>
`.exec;

const TAG_EMIT_CHAR = /[\t\n\f\r />]/.source;
const TAG_LIKE = newRegExp$2`
	<
	(?:
		/?${TAG_NAME}${TAG_EMIT_CHAR}
		|
		[!?]
	)
`;

const IS_TAG = newRegExp$2`
	^
	<
	/?
	${TAG_NAME}
	${TAG_EMIT_CHAR}
`;

/*!@preserve@license
 * 模块名称：j-eol
 * 模块功能：换行符相关共享实用程序。从属于“简计划”。
   　　　　　EOL util. Belong to "Plan J".
 * 模块版本：2.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-eol/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-eol/
 */

var version$1 = '2.0.0';

/*!@preserve@license
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：8.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var version = '8.0.0';

var Test$1                                           = bind
	? /*#__PURE__*/bind.bind(test       )       
	: function (re) {
		return function (string) {
			return test.call(re, string);
		};
	};

var Exec$1                                           = bind
	? /*#__PURE__*/bind.bind(exec       )       
	: function (re) {
		return function (string) {
			return exec.call(re, string);
		};
	};

function theRegExp (re        )         {
	var test = re.test = Test$1(re);
	var exec = re.exec = Exec$1(re);
	var source = test.source = exec.source = re.source;
	test.unicode = exec.unicode = re.unicode;
	test.ignoreCase = exec.ignoreCase = re.ignoreCase;
	test.multiline = exec.multiline = source.indexOf('^')<0 && source.indexOf('$')<0 ? null : re.multiline;
	test.dotAll = exec.dotAll = source.indexOf('.')<0 ? null : re.dotAll;
	return re;
}

var NT$2 = /[\n\t]+/g;
var ESCAPE$2 = /\\./g;
function graveAccentReplacer$1 ($$        ) { return $$==='\\`' ? '`' : $$; }

var includes$1 = ''.includes       
	? function (that        , searchString        ) { return that.includes(searchString); }
	: function (that        , searchString        ) { return that.indexOf(searchString)>-1; };

function RE$1 (               template                      ) {
	var U = this.U;
	var I = this.I;
	var M = this.M;
	var S = this.S;
	var raw = template.raw;
	var source = raw[0] .replace(NT$2, '');
	var index = 1;
	var length = arguments.length;
	while ( index!==length ) {
		var value            
			                       
			                          
			                             
			                            
			                         
		  = arguments[index];
		if ( typeof value==='string' ) { source += value; }
		else {
			var value_source = value.source;
			if ( typeof value_source!=='string' ) { throw TypeError$1('source'); }
			if ( value.unicode===U ) { throw SyntaxError$1('unicode'); }
			if ( value.ignoreCase===I ) { throw SyntaxError$1('ignoreCase'); }
			if ( value.multiline===M && ( includes$1(value_source, '^') || includes$1(value_source, '$') ) ) { throw SyntaxError$1('multiline'); }
			if ( value.dotAll===S && includes$1(value_source, '.') ) { throw SyntaxError$1('dotAll'); }
			source += value_source;
		}
		source += raw[index++] .replace(NT$2, '');
	}
	var re         = RegExp$1(U ? source = source.replace(ESCAPE$2, graveAccentReplacer$1) : source, this.flags);
	var test = re.test = Test$1(re);
	var exec = re.exec = Exec$1(re);
	test.source = exec.source = source;
	test.unicode = exec.unicode = U;
	test.ignoreCase = exec.ignoreCase = I;
	test.multiline = exec.multiline = includes$1(source, '^') || includes$1(source, '$') ? M : null;
	test.dotAll = exec.dotAll = includes$1(source, '.') ? S : null;
	return re;
}

var RE_bind$1 = bind && /*#__PURE__*/bind.bind(RE$1       );

function Context$1 (flags        )          {
	return {
		U: !includes$1(flags, 'u'),
		I: !includes$1(flags, 'i'),
		M: !includes$1(flags, 'm'),
		S: !includes$1(flags, 's'),
		flags: flags
	};
}

var CONTEXT$1          = /*#__PURE__*/Context$1('');

var newRegExp$1 = Proxy$1
	? /*#__PURE__*/new Proxy$1(RE$1, {
		apply: function (RE, thisArg, args                                   ) { return apply$1(RE, CONTEXT$1, args); }
		,
		get: function (RE, flags        ) { return RE_bind$1(Context$1(flags)); }
		,
		defineProperty: function () { return false; }
		,
		preventExtensions: function () { return false; }
	})
	: /*#__PURE__*/function () {
		RE$1.apply = RE$1.apply;
		var newRegExp = function () { return RE$1.apply(CONTEXT$1, arguments       ); }       ;
		for ( var flags = 63; flags--; ) {
			( function (context) {
				newRegExp[context.flags] = function () { return RE$1.apply(context, arguments       ); };
			} )(Context$1(
				( flags & 32 ? '' : 'g' ) +
				( flags & 16 ? '' : 'i' ) +
				( flags &  8 ? '' : 'm' ) +
				( flags &  4 ? '' : 's' ) +
				( flags &  2 ? '' : 'u' ) +
				( flags &  1 ? '' : 'y' )
			));
		}
		return freeze ? freeze(newRegExp) : newRegExp;
	}();

var clearRegExp = '$_' in RegExp$1
	? /*#__PURE__*/function () {
		var REGEXP = /^/;
		REGEXP.test = REGEXP.test;
		return function clearRegExp                (value    )                {
			REGEXP.test('');
			return value;
		};
	}()
	: function clearRegExp                (value    )                {
		return value;
	};

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP = /*#__PURE__*/create(NULL)         ;

function groupify (branches                   , uFlag          , noEscape          )         {
	var group = create(NULL)         ;
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index] ); }
	return sourcify(group, !noEscape);
}
function appendPointBranch (group       , branch        )       {
	if ( branch ) {
		var character         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch(group[character] || ( group[character] = create(NULL)          ), branch.slice(character.length));
	}
	else { group[''] = GROUP; }
}

function appendCodeBranch (group       , branch        )       {
	if ( branch ) {
		var character         = branch.charAt(0);
		appendCodeBranch(group[character] || ( group[character] = create(NULL)          ), branch.slice(1));
	}
	else { group[''] = GROUP; }
}

function sourcify (group       , needEscape         )         {
	var branches           = [];
	var singleCharactersBranch           = [];
	var noEmptyBranch          = true;
	for ( var character in group ) {
		if ( character ) {
			var sub_branches         = sourcify(group[character] , needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(character) ) { character = '\\' + character; }
			sub_branches ? branches.push(character + sub_branches) : singleCharactersBranch.push(character);
		}
		else { noEmptyBranch = false; }
	}
	singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length===1 ? singleCharactersBranch[0]  : '[' + singleCharactersBranch.join('') + ']');
	return branches.length===0
		? ''
		: ( branches.length===1 && ( singleCharactersBranch.length || noEmptyBranch )
			? branches[0]
			: '(?:' + branches.join('|') + ')'
		)
		+ ( noEmptyBranch ? '' : '?' );
}

Default({
	version: version,
	newRegExp: newRegExp$1,
	theRegExp: theRegExp,
	clearRegExp: clearRegExp,
	groupify: groupify
});

/*¡ j-regexp */

var test_bind$1 = bind
	? /*#__PURE__*/bind.bind(test)                                                                           
	: function (            regExp        ) { return function (            string        ) { return regExp.test(string); }; };

var toggleGlobal = 'flags' in RegExp$1.prototype
	? function toggleGlobal (regExp        , global         ) {
		return regExp.global===global ? regExp : RegExp$1(regExp, global ? 'g' + regExp.flags : regExp.flags.replace('g', ''));
	}
	: function toggleGlobal (regExp        , global         ) {
		if ( regExp.global===global ) { return regExp; }
		var literal = '' + regExp;
		var flags = literal.slice(literal.lastIndexOf('/') + 1);
		return RegExp$1(regExp.source, global ? 'g' + flags : flags.replace('g', ''));
	};

function EOL$1                     (allow                         , uniform          , disallow                             ) {
	
	var ALLOW = /*#__PURE__*/isArray(allow)
		? /*#__PURE__*/RegExp$1(/*#__PURE__*/groupify(allow), uniform ? 'g' : '')
		: uniform===undefined$1
			? ( uniform = allow.global, allow )
			: /*#__PURE__*/toggleGlobal(allow, !!uniform);
	
	if ( disallow ) {
		var testDisallow = /*#__PURE__*/test_bind$1(
			/*#__PURE__*/isArray(disallow)
				? /*#__PURE__*/RegExp$1(groupify(disallow))
				: /*#__PURE__*/toggleGlobal(disallow, false)
		);
		return uniform
			? function EOL (string        )           {
				if ( testDisallow(string) ) { throw clearRegExp(SyntaxError$1('存在禁用换行符')); }
				var eols = clearRegExp(string.match(ALLOW)                );
				if ( !eols ) { return ''; }
				var eol = eols[0] ;
				for ( var length = eols.length, index = 1; index!==length; ++index ) { if ( eols[index]!==eol ) { throw SyntaxError$1('存在多种换行符'); } }
				return eol;
			}
			: function EOL (string        )           {
				if ( testDisallow(string) ) { throw clearRegExp(SyntaxError$1('存在禁用换行符')); }
				var eols = clearRegExp(string.match(ALLOW)                );
				return eols ? eols[0]  : '';
			};
	}
	else {
		return uniform
			? function EOL (string        )           {
				var eols = clearRegExp(string.match(ALLOW)                );
				if ( !eols ) { return ''; }
				var eol = eols[0] ;
				for ( var length = eols.length, index = 1; index!==length; ++index ) { if ( eols[index]!==eol ) { throw SyntaxError$1('存在多种换行符'); } }
				return eol;
			}
			: function EOL (string        )           {
				var eols = clearRegExp(string.match(ALLOW)                );
				return eols ? eols[0]  : '';
			};
	}
	
}

var LF     = '\n';
var VT     = '\x0B';
var FF     = '\f';
var CRLF       = '\r\n';
var CR     = '\r';
var NEL      = '\x85';
var LS     = '\u2028';
var PS     = '\u2029';

                      
                        
                      
                          
                      
                         
                          
                          

var ES = /\n|\r\n?|[\u2028\u2029]/g;
Default(EOL$1, {
	version: version$1,
	EOL: EOL$1,
	LF: LF,
	VT: VT,
	FF: FF,
	CRLF: CRLF,
	CR: CR,
	NEL: NEL,
	LS: LS,
	PS: PS
});

/*¡ j-eol */

const checkNewline = (
	/*! j-globals: return (internal) */
	function RETURN (value) {
		return value;
	}
	/*¡ j-globals: return (internal) */
);

const NON_ASCII = /[^\x00-\x7F]/u;
const NON_TAB$1 = /[^\t\x20]/g;
const Snippet = (whole        , errorPosition        )         => {
	
	const linesAroundError                                                        = [];
	let linesAroundError_length = 0;
	const linesBeforeError = whole.slice(0, errorPosition).split('\n');
	const errorLineNumber = linesBeforeError.length;
	
	if ( errorLineNumber>1 ) {
		linesAroundError[linesAroundError_length++] = {
			number: errorLineNumber-1+'',
			value: linesBeforeError[errorLineNumber-2],
		};
	}
	
	const errorLineEnd = whole.indexOf('\n', errorPosition);
	linesAroundError[linesAroundError_length++] = {
		number: errorLineNumber+'',
		value: linesBeforeError[errorLineNumber-1]+( errorLineEnd<0
			? whole.slice(errorPosition)
			: whole.slice(errorPosition, errorLineEnd)
		),
	};
	linesAroundError[linesAroundError_length++] = {
		number: '',
		value: linesBeforeError[errorLineNumber-1].replace(NON_ASCII, '\u3000').replace(NON_TAB$1, '\x20')+'^',
	};
	
	let maxLengthOfLineNumber        ;
	if ( errorLineEnd<0 ) { maxLengthOfLineNumber = ( errorLineNumber+'' ).length; }
	else {
		maxLengthOfLineNumber = ( errorLineNumber+1+'' ).length;
		const nextEnd = whole.indexOf('\n', errorLineEnd+1);
		const next = nextEnd<0
			? whole.slice(errorLineEnd+1)
			: whole.slice(errorLineEnd+1, nextEnd);
		linesAroundError[linesAroundError_length++] = {
			number: errorLineNumber+1+'',
			value: next,
		};
	}
	
	const errorSnippet           = [];
	let index = 0;
	while ( index<linesAroundError_length ) {
		let { number, value } = linesAroundError[index];
		number = number ? number.padStart(maxLengthOfLineNumber, '0') : ' '.repeat(maxLengthOfLineNumber);
		errorSnippet[index++] = `${number}\t|${value}`;
	}
	return errorSnippet.join('\n');
	
};

const VOID_ELEMENTS = /^(?:area|b(?:r|ase(?:font)?|gsound)|co(?:l|mmand)|embed|hr|i(?:m(?:g|age)|nput|sindex)|keygen|link|meta|param|source|track|wbr|frame|nextid)$/i;

const RAW_TEXT_ELEMENTS = /^s(?:cript|tyle)$/i;

const ESCAPABLE_RAW_TEXT_ELEMENTS = /^t(?:extarea|itle)$/i;

const FOREIGN_ELEMENTS = /^(?:animate(?:Motion|Transform)?|c(?:ircle|lipPath|olor\-profile|ursor)|d(?:e(?:fs|sc)|iscard)|ellipse|f(?:e(?:Blend|Co(?:lorMatrix|mpo(?:nentTransfer|site)|nvolveMatrix)|D(?:i(?:ffuseLighting|s(?:placementMap|tanceLight))|ropShadow)|F(?:lood|unc[ABGR])|GaussianBlur|Image|M(?:erge(?:Node)?|orphology)|Offset|PointLight|Sp(?:ecularLighting|otLight)|T(?:ile|urbulence))|ilter|o(?:nt\-face|reignObject))|g(?:lyph)?|hatch(?:path)?|image|line(?:arGradient)?|m(?:a(?:rker|sk)|e(?:sh(?:gradient|patch|row)?|tadata)|issing\-glyph|path)|p(?:at(?:h|tern)|oly(?:gon|line))|r(?:adialGradient|ect)|s(?:et|olidcolor|top|vg|witch|ymbol)|t(?:ext(?:Path)?|itle|span)|u(?:nknown|se)|view)$/i;

const WeakMap$1 = WeakMap;

const Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

const defineProperties = Object.defineProperties;

const Reflect_construct = Reflect.construct;

const Reflect_defineProperty = Reflect.defineProperty;

const Reflect_deleteProperty = Reflect.deleteProperty;

const Reflect_ownKeys = Reflect.ownKeys;

/*!@preserve@license
 * 模块名称：j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。从属于“简计划”。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string. Belong to "Plan J".
 * 模块版本：7.0.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const Keeper =     ()      => [];

const hasOwnProperty_call = /*#__PURE__*/hasOwnProperty.call.bind(hasOwnProperty);

const newWeakMap = () => {
	const weakMap = new WeakMap$1;
	weakMap.has = weakMap.has;
	weakMap.get = weakMap.get;
	weakMap.set = weakMap.set;
	return weakMap;
};
const target2keeper = /*#__PURE__*/newWeakMap()     
	                                                                      
	                                                                         
 ;
const proxy2target = /*#__PURE__*/newWeakMap()     
	                             
	                                                 
	                                                   
 ;
const target2proxy = /*#__PURE__*/newWeakMap()     
	                                                  
	                                                   
 ;

const handlers                       = /*#__PURE__*/Object_assign(create(NULL), {
	defineProperty:                 (target                   , key   , descriptor                    )          => {
		if ( hasOwnProperty_call(target, key) ) {
			return Reflect_defineProperty(target, key, Object_assign(create(NULL), descriptor));
		}
		if ( Reflect_defineProperty(target, key, Object_assign(create(NULL), descriptor)) ) {
			const keeper = target2keeper.get(target) ;
			keeper[keeper.length] = key;
			return true;
		}
		return false;
	},
	deleteProperty:                 (target                   , key   )          => {
		if ( Reflect_deleteProperty(target, key) ) {
			const keeper = target2keeper.get(target) ;
			const index = keeper.indexOf(key);
			index<0 || --keeper.copyWithin(index, index + 1).length;
			return true;
		}
		return false;
	},
	ownKeys:                    (target   ) => target2keeper.get(target)                         ,
	construct:                                     (target                         , args   , newTarget     )    => orderify(Reflect_construct(target, args, newTarget)),
	apply:                                        (target                              , thisArg   , args   )    => orderify(apply$1(target, thisArg, args)),
});

const newProxy =                                              (target   , keeper           )    => {
	target2keeper.set(target, keeper);
	const proxy = new Proxy$1   (target, handlers);
	proxy2target.set(proxy, target);
	return proxy;
};

const orderify =                    (object   )    => {
	if ( proxy2target.has(object) ) { return object; }
	let proxy = target2proxy.get(object)                 ;
	if ( proxy ) { return proxy; }
	proxy = newProxy(object, Object_assign(Keeper          (), Reflect_ownKeys(object)));
	target2proxy.set(object, proxy);
	return proxy;
};

const Null$1 = /*#__PURE__*/function () {
	function throwConstructing ()        { throw TypeError$1(`Super constructor Null cannot be invoked with 'new'`); }
	function throwApplying ()        { throw TypeError$1(`Super constructor Null cannot be invoked without 'new'`); }
	const Nullify = (constructor                             ) => {
		delete constructor.prototype.constructor;
		freeze(constructor.prototype);
		return constructor;
	};
	function Null (           constructor                              ) {
		return new.target
			? new.target===Null
				? /*#__PURE__*/throwConstructing()
				: /*#__PURE__*/newProxy(this, Keeper     ())
			: typeof constructor==='function'
				? /*#__PURE__*/Nullify(constructor)
				: /*#__PURE__*/throwApplying();
	}
	//@ts-ignore
	Null.prototype = null;
	defineProperty(Null, 'name', Object_assign(create(NULL), { value: '', configurable: false }));
	//delete Null.length;
	freeze(Null);
	return Null;
}()                                           ;

/*¡ j-orderify */

const ReferenceError$1 = ReferenceError;

const RangeError$1 = RangeError;

const parseInt$1 = parseInt;

const fromCodePoint = String.fromCodePoint;

const Keys = Object.keys;

const getOwnPropertySymbols = Object.getOwnPropertySymbols;

const Null = (
	/*! j-globals: null (internal) */
	/*#__PURE__*/function () {
		var assign = Object.assign || function assign (target, source) {
			var keys, index, key;
			for ( keys = Keys(source), index = 0; index<keys.length;++index ) {
				key = keys[index];
				target[key] = source[key];
			}
			if ( getOwnPropertySymbols ) {
				for ( keys = getOwnPropertySymbols(source), index = 0; index<keys.length;++index ) {
					key = keys[index];
					if ( isEnum(source, key) ) { [key] = source[key]; }
				}
			}
			return target;
		};
		function Nullify (constructor) {
			delete constructor.prototype.constructor;
			freeze(constructor.prototype);
			return constructor;
		}
		var Null = function (origin) {
			return origin===undefined$1
				? this
				: typeof origin==='function'
					? /*#__PURE__*/Nullify(origin)
					: /*#__PURE__*/assign(/*#__PURE__*/create$1(NULL), origin);
		};
		delete Null.name;
		//try { delete Null.length; } catch (error) {}
		Null.prototype = null;
		freeze(Null);
		return Null;
	}()
	/*¡ j-globals: null (internal) */
);

const SEMICOLON_ENTITIES = /*#__PURE__*/ Null({
	Aacute: 'Á',
	aacute: 'á',
	Abreve: 'Ă',
	abreve: 'ă',
	ac: '∾',
	acd: '∿',
	acE: '∾̳',
	Acirc: 'Â',
	acirc: 'â',
	acute: '´',
	Acy: 'А',
	acy: 'а',
	AElig: 'Æ',
	aelig: 'æ',
	af: '\u2061',
	Afr: '𝔄',
	afr: '𝔞',
	Agrave: 'À',
	agrave: 'à',
	alefsym: 'ℵ',
	aleph: 'ℵ',
	Alpha: 'Α',
	alpha: 'α',
	Amacr: 'Ā',
	amacr: 'ā',
	amalg: '⨿',
	amp: '&',
	AMP: '&',
	andand: '⩕',
	And: '⩓',
	and: '∧',
	andd: '⩜',
	andslope: '⩘',
	andv: '⩚',
	ang: '∠',
	ange: '⦤',
	angle: '∠',
	angmsdaa: '⦨',
	angmsdab: '⦩',
	angmsdac: '⦪',
	angmsdad: '⦫',
	angmsdae: '⦬',
	angmsdaf: '⦭',
	angmsdag: '⦮',
	angmsdah: '⦯',
	angmsd: '∡',
	angrt: '∟',
	angrtvb: '⊾',
	angrtvbd: '⦝',
	angsph: '∢',
	angst: 'Å',
	angzarr: '⍼',
	Aogon: 'Ą',
	aogon: 'ą',
	Aopf: '𝔸',
	aopf: '𝕒',
	apacir: '⩯',
	ap: '≈',
	apE: '⩰',
	ape: '≊',
	apid: '≋',
	apos: '\'',
	ApplyFunction: '\u2061',
	approx: '≈',
	approxeq: '≊',
	Aring: 'Å',
	aring: 'å',
	Ascr: '𝒜',
	ascr: '𝒶',
	Assign: '≔',
	ast: '*',
	asymp: '≈',
	asympeq: '≍',
	Atilde: 'Ã',
	atilde: 'ã',
	Auml: 'Ä',
	auml: 'ä',
	awconint: '∳',
	awint: '⨑',
	backcong: '≌',
	backepsilon: '϶',
	backprime: '‵',
	backsim: '∽',
	backsimeq: '⋍',
	Backslash: '∖',
	Barv: '⫧',
	barvee: '⊽',
	barwed: '⌅',
	Barwed: '⌆',
	barwedge: '⌅',
	bbrk: '⎵',
	bbrktbrk: '⎶',
	bcong: '≌',
	Bcy: 'Б',
	bcy: 'б',
	bdquo: '„',
	becaus: '∵',
	because: '∵',
	Because: '∵',
	bemptyv: '⦰',
	bepsi: '϶',
	bernou: 'ℬ',
	Bernoullis: 'ℬ',
	Beta: 'Β',
	beta: 'β',
	beth: 'ℶ',
	between: '≬',
	Bfr: '𝔅',
	bfr: '𝔟',
	bigcap: '⋂',
	bigcirc: '◯',
	bigcup: '⋃',
	bigodot: '⨀',
	bigoplus: '⨁',
	bigotimes: '⨂',
	bigsqcup: '⨆',
	bigstar: '★',
	bigtriangledown: '▽',
	bigtriangleup: '△',
	biguplus: '⨄',
	bigvee: '⋁',
	bigwedge: '⋀',
	bkarow: '⤍',
	blacklozenge: '⧫',
	blacksquare: '▪',
	blacktriangle: '▴',
	blacktriangledown: '▾',
	blacktriangleleft: '◂',
	blacktriangleright: '▸',
	blank: '␣',
	blk12: '▒',
	blk14: '░',
	blk34: '▓',
	block: '█',
	bne: '=⃥',
	bnequiv: '≡⃥',
	bNot: '⫭',
	bnot: '⌐',
	Bopf: '𝔹',
	bopf: '𝕓',
	bot: '⊥',
	bottom: '⊥',
	bowtie: '⋈',
	boxbox: '⧉',
	boxdl: '┐',
	boxdL: '╕',
	boxDl: '╖',
	boxDL: '╗',
	boxdr: '┌',
	boxdR: '╒',
	boxDr: '╓',
	boxDR: '╔',
	boxh: '─',
	boxH: '═',
	boxhd: '┬',
	boxHd: '╤',
	boxhD: '╥',
	boxHD: '╦',
	boxhu: '┴',
	boxHu: '╧',
	boxhU: '╨',
	boxHU: '╩',
	boxminus: '⊟',
	boxplus: '⊞',
	boxtimes: '⊠',
	boxul: '┘',
	boxuL: '╛',
	boxUl: '╜',
	boxUL: '╝',
	boxur: '└',
	boxuR: '╘',
	boxUr: '╙',
	boxUR: '╚',
	boxv: '│',
	boxV: '║',
	boxvh: '┼',
	boxvH: '╪',
	boxVh: '╫',
	boxVH: '╬',
	boxvl: '┤',
	boxvL: '╡',
	boxVl: '╢',
	boxVL: '╣',
	boxvr: '├',
	boxvR: '╞',
	boxVr: '╟',
	boxVR: '╠',
	bprime: '‵',
	breve: '˘',
	Breve: '˘',
	brvbar: '¦',
	bscr: '𝒷',
	Bscr: 'ℬ',
	bsemi: '⁏',
	bsim: '∽',
	bsime: '⋍',
	bsolb: '⧅',
	bsol: '\\',
	bsolhsub: '⟈',
	bull: '•',
	bullet: '•',
	bump: '≎',
	bumpE: '⪮',
	bumpe: '≏',
	Bumpeq: '≎',
	bumpeq: '≏',
	Cacute: 'Ć',
	cacute: 'ć',
	capand: '⩄',
	capbrcup: '⩉',
	capcap: '⩋',
	cap: '∩',
	Cap: '⋒',
	capcup: '⩇',
	capdot: '⩀',
	CapitalDifferentialD: 'ⅅ',
	caps: '∩︀',
	caret: '⁁',
	caron: 'ˇ',
	Cayleys: 'ℭ',
	ccaps: '⩍',
	Ccaron: 'Č',
	ccaron: 'č',
	Ccedil: 'Ç',
	ccedil: 'ç',
	Ccirc: 'Ĉ',
	ccirc: 'ĉ',
	Cconint: '∰',
	ccups: '⩌',
	ccupssm: '⩐',
	Cdot: 'Ċ',
	cdot: 'ċ',
	cedil: '¸',
	Cedilla: '¸',
	cemptyv: '⦲',
	cent: '¢',
	centerdot: '·',
	CenterDot: '·',
	cfr: '𝔠',
	Cfr: 'ℭ',
	CHcy: 'Ч',
	chcy: 'ч',
	check: '✓',
	checkmark: '✓',
	Chi: 'Χ',
	chi: 'χ',
	circ: 'ˆ',
	circeq: '≗',
	circlearrowleft: '↺',
	circlearrowright: '↻',
	circledast: '⊛',
	circledcirc: '⊚',
	circleddash: '⊝',
	CircleDot: '⊙',
	circledR: '®',
	circledS: 'Ⓢ',
	CircleMinus: '⊖',
	CirclePlus: '⊕',
	CircleTimes: '⊗',
	cir: '○',
	cirE: '⧃',
	cire: '≗',
	cirfnint: '⨐',
	cirmid: '⫯',
	cirscir: '⧂',
	ClockwiseContourIntegral: '∲',
	CloseCurlyDoubleQuote: '”',
	CloseCurlyQuote: '’',
	clubs: '♣',
	clubsuit: '♣',
	colon: ':',
	Colon: '∷',
	Colone: '⩴',
	colone: '≔',
	coloneq: '≔',
	comma: ',',
	commat: '@',
	comp: '∁',
	compfn: '∘',
	complement: '∁',
	complexes: 'ℂ',
	cong: '≅',
	congdot: '⩭',
	Congruent: '≡',
	conint: '∮',
	Conint: '∯',
	ContourIntegral: '∮',
	copf: '𝕔',
	Copf: 'ℂ',
	coprod: '∐',
	Coproduct: '∐',
	copy: '©',
	COPY: '©',
	copysr: '℗',
	CounterClockwiseContourIntegral: '∳',
	crarr: '↵',
	cross: '✗',
	Cross: '⨯',
	Cscr: '𝒞',
	cscr: '𝒸',
	csub: '⫏',
	csube: '⫑',
	csup: '⫐',
	csupe: '⫒',
	ctdot: '⋯',
	cudarrl: '⤸',
	cudarrr: '⤵',
	cuepr: '⋞',
	cuesc: '⋟',
	cularr: '↶',
	cularrp: '⤽',
	cupbrcap: '⩈',
	cupcap: '⩆',
	CupCap: '≍',
	cup: '∪',
	Cup: '⋓',
	cupcup: '⩊',
	cupdot: '⊍',
	cupor: '⩅',
	cups: '∪︀',
	curarr: '↷',
	curarrm: '⤼',
	curlyeqprec: '⋞',
	curlyeqsucc: '⋟',
	curlyvee: '⋎',
	curlywedge: '⋏',
	curren: '¤',
	curvearrowleft: '↶',
	curvearrowright: '↷',
	cuvee: '⋎',
	cuwed: '⋏',
	cwconint: '∲',
	cwint: '∱',
	cylcty: '⌭',
	dagger: '†',
	Dagger: '‡',
	daleth: 'ℸ',
	darr: '↓',
	Darr: '↡',
	dArr: '⇓',
	dash: '‐',
	Dashv: '⫤',
	dashv: '⊣',
	dbkarow: '⤏',
	dblac: '˝',
	Dcaron: 'Ď',
	dcaron: 'ď',
	Dcy: 'Д',
	dcy: 'д',
	ddagger: '‡',
	ddarr: '⇊',
	DD: 'ⅅ',
	dd: 'ⅆ',
	DDotrahd: '⤑',
	ddotseq: '⩷',
	deg: '°',
	Del: '∇',
	Delta: 'Δ',
	delta: 'δ',
	demptyv: '⦱',
	dfisht: '⥿',
	Dfr: '𝔇',
	dfr: '𝔡',
	dHar: '⥥',
	dharl: '⇃',
	dharr: '⇂',
	DiacriticalAcute: '´',
	DiacriticalDot: '˙',
	DiacriticalDoubleAcute: '˝',
	DiacriticalGrave: '`',
	DiacriticalTilde: '˜',
	diam: '⋄',
	diamond: '⋄',
	Diamond: '⋄',
	diamondsuit: '♦',
	diams: '♦',
	die: '¨',
	DifferentialD: 'ⅆ',
	digamma: 'ϝ',
	disin: '⋲',
	div: '÷',
	divide: '÷',
	divideontimes: '⋇',
	divonx: '⋇',
	DJcy: 'Ђ',
	djcy: 'ђ',
	dlcorn: '⌞',
	dlcrop: '⌍',
	dollar: '$',
	Dopf: '𝔻',
	dopf: '𝕕',
	Dot: '¨',
	dot: '˙',
	DotDot: '⃜',
	doteq: '≐',
	doteqdot: '≑',
	DotEqual: '≐',
	dotminus: '∸',
	dotplus: '∔',
	dotsquare: '⊡',
	doublebarwedge: '⌆',
	DoubleContourIntegral: '∯',
	DoubleDot: '¨',
	DoubleDownArrow: '⇓',
	DoubleLeftArrow: '⇐',
	DoubleLeftRightArrow: '⇔',
	DoubleLeftTee: '⫤',
	DoubleLongLeftArrow: '⟸',
	DoubleLongLeftRightArrow: '⟺',
	DoubleLongRightArrow: '⟹',
	DoubleRightArrow: '⇒',
	DoubleRightTee: '⊨',
	DoubleUpArrow: '⇑',
	DoubleUpDownArrow: '⇕',
	DoubleVerticalBar: '∥',
	DownArrowBar: '⤓',
	downarrow: '↓',
	DownArrow: '↓',
	Downarrow: '⇓',
	DownArrowUpArrow: '⇵',
	DownBreve: '̑',
	downdownarrows: '⇊',
	downharpoonleft: '⇃',
	downharpoonright: '⇂',
	DownLeftRightVector: '⥐',
	DownLeftTeeVector: '⥞',
	DownLeftVectorBar: '⥖',
	DownLeftVector: '↽',
	DownRightTeeVector: '⥟',
	DownRightVectorBar: '⥗',
	DownRightVector: '⇁',
	DownTeeArrow: '↧',
	DownTee: '⊤',
	drbkarow: '⤐',
	drcorn: '⌟',
	drcrop: '⌌',
	Dscr: '𝒟',
	dscr: '𝒹',
	DScy: 'Ѕ',
	dscy: 'ѕ',
	dsol: '⧶',
	Dstrok: 'Đ',
	dstrok: 'đ',
	dtdot: '⋱',
	dtri: '▿',
	dtrif: '▾',
	duarr: '⇵',
	duhar: '⥯',
	dwangle: '⦦',
	DZcy: 'Џ',
	dzcy: 'џ',
	dzigrarr: '⟿',
	Eacute: 'É',
	eacute: 'é',
	easter: '⩮',
	Ecaron: 'Ě',
	ecaron: 'ě',
	Ecirc: 'Ê',
	ecirc: 'ê',
	ecir: '≖',
	ecolon: '≕',
	Ecy: 'Э',
	ecy: 'э',
	eDDot: '⩷',
	Edot: 'Ė',
	edot: 'ė',
	eDot: '≑',
	ee: 'ⅇ',
	efDot: '≒',
	Efr: '𝔈',
	efr: '𝔢',
	eg: '⪚',
	Egrave: 'È',
	egrave: 'è',
	egs: '⪖',
	egsdot: '⪘',
	el: '⪙',
	Element: '∈',
	elinters: '⏧',
	ell: 'ℓ',
	els: '⪕',
	elsdot: '⪗',
	Emacr: 'Ē',
	emacr: 'ē',
	empty: '∅',
	emptyset: '∅',
	EmptySmallSquare: '◻',
	emptyv: '∅',
	EmptyVerySmallSquare: '▫',
	emsp13: ' ',
	emsp14: ' ',
	emsp: ' ',
	ENG: 'Ŋ',
	eng: 'ŋ',
	ensp: ' ',
	Eogon: 'Ę',
	eogon: 'ę',
	Eopf: '𝔼',
	eopf: '𝕖',
	epar: '⋕',
	eparsl: '⧣',
	eplus: '⩱',
	epsi: 'ε',
	Epsilon: 'Ε',
	epsilon: 'ε',
	epsiv: 'ϵ',
	eqcirc: '≖',
	eqcolon: '≕',
	eqsim: '≂',
	eqslantgtr: '⪖',
	eqslantless: '⪕',
	Equal: '⩵',
	equals: '=',
	EqualTilde: '≂',
	equest: '≟',
	Equilibrium: '⇌',
	equiv: '≡',
	equivDD: '⩸',
	eqvparsl: '⧥',
	erarr: '⥱',
	erDot: '≓',
	escr: 'ℯ',
	Escr: 'ℰ',
	esdot: '≐',
	Esim: '⩳',
	esim: '≂',
	Eta: 'Η',
	eta: 'η',
	ETH: 'Ð',
	eth: 'ð',
	Euml: 'Ë',
	euml: 'ë',
	euro: '€',
	excl: '!',
	exist: '∃',
	Exists: '∃',
	expectation: 'ℰ',
	exponentiale: 'ⅇ',
	ExponentialE: 'ⅇ',
	fallingdotseq: '≒',
	Fcy: 'Ф',
	fcy: 'ф',
	female: '♀',
	ffilig: 'ﬃ',
	fflig: 'ﬀ',
	ffllig: 'ﬄ',
	Ffr: '𝔉',
	ffr: '𝔣',
	filig: 'ﬁ',
	FilledSmallSquare: '◼',
	FilledVerySmallSquare: '▪',
	fjlig: 'fj',
	flat: '♭',
	fllig: 'ﬂ',
	fltns: '▱',
	fnof: 'ƒ',
	Fopf: '𝔽',
	fopf: '𝕗',
	forall: '∀',
	ForAll: '∀',
	fork: '⋔',
	forkv: '⫙',
	Fouriertrf: 'ℱ',
	fpartint: '⨍',
	frac12: '½',
	frac13: '⅓',
	frac14: '¼',
	frac15: '⅕',
	frac16: '⅙',
	frac18: '⅛',
	frac23: '⅔',
	frac25: '⅖',
	frac34: '¾',
	frac35: '⅗',
	frac38: '⅜',
	frac45: '⅘',
	frac56: '⅚',
	frac58: '⅝',
	frac78: '⅞',
	frasl: '⁄',
	frown: '⌢',
	fscr: '𝒻',
	Fscr: 'ℱ',
	gacute: 'ǵ',
	Gamma: 'Γ',
	gamma: 'γ',
	Gammad: 'Ϝ',
	gammad: 'ϝ',
	gap: '⪆',
	Gbreve: 'Ğ',
	gbreve: 'ğ',
	Gcedil: 'Ģ',
	Gcirc: 'Ĝ',
	gcirc: 'ĝ',
	Gcy: 'Г',
	gcy: 'г',
	Gdot: 'Ġ',
	gdot: 'ġ',
	ge: '≥',
	gE: '≧',
	gEl: '⪌',
	gel: '⋛',
	geq: '≥',
	geqq: '≧',
	geqslant: '⩾',
	gescc: '⪩',
	ges: '⩾',
	gesdot: '⪀',
	gesdoto: '⪂',
	gesdotol: '⪄',
	gesl: '⋛︀',
	gesles: '⪔',
	Gfr: '𝔊',
	gfr: '𝔤',
	gg: '≫',
	Gg: '⋙',
	ggg: '⋙',
	gimel: 'ℷ',
	GJcy: 'Ѓ',
	gjcy: 'ѓ',
	gla: '⪥',
	gl: '≷',
	glE: '⪒',
	glj: '⪤',
	gnap: '⪊',
	gnapprox: '⪊',
	gne: '⪈',
	gnE: '≩',
	gneq: '⪈',
	gneqq: '≩',
	gnsim: '⋧',
	Gopf: '𝔾',
	gopf: '𝕘',
	grave: '`',
	GreaterEqual: '≥',
	GreaterEqualLess: '⋛',
	GreaterFullEqual: '≧',
	GreaterGreater: '⪢',
	GreaterLess: '≷',
	GreaterSlantEqual: '⩾',
	GreaterTilde: '≳',
	Gscr: '𝒢',
	gscr: 'ℊ',
	gsim: '≳',
	gsime: '⪎',
	gsiml: '⪐',
	gtcc: '⪧',
	gtcir: '⩺',
	gt: '>',
	GT: '>',
	Gt: '≫',
	gtdot: '⋗',
	gtlPar: '⦕',
	gtquest: '⩼',
	gtrapprox: '⪆',
	gtrarr: '⥸',
	gtrdot: '⋗',
	gtreqless: '⋛',
	gtreqqless: '⪌',
	gtrless: '≷',
	gtrsim: '≳',
	gvertneqq: '≩︀',
	gvnE: '≩︀',
	Hacek: 'ˇ',
	hairsp: ' ',
	half: '½',
	hamilt: 'ℋ',
	HARDcy: 'Ъ',
	hardcy: 'ъ',
	harrcir: '⥈',
	harr: '↔',
	hArr: '⇔',
	harrw: '↭',
	Hat: '^',
	hbar: 'ℏ',
	Hcirc: 'Ĥ',
	hcirc: 'ĥ',
	hearts: '♥',
	heartsuit: '♥',
	hellip: '…',
	hercon: '⊹',
	hfr: '𝔥',
	Hfr: 'ℌ',
	HilbertSpace: 'ℋ',
	hksearow: '⤥',
	hkswarow: '⤦',
	hoarr: '⇿',
	homtht: '∻',
	hookleftarrow: '↩',
	hookrightarrow: '↪',
	hopf: '𝕙',
	Hopf: 'ℍ',
	horbar: '―',
	HorizontalLine: '─',
	hscr: '𝒽',
	Hscr: 'ℋ',
	hslash: 'ℏ',
	Hstrok: 'Ħ',
	hstrok: 'ħ',
	HumpDownHump: '≎',
	HumpEqual: '≏',
	hybull: '⁃',
	hyphen: '‐',
	Iacute: 'Í',
	iacute: 'í',
	ic: '\u2063',
	Icirc: 'Î',
	icirc: 'î',
	Icy: 'И',
	icy: 'и',
	Idot: 'İ',
	IEcy: 'Е',
	iecy: 'е',
	iexcl: '¡',
	iff: '⇔',
	ifr: '𝔦',
	Ifr: 'ℑ',
	Igrave: 'Ì',
	igrave: 'ì',
	ii: 'ⅈ',
	iiiint: '⨌',
	iiint: '∭',
	iinfin: '⧜',
	iiota: '℩',
	IJlig: 'Ĳ',
	ijlig: 'ĳ',
	Imacr: 'Ī',
	imacr: 'ī',
	image: 'ℑ',
	ImaginaryI: 'ⅈ',
	imagline: 'ℐ',
	imagpart: 'ℑ',
	imath: 'ı',
	Im: 'ℑ',
	imof: '⊷',
	imped: 'Ƶ',
	Implies: '⇒',
	incare: '℅',
	'in': '∈',
	infin: '∞',
	infintie: '⧝',
	inodot: 'ı',
	intcal: '⊺',
	int: '∫',
	Int: '∬',
	integers: 'ℤ',
	Integral: '∫',
	intercal: '⊺',
	Intersection: '⋂',
	intlarhk: '⨗',
	intprod: '⨼',
	InvisibleComma: '\u2063',
	InvisibleTimes: '\u2062',
	IOcy: 'Ё',
	iocy: 'ё',
	Iogon: 'Į',
	iogon: 'į',
	Iopf: '𝕀',
	iopf: '𝕚',
	Iota: 'Ι',
	iota: 'ι',
	iprod: '⨼',
	iquest: '¿',
	iscr: '𝒾',
	Iscr: 'ℐ',
	isin: '∈',
	isindot: '⋵',
	isinE: '⋹',
	isins: '⋴',
	isinsv: '⋳',
	isinv: '∈',
	it: '\u2062',
	Itilde: 'Ĩ',
	itilde: 'ĩ',
	Iukcy: 'І',
	iukcy: 'і',
	Iuml: 'Ï',
	iuml: 'ï',
	Jcirc: 'Ĵ',
	jcirc: 'ĵ',
	Jcy: 'Й',
	jcy: 'й',
	Jfr: '𝔍',
	jfr: '𝔧',
	jmath: 'ȷ',
	Jopf: '𝕁',
	jopf: '𝕛',
	Jscr: '𝒥',
	jscr: '𝒿',
	Jsercy: 'Ј',
	jsercy: 'ј',
	Jukcy: 'Є',
	jukcy: 'є',
	Kappa: 'Κ',
	kappa: 'κ',
	kappav: 'ϰ',
	Kcedil: 'Ķ',
	kcedil: 'ķ',
	Kcy: 'К',
	kcy: 'к',
	Kfr: '𝔎',
	kfr: '𝔨',
	kgreen: 'ĸ',
	KHcy: 'Х',
	khcy: 'х',
	KJcy: 'Ќ',
	kjcy: 'ќ',
	Kopf: '𝕂',
	kopf: '𝕜',
	Kscr: '𝒦',
	kscr: '𝓀',
	lAarr: '⇚',
	Lacute: 'Ĺ',
	lacute: 'ĺ',
	laemptyv: '⦴',
	lagran: 'ℒ',
	Lambda: 'Λ',
	lambda: 'λ',
	lang: '⟨',
	Lang: '⟪',
	langd: '⦑',
	langle: '⟨',
	lap: '⪅',
	Laplacetrf: 'ℒ',
	laquo: '«',
	larrb: '⇤',
	larrbfs: '⤟',
	larr: '←',
	Larr: '↞',
	lArr: '⇐',
	larrfs: '⤝',
	larrhk: '↩',
	larrlp: '↫',
	larrpl: '⤹',
	larrsim: '⥳',
	larrtl: '↢',
	latail: '⤙',
	lAtail: '⤛',
	lat: '⪫',
	late: '⪭',
	lates: '⪭︀',
	lbarr: '⤌',
	lBarr: '⤎',
	lbbrk: '❲',
	lbrace: '{',
	lbrack: '[',
	lbrke: '⦋',
	lbrksld: '⦏',
	lbrkslu: '⦍',
	Lcaron: 'Ľ',
	lcaron: 'ľ',
	Lcedil: 'Ļ',
	lcedil: 'ļ',
	lceil: '⌈',
	lcub: '{',
	Lcy: 'Л',
	lcy: 'л',
	ldca: '⤶',
	ldquo: '“',
	ldquor: '„',
	ldrdhar: '⥧',
	ldrushar: '⥋',
	ldsh: '↲',
	le: '≤',
	lE: '≦',
	LeftAngleBracket: '⟨',
	LeftArrowBar: '⇤',
	leftarrow: '←',
	LeftArrow: '←',
	Leftarrow: '⇐',
	LeftArrowRightArrow: '⇆',
	leftarrowtail: '↢',
	LeftCeiling: '⌈',
	LeftDoubleBracket: '⟦',
	LeftDownTeeVector: '⥡',
	LeftDownVectorBar: '⥙',
	LeftDownVector: '⇃',
	LeftFloor: '⌊',
	leftharpoondown: '↽',
	leftharpoonup: '↼',
	leftleftarrows: '⇇',
	leftrightarrow: '↔',
	LeftRightArrow: '↔',
	Leftrightarrow: '⇔',
	leftrightarrows: '⇆',
	leftrightharpoons: '⇋',
	leftrightsquigarrow: '↭',
	LeftRightVector: '⥎',
	LeftTeeArrow: '↤',
	LeftTee: '⊣',
	LeftTeeVector: '⥚',
	leftthreetimes: '⋋',
	LeftTriangleBar: '⧏',
	LeftTriangle: '⊲',
	LeftTriangleEqual: '⊴',
	LeftUpDownVector: '⥑',
	LeftUpTeeVector: '⥠',
	LeftUpVectorBar: '⥘',
	LeftUpVector: '↿',
	LeftVectorBar: '⥒',
	LeftVector: '↼',
	lEg: '⪋',
	leg: '⋚',
	leq: '≤',
	leqq: '≦',
	leqslant: '⩽',
	lescc: '⪨',
	les: '⩽',
	lesdot: '⩿',
	lesdoto: '⪁',
	lesdotor: '⪃',
	lesg: '⋚︀',
	lesges: '⪓',
	lessapprox: '⪅',
	lessdot: '⋖',
	lesseqgtr: '⋚',
	lesseqqgtr: '⪋',
	LessEqualGreater: '⋚',
	LessFullEqual: '≦',
	LessGreater: '≶',
	lessgtr: '≶',
	LessLess: '⪡',
	lesssim: '≲',
	LessSlantEqual: '⩽',
	LessTilde: '≲',
	lfisht: '⥼',
	lfloor: '⌊',
	Lfr: '𝔏',
	lfr: '𝔩',
	lg: '≶',
	lgE: '⪑',
	lHar: '⥢',
	lhard: '↽',
	lharu: '↼',
	lharul: '⥪',
	lhblk: '▄',
	LJcy: 'Љ',
	ljcy: 'љ',
	llarr: '⇇',
	ll: '≪',
	Ll: '⋘',
	llcorner: '⌞',
	Lleftarrow: '⇚',
	llhard: '⥫',
	lltri: '◺',
	Lmidot: 'Ŀ',
	lmidot: 'ŀ',
	lmoustache: '⎰',
	lmoust: '⎰',
	lnap: '⪉',
	lnapprox: '⪉',
	lne: '⪇',
	lnE: '≨',
	lneq: '⪇',
	lneqq: '≨',
	lnsim: '⋦',
	loang: '⟬',
	loarr: '⇽',
	lobrk: '⟦',
	longleftarrow: '⟵',
	LongLeftArrow: '⟵',
	Longleftarrow: '⟸',
	longleftrightarrow: '⟷',
	LongLeftRightArrow: '⟷',
	Longleftrightarrow: '⟺',
	longmapsto: '⟼',
	longrightarrow: '⟶',
	LongRightArrow: '⟶',
	Longrightarrow: '⟹',
	looparrowleft: '↫',
	looparrowright: '↬',
	lopar: '⦅',
	Lopf: '𝕃',
	lopf: '𝕝',
	loplus: '⨭',
	lotimes: '⨴',
	lowast: '∗',
	lowbar: '_',
	LowerLeftArrow: '↙',
	LowerRightArrow: '↘',
	loz: '◊',
	lozenge: '◊',
	lozf: '⧫',
	lpar: '(',
	lparlt: '⦓',
	lrarr: '⇆',
	lrcorner: '⌟',
	lrhar: '⇋',
	lrhard: '⥭',
	lrm: '\u200E',
	lrtri: '⊿',
	lsaquo: '‹',
	lscr: '𝓁',
	Lscr: 'ℒ',
	lsh: '↰',
	Lsh: '↰',
	lsim: '≲',
	lsime: '⪍',
	lsimg: '⪏',
	lsqb: '[',
	lsquo: '‘',
	lsquor: '‚',
	Lstrok: 'Ł',
	lstrok: 'ł',
	ltcc: '⪦',
	ltcir: '⩹',
	lt: '<',
	LT: '<',
	Lt: '≪',
	ltdot: '⋖',
	lthree: '⋋',
	ltimes: '⋉',
	ltlarr: '⥶',
	ltquest: '⩻',
	ltri: '◃',
	ltrie: '⊴',
	ltrif: '◂',
	ltrPar: '⦖',
	lurdshar: '⥊',
	luruhar: '⥦',
	lvertneqq: '≨︀',
	lvnE: '≨︀',
	macr: '¯',
	male: '♂',
	malt: '✠',
	maltese: '✠',
	Map: '⤅',
	map: '↦',
	mapsto: '↦',
	mapstodown: '↧',
	mapstoleft: '↤',
	mapstoup: '↥',
	marker: '▮',
	mcomma: '⨩',
	Mcy: 'М',
	mcy: 'м',
	mdash: '—',
	mDDot: '∺',
	measuredangle: '∡',
	MediumSpace: ' ',
	Mellintrf: 'ℳ',
	Mfr: '𝔐',
	mfr: '𝔪',
	mho: '℧',
	micro: 'µ',
	midast: '*',
	midcir: '⫰',
	mid: '∣',
	middot: '·',
	minusb: '⊟',
	minus: '−',
	minusd: '∸',
	minusdu: '⨪',
	MinusPlus: '∓',
	mlcp: '⫛',
	mldr: '…',
	mnplus: '∓',
	models: '⊧',
	Mopf: '𝕄',
	mopf: '𝕞',
	mp: '∓',
	mscr: '𝓂',
	Mscr: 'ℳ',
	mstpos: '∾',
	Mu: 'Μ',
	mu: 'μ',
	multimap: '⊸',
	mumap: '⊸',
	nabla: '∇',
	Nacute: 'Ń',
	nacute: 'ń',
	nang: '∠⃒',
	nap: '≉',
	napE: '⩰̸',
	napid: '≋̸',
	napos: 'ŉ',
	napprox: '≉',
	natural: '♮',
	naturals: 'ℕ',
	natur: '♮',
	nbsp: ' ',
	nbump: '≎̸',
	nbumpe: '≏̸',
	ncap: '⩃',
	Ncaron: 'Ň',
	ncaron: 'ň',
	Ncedil: 'Ņ',
	ncedil: 'ņ',
	ncong: '≇',
	ncongdot: '⩭̸',
	ncup: '⩂',
	Ncy: 'Н',
	ncy: 'н',
	ndash: '–',
	nearhk: '⤤',
	nearr: '↗',
	neArr: '⇗',
	nearrow: '↗',
	ne: '≠',
	nedot: '≐̸',
	NegativeMediumSpace: '\u200B',
	NegativeThickSpace: '\u200B',
	NegativeThinSpace: '\u200B',
	NegativeVeryThinSpace: '\u200B',
	nequiv: '≢',
	nesear: '⤨',
	nesim: '≂̸',
	NestedGreaterGreater: '≫',
	NestedLessLess: '≪',
	NewLine: '\n',
	nexist: '∄',
	nexists: '∄',
	Nfr: '𝔑',
	nfr: '𝔫',
	ngE: '≧̸',
	nge: '≱',
	ngeq: '≱',
	ngeqq: '≧̸',
	ngeqslant: '⩾̸',
	nges: '⩾̸',
	nGg: '⋙̸',
	ngsim: '≵',
	nGt: '≫⃒',
	ngt: '≯',
	ngtr: '≯',
	nGtv: '≫̸',
	nharr: '↮',
	nhArr: '⇎',
	nhpar: '⫲',
	ni: '∋',
	nis: '⋼',
	nisd: '⋺',
	niv: '∋',
	NJcy: 'Њ',
	njcy: 'њ',
	nlarr: '↚',
	nlArr: '⇍',
	nldr: '‥',
	nlE: '≦̸',
	nle: '≰',
	nleftarrow: '↚',
	nLeftarrow: '⇍',
	nleftrightarrow: '↮',
	nLeftrightarrow: '⇎',
	nleq: '≰',
	nleqq: '≦̸',
	nleqslant: '⩽̸',
	nles: '⩽̸',
	nless: '≮',
	nLl: '⋘̸',
	nlsim: '≴',
	nLt: '≪⃒',
	nlt: '≮',
	nltri: '⋪',
	nltrie: '⋬',
	nLtv: '≪̸',
	nmid: '∤',
	NoBreak: '\u2060',
	NonBreakingSpace: ' ',
	nopf: '𝕟',
	Nopf: 'ℕ',
	Not: '⫬',
	not: '¬',
	NotCongruent: '≢',
	NotCupCap: '≭',
	NotDoubleVerticalBar: '∦',
	NotElement: '∉',
	NotEqual: '≠',
	NotEqualTilde: '≂̸',
	NotExists: '∄',
	NotGreater: '≯',
	NotGreaterEqual: '≱',
	NotGreaterFullEqual: '≧̸',
	NotGreaterGreater: '≫̸',
	NotGreaterLess: '≹',
	NotGreaterSlantEqual: '⩾̸',
	NotGreaterTilde: '≵',
	NotHumpDownHump: '≎̸',
	NotHumpEqual: '≏̸',
	notin: '∉',
	notindot: '⋵̸',
	notinE: '⋹̸',
	notinva: '∉',
	notinvb: '⋷',
	notinvc: '⋶',
	NotLeftTriangleBar: '⧏̸',
	NotLeftTriangle: '⋪',
	NotLeftTriangleEqual: '⋬',
	NotLess: '≮',
	NotLessEqual: '≰',
	NotLessGreater: '≸',
	NotLessLess: '≪̸',
	NotLessSlantEqual: '⩽̸',
	NotLessTilde: '≴',
	NotNestedGreaterGreater: '⪢̸',
	NotNestedLessLess: '⪡̸',
	notni: '∌',
	notniva: '∌',
	notnivb: '⋾',
	notnivc: '⋽',
	NotPrecedes: '⊀',
	NotPrecedesEqual: '⪯̸',
	NotPrecedesSlantEqual: '⋠',
	NotReverseElement: '∌',
	NotRightTriangleBar: '⧐̸',
	NotRightTriangle: '⋫',
	NotRightTriangleEqual: '⋭',
	NotSquareSubset: '⊏̸',
	NotSquareSubsetEqual: '⋢',
	NotSquareSuperset: '⊐̸',
	NotSquareSupersetEqual: '⋣',
	NotSubset: '⊂⃒',
	NotSubsetEqual: '⊈',
	NotSucceeds: '⊁',
	NotSucceedsEqual: '⪰̸',
	NotSucceedsSlantEqual: '⋡',
	NotSucceedsTilde: '≿̸',
	NotSuperset: '⊃⃒',
	NotSupersetEqual: '⊉',
	NotTilde: '≁',
	NotTildeEqual: '≄',
	NotTildeFullEqual: '≇',
	NotTildeTilde: '≉',
	NotVerticalBar: '∤',
	nparallel: '∦',
	npar: '∦',
	nparsl: '⫽⃥',
	npart: '∂̸',
	npolint: '⨔',
	npr: '⊀',
	nprcue: '⋠',
	nprec: '⊀',
	npreceq: '⪯̸',
	npre: '⪯̸',
	nrarrc: '⤳̸',
	nrarr: '↛',
	nrArr: '⇏',
	nrarrw: '↝̸',
	nrightarrow: '↛',
	nRightarrow: '⇏',
	nrtri: '⋫',
	nrtrie: '⋭',
	nsc: '⊁',
	nsccue: '⋡',
	nsce: '⪰̸',
	Nscr: '𝒩',
	nscr: '𝓃',
	nshortmid: '∤',
	nshortparallel: '∦',
	nsim: '≁',
	nsime: '≄',
	nsimeq: '≄',
	nsmid: '∤',
	nspar: '∦',
	nsqsube: '⋢',
	nsqsupe: '⋣',
	nsub: '⊄',
	nsubE: '⫅̸',
	nsube: '⊈',
	nsubset: '⊂⃒',
	nsubseteq: '⊈',
	nsubseteqq: '⫅̸',
	nsucc: '⊁',
	nsucceq: '⪰̸',
	nsup: '⊅',
	nsupE: '⫆̸',
	nsupe: '⊉',
	nsupset: '⊃⃒',
	nsupseteq: '⊉',
	nsupseteqq: '⫆̸',
	ntgl: '≹',
	Ntilde: 'Ñ',
	ntilde: 'ñ',
	ntlg: '≸',
	ntriangleleft: '⋪',
	ntrianglelefteq: '⋬',
	ntriangleright: '⋫',
	ntrianglerighteq: '⋭',
	Nu: 'Ν',
	nu: 'ν',
	num: '#',
	numero: '№',
	numsp: ' ',
	nvap: '≍⃒',
	nvdash: '⊬',
	nvDash: '⊭',
	nVdash: '⊮',
	nVDash: '⊯',
	nvge: '≥⃒',
	nvgt: '>⃒',
	nvHarr: '⤄',
	nvinfin: '⧞',
	nvlArr: '⤂',
	nvle: '≤⃒',
	nvlt: '<⃒',
	nvltrie: '⊴⃒',
	nvrArr: '⤃',
	nvrtrie: '⊵⃒',
	nvsim: '∼⃒',
	nwarhk: '⤣',
	nwarr: '↖',
	nwArr: '⇖',
	nwarrow: '↖',
	nwnear: '⤧',
	Oacute: 'Ó',
	oacute: 'ó',
	oast: '⊛',
	Ocirc: 'Ô',
	ocirc: 'ô',
	ocir: '⊚',
	Ocy: 'О',
	ocy: 'о',
	odash: '⊝',
	Odblac: 'Ő',
	odblac: 'ő',
	odiv: '⨸',
	odot: '⊙',
	odsold: '⦼',
	OElig: 'Œ',
	oelig: 'œ',
	ofcir: '⦿',
	Ofr: '𝔒',
	ofr: '𝔬',
	ogon: '˛',
	Ograve: 'Ò',
	ograve: 'ò',
	ogt: '⧁',
	ohbar: '⦵',
	ohm: 'Ω',
	oint: '∮',
	olarr: '↺',
	olcir: '⦾',
	olcross: '⦻',
	oline: '‾',
	olt: '⧀',
	Omacr: 'Ō',
	omacr: 'ō',
	Omega: 'Ω',
	omega: 'ω',
	Omicron: 'Ο',
	omicron: 'ο',
	omid: '⦶',
	ominus: '⊖',
	Oopf: '𝕆',
	oopf: '𝕠',
	opar: '⦷',
	OpenCurlyDoubleQuote: '“',
	OpenCurlyQuote: '‘',
	operp: '⦹',
	oplus: '⊕',
	orarr: '↻',
	Or: '⩔',
	or: '∨',
	ord: '⩝',
	order: 'ℴ',
	orderof: 'ℴ',
	ordf: 'ª',
	ordm: 'º',
	origof: '⊶',
	oror: '⩖',
	orslope: '⩗',
	orv: '⩛',
	oS: 'Ⓢ',
	Oscr: '𝒪',
	oscr: 'ℴ',
	Oslash: 'Ø',
	oslash: 'ø',
	osol: '⊘',
	Otilde: 'Õ',
	otilde: 'õ',
	otimesas: '⨶',
	Otimes: '⨷',
	otimes: '⊗',
	Ouml: 'Ö',
	ouml: 'ö',
	ovbar: '⌽',
	OverBar: '‾',
	OverBrace: '⏞',
	OverBracket: '⎴',
	OverParenthesis: '⏜',
	para: '¶',
	parallel: '∥',
	par: '∥',
	parsim: '⫳',
	parsl: '⫽',
	part: '∂',
	PartialD: '∂',
	Pcy: 'П',
	pcy: 'п',
	percnt: '%',
	period: '.',
	permil: '‰',
	perp: '⊥',
	pertenk: '‱',
	Pfr: '𝔓',
	pfr: '𝔭',
	Phi: 'Φ',
	phi: 'φ',
	phiv: 'ϕ',
	phmmat: 'ℳ',
	phone: '☎',
	Pi: 'Π',
	pi: 'π',
	pitchfork: '⋔',
	piv: 'ϖ',
	planck: 'ℏ',
	planckh: 'ℎ',
	plankv: 'ℏ',
	plusacir: '⨣',
	plusb: '⊞',
	pluscir: '⨢',
	plus: '+',
	plusdo: '∔',
	plusdu: '⨥',
	pluse: '⩲',
	PlusMinus: '±',
	plusmn: '±',
	plussim: '⨦',
	plustwo: '⨧',
	pm: '±',
	Poincareplane: 'ℌ',
	pointint: '⨕',
	popf: '𝕡',
	Popf: 'ℙ',
	pound: '£',
	prap: '⪷',
	Pr: '⪻',
	pr: '≺',
	prcue: '≼',
	precapprox: '⪷',
	prec: '≺',
	preccurlyeq: '≼',
	Precedes: '≺',
	PrecedesEqual: '⪯',
	PrecedesSlantEqual: '≼',
	PrecedesTilde: '≾',
	preceq: '⪯',
	precnapprox: '⪹',
	precneqq: '⪵',
	precnsim: '⋨',
	pre: '⪯',
	prE: '⪳',
	precsim: '≾',
	prime: '′',
	Prime: '″',
	primes: 'ℙ',
	prnap: '⪹',
	prnE: '⪵',
	prnsim: '⋨',
	prod: '∏',
	Product: '∏',
	profalar: '⌮',
	profline: '⌒',
	profsurf: '⌓',
	prop: '∝',
	Proportional: '∝',
	Proportion: '∷',
	propto: '∝',
	prsim: '≾',
	prurel: '⊰',
	Pscr: '𝒫',
	pscr: '𝓅',
	Psi: 'Ψ',
	psi: 'ψ',
	puncsp: ' ',
	Qfr: '𝔔',
	qfr: '𝔮',
	qint: '⨌',
	qopf: '𝕢',
	Qopf: 'ℚ',
	qprime: '⁗',
	Qscr: '𝒬',
	qscr: '𝓆',
	quaternions: 'ℍ',
	quatint: '⨖',
	quest: '?',
	questeq: '≟',
	quot: '"',
	QUOT: '"',
	rAarr: '⇛',
	race: '∽̱',
	Racute: 'Ŕ',
	racute: 'ŕ',
	radic: '√',
	raemptyv: '⦳',
	rang: '⟩',
	Rang: '⟫',
	rangd: '⦒',
	range: '⦥',
	rangle: '⟩',
	raquo: '»',
	rarrap: '⥵',
	rarrb: '⇥',
	rarrbfs: '⤠',
	rarrc: '⤳',
	rarr: '→',
	Rarr: '↠',
	rArr: '⇒',
	rarrfs: '⤞',
	rarrhk: '↪',
	rarrlp: '↬',
	rarrpl: '⥅',
	rarrsim: '⥴',
	Rarrtl: '⤖',
	rarrtl: '↣',
	rarrw: '↝',
	ratail: '⤚',
	rAtail: '⤜',
	ratio: '∶',
	rationals: 'ℚ',
	rbarr: '⤍',
	rBarr: '⤏',
	RBarr: '⤐',
	rbbrk: '❳',
	rbrace: '}',
	rbrack: ']',
	rbrke: '⦌',
	rbrksld: '⦎',
	rbrkslu: '⦐',
	Rcaron: 'Ř',
	rcaron: 'ř',
	Rcedil: 'Ŗ',
	rcedil: 'ŗ',
	rceil: '⌉',
	rcub: '}',
	Rcy: 'Р',
	rcy: 'р',
	rdca: '⤷',
	rdldhar: '⥩',
	rdquo: '”',
	rdquor: '”',
	rdsh: '↳',
	real: 'ℜ',
	realine: 'ℛ',
	realpart: 'ℜ',
	reals: 'ℝ',
	Re: 'ℜ',
	rect: '▭',
	reg: '®',
	REG: '®',
	ReverseElement: '∋',
	ReverseEquilibrium: '⇋',
	ReverseUpEquilibrium: '⥯',
	rfisht: '⥽',
	rfloor: '⌋',
	rfr: '𝔯',
	Rfr: 'ℜ',
	rHar: '⥤',
	rhard: '⇁',
	rharu: '⇀',
	rharul: '⥬',
	Rho: 'Ρ',
	rho: 'ρ',
	rhov: 'ϱ',
	RightAngleBracket: '⟩',
	RightArrowBar: '⇥',
	rightarrow: '→',
	RightArrow: '→',
	Rightarrow: '⇒',
	RightArrowLeftArrow: '⇄',
	rightarrowtail: '↣',
	RightCeiling: '⌉',
	RightDoubleBracket: '⟧',
	RightDownTeeVector: '⥝',
	RightDownVectorBar: '⥕',
	RightDownVector: '⇂',
	RightFloor: '⌋',
	rightharpoondown: '⇁',
	rightharpoonup: '⇀',
	rightleftarrows: '⇄',
	rightleftharpoons: '⇌',
	rightrightarrows: '⇉',
	rightsquigarrow: '↝',
	RightTeeArrow: '↦',
	RightTee: '⊢',
	RightTeeVector: '⥛',
	rightthreetimes: '⋌',
	RightTriangleBar: '⧐',
	RightTriangle: '⊳',
	RightTriangleEqual: '⊵',
	RightUpDownVector: '⥏',
	RightUpTeeVector: '⥜',
	RightUpVectorBar: '⥔',
	RightUpVector: '↾',
	RightVectorBar: '⥓',
	RightVector: '⇀',
	ring: '˚',
	risingdotseq: '≓',
	rlarr: '⇄',
	rlhar: '⇌',
	rlm: '\u200F',
	rmoustache: '⎱',
	rmoust: '⎱',
	rnmid: '⫮',
	roang: '⟭',
	roarr: '⇾',
	robrk: '⟧',
	ropar: '⦆',
	ropf: '𝕣',
	Ropf: 'ℝ',
	roplus: '⨮',
	rotimes: '⨵',
	RoundImplies: '⥰',
	rpar: ')',
	rpargt: '⦔',
	rppolint: '⨒',
	rrarr: '⇉',
	Rrightarrow: '⇛',
	rsaquo: '›',
	rscr: '𝓇',
	Rscr: 'ℛ',
	rsh: '↱',
	Rsh: '↱',
	rsqb: ']',
	rsquo: '’',
	rsquor: '’',
	rthree: '⋌',
	rtimes: '⋊',
	rtri: '▹',
	rtrie: '⊵',
	rtrif: '▸',
	rtriltri: '⧎',
	RuleDelayed: '⧴',
	ruluhar: '⥨',
	rx: '℞',
	Sacute: 'Ś',
	sacute: 'ś',
	sbquo: '‚',
	scap: '⪸',
	Scaron: 'Š',
	scaron: 'š',
	Sc: '⪼',
	sc: '≻',
	sccue: '≽',
	sce: '⪰',
	scE: '⪴',
	Scedil: 'Ş',
	scedil: 'ş',
	Scirc: 'Ŝ',
	scirc: 'ŝ',
	scnap: '⪺',
	scnE: '⪶',
	scnsim: '⋩',
	scpolint: '⨓',
	scsim: '≿',
	Scy: 'С',
	scy: 'с',
	sdotb: '⊡',
	sdot: '⋅',
	sdote: '⩦',
	searhk: '⤥',
	searr: '↘',
	seArr: '⇘',
	searrow: '↘',
	sect: '§',
	semi: ';',
	seswar: '⤩',
	setminus: '∖',
	setmn: '∖',
	sext: '✶',
	Sfr: '𝔖',
	sfr: '𝔰',
	sfrown: '⌢',
	sharp: '♯',
	SHCHcy: 'Щ',
	shchcy: 'щ',
	SHcy: 'Ш',
	shcy: 'ш',
	ShortDownArrow: '↓',
	ShortLeftArrow: '←',
	shortmid: '∣',
	shortparallel: '∥',
	ShortRightArrow: '→',
	ShortUpArrow: '↑',
	shy: '\xAD',
	Sigma: 'Σ',
	sigma: 'σ',
	sigmaf: 'ς',
	sigmav: 'ς',
	sim: '∼',
	simdot: '⩪',
	sime: '≃',
	simeq: '≃',
	simg: '⪞',
	simgE: '⪠',
	siml: '⪝',
	simlE: '⪟',
	simne: '≆',
	simplus: '⨤',
	simrarr: '⥲',
	slarr: '←',
	SmallCircle: '∘',
	smallsetminus: '∖',
	smashp: '⨳',
	smeparsl: '⧤',
	smid: '∣',
	smile: '⌣',
	smt: '⪪',
	smte: '⪬',
	smtes: '⪬︀',
	SOFTcy: 'Ь',
	softcy: 'ь',
	solbar: '⌿',
	solb: '⧄',
	sol: '/',
	Sopf: '𝕊',
	sopf: '𝕤',
	spades: '♠',
	spadesuit: '♠',
	spar: '∥',
	sqcap: '⊓',
	sqcaps: '⊓︀',
	sqcup: '⊔',
	sqcups: '⊔︀',
	Sqrt: '√',
	sqsub: '⊏',
	sqsube: '⊑',
	sqsubset: '⊏',
	sqsubseteq: '⊑',
	sqsup: '⊐',
	sqsupe: '⊒',
	sqsupset: '⊐',
	sqsupseteq: '⊒',
	square: '□',
	Square: '□',
	SquareIntersection: '⊓',
	SquareSubset: '⊏',
	SquareSubsetEqual: '⊑',
	SquareSuperset: '⊐',
	SquareSupersetEqual: '⊒',
	SquareUnion: '⊔',
	squarf: '▪',
	squ: '□',
	squf: '▪',
	srarr: '→',
	Sscr: '𝒮',
	sscr: '𝓈',
	ssetmn: '∖',
	ssmile: '⌣',
	sstarf: '⋆',
	Star: '⋆',
	star: '☆',
	starf: '★',
	straightepsilon: 'ϵ',
	straightphi: 'ϕ',
	strns: '¯',
	sub: '⊂',
	Sub: '⋐',
	subdot: '⪽',
	subE: '⫅',
	sube: '⊆',
	subedot: '⫃',
	submult: '⫁',
	subnE: '⫋',
	subne: '⊊',
	subplus: '⪿',
	subrarr: '⥹',
	subset: '⊂',
	Subset: '⋐',
	subseteq: '⊆',
	subseteqq: '⫅',
	SubsetEqual: '⊆',
	subsetneq: '⊊',
	subsetneqq: '⫋',
	subsim: '⫇',
	subsub: '⫕',
	subsup: '⫓',
	succapprox: '⪸',
	succ: '≻',
	succcurlyeq: '≽',
	Succeeds: '≻',
	SucceedsEqual: '⪰',
	SucceedsSlantEqual: '≽',
	SucceedsTilde: '≿',
	succeq: '⪰',
	succnapprox: '⪺',
	succneqq: '⪶',
	succnsim: '⋩',
	succsim: '≿',
	SuchThat: '∋',
	sum: '∑',
	Sum: '∑',
	sung: '♪',
	sup1: '¹',
	sup2: '²',
	sup3: '³',
	sup: '⊃',
	Sup: '⋑',
	supdot: '⪾',
	supdsub: '⫘',
	supE: '⫆',
	supe: '⊇',
	supedot: '⫄',
	Superset: '⊃',
	SupersetEqual: '⊇',
	suphsol: '⟉',
	suphsub: '⫗',
	suplarr: '⥻',
	supmult: '⫂',
	supnE: '⫌',
	supne: '⊋',
	supplus: '⫀',
	supset: '⊃',
	Supset: '⋑',
	supseteq: '⊇',
	supseteqq: '⫆',
	supsetneq: '⊋',
	supsetneqq: '⫌',
	supsim: '⫈',
	supsub: '⫔',
	supsup: '⫖',
	swarhk: '⤦',
	swarr: '↙',
	swArr: '⇙',
	swarrow: '↙',
	swnwar: '⤪',
	szlig: 'ß',
	Tab: '	',
	target: '⌖',
	Tau: 'Τ',
	tau: 'τ',
	tbrk: '⎴',
	Tcaron: 'Ť',
	tcaron: 'ť',
	Tcedil: 'Ţ',
	tcedil: 'ţ',
	Tcy: 'Т',
	tcy: 'т',
	tdot: '⃛',
	telrec: '⌕',
	Tfr: '𝔗',
	tfr: '𝔱',
	there4: '∴',
	therefore: '∴',
	Therefore: '∴',
	Theta: 'Θ',
	theta: 'θ',
	thetasym: 'ϑ',
	thetav: 'ϑ',
	thickapprox: '≈',
	thicksim: '∼',
	ThickSpace: '  ',
	ThinSpace: ' ',
	thinsp: ' ',
	thkap: '≈',
	thksim: '∼',
	THORN: 'Þ',
	thorn: 'þ',
	tilde: '˜',
	Tilde: '∼',
	TildeEqual: '≃',
	TildeFullEqual: '≅',
	TildeTilde: '≈',
	timesbar: '⨱',
	timesb: '⊠',
	times: '×',
	timesd: '⨰',
	tint: '∭',
	toea: '⤨',
	topbot: '⌶',
	topcir: '⫱',
	top: '⊤',
	Topf: '𝕋',
	topf: '𝕥',
	topfork: '⫚',
	tosa: '⤩',
	tprime: '‴',
	trade: '™',
	TRADE: '™',
	triangle: '▵',
	triangledown: '▿',
	triangleleft: '◃',
	trianglelefteq: '⊴',
	triangleq: '≜',
	triangleright: '▹',
	trianglerighteq: '⊵',
	tridot: '◬',
	trie: '≜',
	triminus: '⨺',
	TripleDot: '⃛',
	triplus: '⨹',
	trisb: '⧍',
	tritime: '⨻',
	trpezium: '⏢',
	Tscr: '𝒯',
	tscr: '𝓉',
	TScy: 'Ц',
	tscy: 'ц',
	TSHcy: 'Ћ',
	tshcy: 'ћ',
	Tstrok: 'Ŧ',
	tstrok: 'ŧ',
	twixt: '≬',
	twoheadleftarrow: '↞',
	twoheadrightarrow: '↠',
	Uacute: 'Ú',
	uacute: 'ú',
	uarr: '↑',
	Uarr: '↟',
	uArr: '⇑',
	Uarrocir: '⥉',
	Ubrcy: 'Ў',
	ubrcy: 'ў',
	Ubreve: 'Ŭ',
	ubreve: 'ŭ',
	Ucirc: 'Û',
	ucirc: 'û',
	Ucy: 'У',
	ucy: 'у',
	udarr: '⇅',
	Udblac: 'Ű',
	udblac: 'ű',
	udhar: '⥮',
	ufisht: '⥾',
	Ufr: '𝔘',
	ufr: '𝔲',
	Ugrave: 'Ù',
	ugrave: 'ù',
	uHar: '⥣',
	uharl: '↿',
	uharr: '↾',
	uhblk: '▀',
	ulcorn: '⌜',
	ulcorner: '⌜',
	ulcrop: '⌏',
	ultri: '◸',
	Umacr: 'Ū',
	umacr: 'ū',
	uml: '¨',
	UnderBar: '_',
	UnderBrace: '⏟',
	UnderBracket: '⎵',
	UnderParenthesis: '⏝',
	Union: '⋃',
	UnionPlus: '⊎',
	Uogon: 'Ų',
	uogon: 'ų',
	Uopf: '𝕌',
	uopf: '𝕦',
	UpArrowBar: '⤒',
	uparrow: '↑',
	UpArrow: '↑',
	Uparrow: '⇑',
	UpArrowDownArrow: '⇅',
	updownarrow: '↕',
	UpDownArrow: '↕',
	Updownarrow: '⇕',
	UpEquilibrium: '⥮',
	upharpoonleft: '↿',
	upharpoonright: '↾',
	uplus: '⊎',
	UpperLeftArrow: '↖',
	UpperRightArrow: '↗',
	upsi: 'υ',
	Upsi: 'ϒ',
	upsih: 'ϒ',
	Upsilon: 'Υ',
	upsilon: 'υ',
	UpTeeArrow: '↥',
	UpTee: '⊥',
	upuparrows: '⇈',
	urcorn: '⌝',
	urcorner: '⌝',
	urcrop: '⌎',
	Uring: 'Ů',
	uring: 'ů',
	urtri: '◹',
	Uscr: '𝒰',
	uscr: '𝓊',
	utdot: '⋰',
	Utilde: 'Ũ',
	utilde: 'ũ',
	utri: '▵',
	utrif: '▴',
	uuarr: '⇈',
	Uuml: 'Ü',
	uuml: 'ü',
	uwangle: '⦧',
	vangrt: '⦜',
	varepsilon: 'ϵ',
	varkappa: 'ϰ',
	varnothing: '∅',
	varphi: 'ϕ',
	varpi: 'ϖ',
	varpropto: '∝',
	varr: '↕',
	vArr: '⇕',
	varrho: 'ϱ',
	varsigma: 'ς',
	varsubsetneq: '⊊︀',
	varsubsetneqq: '⫋︀',
	varsupsetneq: '⊋︀',
	varsupsetneqq: '⫌︀',
	vartheta: 'ϑ',
	vartriangleleft: '⊲',
	vartriangleright: '⊳',
	vBar: '⫨',
	Vbar: '⫫',
	vBarv: '⫩',
	Vcy: 'В',
	vcy: 'в',
	vdash: '⊢',
	vDash: '⊨',
	Vdash: '⊩',
	VDash: '⊫',
	Vdashl: '⫦',
	veebar: '⊻',
	vee: '∨',
	Vee: '⋁',
	veeeq: '≚',
	vellip: '⋮',
	verbar: '|',
	Verbar: '‖',
	vert: '|',
	Vert: '‖',
	VerticalBar: '∣',
	VerticalLine: '|',
	VerticalSeparator: '❘',
	VerticalTilde: '≀',
	VeryThinSpace: ' ',
	Vfr: '𝔙',
	vfr: '𝔳',
	vltri: '⊲',
	vnsub: '⊂⃒',
	vnsup: '⊃⃒',
	Vopf: '𝕍',
	vopf: '𝕧',
	vprop: '∝',
	vrtri: '⊳',
	Vscr: '𝒱',
	vscr: '𝓋',
	vsubnE: '⫋︀',
	vsubne: '⊊︀',
	vsupnE: '⫌︀',
	vsupne: '⊋︀',
	Vvdash: '⊪',
	vzigzag: '⦚',
	Wcirc: 'Ŵ',
	wcirc: 'ŵ',
	wedbar: '⩟',
	wedge: '∧',
	Wedge: '⋀',
	wedgeq: '≙',
	weierp: '℘',
	Wfr: '𝔚',
	wfr: '𝔴',
	Wopf: '𝕎',
	wopf: '𝕨',
	wp: '℘',
	wr: '≀',
	wreath: '≀',
	Wscr: '𝒲',
	wscr: '𝓌',
	xcap: '⋂',
	xcirc: '◯',
	xcup: '⋃',
	xdtri: '▽',
	Xfr: '𝔛',
	xfr: '𝔵',
	xharr: '⟷',
	xhArr: '⟺',
	Xi: 'Ξ',
	xi: 'ξ',
	xlarr: '⟵',
	xlArr: '⟸',
	xmap: '⟼',
	xnis: '⋻',
	xodot: '⨀',
	Xopf: '𝕏',
	xopf: '𝕩',
	xoplus: '⨁',
	xotime: '⨂',
	xrarr: '⟶',
	xrArr: '⟹',
	Xscr: '𝒳',
	xscr: '𝓍',
	xsqcup: '⨆',
	xuplus: '⨄',
	xutri: '△',
	xvee: '⋁',
	xwedge: '⋀',
	Yacute: 'Ý',
	yacute: 'ý',
	YAcy: 'Я',
	yacy: 'я',
	Ycirc: 'Ŷ',
	ycirc: 'ŷ',
	Ycy: 'Ы',
	ycy: 'ы',
	yen: '¥',
	Yfr: '𝔜',
	yfr: '𝔶',
	YIcy: 'Ї',
	yicy: 'ї',
	Yopf: '𝕐',
	yopf: '𝕪',
	Yscr: '𝒴',
	yscr: '𝓎',
	YUcy: 'Ю',
	yucy: 'ю',
	yuml: 'ÿ',
	Yuml: 'Ÿ',
	Zacute: 'Ź',
	zacute: 'ź',
	Zcaron: 'Ž',
	zcaron: 'ž',
	Zcy: 'З',
	zcy: 'з',
	Zdot: 'Ż',
	zdot: 'ż',
	zeetrf: 'ℨ',
	ZeroWidthSpace: '\u200B',
	Zeta: 'Ζ',
	zeta: 'ζ',
	zfr: '𝔷',
	Zfr: 'ℨ',
	ZHcy: 'Ж',
	zhcy: 'ж',
	zigrarr: '⇝',
	zopf: '𝕫',
	Zopf: 'ℤ',
	Zscr: '𝒵',
	zscr: '𝓏',
	zwj: '\u200D',
	zwnj: '\u200C',
});

const CONTINUE_ENTITIES = /*#__PURE__*/ Null({ Aacute:0, aacute:0, Acirc:0, acirc:0, acute:0, AElig:0, aelig:0, Agrave:0, agrave:0, amp:0, AMP:0, Aring:0, aring:0, Atilde:0, atilde:0, Auml:0, auml:0, brvbar:0, Ccedil:0, ccedil:0, cedil:0, cent:0, copy:0, COPY:0, curren:0, deg:0, divide:0, Eacute:0, eacute:0, Ecirc:0, ecirc:0, Egrave:0, egrave:0, ETH:0, eth:0, Euml:0, euml:0, frac12:0, frac14:0, frac34:0, gt:0, GT:0, Iacute:0, iacute:0, Icirc:0, icirc:0, iexcl:0, Igrave:0, igrave:0, iquest:0, Iuml:0, iuml:0, laquo:0, lt:0, LT:0, macr:0, micro:0, middot:0, nbsp:0, not:0, Ntilde:0, ntilde:0, Oacute:0, oacute:0, Ocirc:0, ocirc:0, Ograve:0, ograve:0, ordf:0, ordm:0, Oslash:0, oslash:0, Otilde:0, otilde:0, Ouml:0, ouml:0, para:0, plusmn:0, pound:0, quot:0, QUOT:0, raquo:0, reg:0, REG:0, sect:0, shy:0, sup1:0, sup2:0, sup3:0, szlig:0, THORN:0, thorn:0, times:0, Uacute:0, uacute:0, Ucirc:0, ucirc:0, Ugrave:0, ugrave:0, uml:0, Uuml:0, uuml:0, Yacute:0, yacute:0, yen:0, yuml:0 });

const ESCAPABLE_INNER_TEXT = /[\t\n\r &<\xA0\u2000-\u200A\u2028\u2029\u202F\u3000]/g;// 除了必须转义的，还有防止被 Vue 编译器剔除的空白
const ESCAPABLE_BEAUTIFUL_TEXT = /[\t&<]/g;
const escapableInnerTextReplacer = ($0        ) => `&#${$0.charCodeAt(0)};`;
const escapeInnerText = (text        )         => text.replace(ESCAPABLE_INNER_TEXT, escapableInnerTextReplacer);
const escapeBeautifulText = (text        )         => text.replace(ESCAPABLE_BEAUTIFUL_TEXT, escapableInnerTextReplacer);

const ESCAPABLE_ATTRIBUTE_VALUE = /["&]/g;
const escapableAttributeValueReplacer = ($0        ) => $0==='"' ? '&quot;' : '&amp;';
const escapeAttributeValue = (text        )         => text.replace(ESCAPABLE_ATTRIBUTE_VALUE, escapableAttributeValueReplacer);

//export const test = (text :string) => { if ( / /.test(text) ) {} };

const CONTROL_TO_CHAR = Null({
	0x80: 0x20AC,
	0x82: 0x201A,
	0x83: 0x0192,
	0x84: 0x201E,
	0x85: 0x2026,
	0x86: 0x2020,
	0x87: 0x2021,
	0x88: 0x02C6,
	0x89: 0x2030,
	0x8A: 0x0160,
	0x8B: 0x2039,
	0x8C: 0x0152,
	0x8E: 0x017D,
	0x91: 0x2018,
	0x92: 0x2019,
	0x93: 0x201C,
	0x94: 0x201D,
	0x95: 0x2022,
	0x96: 0x2013,
	0x97: 0x2014,
	0x98: 0x02DC,
	0x99: 0x2122,
	0x9A: 0x0161,
	0x9B: 0x203A,
	0x9C: 0x0153,
	0x9E: 0x017E,
	0x9F: 0x0178,
});

const ENTITIES_TO_TRY = /&([a-z][a-z\d]*|#(?:\d+|x[\dA-F]+));?/ig;

const unescape_or_return = (ambiguous_ampersand        , inner        )         => {
	if ( inner[0]==='#' ) {
		const codePoint         = ambiguous_ampersand[2]==='x'
			? parseInt$1(inner.slice(2), 16)
			: parseInt$1(inner.slice(1), 10);
		if ( codePoint===0x00 || 0xD800<=codePoint && codePoint<=0xDFFF || 0x10FFFF<codePoint ) { return '\uFFFD'; }
		return fromCodePoint(codePoint in CONTROL_TO_CHAR ? CONTROL_TO_CHAR[codePoint                                ] : codePoint);
	}
	else {
		if ( ambiguous_ampersand && ambiguous_ampersand[ambiguous_ampersand.length - 1]===';' && inner in SEMICOLON_ENTITIES ) { return SEMICOLON_ENTITIES[inner]; }
		let index = inner.length;
		for ( ; ;--index ) {
			if ( inner.slice(0, index) in CONTINUE_ENTITIES ) {
				return SEMICOLON_ENTITIES[ambiguous_ampersand.slice(0, index)]+ambiguous_ampersand.slice(index);
			}
			if ( index===1 ) { return ambiguous_ampersand; }
		}
	}
};

const ENTITIES = /&(?:(?:([a-z][a-z\d]*)|#(?:\d+|x[\dA-F]+));?)?/ig;

const unescape_or_throw = (ambiguous_ampersand        , named         )         => {
	if ( ambiguous_ampersand.length===1 ) { throw SyntaxError$1(`孤立的“&”没有作为 HTML 实体存在`); }
	if ( !ambiguous_ampersand || ambiguous_ampersand[ambiguous_ampersand.length - 1]!==';' ) { throw SyntaxError$1(`HTML 实体“${ambiguous_ampersand}”后缺少“;”`); }
	if ( named ) {
		if ( named in SEMICOLON_ENTITIES ) { return SEMICOLON_ENTITIES[named] ; }
		throw ReferenceError$1(`未知的 HTML 实体名称“${ambiguous_ampersand}”`);
	}
	const codePoint         = ambiguous_ampersand[2]==='x' ? parseInt$1(ambiguous_ampersand.slice(3, -1), 16) : parseInt$1(ambiguous_ampersand.slice(2, -1), 10);
	if ( codePoint===0x00 ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值为空（U+0000）码点`); }
	if ( codePoint>0x10FFFF ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值超出了 Unicode 的最大范围（U+10FFFF）`); }
	const unicode         = fromCodePoint(codePoint);
	if ( NON_SCALAR.test(unicode) ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值是单个代理对码点（U+D800〜U+DFFF）`); }
	if ( NONCHARACTER.test(unicode) ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值是永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
	if ( CONTROL_CHARACTER.test(unicode) || codePoint===0x0D ) { throw RangeError$1(`HTML 实体“${ambiguous_ampersand}”数值是除水平制表（U+0009）换行（U+000A）换页（U+000C）以外的控制字符（U+0000〜U+001F、U+007F〜U+009F）`); }
	return unicode;
};

const unescape = (string        , fallback          )         =>
	fallback
		? string.replace(ENTITIES_TO_TRY, unescape_or_return)
		: string.replace(ENTITIES, unescape_or_throw);

//const BAD_ENTITY = /&[a-z][a-z\d]*[^a-z\d;]/;

const V_DIR = /^v-(?:slot(?:$|:)|on:|bind:)/;
const V_DOT = /^v-(?:bind|on|slot)\./;
const V__ = /^v-(?:text|html|show|if|else(?:-if)?|for|pre|cloak|once|is)[:.]/;
const V_BO = /^(?:[:@]|v-(?:bind|on)$)/;
const V_ = /^(?:[:@#]|v-|class$|style$)/;

                              
const EMPTY        = undefined$1;

class Attributes extends Null$1         {
	
	get [Symbol.toStringTag] () { return 'SFC.*.Attributes'; }
	
	constructor (literal        , SHORTHAND          = false) {
		super();
		if ( literal ) {
			const pairs = literal.match(ATTRIBUTE) ;
			if ( SHORTHAND && pairs.includes('v-pre') ) { SHORTHAND = false; }
			let _ = 0;
			let index = 0;
			for ( const { length } = pairs; index!==length; ) {
				let name = pairs[index++] ;
				let value                ;
				if ( name.includes('=') ) {
					( { 1: name, 2: value } = ATTRIBUTE_NAME_VALUE(name)  );
					if ( value[0]==='"' || value[0]==='\'' ) { value = value.slice(1, -1); }
					//if ( BAD_ENTITY.test(value) && (
					//	name==='href' ? xName==='a' || xName==='area' :
					//	name==='src' && ( xName==='img' || xName==='iframe' || xName==='source' || xName==='video' || xName==='audio' || xName==='track' )
					//) ) { throw Error(`${xName} 标签中的 ${name} 属性值 ${value} 中存在可疑的实体，无论它是否是 URI 参数，请明确转义`); }
					value = unescape(value);
				}
				if ( name[0]==='_' || name[0]===':' && ( name.length!==1 && name[1]==='_' ) ) { ++_; }
				if ( SHORTHAND ) {///////////////////
					switch ( name[0] ) {
						case ':':
						case '@':
						case '#':
							if ( name.length===1 || name[1]==='.' ) { throw SyntaxError$1(`: @ # 的 arg 不能为空`); }
							break;
						case 'v':
							if ( V_DIR.test(name) ) {
								name = name[2]==='b' ? name.slice(6) :
									name[2]==='o' ? `@${name.slice(5)}` :
										`#${name.length===6 ? 'default' : name.slice(7)}${name[name.length - 1]==='#' ? ' ' : ''}`;
								if ( name.length===1 || name[1]==='.' ) { throw SyntaxError$1(`v-bind: v-on: v-slot: 的 arg 不能为空`); }
							}
							else if ( V_DOT.test(name) ) { throw SyntaxError$1(`无 arg 的 v-bind、v-on 和 v-slot 不能使用修饰符`); }
							else if ( V__.test(name) ) { throw SyntaxError$1(`v-text/v-html/v-show/v-if/v-else-if/v-else/v-for/v-pre/v-cloak/v-once/v-is 不能有 arg 或修饰符`); }
							break;
					}
					if ( name[0]===':' ? name.slice(1) in this && !V_.test(name.slice(1)) : ':' + name in this && !V_.test(name) ) {
						throw SyntaxError$1(`标签中出现了重复的属性“${name[0]===':' ? name.slice(1) : ':' + name}”和“${name}”`);
					}
					if ( V_BO.test(name) && ( !value || !( value = value.trim() ) ) ) { throw SyntaxError$1(`v-bind/v-on 的 value 不得为空`); }
				}///////////////////
				if ( name in this ) { throw SyntaxError$1(`标签中出现了重复的属性“${name}”`); }
				this[name] = value;
			}
			if ( SHORTHAND && 'v-pre' in this ) { throw SyntaxError$1(`v-pre 指令不能有值`); }
			if ( literal[literal.length - 1]==='/' ) { throw SyntaxError$1(`标签结尾处的“/”有歧义，无法达到标注标签为自闭合的目的，而是会作为最后一个无引号属性值的结束字符`); }
			this.#_ = _;
		}
		return this;
	}
	
	#_ = 0;
	
	static _asClass  (            attributes            , keys                                         , v_pre         ) {
		if ( !attributes.#_ ) { return; }
		let k = '';
		let kv = '';
		for ( const name in attributes ) {
			let classItem        ;
			let condition                ;
			if ( name[0]==='_' ) {
				if ( attributes[name]!==EMPTY ) { throw Error$1(`${name}="${attributes[name]}" 的值是无意义的`); }
				classItem = name.slice(1);
			}
			else if ( name[0]===':' && name[1]==='_' ) {
				condition = attributes[name];
				if ( !condition ) { throw Error$1(`${name} 必须要有值`); }
				if ( v_pre ) { throw Error$1(`v-pre 下的 ${name}="${condition}" 是无法转写的`); }
				classItem = name.slice(2);
			}
			else { continue; }
			if ( keys ) {
				if ( !( classItem in keys ) ) { throw Error$1(`${classItem} 没有陈列在 template .keys 中，这种组合是无意义的`); }
				classItem = `__${classItem}__`;
			}
			else { classItem = NameAs__Key__(classItem); }
			condition
				? kv += `+((${condition})?' ${classItem}':'')`
				: k += ' ' + classItem;
			delete attributes[name];
			if ( !--attributes.#_ ) { break; }
		}
		
		if ( kv ) {
			if ( attributes['class'] ) {
				delete attributes['class'];
				kv = StringLiteral(attributes['class'] + k) + kv;
			}
			else { kv = k ? StringLiteral(k.slice(1)) + kv : kv.slice(1); }
			attributes[':class'] = attributes[':class'] ? `[${kv},${attributes[':class']}]` : kv;
		}
		else if ( k ) {
			attributes['class'] = attributes['class'] ? attributes['class'] + k : k.slice(1);
		}
	}
	
	static default = Null$1(this);
	
}
const { _asClass } = Attributes;

const ELEMENT_START      = 1.1;
const ELEMENT_END      = 1.2;
const ELEMENT_SELF_CLOSING      = 1.3;
const TEXT    = 3;
const COMMENT$1    = 8;
const EOF    = 0;

const PLAINTEXT = /^plaintext$/i;
const LISTING = /^listing/i;
const XMP = /^xmp$/i;

const Tag = (html        , position        , foreign          , SHORTHAND          ) => {
	
	let rest        ;
	
	if ( html[position]==='<' ) {
		
		if ( html[position + 1]==='!' ) {
			if ( !html.startsWith('--', position + 2) ) { throw SyntaxError$1(html.startsWith('[CDATA[', position + 2) && !foreign ? `“<![CDATA[”“]]>”语法只能用于 foreign 元素（MathML 或 SVG）内` : `标准的注释语法应由“<!--”而非“ <!”开启`); }
			if ( html[position + 4]==='>' || html.startsWith('->', position + 4) ) { throw SyntaxError$1(`紧随“<!--”注释开始语法之后出现的“>”或“->”会造成注释意外中断`); }
			const end = html.indexOf('-->', position + 4);
			if ( end<0 ) { throw SyntaxError$1(html.includes('--!>', position + 4) ? '应使用“-->”而非“--!>”关闭注释节点' : '存在未关闭的注释节点'); }
			const data         = html.slice(position + 4, end);
			if ( data.includes('--!>') ) { throw SyntaxError$1(`“--!>”会造成注释意外中断`); }
			return { type: COMMENT$1, data, end: end + 3 };
		}
		
		if ( html[position + 1]==='?' ) { throw SyntaxError$1(foreign ? `不知该如何对待“<?”开启的 XML 指令/声明` : `在 HTML 上下文中，“<?”XML 指令/声明只会被作为注释对待，而且其引号属性并不安全`); }
		
		rest = html.slice(position);
		
		if ( IS_TAG.test(rest) ) {
			
			const _ = TAG(rest);
			if ( !_ ) { throw SyntaxError$1('标签格式有误'); }
			const { 0: { length }, 1: endSolidus, 2: xName, 3: attributesLiteral, 4: selfClosingSolidus } = _;
			
			if ( endSolidus ) {
				if ( attributesLiteral ) { throw SyntaxError$1(`结束标签中存在属性`); }
				if ( selfClosingSolidus ) { throw SyntaxError$1(`结束标签中存在自关闭斜杠`); }
				return { type: ELEMENT_END, xName, end: position + length };
			}
			
			const attributes             = new Attributes(attributesLiteral, SHORTHAND);
			
			if ( selfClosingSolidus ) { return { type: ELEMENT_SELF_CLOSING, xName, attributes, end: position + length }; }
			
			if ( VOID_ELEMENTS.test(xName) ) { throw SyntaxError$1(`.vue 文件中如果出现 HTML void 元素（无论大小写；即便已经过时、废弃或是非标准），必须自闭合使用并添加自闭合斜线以避免歧义（因为尚没有明确的扩展约定）`); }
			if ( PLAINTEXT.test(xName) ) { throw SyntaxError$1(`已过时的 ${xName} 标签没有结束方式，除非自闭合，否则${xName==='plaintext' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”）`); }
			if ( LISTING.test(xName) && !rest.startsWith('</', length) ) { throw SyntaxError$1(`已过时的 ${xName} 标签内容处理方式不定，除非自闭合或内容为空，否则${xName==='listing' ? '' : '无论大小写变种均'}不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">”或“<${xName} v-text="..." />”）`); }
			return { type: ELEMENT_START, xName, attributes, end: position + length };
			
		}
		
	}
	
	else { rest = html.slice(position); }
	
	if ( rest ) {
		let end = rest.search(TAG_LIKE);
		end = end<0 ? html.length : position + end;
		return { type: TEXT, raw: html.slice(position, end), end };
	}
	
	return { type: EOF, end: html.length };
	
};

const process$1 = process;

const NaN = 0/0;

const gen = {
	2: {
		Select: {
			const: 'function genSelect (el, value, modifiers) {\n	addHandler(el, \'change\', `\n		{\n			const { multiple, options } = $event.target;\n			if ( $event = multiple ? [] : void null ) {\n				let length = 0;\n				for ( const option of options ) {\n					if ( option.selected ) {\n						$event[length++] = ${modifiers && modifiers.number ? \'_n\' : \'\'}(\'_value\' in option ? option._value : option.value);\n					}\n				}\n			}\n			else {\n				for ( const option of options ) {\n					if ( option.selected ) {\n						$event           = ${modifiers && modifiers.number ? \'_n\' : \'\'}(\'_value\' in option ? option._value : option.value); break;\n					}\n				}\n			}\n		}\n		${genAssignmentCode(value, \'$event\')}`, null, true);\n}\n',
			var: 'function genSelect (el, value, modifiers) {\n	addHandler(el, \'change\', `\n		$event = {\n			v: $event.target.multiple ? [] : void null,\n			i: 0,\n			s: $event.target.options,\n			$: 0,\n		};\n		if ( $event.v ) {\n			while ( $event.i<$event.s.length ) {\n				if ( ( $event.$ = $event.s[$event.i++] ).selected ) {\n					$event.v[$event.v.length] = ${modifiers && modifiers.number ? \'_n\' : \'\'}(\'_value\' in $event.$ ? $event.$._value : $event.$.value);\n				}\n			}\n		}\n		else {\n			while ( $event.i<$event.s.length ) {\n				if ( ( $event.$ = $event.s[$event.i++] ).selected ) {\n					$event.v                  = ${modifiers && modifiers.number ? \'_n\' : \'\'}(\'_value\' in $event.$ ? $event.$._value : $event.$.value); break;\n				}\n			}\n		}\n		${genAssignmentCode(value, \'$event.v\')}`, null, true);\n}\n',
		},
		CheckboxModel: {
			const: 'function genCheckboxModel (el, value, modifiers) {\n	const valueBinding = getBindingAttr(el, \'value\') || \'null\';\n	const trueValueBinding = getBindingAttr(el, \'true-value\') || \'true\';\n	const falseValueBinding = getBindingAttr(el, \'false-value\') || \'false\';\n	addProp(el, \'checked\', `[].constructor.isArray(${value}) ? _i(${value}, ${valueBinding})>-1 : ${trueValueBinding===\'true\' ? `( ${value} )` : `_q(${value}, ${trueValueBinding})`}`);\n	addHandler(el, \'change\', `\n		$event = { _: $event.target.checked, v: ${value} };\n		if ( [].constructor.isArray($event.v) ) {\n			$event._\n				? _i($event.v, $event._ = ${modifiers && modifiers.number ? \'_n\' : \'\'}(${valueBinding}))<0\n					? $event.v = [ ...$event.v, $event._ ]\n					: $event = 0\n				: ( $event._ = _i($event.v, ${modifiers && modifiers.number ? \'_n\' : \'\'}(${valueBinding})) )<0\n					? $event = 0\n					: --( $event.v = [ ...$event.v ] ).copyWithin($event._, $event._ + 1).length;\n		}\n		else { $event.v = $event.checked ? ( ${trueValueBinding} ) : ( ${falseValueBinding} ); }\n		$event && ${genAssignmentCode(value, \'$event.v\')}`, null, true);\n}\n',
			var: 'function genCheckboxModel (el, value, modifiers) {\n	const valueBinding = getBindingAttr(el, \'value\') || \'null\';\n	const trueValueBinding = getBindingAttr(el, \'true-value\') || \'true\';\n	const falseValueBinding = getBindingAttr(el, \'false-value\') || \'false\';\n	addProp(el, \'checked\', `[].constructor.isArray(${value}) ? _i(${value}, ${valueBinding})>-1 : ${trueValueBinding===\'true\' ? `( ${value} )` : `_q(${value}, ${trueValueBinding})`}`);\n	addHandler(el, \'change\', `\n		$event = { _: $event.target.checked, v: ${value}, l: 0 };\n		if ( [].constructor.isArray($event.v) ) {\n			if ( $event._ ) {\n				_i($event.v, $event._ = ${modifiers && modifiers.number ? \'_n\' : \'\'}(${valueBinding}))<0\n					? ( $event.v = $event.v.slice(), $event.v[$event.v.length] = $event._, $event.v )\n					: $event = 0;\n			}\n			else {\n				if ( ( $event._ = _i($event.v, ${modifiers && modifiers.number ? \'_n\' : \'\'}(${valueBinding})) )<0 ) { $event = 0; }\n				else {\n					$event.v = $event.v.slice();\n					$event.l = $event.v.length - 1;\n					while ( $event._<$event.l ) { $event.v[$event._] = $event.v[++$event._]; }\n					$event.v.length = $event.l;\n				}\n			}\n		}\n		else { $event.v = $event.checked ? ( ${trueValueBinding} ) : ( ${falseValueBinding} ); }\n		$event && ${genAssignmentCode(value, \'$event.v\')}`, null, true);\n}\n',
		},
	},
	3: { },
};

const forAliasRE = /\s(?:in|of)\s/s;
const emptySlotScopeToken = '_empty_';
const SLOT_DIRECTIVE = /^v-(?:once|for|if|else(?:-if)?|bind)$/;
const BAD_SLOT_NAME = /^[$_]/;// Vue2: $hasNormal $key $stable _normalized __proto__ // Vue3: $stable _*
const BAD_V_SLOT_NAME = /^#[$_]/;// /^(?:#|v-slot:)[$_]/;
const BAD_SCOPE = '__proto__';
const BAD_KEY = '__proto__';
const BAD_REF = '__proto__';
const BAD_INS = /\r(?!\n)|[\u2028\u2029]/;
const NS3 = /:(?:(?![A-Z_a-z])|.*?:)/s;
const NON = `\\xA0-\\uFFFF`;
const NON_ASCII_SIMPLE_PATH = newRegExp$2`
	^\s*
		(?:
			[A-Za-z_$]
			[\w$]*
		)?
		[${NON}]
		[\w$${NON}]*
	\s*$
`;
const STYLE_BY_COMPONENT_IS   
	                                                                                                                             
	                                                                                                                 
	                                                                      
         = null;

const { parse: parse$1, acornInjectPlugins, rollup, minify: minify$1 }                                  = require('@ltd/j-es-plus');
const { simple }                              = require('acorn-walk');
const findGlobals                                      = require('@ltd/acorn-globals');
const transpileModule                             = require('@ltd/j-ts');

const { 3: compile3, 2: compile2 }   
	                                                                                                    
	                                                                                                        
  = ( () => {
	
	const { createRequire }                          = require('module');
	const { readFileSync }                      = require('fs');
	const { compileFunction }                      = require('vm');
	const { dirname }                        = require('path');
	
	const Const3dom = Replacer(
		[ `|| node.tag === 'style'` ],
		[ `makeMap('style,iframe,script,noscript', true)`, `makeMap('style,script', true)` ],
		[ /compilerCore\.isBuiltInType\(tag, ([^)]+)\)/g, (match        , p1        ) => `tag===${p1.replace(/\B[A-Z]/g, W => `-${W.toLowerCase()}`).toLowerCase()}`, 2 ],
	);
	const Const3core = Replacer(
		[ /shared\.isGloballyWhitelisted\([^)]*\)/g, `false`, 2 ],
		[ /id\.name === '(?:require|arguments)'/g, `false`, 2 ],
		[ /isBuiltInType\(tag, ([^)]+)\)/g, (match        , p1        ) => `tag===${p1.replace(/\B[A-Z]/g, W => `-${W.toLowerCase()}`).toLowerCase()}`, 4 ],
		[ /isComponentTag\(tag\)(?! {)/g, `tag==='component'`, 3 ],
		[ /`undefined`/g, `void 0`, 2 ],
		[ /(?<=] )\|\|(?= \(`)/, `??` ],
		[ `with (_ctx) ` ],
	);
	const Let3core = Replacer(
		[ /push\(`const /g, `push\(\`let `, NaN ],
	);
	
	const Var2 = Replacer(
		[ /var qnameCapture = "\(.*?\)";/, `var qnameCapture = "([a-zA-Z][^\\\\x00\\\\t\\\\n\\\\f\\\\r />]*)";` ],
		[ `+ (prop.name)`, `+ (prop.name).replace(/\\\\/g, '\\\\\\\\')` ],
		[ /(?<! in ){}(?=[);,])(?!\)\.)/g, `Object.create(null)`, 23 ],
		[ `el.attrsMap.hasOwnProperty('v-for')`, `hasOwn(el.attrsMap, 'v-for')` ],
		[ `el.tag === 'style' ||` ],
		[ /^var simplePathRE = \/.+\/;$/m, (match        ) => match.replace(/(?<=\$)/g, NON) ],
		[ RegExp$1(`function gen(${Keys(gen[2]).join('|')}) \\((.*?)\\n}\\n`, 'gs'), (func        , name        ) => gen[2][name                       ].var, 2 ],
		[ /undefined(?='\) \+|'\r?\n|")|(?<=')\$\$v(?=')/g, origin => ( { undefined: 'void 0', $$v: '$event' }[origin                       ] ), 4 ],///
	);
	const Const2 = Replacer(
		[ RegExp$1(`function gen(${Keys(gen[2]).join('|')}) \\((.*?)\\n}\\n`, 'gs'), (func        , name        ) => gen[2][name                       ].const, 2 ],
		[ /function\((|\$event|" \+ alias \+ iterator1 \+ iterator2 \+ "|" \+ slotScope \+ ")\){/g, (match        , p1        )         => `(${p1})=>{`, 7 ],///
	);
	const Let2 = Replacer(
		[ /const /g, `let `, NaN ],
	);
	
	const _prod         = process$1.env.NODE_ENV==='production' ? '.prod' : '';
	
	const filename3dom         = require.resolve(`@vue/compiler-dom/dist/compiler-dom.cjs${_prod}.js`);
	const filename3core         = createRequire(filename3dom).resolve(`@vue/compiler-core/dist/compiler-core.cjs${_prod}.js`);
	let content3core         = readFileSync(filename3core, 'utf8');
	let content3dom         = readFileSync(filename3dom, 'utf8');
	const Compile3 = (content_dom        , content_core        ) => {
		return Exports                                    (content_dom, filename3dom, Null({
			'@vue/compiler-core': Exports                                     (content_core, filename3core),
		})).compile;
	};
	
	const filename2         = require.resolve('vue-template-compiler/build.js');
	let content2         = readFileSync(filename2, 'utf8');
	const Compile2 = (content        ) => Exports                                        (content, filename2).compile;
	
	return {
		3: {
			var ()        {
				throw Error$1(`Vue 3 无法运行在 ES 5 中，请使用 const 或 let 模式`);
			},
			const: Compile3(
				content3dom = Const3dom(content3dom),
				content3core = Const3core(content3core),
			),
			let: Compile3(
				content3dom,
				Let3core(content3core),
			),
		},
		2: {
			var: Compile2(
				content2 = Var2(content2),
			),
			const: Compile2(
				content2 = Const2(content2),
			),
			let: Compile2(
				Let2(content2),
			),
		},
	};
	
	function Replacer (...replacers        
		                                                                         
		                                                                                       
	 ) {
		return function replacer (            content        ) {
			for ( let [ search, replacer = '', count = 1 ] of replacers ) {
				if ( typeof search==='object' ) {
					if ( search.global ) {
						if ( count===1 ) { throw Error$1(`jVue 内部错误`); }
					}
					else {
						if ( count!==1 ) { throw Error$1(`jVue 内部错误`); }
						search = RegExp$1(search, 'g' + search.flags);
					}
				}
				else {
					if ( count!==1 ) { throw Error$1(`jVue 内部错误`); }
					search = RegExp$1(search.replace(/[$^*()+[{|\\.?]/g, (match        ) => '\\' + match), 'g');
				}
				if ( typeof replacer==='string' ) {
					if ( replacer.includes('$') ) { throw Error$1(`jVue 内部错误`); }
					content = content.replace(search, () => {
						--count;
						return replacer          ;
					});
				}
				else {
					content = content.replace(search, (...args          ) => {
						--count;
						return ( replacer                                  )(...args);
					});
				}
				if ( count ) { throw Error$1(`jVue 内部版本依赖错误：${typeof search==='string' ? '`' + search + '`' : search} 剩下了 ${count} 处`); }
			}
			return content;
		};
	}
	
	function Exports    (content        , filename        , cache            ) {
		const module_require = createRequire(filename);
		const module = Null({ exports: {}      });
		compileFunction(
			content,
			[ 'exports', 'require', 'module', '__filename', '__dirname' ],
			{ filename }
		).call(module.exports, module.exports, cache ? (id        ) => cache[id] ?? module_require(id) : module_require, module, filename, dirname(filename));
		return module.exports;
	}
	
} )();

class Block                                    {
	
	          constructor (blockName           , attributes            , emitProperties         , inner                    , END_TAG               ) {
		this.blockName = blockName;
		this.attributes = attributes;
		if ( inner===undefined$1 ) {
			if ( emitProperties ) {
				if ( attributes.src===EMPTY ) { throw SyntaxError$1(`自闭合功能块元素必须存在 src 属性值`); }
				this.src = attributes.src;
				if ( 'lang' in attributes ) { throw SyntaxError$1(`自闭合功能块元素不支持 lang 属性`); }
			}
		}
		else {
			this.inner = inner;
			if ( emitProperties ) {
				if ( 'src' in attributes ) { throw SyntaxError$1(`开放功能块元素不能存在 src 属性`); }
				if ( 'lang' in attributes ) {
					if ( !attributes.lang ) { throw SyntaxError$1(`开放功能块元素的 lang 属性如果设置，值不能为空`); }
					this.lang = attributes.lang;
				}
			}
			if ( END_TAG && END_TAG.test(inner) ) { throw SyntaxError$1(`“${blockName}”块内包含疑似结束标签的内容（注意 .vue 文件需要确保单行/多行解析模式与传统 HTML 流式解析的结果一致）`); }
		}
		return this;
	}
	
	         blockName           ;
	         attributes            ;
	inner         ;
	         src         ;
	         lang         ;
	
}
freeze(freeze(Block).prototype);

const Private = (
	/*! j-globals: private (internal) */
	/*#__PURE__*/function (WeakMap) {
		function createNULL () { return create(NULL); }
		var GET = createNULL();
		GET.value = WeakMap.prototype.get;
		var SET = createNULL();
		SET.value = WeakMap.prototype.set;
		return function Private (PRIVATE) {
			var _This = typeof PRIVATE==='function'
				? 'prototype' in PRIVATE
					? function (THIS) { return new PRIVATE(THIS); }
					: PRIVATE
				: PRIVATE===undefined
					? createNULL
					:PRIVATE===null ? createNULL : function () { return create(PRIVATE); };
			var weak = /*#__PURE__*/defineProperty(/*#__PURE__*/defineProperty(/*#__PURE__*/new WeakMap, 'get', GET), 'set', SET);
			function _ (THIS) { return /*#__PURE__*/weak.get(THIS); }
			_.new = function (THIS) {
				var _THIS = _This(THIS);
				weak.set(THIS, _THIS);
				return _THIS;
			};
			return _;
		};
	}(WeakMap)
	/*¡ j-globals: private (internal) */
);

const _ = Private()                    ;

const SCRIPT_END_TAG = newRegExp$2.i`</script${TAG_EMIT_CHAR}`;

/* TODO:
<https://mimesniff.spec.whatwg.org/#javascript-mime-type>
A JavaScript MIME type is any MIME type whose essence is one of the following:
application/ecmascript
application/javascript
application/x-ecmascript
application/x-javascript
text/ecmascript
text/javascript
text/javascript1.0
text/javascript1.1
text/javascript1.2
text/javascript1.3
text/javascript1.4
text/javascript1.5
text/jscript
text/livescript
text/x-ecmascript
text/x-javascript
*/
const JS = newRegExp$2.i`^${ASCII_WHITESPACE}*(?:
	JS|JavaScript(?:${ASCII_WHITESPACE}*1\.\d)?|JSX
	|
	(?:ES|ECMAScript|ECMAS?)(?:${ASCII_WHITESPACE}*\d+)?
	|
	ESM
	|
	(?:text|application)\/(?:ECMAScript|JavaScript(?:;${ASCII_WHITESPACE}*version${ASCII_WHITESPACE}*=${ASCII_WHITESPACE}*1\.\d)?)
)${ASCII_WHITESPACE}*$`;
const TS = newRegExp$2.i`^${ASCII_WHITESPACE}*T(?:S|ypeScript)${ASCII_WHITESPACE}*$`;
const TSX = newRegExp$2.i`^${ASCII_WHITESPACE}*TSX${ASCII_WHITESPACE}*$`;

class Script extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.Script'; }
	
	constructor (attributes            , inner                    ) {
		super('script', attributes, true, inner, SCRIPT_END_TAG);
		_.new(this);
		return this;
	}
	
	get innerJS ()         {
		let inner                     = _(this).innerJS;
		if ( inner===undefined$1 ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error$1(`自闭合的 script 功能块元素必须自行加载 src 属性所要求的 inner 值`); }
			const { lang } = this;
			if ( lang && !JS.test(lang) ) {
				if ( TS.test(lang) ) { inner = transpileModule(inner, false); }
				else if ( TSX.test(lang) ) { inner = transpileModule(inner, true); }
				else { throw Error$1(`script 功能块元素如果设置了非 js / jsx / ts / tsx 的 lang 属性值，那么必须自行提供转译后的 innerJS`); }
			}
		}
		return inner;
	}
	set innerJS (value        ) {
		if ( typeof ( value            )!=='string' ) { throw TypeError$1(`innerJS 只能被赋值字符串`); }
		_(this).innerJS = value;
	}
	
}
freeze(freeze(Script).prototype);

const throwSyntaxError = (
	/*! j-globals: throw.SyntaxError (internal) */
	function throwSyntaxError (message) {
		throw SyntaxError(message);
	}
	/*¡ j-globals: throw.SyntaxError (internal) */
);

const isSelector = newRegExp$2.u`^
	${ASCII_WHITESPACE}*(?:
		${AliasName}${ASCII_WHITESPACE}*
		(?:=${ASCII_WHITESPACE}*
			(?:${localNameWithoutDot}|(?=\.))
			(?:\.${className})*
		${ASCII_WHITESPACE}*)?;
	${ASCII_WHITESPACE}*)*
$`.test;

const defaultSelector = (Name        ) => `.${NameAs__Key__(Name)}`;

                                                    

const forStyle = (attributes            ) => {
	if ( '.abbr' in attributes ) {
		const literal = attributes['.abbr'];
		if ( literal===EMPTY ) { return defaultSelector; }
		else {
			if ( !isSelector(literal) ) { throw SyntaxError$1(`style 块的“.abbr”属性语法错误：\n${literal}`); }
			const abbr = create(NULL)            ;
			const pairs = literal.split(';');
			const { length } = pairs;
			let index = 0;
			while ( index!==length ) {
				const tokens = pairs[index++] .match(TOKENS$1);
				if ( tokens ) {
					const componentName         = tokens[0] ;
					abbr[componentName] = tokens.length>1 ? tokens[1]  : defaultSelector(componentName);
				}
			}
			return (componentName        )         => {
				if ( componentName in abbr ) { return abbr[componentName] ; }
				throw Error$1(`style 块中存在被遗漏的伪标签名 ${componentName} 选择器`);
			};
		}
	}
	return;
};

const ATTR = newRegExp$2.u`
	\[ *
	[a-zA-Z][\w-]*(?:\|[a-zA-Z][\w-]*)? *
	(?:
		~?
		= *
		(?:
			[a-zA-Z][\w-]*
		|
			'[^']*'
		|
			"[^"]*"
		) *
	)?
	\]
`;
const sAfterAliasName = newRegExp$2`
	${ASCII_WHITESPACE}+$
`;
const PARTS = newRegExp$2.gu`
	${localOrComponentNameWithoutDot}
	|
	\*
	|
	\.(?:${className})?
	|
	${ATTR}
`;
const PARTIALS = newRegExp$2.gu`
	${AliasName}${ASCII_WHITESPACE}*
	=${ASCII_WHITESPACE}*
		(?:
			${localOrComponentNameWithoutDot}
		|
			\*
		)${ASCII_WHITESPACE}*
		(?:
			(?:
				\.(?:${className})?
			|
				${ATTR}
			)
			${ASCII_WHITESPACE}*
		)*
`;
const TEMPLATE_ABBR = newRegExp$2.u`^
	${ASCII_WHITESPACE}*(?:
		${PARTIALS};
	${ASCII_WHITESPACE}*)*
$`;
const TEMPLATE_ABBR_COLON_ = newRegExp$2.u`^
	${ASCII_WHITESPACE}*(?:
		${AliasName}${ASCII_WHITESPACE}*;
	${ASCII_WHITESPACE}*)*
$`;

                                                                                                                                            

const forTemplate = (attributes            ) => {
	let abbr                     ;
	
	if ( '.abbr' in attributes ) {
		const literal = attributes['.abbr'];
		if ( literal===EMPTY ) { throw SyntaxError$1(`template 功能块的“.abbr”属性必须具有值`); }
		if ( !TEMPLATE_ABBR.test(literal) ) { throw SyntaxError$1(`template 功能块的“.abbr”属性语法错误：\n${literal}`); }
		abbr = create(NULL)           ;
		const pairs = literal.match(PARTIALS);
		if ( pairs ) {
			let index = pairs.length;
			do {
				const part = pairs[--index] ;
				const indexOfEqual = part.indexOf('=');
				const xName         = part.slice(0, indexOfEqual).replace(sAfterAliasName, '');
				if ( xName in abbr ) { throw SyntaxError$1(`template 功能块的“.abbr”属性值中存在重复的条目“${xName}”`); }
				const x_selectors = part.slice(indexOfEqual + 1).match(PARTS) ;
				let tagName                = x_selectors[0] ;
				if ( tagName==='*' ) { tagName = null; }
				let className         = '';
				let attrs                      = null;
				let i = 1;
				while ( i!==x_selectors.length ) {
					const selector = x_selectors[i++] ;
					if ( selector[0]==='.' ) {
						className += selector==='.'
							? ' ' + NameAs__Key__(xName)
							: ' ' + selector.slice(1);
					}
					else {
						const i = selector.indexOf('=');
						let n = selector.slice(1, i).trim();
						if ( n.startsWith('v-') || n==='class' || n==='style' ) { throw SyntaxError$1(`template 功能块的“.abbr”属性值中不能添加“v-”开头的属性或“class”“style”`); }
						n = n.replace('|', ':');
						attrs ?? ( attrs = create(NULL)                 );
						let v                ;
						if ( i>0 ) {
							if ( selector[i - 1]==='~' ) {
								n = n.slice(0, -1).trim();
								if ( n in attrs ) { throw SyntaxError$1(`template 功能块的“.abbr”属性值中出现了重复的属性“${n}”`); }
								n = '$' + n;
							}
							v = selector.slice(i + 1, -1).trim();
							if ( v[0]=='"' || v[0]==='\'' ) { v = v.slice(1, -1); }
						}
						else {
							if ( n in attrs ) { throw SyntaxError$1(`template 功能块的“.abbr”属性值中出现了重复的属性“${n}”`); }
							n = '$' + n;
						}
						if ( n in attrs ) { throw SyntaxError$1(`template 功能块的“.abbr”属性值中出现了重复的属性“${n[0]==='~' ? n.slice(1) : n}”`); }
						attrs[n] = v;
					}
				}
				abbr[xName] = {
					tagName,
					class: className.slice(1),
					attrs,
				};
			}
			while ( index );
		}
	}
	
	for ( const name in attributes ) {
		if ( name.startsWith('.abbr:') ) {
			let tagName                = name.slice(6);
			if ( tagName==='*' ) { tagName = null; }
			else if ( !isLocalOrComponentNameDotable(tagName) ) { throw SyntaxError$1(`template 功能块的“${name}”属性的标签名部分不符合要求`); }
			abbr ?? ( abbr = create(NULL)            );
			const literal = attributes[name];
			if ( literal===EMPTY ) {
				if ( '' in abbr ) { throw SyntaxError$1(`template 功能块的无值“.abbr:***”属性只能有一个`); }
				abbr[''] = { tagName, class: '', attrs: null };
			}
			else {
				if ( !TEMPLATE_ABBR_COLON_.test(literal) ) { throw SyntaxError$1(`template 功能块的“${name}”属性语法错误：\n${literal}`); }
				const pairs = literal.split(';');
				let index = pairs.length;
				while ( index ) {
					const tokens = pairs[--index] .match(TOKENS$1);
					if ( tokens ) {
						const xName         = tokens[0] ;
						if ( xName in abbr ) { throw SyntaxError$1(`template 功能块的“${name}”属性值中存在重复的条目“${xName}”`); }
						abbr[xName] = { tagName, class: NameAs__Key__(xName), attrs: null };
					}
				}
			}
		}
	}
	
	return abbr;
};

const Map$1 = Map;

const preventExtensions = Object.preventExtensions;

const getPrototypeOf = Object.getPrototypeOf;

const push = Array.prototype.push;

const getOwnPropertyDescriptor = (
	/*! j-globals: null.getOwnPropertyDescriptor (internal) */
	function () {
		function __PURE__ (descriptor) {
			var propertyDescriptor = create$1(NULL);
			if ( descriptor.hasOwnProperty('value') ) {
				propertyDescriptor.value = descriptor.value;
				propertyDescriptor.writable = descriptor.writable;
			}
			else {
				propertyDescriptor.get = descriptor.get;
				propertyDescriptor.set = descriptor.set;
			}
			propertyDescriptor.enumerable = descriptor.enumerable;
			propertyDescriptor.configurable = descriptor.configurable;
			return propertyDescriptor;
		}
		return function getOwnPropertyDescriptor (object, key) {
			return /*#__PURE__*/__PURE__(/*#__PURE__*/Object_getOwnPropertyDescriptor(object, key));
		};
	}()
	/*¡ j-globals: null.getOwnPropertyDescriptor (internal) */
);

var ownKeys = typeof Reflect==='object' ? Reflect.ownKeys : Object.getOwnPropertyNames;
const getOwnPropertyDescriptors = (
	/*! j-globals: null.getOwnPropertyDescriptors (internal) */
	function () {
		function __PURE__ (object) {
			var descriptorMap = create$1(NULL);
			for ( var keys = ownKeys(object), length = keys.length, index = 0; index<length; ++index ) {
				var key = keys[index];
				descriptorMap[key] = getOwnPropertyDescriptor(object, key);
			}
			return descriptorMap;
		}
		return function getOwnPropertyDescriptors (object) {
			return /*#__PURE__*/__PURE__(object);
		};
	}()
	/*¡ j-globals: null.getOwnPropertyDescriptors (internal) */
);

/*!@preserve@license
 * 模块名称：j-css
 * 模块功能：CSS 语法相关共享实用程序。从属于“简计划”。
   　　　　　CSS syntax util. Belong to "Plan J".
 * 模块版本：1.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-css/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-css/
 */

const {
	
	charset,
	import: IMPORT,
	namespace,
	media,
	page,
	'font-face': font_face,
	'counter-style': counter_style,
	'*keyframes': keyframes,
	supports,
	
	'*document': document,
	viewport,
	
	'url(': url_,
	'url-prefix(': url_prefix_,
	'domain(': domain_,
	
	has,
	of,
	
	'*animation-name': animation_name,
	
}                                                   = /*#__PURE__*/( () => {
	if ( /k/i.test('\u212A') || /s/i.test('\u017F') ) { throw Error$1(`ks`); }
	return new Proxy$1({}, {
		get: (is, keyword        ) => test.bind(RegExp$1('^' + keyword.replace('(', '\\(').replace('*', '(?:-[a-z][a-z\\d]*-)?') + '$', 'i'))
	});
} )();

/*!@preserve@license
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：8.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var Test                                           = bind
	? /*#__PURE__*/bind.bind(test       )       
	: function (re) {
		return function (string) {
			return test.call(re, string);
		};
	};

var Exec                                           = bind
	? /*#__PURE__*/bind.bind(exec       )       
	: function (re) {
		return function (string) {
			return exec.call(re, string);
		};
	};

var NT$1 = /[\n\t]+/g;
var ESCAPE$1 = /\\./g;
function graveAccentReplacer ($$        ) { return $$==='\\`' ? '`' : $$; }

var includes = ''.includes       
	? function (that        , searchString        ) { return that.includes(searchString); }
	: function (that        , searchString        ) { return that.indexOf(searchString)>-1; };

function RE (               template                      ) {
	var U = this.U;
	var I = this.I;
	var M = this.M;
	var S = this.S;
	var raw = template.raw;
	var source = raw[0] .replace(NT$1, '');
	var index = 1;
	var length = arguments.length;
	while ( index!==length ) {
		var value            
			                       
			                          
			                             
			                            
			                         
		  = arguments[index];
		if ( typeof value==='string' ) { source += value; }
		else {
			var value_source = value.source;
			if ( typeof value_source!=='string' ) { throw TypeError$1('source'); }
			if ( value.unicode===U ) { throw SyntaxError$1('unicode'); }
			if ( value.ignoreCase===I ) { throw SyntaxError$1('ignoreCase'); }
			if ( value.multiline===M && ( includes(value_source, '^') || includes(value_source, '$') ) ) { throw SyntaxError$1('multiline'); }
			if ( value.dotAll===S && includes(value_source, '.') ) { throw SyntaxError$1('dotAll'); }
			source += value_source;
		}
		source += raw[index++] .replace(NT$1, '');
	}
	var re         = RegExp$1(U ? source = source.replace(ESCAPE$1, graveAccentReplacer) : source, this.flags);
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	test.source = exec.source = source;
	test.unicode = exec.unicode = U;
	test.ignoreCase = exec.ignoreCase = I;
	test.multiline = exec.multiline = includes(source, '^') || includes(source, '$') ? M : null;
	test.dotAll = exec.dotAll = includes(source, '.') ? S : null;
	return re;
}

var RE_bind = bind && /*#__PURE__*/bind.bind(RE       );

function Context (flags        )          {
	return {
		U: !includes(flags, 'u'),
		I: !includes(flags, 'i'),
		M: !includes(flags, 'm'),
		S: !includes(flags, 's'),
		flags: flags
	};
}

var CONTEXT          = /*#__PURE__*/Context('');

var newRegExp = Proxy$1
	? /*#__PURE__*/new Proxy$1(RE, {
		apply: function (RE, thisArg, args                                   ) { return apply$1(RE, CONTEXT, args); }
		,
		get: function (RE, flags        ) { return RE_bind(Context(flags)); }
		,
		defineProperty: function () { return false; }
		,
		preventExtensions: function () { return false; }
	})
	: /*#__PURE__*/function () {
		RE.apply = RE.apply;
		var newRegExp = function () { return RE.apply(CONTEXT, arguments       ); }       ;
		for ( var flags = 63; flags--; ) {
			( function (context) {
				newRegExp[context.flags] = function () { return RE.apply(context, arguments       ); };
			} )(Context(
				( flags & 32 ? '' : 'g' ) +
				( flags & 16 ? '' : 'i' ) +
				( flags &  8 ? '' : 'm' ) +
				( flags &  4 ? '' : 's' ) +
				( flags &  2 ? '' : 'u' ) +
				( flags &  1 ? '' : 'y' )
			));
		}
		return freeze ? freeze(newRegExp) : newRegExp;
	}();

/*¡ j-regexp */

const protect = (constructor                                            , pop          )       => /*#__PURE__*/( ()       => {
	const { prototype } = constructor;
	pop && defineProperties(prototype, { ...getOwnPropertyDescriptors(getPrototypeOf(prototype)), ...getOwnPropertyDescriptors(prototype) });
	freeze(prototype);
	constructor.default = undefined$1;
	preventExtensions(constructor);
} )();

const notKeyframes = /*#__PURE__*/test.bind(/^(?:(?:default|in(?:herit|itial)|none|revert|unset)?$|['"])|,/i);

/// -- var()
/// @counter-style list-style -type
/// @font-face font -family

const nonASCII = /\x80-\uFFFF/i;
const hex_digit = /[0-9A-F]/i;
const escape = /*#__PURE__*/( () => newRegExp.i `
	\\
	(?:
		${hex_digit}{1,6}
		(?:[\t\n\f ]|\r\n?)?
		|
		[^\n\f\r]
	)
` )();
const ws = /\t\n\f\r /i;
const ident_token_start = /*#__PURE__*/( () => newRegExp.i `
	(?:
		-
		(?:
			-
		|
			[a-z_${nonASCII}]
		|
			${escape}
		)
	|
		[a-z_${nonASCII}]
	|
		${escape}
	)
` )();
const ident_token = /*#__PURE__*/( () => newRegExp.i `
	${ident_token_start}
	(?:
		[-\w${nonASCII}]
	|
		${escape}
	)*
` )();
const isCompoundSelector = /*#__PURE__*/( () => newRegExp.i `
	^(?!$)
	(?:${ident_token}|\*)?
	(?:\|(?:${ident_token}|\*))?
	(?:\.${ident_token})*
	$
`.test )();
const SIMPLE_SELECTORS = /*#__PURE__*/( () => newRegExp.gi `
	(?:[.|]?${ident_token}|\*)
` )();
const hash_token = /*#__PURE__*/( () => newRegExp.i `
	#
	(?:
		[-\w${nonASCII}]
	|
		${escape}
	)*
` )();
const isIdSelector = /*#__PURE__*/( () => newRegExp.i `
	^${hash_token}$
`.test )();
const string_token = /*#__PURE__*/( () => newRegExp.is `
	"
	(?:\\(?:\r\n|.)|[^\\"\n\f\r])*
	"?
|
	'
	(?:\\(?:\r\n|.)|[^\\'\n\f\r])*
	'?
` )();
const url_token = /*#__PURE__*/( () => newRegExp.is `
	url
	(?:
		\(
		[${ws}]*
		(?![${ws}"'])
		(?:
			${escape}
		|
			[^)]
		)*
		\)?
	|
		-prefix\([${ws}]*\)
	)
|
	domain\([${ws}]*	[a-z\d\-.:]*	[${ws}]*\)
` )();
const ESCAPE = /\\(?:([\dA-F]{1,6})(?:[ \t\n\f]|\r\n?)?|([\n\f]|\r\n?)|(.))/gis;
const evaluate = (literal        ) => literal.replace(ESCAPE, (match        , hex         , char         ) => hex ? fromCodePoint(parseInt$1(hex, 16)) : char ?? '');
const _ws_ = /*#__PURE__*/( () => newRegExp.gi `
	^
		${ws}+
	|
		${ws}+
	$
` )();
const number_token = /*#__PURE__*/( () => newRegExp.i `
	[-+]?
	(?:\d+(?:\.\d+)?|\.\d+)
	(?:e[+-]?\d+)?
` )();
const CDO_token = '<!--';
const CDC_token = '-->';

const TOKENS = /*#__PURE__*/( () => newRegExp.gis `
	(?:
		[${ws}]+
	|
		/\*.*?\*/
	)+
|
	/\*.*
|
	${url_token}
	|
	${ident_token}\(?
	|
	@${ident_token}
|
	${number_token.source}(?:${ident_token}|%)?
|
	${hash_token}
|
	${string_token}
|
	${CDO_token}
|
	${CDC_token}
|
	.
` )();

const IS_BAD_URL = /*#__PURE__*/( () => newRegExp.i `
	^
	url\(
	(?!
			[${ws}]*
			(?:${escape}|[^${ws}"'()\\])*
			[${ws}]*
		\)
		$
	)
`.test )();
const IS_NUMBER = /*#__PURE__*/test.bind(/[\d.]/);
const COMMENT = /\/\*.*?\*\//gs;
const IS_IDENT = /*#__PURE__*/( () => newRegExp.i `
	^
	${ident_token}
	$
`.test )();
const IS_FUNCTION = /*#__PURE__*/( () => newRegExp.i `
	^
	${ident_token}\(
	$
`.test )();

const comment = 'c';
const whitespace = 'w';
const ident = 'i';
const atKeyword = 'a';
const function_ = 'f';
const hash = 'h';
const string = 's';
const number = 'n';
const dimension = 'd';
const percentage = 'p';
const url = 'u';

const IdentLike = (literal        ) =>
	IS_IDENT(literal) ? ident :
		IS_FUNCTION(literal) ?
			url_prefix_ (literal) ? throwSyntaxError(`function-token "url-prefix" 不在标准中，而它此刻的内容又存在歧义`) :
				domain_ (literal) ? throwSyntaxError(`function-token "domain" 不在标准中，而它此刻的内容又存在歧义`) :
					function_ :
			IS_BAD_URL(literal) ? throwSyntaxError(`bad-url-token`) :
				url;

const Numeric = (literal        ) => {
	const rest = literal.replace(number_token, '');
	return rest ? rest==='%' ? percentage : dimension : number;
};

                                                                                           
	                                                                                     
	                                                                                    
const Type = (literal        )       => {
	switch ( literal[0] ) {
		case '\t':
		case '\n':
		case '\f':
		case '\r':
		case ' ':
			return whitespace;
		case '!':
			return literal       ;
		case '"':
			return literal[literal.length - 1]==='"' && literal.length!==1 ? literal.includes('\t') ? throwSyntaxError(`CSS 2 不允许字符串中存在 TAB`) : string : throwSyntaxError(`bad-string-token`);
		case '#':
			return hash;
		case '$':
		case '%':
		case '&':
			return literal                   ;
		case '\'':
			return literal[literal.length - 1]==='\'' && literal.length!==1 ? literal.includes('\t') ? throwSyntaxError(`CSS 2 不允许字符串中存在 TAB`) : string : throwSyntaxError(`bad-string-token`);
		case '(':
		case ')':
		case '*':
			return literal                   ;
		case '+':
			return literal==='+' ? literal : Numeric(literal);
		case ',':
			return literal       ;
		case '-':
			if ( literal==='-' ) { return literal; }
			if ( IS_NUMBER(literal[1] ) ) { return Numeric(literal); }
			if ( literal==='-->' ) { return throwSyntaxError(`CDC-token`); }
			break;
		case '.':
			return literal==='.' ? literal : Numeric(literal);
		case '/':
			if ( literal==='/' ) { return literal; }
			literal = literal.replace(COMMENT, '');
			return literal
				? literal[0]==='/'
					? throwSyntaxError(`bad-comment-token`)
					: whitespace
				: comment;
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			return Numeric(literal);
		case ':':
		case ';':
			return literal             ;
		case '<':
			return literal==='<' ? literal : throwSyntaxError(`CDO-token`);
		case '=':
		case '>':
		case '?':
			return literal                   ;
		case '@':
			return literal==='@' ? literal : atKeyword;
		case '[':
			return literal       ;
		case '\\':
			if ( literal==='\\' ) { throw SyntaxError$1(`bad escape`); }
			break;
		case ']':
		case '^':
		case '`':
		case '{':
		case '|':
		case '}':
		case '~':
			return literal                                           ;
	}
	return IdentLike(literal);
};

const LITERALS                    = [];
let literals                    = LITERALS;
let literal         = '';
let types                           = ''       ;
let type       = ''       ;
let length         = 0;
let index$1         = 0;
let currentLayer                    = null;
const collection_type                 = [];
const collection_class                  = [];
const collection_attribute                      = [];
const collection_id               = [];
const collection_url        = [];
const collection_keyframes                  = [];
const collection_animation         = [];
let collection_selector                 = [];

class KindMap                                                           extends Map$1                               {
	static default = protect(this, true);
	constructor () { return super()                   ; }
	fetch                                                           (                     layers           , key                   , addon         ) {
		const { length } = layers;
		let index = 0;
		while ( index!==length ) {
			const layer = layers[index++]     ;
			const literal = layer[key           ]          ;
			let array                                         = this.get(literal)                                    ;
			array ?? this.set(literal, array = []                        );
			addon && ( array = array[addon] ?? ( array[addon] = [] ) );
			array[array.length] = layer;
		}
		return this;
	}
	merge                                         (                  layers     , literal        ) {
		const array = this.get(literal);
		array
			? apply$1(push, array, layers)
			: this.set(literal, layers);
	}
}

class Refs {
	type = collection_type.length
		? new KindMap              ().fetch(collection_type, 'literal')
		: null;
	class = collection_class.length
		? new KindMap               ().fetch(collection_class, 'itemLiteral')
		: null;
	attribute = collection_attribute.length
		? new KindMap                   ().fetch(collection_attribute, 'nameLiteral')
		: null;
	id = collection_id.length
		? new KindMap            ().fetch(collection_id, 'valueLiteral')
		: null;
	url = collection_url.length
		? new KindMap     ().fetch(collection_url, 'valueLiteral')
		: null;
	animationKeyframes                                      = collection_keyframes.length || collection_animation.length
		? new KindMap                     ().fetch(collection_keyframes, '_nameLiteral', 'rule').fetch(collection_animation, '_literal')
		: null;
	selector                        = collection_selector.length
		? collection_selector
		: null;
	constructor () {
		if ( collection_selector.length ) { collection_selector = []; }
		return this;
	}
}

const IS_NULL_SURROGATE = /*#__PURE__*/test.bind(/[\x00\uD800-\uDFFF]/u);
const IS_NON_PRINTABLE = /*#__PURE__*/test.bind(/[\x00-\x08\x0B\x0E-\x1F\x7F]/);
const NOT_CHANGES = /\\.?|[^\\\x80-\x9F]+/gs;
const check = (css        ) => {
	if ( css[0]==='\uFEFF' ) { throw SyntaxError$1(`CSS 中 UTF BOM（U+FEFF）算作普通字符，处于起始位置时很可能是误用`); }
	if ( IS_NULL_SURROGATE(css) ) { throw SyntaxError$1(`CSS 中 NUL（U+00）或残破的代理对码点（U+D800〜U+DFFF）字面量会被替换为 U+FFFD，请避免使用`); }
	if ( IS_NON_PRINTABLE(css) ) { throw SyntaxError$1(`CSS 中不能出现除 TAB、LF、FF、CR 以外的控制字符字面量`); }
	if ( css.replace(NOT_CHANGES, '') ) { throw SyntaxError$1(`U+80～U+9F 字面量在 CSS 2 和 3 之间表现不同，请避免使用`); }
};

const parent = Symbol('parent');
const consume = Symbol('consume');
const stay = () => { --index$1; };
const parse = (sheet       , source        ) => {
	literals = { length } = source.match(TOKENS) ;
	index$1 = 0;
	//@ts-ignore
	while ( index$1!==length ) { types += Type(literals[index$1++]); }
	currentLayer = sheet;
	index$1 = 0;
	while ( index$1!==length ) {
		type = types[index$1] ;
		literal = literals[index$1++] ;
		currentLayer = currentLayer[consume]() ?? throwSyntaxError(`CSS 中出现了 ${currentLayer[toStringTag       ]} 上下文不允许的内容“${literal}”：\n${( literals             ).slice(0, index$1 - 1).join('')}`);
	}
	currentLayer===sheet || currentLayer[parent]===sheet && !( currentLayer                  ) .block || throwSyntaxError(`CSS 终止处尚有未完成的结构`);
	return (
		collection_type.length ||
		collection_class.length ||
		collection_attribute.length ||
		collection_id.length ||
		collection_url.length ||
		collection_keyframes.length ||
		collection_animation.length ||
		collection_selector.length
			? new Refs : null );
};

const clear = ()       => {
	collection_type.length =
	collection_class.length =
	collection_attribute.length =
	collection_id.length =
	collection_url.length =
	collection_keyframes.length =
	collection_animation.length =
	collection_selector.length =
		0;
	literals = LITERALS;
	currentLayer = null;
	literal = types = ''       ;
};

let indent = '\t';
let newline = '\n';
let newlineSelector = true;
let newlineProperty = true;

const OPTIONS$1          = Null({
	indent,
	newline,
	newlineSelector,
	newlineProperty,
});
                                            
const Options = (options          = OPTIONS$1) => {
	( {
		indent = '\t',
		newline = '\n',
		newlineSelector = true,
		newlineProperty = true,
	} = options );
};

function layerCallback (                  layer            ) { layer[parent] = this; }

class Layer                                           extends ( Array$1                      
	                       
	               
	                                                      
	                                                                       
	                                                                               
    )        {
	
	[parent]                    = currentLayer;
	
	                                                                                                                          
	
	          constructor () { return super()                   ; }
	
	                                                               
	
	                                                         
	
	                                                                             
	
	get lastIndex () { return this.length - 1; }
	get lastItem () { return this[this.lastIndex]; }
	set newItem (value       ) { this[this.length] = value; }
	
	replaceWith (                                                        layers                                                        ) {
		const parent$1 = this[parent] ;
		if ( layers.length===1 ) { ( parent$1[parent$1.indexOf(this)] = layers[0]  )[parent] = parent$1; }
		else {
			layers.forEach(layerCallback, parent$1);
			parent$1.splice(parent$1.indexOf(this), 1, ...layers);
		}
	}
	
	static default       = protect(Layer, true);
	
}

class Url extends Layer       {
	
	         nameLiteral               ;
	valueLiteral         = '';
	
	constructor (nameLiteral               ) {
		super();
		currentLayer && ( collection_url[collection_url.length] = this );
		this.nameLiteral = nameLiteral;
		return this;
	}
	
	[consume] (         ) {
		switch ( type ) {
			case string:
				if ( this.valueLiteral ) { break; }
				this.valueLiteral = literal;
				return this;
			case ')':
				return this[parent];
			case whitespace:
			case comment:
				return this;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (         ) { return this.nameLiteral ? `${this.nameLiteral}(${this.valueLiteral})` : this.valueLiteral; }
	
	* [Symbol.iterator] (         ) { throw TypeError$1(`beautify url`); }
	
	static default = protect(this);
	
}
const newUrl =                        (parent   , key          = 'newItem')    => {
	const index = literal.indexOf('(');
	const url = parent[key             ] = new Url(literal.slice(0, index));
	url.valueLiteral = literal.slice(index + 1, -1).replace(_ws_, '');
	return parent;
};

class IdSelector extends Layer       {
	
	valueLiteral        ;
	
	constructor (valueLiteral        ) {
		//if ( !valueLiteral ) { throw SyntaxError(`ID Selector 不能为 #`); }
		super();
		currentLayer && ( collection_id[collection_id.length] = this );
		this.valueLiteral = valueLiteral;
		return this;
	}
	
	[consume] (                )        { throw TypeError$1(`idSelector[consume]`); }
	
	[Symbol.toPrimitive] (                ) { return `#${this.valueLiteral}`; }
	
	* [Symbol.iterator] (                ) { throw TypeError$1(`beautify idSelector`); }
	
	static default = protect(this);
	
}

const STATE_BEFORE_NAME = 1         ;
const STATE_DURING_NAME = 2         ;
const STATE_NAME_SPACE = 3         ;
const STATE_PREFIX = 4         ;
const STATE_AFTER_NAME = 5         ;
const STATE_DURING_OP = 6         ;
const STATE_AFTER_OP = 7         ;
const STATE_VALUE = 8         ;
const STATE_CASE = 9         ;

class AttributeSelector extends Layer         {
	
	get [Symbol.toStringTag] () { return 'AttributeSelector'; }
	
	constructor () { return currentLayer ? collection_attribute[collection_attribute.length] = super()                    : super()                   ; }
	
	nameLiteral         = '';
	        _state                                        = STATE_BEFORE_NAME;/// ,
	
	[consume] (                       ) {
		switch ( this._state ) {
			case STATE_BEFORE_NAME:
				switch ( type ) {
					case ident:
						this._state = STATE_DURING_NAME;
						this.nameLiteral = literal;
						return this;
					case '*':
						this._state = STATE_NAME_SPACE;
						this.nameLiteral = literal;
						return this;
					case '|':
						this._state = STATE_PREFIX;
						this.nameLiteral = literal;
						return this;
					case whitespace:
					case comment:
						return this;
				}
				break;
			case STATE_NAME_SPACE:
				switch ( type ) {
					case '|':
						this._state = STATE_PREFIX;
						this.nameLiteral += literal;
						return this;
					case comment:
						return this;
				}
				break;
			case STATE_PREFIX:
				switch ( type ) {
					case ident:
						this._state = STATE_AFTER_NAME;
						this.nameLiteral += literal;
						return this;
					case comment:
						return this;
				}
				break;
			case STATE_DURING_NAME:
				switch ( type ) {
					case ']':
						this._state = 0;
						return this[parent];
					case '|':
						if ( index$1!==length && types[index$1]==='=' ) {
							this._state = STATE_DURING_OP;
							this.newItem = literal;
						}
						else {
							this._state = STATE_PREFIX;
							this.nameLiteral += literal;
						}
						return this;
					case '~':
					case '^':
					case '$':
					case '*':
						this._state = STATE_DURING_OP;
						this.newItem = literal;
						return this;
					case '=':
						this._state = STATE_AFTER_OP;
						this.newItem = literal;
						return this;
					case whitespace:
						this._state = STATE_AFTER_NAME;
						return this;
					case comment:
						return this;
				}
				break;
			case STATE_AFTER_NAME:
				switch ( type ) {
					case ']':
						this._state = 0;
						return this[parent];
					case '|':
					case '~':
					case '^':
					case '$':
					case '*':
						this._state = STATE_DURING_OP;
						this.newItem = literal;
						return this;
					case '=':
						this._state = STATE_AFTER_OP;
						this.newItem = literal;
						return this;
					case whitespace:
					case comment:
						return this;
				}
				break;
			case STATE_DURING_OP:
				switch ( type ) {
					case '=':
						this._state = STATE_AFTER_OP;
						this.newItem = literal;
						return this;
				}
				break;
			case STATE_AFTER_OP:
				switch ( type ) {
					case string:
					case ident:
						this._state = STATE_VALUE;
						this.newItem = literal;
						return this;
					case whitespace:
					case comment:
						return this;
				}
				break;
			case STATE_VALUE:
				switch ( type ) {
					case ']':
						this._state = 0;
						return this[parent];
					case ident:
						this._state = STATE_CASE;
						this.newItem = ' ';
						this.newItem = literal;
						return this;
					case whitespace:
					case comment:
						return this;
				}
				break;
			case STATE_CASE:
				switch ( type ) {
					case ']':
						this._state = 0;
						return this[parent];
					case whitespace:
					case comment:
						return this;
				}
				break;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                       ) {
		return `[${this.nameLiteral}${this.join('')}]`;
	}
	
	* [Symbol.iterator] (                       ) { throw TypeError$1(`beautify attributeSelector`); }
	
	                                                
	
	static default = protect(this);
	
}

class Parenthesis extends Layer                                                                                             {
	
	get [Symbol.toStringTag] () { return 'Parenthesis'; }
	
	                 nameLiteral        ;
	
	constructor (nameLiteral         ) {
		super();
		this.nameLiteral = nameLiteral || '';
		return this;
	}
	
	[consume] (                 ) {
		switch ( type ) {
			case whitespace:
				this.length && ( this.newItem = ' ' );
				return this;
			case function_:
				return this.newItem = url_ (literal)
					? new Url(literal.slice(0, 3))
					: new Parenthesis(literal.slice(0, -1));
			case '(':
				return this.newItem = new Parenthesis;
			case '[':
				return null;
			case ')':
				const { lastItem } = this;
				( lastItem===' ' || lastItem==='/**/' ) && --this.length;
				if ( !this.length ) { return null; }
				return this[parent];
			case comment:
				this.length && ( this.newItem = '/**/' );
				return this;
			case hash:
			case string:
			case percentage:
			case '!':
			case '$':
			case '-':
			case '/':
			case '?':
			case ident:
			case number:
			case dimension:
			case '*':
			case '+':
			case ',':
			case '.':
			case ':':
			case '>':
			case '|':
			case '~':
				this.newItem = literal;
				return this;
			case url:
				if ( literal[3]==='(' ) { return newUrl(this); }
				return null;
			/*
			case ']':
			case '{':
			case '}':
			case '`':
			case '^':
			case '@':
			case '<':
			case '=':
			case ';':
			case '&':
			case '%':
			case TOKEN.atKeyword:
			*/
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                 ) {
		return `${this.nameLiteral}(${this.join('')})`;
	}
	
	* [Symbol.iterator] (                 ) { throw TypeError$1(`beautify parenthesis`); }
	
	static default = protect(this);
	
}

const needCollect = /*#__PURE__*/test.bind(/^(?:(?:-[a-z][a-z\d]*-)?animation(?:-name)?)$/i);

class Name extends Layer       {
	
	_literal         = '';
	get literal () { return this._literal; }
	set literal (value) {
		if ( notKeyframes(value) ) { throw SyntaxError$1(`“${value}”无法作为 animation-name`); }
		this._literal = value;
	}
	
	constructor (literal        ) {
		super();
		currentLayer && ( collection_animation[collection_animation.length] = this );
		this.literal = literal;
		return this;
	}
	
	[consume] (          )        { throw TypeError$1(`name[consume]`); }
	
	[Symbol.toPrimitive] (          ) {
		return this._literal;
	}
	
	* [Symbol.iterator] (          ) { throw TypeError$1(`beautify name`); }
	
	                                 
	
	static default = protect(this);
	
}

class Property extends Layer                {
	
	get [Symbol.toStringTag] () { return 'Property'; }
	
	         nameLiteral        ;
	        _colon          = false;
	        _comma          = true;
	
	constructor (nameLiteral        ) {
		super();
		this.nameLiteral = nameLiteral;
		return this;
	}
	
	[consume] (              ) {
		if ( this._colon ) {
			switch ( type ) {
				case ident:
					if ( !this._comma ) { break; }
					this.newItem = notKeyframes(literal) ? literal : new Name(literal);
					this._comma = false;
					return this;
				case string:
					if ( !this._comma ) { break; }
					this.newItem = new Name(literal);
					this._comma = false;
					return this;
				case ',':
					if ( this._comma ) { break; }
					this._comma = true;
					return this;
				case ';':
					if ( this._comma ) { break; }
					return this[parent];
				case '}':
					if ( this._comma ) { break; }
					return this[parent][parent][parent];
				case whitespace:
				case comment:
					return this;
			}
		}
		else {
			switch ( type ) {
				case ':':
					this._colon = true;
					return this;
				case whitespace:
				case comment:
					return this;
			}
		}
		return null;
	}
	
	[Symbol.toPrimitive] (              ) {
		return `${this.nameLiteral}:${this.join(',')};`;
	}
	
	* [Symbol.iterator] (              )                                {
		yield `${this.nameLiteral}: ${this.join(', ')};`;
	}
	
	                                                     
	
	static default = protect(this);
	
}

class Declaration extends Layer                             {// property or descriptor
	
	get [Symbol.toStringTag] () { return 'Declaration'; }
	
	         nameLiteral         ;
	        _colon          = false;
	
	constructor (nameLiteral        ) {
		if ( needCollect(nameLiteral) ) {
			if ( nameLiteral[nameLiteral.length - 5]==='-' ) { return new Property(nameLiteral)       ; }
			throw Error$1(`请用 animation-* 替代 animation`);
		}
		super();
		this.nameLiteral = nameLiteral;
		return this;
	}
	
	[consume] (                 ) {
		if ( this._colon ) {
			switch ( type ) {
				case ';': {
					const { lastItem } = this;
					( lastItem===' ' || lastItem==='/**/' ) && --this.length;
					if ( !this.length ) { break; }
					return this[parent];
				}
				case '}': {
					const { lastItem } = this;
					( lastItem===' ' || lastItem==='/**/' ) && --this.length;
					if ( !this.length ) { break; }
					return this[parent] [parent] [parent];
				}
				case function_:
					return this.newItem = new ( url_ (literal) ? Url : Parenthesis )(literal.slice(0, -1));
				case '?':
				case '/':
				case '-':
				case '+':
				case ',':
				case '*':
				case '!':
				case ident:
				case hash:
				case string:
				case number:
				case dimension:
				case percentage:
					this.newItem = literal;
					return this;
				case url:
					if ( literal[3]==='(' ) { return newUrl(this); }
					break;
				case whitespace:
					this.length && ( this.newItem = ' ' );
					return this;
				case comment:
					this.length && ( this.newItem = '/**/' );
					return this;
			}
		}
		else {
			switch ( type ) {
				case ':':
					this._colon = true;
					return this;
				case whitespace:
				case comment:
					return this;
			}
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                 ) {
		return `${this.nameLiteral}:${this.join('')};`;
	}
	
	* [Symbol.iterator] (                 )                                {
		yield `${this.nameLiteral}: ${this.join('')};`;
	}
	
	                                             
	
	static default = protect(this);
	
}

class Properties extends Layer           {
	
	get [Symbol.toStringTag] () { return 'Properties'; }
	
	constructor (parent$1                           ) {
		super();
		this[parent] = parent$1;
		return this;
	}
	
	[consume] (                ) {
		switch ( type ) {
			case whitespace:
			case comment:
				return this;
			case ident:
				return this.newItem = new Declaration(literal);
			case '}':
				return this[parent][parent];
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                ) {
		return this.join('');
	}
	
	* [Symbol.iterator] (                ) { throw TypeError$1(`beautify properties`); }
	
	                                                  
	
	static default = protect(this);
	
}

class TypeSelector extends Layer       {
	
	elementNameLiteral        ;
	namespaceLiteral               ;
	
	constructor (elementNameLiteral        , namespaceLiteral                = null) {
		//if ( !elementNameLiteral ) { throw SyntaxError(`Type Selector 不能为 ${namespaceLiteral}`); }
		super();
		currentLayer && ( collection_type[collection_type.length] = this );
		this.elementNameLiteral = elementNameLiteral;
		this.namespaceLiteral = namespaceLiteral;
		return this;
	}
	
	[consume] (                  )        { throw TypeError$1(`typeSelector[consume]`); }
	
	get literal () { return this.namespaceLiteral===null ? this.elementNameLiteral : `${this.namespaceLiteral}|${this.elementNameLiteral}`; }
	
	[Symbol.toPrimitive] (                  ) { return this.literal; }
	
	* [Symbol.iterator] (                  ) { throw TypeError$1(`beautify typeSelector`); }
	
	static default = protect(this);
	
}

class ClassSelector extends Layer       {
	
	         itemLiteral        ;
	
	constructor (itemLiteral        ) {
		//if ( !itemLiteral ) { throw SyntaxError(`Class Selector 不能为 .`); }
		super();
		currentLayer && ( collection_class[collection_class.length] = this );
		this.itemLiteral = itemLiteral;
		return this;
	}
	
	[consume] (                   )        { throw TypeError$1(`classSelector[consume]`); }
	
	[Symbol.toPrimitive] (                   ) { return `.${this.itemLiteral}`; }
	
	* [Symbol.iterator] (                   ) { throw TypeError$1(`beautify classSelector`); }
	
	static default = protect(this);
	
}

const notPseudo = /*#__PURE__*/test.bind(/^(?:dir|lang|nth-(?:last-)?(?:col|of-type)|part|state|theme)$/i);
//	not
//		标准
//			:dir()
//			:lang()
//			:nth-$last$-of-type()
//			::part(ident+)
//		废弃
///		实验
///			:nth-$last$-col()
///			:state()
///			::theme()
//	part
///		实验
///			:nth-$last$-child(+n+1 n+1 odd oF.class)
//	is
//		标准
//			:host()
//			:host-context()
//			::slotted()
//			:is()
//			:not()
//			:where()
//			:has(>*)
//		废弃
//			:*any()
//			:matches()
//		实验
//			:current()
const isNthChild = /*#__PURE__*/test.bind(/^nth-(?:last-)?child$/i);

const inNthChild = (complexSelector                 ) => ( complexSelector[parent][parent].constructor                                                                                                 )===NthChild;

const followCombinator = ({ lastItem }                ) => lastItem==='>' || lastItem==='+' || lastItem==='~' || lastItem==='||';

const missingCompoundSelector = ({ lastItem }                 ) => !lastItem || lastItem===',' || lastItem==='>' || lastItem==='+' || lastItem==='~' || lastItem==='||';

const IS_NTH_START = /*#__PURE__*/test.bind(/^(?:\+(?:\d+n?)?|-(?:\d+n?|n(?:-\d+)?)|\d+n?|even|n(?:-\d+)?|odd)$/i);
const IS_NTH_WHOLE = /*#__PURE__*/test.bind(/^(?:[+-]?(?:\d+(?:n(?:[+-]\d+)?)?|event|n(?:[+-]\d+)?)|odd)$/i);

const STATE_BEFORE_NTH = 1         ;
const STATE_DURING_NTH = 2         ;
const STATE_AFTER_NTH = 3         ;
const STATE_OF = 4         ;
const STATE_AFTER_OF = 5         ;

class NthChild extends Layer       {
	
	get [Symbol.toStringTag] () { return 'NthChild'; }
	
	                 pseudoLiteral        ;
	        _state                        = STATE_BEFORE_NTH;
	nthLiteral         = '';
	ofLiteral         = '';
	sLayer                      = null;
	
	constructor (pseudoLiteral        ) {
		///
		super();
		this.pseudoLiteral = pseudoLiteral;
		return this;
	}
	
	[consume] (              ) {
		switch ( this._state ) {
			case STATE_BEFORE_NTH:
				switch ( type ) {
					case comment:
					case whitespace:
						return this;
					case ident:
					case '+':
					case number:
					case dimension:
						if ( !IS_NTH_START(literal) ) { break; }
						this.nthLiteral = literal;
						this._state = STATE_DURING_NTH;
						return this;
				}
				break;
			case STATE_DURING_NTH:
				switch ( type ) {
					case comment:
						return this;
					case ident:
					case '+':
					case number:
					case dimension:
						this.nthLiteral += literal;
						return this;
					case ')':
						if ( !IS_NTH_WHOLE(this.nthLiteral) ) { break; }
						this._state = 0;
						return this[parent];
					case whitespace:
						if ( !IS_NTH_WHOLE(this.nthLiteral) ) { break; }
						this._state = STATE_AFTER_NTH;
						return this;
				}
				break;
			case STATE_AFTER_NTH:
				switch ( type ) {
					case comment:
					case whitespace:
						return this;
					case ')':
						this._state = 0;
						return this[parent];
					case ident:
						if ( !of (literal) ) { break; }
						this.ofLiteral = literal;
						this._state = STATE_OF;
						return this;
				}
				break;
			case STATE_OF:
				switch ( type ) {
					case comment:
						return this;
					case whitespace:
						this._state = STATE_AFTER_OF;
						return this;
				}
				break;
			case STATE_AFTER_OF:
				switch ( type ) {
					case comment:
					case whitespace:
						return this;
					case ')':
						break;
					default:
						stay();
						this._state = 0;
						return this.sLayer = new SelectorList(this);
				}
				break;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (              ) {
		return `${this.pseudoLiteral}(${this.nthLiteral}${this.sLayer ? ` ${this.ofLiteral} ${this.sLayer}` : ''})`;
	}
	
	* [Symbol.iterator] (              ) { throw TypeError$1(`beautify nthChild`); }
	
	                                        
	
	static default = protect(this);
	
}

class ComplexSelector extends Layer                                                                                                                    {
	
	containsScope (                       isScoped                                                  )          {
		const { length } = this;
		let index = 0;
		do {
			const each = this[index] ;
			switch ( each.constructor ) {
				case ClassSelector:
				case IdSelector:
				//case TypeSelector:
				//case AttributeSelector:
					if ( isScoped('' + each) ) { return true; }
					break;
				case ComplexSelector:
					if ( ( each                    ).containsScope(isScoped) ) { return true; }
					break;
				case NthChild:
					const { sLayer } = each            ;
					if ( sLayer ) {
						const { length } = sLayer;
						let index = 0;
						do { if ( sLayer[index] .containsScope(isScoped) ) { return true; } }
						while ( ++index!==length );
					}
					break;
			}
		}
		while ( ++index!==length );
		return false;
	}
	
	get [Symbol.toStringTag] () { return 'ComplexSelector'; }
	
	                 pseudoLiteral        ;
	        _hold                                             = '';
	
	constructor (pseudoLiteral        ) {
		super();
		this.pseudoLiteral = pseudoLiteral;
		return this;
	}
	
	[consume] (                     ) {
		if ( type===comment ) { return this; }
		if ( this._hold && type!==ident ) {
			switch ( this._hold ) {
				case ':':
					if ( type===':' ) {
						this._hold = '::';
						return this;
					}
				case '::':
					if ( type===function_ ) { break; }
					return null;
				case '.':
					return null;
				case '|':
					if ( type==='*' ) { break; }
					///if ( TOKEN.type==='|' && !( allowRelativeSelectorList!(this.pseudoLiteral) ? followCombinator : missingCompoundSelector )(this) ) { break; }
					return null;
				default:
					if ( type==='*' ) { break; }
					return null;
			}
		}
		switch ( type ) {
			case whitespace:
				missingCompoundSelector(this) || ( this.newItem = ' ' );
				return this;
			case ident:
				switch ( this._hold ) {
					case '':
						const constructorOfLastItem = this.length && this.lastItem .constructor;
						if ( constructorOfLastItem===TypeSelector || constructorOfLastItem===IdSelector ) { return null; }
						this.newItem = new TypeSelector(literal, null);
						break;
					case '.':
						this.newItem = new ClassSelector(literal);
						break;
					case ':':
					case '::':
						this.newItem = this._hold + literal;
						break;
					case '|':
						const { lastItem } = this;
						if ( lastItem && lastItem.constructor===TypeSelector ) {
							if ( lastItem.namespaceLiteral!==null ) { return null; }
							lastItem.namespaceLiteral = lastItem.elementNameLiteral;
							lastItem.elementNameLiteral = literal;
							break;
						}
					default:
						this.newItem = new TypeSelector(literal, this._hold.slice(0, -1));
						break;
				}
				this._hold = '';
				return this;
			case ',':
				if ( this.pseudoLiteral ) {
					const { lastItem } = this;
					if ( !lastItem || lastItem===',' ) { return null; }
					this[lastItem===' ' ? this.lastIndex : this.length] = literal;
					return this;
				}
				if ( missingCompoundSelector(this) ) { return null; }
				if ( inNthChild(this) ) {
					this[this.lastItem===' ' ? this.lastIndex : this.length] = literal;
					return this;
				}
				this.lastItem===' ' && ( --this.length );
				return this[parent];
			case '>':
			case '+':
			case '~':
				if ( ( has (this.pseudoLiteral) ? followCombinator : missingCompoundSelector )(this) ) { return null; }
				this[this.lastItem===' ' ? this.lastIndex : this.length] = literal;
				return this;
			case ':':
				this._hold = ':';
				return this;
			case '|':
				if ( this._hold ) {
					this[this.lastItem===' ' ? this.lastIndex : this.length] = '||';
					this._hold = '';
				}
				else { this._hold = '|'; }
				return this;
			case '.':
				this._hold = type;
				return this;
			case '*':
				if ( this._hold ) {
					this.newItem = new TypeSelector('*', this._hold.slice(0, -1));
					this._hold = '';
				}
				else { this.newItem = new TypeSelector('*', null); }
				return this;
			case hash:
				this.newItem = new IdSelector(literal.slice(1));
				return this;
			case '[':
				return this.newItem = new AttributeSelector;
			case function_:
				const colons = this._hold;
				if ( !colons || url_ (literal) ) { return null; }
				this._hold = '';
				const nameLiteral = literal.slice(0, -1);
				return this.newItem = new ( notPseudo(nameLiteral) ? Parenthesis : isNthChild(nameLiteral) ? NthChild : ComplexSelector )(colons + nameLiteral);
			case '{':
				if ( this.pseudoLiteral ) { return null; }
				if ( inNthChild(this) ) { return null; }
				if ( missingCompoundSelector(this) ) { return null; }
				this.lastItem===' ' && --this.length;
				return ( this[parent][parent]              ).block;
			case ')':
				if ( this.pseudoLiteral ) {
					if ( missingCompoundSelector(this) ) { return null; }///if ( this.lastItem===',' ) { return null; }
					( this.lastItem===' ' ) && --this.length;
					if ( !this.length ) { return null; }
					return this[parent];
				}
				else {
					if ( !inNthChild(this) ) { return null; }
					if ( missingCompoundSelector(this) ) { return null; }
					( this.lastItem===' ' ) && --this.length;
					return this[parent][parent][parent];
				}
			//case TOKEN.number:
			//case TOKEN.dimension:
			//case TOKEN.comment:
			//case '(':
			//case '-':
			//case TOKEN.url:
			//case '!':
			//case '$':
			//case '/':
			//case TOKEN.string:
			//case TOKEN.percentage:
			//case '?':
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                     ) {
		return this.pseudoLiteral ? `${this.pseudoLiteral}(${this.join('')})` : this.join('');
	}
	
	* [Symbol.iterator] (                     ) { throw TypeError$1(`beautify complexSelector`); }
	
	                                                       
	
	static default = protect(this);
	
}

class SelectorList extends Layer                  {
	
	get [Symbol.toStringTag] () { return 'SelectorList'; }
	
	constructor (parent$1                      ) {
		super();
		this[parent] = parent$1;
		return this;
	}
	
	[consume] (                     ) {
		stay();
		return this.newItem = new ComplexSelector('');
	}
	
	[Symbol.toPrimitive] (                  ) {
		return this.join(',');
	}
	
	* [Symbol.iterator] (                  ) { throw TypeError$1(`beautify selectorList`); }
	
	                                             
	
	static default = protect(this);
	
}

class StyleRule extends Layer       {
	
	get [Symbol.toStringTag] () { return 'StyleRule'; }
	
	         selector = currentLayer ? collection_selector[collection_selector.length] = new SelectorList(this) : new SelectorList(this);
	         block = new Properties(this);
	
	constructor () { return super()                   ; }
	
	[consume] (               ) {
		stay();
		return this.selector;
	}
	
	[Symbol.toPrimitive] (               ) {
		return this.block.length ? `${this.selector}{${( '' + this.block ).slice(0, -1)}}` : '';
	}
	
	* [Symbol.iterator] (               )                                {
		const { block, selector } = this;
		const { length } = block;
		if ( length && selector.length ) {
			let index = 0;
			let selectorText        ;
			if ( newlineSelector ) {
				const lastIndex = selector.length - 1;
				let index = 0;
				while ( index!==lastIndex ) {
					yield selector[index++] + ',';
				}
				selectorText = '' + selector[lastIndex];
			}
			else { selectorText = selector.join(', '); }
			if ( newlineProperty ) {
				yield `${selectorText} {`;
				while ( index!==length ) {
					for ( const line of block[index++]  ) {
						yield indent + line;
					}
				}
				yield `}`;
			}
			else {
				let cssText = ' ';
				while ( index!==length ) {
					for ( const line of block[index++]  ) {
						cssText += line + ' ';
					}
				}
				yield `${selectorText} {${cssText}}`;
			}
		}
	}
	
	                                       
	
	static default = protect(this);
	
}

const notFromOrTo = /*#__PURE__*/test.bind(/^(?!from$|to$)/i);

class QualifiedRule extends Layer         {
	
	get [Symbol.toStringTag] () { return 'QualifiedRule'; }
	
	         block = new Properties(this);
	        _empty = true;
	
	constructor () { return super()                   ; }
	
	[consume] (                   ) {
		switch ( type ) {
			case whitespace:
				return this;
			case ident:
				if ( notFromOrTo(literal) ) { break; }
			case percentage:// not style rule
				if ( !this._empty ) { break; }
				this._empty = false;
				this.newItem = literal;
				return this;
			case ',':
				if ( this._empty ) { break; }
				this._empty = true;
				return this;
			case '{':
				if ( this._empty ) { break; }
				return this.block;
			case comment:
				return this;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                   ) {
		return this.block.length ? `${this.join(',')}{${( '' + this.block ).slice(0, -1)}}` : '';
	}
	
	* [Symbol.iterator] (                   )                                {
		const { block } = this;
		const { length } = block;
		if ( length ) {
			let index = 0;
			if ( newlineProperty ) {
				yield `${this.join(', ')} {`;
				while ( index!==length ) {
					for ( const line of block[index++] ) {
						yield indent + line;
					}
				}
				yield `}`;
			}
			else {
				let cssText = ' ';
				while ( index!==length ) {
					for ( const line of block[index++]  ) {
						cssText += line + ' ';
					}
				}
				yield `${this.join(', ')} {${cssText}}`;
			}
		}
	}
	
	                                      
	
	static default = protect(this);
	
}

class KeyframesRule extends Layer                {
	
	get [Symbol.toStringTag] () { return 'KeyframesRule'; }
	
	                 keywordLiteral        ;
	_nameLiteral         = '';
	get nameLiteral () { return this._nameLiteral; }
	set nameLiteral (value) {
		if ( notKeyframes(value) ) { throw SyntaxError$1(`“${value}”无法作为 @keyframes 名`); }
		this._nameLiteral = value;
	}
	        _blocking          = false;
	get block () { return true; }
	
	constructor (keywordLiteral         ) {
		super();
		currentLayer && ( collection_keyframes[collection_keyframes.length] = this );
		this.keywordLiteral = keywordLiteral || 'keyframes';
		return this;
	}
	
	[consume] (                   ) {
		switch ( type ) {
			case whitespace:
			case comment:
				return this;
			case ident:
				if ( this._blocking ) {
					stay();
					return this.newItem = new QualifiedRule;
				}
				else {
					if ( this._nameLiteral ) { break; }
					this.nameLiteral = literal;
					return this;
				}
			case string:
				if ( this._nameLiteral ) { break; }
				this.nameLiteral = literal;
				return this;
			case '{':
				if ( !this._nameLiteral || this._blocking ) { break; }
				this._blocking = true;
				return this;
			case '}':
				if ( !this._blocking ) { break; }
				return this[parent];
			case percentage:
				if ( !this._blocking ) { break; }
				stay();
				return this.newItem = new QualifiedRule;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                   ) {
		const { _nameLiteral } = this;
		return `@${this.keywordLiteral}${_nameLiteral[0]==='"' || _nameLiteral[0]==='\'' ? '' : ' '}${_nameLiteral}{${this.join('')}}`;
	}
	
	* [Symbol.iterator] (                   )                                {
		const { length } = this;
		if ( length ) {
			yield `@${this.keywordLiteral} ${this._nameLiteral} {`;
			let index = 0;
			while ( index!==length ) {
				for ( const line of this[index++]  ) {
					yield indent + line;
				}
			}
			yield `}`;
		}
		else { yield `@${this.keywordLiteral} ${this._nameLiteral} { }`; }
	}
	
	static default = protect(this);
	
}

class DeclarationList extends Layer                                                  {
	
	get [Symbol.toStringTag] () { return 'AtRule.DeclarationList'; }
	
	                 _noAt         ;
	                 _canQualified         ;
	                 _noDescriptor         ;
	
	constructor (parent$1        , could                                                                           ) {
		super();
		this[parent] = parent$1;
		this._noAt = !could['@'];
		this._canQualified = could['{}'];
		this._noDescriptor = !could[':;'];
		return parent$1.block = this;
	}
	
	[consume] (                     ) {
		switch ( type ) {
			case whitespace:
			case comment:
				return this;
			case atKeyword:
				if ( this._noAt ) { break; }
				const keywordLiteral = literal.slice(1);
				if ( charset (keywordLiteral) || IMPORT (keywordLiteral) || namespace (keywordLiteral) ) { break; }
				return this.newItem = new ( keyframes (keywordLiteral) ? KeyframesRule : AtRule )(keywordLiteral);
			case ident:
				if ( this._noDescriptor ) {
					if ( this._canQualified ) {
						stay();
						return this.newItem = new StyleRule;// may not style rule
					}
					break;
				}
				if ( this._canQualified ) {
					for ( let i = index$1; i!==length; ++i ) {
						switch ( types[i] ) {
							case '{':
								stay();
								return this.newItem = new StyleRule;// may not style rule
							case ';':
							case '}':
								break;
							default:
								continue;
						}
						break;
					}
				}
				return this.newItem = new Declaration(literal);
			case '*':
			case '.':
			case ':':
			case '[':
			case '|':
			case hash:
				if ( this._canQualified ) {
					stay();
					return this.newItem = new StyleRule;
				}
				break;
			case '}':
				return this[parent][parent];
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                     ) { return this.join(''); }
	
	* [Symbol.iterator] (                     ) { throw TypeError$1(`beautify declarationList`); }
	
	                               
	
	static default = protect(this);
	
}

class AtRule extends Layer                                                 {
	
	get [Symbol.toStringTag] () { return 'AtRule'; }
	
	         keywordLiteral        ;
	block                         = null;
	
	constructor (keywordLiteral        ) {
		//if ( !keywordLiteral ) { throw SyntaxError(`At Rule 不能为 @`); }
		super();
		this.keywordLiteral = keywordLiteral;
		if ( media (keywordLiteral) ) { new DeclarationList(this, { '@': true, '{}': true, ':;': false }); }
		//else if ( is.keyframes(keywordLiteral) ) { new DeclarationList(this, { '@': false, '{}': true, ':;': false }); }
		else if ( page (keywordLiteral) ) { new DeclarationList(this, { '@': true, '{}': false, ':;': true }); }
		else if ( font_face (keywordLiteral) || counter_style (keywordLiteral) ) { new DeclarationList(this, { '@': false, '{}': false, ':;': true }); }
		else if ( supports (keywordLiteral) || document (keywordLiteral) ) { new DeclarationList(this, { '@': true, '{}': true, ':;': false }); }///
		else if ( viewport (keywordLiteral) ) { throw Error$1(`@${keywordLiteral} 已经废弃`); }
		else if ( this[parent].constructor===DeclarationList && page (( this[parent][parent]           ).keywordLiteral) ) { new DeclarationList(this, { '@': false, '{}': false, ':;': true }); }
		return this;
	}
	
	[consume] (            ) {
		switch ( type ) {
			case whitespace:
				this.length && ( this.newItem = ' ' );
				return this;
			case function_:
				return this.newItem = new ( url_ (literal) ? Url : Parenthesis )(literal.slice(0, -1));
			case '(':
				return this.newItem = new Parenthesis;
			case ident:
			case string:
			case ':':
			case ',':
				this.newItem = literal;
				return this;
			case url:
				if ( literal[3]==='(' || document (this.keywordLiteral) ) { return newUrl(this); }
				break;
			case '{': {
				//if ( is.charset(this.keywordLiteral) || is.import(this.keywordLiteral) || is.namespace(this.keywordLiteral) ) { break; }
				const { lastIndex } = this;
				if ( lastIndex>=0 ) {
					const lastItem = this[lastIndex];
					if ( lastItem===' ' || lastItem==='/**/' ) { this.length = lastIndex; }
				}
				return this.block ?? ( this.block = new DeclarationList(this, { '@': true, '{}': true, ':;': true }) );
			}
			case ';':
				if ( this.block ) { break; }
				return this[parent];
			case '}':
				if ( this.block ) { break; }
				stay();
				return this[parent];
			case comment:
				this.length && ( this.newItem = '/**/' );
				return this;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (            ) {
		const { block } = this;
		if ( block ) {
			const blockText = '' + block;
			return `@${this.keywordLiteral}${this.length ? ' ' : ''}${this.join('')}{${blockText && blockText[blockText.length - 1]===';' ? blockText.slice(0, -1) : blockText}}`;
		}
		else {
			return `@${this.keywordLiteral}${this.length ? ' ' : ''}${this.join('')};`;
		}
	}
	
	* [Symbol.iterator] (            )                                {
		const { block } = this;
		if ( block ) {
			const { length } = block;
			if ( length ) {
				yield `@${this.keywordLiteral}${this.length ? ' ' : ''}${this.join('')} {`;
				let index = 0;
				while ( index!==length ) {
					for ( const line of block[index++]  ) {
						yield indent + line;
					}
				}
				yield `}`;
			}
			else { yield `@${this.keywordLiteral}${this.length ? ' ' : ''}${this.join('')} { }`; }
		}
		else {
			yield `@${this.keywordLiteral}${this.length ? ' ' : ''}${this.join('')};`;
		}
	}
	
	                                                
	
	static default = protect(this);
	
}

class ImportRule extends Layer                             {
	
	get [Symbol.toStringTag] () { return 'ImportRule'; }
	
	                 keywordLiteral        ;
	urlLayer      ;
	get block () { return !this.urlLayer; }
	
	constructor (keywordLiteral         ) {
		super();
		this.keywordLiteral = keywordLiteral || 'import';
		return this;
	}
	
	[consume] (                ) {
		switch ( type ) {
			case whitespace:
				this.length && ( this.newItem = ' ' );
				return this;
			case string:
				if ( this.urlLayer ) { break; }
				( this.urlLayer = new Url(null) ).valueLiteral = literal;
				return this;
			case url:
				if ( this.urlLayer ) { break; }
				if ( literal[3]==='(' ) { return newUrl(this, 'urlLayer'); }
				break;
			case function_:
				if ( url_ (literal) ) {
					if ( this.urlLayer ) { break; }
					return this.urlLayer = new Url(literal.slice(0, 3));
				}
			case '(':
				if ( !this.urlLayer ) { break; }
				return this.newItem = new Url(literal.slice(0, -1));
			case ident:
			case ':':
			case ',':
				if ( !this.urlLayer ) { break; }
				this.newItem = literal;
				return this;
			case ';':
				if ( !this.urlLayer ) { break; }
				return this[parent];
			case comment:
				this.length && ( this.newItem = '/**/' );
				return this;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                ) {
		const urlLiteral = '' + this.urlLayer;
		return `@${this.keywordLiteral}${urlLiteral && ( urlLiteral[0]==='"' || urlLiteral==='\'' ) ? '' : ' '}${urlLiteral}${this.join('')};`;
	}
	
	* [Symbol.iterator] (                )                                {
		yield `@${this.keywordLiteral} ${this.urlLayer}${this.length ? ' ' + this.join('') : ''};`;
	}
	
	static default = protect(this);
	
}

class NamespaceRule extends Layer       {
	
	get [Symbol.toStringTag] () { return 'NamespaceRule'; }
	
	                 keywordLiteral        ;
	        prefixLiteral         = '';
	urlLayer      ;
	get block () { return !this.urlLayer; }
	
	constructor (keywordLiteral         ) {
		super();
		this.keywordLiteral = keywordLiteral || 'namespace';
		return this;
	}
	
	[consume] (                   ) {
		switch ( type ) {
			case whitespace:
				return this;
			case string:
				if ( this.urlLayer ) { break; }
				( this.urlLayer = new Url(null) ).valueLiteral = literal;
				return this;
			case url:
				if ( this.urlLayer ) { break; }
				if ( literal[3]==='(' ) { return newUrl(this, 'urlLayer'); }
				break;
			case function_:
				if ( url_ (literal) ) {
					if ( this.urlLayer ) { break; }
					return this.urlLayer = new Url(literal.slice(0, 3));
				}
				break;
			case ident:
				if ( this.prefixLiteral || this.urlLayer ) { break; }
				this.prefixLiteral = literal;
				return this;
			case ';':
				return this[parent];
			case comment:
				return this;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (                   ) {
		const urlLiteral = '' + this.urlLayer;
		return `@${this.keywordLiteral}${this.prefixLiteral && ' ' + this.prefixLiteral}${urlLiteral && ( urlLiteral[0]==='"' || urlLiteral==='\'' ) ? '' : ' '}${urlLiteral};`;
	}
	
	* [Symbol.iterator] (                   )                                {
		yield `@${this.keywordLiteral}${this.prefixLiteral && ' ' + this.prefixLiteral} ${this.urlLayer};`;
	}
	
	static default = protect(this);
	
}

const { merge } = KindMap.prototype;
const KINDS                  = [ 'type', 'class', 'attribute', 'id', 'keyframes', 'animation!keyframes', 'url' ];
function itemCallback (                                    item        , index        , items          ) {
	this.set(items[index] = item.slice(1), []);
}
function CLASS_LAYER_CB (                                                              CLASS_LAYERS                 , item        ) {
	this[this.length] = CLASS_LAYERS[CLASS_LAYERS.length] = new ClassSelector(item);
}
const replace = (sheet       , callback                                                                    , kinds                        ) => {
	const refs = sheet[REFS];
	if ( !refs ) { return; }
	let typeMap                                     = null;
	let classMap                                      = null;
	let TYPE_LAYERS                ;
	let CLASSES_LAYERS                              ;
	if ( typeof kinds==='string' ) { kinds = [ kinds ]; }
	let index = kinds.length;
	while ( index ) {
		const kind = kinds[--index] ;
		switch ( kind ) {
			case 'type':
			case 'class':
			case 'attribute': {
				const ref = refs[kind];
				if ( !ref ) { continue; }
				const attribute = kind==='attribute';
				for ( const { 0: literal, 1: layers } of ref ) {
					let ret = callback(literal, kind);
					if ( ret===undefined$1 ) { continue; }
					if ( !isCompoundSelector(ret) ) { throw Error$1(`${kind==='attribute' ? 'attributeSelector(“[' : kind==='class' ? 'classSelector(“.' : 'typeSelector(“'}${literal}${kind==='attribute' ? ']' : ''}”)只能替换为 typeSelector 和/或 classSelector，而非“${ret}”`); }
					const items           = ret.match(SIMPLE_SELECTORS)                           ;
					let namespace                = null;
					let elementName         = '';
					if ( items[0] [0]!=='.' ) {
						if ( items[0] [0]==='|' ) {
							namespace = '';
							elementName = items.shift() .slice(1);
						}
						else if ( items.length===2 || items[1] [0]!=='|' ) { elementName = items.shift() ; }
						else {
							namespace = items.shift() ;
							elementName = items.shift() .slice(1);
						}
					}
					TYPE_LAYERS = [];
					items.forEach(itemCallback, CLASSES_LAYERS = new KindMap);
					const { length } = layers;
					let index = 0;
					do {
						const selectors                                                         = elementName ? [ new TypeSelector(elementName, namespace) ] : [];
						CLASSES_LAYERS.forEach(CLASS_LAYER_CB, selectors);
						const layer = layers[index] ;
						if ( attribute && layer.length ) { throw Error$1(`不能替换有值的 attributeSelector（“${layer}”）`); }
						else { layer.replaceWith(selectors); }
					}
					while ( ++index!==length );
					elementName && ( typeMap ?? ( typeMap = new KindMap ) ).merge(TYPE_LAYERS, namespace===null ? elementName : namespace + '|' + elementName);
					items.length && CLASSES_LAYERS.forEach(merge, classMap ?? ( classMap = new KindMap ));
					ref.delete(literal);
				}
				break;
			}
			case 'id': {
				const { id } = refs;
				if ( !id ) { continue; }
				let { size } = id;
				for ( const { 0: literal, 1: layers } of id ) {
					let ret = callback(literal, kind);
					if ( ret===undefined$1 ) { continue; }
					if ( !isIdSelector(ret) ) { throw Error$1(`idSelector(“#${literal}”)只能替换为 idSelector，而非“${ret}”`); }
					id.set(ret = ret.slice(1), layers);
					let index = layers.length;
					while ( index ) { layers[--index] .valueLiteral = ret; }
					id.delete(literal);
					if ( !--size ) { break; }
				}
				break;
			}
			case 'keyframes':
			case 'animation!keyframes': {
				const { animationKeyframes } = refs;
				if ( !animationKeyframes ) { continue; }
				let { size } = animationKeyframes;
				const keyframes = kind==='keyframes';
				for ( const { 0: literal, 1: layers } of animationKeyframes ) {
					if ( keyframes===!layers.rule ) { continue; }
					const ret = callback(literal, kind);
					if ( ret===undefined$1 ) { continue; }
					animationKeyframes.set(ret, layers);
					let index = layers.length;
					while ( index ) { layers[--index] .literal = ret; }
					const { rule } = layers;
					if ( rule ) {
						let index = rule.length;
						while ( index ) { rule[--index] .nameLiteral = ret; }
					}
					animationKeyframes.delete(literal);
					if ( !--size ) { break; }
				}
				break;
			}
			case 'url': {
				const { url } = refs;
				if ( !url ) { continue; }
				let { size } = url;
				for ( const { 0: literal, 1: layers } of url ) {
					const ret = callback(literal, kind);
					if ( ret===undefined$1 ) { continue; }
					let index = layers.length;
					if ( ( literal[0]==='"' || literal[0]==='\'' ) && ret[0]!=='"' && ret[0]!=='\'' ) {
						while ( index ) {
							const layer = layers[--index] ;
							if ( !layer.nameLiteral ) { throw Error$1(`引号 url“${literal}”只能替换为引号 url，而非“${ret}”`); }
							layer.valueLiteral = ret;
						}
					}
					else {
						while ( index ) { layers[--index] .valueLiteral = ret; }
					}
					url.set(ret, layers);
					url.delete(literal);
					if ( !--size ) { break; }
				}
				break;
			}
		}
	}
	if ( typeMap ) {
		refs.type
			? typeMap.forEach(merge, refs.type)
			: refs.type = typeMap;
	}
	if ( classMap ) {
		refs.class
			? classMap.forEach(merge, refs.class)
			: refs.class = classMap;
	}
};

const REFS = Symbol('refs');
let _imports_count = 0;
let _namespaces_count = 0;

class Sheet$1 extends Layer                                                                  {
	
	get [Symbol.toStringTag] () { return 'Sheet'; }
	
	        [REFS]                    ;
	
	constructor (inner        ) {
		super();
		if ( !inner ) { return this; }
		check(inner);
		_imports_count = _namespaces_count = 0;
		try { this[REFS] = parse(this, inner); }
		finally { clear(); }
		return this;
	}
	
	[consume] (           ) {
		switch ( type ) {
			case whitespace:
			case comment:
				return this;
			case atKeyword:
				const keywordLiteral = literal.slice(1);
				if ( charset (keywordLiteral) ) {
					if ( this.length ) { break; }
					throw SyntaxError$1(`@charset`);
				}
				if ( IMPORT (keywordLiteral) ) {
					if ( this.length!==_imports_count ) { break; }
					++_imports_count;
					return this.newItem = new ImportRule(keywordLiteral);
				}
				if ( namespace (keywordLiteral) ) {
					if ( this.length!==_imports_count + _namespaces_count ) { break; }
					++_namespaces_count;
					return this.newItem = new NamespaceRule(keywordLiteral);
				}
				return this.newItem = new ( keyframes (keywordLiteral) ? KeyframesRule : AtRule )(keywordLiteral);
			case ident:
			case '[':
			case '.':
			case '*':
			case ':':
			case '|':
			case hash:
				stay();
				return this.newItem = new StyleRule;
		}
		return null;
	}
	
	[Symbol.toPrimitive] (           ) {
		if ( this.length ) {
			const cssText = this.join('');
			return cssText[cssText.length - 1]===';' ? cssText.slice(0, -1) : cssText;
		}
		return '';
	}
	
	* [Symbol.iterator] (             options          )                                {
		Options(options);
		const { length } = this;
		let index = 0;
		while ( index!==length ) { yield * this[index++] ; }
	}
	
	                             
	
	static default = protect(this);
	
	//////treeShake (this :Sheet, selectorList :string) {}
	
	replace (             callback                                                                    , kinds                         = KINDS)       {
		replace(this, (literal        , kind       ) => callback(evaluate(literal), kind), kinds);
	}
	
	forEach (             callback                                                         , kinds                         = KINDS)       {
		replace(this, (literal        , kind       ) => void callback(literal, kind), kinds);
	}
	
	findGlobal (             isScoped                                                  )                {
		if ( this[REFS] && this[REFS] .selector ) {
			const selectorLists = this[REFS] .selector ;
			const { length } = selectorLists;
			let index = 0;
			while ( index!==length ) {
				const selectorList = selectorLists[index++] ;
				const { length } = selectorList;
				let i = 0;
				do { if ( !selectorList[i] .containsScope(isScoped) ) { return '' + selectorList[i] ; } }
				while ( ++i!==length );
			}
		}
	}
	
}

const minify = (css        ) => '' + new Sheet$1(css);

/*¡ j-css */

const type_attribute = [ 'type', 'attribute' ]         ;
const attributeCallback = (evaluated        )                => {
	if ( evaluated[0]==='_' ) { return '.' + NameAs__Key__(evaluated.slice(1)); }
};

class Sheet extends Sheet$1 {
	
	get [Symbol.toStringTag] () { return 'SFC.Style.Sheet'; }
	
	constructor (inner        , abbr           ) {
		super(inner);
		abbr
			? this.replace((evaluated, kind)                => {
				switch ( kind ) {
					case 'type':
						if ( startsWithUpperCase(evaluated) ) { return abbr(evaluated); }
						break;
					case 'attribute':
						return attributeCallback(evaluated);
				}
			}, type_attribute)
			: this.replace(attributeCallback, 'attribute');
		return this;
	}
	
	checkScoped (             isScoped                                         ) {
		this.forEach((evaluated) => { if ( !isScoped(evaluated) ) { throw ReferenceError$1(`@keyframes ${evaluated} 将对全局生效`); } }, 'keyframes');
		const selector = this.findGlobal(isScoped);
		if ( selector ) { throw ReferenceError$1(`“${selector}” 将对全局生效`); }
	}
	
}
freeze(freeze(Sheet).prototype);

const STYLE_END_TAG$1 = newRegExp$2.i`</style${TAG_EMIT_CHAR}`;

const CSS = newRegExp$2.i`^${ASCII_WHITESPACE}*(?:text\/)?CSS${ASCII_WHITESPACE}*$`;

class Style extends Block          {
	
	get [Symbol.toStringTag] () { return 'SFC.Style'; }
	
	constructor (attributes            , inner                    ) {
		
		super('style', attributes, true, inner, STYLE_END_TAG$1);
		
		if ( 'module' in attributes ) { throw Error$1(`jVue 暂未支持编译 style module`); }
		if ( 'scoped' in attributes ) { throw Error$1(`jVue 暂未支持编译 style scoped`); }
		if ( 'vars' in attributes ) { throw Error$1(`jVue 暂未支持编译 style vars`); }
		
		const _this          = _.new(this);
		
		_this.allowGlobal = '.global' in attributes && ( attributes['.global']===EMPTY || throwSyntaxError(`style 块的“.global”属性不能具有值`) );
		
		_this.abbr = forStyle(attributes);
		
		if ( 'media' in attributes ) {
			if ( attributes.media===EMPTY ) { throw SyntaxError$1(`style 功能块元素的 media 属性必须具有值`); }
			_this.media = attributes.media;
		}
		
		return this;
		
	}
	
	get sheet ()        {
		const _this          = _(this);
		let inner                     = _this.innerCSS;
		if ( inner===undefined$1 ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error$1(`自闭合的 style 功能块元素必须自行根据 src 属性加载 inner 值`); }
			const { lang } = this;
			if ( lang && !CSS.test(lang) ) { throw Error$1(`style 功能块元素如果设置了非 css 的 lang 属性值，那么必须自行提供转译后的 innerCSS`); }
		}
		if ( _this.sheet && _this.cache===inner ) { return _this.sheet; }
		const sheet = new Sheet(inner, _this.abbr);
		_this.sheet = sheet;
		_this.cache = inner;
		return sheet;
	}
	
	get innerCSS () {
		return '' + this.sheet;
	}
	set innerCSS (value) {
		if ( typeof ( value            )!=='string' ) { throw TypeError$1(`innerCSS 只能被赋值字符串`); }
		_(this).innerCSS = value;
	}
	
}
freeze(freeze(Style).prototype);

const Set$1 = Set;

const parserOptions$1 = Null({
	ecmaVersion: 2014,
	sourceType: 'module',// use strict mode
	allowReserved: true,
}         );

const NAMES           = [];

const Pattern = (node         )       => {
	switch ( node.type ) {
		case 'Identifier':
			const { name } = node;
			if ( name[0]==='_' || name[0]==='$' ) { NAMES[NAMES.length] = name; }
			break;
		case 'ObjectPattern':// { Pattern }
			let propertyIndex = 0;
			for ( const { properties } = node, { length } = properties; propertyIndex!==length; ) {
				const property = properties[propertyIndex++] ;
				switch ( property.type ) {
					case 'Property':// { key: valuePattern }
						Pattern(property.value);
						break;
					case 'RestElement':// { ...argumentPattern }
						Pattern(property.argument);
						break;
					default:
						throw Error$1(`Unrecognized pattern type: ${property.type}`);
				}
			}
			break;
		case 'ArrayPattern':// [ , Pattern ]
			let elementIndex = 0;
			for ( const { elements } = node, { length } = elements; elementIndex!==length; ) {
				const element = elements[elementIndex++];
				element && Pattern(element);
			}
			break;
		case 'RestElement':
			Pattern(node.argument);// [ ...argumentPattern ] (...argumentPattern)
			break;
		case 'AssignmentPattern':// leftPattern = right
			Pattern(node.left);
			break;
		default:
			throw Error$1(`Unrecognized pattern type: ${node.type}`);
	}
};
const Params = (parameters        , min        , max        , attribute        )       => {
	let program         ;
	try { program = parse$1(`(${parameters})=>{}`, parserOptions$1)       ; }
	catch (error) {
		const index = error.pos-1;
		throw SyntaxError$1(`${attribute}的内容“${parameters.slice(0, index)}”✗“${parameters.slice(index)}”解析失败`);
	}
	const { body } = program;
	if ( body.length!==1 ) { throw SyntaxError$1(`${attribute}的内容的解析结果不符合预期`); }
	const body_0 = body[0];
	if ( body_0.type!=='ExpressionStatement' ) { throw SyntaxError$1(`${attribute}的内容的解析结果不符合预期`); }
	const { expression } = body_0;
	if ( expression.type!=='ArrowFunctionExpression' ) { throw SyntaxError$1(`${attribute}的内容的解析结果不符合预期`); }
	const block = expression.body;
	if ( block.type!=='BlockStatement' || block.body.length!==0 ) { throw SyntaxError$1(`${attribute}的内容的解析结果不符合预期`); }
	const { params } = expression;
	const { length } = params;
	if ( length<min || max<length ) { throw SyntaxError$1(`${attribute}的内容的解析结果数量 ${length} 不符合预期的 ${min}～${max}`); }
	if ( !length ) { return; }
	NAMES.length = 0;
	let index = 0;
	while ( index!==length ) { Pattern(params[index++] ); }
	if ( NAMES.length ) { throw ReferenceError$1(`${attribute}创建了以“_”或“$”开头的局部变量“${NAMES.join('”“')}”，这可能使得内层 Vue 模板编译结果以错误的方式运行`); }
};

class Node {
	
	          constructor () { return this; }
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.*.Node'; }
	
	         firstChild                        = null;
	         nextSibling                        = null;
	afterAppend (                         refChild                       , newChild                ) {
		return refChild
			? ( refChild        ).nextSibling = newChild
			: ( this        ).firstChild = newChild;
	}
	
	                                                                       
	                                                                
	
}
freeze(freeze(Node).prototype);

const isPrototypeOf = Object.prototype.isPrototypeOf;

const tag_attrs = ({ localName: literal, attributes }         ) => {
	for ( const name in attributes ) {
		const value = attributes[name];
		literal += value===EMPTY ? ` ${name}` : ` ${name}="${escapeAttributeValue(value)}"`;
	}
	return literal;
};

class Element extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.*.Element'; }
	
	constructor (localName        , attributes            , __class__                    , shadowRoot                                                             ) {
		super();
		if ( __class__ ) {
			attributes['class'] = attributes['class']
				? __class__ + ' ' + attributes['class']
				: __class__;
		}
		this.localName = localName;
		this.attributes = attributes;
		this.#shadowRoot = shadowRoot;
		return this;
	}
	
	         localName        ;
	         attributes            ;
	         #shadowRoot                                                             ;
	
	[Symbol.toPrimitive] (             ) {
		let innerHTML         = '';
		let child = this.firstChild;
		while ( child ) {
			innerHTML += child;
			child = child.nextSibling;
		}
		if ( this.#shadowRoot ) {
			///Vue3: return `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set"><template shadowroot="open">${innerHTML}</template></${this.localName}>`;
			innerHTML = `<teleport v-if="${this.#shadowRoot.along}$get" :to="${this.#shadowRoot.along}$get">${innerHTML}</teleport>`;
			return this.#shadowRoot.inside
				? `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set">${innerHTML}</${this.localName}>`
				: `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set" />${innerHTML}`;
		}
		else {
			return innerHTML
				? `<${tag_attrs(this)}>${this.localName==='textarea' || this.localName==='pre' ? '\n' + innerHTML : innerHTML}</${this.localName}>`
				: `<${tag_attrs(this)} />`;
		}
	}
	
	* beautify (tab         = '\t')                                {
		if ( this.#shadowRoot ) {
			const teleport = `<teleport v-if="${this.#shadowRoot.along}$get" :to="${this.#shadowRoot.along}$get">`;
			if ( this.#shadowRoot.inside ) {
				yield `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set">`;
				yield tab + teleport;
				let child = this.firstChild;
				while ( child ) {
					for ( const line of child.beautify(tab) ) {
						yield `${tab}${tab}${line}`;
					}
					child = child.nextSibling;
				}
				yield `${tab}</teleport>`;
				yield `</${this.localName}>`;
			}
			else {
				yield `<${tag_attrs(this)} :ref="${this.#shadowRoot.along}$set" />`;
				yield teleport;
				let child = this.firstChild;
				while ( child ) {
					for ( const line of child.beautify(tab) ) {
						yield `${tab}${line}`;
					}
					child = child.nextSibling;
				}
				yield `</teleport>`;
			}
		}
		else {
			let child = this.firstChild;
			if ( child ) {
				yield `<${tag_attrs(this)}>`;
				do {
					for ( const line of child.beautify(tab) ) {
						yield `${tab}${line}`;
					}
				}
				while ( ( child = child.nextSibling ) );
				yield `</${this.localName}>`;
			}
			else {
				yield `<${tag_attrs(this)} />`;
			}
		}
	}
	
}
freeze(freeze(Element).prototype);

class RawTextElement extends Element {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.RawTextElement'; }
	
	constructor (localName        , attributes            , __class__                    ) { return super(localName, attributes, __class__, null)                   ; }
	
	textContent         = '';
	
	[Symbol.toPrimitive] (                    ) {
		return this.textContent
			? `<${tag_attrs(this)}>${this.textContent}</${this.localName}>`
			: `<${tag_attrs(this)} />`;
	}
	
	* beautify (                      tab = '\t')                                {
		if ( this.textContent ) {
			yield `<${tag_attrs(this)}>`;
			for ( const line of this.textContent.split('\n') ) {
				yield `${tab}${line}`;
			}
			yield `</${this.localName}>`;
		}
		else {
			yield `<${tag_attrs(this)} />`;
		}
	}
	
}

freeze(freeze(RawTextElement).prototype);

const isElement = /*#__PURE__*/isPrototypeOf.bind(Element.prototype)                                     ;

const EOL = /[\n\u2028\u2029]|\r\n?/;

class TextCharacterData extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.*.Text'; }
	
	        _isInterpolation         ;
	
	constructor (data         = '', isInterpolation          = false) {
		super();
		this.data = data;
		this._isInterpolation = isInterpolation;
		return this;
	}
	
	         data        ;
	
	//get wholeText () :string { return this.data; }
	
	//get length () { return this.data.length; }
	
	[Symbol.toPrimitive] (                       ) {
		return this._isInterpolation
			? `{{${escapeInnerText(this.data)} }}`
			: escapeInnerText(this.data);
	}
	
	* beautify ()                                     {
		yield * (
			this._isInterpolation
				? `{{ ${escapeBeautifulText(this.data)} }}`
				: escapeBeautifulText(this.data)
		).split(EOL);
	}
	
}
freeze(freeze(TextCharacterData).prototype);

const TNR = /^[\t\n\r]+|[\t\n\r]+$/g;
const NT = /(?:\n\t|\r\n?)\t*/g;

const OPEN_LIKE = /{(?:{+|$)/g;
const escapeOpenLike = ($$        ) => `{{'${$$}'}}`;

const trimTab = (raw        )         => {
	//Entities.test(raw);// 以后如果要完全剔除“\n”，则需要要先检查解码的正确性，防止“&l”“t;”连起来
	//return raw.replace(/\n\t*/g, '');
	return raw.replace(NT, '\n');
};

const DELIMITERS_0 = '{{';
const DELIMITERS_1 = '}}';

class Mustache extends ( Array$1                   ) {
	
	                        
	                                
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content.Mustache'; }
	
	         #pre          = false;
	
	constructor (raw        , v_pre         , delimiters_0        , delimiters_1        ) {
		// Vue 会优先解析 <tag>，而且还看 tagName，然后才是 {{}}，这和流式解析矛盾，因此要求避免任何潜在的视觉歧义
		// 如果未来发现不会导致解析报错终止的歧义，则要更严格地，在解码前检查确保连“<”都不存在
		super();
		raw = raw.replace(TNR, '');
		if ( v_pre ) {
			this.#pre = true;
			this[this.length] = unescape(trimTab(raw));
			return this;
		}
		let index = 0;
		for ( ; ; ) {
			
			const insStart = raw.indexOf(delimiters_0, index);
			
			if ( insStart<0 ) {
				const data         = unescape(trimTab(raw.slice(index)));
				data.includes(delimiters_0) && throwSyntaxError(`对“${delimiters_0}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
				this[this.length] = data;
				break;
			}
			let data         = unescape(trimTab(raw.slice(index, insStart)));
			data.includes(delimiters_0) && throwSyntaxError(`对“${delimiters_0}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
			this[this.length] = data;
			
			const insEnd = raw.indexOf(delimiters_1, insStart + 2);
			insEnd<0 && throwSyntaxError(`template 块中存在未关闭的插值模板标记“${delimiters_0}”，虽然 Vue 会将其作为普通文字处理，但这种情况本身极有可能是误以为插值语法可以包含标签造成的`);
			index = insStart + 2;
			index===insEnd && throwSyntaxError(`插值为空可能导致 Vue 尝试匹配更长的结果而造成错误`);
			data = unescape(raw.slice(index, insEnd)).trim();
			BAD_INS.test(data) && throwSyntaxError(`插值中存在 CR（后无 LF）、LS（U+2028）、PS（U+2029）会导致 Vue 无法按预期解析`);
			data.includes(delimiters_1) && throwSyntaxError(`对“${delimiters_1}”进行 HTML 实体转义是无效的，因为 Vue 会在解析前解码，jVue 将此视为一种歧义`);
			this[this.length] = data;
			index = insEnd + 2;
		}
		return this;
	}
	
	[Symbol.toPrimitive] (              )         {
		const expression           = [];
		let expression_length = 0;
		let isTemplate          = true;
		let index = 0;
		const { length } = this;
		do {
			const each = this[index++];
			each && ( expression[expression_length++] = isTemplate ? StringLiteral(each) : `(${each})` );
			isTemplate = !isTemplate;
		}
		while ( index!==length );
		return expression.join('+');
	}
	
	* [Symbol.iterator] (              )                              {
		if ( this.#pre ) {
			const data = this[0] ;
			if ( data ) { yield new TextCharacterData(data); }
			return;
		}
		const data = this[0] ;
		if ( data ) { yield new TextCharacterData(data.replace(OPEN_LIKE, escapeOpenLike)); }
		let isTemplate          = false;
		let index = 1;
		const { length } = this;
		while ( index!==length ) {
			const each = this[index++] ;
			if ( isTemplate ) {
				const data = each;
				if ( data ) { yield new TextCharacterData(data.replace(OPEN_LIKE, escapeOpenLike)); }
				isTemplate = false;
			}
			else {
				each.includes('}}') && throwSyntaxError(`插值中不能存在原生结束标记“}}”，因为可能出现“{{ {'}}':{ }} }}”的情况，没有简单的方式进行统一转义`);
				yield new TextCharacterData(each, true);//each[each.length - 1]==='}'
				isTemplate = true;
			}
		}
	}
	
}
freeze(freeze(Mustache).prototype);

const Is = (template                      ) => test.bind(RegExp$1(`^${groupify$1(template[0] .replace(/_/g, '').match(/[\da-zA-Z\-]+/g) )}$`));
const inBlackList = Is`
	undefined
	Infinity NaN
	Intl
	isFinite isNaN
	parseFloat parseInt
	decodeURI decodeURIComponent encodeURI encodeURIComponent
	Math JSON
	Number Date Array Object Boolean String RegExp Map Set
	BigInt
	require
`;
const TRIM = /^\s*\(?|\)?\s*$/g;
const void_elements = RegExp$1(VOID_ELEMENTS, '');
const foreign_elements = RegExp$1(FOREIGN_ELEMENTS, '');
const TEXTAREA_END_TAG = newRegExp$2.i`</textarea${TAG_EMIT_CHAR}`;
const STYLE_END_TAG = newRegExp$2.i`</style${TAG_EMIT_CHAR}`;
//const TITLE_END_TAG = newRegExp.i`</title${TAG_EMIT_CHAR}`;
const TEXTAREA = /^textarea$/i;
const NATIVE_D = /\.(?:native|\d+)(?:$|\.)/;
const V_MODEL_ = /^v-model(?::|(?=\.)(?!(?:\.(?:lazy|number|trim))+$))/;
const VNODE = /^@-?[vV]node/;
const VNODE_EVENT = /^@[vV]node(?:(?:-b|B)efore)?(?:-[a-z]|[A-Z])[a-z]*$/;
const ON_MODIFIER = /^[^.]*(?:capture|once|passive)(?:\.|$)/iu;
const HTML5 = `
	body
	blockquote
	main header footer
	article section nav aside
	h1 h2 h3 h4 h5 h6
	p
	div
	span
`.match(/\S+/g) ;
const HTML_5 = newRegExp$2.i`^${groupify$1(HTML5)}$`.test;
const SVG_MathML = Is`
	annotation-xml
	color-profile
	font-face
	font-face-src
	font-face-uri
	font-face-format
	font-face-name
	missing-glyph
`;
const NON_HTML = /[^\dA-Za-z]/;
///const STARTS_WITH_LETTER = /^[A-Za-z]/;
const startsWithLowerCase = test.bind(/^[a-z]/);
const is = Is`
	base-transition component keep-alive slot suspense teleport template transition transition-group`;
const isCustomElement = (tag        ) => startsWithLowerCase(tag) && !is(tag);
const 不是自定义组件 = test.bind(/^(?:[abd-z]|c(?!omponent$))/);
const 不允许包含插槽模板 = test.bind(/^(?:[abd-rt-z]|c(?!omponent$)|s(?!uspense$))/);
const 避免在PRE下误用的内置标签 = Is`
	                component                 suspense teleport          transition                 `;
const 必须单子的内置标签 = Is`
	base-transition           keep-alive                                 transition                 `;
const 不便变动子的内置标签 = Is`
	base-transition           keep-alive                                 transition transition-group`;
const 是内置标签 = Is`
	base-transition           keep-alive slot suspense teleport template transition transition-group`;
const 可能渲染为片段的内置标签 = Is`
	                                     slot                   template                            `;
const 可能被当作内置标签的自定义组件 = Is`
	Base_Transition Component Keep_Alive      Suspense Teleport          Transition Transition_Group`;
const 跨版本解释不同的内置标签 = Is`
	base-transition                           suspense teleport                                     `;
///	                          Keep_Alive                                 Transition Transition_Group

const checkNameBeing = (xName        , attributes            , is         )       => {
	if ( 'v-html' in attributes && ( xName==='xmp' || xName==='plaintext' || xName==='listing' ) ) {
		throw SyntaxError$1(is
			? `请避免 is 已废弃的 xmp、plaintext 或 listing 元素并在其上使用 v-html，它的实际行为（可能）是 v-text`
			: `请避免在已废弃的 xmp、plaintext 或 listing 标签上使用 v-html，它的实际行为（可能）是 v-text`
		);
	}
	if ( compatible_render ) {
		if ( !foreign_elements.test(xName) && FOREIGN_ELEMENTS.test(xName) ) {
			///compatible_template = false;
			compatible_render = false;
			//throw SyntaxError(is ? `通过 is 属性，也无法避免 SVG 命名空间中的 foreign 元素的大写变种“${xName}”，不被 Vue 2 作为组件对待` : `SVG 命名空间中的 foreign 标签的大写变种“${xName}”，同样不被 Vue 2 作为组件对待`);
		}
	}
};

let html         = '';
let index = 0;

let keys                                 = null;

let partial                 = null;
let partial_with = false;
let partial_with_tagName                = null;

let delimiters_0         = '';
let delimiters_1         = '';

let compatible_template          = true;
let compatible_render          = true;

let sheet = new Map$1                ();
const REF = /^#[a-z]\w*#$/i;
const Ref = ($ref$        ) => {
	if ( !REF.test($ref$) ) { throw Error$1(`${$ref$} 格式不符合预期`); }
	const ref = $ref$.slice(1, -1);
	if ( sheet.size===sheet.set(ref, '').size ) { throw Error$1(`出现了重复的同步样式表名“#${ref}#”`); }
	if ( compatible_render || compatible_template ) {
		compatible_render = false;
		compatible_template = false;
	}
	return ref;
};

let shadow_name         = '';
let shadow_hasNames          = false;
const shadow_names = new Set$1        ();
const SHADOW = theRegExp$1   (/^#([a-z]\w*)(?:(\.)([a-z]\w*))?#$/i).exec;
const Shadow = ($name_names$        ) => {
	const { 1: name, 2: hasNames = '', 3: names = '' } = SHADOW($name_names$) ?? throwError(`${$name_names$} 格式不符合预期`);
	if ( shadow_name ) {
		if ( name!==shadow_name ) { throw Error$1(`不支持多路径 shadow，请使用子命名区分`); }
		( shadow_hasNames = !!hasNames ) && shadow_names.add(names);
	}
	else {
		shadow_name = name ;
		if ( !hasNames===shadow_hasNames ) { throw Error$1(`不能既访问子命名 shadow，又访问简单 shadow`); }
		if ( shadow_hasNames && shadow_names.size===shadow_names.add(names).size ) { throw Error$1(`出现了重复的 shadow“${$name_names$}”`); }
	}
	if ( compatible_render || compatible_template ) {
		compatible_render = false;
		compatible_template = false;
	}
	return name + hasNames + names;
};

const isSingleElementChild = (firstChild                ) => {// | null throw Error(`从 Vue 2 开始，组件的根节点不得为空`);
	let child              = firstChild;
	do {
		if ( !isElement(child) ) { return false; }//throw Error(`Vue 2 要求组件的根节点必须是元素节点`);
		if ( !( 'v-pre' in child.attributes ) ) {
			if ( 可能渲染为片段的内置标签(child.localName) ) { return false; }//throw Error(`Vue 2 不允许组件的根节点为 template 或 slot 元素`);
		}
	}
	while ( ( child = child.nextSibling ) );
	let { attributes } = firstChild           ;
	child = firstChild.nextSibling;
	if ( child ) {
		if ( !( 'v-if' in attributes ) || 'v-pre' in attributes || 'v-for' in attributes ) { return false; }//throw Error(`Vue 2 只允许组件存在一个根节点`);
		while ( child.nextSibling ) {
			( { attributes } = child            );
			if ( !( 'v-else-if' in attributes ) || 'v-pre' in attributes || 'v-for' in attributes ) { return false; }//throw Error(`Vue 2 只允许组件存在一个根节点`);
			child = child.nextSibling;
		}
		( { attributes } = child            );
		if ( !( 'v-else-if' in attributes ) && !( 'v-else' in attributes ) || 'v-pre' in attributes || 'v-for' in attributes ) { return false; }//throw Error(`Vue 2 只允许组件存在一个根节点`);
	}
	else {
		if ( 'v-for' in attributes && !( 'v-pre' in attributes ) ) { return false; }//throw Error(`Vue 2 不允许组件的根节点是 v-for 节点`);
	}
	return true;
};

const parseAppend = (parentNode_XName        , parentNode                   , V_PRE         , FOREIGN         , V_FOR         , requireKey         ) => {
	let lastChild                        = null;
	for ( ; ; ) {
		const tag = Tag(html, index, FOREIGN, !V_PRE);
		const { type } = tag;
		if ( type===EOF ) {
			if ( parentNode_XName ) { throw SyntaxError$1(`template 块中存在未关闭的 ${parentNode_XName} 标签`); }
			index = tag.end;
			break;
		}
		if ( type===TEXT ) {
			for ( const text of new Mustache(tag.raw , V_PRE, delimiters_0, delimiters_1) ) {
				parentNode.afterAppend(lastChild, lastChild = text);
			}
			index = tag.end;
			continue;
		}
		if ( type===COMMENT$1 ) {
			index = tag.end;
			continue;
		}
		const XName = tag.xName ;
		if ( type===ELEMENT_END ) {
			if ( XName!==parentNode_XName ) {
				throw SyntaxError$1(parentNode_XName
					? `在 ${parentNode_XName} 配对的结束标签出现前，出现了预期外的结束标签“</${XName}>”`
					: `template 块中凭空出现了“</${XName}>”结束标签`
				);
			}
			index = tag.end;
			if ( V_PRE ) { break; }
			const { localName } = parentNode           ;
			if ( 必须单子的内置标签(localName) ) {
				if ( localName==='keep-alive' ) {
					const { firstChild } = parentNode;
					if ( firstChild ) {
						if ( !firstChild.nextSibling && 'localName' in firstChild && firstChild.localName==='transition' ) {
							throw SyntaxError$1(`根据官方示例，transition 应当套在 keep-alive 外面，而不是里面`);
						}
						if ( isSingleElementChild(firstChild) ) { break; }
					}
				}
				else {
					const { firstChild } = parentNode;
					if ( firstChild && isSingleElementChild(firstChild) ) { break; }
				}
				throw SyntaxError$1(`${localName} 只能包含一个元素子节点`);
			}
			break;
		}
		let xName         = XName;
		let __class__                    ;
		const attributes             = tag.attributes ;
		const v_pre          = V_PRE || 'v-pre' in attributes;
		if ( partial ) {
			let alias = XName;
			///let addOn = '';
			///if ( XName.includes('.') ) {
			///	const _ = XName.split('.');
			///	alias = _[0];
			///	addOn = ' ' + _.slice(1).join(' ');
			///}
			if ( startsWithUpperCase(alias) ) {
				if ( alias in partial ) {
					const _ = partial[alias] ;
					xName = _.tagName ?? alias;
					__class__ = _.class;/// + addOn;
					const { attrs } = _;
					for ( let name in attrs ) {
						if ( name[0]==='$' ) {
							name = name.slice(1);
							if ( name in attributes ) {
								const add = attrs['$' + name];
								const old = attributes[name];
								attributes[name] = add
									? old
										? add + ' ' + old
										: add
									: old
										? old
										: add ?? old;
							}
							else {
								if ( !v_pre && ':' + name in attributes ) { throw Error$1(`标签已存在属性“:${name}”`); }
								attributes[name] = attrs['$' + name];
							}
						}
						else {
							if ( name in attributes ) { throw Error$1(`标签已存在属性“${name}”`); }
							if ( !v_pre && ':' + name in attributes ) { throw Error$1(`标签已存在属性“:${name}”`); }
							attributes[name] = attrs[name];
						}
					}
				}
				else if ( partial_with && NameIs__Key__(alias) ) {
					xName = partial_with_tagName ?? alias;
					__class__ = `__${alias}__`;/// + addOn;
				}
			}
		}
		
		if ( compatible_template && NS3.test(xName) ) { compatible_template = false; }
		
		const notComponent = 不是自定义组件(xName);
		if ( notComponent ) {
			let afterColon = xName;
			const index = xName.indexOf(':');
			if ( index>0 ) {
				throw Error$1(`HTML 规范不支持 XML 中的标签命名空间语法，因此“${xName}”既不是一个原生标签，也不是一个自定义元素名（如果这是一个组件，请避免使用小写字母开头）`);
				///if ( xName.lastIndexOf(':')!==index ) { throw Error(`“${xName}”中含有多个“:”，并不是一个合格的标签名`); }
				///if ( NON_PCENChar.test(xName.slice(0, index)) ) { throw Error(`“${xName}”的命名空间中含有不符合限定的字符，并不是一个合格的标签名`); }
				///afterColon = xName.slice(index + 1);
				///if ( !STARTS_WITH_LETTER.test(afterColon) ) { throw Error(`“${xName}”的后半部分没有以字母开头，并不是一个合格的原生标签或自定义元素名`); }
			}
			if ( afterColon.includes('-') ) {
				if ( NON_PCENChar.test(afterColon) ) { throw Error$1(`“${xName}”${index>0 ? '的后半部分' : ''}中含有不符合限定的字符，并不是一个合格的自定义元素名（如果这是一个组件，请避免使用小写字母开头）`); }
				///if ( compatible_template && xName!=='color-profile' ) { compatible_template = false; }
			}
			else {
				if ( NON_HTML.test(afterColon) ) { throw Error$1(`HTML 原生标签中不会包含“${xName}”${index>0 ? '的后半部分' : ''}这种含有特殊字符的元素名（如果这是一个组件，请避免使用小写字母开头）`); }
			}
		}
		if ( xName==='script' ) { throw SyntaxError$1(`Vue 不允许 template 中存在 script 标签`); }
		const v_for          = !v_pre && ( V_FOR || 'v-for' in attributes );
		const lackKey          = !v_pre && !( 'key' in attributes ) && !( ':key' in attributes );
		const v_if          = 'v-if' in attributes || 'v-else' in attributes || 'v-else-if' in attributes;
		const isTemplate          = xName==='template';
		let sheetRef                                                         = null;
		let shadowRoot                                                           = null;
		if ( v_pre ) {
			_asClass (attributes, keys, true);
			if ( xName==='slot' ) { throw SyntaxError$1(`v-pre 模式下的 slot 元素在 Vue 2 与 3 中存在歧义，而且无论哪种都没有实际使用意义，请避免使用`); }
			if ( isTemplate ) { throw SyntaxError$1(`v-pre 模式下的 slot 元素在 Vue 2 与 3 中存在歧义，请避免使用`); }///
			//Vue3: if ( xName==='component' && 'is' in attributes ) { throw SyntaxError(`v-pre 模式下的 ${xName} 元素的 is 属性在 Vue 3 中会被忽略（实际上 ${xName} 并不是一个浏览器内置元素，也不是合格的自定义元素名），请避免使用`); }
			if ( 避免在PRE下误用的内置标签(xName) ) { throw Error$1(`请避免在 v-pre 下使用 ${xName}（它既不是浏览器内置元素，也不是合格的自定义元素）`); }
			if ( !notComponent ) { throw Error$1(`请避免在 v-pre 下使用组件名（如果“${xName}”不是一个组件，请避免使用大写字母开头）`); }
			if ( !V_PRE ) {
				///if ( isTemplate ) { throw SyntaxError(`从自身开始带有 v-pre 指令的 template 元素，在 Vue 2 与 3 中存在歧义，且没有必要，请避免使用`); }///if ( compatible_template ) { compatible_template = false; }
				/// ^base-transition
				if ( 'v-for' in attributes ) { throw SyntaxError$1(`从自身开始带有 v-pre 指令的 v-for 元素在 Vue 2 与 3 中存在歧义，请避免使用`); }///
				if ( 'v-else-if' in attributes || 'v-else' in attributes ) { throw SyntaxError$1(`从自身开始带有 v-pre 指令且具有 v-else-if/v-else 属性的元素在 Vue 3 中会带上 v-pre 属性，且这没有意义，请避免使用`); }
			}
			if ( compatible_template ) { for ( const name in attributes ) { if ( name.includes('\\') ) { compatible_template = false; } } }
			//for ( const name in attributes ) { if ( name[0]==='_' /*:_*/ ) { throw ReferenceError(`“_”开头的 attr 可能无法按预期工作`); } }
		}
		else {
			if ( compatible_render && requireKey && lackKey && !isTemplate && xName!=='slot' ) { compatible_render = false; }
			if ( 'v-is' in attributes ) { throw SyntaxError$1(`v-is 是 Vue 3 新增的内置指令，在单文件组件模板中不可能需要被用到；在 Vue 2 中也请避开使用`); }
			if ( xName==='component' ) {
				if ( ':is.camel' in attributes ) { throw ReferenceError$1(`${xName} :is.camel 在 Vue 2 和 3 中存在歧义，请避免使用`); }
				if ( ':is' in attributes ) ;
				else if ( 'is' in attributes ) { checkNameBeing(attributes['is'] , attributes, true); }
				else { throw SyntaxError$1(`${xName} 组件不能缺少 is 属性`); }
			}
			else {
				if ( ':is' in attributes || 'is' in attributes ) { throw ReferenceError$1(`非 component 的 is 属性在 Vue 2、3 之间解释不同，请避免使用（或使用 :is.camel 来让 Vue 2 中获得与 Vue 3 中一致的行为）`); }
				checkNameBeing(xName, attributes, false);
			}
			if ( 'inline-template' in attributes ) { throw Error$1(`jVue 不支持包含 inline-template 的模板编译，且该功能在 Vue 3 中已经被废弃`); }
			if ( 'v-cloak' in attributes ) { throw SyntaxError$1(`单文件组件模板中不可能用到 v-cloak 指令`); }
			if ( 'v-for' in attributes ) {
				if ( !notComponent && lackKey ) {
					throw SyntaxError$1(`v-for 用在组件上时必须具有 key 属性` + ( xName==='component' ? '' : `（如果“${xName}”不是一个组件，请避免使用大写字母开头）` ));
				}
				const value = attributes['v-for'] ;
				const index = value.search(forAliasRE);
				if ( index<0 ) { throw SyntaxError$1(`“v-for="${value}"”的格式有误`); }
				Params(value.slice(0, index).replace(TRIM, ''), 1, 3, `“v-for="${value}"”中的“of/in”前`);
			}
			if ( v_for && 'ref' in attributes ) { throw SyntaxError$1(`Vue 3 不再支持在有 v-for 的标签及其内部标签上设置 ref，请用 :ref 模式代替`); }
			if ( xName==='slot' ) {
				if ( 'name' in attributes ) {
					if ( !attributes['name'] ) {
						throw ReferenceError$1(attributes['name']===EMPTY
							? `slot name 必须有值，否则在 Vue 2 和 3 之间存在歧义`
							: `slot name="" 应该是误用，因为 v-slot: 是不可行的`
						);
					}
					if ( BAD_SLOT_NAME.test(attributes['name']) ) { throw ReferenceError$1(`“$”或“_”开头的 slot name 可能无法按预期工作`); }
				}
				for ( let name in attributes ) {
					if ( compatible_template && name.includes('\\') ) { compatible_template = false; }
					const bind = name[0]===':';
					if ( bind ) {
						if ( name.includes('.') ) { throw SyntaxError$1(`Vue 3 中 v-bind: 已不再支持 .prop、.sync 修饰符，而单文件组件模板中又没有使用 .camel 的必要，因此请不要包含“.”修饰符内容`); }
						name = name.slice(1);
					}
					else if ( name.startsWith('v-') && !SLOT_DIRECTIVE.test(name) || name[0]==='@' || name[0]==='#' ) {
						throw SyntaxError$1(`slot 组件上除 v-pre、v-once、v-for、v-if、v-else-if、v-else 和 v-bind 以外的指令都会被忽略，如果想要绑定 ${name} 为作用域属性，请使用 v-bind:${name}`);
					}
					if ( name===BAD_SCOPE ) { throw ReferenceError$1(`使用“${BAD_SCOPE}”作为 scope 无法按预期工作`); }
					if ( name==='key' || name==='ref' ) { throw SyntaxError$1(`${name}（key、ref）在 Vue 2 slot 组件上是无效的${bind ? '，即便使用 v-bind: 结果也是一样' : ''}`); }
				}
			}
			else {
				_asClass (attributes, keys, false);
				if ( compatible_template ) {
					if ( 'v-model' in attributes && ( xName==='select' || xName==='input' && attributes['type']==='checkbox' ) ) { compatible_template = false; }
					else if ( 可能被当作内置标签的自定义组件(xName) ) { compatible_template = false; }
				}
				if ( compatible_render ) {
					if ( 跨版本解释不同的内置标签(xName) || isTemplate && !lackKey ) { compatible_render = false; }
				}
				{
					if ( 'slot' in attributes || ':slot' in attributes ) { throw SyntaxError$1(`slot 已被 v-slot 取代（如果只是碰巧重名，请使用 :slot.camel）`); }
					if ( 'slot-scope' in attributes ) { throw SyntaxError$1(`slot-scope 已被 v-slot 取代（如果只是碰巧重名，请使用 slotScope 或 :slot-scope）`); }
					if ( 'scope' in attributes && isTemplate ) { throw SyntaxError$1(`template scope 已被 v-slot 取代`); }
				}
				let already = '';
				for ( let name in attributes ) {
					if ( compatible_template && name.includes('\\') ) { compatible_template = false; }
					switch ( name[0] ) {
						case '@':
							if ( name[1]==='_' ) { throw ReferenceError$1(`“_”开头的 listener 可能无法按预期工作`); }
							{
								if ( NATIVE_D.test(name) ) { throw Error$1(`Vue 3 中 v-on 已不再支持 .native、键位数字修饰符`); }
								if ( VNODE.test(name) ) {
									if ( !VNODE_EVENT.test(name) ) { throw Error$1(`以 vnode 起始的“${name}”可能是 Vue 3 中新增的内置事件，它需要通过大写或连字符正确断词`); }
								}
								else {
									if ( ON_MODIFIER.test('on' + name.slice(1)) ) { throw Error$1(`Vue 3 中事件名不应以 capture、once、passive 结尾以免与 .capture、.once、.passive 修饰符编译的结果混淆`); }
								}
							}
							if ( compatible_template ) {
								const value = attributes[name];
								if ( value!==EMPTY && NON_ASCII_SIMPLE_PATH.test(value) ) { compatible_template = false; }
							}
							break;
						case '#':
							if ( already ) { throw SyntaxError$1(`不能同时存在多个插槽指令“${already}”和“${name}”`); }
							if ( name[name.length - 1]==='#' ) {
								if ( notComponent ) { if ( 是内置标签(xName) ) { throw Error$1(`jVue 借用了插槽缩写语法表示 Shadow DOM / 同步样式表，并以“#”结尾加以区分，该功能不能用在 ${xName} 标签上`); } }
								else { throw Error$1(`jVue 借用了插槽缩写语法表示 Shadow DOM / 同步样式表，并以“#”结尾加以区分，该功能不能用在组件标签${xName==='component' ? ` ${xName} 上` : `上（如果 ${xName} 不是组件，请避免使用大写字母开头）`}`); }
								if ( xName.includes('-') ? SVG_MathML(xName) : !HTML_5(xName) && xName!=='style' ) { throw Error$1(`HTML 原生标签中，只有 ${HTML5.join('、')} 支持 Shadow DOM，其中不包括“${xName}”，而同步样式表功能也只支持 style 标签`); }
								if ( attributes[name]!==EMPTY ) { throw Error$1(`jVue 借用了插槽缩写语法表示 Shadow DOM / 同步样式表，并以“#”结尾加以区分，该功能不支持属性值`); }
								if ( v_for ) { throw Error$1(`jVue 的 Shadow DOM / 同步样式表功能不支持在 v-for 内使用`); }
								if ( xName==='style' ) {
									if ( 'ref' in attributes || ':ref' in attributes ) { throw Error$1(`jVue 的同步样式表的功能需要借助 ref 属性实现，因此该 style 标签上不能已经存在 ref 或 :ref 属性`); }
									if ( 'v-text' in attributes || 'v-html' in attributes ) { throw Error$1(`jVue 的同步样式表功能将代理 style 的 textContent，因此标签上出现 v-text 或 v-html 是不合理的`); }
									sheetRef = { name, ref: Ref(name) };
								}
								else { shadowRoot = { name, along: Shadow(name) }; }
							}
							else {
								if ( name.includes('.') && !name.includes('[') ) { throw SyntaxError$1(`v-slot 名字面量中不能含有“.”，因为这会造成解析歧义`); }
								const value = attributes[name];
								if ( isTemplate ) {
									if ( !parentNode_XName ) { throw Error$1(`插槽所在的 template 必须位于组件标签内`); }
									if ( 不允许包含插槽模板(( parentNode            ).localName) ) {
										throw Error$1(`插槽所在的 template 必须位于组件标签的根层` + ( 是内置标签(( parentNode            ).localName) ? `` : `（如果 ${( parentNode            ).localName} 是组件，则请避免使用小写字母开头）` ));
									}
								}
								else {
									if ( 不允许包含插槽模板(xName) ) { throw Error$1(`插槽只能出现在 template 或组件上` + ( 是内置标签(xName) ? `` : `（如果 ${xName} 是组件，则请避免使用小写字母开头）` )); }
									if ( name!=='#default' ) { throw SyntaxError$1(`具名插槽只能出现在 template 上`); }
									if ( value===EMPTY ) { throw Error$1(`无值的默认插槽 v-slot 指令没有必要显式地写在组件上`); }
								}
								if ( value===emptySlotScopeToken ) { throw ReferenceError$1(`“${emptySlotScopeToken}”是保留字，编译结果相当于留空`); }
								value===EMPTY ||
								Params(value, 0, 1, `${name}="${value}"中`);
								if ( BAD_V_SLOT_NAME.test(name) ) { throw ReferenceError$1(`“$”或“_”开头的 slot name 可能无法按预期工作`); }
							}
							already = name;
							break;
						case ':':
							if ( name.includes('.') && name!==':slot.camel' ) { throw SyntaxError$1(`Vue 3 中 v-bind: 已不再支持 .prop、.sync 修饰符，而单文件组件模板中又没有使用 .camel 的必要，因此请不要包含“.”修饰符内容`); }
							//if ( name[1]==='_' ) { throw ReferenceError(`“_”开头的 attr 可能无法按预期工作`); }
							if ( name.startsWith(':on') ) { throw ReferenceError$1(`Vue 3 中合并了 listeners 和 attrs 的通道，因此 attrs 的内容不能以 on 起始`); }
							break;
						default:
							//if ( name[0]==='_' ) { throw ReferenceError(`“_”开头的 attr 可能无法按预期工作`); }
							if ( name.startsWith('on') ) { throw ReferenceError$1(`Vue 3 中合并了 listeners 和 attrs 的通道，因此 attrs 的内容不能以 on 起始`); }
							if ( notComponent ) {
								if ( V_MODEL_.test(name) ) { throw SyntaxError$1(`只有组件上的 v-model 才能附带 :arg 参数或自定义修饰符`); }
							}
							else {
								if ( compatible_render && V_MODEL_.test(name) ) { compatible_render = false; }
							}
							break;
					}
				}
				if ( isTemplate && !v_if && !already && !( 'v-for' in attributes ) ) {
					throw SyntaxError$1(`应当避免没有 v-if/v-else-if/v-else/v-for/v-slot 指令的 template 元素，这在 Vue 2 与 3 中存在歧义，且没有必要`);
				}
				if ( sheetRef ) {
					delete attributes[sheetRef.name];
					attributes['ref'] = sheetRef.ref;
				}
				else if ( shadowRoot ) { delete attributes[shadowRoot.name]; }
				if ( attributes['key']===BAD_KEY ) { throw ReferenceError$1(`使用“${BAD_KEY}”作为 key 无法按预期工作`); }
				if ( attributes['ref']===BAD_REF ) { throw ReferenceError$1(`使用“${BAD_REF}”作为 ref 无法按预期工作`); }
			}
			if ( v_if ) {
				if ( 'v-if' in attributes ) {
					if ( 'v-for' in attributes ) { throw Error$1(`v-if 和 v-for 等的优先级在 Vue 2 和 3 中不同，请避免同时使用`); }///
					if ( 'v-else-if' in attributes || 'v-else' in attributes ) { throw SyntaxError$1(`v-if/v-else-if/v-else 一次只能出现一个`); }
				}
				else {
					if ( 'v-else-if' in attributes && 'v-else' in attributes ) { throw SyntaxError$1(`v-if/v-else-if/v-else 一次只能出现一个`); }
				}
			}
		}
		if ( compatible_template && xName==='style' && !STYLE_BY_COMPONENT_IS ) { compatible_template = false; }
		parentNode.afterAppend(lastChild, lastChild = xName==='style'
			? new RawTextElement(
				'style',
				attributes,
				__class__,
			)
			: new Element(
				xName,
				attributes,
				__class__,
				shadowRoot && {
					along: shadowRoot.along,
					inside: !parentNode_XName || 不便变动子的内置标签(( parentNode            ).localName),
				},
			)
		);
		index = tag.end;
		if ( type===ELEMENT_SELF_CLOSING ) { continue; }
		if ( void_elements.test(xName) ) { throw SyntaxError$1(`template 文件中如果出现 HTML void 元素（小写；即便已经过时、废弃或是非标准），宜添加自闭合斜线以避免歧义`); }
		const foreign          = FOREIGN || xName==='svg' || xName==='math';
		if ( !html.startsWith('</', index) ) {
			if ( LISTING.test(xName) ) {
				throw SyntaxError$1(xName==='listing'
					? `已过时的 listing 标签内容处理方式不定，除非自闭合或内容为空，否则不应用于 .vue 文件（真需要时，考虑使用“<${xName} v-text="\`...\`" />”）`
					: `已过时的 ${xName} 标签内容处理方式不定，除非自闭合或内容为空，否则（无论大小写变种）均不应用于 .vue 文件（真需要时，考虑使用“<component is="${xName}">...</component>”）`
				);
			}
			if ( PLAINTEXT.test(xName) || XMP.test(xName) || XMP.test(XName) && ( xName = XName ) ) {
				const text = xName==='plaintext' || xName==='xmp';
				throw SyntaxError$1(
					`已${PLAINTEXT.test(xName) ? '过时' : '废弃'}的 ${xName} 标签${text ? '' : '（不论大小写）'}被开放式使用时，需将内容完全按原状对待，` +
					`jVue 虽可以模拟这一行为、避免被 Vue 按标签嵌套模式解析，但由于缺乏相关约定，不确定如何对待${text ? `插值和空白` : ''}，所以无法处理` +
					`（真需要时，考虑使用“${text ? `<${xName} v-text="\`...\`" />` : `<component is="${xName}">...</component>`}”）`
				);
			}
			if ( RAW_TEXT_ELEMENTS.test(XName)!==RAW_TEXT_ELEMENTS.test(xName) ) { throw SyntaxError$1(`由于存在内容解析歧义，开放式标签名和其简写不能一个是原始文本元素，而另一个不是`); }// xmp plaintext listing
			if (
				(
					TEXTAREA.test(XName)// || XName==='title'
				)!==(
					TEXTAREA.test(xName)// || xName==='title'
				)
			) { throw SyntaxError$1(`由于存在内容解析歧义，开放式标签名和其简写不能一个是可转义原始文本元素，而另一个不是`); }
			if ( RAW_TEXT_ELEMENTS.test(xName) && xName!=='style' || TEXTAREA.test(xName) && xName!=='textarea' ) {
				throw SyntaxError$1(
					`Vue 2 不会将 textarea、style 或 script 的任何大写变种理解为正常标签嵌套，而是会剔除其内容中的标签、解除 HTML 实体转义后，作为文本内容理解，` +
					`jVue 虽可对其进行转写，但由于缺乏约定（就连 Vue 2 本身的这种行为，也是一种边缘情况，既谈不上合理，也不能保证一直如此对待，甚至没有在文档中言明），` +
					`并不知道该往什么方向进行（真需要时，考虑使用“<component is="${xName}">...</component>”）`
				);
			}
			if ( !v_pre && ( 'v-text' in attributes || 'v-html' in attributes ) ) { throw SyntaxError$1(`开放式标签，除非自身或外层节点有 v-pre 指令，否则不能再设置 v-text 或 v-html 指令`); }
			if ( xName==='iframe' || xName==='noscript' || xName==='noembed' || xName==='noframes' ) { throw Error$1(`在支持 Vue 运行的环境下，不应有用 ${xName} 标签来包含内容的需要，因此暂未开启兼容转写功能支持`); }
			// <pre>\n
			if (
				xName==='textarea' || xName==='style'// || xName==='title'
			) {
				let endTagStart = html.slice(index).search(
					xName==='textarea' ? TEXTAREA_END_TAG :
						xName==='style' ? STYLE_END_TAG :
							//xName==='title' ? TITLE_END_TAG :
							null         
				);
				if ( endTagStart<0 ) { throw SyntaxError$1(`template 块中存在未关闭的 ${XName} 标签`); }
				endTagStart += index;
				const inner = html.slice(index, endTagStart);
				if ( xName==='style' ) {
					if ( v_pre ) { ( lastChild                   ).textContent = minify(inner); }
					else {
						const expression         = '' + new Mustache(inner, v_pre, delimiters_0, delimiters_1);
						if ( expression ) {
							sheetRef
								? sheet.set(sheetRef.ref, expression)
								: attributes['v-text'] = expression;
						}
					}
				}
				else {
					const mustache = new Mustache(inner, v_pre, delimiters_0, delimiters_1);
					if ( mustache.length!==1 && xName==='textarea' ) { throw Error$1(`有插值的 textarea 标签这种用例没有意义`); }
					if ( v_pre ) {
						for ( const text of mustache ) {
							lastChild.afterAppend(null, text);
						}
					}
					else {
						const expression = '' + mustache;
						if ( expression ) { attributes['v-text'] = expression; }
					}
				}
				const tag = Tag(html, index = endTagStart, foreign);
				if ( tag.xName!==XName ) { throw SyntaxError$1(`${XName} 的结束标记 ${html.slice(endTagStart, tag.end)} 不符合严谨性预期`); }
				index = tag.end;
				continue;
			}
		}
		parseAppend(XName, lastChild, v_pre, foreign, v_for, compatible_render && lackKey && notComponent && xName!=='slot' && ( requireKey || 'v-for' in attributes || v_if ));// 不需要改循环实现，因为层数多了 Vue 本身也会爆栈。
	}
};

class Content extends Node {
	
	get [Symbol.toStringTag] () { return 'SFC.Template.Content'; }
	
	constructor (inner        , _         ) {
		if ( !inner ) { return super()                   ; }
		if ( NON_SCALAR.test(inner) ) { throw Error$1(`HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
		if ( NONCHARACTER.test(inner) ) { throw Error$1(`HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER.test(inner) ) { throw Error$1(`HTML 字符流中禁止出现除 NUL 空（U+00）、TAB 水平制表（U+09）、LF 换行（U+0A）、FF 换页（U+0C）、CR 回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		delimiters_0 = _.delimiters_0;
		delimiters_1 = _.delimiters_1;
		if ( _.keys ) {
			keys = create(NULL)                           ;
			for ( const key of _.keys ) { keys[key] = null; }
		}
		partial = _.abbr ?? null;
		partial_with = partial ? '' in partial : false;
		if ( partial_with ) { partial_with_tagName = partial [''] .tagName; }
		html = inner;
		index = 0;
		compatible_template = true;
		compatible_render = true;
		super();
		try {
			parseAppend('', this, false, false, false, false);
			if ( sheet.size ) {
				for ( const expression of sheet.values() ) {
					if ( expression ) {
						_.sheet = sheet;
						break;
					}
				}
				sheet = new Map$1;
			}
			if ( shadow_name ) { _.shadow = shadow_hasNames ? [ shadow_name, ...shadow_names ].join('.') : shadow_name; }
		}
		catch (error) {
			sheet = new Map$1;
			error.message = `${error.message}：\n${Snippet(inner, index)}`;
			throw error;
		}
		finally {
			keys = partial = partial_with_tagName = null;
			html = '';
			if ( shadow_name ) {
				shadow_name = '';
				shadow_names.clear();
			}
		}
		if ( !compatible_template ) { this.#compatible_template = false; }
		if ( !compatible_render ) { this.#compatible_render = false; }
		return this;
	}
	
	         #compatible_template          = true;
	         #compatible_render          = true;
	get _compatible_template () { return this.#compatible_template; }
	get _compatible_render () { return this.#compatible_render && this.firstChild && isSingleElementChild(this.firstChild); }// Vue2: isVue2Compatible
	
	[Symbol.toPrimitive] (             ) {
		let child = this.firstChild;
		let outerHTML = '';
		if ( child ) {
			outerHTML += child;
			if ( outerHTML[0]==='#' ) { outerHTML = '&#35;' + outerHTML.slice(1); }
			while ( ( child = child.nextSibling ) ) { outerHTML += child; }
		}
		return outerHTML;
	}
	
	* beautify (tab         = '\t')                                {
		let child = this.firstChild;
		while ( child ) {
			yield * child.beautify(tab);
			child = child.nextSibling;
		}
	}
	
}
freeze(freeze(Content).prototype);

const TEMPLATE_END_TAG = newRegExp$2.i`</template${TAG_EMIT_CHAR}`;
const HTML = newRegExp$2.i`^(?:HTML|${ASCII_WHITESPACE}*text/html${ASCII_WHITESPACE}*)$`;

class Template extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.Template'; }
	
	constructor (attributes            , inner                    ) {
		
		if ( inner!==undefined$1 && attributes.lang && !HTML.test(attributes.lang) ) {
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError$1(`.vue 文件的 template 块（非 html 状态下）中，存在标签语法标记，这可能模糊正常结束判定的结果`); }
			super('template', attributes, true, inner, TEMPLATE_END_TAG);
		}
		else {
			super('template', attributes, true, inner, null);
		}
		
		if ( 'functional' in attributes ) {
			throw Error$1(`jVue 暂未支持编译 functional template，因为无法设想这种实际场景，从而也无法进行相应的功能设计，且该功能在 Vue 3 中已经被废弃`);
			//if ( attributes.functional!==EMPTY ) { throw SyntaxError(`template 功能块元素的 functional 属性必须是空属性`); }
			//_this.functional = true;
		}
		
		const _this          = _.new(this);
		
		if ( '.keys' in attributes ) {
			const _keys = attributes['.keys'];
			if ( _keys===EMPTY ) { throw SyntaxError$1(`template 功能块的 .keys 属性必须具有值`); }
			const keys = _keys.match(KEYS);
			if ( !keys ) { throw SyntaxError$1(`template 功能块的 .keys 属性值未匹配到可用的内容`); }
			_this.keys = keys;
		}
		
		_this.abbr = forTemplate(attributes);
		
		let notYet = true;
		for ( const name in attributes ) {
			if ( name.startsWith('.delimiters:') ) {
				if ( !notYet ) { throw SyntaxError$1(`template 功能块只能存在一个 .delimiters:* 格式的属性`); }
				notYet = false;
				const delimiters = attributes[name];
				if ( !delimiters ) { throw SyntaxError$1(`template 功能块的 ${name} 属性值不得为空`); }
				const { 0: delimiters_0, 1: delimiters_1, length } = delimiters.split(name.slice(12));
				if ( !delimiters_0 || !delimiters_1 || length!==2 ) { throw SyntaxError$1(`template 功能块的 ${name}="${attributes[name]}" 属性存在语法错误`); }
				_this.delimiters_0 = delimiters_0;
				_this.delimiters_1 = delimiters_1;
			}
		}
		if ( notYet ) {
			_this.delimiters_0 = DELIMITERS_0;
			_this.delimiters_1 = DELIMITERS_1;
		}
		
		return this;
		
	}
	
	get content ()          {
		const _this          = _(this);
		let inner                     = _this.innerHTML;
		if ( inner===undefined$1 ) {
			inner = this.inner;
			if ( typeof inner!=='string' ) { throw Error$1(`自闭合的 template 功能块元素必须自行加载 src 属性所要求的 inner 值`); }
			if ( this.lang && !HTML.test(this.lang) ) { throw Error$1(`template 功能块元素如果设置了非 html 的 lang 属性值，那么必须自行提供转译后的 innerHTML`); }
			_this.cache = inner;
		}
		if ( _this.content && _this.cache===inner ) { return _this.content; }
		const content = new Content(inner, _this);
		_this.content = content;
		_this.cache = inner;
		return content;
	}
	
	get innerHTML ()         { return '' + this.content; }
	set innerHTML (value        ) {
		if ( typeof ( value            )!=='string' ) { throw TypeError$1(`innerHTML 只能被赋值字符串`); }
		_(this).innerHTML = value;
	}
	
}
freeze(freeze(Template).prototype);

class CustomBlock extends Block {
	
	get [Symbol.toStringTag] () { return 'SFC.CustomBlock'; }
	
	constructor (blockName        , attributes            , inner                    ) {
		if ( inner===undefined$1 ) {
			return super(blockName, attributes, false, inner, null)                   ;
		}
		else {
			if ( ESCAPABLE_RAW_TEXT_ELEMENTS.test(blockName) ) { throw SyntaxError$1(`.vue 文件中的自定义块尚没有明确的语义约定，请避免使用 textarea / title 标签及其大小写变种`); }
			if ( TAG_LIKE.test(inner) ) { throw SyntaxError$1(`.vue 文件的 ${blockName} 自定义块中，存在标签语法标记，这可能模糊正常结束判定的结果`); }
			return super(blockName, attributes, false, inner, RegExp$1(`^</${blockName}${TAG_EMIT_CHAR}`, 'i'))                   ;
		}
	}
	
}
freeze(freeze(CustomBlock).prototype);

const SCRIPT_STYLE_TEMPLATE = /^(?:script|style|template)$/i;
const NON_EOL = /[^\n\r\u2028\u2029]+/g;
const NON_TAB = /[^\t ]/g;
const parseComponent = (sfc     , vue        )       => {
	
	const eol = sfc.eol || '\n';
	const eol_0 = eol[0] ;
	const eol_length = eol.length;
	
	let index = 0;
	
	try {
		for ( const { length } = vue; index!==length; ) {
			
			if ( vue[index]===eol_0 ) {
				index += eol_length;
				continue;
			}
			
			const tag = Tag(vue, index);
			switch ( tag.type ) {
				case COMMENT$1:
					index = tag.end;
					continue;
				case TEXT:
					throw SyntaxError$1(`.vue 文件中出现了未经标签包裹的“${tag.raw}”`);
				case ELEMENT_END:
					throw SyntaxError$1(`.vue 文件中凭空出现了“</${tag.xName}>”结束标签`);
			}
			
			const blockName         = tag.xName ;
			switch ( blockName ) {
				case 'script':
					if ( 'setup' in tag.attributes  ? sfc.scriptSetup : sfc.script ) { throw SyntaxError$1(`一个 .vue 文件中只能有一个 script${'setup' in tag.attributes  ? ' setup' : ''} 块`); }
					break;
				case 'template':
					if ( sfc.template ) { throw SyntaxError$1(`一个 .vue 文件中只能有一个 template 块`); }
					break;
				case 'style':
					break;
				default:
					if ( SCRIPT_STYLE_TEMPLATE.test(blockName) ) { throw SyntaxError$1(`.vue 文件顶层的非全小写 script / style / template 标签存在歧义，请避免使用`); }
					break;
			}
			
			let INDEX = index;
			index = tag.end;
			
			let inner                    ;
			if ( tag.type===ELEMENT_START ) {
				if ( index===length ) { throw SyntaxError$1(`开始标签后缺少结束标签“</${blockName}>”`); }
				if ( vue[index]===eol_0 ) {
					const innerStart = index + eol_length;
					const endTagStart = vue.indexOf(`${eol}</${blockName}>`, index) + eol_length;
					if ( endTagStart<eol_length ) { throw SyntaxError$1(vue.includes(`</${blockName}>`, index) ? '开始标签后紧跟换行则启用多行模式，结束标签应在后续某行的行首' : `开始标签后缺少结束标签“</${blockName}>”`); }
					index = endTagStart + 3 + blockName.length;
					inner = endTagStart===innerStart || endTagStart - eol_length===innerStart ? '' : vue.slice(innerStart, endTagStart - eol_length);
					if ( blockName!=='style' ) {
						inner =
							checkNewline(vue.slice(0, innerStart)).replace(NON_EOL, '') +
							inner;
					}
				}
				else {
					const innerStart = index;
					index = vue.indexOf(eol_0, index);
					if ( index<0 ) { index = length; }
					if ( !vue.endsWith(`</${blockName}>`, index) ) { throw SyntaxError$1(`开始标签后不紧跟换行则启用单行块模式，该行应以对应的结束标签结尾`); }
					inner = vue.slice(innerStart, index - 3 - blockName.length);
					if ( blockName!=='style' ) {
						const previousLineEnd = vue.lastIndexOf(eol_0, innerStart);
						const lastLineStart = previousLineEnd<0 ? 0 : previousLineEnd + eol_length;
						inner =
							checkNewline(vue.slice(0, lastLineStart)).replace(NON_EOL, '') +
							checkNewline(vue.slice(lastLineStart, innerStart)).replace(NON_TAB, ' ') +
							inner;
					}
				}
			}
			
			[ index, INDEX ] = [ INDEX, index ];
			
			if ( blockName==='template' ) { sfc.template = new Template(tag.attributes , inner); }
			else if ( blockName==='style' ) { sfc.styles[sfc.styles.length] = new Style(tag.attributes , inner); }
			else if ( blockName==='script' ) {
				if ( 'setup' in tag.attributes  ) {
					if ( 'src' in tag.attributes  ) { throw SyntaxError$1(`src 属性不能使用在 script setup 块上`); }
					if ( sfc.script && 'src' in sfc.script.attributes ) { throw SyntaxError$1(`src 属性不能使用在同时具有 script setup 块的 .vue 文件内的 script 块上`); }
					sfc.scriptSetup = new Script(tag.attributes , inner);
				}
				else {
					if ( 'src' in tag.attributes  && sfc.scriptSetup ) { throw SyntaxError$1(`src 属性不能使用在同时具有 script setup 块的 .vue 文件内的 script 块上`); }
					sfc.script = new Script(tag.attributes , inner);
				}
			}
			else { sfc.customBlocks[sfc.customBlocks.length] = new CustomBlock(blockName, tag.attributes , inner); }
			
			index = INDEX;
			
			if ( index!==length ) {
				if ( vue[index]===eol_0 ) { index += eol_length; }
				else if ( !vue.startsWith('<!', index) ) { throw SyntaxError$1(`顶级标签的结束标签后的同一行内不应有除注释以外的内容`); }
			}
			
		}
	}
	catch (error) {
		error.message = `${error.message}：\n${Snippet(vue, index)}`;
		throw error;
	}
	
};

const WeakSet$1 = WeakSet;

let compatible = false;

const byReversedStart = (a            , b            ) => b.start - a.start;

let shorthandValues                     ;
//const __Proto__ :String = Object('__proto__');
let _$        ;
let _vm         ;
let _this         ;
const visitors = Null({
	ObjectExpression ({ properties }                  )       {
		let index = properties.length;
		while ( index ) {
			const property = properties[--index] ;
			if ( property.shorthand ) { shorthandValues.add(property.value); }
		}
	},
	ObjectPattern ({ properties }               )       {
		let index = properties.length;
		while ( index ) {
			const property = properties[--index] ;
			if ( property.shorthand ) {
				let { value } = property;
				if ( value.type==='AssignmentPattern' ) { value = value.left; }
				//if ( value.name==='__proto__' ) { value.name = __Proto__; }
				shorthandValues.add(value);
			}
		}
	},
	VariablePattern (identifier            )       {// 赋值
		if ( identifier.name[0]==='_' ) {
			if ( !_$ ) { throw Error$1(`不要对实例下的下划线开头格式的私有属性（“${identifier.name}”）进行赋值！`); }
			--_$;
		}
	},
	Identifier (identifier            )       {// 引用
		if ( identifier.name==='_vm' ) {
			if ( _vm ) { throw Error$1(`不应出现对“_vm”的直接访问。`); }
			_vm = true;
		}
		else if ( identifier.name==='arguments' ) { throw Error$1(`“arguments”可能存在歧义，请避免使用。`); }
	},
	ThisExpression ()       {
		if ( _this ) { throw Error$1(`直接访问“this”可能导致难以预料的结果，最好避免。`); }
		_this = true;
	},
});

const parserOptions = Null({
	ecmaVersion: 5            ,
	sourceType: 'module'         ,// use strict mode
	allowReserved: true         ,
	///preserveParens: true,
});
let ecma           = 5;
const MinifyOptionsBODY = () => Null({
	warnings: 'verbose',
	parse: Null({
		html5_comments: false,
	}         ),
	compress: Null({
		warnings: true,
		//collapse_vars: false,
		pure_getters: true,
		drop_debugger: false,
		typeofs: false,
		expression: true,
		keep_fargs: false,
		arguments: true,
		passes: 2,
		unsafe_arrows: true,
		unsafe_methods: true,
	}         ),
	format: Null({
		inline_script: false,
		beautify: false,
	}         ),
	safari10: true,
	ie8: false,
	ecma,
}         );
/*const MinifyOptionsFUNC = () => {
	const options = MinifyOptionsBODY();
	return Null({
		...options,
		compress: Null({
			...options.compress,
			//collapse_vars: false,
			defaults: false,
			arrows: true,
			pure_getters: false,
			keep_fargs: true,
			arguments: false,
			side_effects: true,//
			//keep_fnames: false,
		} as const),
		mangle: false,
		format: Null({
			inline_script: false,
			beautify: true,
			indent_level: 0,
			//preserve_annotations: true,//comments: () => true,
		} as const),
	} as const);
};*/
const $event = /^Dropping unused function argument (?:\$event|_(?:cache|ctx)) \[\d+:\d+,\d+]$/;
const not$event = (warning        ) => !$event.test(warning);
const MinifyBODY = async (files        ) => {
	const { error, warnings, code } = await minify$1(files, MinifyOptionsBODY());
	if ( error ) { throw error; }
	if ( warnings ) {
		const filtered = warnings.filter(not$event);
		if ( filtered.length ) { throw Error$1(`Terser 压缩警告：\n${filtered.join('\n')}`); }
	}
	return code ;
};

const CONST_RETURN = theRegExp$1       (/^(?:cons|le)t ({[\w :,]*}) = Vue\n(.*)$/s).exec;
const PORTS = /[\w$]+(?= *[:,}])/g;

const with_this__return_ = 'with(this){return ';

const _$s = 'conslqikbveugdp'.split('').map($ => `_${$}`);// tmf
const mode_ = {
	var: _$s.map(_$ => `${_$} = _vm.${_$}`).join(', '),
	let: `{ ${_$s.join(', ')} } = _vm._self`,
	const: `{ ${_$s.join(', ')} } = _vm._self`,
}         ;

let MODE                         ;
let WS                                                       ;

const strip = (func        )         => {
	const AST = parse$1(func, parserOptions);
	const globals = findGlobals(AST);
	_$ = 1 + _$s.length;
	_vm = _this = false;
	shorthandValues = new WeakSet$1;
	simple(AST, visitors);
	let _vm_func         = '';
	let index = 0;
	const identifiers = ( globals.nodes()                 ).sort(byReversedStart);
	let i = identifiers.length;
	while ( i ) {
		const identifier = identifiers[--i] ;
		let name = identifier.name          ;
		if ( compatible && inBlackList(name) ) { compatible = false; }
		const { start } = identifier;
		if ( start!==index ) { _vm_func += func.slice(index, start); }
		name = func.slice(start, index = identifier.end);
		if ( shorthandValues.has(identifier) ) {
			_vm_func += //identifier.name==='__proto__' ? '["__proto__"]:' :
				name + ':';
		}
		_vm_func += '_vm.' + name;
	}
	if ( index!==func.length ) { _vm_func += func.slice(index); }
	return _vm_func;
};

const NOOP = { eol: '', tab: '' }         ;
const Sheets = (sheet                     , ws                                                 = NOOP) => {
	let literal = '';
	for ( const { 0: ref, 1: expression } of sheet ) {
		if ( expression ) { literal += `${ws.eol}${ws.tab}${ws.tab}${ref}: _vm => ${strip(expression)},`; }
	}
	return `{${literal}${ws.eol}${ws.tab}}`;
};

const NecessaryStringLiteral = async (body        , name               )                  => {
	if ( !body.startsWith(with_this__return_) ) { throw Error$1(`jVue 内部错误：vue-template-compiler .compile 返回了与预期不符的内容格式`); }
	body = strip(`'use strict';(function(){${WS ? WS.tab + WS.tab : ''}${MODE} _vm = this, ${mode_[MODE]};${WS ? WS.eol + WS.tab + WS.tab : ''}return ${body.slice(with_this__return_.length, -1)};${WS ? WS.eol + WS.tab : ''}});`);
	body = ( WS ? body : await MinifyBODY(body) ).slice(25, -3);
	return WS
		? name===null
			? ecma===5
				? `${WS.eol}${WS.tab}function render () {${WS.eol}${body}}${WS.eol}`
				: `{${WS.eol}${WS.tab}render () {${WS.eol}${body}}${WS.eol}}.render`
			: `{${WS.eol}${WS.tab}${WS.tab}${name}${ecma===5 ? ': function' : ''} () {${WS.eol}${WS.tab}${body.replace('return ', return_ => WS .tab + return_)}${WS.tab}}${WS.eol}${WS.tab}}[${name}]`
		: StringLiteral(body);
};

const options = freeze(Null({
	onError (error             )        { throw Error$1(`.vue template 官方编译未通过：\n       ${error.message}`); },
	isCustomElement,
	mode: 'function',
	prefixIdentifiers: true,
	cacheHandlers: true,
	hoistStatic: true,
}         ));
const options4find = freeze(Null({
	onError (error             )        { throw Error$1(`jVue 内部错误：.vue template 额外官方编译未通过：\n       ${error.message}`); },
	isCustomElement,
	mode: 'function',
	prefixIdentifiers: false,
	cacheHandlers: false,
	hoistStatic: false,
}         ));
const NSS = /\n+((?:  )*)/g;
const Render3 = async (innerHTML        , mode                 , ws                                                       , { sheet, shadow }                                                                    , need         ) => {
	const { code } = compile3[mode](innerHTML, options);
	const { 1: params, 2: rest } = CONST_RETURN(code) ?? { 1: '', 2: code };
	const ports = params.match(PORTS) ?? [];
	let Render = `'use strict';(${params})=>{${rest}};`;
	ecma = parserOptions.ecmaVersion = 2014;
	const globals = findGlobals(parse$1(Render, parserOptions));
	globals.size && throwError(`jVue 内部错误：@dom/compiler-dom .compile 返回的内容与预期不符（存在变量泄漏：“${globals.names().join('”“')}”）`);
	if (
		need &&
		compatible &&
		findGlobals(
			parse$1(`'use strict';()=>{${compile3[mode](innerHTML, options4find).code}}`, parserOptions)
		)
		.names()
		.some(inBlackList)
	) { compatible = false; }
	if ( ws ) { Render = Render.replace(NSS, (nss, ss) => ws.eol + ws.tab.repeat(2 + ss.length/2)).slice(13, -1); }
	else {
		Render = await MinifyBODY(Render);
		const end = Render.length - 1;
		Render = Render[14]==='('
			? Render.slice(14, Render[end]===';' ? end - 1 : end)
			: Render[end]===';'
				? Render.slice(13, end)
				: Render.slice(13);
	}
	const index = Render.indexOf('=>');
	const left = Render.slice(0, index);
	let right = Render.slice(index + 2);
	Render = ws
		? `class Render {${ws.eol}${ws.tab}constructor ${left} ${right[0]==='{' ? right.slice(0, -1) : `{${ws.eol}${ws.tab}${ws.tab}return ${right}`};${ws.eol}${ws.tab}}${sheet ? `${ws.eol}${ws.tab}static sheet = ${Sheets(sheet, ws)};` : ''}${shadow ? `${ws.eol}${ws.tab}static shadow = ${StringLiteral(shadow)};` : ''}${ws.eol}}`
		: StringLiteral(left + ( right[0]==='{' ? right : `{return${right[0]==='(' ? '' : ' '}${right}}` ) + ( sheet ? `static sheet=${( await MinifyBODY(`'use strict';(${Sheets(sheet)});`) ).slice(14, -2)}` : '' ) + ( sheet && shadow ? ';' : '' ) + ( shadow ? `static shadow=${StringLiteral(shadow)}` : '' ));
	return { ports, Render };
};

const Render2 = async (innerHTML        , mode                         , ws                                                       ) => {
	let { errors, tips, render, staticRenderFns } = compile2[mode](innerHTML);
	if ( errors.length ) { throw Error$1(`.vue template 官方编译未通过：\n       ${errors.join('\n       ')}`); }
	if ( tips.length ) { throw Error$1(`.vue template 官方编译建议：\n       ${tips.join('\n       ')}`); }
	WS = ws;
	MODE = mode;
	ecma = parserOptions.ecmaVersion = mode==='var' ? 5 : 2014;
	render = await NecessaryStringLiteral(render, null);
	let index = 0;
	for ( const { length } = staticRenderFns; index!==length; ++index ) {
		staticRenderFns[index] = await NecessaryStringLiteral(staticRenderFns[index] , index);
	}
	return { render, staticRenderFns };
};
const Render = async (template          , mode                         , ws                                                       ) => {
	const { content } = template;
	const innerHTML = '' + content;
	compatible = content._compatible_template;
	const render2 = content._compatible_render ? await Render2(innerHTML, mode, ws) : null;
	return {
		render2,
		render3: mode==='var' ? null : await Render3(innerHTML, mode, ws, _(template), !render2),
		/// - {ws}: (); import!
		/// - null: (); import or ~~runtime~~?
		innerHTML: compatible ? innerHTML : null,
	};
};

const NULo = /^\x00[0-7]/;
const LF_CR_AT_LS_PS = /[\n\r@\u2028\u2029]/g;
const escapeCSS_LF_CR_AT_LS_PS = ($0        )         => $0==='\n' ? '\\00000A' : $0==='\r' ? '\\00000D' : $0==='\u2028' ? '\\002028' : $0==='\u2029' ? '\\002029' : '\\000040';
const escapeHTML_LF_CR_AT_LS_PS = ($0        )         => $0==='\n' ? '&#x0A;' : $0==='\r' ? '&#0D;' : $0==='\u2028' ? '&#x2028;' : $0==='\u2029' ? '&#x2029;' : '&#x40;';
const VisibleStringLiteral = (id        )         => {
	const literal         = StringLiteral(id);
	return id[0]==='\x00' ? ( NULo.test(id) ? `'\\x00` : `'\\0` ) + literal.slice(2) : literal;
};
const test_bind = bind.bind(test       )                                                                                      ;
const Is__KEY__ = (KEY        ) => test_bind(RegExp$1(`^[.#]?__${KEY}__$`));
const is__KEY__ = Is__KEY__(KEYS.source);

const Debug = (template          , tab        , eol        ) => {
	let code = '';
	for ( const line of template.content.beautify(tab) ) { code += `//${tab}${line.replace(LF_CR_AT_LS_PS, escapeHTML_LF_CR_AT_LS_PS)}${eol}`; }
	return code;
};

async function From (tab        , mode                         , styles         , template                 , from               , eol        , bom               )                                                    {
	
	let ports                  = null;
	let code         = bom;
	
	const options = { indent: tab, newline: eol, newlineSelector: false, newlineProperty: false };
	
	if ( from===null ) {
		const { length } = styles;
		if ( length ) {
			const style = styles[0] ;
			if ( _(style).media!==undefined$1 ) { throw Error$1(`当前模式下，style 标签上的 media 属性无法被保留`); }
			code += `export ${mode} style = ${StringLiteral(style.innerCSS)};${eol}`;
			for ( const line of style.sheet[Symbol.iterator](options) ) {
				code += `//${tab}${line.replace(LF_CR_AT_LS_PS, escapeCSS_LF_CR_AT_LS_PS)}${eol}`;
			}
			code += eol;
			if ( length===1 ) {
				code += `export ${mode} styles = [ style ];${eol}`;
			}
			else {
				code += `export ${mode} styles = [ style,${eol}`;
				let index = 1;
				while ( index!==length ) {
					const style = styles[index++] ;
					if ( _(style).media!==undefined$1 ) { throw Error$1(`当前模式下，style 标签上的 media 属性无法被保留`); }
					code += `${tab}${StringLiteral(style.innerCSS)},${eol}`;
					for ( const line of style.sheet[Symbol.iterator](options) ) {
						code += `${tab}//${tab}${line.replace(LF_CR_AT_LS_PS, escapeCSS_LF_CR_AT_LS_PS)}${eol}`;
					}
				}
				code += `];${eol}`;
			}
		}
		else {
			code += `export ${mode} styles = [ ];${eol}`;
		}
		if ( template ) {
			const { render3, render2, innerHTML } = await Render(template, mode, { eol, tab });
			let debug = '';
			if ( render3 || render2 ) {
				debug = Debug(template, tab, eol);
				code += eol;
			}
			if ( render3 ) {
				code += debug;
				const { Render } = { ports } = render3;
				code += `export ${Render}${eol}`;
			}
			if ( render2 ) {
				const { render, staticRenderFns } = render2;
				code += `export ${mode} render = /*#__PURE__*/${mode==='var' ? `function (render) { return render._withStripped = render; }` : `( render => render._withStripped = render )`}(${render});${eol}`;
				code += staticRenderFns.length
					? `export ${mode} staticRenderFns = [${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}];${eol}`
					: `export ${mode} staticRenderFns = [ ];${eol}`;
				code += debug;
			}
			if ( innerHTML!==null ) {
				code += `export ${mode} template = ${StringLiteral(innerHTML)};${eol}`;
				code += `export ${mode} delimiters = [ '{{', '}}' ];${eol}`;
			}
		}
		return { ports, code };
	}
	
	const _from_ = VisibleStringLiteral(from);
	code += `export { Identifier, Scope, Style, remove, Component, mixin, prop } from ${_from_};${eol}`;
	code += `import * as jVue from ${_from_};${eol}${eol}`;
	
	const scopeKeys = template && _(template).keys;
	const scope = scopeKeys ? 'scopeObject' : 'scopeFunction';
	code += scopeKeys
		? `export ${mode} ${scope} = /*#__PURE__*/jVue.Scope('${scopeKeys.join(',')}')`
		: `export ${mode} ${scope} = /*#__PURE__*/jVue.Scope()`;
	
	const { length } = styles;
	if ( length ) {
		const isScoped = scopeKeys ? Is__KEY__(groupify$1(scopeKeys)) : is__KEY__;
		let index = 0;
		while ( index!==length ) {
			const style = styles[index++] ;
			const { sheet } = style;
			const { allowGlobal, media } = _(style);
			allowGlobal || sheet.checkScoped(isScoped);
			const { innerCSS } = style;
			if ( innerCSS ) {
				for ( const line of sheet[Symbol.iterator](options) ) {
					code += `${eol}//${tab}${line.replace(LF_CR_AT_LS_PS, escapeCSS_LF_CR_AT_LS_PS)}`;
				}
				code += media===undefined$1
					? `${eol}.$(${StringLiteral(innerCSS)})`
					: `${eol}.$(${StringLiteral(innerCSS)}, ${StringLiteral(media)})`;
			}
		}
	}
	
	code += `;${eol}`;
	
	if ( template ) {
		const { render2, render3, innerHTML } = await Render(template, mode, null);
		let debug = '';
		if ( render3 || render2 ) {
			debug = Debug(template, tab, eol);
			code += eol;
		}
		if ( render3 ) {
			code += debug;
			const { Render } = { ports } = render3;
			code += `export ${mode} Render = /*#__PURE__*/jVue.Render(${Render}, ${scope});${eol}`;
		}
		if ( render2 ) {
			const { render, staticRenderFns } = render2;
			code += `export ${mode} render = /*#__PURE__*/jVue.Render(${render}, ${scope});${eol}`;
			code += staticRenderFns.length
				? `export ${mode} staticRenderFns = /*#__PURE__*/jVue.StaticRenderFns([${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}], ${scope});${eol}`
				: `export ${mode} staticRenderFns = [ ];${eol}`;
			code += debug;
		}
		if ( innerHTML!==null ) {
			code += eol;
			code += `export ${mode} template = /*#__PURE__*/jVue.Template(${StringLiteral(innerHTML)}, ${scope});${eol}`;
			code += `export ${mode} delimiters = [ '{{', '}}' ];${eol}`;
		}
	}
	
	return { ports, code };
	
}

const onwarn = (warning     )       => {
	if ( typeof warning==='string' ) { throw Error$1(warning); }
	const { code } = warning;
	if ( code!=='UNUSED_EXTERNAL_IMPORT'/* && code!=='THIS_IS_UNDEFINED'*/ ) { throw warning; }
};

const paths = (id        )         => id;

const VAR = {
	ecmaVersion: 5,
	allowReserved: true,
	sourceType: 'module',
	allowAwaitOutsideFunction: false,
	//preserveParens: true,
}         ;
const X_VAR = {
	ecmaVersion: 2014,
	allowReserved: true,
	sourceType: 'module',
	allowAwaitOutsideFunction: true,
	//preserveParens: true,
}         ;
const one = async (sfc     , { 'var': x_var, 'j-vue': from, '?j-vue': x_from = from===null ? '?j-vue=' : '?j-vue', map = false, src, lang }   
	                               
	                  
	                        
	                         
	                                    
	                                                              
 )                                                               => {
	let ports                  = null;
	if ( lang ) {
		const { script } = sfc;
		if ( script && script.lang ) { script.innerJS = await lang(script.lang, script.inner ); }
	}
	const main         = await sfc.export('default', x_from)          ;
	let round = 'resolvingMain';
	const bundle = await rollup(Null({
		onwarn,
		acornInjectPlugins,
		strictDeprecations: true,
		treeshake: false,
		context: 'this',
		acorn: Null(x_var==='var' ? VAR : X_VAR),
		input: '\x00'.repeat(main.length),
		external: (id        )          => id!==x_from,
		plugins: [
			Null({
				resolveId (id        )         {
					if ( round==='resolvingMain' || id===x_from ) { return id; }
					throw Error$1(`jVue 内部错误：resolveId(${id})`);
				},
				async load (id        )                  {
					if ( round==='resolvingMain' ) {
						round = 'mainLoaded';
						return main;
					}
					if ( id!==x_from ) { throw Error$1(`jVue 内部错误：load(${id})`); }
					if ( round!=='mainLoaded' ) { throw Error$1(`jVue 内部错误：re-load(${id})`); }
					round = 'xLoaded';
					const { template, styles } = sfc;
					if ( src ) {
						if ( template && template.src ) { template.inner = await src(template.src); }
						const { length } = styles;
						let index = 0;
						while ( index!==length ) {
							const style = styles[index++] ;
							if ( style.src ) { style.inner = await src(style.src); }
						}
					}
					if ( lang ) {
						if ( template && template.lang ) { template.innerHTML = await lang(template.lang, template.inner ); }
						const { length } = styles;
						let index = 0;
						while ( index!==length ) {
							const style = styles[index++] ;
							if ( style.lang ) { style.innerCSS = await lang(style.lang, style.inner ); }
						}
					}
					const { code } = { ports } = await sfc.export(x_var, from)                                     ;
					return code;
				},
			}),
		],
	}));
	const { output } = await bundle.generate(Null({
		format: 'es',
		sourcemap: map,
		paths,
	}));
	if ( output.length!==1 ) { throw Error$1(`jVue 内部错误：output.length===${output.length}`); }
	const only = output[0];
	return map===true
		? { ports, code: only.code, map: only.map }
		: { ports, code: only.code };
};

const OPTIONS = { swappable: false, stripBOM: true, startsWithASCII: true, throwError: true }         ;
const VUE_EOL = EOL$1([ LF, CRLF, CR ], true, [ FF, LS, PS ]);
if ( !ES.global ) { throw Error$1(`j-eol ! g`); }

class SFC {
	
	get [Symbol.toStringTag] () { return 'SFC'; }
	
	bom               ;
	eol                               ;
	tab        ;
	
	constructor (vue                 ) {
		
		if ( isBuffer(vue) ) {
			try {
				const { BOM, string } = buffer2object(vue, OPTIONS);
				this.bom = BOM;
				vue = string;
			}
			catch (error) { throw Error$1(`无法解码 Buffer，请确认它是 UTF-8 或 UTF-16 编码的，并且不存在非 Unicode 标量值（U+D800〜U+DFFF）的代理对码点，或超出了 U+10FFFF）`); }
		}
		else if ( typeof vue==='string' ) {
			if ( NON_SCALAR.test(vue) ) { throw Error$1(`.vue 文件所基于的 HTML 字符流中禁止出现落单的代理对码点（U+D800〜U+DFFF）`); }
			this.bom = '';
		}
		else { throw TypeError$1(`new SFC(vue) 时参数只能是 string 或 Buffer`); }
		
		if ( NONCHARACTER.test(vue) ) { throw Error$1(`.vue 文件所基于的 HTML 字符流中禁止出现永久未定义字符码点（U+FDD0〜U+FDEF、U+[00-10]FFFE、U+[00-10]FFFF）`); }
		if ( CONTROL_CHARACTER.test(vue) ) { throw Error$1(`.vue 文件所基于的 HTML 字符流中禁止出现除 NUL 空（U+00）、TAB 水平制表（U+09）、LF 换行（U+0A）、FF 换页（U+0C）、CR 回车（U+0D）之外的控制字符（U+00〜U+1F、U+7F〜U+9F）`); }
		
		try { this.eol = VUE_EOL(vue); }
		catch (error) {
			throw SyntaxError$1(
				`.vue 文件的换行符必须是 LF（U+0A）、CRLF（U+0D U+0A）或 CR（U+0D）中的唯一一个` +
				`，而且` +// script 标签内容前
				`不得包含对 JS 是换行符、而对 HTML 和 CSS 不是换行符的 LS（U+2028）或 PS（U+2029），也不得包含对 CSS 是换行符、而对 HTML 和 JS 不是换行符的 FF（U+0C）`//，否则源图映射的行号和列号可能出错
			);
		}
		
		this.tab = vue.includes('\t') ? '\t' : '';
		
		parseComponent(this, vue);
		
		return this;
		
	}
	
	script                = null;
	scriptSetup                = null;
	         styles          = [];
	template                  = null;
	         customBlocks                = [];
	
	export (           mode                                         
		                               
		                  
		                        
		                           
		                                      
		                                                                
	 , from                = 'j-vue')                                                                        {
		if ( typeof mode==='object' ) { return one(this, mode); }
		const { bom, tab, eol, script, styles, template } = this;
		if ( mode==='default' ) {
			if ( this.scriptSetup ) { throw Error$1(`jVue 暂未支持编译 script setup`); }
			if ( !script ) { throw Error$1(`由于 Vue 2 和 3 所需的 render 函数不同，.vue 的 script 块现在不能省略`); }
			return script.inner===undefined$1
				? bom + `export { default } from ${StringLiteral(script.src )};`
				: bom + script.innerJS.replace(ES, eol);
		}
		else { return From(tab, mode, styles, template, from, eol, bom); }
	}
	
}
freeze(freeze(SFC).prototype);

const _tsd = 'declare module \'*?j-vue=\' {\n	export const style :string;\n	export const styles :string[];\n	export const delimiters :[ \'{{\', \'}}\' ];\n	export const template :string;\n	export const Render :jVue.Render3Constructor;\n	export const render :jVue.Render2;\n	export const staticRenderFns :jVue.Render2[];\n	\n	import type * as jVue from \'j-vue\';\n}\n\ndeclare module \'*?j-vue\' {\n	export { Identifier, Scope, Style, remove, Component, mixin, prop } from \'j-vue\';\n	\n	export const scopeFunction :jVue.Scope<void>;\n	export const scopeObject :jVue.Scope<string>;\n	export const delimiters :[ \'{{\', \'}}\' ];\n	export const template :string;\n	export const Render :jVue.Render3Constructor;\n	export const render :jVue.Render2;\n	export const staticRenderFns :jVue.Render2[];\n	\n	import type * as jVue from \'j-vue\';\n}\n\ndeclare module \'j-vue\' {\n	export type _Vue = Vue$;\n	export type {\n		SubComponent as _Component,\n		ObjectAPI as _ObjectAPI,\n		__Dev__,\n	};\n	\n	export const version :string;\n	\n	export function Identifier () :string;\n	\n	export const Scope :{\n		<Keys extends string>\n		(this :void | Scope<string | void> | readonly Scope<string | void>[], keys :string) :Scope<Keys>;\n		(this :void | Scope<string | void> | readonly Scope<string | void>[]              ) :Scope<void>;\n		readonly prototype :null;\n	};\n	export type Scope<Keys extends string | void> = (\n		Keys extends string ? { readonly [Key in Keys] :string } :\n		Keys extends void ? { (...args :any) :string; readonly prototype :{ readonly [Key in string]? :string }; } :\n	never ) & {\n		readonly $ :<T extends Scope<string | void>> (this :T, css? :string, media? :string) => T;\n		readonly [_]? :(string :string) => string;\n		readonly _? :(string :string) => string;\n	};\n	const _ :unique symbol;\n	\n	export function Template (html :string, scope :Scope<string | void>) :string;\n	export function Render (code :string, scope? :Scope<string | void>) :Render2 | Render3Constructor;\n	export function StaticRenderFns (codes :readonly string[], scope? :Scope<string | void>) :Render2[];\n	export type Render3Constructor = {\n		new (Vue3 :Vue3) :Render3;\n		readonly shadow? :string;\n		readonly sheet? :{ readonly [Ref in string] :(this :Vue, self :Vue) => string };\n	};\n	export type Render3 = { (this :Vue) :VNode | ( VNode | string )[] };\n	export type Render2 = { (this :Vue, h :$createElement) :VNode, _withStripped? :unknown };\n	type $createElement = {\n		(this :void, type :string | NonArray, props? :NonArray | null, children? :( VNode | string )[]) :VNode;\n		(this :void, type :string | NonArray,                          children  :( VNode | string )[]) :VNode;\n	};\n	type VNode = NonArray;\n	type NonArray<T extends object = { [name :string] :unknown }> = T;\n	\n	export function Style (css? :string, scope? :Scope<string | void>) :HTMLStyleElement;\n	export function remove (style :HTMLStyleElement) :typeof remove;\n	\n	export abstract class Component<Sub extends SubComponent<Sub>> extends SubComponent<Sub> { protected constructor () }\n	export function mixin<Mixins extends object = object> (...mixins :readonly ( ClassAPI | ObjectAPI )[]) :\n		{ [Name in keyof typeof Component] :typeof Component[Name] } &\n		{ readonly [_mixins] :readonly ( ClassAPI | ObjectAPI )[] } &\n		{ new<Sub extends Component<Sub>> () :\n			& Component<Sub>\n			& { [Name in OwnKeys<Mixins>] :Mixins[Name] }\n		};\n	const _mixins :unique symbol;\n	\n	export const prop :Readonly<{\n		created (el :Element, binding :{ readonly arg? :unknown, readonly value? :unknown }) :void,\n		bind (el :Element, binding :{ readonly arg? :unknown, readonly value? :unknown }) :void,\n		\n		updated (el :Element, binding :{ readonly arg? :unknown, readonly value? :unknown }) :void,\n		componentUpdated (el :Element, binding :{ readonly arg? :unknown, readonly value? :unknown }) :void,\n	}>;\n	\n	export { exports as default };\n	const exports :Readonly<{\n		version :typeof version,\n		Identifier :typeof Identifier,\n		Scope :typeof Scope,\n		Template :typeof Template,\n		Render :typeof Render,\n		StaticRenderFns :typeof StaticRenderFns,\n		Style :typeof Style,\n		remove :typeof remove,\n		Component :typeof Component,\n		mixin :typeof mixin,\n		prop :typeof prop,\n		default :typeof exports,\n	}>;\n	\n	type ClassAPI = typeof AnyComponent;\n	abstract class AnyComponent<Sub extends SubComponent<Sub>> extends SubComponent<Sub> {\n		protected constructor ();\n		get _data () :any;\n		get _inject () :any;\n		get _props () :any;\n		get _directives () :any;\n		get _emits () :any;\n	}\n	abstract class SubComponent<Sub extends Vue> extends Vue {\n		\n		protected _beforeCreated? () :void | Promise<void>;\n		protected _created? () :void | Promise<void>;\n		protected _beforeMount? () :void | Promise<void>;\n		protected _mounted? () :void | Promise<void>;\n		protected _beforeUpdate? () :void | Promise<void>;\n		protected _updated? () :void | Promise<void>;\n		protected _activated? () :void | Promise<void>;\n		protected _deactivated? () :void | Promise<void>;\n		protected _beforeUnmount? () :void | Promise<void>;\n		protected _unmounted? () :void | Promise<void>;\n		/**@deprecated*/\n		protected _beforeDestroy? () :void | Promise<void>;\n		/**@deprecated*/\n		protected _destroyed? () :void | Promise<void>;\n		\n		protected _render? () :VNode | ( VNode | string )[];\n		protected _provide? () :{ [key :string] :unknown };\n		\n		get _data () :void | readonly Exclude<OwnNames<Sub>, `$${string}`>[];\n		get _inject () :void | Inject<Sub>;\n		get _props () :void | Props<Sub>;\n		get _directives () :void | Directives<Sub>;\n		get _emits () :void | Emits;\n		\n		static readonly data :void;\n		static readonly directives :void | Directives<Vue>;\n		static readonly provide :void | { [key :string] :unknown };\n		\n		static render :void | Render2 | Render3;\n		\n		static readonly Render :void | Render3Constructor;\n		static readonly staticRenderFns :void | Render2[];\n		static readonly template :void | string;\n		static readonly delimiters :void | [ string, string ];\n		static readonly inheritAttrs :void | boolean;\n		static readonly components :void | { readonly [name :string] :ClassAPI | ObjectAPI };\n		\n		static get _main () :(this :void) => void;\n		static readonly _toOptions :(this :ClassAPI, Vue3? :Vue3, __dev__? :__Dev__) => ObjectAPI;\n		protected constructor (Vue3? :Vue3);\n		\n		private _Render :void;\n		\n		private _staticRenderFns :void;\n		private _template :void;\n		private _delimiters :void;\n		private _inheritAttrs :void;\n		private _components :void;\n		\n		private _mixins :void;\n		private _extends :void;\n		private _watch :void;\n		private _methods :void;\n		private _computed :void;\n		private _setup :void;\n		\n		/**@deprecated*/\n		private _filters :void;\n		/**@deprecated*/\n		private _comments :void;\n		/**@deprecated*/\n		private _functional :void;\n		/**@deprecated*/\n		private _propsData :void;\n		/**@deprecated*/\n		private _model :void;\n		\n		private static readonly beforeCreated :void;\n		private static readonly created :void;\n		private static readonly beforeMount :void;\n		private static readonly mounted :void;\n		private static readonly beforeUpdate :void;\n		private static readonly updated :void;\n		private static readonly activated :void;\n		private static readonly deactivated :void;\n		private static readonly beforeUnmount :void;\n		private static readonly unmounted :void;\n		/**@deprecated*/\n		private static readonly beforeDestroy :void;\n		/**@deprecated*/\n		private static readonly destroyed :void;\n		\n		private static readonly inject :void;\n		private static readonly props :void;\n		private static readonly emits :void;\n		\n		private static readonly mixins :void;\n		private static readonly extends :void;\n		private static readonly watch :void;\n		private static readonly methods :void;\n		private static readonly computed :void;\n		private static readonly setup :void;\n		\n		/**@deprecated*/\n		private static readonly filters :void;\n		/**@deprecated*/\n		private static readonly comments :void;\n		/**@deprecated*/\n		private static readonly functional :void;\n		/**@deprecated*/\n		private static readonly propsData :void;\n		/**@deprecated*/\n		private static readonly model :void;\n		\n	}\n	\n	type __Dev__ = {\n		readonly [Error in\n			| \'proto\'\n			| \'compile_name\'\n			| \'compile_props\'\n			| \'compile_emits\'\n			| \'compile_is\'\n			| \'compile_layer\'\n			| \'compile_reserved\'\n			| \'compile_redefined\'\n			| \'compile_overwrite\'\n			| \'compile_type\'\n			| \'compile_symbol\'\n			| \'compile_shadow\'\n			| \'runtime_shadow\'\n			| \'runtime_redefined\'\n			| \'runtime_symbol\'\n			| \'runtime_reserved\'\n			| \'runtime_enumerable\'\n			| \'runtime_data\'\n		]? :string\n	};\n	\n	type OwnNames<T> = Exclude<OwnKeys<T>, symbol>;\n	type OwnKeys<T> = Exclude<keyof T,\n		| `_${string}`\n		| \'$emit\'\n		| \'$watch\'\n		| \'$nextTick\'\n		| \'$forceUpdate\'\n		| \'$scopedSlots\' | \'$options\' | \'$parent\' | \'$slots\' | \'$attrs\' | \'$refs\' | \'$root\'\n		| \'$el\'\n		| \'$data\' | \'$props\'\n		| \'$createElement\'\n		| \'$children\' | \'$listeners\' | \'$destroy\' | \'$delete\' | \'$mount\' | \'$once\' | \'$set\' | \'$off\' | \'$on\'\n		| \'$\'\n	>;\n	\n	const Vue :{ new () :Vue };\n	type Vue = { readonly [Key in keyof Vue_] :Vue_[Key] };\n	abstract class Vue_ extends Vue$ { private _? :never }\n	abstract class Vue$ {\n		\n		$emit <This extends Vue & { readonly _emits :readonly string[]                                                                        }                                    > (this :This, event :This[\'_emits\'][number], ...args :                                                                                                                                                                                          readonly any[]) :This;\n		$emit <This extends Vue & { readonly _emits :NonArray<{ [event :string] :null | { (this :void, ...args :readonly any[]) :boolean } }> }, Event extends keyof This[\'_emits\']> (this :This, event :Event,                  ...args :This[\'_emits\'][Event] extends { (this :void, arg :unknown) :arg is infer Arg } ? readonly [ Arg ] : This[\'_emits\'][Event] extends { (this :void, ...args :infer Args) :boolean } ? Args : readonly any[]) :This;\n		$emit <This extends Vue & { readonly _emits :void                                                                                     }                                    > (this :This, event :string,                 ...args :                                                                                                                                                                                          readonly any[]) :This;\n		\n		$watch<This extends Vue>        (this :This, exp :string                          , cb :<Value> (this :This, value :Value, oldValue  :Value) => void | Promise<void>, options? :{ deep? :boolean, immediate? :false  , flush? :\'pre\' | \'post\' | \'sync\' }) :{ () :void };\n		$watch<This extends Vue>        (this :This, exp :string                          , cb :<Value> (this :This, value :Value, oldValue? :Value) => void | Promise<void>, options? :{ deep? :boolean, immediate? :boolean, flush? :\'pre\' | \'post\' | \'sync\' }) :{ () :void };\n		$watch<This extends Vue, Value> (this :This, fn :(this :This, self :This) => Value, cb :        (this :This, value :Value, oldValue  :Value) => void | Promise<void>, options? :{ deep? :boolean, immediate? :false  , flush? :\'pre\' | \'post\' | \'sync\' }) :{ () :void };\n		$watch<This extends Vue, Value> (this :This, fn :(this :This, self :This) => Value, cb :        (this :This, value :Value, oldValue? :Value) => void | Promise<void>, options? :{ deep? :boolean, immediate? :boolean, flush? :\'pre\' | \'post\' | \'sync\' }) :{ () :void };\n		\n		$nextTick<This extends Vue> (this :This, callback :(this :This) => void | Promise<void>) :void;\n		$nextTick<This extends Vue> (this :This) :Promise<void>;\n		\n		$forceUpdate<This extends Vue> (this :This) :void;\n		\n		$options :Readonly<ObjectAPI>;\n		$scopedSlots? :ScopedSlots;\n		$slots? :ScopedSlots;\n		$parent? :Vue;\n		$root :Vue;\n		$attrs :{ readonly [name :string] :unknown };\n		$refs :{ readonly [name :string] :unknown };\n		$el? :null | Element | Comment | Text;\n		\n		/**@deprecated*/\n		$createElement? :$createElement;\n		\n		/**@deprecated*/\n		private $isServer? :never;\n		/**@deprecated*/\n		private $children? :never;\n		/**@deprecated*/\n		private $listeners? :never;\n		/**@deprecated*/\n		private $destroy? :never;\n		/**@deprecated*/\n		private $delete? :never;\n		/**@deprecated*/\n		private $mount? :never;\n		/**@deprecated*/\n		private $once? :never;\n		/**@deprecated*/\n		private $set? :never;\n		/**@deprecated*/\n		private $off? :never;\n		/**@deprecated*/\n		private $on? :never;\n		\n		private $props? :never;\n		private $data? :never;\n		private $? :never;\n		\n	}\n	\n	type Props<This extends Vue> =\n		| readonly Exclude<OwnNames<This>, \'key\' | \'ref\' | `$${string}`>[]\n		| NonArray<{\n			[Key in Exclude<OwnNames<This>, \'key\' | \'ref\' | `$${string}`>]? :\n				| ConstructorType<This[Key]> | ConstructorType<This[Key]>[]\n				| NonArray<{\n					type? :ConstructorType<This[Key]> | ConstructorType<This[Key]>[],\n					validator? (value :unknown) :value is This[Key],\n				} & ( {\n					default? :This[Key] extends object ? { (this :void, props? :{ readonly [name :string] :unknown }) :This[Key] } : This[Key] | { (this :void, props? :{ readonly [name :string] :unknown }) :This[Key] },\n					required? :false,\n				} | {\n					default? :never,\n					required? :boolean,\n				})>\n		}>;\n	type ConstructorType<T> = {\n		new (...args :any) :\n			T extends boolean ? Boolean :\n			T extends number ? Number :\n			T extends string ? String :\n			T extends symbol ? Symbol :\n			T extends bigint ? BigInt :\n			T\n	};\n	\n	type Inject<This extends Vue> =\n		| readonly OwnNames<This>[]\n		| NonArray<{\n			[Key in OwnKeys<This>]? :\n				| string | symbol\n				| {\n					from? :string | symbol,\n					default? :This[Key] extends object ? { (this :void) :This[Key] } : This[Key] | { (this :void) :This[Key] },\n				}\n		}>;\n	\n	type Emits =\n		| readonly string[]\n		| NonArray<{\n			[event :string] :\n				| null\n				| { (this :void, ...args :readonly any[]) :boolean }\n		}>;\n	\n	type Directives<This extends Vue> = { [name :string] :Directive<This> };\n	type Directive<This extends Vue> =\n		{\n			(\n				this :void,\n				el :Element,\n				binding :{\n					/**@deprecated*/\n					readonly expression? :undefined,\n					/**@deprecated*/\n					readonly name? :undefined,\n					readonly instance :This,\n					readonly value? :unknown,\n					readonly oldValue? :unknown,\n					readonly arg? :unknown,\n					readonly modifiers :{ readonly [Modifier in string]? :true },\n					readonly dir :Directive<This>,\n				} | {\n					/**@deprecated*/\n					readonly expression? :string,\n					/**@deprecated*/\n					readonly name :string,\n					readonly instance? :undefined,\n					readonly value? :unknown,\n					readonly oldValue? :unknown,\n					readonly arg? :unknown,\n					readonly modifiers :{ readonly [Modifier in string]? :true },\n					readonly dir? :undefined,\n				},\n				vNode :VNode & { /**@deprecated*/ readonly context? :This },\n				previousVNode? :VNode & { /**@deprecated*/ readonly context? :This },\n			) :void | Promise<void>\n		} | {\n			[Hook in \'created\' | \'beforeMount\' | \'mounted\'  | \'beforeUpdate\' | \'updated\'                     | \'beforeUnmount\' | \'unmounted\']? :{\n				(\n					this :void,\n					el :Element,\n					binding :{\n						/**@deprecated*/\n						readonly expression? :void,\n						/**@deprecated*/\n						readonly name? :void,\n						readonly instance :This,\n						readonly value? :unknown,\n						readonly oldValue? :Hook extends \'beforeUpdate\' | \'updated\' ? unknown : void,\n						readonly arg? :unknown,\n						readonly modifiers :{ readonly [Modifier in string]? :true },\n						readonly dir :Directive<This>,\n					},\n					vNode :VNode & { /**@deprecated*/ readonly context? :void },\n					previousVNode :Hook extends \'beforeUpdate\' | \'updated\' ? VNode & { /**@deprecated*/ readonly context? :void } : void,\n				) :void | Promise<void>\n			}\n		} & {\n			/**@deprecated*/\n			[Hook in             \'bind\'        | \'inserted\'                  | \'update\'  | \'componentUpdated\'                  | \'unbind\'   ]? :{\n				(\n					this :void,\n					el :Element,\n					binding :{\n						/**@deprecated*/\n						readonly expression? :string,\n						/**@deprecated*/\n						readonly name :string,\n						readonly instance? :void,\n						readonly value? :unknown,\n						readonly oldValue? :Hook extends \'update\' | \'componentUpdated\' ? unknown : void,\n						readonly arg? :unknown,\n						readonly modifiers :{ readonly [Modifier in string]? :true },\n						readonly dir? :void,\n					},\n					vNode :VNode & { /**@deprecated*/ readonly context :This },\n					previousVNode :Hook extends \'update\' | \'componentUpdated\' ? VNode & { /**@deprecated*/ readonly context :This } : void,\n				) :void | Promise<void>\n			}\n		};\n	\n	type ScopedSlots = {\n		readonly [Name in string]? :(this :void, arg :unknown) => readonly VNode[] | undefined\n	};\n	\n	interface ObjectAPI {\n		\n		inheritAttrs? :boolean,\n		template? :string,\n		render? :Render2 | Render3,\n		staticRenderFns? :Render2[],\n		directives? :Directives<Vue>,\n		components? :{ [name :string] :ObjectAPI },\n		provide? :\n			| { [key :string] :unknown }\n			| { (this :Vue) :{ [key :string] :unknown } },\n		emits? :Emits,\n		\n		inject? :Inject<Vue>,\n		props? :Props<Vue>,\n		\n		/**@deprecated*/\n		filters? :void,\n		/**@deprecated*/\n		comments? :void,\n		/**@deprecated*/\n		functional? :void,\n		/**@deprecated*/\n		propsData? :void,\n		/**@deprecated*/\n		model? :void,\n		\n		beforeCreated? (this :Vue) :void | Promise<void>,\n		created? (this :Vue) :void | Promise<void>,\n		beforeMount? (this :Vue) :void | Promise<void>,\n		mounted? (this :Vue) :void | Promise<void>,\n		beforeUpdate? (this :Vue) :void | Promise<void>,\n		updated? (this :Vue) :void | Promise<void>,\n		activated? (this :Vue) :void | Promise<void>,\n		deactivated? (this :Vue) :void | Promise<void>,\n		beforeUnmount? (this :Vue) :void | Promise<void>,\n		unmounted? (this :Vue) :void | Promise<void>,\n		/**@deprecated*/\n		beforeDestroy? (this :Vue) :void | Promise<void>,\n		/**@deprecated*/\n		destroyed? (this :Vue) :void | Promise<void>,\n		\n		delimiters? :[ string, string ],\n		\n		extends? :ObjectAPI,\n		data? (this :Vue, self :Vue) :{ [name :string] :unknown },\n		watch? :{\n			[exp :string] :\n				| { <Value> (this :Vue, value :Value, oldValue? :Value) :void | Promise<void> }\n				| {\n					handler<Value> (this :Vue, value :Value, oldValue? :Value) :void | Promise<void>,\n					deep? :boolean,\n					immediate? :boolean,\n					flush? :\'pre\' | \'post\' | \'sync\',\n				}\n		},\n		methods? :{ [name :string] :{ (this :Vue, ...args :readonly unknown[]) :any } },\n		computed? :{\n			[name :string] :\n				| { (this :Vue, self :Vue) :unknown }\n				| {\n					get? (this :Vue, self :Vue) :unknown,\n					set? (this :Vue, value :unknown) :void | Promise<void>,\n				}\n		},\n		setup? (\n			this :void,\n			props :{ readonly [name :string] :unknown },\n			{} :{\n				readonly attrs :{ readonly [name :string] :unknown },\n				readonly slots :ScopedSlots,\n				readonly emit :(this :void, event :string, ...args :readonly unknown[]) => void,\n			},\n		) :{ [name :string] :unknown } | Render3,\n		\n		mixins? :ObjectAPI[],\n		\n	}\n	\n	export type Vue3 = Readonly<{\n		h (this :void, type :string | NonArray, props? :NonArray | null, children? :( VNode | string )[] | { (this :void, arg :unknown) :VNode[] | undefined } | { [name :string] :{ (this :void, arg :unknown) :VNode[] | undefined } }) :VNode;\n		h (this :void, type :string | NonArray,                          children  :( VNode | string )[] | { (this :void, arg :unknown) :VNode[] | undefined }                                                                          ) :VNode;\n		ref<T> (this :void, value :T) :{ value :T };\n		reactive<T extends object> (this :void, value :T) :T;\n		computed<T> (this :void, get :(this :void) => T) :{ readonly value :T };\n		computed<T> (this :void, {} :{ readonly get :(this :void) => T; readonly set :(this :void, value :T) => void }) :{ value :T };\n		compile? :never;\n	} & { [API in\n		| \'BaseTransition\'\n		| \'Comment\'\n		| \'Fragment\'\n		| \'KeepAlive\'\n		| \'Static\'\n		| \'Suspense\'\n		| \'Teleport\'\n		| \'Text\'\n		| \'Transition\'\n		| \'TransitionGroup\'\n		| \'callWithAsyncErrorHandling\'\n		| \'callWithErrorHandling\'\n		| \'camelize\'\n		| \'capitalize\'\n		| \'cloneVNode\'\n		| \'createApp\'\n		| \'createBlock\'\n		| \'createCommentVNode\'\n		| \'createHydrationRenderer\'\n		| \'createRenderer\'\n		| \'createSSRApp\'\n		| \'createSlots\'\n		| \'createStaticVNode\'\n		| \'createTextVNode\'\n		| \'createVNode\'\n		| \'customRef\'\n		| \'defineAsyncComponent\'\n		| \'defineComponent\'\n		| \'getCurrentInstance\'\n		| \'getTransitionRawChildren\'\n		| \'handleError\'\n		| \'hydrate\'\n		| \'initCustomFormatter\'\n		| \'inject\'\n		| \'isProxy\'\n		| \'isReactive\'\n		| \'isReadonly\'\n		| \'isRef\'\n		| \'isVNode\'\n		| \'markRaw\'\n		| \'mergeProps\'\n		| \'nextTick\'\n		| \'onActivated\'\n		| \'onBeforeMount\'\n		| \'onBeforeUnmount\'\n		| \'onBeforeUpdate\'\n		| \'onDeactivated\'\n		| \'onErrorCaptured\'\n		| \'onMounted\'\n		| \'onRenderTracked\'\n		| \'onRenderTriggered\'\n		| \'onUnmounted\'\n		| \'onUpdated\'\n		| \'openBlock\'\n		| \'popScopeId\'\n		| \'provide\'\n		| \'proxyRefs\'\n		| \'pushScopeId\'\n		| \'queuePostFlushCb\'\n		| \'readonly\'\n		| \'registerRuntimeCompiler\'\n		| \'render\'\n		| \'renderList\'\n		| \'renderSlot\'\n		| \'resolveComponent\'\n		| \'resolveDirective\'\n		| \'resolveDynamicComponent\'\n		| \'resolveTransitionHooks\'\n		| \'setBlockTracking\'\n		| \'setDevtoolsHook\'\n		| \'setTransitionHooks\'\n		| \'shallowReactive\'\n		| \'shallowReadonly\'\n		| \'shallowRef\'\n		| \'ssrContextKey\'\n		| \'ssrUtils\'\n		| \'toDisplayString\'\n		| \'toHandlers\'\n		| \'toRaw\'\n		| \'toRef\'\n		| \'toRefs\'\n		| \'transformVNodeArgs\'\n		| \'triggerRef\'\n		| \'unref\'\n		| \'useCssModule\'\n		| \'useCssVars\'\n		| \'useSSRContext\'\n		| \'useTransitionState\'\n		| \'vModelCheckbox\'\n		| \'vModelDynamic\'\n		| \'vModelRadio\'\n		| \'vModelSelect\'\n		| \'vModelText\'\n		| \'vShow\'\n		| \'version\'\n		| \'warn\'\n		| \'watch\'\n		| \'watchEffect\'\n		| \'withCtx\'\n		| \'withDirectives\'\n		| \'withKeys\'\n		| \'withModifiers\'\n		| \'withScopeId\'\n	] :any }>;\n	\n}\n';

const _ID_ = /'(\*?\??j-vue=?)'/g;

const tsd = _tsd.replace(/(?:\r?\n\texport type [_{][^;]*;)+/, '');

const TSD = (ids                                 ) => tsd.replace(_ID_, (_id_        , id    ) => StringLiteral(( ids && ids[id] ) ?? id));

const _default = Default({
	version: version$3,
	SFC,
	TSD,
	DOT: require('path').join(__dirname, 'lib', 'DOT.js'),
	UMD: require('path').join(__dirname, 'lib', 'UMD.js'),
	ESM: require('path').join(__dirname, 'lib', 'ESM.js'),
});

module.exports = _default;

//# sourceMappingURL=index.js.map