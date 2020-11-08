
jVue
====

Typed Script
------------

```ts
import { Component, mixin } from 'j-vue';

abstract class Mixin0 extends Component<Mixin0> {
    m0 () :void {}
}

type  Mixin1 = {
    m1 () :void
};
const Mixin1 = {
    methods: {
        m1 () :void {}
    }
};

const Mixins = mixin<Mixin0 & Mixin1>(Mixin0, Mixin1);

abstract class SuperComponent<Sub extends Component<Sub>> extends Mixins<Sub> {
    s () :void {}
}

abstract class SubComponent extends SuperComponent<SubComponent> {
    
    /* method */
    
    m () { ++this.d; }
    
    // Even `vm.constructor`! Anything possible in object-api, is possible in class-api!
    ['constructor'] () { }
    
    /* computed */
    
    get c () { return this.d; }
    set c (value) { this.d = value; }
    
    /* watch (On prototype for type, starts with `_watch:`) */
    
    // watch exp (key) & handler (value)
    '_watch:d' (d :this['d'], old_d? :this['d']) { }
    
    // watch exp (key) & handler (value) (with options)
    '_watch:d;deep;immediate;flush=pre' (d :this['d'], old_d? :this['d']) { }
    
    // watch fn (getter) & handler (setter), better for auto type
    get '_watch:placeholder' () { return this.d; }
    set '_watch:placeholder' (d) { }
    
    // watch fn (getter) & handler (setter) (another)
    get '_watch:placeholder2--can be any unique word in fact;deep;immediate' () { return this.d; }
    set '_watch:placeholder2--can be any unique word in fact;deep;immediate' (d) { }
    
    /* hook (On prototype for type, starts with `_`) */
    
    // No conflict to methods and so on, wouldn't waste any name!
    _created () { this.c; }
    
    /* inject (On prototype for type, also starts with `_`) */
    
    get _inject () { return [ 'i' ] as const; }
    
    declare i :0;
    
    /* prop */
    
    get _props () { return [ 'p' ] as const; }
    
    declare p :0;
    
    /* data */
    
    d :number = 0;
    
    // Private field is ok! though not reative directly
    #p :0 = 0;
    
    // Really run! With real this!
    constructor (Vue3? :any) {
        super();
        this.p;
        this.i;
        this.m;
        this.d;
        this.#p;
        //this.c;// No computed, because this run during options.data() (compiled by jVue)
        
        // It's possible to set instance level render like options.setup() return in Vue 3:
        Component.render = () => Vue3!.h('p', [ this.d ]);
    }
    
    _render () {
        return arguments.length>1
            ? Vue3.h('p', [ this.d ])
            : this.$createElement!('p', [ this.d ]);
    }
    
    /* Other options, like multiple ways to write render */
    
    static render = function render (this :MyComponent) {
        return arguments.length>1
            ? Vue3.h('p', [ this.d ])
            : this.$createElement!('p', [ this.d ]);
    };
    static staticRenderFns? = [];
    
    static Render = class {
        constructor (Vue3 :any) {
            return function render (this :MyComponent) {
                return Vue3.h('p', [ this.d ]);
            };
        }
    } as any;
    
    static template = `<p>{{ d }}</p>`;
    
    static inheritAttrs = true;
    
    static components = {};
    
    static provide = {};
    
    static emits = [ 'e' ];
    
};

const vm3 :SubComponent =     Vue3.createApp(SubComponent._(Vue3)). mount('body    ');
const vm2 :SubComponent = new Vue2          (SubComponent._(    )).$mount('body > *');

import * as Vue3 from 'vue@3';
import      Vue2 from 'vue@2.6.12';
```

Scoped Style
------------

前端组件的 CSS 局部作用域需求，一直是一个大问题。  
For front-end components, the requirement of scoped CSS has been a big problem so far.  

现在我们可以像这样使用 `j-vue` 模块来解决这一问题：  
Now we can use `j-vue` like this to resolve this problem:  

```js
import { Scope, Style, Template } from 'j-vue';

const componentSharedStaticScope = Scope();

Style(`
    .__static__ {
        border: 1px solid black;
        animation: __xxx__;
    }
    @keyframes __xxx__ { }
