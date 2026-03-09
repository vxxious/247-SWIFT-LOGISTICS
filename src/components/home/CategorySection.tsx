import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight, PackageCheck, Truck, Warehouse } from "lucide-react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";

const categoryMeta = [
  { name: "Delivery Services", icon: PackageCheck, desc: "Same-day dispatch, interstate & business deliveries" },
  { name: "Moving & Relocation", icon: Truck, desc: "Home, office moves & heavy goods transport" },
  { name: "Logistics Solutions", icon: Warehouse, desc: "Warehousing, freight & supply-chain support" },
];

const CategorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cat-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
      });
      gsap.from(".cat-subtitle", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        opacity: 0, y: 20, duration: 0.6, delay: 0.15, ease: "power3.out",
      });
      gsap.from(".cat-card", {
        scrollTrigger: { trigger: ".cat-card", start: "top 85%" },
        opacity: 0, y: 40, scale: 0.95, duration: 0.7, stagger: 0.12, ease: "power3.out",
      });

      // Hover lift effect
      const cards = document.querySelectorAll<HTMLElement>(".cat-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.03, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <h2 className="cat-title font-display text-2xl md:text-3xl font-bold text-center mb-4">
          Browse by Category
        </h2>
        <p className="cat-subtitle text-muted-foreground text-center max-w-lg mx-auto mb-12">
          Find the right service for your needs
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categoryMeta.map((cat) => (
            <Link
              key={cat.name}
              to={`/services?category=${encodeURIComponent(cat.name)}`}
              className="cat-card glass-card p-8 flex flex-col items-center text-center gap-4 group hover:border-primary/40 transition-colors duration-300 h-full"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <cat.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{cat.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              <span className="text-xs text-primary font-medium flex items-center gap-1 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
