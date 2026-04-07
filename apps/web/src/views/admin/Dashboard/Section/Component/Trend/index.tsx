const Trend = () => (
  <div className="rounded-2xl border border-[#e8edf3] bg-white p-4">
    <div className="mb-3 flex items-center justify-between">
      <p className="font-semibold text-slate-800">Onboarding Progress Trend</p>
      <span className="rounded-md border border-[#e4e8ef] px-2.5 py-1 text-xs text-slate-500">
        1 Nov - 7 Nov 2026
      </span>
    </div>
    <SimpleLineChart />
  </div>
);

function SimpleLineChart() {
  return (
    <div className="rounded-xl border border-[#edf1f6] bg-[#fbfdff] p-3">
      <svg viewBox="0 0 760 250" className="h-[220px] w-full">
        <defs>
          <linearGradient id="fillGradSection" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f9d86" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#2f9d86" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((line) => (
          <line
            key={line}
            x1="40"
            y1={35 + line * 40}
            x2="730"
            y2={35 + line * 40}
            stroke="#e8edf3"
            strokeWidth="1"
          />
        ))}
        <polyline
          fill="url(#fillGradSection)"
          stroke="none"
          points="40,200 120,165 200,170 280,130 360,142 440,102 520,111 600,84 680,93 730,90 730,235 40,235"
        />
        <polyline
          fill="none"
          stroke="#1a8b74"
          strokeWidth="4"
          strokeLinecap="round"
          points="40,200 120,165 200,170 280,130 360,142 440,102 520,111 600,84 680,93 730,90"
        />
      </svg>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>Aug 01, 2026</span>
        <span>Aug 31, 2026</span>
      </div>
    </div>
  );
}

export default Trend;
