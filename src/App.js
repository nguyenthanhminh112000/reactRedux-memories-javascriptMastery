// import dependencies
import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import Components
import Form from './components/Form/Form.js';
import Posts from './components/Posts/Posts.js';
// import styles
import useStyles from './styles.js';
// import file
import { getPosts } from './actions/index.js';
import memories from './images/memories.png';
console.log('App outside');
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('App inside useEffect ');
    dispatch(getPosts());
  }, []);
  const classes = useStyles();
  console.log('App inside');
  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h1' align='center'>
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='60'
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      {console.log('App inside return')}
    </Container>
  );
};

export default App;
