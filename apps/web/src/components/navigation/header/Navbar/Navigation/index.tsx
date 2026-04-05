import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
	{
		label: "Product",
		path: "/product",
	},
	{
		label: "Services",
		path: "/",
	},
	{
		label: "Career",
		path: "/",
	},
	{
		label: "Pricing",
		path: "/",
	},
	{
		label: "About",
		path: "/",
	},
];

const Navigation = () => (
	<ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
		{NAV_ITEMS.map((item) => (
			<li key={item.label}>
				<Link
					to={item.path}
					className="hover:text-black transition-colors relative group"
				>
					{item.label}
					<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
				</Link>
			</li>
		))}
		<li>
			<Link to="/login">
				<button
					type="button"
					className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
				>
					Login <ArrowUpRight size={16} />
				</button>
			</Link>
		</li>
	</ul>
);

export default Navigation;
