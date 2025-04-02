import { Link } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setPlayerName } from "../../store/gameSlice";
import "./startScreen.scss";

const StartScreen = () => {
  const { playerName } = useAppSelector((store) => store.quiz);
  const dispatch = useAppDispatch();

  return (
    <div className="start-screen-container">
      <img src="/images/quiz.png" alt="quiz-app" loading="lazy" />

      {playerName.length === 0 ? (
        <div>
          <h2>Enter your name or alias:</h2>
          <input
            type="text"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                dispatch(
                  setPlayerName((event.target as HTMLInputElement).value)
                );
              }
            }}
          />
        </div>
      ) : (
        <div>
          <h1>Welcome {playerName}!</h1>
          <div className="links">
            <Link className="link-style" to={"/categories"}>
              Choose a category
            </Link>
            <Link className="link-style" to="/player-stats">
              Stats
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
