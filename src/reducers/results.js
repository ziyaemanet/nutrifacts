export default (state = null, action) => {
  if(action.error) {
    return state
  }

  switch (action.type) {
    case 'SEARCH_FOODS_FULFILLED':
      return action.payload
    case 'CLEAR_RESULTS':
      return null
    default:
      return state
  }
}
