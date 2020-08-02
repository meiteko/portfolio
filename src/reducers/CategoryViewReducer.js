import * as actionTypes from '../utils/actionTypes';

const initialState = {
  currentView: 0
};

const CategoryViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORYID:
      return {
        currentView: action.currentView
      };
    default:
      return state;
  }
};

export default CategoryViewReducer;
