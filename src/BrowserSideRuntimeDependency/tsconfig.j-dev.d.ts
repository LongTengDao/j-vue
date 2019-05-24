declare module '*?text' {
	const text :string;
	export default text;
}

declare module '.Array.isArray' { export default Array.isArray; }
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }
declare module '.Function' { export default Function; }
declare module '.Object' { export default Object; }
declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.create' { export default Object.create; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.entries' { export default Object.entries; }
declare module '.Object.keys' { export default Object.keys; }
declare module '.RegExp' { export default RegExp; }
declare module '.document' { export default document; }
declare module '.document.documentElement.firstChild' {
	const head :HTMLHtmlElement;
	export default head;
}
