import { QuestionAction } from "../App";

type FinishProps = {
  points: number;
  dispatch: React.Dispatch<QuestionAction>;
};

function Finish({ points, dispatch }: FinishProps) {
  return (
    <div className="flex b-2 flex-col gap-10">
      <p className="text-2xl font-medium">
        😃 You scored <strong>{points}</strong>!
      </p>

      <button className="btn" onClick={() => dispatch({ type: "restart" })}>
        Restart quiz
      </button>
    </div>
  );
}

export default Finish;
