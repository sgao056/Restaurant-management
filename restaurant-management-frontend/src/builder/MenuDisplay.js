
import React, { Component } from 'react'
import Item from './Item'
import { Link } from 'react-router-dom' 

export class Menu extends Component {
    state = {
        items:[]
    }

    componentDidMount(){
        fetch ('http://localhost:8002/api/v1/landings/me/menuItems',{
            method:"GET"
        })
        .then(response=>response.json())
        .then(response=>{
            console.log(response.result)
                this.setState({
                    items : response.result
                })
        })
    }

    render() {
        return (
            <div className="item_list_box">
                <div className="item_menu_title">
                    <h1 className="text_middle">
                        Menu
                    </h1>
                    <div className="navigator_link add_dish">
                        {
                            localStorage.length !== 0  ?
                            // <Link to = '/itemAdd'>
                            <Link to ='/itemAdd'>
                                    <div>
                                        <h1 className="navigator_link">
                                        I want to add a new dish!
                                        </h1>
                                    </div>
                            </Link>
                            : 
                            null
                        }
                    </div>
                </div>
                <div className="row">
                {   
                    this.state.items.map((item, index=1)=>{
                        return (       
                                <Item item={item} key={item.id} index={index++}/>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default Menu
