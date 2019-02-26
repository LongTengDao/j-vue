export function Render (code :string, scope?) :Function {
	return Function(
		'with(this){return '+( scope
			? code.replace(scope._search, scope._replacer)
			: code
		)+'}'
	);
}

export function StaticRenderFns (codes :string[], scope?) :Function[] {
	return Function(
		'return[function(){with(this){return '+( scope
			? codes.join('}},function(){with(this){return ').replace(scope._search, scope._replacer)
			: codes.join('}},function(){with(this){return ')
		)+'}}]'
	)();
}
