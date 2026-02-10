import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "How does the miles top-up work?",
    a: "You tell us how many Avios or Flying Blue miles you need and we send you a personalised quote. Once you pay, we use credit card points transfers to add miles directly to your loyalty account. The whole process typically takes 24–48 hours.",
  },
  {
    q: "Is this safe and legitimate?",
    a: "Yes. We use the official points transfer features built into credit card reward programs (like Amex Membership Rewards or Chase Ultimate Rewards) to convert points into airline miles. Your frequent flyer account stays in your name and is never shared or accessed by us — we only need your membership number to initiate the transfer.",
  },
  {
    q: "How much does it cost per mile?",
    a: "Pricing depends on the quantity. For smaller orders, rates start around 1.5¢ per mile. For larger orders (100k+), rates can go as low as 1.34¢ per mile. Request a quote for your exact price — it's free and there's no obligation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer (SEPA/SWIFT), cryptocurrency (BTC, ETH, USDT), and PayPal for maximum flexibility.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders are completed within 24–48 hours. Rush delivery may be available — just ask when requesting your quote.",
  },
  {
    q: "Which countries do you serve?",
    a: "We serve customers worldwide. Whether you're in Europe, the US, Middle East, Asia, or anywhere else — as long as you have an Avios or Flying Blue account, we can top it up.",
  },
  {
    q: "Is there a minimum or maximum order?",
    a: "We typically handle orders from 10,000 miles upward. For very large orders (500k+), please contact us directly for a custom quote.",
  },
  {
    q: "Can I top up someone else's account?",
    a: "Yes, as long as you provide the correct membership number and the account holder's consent, we can top up any Avios or Flying Blue account.",
  },
  {
    q: "What if the miles don't arrive?",
    a: "We guarantee delivery. If for any reason the miles aren't credited to your account within the agreed timeframe, we'll either resolve the issue or provide a full refund. We'll keep you updated throughout the process.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 px-4" id="faq">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-sm text-primary font-medium uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Frequently Asked{" "}
            <span className="gold-text">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 border-glass-border"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
