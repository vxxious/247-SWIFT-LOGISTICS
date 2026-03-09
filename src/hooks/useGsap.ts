import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapScrollFade = (selector: string, stagger = 0.15) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        scrollTrigger: {
          trigger: selector,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, [selector, stagger]);
};

export const useGsap3DImages = (selector: string) => {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(selector);

    const handlers = new Map<HTMLElement, { move: (e: MouseEvent) => void; leave: () => void }>();

    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: x * 20,
          rotateX: -y * 20,
          scale: 1.04,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 800,
        });
      };

      const leave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      };

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.set(card, { move, leave });
    });

    return () => {
      handlers.forEach(({ move, leave }, card) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, [selector]);
};

export const useBouncingText = (selector: string) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = document.querySelector(selector);
      if (!el) return;

      // Split text into spans
      const text = el.textContent || "";
      el.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? `<span class="inline-block">&nbsp;</span>`
            : `<span class="inline-block">${char}</span>`
        )
        .join("");

      gsap.from(el.querySelectorAll("span"), {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: -40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "bounce.out",
      });
    });
    return () => ctx.revert();
  }, [selector]);
};

export const useShuffleText = (selector: string) => {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const original = el.textContent || "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let frame = 0;

    const scramble = () => {
      const progress = frame / 20;
      const revealed = Math.floor(progress * original.length);

      el.textContent = original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return original[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      frame++;
      if (frame <= 20) requestAnimationFrame(scramble);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = 0;
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [selector]);
};

export { gsap, ScrollTrigger };
