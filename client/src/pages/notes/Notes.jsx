import { useState, useMemo } from "react";
import { useNotes } from "../../context/NoteContext";
import NoteForm from "../../components/notes/NoteForm";
import NoteCard from "../../components/notes/NoteCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import { BookOpen, FileText, Folder } from "lucide-react";
import "./notes.css";

export default function Notes() {
  const { notes, addNote, editNote, removeNote, loading } = useNotes();
  const [editingNote, setEditingNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setEditingNote(null);
    setShowModal(false);
  };

  const handleUpdate = async (data) => {
    await editNote(editingNote._id, data);
    closeModal();
  };

  // Stats
  const totalNotes = notes.length;

  const thisWeekNotes = notes.filter((note) => {
    const created = new Date(note.createdAt);
    const now = new Date();
    const diff = (now - created) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const subjects = [...new Set(notes.map((n) => n.subject))];

  const subjectCount = subjects.length;

  // Subject grouping for sidebar
  const notesBySubject = useMemo(() => {
    const map = {};
    notes.forEach((note) => {
      map[note.subject] = (map[note.subject] || 0) + 1;
    });
    return map;
  }, [notes]);

  return (
    <div className="notes-page">
      <h1 className="notes-title">Study Notes</h1>
      <p className="notes-subtitle">
        Create, organize, and review your study materials
      </p>

      {/* ===== Stats ===== */}
      <div className="notes-stats">
        <StatCard
          icon={<BookOpen size={20} />}
          title="Total Notes"
          value={totalNotes}
          subtitle="Across all subjects"
        />

        <StatCard
          icon={<FileText size={20} />}
          title="This Week"
          value={thisWeekNotes}
          subtitle="New notes created"
        />

        <StatCard
          icon={<Folder size={20} />}
          title="Subjects"
          value={subjectCount}
          subtitle="Active subjects"
        />
      </div>

      {/* ===== Layout ===== */}
      <div className="notes-grid">

        {/* LEFT SIDE */}
        <div className="notes-left">
          <div className="notes-card header-row">
            <h3>Study Notes</h3>
            <button
              className="primary-btn"
              onClick={() => {
                setEditingNote(null);
                setShowModal(true);
              }}
            >
              + New Note
            </button>
          </div>

          {loading && <Loader text="Loading notes..." />}

          {!loading && notes.length === 0 && (
            <EmptyState
              title="No notes yet"
              description="Create your first note to get started."
            />
          )}

          {/* notes list */}
          {!loading && (
            <div className="notes-list">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={(note) => {
                    setEditingNote(note);
                    setShowModal(true);
                  }}
                  onDelete={removeNote}
                />
            ))}
          </div>
        )}
        </div>

        {/* RIGHT SIDE */}
        <div className="notes-right">
          <div className="notes-card">
            <h3>Subjects</h3>
            {Object.entries(notesBySubject).map(([subject, count]) => (
              <div key={subject} className="subject-row">
                <span>{subject}</span>
                <span className="subject-badge">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Modal ===== */}
      {showModal && (
        <Modal onClose={closeModal}>
          <NoteForm
            initialData={editingNote}
            onSubmit={editingNote ? handleUpdate : addNote}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        {icon}
        <span>{title}</span>
      </div>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
}