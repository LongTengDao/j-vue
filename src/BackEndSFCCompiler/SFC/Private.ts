import Private from '.private';
export default Private<{
	(instance :import('./Style/').default) :import('./Style/').Private
	(instance :import('./Script').default) :import('./Script').Private
	(instance :import('./Template/').default) :import('./Template/').Private
}>();