import api from './axios'

//get all notes for logged-in user
export const getNotes=()=>{
    return api.get('/notes')
}

// get single note by ID
export const getNoteById=(id)=>{
    return api.get(`/notes/${id}`)
}

// create new note
export const createNote=(data)=>{
    // data;{title,content,tags}
    return api.post('/notes',data)
}

// update note
export const updateNote=(id,data)=>{
    return api.put(`/notes/${id}`,data)
}

// delete note
export const deleteNote=(id)=>{
    return api.delete(`/notes/${id}`)
}