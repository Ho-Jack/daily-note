## Options API的弊端

> 在Vue2中，我们编写组件的方式是Options API，在对应的属性中编写对应的功能模块，比如data定义数据、methods中定义方法、computed中定义计算属性、watch中监听属性改变，也包括生命 周期钩子
>
> 但是这样会有一个弊端，当我们实现某一个功能，实现的代码会被拆分到各个属性里面，当随着组件逻辑的增多，同一个功能的分散可能导致代码的难于阅读和理解;

### 模仿Options API伪代码

```javascript
export defalut{
        data(){
            return {
               全局变量A;
                功能A;
                功能B;
            }
        },
        computed: {
            功能A;
            功能B;
        },
        watch: {
            功能A;
            功能B;
        },
        methods: {
            功能A;
            功能B;
        },
    }
```

模仿Compsition API伪代码

```vue
<script lang="ts" setup>
import { reactive, watch } from "vue";
全局变量A;
    
//功能A
const dataA = reactive();
watch();
function fnA() {}

// 功能B
const dataB = reactive();
computed();
function fnB() {}
</script>
```

