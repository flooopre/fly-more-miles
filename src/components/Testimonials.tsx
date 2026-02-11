import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const testimonials = [
  {
    name: "Tom H.",
    role: "Manchester, UK",
    text: "Needed avios for a last minute trip to New York, was like 35k short. Got quote same day and miles where in my account next morning. Defintely using again for our honeymoon trip.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Laura B.",
    role: "Amsterdam, Netherlands",
    text: "I use Flying Blue alot and always end up short before the promo rewards expire lol. This is my 2nd time topping up here, price was better then buying from Air France direct. Quick and easy.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Raj P.",
    role: "Birmingham, UK",
    text: "Was skeptical at first not gonna lie. But a friend recommended it so I tried with a small order 15k avios. Worked fine, showed up in about 20hrs. Did a bigger order after that no issues.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Katrin W.",
    role: "Vienna, Austria",
    text: "Have used them twice now for Flying Blue miles. Communication is very fast, they reply within the hour usually. The rate could be a little bit cheaper for bigger orders but still fair I think.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Chris D.",
    role: "Edinburgh, UK",
    text: "Topped up 80k Avios for Qatar business class to Bangkok. Was way cheaper then buying through BA website. Miles came through in like 36 hours which was fine for me.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Amélie F.",
    role: "Brussels, Belgium",
    text: "My husband found this site and we used it to top up flying blue for our family holiday. 4 tickets to Martinique! The process was simple, just fill the form and they send you a quote. Would recommend.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Dave M.",
    role: "Bristol, UK",
    text: "Decent service. Got 25k avios for a short haul trip. Only reason for 4 stars is I had to wait almost 2 days for delivery, other then that all good and will use again probably.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Nina K.",
    role: "Munich, Germany",
    text: "Super easy process! I was missing some Avios for an Aer Lingus flight to New York from Dublin. Filled in the form, got a price, paid and done. Miles arrived overnight. Very happy with the service 😊",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
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
