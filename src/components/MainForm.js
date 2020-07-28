import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DetectForm from "./DetectForm";
import DetailsForm from "./DetailsForm";
import axios from "axios";
import ReviewList from "./ReviewList";


const useStyles = makeStyles((theme) => ({
    root1: {
        backgroundColor: "#435055",
        paddingTop: "50px",
        paddingBottom: "50px"
    },
    root: {
        width: '70%',
        margin: "auto",
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttonContainer: {
        // marginLeft: "500px"
    }
}));

function getSteps() {
    return ['Detect cards', 'Update Inventory', 'Review'];
}


function MainForm() {


    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DetectForm onNext={handleNext} updateSlot={setSlotLetter}/>;
            case 1:
                return <DetailsForm onNext={handleNext} storeDetails={storeCardDetails}
                                    slotLetter={cardDetails.slotLetter}/>;
            case 2:
                return <ReviewList details={cardDetails.cardsInfo}/>;
            default:
                return 'Unknown step';
        }
    }


    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [cardDetails, setCardDetails] = useState({
        slotLetter: "",
        cardsInfo: {}
    });
    const steps = getSteps();

    const handleNext = () => {
        axios.delete("http://localhost:5000/upload")
            .then(async function (response) {
                console.log("Deleted All Scans")
            })
            .catch(function (err) {
                console.log("ERROR")
                console.log(err);
            });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const storeCardDetails = (newCardDetails) => {
        setCardDetails({
            ...cardDetails,
            cardsInfo: newCardDetails
        });
        console.log("New card details added in Main form");
        console.log(cardDetails);
    }
    const setSlotLetter = (letter) => {
        setCardDetails({
            ...cardDetails,
            slotLetter: letter
        });
    }

    useEffect(() => {
        console.log("useEffect rendered");
        console.log(cardDetails);
    }, [cardDetails]);

    return (
        <div className={classes.root1}>
            <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed!
                            </Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {/*<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>*/}
                            <div className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}
                                        className={classes.button}>
                                    Back
                                </Button>

                                <Button variant="contained" color="primary" onClick={handleNext}
                                        className={classes.button}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainForm;