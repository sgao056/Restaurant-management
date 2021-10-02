import React, { Component } from 'react'

export class Msg extends Component {
    render() {
        return (
            <div>
                {this.props.message}
            </div>
        )
    }
}

export default Msg
