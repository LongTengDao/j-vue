'use strict';

const groupify = require('@ltd/j-groupify');

require('@ltd/j-dev')(__dirname)(async function build_lib ({ get, put, tab }) {
	
	let js = '';
	let ts = '';
	
	const s = ( await get('src.txt') ).match(/[\w-]+/g);
	const NAME = /^[A-Z]/
	const ITEM = /^[a-z]/
	
	while ( s.length && NAME.test(s[0]) ) {
		const n = s.shift();
		const v = [];
		while ( s.length && ITEM.test(s[0]) ) { v.push(s.shift()); }
		js += `\nexport const ${n} = /^${groupify(v)}$/i;\n`;
		ts += `\nexport const ${n} :RegExp;\n`;
	}
	
	await put('dist.js', js);
	await put('dist.d.ts', ts);
	
});
