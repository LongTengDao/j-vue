export function Template (html :string, scope) :string {
	return scope._(html);
}

export function Render (code :string, scope?) :Function {
	return Function('with(this){return '+( scope ? scope._(code) : code )+'}');
}

export function StaticRenderFns (codes :string[], scope?) :Function[] {
	return Function(
		'return[function(){with(this){return '+( scope
			? scope._(codes.join('}},function(){with(this){return '))
			: codes.join('}},function(){with(this){return ')
		)+'}}]'
	)();
}
