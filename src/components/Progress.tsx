import { FC } from "react";

interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  totalPossiblePoints: number;
  answer: number | null;
}

const Progress: FC<ProgressProps> = ({
  index,
  numQuestions,
  points,
  totalPossiblePoints,
  answer,
}) => {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        Points <strong>{points}</strong> / {totalPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
