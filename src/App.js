import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {FileForm} from './FileLoad.js';
import {DataFrame, Stats} from './Results.js';
import {BasicForm} from './BasicForm.js';
import {AdvancedForm} from './AdvancedForm.js';
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
      df: [["headers"],{"index": ["row"]}],
      hideResults: true
    };
  }


  handleSubmit(){
    var self = this;
    axios.get('/results').then(
    (resp) => {
        console.log(resp.data);
        var result = resp.data;
        self.setState({
          stats: result['stats'],
          schedule: JSON.stringify(result['schedule']),
          df: result['df'],
          hideResults: false
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

    console.log(this.state.df);
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
          <p>Download your spreadsheet of labTA's time preferences as a .csv file. Then, upload your file by clicking "choosse file". Make sure that your file is formatted correctly.
          To see an example file, refer to ** link to github default_input.csv **.

          Then input the duration of a time slots (default is 2 hours).

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
          are competing. Scores of 4 and above will be treated as strict preferences: adhered to in
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
            <AdvancedForm/>
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
        <div className="Results" hidden={this.state.hideResults}>
          <Row>

            <h3> Your Schedule </h3>
            <div class= "container horizontal-scrollable">
            <DataFrame df={this.state.df}/>
            </div>

          </Row>

          <Row>
          <h3> Schedule Stats </h3>
          <Stats
          stats={this.state.stats}
          />
          </Row>

          <Row>
          <h3> Print Schedule </h3>
          <p> {this.state.schedule}</p>
          </Row>
        </div>
      </Container>


    </div>
  );
}
}

export default App;
