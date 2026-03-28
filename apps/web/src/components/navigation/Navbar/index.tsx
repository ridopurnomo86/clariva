import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "../../ui/button";
import MobileMenu from "./MobileMenu";

function useScroll(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}

const Navbar = () => {
  const scrolled = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
            T
          </div>
          <span className="text-xl font-bold tracking-tight">TaskZen</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/" className="text-foreground">
            Home
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link
            to="/login"
            className="hover:text-foreground text-muted-foreground transition-colors"
          >
            Log in
          </Link>
          <Button
            size="sm"
            asChild
            className="rounded-full px-6 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200"
          >
            <Link to="/signup">Started for Free</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => {
            console.log("Toggle button clicked (default.tsx)!");
            setMobileMenuOpen((prev) => !prev);
          }}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileMenu />}
    </nav>
  );
};

export default Navbar;
