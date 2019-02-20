import React, { Component } from 'react';
import axios from 'axios';

var $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );


class MeetupDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:'',
      data:[],
      id:'',
      name:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
//Fetching Data then putting into datatable
  componentDidMount() {
    let tasksIdd = this.props.match.params.id;
    console.log("tasksIdd***",tasksIdd)
    $.ajax({
       url: `http://localhost:3000/api/tasks?filter[where][taskId]=${tasksIdd}`,
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {
         
         this.setState({data: data});
         console.log("checking data",this.state)
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
       }
    })
    $(document).ready(function() {
      setTimeout(function(){ 
        $('#example').DataTable({
          "deferRender": true  
        })
       }, 400); 
});
  }
//Adding tasks
componentWillMount(){
    this.getMeetup();
  }

  getMeetup(){
    let meetupId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
    .then(response => {
      this.setState({
        details: response.data,
        id: response.data.id,
        name: response.data.name, 
      }, () => {
        console.log("check editing",this.state);
      })
  })
  .catch(err => console.log(err));
  }

  addTask(newTask){
    let pageId = this.props.match.params.id;
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/tasks',
      data: newTask
    }).then(response => {
      this.props.history.push('/meetups');
      // window.parent.location = window.parent.location.href;
      this.props.history.push(`/meetups/${pageId}`);
      
    }).catch(err => console.log(err));
  }

  onSubmit(e){
let taskss=this.props.match.params.id
    const newTask = {
      tasks: this.refs.tasks.value,
      taskId:taskss
      // id:taskss
     
    }
    this.addTask(newTask);
    e.preventDefault(null);
  }

  //Edit TaskSheeet work

  editMeetup(newMeetup){
    axios.request({
      method:'put',
      url:`http://localhost:3000/api/meetups/${this.state.id}`,
      data: newMeetup
    }).then(response => {
      // setTimeout(function(){ 
      //   window.parent.location = window.parent.location.href;

        
      // }, 300);
      this.props.history.push(`/meetups}`);
      this.props.history.push(`/meetups/${this.state.id}`);
      
    }).catch(err => console.log(err));
  }

  onSubmitting(e){
    var userIdd=localStorage.getItem('userId');
    const newMeetup = {
      name: this.refs.name.value,
      UserId:userIdd
    }
    this.editMeetup(newMeetup);
    e.preventDefault();
  }

  handleInputChange(e){
    const target = e.target;
    let value = target.value;
    let name = target.name;    
    this.setState({
      [name]: value
    });
  }




  render(){
    return (

      <div>
        <br/>
       <h3><b><i><center>{this.state.details.name}</center></i></b> </h3>
        <div>
        <form onSubmit={this.onSubmitting.bind(this)}>
          <div className="input-field">
            <b>Change Name?</b><input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange}  />
          </div>
          <input type="submit" value="Save Name" className="btn" />
        </form>
        </div>
      


       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="tasks" ref="tasks"/>
            <label htmlFor="tasks">Enter a task</label>
          </div>


          <input type="submit" value="Add Task" className="btn" />
          
        </form>
        
  
<div>
<table  id="example" className="display">
        <thead>
            <tr>
                <th>Index</th>
                <th>Tasks</th>
                <th>DateTime</th>
            </tr>
        </thead>
        <tbody>{this.state.data.map(function(item, key) {
               
                 return (
                    <tr key = {key}>
                        <td>{key+1}</td>
                        <td>{item.tasks}</td>
                        <td>{item.dateTime}</td>
                    </tr>
                  )
               
               })}</tbody>
         </table>
         </div>
    
 
      </div>
    )
  
  }
  
  //  dataSet =[{"tasks":"login logout functionality achieved","dateTime":"2019-02-08T15:46:59.843Z","taskId":29,"id":129},{"tasks":"database connected","dateTime":"2019-02-08T15:47:43.667Z","taskId":30,"id":130},{"tasks":"authentication done","dateTime":"2019-02-08T15:47:53.430Z","taskId":30,"id":131},{"tasks":"mssql configuration creating problem","dateTime":"2019-02-08T15:48:19.397Z","taskId":30,"id":132},{"tasks":"have to resolve mssql configuration setup","dateTime":"2019-02-08T15:48:35.010Z","taskId":30,"id":133},{"tasks":"afas","dateTime":"2019-02-08T16:01:45.333Z","taskId":33,"id":134},{"tasks":"fdewf","dateTime":"2019-02-08T16:02:03.107Z","taskId":33,"id":135},{"tasks":"saaaaaaa","dateTime":"2019-02-08T16:02:12.153Z","taskId":33,"id":136},{"tasks":"olaaa","dateTime":"2019-02-08T16:14:19.410Z","taskId":34,"id":137},{"tasks":"esacas","dateTime":"2019-02-11T08:37:07.883Z","taskId":40,"id":138},{"tasks":"sajjad","dateTime":"2019-02-11T11:56:20.597Z","taskId":30,"id":139},{"tasks":"sacsac","dateTime":"2019-02-11T12:38:51.767Z","taskId":49,"id":140},{"tasks":"cascs","dateTime":"2019-02-11T12:38:54.043Z","taskId":49,"id":141},{"tasks":"hello daddey","dateTime":"2019-02-11T13:15:02.127Z","taskId":30,"id":142},{"tasks":"checking","dateTime":"2019-02-11T14:57:31.700Z","taskId":30,"id":143},{"tasks":"hello","dateTime":"2019-02-11T15:04:15.897Z","taskId":36,"id":144},{"tasks":"nasd","dateTime":"2019-02-11T15:50:36.913Z","taskId":30,"id":145},{"tasks":"hello","dateTime":"2019-02-12T08:57:09.813Z","taskId":30,"id":146},{"tasks":"abcd","dateTime":"2019-02-12T08:59:50.283Z","taskId":30,"id":147},{"tasks":"yahoo","dateTime":"2019-02-12T11:16:52.987Z","taskId":36,"id":148},{"tasks":"edit time stamamping","dateTime":"2019-02-12T11:27:33.753Z","taskId":53,"id":149},{"tasks":"hello dada","dateTime":"2019-02-12T11:31:22.657Z","taskId":53,"id":150}]

}

export default MeetupDetails;