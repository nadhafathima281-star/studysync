import {
  exportTasks,
  exportNotes,
  exportFlashcards,
  exportResources
} from "../../api/reportApi";

import "./reports.css";

export default function ExportReports() {

  return (

    <div className="report-card">

      <h3>Export My Study Data</h3>

      <div className="report-buttons">

        <button onClick={exportTasks}>
          Export Tasks
        </button>

        <button onClick={exportNotes}>
          Export Notes
        </button>

        <button onClick={exportFlashcards}>
          Export Flashcards
        </button>

        <button onClick={exportResources}>
          Export Resources
        </button>

      </div>

    </div>

  );

}