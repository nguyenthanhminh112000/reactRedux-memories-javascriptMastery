import React, { useEffect } from 'react';
import memoriesLogo from './../../images/memories-Logo.png';
import memoriesText from './../../images/memories-Text.png';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles.js';
const Navbar = () => {
  /// using hooks
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.auth?.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  });
  ////// write functions
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='logoText' height='45px' />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='logo'
          height='40px'
        />
      </Link>
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
