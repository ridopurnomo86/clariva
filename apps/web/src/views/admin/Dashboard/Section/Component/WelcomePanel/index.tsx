type KpiCardItem = {
  label: string;
  value: string;
  accent: "green" | "blue" | "orange";
  subtitle: string;
};

const WelcomePanel = ({ cards }: { cards: readonly KpiCardItem[] }) => (
  <div className="rounded-2xl border border-[#e9edf2] bg-[#fcfcfc] p-4">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-[30px] leading-[1.1] font-semibold text-slate-900">
          Welcome Back, HR Admin
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Automated Employee Onboarding Process Flow - Sarah Jenkins
        </p>
      </div>
      <button
        type="button"
        className="rounded-lg bg-[#167b68] px-4 py-2 text-sm font-semibold text-white"
      >
        + Add New
      </button>
    </div>

    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  </div>
);

function KpiCard({ label, value, accent, subtitle }: KpiCardItem) {
  const styles = {
    green: "bg-[#edf8f5] text-[#167b68]",
    blue: "bg-[#eff4ff] text-[#2f62ca]",
    orange: "bg-[#fff2e7] text-[#d27b1f]",
  };

  return (
    <article className="rounded-xl border border-[#e8edf2] bg-white p-3">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${styles[accent]}`}>
          Live
        </span>
      </div>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="text-xs text-slate-400">{subtitle}</p>
    </article>
  );
}

export default WelcomePanel;
