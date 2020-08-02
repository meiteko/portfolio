import * as actionTypes from '../utils/actionTypes';

const initialState = {
  title: "",
};

const RightIconReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RIGHTICON:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
};

export default RightIconReducer;
