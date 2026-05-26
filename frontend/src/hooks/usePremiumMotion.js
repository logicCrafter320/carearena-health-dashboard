import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function usePremiumMotion(dependency) {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".motion-reveal, .premium-card, .panel, .metric-card, .sidebar a, .module-tabs a", {
          clearProps: "all"
        });
        return;
      }

      gsap.fromTo(
        ".motion-reveal",
        { autoAlpha: 0, y: 24, filter: "blur(8px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", stagger: 0.08 }
      );

      gsap.fromTo(
        ".sidebar a, .metric-card, .panel, .module-tabs a",
        { autoAlpha: 0, y: 18, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.72, ease: "power3.out", stagger: 0.045, delay: 0.08 }
      );

      gsap.utils.toArray(".scroll-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true
            }
          }
        );
      });

      gsap.to(".ambient-float", {
        y: "random(-18, 18)",
        x: "random(-12, 12)",
        rotation: "random(-5, 5)",
        duration: "random(5, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.35
      });

      gsap.to(".sync-card", {
        y: -12,
        rotation: -4,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".float-icon", {
        y: -14,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4
      });

      gsap.fromTo(
        ".adherence-ring",
        { "--value": "0%" },
        { "--value": (index, element) => element.dataset.value || "0%", duration: 1.1, ease: "power3.out" }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [dependency]);
}
