import React from 'react';
import './App.css';
import {Card, Container, Row, Col} from 'react-bootstrap';

function About(props){
  console.log('going to About page');
  var aaronPic = require('./pics/Aaron.png');
  var mattPic = require('./pics/Matt.png');
  var jeremiePic = require('./pics/Jeremie.png');
  const picStyle = {
    float:'center',
    width:'250px',
    height:'350px',
    margin: 'auto',
  }
  return(
    <div className="App">

    <br></br>

    <Container>
      <Row>
      <h3> About the Lab Scheduler </h3>
      <br></br>
      <p>The Lab Scheduler was developed over the summer of 2020 in order to automate the schedule creation process for
        the Princeton Computer Science Department's peer-to-peer tutoring lab. The system utilizes a max-weight matching
        algorithm provided by the PuLP package to solve the schedule problem. Original preferences and specifications were
        developed with the help of Shirley Zhang '20 and Justin Chang '21.
      </p>
      <br></br>
      </Row>
      <Row>
        <Col sm>
          <Card style={{ width: '20rem' }}>

            <Card.Img variant="top" src={aaronPic.default} style={picStyle}/>

            <Card.Body>
              <Card.Title><h2>Aaron Lichtblau</h2></Card.Title>
              <Card.Text>
                <h3 className="bio">  Optimizer of Happiness </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      <Col sm>
        <Card style={{ width: '20rem' }}>

          <Card.Img variant="top" src={mattPic.default} style={picStyle}/>

          <Card.Body>
            <Card.Title><h2>Matt Weinberg</h2></Card.Title>
            <Card.Text>
              <h3 className="bio"> Master of Algorithms </h3>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm>
        <Card style={{ width: '20rem' }}>

          <Card.Img variant="top" src={jeremiePic.default}/>

          <Card.Body>
            <Card.Title><h2>Jeremie Lumbroso</h2></Card.Title>
            <Card.Text>
              <h3 className="bio"> Sage of Software </h3>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      </Row>
    </Container>


    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>
  );
}
export {About};
