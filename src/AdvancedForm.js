import React from 'react';
import axios from "axios";
import {Button, Form, Row, Col, Modal, Badge} from 'react-bootstrap';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

class AdvancedForm extends React.Component {
  constructor(props){
  super(props);
  this.handleClick = this.handleClick.bind(this);
  this.handleShow = this.handleShow.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.getSlots = this.getSlots.bind(this);

  this.state = {
    min_exp: 1,
    min_skill : 2,
    stress_slots: [],
    target_delta: 1,
    flex_shifts : 3,
    slots: ['dummy'],
    show: false
    };
  }
  getSlots(){
    var self = this;
    axios.get('/slots').then(
    (response) => {
        console.log(response.data);
        self.setState({
          slots: response.data,
          show: true
        });
    }
        // console.log(response.data.slots);
    ,
    (error) => {
        self.setState({error})
      })
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
    self.getSlots();
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
      min_exp: this.state.min_exp,
      min_skill : this.state.min_skill,
      stress_slots: this.state.stress_slots,
      target_delta: this.state.target_delta,
      flex_shifts : this.state.flex_shifts,
    }
    axios.post('/advanced',data).then(res => { // then print response status
            console.warn(res);
        })
    self.setState({
      show: false
    })

  }

  renderQuestion(name){
    return (
      <Form.Control
      type="number"
      min="0"
      onChange={(e) => this.handleClick(name, e.target.value)}
      defaultValue={this.state[name]}
      />
  )}

  render(){
    console.log(this.state.slots);
    return(
    <div className="mb-3">
    <Button variant="primary" onClick={this.handleShow}>
      Select Advanced Settings
    </Button>

    <Modal
      size="lg"
      show={this.state.show}
      onHide={this.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Advanced Settings (defaults were settings used in 2019)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h3>Adding Constraints</h3>
      <p className="modalQues">If there are certain slots which require more experienced or skilled TA's,
      select those slots in the 'stress slots' selection below. Then, select the minimum number of
      experienced and skilled TA's that you want to be guaranteed in each of these 'stress slots'.</p>
      <Row>
        <Col xs={12} md={8}>
          <p className="modalQues">
          STRESS_SLOTS: slots which need especially strong TA's in them.
          </p>
        </Col>
        <Col xs={6} md={4}>
        <DropdownMultiselect
          options={this.state.slots}
          name="stress_slots"
        />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={8}>
          <p className="modalQues">
          MIN EXP: minimum number of 'experienced' TA's in each stress slot.
          </p>
        </Col>
        <Col xs={6} md={4}>
          {this.renderQuestion('min_exp')}
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={8}>
          <p className="modalQues">
          MIN SKILL: minimum number of 'skilled' TA's in each stress slot.
          </p>
        </Col>
        <Col xs={6} md={4}>
          {this.renderQuestion('min_skill')}
        </Col>
      </Row>


      <h3>Relaxing Constraints <Badge variant="warning">Recommended</Badge></h3>
      <p className="modalQues">If the scheduler is over constrained, it can be infeasible to create a schedule. By increasing the
      parameters below, you relax the constraints to give the scheduler a better ability to perform optimally.</p>
      <Row>
        <Col xs={12} md={8}>
          <p className="modalQues">
          TARGET DELTA: this is the acceptable number of TA's above your inputted slot sizes that the scheduler can assign.
          For example, if: FR_1900 = 5 TA's and target delta = 2, the scheduler could assign up to 7 TA's in Fr_1900.
          </p>
        </Col>
        <Col xs={6} md={4}>
          {this.renderQuestion('target_delta')}
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={8}>
          <p className="modalQues">
          FLEX_SHIFTS: this is the number of floating shifts which the scheduler can assign in any slot.
          For example, if: flex shifts = 3, 3 extra shifts will be assigned throughout the schedule
          (within the target delta).
          </p>
        </Col>
        <Col xs={6} md={4}>
          {this.renderQuestion('flex_shifts')}
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


export {AdvancedForm};
