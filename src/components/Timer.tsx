import { useEffect } from "react";
import { QuestionAction } from "../App";

type TimerProps = {
  dispatch: React.Dispatch<QuestionAction>;
  secondsRemaining: number;
};

function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  console.log(secondsRemaining);

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <p className="text-xl">
      Time Remaining: {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </p>
  );
}

export default Timer;
