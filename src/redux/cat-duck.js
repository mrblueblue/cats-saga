export const API_LIMIT = 25

export const FETCH_CATS_REQUEST = "FETCH_CATS_REQUEST"
export const FETCH_CATS_OPTIMISTIC_RESPONSE = "FETCH_CATS_OPTIMISTIC_RESPONSE"
export const FETCH_CATS_SUCCESS = "FETCH_CATS_SUCCESS"
export const FETCH_CATS_ERROR = "FETCH_CATS_ERROR"

export const initialState = {
  list: [],
  loading: false,
  error: false,
}

export function fetchCatsRequest () {
  return {
    type: FETCH_CATS_REQUEST
  }
}

export function fetchCatsOptimisticResponse () {
  return {
    type: FETCH_CATS_OPTIMISTIC_RESPONSE,
    cats: [...Array(API_LIMIT)].map(a => ({loading: true}))
  }
}

export function fetchCatsSuccess (cats) {
  return {
    type: FETCH_CATS_SUCCESS,
    cats
  }
}

export function fetchCatsError (error) {
  return {
    type: FETCH_CATS_ERROR,
    error
  }
}

export function catsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_CATS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false
      })
    case FETCH_CATS_OPTIMISTIC_RESPONSE:
      return Object.assign({}, state, {
        list: state.list.concat(action.cats),
        loading: true,
        error: false
      })
    case FETCH_CATS_SUCCESS:
      return Object.assign({}, state, {
        list: state.list.slice(0, state.list.length - API_LIMIT).concat(action.cats),
        loading: false,
        error: false
      })
    case FETCH_CATS_ERROR:
      return Object.assign({}, state, {
        list: state.list.slice(0, state.list.length - API_LIMIT),
        loading: false,
        error: action.error
      })
    default:
      return state
  }
}
