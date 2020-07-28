import React, {useEffect, useState} from "react";
import GradeForm from "./GradeForm";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";


function DetailsForm(props) {

    // State to keep track of details that user enters for each card
    const [gradeFormDetails, setGradeFormDetails] = useState({
        currentStep: 1,
        cardDetails: []
    });

    // Loading state
    const [loading, setLoading] = useState(false);


    // Post data to /inventory to update inventory.
    function uploadAllItems() {
        const data = gradeFormDetails.cardDetails;
        axios.post('http://localhost:5000/inventory', data)
            .then(function (response) {
                console.log(response);
                setLoading(false);
            })
            .catch(error => {
                console.log("ERROR " + error);
            })
    }

    // Update current state
    function updateDetails(event) {
        const {slotNumber, cardName, cardSource, cardGrade} = event.target;
        const cardsArray = [...gradeFormDetails.cardDetails];

        setGradeFormDetails(prevState => ({
            currentStep: prevState.currentStep + 1,
            cardDetails: [
                ...cardsArray,
                {
                    slotNumber: slotNumber.value,
                    cardName: cardName.value,
                    cardSource: cardSource.value,
                    cardGrade: cardGrade.value
                }]
        }));
    }

    // Wrapper function to handle card update
    async function handleCardUpdate(event) {
        event.preventDefault();
        updateDetails(event);
        if (gradeFormDetails.currentStep === 8) {
            setLoading(true)
        }
    }

    // Control rendering based on loading state
    useEffect(() => {
        if (loading) {
            uploadAllItems()
            props.storeDetails(gradeFormDetails.cardDetails);
        } else {
            console.log("Ignore useEffect");
        }
    }, [loading]);


    if (gradeFormDetails.currentStep <= 8) {
        return (
            <GradeForm cardIndex={gradeFormDetails.currentStep} handleCardUpdate={handleCardUpdate}
                       slotLetter={props.slotLetter}/>
        );
    } else {

        return (
            <div style={{textAlign: "center", justifyContent: "center"}}>
                {loading === true ?
                    <Spinner animation="border" variant="primary"/> :
                    <button
                        name="confirmSubmission" type="button"
                        className={"btn btn-lg m-auto p-auto btn-primary"}
                        onClick={() => {
                            props.onNext()
                        }}>
                        Review Updates
                    </button>
                }
            </div>
        );
    }
}


export default DetailsForm;