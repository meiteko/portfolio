import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

// Material-UIアイコン取得
// import SettingsIcon from '@material-ui/icons/Settings';
// import InfoIcon from '@material-ui/icons/Info';
// import HomeIcon from '@material-ui/icons/Home';
import ShareIcon from '@material-ui/icons/Share';

// Redux関連
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';


// Route関連
import { Link } from 'react-router-dom';

// コンテナの準備
import ShareDialog from '../containers/ShareDialog';

// コンポーネントの準備
import ResponsiveDrawerListItem from '../components/ResponsiveDrawerListItem';

// 設定値
const drawerWidth = 240;
const headerNavigationHeight = 56;
const bottomNavigationHeight = 56;

// スタイル
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  toolBar: {
    justifyContent: 'space-between', // 中央寄せのため追加
    minHeight: bottomNavigationHeight,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: `calc(10px + ${headerNavigationHeight}px)`,
    paddingBottom: `calc(10px + ${bottomNavigationHeight}px)`,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('md')]: {
      paddingBottom: 10,
    },
  },

  // ヘッダーロゴ
  headerLogo: {
    display: 'flex',
    height: 48,
  },
});

export class RightIcon extends React.Component {
  render() {
  const { shareDialogToggle } = this.props;
    return (
      <div>
        {
          (() => {
            switch(this.props.current_url) {
              case "/":
                return <div><ShareIcon className="share_icon" onClick={() => shareDialogToggle()}/><ShareDialog open={this.props.open} onClose={() => shareDialogToggle()} /></div>;
              case "/drag":
                return <div className="delete_drag_area"><i className="fas fa-trash-alt"></i><i className="fas fa-sync"></i></div>;
              default:
                return <div></div>;
            }
          }).call(this)
        }
      </div>
    );
  }
}

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      shareDialogOpen: false,
    };
  }

  closeDrawerNav = () => {
    this.setState({ mobileOpen: false });
  }
  openDrawerNav = () => {
    this.setState({ mobileOpen: true });
  }

  // シェアボタン挙動
  shareDialogToggle = () => {
    this.setState({ shareDialogOpen: !this.state.shareDialogOpen });
  }

  render() {

    // Material-ui関連
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <Divider />
        <List>
          <ResponsiveDrawerListItem
            to="/"
            onClick={this.closeDrawerNav}
            icon={<i className="far fa-newspaper"></i>}
            text="トップページ"
          />
          <ResponsiveDrawerListItem
            to="/category"
            onClick={this.closeDrawerNav}
            icon={<i className="fas fa-gamepad"></i>}
            text="カテゴリー"
          />
          <ResponsiveDrawerListItem
            to="/drag"
            onClick={this.closeDrawerNav}
            icon={<i className="fas fa-sync-alt"></i>}
            text="並び替え・整理"
          />
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar className={classes.toolBar} variant="dense">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => this.openDrawerNav()}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <Typography variant="title" color="inherit" noWrap>
                {
                  (() => {
                    switch(this.props.current_url) {
                      case "/":
                        return <div><img src="/images/logo.png" alt="ロゴ" className={classes.headerLogo}/></div>;
                      case "/category":
                        return <div className="title_text">ゲーム一覧</div>;
                      case "/drag":
                        return <div className="title_text">並び替え</div>;
                      default:
                        return <div><img src="/images/logo.png" alt="ロゴ" className={classes.headerLogo}/></div>;
                    }
                  }).call(this)
                }
              </Typography>
            </Link>
            <IconButton
              color="inherit"
              aria-label="Open Share"
            >
              <Typography variant="button" color="inherit" noWrap>
                <RightIcon current_url={this.props.current_url} shareDialogToggle={this.shareDialogToggle} open={this.state.shareDialogOpen} />
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.closeDrawerNav}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

// Material-ui関連
ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapState = (state, ownProps) => ({
  RightIconReducer: state.RightIconReducer,
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// Material-uiのテーマ設定＋Redux設定
export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(ResponsiveDrawer)
);
