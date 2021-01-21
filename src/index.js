import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { About } from './About';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import {Nav, Navbar, Form } from 'react-bootstrap';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* a bunch of navbar bs that looks cool*/}
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img src={require("./pics/princeton.png").default}
          alt="Princeton"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Lab Scheduler
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Form inline className="welcomeText">
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>


      <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/about' component={About} />
        <Route render={function () {return <p>Not found</p>}} />
      </Switch>
      </div>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
