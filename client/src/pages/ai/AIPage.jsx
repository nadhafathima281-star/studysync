import { useEffect, useRef, useState} from "react";
import api from "../../api/axios";
import "./aiPage.css";
import ReactMarkdown from "react-markdown";
import {Send} from "lucide-react";

export default function AIPage() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({behavior: "smooth" });
  }, [messages, loading]);

  // load chat history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await api.get("/ai/history");

        const formatted = res.data.flatMap((chat) => [
          { role: "user", text: chat.prompt },
          { role: "ai", text: chat.response },
        ]);

        setMessages(formatted);
      } catch {
        console.error("Failed to load chat history");
      }
    };

    loadHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMessage = { role: "user", text: prompt };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { prompt });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "AI is temporarily unavailable. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (text) => {
    setPrompt(text);
  };

  return (
    <div className="ai-page">
      {/* ====== HEADER ====== */}
      <div className="ai-header">
        <h1>AI Study Assistant</h1>
        <p>
          Get instant help with homework, explanations, and study strategies
        </p>
      </div>

      {/* ===== MAIN CARD ===== */}
      <div className="ai-card">
        {/* ===== CHAT WINDOW ====== */}
        <div className="chat-window">
          {messages.length === 0 && (
            <div className="chat-empty">
              Hello! I'm your AI study assistant. What would you like to learn today?
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.role}`}
            >
              <div className="chat-bubble">
                {msg.role === "ai" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-message ai">
              <div className="chat-bubble typing">
                AI is thinking<span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef}/>
        </div>

        {/* ===== INPUT ===== */}
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <textarea
            placeholder="Search tasks, notes, or ask AI..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" &&  !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            rows={1}
            />
            <button type="submit" disabled={loading}>
              <Send size={18}/>
            </button>
        </form>
      </div>
    </div>
  );
}