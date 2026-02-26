import { Banner } from '../components/Banner'
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Intro } from '../components/Intro'
import { About } from '../components/About';
import { Projects } from '../components/Projects';

// horizonal scroll effect for banners
gsap.registerPlugin(ScrollTrigger);

export function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const banners = container.querySelectorAll('.banner_index');
      const scrollDistance = (banners.length - 1) * window.innerWidth;

      gsap.to(container, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${(banners.length - 1) * window.innerHeight}`,
          scrub: 1.2,
          pin: true,
          markers: false,
          invalidateOnRefresh: true,
        }
      });
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="index-page-wrapper">
      <Intro />
      <About />
      <div ref={containerRef} className="banner-scroll-container">
        <Banner heading={"1 Lorem Ipsum is simply dummy text of the printing and typesetting industry."} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."} />
        <Banner heading={"2 Lorem Ipsum is simply dummy text of the printing and typesetting industry."} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."} />
        <Banner heading={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."} />
        <Banner heading={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."} />
        <Banner heading={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."} />
        <Banner heading={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."} />
      </div>
      <Projects />
    </div>
  );
}