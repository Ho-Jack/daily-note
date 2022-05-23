# Canvas API 详解

# Canvas API

## 概述

> Canvas API（画布）用于在网页实时生成图像，并且可以操作图像内容，基本上它是一个可以用JavaScript操作的位图（bitmap）。

------

### 开始使用

- 一、首先新建一个`<canvas>`网页元素。

```html
<canvas id="myCanvas" width="400" height="200">
你的浏览器不支持canvas!
</canvas>
```

上面代码中，如果浏览器不支持这个API，则就会显示`<canvas>`标签中间的文字——“您de浏览器不支持canvas！”。

- 每个**canvas**节点都有一个对应的**context**对象（上下文对象），Canvas API定义在这个**context**对象上面，所以需要获取这个对象，方法是使用**getContext**方法。

```js
var canvas = document.getElementById('myCanvas');

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
}
```

上面代码中，`getContext`方法指定参数`2d`，表示该`canvas`节点用于生成2D图案（即平面图案）。如果参数是`webgl`，就表示用于生成3D图像（即立体图案），这部分实际上单独叫做WebGL API。

------

## 绘图方法

> `canvas`画布提供了一个用来作图的平面空间，该空间的每个点都有自己的坐标，x表示横坐标，y表示竖坐标。原点(0, 0)位于图像左上角，x轴的正向是原点向右，y轴的正向是原点向下

### （1）绘制路径

> `beginPath`方法表示开始绘制路径，`moveTo(x, y)`方法设置线段的起点，`lineTo(x, y)`方法设置线段的终点，`stroke`方法用来给透明的线段着色。

```js
ctx.beginPath(); // 开始路径绘制
ctx.moveTo(20, 20); // 设置路径起点，坐标为(20,20)
ctx.lineTo(200, 20); // 绘制一条到(200,20)的直线
ctx.lineWidth = 1.0; // 设置线宽
ctx.strokeStyle = '#CC0000'; // 设置线的颜色
ctx.stroke(); // 进行线的着色，这时整条线才变得可见
```

moveto和lineto方法可以多次使用。最后，还可以使用closePath方法，自动绘制一条当前点到起点的直线，形成一个封闭图形，省却使用一次lineto方法。

### （2）绘制矩形

> rectangle  [ˈrekˌtæŋɡ(ə)l] 矩形

`fillRect(x, y, width, height)`方法用来绘制矩形

> 它的四个参数分别为矩形左上角顶点的x坐标、y坐标，以及矩形的宽和高。fillStyle属性用来设置矩形的填充色。

```js
ctx.fillStyle = 'yellow';
ctx.fillRect(50, 50, 200, 100); 
```

strokeRect方法与fillRect类似，用来绘制空心矩形。

```
ctx.strokeRect(10,10,200,100); 
```

clearRect方法用来清除某个矩形区域的内容。

```
ctx.clearRect(100,50,50,50); 
```

### （3）绘制文本

> `fillText(string, x, y)` 用来绘制文本，它的三个参数分别为文本内容、起点的x坐标、y坐标。使用之前，需用font设置字体、大小、样式（写法类似与CSS的font属性）。与此类似的还有`strokeText`方法，用来添加空心字。

```js
// 设置字体
ctx.font = "Bold 20px Arial"; 
// 设置对齐方式
ctx.textAlign = "left";
// 设置填充颜色
ctx.fillStyle = "#008600"; 
// 设置字体内容，以及在画布上的位置
ctx.fillText("Hello!", 10, 50); 
// 绘制空心字
ctx.strokeText("Hello!", 10, 100);
```

fillText方法不支持文本断行，即所有文本出现在一行内。所以，如果要生成多行文本，只有调用多次fillText方法。

### （4）绘制圆形和扇形

> `arc`方法用来绘制扇形

```javascript
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
```

arc方法的x和y参数是圆心坐标，radius是半径，startAngle和endAngle则是扇形的起始角度和终止角度（以弧度表示），anticlockwise表示做图时应该逆时针画（true）还是顺时针画（false）。

下面是如何绘制实心的圆形。

```js
ctx.beginPath(); 
ctx.arc(60, 60, 50, 0, Math.PI*2, true); 
ctx.fillStyle = "#000000"; 
ctx.fill();
```

