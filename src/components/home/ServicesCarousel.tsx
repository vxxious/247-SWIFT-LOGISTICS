import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/data/services";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "@/hooks/useGsap";

const ServicesCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
      });
      gsap.from(".service-slide", {
        scrollTrigger: { trigger: ".service-slide", start: "top 85%" },
        opacity: 0, x: 60, duration: 0.8, stagger: 0.1, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="services-header flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Our Services</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              From same-day dispatch to full-scale freight coordination.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={scrollPrev} className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {services.map((service) => (
              <div key={service.id} className="service-slide flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                <div className="glass-card p-6 h-full flex flex-col justify-between gap-4 hover:border-primary/30 transition-colors duration-300">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{service.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold text-sm">{service.price}</span>
                    <Link to={`/book?service=${service.id}`} className="text-sm text-primary hover:text-[hsl(var(--primary-hover))] flex items-center gap-1 font-medium transition-colors">
                      Request Pickup <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
          <button onClick={scrollPrev} className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={scrollNext} className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline text-sm">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
