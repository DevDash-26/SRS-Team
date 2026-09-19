import Layout from "../components/common/Layout";
import ChatWindow from "../components/assistant/ChatWindow";

export default function Assistant() {
  return (
    <Layout title="Campus Assistant">
      <div style={{ height: "calc(100vh - 68px - 52px)" }}>
        <ChatWindow />
      </div>
    </Layout>
  );
}
