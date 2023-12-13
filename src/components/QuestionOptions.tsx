import { FC } from "react";

interface QuestionOptionsProps {
  options: string[];
  dispatch: Function;
  answer: number | null;
  correctOption: number;
}

const QuestionOptions: FC<QuestionOptionsProps> = ({
  options,
  dispatch,
  answer,
  correctOption,
}) => {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {options.map((option, idx) => {
        return (
          <button
            className={`btn btn-option ${idx === answer ? "answer" : ""} ${
              hasAnswer ? (idx === correctOption ? "correct" : "wrong") : ""
            }`}
            onClick={() => dispatch({ type: "newAnswer", payload: idx })}
            disabled={hasAnswer}
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionOptions;
