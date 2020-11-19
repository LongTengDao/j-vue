import Error from '.Error';
import Set from '.Set';
import RegExp from '.RegExp';
import keys from '.Object.keys';
import process from '.process';
import NaN from '.NaN';
import Null from '.null';

import { newRegExp } from '@ltd/j-regexp';

import gen from './dependencies.gen';

export const forAliasRE = /\s(?:in|of)\s/s;
export const slotRE = /^(?:#|v-slot$)/;// /^(?:#|v-slot(?::|$))/;
export const emptySlotScopeToken = '_empty_';
export const SLOT_DIRECTIVE = /^v-(?:once|for|if|else(?:-if)?|bind)$/;
export const BAD_SLOT_NAME = /^[$_]/;// Vue2: $hasNormal $key $stable _normalized __proto__ // Vue3: $stable _*
export const BAD_V_SLOT_NAME = /^#[$_]/;// /^(?:#|v-slot:)[$_]/;
export const BAD_SCOPE = '__proto__';
export const BAD_KEY = '__proto__';
export const BAD_REF = '__proto__';
export const BAD_INS = /\r(?!\n)|[\u2028\u2029]/;
const NON_ASCII = '\\u3007\\u4E00-\\u9FA5';
export const NON_ASCII_SIMPLE_PATH = newRegExp`
	^\s*
		(?:
			[A-Za-z_$]
			[\w$]*
		)?
		[${NON_ASCII}]
		[\w$${NON_ASCII}]*
	\s*$
`;
export const BUILT_IN = new Set(`
	keep-alive
	slot
	suspense
	teleport
	template
	transition
	transition-group
`.match(/\S+/g)!);
export const STYLE_BY_COMPONENT_IS :{
	pre :`Vue 不允许 template 中直接书写 style 标签，jVue 会将其替换为“<component is="style" />”的形式，以绕过 Vue 的编译期检查，但这样做的前提是标签自身或外层节点不能有 v-pre 指令`,
	is :`Vue 不允许 template 中直接书写 style 标签，jVue 会将其替换为“<component is="style" />”的形式，以绕过 Vue 的编译期检查，因而该标签上不能已存在 is 类属性`,
	text :`为防止 style 标签被替换为“<component is="style">”后，其内容被 Vue 2 作为标签嵌套解析`,
} | null = null;

export const { parse, acornInjectPlugins, rollup, minify } :typeof import('@ltd/j-es-plus') = require('@ltd/j-es-plus');
export const { simple } :typeof import('acorn-walk') = require('acorn-walk');
export const findGlobals :typeof import('@ltd/acorn-globals') = require('@ltd/acorn-globals');
export const transpileModule :typeof import('@ltd/j-ts') = require('@ltd/j-ts');

export const { 3: compile3, 2: compile2 } :{
	readonly 3 :{ readonly [_ in 'var' | 'const' | 'let'] :typeof import('@vue/compiler-dom').compile },
	readonly 2 :{ readonly [_ in 'var' | 'const' | 'let'] :typeof import('vue-template-compiler').compile },
} = ( () => {
	
	const Const3dom = Replacer(
		[ `|| node.tag === 'style'` ],
		[ `makeMap('style,iframe,script,noscript', true)`, `makeMap('style,script', true)` ],
		[ /compilerCore\.isBuiltInType\(tag, ([^)]+)\)/g, (match :string, p1 :string) => `tag===${p1.replace(/\B[A-Z]/g, (W :string) => `-${W.toLowerCase()}`).toLowerCase()}`, 2 ],
	);
	const Const3core = Replacer(
		[ /!shared\.isGloballyWhitelisted\([^)]*\)|identifier\.name !== `(?:require|arguments)`/g, 'true', 4 ],
		[ /isBuiltInType\(tag, ([^)]+)\)/g, (match :string, p1 :string) => `tag===${p1.replace(/\B[A-Z]/g, (W :string) => `-${W.toLowerCase()}`).toLowerCase()}`, 4 ],
	);
	const Let3core = Replacer(
		[ /push\(`const /g, 'push\(`let ', NaN ],
	);
	
	const Var2 = Replacer(
		[ /(?<! in ){}(?=[);,])(?!\)\.)/g, `Object.create(null)`, 23 ],
		[ `el.attrsMap.hasOwnProperty('v-for')`, `hasOwn(el.attrsMap, 'v-for')` ],
		[ `el.tag === 'style' ||` ],
		[ /(var simplePathRE = \/)(.*?\*)/s, (match :string, pre :string, aim :string) => pre + aim.replace(/(?<=\$)/g, NON_ASCII) + '$|' + aim ],
		[ RegExp(`function gen(${keys(gen[2]).join('|')}) \\((.*?)\\n}\\n`, 'gs'), (func :string, name :string) => gen[2][name as keyof typeof gen[2]].var, 2 ],
		[ /undefined(?='\) \+|'\r?\n|")|(?<=')\$\$v(?=')/g, (origin :string) => ( { undefined: 'void null', $$v: '$event' }[origin as 'undefined' | '$$v'] ), 4 ],
	);
	const Const2 = Replacer(
		[ RegExp(`function gen(${keys(gen[2]).join('|')}) \\((.*?)\\n}\\n`, 'gs'), (func :string, name :string) => gen[2][name as keyof typeof gen[2]].const, 2 ],
		[ /function\((|\$event|" \+ alias \+ iterator1 \+ iterator2 \+ "|" \+ slotScope \+ ")\){/g, (match :string, p1 :string) :string => `(${p1})=>{`, 7 ],
	);
	const Let2 = Replacer(
		[ /const /g, 'let ', NaN ],
	);
	
	const _prod :string = process.env.NODE_ENV==='production' ? '.prod' : '';
	
	const filename3core :string = require.resolve(`@vue/compiler-dom/node_modules/@vue/compiler-core/dist/compiler-core.cjs${_prod}.js`);
	const filename3dom :string = require.resolve(`@vue/compiler-dom/dist/compiler-dom.cjs${_prod}.js`);
	let content3core :string = require('fs').readFileSync(filename3core, 'utf8');
	let content3dom :string = require('fs').readFileSync(filename3dom, 'utf8');
	const Compile3 = (content_dom :string, content_core :string) => {
		return Exports<typeof import('@vue/compiler-dom')>(content_dom, filename3dom, Null({
			'@vue/compiler-core': Exports<typeof import('@vue/compiler-core')>(content_core, filename3core),
		})).compile;
	};
	
	const filename2 :string = require.resolve('vue-template-compiler/build.js');
	let content2 :string = require('fs').readFileSync(filename2, 'utf8');
	const Compile2 = (content :string) => Exports<typeof import('vue-template-compiler')>(content, filename2).compile;
	
	return {
		3: {
			var () :never {
				throw Error(`Vue 3 无法运行在 ES 5 中，请使用 const 或 let 模式`);
			},
			const: Compile3(
				content3dom = Const3dom(content3dom),
				content3core = Const3core(content3core),
			),
			let: Compile3(
				content3dom,
				Let3core(content3core),
			),
		},
		2: {
			var: Compile2(
				content2 = Var2(content2),
			),
			const: Compile2(
				content2 = Const2(content2),
			),
			let: Compile2(
				Let2(content2),
			),
		},
	};
	
	function Replacer (...replacers :(
		[ search :string, replacer? :string | { (...args :string[]) :string } ] |
		[ search :RegExp, replacer? :string | { (...args :string[]) :string }, count? :number ] )[]
	) {
		return function replacer (this :void, content :string) {
			for ( let [ search, replacer = '', count = 1 ] of replacers ) {
				if ( search instanceof RegExp && search.global===( count===1 ) ) { throw Error(`jVue 内部错误`); }
				content = content.replace(search, (...args :string[]) => {
					--count;
					return typeof replacer==='function' ? replacer(...args) : replacer;
				});
				if ( count ) { throw Error(`jVue 内部版本依赖错误`); }
			}
			return content;
		};
	}
	
	function Exports<T> (content :string, filename :string, cache? :Null<any>) {
		const module_require = ( require('module').createRequire ?? require('module').createRequireFromPath )(filename);
		const module = Null({ exports: {} as T });
		require('vm').compileFunction(
			content,
			[ 'exports', 'require', 'module', '__filename', '__dirname' ],
			{ filename }
		).call(module.exports, module.exports, cache ? (id :string) => cache[id] ?? module_require(id) : module_require, module, filename, require('path').dirname(filename));
		return module.exports;
	}
	
} )();
