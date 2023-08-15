 # Rollup 和 Webpack 和vite的区别

Rollup、Webpack 和 Vite 都是现代化的 JavaScript 模块打包工具，它们可以将多个 JavaScript 模块打包成一个单独的文件，以便在浏览器中使用。虽然它们的作用相似，但是它们之间有一些区别。

## Rollup

Rollup 是一个轻量级的打包工具，它专门用于打包 ES6 模块化的 JavaScript 应用程序。Rollup 的主要特点是支持 Tree-Shaking 技术，可以自动去除未使用的代码，并将应用程序打包为一个尽可能小的文件。Rollup 还提供了一些插件和配置选项，可以支持多种不同的模块格式和环境。

- 专注于构建 JavaScript 库
- 体积小,打包速度快(基于静态分析)
- 不支持 HMR,不支持按需加载

## Webpack

Webpack 是一个功能强大的打包工具，它可以处理多种类型的文件，包括 JavaScript、CSS、图片和字体等。Webpack 的主要特点是支持代码分割（Code Splitting）和按需加载（Lazy Loading）等技术，可以提高应用程序的性能和加载速度。Webpack 还提供了大量的插件和配置选项，可以支持多种不同的构建需求和场景。

- 用于构建复杂应用
- 配置复杂,打包速度较慢
- 支持 HMR、按需加载、代码分离等
- 适合大型应用

## Vite

2部分组成

- 一个开发服务器，它基于 [原生 ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 提供了 [丰富的内建功能](https://cn.vitejs.dev/guide/features.html)，如速度快到惊人的 [模块热更新（HMR）](https://cn.vitejs.dev/guide/features.html#hot-module-replacement)。
- 一套构建指令，它使用 [Rollup](https://rollupjs.org/) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

Vite 是一个基于 **Rollup** 和 Webpack 的现代化构建工具，它使用了一种称为“按需编译”的技术，可以更快地构建应用程序并提高开发人员的生产力。在按需编译中，只有在需要时才编译和打包代码，而不是一次性编译所有代码。这种技术可以提高构建速度，并减少文件大小。Vite 还支持热更新（Hot Module Replacement）和动态导入（Dynamic Import）等功能，可以提高开发效率。

- 构建应用的新方式,比 Webpack 更快
- 使用基于模块状态增量编译
- 内置 HMR、按需编译
- 不需要在本地安装包,直接从 CDN 引入



总的来说:

- Rollup 用于构建库,体积小、打包效率高
- Webpack 适用于构建复杂应用,配置复杂但功能强大
- Vite 专注于开发体验,比 Webpack 更快