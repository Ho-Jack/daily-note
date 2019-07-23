封装函数

```js
	function openDialog(option) {
    option.btns = option.btns || [];
    var footer = document.createElement("div");
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    footer.className = "dialog_footer";
    option.btns.forEach(function (item, index) {
        option['btn' + index] = option['btn' + index] || new Function();
        var btn = document.createElement("button");
        btn.innerHTML = item;
        btn.addEventListener("click", function () {
            div.style.display = "none";
            option["btn" + index];
        });
        footer.append(btn);
    });
    h2.innerHTML = option.title || "提示";
    div.className = "dialog";
    div.append(h2);
    div.append(option.content || "内容");
    div.append(footer);
    document.body.append(div);
}
```

使用

```js
 function handlerStart(params) {
            openDialog({
                content: "确定要启用当前账户账号？",
                btns: ["取消", "确认"],
                btn0: function () {
                    alert("点击了第1个按钮", );
                },
                btn1: function () {
                    alert("点击了第2个按钮");
                },
            })
        }
```

