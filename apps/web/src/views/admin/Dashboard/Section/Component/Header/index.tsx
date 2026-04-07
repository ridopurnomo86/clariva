import { Bell, Mail, Share2 } from "lucide-react";
import type { ReactNode } from "react";

const avatarLabels = ["SJ", "HR", "IT"] as const;

const Header = () => (
  <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ececec] px-5 py-4 md:px-6">
    <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
    <div className="flex items-center gap-2">
      {avatarLabels.map((label) => (
        <span
          key={label}
          className="inline-flex size-7 items-center justify-center rounded-full bg-[#eef3f8] text-[11px] font-semibold text-slate-600"
        >
          {label}
        </span>
      ))}

      <HeaderIconButton icon={<Bell className="size-4" />} />
      <HeaderIconButton icon={<Mail className="size-4" />} />
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-[#dfe4ea] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
      >
        <Share2 className="size-3.5" />
        Share
      </button>
    </div>
  </header>
);

function HeaderIconButton({ icon }: { icon: ReactNode }) {
  return (
    <button
      type="button"
      className="grid size-8 place-items-center rounded-lg border border-[#dfe4ea] bg-white text-slate-500"
    >
      {icon}
    </button>
  );
}

export default Header;
