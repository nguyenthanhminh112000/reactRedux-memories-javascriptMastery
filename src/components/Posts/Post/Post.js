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
// import styles
import useStyles from './styles.js';
console.log('Post outside');
const Post = ({ post, setCurrentId }) => {
  //using hooks
  console.log('Post inside');
  console.log(post);
  useEffect(() => {
    console.log('Post inside useEffect');
  }, []);
  const classes = useStyles();
  //write functions and features
  const handleSomething = () => {};
  const handleChangeCurrentId = () => {
    setCurrentId(post._id);
  };
  return (
    <Card className={classes.card}>
      {console.log('Post inside return')}
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
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
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant='h5' className={classes.title} gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={() => {}}>
          <ThumbUpAltIcon fontSize='small' /> Like {post.likeCount}{' '}
        </Button>
        <Button size='small' color='primary' onClick={() => {}}>
          <DeleteIcon fontSize='small' /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
