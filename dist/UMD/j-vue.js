﻿/*!
 * 模块名称：jVue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified dependency for built .vue files. Belong to "Plan J".
 * 模块版本：1.0.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-vue/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-vue/
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.jVue = factory());
}(this, (function () { 'use strict';

	var semver = [1, 0, 1];

	var create = window.Object.create;
	var Function = window.Function;
	var Error = window.Error;
	var document = window.document;

	var HEAD = document.documentElement.firstChild;

	var IDENTIFIERS = /--[a-z_]\w*--|__[a-z0-9$]+(?:_[a-z0-9$]+)*__/ig;

	//var RESERVED_WORDS = function (Set) {
	//	Set.prototype = create(null);
	//	return new Set;
	//}(function () {
	//	this.break = this.case = this.catch = this.class = this.const = this.continue = this.debugger = this.default = this.delete = this.do = this.else = this.enum = this.export = this.extends = this.finally = this.for = this.funciton = this.if = this.import = this.in = this.instanceof = this.let = this.new = this.return = this.try = this.super = this.switch = this.this = this.throw = this.typeof = this.var = this.void = this.while = this.with = null;
	//});

	var mapper = {
		0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'a',
		a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
		h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
		o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
		u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
	};
	var identifierArray = ['9'];
	var identifierArray_lastItem = '9';
	var identifierArray_lastIndex = 0;

	function Identifier () {
		if ( identifierArray_lastItem==='z' ) {
			identifierArray_lastItem = identifierArray[identifierArray_lastIndex] = '0';
			for ( var wIndex = identifierArray_lastIndex; ; ) {
				if ( wIndex ) {
					if ( identifierArray[--wIndex]==='z' ) { identifierArray[wIndex] = '0'; }
					else {
						identifierArray[wIndex] = mapper[identifierArray[wIndex]];
						break;
					}
				}
				else {
					identifierArray.unshift('a');
					++identifierArray_lastIndex;
					break;
				}
			}
		}
		else { identifierArray_lastItem = identifierArray[identifierArray_lastIndex] = mapper[identifierArray_lastItem]; }
		return identifierArray.join('');
		//var identifierString = identifierArray.join('');
		//if ( identifierString in RESERVED_WORDS ) {
		//	identifierArray_lastItem = identifierArray[identifierArray_lastIndex] = mapper[identifierArray_lastItem];
		//	identifierString = identifierArray.join('');
		//}
		//return identifierString;
	}

	function IdentifiersObject (IDs) {
		var index = IDs.length;
		while ( index ) {
			this[IDs[--index]] = Identifier();
		}
	}

	IdentifiersObject.prototype = create(null);

	function IdentifiersFunction () {
		var identifiers = create(null);
		return function (ID) {
			if ( ID in identifiers ) { return identifiers[ID]; }
			return identifiers[ID] = Identifier();
		};
	}

	function Scope (ID__ID) {
		return ID__ID ? new IdentifiersObject(ID__ID.split('--')) : IdentifiersFunction();
	}

	function Render (code, scope) {
		return Function(
			scope ?
				typeof scope==='function' ?
					code.replace(IDENTIFIERS, function (__ID__) {
						return scope(__ID__.slice(2, -2));
					}) :
					code.replace(IDENTIFIERS, function (__ID__) {
						var ID = __ID__.slice(2, -2);
						if ( ID in scope ) { return scope[ID]; }
						throw new Error(__ID__);
					}) :
				code
		);
	}

	function StaticRenderFns (codes, scope) {
		var fns = [];
		var length = codes.length;
		var index = 0;
		if ( scope ) {
			if ( typeof scope==='function' ) {
				while ( index<length ) {
					fns.push(Function(codes[index].replace(IDENTIFIERS, function (__ID__) {
						return scope(__ID__.slice(2, -2));
					})));
					++index;
				}
			}
			else {
				while ( index<length ) {
					fns.push(Function(codes[index].replace(IDENTIFIERS, function (__ID__) {
						var ID = __ID__.slice(2, -2);
						if ( ID in scope ) { return scope[ID]; }
						throw new Error(__ID__);
					})));
					++index;
				}
			}
		}
		else {
			while ( index<length ) {
				fns.push(Function(codes[index]));
				++index;
			}
		}
		return fns;
	}

	function Style (css, scope) {
		var style = document.createElement('style');
		if ( css ) {
			style.textContent =
				scope ?
					typeof scope==='function' ?
						css.replace(IDENTIFIERS, function (__ID__) {
							return scope(__ID__.slice(2, -2));
						}) :
						css.replace(IDENTIFIERS, function (__ID__) {
							var ID = __ID__.slice(2, -2);
							if ( ID in scope ) { return scope[ID]; }
							throw new Error(__ID__);
						}) :
					css;
		}
		HEAD.appendChild(style);
		return style;
	}

	function remove (style) {
		HEAD.removeChild(style);
	}

	var jDoc = {
		semver: semver,
		Scope: Scope,
		Render: Render,
		StaticRenderFns: StaticRenderFns,
		Style: Style,
		remove: remove
	};

	jDoc.default = jDoc;

	return jDoc;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZW12ZXIuanNvbiIsInNyYy9leHBvcnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgWzEsIDAsIDFdOyIsImltcG9ydCBzZW12ZXIgZnJvbSAnLi9zZW12ZXIuanNvbic7XG5leHBvcnQgeyBzZW12ZXIgfTtcblxudmFyIGNyZWF0ZSA9IHdpbmRvdy5PYmplY3QuY3JlYXRlO1xudmFyIEZ1bmN0aW9uID0gd2luZG93LkZ1bmN0aW9uO1xudmFyIEVycm9yID0gd2luZG93LkVycm9yO1xudmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXG52YXIgSEVBRCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5maXJzdENoaWxkO1xuXG52YXIgSURFTlRJRklFUlMgPSAvLS1bYS16X11cXHcqLS18X19bYS16MC05JF0rKD86X1thLXowLTkkXSspKl9fL2lnO1xuXG4vL3ZhciBSRVNFUlZFRF9XT1JEUyA9IGZ1bmN0aW9uIChTZXQpIHtcbi8vXHRTZXQucHJvdG90eXBlID0gY3JlYXRlKG51bGwpO1xuLy9cdHJldHVybiBuZXcgU2V0O1xuLy99KGZ1bmN0aW9uICgpIHtcbi8vXHR0aGlzLmJyZWFrID0gdGhpcy5jYXNlID0gdGhpcy5jYXRjaCA9IHRoaXMuY2xhc3MgPSB0aGlzLmNvbnN0ID0gdGhpcy5jb250aW51ZSA9IHRoaXMuZGVidWdnZXIgPSB0aGlzLmRlZmF1bHQgPSB0aGlzLmRlbGV0ZSA9IHRoaXMuZG8gPSB0aGlzLmVsc2UgPSB0aGlzLmVudW0gPSB0aGlzLmV4cG9ydCA9IHRoaXMuZXh0ZW5kcyA9IHRoaXMuZmluYWxseSA9IHRoaXMuZm9yID0gdGhpcy5mdW5jaXRvbiA9IHRoaXMuaWYgPSB0aGlzLmltcG9ydCA9IHRoaXMuaW4gPSB0aGlzLmluc3RhbmNlb2YgPSB0aGlzLmxldCA9IHRoaXMubmV3ID0gdGhpcy5yZXR1cm4gPSB0aGlzLnRyeSA9IHRoaXMuc3VwZXIgPSB0aGlzLnN3aXRjaCA9IHRoaXMudGhpcyA9IHRoaXMudGhyb3cgPSB0aGlzLnR5cGVvZiA9IHRoaXMudmFyID0gdGhpcy52b2lkID0gdGhpcy53aGlsZSA9IHRoaXMud2l0aCA9IG51bGw7XG4vL30pO1xuXG52YXIgbWFwcGVyID0ge1xuXHQwOiAnMScsIDE6ICcyJywgMjogJzMnLCAzOiAnNCcsIDQ6ICc1JywgNTogJzYnLCA2OiAnNycsIDc6ICc4JywgODogJzknLCA5OiAnYScsXG5cdGE6ICdiJywgYjogJ2MnLCBjOiAnZCcsIGQ6ICdlJywgZTogJ2YnLCBmOiAnZycsIGc6ICdoJyxcblx0aDogJ2knLCBpOiAnaicsIGo6ICdrJywgazogJ2wnLCBsOiAnbScsIG06ICduJywgbjogJ28nLFxuXHRvOiAncCcsIHA6ICdxJywgcTogJ3InLCByOiAncycsIHM6ICd0JywgdDogJ3UnLFxuXHR1OiAndicsIHY6ICd3JywgdzogJ3gnLCB4OiAneScsIHk6ICd6J1xufTtcbnZhciBpZGVudGlmaWVyQXJyYXkgPSBbJzknXTtcbnZhciBpZGVudGlmaWVyQXJyYXlfbGFzdEl0ZW0gPSAnOSc7XG52YXIgaWRlbnRpZmllckFycmF5X2xhc3RJbmRleCA9IDA7XG5cbmZ1bmN0aW9uIElkZW50aWZpZXIgKCkge1xuXHRpZiAoIGlkZW50aWZpZXJBcnJheV9sYXN0SXRlbT09PSd6JyApIHtcblx0XHRpZGVudGlmaWVyQXJyYXlfbGFzdEl0ZW0gPSBpZGVudGlmaWVyQXJyYXlbaWRlbnRpZmllckFycmF5X2xhc3RJbmRleF0gPSAnMCc7XG5cdFx0Zm9yICggdmFyIHdJbmRleCA9IGlkZW50aWZpZXJBcnJheV9sYXN0SW5kZXg7IDsgKSB7XG5cdFx0XHRpZiAoIHdJbmRleCApIHtcblx0XHRcdFx0aWYgKCBpZGVudGlmaWVyQXJyYXlbLS13SW5kZXhdPT09J3onICkgeyBpZGVudGlmaWVyQXJyYXlbd0luZGV4XSA9ICcwJzsgfVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZGVudGlmaWVyQXJyYXlbd0luZGV4XSA9IG1hcHBlcltpZGVudGlmaWVyQXJyYXlbd0luZGV4XV07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZGVudGlmaWVyQXJyYXkudW5zaGlmdCgnYScpO1xuXHRcdFx0XHQrK2lkZW50aWZpZXJBcnJheV9sYXN0SW5kZXg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHsgaWRlbnRpZmllckFycmF5X2xhc3RJdGVtID0gaWRlbnRpZmllckFycmF5W2lkZW50aWZpZXJBcnJheV9sYXN0SW5kZXhdID0gbWFwcGVyW2lkZW50aWZpZXJBcnJheV9sYXN0SXRlbV07IH1cblx0cmV0dXJuIGlkZW50aWZpZXJBcnJheS5qb2luKCcnKTtcblx0Ly92YXIgaWRlbnRpZmllclN0cmluZyA9IGlkZW50aWZpZXJBcnJheS5qb2luKCcnKTtcblx0Ly9pZiAoIGlkZW50aWZpZXJTdHJpbmcgaW4gUkVTRVJWRURfV09SRFMgKSB7XG5cdC8vXHRpZGVudGlmaWVyQXJyYXlfbGFzdEl0ZW0gPSBpZGVudGlmaWVyQXJyYXlbaWRlbnRpZmllckFycmF5X2xhc3RJbmRleF0gPSBtYXBwZXJbaWRlbnRpZmllckFycmF5X2xhc3RJdGVtXTtcblx0Ly9cdGlkZW50aWZpZXJTdHJpbmcgPSBpZGVudGlmaWVyQXJyYXkuam9pbignJyk7XG5cdC8vfVxuXHQvL3JldHVybiBpZGVudGlmaWVyU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBJZGVudGlmaWVyc09iamVjdCAoSURzKSB7XG5cdHZhciBpbmRleCA9IElEcy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dGhpc1tJRHNbLS1pbmRleF1dID0gSWRlbnRpZmllcigpO1xuXHR9XG59XG5cbklkZW50aWZpZXJzT2JqZWN0LnByb3RvdHlwZSA9IGNyZWF0ZShudWxsKTtcblxuZnVuY3Rpb24gSWRlbnRpZmllcnNGdW5jdGlvbiAoKSB7XG5cdHZhciBpZGVudGlmaWVycyA9IGNyZWF0ZShudWxsKTtcblx0cmV0dXJuIGZ1bmN0aW9uIChJRCkge1xuXHRcdGlmICggSUQgaW4gaWRlbnRpZmllcnMgKSB7IHJldHVybiBpZGVudGlmaWVyc1tJRF07IH1cblx0XHRyZXR1cm4gaWRlbnRpZmllcnNbSURdID0gSWRlbnRpZmllcigpO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU2NvcGUgKElEX19JRCkge1xuXHRyZXR1cm4gSURfX0lEID8gbmV3IElkZW50aWZpZXJzT2JqZWN0KElEX19JRC5zcGxpdCgnLS0nKSkgOiBJZGVudGlmaWVyc0Z1bmN0aW9uKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZW5kZXIgKGNvZGUsIHNjb3BlKSB7XG5cdHJldHVybiBGdW5jdGlvbihcblx0XHRzY29wZSA/XG5cdFx0XHR0eXBlb2Ygc2NvcGU9PT0nZnVuY3Rpb24nID9cblx0XHRcdFx0Y29kZS5yZXBsYWNlKElERU5USUZJRVJTLCBmdW5jdGlvbiAoX19JRF9fKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNjb3BlKF9fSURfXy5zbGljZSgyLCAtMikpO1xuXHRcdFx0XHR9KSA6XG5cdFx0XHRcdGNvZGUucmVwbGFjZShJREVOVElGSUVSUywgZnVuY3Rpb24gKF9fSURfXykge1xuXHRcdFx0XHRcdHZhciBJRCA9IF9fSURfXy5zbGljZSgyLCAtMik7XG5cdFx0XHRcdFx0aWYgKCBJRCBpbiBzY29wZSApIHsgcmV0dXJuIHNjb3BlW0lEXTsgfVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihfX0lEX18pO1xuXHRcdFx0XHR9KSA6XG5cdFx0XHRjb2RlXG5cdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdGF0aWNSZW5kZXJGbnMgKGNvZGVzLCBzY29wZSkge1xuXHR2YXIgZm5zID0gW107XG5cdHZhciBsZW5ndGggPSBjb2Rlcy5sZW5ndGg7XG5cdHZhciBpbmRleCA9IDA7XG5cdGlmICggc2NvcGUgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc2NvcGU9PT0nZnVuY3Rpb24nICkge1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0XHRcdGZucy5wdXNoKEZ1bmN0aW9uKGNvZGVzW2luZGV4XS5yZXBsYWNlKElERU5USUZJRVJTLCBmdW5jdGlvbiAoX19JRF9fKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNjb3BlKF9fSURfXy5zbGljZSgyLCAtMikpO1xuXHRcdFx0XHR9KSkpO1xuXHRcdFx0XHQrK2luZGV4O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdFx0XHRmbnMucHVzaChGdW5jdGlvbihjb2Rlc1tpbmRleF0ucmVwbGFjZShJREVOVElGSUVSUywgZnVuY3Rpb24gKF9fSURfXykge1xuXHRcdFx0XHRcdHZhciBJRCA9IF9fSURfXy5zbGljZSgyLCAtMik7XG5cdFx0XHRcdFx0aWYgKCBJRCBpbiBzY29wZSApIHsgcmV0dXJuIHNjb3BlW0lEXTsgfVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihfX0lEX18pO1xuXHRcdFx0XHR9KSkpO1xuXHRcdFx0XHQrK2luZGV4O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRcdGZucy5wdXNoKEZ1bmN0aW9uKGNvZGVzW2luZGV4XSkpO1xuXHRcdFx0KytpbmRleDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0eWxlIChjc3MsIHNjb3BlKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkge1xuXHRcdHN0eWxlLnRleHRDb250ZW50ID1cblx0XHRcdHNjb3BlID9cblx0XHRcdFx0dHlwZW9mIHNjb3BlPT09J2Z1bmN0aW9uJyA/XG5cdFx0XHRcdFx0Y3NzLnJlcGxhY2UoSURFTlRJRklFUlMsIGZ1bmN0aW9uIChfX0lEX18pIHtcblx0XHRcdFx0XHRcdHJldHVybiBzY29wZShfX0lEX18uc2xpY2UoMiwgLTIpKTtcblx0XHRcdFx0XHR9KSA6XG5cdFx0XHRcdFx0Y3NzLnJlcGxhY2UoSURFTlRJRklFUlMsIGZ1bmN0aW9uIChfX0lEX18pIHtcblx0XHRcdFx0XHRcdHZhciBJRCA9IF9fSURfXy5zbGljZSgyLCAtMik7XG5cdFx0XHRcdFx0XHRpZiAoIElEIGluIHNjb3BlICkgeyByZXR1cm4gc2NvcGVbSURdOyB9XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoX19JRF9fKTtcblx0XHRcdFx0XHR9KSA6XG5cdFx0XHRcdGNzcztcblx0fVxuXHRIRUFELmFwcGVuZENoaWxkKHN0eWxlKTtcblx0cmV0dXJuIHN0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlIChzdHlsZSkge1xuXHRIRUFELnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cblxudmFyIGpEb2MgPSB7XG5cdHNlbXZlcjogc2VtdmVyLFxuXHRTY29wZTogU2NvcGUsXG5cdFJlbmRlcjogUmVuZGVyLFxuXHRTdGF0aWNSZW5kZXJGbnM6IFN0YXRpY1JlbmRlckZucyxcblx0U3R5bGU6IFN0eWxlLFxuXHRyZW1vdmU6IHJlbW92ZVxufTtcblxuakRvYy5kZWZhdWx0ID0gakRvYztcblxuZXhwb3J0IGRlZmF1bHQgakRvYztcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7d0JBQUMsdkJDR3pCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0NBQ2xDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Q0FDL0IsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztDQUN6QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDOztDQUUvQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQzs7Q0FFL0MsSUFBSSxXQUFXLEdBQUcsZ0RBQWdELENBQUM7O0NBRW5FO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7Q0FFQSxJQUFJLE1BQU0sR0FBRztDQUNiLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Q0FDL0UsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztDQUN2RCxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0NBQ3ZELENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0NBQy9DLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztDQUN2QyxDQUFDLENBQUM7Q0FDRixJQUFJLGVBQWUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzVCLElBQUksd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0NBQ25DLElBQUkseUJB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