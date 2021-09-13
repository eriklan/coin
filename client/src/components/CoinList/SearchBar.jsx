import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import coinListStyle from './style'

export default function SearchBar(props) {
  const classes = coinListStyle();

  const [search, setSearch] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    props.setSearch(search)
  };

  return (
    <Paper component="form" className={classes.searchBar} onSubmit={submitHandler}>
      <InputBase
        className={classes.searchInput}
        placeholder="Search Coin"
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton type="submit"  aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}