绘制空心圆形的例子。

```javascript
ctx.beginPath(); 
ctx.arc(60, 60, 50, 0, Math.PI*2, true); 
ctx.lineWidth = 1.0; 
ctx.strokeStyle = "#000"; 
ctx.stroke();
```

### （5）设置渐变色

> createLinearGradient方法用来设置渐变色。
>
> createLinearGradient(x1, y1, x2, y2)，其中x1和y1是起点坐标，x2和y2是终点坐标。通过不同的坐标值，可以生成从上至下、从左到右的渐变等等。

```js
var myGradient = ctx.createLinearGradient(0, 0, 0, 160); 

myGradient.addColorStop(0, "#BABABA"); 

myGradient.addColorStop(1, "#636363");
```

使用方法如下：

```js
ctx.fillStyle = myGradient;
ctx.fillRect(10,10,200,100);
```

### （6）设置阴影

> 一系列与阴影相关的方法，可以用来设置阴影。

```js
ctx.shadowOffsetX = 10; // 设置水平位移
ctx.shadowOffsetY = 10; // 设置垂直位移
ctx.shadowBlur = 5; // 设置模糊度
ctx.shadowColor = "rgba(0,0,0,0.5)"; // 设置阴影颜色

ctx.fillStyle = "#CC0000"; 
ctx.fillRect(10,10,200,100);
```

------

## 图像处理方法

### drawImage方法

> Canvas API 允许将图像文件插入画布，做法是读取图片后，使用`drawImage`方法在画布内进行重绘。
>
> ```js
> context.drawImage(image, dx, dy);
> context.drawImage(image, dx, dy, dWidth, dHeight);
> context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
> //sx，sy，sWidth和sHeight对原始图片的提前剪裁,新图放在dx，dy，dWidth和dHeight这个Canvas画布区域中
> ```

```js
var img = new Image();
img.src = 'image.png';
ctx.drawImage(img, 0, 0); // 设置对应的图像对象，以及它在画布上的位置
//以上代码由于图片加载需要时间，导致图片没显示在画布上，drawImage需要使用onload函数内
img.onload = function () {
        ctx.drawImage(img, 0, 0)
}
```



由于图像的载入需要时间，drawImage方法只能在图像完全载入后才能调用，因此上面的代码需要改写。

```js
var image = new Image();

image.onload = function() {
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext('2d').drawImage(image, 0, 0);
  // 插入页面底部
  document.body.appendChild(image);
  return canvas;
}

image.src = 'image.png';
```

### getImageData方法，putImageData方法

- 跨域问题： ` live-server --cors`

> getImageData方法可以用来读取Canvas的内容，返回一个对象，包含了每个像素的信息。

```js
var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
```

imageData对象有一个data属性，它的值是一个一维数组。该数组的值，依次是每个像素的红、绿、蓝、alpha通道值，因此该`数组的长度= 图像的像素宽度 x 图像的像素高度 x 4`，每个值的范围是0–255。这个数组不仅可读，而且可写，因此通过操作这个数组的值，就可以达到操作图像的目的。修改这个数组以后，使用`putImageData`方法将数组内容重新绘制在Canvas上。

```js
context.putImageData(imageData, 0, 0);
```

### toDataURL方法

> 对图像数据做出修改以后，可以使用`toDataURL`方法，将Canvas数据重新转化成一般的图像文件形式。
>
> toDataURL方法生成base64图片

```js
function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL('image/png');
  return image;
}
```

上面的代码将Canvas数据，转化成PNG data URI。

#### 使用toDataURL导出图片

> 向HTML 插入img标签，提示用户长按保存（PC端右键导出）

```js
    let canvas = document.getElementById('canvas')
    var ctx = canvas.getContext("2d");
    let img = new Image()
    img.crossOrigin = '';
    img.onload = function () {
        ctx.drawImage(img, 0, 0)
        let imageData = new Image();
        imageData.src = canvas.toDataURL('image/png');
        document.body.appendChild(imageData) // 长按图片保存
    }
    img.src = './girl.png'
```



### save方法，restore方法

- save方法用于保存上下文环境，

- restore方法用于恢复到上一次保存的上下文环境。

