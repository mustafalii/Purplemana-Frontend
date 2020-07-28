import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DetectModal(props) {

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cards Detected</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please confirm if all cards have been correctly detected!
                <hr/>
                <h5>Slot Letter: {props.slotLetter}</h5>
                <br/>
                {props.images.map((image, index) => {
                    return (
                        <img src={image} key={index} width="200"/>
                    );
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Upload Again
                </Button>
                <Button variant="primary" onClick={props.onNext}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DetectModal;