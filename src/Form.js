import React from 'react';
import axios from "axios";
import {Button, Form, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>


function Radio(props) {
  return (
    <>
    <Form.Check inline label={props.value} type='radio' id={`inline-radio`} name={props.type} onClick={props.onClick}/>
    </>
  )
}

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      value: props.value,
    };
  }

  renderRadio(i) {
    return(
        <Radio
          type = {this.props.name}
          value= {i}
          onClick={() => this.props.handleClick(this.props.name,i)}
        />
      );
    }
  render(name) {

    return(
      <div>
        {this.renderRadio('1')}
        {this.renderRadio('2')}
        {this.renderRadio('3')}
        {this.renderRadio('4')}
        {this.renderRadio('5')}
      </div>
    )
  }

}


class BasicForm extends React.Component {
  constructor(props){
  super(props);
  this.handleClick = this.handleClick.bind(this);

  this.state = {
    slots: props.slots,
    duration: 120,
    avail : 5,
    slot_type: 3,
    no_1: 2,
    guarantee_shift : 4,
    shift_cap : 4,
    equality: 2,
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

  renderQuestion(name, val){
    return (
      <Question
      name={name}
      value={val}
      handleClick={this.handleClick}
      />
  )}

  render(){
    return(
    <div className="mb-3">
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
    </div>
  )}
}
class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
  };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({file: value});
    event.preventDefault();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.state.file !== prevProps.file) {
      console.log(this.state.file);
      console.log('hi');
      this.fetchData();
    }
  }

  fetchData(){
    // const data = new FormData();
    // data.append('file', this.state.file);
    var self = this;
    // const config = {headers: { 'content-type': 'multipart/form-data' }}
    var data = {file: this.state.file};
    axios.post('/file', data)
    .then(res => { // then print response status
        console.warn(res);
    })
    // axios.get('/file/df').then(
    // (response) => {
    //   self.setState({
    //     df: response.data.df
    //   });
    //   console.log(response.data.df);
    // },
    // (error) => {
    //   self.setState({
    //     error
    //   });
    // }
    // )
  }

  render() {
    return (
      <div className = "inputFile">
        <Form.File
        id="exampleFormControlFile1"
        label=""
        width ="60"
        onChange={this.handleInputChange}/>
      </div>
    );
  }
}
// class FileForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedFile: ''
//   };
//   }
//
//   submit(event) {
//     // send file and create slotdict
//     this.setState({
//         selectedFile: event.target.files[0],
//       })
//     console.log('A name was submitted: ' + this.state.selectedFile);
//
//     const data = new FormData();
//     data.append('file', this.state.selectedFile);
//     var self = this;
//     const config = {headers: { 'content-type': 'multipart/form-data' }}
//     axios.post('/file', data, config)
//     .then(res => { // then print response status
//         console.warn(res);
//     })
//     axios.get('/file/df').then(
//     (response) => {
//       self.setState({
//         selectedFile: response.data.file
//       });
//       console.log(response.data.file);
//     },
//     (error) => {
//       self.setState({
//         error
//       });
//     }
//   )
//     // event.preventDefault();
//   };
//
//   render() {
//     return (
//       <div className = "inputFile">
//         <Form.File
//           id="exampleFormControlFile1"
//           label=""
//           width ="60"
//           onChange={()=>this.submit()}
//         />
//       </div>
//     );
//   }
// }

export {BasicForm, FileForm};
