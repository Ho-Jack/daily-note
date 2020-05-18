```js
    <input id="checkBox" type="checkbox" onclick="onClickHander(this)"></input>
    
       function onClickHander(obj){
            if(obj.checked){
                console.log("selected");
            }else{
                console.log("unselected");
            }
             
        }
```



JQuery

```
<input type="radio" name="bedStatus" id="allot" checked="checked" value="allot">Allot
<input type="radio" name="bedStatus" id="transfer" value="transfer">Transfer

  $('input[type=radio][name=bedStatus]').change(function() {
        if (this.value == 'allot') {
            alert("Allot Thai Gayo Bhai");
        }
        else if (this.value == 'transfer') {
            alert("Transfer Thai Gayo");
        }
    });

```

