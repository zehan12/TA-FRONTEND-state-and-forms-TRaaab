import menuItems from "../data/menuItems";
import React from "react";
import Main from './Main';
const tag = [ "All", "Breakfast", "Lunch", "Shakes" ];

class Tags extends React.Component {
    constructor ( props ) {
        super();
        this.state = {
            item:"All",
            value:menuItems
        }
    }

    handelClick = (event) =>{
        const order = menuItems.filter((e)=> e.category===event.target.innerText.toLowerCase());
        this.setState({ 
            item : event.target.innerText })
         this.setState({   value: this.state.item === "All" ? menuItems : 
                    this.state.item === event.target.innerText ? order :
                    menuItems 
            })
        }

    render() {
        return(
        <> <div className="pt-6 w-80 flex justify-around m-auto">
            { 
                tag.map((ele,i)=><button className={this.state.item  ?  "text-yellow-700   to-blue-500 dark:hover:text-white dark:hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" : ""} key={i} 
                onClick={ this.handelClick } > {ele} </button>)  
            }
        </div>
        <Main item={this.state.value}/>
        </>
        )
    }
}

export default Tags;