import {delay} from 'redux-saga';
import {call, put, takeLatest} from 'redux-saga/effects'
import Api from '../services/api'

import {
  FETCH_CATS_REQUEST,
  addOptimisticResponse,
  fetchCatsSuccess,
  fetchCatsError,
} from "./cat-duck"

const API_LIMIT = 25
const range = (limit) => [...Array(limit).keys()]
const staggeredInterval = (x) => x < 5 ? Math.pow(x, x) + 10 : 50
const randomInterval = () => Math.floor(Math.random() * 500) + 250

function* fetchCatsOptimisticResponse () {
  for (let x of range(API_LIMIT)) {
    yield delay(staggeredInterval(x))
    yield put(addOptimisticResponse());
  }
}

function* fetchCats(action) {
  try {
    yield delay(randomInterval())
    yield fetchCatsOptimisticResponse()
    const cats = yield call(Api.fetchCats);
    yield delay(500)
    yield put(fetchCatsSuccess(cats));
  } catch (error) {
    yield put(fetchCatsError(error));
  }
}

function* catSaga() {
  yield takeLatest(FETCH_CATS_REQUEST, fetchCats);
}

export default catSaga;
