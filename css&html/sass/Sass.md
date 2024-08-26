# SASS用法介绍

Posted on 2015-10-24 in [SASS](http://www.imbeta.cn/category/sass.html) by [yucongchen](http://www.imbeta.cn/)

> SASS是一种CSS预处理器提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。

### 安装SASS

SASS需要ruby支持，还需要gem，gem是ruby的包管理工具，ruby 1.9.1是自带gem的，如果是用1.8版本的话，需要另外安装。如果是windows的话，需要安装rubygems。 SASS一般会和Compass一起使用，这个也可以用gem来安装。 Ruby安装完之后，运行

```
gem install sass --pre
gem install compass --pre
```

就ok了。



### 使用

#### config.rb

这里我们需要一个ruby文件，这个是给compass用的。 内容如下：

```
# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the file automatically
#load File.join(dir, "..", "themes")

#Compass configuration
sass_path = dir
css_path = File.join(dir, "..", "css")
environment = :development # :production
output_style = :expanded # :compressed
```

Compass编译器将根据这个文件将SCSS样式文件编译为CSS样式表文件，并把编译好的css文件放在当前目录的上一层目录的css文件夹下。 这里需要注意：

```
environment = :development # :production
output_style = :expanded # :compressed
```

- :development 表示是开发环境。
- :expanded 表示编译为多行，并且生成注释。
- :production 表示是生产环境。
- :compressed 表示将样式表文件压缩为一行，并且删除SCSS样式文件中所有的注释和多余空格。

需要的时候可以灵活切换着两种方式。

------

我们建立一个style.scss的文件，这里要说明一下，SASS有两种文件后缀，一种是.sass，一种是.scss，据说sass的语法比较严格，而scss的语法更像css，所以一般推荐用scss后缀的比较多。 SASS和刚才的config.rb放在同一层目录，命令行运行`compass compile`即可。 如果你觉得麻烦，可以使用在线的SASS编辑器（http://sassmeister.com/），不过感觉生成预览有点慢，还是推荐自己装一个。 现在开始正式编写SASS.

------

#### 嵌套

在CSS文件中，经常会书写一些开头相同的选择器。例如：

```css
/* line 9, ../sass/style.scss */
#navbar {
  width: 80%;
  height: 23px;
}
/* line 13, ../sass/style.scss */
#navbar ul {
  list-style-type: none;
}
/* line 16, ../sass/style.scss */
/** 后代元素选择器 □_□（包含）（父级下的所有子、孙元素） **/
#navbar li {
  float: left;
}
/* line 19, ../sass/style.scss */
#navbar li a {
  color: red;
}
```

如果换成用SASS写：

```css
#navbar {
    width : 80%;
    height: 23px;

    ul {
        list-style-type: none;
    }
    li {
        float: left;

        a {
            color: red;
        }
    }
}
```

也可以属性嵌套，例如CSS如下:

```css
.item-border {
  border-style: solid;
  border-left-width: 1px;
  border-left-color: red;
  border-right-width: 2px;
  border-right-color: blue;
}
```

在SCSS中，可以写成：

```css
.item-border {
    border: {
        style: solid;

        left: {
            width: 1px;
            color: red;
        }
        right: {
            width: 2px;
            color: blue;
        }
    }
}
```

------

#### 引用父选择器 `&`

在SCSS文件中，可以利用&关键字来实现对父选择器的引用。 CSS：

```css
/* line 41, ../sass/style.scss */
.btn {
  color: #ccc;
}
/* line 43, ../sass/style.scss */
.btn:hover {
  color: red;
}
/* line 46, ../sass/style.scss */
.btn:visited {
  color: blue;
}
```

对应的SCSS:

```css
.btn {
    color: #ccc;
    &:hover {
        color: red;
    }
    &:visited {
        color: blue;
    }
}
```

------

#### 变量`$`

在SCSS文件中，可以声明整个样式表文件中使用的变量，变量以$开头。 CSS:

```css
/* line 53, ../sass/style.scss */
#navbar {
  border-bottom-color: #ccc;
  border-bottom-style: solid;
}

/* line 59, ../sass/style.scss */
a {
  color: #ccc;
}
/* line 61, ../sass/style.scss */
a:hover {
  border-bottom: 1px solid #ccc;
}
```

SCSS:

```css
$text-color: #ccc;
$border-style: solid;
#navbar {
    border-bottom: {
        color: $text-color;
        style: $border-style;
    }
}
a {
    color: $text-color;
    &:hover {
        border-bottom: 1px $border-style #ccc;
    }
}
```

------

#### 操作符和预定义函数

在SCSS中，我们还可以使用+,-,*,/,%等数学操作符。并且如果变量是带单位的，例如px，也可以正确的进行运算。 SCSS：

```css
#navbar {
    $navbar-width: 800px;
    $item: 5;
    $navbar-color: #aaa;

    width: $navbar-width;
    border-bottom: 2px solid $navbar-color;

    li {
        float: left;
        width: $navbar-width/$item - 10px;

        background-color: lighten($navbar-color, 20%);
        &:hover {
            background-color: lighten($navbar-color, 10%);
        }
    }
}
```

这里还用到一个叫`lighten`的东西，这个是SCSS提供的预定义函数。这个函数是用来修改颜色亮度的。 对应生成的css：

```css
/* line 66, ../sass/style.scss */
#navbar {
  width: 800px;
  border-bottom: 2px solid #aaa;
}
/* line 74, ../sass/style.scss */
#navbar li {
  float: left;
  width: 150px;
  background-color: #dddddd;
}
/* line 79, ../sass/style.scss */
#navbar li:hover {
  background-color: #c3c3c3;
}
```

------

#### 插入`#{}` 拼接变量到字符串

使用`#{}`符号可以将变量查到属性名，或者选择器中。 SCSS：

```css
$side: top;
$radius: 10px;
.round-#{$side} {
    border-#{$side}-radius: $radius;
    -moz-border-#{$side}-radius: $radius;
    -webkit-border-#{$side}-radiux: $radius;
}
```

对应的css：

```css
/* line 95, ../sass/style.scss */
.round-top {
  border-top-radius: 10px;
  -moz-border-top-radius: 10px;
  -webkit-border-top-radiux: 10px;
}
```

------

#### 继承

可以通过`@extend`来进行属性的继承。 SCSS:

```css
.base-nav {
    color: red;
}
.new-nav {
    @extend .base-nav;
    text-align: center;
}
```

CSS：

```css
/* line 85, ../sass/style.scss */
.base-nav, .new-nav {
  color: red;
}

/* line 88, ../sass/style.scss */
.new-nav {
  text-align: center;
}
```

------

#### Mixin

Mixin是SASS中非常强大的特性之一。定义mixin时，需要在前面加`@mixin`，使用时需要添加`@include`来引用该mixin。 SCSS:

```css
@mixin round-top {
    $side: top;
    $radius: 10px;

    border-#{$side}-radius: $radius;
    -moz-border-#{$side}-radius: $radius;
    -webkit-border-#{$side}-radiux: $radius;
}
#navbar li {
    @include round-top;
}
#footer {
    @include round-top;
}
```

对应的CSS:

```css
/* line 110, ../sass/style.scss */
#navbar li {
  border-top-radius: 10px;
  -moz-border-top-radius: 10px;
  -webkit-border-top-radiux: 10px;
}

/* line 113, ../sass/style.scss */
#footer {
  border-top-radius: 10px;
  -moz-border-top-radius: 10px;
  -webkit-border-top-radiux: 10px;
}
```

Mixin还有个强大的地方就是可以为它**传入参数**，并且还可以为参数设定默认值。 SCSS:

```css
@mixin round($side, $radius: 10px) {
    border-#{$side}-radius: $radius;
    -moz-border-#{$side}-radius: $radius;
    -webkit-border-#{$side}-radiux: $radius;
}

#navbar li {
    @include round(top);
}
#footer {
    @include round(top, 5px);
}
#sidebar {
    @include round(left, 8px);
}
```

CSS:

```css
/* line 126, ../sass/style.scss */
#navbar li {
  border-top-radius: 10px;
  -moz-border-top-radius: 10px;
  -webkit-border-top-radiux: 10px;
}

/* line 129, ../sass/style.scss */
#footer {
  border-top-radius: 5px;
  -moz-border-top-radius: 5px;
  -webkit-border-top-radiux: 5px;
}

/* line 132, ../sass/style.scss */
#sidebar {
  border-left-radius: 8px;
  -moz-border-left-radius: 8px;
  -webkit-border-left-radiux: 8px;
}
```

------

#### 导入

可以从外部文件导入mixin等。SASS中有一个命名惯例，被导入的样式文件文件名用下划线做前缀。导入的语法是`@import "xxx"`这里的xxx不需要带文件后缀，或者是下划线前缀。也就是说，“_tmp.scss"或者"_tmp.sass"导入的时候，就写`@import "tmp"`就可以了。

我们把之前的带参数的mixin放到"_round.scss"中，然后改调用的地方为：

```css
@import "round";
#navbar li {
    @include round(top);
}
#footer {
    @include round(top, 5px);
}
#sidebar {
    @include round(left, 8px);
}
```

------

#### 注释

`/* comment */`多行注释，会保留到编译后的文件，如果是压缩模式，则会被省略。 `// comment`单行注释，只会保留在SASS源文件中，编译后被省略。 `/*! comment */`重要注释，即使是压缩模式也会保留，通常用来声明版权信息。

如果要写中文的话，最好在SCSS文件头声明编码格式`@charset "utf-8";`。

------

### 控制语句

#### 使用`@if`来进行条件判断

```css
$navbar-width: 800px;
$item: 5;
p {
    @if $navbar-width/$item - 10px < 200 { border: 2px dotted; }
    @if $navbar-width/$item - 10px == 150 { border: 1px solid; }
}
```

对应的css:

```css
/* line 142, ../sass/style.scss */
p {
  border: 2px dotted;
  border: 1px solid;
}
```

也有`@else`

```css
$navbar-width: 800px;
$item: 5;
p {
    @if $navbar-width/$item - 10px == 200 { border: 2px dotted; }

    @else { border: 1px solid; }
}
```

#### 使用`@for`循环

SCSS：

```css
@for $i from 1 to 5 {
    .border-#{$i} {
        border: #{$i}px solid blue;
    }
}
```

CSS:

```css
/* line 149, ../sass/style.scss */
.border-1 {
  border: 1px solid blue;
}

/* line 149, ../sass/style.scss */
.border-2 {
  border: 2px solid blue;
}

/* line 149, ../sass/style.scss */
.border-3 {
  border: 3px solid blue;
}

/* line 149, ../sass/style.scss */
.border-4 {
  border: 4px solid blue;
}
```

#### 使用`@while`循环

SCSS:

```css
$i: 1;
@while $i < 5 {
    .border-#{$i} { border: #{$i}px solid blue; }
    $i: $i + 1;
}
```

CSS:

```css
/* line 156, ../sass/style.scss */
.border-1 {
  border: 1px solid blue;
}

/* line 156, ../sass/style.scss */
.border-2 {
  border: 2px solid blue;
}

/* line 156, ../sass/style.scss */
.border-3 {
  border: 3px solid blue;
}

/* line 156, ../sass/style.scss */
.border-4 {
  border: 4px solid blue;
}
```

#### 使用`@each`循环

SCSS：

```css
@each $item in add, update, remove, share {
    .icon-#{$item} {
        background-image: url("/image/#{$item}.jpg");
    }
}
```

CSS:

```css
/* line 161, ../sass/style.scss */
.icon-add {
  background-image: url("/image/add.jpg");
}

/* line 161, ../sass/style.scss */
.icon-update {
  background-image: url("/image/update.jpg");
}

/* line 161, ../sass/style.scss */
.icon-remove {
  background-image: url("/image/remove.jpg");
}

/* line 161, ../sass/style.scss */
.icon-share {
  background-image: url("/image/share.jpg");
}
```

------

### 自定义函数

使用`@function`来自定义函数。 SASS：

```css
@function double($n) {
    @return $n * 2;
}
#navbar {
    width: double(5px);
}
```

CSS:

```css
/* line 169, ../sass/style.scss */
#navbar {
  width: 10px;
}
```