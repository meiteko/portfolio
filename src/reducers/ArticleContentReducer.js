import * as actionTypes from '../utils/actionTypes';

const initialState = {
  isFetching: false,
  article_content: {}
};

const ArticleContentReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.GET_CONTENT_SUCCESS:
      return {
        isFetching: false,
        article_list: {
          ...state.article_list
        }
      };
    case actionTypes.GET_CONTENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default ArticleContentReducer;
