import { useState } from "react";
import ChatBubble from "./ChatBubble";
import { askAssistant } from "../../services/assistantService";

const SUGGESTIONS = [
  "Where can I find lost items?",
  "How do I book a study room?",
  "When is the next society event?",
  "Who do I contact for financial aid?",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your Campus Assistant. Ask me anything about announcements, events, bookings or lost items." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const send = async (text) => {
    const question = text ?? input;
    if (!question.trim()) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setSending(true);
    try {
      const data = await askAssistant(question);
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "I couldn't reach the server just now. Check that the backend is running and try again." },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", gap: 20 }}>
      <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="muted" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 11.5 }}>Try asking</div>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            className="btn btn-outline"
            style={{ height: "auto", padding: "10px 12px", textAlign: "left", fontWeight: 500 }}
            onClick={() => send(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", paddingBottom: 16 }}>
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} />
          ))}
          {sending && <ChatBubble role="assistant" text="Thinking..." />}
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          style={{ display: "flex", gap: 10 }}
        >
          <input
            className="input"
            placeholder="Ask about campus info or services..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={sending}>Send</button>
        </form>
      </div>
    </div>
  );
}
