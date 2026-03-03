import { ChevronLeft, ChevronRight } from "lucide-react";
import "./flashcard.css";

export default function StudyControls({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
  currentIndex,
  total
}) {
  return (
    <div className="study-controls">

      <button
        className="nav-btn"
        onClick={onPrev}
        disabled={disablePrev}
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <div className="card-progress">
        {total > 0 ? `${currentIndex + 1} / ${total}` : "0 / 0"}
      </div>

      <button
        className="nav-btn"
        onClick={onNext}
        disabled={disableNext}
      >
        Next
        <ChevronRight size={16} />
      </button>

    </div>
  );
}