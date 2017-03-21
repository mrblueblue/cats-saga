export const FETCH_CATS_REQUEST = "FETCH_CATS_REQUEST"
export const FETCH_CATS_ADD_OPTIMISTIC_RESPONSE = "FETCH_CATS_ADD_OPTIMISTIC_RESPONSE"
export const FETCH_CATS_SUCCESS = "FETCH_CATS_SUCCESS"
export const FETCH_CATS_ERROR = "FETCH_CATS_ERROR"
export const DELETE_CAT = "DELETE_CAT"

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

export function addOptimisticResponse () {
  return {
    type: FETCH_CATS_ADD_OPTIMISTIC_RESPONSE,
    cats: [{loading: true}]
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

export function deleteCat (index) {
  return {
    type: DELETE_CAT
  }
}

export function catsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_CATS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false
      })
    case FETCH_CATS_ADD_OPTIMISTIC_RESPONSE:
      return Object.assign({}, state, {
        list: state.list.concat(action.cats),
        loading: false,
        error: false
      })
    case FETCH_CATS_SUCCESS:
      return Object.assign({}, state, {
        list: state.list.filter(a => !a.loading).concat(action.cats),
        loading: false,
        error: false
      })
    case FETCH_CATS_ERROR:
      return Object.assign({}, state, {
        list: state.list.filter(a => !a.loading),
        loading: false,
        error: action.error
      })
    case DELETE_CAT:
      const newList = state.list.slice()
      newList.splice(action.index, 1)
      return Object.assign({}, state, {
        list: newList,
      })
    default:
      return state
  }
}
