import version from '../version?text';
import Identifier from './Identifier';
import Scope from './Scope/';
import Template from './Template';
import Render, { StaticRenderFns } from './Render, StaticRenderFns';
import Style, { remove } from './Style, remove';
import Component, { mixin } from './Component, mixin/';
import prop from './v-prop';

export {
	version,
	Identifier,
	Scope,
	Template,
	Render, StaticRenderFns,
	Style, remove,
	Component, mixin,
	prop,
};

import Default from '.default';
export default /*#__PURE__*/Default({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
	prop: prop,
});
