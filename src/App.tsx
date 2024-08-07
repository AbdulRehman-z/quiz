import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUIZ = 30;

type State = {
  status: "loading" | "success" | "error" | "start" | "finish";
  questions: unknown[];
  index: number;
  answer: null | number;
  points: number;
  highestScore: number;
  secondsRemaining: number;
};

export type QuestionAction =
  | { type: "success"; payload: unknown[] }
  | { type: "error" }
  | { type: "start"; payload: unknown[] }
  | { type: "answer"; payload: number }
  | { type: "next" }
  | { type: "finish" }
  | { type: "tick" }
  | { type: "restart" };

const initialState: State = {
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 0,
};

function reducer(state: State, action: QuestionAction): State {
  switch (action.type) {
    case "success":
      return { ...state, status: "success", questions: action.payload };
    case "error":
      return { ...state, status: "error", questions: [] };
    case "start":
      return {
        ...state,
        status: "start",
        secondsRemaining: state.questions.length * SECS_PER_QUIZ,
      };
    case "answer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finish" };
    case "restart":
      return {
        ...initialState,
        status: "start",
        questions: state.questions,
        secondsRemaining: state.questions.length * SECS_PER_QUIZ,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const questionsLength = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data: unknown[]) => dispatch({ type: "success", payload: data }))
      .catch(() => dispatch({ type: "error" }));
  }, []);

  console.log(state);

  return (
    <div className="flex flex-col justify-center items-center gap-20 py-24 ">
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
          <>
            <Progress
              index={state.index}
              answer={state.answer}
              points={state.points}
              questionsLength={questionsLength}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={state.secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                index={state.index}
                numQuestions={questionsLength}
              />
            </Footer>
          </>
        )}
        {state.status === "finish" && (
          <Finish points={state.points} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
