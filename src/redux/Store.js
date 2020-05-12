// import {createStore , applyMiddleware} from 'redux'
// import logger from 'redux-logger'
// import RootReducer from './RootReducer'
// import { persistStore } from 'redux-persist'

// const middlewares=[logger];
// export const store=createStore(RootReducer,applyMiddleware(...middlewares))
// export const persistor = persistStore(store)

// export default {store , persistor};

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import RootReducer from './RootReducer'


// const middlewares = [logger];
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(RootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);