---
title: SCSS中deep的使用
date: 2020-07-10 20:06:00
tags: [CSS, 开发笔记]
---

## style-scoped标签内样式穿透deep

> `<style scoped>`,`scoped`会自动添加一个**唯一**的 attribute (比如 `data-v-21e5b78`) **为组件内 CSS 指定作用域**，编译的时候 `.list-container:hover` 会被编译成类似 `.list-container[data-v-21e5b78]:hover` **避免父组件的样式影响到子组件的样式**

### 父组件修改子组件样式：样式穿透(深度作用选择器)

> 作用：引用组件库时，可以通过样式穿透修改组件库子组件的样式，这种在scoped属性内进行穿透的样式，不会影响全局作用域，不用修改全局样式，更加灵活

```css
 /deep/ 
 ::v-deep       
 >>>            只能作用于普通css 对scss和less无效
:deep(xxx)   //vue3写法
```

#### 目前官推 ::v-deep ，在vue3中继续支持，Vue3放弃了/deep/的支持



采用定位组件的方法，通过组件外层的class或id定位，使用 >>> 进行样式穿透。

```vue
<div class="edit_dev">
          <el-transfer
            v-loading="transLoading"
            filterable
            filter-placeholder="搜索"
            v-model="value"
            :data="transData"
            :titles="['未选择', '已选择']">
          </el-transfer>
  </div>
        
        
<style scoped>
   .edit_dev >>> .el-transfer-panel {
     width:350px;
   }
</style>

```







最后，Vue 的单文件组件里的样式设置是非常灵活的。通过 [vue-loader](https://github.com/vuejs/vue-loader)，你可以使用任意预处理器、后处理器，甚至深度集成 [CSS Modules](https://vue-loader.vuejs.org/en/features/css-modules.html)——全部都在 `<style>` 标签内。

