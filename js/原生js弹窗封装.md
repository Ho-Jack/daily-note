封装函数

```
document.body.appendChild(node);  
```

```js
	function openDialog(option) {
    option.btns = option.btns || [];
    var footer = document.createElement("div");
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    footer.className = "dialog_footer";
    option.btns.forEach(function (item, index) {
       
        option['btn' + index] = option['btn' + index] || new Function();
        //创建按钮元素
        var btn = document.createElement("button");
        btn.innerHTML = item;
        btn.addEventListener("click", function () {
            div.style.display = "none";
             //对在option中btn0等命名的对象实例成函数
            option["btn" + index]();
        });
        //将按钮元素加入到footer的div中
        footer.append(btn);
    });
    h2.innerHTML = option.title || "提示";
    div.className = "dialog";
    div.append(h2);
    div.append(option.content || "内容");
        //这个footer在遍历里面完成了按钮和函数的加载
    div.append(footer);
        //将整个对话框加入的body元素中
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

