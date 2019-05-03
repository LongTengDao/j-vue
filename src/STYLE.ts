import Object from '.Object';

export default Object.create(null, {
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
			function render (createElement :Function, context :NonNullable<any>) {
				return createElement('style', context.data, context.children);
			}
	}
});
