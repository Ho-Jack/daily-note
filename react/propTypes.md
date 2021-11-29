### React PropTypes的种类有

```react
React.PropTypes.array           // 队列

React.PropTypes.bool.isRequired // Boolean 且必须

React.PropTypes.func            // 函数

React.PropTypes.number          // 数字

React.PropTypes.object          // 对象

React.PropTypes.string          // 字符串

React.PropTypes.node            // 任何类型的: numbers, strings, elements 或者数组

React.PropTypes.element         // React 元素

React.PropTypes.instanceOf(XXX) // 某种XXX类型的对象

React.PropTypes.oneOf(['foo', 'bar']) // 其中的一个字符串

React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]) // 其中的一种类型

React.PropTypes.arrayOf(React.PropTypes.string)  // 某种类型的数组(字符串)

React.PropTypes.objectOf(React.PropTypes.string) // 元素是字符串的对象

React.PropTypes.shape({                          // 是否符合指定格式的对象

  color: React.PropTypes.string,
  fontSize: React.PropTypes.number
});
React.PropTypes.any.isRequired  // 可以是任何格式，且必要。


// 自定义格式，不符合的时候放回Error

// 不要用`console.warn` 或者 throw, 因为它在`oneOfType` 的情况下无效


customPropType: function(props, propName, componentName) {
  if (!/^[0-9]/.test(props[propName])) {
    return new Error('Validation failed!');
  }
}
```





### 示例：

```react
import PropTypes from 'prop-types';

class Example extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Example.propTypes = {
    //PropTypes  大驼峰
  name: PropTypes.string.isRequired  
};
```

