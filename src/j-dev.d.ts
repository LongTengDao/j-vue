declare module '*?text' {
	const text = '';
	export default text;
}

declare module '.Array.isArray' { export default Array.isArray; }
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }
declare module '.Object' { export default Object; }
declare module '.Object.create' { export default Object.create; }
declare module '.document' { export default document; }
declare module '.document.documentElement.firstChild' {
	const document : { documentElement :{ firstChild :HTMLHtmlElement } };
	export default document.documentElement.firstChild;
}
declare module '.Function' { export default Function; }
