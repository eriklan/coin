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
import Pagination from '../Pagination/Pagination';

export default function CoinList() {
  const classes = coinListStyle();
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({filter: null, asc: true});
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);

  const propComparator = (propName, asc) => (a, b) =>  {
    if(asc === true) {
      return (
        (a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? 1 : -1)
      )
    } else {
      return (
        (a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1)
      )
    }
  }

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
            page: page,
            per_page:10,
          }
        })
        setCoins(coinInfo.data);
        setIsLoading(false);
      };
      fetchCoin()
    } catch (e) {
      setError(e.response.data.error)
    }
  }, [page, search, filter]);

  return (
    <Container>
      <div className={classes.list}>
        {isLoading && <LoadingCircle/>}
        {error && <ErrorBar error={error}/>}
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <SearchBar setSearch={setSearch}/>
        <CoinListHeader 
        filter={filter} setFilter={setFilter} setPage={setPage}/>
          {coins.sort(propComparator(filter.name, filter.asc))
          .map((coin) => {
            return <Coin key={coin.id} coin={coin} />
          })}
        </Grid>
        {coins.length >= 10 && (
          <Pagination 
          setPage={setPage}
          currentPage={page}
          />
        )}
      </div>
    </Container>
  );
}