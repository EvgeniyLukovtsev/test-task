import React, { useEffect } from "react";
import styles from "./Timer.module.css";

type TimerProps = {
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  onTimeOut: () => void;
};

const Timer: React.FC<TimerProps> = ({
  remainingTime,
  setRemainingTime,
  onTimeOut,
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onTimeOut();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setRemainingTime, onTimeOut]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerText}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;
