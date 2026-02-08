import { FiEdit,FiTrash } from "react-icons/fi";
import { useState } from "react";
import api from "../../api/axios"
import "./note.css"

export default function NoteCard({note,onEdit,onDelete}){
    const [explanation,setExplanation]=useState("")
    const [loadingAI,setLoadingAI]=useState(false)

    const handleExplain=async()=>{
        try{
            setLoadingAI(true)
            setExplanation("")

            const res=await api.post("/ai/explain",{
                text:note.content,
            });

            setExplanation(res.data.explanation)
        }catch(error){
            console.error(error);
            setExplanation("AI explanation is temporarily unavailable. This feature helps users understand their notes using AI.");
            
        }finally{
            setLoadingAI(false)
        }
    }
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


        <div className="note-content" dangerouslySetInnerHTML={{__html:note.content}}/>

        {note.tags?.length > 0 && (
            <div className="note-tags">
                {note.tags.map((tag,i)=>(
                    <span key={i} className="note-tag">
                        #{tag}
                    </span>
                ))}
            </div>
        )}


        {/* ai explanation button */}
        <button
            className="note-ai-btn"
            onClick={handleExplain}
            disabled={loadingAI}
        >
            {loadingAI ? "Explaining..." : "Explain this note"}
        </button>

        {/* ai response */}
        {explanation && (
            <div className="ai-response">
                <strong>AI Explanation</strong>
                <p>{explanation}</p>
            </div>
        )}
        </div>
    )
}