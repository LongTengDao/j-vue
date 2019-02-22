export function Render (code, scope) {
	return Function(
		'with(this){return '+( scope
			? code.replace(scope._search, scope._replacer)
			: code
		)+'}'
	);
}

export function StaticRenderFns (codes, scope) {
	return Function(
		'return[function(){with(this){return '+( scope
			? codes.join('}},function(){with(this){return ').replace(scope._search, scope._replacer)
			: codes.join('}},function(){with(this){return ')
		)+'}}]'
	)();
}
