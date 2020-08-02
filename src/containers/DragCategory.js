import React from 'react';
import { Redirect } from 'react-router-dom'
import SwapVertIcon from '@material-ui/icons/SwapVert';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import '../css/category_list.css';
import '../css/loader.css';

const SortableItem = sortableElement(({value,public_dir,category}) => <li className="sortableHelper"><img className="category_image" src={public_dir+'images/category_image/large/'+category+'.jpg'} alt={category+'のアイコン'} /><div className="category_drag_area"><SwapVertIcon /></div><div className="app_info">{value}</div></li>);

class SortableItemEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
    };
  }

  render() {
    return (
      <SortableItem public_dir={this.props.public_dir} index={this.props.index} value={this.props.value} category={this.props.category}/>
    );
  }
}

const SortableContainer = sortableContainer(({children}) => {
  return <ul className="CategoryList">{children}</ul>;
});

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordered_category: {},
      fetched: false
    };
  }

  //コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます
  componentWillMount() {
    const localstorage_array = JSON.parse(localStorage.getItem("category_data"));
    if(localstorage_array != null) {
      const localstorage_int_array = localstorage_array.map(key => ({ id: parseInt(key.id,10),name: key.name,abbreviation: key.abbreviation,category: key.category}));
      this.setState({
        ordered_category: localstorage_int_array,
        fetched: true,
      });
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({ordered_category}) => ({
      ordered_category: arrayMove(ordered_category, oldIndex, newIndex),
    }));
    localStorage.setItem("category_data", JSON.stringify(this.state.ordered_category));
  };

  render() {
    const localstorage_array = JSON.parse(localStorage.getItem("category_data"));

    if(localstorage_array != null) {
      if(this.state.fetched){
        return (
          <div>
            <SortableContainer onSortEnd={this.onSortEnd} helperClass="SortableHover" className="App-List">
              {this.state.ordered_category.map((value, index) => (
                <SortableItemEvent key={`category_data-${value['id']}`} public_dir={process.env.PUBLIC_URL} index={index} value={value['name']} category={value['category']}/>
              ))}
            </SortableContainer>
          </div>
        );
      }else{
        return(
          <div className="loader"></div>
        );
      }
    } else {
      return(
        <div><Redirect to="/category" /></div>
      );
    }
  }
}

export default MyComponent;
