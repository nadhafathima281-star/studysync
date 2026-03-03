import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ===============================
     FETCH RESOURCES
  ================================= */

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await api.get("/resources");
      setResources(res.data);
    } catch (error) {
      toast.error("Failed to fetch resources");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     AUTO FETCH ON MOUNT
  ================================= */

  useEffect(() => {
    if (user){
      fetchResources();
    }
  }, [user]);

  /* ===============================
     CREATE RESOURCE
  ================================= */

  const createResource = async (formData) => {
    try {
      const res = await api.post("/resources", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResources((prev) => [res.data, ...prev]);
      toast.success("Resource added");
    } catch (error) {
      toast.error("Failed to add resource");
    }
  };

  /* ===============================
     DELETE RESOURCE
  ================================= */

  const deleteResource = async (id) => {
    try {
      await api.delete(`/resources/${id}`);
      setResources((prev) =>
        prev.filter((r) => r._id !== id)
      );
      toast.success("Resource deleted");
    } catch (error) {
      toast.error("Failed to delete resource");
    }
  };

  return (
    <ResourceContext.Provider
      value={{
        resources,
        loading,
        fetchResources,
        createResource,
        deleteResource,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => useContext(ResourceContext);