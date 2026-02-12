import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg">MilesTopUp</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MilesTopUp. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="mailto:hello@milestopup.com" className="hover:text-foreground transition-colors">Contact</a>
          <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
          <a href="/tools/avios-calculator" className="hover:text-foreground transition-colors">Calculator</a>
          <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="/impressum" className="hover:text-foreground transition-colors">Impressum</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
