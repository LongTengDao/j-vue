import Error from '.Error';
import __null__ from '.null';

import { rollup, AcornStage3 } from '../dependencies';

const acornInjectPlugins = [ AcornStage3 ];
function onwarn (warning :any) :void {
	switch ( warning.code ) {
		case 'UNUSED_EXTERNAL_IMPORT':
		case 'CIRCULAR_DEPENDENCY':
			return;
	}
	throw warning;
}

const TRUE = __null__({
	format: 'esm',
	sourcemap: true,
});
const FALSE = __null__({
	format: 'esm',
	sourcemap: false,
});
const INLINE = __null__({
	format: 'esm',
	sourcemap: 'inline',
});

export default async function one (sfc :SFC, { 'var': x_var, 'j-vue?*': x_from, 'j-vue': from, map = false, src, lang } :{
	'var' :'const' | 'var' | 'let',
	'j-vue?*'? :string,
	'j-vue'? :string,
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
	const bundle = await rollup({
		input: '_'.repeat(main.length+1),
		acornInjectPlugins,
		onwarn,
		treeshake: false,
		experimentalTopLevelAwait: true,
		external: (path :string) :boolean => path!==x_from,
		plugins: [
			{
				resolveId (path :string) :string {
					if ( round===1 || path===x_from ) { return path; }
					throw Error(path);
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
			}
		],
	});
	const { output } = await bundle.generate(map==='inline' ? INLINE : map===true ? TRUE : FALSE);
	if ( output.length!==1 ) { throw Error(''+output.length); }
	const first = output[0];
	return map===true ? first : first.code;
};

type SFC = import('./').default;