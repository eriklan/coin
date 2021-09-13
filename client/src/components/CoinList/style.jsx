import { makeStyles } from '@material-ui/core/styles';

const coinListStyle = makeStyles(() => ({
  list: {
    width: '100%',
    height: '90vh',
  },
  coinImage: {
    width: 40,
  },
  coinContainer: {
    display: 'table-row',
  },
  coinPrice: {
    textAlign: 'right',
  },
  coinList: {
    height: '8vh',
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '2vh'
  },
  searchInput: {
    marginLeft: '1vh',
    flex: 1,
  },
}));

export default coinListStyle;