import {
  COIN_FETCH_REQUEST,
  COIN_FETCH_SUCCESS,
  COIN_FETCH_FAIL
} from '../constants/coinConstant'

export const fetchCoinReducer = (state = {}, action) => {
  switch (action.type) {
    case COIN_FETCH_REQUEST:
      return { loading: true };
    case COIN_FETCH_SUCCESS:
      return { loading: false, coinInfo: action.payload };
    case COIN_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};