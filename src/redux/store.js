
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import catSaga from './cat-saga'
import { catsReducer } from "./cat-duck"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  catsReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(catSaga)

export default store
