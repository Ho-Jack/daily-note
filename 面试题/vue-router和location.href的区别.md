## vue-router实现

### hash模式的特点

hash表示的是地址栏URL中#符号(也称作为锚点), hash虽然会出现在URL中, 但是不会被包含在Http请求中, 因此hash值改变不会重新加载页面.

由于hash值变化不会引起浏览器向服务器发出请求, 而且hash改变会触发hashchange事件, 浏览器的进后退也能对其进行控制, 所以在HTML5之前, 基本都是使用hash来实现前端路由.

###  history模式的特点

利用了HTML5新增的`pushState()`和`replaceState()`两个api, 通过这两个api完成URL跳转不会重新加载页面

同时history模式解决了hash模式存在的问题. hash的传参是基于URL的, 如果要传递复杂的数据, 会有体积限制, 而history模式不仅可以在URL里传参, 也可以将数据存放到一个特定的对象中



| api     | hash                    | history                     |
| ------- | ----------------------- | --------------------------- |
| push    | window.location.assign  | window.history.pushState    |
| replace | window.location.replace | window.history.replaceState |
| go      | window.history.go       | window.history.go           |
| back    | window.history.go(-1)   | window.history.go(-1)       |
| forward | window.history.go(1)    | window.history.go(1)        |

- push  添加新的路由，history.go()能正常返回上个路由
- replace 替换当前路由，history.go()不能正常返回上个路由，返回的上上个路由

## vue-router和location.href的区别

①vue-router使用pushState进行路由更新，静态跳转，页面不会重新加载；location.href会触发浏览器，页面重新加载一次

②vue-router使用diff算法，实现按需加载，减少dom操作

③vue-router是路由跳转或同一个页面跳转；location.href是不同页面间跳转；

④vue-router是异步加载this.$nextTick(()=>{获取url})；location.href是同步加载


> location是window对象的属性（location对象包含有关当前 URL 的信息。）

## Location 对象属性

| 属性                                                         | 描述                                          |
| :----------------------------------------------------------- | :-------------------------------------------- |
| [hash](https://www.w3school.com.cn/jsref/prop_loc_hash.asp)  | 设置或返回从井号 (#) 开始的 URL（锚）。       |
| [host](https://www.w3school.com.cn/jsref/prop_loc_host.asp)  | 设置或返回主机名和当前 URL 的端口号。         |
| [hostname](https://www.w3school.com.cn/jsref/prop_loc_hostname.asp) | 设置或返回当前 URL 的主机名。                 |
| [href](https://www.w3school.com.cn/jsref/prop_loc_href.asp)  | 设置或返回完整的 URL。                        |
| [pathname](https://www.w3school.com.cn/jsref/prop_loc_pathname.asp) | 设置或返回当前 URL 的路径部分。               |
| [port](https://www.w3school.com.cn/jsref/prop_loc_port.asp)  | 设置或返回当前 URL 的端口号。                 |
| [protocol](https://www.w3school.com.cn/jsref/prop_loc_protocol.asp) | 设置或返回当前 URL 的协议。                   |
| [search](https://www.w3school.com.cn/jsref/prop_loc_search.asp) | 设置或返回从问号 (?) 开始的 URL（查询部分）。 |

## Location 对象方法

| 属性                                                         | 描述                     |
| :----------------------------------------------------------- | :----------------------- |
| [assign()](https://www.w3school.com.cn/jsref/met_loc_assign.asp) | 加载新的文档。           |
| [reload()](https://www.w3school.com.cn/jsref/met_loc_reload.asp) | 重新加载当前文档。       |
| [replace()](https://www.w3school.com.cn/jsref/met_loc_replace.asp) | 用新的文档替换当前文档。 |

```js
ancestorOrigins: DOMStringList {length: 0}
assign: ƒ assign()
fragmentDirective: FragmentDirective {}
hash: "#/smz"
host: "localhost:9004"
hostname: "localhost"
href: "http://localhost:9004/#/smz"
origin: "http://localhost:9004"
pathname: "/"
port: "9004"
protocol: "http:"
reload: ƒ reload()
replace: ƒ replace()
search: ""
toString: ƒ toString()
valueOf: ƒ valueOf()
Symbol(Symbol.toPrimitive): undefined
__proto__: Location
```

