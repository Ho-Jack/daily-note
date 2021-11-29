### setState

#### 数据更新

- setState()是异步更新数据的

- 注意：使用该语法时，后面的setState 不要依赖于前面的setState()

- 可以多次调用setState(),只会触发一次重新渲染

  ```react
  this.state= { count : 1 }
  this.setState({
  count: this.state.count + 1
  })
  console.log(this.state.count) //1  同步在没+1前先打印了
  ```


#### 推荐语法

- 推荐： setState( ( state, props ) => {} )

- 参数state：表示最新的state

- 参数props：表示最新的props

  ```react
  this.state= { count : 1 }
  this.setState((state,props) =>{
    return {
      count : state.count + 1
    }
  })
  console.log(this.state.count) //1  同步在没+1前先打印了
  ```

#### 第二参数

- 场景：在状态更新（页面完成重新渲染）后立即执行某些操作

- 语法： setState( updater [ , callback ] )

  ```react
  this.state= { count : 1 }
  this.setState(
    (state,props) =>{
       return {
          count : state.count + 1
    },
    () => {
      console.log(this.state.count) //2      
       }
  })
  console.log(this.state.count) //1  同步在没+1前先打印了
  ```

  



