import React, {useEffect, useState} from "react";
import Spinner from "react-bootstrap/Spinner";

// CSS styling
const styles = {
    backgroundColor: "#fff",
    marginTop: "10px"
}
const imgStyles = {
    padding: "10px",
}
const headingStyle = {
    textAlign: "center",
    paddingTop: "20px",
    fontFamily: "Crimson Text",
    paddingBottom: "10px"
}


function GradeForm(props) {

    const cropNumber = props.cardIndex - 1;
    const uploadAllUpdates = (cropNumber === 7);
    const cardUrl = "http://localhost:5000/images/croppedCards/crop" + String(cropNumber) + ".png";

    // State: Keep track of user-entered details
    const [fieldEntries, setFieldEntries] = useState({
        currentIndex: cropNumber,
        slotValue: "",
        nameValue: "",
        sourceValue: "",
        gradeValue: "",
    });

    // Control render based on crop number
    useEffect(() => {
        console.log("Rendering card " + props.cardIndex);
        setFieldEntries({
            ...fieldEntries,
            slotValue: props.slotLetter + props.cardIndex.toString(),
            nameValue: "",
            sourceValue: "",
            gradeValue: "",
        });
    }, [cropNumber]);

    return (
        <form style={styles} onSubmit={(e) => {
            props.handleCardUpdate(e);
        }}>

            <div className="form-row" style={{margin: "auto"}}>
                <div className="col-7" style={{borderRight: "3px groove"}}>

                    <img className="img-responsive" src={cardUrl}
                         width="100%" style={imgStyles}/>
                </div>

                <div className="col">
                    <h3 style={headingStyle}> Card {props.cardIndex} Details </h3>

                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="slotNumber" className="col-sm-2 col-form-label">Slot</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="slotNumber"
                                   defaultValue={fieldEntries.slotValue}
                                   name="slotNumber"/>
                        </div>
                    </div>

                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="cardName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="cardName" placeholder="Juzam"
                                   name="cardName" value={fieldEntries.nameValue}
                                   onChange={(e) => setFieldEntries({...fieldEntries, nameValue: e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="cardSource" className="col-sm-2 col-form-label">Source</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="cardSource" placeholder="EbayUser"
                                   name="cardSource" value={fieldEntries.sourceValue}
                                   onChange={(e) => setFieldEntries({...fieldEntries, sourceValue: e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-group row mr-auto mt-auto ml-auto">
                        <label htmlFor="cardGrade" className="col-sm-2 col-form-label">Grade</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="cardGrade" placeholder="MP"
                                   name="cardGrade" value={fieldEntries.gradeValue}
                                   onChange={(e) => setFieldEntries({...fieldEntries, gradeValue: e.target.value})}/>
                        </div>
                    </div>

                    <div style={{textAlign: "center", marginTop: "20px", paddingBottom: "20px"}}>
                        <label>{props.cardIndex}/8</label>
                        <br/>

                        <button name="nextToggle" type="submit"
                                className={"btn btn-sm ml-auto mr-auto" + (uploadAllUpdates ? " btn-primary" : " btn-dark")}>
                            {uploadAllUpdates ? "Upload items" : "Next Card"}
                        </button>
                    </div>
                </div>
            </div>
        </form>);
}


export default GradeForm;