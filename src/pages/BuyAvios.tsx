import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { Plane, Shield, Clock, CheckCircle2 } from "lucide-react";

const BuyAvios = () => {
  const { toast } = useToast();
  const [miles, setMiles] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Buy British Airways Avios",
      description: "Purchase British Airways Avios at competitive rates. Fast delivery, secure transactions, guaranteed delivery within 24-48 hours.",
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
          message: `Request for ${miles} Avios\n\nAdditional details:\n${message}`,
        },
        "4WZLMejoOYRfMkK-s"
      );

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
    { miles: "25,000", route: "London → New York (Economy)", class: "Economy" },
    { miles: "50,000", route: "London → Dubai (Business)", class: "Business" },
    { miles: "100,000", route: "London → Sydney (Business)", class: "Business" },
    { miles: "200,000", route: "London → Sydney (First Class)", class: "First" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Buy British Airways Avios - Best Rates & Fast Delivery | MilesTopUp</title>
        <meta name="description" content="Buy British Airways Avios at competitive rates. Secure delivery within 24-48 hours. No bots, real transfers from verified credit card programs. Get your quote today." />
        <meta name="keywords" content="buy avios, british airways avios, buy ba avios, avios for sale, purchase avios" />
        <link rel="canonical" href="https://milestopup.com/buy-avios" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Buy British Airways Avios
            <span className="block text-primary mt-2">At the Best Rates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Top up your Avios account quickly and securely. Book that Business Class flight you've been dreaming about — without waiting years to earn enough points.
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
          <h2 className="text-3xl font-bold text-center mb-12">What Can You Book With Avios?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((example, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <Plane className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <p className="font-bold text-2xl text-primary mb-1">{example.miles}</p>
                    <p className="text-sm text-muted-foreground">Avios</p>
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
              Tell us how many Avios you need and we'll send you a price within a few hours. No obligation.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="miles" className="block text-sm font-medium mb-2">
                  How many Avios do you need?
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Buy Avios From Us?</h2>
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
                We transfer credit card points (like Amex Membership Rewards or Chase Ultimate Rewards) directly into airline miles using official transfer partners. Your Avios account stays in your name — we never access it.
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
              <h3 className="font-bold mb-2">What if I need miles urgently?</h3>
              <p className="text-muted-foreground">
                Rush delivery may be available for an additional fee. Mention your timeline when requesting a quote and we'll do our best to accommodate.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I buy Avios for someone else?</h3>
              <p className="text-muted-foreground">
                Yes, as long as you provide their correct British Airways Executive Club membership number and they consent to the transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuyAvios;
