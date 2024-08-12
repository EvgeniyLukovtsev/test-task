import React from "react";
import styles from "./Question.module.css";

export const Open = ({ selectedAnswer, handleChangeSelectedAnswer }) => {
  return (
    <textarea
      value={selectedAnswer as string}
      onChange={(e) => handleChangeSelectedAnswer(e.target.value)}
      className={styles.textarea}
    />
  );
};
