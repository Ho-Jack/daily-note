# Pinia  状态管理

- `去除Mutation，Actions支持同步和异步`
- 无需手动注册store，`store仅在需要时才自动注册`
- 没有模块嵌套，store之间可以自由使用
- `支持模块热更新`





创建pinia实例(根 store) 并将其传递给应用

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
//创建pinia实例
const sotre = createPinia()
//创建vue实例
const app = createApp(App)

app.use(sotre)
app.mount('#app')
```

