```js
   new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['*.png']
      }
    ])
  ],
```



`.*` 是所有类似 .svn 或者 .gitkeep 的文件

`*.png`是所以 缩略名为png的文件  