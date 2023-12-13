import { FC } from "react";

interface FinishScreenProps {
  points: number;
  totalPossiblePoints: number;
  highscore: number;
  dispatch: Function;
}

const FinishScreen: FC<FinishScreenProps> = ({
  points,
  totalPossiblePoints,
  highscore,
  dispatch,
}) => {
  const scorePercentage = (points / totalPossiblePoints) * 100;
  let emoji;
  if (scorePercentage === 100) emoji = "🏅";
  if (scorePercentage < 100) emoji = "🎉";
  if (scorePercentage < 80) emoji = "😊";
  if (scorePercentage < 50) emoji = "😔";
  if (scorePercentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of{" "}
        {totalPossiblePoints} ({Math.ceil(scorePercentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart", payload: 0 })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
