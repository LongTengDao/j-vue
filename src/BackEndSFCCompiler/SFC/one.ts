import Error from '.Error';
import Null from '.null';

import { rollup, acornInjectPlugins } from '../dependencies';

const onwarn = (warning :any) :void => {
	if ( typeof warning==='string' ) { throw Error(warning); }
	const { code } = warning;
	if ( code!=='UNUSED_EXTERNAL_IMPORT'/* && code!=='THIS_IS_UNDEFINED'*/ ) { throw warning; }
};

const paths = (id :string) :string => id;

const VAR = {
	ecmaVersion: 5,
	allowReserved: true,
	sourceType: 'module',
	allowAwaitOutsideFunction: false,
	//preserveParens: true,
} as const;
const X_VAR = {
	ecmaVersion: 2014,
	allowReserved: true,
	sourceType: 'module',
	allowAwaitOutsideFunction: true,
	//preserveParens: true,
} as const;

export { one as default };
const one = async (sfc :SFC, { 'var': x_var, 'j-vue': from, '?j-vue': x_from = from===null ? '?j-vue=' : '?j-vue', map = false, src, lang } :{
	'var' :'const' | 'var' | 'let',
	'?j-vue'? :string,
	'j-vue'? :string | null,
	map? :boolean | 'inline',
	src? (src :string) :Promise<string>,
	lang? (lang :string, inner :string) :string | Promise<string>,
}) :Promise<{ ports :string[] | null, code :string, map? :any }> => {
	let ports :string[] | null = null;
	if ( lang ) {
		const { script } = sfc;
		if ( script && script.lang ) { script.innerJS = await lang(script.lang, script.inner!); }
	}
	const main :string = await sfc.export('default', x_from) as string;
	let round = 'resolvingMain';
	const bundle = await rollup(Null({
		onwarn,
		acornInjectPlugins,
		strictDeprecations: true,
		treeshake: false,
		context: 'this',
		acorn: Null(x_var==='var' ? VAR : X_VAR),
		input: '\x00'.repeat(main.length),
		external: (id :string) :boolean => id!==x_from,
		plugins: [
			Null({
				resolveId (id :string) :string {
					if ( round==='resolvingMain' || id===x_from ) { return id; }
					throw Error(`jVue 内部错误：resolveId(${id})`);
				},
				async load (id :string) :Promise<string> {
					if ( round==='resolvingMain' ) {
						round = 'mainLoaded';
						return main;
					}
					if ( id!==x_from ) { throw Error(`jVue 内部错误：load(${id})`); }
					if ( round!=='mainLoaded' ) { throw Error(`jVue 内部错误：re-load(${id})`); }
					round = 'xLoaded';
					const { template, styles } = sfc;
					if ( src ) {
						if ( template && template.src ) { template.inner = await src(template.src); }
						const { length } = styles;
						let index = 0;
						while ( index!==length ) {
							const style = styles[index++]!;
							if ( style.src ) { style.inner = await src(style.src); }
						}
					}
					if ( lang ) {
						if ( template && template.lang ) { template.innerHTML = await lang(template.lang, template.inner!); }
						const { length } = styles;
						let index = 0;
						while ( index!==length ) {
							const style = styles[index++]!;
							if ( style.lang ) { style.innerCSS = await lang(style.lang, style.inner!); }
						}
					}
					const { code } = { ports } = await sfc.export(x_var, from) as { ports :string[], code :string };
					return code;
				},
			}),
		],
	}));
	const { output } = await bundle.generate(Null({
		format: 'es',
		sourcemap: map,
		paths,
	}));
	if ( output.length!==1 ) { throw Error(`jVue 内部错误：output.length===${output.length}`); }
	const only = output[0];
	return map===true
		? { ports, code: only.code, map: only.map }
		: { ports, code: only.code };
};

import type SFC from './';