import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProductsDetails from "./ProductsDetails";
import Spinner from "react-bootstrap/Spinner";


const styles = {
    backgroundColor: "#fff",
    // textAlign: "center",
    margin: "auto",
    marginTop: "10px",
    width: "100%"
}


function PostModal(props) {
    const showModal = props.show;
    const handleClose = props.handleClose;
    const handleSubmit = props.handleSubmit;
    const recordData = props.recordData;

    const onLoad = {
        Spin:
            <div style={{textAlign: "center", margin: "auto", marginTop: "10%"}}>
                <Spinner animation="border" variant="primary"/>
            </div>,
        body:
            <div>
                <h3>CSV Updated!</h3>
                <hr/>
                <Button type="button" variant="primary" onClick={handleClose}>
                    Done
                </Button>
            </div>
    }

    return (
        <Modal show={showModal}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title>Post Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.modalLoading ? onLoad.Spin :
                    props.csvUpdated ? onLoad.body :
                        <form action='/shopify' method="post" encType="multipart/form-data" style={styles}
                              onSubmit={handleSubmit}>
                            <ProductsDetails recordData={recordData}/>
                            <hr/>
                            <div style={{textAlign: "center"}}>
                                <Button type="submit" variant="secondary">
                                    Add to CSV
                                </Button>
                            </div>
                        </form>
                }
            </Modal.Body>
        </Modal>
    );
}

export default PostModal