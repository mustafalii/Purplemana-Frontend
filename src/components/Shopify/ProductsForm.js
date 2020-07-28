import React, {useState} from "react";
import ProductsDetails from "./ProductsDetails";


function ProductsForm(props) {
    const totalSteps = props.totalSteps;
    const totalRecords = props.records;
    const [currentStep, setCurrentStep] = useState(0)
    const [currentRecord, setCurrentRecord] = useState(totalRecords[currentStep]);
    console.log(currentRecord);
    return (<ProductsDetails record={currentRecord}/>);
}

export default ProductsForm;