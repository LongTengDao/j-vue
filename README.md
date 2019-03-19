# jVue

前端组件的 `CSS` 局部作用域需求，一直是一个大问题。  
For front-end components, the requirement of scoped `CSS` has been a big problem so far.

现在我们可以像这样使用 `j-vue` 模块来解决这一问题：  
Now we can use `j-vue` like this to resolve this problem:

```js
import { Scope, Style, Template, STYLE } from 'j-vue';

const scope = Scope();

Style(`
	.__static__ { border: 1px solid black; }
`, scope);

new Vue({
	
	template: Template(`
		<div class="__static__">
			<STYLE> .{{ scope('dynamic') }} { color: red; } </STYLE>
			<p :class="{ [scope('dynamic')]: red }">text</p>
			<button @click="change">change</button>
		</div>
	`, scope),
	
	data () {
		return {
			red: false,
			scope: Scope(),
		};
	},
	
	methods: {
		change () { this.red = !this.red; }
	},
	
	components: { STYLE },
	
});
```

这实际上意味着这些行为：  
That means behaviour below:

```js

document.documentElement.firstChild.appendChild(document.createElement('style')).textContent = `
	.a { border: 1px solid black; }
`;

new Vue({

	template: `
		<div class="a">
			<STYLE> .{{ scope('dynamic') }} { color: red; } </STYLE>
			<p :class="{ [scope('dynamic')]: red }">text</p>
			<button @click="change">change</button>
		</div>
	`,
	
	data () {
		return {
			red: false,
			scope: new function () {
				const cache = Object.create(null);
				return (x) => cache[x] || (cache[x] = Identifier());
				// Identifier 是 j-vue 内置的 36 进制（0-9a-z）发号器，
				// 并会跳过所有数字打头的值（这意味着第一个号会是“a”）。
				// Identifier is a base-36 (0-9a-z) ID generator build-in j-vue,
				// and skip all value starts with digit (that means "a" will be the 1st ID).
			},
		};
	},
	
	methods: {
		change () { this.red = !this.red; }
	},
	
	components: {
		STYLE: {
			functional: true,
			render: (createElement, context) => createElement('style', context.data, context.children),
		}
	},
	
});
```

从此，我们可以这样写 `.vue` 单文件组件：（只需要预处理器的支持）  
So, we can write our `.vue` single-file-component like this from now on: (only need pre-processor support)

```vue
<style>
	.__static__ { border: 1px solid black; }
</style>

<template>
	<div class="__static__">
		<STYLE> .{{ scope('dynamic') }} { color: red; } </STYLE>
		<p :class="{ [scope('dynamic')]: red }">text</p>
		<p :class="scope({   dynamic:    red })">text (object)</p>
		<p :class="scope([red && 'dynamic'])">text (array)</p>
		<p :class="scope( red && 'dynamic' )">text (arguments)</p>
		<button @click="change">change</button>
	</div>
</template>

<script>
import { template, Scope, STYLE } from 'j-vue?template';

new Vue({
	
	template,
	
	data () {
		return {
			red: false,
			scope: Scope(),
		};
	},
	
	methods: {
		change () { this.red = !this.red; }
	},
	
	components: { STYLE },
	
});
</script>
```

这种运行时方案比静态编译选择器名的做法，一来更可靠（只有前端发号器才能真正保证不重复），二来可以达到以实例为单位的动态使用的目的。  
This kind of runtime solution is more reliable (only front-end id generator can promise unique) and support dynamically use.
