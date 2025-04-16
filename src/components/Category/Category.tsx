import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import SingleQuestion from "../Question/SingleQuestion";
import { useAppDispatch } from "../../store/hooks";
import { setCorrectAnswers } from "../../store/gameSlice";
import "./Category.scss";

type Question = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const Category = () => {
  const categoryName = useParams().name;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disable, setDisable] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const total: string[] = [];
  const incAnswers: string[] = [];

  const categories = [
    {
      id: 9,
      name: "General Knowledge",
    },
    {
      id: 10,
      name: "Entertainment: Books",
    },
    {
      id: 11,
      name: "Entertainment: Film",
    },
    {
      id: 12,
      name: "Entertainment: Music",
    },

    {
      id: 14,
      name: "Entertainment: Television",
    },
    {
      id: 15,
      name: "Entertainment: Video Games",
    },
    {
      id: 16,
      name: "Entertainment: Board Games",
    },
    {
      id: 17,
      name: "Science & Nature",
    },
    {
      id: 18,
      name: "Science: Computers",
    },

    {
      id: 20,
      name: "Mythology",
    },
    {
      id: 21,
      name: "Sports",
    },
    {
      id: 22,
      name: "Geography",
    },
    {
      id: 23,
      name: "History",
    },
    {
      id: 26,
      name: "Celebrities",
    },
    {
      id: 27,
      name: "Animals",
    },
    {
      id: 29,
      name: "Entertainment: Comics",
    },
    {
      id: 30,
      name: "Science: Gadgets",
    },
    {
      id: 31,
      name: "Entertainment: Japanese Anime & Manga",
    },
    {
      id: 32,
      name: "Entertainment: Cartoon & Animations",
    },
  ];

  const id = categories.find((category) => {
    return category.name === categoryName;
  });

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${id?.id}&difficulty=easy&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
      });
  }, [id?.id]);

  questions.map((question) => {
    answers.map((answer) => {
      if (question.correct_answer === answer) {
        total.push(answer);
      }
    });
  });

  answers.map((answer) => {
    questions.map((question) => {
      if (question.incorrect_answers.includes(answer)) {
        incAnswers.push(answer);
      }
    });
  });

  if (answers.length === 0 && !questions.length) {
    return <div className="loading-2 loading">Loading...</div>;
  }
  if (answers.length === questions.length) {
    dispatch(setCorrectAnswers(total.length));
    return (
      <div className="results-style">
        <h1>
          You answered {total.length} out of {answers.length} questions
          correctly!
        </h1>
        <button
          className="btn-style"
          onClick={() => setShowDetails(!showDetails)}
        >
          Details
        </button>
        {showDetails === true && incAnswers.length === 0 && (
          <h1>You got `em all right!</h1>
        )}

        {showDetails === true &&
          incAnswers.length !== 0 &&
          questions.map((question, id) => {
            return (
              <div key={id}>
                {answers.map((answer, id) => {
                  if (question.incorrect_answers.includes(answer)) {
                    return (
                      <div key={id}>
                        <p>
                          The correct answer to question{" "}
                          {questions.indexOf(question) + 1} was:{" "}
                          {question.correct_answer}.
                        </p>
                        <p>You answered {answer}.</p>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}

        <br />
        <Link to={"/categories"}>Pick a different category</Link>
      </div>
    );
  }

  return (
    <div className="category-style">
      <div className="card-wrapper">
        <h2>{categoryName}</h2>
        {questions.map((question, id) => {
          if (id === currentIndex) {
            return (
              <SingleQuestion
                key={id}
                question={question.question}
                correctAnswer={question.correct_answer}
                incorrectAnswers={question.incorrect_answers}
                setDisable={setDisable}
                disable={disable}
                answers={answers}
                setAnswers={setAnswers}
                questionNumber={id}
              />
            );
          }
        })}
      </div>

      {questions.length && (
        <button
          className="btn-style next-question-style"
          disabled={disable}
          onClick={() => {
            setCurrentIndex(currentIndex + 1);
            setDisable(!disable);
          }}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Category;
