import { Link } from "react-router";
import { useAppSelector } from "../../store/hooks";
import "./Stats.scss";

const Stats = () => {
  const { playerName, categoriesPicked, totalAnswers } = useAppSelector(
    (store) => store.quiz
  );

  return (
    <div className="player-stats-style">
      <h1>{playerName}'s Stats</h1>
      <h3>Total Questions Answered: {totalAnswers}</h3>
      <h3>Categories Picked:</h3>
      {categoriesPicked.map((categoryPicked, id) => {
        return (
          <p key={id}>
            {categoriesPicked.indexOf(categoryPicked) === id
              ? categoryPicked
              : null}
          </p>
        );
      })}
      <div className="stat-links">
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
      </div>
    </div>
  );
};

export default Stats;
