作为 `JavaScript` 的超集。当前的 `TypeScript` 非常流行，`TypeScript`解决了许多在 `JavaScript` 中编程的痛点，**提高了健壮性、可读性、开发效率、开发体验，所以学好`TypeScript`是非常有必要的。**

想要学好 `TypeScript` 离不开良好的编程规范和最佳实践。本文包含某些技巧在`JavaScript` 中也能适用，当然在 `JavaScript` 中的开发规范依然能够在 `TypeScript` 中使用，但是要转变到` TypeScript `开发中时要对以往的开发思维、习惯进行一些改变。

## 语法

- ***禁止***使用 `//@ts-ignore` 、`any`。
- tsx中***必须***使用`as`断言，因为 `<> `容易跟`jsx`标签、泛型语法起冲突。
- ***禁止***修改任何原生js内置原型`xxx.prototype`。
- **建议**尽量不使用`unknown`、双重断言，请使用更准确的类型或类型守卫，不要滥用类型断言。
- 对一些引用类型数据进行修改时***建议***要先进行浅/深拷贝、或对象解构再进行修改，避免破坏原数据。优先使用对象展开运算符 `...` 来做对象浅拷贝而不是使用 `Object.assign`、`Array.from`。
- ***建议***使用可选链（ES11新增的特性）` ?. `替代 `a && a.b && a.b.c` 这样的代码。
- ***建议***使用空值合并运算符 `??` 替代`const name = nickName || loginName || '' `这样的代码。

让泛型变量更加语义化，常见泛型变量如下：

> **T**（Type）：表示一个 TypeScript 类型
> **K**（Key）：表示对象中的键类型
> **V**（Value）：表示对象中的值类型
> **E**（Element）：表示元素类型

## 排版风格（可读性）

***建议***给`interface`声明顺序，只读参数放第一位，必选参数第二位，然后是可选参数，不确定参数放最后:

```typescript
interface IProps {
  readonly x: number;
  readonly y: number;
  name: string;
  age: number;
  height?: number;
  [propName: string]: any;
}
```

***建议***使用 `===` 和 `!==` 而非 `==` 和 `!=` ，如条件过于复杂，***建议***封装判断条件，提升可读性。

正确示例：

```ts
function canActivateService(subscription: Subscription, account: Account) {
  return subscription.isTrial || account.balance > 0
}

if (canActivateService(subscription, account)) {
  // ...
}
```

错误示例：

```ts
if (subscription.isTrial || account.balance > 0) {
  // ...
}
```

***建议***同个文件每个模块只允许 `import` 一次，有多个 `import` 请写在一起。- eslint: no-duplicate-imports

正确示例：

```ts
import foo, {
  named1,
  named2
} from 'foo'
```

错误示例：

```ts
import foo from 'foo'
// … some other imports … //
import { named1, named2 } from 'foo'
```

### 函数

- 尽量减少函数入参，函数入参***不建议***超过4个，超过4个请使用对象来聚合。
- 尽量遵循单一职责，一个函数只干一件事，否则可能函数过于复杂，考虑拆分逻辑。
- 高内聚、低耦合。
- ***建议***尽量将逻辑紧密相关的代码放在一起。

***建议***通过 TypeScript 的类型别名描述对象入参，可以进一步提高可读性。

正确示例：

```ts
type TMenuOptions = {title: string, body: string, buttonText: string, cancellable: boolean};

function createMenu(options: MenuOptions) {
  // ...
}

createMenu(
  {
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }
);
```

***建议***使用参数默认值语法而不是修改函数参数。
正确示例：

```ts
function handleThings (opts = { }) {
  // ...
}
```

错误示例：

```ts
function handleThings (opts) {
  // 1.不应该直接修改入参
  // 2.如果opts为falsy值，opts可能会获取不到你预期的值，所以会导致一些问题
  opts = opts || {}
  // ...
}
```

***建议***过滤掉你没考虑到的情况。
例如一个函数，你只想操作字符串，那你就要在函数开头就只允许参数是字符串。

正确示例：

```actionscript
function parse (str:string){
  if (typeof(str) === 'string' ) {
    ...
  }
}
```

