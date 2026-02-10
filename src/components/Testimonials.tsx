import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "James K.",
    role: "Business Traveler",
    text: "Needed 40k Avios for a last-minute BA redemption. Had them in my account within 24 hours. Absolutely seamless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sophie M.",
    role: "Frequent Flyer",
    text: "I've used this service three times now for Flying Blue top-ups. Fair prices, fast delivery, zero issues. Highly recommend.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Daniel R.",
    role: "Points Enthusiast",
    text: "Paid via crypto, which was a huge plus for me. Miles arrived next day. Will definitely use again for my next trip.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Elena V.",
    role: "Award Travel Hacker",
    text: "Topped up 60k Flying Blue miles for a business class redemption to Dubai. The whole process took less than 36 hours. Incredible service.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Marcus T.",
    role: "Executive Traveler",
    text: "Smooth bank transfer, great communication throughout. Got my Avios topped up just in time for a peak season booking. Lifesaver!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Aisha N.",
    role: "Family Traveler",
    text: "Booked miles for a family of four thanks to this service. PayPal payment was super convenient. Will be back before our next holiday!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
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
              <div className="pt-2 border-t border-border flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={t.avatar} alt={t.name} />
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">{t.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
