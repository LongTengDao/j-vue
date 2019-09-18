import Proxy from '.Proxy';
import create from '.Object.create';
import NULL from '.null.prototype';
export const {
	
	'url': url,
	'prefix(': prefix_,
	'domain(': domain_,
	
	charset,
	import: _import,
	namespace,
	
	media,
	page,
	'font-face': font_face,
	keyframes,
	supports,
	document,
	
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