import * as actionTypes from '../utils/actionTypes';

const initialState = {
  isFetching: false,
  article_list: []
};

const ArticleListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.GET_ARTICLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        article_list: {
          ...state.article_list,
          [action.article_data.id]: action.article_data.json
        },
      };
    case actionTypes.GET_ARTICLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default ArticleListReducer;
