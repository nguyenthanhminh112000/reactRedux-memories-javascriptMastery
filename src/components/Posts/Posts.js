import React from 'react';
import Post from './Post/Post.js';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
// import styles
import useStyles from './styles.js';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  if (!isLoading && !posts.length) {
    return <div>No posts</div>;
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
