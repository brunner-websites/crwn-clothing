import { persistStore } from 'redux-persist';

import { createStore, applyMiddleware } from 'redux';

// middlewares
import logger from 'redux-logger';

// Replacing thunk with ReduxSaga
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';

import { fetchCollectionsStart } from './shop/shop.sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

sagaMiddleware.run(
  fetchCollectionsStart
)

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);