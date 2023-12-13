export interface IAppState {
  questions: IData[];
  status: QuizStatus;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  countdownTime: number;
}

export interface IData {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export type QuizStatus = "loading" | "error" | "ready" | "active" | "finished";
export type ActionTypes =
  | "dataReceived"
  | "dataFailed"
  | "start"
  | "newAnswer"
  | "nextQuestion"
  | "finish"
  | "restart"
  | "countdown";

export interface IAppAction {
  type: ActionTypes;
  payload: IData[] | number;
}
