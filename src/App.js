import React, { useEffect, useState } from 'react'
import he from 'he'
import Quizzes from "./components/Quizzes"
import StartPage from "./components/StartPage"


export default function App() {
  const [questions, setQuestions] = useState([])
  const [gameInSession, setGameInSession] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)


  useEffect(() => {
    if (gameInSession) {
      const response = fetch(
        " https://opentdb.com/api.php?amount=5&category=12&difficulty=hard&type=multiple");
      response
        .then((r) => r.json())
        .then((data) => {
          let results = data.results
          results = results.map((r, i) => ({
            ...r,
            id: i,
            question: he.decode(r.question),
            potentialAnswers: getObjFromArr(r.correct_answer, r.incorrect_answers)
          }))
          setQuestions(results)
        });
    }
  }, [gameInSession])


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  const getObjFromArr = (val, arr) => {
    let newArr = [...arr, val]
    return shuffleArray(newArr.map((val, i) => ({
      option: he.decode(val),
      id: i,
      isSelected: false
    })))
  }


  const startQuiz = () => {
    setGameInSession(!gameInSession)
  }


  const handleSelection = (questionId, answerId) => {
    setQuestions(questions.map((q) => {
      if (q.id === questionId) {
        q.potentialAnswers = q.potentialAnswers.map((a) => {
          if (a.id === answerId) {
            return { ...a, isSelected: !a.isSelected }
          }
          return { ...a, isSelected: false }
        })
      }
      return q
    }))
  }


  const handleSubmission = () => {
    let score = 0
    questions.forEach((q) => {
      let correctAnswer = q.potentialAnswers.find((a) => a.option === he.decode(q.correct_answer))
      if (correctAnswer.isSelected) {
        score++
      }
    })
    return score
  }


  const handleSubmissionClick = () => {
    setIsSubmitted(!isSubmitted)
  }


  const resetGame = () => {
    setGameInSession(!gameInSession)
    setIsSubmitted(!isSubmitted)
  }


  return (
    <main className="main">
      {!gameInSession && <StartPage startQuiz={startQuiz} />}
      {gameInSession
        && <Quizzes
          quizzes={questions}
          handleSelection={handleSelection}
          isSubmitted={isSubmitted}
          handleSubmission={handleSubmission}
          handleSubmissionClick={handleSubmissionClick}
          resetGame={resetGame}
        />
      }
    </main>
  )

}
