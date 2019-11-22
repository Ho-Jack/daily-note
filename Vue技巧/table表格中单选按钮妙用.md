---
title: Element-UI,table表格里单选按钮妙用
date: 2019-4-11 04:00:00
tags: [Element-UI, 开发笔记]
---

- table表格组件中单选按钮

```html
<el-table-column width="40" align="center" header-align="center">
   <template scope="scope">
      <el-radio class="radio" v-model="AA" :label="scope.row"></el-radio>
   </template>
</el-table-column>
```

1. 每一行选中的值（scope.row）这个对象都存进了 v-model绑定的对象AA中

2. 在watch这个钩子函数中监控AA

   ```js
     watch:{
        'AA' (value ){
                //执行函数,如保存当前选中行的值，或者根据当前行的值做一些操作
                   }
                     }
   ```
