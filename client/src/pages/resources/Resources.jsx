import { useEffect, useMemo, useState } from "react";
import { useResources } from "../../context/ResourceContext";
import ResourceCard from "../../components/resources/ResourceCard";
import ResourceForm from "../../components/resources/ResourceForm";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import "./resources.css";

export default function Resources() {
  const {
    resources,
    loading,
    fetchResources,
    createResource,
    deleteResource,
  } = useResources();

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    return resources
      .filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((r) =>
        filter === "all" ? true : r.type === filter
      );
  }, [resources, search, filter]);

  const stats = {
    total: resources.length,
    pdf: resources.filter((r) => r.type === "pdf").length,
    links: resources.filter((r) => r.link).length,
  };

  return (
    <div className="resources-page">

      {/* Header */}
      <div className="resources-header">
        <div>
          <h1 className="page-title">Resources</h1>
          <p className="page-subtitle">
            Build your personal study library and access it anytime.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Resource
        </button>
      </div>

      {/* Stats */}
      <div className="resources-stats">
        <StatCard title="Total" value={stats.total} />
        <StatCard title="PDF Files" value={stats.pdf} />
        <StatCard title="External Links" value={stats.links} />
      </div>

      {/* Tools */}
      <div className="resources-tools">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
          <option value="article">Article</option>
          <option value="course">Course</option>
        </select>
      </div>

      {loading && <Loader text="Loading resources..." />}

      {!loading && filteredResources.length === 0 && (
        <div className="empty-state">
          <h3>No resources found</h3>
          <p>Add or search resources to get started.</p>
        </div>
      )}

      {!loading && filteredResources.length > 0 && (
        <div className="resources-grid">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              onDelete={deleteResource}
            />
          ))}
        </div>
      )}

      {showModal && (
        <Modal
          title="Add Resource"
          onClose={() => setShowModal(false)}
        >
          <ResourceForm
            onSubmit={createResource}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}