import type { ReactNode } from "react";

const NavItem = ({
  icon,
  label,
  collapsed,
  active = false,
}: {
  icon: ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
}) => (
  <button
    type="button"
    className={`group flex w-full items-center rounded-xl px-3 py-2 text-sm transition-all duration-300 ${
      active
        ? "bg-[#edf7f4] font-semibold text-[#116e5d]"
        : "text-slate-600 hover:bg-[#f5f7fa]"
    } 
    `}
    title={collapsed ? label : undefined}
  >
    <span className="shrink-0">{icon}</span>
    <span
      className={`overflow-hidden whitespace-nowrap ${
        collapsed ? "ml-0 max-w-0" : "ml-2 max-w-[160px]"
      }`}
    >
      {label}
    </span>
  </button>
);

export default NavItem;
