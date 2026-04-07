import { useState } from "react";
import Section from "./Section";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <div className="mx-auto h-full">
        <div className="flex min-h-[880px] flex-col gap-3 lg:flex-row">
          <Sidebar
            collapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
          />
          <div className="min-w-0 flex-1">
            <Section />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
