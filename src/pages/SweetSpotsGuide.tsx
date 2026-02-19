import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail, CheckCircle, Plane, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const aviosSweetSpots = [
  { route: "Dublin → New York", airline: "Aer Lingus", cabin: "Business", avios: 50000, cashPrice: 2400, value: "4.8p", highlight: true },
  { route: "London → Doha", airline: "Qatar Airways", cabin: "QSuites", avios: 50000, cashPrice: 3800, value: "7.6p", highlight: true },
  { route: "London → Tokyo", airline: "JAL", cabin: "First", avios: 104000, cashPrice: 9200, value: "8.8p", highlight: true },
  { route: "London → Cape Town", airline: "British Airways", cabin: "Business", avios: 65000, cashPrice: 3600, value: "5.5p", highlight: false },
  { route: "London → Hong Kong", airline: "Cathay Pacific", cabin: "Business", avios: 78000, cashPrice: 4200, value: "5.4p", highlight: false },
  { route: "Madrid → Buenos Aires", airline: "Iberia", cabin: "Business", avios: 68000, cashPrice: 3200, value: "4.7p", highlight: false },
  { route: "London → Bangkok", airline: "Qatar Airways", cabin: "Business", avios: 70000, cashPrice: 3600, value: "5.1p", highlight: false },
  { route: "London → Sydney", airline: "Qantas", cabin: "Business", avios: 104000, cashPrice: 6800, value: "6.5p", highlight: false },
];

const flyingBlueSweetSpots = [
  { route: "Paris → New York", airline: "Air France", cabin: "Business", miles: 72000, cashPrice: 3500, value: "4.9¢", highlight: true },
  { route: "Amsterdam → Tokyo", airline: "KLM", cabin: "Business", miles: 86000, cashPrice: 4800, value: "5.6¢", highlight: true },
  { route: "Paris → Mauritius", airline: "Air France", cabin: "Business", miles: 62000, cashPrice: 3200, value: "5.2¢", highlight: false },
  { route: "Paris → Martinique", airline: "Air France", cabin: "Business", miles: 53000, cashPrice: 2800, value: "5.3¢", highlight: true },
  { route: "Amsterdam → Cape Town", airline: "KLM", cabin: "Business", miles: 78000, cashPrice: 3600, value: "4.6¢", highlight: false },
  { route: "Paris → Bangkok", airline: "Air France", cabin: "Business", miles: 72000, cashPrice: 3400, value: "4.7¢", highlight: false },
];

