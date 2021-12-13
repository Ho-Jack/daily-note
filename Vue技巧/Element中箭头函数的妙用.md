#### Element中select组件到的远程搜索

>remote-method  远程搜索方法 (方法中默认值只有一个，即输入框的值)
>
>如果业务需要remote-method方法引入其他参数，我们可以借助箭头函数的形式巧妙使用其他参数

```javascript
<template>
  <el-select
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

methods：{
 remoteMethod(value){
     //value为默认参数
 }   
}
```



#### 巧妙使用箭头函数

```javascript
<template>
  <el-select
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="(query)=>remoteMethod(query,orther)"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

methods：{
 remoteMethod(query,orther){
     //query为默认参数
     //orther 为其他想要的参数
 }   
}
```

#### 其实这里就是用到了箭头函数的技巧

分解一下

```javascript
(query)=>remoteMethod(query,orther)
```

```javascript
(query)=>{
  return remoteMethod(query,orther)
}
```

##### 也就是 原本remote-method实现调用的是一个含默认参数的匿名函数，然后在匿名函数里面返回对应的方法和想要的参数