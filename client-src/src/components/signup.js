import React, { Component } from 'react';
import axios from 'axios';

import swal from 'sweetalert';

class SignUp extends Component{
 
  addMeetup(SignUpUser){
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/Users',
      data: SignUpUser
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => {
      
      swal ( "Oops" ,  "Please provide valid Email Address" ,  "error" )
    });
  }

  onSubmit(e){
    const SignUpUser = {
      realm: this.refs.realm.value,
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.addMeetup(SignUpUser);
    e.preventDefault();
  }


  render(){
    return (
   <div>
<h1>SignUp</h1>
<form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="realm" ref="realm" />
            <label htmlFor="realm">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="email" ref="email" />
            <label htmlFor="email">email</label>
          </div>
          <div className="input-field">
            <input type="text" name="username" ref="username" />
            <label htmlFor="username">User Name</label>
          </div>
          <div className="input-field">
            <input type="password" name="password" ref="password" />
            <label htmlFor="password">password</label>
          </div>
          <input type="submit" value="Signup" className="btn" />
        </form>
   </div>
    
    )
  }
}

export default SignUp;