```js
ctx.save();//保存
//添加阴影和颜色
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 5;
ctx.shadowColor = 'rgba(0,0,0,0.5)';

ctx.fillStyle = '#CC0000';
ctx.fillRect(10,10,150,100);//绘制带有阴影的矩形

ctx.restore(); //恢复到save之前（ctx不带阴影）

ctx.fillStyle = '#000000';
ctx.fillRect(180,10,150,100);

```

上面代码先用save方法，保存了当前设置，然后绘制了一个有阴影的矩形。接着，使用restore方法，恢复了保存前的设置，绘制了一个没有阴影的矩形。

------

## 动画

> 利用JavaScript，可以在canvas元素上很容易地产生动画效果。

```js
var posX = 20,
    posY = 100;

setInterval(function() {
	context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);

	posX += 1;
	posY += 0.25;

	context.beginPath();
	context.fillStyle = "white";

	context.arc(posX, posY, 10, 0, Math.PI*2, true); 
	context.closePath();
	context.fill();
}, 30);

```

上面代码会产生一个小圆点，每隔30毫秒就向右下方移动的效果。setInterval函数的一开始，之所以要将画布重新渲染黑色底色，是为了抹去上一步的小圆点。

通过设置圆心坐标，可以产生各种运动轨迹。

先上升后下降。

```
var vx = 10,
    vy = -10,
    gravity = 1;

setInterval(function() {
    posX += vx;
    posY += vy;
    vy += gravity;
	// ...
});

```

上面代码中，x坐标始终增大，表示持续向右运动。y坐标先变小，然后在重力作用下，不断增大，表示先上升后下降。

小球不断反弹后，逐步趋于静止。

```
var vx = 10,
    vy = -10,
    gravity = 1;

setInterval(function() {
    posX += vx;
    posY += vy;

	if (posY > canvas.height * 0.75) {
          vy *= -0.6;
          vx *= 0.75;
          posY = canvas.height * 0.75;
    }
	
    vy += gravity;
	// ...
});

```

上面代码表示，一旦小球的y坐标处于屏幕下方75%的位置，向x轴移动的速度变为原来的75%，而向y轴反弹上一次反弹高度的40%。

------

## 像素处理

> 通过getImageData方法和putImageData方法，可以处理每个像素，进而操作图像内容。

假定filter是一个处理像素的函数，那么整个对Canvas的处理流程，可以用下面的代码表示。

```
if (canvas.width > 0 && canvas.height > 0) {

	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    filter(imageData);

    context.putImageData(imageData, 0, 0);

}

```

以下是几种常见的处理方法。

### 灰度效果

> 灰度图（grayscale）就是取红、绿、蓝三个像素值的算术平均值，这实际上将图像转成了黑白形式。假定d[i]是像素数组中一个象素的红色值，则d[i+1]为绿色值，d[i+2]为蓝色值，d[i+3]就是alpha通道值。转成灰度的算法，就是将红、绿、蓝三个值相加后除以3，再将结果写回数组。

```
grayscale = function (pixels) {

	var d = pixels.data;

    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
    }

    return pixels;

};

```

### 复古效果

> 复古效果（sepia）则是将红、绿、蓝三个像素，分别取这三个值的某种加权平均值，使得图像有一种古旧的效果。

```
sepia = function (pixels) {

    var d = pixels.data;

    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
      d[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
      d[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
    }

    return pixels;

};

```

### 红色蒙版效果

> 红色蒙版指的是，让图像呈现一种偏红的效果。算法是将红色通道设为红、绿、蓝三个值的平均值，而将绿色通道和蓝色通道都设为0。

```
red = function (pixels) {
	
    var d = pixels.data;

    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = (r+g+b)/3;        // 红色通道取平均值
      d[i + 1] = d[i + 2] = 0; // 绿色通道和蓝色通道都设为0
    }

    return pixels;

};

```

### 亮度效果

> 亮度效果（brightness）是指让图像变得更亮或更暗。算法将红色通道、绿色通道、蓝色通道，同时加上一个正值或负值。

```
brightness = function (pixels, delta) {

    var d = pixels.data;

    for (var i = 0; i < d.length; i += 4) {
          d[i] += delta;     // red
          d[i + 1] += delta; // green
          d[i + 2] += delta; // blue   
    }

	return pixels;

};

```

