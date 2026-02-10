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
    a: "You tell us how many Avios or Flying Blue miles you need, we give you a quote, and once paid, we transfer the miles directly into your loyalty account within 48 hours.",
  },
  {
    q: "Is this safe and legitimate?",
    a: "Yes. We use official transfer methods supported by the loyalty programs. Your account stays secure and in your name at all times.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer (SEPA/SWIFT), cryptocurrency (BTC, ETH, USDT), and PayPal for maximum flexibility.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders are completed within 24–48 hours. Rush delivery may be available—just ask when requesting your quote.",
  },
  {
    q: "Is there a minimum or maximum order?",
    a: "We typically handle orders from 10,000 miles upward. For very large orders (500k+), please contact us directly for a custom quote.",
  },
  {
    q: "Can I top up someone else's account?",
    a: "Yes, as long as you provide the correct account details and the account holder's consent, we can top up any Avios or Flying Blue account.",
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
