import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import Msg from '../Msg'

export class Login extends Component {
    state={
        formData: {
            username: "",
            password: "",
          },
          errors: {
            username: "",
            password: "",
          },
          submitting: false,
          response: ""
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
          formData: {
            ...this.state.formData,
            [name]: value,
          }
        })
      }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
          submitting: true
        }, () => {
          const errors = this.validate()
          console.log(errors)
          if (Object.keys(errors).length === 0) {
            fetch("http://localhost:8002/api/v1/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.state.formData)
            }).then(response => {
              if (!response.ok) {
                if (response.status == 401) {
                  this.setState({
                    ...this.state,
                    errors: {
                      username: "username and password not match",
                      password: "username and password not match",
                    }
                  })
                  throw new Error("username and password not match")
                }
                if (response.status == 404) {
                  this.setState({
                    ...this.state,
                    errors: {
                      username: "username does not exist",
                    }
                  })
                  throw new Error("username does not exist")
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
              return response.json()
            })
            .then(response => {
              localStorage.clear()
              localStorage.setItem("token", response.result)
              toast(<Msg message={"Back to homepage in 3 seconds"}/>, {
                onOpen: () => {toast.success("user logined successfully")},
                onClose: ()=>{window.location.replace("/")}
              });
            })
            .catch((error) => {
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

      validate = () => {
        let errors = {}
        if (this.state.formData.username.trim() === "") {
          errors.username = "username is required"
        }
        if (this.state.formData.password.trim() === "") {
          errors.password = "password is required"
        }
        return errors
      }

    render() {
        return (
            <div className="auth_box_login container">
                <form onSubmit = {this.handleSubmit}>
                    <div className="auth_title flex_box">
                        <img src="https://onlinerestaurantmanager.com/wp-content/uploads/2016/06/orm-logo-2.png" alt="" />
                    </div>
                    <div>
                        <h4 className="text_middle">
                        Wanna to manage your restaurant menu?
                        </h4>
                        <h4 className="text_middle">
                        Log in here! :)
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
                        <div className="navigator_link">
                            <Link to = '/confirm'>
                                <h6 class="text_middle navigator_link">
                                    Forget your password? Click here to reset.
                                </h6>
                            </Link>
                        </div>  
                    </div>
                    <div className="flex_box navigator_link">
                        <span className="button_box">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </span>                        
                        <span className="button_box navigator_link">
                            <Link to = '/'>
                                <button className="btn btn-danger" type="button">Cancel</button>                            
                            </Link>
                        </span>   
                        <span className="button_box navigator_link">
                            <Link to = '/register'>
                                <button className="btn btn-secondary" type="button">Register</button>                            
                            </Link>
                        </span>  
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
