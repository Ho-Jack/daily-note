---
title: SCSS中deep的使用
date: 2020-07-10 20:06:00
tags: [CSS, 开发笔记]
---

### SCSS中deep的使用

vue style中穿透scoped

深度选择器

```css
 /deep/ 
 ::v-deep
 >>> 
```





目前官推 ::v-deep



采用定位组件的方法，通过组件外层的class或id定位，使用 >>> 进行样式穿透。

```
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

