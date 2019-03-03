export default <{ functional :true, render :Function }>Object.create(null, {
	functional: {
		configurable: false,
		enumerable: true,
		writable: false,
		value:
			true
	},
	render: {
		configurable: false,
		enumerable: true,
		writable: false,
		value:
			function render (createElement, context) {
				return createElement('style', context.data, context.children);
			}
	}
});