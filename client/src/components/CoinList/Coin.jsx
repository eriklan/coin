import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import coinListStyle from './style'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

const Coin = ({ coin }) => {
  const classes = coinListStyle();
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2
  })
  return (

    <Grid xs={12} className={classes.coinContainer}>
      <List disablePadding >
        <ListItem button className={classes.coinList}>

        <Grid md={1}>
          <StarOutlineIcon/>
        </Grid>

        <Grid md={1}>
          <Typography variant="body">
          {coin.market_cap_rank}
          </Typography>
        </Grid>
        <Grid md={1}>
          <img className={classes.coinImage} src={coin.image} alt={coin.name} />
        </Grid>

        <Grid md={2}>
          <Typography variant="body">
            {coin.name}
          </Typography>
        </Grid>

        <Grid md={2}>
          <Typography variant="body">
            {formatter.format(coin.market_cap)}
          </Typography>
        </Grid>

        <Grid md={2}>
          <Typography variant="body">
            {formatter.format(coin.current_price)}
          </Typography>
        </Grid>

        <Grid md={2}>
          <Typography variant="body" 
          color="textPrimary">
            {coin.price_change_percentage_24h}%
          </Typography>
        </Grid>

        <Grid md={2}>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine 
          color={(coin.price_change_percentage_24h > 0 ) 
          ? 'green' : 'red'}/>
        </Sparklines>
        </Grid>
          
        </ListItem>
        <Divider disablePadding/>
      </List>
    </Grid>
  );
};

export default Coin;