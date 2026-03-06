import { useState, useEffect } from "react";
import "./flashcard.css";

export default function FlashcardViewer({ card, currentIndex }) {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [currentIndex]);

  if (!card) return null;

  return (
    <div
      className={`flashcard-static clickable ${showAnswer ? "answer-mode" : ""}`}
      onClick={() => setShowAnswer(prev => !prev)}
    >
      {!showAnswer ? (
        <>
          <span className="card-label">Question</span>
          <h2 className="card-question">{card.question}</h2>
          <p className="hint-text">Click to reveal answer</p>
        </>
      ) : (
        <>
          <span className="card-label">Answer</span>
          <p className="card-answer">{card.answer}</p>
          {/* <p className="hint-text">Click to hide</p> */}
        </>
      )}
    </div>
  );
}