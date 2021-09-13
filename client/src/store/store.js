import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {
  userRegisterReducer,
  userSigninReducer
} from './reducers/userReducer'


const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
})

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  },
}

// Enable chrome redux dev tool
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose

const middleware = [thunk]

const enhancers = composeEnhancers(
  applyMiddleware(...middleware),
)

const store = createStore(reducer, initialState, enhancers)

export default store
