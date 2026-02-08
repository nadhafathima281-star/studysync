import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import "./aiPage.css";
import ReactMarkdown from "react-markdown";

export default function AIPage() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { prompt });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.response,
        },
      ]);
    } catch (error) {
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

  return (
    <div className="ai-page">
      <h1 className="ai-title">AI Study Assistant</h1>

      {/* CHAT WINDOW */}
      <div className="chat-window">
        {messages.length === 0 && (
          <div className="chat-empty">
            Ask anything related to your studies 📚
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.role === "user" ? "user" : "ai"
            }`}
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

        <div ref={chatEndRef} />
      </div>

      {/* INPUT AREA */}
      <form className="chat-input-area" onSubmit={handleSubmit}>
        <textarea
          placeholder="Ask anything… (Shift + Enter for new line)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          rows={1}
        />
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}
