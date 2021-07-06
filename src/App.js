// import dependencies
import React from 'react';
import { Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Components
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/PostDetails/PostDetails.js';
// import file
console.log('App outside');
const App = () => {
  console.log('App inside');
  const user = useSelector((state) => state.auth?.authData);
  // const user = JSON.parse(localStorage.getItem('auth'));
  return (
    <Router>
      {console.log('App inside return')}
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route
            path='/auth'
            exact
            render={() => (!user ? <Auth /> : <Redirect to='/posts' />)}
          />
          <Route path='/posts' exact render={() => <Home />} />
          <Route path='/posts/search' exact render={() => <Home />} />
          <Route path='/posts/:id' exact render={() => <PostDetails />} />
          <Route path='/' render={() => <Redirect to='/posts' />} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
