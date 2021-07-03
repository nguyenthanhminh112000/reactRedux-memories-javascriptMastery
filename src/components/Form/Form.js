import React, { useEffect, useState } from 'react';
import { TextField, Typography, Paper, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
// import files
import { createPost, updatePost } from './../../actions/posts.js';
// import styles
import useStyles from './styles.js';
console.log('Form outside');
const Form = ({ currentId, setCurrentId }) => {
  // using hooks
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem('auth'))?.authData;
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
  // const handleValidForm = () => {
  //   setPostData({
  //     ...postData,
  //     tags: postData.tags.map((tag) => tag.replaceAll(' ', '')),
  //   });

  //   for (let i = 0; i < postData.length; i++) {
  //     if (!postData.tags[i]) {
  //       postData.splice(i);
  //     }
  //   }
  //   console.log('------------------From handleValidForm', postData);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    // handleValidForm();
    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          name: user?.result?.name,
        })
      );
    } else {
      dispatch(
        createPost({
          ...postData,
          name: user?.result?.name,
        })
      );
    }
    handleClearForm();
  };
  const handleFormChange = (e) => {
    const field = e.target.name;
    switch (field) {
      case 'title':
        setPostData({ ...postData, title: e.target.value });
        break;
      case 'message':
        setPostData({ ...postData, message: e.target.value });
        break;
      case 'tags':
        setPostData({
          ...postData,
          tags: e.target.value.split(','),
        });

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
      title: '',
      message: '',
      tags: [],
      selectedFile: '',
    });
    setCurrentId(null);
  };
  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
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
            name='title'
            variant='outlined'
            label='Title'
            fullWidth
            value={postData.title}
            onChange={handleFormChange}
          />
          <TextField
            name='tags'
            variant='outlined'
            label='Tags(separated by comma)'
            fullWidth
            value={postData.tags}
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