`, componentSharedStaticScope);

new Vue({
    template: Template(`
        <div class="__static__">
            <STYLE> .{{ instancePrivateDynamicScope('dynamic') }} { color:red; } </STYLE>
            <p :class="{ [instancePrivateDynamicScope( 'dynamic')]: red   }">text</p>
            <p :class="   instancePrivateDynamicScope({ dynamic   : red  })">text (object)</p>
            <p :class="   instancePrivateDynamicScope([ red && 'dynamic' ])">text (array)</p>
            <p :class="   instancePrivateDynamicScope(  red && 'dynamic'  )">text (arguments)</p>
            <button @click="change">change</button>
        </div>
    `, componentSharedStaticScope),
    data: () => ({
        red: false,
        instancePrivateDynamicScope: Scope(),
    }),
    methods: {
        change () { this.red = !this.red; },
    },
});
```

这最终将执行为：  
This will eventually be implemented as:  

```js
document.documentElement.firstChild.appendChild(document.createElement('style')).textContent = `
    .a {
        border: 1px solid black;
        animation: b;
    }
    @keyframes b { }
`;
new Vue({
    template: `
        <div class="a">
            <STYLE> .c { color:red; } </STYLE>
            <p :class="{ c:    red  }">text</p>
            <p :class="{ c:    red  }">text (object)</p>
            <p :class="[ red && 'c' ]">text (array)</p>
            <p :class="  red && 'c'  ">text (arguments)</p>
            <button @click="change">change</button>
        </div>
    `,
    data: () => ({
        red: false,
    }),
    methods: {
        change () { this.red = !this.red; },
        /*instancePrivateDynamicScope:
          j-vue 内置的 36 进制（0-9a-z）发号器，并会跳过所有数字打头的值（这意味着第一个号会是“a”）。
          A base-36 (0-9a-z) ID generator build-in j-vue,
          and skip all value starts with digit (that means "a" will be the first ID).
        */
    },
});
```

从此，我们可以这样写 `.vue` 单文件组件：（只需要预处理器的支持 [①]）  
So, we can write our `.vue` single-file component like this from now on: (only need pre-processor support [①])  

```vue
<style>
    .__static__ {
        border: 1px solid black;
        animation: __xxx__;
    }
    @keyframes __xxx__ { }
</style>
<template>
    <div class="__static__">
        <STYLE> .{{ instancePrivateDynamicScope('dynamic') }} { color:red; } </STYLE>
        <p :class="{ [instancePrivateDynamicScope( 'dynamic')]: red   }">text</p>
        <p :class="   instancePrivateDynamicScope({ dynamic   : red  })">text (object)</p>
        <p :class="   instancePrivateDynamicScope([ red && 'dynamic' ])">text (array)</p>
        <p :class="   instancePrivateDynamicScope(  red && 'dynamic'  )">text (arguments)</p>
        <button @click="change">change</button>
    </div>
</template>
<script>
    import { template, Scope } from '?j-vue';
    new Vue({
        template,
        data: () => ({
            red: false,
            instancePrivateDynamicScope: Scope(),
        }),
        methods: {
            change () { this.red = !this.red; },
        },
    });
</script>
```

这种运行时方案比静态编译选择器名的做法，一来更可靠（只有前端全局发号器才能真正保证类名绝对不重复 [②]），二来可以达到以实例为单位的动态使用的目的。  
This kind of runtime solution is more reliable (only front-end global id generator can promise unique selector [②]) and support dynamically use.  

[①]: #user-content-1
<a id="user-content-1"></a>
① 刚刚提到的后端预处理器（用于单文件组件编译）也有提供：  
① Back-end pre-processor we just mentioned (for single-file component compiling) is also supplied:  

```js
const { SFC } = require('j-vue');
const sfc = new SFC(source);
sfc.export('default');
// import { ... } from '?j-vue';
// export default { ... };
sfc.export('var');
// import * as jVue from 'j-vue';
// export var scopeFunction   = jVue.Scope( ... );
// export var template        = jVue.Template( ... );
// export var Render          = jVue.Render( ... );
// export var render          = jVue.Render( ... );
// export var staticRenderFns = StaticRenderFns( ... );
// export { Identifier, Scope, Style, remove, Component, mixin } from 'j-vue';
```

[②]: #user-content-2
<a id="user-content-2"></a>
② 另一种足够可靠的方法是通过选择器后的全部样式内容，用可逆算法生成选择器名，这样即便同名内容也是完全一样的；不过出于多种考虑，`j-vue` 没有选用这种做法。  
② Another reliable way is using reversible algorithm to generate the selector name by all the style content after the selector, so that if names conflict, their contents are also the same; but for reasons, `j-vue` didn't choose this way.  
