import React from "react"
class Multiform extends React.Component {
    constructor( props ) {
        super()
        this.fileInput = React.createRef();
        this.state = {
            text: "",
            date: "",
            area: ""
        }
    }

    handelInput = ( { target } ) => {
        let { name, value } = target;
        this.setState( { [name] : value } )
    }

    handelSubmit = (event) => {
        event.preventDefault(); 
        console.log(this.state)
        console.log(this.fileInput.current.files[0])
    }

    render() {
        return (
            <form onSubmit={this.handelSubmit}>
                <label htmlFor="text">Text Input</label><br/>
                <input type="text" id="text" name="text" value={this.state.text} onChange={this.handelInput} /><br/>
                <label htmlFor="date">Date</label><br/>
                <input type="date" name="date" value={this.state.date} onChange={this.handelInput} /><br/>
                <label htmlFor="file">File Input</label><br/>
                <input type="file" ref={this.fileInput}  /><br/>
                <label htmlFor="text">Disabled Input</label><br/>
                <input type="text" id="text" disabled={true} /><br/>
                <label htmlFor="text">Read Only Input</label><br/>
                <input type="text" placeholder="Enter Name" value="Read-Only Input" readOnly={true}/><br/>
                <label htmlFor="text">Text Area</label><br/>
                <textarea  name="area" value={this.state.area} onChange={this.handelInput} rows="2" cols="17"></textarea><br/>
                <label htmlFor="area">Disabled Text Area</label><br/>
                <textarea  name="area" disabled={true}  rows="2" cols="17"></textarea><br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}
export default Multiform;