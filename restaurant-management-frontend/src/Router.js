import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Login from './landing/Login';
import Profile from './landing/Profile';
import Register from './landing/Register';
import EditProfile from './landing/EditProfile'
import Display from './builder/Display';
import ItemAdd from './builder/ItemAdd';
import ItemUpdate from './builder/ItemUpdate';
import Menu from './builder/Menu';
import NotFound from './NotFound';
const Router = ()=>(
    <BrowserRouter>
        {localStorage.length !== 0  ?
        <Switch>
            <Route path='/' exact component={App}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/profile/:id' exact component={Profile}/>
            <Route path='/editProfile/:id' component={EditProfile}/>
            <Route path='/display' exact component={Display}/>
            <Route path='/itemAdd' component={ItemAdd}/>
            <Route path='/menu/:id' component={Menu}/>
            <Route path='/itemUpdate/:id' component={ItemUpdate}/>
        </Switch>
            :
        <Switch>
            <Route path='/' exact component={App}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/display' exact component={Display}/>
            <Route path='/profile' component={NotFound}/>
            <Route path='/editProfile' component={NotFound}/>
            <Route path='/itemAdd' component={NotFound}/>
            <Route path='/menu' component={NotFound}/>
            <Route path='/itemUpdate/:id' component={NotFound}/>
        </Switch>
        }
    </BrowserRouter>
)

export default Router;