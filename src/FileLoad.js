import React from 'react';
import axios from "axios";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>




class SlotNum extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      slot: props.slot,
      value: props.value
    }
  }

  render(){
    return(
      <div class="col-xs-1">
      <Form.Label>{this.state.slot}</Form.Label>
      <Form.Control
      required
      type="number"
      min="1"
      onChange={(e) => this.props.onChange(this.props.slot, e.target.value)}
      defaultValue={this.state.value}
      />
      <Form.Control.Feedback type="invalid">
        Please provide a valid integer.
      </Form.Control.Feedback>
      </div>
    )
  }
}



class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      slotdict: {},
      duration: 120,
      validated: false,
      submitButton: true
  };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }

  handleSubmit(event) {
    var self = this;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("invalid form");
      }

    self.setState({
      validated: true,
      })
    var data = {
      slotdict: this.state.slotdict,
      duration: this.state.duration
    }
    axios.post('/slotdict', data).then(res => { // then print response status
            console.warn(res);
        })
  }

  handleSlotChange(slot, value) {
    const newSlotDict = {};
    Object.assign(newSlotDict, this.state.slotdict);
    newSlotDict[slot] = value;
    this.setState({slotdict: newSlotDict});
    // console.log(newSlotDict)
  }
  handleDurationChange(slot, value){
    this.setState({duration: value})
  }

  handleFileChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      file: value,
      submitButton: false
    });
    this.fetchData();
    // console.log(this.state.slotdict);
    event.preventDefault();
  }

  fetchData(){

    var self = this;
    var data = {file: this.state.file};

    axios.post('/file', data)
    .then(res => { // then print response status
        console.warn(res);
    })
    axios.get('/file/df').then(
    (response) => {
        self.setState({
          slotdict: response.data.slots,
          validated: true
        })}
        // console.log(response.data.slots);
    ,
    (error) => {
        self.setState({error})
      })
    }


  render() {
    var slotList = Object.keys(this.state.slotdict).map((slot) =>
    <li key={slot}>
    <SlotNum
    slot={slot}
    onChange={this.handleSlotChange}
    />
    </li>
  );

    return (
      <div id = "inputFile">
        <Form.File
        id="exampleFormControlFile1"
        label=""
        width ="60"
        onChange={this.handleFileChange}/>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <SlotNum
          slot= "Slot Duration in Mins"
          onChange= {this.handleDurationChange}
          value= {this.state.duration}
          />
          <Form.Row>
          <ul>
          {slotList}
          </ul>
          </Form.Row>
        <Button type="submit" disabled={this.state.submitButton}>Submit slot sizes</Button>
        </Form>
      </div>
    );
  }
}

export {FileForm};
