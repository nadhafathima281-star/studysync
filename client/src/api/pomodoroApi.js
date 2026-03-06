import api from "./axios";

// save completed session
export const savePomodoroSession = (data) => {
    // data = { duration:25 }
    return api.post("/pomodoro/session", data);
};

// get pomodoro stats
export const getPomodoroStats = () => {
    return api.get("/pomodoro/stats");
};