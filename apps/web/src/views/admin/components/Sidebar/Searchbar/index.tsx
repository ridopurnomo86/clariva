import { Search } from "lucide-react";

const SearchBar = ({ collapsed }: { collapsed: boolean }) => (
  <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#e4e7eb] bg-white px-3 py-2">
    <Search className="size-4 text-slate-400" />
    <span
      className={`overflow-hidden whitespace-nowrap text-sm text-slate-400 transition-all duration-300 ${
        collapsed ? "max-w-0 opacity-0" : "max-w-[140px] opacity-100"
      }`}
    >
      Search
    </span>
  </div>
);

export default SearchBar;
