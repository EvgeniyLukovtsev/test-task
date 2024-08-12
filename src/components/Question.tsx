import React, { useState, useEffect } from "react";
import { QuestionType } from "../data/questions";
import { Single } from "./Single.tsx";
import { Multiple } from "./Multiple.tsx";
import { Open } from "./Open.tsx";
import { Short } from "./Short.tsx";
import {
  getQuestionAnswer,
  saveQuestionAnswer,
} from "../data/LocalStorageHelpers.ts";
import styles from "./Question.module.css";

type QuestionProps = {
  question: QuestionType;
  onAnswer: (answer: string | string[]) => void;
};

const questionTypes = {
  single: Single,
  multiple: Multiple,
  open: Open,
  short: Short,
};

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>("");

  const handleChangeSelectedAnswer = (answer: string | string[]) => {
    setSelectedAnswer(answer);
    saveQuestionAnswer({ id: question.id, type: question.type, answer });
  };

  useEffect(() => {
    const answer = getQuestionAnswer(question.id);
    if (answer) {
      setSelectedAnswer(answer.answer);
    }
  }, [question.id]);

  const handleSubmit = () => {
    onAnswer(selectedAnswer);
    setSelectedAnswer(question.type === "multiple" ? [] : "");
  };

  const Component = questionTypes[question.type];
  if (!Component) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.question}>{question.question}</h3>
      <div>
        <Component
          question={question}
          selectedAnswer={selectedAnswer}
          handleChangeSelectedAnswer={handleChangeSelectedAnswer}
        />
      </div>
      <button className={styles.buttonAnswer} onClick={handleSubmit}>
        Ответить
      </button>
    </div>
  );
};

export default Question;
