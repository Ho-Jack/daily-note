## sync和$eimt（实现props双向绑定）

> Vue是单向数据流
>
> porps 父组件向子组件通讯
>
> emit 子组件向父组件通讯
>
> 结合不就是双向绑定，sync因此而生，就是这种方式的语法糖

- 父组件：

```vue
<child :ifshow.sync="ifshow" />
//编译时会被扩展为  ifshow为组件上props 和 v-on
<child :ifshow="ifshow" @update:ifshow="val => ifshow = val" />
```

### .sync 其实就是一个语法糖

- 子组件：

```vue
// 子组件可以通过$emit 触发 update 方法改变
<el-dialog  @close="$emit('update:show', false)">关闭</el-dialog>
props:['show']
```

我们使用 vue 编写弹框组件的时候，想要关闭弹窗时往往会写个关闭的方法，子组件$emit，父组件里还要加 @xxx="xxxxx"， 非常的不优雅，现在使用 .sync 就非常方便优雅地控制弹窗显示和隐藏了。

 
