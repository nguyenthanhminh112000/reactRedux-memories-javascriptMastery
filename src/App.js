// import dependencies
import React, { useEffect, useState } from 'react';
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
  //using hooks
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('App inside useEffect ');
    dispatch(getPosts());
  }, [dispatch]);
  console.log('App inside');
  const classes = useStyles();
  // write functions

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
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      {console.log('App inside return')}
    </Container>
  );
};

export default App;
