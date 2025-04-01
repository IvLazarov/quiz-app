import { useState } from "react";
import type { PropsWithChildren } from "react";
import "./SingleQuestion.scss";

type SingleQuestion = PropsWithChildren<{
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  disable: boolean;
  setDisable(disable: boolean): void;
  answers: string[];
  setAnswers(value: string[]): void;
  questionNumber: number;
}>;

const SingleQuestion = ({
  question,
  correctAnswer,
  incorrectAnswers,
  setDisable,
  disable,
  answers,
  setAnswers,
  questionNumber,
}: SingleQuestion) => {
  const [disableAnswers, setDisableAnswers] = useState(false);
  const picks: string[] = [];

  const playerPicks = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    picks.push((event.target as HTMLInputElement).value);
    setAnswers(answers.concat(picks));
  };

  return (
    <div className="question-style">
      <h2>
        {`${questionNumber + 1}. `}
        {question
          .replace(/&quot;/g, `'`)
          .replace(/&#039;/, `'`)
          .replace(/&amp;/, "&")
          .replace(/&Uuml;/, "ü")}
      </h2>
      <div className="answers">
        <button
          className="btn-style"
          disabled={disableAnswers}
          value={correctAnswer}
          onClick={(e) => {
            playerPicks(e);
            setDisable(!disable);
            if (disable === false) {
              setDisableAnswers(false);
            } else {
              setDisableAnswers(true);
            }
          }}
        >
          {correctAnswer
            .replace(/&#039;/g, `'`)
            .replace(/&amp;/, "&")
            .replace(/&eacute;/, "é")
            .replace(/&aacute;/, "á")
            .replace(/&ntilde;/, "ñ")}
        </button>
        {incorrectAnswers.map((incAns, val) => {
          return (
            <button
              className="btn-style"
              disabled={disableAnswers}
              value={incAns}
              onClick={(e) => {
                playerPicks(e);
                setDisable(!disable);
                if (disable === false) {
                  setDisableAnswers(false);
                } else {
                  setDisableAnswers(true);
                }
              }}
              key={val}
            >
              {incAns.replace(/&quot;/g, '"').replace(/&#039;/, "'")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SingleQuestion;


