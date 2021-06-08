import React from 'react';
import Post from './Post/Post.js';
// import styles
import useStyles from './styles.js';
const Posts = () => {
  const classes = useStyles();
  return (
    <>
      <div>Posts</div>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
