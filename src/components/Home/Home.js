/////////import dependencies
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid } from '@material-ui/core';
/// import components
import Form from './../../components/Form/Form.js';
import Posts from './../../components/Posts/Posts.js';
//// import files
// import useStyle from './styles.js';
import { getPosts } from '../../actions/index.js';
console.log('Home outside');
const Home = () => {
  //   const classes = useStyle();
  ///////////using hooks
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Home inside useEffect ');
    dispatch(getPosts());
  }, [dispatch]);
  console.log('Home inside');
  /////////write functions
  return (
    <Grow in>
      <Container>
        <Grid
          //   className={classes.mainContainer}
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
            {console.log('Home inside return')}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
