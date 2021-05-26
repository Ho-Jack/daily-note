### 解释

`CanvasRenderingContext2D.getImageData()` 返回一个 [ImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象，用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。

#### 语法

```
ctx.getImageData(sx, sy, sw, sh);
```

#### 参数

`sx`：将要被提取的图像数据矩形区域的左上角 x 坐标。

`sy`：将要被提取的图像数据矩形区域的左上角 y 坐标。

`sw`：将要被提取的图像数据矩形区域的宽度。

`sh`：将要被提取的图像数据矩形区域的高度。

#### 返回值

一个 ImageData对象，包含 canvas 给定的矩形图像数据。

ImageData对象会有三个属性，`height`、`width` 和 `data`。

ImageData.height
使用像素描述 ImageData 的实际高度，这个值其实等于 getImageData() 方法中的参数 `sh`

ImageData.width
使用像素描述 ImageData 的实际宽度。这个值其实等于 getImageData()方法中的参数 `sw`

ImageData.data
一个一维数组，包含以 RGBA 顺序的数据，数据使用 0 至 255（包含）的整数表示。
![img](https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg)



#### 第 i 个像素：

R - ImageData.data[ 4 * i + 0 ]

G - ImageData.data[ 4 * i + 1 ]

B - ImageData.data[ 4 * i + 2 ]

A - ImageData.data[ 4 * i + 3 ]

#### 第 X 行第 Y 列的像素:

i = X * width +Y

R - ImageData.data[ 4 * i + 0 ]

G - ImageData.data[ 4 * i + 1 ]

B - ImageData.data[ 4 * i + 2 ]

A - ImageData.data[ 4 * i + 3 ]

#### 注意

如果高度（sh）或者宽度（sw）变量为0，则会抛出错误。