import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

const MobileMenu = () => (
  <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-zinc-950 border-b p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
    <Link to="/" className="text-sm font-medium">
      Home
    </Link>
    <Link to="/" className="text-sm font-medium">
      Features
    </Link>
    <Link to="/" className="text-sm font-medium">
      About
    </Link>
    <Link to="/" className="text-sm font-medium">
      Pricing
    </Link>
    <Link to="/" className="text-sm font-medium">
      Contact
    </Link>
    <hr />
    <Link to="/login" className="text-sm font-medium">
      Log in
    </Link>
    <Button size="sm" asChild>
      <Link to="/signup">Started for Free</Link>
    </Button>
  </div>
);

export default MobileMenu;
