import React from "react";

const text = [ "basketball", "cricket", "laptop", "phone", "pubg", "tiger" ]

class Head extends React.Component {
    constructor ( props ) {
    super( props );
        this.state = {
            imgUrl: "/assets/show-image.png"
        }
    }
 
    render (  ){
    return ( <>
        {    console.log(this.state.imgUrl) }
        { text.map((ele,i)=><button onClick={ ( event ) => {
            let val = event.target.innerText
            this.setState({
                imgUrl: `/assets/${val}.jpg`
            })
        } } key={i} > {ele} </button> ) }
        <br></br>
        <img src={this.state.imgUrl} alt="" width="400px" height="300px" />
    </> )
    }
}

export default Head;