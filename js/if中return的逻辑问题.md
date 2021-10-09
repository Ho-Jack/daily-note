```javascript
    function ifshow(){
        if(true){
            console.log('111');
            return      
        }
        console.log('2222');
        
    }
    ifshow()
    
//  111
```

return 能返回中断主函数的运行



#### 外部函数的return是没法中断本函数的执行的

```javascript
    function go() {
        console.log('go');
        return
    }

    function XX() {
        console.log('执行XX函数');
        go()
        console.log('go函数内的return,无法中断XX函数执行')
        if (true) {
            console.log('进入if')
            return
        }
        console.log('XX-2222222')
    }
    XX()
//执行XX函数
//go
//go函数内的return,无法中断XX函数执行
//进入if
```

