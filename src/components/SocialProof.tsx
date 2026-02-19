import { motion } from "framer-motion";
import { Users, Plane, Clock, Shield } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Happy Customers",
  },
  {
    icon: Plane,
    value: "12M+",
    label: "Miles Delivered",
  },
  {
    icon: Clock,
    value: "24-48h",
    label: "Average Delivery",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Secure & Legit",
  },
];

const SocialProof = () => {
  return (
    <section className="py-12 px-4 border-y border-border/50 bg-secondary/30">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="flex justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-display gold-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
