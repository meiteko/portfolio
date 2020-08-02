import * as actionTypes from '../utils/actionTypes';

const initialState = {
  isFetching: false,
  article_contents: {},
};

const ArticleContentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.GET_CONTENTS_SUCCESS:
      return {
        isFetching: false,
        article_contents: {
          ...state.article_contents,
          [action.article_contents.id]:action.article_contents.json
        }
      };
    case actionTypes.GET_CONTENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default ArticleContentsReducer;
