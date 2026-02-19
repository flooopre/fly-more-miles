import { motion } from "framer-motion";

const TrustBadges = () => {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Topping Up Miles For Members Of
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* British Airways / Avios */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card px-6 py-4 flex items-center gap-3"
            >
              <span className="text-2xl">🇬🇧</span>
              <div className="text-left">
                <p className="font-semibold text-sm">British Airways</p>
                <p className="text-xs text-muted-foreground">Executive Club</p>
              </div>
            </motion.div>

            {/* Air France / KLM */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card px-6 py-4 flex items-center gap-3"
            >
              <span className="text-2xl">🇫🇷</span>
              <div className="text-left">
                <p className="font-semibold text-sm">Air France-KLM</p>
                <p className="text-xs text-muted-foreground">Flying Blue</p>
              </div>
            </motion.div>

            {/* Iberia */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card px-6 py-4 flex items-center gap-3"
            >
              <span className="text-2xl">🇪🇸</span>
              <div className="text-left">
                <p className="font-semibold text-sm">Iberia</p>
                <p className="text-xs text-muted-foreground">Iberia Plus</p>
              </div>
            </motion.div>

            {/* Aer Lingus */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card px-6 py-4 flex items-center gap-3"
            >
              <span className="text-2xl">🇮🇪</span>
              <div className="text-left">
                <p className="font-semibold text-sm">Aer Lingus</p>
                <p className="text-xs text-muted-foreground">AerClub</p>
              </div>
            </motion.div>
          </div>

          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            We work with all Avios and Flying Blue accounts worldwide. 
            Top up any account, regardless of where you're based.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
