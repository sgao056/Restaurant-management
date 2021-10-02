import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Msg from '../Msg'

export class Item extends Component { 
    state={
        item : this.props.item
    }

    handleDelete = () => {
        fetch(`http://localhost:8002/api/v1/landings/me/menuItems/${this.state.item.id}`,{
                method:'DELETE'
        })
        .then(res=>res.json())
        .then(
            res=>{
                toast(<Msg message={"Page refresh in 3 seconds"}/>, {
                    onOpen: () => {toast.success("Deleted successfully")},
                    onClose: ()=>{window.location.reload();}
                  });
            }
        )  
    }

    render() {
        return (
            <div className="flex_box  col-4">
                <div className="item_box">
                    <div className="item_image relative_box flex_box">
                        <img className="" src={this.state.item.picture} alt="" />
                    </div>
                    <div>
                        <h4>{this.state.item.name}</h4>
                    </div>
                    <div> 
                        <h1 style={{color:"red"}}>${this.state.item.price}</h1>
                    </div>
                    <div className="item_intro_box">
                        <h6>{this.state.item.introduction}</h6>
                    </div>
                    {
                    localStorage.length !== 0  ?
                    <div className="item_button_box flex_box">
                        <Link to = {{pathname : "/itemUpdate/" + this.state.item.id, 
                                    state : {id : this.state.item.id}}}>
                            <button className="btn btn-primary item_button">
                                Update
                            </button>
                        </Link>
                        <button className="btn btn-danger item_button" onClick={this.handleDelete}>
                            Delete
                        </button>
                    </div>
                    : 
                    null
                    }
                </div>
            </div>
        )
    }
}

export default Item
