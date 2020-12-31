import './App.css';
import React from 'react';
import {Table, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

function Stats(props){
    console.log(props.stats);
    var headers = Object.keys(props.stats);
    console.log(headers);

    var statBody = Object.keys(props.stats).map((header) =>
    <td>
    {props.stats[header]}
    </td>
  );
    return(
      <Table striped bordered hover responsive="md">
    <thead>
    <tr>
    {headers.map(header => <th>{header}</th>)}
    </tr>
    </thead>
      <tbody>
      {statBody}
      </tbody>
  </Table>
    );
  }

export {Stats};
