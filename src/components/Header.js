import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

function Header() {
    const styles = {
        marginBottom: 0
    };

    return (
        <Jumbotron style={styles}>
            <h1 className="display-4">
                Purplemana
                <span role="img" aria-label="emojis"> 🔮💧☀️💀🎄🔥 </span>
            </h1>
            <p className="lead">Automating the workflow</p>
            <hr className="my-4"/>
            <p>Detect cards from your scans and update inventory!</p>
        </Jumbotron>
    );
}

export default Header;