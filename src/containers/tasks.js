import React from 'react';
import TaskPage from '../pages/task';
import {create, read, update, remove, readSlack} from '../services/api';

class Task extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      errors: [],
      item: {
        title: '',
        slackChannel: {},
        date: new Date(),
        description: ''
      },
      method: 'create',
      success: false,
      message: null,
      items: [],
      slackChannels: []
    };
    this.onNewItem = this.onNewItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
  }

  async componentDidMount() {
    try {
      const channels = await readSlack();
      const itemsResponse = await read();
      
      var newItem = this.state.item;
      if(channels.data.length > 0){
        newItem.slackChannel = channels.data[0];
      }

      this.setState({
        item: newItem,
        items: itemsResponse.data,
        slackChannels: channels.data,
      })
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

  initItemDefault(){
    let {slackChannels} = this.state;

    const itemDefault = {
      title:'',
      slackChannel:(slackChannels.length > 0) ? slackChannels[0] : {},
      date:new Date(),
      description:''
    }

    return itemDefault;

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
        item: this.initItemDefault(),
        success: response.success,
        message: response.message,
        errors: (response.errors) ? response.errors : []
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
    var itemNew = Object.assign({}, editItem)
    itemNew.date = new Date(editItem.date);
    this.setState({
      item: itemNew,
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
        item: this.initItemDefault(),
        items: newItems,
        success: response.success,
        message: response.message,
        errors: (response.errors) ? response.errors : []
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
        errors: (response.errors) ? response.errors : [],
        items: newItems,
        item: this.initItemDefault(),
      });
    } catch (error) {      
      this.setState({
        success: error.response.data.success,
        message: error.response.data.message,
        errors: error.response.data.errors
      })
    }
  }

  handleCleanValidation(field){
    const {errors} = this.state;
    const newErrors = errors.slice();
    const index = errors.findIndex(n => n.field === field);
    if(index !== -1) {      
      newErrors.splice(index, 1);
    }
    return newErrors 
  }

  handleChange = e => {
    var a = new Date()
    var newItem = this.state.item;
    var field;
    if(e instanceof Date || e == null){
      field="date";
      newItem['date'] = e;
    } else {
      field=e.target.name;
      newItem[e.target.name] =  e.target.value
    }
          
    this.setState({
      item: newItem,
      errors: this.handleCleanValidation(field)
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
    const {items, item, method, success, message, errors, slackChannels} = this.state;
    return (
      <TaskPage
        success = {success}
        message = {message}
        errors = {errors}
        items = {items}
        item = {item}
        method = {method}
        channels = {slackChannels}
        onNewItem = {this.onNewItem}
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