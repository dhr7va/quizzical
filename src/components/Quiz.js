import React from "react";
import he from "he";


const Quiz = ({ quiz, handleSelection, isSubmitted }) => {
    let { question, potentialAnswers } = quiz


    if (isSubmitted) {
        potentialAnswers = potentialAnswers.map((a) => {
            if (a.isSelected) {
                if (a.option === he.decode(quiz.correct_answer)) {
                    return { ...a, classes: "quiz-option correct" }
                } else {
                    return { ...a, classes: "quiz-option incorrect" }
                }
            } else if (a.option === he.decode(quiz.correct_answer)) {
                return { ...a, classes: "quiz-option correct" }
            }
            return { ...a, classes: "quiz-option" }
        })
    }


    return (
        <div className="quiz">
            <h3 className="quiz-question">{question}</h3>
            <div className="quiz-options">
                {!isSubmitted
                    ? potentialAnswers.map((a) => (
                        <span
                            key={a.id}
                            className={
                                a.isSelected ? "quiz-option selected" : "quiz-option"
                            }
                            onClick={() => handleSelection(quiz.id, a.id)}
                        >
                            {a.option}
                        </span>
                    ))
                    : potentialAnswers.map((a) => (
                        <span
                            key={a.id}
                            className={a.classes}
                        >
                            {a.option}
                        </span>
                    ))}
            </div>
        </div>
    );
}

export default Quiz;