import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("article");
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    const res = await api.get("/resources");
    setResources(res.data);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !link) return;

    setLoading(true);
    await api.post("/resources", { title, link, type });
    setTitle("");
    setLink("");
    setLoading(false);
    fetchResources();
  };

  const handleDelete = async (id) => {
    await api.delete(`/resources/${id}`);
    fetchResources();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resources</h1>

      <form onSubmit={handleAdd}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <ul>
        {resources.map((r) => (
          <li key={r._id}>
            <a href={r.link} target="_blank">{r.title}</a>
            <button onClick={() => handleDelete(r._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
