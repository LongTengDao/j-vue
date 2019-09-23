import undefined from '.undefined';
import Set from '.Set';

import { StringLiteral } from '@ltd/j-es';
import { newRegExp } from '@ltd/j-regexp';

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

const __KEY__ = newRegExp('i')`^__${KEYS}__$`;
const checkScoped = (literal :string) => __KEY__.test(literal);

export default function * From (tab :string, mode :'const' | 'var' | 'let', styles :Style[], template :Template | null, from :string | null, eol :string) :IterableIterator<string> {
	
	if ( from===null ) {
		yield `export ${mode} styles = [`;
		const { length } = styles;
		if ( length ) {
			yield eol;
			for ( let index = 0; index<length; ++index ) {
				const style = styles[index];
				for ( const line of style.sheet.beautify(tab) ) {
					yield `${tab}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}${eol}`;
				}
				yield `${tab}${StringLiteral(style.innerCSS)},${eol}`;
			}
		}
		yield `];${eol}`;
		if ( !template ) { return; }
		const { innerHTML } = template;
		const { render, staticRenderFns } = Render(innerHTML, mode, true);
		yield eol;
		yield `export ${mode} template = ${StringLiteral(innerHTML)};${eol}`;
		yield `export ${mode} render = ${render};${eol}`;
		yield `render._withStripped = true;${eol}`;
		yield `export ${mode} staticRenderFns = [${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}];${eol}`;
		for ( const line of template.content.beautify(tab) ) {
			yield `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`;
		}
		return;
	}
	
	yield `export * from ${VisibleStringLiteral(from)};${eol}`;
	yield `import { Scope, Template, Render, StaticRenderFns } from ${VisibleStringLiteral(from)};${eol}${eol}`;
	
	const dynamic :boolean = !template || !_(template).keys;
	const scope :'dynamicScope' | 'staticScope' = dynamic ? 'dynamicScope' : 'staticScope';
	yield dynamic
		? `export ${mode} ${scope} = /*#__PURE__*/Scope()`
		: `export ${mode} ${scope} = /*#__PURE__*/Scope('${_(template!).keys!.join(',')}')`;
	const { length } = styles;
	if ( length ) {
		let _checkScoped;
		if ( template ) {
			const { keys } = _(template);
			if ( keys ) {
				const keysSet = new Set(keys);
				_checkScoped = function checkScoped (literal :string) { return __KEY__.test(literal) && keysSet.has(literal.slice(2, -2)); };
			}
			else { _checkScoped = checkScoped; }
		}
		else { _checkScoped = checkScoped; }
		for ( let index = 0; index<length; ++index ) {
			const style = styles[index];
			style.sheet.checkScoped(_checkScoped);
			for ( const line of style.sheet.beautify(tab) ) {
				yield `${eol}//${tab}${line.replace(LF_CR_LS_PS, escapeCSS_LF_CR_LS_PS)}`;
			}
			const { media } = _(style);
			yield media===undefined
				? `${eol}.$(${StringLiteral(style.innerCSS)})`
				: `${eol}.$(${StringLiteral(style.innerCSS)}, ${StringLiteral(media)})`;
		}
	}
	yield `;${eol}`;
	
	if ( !template ) { return; }
	const { innerHTML } = template;
	const { render, staticRenderFns } = Render(innerHTML, mode, false);
	
	yield eol;
	yield `export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, ${scope});${eol}`;
	yield `export ${mode} render = /*#__PURE__*/Render(${render}, ${scope});${eol}`;
	yield staticRenderFns.length
		? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)},${eol}], ${scope});${eol}`
		: `export ${mode} staticRenderFns = [];${eol}`;
	for ( const line of template.content.beautify(tab) ) {
		yield `//${tab}${line.replace(LF_CR_LS_PS, escapeHTML_LF_CR_LS_PS)}${eol}`;
	}
	
};

type Style = import('../Style/').default;
type Template = import('../Template/').default;