import { MenuIcon, Search } from "lucide-react";

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
			className="flex items-center gap-2 border border-slate-200 px-3 py-2 sm:px-4 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors"
		>
			<span className="hidden sm:inline">Menu</span> <MenuIcon size={16} />
		</button>
	</div>
);

export default Menu;
