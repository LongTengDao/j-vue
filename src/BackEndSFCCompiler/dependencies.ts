export const { rollup } = require('rollup') as typeof import('rollup');
const AcornClassFields = require('acorn-class-fields');
const AcornStaticClassFeatures = require('acorn-static-class-features');
const AcornPrivateMethods = require('acorn-private-methods');
export function AcornStage3 (Parser :any) {
	return Parser.extend(
		AcornClassFields,
		AcornStaticClassFeatures,
		AcornPrivateMethods,
	);
}

export const transpileModule = require('@ltd/j-ts') as typeof import('@ltd/j-ts');
export const Parser = ( require('acorn') as typeof import('acorn') ).Parser.extend(AcornStage3);
export const { simple } = require('acorn-walk');
export const findGlobals = require('@ltd/acorn-globals') as typeof import('@ltd/acorn-globals');
export const { compile } = require('vue-template-compiler') as typeof import('vue-template-compiler');
export const { minify } = require('terser') as typeof import('terser');
