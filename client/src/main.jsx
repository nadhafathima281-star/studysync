import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import './styles/theme.css'
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { TaskProvider } from "./context/TaskContext";
import { NoteProvider } from "./context/NoteContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FlashcardProvider } from "./context/FlashcardContext";
import { ResourceProvider } from "./context/ResourceContext";
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <NoteProvider>
              <FlashcardProvider>
                <ResourceProvider>
                <SearchProvider>
                    <App />
                    <Toaster position="top-right" />
                </SearchProvider>
                </ResourceProvider>
              </FlashcardProvider>
            </NoteProvider>
          </TaskProvider> 
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
