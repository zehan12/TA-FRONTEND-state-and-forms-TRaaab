import React from "react";

class App extends React.Component {
  constructor ( props ) {
    super(  );
    this.state = {
      count: 0,
      value: 0
    }
  }

  handleInc = () => {
    this.setState({
      count: this.state.count + this.state.value
    })
  }

  handleDec = () => {
    if ( this.state.count === 0 ) return;
    this.setState({
      count: this.state.count - this.state.value
    })
  }

  handleReset = () => {
    this.setState({
      count: 0,
      value: 0
    })
  }

  handelStep5 = () => {
    this.setState({
      value: 5
    })
  }

  handelStep10 = () => {
    this.setState({
      value: 10
    })
  }

  handelStep15 = () => {
    this.setState({
      value: 15
    })
  }


  render () {
    return (
      <>
        <h1>{this.state.count}</h1>
        <div>
          <h1>Step</h1>
          <div>
            <button onClick={this.handelStep5}>5</button>
            <button onClick={this.handelStep10}>10</button>
            <button onClick={this.handelStep15}>15</button>
          </div>
        </div>
        <div>
          <button onClick={this.handleInc} >Increment</button>
          <button onClick={this.handleDec} >Decrement</button>
          <button onClick={this.handleReset} >Reset</button>
        </div>
      </>
    )
  }
}

export default App;
