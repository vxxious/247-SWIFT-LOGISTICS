import { useEffect, useRef, useState } from "react";
import { gsap } from "@/hooks/useGsap";
import { Star, Quote, Send, MessageSquarePlus } from "lucide-react";
import { BUSINESS } from "@/config/business";
import { toast } from "sonner";

const testimonials = [
  {
    name: "Adebayo Ogunlesi",
    role: "E-commerce Owner",
    text: "247Swift has been a game changer for my online store. Deliveries arrive on time, and my customers are always happy. Highly recommended!",
    rating: 5,
  },
  {
    name: "Chidinma Eze",
    role: "Office Manager",
    text: "We relocated our entire office with zero stress. The team was professional, punctual, and handled everything with care.",
    rating: 5,
  },
  {
    name: "Musa Ibrahim",
    role: "Freight Coordinator",
    text: "Their interstate logistics service is reliable and well-priced. I trust them with bulk shipments across the country every week.",
    rating: 5,
  },
  {
    name: "Folake Adeyemi",
    role: "Small Business Owner",
    text: "Fast, affordable, and dependable. I use their dispatch service daily for my bakery deliveries and have never been disappointed.",
    rating: 4,
  },
  {
    name: "Emeka Nwosu",
    role: "Restaurant Owner",
    text: "Our food delivery partnership with 247Swift has boosted customer satisfaction. Riders are always on time and handle orders carefully.",
    rating: 5,
  },
  {
    name: "Aisha Bello",
    role: "Online Retailer",
    text: "I switched from another courier and the difference is night and day. Faster delivery, better communication, and no missing packages.",
    rating: 5,
  },
  {
    name: "Tunde Bakare",
    role: "Construction Manager",
    text: "We use their goods transportation service for moving building materials. Reliable trucks, fair pricing, and they always deliver on schedule.",
    rating: 4,
  },
  {
    name: "Ngozi Okafor",
    role: "Event Planner",
    text: "They moved all our event equipment across states without a scratch. Impressive coordination and the team was very responsive throughout.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", text: "", rating: 5 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: { trigger: ".testimonial-card", start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const role = formData.role.trim();
    const text = formData.text.trim();

    if (!name || name.length > 100) {
      toast.error("Please enter a valid name (max 100 characters)");
      return;
    }
    if (!text || text.length > 500) {
      toast.error("Please enter your testimonial (max 500 characters)");
      return;
    }
    if (role.length > 100) {
      toast.error("Role must be less than 100 characters");
      return;
    }

    const message = `New Testimonial Submission:\n\nName: ${name}\nRole: ${role || "N/A"}\nRating: ${"⭐".repeat(formData.rating)}\n\n"${text}"`;
    const whatsappUrl = `${BUSINESS.whatsappLink}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast.success("Redirecting to WhatsApp to submit your testimonial!");
    setFormData({ name: "", role: "", text: "", rating: 5 });
    setShowForm(false);
  };

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-3">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Trusted by businesses and individuals across Nigeria for fast, reliable delivery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card glass-card p-6 flex flex-col justify-between hover:border-primary/40 transition-colors duration-300"
            >
              <div>
                <Quote className="w-6 h-6 text-primary/40 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? "text-primary fill-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-display font-semibold text-foreground text-sm">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Submit testimonial */}
        <div className="mt-12 text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="btn-outline text-sm"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Share Your Experience
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass-card max-w-lg mx-auto p-6 text-left space-y-4 animate-fade-in"
            >
              <h3 className="font-display font-semibold text-foreground text-lg">
                Share Your Experience
              </h3>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Adebayo Ogunlesi"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Your Role (optional)
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Business Owner"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          star <= formData.rating
                            ? "text-primary fill-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Your Testimonial *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your experience with 247Swift..."
                  rows={4}
                  maxLength={500}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {formData.text.length}/500
                </p>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary text-sm flex-1">
                  <Send className="w-4 h-4" />
                  Submit via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
