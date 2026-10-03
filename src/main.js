import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const leftColumn = document.querySelector("#left-column");
const heroTitle = document.querySelector("#hero-title");
const heroTitleContainer = document.querySelector("#hero-title-container");
const header = document.querySelector("header");
const navlinks = document.querySelectorAll("#primary-navigation a");
const heroText = document.querySelector("#hero-text");
const clamp = gsap.utils.clamp(0, 1);


document.addEventListener("DOMContentLoaded", function () {
  ScrollTrigger.create({
  trigger: "#scroll-intro-section",
  start: "top bottom",
  end: "bottom bottom",
  scrub: 1,
  onUpdate: (self) => {
    const p = self.progress;
    const t = clamp((p - 0.6) * 3);

    header.style.backgroundColor = `rgba(255, 255, 255, ${t})`;
    heroTitle.style.filter = `invert(${t})`;
    navlinks.forEach((link) => (link.style.filter = `invert(${t})`));
    heroTitle.style.scale = `${1 - t * 0.4}`;
    heroTitle.style.transform = `translateY(${(0.2 - Math.min(p / 0.9, 1)) * 450}px)`;
    heroText.style.color = `rgba(0, 0, 0, ${t-0.8})`;
    console.log(`${(0.2 - Math.min(p / 0.9, 1)) * 450}`);
  }
});

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  const rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    if (isInViewport(row)) {
      const img = row.querySelector("img");
      if (row.querySelector(".left")) {
        gsap.to(img, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
      } else {
        gsap.to(img, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });

      }
    }
  });

  gsap.utils.toArray(".img-container.right img").forEach((img) => {
    gsap.to(img, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: img,
        start: "top 75%",
        end: "bottom 70%",
        scrub: true,
      },
    });
  });

  gsap.utils.toArray(".img-container.left img").forEach((img) => {
    gsap.to(img, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: img,
        start: "top 75%",
        end: "bottom 70%",
        scrub: true,
      },
    });
  });

  gsap.utils.toArray(".img-container p").forEach((text) => {
    gsap.from(text, {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
});