import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
//import CircularProgress from '@material-ui/core/CircularProgress';
import ArticleRanking from '../containers/ArticleRanking.js';

// Redux関連
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

class Article extends React.Component {

  getArticleContents = (e,id,url,xpath,lazy_data,redux,action) => {
    const media_id = Number(e.currentTarget.dataset.media_id);
    action.getContents(id,url,xpath,lazy_data);
    //css切り替え
    const media_site_array = redux.MediaInfoReducer.media_info.filter(item => item.id === media_id);
    const article_media_css = media_site_array[0].sp_css;
    document.getElementById("media_css").href = article_media_css;
  }

  render() {
    const article_data = this.props.article_data;
    var sectionStyle = {
      backgroundSize: `100%`,
    };
    const article_url = "/article/"+article_data.article_id;
    return(
          <li
            data-key={this.props.index}
            data-url={article_data.article_url}
            data-article_id={article_data.article_id}
            data-media_id={article_data.media_site_id}
            onClick={(e) => this.getArticleContents(e,article_data.article_id,article_data.article_url,article_data.article_contents_xpath,article_data.lazy_tag_attr,this.props.article_props,this.props.action)}
          >
          <Link to={article_url}>
            <div className="article_image_box" style={sectionStyle}>
              <img src={article_data.img_src} alt={article_data.img_src ? article_data.title+"のイメージ" :　""} />
            </div>
            <div className="article_info">
              <div className="article_title">{article_data.title}</div>
              <div className="media_site">{article_data.name}</div>
            </div>
          </Link>
        </li>
    );
  }
}

class ArticleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      article_list: [],
      first_arrived: true,
    };
  }

  componentDidMount() {

  }

  render() {
    const { actions } = this.props;

    return(
      <div>
        <div data-category_id={this.props.category_id}>
          {(() => {
              if (typeof this.props.article_list !== "undefined") {
                var rows = [];
                this.props.article_list.map((value, index) => {
                  rows.push(<Article key={index} index={index} article_data={value} action={actions} article_props={this.props} />);
                })
                return <div className="article_area"><ul>{rows}</ul><ArticleRanking /></div>;
              }
          })()}
        </div>
      </div>
    );
  }
}

// Material-ui関連
ArticleList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// Redux関連
const mapState = (state, ownProps) => ({
  ArticleListReducer: state.ArticleListReducer,
  ArticleContentsReducer: state.ArticleContentsReducer,
  MediaInfoReducer: state.MediaInfoReducer,
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// Material-uiのテーマ設定＋Redux設定
export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(ArticleList)
);
