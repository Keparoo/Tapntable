const INITIAL_STATE = { checks: [] };
export default function currentCheckReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return state;
    case 'DELETE_ITEM':
      return state;
    default:
      return state;
  }
}
