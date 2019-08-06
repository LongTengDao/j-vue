export const { rollup } = require('rollup');
const AcornBigint = require('acorn-bigint');
const AcornClassFields = require('acorn-class-fields');
const AcornStaticClassFeatures = require('acorn-static-class-features');
const AcornPrivateMethods = require('acorn-private-methods');
export function AcornStage3 (Parser :any) {
	return Parser.extend(
		AcornBigint,
		AcornClassFields,
		AcornStaticClassFeatures,
		AcornPrivateMethods,
	);
}

export const Parser = require('acorn').Parser.extend(AcornStage3);
export const { simple } = require('acorn-walk');
export const findGlobals = require('@ltd/acorn-globals') as typeof import('@ltd/acorn-globals');
export const { compile } = require('vue-template-compiler');
export const { minify } = require('terser');
