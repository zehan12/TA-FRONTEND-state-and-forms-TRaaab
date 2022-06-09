import React from "react";

class Validateform extends React.Component {
    constructor ( props ) {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPass: "",
            errors: {
                username: "",
                email: "",
                password: "",
                confirmPass: ""
            }
        }
    }



    vailidate = (value,pattern) => {   
        // console.log(value.test(pattern))
        console.log(pattern.test(value))
        return pattern.test(value)
    
    }


    handelInput = ( { target } ) => {
        let { name, value } = target;
        let errors = this.state.errors;

        var usercheck = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
        var emailcheck =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var pswcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9@#$%^&*]{8,15}$/;

        switch ( name ) {
            case "username": 
            errors.username = this.vailidate(value,usercheck) ? "" : "Email is not Vaild"
            break;
            case "email": 
                errors.email = this.vailidate(value,emailcheck) ? "" : "Email is not Vaild"
                break;
            case "password": 
                errors.password = this.vailidate(value,pswcheck) ? "" : "password is not Vaild"
                break;
            case "confirmPass":
                errors.confirmPass = this.state.password === value ? "" : "password is not matching"
                break
            default:
                break;
        }
        console.log(this.state)
        this.setState( { [name]: value, errors } )
    }

    handelSubmit = ( event ) => {
        event.preventDefault();
    }



    render() {

        let { email, password, username, confirmPass } = this.state.errors;
        return (
            <div>
                <h1>Register With Us</h1>
                <form onSubmit={this.handelSubmit}>
                    <label>Username</label> <br/>
                    <input className={ username && "error" } name="username" value={this.state.username} onChange={this.handelInput} /> <br/>
                    <label>Email</label> <br/>
                    <input className={ email && "error" } name="email" value={this.state.email} onChange={this.handelInput} /> <br/>
                    <label >Password</label> <br/>
                    <input className={ password && "error" } name="password" value={this.state.password} onChange={this.handelInput} /> <br/>
                    <label >Confirm Password</label> <br/>
                    <input className={ confirmPass && "error" } name="confirmPass" value={this.state.confirmPass} onChange={this.handelInput} /> <br/>
                    <input type="submit" value="submit" name="" id="" />
                </form>

            </div>
        )
    }
}

export default Validateform;