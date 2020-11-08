import Error from '.Error';
import RegExp from '.RegExp';
import Proxy from '.Proxy';

if ( /k/i.test('\u212A') || /s/i.test('\u017F') ) { throw Error(`ks`); }

export { DEFAULT as default, IMPORT as import };
export const {
	
	charset,
	IMPORT,
	namespace,
	media,
	page,
	'font-face': font_face,
	'*keyframes': keyframes,
	supports,
	document,
	
	'url-prefix(': url_prefix_,
	'domain(': domain_,
	
	from,
	to,
	none,
	DEFAULT,
	inherit,
	initial,
	unset,
	
} = new Proxy({} as { [keyword :string] :(text :string) => boolean }, {
	get (is, keyword :string) {
		keyword = keyword.toLowerCase();
		const KEYWORD = RegExp('^' + keyword.replace('(', '\\(').replace('*', '(?:-[a-z][\\da-z]*-)?') + '$', 'i');
		return { [keyword]: (text :string) :boolean => KEYWORD.test(text) }[keyword];
	}
});
