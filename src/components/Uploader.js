import React, {useState} from "react";


function Uploader(props) {


    const [label, setLabel] = useState("Choose file");
    const headingStyle = {
        textAlign: "center",
        paddingTop: "30px"
    }


    const handleChange = (e) => {
        if (props.side === "Front-Side") {
            setLabel("FrontScan");
        } else {
            setLabel("BackScan");
        }
    }

    return (
        <div>
            <h3 style={headingStyle}> Upload {props.side} Scan </h3>
            <div className="input-group mt-4 pl-2 pr-2">
                <div className="input-group-prepend">
                    <span className="input-group-text"> Upload </span>
                </div>
                <div className="custom-file">
                    <input name="scan" type="file" className="custom-file-input" onChange={handleChange}/>
                    <label className="custom-file-label"> {label} </label>
                </div>
            </div>
        </div>
    );
}

export default Uploader;