***不建议***函数操纵外部作用域的变量，避免副作用，否则不好理解，易出现bug。

***禁止***使用`eval()`、`new Function()`，会导致太多漏洞。

***建议***使用`Async/Await` 代替`Promise`链式写法，提高可读性。

在并发编程中`Promise.allSettled`比`Promise.all`更好，`allSettled`可以获取到你想要的状态，区别：

> 在 Promise.all 其中的某个promise被reject时，将会丢失所有promise结果，如果你想获得所有promise结果可以考虑使用Promise.allSettled，Promise.allSettled会最终返回所有promise结果（包括reject的）在 Promise.all 其中的某个promise被reject时，将会丢失所有promise结果，如果你想获得所有promise结果可以考虑使用Promise.allSettled，Promise.allSettled会最终返回所有promise结果（包括reject的）

#### 删除未使用的内容

不使用（多余）的变量、代码段、空行、注释、文件都***必须***删除，否则会对维护人员带来困惑。

#### 减少硬编码

***建议***减少魔法数字、硬编码，使用`const`常量或枚举方式进行替代，难以理解或可能产生歧义的地方最好加上注释。

#### 注释

- ***建议***尽量让代码来解释自己。
- 注释应解释代码的意图， 而不是描述代码怎么实现的。
- 保证注释与代码一致， ***禁止***产生误导。

## TSDoc文档注释

TSDoc是标准化TypeScript源文件中使用的doc注释的建议，不仅可以提高代码可读性，还可获得编辑器智能提示。

一个常用的函数至少需要具备的`TSDoc`标签：摘要、入参说明、返回值说明。

```typescript
/**
 * x 和 y的相加
 *
 * @remarks
 * The main documentation for an API item is separated into a brief
 * "summary" section optionally followed by an `@remarks` block containing
 * additional details.
 * 
 * @param {number} x - The x value.
 * @param {number} y - The y value.
 * @returns  {number} Sum of x and y
 */

const sum: (x: number, y: number) => number =  (x, y) =>  x + y ;
```

`interface`（接口）至少需要具备的`TSDoc`标签：摘要、类型。

```typescript
export interface IOrder {

    /**
     * ID
     *
     * @type unit32
     */
    'id': number;

    /**
     * 支持的店铺
     *
     * @type string
     */
    'site': string;

    /**
     * 类型
     *
     * @type  'cash_refund' [现金退款] | 'customer_refund' [客户退款]
     */
    'type': TRefundType;
}
```

在库/包/API接口类型文档开发中要求***必须***使用 `TSDoc` 注释，业务型代码则***建议***使用TSDoc注释提高可读性。

在给函数、对象属性、变量添加注释时，优先使用`TSDoc`风格注释替代单行/多行注释，否则使用普通注释将会失去编辑器的智能提示效果。

## 枚举小技巧

### 获取枚举映射对象

如果想要得到一个映射`fruitListMap`，并不需要新建一个，而是可以直接根据`FruitEnum`的枚举来生成一个映射数组。

```typescript
enum EFruitEnum {
    TOMATO = '1',
    BANANA =  '2',
    APPLE = '3'
}

const fruitListMap = Object.entries(EFruitEnum);
```

在ts编译阶段的枚举值打印出来是个单向映射对象（**当是字符串枚举时是单向，否则的话会是双向映射**），因此我们就可以直接拿这个单向映射对象去干些事情，比如下拉框的数据来源:

```typescript
console.log(Object.entries(TYPE.EFruitEnum).map(([value, label]) => ({label, value})));

[
    {
        "label": "1",
        "value": "TOMATO"
    },
    {
        "label": "2",
        "value": "BANANA"
    },
    {
        "label": "3",
        "value": "APPLE"
    }
]
```

### 对象的key是枚举

`keyof` 可获取一个接口中所有 Key 的联合类型，当需要某个类型必须是A枚举的中的键的时候可以使用 `keyof typeof AEnum`。

```typescript
type IFruitObj = Record<keyof typeof EFruitEnum, string>;
const obj: IFruitObj = { //Error: obj中缺少属性 "BANANA"
    TOMATO: 'toma',
    APPLE: '333'
};
```