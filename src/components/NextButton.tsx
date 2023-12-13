import { FC } from "react";

interface NextButtonProps {
  dispatch: Function;
  answer: number | null;
  index: number;
  questionsQty: number;
}

const NextButton: FC<NextButtonProps> = ({
  dispatch,
  answer,
  index,
  questionsQty,
}) => {
  if (answer === null) return null;
  if (questionsQty > index + 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion", payload: 0 })}
      >
        Next
      </button>
    );

  if (questionsQty === index + 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish", payload: 0 })}
      >
        Submit
      </button>
    );
  return null;
};

export default NextButton;
