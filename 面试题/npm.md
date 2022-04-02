运行`npm init`或`npx create- response -app`等命令构建JS项目

最常见的npm快捷方式：

- 安装  —  常规：`npm install`，简写：`npm i`。
- 测试  —  常规：`npm test`，简写：`npm t`。
- 帮助  —  常规：`npm --help`，简写：`npm -h`。
- 全局标志 —  常规：`--global`，简写：`-g`。
- 保存为开发依赖 - 常规： `-- save-dev`，简写：`-D`。
- npm init 默认值 - 常规：`npm init --yes` 或 `npm init --force`，简写：`npm init -y` 或 `npm init -f`（一路默认）

`--save`或`-S`来保存包，但现在这是个已经是默认值。要安装一个包而不保存它，可以使用 `——no-save`标志。




更新全局包

```
npm update -g 
```

使用淘宝镜像

```
npm install --registry=https://registry.npm.taobao.org   
```

npm get  获取node环境