import React from "react";
import styles from "./Question.module.css";

export const Single = ({
  question,
  selectedAnswer,
  handleChangeSelectedAnswer,
}) => {
  return question.answers.map((answer) => (
    <label className={styles.answer} key={answer}>
      <input
        type="radio"
        name="answer"
        value={answer}
        checked={selectedAnswer === answer}
        onChange={() => handleChangeSelectedAnswer(answer)}
      />
      <span className={styles.customRadio}></span>
      {answer}
    </label>
  ));
};
