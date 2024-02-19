import React from "react";

const StartPage = ({ startQuiz }) => {
    return (
        <div className="starter">
            <h1 className="start-heading">Quizzical</h1>
            <p className="start-description">Some description if needed</p>
            <button
                className="start-btn"
                onClick={startQuiz}
            >Start quiz</button>
        </div>
    )
}

export default StartPage;