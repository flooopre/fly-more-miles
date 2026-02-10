import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const howItWorksHref = isHome ? "#how-it-works" : "/#how-it-works";
  const faqHref = isHome ? "#faq" : "/#faq";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg">MilesTopUp</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href={howItWorksHref} className="hover:text-foreground transition-colors">How It Works</a>
          <a href={faqHref} className="hover:text-foreground transition-colors">FAQ</a>
          <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        </div>

        <a href={isHome ? "#quote-form" : "/#quote-form"}>
          <Button
            size="sm"
            className="gold-gradient text-primary-foreground font-semibold rounded-lg glow-gold hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </Button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
