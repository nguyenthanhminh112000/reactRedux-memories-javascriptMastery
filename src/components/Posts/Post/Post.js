//import dependencies
import React, { useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import moment from 'moment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
// import files
import useStyles from './styles.js';
import { deletePost, likePost } from './../../../actions/posts.js';
import defaultPostImage from './../../../images/defaultPost.png';
console.log('Post outside');
const Post = ({ post, setCurrentId }) => {
  //using hooks
  console.log('Post inside');
  const user = JSON.parse(localStorage.getItem('auth'))?.authData;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Post inside useEffect');
  }, []);
  const classes = useStyles();
  // write likes component
  const Likes = () => {
    if (post.likes.length > 0) {
      //post have at least 1 person liked
      return post.likes.find(
        (like) => like === user?.result?.googleId || like === user?.result?.id
      ) ? (
        // I liked the post
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {post.likes.length > 2
            ? // i liked the post with at least 2 others
              `You and ${post.likes.length - 1} others`
            : `${post.likes.length > 1 ? 'You and another' : 'You'}`}
        </>
      ) : (
        // i didnt like the post
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    } else {
      // post have no one likes
      return (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;Like
        </>
      );
    }
  };

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
  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      {console.log('Post inside return')}
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile || defaultPostImage}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(post.createAt).fromNow()}
          </Typography>
        </div>

        {(user?.result?.id === post?.creator ||
          user?.result?.googleId === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: 'white' }}
              size='small'
              onClick={handleChangeCurrentId}
            >
              <MoreHorizIcon fontSize='default' />
            </Button>
          </div>
        )}
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
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user}
          onClick={handleLikePost}
        >
          <Likes />
        </Button>
        {(user?.result?.id === post?.creator ||
          user?.result?.id === post?.creator) && (
          <Button size='small' color='primary' onClick={handleDeletePost}>
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
