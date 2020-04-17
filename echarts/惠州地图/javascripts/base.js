// 设置font-size
function initFontSize() {
    var docEl = document.documentElement;
    var screenWidth = docEl.clientWidth || window.screen.width || 360;
    // 3840为设计图宽度
    window.rate = screenWidth / 3840;
    docEl.style.fontSize = (100 * screenWidth / 3840) + 'px';
}

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
            option["btn" + index]();
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