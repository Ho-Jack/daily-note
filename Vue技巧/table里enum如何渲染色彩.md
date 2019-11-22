---
title: table里enum如何渲染色彩
date: 2019-5-20 18:00:00
tags: [Element-UI, 开发笔记]
---

> ### 用过滤器和class绑定实现，先过滤不同字段的颜色然后再绑定class

- ### HTML

```html
<span :class="scope.row[key].key | statusFilter" 
      v-if="key == 'status' || key == 'stockInStatus' || key == 'returnStatus' ">
    {{ $format(scope.row[key], column.type, column.format) }}
</span>
```

- ### 过滤器

  ```js
  filters: {
          // 颜色转换
          statusFilter(status) {
              const statusMap = {
                  'rejected': 'red',
                  'nopass': 'red',
                  'pass': 'green',
                  'finish': 'coral',
                  '0-wait':'blue',    //未入库
                  '0-no':'blue',    //无退货
                  '1-part':'coral',   //部分退货
                  '2-finish':'green', //..全部入库
              }
              return statusMap[status]     //返回对象的value
          },
  },
  ```

  - ### CSS

    ```css
    .red{
        color:brown
    }
    ```
