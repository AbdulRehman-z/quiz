type StartScreenProps = {
  count: number;
};

function StartScreen({ count }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-5xl font-bold">Welcome to React Wiz!</h1>
      <p className="text-3xl font-semibold">
        {count} Quizez To test your knowledge in React
      </p>
      <button className="btn mt-10">Lets Begin...</button>
    </div>
  );
}

export default StartScreen;
