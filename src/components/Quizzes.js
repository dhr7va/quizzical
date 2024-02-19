import React from "react";
import Quiz from "./Quiz";

const Quizzes = ({
    quizzes,
    handleSelection,
    isSubmitted,
    handleSubmission,
    handleSubmissionClick,
    resetGame
}) => {

    return (
        <div className="quizzes">

            {quizzes.map((q, i) => (
                <Quiz
                    key={q.id}
                    quiz={q}
                    handleSelection={handleSelection}
                    isSubmitted={isSubmitted}
                />
            ))}

            <div className="quizzes-btn_container">

                {
                    isSubmitted ? (
                        <p className="score-text">
                            You scored {handleSubmission()}/5 correct answers
                        </p>
                    ) : null
                }

                {!isSubmitted ? (
                    <button
                        className="quizzes-btn"
                        onClick={handleSubmissionClick}
                    >
                        Check answers
                    </button>
                ) : (
                    <button
                        className="quizzes-btn"
                        onClick={resetGame}
                    >
                        Play again
                    </button>
                )}
            </div>
        </div>
    );


}

export default Quizzes;