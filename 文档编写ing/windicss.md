[Shymean](https://www.shymean.com/index)[v0.9.0](https://www.shymean.com/version)

[分类](https://www.shymean.com/tags)[归档](https://www.shymean.com/archive)[项目](https://www.shymean.com/demo)[书架](https://www.shymean.com/book)[关于](https://www.shymean.com/about)



侧边栏

# windicss使用记录

发布于 2023-06-25 14:07:54| 分类于 [前端](https://www.shymean.com/archive/search?type=前端)/[CSS](https://www.shymean.com/archive/search?type=前端_CSS)

> 根据windicss的[公告](https://windicss.org/posts/sunsetting.html)，将不再维护新功能，建议迁移到[unocss](https://github.com/unocss/unocss)，可以阅读本文最后一个章节，查看低成本迁移过程。

在去年年初写了一篇[《关于TailwindCSS的一些思考》](https://www.shymean.com/article/关于TailwindCSS的一些思考)，记录了一下我对于原子类框架的看法，却一直没有机会在项目中使用。

最近终于有时间来尝试一下原子类了。经过一段时间深度使用windicss，回头记录一下关于我对原子类框架新的看法（是如何从跃跃欲试到爱不释手的

本文也可以用于windicss入门使用的帮助，记录了大部分刚开始使用原子类框架的前端开发者可能会遇见的问题。

参考

- [重新构想原子化 CSS](https://antfu.me/posts/reimagine-atomic-css-zh) 这篇文章，百读不厌

## 基础使用[](https://www.shymean.com/article/windicss使用记录#基础使用)

目前主流的原子类框架TailWindcss、windicss、unocss等，大部分类名规则是一致的，只是细节上有些差别。

因此，学习windicss的时候，可以通读一遍[示例文档](https://windicss.org/utilities/general/colors.html)，有个初步的印象。

由于windicss 文档不太全，有大致印象后，可以再去看看[tailwindcss](https://tailwindcss.com/docs/)的文档上面看

下面整理一些比较常用的类

### 布局[](https://www.shymean.com/article/windicss使用记录#布局)

- flex布局` flex`、`flex-col`、`items-center`、`justify-center`
- 定位布局`relative`、`absolute`、`fixed`、`left-10px`、`top-20px`、`right-30px`、`bottom-40px`
- 网格布局`grid`、`grid-cols-[100px,100px,100px]`、`gap-30px`
- 元素类型 `block`、`inline-block`、`inline`

### 尺寸[](https://www.shymean.com/article/windicss使用记录#尺寸)

- 宽度`w-100px`、`w-[calc(100vw_-_20px)]`
- 高度`h-100px`、`h-[calc(100vw_-_20px)]`
- 内边距
  - `p-10px`上下左右
  - top `pt-10px`、bottom `pb-10px`、left `pl-10px`、right `pr-10px`，各个方位
  - 水平 `px-10px`、竖直 `py-10px`
- 外边距，命名与内边距基本一致，把p `padding`换成 m `margin`即可，如`mt-10px`
- 边框 ，命名与内边距基本一致，换成`border`即可，如`border-t-1px`、`border-t-[#ff0000]`
- 圆角，`rounded-10px`，还有更简单的指定某个方位的圆角，命名与内边距基本一致，如`rounded-t-10px`

### 颜色[](https://www.shymean.com/article/windicss使用记录#颜色)

- 使用语义化颜色，如`xxx-red-100`、`xxx-dark-900`，其中xxx可以是字体颜色`text`、背景颜色`bg`、边框颜色`border`等

- windicss内置了一套语义化颜色名称，可以在主题配置中自定义颜色

  js

  ```
  export default defineConfig({
   theme: {
      extend: {
        colors: {
        		primary: '#00fff00',
            red: {
              100: '#123123',
              200: '#123123',
              600: '#123123',
            },
        }
      }
    }
  })
  ```

- 同时也支持颜色字面量，如`text-[#ff0000]`

### 字体[](https://www.shymean.com/article/windicss使用记录#字体)

- 字号`text-16px`、
- 行号`leading-32px`
- 颜色`text-red-100`、`text-[#ff0000]`，参考上面的颜色章节
- 换行`whitespace-nowrap`
- 溢出`line-clamp-2`，需要配置插件`line-clamp`



```
// windicss.config.ts
import LineClamp from 'windicss/plugin/line-clamp'

export default defineConfig({
	plugins: [
    LineClamp,
  ]
})
```

### 背景[](https://www.shymean.com/article/windicss使用记录#背景)

- 背景颜色`bg-red-100`、`bg-[#ff0000]`，参考上面的颜色章节
- 透明度`bg-opacity-50`
- 自定义渐变使用起来还是有点麻烦，我感觉渐变用行内样式更合适一点
- 阴影同上，感觉也更适合用行内样式来实现

### 伪类[](https://www.shymean.com/article/windicss使用记录#伪类)

想实现诸如`not:last-child`之类的选择器，就可以用[文档 ](https://cn.windicss.org/utilities/general/variants.html了)里面提到的

- `first`、`last`，`not-first`、`not-last`常用于定制列表元素首个或末尾元素的样式，比如边距`last:mb-0px`
- `before`，`after`伪元素，`before:w-100px before:h-100px before:bg-red-100`
- `sm`、`md`、`lg`、`xl`、媒介查询，可以方便实现断点`sm:w-100px md:w-200px`
- `dark`、`light`，实现暗夜模式的时候非常有用

### important[](https://www.shymean.com/article/windicss使用记录#important)

所有样式前面加感叹号就可以加上`!important`，如`!mt-10px`

### 暗黑模式[](https://www.shymean.com/article/windicss使用记录#暗黑模式)

使用windicss实现暗黑模式非常简单，只需要在配置文件中配置`darkMode`为`class`，然后在根节点添加对应的类名`dark`即可。

对于原子类而言，添加`dark:`前缀即可，比如`dark:text-white-300`表示在黑夜模式下字体颜色为`text-white-300`

### 嵌套选择器[](https://www.shymean.com/article/windicss使用记录#嵌套选择器)

在以类为主的选择器中，有一种比较常见的实用场景，那就是通过父类来控制子类的样式和行为，一个比较经典的场景是：比如鼠标移动到父元素，子元素执行transform等动画

或者是父类设置了disable，后代子节点的样式会发生变化，类似于`dark`的功能。

查看了文档，貌似并没有类似父元素控制子元素样式的功能`disable:text-grey-500 disable:bg-grey-100`

最后，在这个[issue](https://github.com/windicss/windicss/issues/494)，看到了自定义伪类的大致实现

ts

```
import plugin from 'windicss/plugin'

export const ChildCombinator = plugin(({ addVariant }) => {
  addVariant('child', ({ modifySelectors }) => {
    return modifySelectors(({ className }) => {
      console.log(className)
      return `.parent .${className}`
    })
  })
})
```

然后在`defineConfig`的plugin中引入这个插件，就可以使用嵌套选择器了

html

```
  <div class="w-500px">
    <div class="parent">
      <div>
        <div class="child:w-100px child:h-100px child:bg-red-100"></div>
      </div>
    </div>
    <div>
      <div>
        <div class="child:w-100px child:h-100px child:bg-red-100"></div>
      </div>
    </div>
  </div>
```

比如上面的代码，就只有第一个`child:w-100px child:h-100px child:bg-red-100`的样式会生效

## 进阶用法[](https://www.shymean.com/article/windicss使用记录#进阶用法)

### 字面量Or语义化[](https://www.shymean.com/article/windicss使用记录#字面量or语义化)

TailwindCSS认为，所有不使用其变量的值都为魔法值，因此大部分值最好都在配置文件中先定义好。

但实际场景是，设计师如果没有提前定义好各种值，而是随心所欲，这个配置文件就会越来越长，越来越难维护

如果想要使用配置定义之外的值，比如某个宽度宽度为`132px`的元素，可以写成`w-132px`，不过这种写法会导致后续维护性变差，需要权衡一下

参考[文档](https://windicss.org/features/analyzer.html)，可以通过`windicss-analysis`这个工具来分析整个项目中的原子类，检查类名是否符合设计系统。

编写原子类很简单，但要编写容易维护的原子类并不是一件很容易的事情，这需要前端和设计在预设的设计系统中共同合作才行。

### 自定义计算规则[](https://www.shymean.com/article/windicss使用记录#自定义计算规则)

比如`p-{float}`，默认计算为



```
p-{float} -> padding: {float/4}rem;
```

期望有自己的计算规则，比如在pc端直接解析为px



```
p-{float} -> padding: {float}px;
```

在移动端解析为更特殊的rem



```
p-{float} -> padding: {calc(float)}rem;
```

windicss本身并没有提供这个功能，但post插件貌似可以通过一些途径解决这个问题

比如px2rem等插件，可以将`text-16px`自动转换成

css

```
.text-16px {
    font-size: 0.16rem;
}
```

因此，同样的`text-16px`的代码，在移动就可以按照rem来计算最终的数值，在PC端还是按照原样px计算。

按照原则，使用原子类就应该尽量避免再手写css代码，既然没有css代码，就完全不需要预处理器了。

但实际业务中，还是存在原子类无法覆盖的情况，如何兼容两个工具，也需要斟酌一下。

### 减少js中的css字符串[](https://www.shymean.com/article/windicss使用记录#减少js中的css字符串)

原子类移除了源代码中的css文件，但会增加SPA项目中js文件的大小，因为所有的class都按照字符串的形式打包进了js文件。

也许这并不是一个很重要的问题，但如果愿意优化，下面是一些思路。

第一个优化点是减少class的字符是：class太长了，一堆一堆的，可以考虑属性化 attibute，参考 https://windicss.org/posts/attributify.html



```
<div font="italic leading-3" text="20px"></div>
```

使用attibutify需要对原子类有进一步的理解和归类，以及一些学习成本，如果是多人项目，需要考虑团队协作。

第二是优化点事减少class的数量：比如利用css的继承属性，将一些可继承的样式对应的原子类放在公共的父节点上面

此外，还可以通过`@apply`等指令创建公共的类名，合并大段可复用的样式。

## 小结[](https://www.shymean.com/article/windicss使用记录#小结)

使用原子类最大的优点是不用在html和css代码段之间来回切换，看见html和行类的原子类名，就能大概知道这个元素对应的样式。html删除了，样式就删除了，也不会存在css冗余的情况。

原子类不存在样式重复和覆盖的情况，也就不再需要scoped css 或者css module等技术。这在编写jsx文件的时候非常有用，这才是真正的HTML、CSS、JS三合一！

此外，也不用再为了复用UI来强行封装逻辑差异比较大的组件，组件的复用，复制原子类和html代码是更合理的做法。

当然，原子类最大的问题也很明显，就是上面提到的字面量可维护性很差的问题，试想一下，如果项目中充斥了一个基础主题色`text-[#ff0000]`，如果设计师想把这个色值调整成`text-[#00ff00]`，在没有预先设定语义名字的情况下，这种更改就要修改很多个文件。换言之，使用原子类需要对设计团队和开发团队需要提前规划和沟通。

接下来，我会在项目中进一步推进和深度使用windicss，有遇见其他的问题会继续补充。

## 迁移至unocss[](https://www.shymean.com/article/windicss使用记录#迁移至unocss)

> 更新于2024-02-01

不幸的是：根据windicss的[公告](https://windicss.org/posts/sunsetting.html)，将不再维护新功能。

目前不同的原子类框架，在语法上还是有一些差异的，在已有的项目中切换框架，**回归测试成本会比较高**，一番调研之后，决定切换到[unocss](https://github.com/unocss/unocss)。

`unocss`并没有提供核心的原子类，而是通过各种`presets`来实现

首先安装`unocss`，切换vite插件

diff

```
// vite.config.ts
- import WindiCSS from 'vite-plugin-windicss'
+ import Unocss from 'unocss/vite'


plugins: [
-  WindiCSS()
+  Unocss()
]
```

修改入口的虚拟文件

diff

```
// main.ts
- import 'virtual:windi.css'
+ import 'uno.css'
```

然后创建`uno.config.ts`配置文件，替换原本的`windi.config.ts`配置文件

ts

```
import { defineConfig } from 'unocss'
import presetWind from '@unocss/preset-wind'
import transformerVariantGroup from '@unocss/transformer-variant-group' // 用于兼容windicss的`hover:xxx hover:xxx`分组语法

export default defineConfig({
  presets: [presetWind()],
  transformers: [transformerVariantGroup()],
})
```

如果`windi.config.ts`中还有定制的配置或者插件，需要查看对应的文档在unocss处进行迁移和兼容，遇到了再继续补充

[#CSS](https://www.shymean.com/archive/search?tag=CSS)[#Windicss](https://www.shymean.com/archive/search?tag=Windicss)

### 你要请我喝一杯奶茶？

版权声明：自由转载-非商用-保持署名和原文链接。

本站文章均为本人原创，参考文章我都会在文中进行声明，也请您转载时附上署名。

![img](https://img.shymean.com/oPic/780x778/8511ba857ab2a8fd03fe9cab33e4bb56.webp)





提交

来发评论吧~

Powered By [Valine](https://valine.js.org/)
v1.5.1

目录

Table of Contents for current page[基础使用](https://www.shymean.com/article/windicss使用记录#基础使用)[布局](https://www.shymean.com/article/windicss使用记录#布局)[尺寸](https://www.shymean.com/article/windicss使用记录#尺寸)[颜色](https://www.shymean.com/article/windicss使用记录#颜色)[字体](https://www.shymean.com/article/windicss使用记录#字体)[背景](https://www.shymean.com/article/windicss使用记录#背景)[伪类](https://www.shymean.com/article/windicss使用记录#伪类)[important](https://www.shymean.com/article/windicss使用记录#important)[暗黑模式](https://www.shymean.com/article/windicss使用记录#暗黑模式)[嵌套选择器](https://www.shymean.com/article/windicss使用记录#嵌套选择器)[进阶用法](https://www.shymean.com/article/windicss使用记录#进阶用法)[字面量Or语义化](https://www.shymean.com/article/windicss使用记录#字面量or语义化)[自定义计算规则](https://www.shymean.com/article/windicss使用记录#自定义计算规则)[减少js中的css字符串](https://www.shymean.com/article/windicss使用记录#减少js中的css字符串)[小结](https://www.shymean.com/article/windicss使用记录#小结)[迁移至unocss](https://www.shymean.com/article/windicss使用记录#迁移至unocss)

世人的悲欢并不相通，我只是觉得他们吵闹。

Copyright © Shymean 2016 - 2024 [蜀ICP备2023029820号](https://beian.miit.gov.cn/)