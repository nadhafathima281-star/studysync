import { useState } from "react";
import './task.css'

export default function TaskForm({onSubmit,initialData,onCancel}){
    const[title,setTitle]=useState(initialData?.title || "");
    const[loading,setLoading]=useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!title.trim()) return;

        setLoading(true);
        try{
            await onSubmit({title});
            setTitle("");
            onCancel?.();
        }finally{
            setLoading(false);
        }
    };

    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <input type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={title}
            onChange={(e)=>setTitle(e.target.value)} />

            <button
            type="submit"
            className="task-submit"
            disabled={loading}>
                {loading
                ?"Saving..."
                :initialData
                ?"Update"
                :"Add"}
            </button>

            {onCancel && (
                <button
                type="button"
                className="task-cancel"
                onClick={onCancel}>
                    Cancel
                </button>             
            )}
        </form>
    )
}