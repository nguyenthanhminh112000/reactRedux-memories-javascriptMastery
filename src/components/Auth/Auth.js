import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
////// import from files
import useStyles from './styles';
import Input from './Input.js';
import Icon from './Icon.js';
import { signin, signup } from '../../actions/auth.js';
console.log('Auth outside');
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const Auth = () => {
  //// using hooks
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Auth inside useEffect');
  }, []);
  //// write functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSwitchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };
  const googleSuccess = (res) => {
    console.log('Google sign in was success');
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', payload: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log('Google sign in was failure');
    console.log(error);
  };
  console.log('Auth inside');
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        {console.log('Auth inside return')}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Confirm'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign in'}
          </Button>
          <GoogleLogin
            clientId='189183990952-ssg3k5ogenc2ov487viubr0n33nieuh0.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                className='classes.googleButton'
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={handleSwitchMode}>
                {isSignup
                  ? 'Already have an account, Sign In ?'
                  : "Don't have an account, Sign up?"}
              </Button>
            </Grid>
          </Grid>
          <Link to='/'>Home</Link>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
