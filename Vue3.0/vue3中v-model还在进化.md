# vue3中v-model还在进化

> 如果不想看那么多内容,直接跳过看总结

你知道`v-model`除了用在表单控件还能用在自定义组件上吗?

你知道自定义组件的双向绑定`v-model`怎么用吗?

你知道vue3中的`v-model`和vue2的`v-model`在使用上有什么不一样吗?

你知道为什么vue3中Element-Plus的`dialog`组件使用`v-model`/`modelValue`替代`visible`这种props,来控制组件吗?

你知道自定义组件的`v-model`在vue3.4后新增了`defineModel`简化了操作吗?



偷偷吐槽一下,说`v-model`在进化,其实意思就是说vue3还在不断完善中,时不时出现一些新的api,可能颠覆以前的写法,正如3.4后出现的`defineModel`这一写法,在`setup`语法糖下,确实能简化很多操作,实现了真正意义上的双向绑定,在子组件中不需要写`defineProps`和`defineEmits`就能直接修改父组件的值,实现了双向绑定



本文先回顾一下vue2中的`v-model`,这样有助于理解`v-model`的进化过程.如果只想想看Vue3中v-model的相关内容,可以直接跳到下面

## 1. vue2的`v-model`

> 在表单控件或者自定义组件上创建双向绑定

### 1.1.使用范围：

- 表单元素/控件: `<input>` `<select>` `<textarea>`
- 自定义组件

### 1.2.修饰符：

