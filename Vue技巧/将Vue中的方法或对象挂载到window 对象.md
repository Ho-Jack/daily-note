#### 将Vue中的方法或对象挂载到window 对象

- - ##### vue方法挂载到window对象

```js

mounted() {
    // 将backToday方法绑定到window下面，提供给外部调用
     window['backToday'] = () => {
        this.goToday()
     }
 },
 methods: {
    goToday() {
        // to do something
    }
 }
```

- ##### vue的对象挂载到window对象

```js
mounted（）{

 window.$notify **=** **this**.$notify  //向window对象挂载element的notify

}

```

