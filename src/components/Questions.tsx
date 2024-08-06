type QuestionProps = {
  question: any;
};

function Questions({ question }: QuestionProps) {
  console.log("question", question);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center text-3xl font-semibold">
        {question.question}
      </h1>
      <div className=" mt-14 flex flex-col items-start gap-3">
        {question.options.map((option: any, index: number) => (
          <button key={index} className="btn-long">
            {option}
          </button>
        ))}
      </div>
      <button className="mt-10 self-end btn-secondary">Next</button>
    </div>
  );
}

export default Questions;
