import {delay} from 'redux-saga';
import {call, put, takeLatest} from 'redux-saga/effects'
import Api from '../services/api'

import {
  FETCH_CATS_REQUEST,
  fetchCatsOptimisticResponse,
  fetchCatsSuccess,
  fetchCatsError,
} from "./cat-duck"

function* fetchCats(action) {
  yield delay(500)
  yield put(fetchCatsOptimisticResponse());
  try {
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
