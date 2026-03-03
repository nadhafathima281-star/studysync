import { Trash2, ExternalLink } from "lucide-react";
import "./resource.css";

export default function ResourceCard({ resource, onDelete }) {
  const formattedDate = new Date(
    resource.createdAt
  ).toLocaleDateString("en-IN");

  return (
    <div className="resource-card">

      <div className="resource-top">
        <div>
          <h3>{resource.title}</h3>
          <span className="badge">
            {resource.type}
          </span>
        </div>

        <button
          className="delete-btn"
          onClick={() => onDelete(resource._id)}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="resource-bottom">
        <a
          href={
            resource.file
              ? `http://localhost:5000/${resource.file}`
              : resource.link
          }
          target="_blank"
          rel="noopener noreferrer"
          className="open-link"
        >
          <ExternalLink size={16} />
          Open
        </a>

        <span className="date">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}