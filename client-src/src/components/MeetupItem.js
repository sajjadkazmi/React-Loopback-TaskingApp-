import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class MeetupItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      item:props.item,
      details:'',
      users:[]
    }
  }

getUsers(){
  // let meetupId = this.props;
  axios.get(`http://localhost:3000/api/Users `)
  .then(response => {
    this.setState({users: response.data}, () => {
      console.log("checking Users",this.state.users);
      // console.log("checking Users****",meetupId);
    })
})
.catch(err => {});
}

  componentWillMount(){
    this.getMeetup();
    this.getUsers();
  }

  getMeetup(){
    let meetupId = this.props.item.id;
    axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
    .then(response => {
      this.setState({details: response.data}, () => {
        // console.log("meetupssssssssss",meetupId);
      })
  })
  .catch(err => console.log(err));
  }



  onDelete(){
    let meetupId = this.state.details.id;
    console.log("meetupss",meetupId)
    
    // axios.delete(` http://localhost:3000/api/tasks?filter[where][taskId]=${meetupId}`)

    axios.delete(`http://localhost:3000/api/meetups/${meetupId}`)
      .then(response => {
        window.parent.location = window.parent.location.href;
      }).catch(err => console.log(err));
  }
  
//   axios.delete(` http://localhost:3000/api/tasks?filter[where][taskId]=${meetupId}`)
//   .then(response => {
//     window.parent.location = window.parent.location.href;
//   }).catch(err => console.log(err));
// }
  render(){
    return (
      <li className="collection-item">
               
        <Link to={`/meetups/${this.state.item.id}`}> {this.state.item.name} </Link>
        <button className="btn red right" onClick={this.onDelete.bind(this)} >Delete</button>
      </li>
    )
  }
}

export default MeetupItem;