import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "James K.",
    role: "Business Traveler",
    text: "Needed 40k Avios for a last-minute BA redemption. Had them in my account within 24 hours. Absolutely seamless.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    role: "Frequent Flyer",
    text: "I've used this service three times now for Flying Blue top-ups. Fair prices, fast delivery, zero issues. Highly recommend.",
    rating: 5,
  },
  {
    name: "Daniel R.",
    role: "Points Enthusiast",
    text: "Paid via crypto, which was a huge plus for me. Miles arrived next day. Will definitely use again for my next trip.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-sm text-primary font-medium uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Trusted by{" "}
            <span className="gold-text">Frequent Flyers</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 space-y-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed">"{t.text}"</p>
              <div className="pt-2 border-t border-border">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
