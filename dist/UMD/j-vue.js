﻿/*!
 * 模块名称：jVue
 * 模块功能：对 .vue 文件进行构建后的前端统一依赖。从属于“简计划”。
   　　　　　The unified dependency for built .vue files. Belong to "Plan J".
 * 模块版本：1.3.0
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

	var semver = [1, 3, 0];

	var create = /*window.*/Object.create;
	//var Function = window.Function;
	//var Error = window.Error;
	//var document = window.document;

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

	function Replacer (scope) {
		return typeof scope==='function' ?
			function (__ID__) { return scope(__ID__.slice(2, -2)); } :
			function (__ID__) {
				var ID = __ID__.slice(2, -2);
				if ( ID in scope ) { return scope[ID]; }
				throw new Error(__ID__);
			};
	}

	function Render (code, scope) {
		return Function(
			scope
				? code.replace(IDENTIFIERS, Replacer(scope))
				: code
		);
	}

	function StaticRenderFns (codes, scope) {
		var fns = [];
		var length = codes.length;
		var index = 0;
		if ( scope ) {
			var replacer = Replacer(scope);
			while ( index<length ) {
				fns.push(Function(codes[index].replace(IDENTIFIERS, replacer)));
				++index;
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

	var STYLE = {
		render: function (createElement) {
			return createElement('style', {
				domProps: {
					textContent: 'default' in this.$slots ? this.$slots.default[0].text : ''
				}
			});
		}
	};

	function Style (css, scope) {
		var style = document.createElement('style');
		if ( css ) {
			style.textContent =
				scope
					? css.replace(IDENTIFIERS, Replacer(scope))
					: css;
		}
		HEAD.appendChild(style);
		return style;
	}

	function remove (style) {
		HEAD.removeChild(style);
		return remove;
	}

	var jDoc = {
		semver: semver,
		Scope: Scope,
		Render: Render,
		StaticRenderFns: StaticRenderFns,
		STYLE: STYLE,
		Style: Style,
		remove: remove
	};

	jDoc.default = jDoc;

	return jDoc;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZW12ZXIuanNvbiIsInNyYy9leHBvcnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgWzEsIDMsIDBdOyIsImltcG9ydCBzZW12ZXIgZnJvbSAnLi9zZW12ZXIuanNvbic7XG5leHBvcnQgeyBzZW12ZXIgfTtcblxudmFyIGNyZWF0ZSA9IC8qd2luZG93LiovT2JqZWN0LmNyZWF0ZTtcbi8vdmFyIEZ1bmN0aW9uID0gd2luZG93LkZ1bmN0aW9uO1xuLy92YXIgRXJyb3IgPSB3aW5kb3cuRXJyb3I7XG4vL3ZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxudmFyIEhFQUQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZmlyc3RDaGlsZDtcblxudmFyIElERU5USUZJRVJTID0gLy0tW2Etel9dXFx3Ki0tfF9fW2EtejAtOSRdKyg/Ol9bYS16MC05JF0rKSpfXy9pZztcblxuLy92YXIgUkVTRVJWRURfV09SRFMgPSBmdW5jdGlvbiAoU2V0KSB7XG4vL1x0U2V0LnByb3RvdHlwZSA9IGNyZWF0ZShudWxsKTtcbi8vXHRyZXR1cm4gbmV3IFNldDtcbi8vfShmdW5jdGlvbiAoKSB7XG4vL1x0dGhpcy5icmVhayA9IHRoaXMuY2FzZSA9IHRoaXMuY2F0Y2ggPSB0aGlzLmNsYXNzID0gdGhpcy5jb25zdCA9IHRoaXMuY29udGludWUgPSB0aGlzLmRlYnVnZ2VyID0gdGhpcy5kZWZhdWx0ID0gdGhpcy5kZWxldGUgPSB0aGlzLmRvID0gdGhpcy5lbHNlID0gdGhpcy5lbnVtID0gdGhpcy5leHBvcnQgPSB0aGlzLmV4dGVuZHMgPSB0aGlzLmZpbmFsbHkgPSB0aGlzLmZvciA9IHRoaXMuZnVuY2l0b24gPSB0aGlzLmlmID0gdGhpcy5pbXBvcnQgPSB0aGlzLmluID0gdGhpcy5pbnN0YW5jZW9mID0gdGhpcy5sZXQgPSB0aGlzLm5ldyA9IHRoaXMucmV0dXJuID0gdGhpcy50cnkgPSB0aGlzLnN1cGVyID0gdGhpcy5zd2l0Y2ggPSB0aGlzLnRoaXMgPSB0aGlzLnRocm93ID0gdGhpcy50eXBlb2YgPSB0aGlzLnZhciA9IHRoaXMudm9pZCA9IHRoaXMud2hpbGUgPSB0aGlzLndpdGggPSBudWxsO1xuLy99KTtcblxudmFyIG1hcHBlciA9IHtcblx0MDogJzEnLCAxOiAnMicsIDI6ICczJywgMzogJzQnLCA0OiAnNScsIDU6ICc2JywgNjogJzcnLCA3OiAnOCcsIDg6ICc5JywgOTogJ2EnLFxuXHRhOiAnYicsIGI6ICdjJywgYzogJ2QnLCBkOiAnZScsIGU6ICdmJywgZjogJ2cnLCBnOiAnaCcsXG5cdGg6ICdpJywgaTogJ2onLCBqOiAnaycsIGs6ICdsJywgbDogJ20nLCBtOiAnbicsIG46ICdvJyxcblx0bzogJ3AnLCBwOiAncScsIHE6ICdyJywgcjogJ3MnLCBzOiAndCcsIHQ6ICd1Jyxcblx0dTogJ3YnLCB2OiAndycsIHc6ICd4JywgeDogJ3knLCB5OiAneidcbn07XG52YXIgaWRlbnRpZmllckFycmF5ID0gWyc5J107XG52YXIgaWRlbnRpZmllckFycmF5X2xhc3RJdGVtID0gJzknO1xudmFyIGlkZW50aWZpZXJBcnJheV9sYXN0SW5kZXggPSAwO1xuXG5mdW5jdGlvbiBJZGVudGlmaWVyICgpIHtcblx0aWYgKCBpZGVudGlmaWVyQXJyYXlfbGFzdEl0ZW09PT0neicgKSB7XG5cdFx0aWRlbnRpZmllckFycmF5X2xhc3RJdGVtID0gaWRlbnRpZmllckFycmF5W2lkZW50aWZpZXJBcnJheV9sYXN0SW5kZXhdID0gJzAnO1xuXHRcdGZvciAoIHZhciB3SW5kZXggPSBpZGVudGlmaWVyQXJyYXlfbGFzdEluZGV4OyA7ICkge1xuXHRcdFx0aWYgKCB3SW5kZXggKSB7XG5cdFx0XHRcdGlmICggaWRlbnRpZmllckFycmF5Wy0td0luZGV4XT09PSd6JyApIHsgaWRlbnRpZmllckFycmF5W3dJbmRleF0gPSAnMCc7IH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWRlbnRpZmllckFycmF5W3dJbmRleF0gPSBtYXBwZXJbaWRlbnRpZmllckFycmF5W3dJbmRleF1dO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWRlbnRpZmllckFycmF5LnVuc2hpZnQoJ2EnKTtcblx0XHRcdFx0KytpZGVudGlmaWVyQXJyYXlfbGFzdEluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7IGlkZW50aWZpZXJBcnJheV9sYXN0SXRlbSA9IGlkZW50aWZpZXJBcnJheVtpZGVudGlmaWVyQXJyYXlfbGFzdEluZGV4XSA9IG1hcHBlcltpZGVudGlmaWVyQXJyYXlfbGFzdEl0ZW1dOyB9XG5cdHJldHVybiBpZGVudGlmaWVyQXJyYXkuam9pbignJyk7XG5cdC8vdmFyIGlkZW50aWZpZXJTdHJpbmcgPSBpZGVudGlmaWVyQXJyYXkuam9pbignJyk7XG5cdC8vaWYgKCBpZGVudGlmaWVyU3RyaW5nIGluIFJFU0VSVkVEX1dPUkRTICkge1xuXHQvL1x0aWRlbnRpZmllckFycmF5X2xhc3RJdGVtID0gaWRlbnRpZmllckFycmF5W2lkZW50aWZpZXJBcnJheV9sYXN0SW5kZXhdID0gbWFwcGVyW2lkZW50aWZpZXJBcnJheV9sYXN0SXRlbV07XG5cdC8vXHRpZGVudGlmaWVyU3RyaW5nID0gaWRlbnRpZmllckFycmF5LmpvaW4oJycpO1xuXHQvL31cblx0Ly9yZXR1cm4gaWRlbnRpZmllclN0cmluZztcbn1cblxuZnVuY3Rpb24gSWRlbnRpZmllcnNPYmplY3QgKElEcykge1xuXHR2YXIgaW5kZXggPSBJRHMubGVuZ3RoO1xuXHR3aGlsZSAoIGluZGV4ICkge1xuXHRcdHRoaXNbSURzWy0taW5kZXhdXSA9IElkZW50aWZpZXIoKTtcblx0fVxufVxuXG5JZGVudGlmaWVyc09iamVjdC5wcm90b3R5cGUgPSBjcmVhdGUobnVsbCk7XG5cbmZ1bmN0aW9uIElkZW50aWZpZXJzRnVuY3Rpb24gKCkge1xuXHR2YXIgaWRlbnRpZmllcnMgPSBjcmVhdGUobnVsbCk7XG5cdHJldHVybiBmdW5jdGlvbiAoSUQpIHtcblx0XHRpZiAoIElEIGluIGlkZW50aWZpZXJzICkgeyByZXR1cm4gaWRlbnRpZmllcnNbSURdOyB9XG5cdFx0cmV0dXJuIGlkZW50aWZpZXJzW0lEXSA9IElkZW50aWZpZXIoKTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjb3BlIChJRF9fSUQpIHtcblx0cmV0dXJuIElEX19JRCA/IG5ldyBJZGVudGlmaWVyc09iamVjdChJRF9fSUQuc3BsaXQoJy0tJykpIDogSWRlbnRpZmllcnNGdW5jdGlvbigpO1xufVxuXG5mdW5jdGlvbiBSZXBsYWNlciAoc2NvcGUpIHtcblx0cmV0dXJuIHR5cGVvZiBzY29wZT09PSdmdW5jdGlvbicgP1xuXHRcdGZ1bmN0aW9uIChfX0lEX18pIHsgcmV0dXJuIHNjb3BlKF9fSURfXy5zbGljZSgyLCAtMikpOyB9IDpcblx0XHRmdW5jdGlvbiAoX19JRF9fKSB7XG5cdFx0XHR2YXIgSUQgPSBfX0lEX18uc2xpY2UoMiwgLTIpO1xuXHRcdFx0aWYgKCBJRCBpbiBzY29wZSApIHsgcmV0dXJuIHNjb3BlW0lEXTsgfVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKF9fSURfXyk7XG5cdFx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlbmRlciAoY29kZSwgc2NvcGUpIHtcblx0cmV0dXJuIEZ1bmN0aW9uKFxuXHRcdHNjb3BlXG5cdFx0XHQ/IGNvZGUucmVwbGFjZShJREVOVElGSUVSUywgUmVwbGFjZXIoc2NvcGUpKVxuXHRcdFx0OiBjb2RlXG5cdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdGF0aWNSZW5kZXJGbnMgKGNvZGVzLCBzY29wZSkge1xuXHR2YXIgZm5zID0gW107XG5cdHZhciBsZW5ndGggPSBjb2Rlcy5sZW5ndGg7XG5cdHZhciBpbmRleCA9IDA7XG5cdGlmICggc2NvcGUgKSB7XG5cdFx0dmFyIHJlcGxhY2VyID0gUmVwbGFjZXIoc2NvcGUpO1xuXHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdFx0Zm5zLnB1c2goRnVuY3Rpb24oY29kZXNbaW5kZXhdLnJlcGxhY2UoSURFTlRJRklFUlMsIHJlcGxhY2VyKSkpO1xuXHRcdFx0KytpbmRleDtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0XHRmbnMucHVzaChGdW5jdGlvbihjb2Rlc1tpbmRleF0pKTtcblx0XHRcdCsraW5kZXg7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmbnM7XG59XG5cbmV4cG9ydCB2YXIgU1RZTEUgPSB7XG5cdHJlbmRlcjogZnVuY3Rpb24gKGNyZWF0ZUVsZW1lbnQpIHtcblx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7XG5cdFx0XHRkb21Qcm9wczoge1xuXHRcdFx0XHR0ZXh0Q29udGVudDogJ2RlZmF1bHQnIGluIHRoaXMuJHNsb3RzID8gdGhpcy4kc2xvdHMuZGVmYXVsdFswXS50ZXh0IDogJydcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFN0eWxlIChjc3MsIHNjb3BlKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdGlmICggY3NzICkge1xuXHRcdHN0eWxlLnRleHRDb250ZW50ID1cblx0XHRcdHNjb3BlXG5cdFx0XHRcdD8gY3NzLnJlcGxhY2UoSURFTlRJRklFUlMsIFJlcGxhY2VyKHNjb3BlKSlcblx0XHRcdFx0OiBjc3M7XG5cdH1cblx0SEVBRC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdHJldHVybiBzdHlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZSAoc3R5bGUpIHtcblx0SEVBRC5yZW1vdmVDaGlsZChzdHlsZSk7XG5cdHJldHVybiByZW1vdmU7XG59XG5cbnZhciBqRG9jID0ge1xuXHRzZW12ZXI6IHNlbXZlcixcblx0U2NvcGU6IFNjb3BlLFxuXHRSZW5kZXI6IFJlbmRlcixcblx0U3RhdGljUmVuZGVyRm5zOiBTdGF0aWNSZW5kZXJGbnMsXG5cdFNUWUxFOiBTVFlMRSxcblx0U3R5bGU6IFN0eWxlLFxuXHRyZW1vdmU6IHJlbW92ZVxufTtcblxuakRvYy5kZWZhdWx0ID0gakRvYztcblxuZXhwb3J0IGRlZmF1bHQgakRvYztcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7d0JBQUMsdkJDR3pCLElBQUksTUFBTSxjQUFjLE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDdEM7Q0FDQTtDQUNBOztDQUVBLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDOztDQUUvQyxJQUFJLFdBQVcsR0FBRyxnREFBZ0QsQ0FBQzs7Q0FFbkU7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOztDQUVBLElBQUksTUFBTSxHQUFHO0NBQ2IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRztDQUMvRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHO0NBQ3ZELENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxF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