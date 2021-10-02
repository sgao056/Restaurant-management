import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'

export class Register extends Component {
    state={
        username:'',
        password:'',
        confirm_password:'',
        errors:{
            username:'',
            password:'',
            confirm_password:''
        },
        submitting:false
    }

    emptyObj = (obj)=>{
        return Object.keys(obj).length === 0
    }

    handleChange= e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]:value,
        })
    }

    handleRegister = (e)=>{
        e.preventDefault()
        this.setState({
        submitting: true
        }, () => {
        const errors = this.validateForm()
        console.log(errors)
        if (this.emptyObj(errors)) {
            // ok to submit
            fetch("http://localhost:8002/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
            }).then(response => {
            if (!response.ok) {
                if (response.status == 401) {
                throw new Error("Invalid Input")
                }
                else if(response.status == 409){
                this.setState({
                    ...this.state,
                    errors:{
                        username:'username already existed',
                    }
                })
                throw new Error("username already existed")
                }
                else {
                    toast.error('Internal Server Error. Try again later', {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                throw new Error("Internal Server Error. Try again later")               
                }
            }
            }).then(response => {
            toast.success("user created")
            this.setState({
                ...this.state,
            })
            this.props.history.push("/login")
            }).catch((error) => {
            console.log(error.message)
            this.setState({
                ...this.state,
                response: error.message
            })
            })
        } else {
            this.setState({
            errors: errors
            })
        }
        })

    }

     validateForm = () => {
        let errors = {}
        if (this.state.username.trim() === "") {
          errors.username = "username is required"
        }
        if (this.state.password.trim() === "") {
          errors.password = "password is required"
        }
        if (this.state.confirm_password.trim() === "") {
            errors.confirm_password = "confirm password is required "
          }

        if (this.state.password!==this.state.confirm_password){
            errors.password = "password and confirmPassword must match"
            errors.confirm_password = "password and confirmPassword must match"
        }

        return errors
      }
    
    render() {
        return (
            <div  className="auth_box_register container">
               <form action="" onSubmit={this.handleRegister}>
                    <div className="auth_title flex_box">
                        <img src="https://onlinerestaurantmanager.com/wp-content/uploads/2016/06/orm-logo-2.png" alt="" />
                    </div>
                    <div>
                        <h4 className="text_middle">
                        Wanna to Register to start manage your restaurant?
                        </h4>
                        <h4 className="text_middle">
                        Immediately register your own account! :)
                        </h4>
                    </div>
                    <div>
                        <div className="flex_box">
                            <label htmlFor = ""><h1>Username</h1></label>
                        </div>
                        <div className="flex_box row">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <input 
                                type="username" 
                                placeholder="Input your Username"
                                name="username"
                                onChange={this.handleChange}/> 
                            </div>
                            <div className="warning col-3">
                                {this.state.errors.username}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex_box">
                            <label htmlFor = ""><h1>Password</h1></label>
                        </div>
                        <div className="flex_box row">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <input 
                                type="password" 
                                placeholder="Input your Password"
                                name="password"
                                onChange={this.handleChange}/> 
                            </div>
                            <div className="warning col-3">
                                {this.state.errors.password}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex_box">
                            <label htmlFor=""><h1>Comfirm Password</h1></label>
                        </div>
                        <div className="flex_box">
                            <div className="col-4"></div>
                            <div className="col-4 flex-box">
                                <input 
                                type="password" 
                                placeholder="Input your Password"
                                name="confirm_password"
                                onChange={this.handleChange}/>
                            </div>
                             <div className="warning col-3">
                                {this.state.errors.confirm_password}
                            </div> 
                        </div>
                    </div>
                    <div className="flex_box navigator_link">         
                        <span className="button_box">
                                <button className="btn btn-primary" type="submit">Register</button>                            
                        </span>            
                        <span className="button_box">
                            <Link to='/'>
                                <button className="btn btn-danger">Homepage</button>                            
                            </Link>
                        </span>
                    </div>
                    <div className="flex_box navigator_link">
                        <Link to='/login'>
                            <h6 className="navigator_link">
                                Already has an account? Click here to login.
                            </h6>
                        </Link>
                    </div>         
               </form>
            </div>
        )
    }
}

export default Register
