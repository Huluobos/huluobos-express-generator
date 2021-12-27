##### 子组件在自己身上挖了一个坑,
##### 父组件引用子组件并在子组件标签里填充内容，插到子组件的坑里。


---
三种插槽：
1. 匿名插槽(solt不写name ，name默认就是'default')

```
//子组件
<template>
	<div class="son">
		<header>我是头部</header>
		<slot>匿名插槽 - 默认内容</slot>
		<slot>槽可有多个 - 默认内容</slot>
	</div>
</template>

//父组件
<template>
	<div class="father">
		<Son></Son>
	</div>
	<div class="father">
		<Son>
		    <div>333</div>
		</Son>
	</div>
</template>

//打印：
    我是头部
    333
    333
    我是头部
    匿名插槽 - 默认内容
    槽可有多个 - 默认内容

```

2. 具名插槽

```
//子组件
<template>
	<div class="son">
		<header>我是头部</header>
		<slot name="one">插槽one - 默认内容</slot>
	</div>
</template>

//父组件 (#号代替v-slot。)
<template>
	<div class="father">
		<Son></Son>
	</div>
	<div class="father">
		<Son>
		    <template #one>
				<div>填充内容one</div>
			</template>
		</Son>
	</div>
</template>

//打印：
    我是头部
    插槽one - 默认内容
    我是头部
    填充内容one

```

3. 作用域插槽
```
//子组件 ( val1 = "sss" )
<template>
	<div class="son">
		<header>我是头部</header>
		<slot name="one" v-bind:val="val1">插槽one默认内容</slot>
	</div>
</template>


//父组件 (#号代替v-slot。)
<template>
	<div class="father">
		<Son></Son>
	</div>
	<div class="father">
		<Son>
		    <template #one="user">
				<div>子组件传值：{{user.val}}</div>
			</template>
		</Son>
	</div>
</template>

//打印：
    我是头部
    插槽one默认内容
    我是头部
    子组件传值：sss

```
