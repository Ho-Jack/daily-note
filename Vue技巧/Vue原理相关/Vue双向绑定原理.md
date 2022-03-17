#### Vue2.0   Object.defineProperty() 数据劫持函数

> `Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
>
> **Object.defineProperty(obj, prop, descriptor)**
>
>   - obj             要定义属性的对象。
>
>   - prop           要定义或修改的属性的名称或 Symbol 。
>
>   - descriptor 要定义或修改的属性描述符。
>
>     - `get`
>
>       属性的 getter 函数，如果没有 getter，则为 `undefined`。（读取的时候obj.xx）**当访问该属性时，会调用此函数**。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的**返回值会被用作属性的值**。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。
>
>     - `set`
>
>       属性的 setter 函数，如果没有 setter，则为 `undefined`。**当属性值被修改时，会调用此函数。**该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。
>
> 

```js
let Person ={}
let temp=null
Object.defineProperty(Person,'name',{
 get:function(){
     return '我是'+temp
 },
 set: function(val){
     temp=val
    }
})
Person.name="AA"
console.log(Person.naem) //我是AA
```

 以上就是，数据劫持



**ES5：Object.defineProperty**

```js
<body>
    姓名：<span id="spanName"></span>
    <br>
    <input type="text" id="inpName">

    <!-- IMPORT JS -->
    <script>
        let obj = {
            name: ''
        };
        let newObj = {
            ...obj
        };
        Object.defineProperty(obj, 'name', {
            get() {
                return newObj.name;
            },
            set(val) {
                newObj.name = val;
                observe();
            }
        });

        function observe() {
            spanName.innerHTML = newObj.name;
        }
        inpName.oninput = function () {
            obj.name = this.value;
        };
    </script>
</body>
```





#### Vue3.0   Proxy

 Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问
​    都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
​    Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```html
<body>
    姓名：<span id="spanName"></span>
    <br>
    <input type="text" id="inpName">

    <!-- IMPORT JS -->
    <script>
        let obj = {
            name: ''
        };
        obj = new Proxy(obj, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {
                target[prop] = value;
                observe();
            }
        });

        function observe() {
            spanName.innerHTML = obj.name;
        }
        inpName.oninput = function () {
            obj.name = this.value;
        };
    </script>
</body>
```

