import { QuestionAction } from "../App";

type StartScreenProps = {
  count: number;
  dispatch: React.Dispatch<QuestionAction>;
  questions: unknown[];
};

function StartScreen({ count, dispatch, questions }: StartScreenProps) {
  function handleClick() {
    dispatch({ type: "start", payload: questions });
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-5xl font-bold">Welcome to React Wiz!</h1>
      <p className="text-3xl font-semibold">
        {count} Quizez To test your knowledge in React
      </p>
      <button className="btn mt-10" onClick={handleClick}>
        Lets Begin...
      </button>
    </div>
  );
}

export default StartScreen;
