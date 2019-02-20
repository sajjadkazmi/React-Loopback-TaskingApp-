import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meetups from './meetups';
import About from './About';
import MeetupDetails from './MeetupDetails';
import AddMeetup from './AddMeetup';
// import EditMeetup from './EditMeetup';
import Login from './Login';
import SignUp from './signup';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login} />
      {/* <Route exact path='/gettingTask' component={GettingTask} /> */}
      <Route exact path='/about' component={About} />
      <Route exact path='/meetups/add' component={AddMeetup} />
      {/* <Route exact path='/meetups/edit/:id' component={EditMeetup} /> */}
      <Route exact path='/meetups/:id' component={MeetupDetails} />
      <Route exact path='/Meetups' component={Meetups} /> 
      <Route exact path='/signup' component={SignUp} /> 
    </Switch>
  </main>
)

export default Main;