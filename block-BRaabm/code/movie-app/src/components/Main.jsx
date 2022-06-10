import React from "react";

class Main extends React.Component {
    constructor( props ){
        super(  );
    }

    render(){
        return(
            <>
                <div className="bg-purple-200 w-screen">
                    <h1 className="text-center">movie list</h1>
                    <div className="flex flex-wrap">
                    {console.log(this.props.movies)}
                    { this.props.movies.map((ele)=>{
                        return <div className="p-5">
                            <img src={ele.Images[0]} alt={ele.Title} width="300px" height="600px"/>
                            <h2>{ele.Title}</h2>
                            <p>{ele.Description}</p>
                        </div>
                    }) }
                    </div>
                </div>
            </>
        )
    }
}

export default Main;