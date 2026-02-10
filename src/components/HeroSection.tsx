import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const HeroSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [miles, setMiles] = useState("");
  const [program, setProgram] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !miles || !program) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Quote request sent! We'll get back to you shortly.");
    setName("");
    setEmail("");
    setMiles("");
    setProgram("");
  };

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
            Trusted Avios & Flying Blue Top-Up Service
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight">
            Short on Miles?{" "}
            <span className="gold-text">We'll Top You Up.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Get Avios or Flying Blue miles delivered to your account within 48 hours.
            Better rates than the airlines — worldwide service.
          </p>

          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              48h Delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Secure Payment
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Worldwide Service
            </span>
          </div>
        </motion.div>

        {/* Right: Quote Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <form id="quote-form" onSubmit={handleSubmit} className="glass-card p-8 w-full max-w-[400px] space-y-5 glow-gold relative">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/10 rounded-full blur-2xl" />

            <div className="space-y-1">
              <h3 className="text-lg font-bold font-display">Get a Quote</h3>
              <p className="text-xs text-muted-foreground">Fill in the details and we'll send you a price.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs text-muted-foreground">Your Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program" className="text-xs text-muted-foreground">Miles Program</Label>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="avios">Avios</SelectItem>
                  <SelectItem value="flying-blue">Flying Blue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="miles" className="text-xs text-muted-foreground">Desired Miles</Label>
              <Input
                id="miles"
                type="number"
                placeholder="e.g. 50000"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>

            <Button
              type="submit"
              className="w-full gold-gradient text-primary-foreground font-semibold text-base py-6 rounded-xl glow-gold hover:opacity-90 transition-opacity"
            >
              Get a Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
