import React from 'react';
import arrayMove from 'array-move';
import { config } from '../js/CommonConfig.js';
import '../css/category_list.css';
import '../css/loader.css';

function setLocalStorage(key,value) {
  var localstorage_array = [];
  if(localStorage.getItem(key)) {
    var tmp_array = JSON.parse(localStorage.getItem(key));
    tmp_array.push(value);
    localStorage.setItem(key, JSON.stringify(tmp_array));
  } else {
    localstorage_array.push(value);
    localStorage.setItem(key, JSON.stringify(localstorage_array));
  }
}

function removeLocalStorage(key,value) {
  if(localStorage.getItem(key)) {
    var tmp_array = JSON.parse(localStorage.getItem(key));
    const remove_storage = [];
    tmp_array.forEach(storage_data => {
      if (storage_data.id !== value["id"]) {
        remove_storage.push(storage_data);
      }
    });
    localStorage.setItem(key, JSON.stringify(remove_storage));
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_data: {},
      fetched: false,
      checkedItems: new Map(),
    };
    this.categoryChangeCookie = this.categoryChangeCookie.bind(this);
  }

  //コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます
  componentWillMount() {
    return fetch(config.UrlPORT+'categories')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          category_data: responseJson,
          origin_data: responseJson,
          fetched: true,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  categoryChangeCookie = (event) => {
    const target = event.target.dataset;
    const cookie_array = {id:target.id,name:target.name,abbreviation: target.abbreviation,category:target.category_name};
    if(event.target.checked) {
      setLocalStorage("category_data", cookie_array);
    } else {
      removeLocalStorage("category_data", cookie_array);
    }
    const item = event.target.dataset.id;
    const isChecked = event.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(parseInt(item,10), isChecked) }));
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({category_data}) => ({
      category_data: arrayMove(category_data, oldIndex, newIndex),
    }));
  };

  filterList = (e) => {
    var search_val = e.target.value.toLowerCase();
    if(search_val.length !== 0) {
      const updateList = this.state.origin_data.filter((ordered_category) => {
        return ordered_category["name"].toLowerCase().search(search_val) !== -1;
      })
      this.setState({category_data: updateList})
    } else {
      this.setState({category_data: this.state.origin_data})
    }
  }

  render() {
    if(this.state.fetched){
      const localstorage_array = JSON.parse(localStorage.getItem("category_data"));
      var localstorage_int_array = [];
      if(localstorage_array) {
        localstorage_int_array = localstorage_array.map(key => ({ id: parseInt(key.id,10),name: key.name, abbreviation: key.abbreviation, category: key.category}));
      }
      return (
        <div>
          <form action="" className="CategoryForm">
            <input type="text" placeholder="search" onChange={this.filterList}/>
          </form>
          <ul className="CategoryList">
            <section>
              {this.state.category_data.map((value,index) => {
                var checked = "";
                if(localstorage_int_array) {
                  const filter_array = [];
                  localstorage_int_array.forEach(storage_data => {
                    if (storage_data.id === value["id"]) {
                      filter_array.push(storage_data);
                    }
                  });
                  checked = filter_array.length === 0 ? false : true;
                  this.state.checkedItems.set(value['id'],checked);
                }
                return (
                  <li key={index}>
                    <img className="category_image" src={process.env.PUBLIC_URL+'images/category_image/large/'+value['category_name']+'.jpg'} alt={value['name']+'のアイコン'}/>
                    <div className="gameinfo">{value['name']}</div>
                    <input
                      type="checkbox" id={`checkbox${index}`}
                      onChange={this.categoryChangeCookie}
                      data-id={value['id']} data-name={value['name']} data-category_name={value['category_name']} data-abbreviation={value['abbreviation']}
                      checked={this.state.checkedItems.get(value['id'])}
                    ></input>
                    <label htmlFor={`checkbox${index}`} className="checkbox"></label>
                  </li>
                )
              })}
            </section>
          </ul>
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
