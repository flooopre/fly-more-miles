import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Plane, ArrowRight, TrendingDown, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Route {
  from: string;
  to: string;
  economy: { avios: number; cash: number };
  business: { avios: number; cash: number };
  first?: { avios: number; cash: number };
}

const routes: Route[] = [
  { from: "London", to: "New York", economy: { avios: 26000, cash: 450 }, business: { avios: 60000, cash: 3200 }, first: { avios: 80000, cash: 6500 } },
  { from: "London", to: "Tokyo", economy: { avios: 39000, cash: 650 }, business: { avios: 78000, cash: 4800 }, first: { avios: 104000, cash: 9200 } },
  { from: "London", to: "Dubai", economy: { avios: 20000, cash: 380 }, business: { avios: 50000, cash: 2800 }, first: { avios: 68000, cash: 5400 } },
  { from: "London", to: "Singapore", economy: { avios: 39000, cash: 580 }, business: { avios: 78000, cash: 5200 }, first: { avios: 104000, cash: 10500 } },
  { from: "London", to: "Cape Town", economy: { avios: 32500, cash: 550 }, business: { avios: 65000, cash: 3600 } },
  { from: "Dublin", to: "New York", economy: { avios: 26000, cash: 380 }, business: { avios: 50000, cash: 2400 } },
  { from: "London", to: "Sydney", economy: { avios: 52000, cash: 850 }, business: { avios: 104000, cash: 6800 }, first: { avios: 140000, cash: 12000 } },
  { from: "London", to: "Hong Kong", economy: { avios: 39000, cash: 520 }, business: { avios: 78000, cash: 4200 }, first: { avios: 104000, cash: 8500 } },
  { from: "London", to: "Doha", economy: { avios: 20000, cash: 350 }, business: { avios: 50000, cash: 3800 } },
  { from: "London", to: "Los Angeles", economy: { avios: 26000, cash: 500 }, business: { avios: 60000, cash: 3800 }, first: { avios: 80000, cash: 7200 } },
  { from: "London", to: "Paris", economy: { avios: 9000, cash: 180 }, business: { avios: 16500, cash: 650 } },
  { from: "London", to: "Barcelona", economy: { avios: 10000, cash: 150 }, business: { avios: 20000, cash: 580 } },
  { from: "London", to: "Maldives", economy: { avios: 39000, cash: 680 }, business: { avios: 78000, cash: 4500 } },
  { from: "London", to: "Johannesburg", economy: { avios: 32500, cash: 600 }, business: { avios: 65000, cash: 3800 }, first: { avios: 87500, cash: 7000 } },
  { from: "London", to: "Bangkok", economy: { avios: 35000, cash: 480 }, business: { avios: 70000, cash: 3600 } },
  { from: "London", to: "Miami", economy: { avios: 26000, cash: 480 }, business: { avios: 60000, cash: 3500 }, first: { avios: 80000, cash: 6800 } },
  { from: "New York", to: "Tokyo", economy: { avios: 30000, cash: 700 }, business: { avios: 60000, cash: 5500 }, first: { avios: 85000, cash: 11000 } },
  { from: "London", to: "Bali", economy: { avios: 45000, cash: 620 }, business: { avios: 90000, cash: 4200 } },
];

const COST_PER_AVIOS = 0.015; // £0.015 per Avios (~1.5p)

