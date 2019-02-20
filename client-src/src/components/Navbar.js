import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
class Navbar extends Component{
  logout() {
    var token = localStorage.getItem("token");
    axios.request({
      method: 'post',
      url: `http://localhost:3000/api/Users/logout?access_token=${token}`,
    }).then(response => {
            window.parent.location = window.parent.location.href;
            localStorage.clear();
      // this.props.history.push('/');  
    }).catch(err => swal ( "Oops" ,  "Login first!" ,  "error" ));
   
  }
  
  render(){
    return (
      <div>
        <nav className="blue darken-3">
          <div className="nav-wrapper">
            <a href="/Meetups" className="brand-logo center">Task APP</a>
            <a data-activates="main-menu" className="button-collapse show-on-large">
              <i className="fa fa-bars"></i>
              </a>
              <ul className="right hide-on-small-only">
              <li><Link to="/Meetups"><i className="fa fa-users"></i> Home</Link></li>         
            </ul>
            <ul className="side-nav" id="main-menu">
            <li><Link to="/Meetups"><i className="fa fa-users"></i> Task App</Link></li>  
            <li><Link to="/meetups/add"><i className="fa fa-plus"></i> New TaskSheet</Link></li>  
            <li><Link to="/about"><i className="fa fa-question-circle"></i> About</Link></li> 
            <li><Link to="/" onClick={this.logout.bind(this)}><i className="fa fa-sign-out">   </i> Logout</Link></li> 
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;