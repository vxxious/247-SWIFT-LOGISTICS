import { useEffect, useRef } from "react";
import { Zap, ShieldCheck, Globe, LocateFixed } from "lucide-react";
import { gsap } from "@/hooks/useGsap";
import { useBouncingText } from "@/hooks/useGsap";

const trustPoints = [
  { icon: Zap, title: "Fast Turnaround", desc: "Same-day and express delivery options" },
  { icon: ShieldCheck, title: "Secure Handling", desc: "Your packages are safe with trained riders" },
  { icon: Globe, title: "Nationwide Reach", desc: "Coverage across all 36 states" },
  { icon: LocateFixed, title: "Live Updates", desc: "Stay informed with delivery status notifications" },
];

const TrustPoints = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useBouncingText(".trust-heading");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-card", {
        scrollTrigger: { trigger: ".trust-card", start: "top 85%" },
        opacity: 0,
        y: 50,
        rotateX: 15,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        transformPerspective: 600,
      });

      // Icon pulse on hover
      const cards = document.querySelectorAll<HTMLElement>(".trust-card");
      cards.forEach((card) => {
        const icon = card.querySelector(".trust-icon");
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
          if (icon) gsap.to(icon, { scale: 1.3, rotate: 10, duration: 0.3, ease: "back.out(2)" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
          if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="trust-heading font-display text-2xl md:text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="trust-card glass-card p-6 text-center cursor-pointer hover:border-primary/40 transition-colors duration-300"
            >
              <point.icon className="trust-icon w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display font-semibold text-foreground">{point.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustPoints;
