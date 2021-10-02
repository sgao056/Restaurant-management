import React, { Component } from 'react'
import { toast } from 'react-toastify';

export class ItemAdd extends Component {
    state = {
        formData: {
            name: '',
            introduction: '',
            price: '',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/-Insert_image_here-.svg/320px--Insert_image_here-.svg.png',
            landing_id: ''
        },
        errors:{
            name: '',
            introduction: '',
            price: '',
            picture: ''
        }
    };
    
    inputChangeHandler = (event) => {
        event.preventDefault();
        let target = event.target;

        this.setState({
            formData: {...this.state.formData, [target.name]: target.value}
        });
    };

    
    onSubmitHandler = (event) => {
        event.preventDefault();
        const errors = this.validate()
        if (Object.keys(errors).length === 0) {
                fetch('http://localhost:8002/api/v1/landings/me/menuItems',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.state.formData)
                })
                .then(response => {
                    if (!response.ok) {
                        this.setState({
                            errors: {
                                price: 'price must be a number!'
                            }
                        })
                        throw new Error("Internal Server Error. Wrong input.")
                    }
                    return response.json()
                  })
                .then(
                    res=>{
                        toast.success("Created successful");
                        this.props.history.push(`/display`)
                    }
                ).catch((error) => {
                    this.setState({
                      ...this.state,
                      response: error.message
                    })
                  }) 
            }   
        else {
            this.setState({
                errors: errors
            })
        }
    };

    validate = () => {
        let errors = {}
        if (this.state.formData.price.trim() === "") {
          errors.price = "price is required"
        }
        if (this.state.formData.name.trim() === "") {
          errors.name = "name is required"
        }
        if (this.state.formData.introduction.trim() === "") {
            errors.introduction = "introduction is required"
          }
        if (this.state.formData.picture.trim() === "") {
            errors.picture = "picture is required"
        }
        return errors
      }
    
    render() {
        return (
            <div>
                <div className="item_update_title">
                    <h1>
                        Add new dish
                    </h1>
                </div>
                <div className="row">
                    <div className="container col-6 flex_box">
                        <div className="item_box_update">
                            <div className="item_image relative_box flex_box">
                                <img src={this.state.formData.picture}/>
                            </div>
                            <div>
                                <h4>{this.state.formData.name}</h4>
                            </div>
                            <div> 
                                <h1 style={{color:"red"}}>${this.state.formData.price}</h1>
                            </div>
                            <div className="item_intro_box">
                                <h6>{this.state.formData.introduction}</h6>
                            </div>
                            <div className="item_button_box flex_box">
                                    <button className="btn btn-primary item_button">
                                        Update
                                    </button>
                                <button className="btn btn-danger item_button" onClick={this.handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            name='name' 
                                            onChange={this.inputChangeHandler}
                                            id="name" 
                                            value={this.state.formData.name}/>
                                        </div>
                                        <div className="col-5 warning">
                                            {this.state.errors.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="introduction">Introduction</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            name='introduction' 
                                            onChange={this.inputChangeHandler}
                                            id="introduction" 
                                            value={this.state.formData.introduction}/>
                                        </div>
                                        <div className="col-5 warning">
                                            {this.state.errors.introduction}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            name='price' 
                                            onChange={this.inputChangeHandler}
                                            id="price" 
                                            value={this.state.formData.price}/>
                                        </div>
                                        <div className="col-5 warning">
                                            {this.state.errors.price}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="background">Background Image</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            name='picture' 
                                            onChange={this.inputChangeHandler}
                                            id="picture" 
                                            value={this.state.formData.picture}/>
                                        </div>
                                        <div className="col-5 warning">
                                            {this.state.errors.picture}
                                        </div>
                                    </div>
                                </div>
                                <button className='btn btn-primary btn_update' type={'submit'}>
                                    <h1>
                                        Add my dish
                                    </h1>
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemAdd
