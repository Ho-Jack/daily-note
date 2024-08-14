# Vue3编码规范-优雅永不过时

### 1. 按功能块写代码,不要想着data、methods了

- vue3就用`composition api`的思想来组织代码接口,按功能块写,抛弃vue2拆分`data`、`methods`、`computed` 、生命函数分开写的思想

- 避免将变量声明全部写在一个地方.按功能分开写

- 做到能轻松地将这一组代码移动到一个外部文件中(抽离成Hooks)

  ![vue3代码规范-按功能块写代码](../../Goldpac/UMV/common-service-center-web/doc/img/vue3代码规范-按功能块写代码.gif)

  ###### 按功能块写法对比:

  - 不规范写法

    > 把`list`和`list2`所有的变量声明都放在一块了

    ```vue
    <script lang="ts" setup  name="test">
    import * as api from '@/api/table'
    let list = ref([
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 2, c: 3 }
    ])
    let list2 = ref([
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 2, c: 3 }
    ])
    const getList = async () => {
      try {
        let res = await api.saveTableApi({})
        list.value = res
      } catch (error) {}
    }
    
    const getList2 = async () => {
      try {
        let res = await api.saveTableApi({})
        list2.value = res
      } catch (error) {}
    }
    
    onMounted(() => {
      getList()
      getList2()
    })
    </script>
    ```

  - 按功能块写

    ```vue
    <script lang="ts" setup >
    import * as api from '@/api/table'
    //功能1    
    let list = ref([
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 2, c: 3 }
    ])
    
    const getList = async () => {
      try {
        let res = await api.saveTableApi({})
        list.value = res
      } catch (error) {}
    }
    onMounted(() => {
      getList()
    })
    //功能2
    let list2 = ref([
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 2, c: 3 }
    ])
    const getList2 = async () => {
      try {
        let res = await api.saveTableApi({})
        list2.value = res
      } catch (error) {}
    }
    onMounted(() => {
      getList2()
    })
    </script>
    ```

### 2. 使用`setup`语法糖 `<script setup>`编写组件

###### `setup`语法糖必须掌握的`api`:

- `defineProps()` 和 `defineEmits()`
- `defineModel()`
- `defineExpose()`
- `defineOptions()`






### 3.使用`ref`避免使用`reactive` 声明响应式数据

- `ref`是官方推荐的声明响应式数据的`API`,可以声明基本数据类型和引用数据类型

- 携带`.value` 尾巴,能直观展示是响应式数据

- `vscode` 的`Vue-official`插件可开启对ref声明的响应式数据自动添加`.value`

  

### 4. `v-for`和`v-if`同时使用时,巧妙使用`template`

> `v-for`和`v-if`是不能同时使用的,但是有些情况需要在遍历的时候判断能否展示

```html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```





- 


### 4.组件名称规范:

##### 使用大驼峰/`PascalCase`命名组件,兼容性强

```html
<template>
     <!-- 实例化组件方式1 -->
    <MyComponent/>
     <!-- 实例化组件方式2 -->
    <my-component/>
</template>
<script setup>
    import MyComponent from './MyComponent'
</script>
```

在`elment-plus`UI组件库里面也是同样的,组件有2中实例化方式,使用大驼峰命名和使用横线命名

> `elment-plus`源码中就是使用大驼峰导出组件名称的 `exports["default"] = ElButton;`

```html
<template>
     <!-- 实例化组件方式1 -->
     <ElButton type="primary" >按钮1</ElButton>
     <!-- 实例化组件方式2 -->
     <el-button type="primary" >按钮1</el-button>
</template>
```

##### 紧密耦合的组件名称:

与其父组件紧密耦合的子组件应包含父组件名称作为前缀。

命名规则:  父组件名称+子组件名称

**好处:**

- 关系更紧密,通过看组件名即可知道2个组件的联系

- 编辑器友好,例如`VsCode`,通常按字母顺序组织文件，因此这也使这些相关文件彼此相邻;

  

**对比:**

- 不推荐

  ```
  components/
  |- SearchSidebar.vue
  |- NavigationForSearchSidebar.vue
  ```

- 推荐

  ```
  components/
  |- SearchSidebar.vue
  |- SearchSidebarNavigation.vue
  ```

  组件命名关联关系更紧密,如果同目录还有其他组件,会优先把这2个组件排序在一块

  

##### 组件名称使用完整单词命名

> 组件名称应优先使用**完整单词**而不是缩写。

编辑器中的自动完成功能使编写较长名称的成本非常低，但是完整单词带给我们清晰度是无价的

**对比**:

- 不推荐

  ```
  components/
  |- SdSettings.vue
  |- UProfOpts.vue
  ```

- 推荐

  ```
  components/
  |- StudentDashboardSettings.vue
  |- UserProfileOptions.vue
  ```

  



### 5.路由设置的path和组件的路径保持一致

好处: 通过`url`上的路径就能直接找到组件在项目中的位置

![image-20240814154547690](C:/Users/hao-jie.chen/AppData/Roaming/Typora/typora-user-images/image-20240814154547690.png)

图中,个人中心的这个菜单的路径是`/personal/personnal-center` ,如果页面有报错,根据URL上的路径就直接能定位出现问题的组件的是在项目中`/Personal/PersonalCenter`下





### 5`hooks`、`utils`、`constants`、`types`、API 等文件，就近存放，必要时才做目录提升

> 不能公共使用的都放在当前组件目录下

```
  |- 组件目录
    |- Index.vue 组件
    |- common  该组件下的工具方法
    	|- hooks   
    	|- utils
    	|- types
    	|- constants
    	|- API
```

为什么`API`请求不是放在公共api目录下,而是推荐放在业务代码目录下?



我们看大部分的vue3开源管理系统项目的api接口请求都是放在公共的API目录下,

但是在企业项目中业务量是巨大，API目录可能会变得非常庞大，难以维护,出现以下情况:

1. API目录下的api请求js文件过于庞大,如果文件夹语意不明确,根本无法知道是属于哪个业务的

2. API目录下的api请求js,正常情况都是与业务紧密关联的,统一放在API目录下降低了代码的可读性

单独放在业务目录下的好出:

1. 方便跳转,在该业务目录下即可直达`api`请求的js文件,方便维护
2. api接口与业务联系更紧密,提高了代码可读性,





#### 3.1.10. 写TS不要写成any TS,减少any的使用

