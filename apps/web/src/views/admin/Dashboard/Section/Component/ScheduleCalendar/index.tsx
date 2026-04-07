import { CalendarDays } from "lucide-react";

const ScheduleCalendar = () => (
  <div className="rounded-2xl border border-[#e8edf3] bg-white p-4">
    <div className="mb-3 flex items-center justify-between">
      <p className="font-semibold text-slate-800">January 2026</p>
      <button
        type="button"
        className="grid size-7 place-items-center rounded-md border border-[#e5e9ef] text-slate-500"
      >
        <CalendarDays className="size-4" />
      </button>
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <span key={day} className="py-1">
          {day}
        </span>
      ))}
    </div>
    <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
      {[15, 16, 17, 18, 19, 20, 21].map((date) => (
        <span
          key={date}
          className={`rounded-md py-1.5 ${
            date === 19 ? "bg-[#2f9d86] font-semibold text-white" : "text-slate-600"
          }`}
        >
          {date}
        </span>
      ))}
    </div>
  </div>
);

export default ScheduleCalendar;
