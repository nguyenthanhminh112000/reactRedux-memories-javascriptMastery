import React, { useEffect } from 'react';
// import styles
import useStyles from './styles.js';
console.log('Post outside');
const Post = () => {
  console.log('Post inside');
  useEffect(() => {
    console.log('Post inside useEffect');
  }, []);
  const classes = useStyles();
  return (
    <div>
      {console.log('Post inside return')}
      Post
    </div>
  );
};

export default Post;
