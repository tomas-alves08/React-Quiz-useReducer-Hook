import { FC } from "react";
import { IData } from "../models/appModels";
import QuestionOptions from "./QuestionOptions";

interface QuestionProps {
  curQuestion: IData;
  dispatch: Function;
  answer: number | null;
}

const Question: FC<QuestionProps> = ({ curQuestion, dispatch, answer }) => {
  const { question, correctOption, options } = curQuestion;
  return (
    <div>
      <h4>{question}</h4>
      <QuestionOptions
        options={options}
        dispatch={dispatch}
        answer={answer}
        correctOption={correctOption}
      />
    </div>
  );
};

export default Question;
