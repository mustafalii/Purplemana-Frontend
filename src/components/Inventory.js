import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";


function Inventory() {

    // State: Control loading
    const [isLoading, setLoading] = useState(true);
    // State: Inventory records
    const [records, setRecords] = useState([]);
    // State: Inventory attributes/column names
    const [cols, setCols] = useState([]);

    // Get request to fetch inventory on render
    useEffect(() => {
        console.log("Get request to fetch inventory");
        axios.get("http://localhost:5000/inventory")
            .then((response) => {
                console.log("Got Response");
                console.log(response);
                setRecords(response.data.records.splice(1));
                setCols(response.data.records[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error!");
                console.log(err);
            });
    }, []);

    if (isLoading) {
        return (
            <div style={{textAlign: "center", marginTop: "10%"}}>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    } else {
        return (
            <Table responsive striped bordered hover variant="dark" style={{textAlign: "center", width: "100%"}}>
                <thead>
                <tr>
                    {cols.split("\t").map((col, index) => {
                        return (<th key={index}>{col}</th>);
                    })}
                </tr>
                </thead>
                <tbody>


                {records.map((record, ind) => {
                    return (
                        <tr key={ind}>
                            {record.split("\t").map((rec, index) => {
                                return (<td key={index}>{rec}</td>);
                            })}
                        </tr>);
                })}

                </tbody>
            </Table>
        );
    }
}

export default Inventory;