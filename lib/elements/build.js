'use strict';

const groupify = require('@ltd/j-groupify');

require('@ltd/j-dev')(__dirname)(async function build_lib ({ get, put, tab }) {
	
	let js = '';
	let ts = '';
	
	const s = ( await get('src.txt') ).match(/\w+/g);
	const UPPER = /^[A-Z]/
	const LOWER = /^[a-z]/
	
	while ( s.length && UPPER.test(s[0]) ) {
		const n = s.shift();
		const v = [];
		while ( s.length && LOWER.test(s[0]) ) { v.push(s.shift()); }
		js += `\nexport const ${n} = /^${groupify(v)}$/;\n`;
		ts += `\nexport const ${n} :RegExp;\n`;
	}
	
	await put('dist.js', js);
	await put('dist.d.ts', ts);
	
});
