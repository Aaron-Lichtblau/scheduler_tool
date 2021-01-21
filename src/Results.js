import './App.css';
import React from 'react';
import {Table, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

function renderInfo(header) {
  var infoConversion = {
    "Average happiness / 100":"Let s(i,j) = score student i gave to shift j. Let cap(i) = student i's cap value. Each students' happiness is calculated as the sum of s(i,j) for the shifts they received / cap(i) * 3. This captures that a student would have happiness '100' if they received their cap number of shifts which they rated as '3', and crudely measures their happiness as < 100 if they don't. Average Happiness is reported as average happiness over all students.",
    "Standard deviation of students' happiness / 100":"This score is the standard deviation of the students' happiness scores",
    "Unhappy student outliers":"Students who were treated especially poorly will be listed here.",
    "Correlation of students' availability to happiness in [-1, 1]":"Shows how well a student's availability given predicts their happiness (on -1 to 1 scale).",
    "Correlation of students' skill to happiness in [-1, 1]":"Shows how well a student's skill predicts their happiness (on -1 to 1 scale).",
    "Correlation of students' experience to happiness in [-1, 1]":"Shows how well a student's experience predicts their happiness (on -1 to 1 scale).",
    "Students who got 1's":"Any students who were scheduled at a time which they reported as a 1 are listed here.",
    "Students without a shift":"Any students who did not receive a shift are listed here.",
    "Students who got the wrong type of shift (2hr vs. 4hr)":"Any students who were scheduled in a shift that is not their desired type of shift are listed here."
  };
  return(
      <Popover id="popover-basic">
        <Popover.Title as="h3">{header} Information</Popover.Title>
        <Popover.Content>
          {infoConversion[header]}
        </Popover.Content>
      </Popover>
    );
}


function Stats(props){
  //
    // console.log(props.stats);
    // console.log(headers);

    var statConversion = {
      "avg hap":"Average happiness / 100",
      "std dev of hap":"Standard deviation of students' happiness / 100",
      "min hap stud outliers":"Unhappy student outliers",
      "avail to hap corr":"Correlation of students' availability to happiness in [-1, 1]",
      "skill to hap corr":"Correlation of students' skill to happiness in [-1, 1]",
      "experience to hap corr":"Correlation of students' experience to happiness in [-1, 1]",
      "studs who got 1s":"Students who got 1's",
      "studs without shift":"Students without a shift",
      "wrong shift type studs":"Students who got the wrong type of shift (2hr vs. 4hr)"
    };
    var body = Object.keys(props.stats).map((header) =>
    <tr>
      <th style={{color:"white"}}> {statConversion[header]}
      <OverlayTrigger trigger="click" placement="right" overlay={renderInfo(statConversion[header])}>
        <Button variant="warning">i</Button>
      </OverlayTrigger>
      </th>
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
