import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export class EditProfile extends Component {
    state = {
        user:{
            id:'',
            username:'',
            address:'',
            created_at:'',
            email:'',
            first_name:'',
            last_name:'',
            middle_name:'',
            modified_at:'',
            status:'',
            landings:{}
        },
        errors:{
            username: '',
            first_name:'',
            last_name:'',
            middle_name:'',
            email:'',
            address:''
        }
    }

    componentDidMount(){
          fetch(`http://localhost:8002/api/v1/users/${this.props.history.location.state.id}`, {
            method: "GET",
          }).then(response => {
              console.log(response)
            if (!response.ok) {
              if (response.status == 404) {
                toast.error('User do not exist', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                throw new Error("User do not exist")
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
          }).then(res => {
           this.setState({
              ...this.state,
              user : res.result 
           })
          })
    }

    validate = () => {
        let errors = {}
        if (this.state.user.username.trim() === "") {
            errors.username = "username is required"
        }
        if (this.state.user.first_name.trim() === "") {
            errors.first_name = "first name is required"
          }
        if (this.state.user.last_name.trim() === "") {
            errors.last_name = "last name is required"
        }
        if (this.state.user.middle_name.trim() === "") {
            errors.middle_name = "middle name is required"
        }
        if (this.state.user.email.trim() === "") {
            errors.email = "email is required"
        }
        if (this.state.user.address.trim() === "") {
            errors.address = "address is required"
        }
          
        return errors
      }

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = this.validate()
        console.log(errors)
        if(Object.keys(errors).length === 0){
                fetch(`http://localhost:8002/api/v1/users/${this.props.history.location.state.id}`,{
                        method:'PUT',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.state.user)
                })
                .then(response => {
                    if (!response.ok) {
                      if (response.status == 404) {
                        toast.error('Profile do not exist', {
                            position: "top-center",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
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
                .then(
                    res => {
                        toast.success("Updated successful");
                        this.props.history.push('/')
                    }
                )  
            }
        else {
            this.setState({
                ...this.state,
                errors: errors
            })
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            ...this.state,
            user:{
                ...this.state.user,
                [name]: value
            },
        })
      }
    
    render() {
        return (
            <div>
                <div className="item_list_box">
                    <div className="item_menu_title flex_box">
                        <h1 className="text_middle">
                            Edit profile                        
                        </h1>
                    </div>
                </div>
                <form action="" onSubmit={this.handleSubmit}>
            {/* form */}
                    <div className="profile_main">
                        <div className="row profile_list">
                            <div className="col-12 flex_box border">
                                    <label htmlFor="">Uneditable Area</label>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">Created Time</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    readOnly="readonly" 
                                    value={this.state.user.created_at}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">Last Updated Time</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    readOnly="readonly" 
                                    value={this.state.user.modified_at}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">Status</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    readOnly="readonly"
                                    value={this.state.user.status}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">ID</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    name="username"
                                    readOnly="readonly"
                                    onChange={this.handleChange} 
                                    value={this.state.user.id}/>
                                </div>
                            </div>
                            <div className="col-12 flex_box border">
                                    <label htmlFor="">Editable Area</label>
                            </div>
                            <div className="col-6 row unedit_box">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">Username</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    name="username"
                                    onChange={this.handleChange} 
                                    value={this.state.user.username}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">FirstName</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    name="first_name"
                                    onChange={this.handleChange} 
                                    value={this.state.user.first_name}/>
                                </div>
                            </div>
                            <div className="col-12 row">
                                <div className="col-6 warning">
                                    {this.state.errors.username}
                                </div>
                                <div className="col-5 warning">
                                    {this.state.errors.first_name}
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">LastName</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    name="last_name"
                                    onChange={this.handleChange} 
                                    value={this.state.user.last_name}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">MiddleName</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    name="middle_name"
                                    onChange={this.handleChange} 
                                    value={this.state.user.middle_name}/>
                                </div>
                            </div>
                            <div className="col-12 row">
                                <div className="col-6 warning">
                                    {this.state.errors.last_name}
                                </div>
                                <div className="col-5 warning">
                                    {this.state.errors.middle_name}
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">Email</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    name="email"
                                    onChange={this.handleChange} 
                                    value={this.state.user.email}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6 flex_box">
                                    <label htmlFor="">Address</label>
                                </div>
                                <div className="col-6 flex_box">
                                    <input 
                                    className="profile_input"
                                    type="text" 
                                    name="address"
                                    onChange={this.handleChange} 
                                    value={this.state.user.address}/>
                                </div>
                            </div>
                            <div className="col-12 row">
                                <div className="col-6 warning">
                                    {this.state.errors.email}
                                </div>
                                <div className="col-5 warning">
                                    {this.state.errors.address}
                                </div>
                            </div>
                        </div>
                        {/* header button */}
                        <div className = "button_box row flex_box">
                            <div className = "flex_box col-2">
                                <button type="submit" className="btn btn-dark button_profile">
                                        Submit
                                </button>
                            </div>
                            <div className = "flex_box col-2">
                                <Link to="/">
                                    <button type="button" className="btn btn-danger button_profile">
                                        Homepage
                                    </button>               
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditProfile
