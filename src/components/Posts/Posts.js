import React, { useEffect } from 'react';
import Post from './Post/Post.js';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
// import styles
import useStyles from './styles.js';

console.log('Posts outside');
const Posts = ({ setCurrentId }) => {
  useEffect(() => {
    console.log('Posts inside useEffect ');
  }, []);
  const posts = useSelector((state) => state.posts);
  console.log('Posts inside');
  const classes = useStyles();
  console.log(posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {console.log('Posts inside return')}
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