### 反转效果

> 反转效果（invert）是指图片呈现一种色彩颠倒的效果。算法为红、绿、蓝通道都取各自的相反值（255-原值）。

```
invert = function (pixels) {

	var d = pixels.data;

	for (var i = 0; i < d.length; i += 4) {
		d[i] = 255 - d[i];
		d[i+1] = 255 - d[i + 1];
		d[i+2] = 255 - d[i + 2];
	}

	return pixels;

};

```

------

## 一个简单的小栗子

> vue 动画小组件

```
<template>
  <canvas ref="bubble" :width="width" :height="height" :style="style"></canvas>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      y: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        width: 50,
        height: 80
      }
    },
    computed: {
      distance() {
        return Math.max(0, Math.min(this.y * this.ratio, this.maxDistance))
      },
      style() {
        return `width:${this.width / this.ratio}px;height:${this.height / this.ratio}px`
      }
    },
    created() {
      this.ratio = window.devicePixelRatio
      this.width *= this.ratio
      this.height *= this.ratio
      this.initRadius = 18 * this.ratio
      this.minHeadRadius = 12 * this.ratio
      this.minTailRadius = 5 * this.ratio
      this.initArrowRadius = 10 * this.ratio
      this.minArrowRadius = 6 * this.ratio
      this.arrowWidth = 3 * this.ratio
      this.maxDistance = 40 * this.ratio
      this.initCenterX = 25 * this.ratio
      this.initCenterY = 25 * this.ratio
      this.headCenter = {
        x: this.initCenterX,
        y: this.initCenterY
      }
    },
    mounted() {
      this._draw()
    },
    methods: {
      _draw() {
        const bubble = this.$refs.bubble
        let ctx = bubble.getContext('2d')
        ctx.clearRect(0, 0, bubble.width, bubble.height)

        this._drawBubble(ctx)

        this._drawArrow(ctx)
      },
      _drawBubble(ctx) {
        ctx.save()
        ctx.beginPath()

        const rate = this.distance / this.maxDistance
        const headRadius = this.initRadius - (this.initRadius - this.minHeadRadius) * rate

        this.headCenter.y = this.initCenterY - (this.initRadius - this.minHeadRadius) * rate

        // 画上半弧线
        ctx.arc(this.headCenter.x, this.headCenter.y, headRadius, 0, Math.PI, true)

        // 画左侧贝塞尔
        const tailRadius = this.initRadius - (this.initRadius - this.minTailRadius) * rate
        const tailCenter = {
          x: this.headCenter.x,
          y: this.headCenter.y + this.distance
        }

        const tailPointL = {
          x: tailCenter.x - tailRadius,
          y: tailCenter.y
        }
        const controlPointL = {
          x: tailPointL.x,
          y: tailPointL.y - this.distance / 2
        }

        ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y)

        // 画下半弧线
        ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true)

        // 画右侧贝塞尔
        const headPointR = {
          x: this.headCenter.x + headRadius,
          y: this.headCenter.y
        }
        const controlPointR = {
          x: tailCenter.x + tailRadius,
          y: headPointR.y + this.distance / 2
        }
        ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y)

        ctx.fillStyle = 'rgb(170,170,170)'
        ctx.fill()
        ctx.strokeStyle = 'rgb(153,153,153)'
        ctx.stroke()
        ctx.restore()
      },
      _drawArrow(ctx) {
        ctx.save()
        ctx.beginPath()

        const rate = this.distance / this.maxDistance
        const arrowRadius = this.initArrowRadius - (this.initArrowRadius - this.minArrowRadius) * rate

        // 画内圆
        ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius - (this.arrowWidth - rate), -Math.PI / 2, 0, true)

        // 画外圆
        ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false)

        ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius - this.arrowWidth / 2 + rate)
        ctx.lineTo(this.headCenter.x + this.arrowWidth * 2 - rate * 2, this.headCenter.y - arrowRadius + this.arrowWidth / 2)

        ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius + this.arrowWidth * 3 / 2 - rate)

        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.fill()
        ctx.strokeStyle = 'rgb(170,170,170)'
        ctx.stroke()
        ctx.restore()
      }
    },
    watch: {
      y() {
        this._draw()
      }
    }
  }
</script>

<style scoped>

</style>
```