import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Guess",
        category: "Enterprise Brand",
        description: "AI-powered collection carousels, custom search, and advanced product bundles.",
        link: "https://guess.com.au/",
        color: "from-blue-600 to-indigo-400"
    },
    {
        title: "Miss Me",
        category: "Enterprise Brand",
        description: "Specialized Shopify features and collection discovery using AI app.",
        link: "https://missme.com/",
        color: "from-purple-600 to-indigo-400"
    },
    {
        title: "NY & Company",
        category: "Enterprise Brand",
        description: "Custom PDP carousels and intelligent cart drawer implementation.",
        link: "https://nyandcompany.com/",
        color: "from-blue-600 to-cyan-400"
    },
    {
        title: "Bombshell Sportswear",
        category: "Enterprise Brand",
        description: "AI app integration for real-time product recommendations and search.",
        link: "https://www.bombshellsportswear.com/",
        color: "from-pink-600 to-rose-400"
    },
    {
        title: "Betsy & Adam",
        category: "Enterprise Brand",
        description: "Product bundles and recommendation logic powered by custom AI app.",
        link: "https://www.betsyandadam.com/",
        color: "from-teal-600 to-emerald-400"
    },
    {
        title: "Rag & Bone",
        category: "Enterprise Brand",
        description: "Headless features and custom GraphQL functionality for high-scale retail.",
        link: "https://rag-bone.com.au/",
        color: "from-gray-700 to-slate-400"
    },
    {
        title: "Honest Wolf",
        category: "Custom Store",
        description: "Bespoke e-commerce design with custom liquid functionalities.",
        link: "https://www.honestwolf.co.nz/",
        color: "from-zinc-800 to-zinc-600"
    },
    {
        title: "Faotivo",
        category: "Custom Store",
        description: "Full store development with custom features and performance optimization.",
        link: "https://faotivo.com/",
        color: "from-indigo-600 to-violet-400"
    },
    {
        title: "Spira-Vit",
        category: "In Development",
        description: "Next-gen Shopify store featuring custom metafield logic and quiz funnels.",
        link: "https://spira-vit.myshopify.com/",
        color: "from-emerald-600 to-teal-400"
    }
];

export function Projects() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Animate Title
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 60%",
                        scrub: 1
                    }
                }
            );

            // Animate Cards Staggered
            gsap.fromTo(cardsRef.current,
                { y: 100, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%"
                    }
                }
            );
        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen bg-black text-white p-10 py-20 relative z-10">
            <h2 ref={titleRef} className="text-5xl font-bold text-center mb-16">Selected Works</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        ref={el => { if (el) cardsRef.current[index] = el; }}
                        className={`p-8 rounded-2xl bg-gradient-to-br ${project.color} transform transition-transform hover:-translate-y-2 block no-underline text-white shadow-xl`}
                    >
                        <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2 block">{project.category}</span>
                        <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                        <p className="text-white/90 text-sm leading-relaxed mb-4">{project.description}</p>
                        <div className="text-xs font-bold flex items-center gap-2">
                            View Project <span className="text-lg">→</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