const SweetSpotsGuide = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    document.title = "Free Guide: Avios & Flying Blue Sweet Spots 2026 | MilesTopUp";
    
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = "Download our free PDF guide with the best Avios and Flying Blue sweet spot redemptions for 2026. See which routes give you the most value per mile.";
    meta.id = "guide-meta";
    document.head.appendChild(meta);

    return () => {
      document.getElementById("guide-meta")?.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
          program: "Lead Magnet - Sweet Spots Guide",
          miles: "PDF Download",
          to_email: "hello@milestopup.com",
        },
        { publicKey: "4WZLMejoOYRfMkK-s" }
      );

      // Track in GA4
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "lead_magnet_download", {
          lead_magnet: "sweet_spots_guide",
          email_captured: true,
        });
      }

      setUnlocked(true);
      toast.success("Check your email! The guide is also available below.");
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
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Download className="w-4 h-4" />
                Free PDF Guide
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Avios & Flying Blue <span className="gold-text">Sweet Spots</span> 2026
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the best value redemptions that insiders use. Get 5-10x the value from your miles on these routes.
              </p>
            </div>

            {/* Preview + Gate */}
            {!unlocked ? (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Preview */}
                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
                  <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Top Avios Sweet Spots
                  </h3>
                  <div className="space-y-3 blur-sm">
                    {aviosSweetSpots.slice(0, 4).map((spot, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium text-sm">{spot.route}</p>
                          <p className="text-xs text-muted-foreground">{spot.airline} {spot.cabin}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{spot.value}/Avios</p>
                          <p className="text-xs text-muted-foreground">{spot.avios.toLocaleString()} Avios</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4 relative z-20">
                    + 4 more Avios sweet spots...
                  </p>
                </div>

                {/* Email Gate */}
                <div className="glass-card p-8 glow-gold">
                  <h3 className="font-display text-xl font-bold mb-2">Get the Full Guide Free</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your email to unlock all sweet spots + get tips on maximizing your miles.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={sending}
                      className="w-full gold-gradient text-primary-foreground font-semibold py-6"
                    >
                      {sending ? "Sending..." : "Get Free Guide"}
                      {!sending && <Mail className="ml-2 w-5 h-5" />}
                    </Button>
                  </form>

                  <div className="mt-6 space-y-2">
                    {["8 Avios sweet spots (up to 8.8p value)", "6 Flying Blue sweet spots", "Booking tips & tricks", "No spam, unsubscribe anytime"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Unlocked Content */
              <div className="space-y-12 mb-12">
                {/* Success Message */}
                <div className="glass-card p-6 border-green-500/30 bg-green-500/5 text-center">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <h3 className="font-display text-xl font-bold mb-2">Guide Unlocked! 🎉</h3>
                  <p className="text-sm text-muted-foreground">
                    We've also sent a copy to your email. Bookmark this page for easy access.
                  </p>
                </div>

                {/* Avios Sweet Spots */}
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                    <Plane className="w-6 h-6 text-primary" />
                    Best Avios Sweet Spots 2026
                  </h2>
                  <div className="grid gap-4">
                    {aviosSweetSpots.map((spot, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${spot.highlight ? "border-primary/30 bg-primary/5" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          {spot.highlight && <Star className="w-5 h-5 text-primary shrink-0 mt-0.5" />}
                          <div>
                            <p className="font-semibold">{spot.route}</p>
                            <p className="text-sm text-muted-foreground">{spot.airline} • {spot.cabin}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 md:gap-8">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Avios</p>
                            <p className="font-bold">{spot.avios.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Cash Price</p>
                            <p className="font-bold">£{spot.cashPrice.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Value</p>
                            <p className="font-bold text-primary text-lg">{spot.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Flying Blue Sweet Spots */}
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                    <Plane className="w-6 h-6 text-blue-500" />
                    Best Flying Blue Sweet Spots 2026
                  </h2>
                  <div className="grid gap-4">
                    {flyingBlueSweetSpots.map((spot, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${spot.highlight ? "border-blue-500/30 bg-blue-500/5" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          {spot.highlight && <Star className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}
                          <div>
                            <p className="font-semibold">{spot.route}</p>
                            <p className="text-sm text-muted-foreground">{spot.airline} • {spot.cabin}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 md:gap-8">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Miles</p>
                            <p className="font-bold">{spot.miles.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Cash Price</p>
                            <p className="font-bold">€{spot.cashPrice.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Value</p>
                            <p className="font-bold text-blue-500 text-lg">{spot.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tips Section */}
                <div className="glass-card p-8">
                  <h2 className="font-display text-xl font-bold mb-4">💡 Pro Tips</h2>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">1.</span>
                      <span><strong>Book partner airlines</strong> — Avios on Qatar QSuites or JAL First Class often beats BA's own product.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">2.</span>
                      <span><strong>Avoid peak surcharges</strong> — BA adds hefty fuel surcharges. Partner airlines like Aer Lingus charge much less.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">3.</span>
                      <span><strong>Check Flying Blue Promo Rewards</strong> — Monthly deals can cut redemption costs by 25-50%.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">4.</span>
                      <span><strong>Top up strategically</strong> — Only buy the miles you need. Our rates beat airline sales.</span>
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="glass-card p-8 text-center bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
                  <h2 className="font-display text-2xl font-bold mb-3">Short on Miles?</h2>
                  <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    Top up your Avios or Flying Blue balance at better rates than the airlines. Delivery in 24-48 hours.
                  </p>
                  <Button asChild className="gold-gradient text-primary-foreground font-semibold px-8 py-6">
                    <a href="/#quote-form">
                      Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SweetSpotsGuide;
