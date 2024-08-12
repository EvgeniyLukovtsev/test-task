import React, { useState, useEffect } from "react";
import Question from "./components/Question.tsx";
import Timer from "./components/Timer.tsx";
import questionsData, { QuestionType } from "./data/questions.ts";
import styles from "./App.module.css";

const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[]>(
    []
  );
  const [remainingTime, setRemainingTime] = useState<number>(600);
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[];
  }>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );

  const saveRemainingTime = (time: number) => {
    localStorage.setItem("remainingTime", time.toString());
  };

  const saveCurrentQuestionIndex = (index: number) => {
    localStorage.setItem("currentQuestionIndex", index.toString());
  };

  useEffect(() => {
    const savedShuffledQuestions = localStorage.getItem("shuffledQuestions");
    if (savedShuffledQuestions) {
      setShuffledQuestions(JSON.parse(savedShuffledQuestions));
    } else {
      const shuffled = shuffleArray([...questionsData]).map((question) => ({
        ...question,
        answers: shuffleArray(question.answers),
      }));
      setShuffledQuestions(shuffled);
      localStorage.setItem("shuffledQuestions", JSON.stringify(shuffled));
    }

    const savedTime = localStorage.getItem("remainingTime");
    if (savedTime) {
      setRemainingTime(parseInt(savedTime, 10));
    }

    const savedIndex = localStorage.getItem("currentQuestionIndex");
    if (savedIndex) {
      setCurrentQuestionIndex(parseInt(savedIndex, 10));
    }

    const savedAnsweredQuestions = localStorage.getItem("answeredQuestions");
    if (savedAnsweredQuestions) {
      setAnsweredQuestions(new Set(JSON.parse(savedAnsweredQuestions)));
    }
  }, []);

  useEffect(() => {
    saveRemainingTime(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    saveCurrentQuestionIndex(currentQuestionIndex);
  }, [currentQuestionIndex]);

  const handleAnswer = (answer: string | string[] | undefined) => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
      localStorage.clear();
      setRemainingTime(0);
    }
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [shuffledQuestions[currentQuestionIndex].id]: answer,
    }));
  };

  const handleTimeOut = () => {
    setIsQuizFinished(true);
    localStorage.clear();
  };

  const getScore = () => {
    return shuffledQuestions.reduce((score, question) => {
      const userAnswer = userAnswers[question.id];
      if (question.type === "single" || question.type === "open") {
        return userAnswer === question.correctAnswer ? score + 1 : score;
      } else if (question.type === "multiple") {
        const correctAnswers = new Set(question.correctAnswer);
        const userAnswerSet = new Set(userAnswer as string[]);
        return [...userAnswerSet].every((ans) => correctAnswers.has(ans)) &&
          [...correctAnswers].every((ans) => userAnswerSet.has(ans))
          ? score + 1
          : score;
      }
      return score;
    }, 0);
  };

  useEffect(() => {
    if (currentQuestionIndex !== null) {
      setAnsweredQuestions((prev) => new Set(prev).add(currentQuestionIndex));
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    const answeredArray = Array.from(answeredQuestions);
    localStorage.setItem("answeredQuestions", JSON.stringify(answeredArray));
  }, [answeredQuestions]);

  const resetQuiz = () => {
    localStorage.clear();
    setCurrentQuestionIndex(0);
    setIsQuizFinished(false);
    setRemainingTime(600);
    setUserAnswers({});
    setAnsweredQuestions(new Set());
  };

  return (
    <div className={styles.root}>
      {!isQuizFinished && (
        <div className={styles.header}>
          <h1>Тестирование</h1>
          <Timer
            remainingTime={remainingTime}
            setRemainingTime={setRemainingTime}
            onTimeOut={handleTimeOut}
          />
        </div>
      )}
      {!isQuizFinished && (
        <div className={styles.indicatorContainer}>
          {shuffledQuestions.map((_, index) => {
            let indicatorClass = styles.indicator;

            if (index === currentQuestionIndex) {
              indicatorClass += ` ${styles.active}`;
            } else if (answeredQuestions.has(index)) {
              indicatorClass += ` ${styles.answered}`;
            }

            return <div key={index} className={indicatorClass}></div>;
          })}
        </div>
      )}
      {isQuizFinished ? (
        <div>
          <h2>
            Тест завершен! Ваш результат: {getScore()} правильных ответов из{" "}
            {shuffledQuestions.length} не учитывая развернутые ответы
          </h2>
          <button className={styles.buttonRezet} onClick={resetQuiz}>
            Начать заново
          </button>
        </div>
      ) : (
        shuffledQuestions.length > 0 &&
        shuffledQuestions[currentQuestionIndex] && (
          <Question
            question={shuffledQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        )
      )}
    </div>
  );
};

export default App;
