'use strict';

require('@ltd/j-dev')(__dirname)(async function build_lib ({ get, put }) {
	
	await put('dist.js', `export default [\n${( await get('src.txt') ).match(/\w+/g).sort((a, b) => ( a.length - b.length ) || ( a<b ? -1 : 1 )).map(each => `\t'${each}',\n`).join('')}];`);
	
});
