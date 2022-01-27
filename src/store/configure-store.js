import rootReducer from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)),initialState);
};
export default configureStore;
