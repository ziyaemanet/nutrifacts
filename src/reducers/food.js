export default (state = null, action) => {
  if(action.error) {
    return state
  }

  switch (action.type) {
    case 'GET_FOOD_FULFILLED':
      return action.payload
    default:
      return state
  }
}
