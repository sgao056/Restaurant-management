import React, {Component} from 'react';
import MenuDisplay from './MenuDisplay';

export default class Display extends Component {
    state = {
        landingData: null
    };

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {/*<HeadSectionEdit data={?}/>*/}
                <div style = {{height: '300px'}}> Head Section </div>
                {/*  Feature section edit component  */}
               <div style = {{height: '300px'}}> Feature section </div> 
                <MenuDisplay/>
            </div>
        );
    }
}
