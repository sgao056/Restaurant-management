import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
export default class Navigator extends Component {
    state = {
            username: this.props.user.username,
            address: this.props.user.address,
            created_at: this.props.user.created_at,
            email: this.props.user.email,
            first_name: this.props.user.first_name,
            id: this.props.user.id,
            landings: this.props.user.landings,
            last_name: this.props.user.last_name,
            middle_name: this.props.user.middle_name,
            modified_at: this.props.user.modified_at,
            password: this.props.user.password,
            status: this.props.user.status
    }

    handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload()   
        
    }

    
    render() {
        return (
            <div className="navigator row">
        {/*before login*/}

                    <div className = {this.state.username === undefined ? "panel_off":"panel"}>
                        {   
                            this.state.username === undefined ?
                            <div>
                                <div className="row">
                                    <div className="col-2">
                                        <div className="logo_image">
                                            <img src="https://onlinerestaurantmanager.com/wp-content/uploads/2016/06/orm-logo-2.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-7 flex_box">
                                        <input className="search_bar" type="text" />
                                        <span>
                                            <button className="btn btn-danger search_button">Search</button>
                                        </span>
                                    </div> 
                                    <div className="col-1 flex_box navigator_button navigator_link">
                                        <Link to="/login" style={{}}>
                                            <div className="h4 navigator_link" type="button">Login</div>
                                        </Link>
                                    </div>
                                    <div className="col-2 flex_box navigator_button navigator_link">
                                        <Link to="/register">
                                            <div className="h4 navigator_link" type="button">Register</div>
                                        </Link>
                                    </div>   
                                </div>
                            </div>         
        /*After login*/                :
                           <div>
                                <div className="row">
                               <div className="col-2">
                                        <div className="logo_image">
                                            <img src="https://onlinerestaurantmanager.com/wp-content/uploads/2016/06/orm-logo-2.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-4 flex_box">
                                        <input className="search_bar" type="text" />
                                        <span>
                                            <button className="btn btn-danger search_button">Search</button>
                                        </span>
                                    </div> 
                                <div className="col-2">
                                    <h4>
                                        Welcome,  
                                    </h4>
                                    <h1>
                                        {this.state.username}
                                    </h1>
                                </div>
                                <div className="col-3 row flex_box">
                                    <div className="dropdown col-7">
                                        <div className="dropdown-toggle flex_box" 
                                            type="button" 
                                            id="dropdownMenu2" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false">
                                            <span className="h4">My restaurant</span>
                                        </div>
                                        <div className="dropdown-menu navigator_dropdown" aria-labelledby="dropdownMenu2">
                                            <Link to="/head">
                                                <button className="dropdown-item" 
                                                        type="button" 
                                                        name="head"
                                                        onClick={this.handleClick}
                                                >Head</button>
                                            </Link>
                                            <Link to="/feature">
                                                <button className="dropdown-item" 
                                                        type="button" 
                                                        name="feature"
                                                        onClick={this.handleClick}
                                                >Feature</button>
                                            </Link>
                                            <Link 
                                            to = {{pathname : '/menu/'+ this.state.id, 
                                                    state : { id: this.props.user.id}}}>
                                                <button className="dropdown-item" 
                                                        type="button" 
                                                        name="menu"
                                                        onClick={this.handleClick}
                                                >Menu</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-5 flex_box navigator_link">
                                            <Link 
                                            to = {{pathname : '/profile/'+ this.state.id, 
                                                    state : { id: this.props.user.id, }}}>
                                            <div className="button_inside navigator_link">
                                                <h4>
                                                    My Profile
                                                </h4>
                                            </div>
                                            </Link>
                                        </div>
                                </div>
                                <div className="col-1 flex_box navigator_link">
                                    <Link to="/">
                                        <div className="navigator_link" 
                                             type="button"
                                             onClick={this.handleLogout}>
                                            <h4 className="">
                                                Logout
                                            </h4>
                                        </div>
                                    </Link>
                                </div>       
                            </div>
                           </div>
                    }
                    </div>
            </div>
        )
    }
}

