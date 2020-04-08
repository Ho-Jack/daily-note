import React from 'react';

class Father extends React.Component{
    static defaultProps = {name:"Fan"} // 默认属性
    constructor(props){
        super(props)
        console.log("cinstructor") // 1
        this.state = {number:0} 
    }
    UNSAFE_componentWillMount(){
        console.log("Father: UNSAFE_componentWillMount") //2
    }
    shouldComponentUpdate(nextProps,nextState){
   
        console.log("Father: shouldComponentUpdate") // 2-1
        // if(nextState.number%2 === 0){
        //     return true
        // }else{
        //     return false;
        // }
        return true;
    }
    componentWillUpdate(){
        console.log("Father: componentWillUpdate") // 2-2
    }
    UNSAFE_componentWillUpdate(){
        console.log("Father: UNSAFE_componentWillUpdate") // 2-2
    }
    componentDidUpdate(){
        console.log("Father: componentDidUpdate") 
    }
    handleClick = ()=>{
        this.setState({number:this.state.number+1})
    }
    render(){
        console.log("Father: render")  // 3       2-3
        return(
            <div>
                <h1>父组件</h1>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
                <hr/>
             {/*   影响多次渲染 */}
                {this.state.number%2===0 ? <Son number={this.state.number}></Son> : null}  
            </div>
        )
    }
    componentDidMount(){
        console.log("Father: componentDidMount") // 7    2-7
    }
}

class Son extends React.Component{
    UNSAFE_componentWillMount(){
        console.log("Son: UNSAFE_componentWillMount") // 4    2-4
    }
    componentDidMount(){
        console.log("Son: componentDidMount") //6     2-6
    }
    componentWillReceiveProps(){
        console.log("Son: componentWillReceiveProps")
    }
    shouldComponentUpdate(){
        console.log("Son: shouldComponentUpdate")
        // return false;
        return true;
    }
    componentWillUpdate(){
        console.log("Son: componentWillUpdate") //    
    }
    componentDidUpdate(){
        console.log("Son: componentDidUpdate") 
    }
    render(){
        console.log("Son: render")    //5   2-5
        return(
            <div>
                <h1>子组件</h1>
                <p>{this.props.number}</p>
            </div>
        )
    }
    componentWillUnmount(){
        console.log("Son: componentWillUnmount") 
    }
}
export default Father;