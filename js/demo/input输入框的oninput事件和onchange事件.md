---
title: input输入框的oninput事件和onchange事件
date: 2020-08-24 21:35:00
tags: [JS, ES6, 开发笔记]
---

###  input输入框的oninput事件和onchange事件

**onchange**——input输入过程中不会触发，失去焦点时才会触发；
​    兼容性：所有浏览器都支持，可以用于<input>, <select>, 和 <textarea>元素。

**\*oninput***——在用户输入时触发，它是在元素值发生变化时立即触发；实时触发
​    缺陷：从脚本中修改值不会触发事件。从浏览器下拉提示框里选取值时不会触发。IE9 以下不支持，所以IE9以下可用onpropertychange 事件代替。