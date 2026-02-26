import { Banner } from '../components/Banner'
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Intro } from '../components/Intro'
import { About } from '../components/About';
import { Projects } from '../components/Projects';

// Register ScrollTrigger once at module level
gsap.registerPlugin(ScrollTrigger);

const BANNERS = [
  "1 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  "2 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  "3 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
];

const BANNER_CONTENT = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export function Index() {
  // bannerWrapperRef = the pinned outer element (stays in place while page scrolls)
  const bannerWrapperRef = useRef<HTMLDivElement>(null);
  // containerRef = the inner strip that slides horizontally
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = bannerWrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const bannerCount = BANNERS.length;

    const ctx = gsap.context(() => {
      // Total horizontal distance to travel = (n-1) panel widths
      const getScrollDistance = () => (bannerCount - 1) * window.innerWidth;

      gsap.to(container, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,           // pin the outer wrapper
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.5,
          pin: true,                  // wrapper is pinned; page scroll drives the tween
          anticipatePin: 1,
          invalidateOnRefresh: true,  // recalculate on resize
        },
      });
    }, mainRef); // scope to mainRef so other contexts aren't touched

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="index-page-wrapper">
      <Intro />
      <About />

      {/* Outer wrapper is the ScrollTrigger pin target */}
      <div ref={bannerWrapperRef} className="banner-scroll-wrapper">
        {/* Inner strip slides horizontally */}
        <div ref={containerRef} className="banner-scroll-container">
          {BANNERS.map((heading, i) => (
            <Banner key={i} heading={heading} content={BANNER_CONTENT} />
          ))}
        </div>
      </div>

      <Projects />
    </div>
  );
}