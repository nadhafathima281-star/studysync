import { NavLink } from "react-router-dom";
import "./sidebar.css"

export default function Sidebar(){
    return(
        <aside className="sidebar">

            
                <NavLink to='/' end className='sidebar-link'>Dashboard</NavLink>

                <NavLink to='/tasks' className='sidebar-link'>Tasks</NavLink>
                <NavLink to='/notes' className='sidebar-link'>Notes</NavLink>
                <NavLink to='/flashcards' className='sidebar-link'>Flashcards</NavLink>
                <NavLink to='/resources' className='sidebar-link'>Resources</NavLink>
                <NavLink to='/ai-chat' className='sidebar-link'>AI Chat</NavLink>
          
        </aside>
    )
}