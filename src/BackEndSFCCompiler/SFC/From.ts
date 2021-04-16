import Error from '.Error';
import RegExp from '.RegExp';
import test from '.RegExp.prototype.test';
import bind from '.Function.prototype.bind';
import undefined from '.undefined';

import { StringLiteral } from '@ltd/j-es';
import { groupify } from '@ltd/j-regexp';

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
const test_bind = bind.bind(test as any) as unknown as (this :void, regExp :RegExp) => (this :void, string :string) => boolean;
const Is__KEY__ = (KEY :string) => test_bind(RegExp(`^[.#]?__${KEY}__$`));
const is__KEY__ = Is__KEY__(KEYS.source);

export default async function From (tab :string, mode :'const' | 'var' | 'let', styles :Style[], template :Template | null, from :string | null, eol :string, bom :'\uFEFF' | '') :Promise<{ ports :string[] | null, code :string }> {
	
	let ports :string[] | null = null;
	let code :string = bom;
	
	const options = { indent: tab, newline: eol, newlineSelector: false, newlineProperty: false };
	
	if ( from===null ) {
		const { length } = styles;
		if ( length ) {
			const style = styles[0]!;
			if ( _(style).media!==undefined ) { throw Error(`当前模式下，style 标签上的 media 属性无法被保留`); }
			code += `export ${mode} style = ${StringLiteral(style.innerCSS)};${eol}`;
			for ( const line of style.sheet[Symbol.iterator](options) ) {
				code += `//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}${eol}`;
			}
			code += eol;
			if ( length===1 ) {
				code += `export ${mode} styles = [ style ];`;
			}
			else {
				code += `export ${mode} styles = [ style,${eol}`;
				let index = 1;
				while ( index!==length ) {
					const style = styles[index++]!;
					if ( _(style).media!==undefined ) { throw Error(`当前模式下，style 标签上的 media 属性无法被保留`); }
					code += `${tab}${StringLiteral(style.innerCSS)},${eol}`;
					for ( const line of style.sheet[Symbol.iterator](options) ) {
						code += `${tab}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}${eol}`;
					}
				}
				code += `];`;
			}
		}
		else {
			code += `export ${mode} styles = [ ];`;
		}
		code += eol;
		if ( template ) {
			code += eol;
			const { innerHTML } = template;
			const __ = compatible_template ? '' : '//';
			const ws = { eol, tab };
			code += `export ${mode} delimiters = [ '{{', '}}' ];${eol}`;
			code += `${__}export ${mode} template = ${StringLiteral(innerHTML)};${eol}`;
			if ( mode!=='var' ) {
				const { Render } = { ports } = await Render3(innerHTML, mode, ws, _(template));/// (); import!
				code += `export ${Render}${eol}`;
			}
			if ( compatible_render ) {
				const { render, staticRenderFns } = await Render2(innerHTML, mode, ws);
				code += `export ${mode} render = /*#__PURE__*/${mode==='var' ? `function (render) { return render._withStripped = render; }` : `( render => render._withStripped = render )`}(${render});${eol}`;
				code += staticRenderFns.length
					? `export ${mode} staticRenderFns = [${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}];${eol}`
					: `export ${mode} staticRenderFns = [ ];${eol}`;
			}
			for ( const line of template.content.beautify(tab) ) {
				code += `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`;
			}
		}
		code += eol;
		return { ports, code };
	}
	
	const _from_ = VisibleStringLiteral(from);
	code += `export { Identifier, Scope, Style, remove, Component, mixin, prop } from ${_from_};${eol}`;
	code += `import { Scope, Template, Render as _Render, StaticRenderFns } from ${_from_};${eol}${eol}`;
	
	const scopeKeys = template && _(template).keys;
	const scope = scopeKeys ? 'scopeObject' : 'scopeFunction';
	code += scopeKeys
		? `export ${mode} ${scope} = /*#__PURE__*/Scope('${scopeKeys.join(',')}')`
		: `export ${mode} ${scope} = /*#__PURE__*/Scope()`;
	
	const { length } = styles;
	if ( length ) {
		const isScoped = scopeKeys ? Is__KEY__(groupify(scopeKeys)) : is__KEY__;
		let index = 0;
		while ( index!==length ) {
			const style = styles[index++]!;
			const { sheet } = style;
			const { allowGlobal, media } = _(style);
			allowGlobal || sheet.checkScoped(isScoped);
			const { innerCSS } = style;
			if ( innerCSS ) {
				for ( const line of sheet[Symbol.iterator](options) ) {
					code += `${eol}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}`;
				}
				code += media===undefined
					? `${eol}.$(${StringLiteral(innerCSS)})`
					: `${eol}.$(${StringLiteral(innerCSS)}, ${StringLiteral(media)})`;
			}
		}
	}
	
	code += `;${eol}`;
	
	if ( template ) {
		const { innerHTML } = template;
		const __ = compatible_template ? '' : '//';
		const lines = [];
		let lines_length = 0;
		for ( const line of template.content.beautify(tab) ) { lines[lines_length++] = `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`; }
		code += eol;
		let index = 0;
		while ( index!==lines_length ) { code += lines[index++]; }
		if ( mode!=='var' ) {
			const { Render } = { ports } = await Render3(innerHTML, mode, null, _(template));/// (); import or ~~runtime~~?
			code += `export ${mode} Render = /*#__PURE__*/_Render(${Render}, ${scope});${eol}`;
		}
		if ( compatible_render ) {
			const { render, staticRenderFns } = await Render2(innerHTML, mode, null);
			code += `export ${mode} render = /*#__PURE__*/_Render(${render}, ${scope});${eol}`;
			code += staticRenderFns.length
				? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}], ${scope});${eol}`
				: `export ${mode} staticRenderFns = [ ];${eol}`;
			code += eol;
		}
		index = 0;
		while ( index!==lines_length ) { code += lines[index++]; }
		code += `${__}export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, ${scope});${eol}`;
		code += `export ${mode} delimiters = [ '{{', '}}' ];${eol}`;
	}
	
	return { ports, code };
	
};

import type Style from './Style/';
import type Template from './Template/';