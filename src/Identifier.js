var dictionary = {
	0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'a',
	a: 'b', b: 'c', c: 'd', d: 'e', e: 'f', f: 'g', g: 'h',
	h: 'i', i: 'j', j: 'k', k: 'l', l: 'm', m: 'n', n: 'o',
	o: 'p', p: 'q', q: 'r', r: 's', s: 't', t: 'u',
	u: 'v', v: 'w', w: 'x', x: 'y', y: 'z'
};

var latestIdentifierCharacters = ['9'];
var latestIdentifierCharacters_lastCharacter = '9';
var latestIdentifierCharacters_lastCharacterIndex = 0;

//var RESERVED_KEY = /^(?:break|c(?:a(?:se|tch)|lass|on(?:st|tinue))|d(?:e(?:bugger|fault|lete)|o)|e(?:lse|num|x(?:port|tends))|f(?:inally|or|unction)|i(?:f|mport|n(?:stanceof)?)|new|return|s(?:witch|super)|t(?:ry|ypeof)|v(?:ar|oid)|w(?:hile|ith))$/;

export function Identifier () {
	
	if ( latestIdentifierCharacters_lastCharacter==='z' ) {
		latestIdentifierCharacters_lastCharacter = latestIdentifierCharacters[latestIdentifierCharacters_lastCharacterIndex] = '0';
		for ( var characterIndex = latestIdentifierCharacters_lastCharacterIndex; ; ) {
			if ( characterIndex ) {
				if ( latestIdentifierCharacters[--characterIndex]==='z' ) {
					latestIdentifierCharacters[characterIndex] = '0';
				}
				else {
					latestIdentifierCharacters[characterIndex] = dictionary[latestIdentifierCharacters[characterIndex]];
					break;
				}
			}
			else {
				latestIdentifierCharacters.unshift('a');
				++latestIdentifierCharacters_lastCharacterIndex;
				break;
			}
		}
	}
	else {
		latestIdentifierCharacters_lastCharacter = latestIdentifierCharacters[latestIdentifierCharacters_lastCharacterIndex] = dictionary[latestIdentifierCharacters_lastCharacter];
	}
	
	//var identifier = latestIdentifierCharacters.join('');
	//if ( RESERVED_KEY.test(identifier) ) {
	//	latestIdentifierCharacters_lastCharacter = latestIdentifierCharacters[latestIdentifierCharacters_lastCharacterIndex] = dictionary[latestIdentifierCharacters_lastCharacter];
	//	return latestIdentifierCharacters.join('');
	//}
	//return identifier;
	
	return latestIdentifierCharacters.join('');
	
}
