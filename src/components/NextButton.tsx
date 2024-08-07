import { QuestionAction } from "../App";

type NextButtonProps = {
  dispatch: React.Dispatch<QuestionAction>;
  answer: number | null;
  index: number;
  numQuestions: number;
};

function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) {
  if (answer === null) return;

  if (index < numQuestions - 1)
    return (
      <button
        className="mt-10 ml-[450px] btn-secondary"
        onClick={() => dispatch({ type: "next" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="mt-10 ml-[450px] btn-secondary"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
