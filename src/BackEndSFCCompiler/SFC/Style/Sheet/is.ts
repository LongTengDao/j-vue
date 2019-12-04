import Proxy from '.Proxy';
import create from '.Object.create';
import NULL from '.null.prototype';

export { DEFAULT as default };
export const {
	
	charset,
	import: _import,
	namespace,
	media,
	page,
	'font-face': font_face,
	//keyframes,
	supports,
	document,
	
	url,
	'prefix(': prefix_,
	'domain(': domain_,
	
	from,
	to,
	none,
	default: DEFAULT,
	inherit,
	initial,
	unset,
	
} = new Proxy(create(NULL) as { [keyword :string] :(text :string) => boolean }, {
	get (is, keyword :string) {
		const KEYWORD = keyword.toUpperCase();
		const { length } = keyword;
		return is[keyword] = function (text :string) :boolean {
			if ( text.length!==length ) { return false; }
			let index = 0;
			do {
				const char = text[index];
				if ( char!==keyword[index] && char!==KEYWORD[index] ) { return false; }
			}
			while ( ++index<length )
			return true;
		};
	}
});

const _KEYFRAMES = /^(?:-[A-Za-z][\dA-Za-z]*-)?[kK][eE][yY][fF][rR][aA][mM][eE][sS]$/;
export const _keyframes = (keyword :string) => _KEYFRAMES.test(keyword);
