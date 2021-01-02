import React from 'react';
import axios from "axios";
import {Button, Form, Accordion, Card, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>




function SlotNum(props) {
  return(
    <div class="col-xs-1">
    <Form.Row>
      <li>
      <Form.Label>{props.slot}</Form.Label>
      <Form.Control
      required
      type="number"
      min="1"
      onChange={(e) => props.onChange(props.slot, e.target.value)}
      defaultValue={props.value}
      />
      <Form.Control.Feedback type="invalid">
        Please provide a valid integer.
      </Form.Control.Feedback>
      </li>
    </Form.Row>
    </div>
  );

}


class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      slotdict: {"Mo_1900" : 0, "Mo_2100" : 0,"Tu_1900" : 0, "Tu_2100" : 0,"We_1900" : 0, "We_2100" : 0,"Th_1900" : 0, "Th_2100" : 0,"Fr_1900" : 0, "Fr_2100" : 0,"Sa_1500" : 0, "Sa_1600" : 0,"Sa_1700" : 0,"Su_1700" : 0,"Su_1800" : 0,"Su_1900" : 0,"Su_2000" : 0, "Su_2100" : 0},
      hideSlots: true,
      duration: 120,
      validated: false,
      hideSubmitButton: true
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
    });
    var data = {
      slotdict: this.state.slotdict,
      duration: this.state.duration
    };
    axios.post('/slotdict', data).then(res => { // then print response status
            console.warn(res);
        });
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
      hideSubmitButton: false,
      hideSlots: false
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
        axios.get('/file/df').then(
        (response) => {
            console.log(response.data.slotdict);
            self.setState({
              slotdict: response.data.slotdict,
              validated: true
            })}
            // console.log(response.data.slots);
        ,
        (error) => {
            self.setState({error})
          })
    })

    }


  render() {
    var slotList = Object.keys(this.state.slotdict).map((slot) =>
    <li key={slot}>
    <SlotNum
    slot={slot}
    onChange={this.handleSlotChange}
    value={this.state.slotdict[slot]}
    />
    </li>
  );

    return (
      <div id = "fileForm">
      <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Collapse eventKey="0">

          <Card.Body>
              <Form.File
                id="exampleFormControlFile1"
                label=""
                width ="60"
                onChange={this.handleFileChange}/>
              <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <SlotNum
                slot= "Slot Duration in Mins"
                onChange= {this.handleDurationChange}
                value= {this.state.duration}/>
              <div hidden={this.state.hideSlots}>
                Select Number of TA's in each slot:
                <ul> {slotList} </ul>
              </div>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer>
          <Accordion.Toggle as={Button} type="submit" onClick={this.handleSubmit} disabled={this.state.hideSubmitButton} eventKey="0">
            Submit Part 1
          </Accordion.Toggle>
        </Card.Footer>
      </Card>
      </Accordion>
      </div>
    );
  }
}

export {FileForm};
