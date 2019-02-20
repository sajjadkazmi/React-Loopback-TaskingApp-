import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      token:''
    }
  }
 

 
 
//  getAccessToken(){
//   // let tasksIdd = this.props.match.params.id;
//   // console.log("tasksIdd",tasksIdd)
//   axios.get('http://localhost:3000/api/Users/login?access_token=rlgHykNsO0d5hi85QgIlqab4j2J9iBXYqIqwqwnWJFhCTBBGDjE4HSjJW4P14ZMc')
//     .then(res => {
//       this.setState({token: res.data}, () => {
//         console.log("Taskss",this.state);
//       })
//   })
//   .catch(err => console.log(err));
//  }
 
  // componentWillMount(){ 
  //   this.getAccessToken()
  //   console.log("checking access token",  this.getAccessToken())

  //   // console.log("checking params",this.props.match.params.taskId)
  // }

  submitUser(LoginUser) {
    var token = localStorage.getItem("token");
    // var userId=localStorage.getItem("userId");
    axios.request({
      method: 'post',
      url: `http://localhost:3000/api/Users/login?access_token=${token}`,
      data: LoginUser
    }).then(response => {
      localStorage.setItem('token',response.data.id)
      localStorage.setItem('userId',response.data.userId)
      console.log("login idd",response.data.userId)
      this.props.history.push(`/Meetups`);
    }).catch(err => {
      swal ( "Oops" ,  "Email or Password is incorrect!" ,  "error" )
    });
  }


  onSubmit(e){
    const LoginUser = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.submitUser(LoginUser);
    e.preventDefault();
  }


  render(){
    return (
   <div>
<h1>Login</h1>
<form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="email" ref="email" />
            <label htmlFor="email">email</label>
          </div>
          <div className="input-field">
            <input type="password" name="password" ref="password" />
            <label htmlFor="password">password</label>
          </div>
          <input type="submit" value="Login" className="btn" />
          <Link className="btn right" to="/signup">Create Account</Link>
        </form>
   </div>
    
    )
  }
}

export default Login;