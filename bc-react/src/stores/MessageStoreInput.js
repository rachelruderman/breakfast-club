import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import messageService from '../services/MessageService'

class MessageStoreInput extends EventEmitter{
  constructor(){
    super();
    this.fields = {
      content: '',
      // author: '',
      // createdAt: ''
    }
    this.errors = {}
  }

  // getLastFiveMessages(){
  //   let messageArray = [];
  //   if (this.fields.length > 10){
  //     for (var i = this.fields.length - 1; i > this.fields.length - 16; i--){
  //       messageArray.push(this.fields[i]);
  //     }
  //     return messageArray.reverse();
  //   } else {
  //     return this.fields.reverse();
  //   }
  // }

  getFields(){
    return this.fields
  }

  getErrors(){
    return this.errors
  }

  validate(){
    this.errors = {}
    this.validatePresence('content')
  }

  updateMessageInput(attribute, value){
    this.fields[attribute] = value
    this.emit('change')
  }

  validatePresence(fieldName){
    if(this.fields[fieldName] === ''){
      this.addError(fieldName, 'required field')
    }
  }

  addError(fieldName, message){
    this.errors[fieldName] = message
  }

  updateField(attribute, value){
    this.fields[attribute] = value
    this.emit('change')
  }

  clearFields(){
    this.fields = {}
    this.emit('change')
  }

  submitMessageInput(){
    this.validate()
    if(Object.keys(this.errors).length === 0){
      messageService.submitMessageInput(this.fields)
    }
    this.emit('change')
  }

  handleServerErrors(errors){
    errors.forEach((error) =>{
      this.errors[error.path] = error.message
    })
    this.emit('change')
  }

  handleActions(action){
    switch(action.type){
      case("UPDATE_MESSAGE_INPUT"):{
        this.updateField(action.attribute, action.value)
        break
      }
      case("SUBMIT_MESSAGE_INPUT"):{
        this.updateMessageInput(action.attribute, action.value)
        break
      }
      case("MESSAGE_FAIL"):{
        this.handleServerErrors(action.errors)
        break
      }
      case("UPDATE_MESSAGE_DETAIL"):{
        this.clearFields()
        break
      }
      default:{}
    }
  }
}
const messageStoreInput = new MessageStoreInput();
dispatcher.register(messageStoreInput.handleActions.bind(messageStoreInput));
window.messageStoreInput = messageStoreInput;
export default messageStoreInput;
