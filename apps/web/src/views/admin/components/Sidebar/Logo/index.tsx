import { CheckSquare, ChevronDown } from "lucide-react";

const Logo = ({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between">
    {!collapsed ? (
      <div className="flex min-w-0 items-center gap-2">
        <div className="grid size-7 place-items-center rounded-lg bg-[#000000] text-white">
          <CheckSquare className="size-4" />
        </div>
        <p
          className={`overflow-hidden whitespace-nowrap text-lg font-semibold text-[#1f2937] transition-all duration-300 ${
            collapsed ? "max-w-0 opacity-0" : "max-w-[120px] opacity-100"
          }`}
        >
          Clariva
        </p>
      </div>
    ) : null}
    <div className={collapsed ? "flex items-center justify-center w-full" : ""}>
      <button
        type="button"
        className="size-7 place-items-center rounded-md border border-[#e4e7eb] bg-white text-slate-500"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${
            collapsed ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>
    </div>
  </div>
);

export default Logo;
