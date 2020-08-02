import React from 'react';
import { config } from '../js/CommonConfig.js';
import '../css/category_list.css';
import '../css/loader.css';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  //コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます
  componentWillMount() {

  }

  render() {
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

export default MyComponent;
