import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ title, children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar title={title} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
