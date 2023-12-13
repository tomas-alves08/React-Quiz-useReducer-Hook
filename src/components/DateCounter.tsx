import { FC, useReducer } from "react";

interface AppState {
  count: number;
  step: number;
}

type AppActions = {
  type: "inc" | "dec" | "setCount" | "setStep" | "reset";
  payload: number;
};

const initialState = { count: 0, step: 1 };

function reducer(state: AppState, action: AppActions) {
  if (action.type === "inc")
    return { ...state, count: state.count + (action.payload || 1) };
  if (action.type === "dec")
    return { ...state, count: state.count - (action.payload || 1) };
  if (action.type === "setCount") return { ...state, count: action.payload };
  if (action.type === "setStep") return { ...state, step: action.payload };
  if (action.type === "reset") return initialState;
  else throw new Error("Unknown Action");
}

const DateCounter: FC = () => {
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: step });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset", payload: 0 });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
export default DateCounter;
