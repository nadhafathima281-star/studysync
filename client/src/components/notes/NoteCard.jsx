import { FiEdit,FiTrash } from "react-icons/fi";
import "./note.css"

export default function NoteCard({note,onEdit,onDelete}){
    return(
        <div className="note-card">
            <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                
                <div className="note-actions">
                    <button
                        className="note-btn edit"
                        onClick={()=>onEdit(note)}
                    >
                        <FiEdit/>
                    </button>

                    <button
                        className="note-btn delete"
                        onClick={()=>onDelete(note._id)}
                    >
                        <FiTrash/>
                    </button>
                </div>
            </div>


        <p className="note-content">{note.content}</p>

        {note.tags?.length > 0 && (
            <div className="note-tags">
                {note.tags.map((tag,i)=>(
                    <span key={i} className="note-tag">
                        #{tag}
                    </span>
                ))}
            </div>
        )}
        </div>
    )
}