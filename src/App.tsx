import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";

type QuestionAction = {
  type: "loading" | "success" | "error";
  payload: [];
};

function reducer(
  state: typeof initialState,
  action: QuestionAction
): typeof initialState {
  switch (action.type) {
    case "success":
      return { ...state, status: "success", questions: action.payload };
    case "error":
      return { ...state, status: "error", questions: [] };
    default:
      return state;
  }
}

const initialState = { status: "loading", questions: [] };

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const questionsLength = state.questions.length;
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "success", payload: data }))
      .catch(() => dispatch({ type: "error", payload: [] }));
  }, []);

  return (
    <div className=" flex flex-col justify-center items-center gap-20 py-24">
      <Header />

      <Main>
        {state.status === "loading" && <p>Loading...</p>}
        {state.status === "error" && <p>Something went wrong</p>}
        {state.status === "success" && <StartScreen count={questionsLength} />}
      </Main>
    </div>
  );
}

export default App;
