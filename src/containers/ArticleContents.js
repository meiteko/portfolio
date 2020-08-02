import React from 'react';
import '../css/reset.css';
import '../css/article_contents.css';
import '../css/loader.css';
import axios from 'axios'
import { config } from '../js/CommonConfig.js';

// Redux関連
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const styles = theme => ({
  root: {
  },
});

class ArticleContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tmp_dom: "",
      tmp_css: "",
    };
  }

  //コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます
  componentWillMount() {
    const params = this.props.match
    const article_id = params.params.article_id;
    axios.get(config.UrlPORT+'article_contents/'+article_id).then((response) => {
      const tmp_css = '<link href="'+response.data[0].sp_css+'" media="all" rel="stylesheet">';
      this.setState({tmp_dom: response.data[0].contents,tmp_css: tmp_css,});
    }).catch(function(error) {
      console.log(error)
    });
  }

  render() {
    const params = this.props.match
    const article_id = params.params.article_id;
    const article_contents = this.props.ArticleContentsReducer.article_contents;

    if(article_contents[article_id]){
      return (
        <div>
          <div
          dangerouslySetInnerHTML={{
            __html: article_contents[article_id]
          }}/>
        </div>
      );
    } else if(this.state.tmp_dom !== "") {
      return (
        <div>
          <div
          dangerouslySetInnerHTML={{
            __html: this.state.tmp_css
          }}/>
          <div
          dangerouslySetInnerHTML={{
            __html: this.state.tmp_dom
          }}/>
        </div>
      );
    } else {
      return(
        <div className="loader"></div>
      );
    }
  }
}

// Redux関連
const mapState = (state, ownProps) => ({
  ArticleListReducer: state.ArticleListReducer,
  ArticleContentsReducer: state.ArticleContentsReducer,
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// Material-uiのテーマ設定＋Redux設定
export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(ArticleContents)
);
