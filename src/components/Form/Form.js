import React, { useEffect, useState } from 'react';
import { TextField, Typography, Paper, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
// import files
import { createPost, updatePost } from './../../actions/index.js';
// import styles
import useStyles from './styles.js';
console.log('Form outside');
const Form = ({ currentId, setCurrentId }) => {
  // using hooks
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  useEffect(() => {
    console.log('Form inside useEffect ');
    if (post) {
      setPostData(post);
    }
  }, [post]);
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log('Form inside');
  // write functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    handleClearForm();
  };
  const handleFormChange = (e) => {
    const field = e.target.name;
    switch (field) {
      case 'creator':
        setPostData({ ...postData, creator: e.target.value });
        break;
      case 'title':
        setPostData({ ...postData, title: e.target.value });
        break;
      case 'message':
        setPostData({ ...postData, message: e.target.value });
        break;
      case 'tags':
        setPostData({ ...postData, tags: e.target.value });
        break;
      default:
        break;
    }
    console.log('form is changed');
  };
  const handleFileInput = ({ base64 }) => {
    setPostData({ ...postData, selectedFile: base64 });
    console.log('file is changed');
  };
  const handleClearForm = () => {
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: [],
      selectedFile: '',
    });
    setCurrentId(null);
  };
  console.log(postData);
  return (
    <div>
      {console.log('Form inside return')}

      <Paper className={classes.paper}>
        <form
          autoComplete='off'
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant='h6'>
            {currentId ? 'Editing' : 'Creating'} a Memory
          </Typography>
          <TextField
            name='creator'
            variant='outlined'
            label='Creator'
            fullWidth
            value={postData.creator}
            onChange={handleFormChange}
          />
          <TextField
            name='title'
            variant='outlined'
            label='Title'
            fullWidth
            value={postData.title}
            onChange={handleFormChange}
          />
          <TextField
            name='message'
            variant='outlined'
            label='Message'
            fullWidth
            value={postData.message}
            onChange={handleFormChange}
          />
          <TextField
            name='tags'
            variant='outlined'
            label='Tags'
            fullWidth
            value={postData.tags}
            onChange={handleFormChange}
          />
          <div className={classes.fileInput}>
            <FileBase type='file' multiple={false} onDone={handleFileInput} />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            fullWidth
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='small'
            onClick={handleClearForm}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
