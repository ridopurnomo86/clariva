import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  ChevronDown,
  CirclePlus,
  Home,
  Mail,
  Search,
  StickyNote,
  UsersRound,
} from "lucide-react";
import NavItem from "./Navigation/NavItem";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./Searchbar";

const MAIN_NAV_ITEMS = (collapsed: boolean) => [
  {
    label: "Dashboard",
    icon: <Home className="size-4" />,
    collapsed,
  },
  {
    label: "Tasks",
    icon: <CheckSquare className="size-4" />,
    collapsed,
  },
  {
    label: "Notes",
    icon: <StickyNote className="size-4" />,
    collapsed,
  },
  {
    label: "Email",
    icon: <Mail className="size-4" />,
    collapsed,
  },
  {
    label: "Calendar",
    icon: <CalendarDays className="size-4" />,
    collapsed,
  },
];

const MANAGEMENT_NAV_ITEMS = (collapsed: boolean) => [
  {
    label: "Reports",
    icon: <BarChart3 className="size-4" />,
    collapsed,
  },
  {
    label: "Contacts",
    icon: <UsersRound className="size-4" />,
    collapsed,
  },
  {
    label: "Invite Team",
    icon: <CirclePlus className="size-4" />,
    collapsed,
  },
];

const Sidebar = ({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) => (
  <aside
    className={`border-r-1 bg-[#fcfcfc] p-4 transition-all duration-300 ease-in-out ${
      collapsed ? "lg:w-[74px]" : "lg:w-[250px]"
    }`}
  >
    <Logo collapsed={collapsed} onToggle={onToggle} />
    {!collapsed && <SearchBar collapsed={collapsed} />}
    <Navigation
      title="Main Menu"
      collapsed={collapsed}
      items={MAIN_NAV_ITEMS}
    />
    <Navigation
      title="Management"
      collapsed={collapsed}
      items={MANAGEMENT_NAV_ITEMS}
    />

    <div
      className={`mt-6 overflow-hidden rounded-xl border border-[#eceff3] bg-[#ffffff] p-3 transition-all duration-300 ${
        collapsed
          ? "max-h-0 border-transparent p-0 opacity-0"
          : "max-h-[220px] opacity-100"
      }`}
    >
      <p className="text-xs font-semibold tracking-[0.1em] text-slate-400 uppercase">
        Focus Employee
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-800">Sarah Jenkins</p>
      <p className="text-xs text-slate-500">Software Engineer</p>
      <div className="mt-3 h-2 rounded-full bg-[#edf1f6]">
        <div className="h-2 w-[75%] rounded-full bg-[#2f9d86]" />
      </div>
      <p className="mt-1 text-xs text-slate-600">75% onboarding complete</p>
    </div>
  </aside>
);

export default Sidebar;
