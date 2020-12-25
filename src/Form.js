import React, { useState, setState } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>


function Radio(props) {
  return (
    <>
    <Form.Check inline label={props.value} type='radio' id={`inline-radio`} name={props.type} onClick={props.onClick}/>
    </>
  )
}

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      value: props.value,
    };
  }

  renderRadio(i) {
    return(
        <Radio
          type = {this.props.name}
          value= {i}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  render(name) {
    return(
      <div>
        {this.renderRadio('1')}
        {this.renderRadio('2')}
        {this.renderRadio('3')}
        {this.renderRadio('4')}
        {this.renderRadio('5')}
      </div>
    )
  }
  handleClick(value){
    this.setState({
      name : value
    });
    console.log(this.props.name + " updated to " + value);
  }
}


class BasicForm extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    slots: props.slots,
    duration: 120,
    avail : 7,
    slot_type: 4,
    no_1: 3,
    guarantee_shift : 5,
    shift_cap : 5,
    equality: 3,
  };
}
  renderQuestion(name){
    return (
      <Question
      name={name}
      value={this.state[name]}
      />
  )}

  render(){
    return(
    <div className="mb-3">
        {this.renderQuestion('avail')}
        <br></br>
        {this.renderQuestion('slot_type')}
        <br></br>
        {this.renderQuestion('no_1')}
        <br></br>
        {this.renderQuestion('guarantee_shift')}
        <br></br>
        {this.renderQuestion('shift_cap')}
        <br></br>
        {this.renderQuestion('equality')}
    </div>
  )}
}

class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
  };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <div className = "inputFile">
        <Form.File id="exampleFormControlFile1" label="" width ="60"/>
      </div>
    );
  }
}

export {BasicForm, FileForm};
