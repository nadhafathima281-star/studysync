const PomodoroSession = require("../models/PomodoroSession");

// Save completed pomodoro session
const saveSession = async (req, res) => {
    try {
        const userId =req.user.id;
        const { duration } = req.body;

        const session = await PomodoroSession.create({
            userId,
            duration: duration || 25,
            completed: true,
        });

        res.status(201).json({
            message: "Pomodoro session saved",
            session,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to save session",
        });
    }
};

// get user pomodor stats
const getStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const sessions = await PomodoroSession.find({ userId });

        const totalSessions = sessions.length;
        
        const totalMinutes = sessions.reduce(
            (sum, session) => sum + session.duration,
            0
        );

        // sessions today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todaySessions = sessions.filter(
            (s) => new Date(s.date) >= today
        );

        res.json({
            totalSessions,
            totalMinutes,
            todaySessions: todaySessions.length,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch stats",
        });
    }
};

module.exports = {
    saveSession,
    getStats,
};