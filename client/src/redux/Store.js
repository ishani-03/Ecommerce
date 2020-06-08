import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
// import thunk from 'redux-thunk'
import RootReducer from './RootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './RootSaga'


const sagaMiddleware = createSagaMiddleware()

// const middlewares = [logger];
// const middlewares = [thunk];
const middlewares =[sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(RootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga) //inside run we pass each individual saga

export const persistor = persistStore(store);