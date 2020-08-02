import React, { Component } from 'react';
// コンテナ読み込み
import ResponsiveDrawer from './containers/ResponsiveDrawer';
// import RouteRelatedBottomNavigation from './containers/RouteRelatedBottomNavigation';
import Notification from './containers/Notification';
import CategoryList from './containers/CategoryList';
import CategoryView from './containers/CategoryView';
import DragCategory from './containers/DragCategory';
import ArticleContents from './containers/ArticleContents';
import Settings from './containers/Settings';
// コンポーネント読み込み
import WrapMainContent from './components/WrapMainContent'
// 共通スタイル読み込み
import './css/common.css';
// Route関連
import { Route, Switch } from 'react-router-dom';

// 不明なRouteは全てNotFound
const NotFound = () => {
  return(
    <h2>ページが見つかりません</h2>
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current_url: window.location.pathname,
      ordered_category: {},
    };
  }

  componentWillMount() {
    const localstorage_array = JSON.parse(localStorage.getItem("category_data"));
    if(localstorage_array != null) {
      const localstorage_int_array = localstorage_array.map(key => ({ id: parseInt(key.id,10),name: key.name,category: key.category}));
      this.setState({
        ordered_category: localstorage_int_array,
        fetched: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.current_url !== window.location.pathname) {
      this.setState({current_url: window.location.pathname});
    }
  }

  render() {
    return (
      <div className="App">
        <Notification/>
        <ResponsiveDrawer className="ResponsiveDrawer" current_url={this.state.current_url}>
          <Switch>
            <Route exact path="/" component={WrapMainContent(CategoryView)} ordered_category={this.state.ordered_category}/>
            <Route exact path="/category" component={WrapMainContent(CategoryList)} ordered_category={this.state.ordered_category} />
            <Route exact path="/settings" component={WrapMainContent(Settings)}/>
            <Route exact path="/drag" component={WrapMainContent(DragCategory)} ordered_category={this.state.ordered_category}/>
            <Route exact path="/article/:article_id" component={WrapMainContent(ArticleContents)} />
            <Route component={WrapMainContent(NotFound)}/>
          </Switch>
        </ResponsiveDrawer>
      </div>
    );
  }
}

export default App;
