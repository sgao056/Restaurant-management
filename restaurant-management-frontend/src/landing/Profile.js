import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Profile extends Component {
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
            address: '',
            email: '',
            first_name: '',
            last_name: '',
            middle_name: '',
        }
    }
    componentDidMount(){
        const errors = this.validate()
        if (Object.keys(errors).length === 0) {
          fetch(`http://localhost:8002/api/v1/users/${this.props.history.location.state.id}`, {
            method: "GET",
          }).then(response => {
              console.log(response)
            if (!response.ok) {
              if (response.status == 401) {
                throw new Error("username and password not match")
              }
              else {
                throw new Error("Internal Server Error. Try again later")
              }
            }
            return response.json()
          }).then(res => {
           this.setState({
              ...this.state,
              user : res.result 
           })
           console.log(res.result)
           console.log(this.state)
          }).catch((error) => {
            this.setState({
              ...this.state,
              response: error.message
            })
          })
        } else {
          console.log(errors)
          this.setState({
            errors: errors
          })
        }
  }

  validate = () => {
      let errors = {}
    //   if (this.state.user.username.trim() === "") {
    //     errors.username = "username is required"
    //   }
      return errors
    }
  render() {
        return (
            <div className="profile_box">
                <div className="item_list_box">
                    <div className="item_menu_title flex_box">
                        <h1 className="text_middle">
                            Profile
                        </h1>
                    </div>
                </div>
                <form action="">
            {/* form */}
                   <div className="profile_main">
                       <div className="row profile_list">
                                <div className="col-6 row">
                                    <div className="col-6 flex_box">
                                            <label htmlFor="">Created Time</label>
                                    </div>
                                    <div className="col-6 flex_box">
                                            <input  className="profile_input" type="text" readOnly="readonly" value={this.state.user.created_at}/>
                                    </div>
                                </div>
                                <div className="col-6 row">
                                    <div className="col-6 flex_box">
                                            <label htmlFor="">Last Updated Time</label>
                                    </div>
                                    <div className="col-6 flex_box">
                                            <input  className="profile_input" type="text" readOnly="readonly" value={this.state.user.modified_at}/>
                                    </div>
                                </div>
                                <div className="col-6 row">
                                    <div className="col-6  flex_box">
                                            <label htmlFor="">Status</label>
                                    </div>
                                    <div className="col-6 flex_box">
                                            <input  className="profile_input" type="text" readOnly="readonly" value={this.state.user.status}/>
                                    </div>
                                </div>
                                <div className="col-6 row ">
                                    <div className="col-6 flex_box">
                                            <label htmlFor="">ID</label>
                                    </div>
                                    <div className="col-6  flex_box">
                                            <input  className="profile_input" type="text" readOnly="readonly" value={this.state.user.id}/>
                                    </div>
                                </div>
                                
                           <div className="col-6 row">
                               <div className="col-6 flex_box">
                                    <label htmlFor="">Username</label>
                               </div>
                               <div className="col-6 flex_box">
                                    <input   className="profile_input" type="text" readOnly="readonly" value={this.state.user.username}/>
                               </div>
                           </div>
                           <div className="col-6 row">
                               <div className="col-6 flex_box">
                                    <label htmlFor="">First Name</label>
                               </div>
                               <div className="col-6 flex_box">
                                    <input  className="profile_input" type="text" readOnly="readonly" value={this.state.user.first_name}/>
                               </div>
                           </div>
                           <div className="col-6 row">
                               <div className="col-6 flex_box">
                                    <label htmlFor="">Last Name</label>
                               </div>
                               <div className="col-6 flex_box">
                                    <input  className="profile_input" type="text" readOnly="readonly" value={this.state.user.last_name}/>
                               </div>
                           </div>
                           <div className="col-6 row">
                               <div className="col-6 flex_box">
                                    <label htmlFor="">Middle Name</label>
                               </div>
                               <div className="col-6 flex_box">
                                    <input  className="profile_input" type="text" readOnly="readonly" value={this.state.user.middle_name}/>
                               </div>
                           </div>
                          
                           <div className="col-6 row">
                               <div className="col-6 flex_box">
                                    <label htmlFor="">Email</label>
                               </div>
                               <div className="col-6 flex_box">
                                    <input   className="profile_input" type="text" readOnly="readonly" value={this.state.user.email}/>
                               </div>
                           </div>

                           <div className="col-6 row">
                               <div className="col-6 flex_box">
                                    <label htmlFor="">Address</label>
                               </div>
                               <div className="col-6 flex_box">
                                    <input  className="profile_input" type="text" readOnly="readonly" value={this.state.user.address}/>
                               </div>
                           </div>
                       </div>
                   </div>
                   {/* header button */}
                   <div className = "button_box row flex_box">
                        <div className = "flex_box col-2">
                            <Link 
                            to = {{pathname : '/editProfile/'+ this.state.user.id, 
                                    state : {
                                        id: this.state.user.id,
                                    }}}>
                                <button className="btn btn-dark button_profile">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                        <div className = "col-2 flex_box">
                            <Link to="/">
                                    <button className="btn btn-danger button_profile">
                                        Homepage
                                    </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Profile
