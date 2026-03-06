import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  plugins,
  scales
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function PomodoroWidget({ stats }) {

  const data = {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        label: "Focus Minutes",
        data: [25, 50, 30, 75, 40, 60, 20],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.1)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { display: false },
      x: { grid: { display: false } }
    }
  };

   return (

    <div className="pomodoro-widget">

      <div className="widget-stats">

        <div>
          <strong>0</strong>
          <p>Sessions Today</p>
        </div>

        <div>
          <strong>{stats.streak}</strong>
          <p>Day Streak</p>
        </div>

      </div>

      <button className="start-focus-btn">
        Start Focus Session
      </button>

      <div className="focus-chart">
        <Line data={data} options={options}/>
      </div>

      <div className="daily-goal">

        <p className="goal-label">
          Daily Goal
        </p>

        <div className="goal-progress">

          <div className="goal-fill" style={{ width:`${(0/6)*100}%`}}></div>
        </div>

        <p className="goal-text">
          0 / 6 Sessions
        </p>
      </div>
    </div>
   );
}