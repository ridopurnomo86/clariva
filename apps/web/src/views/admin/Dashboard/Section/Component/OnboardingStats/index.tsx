const OnboardingStats = () => (
  <div className="space-y-3 rounded-2xl border border-[#e8edf3] bg-white p-4">
    <p className="font-semibold text-slate-800">Onboarding Stats</p>
    <StatBlock
      label="Job Applications"
      value="246"
      detail="Interviews 101 | Hired 26"
      bg="bg-[#fff2e9]"
    />
    <StatBlock
      label="Upcoming Interviews"
      value="12"
      detail="This week"
      bg="bg-[#eef4ff]"
    />
    <StatBlock
      label="Pending Approvals"
      value="07"
      detail="Need HR action"
      bg="bg-[#ecfbf3]"
    />
  </div>
);

function StatBlock({
  label,
  value,
  detail,
  bg,
}: {
  label: string;
  value: string;
  detail: string;
  bg: string;
}) {
  return (
    <article className={`rounded-xl border border-[#ebeff4] p-3 ${bg}`}>
      <p className="text-xs font-semibold tracking-[0.08em] text-slate-500 uppercase">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{detail}</p>
    </article>
  );
}

export default OnboardingStats;
