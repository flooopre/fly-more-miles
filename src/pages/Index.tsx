import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const faqSchemaData = [
  { q: "How does the miles top-up work?", a: "You tell us how many Avios or Flying Blue miles you need and we send you a personalised quote. Once you pay, we use credit card points transfers to add miles directly to your loyalty account. The whole process typically takes 24–48 hours." },
  { q: "Is this safe and legitimate?", a: "Yes. We use the official points transfer features built into credit card reward programs (like Amex Membership Rewards or Chase Ultimate Rewards) to convert points into airline miles. Your frequent flyer account stays in your name and is never shared or accessed by us." },
  { q: "How much does it cost?", a: "Pricing depends on the quantity and programme. The more miles you need, the better the rate. Request a free quote — there's no obligation, and we'll send you a personalised price within minutes." },
  { q: "How long does delivery take?", a: "Most orders are completed within 24–48 hours. Rush delivery may be available — just ask when requesting your quote." },
  { q: "Which countries do you serve?", a: "We serve customers worldwide. Whether you're in Europe, the US, Middle East, Asia, or anywhere else — as long as you have an Avios or Flying Blue account, we can top it up." },
  { q: "Is there a minimum or maximum order?", a: "We typically handle orders from 10,000 miles upward. For very large orders (500k+), please contact us directly for a custom quote." },
  { q: "Can I top up someone else's account?", a: "Yes, as long as you provide the correct membership number and the account holder's consent, we can top up any Avios or Flying Blue account." },
  { q: "What if the miles don't arrive?", a: "We guarantee delivery. If for any reason the miles aren't credited to your account within the agreed timeframe, we'll either resolve the issue or provide a full refund." },
];

const Index = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqSchemaData.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    script.id = "faq-schema";
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-schema");
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
