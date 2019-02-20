import React, { Component } from 'react';
import axios from 'axios';

class AddMeetup extends Component{
  addMeetup(newMeetup){
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/meetups',
      data: newMeetup
    }).then(response => {
      console.log("checking response",response)
      this.props.history.push(`/Meetups/${response.data.id}`);
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    var DATEE =new Date();
    var hours= DATEE.getHours()
    var min =DATEE.getMinutes()
    var day = DATEE.getDate()
    var month= DATEE.getMonth()
    var year = DATEE.getFullYear()
    var date=day+"-"+month+1 +"-"+year+" "+hours +":"+ min ;

    const newMeetup = {
      name:date
    }
    this.addMeetup(newMeetup);
    e.preventDefault();
    console.log("check namess",newMeetup)
  }

  render(){

    return (
     <div>
        <br />
       <form onSubmit={this.onSubmit.bind(this)}>
          <input type="submit" value="Add New Task Sheet" className="btn" />
        </form>
      </div>
    )
  }
}

export default AddMeetup;