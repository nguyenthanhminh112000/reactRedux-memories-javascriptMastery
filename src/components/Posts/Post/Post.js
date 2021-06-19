//import dependencies
import React, { useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
// import files
import useStyles from './styles.js';
import { deletePost, likePost } from './../../../actions/index.js';
import defaultPostImage from './../../../images/defaultPost.png';
console.log('Post outside');
const Post = ({ post, setCurrentId }) => {
  //using hooks
  console.log('Post inside');
  console.log(post);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Post inside useEffect');
  }, []);
  const classes = useStyles();
  //write functions and features

  const handleChangeCurrentId = () => {
    setCurrentId(post._id);
  };
  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
  };
  const handleLikePost = () => {
    dispatch(likePost(post._id));
  };
  return (
    <Card className={classes.card}>
      {console.log('Post inside return')}
      <CardMedia
        className={classes.media}
        image={post.selectedFile || defaultPostImage}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>
          {moment(post.createAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size='small'
          onClick={handleChangeCurrentId}
        >
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>

      <div>
        <Typography variant='h5' className={classes.title} gutterBottom>
          {post.title}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={handleLikePost}>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like {post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={handleDeletePost}>
          <DeleteIcon fontSize='small' /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
