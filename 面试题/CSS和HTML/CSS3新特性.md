---
title: CSS3新特性
date: 2020-06-05  11:43:29
tags: [面试]
---

## CSS3新特性

1.过渡 transition
2.动画 animation
3.形状转换 transform
4.选择器
5.阴影 box-shadow
6.边框 border-image\border-raduis
7.背景
8.颜色
9.滤镜filter
10.媒体查询
11.栅格布局gird
12.弹性布局flex





效果曲线(如何完成一个周期)：

| 值                            | 描述                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| linear                        | 动画从头到尾的速度是相同的。                                 |
| ease                          | 默认。动画以低速开始，然后加快，在结束前变慢。               |
| ease-in                       | 动画以低速开始。                                             |
| ease-out                      | 动画以低速结束。                                             |
| ease-in-out                   | 动画以低速开始和结束。                                       |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。 |





### 1. transition  过度

> 无论是通过操作dom 或者css 来改变的dom元素的变化 都能过度

语法： 

```css
transition： CSS属性 花费时间  效果曲线(默认ease)   延迟时间(默认0);
```

例1：

```css
/*宽度从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒，0.2秒后执行过渡*/
transition:width  0.5s  ease   0.2s;
```

例2：

```css
/*所有属性从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒*/
transition：all   0.5s;
```



完整例子：

```CSS
/*div在鼠标hover宽度变为300px  有运动实践0.5S*/
div{
    width:100px;
    transition: width  0.5s;
}
div:hover {width:300px;}
```





### 2.动画 animation                  美[ˌænɪˈmeɪʃn]

#### @keyframes 规定动画      /kiːfˈreɪm/ 关键帧

```css
/*定义动画go*/
@keyframes go {
　　0% {}
　　50%{}
　　100%{}
}
@keyframes go {
   from {     } /*0%*/   
   to  {     }  /*100%*/   
}
```



