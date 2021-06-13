import React, { useEffect } from 'react';
import Post from './Post/Post.js';
import { useSelector } from 'react-redux';
// import styles
import useStyles from './styles.js';

console.log('Posts outside');
const Posts = () => {
  useEffect(() => {
    console.log('Posts inside useEffect ');
  }, []);
  const posts = useSelector((state) => state.posts);
  console.log('Posts inside');
  const classes = useStyles();
  console.log(posts);
  return (
    <>
      {console.log('Posts inside return')}
      <div>Posts</div>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
