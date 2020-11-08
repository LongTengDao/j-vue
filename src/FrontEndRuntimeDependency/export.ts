import version from '../version?text';
import Identifier from './Identifier';
import Scope from './Scope/';
import Template from './Template';
import Render, { StaticRenderFns } from './Render, StaticRenderFns';
import Style, { remove } from './Style, remove';
import Component, { mixin } from './Component, mixin/';

export {
	version,
	Identifier,
	Scope,
	Template,
	Render, StaticRenderFns,
	Style, remove,
	Component, mixin,
};

import Default from '.default';
export default Default({
	version: version,
	Identifier: Identifier,
	Scope: Scope,
	Template: Template,
	Render: Render, StaticRenderFns: StaticRenderFns,
	Style: Style, remove: remove,
	Component: Component, mixin: mixin,
});
