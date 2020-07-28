import React, {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import PostModal from "./PostModal";


function Shopify() {
    const [isLoading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [modalLoading, setModalLoading] = useState(false);
    const [csvUpdated, setCsvUpdated] = useState(false);

    // Get request to fetch inventory on render
    useEffect(() => {
        console.log("Get request to fetch In Hand products");
        axios.get("http://localhost:5000/inventory")
            .then((response) => {
                console.log("Got Response");
                console.log(response);
                const totalRecords = response.data.records.splice(1); // Get all rows except first
                const cols = response.data.records[0];
                const productsInHand = []
                totalRecords.map((record) => {
                    const row = record.split('\t');
                    if (row[0].toLocaleLowerCase() == "in hand") {              // Filter out records that are "In Hand"
                        productsInHand.push({
                            status: row[0],
                            cardName: row[3],   // See MainInventory for indexes
                            slot: row[2],
                            grade: row[4],
                            price: row[10],
                            cost: row[8],
                            imgSrc: ""
                        });
                    }
                });
                setRecords(productsInHand);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error!");
                console.log(err);
            });
    }, []);


    // Handle "post button" click
    function handleClick(event) {
        console.log(event.target.value);
        const index = event.target.value;
        setCurrentRecord(records[index]);
        setShowModal(true);
        setModalLoading(false);
        setCsvUpdated(false);
    }

    // Handle Closing Modal
    function handleClose(event) {
        console.log("Modal Closed");
        setModalLoading(false);
        setCsvUpdated(false);
        setShowModal(false);
        setCurrentRecord({});
    }

    // Handle Submit Form
    function handleSubmit(event) {
        event.preventDefault();
        setModalLoading(true);
        console.log("Submitting Form...");
        const data = new FormData(event.target);
        axios.post("http://localhost:5000/shopify", data)
            .then(async function (response) {
                console.log("Got Response!");
                console.log(response);
                setModalLoading(false);
                setCsvUpdated(true);
            })
            .catch(function (err) {
                console.log("Error!")
                console.log(err);
            });
        // setShowModal(false);
        setCurrentRecord({});
    }


    if (isLoading) {
        return (
            <div style={{textAlign: "center", margin: "auto", marginTop: "10%"}}>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    } else {
        console.log(records);
        return (
            <div style={{
                backgroundColor: "#435055",
                paddingTop: "50px",
                paddingBottom: "50px"
            }}>
                <div style={{
                    width: '70%',
                    margin: "auto",
                }}>
                    <Table responsive striped bordered hover variant="dark"
                           style={{textAlign: "center", width: "100%"}}>
                        <thead>
                        <tr>
                            <th>Status</th>
                            <th>Card</th>
                            <th>Slot</th>
                            <th>Grade</th>
                            <th>Price</th>
                            <th>Cost</th>
                            <th>Shopify</th>
                        </tr>
                        </thead>
                        <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <td>{record.status}</td>
                                    <td>{record.cardName}</td>
                                    <td>{record.slot}</td>
                                    <td>{record.grade}</td>
                                    <td>{record.price}</td>
                                    <td>{record.cost}</td>
                                    <td>
                                        <button key={index} value={index} type="submit" className="btn btn-primary"
                                                onClick={handleClick}>
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>

                    {showModal &&
                    <PostModal
                        show={showModal}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        recordData={currentRecord}
                        modalLoading={modalLoading}
                        csvUpdated={csvUpdated}
                    />}
                    {console.log(currentRecord)}
                </div>
            </div>
        );
    }
}

export default Shopify;