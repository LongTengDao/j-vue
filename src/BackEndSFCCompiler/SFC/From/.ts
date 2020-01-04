import undefined from '.undefined';
import RegExp from '.RegExp';

import { StringLiteral } from '@ltd/j-es';
import { newRegExp, groupify } from '@ltd/j-regexp';

import KEYS from '../../../FrontEndRuntimeDependency/Scope/KEYS';

import _ from '../private';
import Render from './Render';

const NULo = /^\0[0-7]/;
const LF_CR_LS_PS = /[\n\r\u2028\u2029]/g;
const escapeCSS_LF_CR_LS_PS = ($0 :string) :string => $0==='\n' ? '\\00000A' : $0==='\r' ? '\\00000D' : $0==='\u2028' ? '\\002028' : '\\002029';
const escapeHTML_LF_CR_LS_PS = ($0 :string) :string => $0==='\n' ? '&#x0A;' : $0==='\r' ? '&#0D;' : $0==='\u2028' ? '&#x2028;' : '&#x2029;';
function VisibleStringLiteral (id :string) :string {
	const literal :string = StringLiteral(id);
	return id.startsWith('\0') ? ( NULo.test(id) ? `'\\x00` : `'\\0` )+literal.slice(2) : literal;
}

const __KEY__ = newRegExp('i')`^[-_]?__${KEYS}__[-_]?$`;

export default function * From (tab :string, mode :'const' | 'var' | 'let', styles :Style[], template :Template | null, from :string | null, eol :string) {
	
	if ( from===null ) {
		const { length } = styles;
		if ( length ) {
			const style = styles[0];
			yield `export ${mode} style = ${StringLiteral(style.innerCSS)};${eol}`;
			for ( const line of style.sheet.beautify(tab) ) {
				yield `//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}${eol}`;
			}
			yield eol;
			if ( length===1 ) {
				yield `export ${mode} styles = [ style ];`;
			}
			else {
				yield `export ${mode} styles = [ style,${eol}`;
				for ( let index = 1; index<length; ++index ) {
					const style = styles[0];
					yield `${tab}${StringLiteral(style.innerCSS)},${eol}`;
					for ( const line of style.sheet.beautify(tab) ) {
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
			const { render, staticRenderFns } = Render(innerHTML, mode, true);
			yield `export ${mode} template = ${StringLiteral(innerHTML)};${eol}`;
			yield `export ${mode} render = ${render};${eol}`;
			yield `render._withStripped = true;${eol}`;
			yield staticRenderFns.length
				? `export ${mode} staticRenderFns = [${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}];${eol}`
				: `export ${mode} staticRenderFns = [ ];${eol}`;
			for ( const line of template.content.beautify(tab) ) {
				yield `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`;
			}
		}
		return;
	}
	
	const _from_ = VisibleStringLiteral(from);
	yield `export * from ${_from_};${eol}`;
	yield `import { Scope, Template, Render, StaticRenderFns } from ${_from_};${eol}${eol}`;
	
	const staticScopeKeys = template && _(template).keys;
	const scope :'dynamicScope' | 'staticScope' = staticScopeKeys ? 'staticScope' : 'dynamicScope';
	yield staticScopeKeys
		? `export ${mode} ${scope} = /*#__PURE__*/Scope('${staticScopeKeys.join(',')}')`
		: `export ${mode} ${scope} = /*#__PURE__*/Scope()`;
	
	const { length } = styles;
	if ( length ) {
		const checkScoped = staticScopeKeys ? RegExp(`^[-_]?__${groupify(staticScopeKeys)}__[-_]?$`) : __KEY__;
		for ( let index = 0; index<length; ++index ) {
			const style = styles[index];
			const { sheet } = style;
			sheet.checkScoped(checkScoped);
			for ( const line of sheet.beautify(tab) ) {
				yield `${eol}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}`;
			}
			const { media } = _(style);
			yield media===undefined
				? `${eol}.$(${StringLiteral(style.innerCSS)})`
				: `${eol}.$(${StringLiteral(style.innerCSS)}, ${StringLiteral(media)})`;
		}
	}
	
	yield `;${eol}`;
	
	if ( template ) {
		yield eol;
		const { innerHTML } = template;
		const { render, staticRenderFns } = Render(innerHTML, mode, false);
		yield `export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, ${scope});${eol}`;
		yield `export ${mode} render = /*#__PURE__*/Render(${render}, ${scope});${eol}`;
		yield staticRenderFns.length
			? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}], ${scope});${eol}`
			: `export ${mode} staticRenderFns = [ ];${eol}`;
		for ( const line of template.content.beautify(tab) ) {
			yield `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`;
		}
	}
	
};

type Style = import('../Style/').default;
type Template = import('../Template/').default;