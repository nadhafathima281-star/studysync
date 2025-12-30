import { createContext,useContext,useEffect,useState } from "react";

const ThemeContext=createContext(null);

export const ThemeProvider=({children})=>{
    const[theme,setTheme]=useState("light");

    // load saved theme
    useEffect(()=>{
        const savedTheme=localStorage.getItem("theme");
        if(savedTheme){
            setTheme(savedTheme);
        }
    },[]);

    // apply theme to html
    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme);
        localStorage.setItem("theme",theme);
    },[theme]);

    const toggleTheme=()=>{
        setTheme((prev)=>(prev==="light" ? "dark" : "light"));
    };

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
        {children}
        </ThemeContext.Provider>
    );
};

export const useTheme=()=>useContext(ThemeContext);