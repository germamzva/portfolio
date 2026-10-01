import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP);

// components
import ExperiencedCard from "./ExperiencedCard";

type Props = {
  resume: any | []
}

export default function Experiences({ resume }: Props) {

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".experience-item");
    const progress = document.querySelector<HTMLElement>(
      ".timeline-line-progress",
    );

    if (!progress || items.length === 0) return;

    gsap.set(progress, { scaleY: 0, transformOrigin: "top" });
    gsap.set(".timeline-dot", { opacity: 0, scale: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".experiences-timeline",
        start: "top 80%",
        end: "bottom 80%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    items.forEach((item, index) => {
      const dot = item.querySelector<HTMLElement>(".timeline-dot");
      if (!dot) return;

      const fromX = item.classList.contains("ani_slideLeftIn") ? -100 : 100;
      const progressTarget = (index + 1) / items.length;

      timeline
        .from(item, {
          x: fromX,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .to(dot, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "back.out(2)",
        })
        .to(progress, {
          scaleY: progressTarget,
          duration: 1.6,
          ease: "power2.out",
        });
    });
  });

  return (
    <div className="pt-30">
      <h1 className="font-bold font-manrope text-white mb-15 text-fsize2">
        <span className="text-green-400 text-5xl">.</span>Works Experiences
      </h1>

      <div className="experiences-timeline relative px-5 sm:px-0 md:px-0">

        {/* CENTER TIMELINE */}
        <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-gray-600 hidden md:block sm:block">
          <div className="timeline-line-progress h-full origin-top scale-y-0 bg-green-400" />
        </div>

        {resume?.resumeInfo?.experiences?.map((experience: any, index: number) => {
          const isRight = index % 2 === 0;

          return (
            <div
              key={experience._id}
              className={`experience-item relative flex mb-20 ${isRight ? "justify-start ani_slideLeftIn" : "justify-end ani_slideRightIn"
                }`}
            >
              <div className={`md:w-[48%] w-full relative border-white/10 bg-slate-600/20 rounded-3xl border py-5 px-5`}>

                {/* DOT */}
                <span
                  className={`timeline-dot block h-4 w-4 bg-green-400 rounded-full absolute z-10
              ${isRight
                      ? "-top-2 md:-top-1 md:-right-8.5 right-43"
                      : "-top-2 md:top-1 md:-left-8.5 left-43"
                    }
            `}
                />

                <ExperiencedCard experience={experience} />

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
