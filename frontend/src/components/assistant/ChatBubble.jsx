export default function ChatBubble({ role, text }) {
  return (
    <div style={{ display: "flex", justifyContent: role === "user" ? "flex-end" : "flex-start" }}>
      <div className={`chat-bubble ${role === "user" ? "user" : "assistant"}`}>{text}</div>
    </div>
  );
}
