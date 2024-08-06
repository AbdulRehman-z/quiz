import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

type State = {
  status: "loading" | "success" | "error" | "start";
  questions: unknown[];
  index: number;
};

// Define the shape of your actions
export type QuestionAction =
  | { type: "success"; payload: unknown[] }
  | { type: "error" }
  | { type: "start"; payload: unknown[] };

const initialState: State = {
  status: "loading",
  questions: [],
  index: 1,
};

function reducer(state: State, action: QuestionAction): State {
  switch (action.type) {
    case "success":
      return { ...state, status: "success", questions: action.payload };
    case "error":
      return { ...state, status: "error", questions: [] };
    case "start":
      return { ...state, status: "start", questions: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  const questionsLength = state.questions.length;
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data: unknown[]) => dispatch({ type: "success", payload: data }))
      .catch(() => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-20 py-24">
      <Header />

      <Main>
        {state.status === "loading" && <p>Loading...</p>}
        {state.status === "error" && <p>Something went wrong</p>}
        {state.status === "success" && (
          <StartScreen
            count={questionsLength}
            dispatch={dispatch}
            questions={state.questions}
          />
        )}
        {state.status === "start" && (
          <Questions question={state.questions[state.index]} />
        )}
      </Main>
    </div>
  );
}

export default App;
