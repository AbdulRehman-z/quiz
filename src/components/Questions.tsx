import { QuestionAction } from "../App";

type QuestionProps = {
  question: any;
  dispatch: React.Dispatch<QuestionAction>;
  answer: number | null;
};

function Questions({ question, dispatch, answer }: QuestionProps) {
  const hasAnswered = answer != null;

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-center text-3xl font-semibold">
        {question.question}
      </h1>
      <div className=" mt-14 flex flex-col items-start gap-3">
        {question.options.map((option: any, index: number) => (
          <button
            key={index}
            className={`btn-long ${
              index === answer ? "focus:translate-x-1" : ""
            } ${
              hasAnswered
                ? index === question.correctOption
                  ? "btn-success translate-x-2"
                  : "btn-danger"
                : ""
            } ${hasAnswered ? "cursor-not-allowed" : ""}`}
            onClick={() => dispatch({ type: "answer", payload: index })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
