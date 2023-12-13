import { FC, useEffect } from "react";

interface TimerProps {
  dispatch: Function;
  countdownTime: number;
}

const Timer: FC<TimerProps> = ({ dispatch, countdownTime }) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const second = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(second).padStart(
      2,
      "0"
    )}`;
  };

  const formattedTime = formatTime(countdownTime);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "countdown", payload: 0 });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTime, dispatch]);
  return <p className="timer">{formattedTime}</p>;
};

export default Timer;
