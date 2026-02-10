import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-card text-sm text-muted-foreground">
            <Plane className="w-4 h-4 text-primary" />
            Avios & Flying Blue Top-Up
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight">
            Short on Miles?{" "}
            <span className="gold-text">We'll Top You Up.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Get Avios or Flying Blue miles delivered to your account in 48 hours.
            No drama, no hassle—just the miles you need for that award flight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              size="lg"
              className="gold-gradient text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl glow-gold hover:opacity-90 transition-opacity"
            >
              Get a Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary px-8 py-6 rounded-xl text-base"
            >
              How It Works
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              48h Delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Secure Payment
            </span>
          </div>
        </motion.div>

        {/* Right: Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="float-animation">
            <div className="glass-card p-8 w-[340px] space-y-6 glow-gold relative">
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/10 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Miles Balance</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success">Active</span>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-4 space-y-1">
                  <span className="text-xs text-muted-foreground">Avios</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-display gold-text">125,000</span>
                    <span className="text-xs text-success">+25k</span>
                  </div>
                </div>

                <div className="glass-card p-4 space-y-1">
                  <span className="text-xs text-muted-foreground">Flying Blue</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-display gold-text">80,000</span>
                    <span className="text-xs text-success">+15k</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Last top-up: 2 days ago</span>
                <Plane className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
