---
title: JS实时时钟
date: 2020-06-22 11:06:00
tags: [JS, 开发实例, 开发笔记]
---

## JS实时时钟

> 一开始以为 时钟是用 setInterval (每隔一段时间，执行一次）
> 看别人的例子，setTimeout也可以实现这样的效果

```html
<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Test</title>
</head>

<body onLoad="getnow()">
    <span id="nowspan" />
</body>

</html>
<script type="text/javascript">
    function getnow() {
        //1、获得当前时间，格式化时间
        var now = new Date();
        var year = now.getFullYear();
        //getMonth()从 Date 对象返回月份 (0 ~ 11)
        var month = now.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        //getDate()从 Date 对象返回一个月中的某一天 (1 ~ 31)。
        var date = now.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        //getHours()返回 Date 对象的小时 (0 ~ 23)。
        var hour = now.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        // getMinutes()返回 Date 对象的分钟 (0 ~ 59)。
        var minute = now.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        //getSeconds()返回 Date 对象的秒数 (0 ~ 59)。
        var second = now.getSeconds();
        if (second < 10) {
            second = "0" + second;
        }
        var nowstr = year + "年" + month + "月" + date + "日  " + hour + ":" + minute + ":" + second;
        //alert(nowstr);
        //2、显示时间 html
        //获得标签对象
        var nowspan = document.getElementById("nowspan");
        nowspan.innerHTML = nowstr;
        //3、使时间动起来
        //1 秒=1000 毫秒
        //这个定时器是关键，自调用
        setTimeout("getnow()", 1000);
    }
</script>
```

  总结： 

- 延时调用和定时调用的区别，***\*定时调用会执行多次，而延时调用只会执行一次\****

- 延时调用和定时调用实际上是可以互相代替的，在开发中可以根据自己需要去选择