在内部函数 if中  return

在内部函数中  执行外部函数（该外部函数有return，只会中断外部函数的执行）

```js
 function go() {
        console.log('go');
        return
    }

    function XX() {
        go()
        console.log('go函数内的return,无法中断XX函数执行')
        if (true) {
            console.log('进入if')
            return
        }
        console.log('XX-2222222')
    }

    XX()
```

```js
go
go函数内的return,无法中断XX函数执行
进入if
```

