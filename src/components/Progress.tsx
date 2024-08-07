type ProgressProps = {
  index: number;
  points: number;
  answer: number | null;
  questionsLength: number;
  maxPossiblePoints: number;
};

function Progress({
  index,
  answer,
  points,
  questionsLength,
  maxPossiblePoints,
}: ProgressProps) {
  return (
    <header>
      <progress
        className="w-full h-2"
        value={index + Number(answer != null)}
        max={questionsLength}
      />
      <div className="flex justify-between items-center">
        <p>
          Questions <strong>{index + 1}</strong> / {questionsLength}
        </p>
        <p>
          <strong>{points}</strong> / <strong>{maxPossiblePoints}</strong>
        </p>
      </div>
    </header>
  );
}

export default Progress;
