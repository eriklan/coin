import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import coinListStyle from './style'
import { Button } from '@material-ui/core';

export default function CoinListHeader(props) {
  const classes = coinListStyle();
  const filter = props.filter
  const setFiter = props.setFilter
  const setPage = props.setPage

  const onclickOrderByNameHandler = () => {
    setFiter({name: 'id', asc: !filter.asc})
    setPage(1)
  }

  const onclickOrderByCapHandler = () => {
    setFiter({name: 'market_cap', asc: !filter.asc})
    setPage(1)
  }

  const onclickOrderByPriceHandler = () => {
    setFiter({name: 'current_price', asc: !filter.asc})
    setPage(1)
  }

  return (
    <>
      <Grid xs={12} className={classes.coinContainer}>
        <List disablePadding >
          <ListItem className={classes.coinList}>

          <Grid md={1}>
          <Button>            
          <Typography variant="h6">
              SAVED
            </Typography>
            </Button>
           </Grid>

          <Grid md={1}>
            <Typography variant="h6">
            RANK
            </Typography>
          </Grid>

          <Grid md={1}>
          <Typography variant="h6">
            ICON
            </Typography>
          </Grid>

          <Grid md={2}>
          <Button onClick={() => onclickOrderByNameHandler()}>
            <Typography variant="h6">
              NAME
            </Typography>
            </Button>
          </Grid>

          <Grid md={2}>
          <Button onClick={() => onclickOrderByCapHandler()}>
            <Typography variant="h6">
              MARKET CAP
            </Typography>
            </Button>
          </Grid>

          <Grid md={2}>
          <Button onClick={() => onclickOrderByPriceHandler()}>
            <Typography variant="h6">
              CURRENT PRICE
            </Typography>
          </Button>
          </Grid>

          <Grid md={2}>
            <Typography variant="h6" 
            color="textPrimary">
              PRICE CHANGE 24h
            </Typography>
          </Grid>

          <Grid md={2}>
          <Typography variant="h6">
            PRICE CHANGE 7d
          </Typography>
          </Grid>
            
          </ListItem>
          <Divider disablePadding/>
        </List>
      </Grid>
    </>
  )
}
