import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const scrollToForm = () => {
    const form = document.getElementById("quote-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center space-y-6 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary">
              <Sparkles className="w-4 h-4" />
              Better rates than buying direct
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display">
              Ready to Book That Dream Flight?
            </h2>

            <p className="text-muted-foreground max-w-lg mx-auto">
              Get a free, no-obligation quote in minutes. We'll beat airline prices and deliver your miles within 48 hours.
            </p>

            <Button
              onClick={scrollToForm}
              className="gold-gradient text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl glow-gold hover:opacity-90 transition-opacity"
            >
              Get Your Quote Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-xs text-muted-foreground">
              No payment required • Response within minutes • Worldwide service
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
