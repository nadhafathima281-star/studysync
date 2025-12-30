import { useState } from "react";
import "./note.css"

export default function NoteForm({onSubmit,initialData,onCancel}){
    
    const[title,setTitle]=useState(initialData?.title || "");
    const[content,setContent]=useState(initialData?.content || "");
    const[tags,setTags]=useState(initialData?.tags?.join(", ") || "")
    const[loading,setLoading]=useState(false);

    const handleSubmit=async (e)=>{
        e.preventDefault();

        if(!title.trim() || !content.trim()) return;

        setLoading(true);
        try{
            await onSubmit({
                title,
                content,
                tags:tags
                    ? tags.split(",").map((t)=>t.trim())
                    :   [],
                });
            onCancel?.();
        }finally{
           setLoading(false); 
        }
    }

    return(
        <form className="note-form" onSubmit={handleSubmit}>
            <input 
            type="text"
            className="note-input"
            placeholder="Note title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea 
            className="note-textarea"
            placeholder="Write your note..."
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            // rows={4}
            />

            <input type="text" 
                className="note-input"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e)=>setTags(e.target.value)}
            />

            <div className="note-form-actions">
                <button
                type="submit"
                className="note-submit"
                disabled={loading}
                >
                    {loading 
                    ? "Saving..."
                    : initialData
                    ? "Update"
                    : "Add"}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        className="note-cancel"
                        onClick={onCancel}
                    >
                        Cancel 
                    </button>
                )}
            </div>
        </form>
    )
}