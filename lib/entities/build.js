'use strict';

const { PropertyName, StringLiteral } = require('@ltd/j-es');

require('@ltd/j-dev')(__dirname)(async function build_lib ({ get, put, tab }) {
	
	const SEMICOLON_ENTITIES = [];
	
	const CONTINUE_ENTITIES = [];
	
	const src = JSON.parse(await get('src.json'));
	
	for ( const name in src ) {
		if ( name.endsWith(';') ) {
			SEMICOLON_ENTITIES.push(`${PropertyName(name.slice(1, -1))}: ${StringLiteral(src[name].characters)}`);
		}
		else {
			if ( src[name].characters!==src[name+';'].characters ) { throw name; }
			CONTINUE_ENTITIES.push(`${PropertyName(name.slice(1))}:0`);
		}
	}
	
	await put('dist.js', tab`
		import NULL from '.null';
		
		export const SEMICOLON_ENTITIES = /*#__PURE__*/ NULL({
			${SEMICOLON_ENTITIES.join(`,\n\t`)},
		});
		
		export const CONTINUE_ENTITIES = /*#__PURE__*/ NULL({ ${CONTINUE_ENTITIES.join(`, `)} });
		
	`);
	
	await put('dist.d.ts', tab`
		
		export const SEMICOLON_ENTITIES :{ [name :string] :string };
		
		export const CONTINUE_ENTITIES :{ [name :string] :0 };
		
	`);
	
});
