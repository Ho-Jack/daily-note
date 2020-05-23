---
title: Vue中使用三元运算符及扩展四元运算符
date: 2019-11-08 00:00:00
tags: [开发笔记, Vue]
---

## Vue中使用三元运算符及扩展四元运算符

**style三元表达式**

```html
<p :style="{'color': (checkIndex3==m.txt ? '#3d8cff':'#BBBBBB')}">{{m.txt}}</p>
```

**class三元表达式**

```html
<i class="iconfont "  :class="[isShow=='password'?'icon-kejian':'icon-bukejian']"></i>
```

##### 四元运算符 : 多个三元运算符 嵌套

一般三元运算符就够用了，

但是此时有个需求：state有3个状态，{null,true,false}

null→未用

true→在用

false→停用

```js
var state = null;

var display_state = (state == null ? "未用" : (state == true ? "在用" : "停用"))

//display_state
//"未用"
```

总结：三元运算符 用于运算2种结果，三元运算符嵌套使用可以运算多种结果。