- [`.lazy`](https://v2.cn.vuejs.org/v2/guide/forms.html#lazy) 取代 `input` 监听 `change` 事件
- [`.number`](https://v2.cn.vuejs.org/v2/guide/forms.html#number) 输入字符串转为有效的数字
- [`.trim`](https://v2.cn.vuejs.org/v2/guide/forms.html#trim) 输入首尾空格过滤



### 1.3.表单元素的v-model

> 在表单元素上使用`v-model`是真正意义上的**双向绑定**,能直接读取和修改,v-model绑定的响应值

v-model在表单元素上使用,其实是一种语法糖,v-model只是一种简写,最终都会被编译成原始写法

```vue
<input v-mdoel="testValue">
```

最终编译为:

> 理解表单元素是怎么通过v-model实现双向绑定的即可

```vue
<input type="text" :value="testValue" @input="testValue = $event.target.value">
 <!--$event  访问原始的 DOM 事件 -->
```

1. 将`目标值`(如上述testValue)与`input`元素的`value`绑定
2. 通过监听表单元素的`input`事件,将`输入值`($event.target.value)与`目标值`进行绑定
3. 最终实现双向绑定



#### `v-model`在内部为不同的输入元素使用不同的属性并抛出不同的事件：

-   `text`和`textarea`元素使用value属性和input事件
-   `checkbox`和`radio`使用checked属性和change事件
-   `select`使用value和change事件



### 1.4.自定义组件的`v-model`

效果:  在子组件中监听和修改父组件传过来的响应式数据,也就是,子组件对父组件的数据进行双向绑定

###### 原理:  父子组件之间的通讯

- 父组件向子组件通讯:向子组件传递`props`
- 子组件向父组件通讯:子组件通过`emit`修改父组件的`props `

###### 实现步骤:

1. 父组件中使用`v-mdoel`将响应值传入子组件中,由子组件读取并修改
2. 子组件中使用`model`选项,包含`props`值和`event`值
   - `model`选项的`props`值:父组件传过来的响应式值,可随便命名,但必须和`props`声明的值一致
   - `model`选项的`event`值:声明`$emit`事件名称,用于子组件修改父组件值,进行回写
3. 子组件中读取父组件的值并通过`$emit`,将最新值回写至父组件



###### 完整自定义组件v-model使用例子:

1.父组件中使用`v-mdoel`将响应值传入子组件中,由子组件读取并回写

```vue
<template>
  <div>
   <myInput v-model="message"></myInput>
    <p>{{message}}</p>
  </div>
</template>

<script>
import myInput from './components/demo'
export default {
  data () {
    return {
      message:''
    };
  },
  components: {myInput},
  methods: {}
}
</script>
```



2.子组件中,有个`model`选项来指定父组件传过来的`props值`和`$emit触发事件`

3.子组件中将表单控件的`value`与父组件的`props`值进行绑定

4.子组件中在表单控件`监听触发事件`,如`input`事件,通过`$emit("model选项中声明的event值", val)`将控件值回写到父组件

```vue
<template>
  <div>
    <input
      type="text"
      :value="parentData"
      @input="updateVal($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  model: {
    //父组件传过来的响应式值,可随便命名,但必须和props一致
    prop: "parentData",
    // 随便命名事件，对应下面$emit即可
    event: "changeXXX",
  },
  props: {
    parentData: {
      type: String,
      default: "tom",
    },
  },
  methods: {
    updateVal(val) {
      this.$emit("changeXXX", val);
    },
  },
};
</script>

```



### 1.5.进阶`.sync`实现双向绑定,替代自定义组件的`v-model`

> `.sync`修饰符,在自定义组件上,能实现和`v-model`一样的双向绑定的功能,因此在vue3中对v-mdoel做了修改,优化了v-model在自定义组件上的使用方式

###### 修饰符`.sync` 对props进行双向绑定

1. 父组件中对子组件标签上的props添加`.sync`修饰符
2. 在子组件中读取`props` 并通过`$emit('update:props的名称',最新值)` 修改父组件的值

相比v-model的好处:

1. 减少了`model`项声明
2. `.sync` 可以绑定多个`props`而`v-model`只能绑定父组件中的一个响应值



### 1.6总结: v-model在自定义组件上比较混乱,vue3会优化

在vue2中子组件中对父组件的值进行双向绑定,都需要借助`$emit`显示修改父组件中的值,因为vue是单向数据流的,如果直接修改父组件的值,是一种黑盒操作,你根本不知道在哪修改了父组件的值.所谓并不是意义上的双向绑定,真正的双向绑定,直接修改父组件的值,回带来维护性的问题;

###### v-model在自定义组件上的使用比较混乱,vue2 中的 v-model 和 .sync 功能重叠

引入了 model 组件选项，允许开发者任意指定 v-model 的 props 和 event 。解决了 vue2.0 中的 v-model 和 value 的强绑定关系。但是还是存在一个问题，就是多个数据双向绑定时，还是需要借助 .sync 修饰符。



## 2. vue3中的`v-model`



### 2.1.vue3中v-model和vue2的区别:

- 表单元素的`v-model`基本没变化
- 自定义组件的`v-model`变化较大:
  1. 删除`model`选项,不再使用 props 和 event ,声明v-model传到子组件的props和`$emit`事件名称
  2. 固定使用`modelValue`为父组件的props,使用`update:modelValue `这个emit来修改父组件的值
  3. vue3.4后新增`defineModel`简化了,自定义组件`v-model`双向绑定的操作
  4. 自定义组件支持多个v-model

### 2.2.使用范围：

- 表单元素/控件: `<input>` `<select>` `<textarea>`
- 自定义组件

### 2.3.修饰符：

- [`.lazy`](https://cn.vuejs.org/guide/essentials/forms.html#lazy) - 监听 `change` 事件而不是 `input`
- [`.number`](https://cn.vuejs.org/guide/essentials/forms.html#number) - 将输入的合法字符串转为数字
- [`.trim`](https://cn.vuejs.org/guide/essentials/forms.html#trim) - 移除输入内容两端空格

### 2.4.表单元素的v-model 和vue2基本一致

`v-model`指令帮忙我们完成了,手动连接值绑定和更改事件监听器

```vue
<input v-model="text">
```

最终编译成:

1. 手动连接值绑定,将表单控件的`value`值和响应值进行绑定
2. 在表单控件的事件监听器上进行回写

```vue
<input
  :value="text"
  @input="event => text = event.target.value">
```

#### v-model根据不同元素触发不同事件

v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text和textarea元素使用value属性和input事件
- checkbox和radio使用checked属性和change事件
- select使用value和change事件

### 2.5.自定义组件的v-model(在vue3出现了新的变化)

>通过`v-model`实现自定义组件的双向绑定,父组件向子组件传参,并在子组件修改父组件的值,实现组件的双向绑定

###### 新变化:

1. 删除`model`选项,不再使用 props 和 event ,声明`v-model`传到子组件的`props`和`$emit`事件名称
2. 固定使用`modelValue`为父组件的`props`,使用`update:modelValue `这个emit来修改父组件的值

###### 原理:  父子组件之间的通讯

- 父组件向子组件通讯:向子组件传递`props`
- 子组件向父组件通讯:子组件通过`emit`修改父组件的`props `

### 

#### 2.5.1. vue3.4版本以前的自定义组件的`v-model`

##### 绑定单个v-model (多数情况)

>v-model的默认参数为:`modelValue`
>
>单个v-model传到子组件的props的名称为`modelValue`

```vue
<childComponent v-model="msg" /> 
```

实际是下面这段代码的语法糖:

```vue
<childComponent :modelValue="msg" @update:modelValue="msg=$event" /> 
```

###### 自定义组件的v-model总结:

利用父子组件之间的通讯方式,只不过规定了默认传递参数为:`modelValue`

1. 父组件向子组件通讯:使用`modelValue`为父组件的props
2. 子组件向父组件通讯:使用`update:modelValue`这个`emit`来修改父组件的值



###### 完整例子

父组件:

```vue
<childComponent v-model="msg" /> 
```

子组件

```vue
<template>
  <input type="text" v-model="newValue" />
</template>

<script setup>
import { computed } from "vue";
//接收父组件的props:modelValue
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
//接收父组件的方法:update:modelValue
const emit = defineEmits(["update:modelValue"]);
//通过computed计算属性的getter和seter来实现读取和修改父组件的值    
let newValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>
```

##### 绑定多个v-model

> v-mode支持在后面添加 `:参数名` 来指定传入子组件props的参数名和事件名

###### 绑定多个v-model总结:

利用父子组件之间的通讯方式,只不过默认传递参数不再是:~~`modelValue`~~,而是v-model后添加 `:参数名` 来指定传入子组件props的参数名和事件名

1. 父组件向子组件通讯:使用`v-model`后添加 `:参数名` 为父组件的props 

   例如:   v-model:xx="响应式变量"

2. 子组件向父组件通讯:使用`update:参数名`这个`emit`来修改父组件的值

   声明:`let emit = defineEmits(['update:参数名'])` 

   使用: `emit('update:参数名',最新值)`

###### 例子

父组件

```vue
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

子组件

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```



#### 2.5.2. Vue3.4 版本后,自定义组件的v-model

> 在Vue3.4版本后,出现了` defineModel`这个新的api,简化了自定义子组件实现双向绑定大部分操作(去掉了emit来修改父组件的值,这一操作,通过` defineModel`能直接修改父组件的值),这个api也是官方文档推荐的
>
> 官方文档链接:[组件 v-model ](https://cn.vuejs.org/guide/components/v-model.html#basic-usage)

#### 使用`defineModel`,在子组件声明一个双向绑定 prop

> 使用defineModel来进行自定义组件的双向绑定是官方推荐的,也就是以前那种繁琐的`defineProps`和`defineEmits`来进行自定义组件的双向绑定都会慢慢被`defineModel`替代

在自定义组件的双向绑定中,父组件中使用`v-model`向子组件传递双向绑定的`props`,使用`defineModel`,在子组件声明一个双向绑定 `prop`,在底层,也就算隐性，悄悄明了一个 model prop 和一个相应的值更新事件,也就是偷偷进行了`defineProps` 和`defineEmits`,这是我们看不见的,我们可以直接通过`defineModel`读取和修改父组件的值;

##### 注意:

使用`defineModel`必须是在**setup语法糖**下使用,也就是在`<script setup>`标签中

##### 语法:

> `defineModel`是一个语法糖,声明了一个 model prop 和一个相应的值更新事件

###### 自定义组件`v-model`的默认值

- 父组件: 直接使用v-model

```html
<子组件  v-model="ref声明的值"/>
```

- 子组件:

  父组件通过`v-model`传递到子组件中的props,实际是`modelValue`

```javascript
// 声明 "modelValue" prop，由父组件通过 v-model 使用
const model = defineModel()
```

可以通过`defineModel` 对父组件传过来的props的值进行类型限制

```javascript
// 或者：声明带选项的 "modelValue" prop
const model = defineModel({ type: String })
```
直接通过`defineModel`声明的值,修改父组件的值

```javascript
// 在被修改时，触发 "update:modelValue" 事件
model.value = "hello"
```

######  

###### 自定义组件`v-model`携带参数

> 自定义组件`v-model` 是可以通过`v-model:参数` 指定传给子组件双向绑定的prop的,也就是使用指定参数,替代`modelValue`

- 父组件: `v-model:参数`

  ```html
  <子组件  v-model:参数1 ="ref声明的响应式变量1" v-model:参数2 ="ref声明的响应式变量2" />
  ```

- 子组件: `defineModel('参数名称')`接收父组件的双向绑定prop

  ```javascript
  // 声明 "参数1" prop，由父组件通过 v-model:参数1 使用
  const count = defineModel("参数1")
  // 对指定参数进行类型校验和默认值
  const count = defineModel("参数1", { type: Number, default: 0 })
  
  //直接修改父组件的值
  function inc() {
    // 在被修改时，触发 "update:参数1" 事件
    参数1.value++
  }
  ```

  



##### 绑定单个`v-model`

###### 新api:` defineModel`实现自定义组件的双向绑定

> ` defineModel`新API的出现,简化了3.4版本以前需要在`defineProps`子组件中声明父组件props

###### 简化了双向绑定的操作,声明`defineModel`即可

- 简化了声明父组件的传递props,不需要写`defineProps`

- 简化了声明父组件的传递的事件,不需要写`defineEmits`

  ```js
  // 父组件直接写v-model
  <childComponent  v-model="响应式变量"/>
  //在子组件直接声明defineModel(),即可对model进行读取和修改
  const model = defineModel();
  ```

  

通过`defineModl`可以对上面例子进行改写,实现自定义组件的双向绑定

```vue
<template>
  <input type="text" v-model="newValue" />
</template>

<script setup>
// import { computed } from "vue";

// const props = defineProps({
//   modelValue: {
//     type: String,
//     default: "",
//   },
// });
// const emit = defineEmits(["update:modelValue"]);
// let newValue = computed({
//   get: () => {
//     return props.modelValue;
//   },
//   set: (value) => {
//     emit("update:modelValue", value);
//   },
// });
 const newValue = defineModel();
   
</script>
```

可看出,一个`defineModel` 即可完成自定义组件的`v-model`的双向绑定操作

简化了`defineProps`和`defineEmits`这2个操作来实现双向绑定,只用`defineModel` 即可

```vue
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
```





##### 绑定多个v-model

可以通过`defineModel` 实现对3.4版本以前自定义组件绑定多个`v-model`的简化

和v-model绑定单组件类似,简化了`defineProps`和`defineEmits`

- 简化了声明父组件的传递props,不需要写`defineProps`
- 简化了声明父组件的传递的事件,不需要写`defineEmits`

父组件中:

```vue
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

子组件:

```vue
<template>
  <!-- <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  /> -->

  <!-- <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  /> -->
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>

<script setup>
// defineProps({
//   firstName: String,
//   lastName: String
// })

// defineEmits(['update:firstName', 'update:lastName'])
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')    
</script>
```



#### 2.5.3. 自定义组件v-model使用举例

##### 自定义组件的v-model在`Element-plus`大量使用

`Dialog`组件、`Drawer`组件

在vue2中,Dialog组件控制隐藏显示,一直使用`prop`和`.sync`来实现组件的双向绑定,在vue3中,已经使用`v-model`来实现

vue2中:

```vue
<el-dialog
  :visible.sync="dialogVisible"         
  title="提示"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>

</el-dialog>
```

vue3中:

```vue
  <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="30%"
    :before-close="handleClose">
  <span>这是一段信息</span>

  </el-dialog>
```



### 总结:

我们只要知道vue3.4后,在表单元素的双向绑定依旧是使用`v-model`,在自定义组件中使用`v-model`时,在子组件中不需要使用父子组件之间通讯的方法如`defineProps` 和`defineEmits` ,直接使用`defineModel`即可在子组件中读取和修改父组件的值



🙏🙏🙏🙏🙏🙏如果觉得写得还不错不吝啬给点给赞再走吧！拜托了!🙏🙏🙏🙏🙏🙏

🙏🙏🙏🙏🙏🙏原创不易,转载引用请注明出处!🙏🙏🙏🙏🙏🙏

