import logo from './logo.svg';
import './App.css';
import {FileForm} from './FileLoad.js';
import {BasicForm, AdvancedForm} from './Form.js';
import React from 'react';
import {Button, Nav, Navbar, Container, Row, Col} from 'react-bootstrap';
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
            <Nav.Link href="#about">About</Nav.Link>
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
          The outputted schedule will be based on these preferences. Keep in mind that these preferences
          are competing. Scores of 4 or 5 will be treated as strict preferences: adhered to in
          all situations, unless there is a competing higher scored preference. Scores of 3 and below will
          be treated as soft preferences: adhered to as bonuses.
          </p>

          </Col>
          <Col sm={7}>
            <BasicForm />
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
            <AdvancedForm />
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

class ButtonControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFile: false,
      basicSet : false,
      advSet : false,
      canCreate : false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

}

export default App;
