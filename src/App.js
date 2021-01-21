import './App.css';
import axios from "axios";
import {FileForm} from './FileLoad.js';
import {DataFrame, Stats} from './Results.js';
import {BasicForm} from './BasicForm.js';
import {AdvancedForm} from './AdvancedForm.js';
import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>



class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resSection = React.createRef();

    this.state = {
      schedule: null,
      stats: {"to be displayed": "stat data"},
      df: [["headers"],{"index": ["row"]}],
      hideResults: true,
      hideSpinner: true,
      hideInfeasible: true,
    };
  }

  scrollTo(ref){
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  handleSubmit(){
    var self = this;
    self.setState({hideSpinner: false});
    axios.get('/results').then(
    (resp) => {
        console.log(resp.data);
        var result = resp.data;
        self.setState({
          stats: result['stats'],
          schedule: JSON.stringify(result['schedule']),
          df: result['df'],
          hideSpinner: true
        });
        if (result['stats']['avg hap'] > 100){
          console.log('infeasible');
          self.setState({hideInfeasible: false, hideResults:true})
        }
        else{
          self.setState({hideResults:false, hideInfeasible:true})
        }

        this.scrollTo(self.resSection);
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
          <p>Download your spreadsheet of labTA's time preferences as a .csv file. Then,
          upload your file by clicking "choose file". Make sure that your file is formatted correctly.
          To see an example file, refer to: &nbsp;
          <a href= "https://github.com/Aaron-Lichtblau/scheduler_tool/blob/main/api/default_input.csv"
          target="_blank"
          rel="noreferrer">
           example csv
          </a>
          .

          Then input the duration of time slots (default is 2 hours).

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
          be treated as soft preferences: adhered to as bonuses. Scores do not have to be unique.
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
          The outputted schedule will be based on these preferences. This is a good place to
          adjust constraints on the scheduler.
          </p>

          </Col>
          <Col sm={7}>
            <AdvancedForm/>
          </Col>
        </Row>
        <br></br>
        <hr style={hrStyle}></hr>
        <br></br>
        <Row>
          <Col>
          </Col>
          <Col>
            <Button  variant="primary" onClick={this.handleSubmit} size="lg">
            <img
              alt=""
              src={require("./pics/princeton.png").default}
              width="30"
              height="30"
              className="App-logo2"
              hidden={this.state.hideSpinner}
            />{' '}
            Create a Schedule!</Button>
            </Col>
            <Col>
            </Col>
        </Row>
        <br></br>
        <br></br>

        <div className="Infeasible" hidden={this.state.hideInfeasible}>
        <p> Something over-constrained the scheduler, please adjust settings </p>
        </div>
        <div className="Results" hidden={this.state.hideResults} ref={this.resSection}>
          <Row>
            <h3> Your Schedule (slide right to view fully)</h3>
            <div class= "container horizontal-scrollable">
            <DataFrame df={this.state.df}/>
            </div>

          </Row>
          <br></br>
          <Row>
          <h3> Schedule Stats </h3>
          </Row>
          <br></br>
          <Row>
          <Stats
          stats={this.state.stats}
          />
          </Row>
          <br></br>
          <Row>
          <h3> Print Out of Schedule </h3>
          <p> {this.state.schedule}</p>
          </Row>
        </div>

        <br></br>
        <hr style={hrStyle}></hr>
        <br></br>

        <div className="footer">
        <p>Created by &nbsp;
        <a href= "https://github.com/Aaron-Lichtblau"
           target="_blank"
           rel="noreferrer">
          Aaron Lichtblau
        </a>
         &nbsp; under the mentorship of &nbsp;

         <a href= "https://www.cs.princeton.edu/people/profile/lumbroso"
            target="_blank"
            rel="noreferrer">
         Professor Jérémie Lumbroso
         </a>
         &nbsp; and &nbsp;
         <a href="https://www.cs.princeton.edu/people/profile/smattw"
            target="_blank"
            rel="noreferrer">
         Professor Matt Weinberg
         </a>
         .
        </p>
        </div>

        <br></br>
        <br></br>

      </Container>


    </div>
  );
}
}

export default App;
