// import React from "react";
import React, { useState } from 'react';


const text = ["basketball", "cricket", "laptop", "phone", "pubg", "tiger"]

// class Head extends React.Component {
//     constructor ( props ) {
//     super( props );
//         this.state = {
//             imgUrl: "show-image"
//         }
//     }

//     render (  ){
//     return ( <>
//         { text.map((ele,i)=><button className={ this.state.imgUrl == ele ? "active" : "" } onClick={ ( event ) => {
//             this.setState({
//                 imgUrl: event.target.innerText
//             })
//         } } key={i} > {ele} </button> ) }
//         <br></br>
//         <img src={"/assets/"+this.state.imgUrl+".jpg"} alt="" width="400px" height="300px" />
//     </> )
//     }
// }

function Head() {
    const [imgUrl, setImgUrl] = useState("show-image");
    console.warn("page render threw state")
    return (<>
        {text.map((ele, i) => <button className={ imgUrl == ele ? "active" : "" }  onClick={(event) => {
            setImgUrl(event.target.innerText)
            }
        } key={i} > {ele} </button>)}
        <br></br>
        <img src={"/assets/" + imgUrl + ".jpg"} alt="" width="400px" height="300px" />
    </>)
}

export default Head;