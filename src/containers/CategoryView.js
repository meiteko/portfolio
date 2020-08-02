import React from 'react';
import { Redirect } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import ArticleList from '../containers/ArticleList.js';
import '../css/category_view.css';

// Redux関連
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

// スタイル
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});


class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      currentView: 0,
      cate_loading: false,
      ordered_category: {},
      category_list: {},
      redirect: true,
      fetched: false,
      first_arrived: true,
      on_switching: false,
    };
  }

  reduxGetArticle(id) {
    const { actions } = this.props;
    actions.getArticle(id);
    actions.getMediaInfo();
  }

  setCategoryID(id) {
    const { actions } = this.props;
    actions.setCurrentCategoryView(id);
  }

  //コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます
  componentWillMount() {
    const localstorage_array = JSON.parse(localStorage.getItem("category_data"));
    if(typeof localstorage_array !== "undefined" && localstorage_array !== null) {
      const localstorage_int_array = localstorage_array.map(key => ({ id: parseInt(key.id,10),name: key.name, abbreviation : key.abbreviation,category: key.category}));
      this.setState({
        ordered_category: localstorage_int_array,
        fetched: true,
      });
    }

    if(typeof localstorage_array !== "undefined" && localstorage_array !== null && this.state.first_arrived) {
      const id = localstorage_array[0]["id"];
      this.reduxGetArticle(id);
    }
  }

  componentDidMount() {

  }

  componentWillUnmount(){
    this.unmounted = true;
  }

  swipeGetArtcle(index) {
    if(!this.state.on_switching) {
      this.setState({on_switching: true});
      var current_view_num = this.state.currentView;
      if(index < 0.5) {
        current_view_num++;
      } else {
        current_view_num--;
      }
      const get_category_num = this.state.ordered_category[current_view_num].id;
      if(get_category_num !== 0) {
        this.reduxGetArticle(get_category_num);
      }
    }
  }

  tabClickGetArtcle(index) {
    if(!this.state.on_switching) {
      this.setState({on_switching: true});
      var current_view_num = this.state.currentView;
      if(index < 0.5) {
        current_view_num++;
      } else {
        current_view_num--;
      }
      const get_category_num = this.state.ordered_category[current_view_num].id;
      if(get_category_num !== 0) {
        this.reduxGetArticle(get_category_num);
      }
    }
  }

  switchEnd(index) {
    this.setState({on_switching: false});
  }

  handleSwipeableViews(index, lastIndex) {
    this.setState({currentView: index,});
  }

  tabChanged(event,newValue) {
    this.setState({
      currentView: newValue,
    });
  }

  clickTab = (e, value) => {
    this.reduxGetArticle(value.id);
    this.setCategoryID(value.id);
  }

  render() {
    const localstorage_array = JSON.parse(localStorage.getItem("category_data"));
    const article_list = this.props.ArticleListReducer.article_list;
    if(localstorage_array != null){
      return (
        <div className={`component-container`}>
          <Tabs scrollable={true} value={this.state.currentView} onChange={(event, newValue) => {this.tabChanged(event, newValue);}}>
            {this.state.ordered_category.map((value, index) => (
              <Tab style={{
                backgroundImage: "url(" + process.env.PUBLIC_URL+'images/category_image/small/'+value['category']+'.jpg)',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
                margin: "0 4px",
                paddingLeft: "27px",
              }} value={index} label={value['abbreviation']} key={index} data-category_id={value['id']} onClick={((e) => this.clickTab(e, value))} />
            ))}
          </Tabs>
          <SwipeableViews
            onChangeIndex={this.handleSwipeableViews.bind(this)}
            onSwitching={this.swipeGetArtcle.bind(this)}
            onTransitionEnd={this.switchEnd.bind(this)}
            index={this.state.currentView}
            hysteresis={0.2}
          >

          {this.state.ordered_category.map((value, index) => (
            <ArticleList key={index} index={index} category_id={value["id"]} article_list={article_list[value["id"]]} />
          ))}

          </SwipeableViews>
        </div>
      );
    } else {
      return(
        <div><Redirect to="/category" /></div>
      );
    }
  }

};

// Redux関連
const mapState = (state, ownProps) => ({
  ArticleListReducer: state.ArticleListReducer,
  CategoryViewReducer: state.CategoryViewReducer,
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// Material-uiのテーマ設定＋Redux設定
export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(MyComponent)
);
