import './App.css';
import React from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

function Stats(props){
    // console.log(props.stats);
    // console.log(headers);
    var statConversion = {
      "avg hap":"average happiness",
      "std dev of hap":"standard deviation of students' happiness",
      "min hap stud outliers":"Unhappy student outliers",
      "avail to hap corr":"Correlation of students' availability to happiness",
      "skill to hap corr":"Correlation of students' skill to happiness",
      "experience to hap corr":"Correlation of students' experience to happiness",
      "studs who got 1s":"Students who got 1's",
      "studs without shift":"Students without a shift",
      "wrong shift type studs":"Students who got the wrong type of shift (2hr vs. 4hr)"
    };
    var body = Object.keys(props.stats).map((header) =>
    <tr>
      <th style={{color:"white"}}> {statConversion[header]} </th>
        <td style={{color:"white"}}> {props.stats[header].toString()} </td>
    </tr>);
    return(
      <Table striped bordered hover responsive="inline-flex">
    <thead>
    </thead>
      <tbody>
      {body}
      </tbody>
  </Table>
  );
}

function TableRow(props) {
  const entries = props.values.map((val) => CreateEntry(val));
  return entries;
}
function CreateEntry(val){
  var backColor = null;
  var textColor = 'white';
  if (val === '-1'){backColor = '#D00000'};
  if (val === '-2'){backColor = '#FFD000'; textColor = 'black'};
  if (val === '-3'){backColor = '#00A86B'};
  const entry = <td style={{color:textColor, backgroundColor: backColor}}> {val} </td>;
  return entry;
}

// props.df: [headers, rows]
  // headers: [col headers]
  // rows: {index: list(values)}
function DataFrame(props){
  const df = props.df;
  console.log(df);
  if (df[0][0] !== 'Index') {df[0].splice(0,0,'Index');}

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
