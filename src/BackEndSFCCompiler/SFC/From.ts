import Error from '.Error';
import RegExp from '.RegExp';
import undefined from '.undefined';

import { StringLiteral } from '@ltd/j-es';
import { newRegExp, groupify } from '@ltd/j-regexp';

import KEYS from '../../FrontEndRuntimeDependency/Scope/KEYS';

import _ from './private';
import { compatible_template } from './Template/Content/';
import { compatible_render } from './Template/';
import { Render3, Render2 } from './Render';

const NULo = /^\x00[0-7]/;
const LF_CR_LS_PS = /[\n\r\u2028\u2029]/g;
const escapeCSS_LF_CR_LS_PS = ($0 :string) :string => $0==='\n' ? '\\00000A' : $0==='\r' ? '\\00000D' : $0==='\u2028' ? '\\002028' : '\\002029';
const escapeHTML_LF_CR_LS_PS = ($0 :string) :string => $0==='\n' ? '&#x0A;' : $0==='\r' ? '&#0D;' : $0==='\u2028' ? '&#x2028;' : '&#x2029;';
const VisibleStringLiteral = (id :string) :string => {
	const literal :string = StringLiteral(id);
	return id[0]==='\x00' ? ( NULo.test(id) ? `'\\x00` : `'\\0` ) + literal.slice(2) : literal;
};

const __KEY__ = newRegExp`^__${KEYS}__$`;

export default function * From (tab :string, mode :'const' | 'var' | 'let', styles :Style[], template :Template | null, from :string | null, eol :string) {
	
	const options = { indent: tab, newline: eol, newlineSelector: false, newlineProperty: false };
	
	if ( from===null ) {
		const { length } = styles;
		if ( length ) {
			const style = styles[0]!;
			if ( _(style).media!==undefined ) { throw Error(`当前模式下，style 标签上的 media 属性无法被保留`); }
			yield `export ${mode} style = ${StringLiteral(style.innerCSS)};${eol}`;
			for ( const line of style.sheet[Symbol.iterator](options) ) {
				yield `//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}${eol}`;
			}
			yield eol;
			if ( length===1 ) {
				yield `export ${mode} styles = [ style ];`;
			}
			else {
				yield `export ${mode} styles = [ style,${eol}`;
				let index = 1;
				while ( index!==length ) {
					const style = styles[index++]!;
					if ( _(style).media!==undefined ) { throw Error(`当前模式下，style 标签上的 media 属性无法被保留`); }
					yield `${tab}${StringLiteral(style.innerCSS)},${eol}`;
					for ( const line of style.sheet[Symbol.iterator](options) ) {
						yield `${tab}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}${eol}`;
					}
				}
				yield `];`;
			}
		}
		else {
			yield `export ${mode} styles = [ ];`;
		}
		yield eol;
		if ( template ) {
			yield eol;
			const { innerHTML } = template;
			const __ = compatible_template ? '' : '//';
			const literal = { eol, tab };
			yield `export ${mode} delimiters = [ '{{', '}}' ];${eol}`;
			yield `${__}export ${mode} template = ${StringLiteral(innerHTML)};${eol}`;
			if ( mode!=='var' ) {
				yield `export ${Render3(innerHTML, mode, literal, _(template))}${eol}`;/// (); import!
			}
			if ( compatible_render ) {
				const { render, staticRenderFns } = Render2(innerHTML, mode, literal);
				yield `export ${mode} render = /*#__PURE__*/${mode==='var' ? `function (render) { return render._withStripped = render; }` : `( render => render._withStripped = render )`}(${render});${eol}`;
				yield staticRenderFns.length
					? `export ${mode} staticRenderFns = [${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}];${eol}`
					: `export ${mode} staticRenderFns = [ ];${eol}`;
			}
			for ( const line of template.content.beautify(tab) ) {
				yield `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`;
			}
		}
		yield eol;
		return;
	}
	
	const _from_ = VisibleStringLiteral(from);
	yield `export { Identifier, Scope, Style, remove, Component, mixin, prop } from ${_from_};${eol}`;
	yield `import { Scope, Template, Render as _Render, StaticRenderFns } from ${_from_};${eol}${eol}`;
	
	const scopeKeys = template && _(template).keys;
	const scope = scopeKeys ? 'scopeObject' : 'scopeFunction';
	yield scopeKeys
		? `export ${mode} ${scope} = /*#__PURE__*/Scope('${scopeKeys.join(',')}')`
		: `export ${mode} ${scope} = /*#__PURE__*/Scope()`;
	
	const { length } = styles;
	if ( length ) {
		const checkScoped = scopeKeys ? RegExp(`^__${groupify(scopeKeys)}__$`) : __KEY__;
		let index = 0;
		while ( index!==length ) {
			const style = styles[index++]!;
			const { sheet } = style;
			const { allowGlobal, media } = _(style);
			allowGlobal || sheet.checkScoped(checkScoped);
			for ( const line of sheet[Symbol.iterator](options) ) {
				yield `${eol}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}`;
			}
			yield media===undefined
				? `${eol}.$(${StringLiteral(style.innerCSS)})`
				: `${eol}.$(${StringLiteral(style.innerCSS)}, ${StringLiteral(media)})`;
		}
	}
	
	yield `;${eol}`;
	
	if ( template ) {
		const { innerHTML } = template;
		const __ = compatible_template ? '' : '//';
		const lines = [];
		let lines_length = 0;
		for ( const line of template.content.beautify(tab) ) { lines[lines_length++] = `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`; }
		yield eol;
		let index = 0;
		while ( index!==lines_length ) { yield lines[index++]; }
		if ( mode!=='var' ) {
			yield `export ${mode} Render = /*#__PURE__*/_Render(${Render3(innerHTML, mode, null, _(template))}, ${scope});${eol}`;/// (); import or ~~runtime~~?
		}
		if ( compatible_render ) {
			const { render, staticRenderFns } = Render2(innerHTML, mode, null);
			yield `export ${mode} render = /*#__PURE__*/_Render(${render}, ${scope});${eol}`;
			yield staticRenderFns.length
				? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}], ${scope});${eol}`
				: `export ${mode} staticRenderFns = [ ];${eol}`;
			yield eol;
		}
		index = 0;
		while ( index!==lines_length ) { yield lines[index++]; }
		yield `${__}export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, ${scope});${eol}`;
		yield `export ${mode} delimiters = [ '{{', '}}' ];${eol}`;
	}
	
};

import type Style from './Style/';
import type Template from './Template/';