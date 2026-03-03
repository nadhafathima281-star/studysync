import { useState } from "react";
import "./resource.css";

export default function ResourceForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState("other");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    if (link) formData.append("link", link);
    if (file) formData.append("file", file);

    onSubmit(formData);
  };

  return (
    <form className="resource-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="url"
        placeholder="External link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <input
        type="file"
        accept=".pdf,.png,.jpg,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="pdf">PDF</option>
        <option value="video">Video</option>
        <option value="article">Article</option>
        <option value="course">Course</option>
        <option value="other">Other</option>
      </select>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          Save
        </button>
      </div>
    </form>
  );
}