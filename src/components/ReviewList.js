import React, {useState} from 'react';
import axios from "axios";
import Table from "react-bootstrap/Table";


function ReviewList(props) {
    console.log(props.details);
    return (
        <Table responsive striped bordered hover variant="dark" style={{textAlign: "center", width: "100%"}}>
            <thead>
            <tr>
                <th>Status</th>
                <th>Source</th>
                <th>Slot</th>
                <th>Card Name</th>
                <th>Grade</th>
            </tr>
            </thead>
            <tbody>

            {props.details.map((row, index) => {
                console.log("row ");
                console.log(row);
                return (
                    <tr key={index}>
                        <td>In Hand</td>
                        <td>{row.cardSource}</td>
                        <td>{row.slotNumber}</td>
                        <td>{row.cardName}</td>
                        <td>{row.cardGrade}</td>

                    </tr>
                );
            })}

            {/*<td>{props.cardDetails[2]}</td>*/}
            {/*<td>{props.cardDetails[0]}</td>*/}
            {/*<td>{props.cardDetails[1]}</td>*/}
            {/*<td>{props.cardDetails[3]}</td>*/}

            </tbody>
        </Table>

    );

}

export default ReviewList;