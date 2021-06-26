// import dependencies
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Components
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
// import file
console.log('App outside');
const App = () => {
  console.log('App inside');
  return (
    <Router>
      {console.log('App inside return')}
      <Container maxWidth='lg'>
        <Navbar />
        <Switch>
          <Route path='/auth' exact component={Auth} />
          <Route path='/' component={Home} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
