import React, { Component } from 'react';
import axios from 'axios';
import MeetupItem from './MeetupItem';

class Meetups extends Component{
  constructor(){
    super();
    this.state = {
      meetups: [],
      user:[]
    }
  }
  componentWillMount(){
    this.getMeetups();

  }
  getMeetups(){
    var userIdd=localStorage.getItem('userId');
    console.log("checking user idd",userIdd)
    axios.get(`http://localhost:3000/api/meetups?filter[where][UserId]=${userIdd}`)
      .then(response => {
        this.setState({meetups: response.data}, () => {
        })
        console.log("response**",response.data)
    })
    .catch(err => console.log(err));
  }
  

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
    var userIdd = localStorage.getItem("userId");
    console.log("getting user id",userIdd)
    const newMeetup = {
      name:date,
      UserId:userIdd
    }
    this.addMeetup(newMeetup);
    e.preventDefault();
    console.log("check namess",newMeetup)
  }
  
 render(){
    const meetupItems = this.state.meetups.map((meetup, i) => {
      return(
        <MeetupItem key={meetup.id} item={meetup} />
      )
    })
    return (
      <div>
 <div className="fixed-action-btn">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="submit" value='+' className="btn-floating btn-large red fa-plus" />
        </form>
        </div>
        <h1><center>Task Sheets</center></h1>
        <ul className="collection">
          {meetupItems}
        </ul>
      </div>
    )
  }
}

export default Meetups;