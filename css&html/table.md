---
title: table
date: 2020-04-15 09:11:54
tags: [HTML, 样式]
---

## table

<thead>   表头  <tbody> 主体   <tfoot>表尾

<tr> 表格行，<th>表头（table head），<td> 单元格（table data）。

```html
 <table  border="1" width="95%"  cellspacing="0" ><!--表格开始-->        
        <caption>第一学期学生成绩表</caption><!--表格标题-->
        <thead><!--表格页眉-->
            <tr><!--第一行-->
                <th>姓名</th><!--表头-->
                <th>语文</th>
                <th>数学</th>
                <th>物理</th>
            </tr>
        </thead>
        <tbody><!--表格主体-->
            <tr><!--第二行-->
                <td>张小明</td>
                <td>80</td>
                <td>90</td>
                <td>80</td>
            </tr>
            <tr><!--第三行-->
                <td>王小花</td>
                <td>90</td>
                <td>70</td>
                <td>80</td>
            </tr>
        </tbody>
        <tfoot><!--表格页脚-->
            <tr><!--第四行-->
                <td>平均分</td>
                <td>85</td>
                <td>80</td>
                <td>80</td>
            </tr>
        </tfoot>
    </table><!--表格结束-->

```

#### 表格的行、列合并

-  **rowspan**   行合并
-  **colspan**     列合并



#### 样式

- table-layout

```css
table { table-layout: fixed }
table-layout有三个值：
- auto（缺省）   单元格的大小由内容决定
- fixed         单元格的大小是固定的，由第一个指定大小的单元格决定；如果所有单元格都没有指定大小，则由第一个                 单元格的默认大小决定；如果单元格中的内容超出单元格的大小，则用CSS中的overflow命令控制。
- inherit
```

#### 属性

| 属性                                                         | 值                                                | 描述                                                         |
| :----------------------------------------------------------- | :------------------------------------------------ | :----------------------------------------------------------- |
| [align](https://www.runoob.com/tags/att-table-align.html)    | left center right                                 | HTML5 不支持。HTML 4.01 已废弃。 规定表格相对周围元素的对齐方式。 |
| [bgcolor](https://www.runoob.com/tags/att-table-bgcolor.html) | rgb(x,x,x)   #xxxxxx    *colorname*               | HTML5 不支持。HTML 4.01 已废弃。 规定表格的背景颜色。        |
| [border](https://www.runoob.com/tags/att-table-border.html)  | 1                                                 | 规定表格单元是否拥有边框。                                   |
| [cellpadding](https://www.runoob.com/tags/att-table-cellpadding.html) | *pixels*   （px）                                 | HTML5 不支持。规定单元边沿与其内容之间的空白。               |
| [cellspacing](https://www.runoob.com/tags/att-table-cellspacing.html) | *pixels*                                          | HTML5 不支持。规定单元格之间的空白。                         |
| [frame](https://www.runoob.com/tags/att-table-frame.html)    | void above below hsides lhs rhs vsides box border | HTML5 不支持。规定外侧边框的哪个部分是可见的。               |
| [rules](https://www.runoob.com/tags/att-table-rules.html)    | none groups rows cols all                         | HTML5 不支持。规定内侧边框的哪个部分是可见的。               |
| [summary](https://www.runoob.com/tags/att-table-summary.html) | *text*                                            | HTML5 不支持。规定表格的摘要。                               |
| [width](https://www.runoob.com/tags/att-table-width.html)    | *pixels%*                                         | HTML5 不支持。规定表格的宽度。                               |

- **frame**: 控制着表格最外围的四条边框的可见性

```
void    - 默认值。表示不显示表格最外围的边框。
box     - 同时显示四条边框。
border  - 同时显示四条边框。
above   - 只显示顶部边框。
below   - 只显示底部边框。
lhs     - 只显示左侧边框。
rhs     - 只显示右侧边框。
hsides  - 只显示水平方向的两条边框。
vsides  - 只显示垂直方面的两条边框。
```

- **rules** :控制着表格内部边框的可见性。

```
none   - 默认值。无边框。
groups - 为行组或列组加边框。
rows   - 为行加边框。
cols   - 为列加边框。
all    - 为所有行列（单元格）加边框
```

rules="all"   所以单元格加边框

 