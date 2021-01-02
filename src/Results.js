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
    <td style={{color:"white"}}>
    {props.stats[header]}
    </td>
  );
    return(
      <Table striped bordered hover responsive="inline-flex">
    <thead>
    <tr>
    {headers.map(header => <th style={{color:"white"}}>{header}</th>)}
    </tr>
    </thead>
      <tbody>
      {statBody}
      </tbody>
  </Table>
    );
  };

// <tr>
// <th>4</th>
// <td>Kyle Johnson</td>
// <td>3</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>3</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>2</td>
// <td>1</td>
// <td>0</td>
// <td>0</td>
// <td>0</td>
// <td>2</td>
// <td>-2</td>
// <td>1</td>
// <td>0</td>
// <td>0</td>
// <td>2</td>
// <td>20</td>
// <td>2</td>
// <td>33</td>
// <td>180</td>
// <td>2</td>
// <td>3</td>
// <td>4</td>
// </tr>
// props.df: [headers, rows]
  // headers: [col headers]
  // rows: {index: list(values)}
function TableRow(props) {
  const entries = props.values.map((val) =>
  <td style={{color:"white"}}> {val} </td>
);
return entries;
}

function DataFrame(props){
  const df = props.df;
  console.log(df);
  if (df[0][0] != 'Index') {df[0].splice(0,0,'Index');}

  const cols = df[0];
  console.log(cols);
  const rows = df[1];
  console.log(rows);
  const headers = cols.map(header => <th style={{color:"white"}}>{header}</th>);
  console.log(headers);
  var body = Object.keys(rows).map((index) =>
  <tr>
    <th style={{color:"white"}}> {index} </th>
      <TableRow values={rows[index]} />
  </tr>
);

  return(
    <Table striped bordered hover responsive="inline-flex">
  <thead>
  <tr> {headers}
  </tr>
  </thead>
    <tbody>
      {body}
    </tbody>
</Table>
  );
};




export {DataFrame, Stats};
