import { Plane, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const howItWorksHref = isHome ? "#how-it-works" : "/#how-it-works";
  const faqHref = isHome ? "#faq" : "/#faq";

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg">MilesTopUp</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href={howItWorksHref} className="hover:text-foreground transition-colors">How It Works</a>
          <div className="relative group">
            <button className="hover:text-foreground transition-colors">Buy Miles ▾</button>
            <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
              <Link to="/buy-avios" className="block px-4 py-3 hover:bg-muted transition-colors">Buy Avios</Link>
              <Link to="/buy-flying-blue-miles" className="block px-4 py-3 hover:bg-muted transition-colors">Buy Flying Blue Miles</Link>
            </div>
          </div>
          <Link to="/tools/avios-calculator" className="hover:text-foreground transition-colors">Calculator</Link>
          <a href={faqHref} className="hover:text-foreground transition-colors">FAQ</a>
          <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        </div>

        <div className="flex items-center gap-3">
          <a href={isHome ? "#quote-form" : "/#quote-form"} onClick={closeMenu}>
            <Button
              size="sm"
              className="gold-gradient text-primary-foreground font-semibold rounded-lg glow-gold hover:opacity-90 transition-opacity"
            >
              Get a Quote
            </Button>
          </a>

          {/* Burger button - mobile only */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <div className="container max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 text-sm">
            <a href={howItWorksHref} onClick={closeMenu} className="text-muted-foreground hover:text-foreground transition-colors py-2">
              How It Works
            </a>
            <Link to="/buy-avios" onClick={closeMenu} className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Buy Avios
            </Link>
            <Link to="/buy-flying-blue-miles" onClick={closeMenu} className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Buy Flying Blue Miles
            </Link>
            <Link to="/tools/avios-calculator" onClick={closeMenu} className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Avios Calculator
            </Link>
            <a href={faqHref} onClick={closeMenu} className="text-muted-foreground hover:text-foreground transition-colors py-2">
              FAQ
            </a>
            <Link to="/blog" onClick={closeMenu} className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
