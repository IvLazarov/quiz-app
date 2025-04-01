import { useState, useEffect } from "react";
import { Link } from "react-router";
import Category from "../Category/Category";
import "./Categories.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCategoriesPicked } from "../../store/gameSlice";

type Category = {
  id: number;
  name: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { playerName } = useAppSelector((store) => store.quiz);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`https://opentdb.com/api_category.php`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      });
  }, []);

  return (
    <div className="categories-container">
      <div className="player-options">
        <h2>{playerName}</h2>
        <div className="player-links">
          <Link className="link-style" to="/player-stats">
            Stats
          </Link>
          <Link className="link-style" to="/">
            Home
          </Link>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="loading">
         Loading...
        </div>
      ) : (
        <div className="categories">
          {categories.map((category) => {
            if (
              category.id === 13 ||
              category.id === 19 ||
              category.id === 24 ||
              category.id === 25 ||
              category.id === 28
            ) {
              category.id = Math.random();
            } else {
              return (
                <Link
                  className="category-link-style"
                  key={category.id}
                  to={`http://${window.location.host}/categories/${category.name}`}
                  onClick={() => dispatch(setCategoriesPicked(category.name))}
                >
                  <p>{category.name}</p>

                  <img src={`/images/${category.id}.png`} alt={category.name} />
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
