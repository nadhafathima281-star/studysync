const mongoose = require("mongoose");

const pomodoroSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        duration: {
            type: Number, //minutes
            default: 25,
        },

        completed: {
            type: Boolean,
            default: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PomodoroSession", pomodoroSessionSchema);