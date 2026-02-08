import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import Sidebar from "./Sidebar";
import "./protectedLayout.css"

export default function ProtectedLayout(){
    return(
       <div className="app-layout">
        <Navbar/>

        <div className="layout-body">
            <Sidebar/>
            <main className="main-content">
                <Outlet/>
            </main>
        </div>
       </div>
    )
}