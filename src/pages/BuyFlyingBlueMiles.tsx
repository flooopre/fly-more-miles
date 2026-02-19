import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { Plane, Shield, Clock, CheckCircle2 } from "lucide-react";

const BuyFlyingBlueMiles = () => {
  const { toast } = useToast();
  const [miles, setMiles] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Buy Flying Blue Miles - Best Rates & Fast Delivery | MilesTopUp";
    
    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Buy Air France KLM Flying Blue miles at competitive rates. Secure delivery within 24-48 hours. Get your quote today.");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://milestopup.com/buy-flying-blue-miles";

    // Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Buy Air France KLM Flying Blue Miles",
      description: "Purchase Flying Blue miles at competitive rates. Fast delivery, secure transactions, guaranteed delivery within 24-48 hours.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "200",
        availability: "https://schema.org/InStock"
      }
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    script.id = "product-schema";
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("product-schema");
      if (el) el.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_zyc1jrc",
        "template_vui30ot",
        {
          from_name: email,
          from_email: email,
          message: `Request for ${miles} Flying Blue Miles\n\nAdditional details:\n${message}`,
        },
        "4WZLMejoOYRfMkK-s"
      );

      // Track successful form submission in GA4
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'form_submit', {
          form_id: 'buy_flying_blue_form',
          form_name: 'Buy Flying Blue Quote',
          miles_program: 'flying_blue',
          miles_amount: miles
        });
      }

      toast({
        title: "Quote request sent!",
        description: "We'll get back to you within a few hours with your personalized quote.",
      });

      setMiles("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at hello@milestopup.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const examples = [
    { miles: "22,000", route: "Paris → New York (Economy)", class: "Economy" },
    { miles: "53,000", route: "Amsterdam → Tokyo (Business)", class: "Business" },
    { miles: "95,000", route: "Paris → Bangkok (Business)", class: "Business" },
    { miles: "180,000", route: "Paris → Los Angeles (La Première)", class: "First" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Buy Flying Blue Miles
            <span className="block text-primary mt-2">At the Best Rates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Top up your Flying Blue account quickly and securely. Book Air France La Première or KLM Business Class without waiting years to earn enough miles.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">24-48h Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Guaranteed Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Examples */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Can You Book With Flying Blue Miles?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((example, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <Plane className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <p className="font-bold text-2xl text-primary mb-1">{example.miles}</p>
                    <p className="text-sm text-muted-foreground">Miles</p>
                  </div>
                </div>
                <p className="font-medium mb-2">{example.route}</p>
                <p className="text-sm text-muted-foreground">{example.class} Class</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Your Personalized Quote</h2>
            <p className="text-muted-foreground">
              Tell us how many Flying Blue miles you need and we'll send you a price within a few hours. No obligation.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="miles" className="block text-sm font-medium mb-2">
                  How many Flying Blue miles do you need?
                </label>
                <Input
                  id="miles"
                  type="text"
                  placeholder="e.g. 50,000"
                  value={miles}
                  onChange={(e) => setMiles(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Additional details (optional)
                </label>
                <Textarea
                  id="message"
                  placeholder="e.g. When do you need the miles? Any specific questions?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Get Your Free Quote"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We typically respond within 2-4 hours. Your information is kept confidential.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Buy Flying Blue Miles From Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">100% Legitimate</h3>
              <p className="text-sm text-muted-foreground">
                We use official credit card points transfers. No bots, no hacks, no risk to your account.
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Most orders complete within 24-48 hours. Rush delivery available on request.
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Money-Back Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                If the miles don't arrive as promised, we'll refund you in full. Zero risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">How does it work?</h3>
              <p className="text-muted-foreground">
                We transfer credit card points (like Amex Membership Rewards, Chase Ultimate Rewards, or Citi ThankYou) directly into Flying Blue miles using official transfer partners. Your Flying Blue account stays in your name — we never access it.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Is this legal and safe?</h3>
              <p className="text-muted-foreground">
                Yes. We use the official points transfer features built into credit card reward programs. It's the same method frequent flyers use themselves — we just do it at scale with better rates.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">How much does it cost?</h3>
              <p className="text-muted-foreground">
                Pricing depends on quantity and market conditions. Larger orders get better rates. Request a free quote above — we'll send you a personalized price with no obligation.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Why buy Flying Blue instead of Avios?</h3>
              <p className="text-muted-foreground">
                Flying Blue often offers better value on long-haul routes, especially to Asia and South America. Their Promo Rewards feature can save you up to 50% on award flights each month. Plus, you can access SkyTeam partners like Delta, Korean Air, and Virgin Atlantic.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">What if I need miles urgently?</h3>
              <p className="text-muted-foreground">
                Rush delivery may be available for an additional fee. Mention your timeline when requesting a quote and we'll do our best to accommodate.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I buy Flying Blue miles for someone else?</h3>
              <p className="text-muted-foreground">
                Yes, as long as you provide their correct Flying Blue membership number and they consent to the transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuyFlyingBlueMiles;
