/////////import dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
//// import files
import { getPostsBySearch } from '../../actions/posts.js';
/// import components
import Form from './../../components/Form/Form.js';
import Posts from './../../components/Posts/Posts.js';
import Pagination from '../Pagination.js';
// import useStyle from './styles.js';
import useStyles from './styles.js';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Home = () => {
  const classes = useStyles();
  ///////////using hooks
  ////state and variable
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  ////hooks variable
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const tagsQuery = query.get('tags');
  const dispatch = useDispatch();
  const history = useHistory();

  /////////write functions
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.which === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const searchPost = () => {
    if (search.trim() || (Array.isArray(tags) && tags.length !== 0)) {
      // search posts on the server
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${
          tags.join(',') || 'none'
        }`
      );
    } else {
      history.push('/');
    }
  };
  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          className={classes.gridContainer}
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={handleChangeSearch}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined'
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color='primary'
                variant='contained'
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} className={classes.pagination}>
              {searchQuery !== 'none' && tagsQuery !== 'none' && (
                <Pagination page={page} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
