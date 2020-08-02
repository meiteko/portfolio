import * as actionTypes from '../utils/actionTypes';
import axios from 'axios' // API取得用
import { config } from '../js/CommonConfig.js';
axios.defaults.baseURL = 'http://localhost:3300';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// Notification操作
export const setNotification = (variant, message) => ({
  type: actionTypes.SET_NOTIFICATION,
  variant: variant,
  message: message,
});
export const closeNotification = (variant, message) => ({
  type: actionTypes.CLOSE_NOTIFICATION,
});

export const getArticle = (id) => {
  return (dispatch) => {
    dispatch(getArticleRequest());

    return axios.get(config.UrlPORT+'article/'+id)
      .then(response => dispatch(getArticleSuccess(id,response.data)))
      .catch(error => dispatch(getArticleFailure(error)))
  };
};

export const getContents = (id,url,xpath,lazy_tag_xpath) => {
  return (dispatch) => {

    return axios({
      method: 'post',
      url: config.ArticlePort+'article_contents',
      headers: {},
      data: {
        url: url,
        xpath: xpath,
        lazy_tag_xpath: lazy_tag_xpath,
      }
    }).then(response => dispatch(getContentsSuccess(id,url,response.data)))
     .catch(error => dispatch(getContentsFailure(error)))
  };
};

export const getMediaInfo = () => {
  return (dispatch) => {
    dispatch(getArticleRequest());

    return axios.get(config.UrlPORT+'media_info')
      .then(response => dispatch(getMediaSuccess(response.data)))
      .catch(error => dispatch(getMediaFailure(error)))
  };
};

export const rightIcon = (title) => ({
  type: actionTypes.RIGHTICON,
  title: title,
});

export const getArticleRequest = () => ({
  type: actionTypes.GET_ARTICLE_REQUEST,
});

export const getArticleSuccess = (id , json) => ({
  type: actionTypes.GET_ARTICLE_SUCCESS,
  article_data: {id,json},
});

export const getArticleFailure = (error) => ({
  type: actionTypes.GET_ARTICLE_FAILURE,
  error: error,
});

export const setCurrentCategoryView = (category_id) => ({
  type: actionTypes.SET_CURRENT_CATEGORYID,
  currentView: category_id,
});

export const getContentsRequest = () => ({
  type: actionTypes.GET_CONTENTS_REQUEST,
});

export const getContentsSuccess = (id, url , json) => ({
  type: actionTypes.GET_CONTENTS_SUCCESS,
  article_contents: {id,json},
});

export const getContentsFailure = (error) => ({
  type: actionTypes.GET_CONTENTS_FAILURE,
  error: error,
});

export const getMediaRequest = () => ({
  type: actionTypes.GET_MEDIA_REQUEST,
});

export const getMediaSuccess = (json) => ({
  type: actionTypes.GET_MEDIA_SUCCESS,
  media_info: json,
});

export const getMediaFailure = (error) => ({
  type: actionTypes.GET_MEDIA_FAILURE,
  error: error,
});
