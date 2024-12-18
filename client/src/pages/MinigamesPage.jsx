import { useEffect } from "react";
import { baseUrl } from "../helper/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  setFeedback,
  setGuess,
  setQuiz,
  toggleHintVisibility,
} from "../features/quiz/quizSlice";
import { setLoader } from "../features/loader/loaderSlice";
import Loader from "../components/Loader";

export default function MinigamesPage() {
  const { quiz, guess, feedback, hintVisible } = useSelector(
    (state) => state.quiz
  );
  const { loader } = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  const fetchQuiz = async () => {
    try {
      dispatch(setLoader(true));
      const response = await baseUrl.get("/minigames", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(setQuiz(response.data));
    } catch (err) {
      console.log(err, "<< err - fetchQuiz");
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleSubmit = () => {
    if (guess.trim().toLowerCase() === quiz.cardName.toLowerCase()) {
      dispatch(setFeedback("Correct! Well done."));
    } else {
      dispatch(setFeedback("Incorrect. Try again!"));
    }
    dispatch(setGuess(""));
  };

  const toggleHint = () => {
    dispatch(toggleHintVisibility());
  };

  if (!quiz)
    return (
      <div className="p-4">
        <Loader />;
      </div>
    );

  return (
    <div className="p-4">
      {loader ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4 dark:text-white">
            Guess the Card Name
          </h1>
          <div className="mb-4 flex justify-center">
            <img
              src={quiz.cardImage}
              alt="Card"
              className="w-1/3 h-auto border rounded-md shadow-md"
            />
          </div>
          <button
            onClick={toggleHint}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mb-4"
          >
            {hintVisible ? "Hide Hint" : "Show Hint"}
          </button>
          {hintVisible && (
            <p className="text-lg mb-4 dark:text-white">{quiz.hint}</p>
          )}
          <input
            type="text"
            value={guess}
            onChange={(e) => dispatch(setGuess(e.target.value))}
            placeholder="Enter your guess"
            className="p-2 border border-gray-300 rounded-md w-full mb-2"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Guess
          </button>
          {feedback && (
            <p className="mt-4 text-lg dark:text-white">{feedback}</p>
          )}
        </>
      )}
    </div>
  );
}
