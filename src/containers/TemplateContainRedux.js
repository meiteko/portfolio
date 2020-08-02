import React from 'react';
import { config } from '../js/CommonConfig.js';
import '../css/category_list.css';
import '../css/loader.css';

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
    };
  }

  //コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます
  componentWillMount() {

  }

  render() {
    const params = this.props.match
    const article_id = params.params.article_id;
    console.log(this.props);

    if(this.state.fetched){
      return (
        <div>

        </div>
      );
    }else{
      return(
        <div className="loader"></div>
      );
    }
  }
}

// Redux関連
const mapState = (state, ownProps) => ({
  ArticleListReducer: state.ArticleListReducer,
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
