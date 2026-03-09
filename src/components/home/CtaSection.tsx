import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { BUSINESS } from "@/config/business";
import { gsap } from "@/hooks/useGsap";
import { useShuffleText } from "@/hooks/useGsap";

const CtaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useShuffleText(".cta-heading");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-card">
      <div className="cta-content max-w-3xl mx-auto text-center">
        <h2 className="cta-heading font-display text-2xl md:text-3xl font-bold mb-4">
          Ready to send a package?
        </h2>
        <p className="text-muted-foreground mb-8">
          Book a delivery in minutes or reach us on WhatsApp for instant support.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/book" className="btn-primary text-sm">
            Book Delivery <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={BUSINESS.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
