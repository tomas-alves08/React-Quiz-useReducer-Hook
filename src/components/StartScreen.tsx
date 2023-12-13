import { FC } from "react";

interface StartScreenProps {
  questionsQty: number;
  dispatch: Function;
}

const StartScreen: FC<StartScreenProps> = ({ questionsQty, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{questionsQty} questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start", payload: {} })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default StartScreen;
