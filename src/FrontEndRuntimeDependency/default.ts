export { default } from './export';
import { Component, mixin } from 'j-vue';

abstract class Mixin0 extends Component<Mixin0> {
	m0 () :void {}
}

interface Mixin1 {
	m1 () :void
}
const     Mixin1 = {
	methods: {
		m1 () :void {}
	}
};

const Mixins = mixin<Mixin0 & Mixin1>(Mixin0, Mixin1);

abstract class SuperComponent<Sub extends Component<Sub>> extends Mixins<Sub> {
	s () :void {}
}
SuperComponent