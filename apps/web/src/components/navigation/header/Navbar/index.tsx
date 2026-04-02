import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Kanban, Menu as MenuIcon, Search } from "lucide-react";

const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer group">
    <div className="bg-black text-white p-2 rounded-md group-hover:scale-105 transition-transform">
      <Kanban size={16} strokeWidth={2.5} />
    </div>
    <span className="font-bold text-xl tracking-tight">Clariva</span>
  </div>
);

const Navigation = () => (
  <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
    {["Product", "Services", "Career", "Pricing", "About"].map((item) => (
      <li key={item}>
        <Link
          to="/"
          className="hover:text-black transition-colors relative group"
        >
          {item}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
        </Link>
      </li>
    ))}
    <li>
      <button
        type="button"
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        Login <ArrowUpRight size={16} />
      </button>
    </li>
  </ul>
);

const Menu = () => (
  <div className="flex items-center gap-3">
    <button
      type="button"
      className="p-2 rounded-full hover:bg-slate-100 transition-colors"
    >
      <Search size={20} className="text-slate-700" />
    </button>
    <button
      type="button"
      className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors"
    >
      Menu <MenuIcon size={16} />
    </button>
  </div>
);

const Navbar = () => (
  <nav className="w-full fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#FDFDFD]/80 backdrop-blur-md">
    <Logo />
    <Navigation />
    <Menu />
  </nav>
);

export default Navbar;
