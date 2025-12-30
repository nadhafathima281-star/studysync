import { createContext, useContext, useEffect, useState } from "react";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../api/noteApi";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const NoteContext = createContext(null);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();

  // get all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      if (err.response?.status !== 401) {
        toast.error(
          err?.response?.data?.message || "Failed to fetch notes"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // get single note
  const fetchNoteById = async (id) => {
    try {
      const res = await getNoteById(id);
      return res.data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to fetch note"
      );
      return null;
    }
  };

  // create note
  const addNote = async (data) => {
    try {
      const res = await createNote(data);
      setNotes((prev) => [res.data, ...prev]);
      toast.success("Note created");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to create note"
      );
    }
  };

  // update note
  const editNote = async (id, data) => {
    try {
      const res = await updateNote(id, data);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data : note))
      );
      toast.success("Note updated");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update note"
      );
    }
  };

  // delete note
  const removeNote = async (id) => {
    try {
      const res = await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success(res.data?.message || "Note deleted");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to delete note"
      );
    }
  };

  // 🔒 FETCH NOTES ONLY AFTER LOGIN
  useEffect(() => {
    if (!authLoading && user) {
      fetchNotes();
    }
  }, [user, authLoading]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        fetchNotes,
        fetchNoteById,
        addNote,
        editNote,
        removeNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);