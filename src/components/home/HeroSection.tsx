import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { BUSINESS } from "@/config/business";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import logisticsImg1 from "@/assets/logistics-hero-1.jpg";
import logisticsImg2 from "@/assets/logistics-hero-2.jpg";
import logisticsImg3 from "@/assets/logistics-hero-3.jpg";

const stats = [
  { value: 36, suffix: "+", label: "States Covered" },
  { value: 24, suffix: "/7", label: "Always On" },
  { value: 10, suffix: "K+", label: "Deliveries" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("You're subscribed! We'll keep you updated.");
    setEmail("");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(".hero-left", {
            opacity: 1 - self.progress * 1.2,
            y: self.progress * 60,
          });
          gsap.set(".hero-right", {
            opacity: 1 - self.progress,
            y: self.progress * 40,
            rotateY: self.progress * -15,
          });
        },
      });

      // Left side entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-overline", { opacity: 0, y: -20, duration: 0.5 })
        .from(".hero-line", { opacity: 0, y: 60, duration: 0.9, stagger: 0.12 }, "-=0.2")
        .from(".hero-sub", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
        .from(".hero-cta-group", { opacity: 0, y: 30, duration: 0.6 }, "-=0.3")
        .from(".hero-stat", { opacity: 0, y: 20, scale: 0.9, duration: 0.5, stagger: 0.08 }, "-=0.3");

      // Counter animations
      stats.forEach((s) => {
        const target = { val: 0 };
        const el = document.querySelector(`.counter-${s.value}`);
        if (el) {
          gsap.to(target, {
            val: s.value,
            duration: 2,
            delay: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(target.val).toString();
            },
          });
        }
      });

      // Right side image stack entrance
      const tl2 = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });
      tl2.from(".hero-img-main", {
        opacity: 0,
        scale: 0.8,
        rotateY: -30,
        duration: 1.2,
        transformPerspective: 1200,
      })
        .from(
          ".hero-img-float",
          {
            opacity: 0,
            scale: 0.7,
            y: 60,
            rotateX: 20,
            duration: 0.9,
            stagger: 0.15,
            transformPerspective: 800,
          },
          "-=0.6"
        );

      // Continuous float on secondary images
      gsap.to(".hero-img-float-1", {
        y: -12,
        rotate: -1,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-img-float-2", {
        y: 10,
        rotate: 1.5,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      // Shuffle effect on tagline
      const tagline = document.querySelector(".hero-shuffle");
      if (tagline) {
        const original = "Powered by Trust.";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let frame = 0;
        const scramble = () => {
          const progress = frame / 28;
          const revealed = Math.floor(progress * original.length);
          tagline.textContent = original
            .split("")
            .map((char, i) => {
              if (char === " " || char === ".") return char;
              if (i < revealed) return original[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
          frame++;
          if (frame <= 28) requestAnimationFrame(scramble);
        };
        gsap.delayedCall(1.1, () => {
          frame = 0;
          scramble();
        });
      }

      // Glow pulse
      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.6,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // 3D tilt on main image — mouse + touch
      const mainImg = document.querySelector<HTMLElement>(".hero-img-main");
      if (mainImg) {
        const applyTilt = (clientX: number, clientY: number) => {
          const rect = mainImg.getBoundingClientRect();
          const x = (clientX - rect.left) / rect.width - 0.5;
          const y = (clientY - rect.top) / rect.height - 0.5;
          gsap.to(mainImg, {
            rotateY: x * 18,
            rotateX: -y * 12,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        };
        const resetTilt = () => {
          gsap.to(mainImg, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          });
        };

        mainImg.addEventListener("mousemove", (e) => applyTilt(e.clientX, e.clientY));
        mainImg.addEventListener("mouseleave", resetTilt);
        mainImg.addEventListener("touchmove", (e) => {
          const t = e.touches[0];
          applyTilt(t.clientX, t.clientY);
        }, { passive: true });
        mainImg.addEventListener("touchend", resetTilt);
      }

      // Mobile scroll-based depth: shift floating images on scroll
      const mm = gsap.matchMedia();
      mm.add("(max-width: 1023px)", () => {
        gsap.to(".hero-img-float-1", {
          y: -20,
          x: 8,
          rotate: -2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        gsap.to(".hero-img-float-2", {
          y: 15,
          x: -6,
          rotate: 3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        gsap.to(".hero-img-main", {
          y: -10,
          scale: 0.97,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-glow absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-primary/8 blur-[120px]" />
        <div className="hero-glow absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[100px]" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="section-padding w-full relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="hero-left">
            <div className="hero-overline inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">
                {BUSINESS.name}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="hero-line block">Driven by</span>
              <span className="hero-line block">
                <span className="relative inline-block">
                  Speed
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full" />
                </span>
                ,
              </span>
              <span className="hero-line hero-shuffle block text-primary mt-1">
                Powered by Trust.
              </span>
            </h1>

            <p className="hero-sub mt-6 text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed">
              {BUSINESS.description}
            </p>

            <div className="hero-cta-group mt-8 space-y-4">
              <div className="flex flex-wrap gap-3">
                <Link to="/book" className="btn-primary text-sm">
                  Book a Delivery <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/services" className="btn-outline text-sm">
                  Our Services
                </Link>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-0 max-w-sm"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email for updates"
                    className="w-full bg-card/60 backdrop-blur border border-border rounded-l-lg py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    maxLength={255}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-[hsl(var(--primary-hover))] font-semibold py-2.5 px-5 rounded-r-lg text-sm transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Stats strip */}
            <div className="mt-10 flex gap-8">
              {stats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <span className="block font-display text-2xl md:text-3xl font-bold text-foreground">
                    <span className={`counter-${s.value}`}>0</span>{s.suffix}
                  </span>
                  <span className="text-xs text-muted-foreground tracking-wide uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image composition */}
          <div
            className="hero-right relative flex items-center justify-center mt-10 lg:mt-0"
            style={{ perspective: "1200px" }}
          >
            {/* Main image */}
            <div
              className="hero-img-main relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/30"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={logisticsImg1}
                alt="Express motorcycle delivery courier in orange"
                className="w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[440px] lg:w-[420px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating accent image 1 */}
            <div className="hero-img-float hero-img-float-1 absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-8 lg:-left-10 rounded-xl overflow-hidden shadow-xl border border-border/20 rotate-[-3deg]">
              <img
                src={logisticsImg2}
                alt="Doorstep delivery"
                className="w-28 h-20 sm:w-36 sm:h-24 lg:w-40 lg:h-28 object-cover"
              />
            </div>

            {/* Floating accent image 2 */}
            <div className="hero-img-float hero-img-float-2 absolute -top-3 -right-3 sm:-top-4 sm:-right-5 lg:-right-6 rounded-xl overflow-hidden shadow-xl border border-border/20 rotate-[2deg]">
              <img
                src={logisticsImg3}
                alt="Warehouse operations"
                className="w-24 h-16 sm:w-32 sm:h-20 lg:w-36 lg:h-24 object-cover"
              />
            </div>

            {/* Decorative ring */}
            <div className="absolute -z-10 w-[110%] h-[110%] rounded-full border border-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute -z-10 w-[130%] h-[130%] rounded-full border border-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
