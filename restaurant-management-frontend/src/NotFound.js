import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NotFound extends Component {
    render() {
        return (
            <div>
                    <div className="relative_box">
                        <h4>Oops! You have no authorization entering this page!</h4>
                    </div>
                    <div className="relative_box">
                        <h4>For more permissions, please log in!</h4>
                    </div>
                    <div className="navigator_link">
                        <Link to="/login">
                            <h4 style={{color:"rgb(189, 63, 63)"}}>Click here to login!</h4>
                        </Link>
                    </div>
            </div>
        )
    }
}

export default NotFound
