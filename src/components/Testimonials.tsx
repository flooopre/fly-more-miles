import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const testimonials = [
  {
    name: "James K.",
    role: "London, UK",
    text: "Was 40k Avios short for a BA redemption to Tokyo. Got a quote within an hour, miles showed up next day. Honestly didn't expect it to be that easy.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sophie M.",
    role: "Paris, France",
    text: "Third time using them for Flying Blue top-ups. Price is way better than what AF charges directly. Only thing — wish they had an instant quote calculator on the site.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Daniel R.",
    role: "Berlin, Germany",
    text: "Paid with crypto which was a big plus. Miles landed in about 30 hours. Straightforward, no BS. Would use again.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Elena V.",
    role: "Milan, Italy",
    text: "Needed 60k Flying Blue for business class to Dubai. Was a bit nervous at first tbh, but the communication was great and everything went smooth. Really happy with it.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Marcus T.",
    role: "Zurich, Switzerland",
    text: "Bank transfer was easy, got my Avios topped up right before peak season. Saved a good chunk compared to buying directly from BA.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Priya S.",
    role: "Dubai, UAE",
    text: "Used them for a 100k Avios top-up. Good rate for the volume. Delivery took the full 48 hours though, not next-day like some others here. Still solid overall.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
  },
];

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 3,
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-8 space-y-4 min-w-0 flex-[0_0_calc(33.333%-1.34rem)] max-md:flex-[0_0_100%]"
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

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="glass-card p-3 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={scrollNext}
              className="glass-card p-3 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
