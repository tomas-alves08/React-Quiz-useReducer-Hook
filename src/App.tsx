import { FC, useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Timer from "./components/Timer";
import { IData, IAppState, IAppAction } from "./models/appModels";
import FinishScreen from "./components/FinishScreen";

const SECS_PER_QUESTION: number = 30;

const initialState: IAppState = {
  questions: [
    {
      question: "",
      options: [""],
      correctOption: 0,
      points: 0,
    },
  ],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  countdownTime: 0,
};

const reducer: React.Reducer<IAppState, IAppAction> = (state, action) => {
  if (typeof action.payload === "object" && action.type === "dataReceived")
    return { ...state, questions: action.payload, status: "ready" };
  else if (typeof action.payload === "object" && action.type === "dataFailed")
    return { ...state, status: "error" };
  else if (typeof action.payload === "object" && action.type === "start")
    return {
      ...state,
      status: "active",
      countdownTime: state.questions.length * SECS_PER_QUESTION,
    };
  else if (typeof action.payload === "number" && action.type === "newAnswer") {
    const question = state.questions[state.index];
    return {
      ...state,
      answer: action.payload,
      points:
        question.correctOption === action.payload
          ? state.points + question.points
          : state.points,
    };
  } else if (
    typeof action.payload === "number" &&
    action.type === "nextQuestion"
  ) {
    return {
      ...state,
      answer: null,
      index:
        action.payload < state.questions.length - 1
          ? state.index + 1
          : (state.index = 0),
    };
  } else if (typeof action.payload === "number" && action.type === "finish") {
    const currentHighscore =
      state.points > state.highscore ? state.points : state.highscore;
    return { ...state, status: "finished", highscore: currentHighscore };
  } else if (typeof action.payload === "number" && action.type === "restart") {
    return {
      ...initialState,
      status: "ready",
      highscore: state.highscore,
      questions: state.questions,
    };
  } else if (
    typeof action.payload === "number" &&
    action.type === "countdown"
  ) {
    return {
      ...state,
      countdownTime: state.countdownTime - 1,
      status: state.countdownTime === 0 ? "finished" : state.status,
    };
  } else throw new Error("Unknown Action");
};

const App: FC = () => {
  const [
    { questions, status, index, answer, points, highscore, countdownTime },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsQty = questions.length;

  useEffect(() => {
    async function getData(): Promise<IData[]> {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
        return data;
      } catch (err) {
        dispatch({
          type: "dataFailed",
          payload: initialState.questions,
        });
        return initialState.questions;
      }
    }
    getData();
  }, []);

  const totalPossiblePoints = questions.reduce(
    (acc, cur) => acc + cur.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && (
          <StartScreen questionsQty={questionsQty} dispatch={dispatch} />
        )}
        {status === "active" ? (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              totalPossiblePoints={totalPossiblePoints}
              answer={answer}
            />
            <Question
              curQuestion={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <div>
              <Timer dispatch={dispatch} countdownTime={countdownTime} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionsQty={questionsQty}
              />
            </div>
          </>
        ) : (
          status === "finished" && (
            <FinishScreen
              points={points}
              totalPossiblePoints={totalPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )
        )}
      </Main>
    </div>
  );
};

export default App;
