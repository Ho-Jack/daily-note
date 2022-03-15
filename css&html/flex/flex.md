## flex 布局

容器属性有

```
flex-direction 
flex-wrap
justify-content 
align-items
align-content
```

### flex-direction

> 主轴方向,项目的排列方向

- row                 （默认值,布局为一行，从start开始排）

- row-reverse      (布局为一行，从end开始排)

- column               (布局为一列，从start开始排)   美: [ˈkɑləm]

- column-reverse (布局为一列，从end开始排)

 

### flex-wrap

>  一条轴线排不下如何换行

-  **nowrap**            (默认,不换行，在一行显示)

- wrap                 (内容超过后换行)  美: [ræp]  （使文字）换行

- warp-reverse    (换行后有两条轴线，reverse就是把轴线排列的顺序倒置过来)

 

### justify-content

> 主轴对齐方式

- flex-start       (start侧对齐，左对齐)

- flex-end        (end侧对齐，右对齐)

- center           (中心对齐)

- space-between (左右两侧没有间距，中间间距相同)

- space-around （左右两侧的间距为中间间距的一半）

 

### align-items 

> 交叉轴对齐方式

- stretch   (拉伸)

- flex-start （start侧开始，上对齐）

- flex-end  （end侧开始，下对齐）

- center       (中心对齐)

- baseline （基线对齐）

 

### align-content 

> (多根轴线<多行>对齐方式)： flex-wrap: wrap;

- stretch      (拉伸)

- flex-start  (start侧开始，上对齐)

- flex-end （end侧开始，下对齐）

- center      (中心对齐)

- space-between（上下没有间距，中间各子元素间距相同）

- space-around (上下间距之和等于中间各个间距)

 

### item的相关属性有`order`，`flex-grow`，`flex-shrink`，`flex-basis`，`align-self`

#### order 

> **排列顺序**。数值越小，排列越靠前，默认为0。优先加载

#### flex-grow    

> **放大比例**，剩余空间怎么分配,默认为0。分配比例如 1:2:1
>
> 美: [ɡroʊ] 增加 扩大 生长

#### flex-shrink 

> **缩小比例**，超出空间怎么压缩,默认为1）
>
> - 美: [ʃrɪŋk]   缩水 缩小

#### flex-basis

> **item所占主轴空间**，优先级高于width,
>
> 单位:%  px  rem ...
>
> 美: [ˈbeɪsɪs]   基础

- flex-basis:auto; （width的优先级高）

#### align-self

> **对齐方式**，取值和align-items相同,覆盖align-items

#### flex属性

> `flex-grow`, `flex-shrink` 和 `flex-basis`的简写
>
> 默认值为:  0 1 auto。后两个属性可选 

##### flex:1 

>  flex: 1 1 0%;
>
> 让所有弹性盒模型对象，有相同的长度且忽略他们的内部的内容

- 等比例分配 

- 填充满剩余空间,自适应

##### flex: 0 0 _%  

> 限定item宽度占的百分比/rem/px  (宽度为固定的百分比)

##### flex:auto

> flex: 1 1 auto; 