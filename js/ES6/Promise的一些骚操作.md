## Promise.resolve()

> ```
> Promise.resolve('foo')
> // 等价于
> new Promise(resolve => resolve('foo'))
> ```

在vue中的应用:链式调用

```json
axios.get(url) .then(res => {
		          -------
				return Promise.resolve();
			})
			.then(() => { -------- }    //如果axios接口调用成功就进入这
```

