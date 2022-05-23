---
title: 移动端mate头设置
date: 2019-08-25 00:00:00
tags: [开发笔记, 移动端]
---



#####   移动端mate头设置

```html
<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,
        minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

| 属性值               | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| width=device-width   | 应用程序的宽度和屏幕的宽度是一样的                           |
| height=device-height | 应用程序的高度和屏幕的高是一样的                             |
| initial-scale=1.0    | 应用程序启动时候的缩放尺度（1.0表示不缩放）                  |
| minimum-scale=1.0    | 用户可以缩放到的最小尺度（1.0表示不缩放）                    |
| maximum-scale=1.0    | 用户可以放大到的最大尺度（1.0表示不缩放）                    |
| user-scalable=no     | 用户是否可以通过他的手势来缩放整个应用程序，使应用程序的尺度发生一个改变（yes/no） |



经常使用的meta

```html
<meta name='viewport' content='width=device-width,initial-scale=1,user-scale=no' />
```

