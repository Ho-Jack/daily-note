# Vue项目中eslint配置须知

## 1.vue代码格式化涉及的相关插件和配置

- Eslint:是规范,高亮显示不符合规范的地方

- Prettier:是格式化工具

> 最佳实践是`Prettier`+`Eslint` , 其中`Eslint `主要是代码格式化规范配置,`Prettier`主要是代码格式化插件,在代码保存时使用`Eslint`的规范进行格式化; 

### 1.1.Vetur

> vue2项目使用的是vetur ,在vue3后使用的Volar

主要功能:

- 语法及语义高亮
- **格式化**(因此会影响,eslint的格式化)
- 调试，以及错误检查
- 全局组件的定义提示等等

### 1.2. Eslint

> 帮助您查找和修复JavaScript代码中的问题(代码格式规范校验+格式化)

1. 必须在项目安装eslint相关依赖

   > 只安装了eslint相关依赖,代码格式化需要通过命令来执行: `npx eslint . --fix`

2. 在`VS code` 添加 `Eslint`插件来更好支持代码规范校验和代码的格式化

   > 有了插件,可以配置在保存时进行格式化 

   ```json
   "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
    }
   ```

   

### 1.2. Prettier 

> Prettier主要是说VS Code中安装的[Prettier - Code formatter](https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Desbenp.prettier-vscode) 插件;
>
> 由于eslint的VS code插件的格式化并不能完美,需要使用prettier替换

- 作用: 专注于代码格式化的工具，美化代码;
- 不配置 `.prettierrc.js` 将使用通用(默认)配置

```json
// 常用配置相关解释
printWidth: 100, // 超过最大值换行
tabWidth: 4, // 缩进字节数
useTabs: false, // 缩进不使用tab，使用空格
semi: true, // 句尾添加分号
singleQuote: true, // 使用单引号代替双引号
proseWrap: "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
arrowParens: "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
disableLanguages: ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
endOfLine: "auto", // 结尾是 \n \r \n\r auto
eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
htmlWhitespaceSensitivity: "ignore",
ignorePath: ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
parser: "babylon", // 格式化的解析器，默认是babylon
requireConfig: false, // Require a 'prettierconfig' to format prettier
stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
trailingComma: "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
tslintIntegration: false // 不让prettier使用tslint的代码格式进行校验
```

可以看出prettier是可以使用eslint的规范进行格式化的

- `eslintIntegration` 是否使用eslint的代码格式进行校验



