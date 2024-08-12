import React from "react";
import styles from "./Question.module.css";

export const Short = ({ selectedAnswer, handleChangeSelectedAnswer }) => {
  return (
    <input
      value={selectedAnswer as string}
      onChange={(e) => handleChangeSelectedAnswer(e.target.value)}
      className={styles.input}
    />
  );
};
