/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import { withRouter  } from "react-router-dom";
import './auth.css'

class AuthForgot extends Component {

   nextPath(path) {
    this.props.history.push(path);
  }

    render() {
        return <div className="container" ><div className="card-items">

            <div className="card-forgot">
        <div className="block">
            <div className="input-t">
                <div className="top-login">
                <label className="text-forgot"><center>Forgot Password</center></label>
                </div>
                <div className="content">
                <input type="email" className="form__field" placeholder="Email"></input>



             </div>
             <div className="footer-login ">



             <button className='btn-first' onClick={() => this.nextPath('/')}>Send</button>


             </div>

             </div>

             <div className="hrl"></div>
             <div className="align">
             <div className="create-account">
             <span onClick={() => this.nextPath('/')}>Log In</span>

             </div>
             <div className="create-account">

             </div>
             </div>
             </div>
             </div>

             </div></div>;

    }
}
export default withRouter(AuthForgot);
