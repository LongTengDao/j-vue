import Error from '.Error';
import URIError from '.URIError';
import assign from '.Object.assign';
import create from '.Object.create';
import NULL from '.null.prototype';
import Null from '.null';

import { rollup, AcornStage3 } from '../dependencies';

const acorn = Null({
	ecmaVersion: 5 as 5 | 6,
	allowReserved: true as true,
	sourceType: 'module' as 'module',
	allowAwaitOutsideFunction: true as true,
});
const rollupOptions = {
	onwarn (warning :any) :void {
		if ( typeof warning==='string' ) { throw Error(warning); }
		const { code } = warning;
		if ( code!=='UNUSED_EXTERNAL_IMPORT' && code!=='THIS_IS_UNDEFINED' ) { throw warning; }
	},
	acorn,
	acornInjectPlugins: [ AcornStage3 ],
	strictDeprecations: true as true,
	treeshake: false as false,
	context: 'this',
};

const TRUE = Null({
	format: 'esm' as 'esm',
	sourcemap: true as true,
});
const FALSE = Null({
	format: 'esm' as 'esm',
	sourcemap: false as false,
});
const INLINE = Null({
	format: 'esm' as 'esm',
	sourcemap: 'inline' as 'inline',
});

export default async function one (sfc :SFC, { 'var': x_var, 'j-vue': from, '?j-vue': x_from = from===null ? '?j-vue=' : '?j-vue', map = false, src, lang } :{
	'var' :'const' | 'var' | 'let',
	'?j-vue'? :string,
	'j-vue'? :string | null,
	map? :boolean | 'inline',
	src? (src :string) :Promise<string>,
	lang? (lang :string, inner :string) :string | Promise<string>,
}) :Promise<string | { code :string, map :any }> {
	if ( lang ) {
		const { script } = sfc;
		if ( script && script.lang ) { script.innerJS = await lang(script.lang, script.inner!); }
	}
	const main :string = sfc.export('default', x_from) as string;
	let round :number = 1;
	acorn.ecmaVersion = x_var==='var' ? 5 : 2014 as 6;
	const bundle = await rollup(assign(create(NULL), rollupOptions, {
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
						for ( const style of styles ) {
							if ( style.src ) { style.inner = await src(style.src); }
						}
					}
					if ( lang ) {
						if ( template && template.lang ) { template.innerHTML = await lang(template.lang, template.inner!); }
						for ( const style of styles ) {
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

type SFC = import('./').default;