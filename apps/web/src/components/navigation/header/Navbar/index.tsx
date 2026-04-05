import Logo from "./Logo";
import Menu from "./Menu";
import Navigation from "./Navigation";

const Navbar = () => (
	<nav className="w-full fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-[#FDFDFD]/80 backdrop-blur-md border-b border-slate-100">
		<Logo />
		<Navigation />
		<Menu />
	</nav>
);

export default Navbar;
