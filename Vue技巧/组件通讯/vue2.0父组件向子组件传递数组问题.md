### Vue2.0父组件向子组件传递数组问题

父组件

```
<父组件  :A='a'/>
this.a[0]=res.content   失效
this.a=[res.content]    可以
```

