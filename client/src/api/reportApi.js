import api from "./axios";

export const exportTasks = async () => {
  const res = await api.get("/reports/tasks", {
    responseType: "blob",
  });

  downloadFile(res.data, "studysync-tasks.csv");
};

export const exportNotes = async () => {
  const res = await api.get("/reports/notes", {
    responseType: "blob",
  });

  downloadFile(res.data, "studysync-notes.csv");
};

export const exportFlashcards = async () => {
  const res = await api.get("/reports/flashcards", {
    responseType: "blob",
  });

  downloadFile(res.data, "studysync-flashcards.csv");
};

export const exportResources = async () => {
  const res = await api.get("/reports/resources", {
    responseType: "blob",
  });

  downloadFile(res.data, "studysync-resources.csv");
};

const downloadFile = (data, filename) => {
  const url = window.URL.createObjectURL(new Blob([data]));

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();

  link.remove();
};