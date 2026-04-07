type AgendaItemData = {
  title: string;
  time: string;
  color: "teal" | "blue" | "orange";
  attendees: readonly string[];
};

const TodayAgenda = ({ items }: { items: readonly AgendaItemData[] }) => (
  <div className="rounded-2xl border border-[#e8edf3] bg-white p-4">
    <p className="mb-3 font-semibold text-slate-800">Today</p>
    <div className="space-y-3">
      {items.map((item) => (
        <AgendaItem key={item.title} {...item} />
      ))}
    </div>
  </div>
);

function AgendaItem({ title, time, color, attendees }: AgendaItemData) {
  const strip = {
    teal: "bg-[#2f9d86]",
    blue: "bg-[#4f74db]",
    orange: "bg-[#e08a33]",
  };

  return (
    <article className="flex gap-3 rounded-xl border border-[#edf1f6] bg-[#fcfdff] p-3">
      <span className={`mt-1 h-10 w-1 rounded-full ${strip[color]}`} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{time}</p>
        <div className="mt-2 flex items-center gap-1">
          {attendees.map((name) => (
            <span
              key={name}
              className="inline-flex size-6 items-center justify-center rounded-full bg-[#eef3f8] text-[10px] font-semibold text-slate-600"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default TodayAgenda;
