import React, { useState } from 'react';
import './Quiz.css';

const questions = [
  {
    question: "Яка ваша улюблена кольор?",
    answers: ["Червоний", "Синій", "Зелений"],
    correctAnswer: "Синій"
  },
  {
    question: "Яка ваша улюблена їжа?",
    answers: ["Піца", "Суші", "Бургери"],
    correctAnswer: "Суші"
  },
  {
    question: "Яка ваша улюблена тварина?",
    answers: ["Кіт", "Собака", "Папуга"],
    correctAnswer: "Собака"
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setCorrectCount(correctCount + 1);
      }
      setAnswers([...answers, selectedAnswer]);
      setSelectedAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizFinished(true);
      }
    } else {
      alert("Будь ласка, виберіть відповідь перед переходом до наступного питання.");
    }
  };

  const renderResult = () => {
    alert(`Опитування завершено! Правильні відповіді: ${correctCount} з ${questions.length}`);
  };

  return (
    <div className="container">
      <div className="quiz-container">
        {quizFinished ? (
          <div>
            <h2>Опитування завершено!</h2>
            <div style={{ display: 'flex', margin: '10px 0' }}>
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;
                const isCorrect = isAnswered && answers[index] === questions[index].correctAnswer;
                return (
                  <div
                    key={index}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: isCorrect ? 'green' : (isAnswered ? 'red' : 'lightgray'),
                      margin: '0 5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    {isAnswered ? (isCorrect ? '✔️' : '❌') : index + 1}
                  </div>
                );
              })}
            </div>
            <button onClick={renderResult}>Показати результати</button>
          </div>
        ) : (
          <div>
            <h2>Питання {currentQuestion + 1} з {questions.length}</h2>
            <hr />
            <h3>{questions[currentQuestion].question}</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {questions[currentQuestion].answers.map((answer, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswer(answer)} 
                  style={{ 
                    backgroundColor: selectedAnswer === answer ? '#cce5ff' : '#ffffff', 
                    margin: '5px 0' 
                  }}
                >
                  {answer}
                </button>
              ))}
            </div>
            <div>
              <h3>Ваш прогрес:</h3>
              <div style={{ display: 'flex', margin: '10px 0' }}>
                {questions.map((_, index) => {
                  const isAnswered = index < currentQuestion;
                  const isCorrect = isAnswered && answers[index] === questions[index].correctAnswer;
                  return (
                    <div
                      key={index}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: isCorrect ? 'green' : (isAnswered ? 'red' : 'lightgray'),
                        margin: '0 5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      {isAnswered ? (isCorrect ? '✔️' : '❌') : index + 1}
                    </div>
                  );
                })}
              </div>
            </div>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;