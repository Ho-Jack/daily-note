> Vue 组件通讯,其中父组件向子组件传递数据，用Props
>
> 较为特殊的是对象Object的传递
>
> props：{
>
> type:Object,
>
> myObject:()=>{}
>
> }

```js
props: {
  myObject: {
    type: Object,
    default: () => ({
     AA:'',
     BB:''
    }),
  },
},
watch: {
  'myObject.AA'(n) {
    console.log(n);
  },
```

watch 需要监听object内部属性 才能监听到，直接 监听整个 object 是无效的