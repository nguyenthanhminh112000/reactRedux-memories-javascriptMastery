import React, { useEffect } from 'react';
import memories from './../../images/memories.png';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles.js';
console.log('Navbar outside');
const Navbar = () => {
  /// using hooks
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.auth?.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Navbar inside useEffect');
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  });
  console.log('Navbar inside');
  ////// write functions
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h1'
          align='center'
        >
          Memories
          {console.log('Navbar inside return')}
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='60'
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
