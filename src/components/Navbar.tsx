import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg">MilesTopUp</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
        </div>

        <Button
          size="sm"
          className="gold-gradient text-primary-foreground font-semibold rounded-lg glow-gold hover:opacity-90 transition-opacity"
        >
          Get a Quote
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
