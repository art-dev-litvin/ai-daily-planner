import { ChatUI } from "@/components/Chat";
import { TaskPanelUI } from "@/components/TaskPanel";

export default function Home() {
  return (
    <main className="flex h-screen w-full bg-slate-50 p-4 gap-4 overflow-hidden">
      {/* Chat */}
      <div className="w-1/2 h-full min-w-100">
        <ChatUI />
      </div>

      {/* Tasks */}
      <div className="w-1/2 h-full min-w-100">
        <TaskPanelUI />
      </div>
    </main>
  );
}
