import { FiEdit, FiTrash } from "react-icons/fi";
import { format } from "date-fns"; // install if not installed
import "./note.css";

export default function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = format(
    new Date(note.createdAt),
    "MM/dd/yyyy"
  );

  return (
    <div className="note-card">
      <div className="note-header">
        <div>
          <h3 className="note-title">{note.title}</h3>

          <div className="note-meta">
            <span className="note-subject">
              {note.subject}
            </span>
            <span className="note-date">
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="note-actions">
          <button
            className="note-btn edit"
            onClick={() => onEdit(note)}
          >
            <FiEdit />
          </button>

          <button
            className="note-btn delete"
            onClick={() => onDelete(note._id)}
          >
            <FiTrash />
          </button>
        </div>
      </div>

      <p className="note-content">
        {note.content.length > 120
          ? note.content.slice(0, 120) + "..."
          : note.content}
      </p>
    </div>
  );
}