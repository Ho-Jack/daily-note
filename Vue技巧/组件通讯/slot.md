##  插槽 v-slot     (v-slot：  =   # )

> vue3.0 slot 废除 改写为 v-slot  (slot 标签还在，只是改了属性slot)
>
> v-slot 属性只能在template 使用，只有`默认插槽`才能在组件标签上使用
>
> `v-slot:defalut ` = `v-slot`    =   ` #defalut`

### 默认插槽 （父=>子）

-  子组件：

  ````vue
  <slot> 只有在没有要分发内容是才显示 </slot>
  ````

- 父组件：

  `v-slot:defalut  `=   `v-slot`  = ` #defalut`  
  
  ```vue
  <子> 
    <template v-slot>  
      ①有内容（不显示子组件slot标签的内容）   可以插入组件、html
      ②没有内容（显示子组件slot标签的内容）
    </template>
</子>
  ```
  
  ```vue
  <子> 
      <template #defalut>  
        ①有内容（不显示子组件slot标签的内容）   可以插入组件、html
        ②没有内容（显示子组件slot标签的内容）
      </template>
    </子>
  ```
  


具名插槽

  - 子组件

    ```vue
    <slot name="XX">  
        只有在没有要分发内容是才显示
    </slot>
    ```

  - 父组件：

    ```vue
    <子>
      <template #XX>    </template>
      <template v-slot:XX>        </template>
    </子>
    ```

    父级模板里的所有内容都是在父级作用域中编译的，子模板里的所有内容都是在子作用域中编译的
    
      （父--->子）插槽插入的内容在子组件作用域中
    
    

  

### 作用域插槽 (子 =>父)

#### 默认插槽

  - 子组件：
  
    ```vue
    <slot :XX="YY">         </slot>
    ```

   - 父组件：

     `v-slot:defalut ` = ` #defalut`  =   `v-slot` 
     
     ```vue
     <子>
         <template #default="slotProps">
             {{slotProps.XX.____}}
         </template>
       </子>
     ```
     
     
     
     ```vue
     <子>
         <template v-slot="slotProps">
             {{slotProps.XX.____}}
         </template>
       </子>
     ```

#### 具名插槽

  - 子组件：
  
    ```vue
    <slot name="ZZ"  :XX="YY">         </slot>
    ```
  
   - 父组件：
  
     ```vue
       <子>
         <template #ZZ="slotProps">
             {{slotProps.XX.____}}
         </template>
       </子>
     ```
      直接解构
   ```vue
    <子>
      <template #ZZ="{XX}">
          {{XX.____}}
      </template>
    </子>
   ```

  













  

  

  

  

  

  

  

​    