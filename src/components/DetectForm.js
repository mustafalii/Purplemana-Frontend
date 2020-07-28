import React, {useState} from "react";
import Uploader from "./Uploader";
import DetectModal from "./DetectModal";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";


function DetectForm(props) {

    // State: Display Modal
    const [showModal, setShowModal] = useState(false);
    // State: Links to detected cards
    const [detectedCards, setDetectedCards] = useState([]);
    // State: Control loading
    const [loading, setLoading] = useState(false);
    // State: Slot Letter
    const [slotLetter, setSlotLetter] = useState("No Slot Letter Detected");

    const styles = {
        backgroundColor: "#fff",
        marginTop: "10px"
    }

    // Hide the Modal display
    // Delete request to /upload to delete any images in scannedCards & detectedCards directories
    function hideModal() {
        setShowModal(false);
        axios.delete("http://localhost:5000/upload")
            .then(async function (response) {
                console.log("Deleted All Scans")
            })
            .catch(function (err) {
                console.log("ERROR")
                console.log(err);
            })
        // window.location.reload(false);
    }

    // Post request to /upload to detect cards from the user uploaded scans
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log("Posting data...");
        setLoading(true);
        axios.post('http://localhost:5000/upload', data)
            .then(async function (response) {
                console.log("Got response:");
                console.log(response.data.files);
                console.log(response.data.slotLetter);
                await setDetectedCards(response.data.files);
                setSlotLetter(response.data.slotLetter);
                props.updateSlot(response.data.slotLetter); //DELETE IF WARNING
                setLoading(false);
                setShowModal(true);
            })
            .catch(function (error) {
                console.log(" ERROR IS ", error);
            });
    }

    return (
        <form action='/upload' method="post" encType="multipart/form-data" style={styles} onSubmit={handleSubmit}>
            <Uploader side="Front-Side"/>
            <Uploader side="Back-Side"/>
            <div style={{textAlign: "center", marginTop: "20px", paddingBottom: "20px"}}>
                <button type="submit" className="btn btn-primary">
                    Detect Cards
                </button>
            </div>
            {/*{<Spinner animation="border" variant="primary"></Spinner>}*/}
            <div style={{textAlign: "center"}}>
                {loading ? <Spinner animation="border" variant="primary"/> : null}
            </div>
            {showModal === true &&
            <DetectModal show={showModal} handleClose={hideModal} images={detectedCards} slotLetter={slotLetter}
                         onNext={props.onNext}/>}
        </form>
    );
}


export default DetectForm;