## 虚拟DOM (虚拟DOM不会进行排版与重绘操作)

> ⽤ JavaScript 对象表示 DOM 信息和结构，更新后使之与真实dom保持同步，同步过程就是协调，核心是diff算法。

- #### 操作DOM相对较慢,更因为频繁变动DOM会造成浏览器的回流或者重绘

- 更好的跨平台,比如Node.js就没有DOM,如果想实现SSR(服务端渲染),那么一个方式就是借助Virtual DOM,因为Virtual DOM本身是JavaScript对象.

- 通过diff算法对比新旧vdom之间的差异，可以批量的、最⼩化的执行dom操作，从而提高性能.

