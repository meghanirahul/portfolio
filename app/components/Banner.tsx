import { useEffect, useRef } from "react";
import borderpng from '../../public/bannerborder_white.png';
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

interface BannerProps {
  heading: string;
  content: string;
}

export function Banner({ heading, content }: BannerProps) {
  const splittextRef = useRef(null);

  useEffect(() => {
    const splittext = splittextRef.current;
    if (!splittext) return;

    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        // Use ctx.add to ensure this async work is tracked and can be reverted
        ctx.add(() => {
          gsap.set(splittext, { opacity: 1 });

          const split = new SplitText(splittext, {
            type: "words",
            wordsClass: "word++",
            wordDelimiter: String.fromCharCode(8205)
          });

          // Set initial state
          gsap.set(split.words, {
            rotationX: 0,
            opacity: 1
          });
        });
      });
    }, splittext);

    return () => {
      ctx.revert();
    };
  }, [])

  return (
    <>
      <div className="banner_index">
        <div className="banner_cnt">
          <div className="banner_inner flex flex-col items-center">
            <img src={borderpng} alt="banner-border" width={'auto'} height={'auto'} className="position-border" />
            <h1 className="h1 banner_heading" ref={splittextRef}>{heading}</h1>
            <p className="banner_content">{content}</p>
          </div>
        </div>
      </div>
    </>
  );
}