const AviosCalculator = () => {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [cabin, setCabin] = useState<"economy" | "business" | "first">("business");

  const route = routes[selectedRoute];
  const cabinData = cabin === "first" && route.first ? route.first : cabin === "business" ? route.business : route.economy;
  const hasFist = !!route.first;

  const aviosNeeded = cabinData.avios;
  const cashPrice = cabinData.cash;
  const milestopupCost = Math.round(aviosNeeded * COST_PER_AVIOS);
  const savings = cashPrice - milestopupCost;
  const savingsPercent = Math.round((savings / cashPrice) * 100);
  const valuePerAvios = (cashPrice / aviosNeeded * 100).toFixed(1);

  useEffect(() => {
    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much are Avios worth?",
          acceptedAnswer: { "@type": "Answer", text: "Avios are typically worth between 0.5p and 2p each, depending on how you redeem them. Business and First Class redemptions offer the best value, often exceeding 1.5p per Avios. Our calculator shows the exact value for popular routes." }
        },
        {
          "@type": "Question",
          name: "Is it cheaper to buy Avios or pay cash for a flight?",
          acceptedAnswer: { "@type": "Answer", text: "For premium cabins (Business and First Class), buying Avios through MilesTopUp and redeeming for award flights is almost always cheaper than paying cash. Savings of 40-70% are common on long-haul Business Class flights." }
        },
        {
          "@type": "Question",
          name: "How much do Avios cost to buy?",
          acceptedAnswer: { "@type": "Answer", text: "Through MilesTopUp, Avios cost approximately 1.5p each — significantly less than British Airways' official sale price of 2-3p per Avios. The more you buy, the better the rate." }
        },
        {
          "@type": "Question",
          name: "What is the best value Avios redemption?",
          acceptedAnswer: { "@type": "Answer", text: "The best value Avios redemptions include: Qatar QSuites business class (Doha routes), Aer Lingus transatlantic business class (Dublin-US), Cathay Pacific business class to Asia, and JAL First Class to Tokyo. These routinely deliver 2-5p per Avios in value." }
        },
      ]
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqSchema);
    script.id = "calculator-faq-schema";
    document.head.appendChild(script);

    // Canonical
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = "https://milestopup.com/tools/avios-calculator";
    canonical.id = "canonical-link";
    document.head.appendChild(canonical);

    // Title
    document.title = "Avios Value Calculator — See How Much You Save | MilesTopUp";

    return () => {
      document.getElementById("calculator-faq-schema")?.remove();
      document.getElementById("canonical-link")?.remove();
    };
  }, []);

  // Reset cabin if route doesn't have first
  useEffect(() => {
    if (cabin === "first" && !route.first) {
      setCabin("business");
    }
  }, [selectedRoute]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Calculator className="w-4 h-4" />
                Free Tool
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Avios Value Calculator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See exactly how much you save by buying Avios through MilesTopUp instead of paying cash for flights. Select your route and cabin class below.
              </p>
            </div>

            {/* Calculator Card */}
            <div className="glass-card p-8 md:p-10 mb-8">
              
              {/* Route Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Select Route</label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(Number(e.target.value))}
                  className="w-full p-4 rounded-xl border border-border bg-background text-foreground text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  {routes.map((r, i) => (
                    <option key={i} value={i}>
                      {r.from} → {r.to}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cabin Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Cabin Class</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["economy", "business", "first"] as const).map((c) => {
                    const disabled = c === "first" && !hasFist;
                    return (
                      <button
                        key={c}
                        onClick={() => !disabled && setCabin(c)}
                        disabled={disabled}
                        className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${
                          cabin === c
                            ? "border-primary bg-primary/10 text-primary"
                            : disabled
                            ? "border-border/50 text-muted-foreground/40 cursor-not-allowed"
                            : "border-border hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <div className="text-sm opacity-70 mb-1">{c === "economy" ? "Economy" : c === "business" ? "Business" : "First"}</div>
                        <div className="text-lg font-bold">
                          {c === "first" && !hasFist ? "N/A" : `${(c === "first" ? route.first! : route[c]).avios.toLocaleString()}`}
                        </div>
                        <div className="text-xs opacity-60">Avios</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-border pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  
                  {/* Cash Price */}
                  <div className="text-center p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                    <div className="text-sm text-muted-foreground mb-1">Pay Cash</div>
                    <div className="text-3xl font-bold text-red-500">£{cashPrice.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground mt-1">Typical airline price</div>
                  </div>

                  {/* MilesTopUp Price */}
                  <div className="text-center p-6 rounded-xl bg-green-500/10 border-2 border-green-500/30 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      BEST VALUE
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">Buy via MilesTopUp</div>
                    <div className="text-3xl font-bold text-green-500">£{milestopupCost.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground mt-1">{aviosNeeded.toLocaleString()} Avios @ 1.5p each</div>
                  </div>

                  {/* Savings */}
                  <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-1">You Save</div>
                    <div className="text-3xl font-bold text-primary">
                      {savingsPercent > 0 ? (
                        <>
                          <TrendingDown className="w-6 h-6 inline mr-1" />
                          {savingsPercent}%
                        </>
                      ) : (
                        "—"
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {savings > 0 ? `£${savings.toLocaleString()} saved` : "Consider cash price"}
                    </div>
                  </div>
                </div>

                {/* Value Insight */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 mb-6">
                  <Plane className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Each Avios is worth <strong className="text-primary">{valuePerAvios}p</strong> on this route in {cabin === "first" ? "First" : cabin === "business" ? "Business" : "Economy"} Class.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Number(valuePerAvios) >= 1.5 
                        ? "🔥 Excellent value! This is one of the best uses of Avios."
                        : Number(valuePerAvios) >= 1.0 
                        ? "✅ Good value. You're getting a solid return on your Avios."
                        : "Consider upgrading to Business Class for better Avios value."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-10 text-white text-center shadow-lg mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Save on Your Next Flight?</h2>
              <p className="text-white/85 mb-6 max-w-xl mx-auto">
                Get {aviosNeeded.toLocaleString()} Avios delivered to your account in 24–48 hours. 
                That's {route.from} → {route.to} in {cabin === "first" ? "First" : cabin === "business" ? "Business" : "Economy"} Class for just £{milestopupCost.toLocaleString()}.
              </p>
              <Link
                to="/buy-avios"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
              >
                Get Your Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h2 className="font-display text-2xl font-bold text-center mb-8">How Buying Avios Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: "1", title: "Tell Us What You Need", desc: "Request a quote with the number of Avios you want. We'll reply with your personalized rate within minutes." },
                  { step: "2", title: "Secure Payment", desc: "Pay via bank transfer or card. Your payment is protected and we guarantee delivery." },
                  { step: "3", title: "Miles Delivered", desc: "We transfer Avios directly to your British Airways Executive Club account within 24–48 hours." },
                ].map((item) => (
                  <div key={item.step} className="glass-card p-6 text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16">
              <h2 className="font-display text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: "How much are Avios worth?", a: "Avios are typically worth between 0.5p and 2p each, depending on how you redeem them. Business and First Class redemptions offer the best value, often exceeding 1.5p per Avios. Use our calculator above to see the exact value for your preferred route." },
                  { q: "Is it cheaper to buy Avios or pay cash?", a: "For premium cabins (Business and First Class), buying Avios through MilesTopUp is almost always cheaper than paying cash. Savings of 40-70% are common on long-haul Business Class flights. Economy flights may have smaller margins." },
                  { q: "How much do Avios cost through MilesTopUp?", a: "Our rates start at approximately 1.5p per Avios — significantly less than British Airways' official sale price of 2-3p per Avios. Volume discounts are available for larger purchases." },
                  { q: "Is buying Avios from MilesTopUp safe?", a: "Yes. We use official credit card points transfer mechanisms built into loyalty programs. Your Executive Club account stays in your name and is never shared. We guarantee delivery or your money back." },
                ].map((item, i) => (
                  <details key={i} className="glass-card p-6 group cursor-pointer">
                    <summary className="font-semibold flex items-center justify-between list-none">
                      {item.q}
                      <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                    </summary>
                    <p className="text-muted-foreground mt-3 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { icon: CheckCircle, title: "Guaranteed Delivery", desc: "Miles arrive in 24-48 hours or your money back" },
                { icon: CheckCircle, title: "Best Rates", desc: "Up to 60% cheaper than airline sale prices" },
                { icon: CheckCircle, title: "Worldwide Service", desc: "Serving customers in 30+ countries" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <item.icon className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AviosCalculator;
