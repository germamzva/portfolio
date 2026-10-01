import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gsap() {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the white line
      gsap.fromTo(
        progressRef.current,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );

      // Animate each dot
      gsap.utils.toArray(".timeline-dot").forEach((dot) => {
        console.log(dot);
        gsap.to(dot, {
          backgroundColor: "#fff",
          scale: 1.5,
          boxShadow: "0 0 15px white",
          duration: 0.3,
          scrollTrigger: {
            trigger: dot,
            start: "top center",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-[100vh] flex justify-center py-40">
      <div ref={timelineRef} className="relative h-[700px] w-[2px]">
        {/* Gray Line */}
        <div className="absolute w-full h-full bg-gray-600"></div>

        {/* White Progress */}
        <div
          ref={progressRef}
          className="absolute top-0 left-0 w-full h-full bg-white origin-top"
        ></div>

        {/* Dots */}
        <div className="timeline-dot absolute -left-[7px] top-0 h-4 w-4 rounded-full bg-green-500"></div>

        <div className="timeline-dot absolute -left-[7px] top-1/2 h-4 w-4 rounded-full bg-green-500"></div>

        <div className="timeline-dot absolute -left-[7px] bottom-0 h-4 w-4 rounded-full bg-green-500"></div>
      </div>
    </section>
  );
}
