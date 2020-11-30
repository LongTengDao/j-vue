const NON_ASCII = /[^\x00-\x7F]/u;
const NON_TAB = /[^\t\x20]/g;

export { Snippet as default };
const Snippet = (whole :string, errorPosition :number) :string => {
	
	const linesAroundError :{ readonly number :string, readonly value :string }[] = [];
	let linesAroundError_length = 0;
	const linesBeforeError = whole.slice(0, errorPosition).split('\n');
	const errorLineNumber = linesBeforeError.length;
	
	if ( errorLineNumber>1 ) {
		linesAroundError[linesAroundError_length++] = {
			number: errorLineNumber-1+'',
			value: linesBeforeError[errorLineNumber-2],
		};
	}
	
	const errorLineEnd = whole.indexOf('\n', errorPosition);
	linesAroundError[linesAroundError_length++] = {
		number: errorLineNumber+'',
		value: linesBeforeError[errorLineNumber-1]+( errorLineEnd<0
			? whole.slice(errorPosition)
			: whole.slice(errorPosition, errorLineEnd)
		),
	};
	linesAroundError[linesAroundError_length++] = {
		number: '',
		value: linesBeforeError[errorLineNumber-1].replace(NON_ASCII, '\u3000').replace(NON_TAB, '\x20')+'^',
	};
	
	let maxLengthOfLineNumber :number;
	if ( errorLineEnd<0 ) { maxLengthOfLineNumber = ( errorLineNumber+'' ).length; }
	else {
		maxLengthOfLineNumber = ( errorLineNumber+1+'' ).length;
		const nextEnd = whole.indexOf('\n', errorLineEnd+1);
		const next = nextEnd<0
			? whole.slice(errorLineEnd+1)
			: whole.slice(errorLineEnd+1, nextEnd);
		linesAroundError[linesAroundError_length++] = {
			number: errorLineNumber+1+'',
			value: next,
		};
	}
	
	const errorSnippet :string[] = [];
	let index = 0;
	while ( index<linesAroundError_length ) {
		let { number, value } = linesAroundError[index];
		number = number ? number.padStart(maxLengthOfLineNumber, '0') : ' '.repeat(maxLengthOfLineNumber);
		errorSnippet[index++] = `${number}\t|${value}`;
	}
	return errorSnippet.join('\n');
	
};
