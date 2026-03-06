import React, { useState, useEffect } from "react";
import "./pomodoro.css";
import AnalyticsModal from "./AnalyticsModal";

export default function Pomodoro() {

const POMODORO = 25 * 60;
const SHORT = 5 * 60;
const LONG = 15 * 60;

const [mode,setMode] = useState("pomodoro");
const [time,setTime] = useState(POMODORO);
const [running,setRunning] = useState(false);

const [sessions,setSessions] = useState(0);
const [streak,setStreak] = useState(0);

const [taskInput,setTaskInput] = useState("");
const [tasks,setTasks] = useState([]);

const [showAnalytics,setShowAnalytics] = useState(false);


/* TIMER */

useEffect(()=>{

let timer;

if(running){

timer = setInterval(()=>{
setTime(prev => prev - 1)
},1000)

}

return ()=>clearInterval(timer)

},[running])


useEffect(()=>{

if(time === 0){

setRunning(false)

if(mode === "pomodoro"){
setSessions(prev => prev + 1)
setStreak(prev => prev + 1)
}

}

},[time])


/* FORMAT TIME */

const formatTime = () => {

const m = Math.floor(time/60)
const s = time % 60

return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`

}


/* CHANGE MODE */

const changeMode = (m) => {

setRunning(false)
setMode(m)

if(m === "pomodoro") setTime(POMODORO)
if(m === "short") setTime(SHORT)
if(m === "long") setTime(LONG)

}


/* TASKS */

const addTask = () => {

if(taskInput.trim()==="") return

const newTask = {
id:Date.now(),
text:taskInput
}

setTasks(prev => [...prev,newTask])
setTaskInput("")

}

const deleteTask = (id) => {
setTasks(tasks.filter(t => t.id !== id))
}


/* CIRCLE TIMER */

const radius = 110
const circumference = 2 * Math.PI * radius

const totalTime =
mode==="pomodoro" ? POMODORO :
mode==="short" ? SHORT :
LONG

const progress = time / totalTime

const strokeDashoffset =
circumference - progress * circumference


/* ANALYTICS STATS */

const stats = {

today: sessions,
week: sessions * 3,
month: sessions * 10,
focusToday: Math.round((sessions * 25) / 60),
avg: Math.round((sessions * 25) / 60),
tasks: tasks.length

}


return(

<div className="pomodoro-page">


{/* HEADER */}

<div className="pomodoro-header">

<h1>Pomodoro</h1>

<button
className="analytics-btn"
onClick={()=>setShowAnalytics(true)}
>
Analytics
</button>

</div>



{/* TIMER CARD */}

<div className={`pomodoro-card ${running ? "focus-mode" : ""}`}>



{/* MODE SWITCH */}

<div className="mode-buttons">

<button
className={mode==="pomodoro"?"active":""}
onClick={()=>changeMode("pomodoro")}
>
Pomodoro
</button>

<button
className={mode==="short"?"active":""}
onClick={()=>changeMode("short")}
>
Short Break
</button>

<button
className={mode==="long"?"active":""}
onClick={()=>changeMode("long")}
>
Long Break
</button>

</div>



{/* TIMER CIRCLE */}

<div className="timer-circle">

<svg width="260" height="260">

<circle
cx="130"
cy="130"
r={radius}
stroke="var(--border)"
strokeWidth="10"
fill="none"
/>

<circle
cx="130"
cy="130"
r={radius}
stroke="var(--accent)"
strokeWidth="10"
fill="none"
strokeDasharray={circumference}
strokeDashoffset={strokeDashoffset}
strokeLinecap="round"
transform="rotate(-90 130 130)"
/>

</svg>

<div className="timer-text">
{formatTime()}
</div>

</div>



<p className="session-text">
Sessions: {sessions} | Streak: {streak}
</p>



{/* CONTROLS */}

<div className="controls">

{!running ? (

<button
className="start-btn"
onClick={()=>setRunning(true)}
>
Start
</button>

) : (

<button
className="pause-btn"
onClick={()=>setRunning(false)}
>
Pause
</button>

)}

<button
className="reset-btn"
onClick={()=>changeMode(mode)}
>
Reset
</button>

</div>

</div>



{/* TASK SECTION */}

<div className="task-section">

<h3>Tasks</h3>

<div className="task-input">

<input
placeholder="What do you want to work on?"
value={taskInput}
onChange={(e)=>setTaskInput(e.target.value)}
/>

<button onClick={addTask}>
Add
</button>

</div>


<ul className="task-list">

{tasks.map(task => (

<li key={task.id}>

{task.text}

<button onClick={()=>deleteTask(task.id)}>
✕
</button>

</li>

))}

</ul>

</div>



{/* ANALYTICS MODAL */}

{showAnalytics && (

<AnalyticsModal
stats={stats}
onClose={()=>setShowAnalytics(false)}
/>

)}

</div>

)

}