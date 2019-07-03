const NON_ASCII = /[^\x00-\x7F]/u;
const NON_TAB = /[^\t\x20]/g;

export default function Snippet (whole :string, errorPosition :number) :string {
	
	const linesAroundError :{ number :string, value :string }[] = [];
	const linesBeforeError :string[] = whole.slice(0, errorPosition).split('\n');
	const errorLineNumber :number = linesBeforeError.length;
	
	if ( errorLineNumber>1 ) {
		linesAroundError.push({
			number: errorLineNumber-1+'',
			value: linesBeforeError[errorLineNumber-2],
		});
	}
	
	const errorLineEnd :number = whole.indexOf('\n', errorPosition);
	linesAroundError.push({
		number: errorLineNumber+'',
		value: linesBeforeError[errorLineNumber-1]+( errorLineEnd<0
			? whole.slice(errorPosition)
			: whole.slice(errorPosition, errorLineEnd)
		),
	});
	linesAroundError.push({
		number: '',
		value: linesBeforeError[errorLineNumber-1].replace(NON_ASCII, '\u3000').replace(NON_TAB, '\x20')+'^',
	});
	
	let maxLengthOfLineNumber :number;
	if ( errorLineEnd<0 ) { maxLengthOfLineNumber = ( errorLineNumber+'' ).length; }
	else {
		maxLengthOfLineNumber = ( errorLineNumber+1+'' ).length;
		const nextEnd :number = whole.indexOf('\n', errorLineEnd+1);
		const next :string = nextEnd<0
			? whole.slice(errorLineEnd+1)
			: whole.slice(errorLineEnd+1, nextEnd);
		linesAroundError.push({
			number: errorLineNumber+1+'',
			value: next,
		});
	}
	
	const errorSnippet :string[] = [];
	for ( let { number, value } of linesAroundError ) {
		number = number ? number.padStart(maxLengthOfLineNumber, '0') : ' '.repeat(maxLengthOfLineNumber);
		errorSnippet.push(`${number}\t|${value}`);
	}
	return errorSnippet.join('\n');
	
};
