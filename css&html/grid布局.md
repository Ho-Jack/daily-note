# Grid布局



## Grid 布局和 flex 布局

- flex布局是一维布局

  `flex` 布局一次只能处理一个维度上的元素布局，一行或者一列

  ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/28/173945aadff842d1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=486&h=70&s=5844&e=png&b=e6e6e6)

- Grid布局是二维布局

  `Grid` 布局是将容器划分成了“行”和“列”，产生了一个个的网格，我们可以将网格元素放在与这些行和列相关的位置上，从而达到我们布局的目的。

  ![Grid 布局](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895918bcb5190~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=486&h=70&s=1126&e=png)



## 容器属性

### display 属性

 `display：grid` 则该容器是一个**块级**元素

![块级元素](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591baa442ef~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1240&h=360&s=26117&e=png&b=ffffff)



`display: inline-grid` 则容器元素为**行内**元素

![行内属性](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591c03b6883~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1240&h=219&s=31574&e=png&b=fefefe)

### 设置行高宽高属性

#### grid-template-columns 和 grid-template-rows 

- `grid-template-columns` 设置列宽

- `grid-template-rows` 设置行高

  ```css
  .wrapper {
    display: grid;
    /*  声明了三列，宽度分别为 200px 100px 200px */
    grid-template-columns: 200px 100px 200px;
    grid-gap: 5px;
    /*  声明了两行，行高分别为 50px 50px  */
    grid-template-rows: 50px 50px;
  }
  ```

  ![固定行高和列宽](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591c0fc1214~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1078&h=302&s=27145&e=png&b=fbf5f4)



### 设置间距属性

#### `grid-row-gap` 

- `grid-row-gap` 设置行间距

#### `grid-column-gap` 

- `grid-column-gap` 设置列间距。

#### `grid-gap` 

- ` grid-gap` 设置行和列间距

  语法：  ` grid-gap：行间距 列间距`

### 区域属性

#### 1. grid-area 定义区域

> 下面代码定义了三个div的各自的三个区域

```css
.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.header {
  grid-area: header;
}
```



#### 2. grid-template-areas 指定项目的存放区域

```css
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px  120px  120px;
    /*设置了区域分2行，第一行有三个区域，分别是：空元素 header  header*/
  grid-template-areas:
    ". header  header"
    "sidebar content content";
  background-color: #fff;
  color: #444;
}

```

`.` 符号代表空的单元格，也就是没有用到该单元格。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895920bbe824a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=910&h=442&s=9335&e=png)

### 布局属性

#### `grid-auto-flow：row`

> 先行后列，按顺序排，即先填满第一行，再开始放入第二行

```css
.wrapper {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-auto-flow: row;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592211e1d6b~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1240&h=707&s=96287&e=png&b=ffffff)

按属性排列，即使有空白的，放不下就放在下一行



#### `grid-auto-flow: row dense`

> 在row属性的基础上，增加尽可能填满表格

```css
.wrapper-2 {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-auto-flow: row dense;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895923612a19b~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=874&h=478&s=30240&e=png&b=ffffff)

#### `grid-auto-flow: column`

> 先列后行，列占满再换列，从上到下

```css
.wrapper-1 {
  display: grid;
  grid-auto-columns: 100px;
  grid-auto-flow: column;
  grid-gap: 5px;
  grid-template-rows:  50px 50px;
}
```

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895923f11dd83~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1066&h=280&s=28807&e=png&b=ffffff)







### 单元格布局属性

#### `justify-items`

> 单元格内容的水平位置（左中右）

#### `align-items`

> 单元格的垂直位置（上中下）

- start：对齐单元格的起始边缘
- end：对齐单元格的结束边缘
- center：单元格内部居中
- stretch：拉伸，占满单元格的整个宽度（默认值）



### 内容区域属性

#### `justify-content`

> 整个内容区域在容器里面的水平位置（左中右）

- start - 对齐容器的起始边框

- end - 对齐容器的结束边框

- center - 容器内部居中

- space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍

- space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔

- space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔

- stretch - 项目大小没有指定时，拉伸占据整个网格容器

  ![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895926d20f5d6~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1216&h=770&s=68085&e=png&b=fefbfb)

  ![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895927ba770c4~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1240&h=741&s=121464&e=png&b=fefbfb)



#### `align-content`

> 整个内容区域在容器里面的垂直位置（上中下）

#### `place-content`



## 其他内容：

##### repeat() 函数

> 可以简化重复的值

语法：`repeat(重复次数，重复的值)`

```css
  /*  2行，而且行高都为 50px  */
  grid-template-rows: repeat(2, 50px);
```

##### auto-fill 关键字

> 自动填充，让一行（或者一列）中尽可能的容纳更多的单元格

```css
.wrapper-2 {
  display: grid;
 /* 表示列宽是 200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素*/
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

 ![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591c300e81a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1056&h=176&s=256151&e=gif&f=53&b=1d1e22)





##### fr 关键字

> `fr` 单位代表网格容器中可用空间的一等份。

```css
.wrapper-3 {
  display: grid;
  /*表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。*/
  grid-template-columns: 200px 1fr 2fr;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591ccc256d1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1100&h=166&s=99702&e=gif&f=24&b=fcf7f7)



##### minmax() 函数

> 返回一个长度范围，最小和最大长度

语法:`minmax(最小值，最大值)`

```css
.wrapper-4 {
  display: grid;
  /*第三个列宽最少也是要 300px，但是最大不能大于第一第二列宽的两倍*/
  grid-template-columns: 1fr 1fr minmax(300px, 2fr);
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591dc05edac~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1100&h=166&s=177897&e=gif&f=35&b=f9e9e7)



##### auto 关键字

> 由浏览器决定长度

```css
.wrapper-5 {
  display: grid;
    /*表示第一第三列为 100px，中间由浏览器决定长度*/
  grid-template-columns: 100px auto 100px;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591f2146e1d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1100&h=166&s=86599&e=gif&f=21&b=f8edea)

