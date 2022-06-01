import React from "react";

class App extends React.Component {
  constructor ( props ) {
    super(  );
    this.state = {
      counter: 0
    }
  }

  handleInc = () => {
    this.setState({
      counter: this.state + 1
    })
  }

  handleDec = () => {
    if ( this.state === 0 ) return
    this.setState({
      counter: this.state - 1
    })
  }

  handleReset = () => {
    this.setState({
      counter: 0
    })
  }

  handelStep5 = () => {
    
  }


  render () {
    return (
      <>
        <h1>{this.state.counter}</h1>
        <div>
          <h1>Step</h1>
          <div>
            <button onClick={this.handleDec}>5</button>
            <button onClick={this.handleInc}>10</button>
            <button onClick={this.handleReset}>15</button>
            <button>15</button>
          </div>
        </div>
        <div>
          <button onClick={this.handleDec} >Increment</button>
          <button onClick={this.handleInc} >Decrement</button>
          <button onClick={this.handleReset} >Reset</button>
        </div>
      </>
    )
  }
}

export default App;