| 值  | 说明  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| animation-name   | 规定需要绑定到选择器的 keyframe 名称。 |
| animation-duration  | 规定完成动画所花费的时间，以秒或毫秒计。 |
| animation-timing-function | 设置动画将如何完成一个周期（动画的速度曲线） |
| animation-delay| 设置动画在启动前的延迟间隔。 |
| animation-iteration-count | 定义动画的播放次数。 |
|animation-direction| 指定是否应该轮流反向播放动画。  |
| [animation-fill-mode](https://www.runoob.com/cssref/css3-pr-animation-fill-mode.html) | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |
| *[animation-play-state](https://www.runoob.com/cssref/css3-pr-animation-play-state.html)* | 指定动画是否正在运行或已暂停。                               |
| initial                                                      | 设置属性为其默认值。 [阅读关于 *initial*的介绍。](https://www.runoob.com/cssref/css-initial.html) |
| inherit                                                      | 从父元素继承属性。 [阅读关于 *initinherital*的介绍。](https://www.runoob.com/cssref/css-inherit.html) |



**animation-timing-function** 设置动画如何完成一个周期（动画的速度曲线）

| 值                            | 描述                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| linear                        | 动画从头到尾的速度是相同的。                                 |
| ease                          | 默认。动画以低速开始，然后加快，在结束前变慢。               |
| ease-in                       | 动画以低速开始。                                             |
| ease-out                      | 动画以低速结束。                                             |
| ease-in-out                   | 动画以低速开始和结束。                                       |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。 |

**animation-iteration-count**   动画的播放次数

| 值       | 描述                             |
| :------- | :------------------------------- |
| *n*      | 一个数字，定义应该播放多少次动画 |
| infinite | 指定动画应该播放无限次（永远）   |



语法: 

```css
animation：动画名称 | 一个周期花费时间(多少秒) | 效果曲线（默认ease） | 动画延迟（默认0） 
| 播放次数（默认1） | 是否反向播放动画（默认normal） | 是否暂停动画（默认running）
```

例1：

```css
/*执行一次logo2-line动画，运动时间2秒，运动曲线为 linear*/
animation: logo2-line 2s linear;
```

例2：

```css
/*2秒后开始执行一次logo2-line动画，运动时间2秒，运动曲线为 linear*/
animation: logo2-line 2s linear 2s;
```

例3：

```css
/*无限执行logo2-line动画，每次运动时间2秒，运动曲线为 linear，并且执行反向动画*/
animation: logo2-line 2s linear alternate infinite;
```





完整例子：

```css
{
	width:100px;
	height:100px;
	background:red;
	position:relative;  //位移，需要用到相对定位
	animation:mymove 5s infinite;
}

@keyframes mymove
{
	from {left:0px;}
	to {left:200px;}
}

```





###  3.形状转换 transform

语法：

```css
transform: none|transform-functions;
```

| 值                                                           | 描述                                      |
| :----------------------------------------------------------- | :---------------------------------------- |
| none                                                         | 定义不进行转换。                          |
| matrix(*n*,*n*,*n*,*n*,*n*,*n*)                              | 定义 2D 转换，使用六个值的矩阵。          |
| matrix3d(*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。   |
| **translate(x,y)**                                           | 定义 2D 转换。（单位px）                  |
| translate3d(*x*,*y*,*z*)                                     | 定义 3D 转换。                            |
| translateX(*x*)                                              | 定义转换，只是用 X 轴的值。               |
| translateY(*y*)                                              | 定义转换，只是用 Y 轴的值。               |
| translateZ(*z*)                                              | 定义 3D 转换，只是用 Z 轴的值。           |
| scale(*x*[,*y*]?)                                            | 定义 2D 缩放转换。                        |
| scale3d(*x*,*y*,*z*)                                         | 定义 3D 缩放转换。                        |
| scaleX(*x*)                                                  | 通过设置 X 轴的值来定义缩放转换。         |
| scaleY(*y*)                                                  | 通过设置 Y 轴的值来定义缩放转换。         |
| scaleZ(*z*)                                                  | 通过设置 Z 轴的值来定义 3D 缩放转换。     |
| **rotate(*angle*)**                                          | 定义 2D 旋转，在参数中规定角度。(单位deg) |
| rotate3d(*x*,*y*,*z*,*angle*)                                | 定义 3D 旋转。                            |
| rotateX(*angle*)                                             | 定义沿着 X 轴的 3D 旋转。                 |
| rotateY(*angle*)                                             | 定义沿着 Y 轴的 3D 旋转。                 |
| rotateZ(*angle*)                                             | 定义沿着 Z 轴的 3D 旋转。                 |
| skew(*x-angle*,*y-angle*)                                    | 定义沿着 X 和 Y 轴的 2D 倾斜转换。        |
| skewX(*angle*)                                               | 定义沿着 X 轴的 2D 倾斜转换。             |
| skewY(*angle*)                                               | 定义沿着 Y 轴的 2D 倾斜转换。             |
| perspective(*n*)                                             | 为 3D 转换元素定义透视视图。              |

```
transform:scale(0.8)   //缩小0.8
```



### 4.选择器 
#### 兄弟选择器
- 前一个 + 后一个             选取后一个兄弟元素 
- 前一个 ~ 后边所有         选取后边所有的兄弟元素   

#### 属性选择器
- [属性名="属性值"]         选取属性值等于指定值的元素
- [属性名^="属性值"]       选取属性值以指定内容开头的元素
- [属性名$="属性值"]      选取属性值以指定内容结尾的元素
- [属性名*="属性值"]       选取属性值中包含指定内容的元素

#### 子元素的伪类
- E:first-of-type: 选择属于其父元素的首个E元素的每个E元素。

- E:last-of-type: 选择属于其父元素的最后E元素的每个E元素。

- E:only-of-type: 选择属于其父元素唯一的E元素的每个E元素。

- E:only-child: 选择属于其父元素的唯一子元素的每个E元素。

- E:nth-child(n): 选择属于其父元素的第n个子元素的每个E元素。

- E:nth-last-child(n): 选择属于其父元素的倒数第n个子元素的每个E元素。

- E:nth-of-type(n): 选择属于其父元素第n个E元素的每个E元素。

- E:nth-last-of-type(n): 选择属于其父元素倒数第n个E元素的每个E元素。

- E:last-child: 选择属于其父元素最后一个子元素每个E元素。


####  相关伪类
- :root: 选择文档的根元素。

- E:empty: 选择没有子元素的每个E元素（包括文本节点)。

- E:target: 选择当前活动的E元素。

- E:enabled: 选择每个启用的E元素。

- E:disabled: 选择每个禁用的E元素。

- E:checked: 选择每个被选中的E元素。

- E:not(selector): 选择非selector元素的每个元素。

- E::selection: 选择被用户选取的元素部分

`:root，:empty，:target，:enabled，:checked`。这几个不推荐使用，网上的说法是性能较差

### 5.阴影

语法：

```css
box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;
```

实例

```css
div{
    width:300px;
    height:100px;
    background:#09f;
    box-shadow: 10px 10px 5px #888888;
}
```



### 6.边框( ie不支持 )

#### - 边框图片 （不需要加单位PX）

  语法：

  ```css
  border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘制偏移的量（默认0） 铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;
  ```

  实例：

  ```css
  div {
      border: 15px solid transparent;
      padding: 15px;   
      border-image: url(border.png);
      border-image-slice: 30;   
      border-image-repeat: round;
      border-image-outset: 0;
  }
  ```

#### - 边框圆角

  语法：

  ```css
  border-radius: n1,n2,n3,n4;
  border-radius: n1,n2,n3,n4/n1,n2,n3,n4;
  /*n1-n4四个值的顺序是：左上角，右上角，右下角，左下角。*/
  ```


### 7. 背景 

前戏：背景自适应

```css
.imgeDemo {
            background-image:url(images/yuantiao.jpg);
            background-repeat:no-repeat;   
            background-size:100% 100%;
            }
```

css3新增的背景属性：

- background-size   属性规定背景图片的尺寸。

    如果以百分比规定尺寸，那么尺寸相对于父元素的宽度和高度。

- background-origin  属性规定背景图片的定位区域。

  背景图片可以放置于 content-box、padding-box 或 border-box 区域。

![背景图片的定位区域](https://www.w3school.com.cn/i/background-origin.gif)



###  8. 颜色

- rgba（rgb为颜色值，a为透明度）

-  hsla（色相，饱和度，透明度）

```css
color: hsla( 112, 72%, 33%, 0.68);
background-color: hsla( 49, 65%, 60%, 0.68);
```



### 9.滤镜Filter

```css
filter: grayscale(100%);  //黑白色  grayscale  ['grei,skeil] 灰度级;
filter:opacity(.5);       //透明色
filter:sepia(1);          //褐色
filter:saturate(2);       //饱和度saturate
filter:hue-rotate(90deg); //色相旋转hue-rotate(90deg)
filter:invert(1);         //反色filter:invert(1)
filter:brightness(.5);    //亮度brightness(.5)
filter:contrast(2);       //对比度contrast(2)
filter:blur(3px);         //模糊blur(3px)
filter:drop-shadow(5px 5px 5px #000);    //阴影drop-shadow(5px 5px 5px #000)
```

###  10. 媒体查询

响应式栅格：

- xs <768px   (超小屏，手机)
- sm >=768   (小屏，平板)
- md >=992   (中屏，桌面)
- lg >=1200   (大屏，桌面)

常用匹配特征 :
- width/height: 浏览器宽高
- max-width： 表示小于最大宽度时生效
- min-width： 表示大于最小宽度时生效
- device-width/device-height: 设备屏幕分辨率宽高
- resolution: 设备分辨率
- orientation：portrait(纵向),高度大于等于宽度时，landscape(横向),高度小于宽度时



```css
@media screen and (min-width: 1200px) {   }   //lg大屏幕
```





### 11..网格布局 gird   [ɡɜrd]



### 12.弹性布局 flex