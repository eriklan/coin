import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import coinListStyle from './style'
import LoadingCircle from '../PlaceHolder/LoadingCircle';
import ErrorBar from '../PlaceHolder/ErrorBar';
import Grid from '@material-ui/core/Grid';
import Coin from './Coin';
import axios from 'axios'
import CoinListHeader from './CoinListHeader';
import SearchBar from './SearchBar';

export default function CoinList() {
  const classes = coinListStyle();
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    try {
      const fetchCoin = async () => {
        setIsLoading(true);
        const coinInfo = await 
        axios.get('https://api.coingecko.com/api/v3/coins/markets/', {
          params: {
            vs_currency: "aud",
            sparkline: true,
            ids: search,
            order: filter
          }
        })
        setCoins(coinInfo.data);
        setIsLoading(false);
      };
      fetchCoin()
    } catch (e) {
      setError(e.response.data.error)
    }
  }, [filter,search]);

  return (
    <Container>
      <div className={classes.list}>
        {isLoading && <LoadingCircle/>}
        {error && <ErrorBar error={error}/>}
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <SearchBar setSearch={setSearch}/>
        <CoinListHeader setFilter={setFilter}/>
          {coins.map((coin) => {
            return <Coin key={coin.id} coin={coin} />
          })}
        </Grid>
      </div>
    </Container>
  );
}