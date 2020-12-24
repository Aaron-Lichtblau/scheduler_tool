import logo from './logo.svg';
import './App.css';
import React, { useState, setState } from 'react';
import axios from "axios";
import {Button, Nav, Navbar, Form, FormControl, Container, Row, Col, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

function App() {
  return (
    <div className="App">
    {/* a bunch of navbar bs that looks cool*/}
      <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="App-logo"
        />{' '}
        Lab Scheduler
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br></br>
      <br></br>


      <Container>
        <Row>
        <Col sm></Col>
        <Col md="auto">
          <div className="welcomeText">
          <h2>Welcome to the Lab Scheduler!
          </h2>
          <br></br>
          </div>
        </Col>
        <Col sm></Col>
        </Row>
        <Row>
          <Col sm={5}>

          <h3>Step 1: Upload time data
          </h3>
          <p>Select the .csv file of labTA's time preferences to upload. Make sure that your file is formatted correctly.
          To see an example file, refer to default_input.csv
          </p>

          </Col>
          <Col sm={7}>
            <FileForm/>
          </Col>
        </Row>
        <Row>
          <Col sm={5}>

          <h3>Step 2: Select Basic Settings
          </h3>
          <p>Fill in the questions to set the basic settings for the scheduler tool to use.
          The outputted schedule will be based on these preferences.
          </p>

          </Col>
          <Col sm={7}>
            <BasicModal />
          </Col>
        </Row>
        <Row>
          <Col sm={5}>

          <h3>Step 3: Select Advanced Settings (Optional)
          </h3>
          <p>Fill in the questions to set the advanced settings for the scheduler tool to use.
          The outputted schedule will be based on these preferences.
          </p>

          </Col>
          <Col sm={7}>
            <AdvancedModal />
          </Col>
        </Row>
        <Row>
          <Col sm={5}>

            <Button variant="primary" onClick="handleSubmit" size="lg" disabled> Create a Schedule!</Button>

          </Col>
          <Col sm={7}>
          </Col>
        </Row>

        <Row>

        </Row>
      </Container>


    </div>
  );
}
function BasicModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Select Basic Settings
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Basic Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BasicForm/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


class BasicForm extends React.Component {

  render(){
    return(
    <div className="mb-3">
        <Form.Check inline label="1" type='radio' id={`inline-radio-1`} name='avail'/>
        <Form.Check inline label="2" type='radio' id={`inline-radio-2`} name='avail'/>
        <Form.Check inline label="3" type='radio' id={`inline-radio-3`} name='avail'/>
        <Form.Check inline label="4" type='radio' id={`inline-radio-1`} name='avail'/>
        <Form.Check inline label="5" type='radio' id={`inline-radio-2`} name='avail'/>
        <br></br>
        <Form.Check inline label="1" type='radio' id={`inline-radio-3`} name='slot_type'/>
        <Form.Check inline label="2" type='radio' id={`inline-radio-1`} name='slot_type'/>
        <Form.Check inline label="3" type='radio' id={`inline-radio-2`} name='slot_type'/>
        <Form.Check inline label="4" type='radio' id={`inline-radio-3`} name='slot_type'/>
        <Form.Check inline label="5" type='radio' id={`inline-radio-3`} name='slot_type'/>
        <br></br>
        <Form.Check inline label="1" type='radio' id={`inline-radio-1`} name='no_1'/>
        <Form.Check inline label="2" type='radio' id={`inline-radio-2`} name='no_1'/>
        <Form.Check inline label="3" type='radio' id={`inline-radio-3`} name='no_1'/>
        <Form.Check inline label="4" type='radio' id={`inline-radio-1`} name='no_1'/>
        <Form.Check inline label="5" type='radio' id={`inline-radio-2`} name='no_1'/>
        <br></br>
        <Form.Check inline label="1" type='radio' id={`inline-radio-3`} name='guarantee_shift'/>
        <Form.Check inline label="2" type='radio' id={`inline-radio-1`} name='guarantee_shift'/>
        <Form.Check inline label="3" type='radio' id={`inline-radio-2`} name='guarantee_shift'/>
        <Form.Check inline label="4" type='radio' id={`inline-radio-3`} name='guarantee_shift'/>
        <Form.Check inline label="5" type='radio' id={`inline-radio-3`} name='guarantee_shift'/>
        <br></br>
        <Form.Check inline label="1" type='radio' id={`inline-radio-1`} name='shift_cap'/>
        <Form.Check inline label="2" type='radio' id={`inline-radio-2`} name='shift_cap'/>
        <Form.Check inline label="3" type='radio' id={`inline-radio-3`} name='shift_cap'/>
        <Form.Check inline label="4" type='radio' id={`inline-radio-1`} name='shift_cap'/>
        <Form.Check inline label="5" type='radio' id={`inline-radio-2`} name='shift_cap'/>
        <br></br>
        <Form.Check inline label="1" type='radio' id={`inline-radio-3`} name='equality'/>
        <Form.Check inline label="2" type='radio' id={`inline-radio-1`} name='equality'/>
        <Form.Check inline label="3" type='radio' id={`inline-radio-2`} name='equality'/>
        <Form.Check inline label="4" type='radio' id={`inline-radio-3`} name='equality'/>
        <Form.Check inline label="5" type='radio' id={`inline-radio-3`} name='equality'/>
    </div>
  )}
}

class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fruit: 'coconut',
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


function AdvancedModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Select Advanced Settings
      </Button>

      <Modal
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


export default App;
