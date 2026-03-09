import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import logisticsImg1 from "@/assets/logistics-hero-1.jpg";
import logisticsImg2 from "@/assets/logistics-hero-2.jpg";
import logisticsImg3 from "@/assets/logistics-hero-3.jpg";

const images = [
  { src: logisticsImg1, alt: "Express motorcycle delivery courier speeding through the city at night", label: "Express Delivery" },
  { src: logisticsImg2, alt: "Modern logistics warehouse with fleet vehicles and organized parcels", label: "Warehouse Operations" },
  { src: logisticsImg3, alt: "Doorstep package handover between courier and customer", label: "Doorstep Service" },
];

const ImageShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D rotate-in on scroll
      gsap.from(".showcase-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        rotateY: 45,
        rotateX: 10,
        opacity: 0,
        scale: 0.85,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        transformPerspective: 1000,
        transformOrigin: "center center",
      });

      // Continuous subtle float
      gsap.to(".showcase-card", {
        y: -8,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });

      // 3D tilt on hover
      const cards = document.querySelectorAll<HTMLElement>(".showcase-card");
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 25,
            rotateX: -y * 25,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 800,
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background" style={{ perspective: "1200px" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.label}
              className="showcase-card relative group overflow-hidden rounded-xl cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 md:h-72 object-cover transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-semibold text-foreground tracking-wide">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageShowcase;
