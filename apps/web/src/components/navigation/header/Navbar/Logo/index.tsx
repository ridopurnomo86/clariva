import { Kanban } from "lucide-react";

const Logo = () => (
	<div className="flex items-center gap-2 cursor-pointer group">
		<div className="bg-black text-white p-2 rounded-md group-hover:scale-105 transition-transform">
			<Kanban size={16} strokeWidth={2.5} />
		</div>
		<span className="font-bold text-xl tracking-tight">Clariva</span>
	</div>
);

export default Logo;
