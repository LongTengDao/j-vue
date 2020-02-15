'use strict';

const { groupify } = require('@ltd/j-regexp');

require('@ltd/j-dev')(__dirname)(async function build_lib ({ get, put }) {
	
	await put('dist.js', `export default /^${groupify(( await get('src.txt') ).match(/\w+/g))}$/;`);
	
});
