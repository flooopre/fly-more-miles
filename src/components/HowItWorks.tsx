import { motion } from "framer-motion";
import { FileText, MessageSquare, CreditCard } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Fill Out the Form",
    description: "Tell us how many miles you need and which program—Avios or Flying Blue.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Receive Your Quote",
    description: "We'll send you a personalized offer within minutes. No hidden fees, transparent pricing.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Pay & Get Your Miles",
    description: "Pay via bank transfer, crypto, or PayPal. Miles land in your account within 48 hours.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4" id="how-it-works">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-sm text-primary font-medium uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Three Simple Steps to{" "}
            <span className="gold-text">More Miles</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From request to delivery in under 48 hours. No complicated process, no middlemen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card p-8 space-y-4 relative group hover:border-primary/30 transition-colors"
            >
              <div className="absolute top-6 right-6 text-5xl font-bold font-display text-border/50">
                {step.step}
              </div>
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                <step.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold font-display">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <span>Accepted Payments:</span>
          <div className="flex gap-4">
            <span className="px-4 py-2 glass-card text-foreground">🏦 Bank Transfer</span>
            <span className="px-4 py-2 glass-card text-foreground">₿ Crypto</span>
            <span className="px-4 py-2 glass-card text-foreground">💳 PayPal</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
