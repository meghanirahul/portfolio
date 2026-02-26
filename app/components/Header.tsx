import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

export function Header() {
  const lineRef = useRef<SVGLineElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const path = pathRef.current;

    if (!line || !path) return;

    const ctx = gsap.context(() => {
      const S_PATH = "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6";
      const ARROW_UP = "M7 14l5-6 5 6"; // ^

      const isScrolledInitial = typeof window !== "undefined" ? window.scrollY >= 80 : false;

      if (isScrolledInitial) {
        // Jump to end state
        gsap.set(line, { attr: { y1: 7, y2: 18 }, strokeDashoffset: 0 });
        gsap.set(path, { morphSVG: ARROW_UP, y: -4, strokeDashoffset: 0 });
      } else {
        // Set initial state
        gsap.set(line, { attr: { y1: 2, y2: 22 } });
        gsap.set(path, { attr: { d: S_PATH }, y: 0 });

        // Draw Animation
        try {
          const lineLen = line.getTotalLength();
          const pathLen = path.getTotalLength();
          gsap.set(line, { strokeDasharray: lineLen, strokeDashoffset: lineLen });
          gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: pathLen });

          gsap.to(line, { strokeDashoffset: 0, duration: 1.8, delay: 0.7, overwrite: true });
          gsap.to(path, { strokeDashoffset: 0, duration: 1.2, delay: 0.3, overwrite: true });
        } catch (e) {
          gsap.set([line, path], { strokeDashoffset: 0 });
        }
      }

      ScrollTrigger.create({
        start: 80,
        end: 999999,
        onEnter: () => {
          gsap.to(path, {
            duration: 0.6,
            ease: "power2.inOut",
            morphSVG: ARROW_UP,
            y: -4,
            strokeDashoffset: 0,
            overwrite: true,
          });
          gsap.to(line, {
            duration: 0.6,
            ease: "power2.inOut",
            attr: { y1: 7, y2: 18 },
            strokeDashoffset: 0,
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          gsap.to(path, {
            duration: 0.6,
            ease: "power2.inOut",
            morphSVG: S_PATH,
            y: 0,
            strokeDashoffset: 0,
            overwrite: true,
          });
          gsap.to(line, {
            duration: 0.6,
            ease: "power2.inOut",
            attr: { y1: 2, y2: 22 },
            strokeDashoffset: 0,
            overwrite: true,
          });
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="text-white p-4 shadow-md header">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="logondev">
          <div className="text-2xl font-bold flex items-center">
            <svg
              onClick={scrollToTop}
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "-5px" }}
            >
              <line ref={lineRef} x1="12" y1="2" x2="12" y2="22" />
              <path ref={pathRef} d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <Link to={"/"}>TORE Builder</Link>
          </div>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/contactus" className="hover:text-blue-200">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
