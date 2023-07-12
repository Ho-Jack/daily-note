module.exports = {
  indent: 10,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'consistent',
  // 一行的字符数，如果超过会进行换行，默认为80
  printWidth: 150,
  // 一个tab代表几个空格数，默认为80
  tabWidth: 2,
  // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  useTabs: false,
  // 字符串是否使用单引号，默认为false，使用双引号
  singleQuote: true,
  // 行位是否使用分号，默认为true
  semi: false,

  // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,
  //不让prettier使用eslint的代码格式进行校验
  // eslintIntegration: true
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'auto',
  // 行尾逗号,默认none,可选 none|es5|all
  // es5 包括es5中的数组、对象
  // all 包括函数对象等所有可选
  TrailingComma: 'all',

  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  jsxBracketSameLine: true,
  //将>单独一行还是在最末尾
  bracketSameLine: true,
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  //不让prettier使用stylelint的代码格式进行校验
  stylelintIntegration: false,
}
