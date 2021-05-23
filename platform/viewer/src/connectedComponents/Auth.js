/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import { withRouter  } from "react-router-dom";
import avatar from './avatar.png'

import axios from 'axios';
import './auth.css'
import { AuthContext } from '../context/authContext';
import ConnectedHeader from './ConnectedHeader';

class Auth extends Component {

    static contextType= AuthContext;


   nextPath(path) {
    this.props.history.push(path);
  }
  state = {
      email : '',
      password:'',
    };
    handleSubmit= (event)=> {
        event.preventDefault()
        const data=this.state;
        console.log('data :', data);
        axios.post('https://serverdicom.herokuapp.com/users/login',data)
       .then((res)=> {console.log(res.data)
           if(res.data.status){
                localStorage.setItem('email',this.state.email);
               window.location.reload(false);
           }
           if(!res.data.status){
               alert(res.data.message)
           }
          });

 }

    handleChange= (event)=> {
        event.preventDefault()
   this.setState({[event.target.name]: event.target.value});

 }

    render() {
        return <> <ConnectedHeader/> <div className="container" ><div className="card-items">

            <div className="card-login">
                <div className='avatar'>
                <img src={avatar} className='av' width='100px' height='100px' />
                </div>
        <div className="block">
            <div className="input-t">

                <label className="text">Login</label>

                <div className="content">
                <input type="text" className="form__field" placeholder="Email" name="email" onChange={this. handleChange}></input>


             <input type="password" className="form__field" placeholder="Password" name="password" onChange={this. handleChange}></input>
             </div>
             <div className="footer-login ">



             <button className='btn-first' onClick={this.handleSubmit}>Log In</button >


             </div>

             </div>

             <div className="hrl"></div>
             <div className="align">
             <div className="create-account">
             <span className='log' onClick={() => this.nextPath('/auth/signup')}>Create an account</span>
              <span className='log' onClick={() => this.nextPath('/auth/forgot')}>Forgot password?</span>
             </div>
             <div className="create-account">

             </div>
             </div>
             </div>
             </div>

             </div></div></>;

    }
}
export default withRouter(Auth);
