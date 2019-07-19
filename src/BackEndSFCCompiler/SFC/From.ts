import undefined from '.undefined';

import { StringLiteral } from '@ltd/j-es';

import { KEYS } from '../../FrontEndRuntimeDependency/Scope/';
import _ from './private';
import Render from './From.Render';

const NULo = /^\0[0-7]/;
const LS_PS = /[\u2028\u2029]/g;
const LF_LS_PS = /[\n\u2028\u2029]/g;
const escape_LS_PS = ($0 :string) :string => $0==='\u2028' ? '\\002028' : '\\002029';
const escape_LF_LS_PS = ($0 :string) :string => $0==='\n' ? '&#x0A;' : $0==='\u2028' ? '&#x2028;' : '&#x2029;';
function VisibleStringLiteral (id :string) :string {
	const literal :string = StringLiteral(id);
	return id.startsWith('\0') ? ( NULo.test(id) ? `'\\x00` : `'\\0` )+literal.slice(2) : literal;
}

export default function * From (tab :string, mode :'const' | 'var' | 'let', styles :Style[], template :Template | null, from :string, eol :string) :IterableIterator<string> {
	
	yield `export * from ${VisibleStringLiteral(from)};${eol}`;
	yield `import { Scope, Template, Render, StaticRenderFns } from ${VisibleStringLiteral(from)};${eol}${eol}`;
	
	yield !template || _(template).keys===undefined
		? `export ${mode} scope = /*#__PURE__*/Scope()`
		: `export ${mode} scope = /*#__PURE__*/Scope('${( _(template).keys!.match(KEYS) || [] ).join(',')}')`;
	for ( const style of styles ) {
		const { innerCSS } = style;
		for ( const line of innerCSS.split('\n') ) {
			yield `${eol}//${line.replace(LS_PS, escape_LS_PS)}`;
		}
		const { media } = _(style);
		yield media===undefined
			? `${eol}.$(${StringLiteral(innerCSS)})`
			: `${eol}.$(${StringLiteral(innerCSS)}, ${StringLiteral(media)})`;
	}
	yield `;${eol}`;
	
	if ( !template ) { return; }
	const { innerHTML } = template;
	const { render, staticRenderFns } = Render(innerHTML, mode==='var' ? 5 : 8);
	
	yield eol;
	yield `export ${mode} template = /*#__PURE__*/Template(${StringLiteral(innerHTML)}, scope);${eol}`;
	yield `export ${mode} render = /*#__PURE__*/Render(${render}, scope);${eol}`;
	yield staticRenderFns.length
		? `export ${mode} staticRenderFns = /*#__PURE__*/StaticRenderFns([${eol}${tab}${staticRenderFns.join(`,${eol}${tab}`)}${eol}], scope);${eol}`
		: `export ${mode} staticRenderFns = [];${eol}`;
	for ( const line of template.content.toSource(tab) ) {
		yield `//${tab}${line.replace(LF_LS_PS, escape_LF_LS_PS)}${eol}`;
	}
	
};

import Style from './Style';
import Template from './Template';