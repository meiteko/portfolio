import { combineReducers } from 'redux';
import NotificationReducer from './NotificationReducer';
import RightIconReducer from './RightIconReducer';
import ArticleListReducer from './ArticleListReducer';
import ArticleContentsReducer from './ArticleContentsReducer';
import CategoryViewReducer from './CategoryViewReducer';
import MediaInfoReducer from './MediaInfoReducer';

const reducer = combineReducers({
  NotificationReducer: NotificationReducer,
  RightIconReducer: RightIconReducer,
  ArticleListReducer: ArticleListReducer,
  ArticleContentsReducer: ArticleContentsReducer,
  CategoryViewReducer: CategoryViewReducer,
  MediaInfoReducer: MediaInfoReducer,
});

export default reducer;
