import React from "react";

class App extends React.Component {
  constructor ( props ) {
    super(  );
    this.state = {
      count: 0,
      value: 0,
      maxValue:Infinity 
    }
  }

  handleInc = () => {
    console.log(this.state)
    if ( this.state.count < this.state.maxValue && this.state.count + this.state.value < this.state.maxValue  ) {
      this.setState({
        count: this.state.count + this.state.value
      })
    }
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
      value: 0,
      maxValue:Infinity
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

  handleMax15 = () => {
    this.setState({
      maxValue:15
    })
  }

  handleMax100 = () => {
    this.setState({
      maxValue:100
    })
  }

  handleMax200 = () => {
    this.setState({
      maxValue:200
    })
  }


  render () {
    return (
      <>
        <h1>{this.state.count || 0} </h1>
        <div>
          <div>
              <div>
                <h1>Step</h1>
              </div>
              <div>
                <button onClick={this.handelStep5}>5</button>
                <button onClick={this.handelStep10}>10</button>
                <button onClick={this.handelStep15}>15</button>
              </div>
          </div>
          <div>
              <div>
                <h1>maxValue</h1>
              </div>
              <div>
                <button onClick={this.handleMax15}>15</button>
                <button onClick={this.handleMax100}>100</button>
                <button onClick={this.handleMax200}>200</button>
              </div>
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
