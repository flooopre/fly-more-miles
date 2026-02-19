import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Mail, CheckCircle, TrendingUp, TrendingDown, AlertCircle, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const COST_PER_AVIOS = 0.015; // £0.015 per Avios
const COST_PER_FB = 0.012; // €0.012 per Flying Blue mile

const MilesWorthCalculator = () => {
  const [program, setProgram] = useState<"avios" | "flying-blue">("avios");
  const [milesNeeded, setMilesNeeded] = useState("");
  const [cashPrice, setCashPrice] = useState("");
  const [cabin, setCabin] = useState<"economy" | "business" | "first">("business");
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const miles = parseInt(milesNeeded) || 0;
  const cash = parseInt(cashPrice) || 0;
  const costPerMile = program === "avios" ? COST_PER_AVIOS : COST_PER_FB;
  const currency = program === "avios" ? "£" : "€";
  
  const milestopupCost = Math.round(miles * costPerMile);
  const savings = cash - milestopupCost;
  const savingsPercent = cash > 0 ? Math.round((savings / cash) * 100) : 0;
  const valuePerMile = miles > 0 ? ((cash / miles) * 100).toFixed(2) : "0";
  
  const isWorthIt = savingsPercent > 20;
  const isGreatDeal = savingsPercent > 40;
  const isBadDeal = savingsPercent < 0;

  useEffect(() => {
    document.title = "Is Buying Miles Worth It? Free Calculator | MilesTopUp";
  }, []);

  const handleCalculate = () => {
    if (!miles || !cash) {
      toast.error("Please enter both miles needed and cash price.");
      return;
    }
    setCalculated(true);
    
    // Track partial calculation in GA4
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "calculator_used", {
        calculator: "miles_worth",
        program: program,
        miles: miles,
        unlocked: unlocked,
      });
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please enter your name and email.");
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        "service_zyc1jrc",
        "template_vui30ot",
        {
          name: name,
          email: email,
          program: `Lead Magnet - Miles Calculator (${program})`,
          miles: `${miles.toLocaleString()} miles, ${currency}${cash} cash price`,
          to_email: "hello@milestopup.com",
        },
        { publicKey: "4WZLMejoOYRfMkK-s" }
      );

      // Track in GA4
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "lead_magnet_unlock", {
          lead_magnet: "miles_worth_calculator",
          program: program,
          email_captured: true,
        });
      }

      setUnlocked(true);
      toast.success("Calculator unlocked! See your full results below.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 px-4">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Calculator className="w-4 h-4" />
                Free Tool
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Is Buying Miles <span className="gold-text">Worth It?</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Enter your trip details and instantly see if topping up miles saves you money.
              </p>
            </div>

            {/* Calculator Form */}
            <div className="glass-card p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Program */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Miles Program</Label>
                  <Select value={program} onValueChange={(v) => setProgram(v as "avios" | "flying-blue")}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avios">Avios (British Airways)</SelectItem>
                      <SelectItem value="flying-blue">Flying Blue (Air France-KLM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cabin */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Cabin Class</Label>
                  <Select value={cabin} onValueChange={(v) => setCabin(v as "economy" | "business" | "first")}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Miles Needed */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    {program === "avios" ? "Avios" : "Flying Blue Miles"} Needed
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g. 50000"
                    value={milesNeeded}
                    onChange={(e) => setMilesNeeded(e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>

                {/* Cash Price */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Cash Price for This Flight ({currency})
                  </Label>
                  <Input
                    type="number"
                    placeholder={`e.g. ${program === "avios" ? "2500" : "3000"}`}
                    value={cashPrice}
                    onChange={(e) => setCashPrice(e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full gold-gradient text-primary-foreground font-semibold py-6"
              >
                Calculate <Calculator className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Results */}
            {calculated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Quick Verdict (always visible) */}
                <div className={`glass-card p-6 text-center ${
                  isBadDeal ? "border-red-500/30 bg-red-500/5" :
                  isGreatDeal ? "border-green-500/30 bg-green-500/5" :
                  isWorthIt ? "border-primary/30 bg-primary/5" :
                  "border-yellow-500/30 bg-yellow-500/5"
                }`}>
                  {isBadDeal ? (
                    <>
                      <TrendingDown className="w-12 h-12 text-red-500 mx-auto mb-3" />
                      <h3 className="font-display text-2xl font-bold text-red-500 mb-2">Not Worth It</h3>
                      <p className="text-muted-foreground">Paying cash is cheaper for this flight.</p>
                    </>
                  ) : isGreatDeal ? (
                    <>
                      <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h3 className="font-display text-2xl font-bold text-green-500 mb-2">Great Deal! 🔥</h3>
                      <p className="text-muted-foreground">You'll save big by buying miles for this flight.</p>
                    </>
                  ) : isWorthIt ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                      <h3 className="font-display text-2xl font-bold text-primary mb-2">Worth It ✓</h3>
                      <p className="text-muted-foreground">Buying miles makes sense for this redemption.</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                      <h3 className="font-display text-2xl font-bold text-yellow-500 mb-2">Borderline</h3>
                      <p className="text-muted-foreground">Small savings. Consider if flexibility matters to you.</p>
                    </>
                  )}
                </div>

                {/* Detailed Results (gated) */}
                {!unlocked ? (
                  <div className="glass-card p-8 glow-gold">
                    <div className="text-center max-w-sm mx-auto">
                      <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-display text-xl font-bold mb-2">Unlock Full Results</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        See your exact savings, cost per mile, and personalized recommendation.
                      </p>
                      
                      {/* Teaser of what's behind */}
                      <div className="grid grid-cols-3 gap-3 mb-6 opacity-40 blur-[2px]">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground">Savings</p>
                          <p className="text-lg font-bold">??%</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground">Value</p>
                          <p className="text-lg font-bold">?.?p</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground">Cost</p>
                          <p className="text-lg font-bold">{currency}???</p>
                        </div>
                      </div>

                      <form onSubmit={handleUnlock} className="space-y-3">
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-secondary/50 border-border"
                        />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-secondary/50 border-border"
                        />
                        <Button
                          type="submit"
                          disabled={sending}
                          className="w-full gold-gradient text-primary-foreground font-semibold py-5"
                        >
                          {sending ? "Unlocking..." : "Unlock Full Results"}
                          {!sending && <Mail className="ml-2 w-4 h-4" />}
                        </Button>
                      </form>
                      <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
                    </div>
                  </div>
                ) : (
                  /* Unlocked Full Results */
                  <div className="glass-card p-8">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 bg-muted/30 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Cash Price</p>
                        <p className="text-2xl font-bold text-red-400">{currency}{cash.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                        <p className="text-sm text-muted-foreground mb-1">MilesTopUp Cost</p>
                        <p className="text-2xl font-bold text-green-500">{currency}{milestopupCost.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-xl border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">You Save</p>
                        <p className="text-2xl font-bold text-primary">{savingsPercent}%</p>
                        <p className="text-xs text-muted-foreground">{currency}{Math.abs(savings).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                        <span className="text-muted-foreground">Miles needed</span>
                        <span className="font-bold">{miles.toLocaleString()} {program === "avios" ? "Avios" : "Flying Blue"}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                        <span className="text-muted-foreground">Value per mile</span>
                        <span className="font-bold text-primary">{valuePerMile}{program === "avios" ? "p" : "¢"}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                        <span className="text-muted-foreground">Our rate</span>
                        <span className="font-bold">{(costPerMile * 100).toFixed(1)}{program === "avios" ? "p" : "¢"} per mile</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                      <h4 className="font-semibold mb-2">💡 Recommendation</h4>
                      <p className="text-sm text-muted-foreground">
                        {isGreatDeal ? (
                          `At ${valuePerMile}${program === "avios" ? "p" : "¢"} per mile, this is excellent value. ${cabin === "business" || cabin === "first" ? "Premium cabin redemptions" : "Even in economy,"} you're getting great bang for your buck. We recommend buying the miles.`
                        ) : isWorthIt ? (
                          `Solid value at ${valuePerMile}${program === "avios" ? "p" : "¢"} per mile. Buying miles will save you ${currency}${savings.toLocaleString()} compared to cash.`
                        ) : isBadDeal ? (
                          `At ${valuePerMile}${program === "avios" ? "p" : "¢"} per mile, paying cash is actually cheaper. Consider looking for a different route or upgrading to business class for better value.`
                        ) : (
                          `Borderline case. You'd save ${currency}${savings.toLocaleString()}, but it's not a huge difference. If you value flexibility, the cash fare might be better.`
                        )}
                      </p>
                    </div>

                    {/* CTA */}
                    {isWorthIt && (
                      <Button asChild className="w-full gold-gradient text-primary-foreground font-semibold py-6">
                        <a href="/#quote-form">
                          Get a Quote for {miles.toLocaleString()} {program === "avios" ? "Avios" : "Miles"}
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* How It Works */}
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-center mb-8">How Does This Work?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "We Compare Prices", desc: "Enter what the airline charges in cash and how many miles you'd need for the same flight." },
                  { title: "Calculate Real Value", desc: "We show you the value per mile and compare it to our rates to see your actual savings." },
                  { title: "Make Smart Decisions", desc: "Know instantly whether buying miles makes sense — or if you should just pay cash." },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-6 text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mx-auto mb-4">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MilesWorthCalculator;
