import {useNotes} from "../../context/NoteContext"
import NoteForm from "../../components/notes/NoteForm";
import NoteCard from "../../components/notes/NoteCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal"
import "./notes.css"
import { useState } from "react";

export default function Notes(){
  const {notes,addNote,editNote,removeNote,loading}=useNotes();

  const[editingNote,setEditingNote]=useState(null)

  const closeModal=()=>setEditingNote(null)

  const handleUpdate=async(data)=>{
    await editNote(editingNote._id,data)
    closeModal();
  }

  return(
    <div className="notes-container">
      <h1 className="notes-title">My Notes</h1>

      {/* add notes */}
      <NoteForm onSubmit={addNote}/>

      {/* loading */}
      {loading && <Loader text="Loading notes..."/>}

      {/* empty state */}
      {!loading && notes.length === 0 && (
        <EmptyState
          title="No notes yet"
          description="Create your first note to get started."
        />
      )}

      {/* notes list */}
      {!loading && 
        notes.map((note)=>(
          <NoteCard
            key={note._id}
            note={note}
            onEdit={setEditingNote}
            onDelete={removeNote}
          />
        ))}

        {/* edit modal */}
        {editingNote && (
          <Modal onClose={closeModal}>
            <NoteForm
              initialData={editingNote}
              onSubmit={handleUpdate}
              onCancel={closeModal}
            />
          </Modal>
        )}
    </div>
  )
}