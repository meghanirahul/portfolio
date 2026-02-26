import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Animate Heading
            gsap.fromTo(headingRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: 1,
                    }
                }
            );

            // Animate Text
            gsap.fromTo(textRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        end: "bottom 80%",
                        scrub: 1,
                    }
                }
            );
        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-10 relative z-10">
            <div className="max-w-4xl text-center">
                <h2 ref={headingRef} className="text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-200 to-amber-500 bg-clip-text text-transparent">
                    Bridging E-commerce & Intelligence
                </h2>
                <p ref={textRef} className="text-xl leading-relaxed text-gray-300 text-left">
                    I specialize in pushing the boundaries of what's possible on Shopify. With a deep focus on
                    <span className="text-white font-semibold"> GraphQL and Custom App Development</span>, I build
                    complex features that traditional themes can't handle—from advanced quiz funnels and
                    bespoke wishlist systems to intricate bundle logic.
                    <br /><br />
                    My expertise lies in integrating <span className="text-white font-semibold">AI-driven personalization</span>
                    into the shopping journey, powering intelligent recommendations and search experiences for
                    major global brands. Whether it's crafting a custom cart drawer or architecting a headless
                    solution, I deliver scalable, conversion-focused e-commerce technology.
                </p>
            </div>
        </section>
    );
}
