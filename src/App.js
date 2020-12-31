import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {FileForm} from './FileLoad.js';
import {Stats} from './Results.js';
import {BasicForm, AdvancedForm} from './Form.js';
import React from 'react';
import {Button, Nav, Navbar, Container, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      schedule: null,
      stats: {"to be displayed": "stat data"},
    };

  }

  handleSubmit(){
    var self = this;
    axios.get('/results').then(
    (resp) => {
        console.log(resp.data);
        var result = JSON.parse(resp.data.replace(/\bNaN\b/g, "N/A"));
        self.setState({
          stats: result,
        });
      }
    ,
    (error) => {
        self.setState({error})
      }
    )
  }

  render(){
    const hrStyle = {
      "border-color": 'black'
    };
    console.log(this.state.stats);
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
        <Navbar.Collapse id="navbar">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <Form inline className="welcomeText">
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br></br>
      <br></br>


      <Container>
        <Row>
        <Col sm></Col>
        <Col md="auto">
        </Col>
        <Col sm></Col>
        </Row>
        <Row>
          <Col sm={5}>

          <h3>Step 1: Upload time data
          </h3>
          <p>Select the .csv file of labTA's time preferences to upload. Make sure that your file is formatted correctly.
          To see an example file, refer to ** link to github default_input.csv **.

          Then input the duration of all time slots (all slots must have same duration).

          Lastly, input the desired number of TA's working in each slot.
          </p>

          </Col>
          <Col sm={7}>
            <FileForm/>
          </Col>
        </Row>
        <br></br>
        <hr style={hrStyle}></hr>
        <br></br>
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
        <br></br>
        <hr style={hrStyle}></hr>
        <br></br>
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

            <Button variant="primary" onClick={this.handleSubmit} size="lg"> Create a Schedule!</Button>

          </Col>
          <Col sm={7}>
          </Col>
        </Row>
        <br></br>
        <hr style={hrStyle}></hr>
        <br></br>
        <Row>
          <Col sm={5}>
          <h3> Schedule Stats </h3>
          <Stats
          stats={this.state.stats}
          />

          </Col>
          <Col sm={7}>
          <h3> Your Schedule </h3>
          <p> {this.state.schedule} </p>
          </Col>
        </Row>
      </Container>


    </div>
  );
}
}

export default App;
