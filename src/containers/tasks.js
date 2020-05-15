import React from 'react';
import TaskPage from '../pages/task';
import {create, read, update, remove} from '../services/api';

class Task extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      errors: [],
      item: {},
      method: 'create',
      success: false,
      message: null,
      items: [],
    };
    this.onNewItem = this.onNewItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
  }

  async componentDidMount() {
    try {
      const itemsResponse = await read();
      this.setState({items: itemsResponse.data})
    } catch (error) {
      this.setState({errors: error})
    }
  }

  handleValidation(){
    let item = this.state.item;
    let errors = [];
    let formIsValid = true;

    if(!item["title"]){
      formIsValid = false;
      errors.push({ field: 'title', msg: "Debe indicar un titulo"});
    }

    if(!item["slackChannel"]){
      formIsValid = false;
      errors.push({ field: 'slackChannel', msg: "Debe indicar un canal de slack"});
    }

    if(!item["date"]){
      formIsValid = false;
      errors.push({ field: 'date', msg: "Debe indicar una fecha"});
    }

    this.setState({
      success: formIsValid,
      errors: errors,
      message: formIsValid ? null : 'Error de parametros en los datos enviados'
    });
    return formIsValid;
  }

  async onNewItem(e) {
    e.preventDefault();
    if(!this.handleValidation()){
      return;
    }

    try {
      let { title, slackChannel, date, description } = this.state.item;
      let data = { title, slackChannel, date, description };

      const response = await create(data)

      this.setState({
        method: 'create',
        items: [
          ...this.state.items,
          response.data
        ],
        item: {title:'', slackChannel:'', date:'', description:''},
        success: response.success,
        message: response.message, 
      })
    } catch (error) {
      this.setState({
        success: error.response.data.success,
        message: error.response.data.message,
        errors: error.response.data.errors
      });
    }
  }

  onEditItem(editItem) {
    this.setState({
      item: Object.assign({}, editItem),
      method: 'update',
      errors: [],
      message: null
    });
  }

  async onUpdateItem(editItem) {
    if(!this.handleValidation()){
      return;
    }

    try {
      const response = await update(this.state.item._id, this.state.item);

      const {items} = this.state;
      const index = items.findIndex(n => n._id === this.state.item._id);
  
      if(index === -1) {
        return;
      } 

      const newItems = items.slice();
      newItems[index] = response.data;
  
      this.setState({
        method: 'create',
        item: {title:'', slackChannel:'', date:'', description:''},
        items: newItems,
        success: response.success,
        message: response.message, 
      })
    } catch (error) {
      this.setState({
        success: error.response.data.success,
        message: error.response.data.message,
        errors: error.response.data.errors
      })
    }
  }

  async onRemoveItem(item) {
    try {
      const {items} = this.state;
      const response = await remove(item._id);
      const index = items.findIndex(n => n._id === item._id);
  
      if(index === -1) {
        return;
      } 
      const newItems = items.slice();
      newItems.splice(index, 1);
      this.setState({
        method: 'create',
        success: response.success,
        message: response.message, 
        items: newItems,
        item: {title:'', slackChannel:'', date:'', description:''},
      });
    } catch (error) {      
      this.setState({
        success: error.response.data.success,
        message: error.response.data.message,
        errors: error.response.data.errors
      })
    }
  }

  handleChange = e => {
    var newItem = this.state.item;
    newItem[e.target.name] =  e.target.value
    this.setState({
      item: newItem
    })
  };

  // onToggledItemComplete(item) {
  //   const {
  //     items
  //   } = this.state;

  //   this.setState({
  //     items: items.map((next) => {
  //       if(next.id === item.id) {
  //         return {
  //           ... next,
  //           isCheked: !item.isCheked,
  //         };

  //         return next;
  //       }
  //     })
  //   })
  // }

  render(){
    const {items, item, method, success, message, errors} = this.state;
    return (
      <TaskPage
        success={success}
        message={message}
        errors={errors}
        items={items}
        item={item}
        method={method}
        onNewItem={this.onNewItem}
        onEditItem = {this.onEditItem}
        onUpdateItem = {this.onUpdateItem}
        onRemoveItem = {this.onRemoveItem}
        handleSubmit = {this.handleSubmit}
        handleChange = {this.handleChange}
      />
    );
  }
}

export default Task;