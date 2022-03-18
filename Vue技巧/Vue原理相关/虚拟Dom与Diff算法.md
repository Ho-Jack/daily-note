## 虚拟DOM与Diff算法

### 渲染真实DOM

渲染真实DOM的开销是很大的，比如有时候我们修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排

### 虚拟dom

virtual DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构

- 真实DOM

```html
<div>
    <p>123</p>
</div>
```

- virtual DOM（伪代码）：

```
var Vnode = {
    tag: 'div',
    children: [
        { tag: 'p', text: '123' }
    ]
};
```



