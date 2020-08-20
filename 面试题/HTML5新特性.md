### HTML5新特性

#### 1 语义标签

| 标签                  | 描述                                                 |
| :-------------------- | :--------------------------------------------------- |
| <hrader></header>     | 定义了文档的头部区域                                 |
| <footer></footer>     | 定义了文档的尾部区域                                 |
| <nav></nav>           | 定义文档的导航    navigation 美 /ˌnævɪˈɡeɪʃn/        |
| <section></section>   | 定义文档中的节（section、区段）    美 /ˈsekʃn/  章节 |
| <article></article>   | 定义页面独立的内容区域                               |
| <aside></aside>       | 定义页面的侧边栏内容                                 |
| <detailes></detailes> | 用于描述文档或文档某个部分的细节                     |
| <summary></summary>   | 标签包含 details 元素的标题     美 /ˈsʌməri/   总结  |
| <dialog></dialog>     | 定义对话框，比如提示框                               |



#### 2 表单新增类型

　HTML5 拥有多个新的表单 Input 输入类型。这些新特性提供了更好的输入控制和验证。

| 输入类型       | 描述                         |
| -------------- | ---------------------------- |
| color          | 主要用于选取颜色             |
| date           | 从一个日期选择器选择一个日期 |
| datetime       | 选择一个日期（UTC 时间）     |
| datetime-local | 选择一个日期和时间 (无时区)  |
| email          | 包含 e-mail 地址的输入域     |
| month          | 选择一个月份                 |
| number         | 数值的输入域                 |
| range          | 一定范围内数字值的输入域     |
| search         | 用于搜索域                   |
| tel            | 定义输入电话号码字段         |
| time           | 选择一个时间                 |
| url            | URL 地址的输入域             |
| week           | 选择周和年                   |

HTML5 新增的表单属性

- placehoder 属性，简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。
- required 属性，是一个 boolean 属性。要求填写的输入域不能为空
- pattern 属性，描述了一个正则表达式用于验证<input> 元素的值。
- min 和 max 属性，设置元素最小值与最大值。
- step 属性，为输入域规定合法的数字间隔。
- height 和 width 属性，用于 image 类型的 <input> 标签的图像高度和宽度。
- autofocus 属性，是一个 boolean 属性。规定在页面加载时，域自动地获得焦点。
- multiple 属性 ，是一个 boolean 属性。规定<input> 元素中可选择多个值。





#### 3 视频和音频

```
audio
video
```



- HTML5 提供了播放音频文件的标准，即使用 <audio> 元素

  ```html
  <audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  您的浏览器不支持 audio 元素。
  </audio>
  ```

　在<audio> 与 </audio> 之间你需要插入浏览器不支持的<audio>元素的提示文本 。

　目前, <audio>元素支持三种音频格式文件: MP3, Wav, 和 Ogg

```
　<audio> 元素允许使用多个 <source> 元素. <source> 元素可以链接不同的音频文件，浏览器将使用第一个支持的音频文件
```





- HTML5 规定了一种通过 video 元素来包含视频的标准方法。

  ```html
  <video width="320" height="240" controls>
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
      您的浏览器不支持Video标签。
  </video>
  
  ```



  control 提供了 播放、暂停和音量控件来控制视频。也可以使用dom操作来控制视频的播放暂停，如 play() 和 pause() 方法。

  width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。



  与 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。



  video 元素支持多个source 元素. 元素可以链接不同的视频文件。



  浏览器将使用第一个可识别的格式（ MP4, WebM, 和 Ogg）



#### 4 canvas绘图

- 美 /ˈkænvəs/ 
- 标签只是图形容器，必须使用脚本来绘制图形。





#### 5 SVG绘图

#### 6 地理定位

#### 7 拖放API

#### 8 Web Worker

#### 9 Web Storage

#### 10 WebSocket

