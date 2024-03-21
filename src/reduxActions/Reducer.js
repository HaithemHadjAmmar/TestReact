import { ADD_PERSON } from '../reduxActions/Redux';

const initialState = {
  people: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return {
        ...state,
        people: [...state.people, action.payload]
      };
    default:
      return state;
  }
};

export default reducer;
