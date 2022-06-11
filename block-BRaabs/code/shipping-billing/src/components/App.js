import React from "react";


class App extends React.Component {
  constructor( props ){
    super();
    this.state = {
        ShippingAddress:"",
        ShippingCode:"",
        ShippingCity:"",
        ShippingCountry:"",
        BillingAddress:"",
        BillingCode:"",
        BillingCity:"",
        BillingCountry:""
    }
  }


  handelInput = ( { target } ) => {
    let { name, value } = target
    console.log( name,"name", value,"value" );
    this.setState( { [name]: value } )
  }

  handelChange = ( event ) => {
    console.log(event.target.checked)
    if ( event.target.checked ) {
      this.setState({
        BillingAddress: this.state.ShippingAddress,
        BillingCode: this.state.ShippingCode,
        BillingCity: this.state.ShippingCity,
        BillingCountry: this.state.ShippingCountry
      })
    } else {
      this.setState({
        BillingAddress: "",
        BillingCode: "",
        BillingCity: "",
        BillingCountry: ""
      })
    }
  }


  render(){
    console.log(this.state)
    return (
      <div className="App">
        <div>
          <h2>Shipping Address</h2>
          <form>
            <label>Address</label> <br/>
            <input onChange={this.handelInput} name="ShippingAddress" /> <br/>
            <label>Zip/Postal Code</label> <br/>
            <input onChange={this.handelInput} name="ShippingCode" /> <br/>
            <label>City</label> <br/>
            <input onChange={this.handelInput} name="ShippingCity" /> <br/>
            <label>Country</label> <br/>
            <input onChange={this.handelInput} name="ShippingCountry" /> <br/>
            <input type="submit" value="submit"/>
          </form>
        </div>
        <div>
          <h2>Billing Address</h2>
          <input onChange={this.handelChange} type="checkbox" />
          <label> Same as the Shipping Address?</label>
            <form>
              <label>Address</label> <br/>
              <input onChange={this.handelInput} value={this.state.BillingAddress} name="BillingAddress" /> <br/>
              <label>Zip/Postal Code</label> <br/>
              <input onChange={this.handelInput}  value={this.state.BillingCode} name="BillingCode" /> <br/>
              <label>City</label> <br/>
              <input onChange={this.handelInput}  value={this.state.BillingCity} name="BillingCity" /> <br/>
              <label>Country</label> <br/>
              <input onChange={this.handelInput}  value={this.state.BillingCountry} name="BillingCountry" /> <br/>
              <input type="submit" value="submit"/>
            </form>
        </div>
      </div>
    );
  }
}

export default App;
