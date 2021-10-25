---
title: promise实现函数顺序执行
date: 2019-05-15 18:00:00
tags: [JS, ES6, 开发笔记]
---

## promise实现函数顺序执行

> return Promise.resolve(value) == return new Promise((resolve,reject)=>{ resolve(value) })
> promise.then() 必须返回新的promise对象 才能进行组成promise链

### 函数顺序执行

```js
function  A(){
    // 你的逻辑代码 
    return Promise.resolve(/* 这里是需要返回的数据*/)
}

function B(){
    // 你的逻辑代码 
    return Promise.resolve(/* 这里是需要返回的数据*/)
}


```

#### 普通写法：

```js
function GO(){
    A().then(val=>{
        /* A 函数运行成功，并获取A函数的val */
        B().then(val=>{
          /* B函数运行成功 并获取B 函数的val */
        })
    })
}
```

#### 最优写法 async/await：

```js
async function GO(){
let  a= await A()
  console.log(a)
    await B()
}
```

Vue项目中axios 返回布尔值的应用

```javascript
async function login() {
  let isBol = ""
  await axios.post("/login", {username:"100001", password:"123456"})
    .then(function(response) {
        console.log(response)
        isBol = true
    }, function(err){
        console.log(err)
        isBol  = false
    })

  return isBol
}
```



