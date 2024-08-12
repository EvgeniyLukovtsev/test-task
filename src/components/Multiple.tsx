import React from "react";
import styles from "./Question.module.css";

export const Multiple = ({
  question,
  selectedAnswer,
  handleChangeSelectedAnswer,
}) => {
  return question.answers.map((answer) => (
    <label className={styles.answer} key={answer}>
      <input
        type="checkbox"
        name="answer"
        value={answer}
        checked={(selectedAnswer as string[]).includes(answer)}
        onChange={() => {
          let updatedAnswers = [...(selectedAnswer as string[])];
          if (updatedAnswers.includes(answer)) {
            updatedAnswers = updatedAnswers.filter((ans) => ans !== answer);
          } else {
            updatedAnswers.push(answer);
          }
          handleChangeSelectedAnswer(updatedAnswers);
        }}
      />
      <span className={styles.customCheckbox}></span>
      {answer}
    </label>
  ));
};
