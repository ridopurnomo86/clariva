type PerformerItem = {
  name: string;
  role: string;
  progress: string;
};

const Performers = ({ people }: { people: readonly PerformerItem[] }) => (
  <div className="rounded-2xl border border-[#e8edf3] bg-white p-4">
    <div className="mb-3 flex items-center justify-between">
      <p className="font-semibold text-slate-800">Top Performers</p>
      <span className="text-xs text-slate-400">7d</span>
    </div>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {people.map((person) => (
        <div
          key={person.name}
          className="rounded-xl border border-[#ebeff4] bg-[#fcfdff] p-3"
        >
          <p className="text-sm font-semibold text-slate-800">{person.name}</p>
          <p className="text-xs text-slate-500">{person.role}</p>
          <p className="mt-1 text-xs font-semibold text-[#2f9d86]">
            Onboarding support: {person.progress}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default Performers;
