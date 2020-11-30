import Error from '.Error';
import URIError from '.URIError';
import assign from '.Object.assign';
import create from '.Object.create';
import NULL from '.null.prototype';
import Null from '.null';

import { rollup, acornInjectPlugins } from '../dependencies';

const rollupOptions = {
	onwarn (warning :any) :void {
		if ( typeof warning==='string' ) { throw Error(warning); }
		const { code } = warning;
		if ( code!=='UNUSED_EXTERNAL_IMPORT'/* && code!=='THIS_IS_UNDEFINED'*/ ) { throw warning; }
	},
	acornInjectPlugins,
	strictDeprecations: true,
	treeshake: false,
	context: 'this',
} as const;

const TRUE = Null({
	format: 'es',
	sourcemap: true,
} as const);
const FALSE = Null({
	format: 'es',
	sourcemap: false,
} as const);
const INLINE = Null({
	format: 'es',
	sourcemap: 'inline',
} as const);

export { one as default };
const one = async (sfc :SFC, { 'var': x_var, 'j-vue': from, '?j-vue': x_from = from===null ? '?j-vue=' : '?j-vue', map = false, src, lang } :{
	'var' :'const' | 'var' | 'let',
	'?j-vue'? :string,
	'j-vue'? :string | null,
	map? :boolean | 'inline',
	src? (src :string) :Promise<string>,
	lang? (lang :string, inner :string) :string | Promise<string>,
}) :Promise<string | { code :string, map :any }> => {
	if ( lang ) {
		const { script } = sfc;
		if ( script && script.lang ) { script.innerJS = await lang(script.lang, script.inner!); }
	}
	const main :string = sfc.export('default', x_from) as string;
	let round = 1;
	const bundle = await rollup(assign(create(NULL), rollupOptions, {
		acorn: Null({
			ecmaVersion: x_var==='var' ? 5 : 2014,
			allowReserved: true,
			sourceType: 'module',
			allowAwaitOutsideFunction: x_var!=='var',
			//preserveParens: true,
		} as const),
		input: '/'+'_'.repeat(main.length),
		external: (path :string) :boolean => path!==x_from,
		plugins: [
			Null({
				resolveId (path :string) :string {
					if ( round===1 || path===x_from ) { return path; }
					throw URIError(path);
				},
				async load () :Promise<string> {
					if ( round===1 ) {
						round = 2;
						return main;
					}
					if ( round===3 ) { throw Error('3'); }
					round = 3;
					const { template, styles } = sfc;
					if ( src ) {
						if ( template && template.src ) { template.inner = await src(template.src); }
						const { length } = styles;
						let index = 0;
						while ( index!==length ) {
							const style = styles[index++];
							if ( style.src ) { style.inner = await src(style.src); }
						}
					}
					if ( lang ) {
						if ( template && template.lang ) { template.innerHTML = await lang(template.lang, template.inner!); }
						const { length } = styles;
						let index = 0;
						while ( index!==length ) {
							const style = styles[index++];
							if ( style.lang ) { style.innerCSS = await lang(style.lang, style.inner!); }
						}
					}
					return sfc.export(x_var, from) as string;
				},
			})
		],
	}));
	const { output } = await bundle.generate(map==='inline' ? INLINE : map===true ? TRUE : FALSE);
	if ( output.length!==1 ) { throw Error(''+output.length); }
	const only = output[0];
	return map===true ? { code: only.code, map: only.map } : only.code;
};

import type SFC from './';