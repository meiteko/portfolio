import * as actionTypes from '../utils/actionTypes';

const initialState = {
  isFetching: false,
  media_info: {}
};

const MediaInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MEDIA_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.GET_MEDIA_SUCCESS:
      return {
        isFetching: false,
        media_info: action.media_info,
      };
    case actionTypes.GET_MEDIA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default MediaInfoReducer;
