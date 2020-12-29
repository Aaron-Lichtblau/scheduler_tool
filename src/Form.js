import React, {useState, setState} from 'react';
import axios from "axios";
import {Button, Form, Row, Col, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>


function Radio(props) {
  return (
    <>
    <Form.Check
    inline label={props.value}
    type='radio' id={`inline-radio`}
    name={props.type}
    onClick={props.onClick}
    defaultChecked={props.defaultValue}
    />
    </>
  )
}

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      value: props.value,
      defaultValue: props.defaultValue
    };
  }

  renderRadio(i, isChecked) {
    return(
        <Radio
          type = {this.props.name}
          value= {i}
          onClick={() => this.props.handleClick(this.props.name,i)}
          defaultValue={isChecked}
        />
      );
    }
  render() {
    var isChecked = Array(5).fill(false);
    isChecked[this.state.defaultValue - 1] = true;
    return(
      <div>
        {this.renderRadio('1', isChecked[0])}
        {this.renderRadio('2', isChecked[1])}
        {this.renderRadio('3', isChecked[2])}
        {this.renderRadio('4', isChecked[3])}
        {this.renderRadio('5', isChecked[4])}
      </div>
    )
  }

}


class BasicForm extends React.Component {
  constructor(props){
  super(props);
  this.handleClick = this.handleClick.bind(this);
  this.handleShow = this.handleShow.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

  this.state = {
    slots: props.slots,
    avail : 5,
    slot_type: 3,
    no_1: 2,
    guarantee_shift : 4,
    shift_cap : 4,
    equality: 2,
    show: false
    };


  }
  handleClick(name, value){
    var self = this;
    // console.log(this.state[name])
    self.setState({
      [name] : value
    });
    console.log(name + " updated to " + value);
    // console.log(this.state[name])
  }

  handleShow(){
    var self = this;
    self.setState({
      show: true
    })
  }

  handleClose(){
    var self = this;
    self.setState({
      show: false
    })
  }

  handleSubmit(){
    var self = this;
    const data={
      weightdict: {
        avail: this.state.avail,
        slot_type: this.state.slot_type,
        no_1: this.state.no_1,
        guarantee_shift : this.state.guarantee_shift,
        shift_cap : this.state.shift_cap,
        equality: this.state.equality,
      }
    }
    axios.post('/basic',data).then(res => { // then print response status
            console.warn(res);
        })
    self.setState({
      show: false
    })

  }

  renderQuestion(name, val){
    return (
      <Question
      name={name}
      value={val}
      handleClick={this.handleClick}
      defaultValue={this.state[name]}
      />
  )}

  render(){
    return(
    <div className="mb-3">
    <Button variant="primary" onClick={this.handleShow}>
      Select Basic Settings
    </Button>

    <Modal
      size="lg"
      show={this.state.show}
      onHide={this.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Basic Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} md={8}>
            <p>
            It is essential that students who listed more availabilities get
            preference over students who listed fewer availabilities.
            </p>
          </Col>
          <Col xs={6} md={4}>
            {this.renderQuestion('avail', this.state['avail'])}
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={8}>
            <p>
            It is essential that students get their desired slot type (2hr vs 4hr).
            </p>
          </Col>
          <Col xs={6} md={4}>
            {this.renderQuestion('slot_type', this.state['slot_type'])}
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={8}>
            <p>
            It is essential that no student gets placed in a slot that they reported as a 1
            (can work at this time if I am absolutely needed to).
            </p>
          </Col>
          <Col xs={6} md={4}>
            {this.renderQuestion('no_1', this.state['no_1'])}
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={8}>
            <p>
            It is essential that every student is guaranteed to get at least 1 shift.
            </p>
          </Col>
          <Col xs={6} md={4}>
            {this.renderQuestion('guarantee_shift', this.state['guarantee_shift'])}
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={8}>
            <p>
            Students who have higher caps on the number of shifts they want to work
            should be prioritized.
            </p>
          </Col>
          <Col xs={6} md={4}>
            {this.renderQuestion('shift_cap', this.state['shift_cap'])}
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={8}>
            <p>
            The number of shifts that each students gets should be distributed as evenly
            as possible.
            </p>
          </Col>
          <Col xs={6} md={4}>
            {this.renderQuestion('equality', this.state['equality'])}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
        variant="primary"
        onClick={this.handleSubmit}
        >Confirm</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )}
}
function AdvancedForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Select Advanced Settings
      </Button>

      <Modal
        size = "lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Advanced Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export {BasicForm, AdvancedForm};
