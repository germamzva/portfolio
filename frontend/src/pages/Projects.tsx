import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


// queries
import { useCurrentUser } from "../utils/useCurrentUser";
import { useResumeInfo } from "../utils/useResumeInfo";

export default function Projects() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: resume, isLoading: resumeLoading } = useResumeInfo({
    userId: user?._id || "",
  });

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const animatedItems = Array.from(
        container.current?.querySelectorAll<HTMLElement>(".ani_slideUp") ?? [],
      );

      if (!animatedItems.length) return;

      animatedItems.forEach((item, index) => {
        gsap.from(item, {
          duration: 1,
          opacity: 0,
          y: 50,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    {
      scope: container,
      dependencies: [resume],
      revertOnUpdate: true,
    },
  );

  if (userLoading || resumeLoading) {
    return <div className="mt-5 text-white text-2xl">Loading...</div>;
  }

  if (!user || !resume) {
    return (
      <div className="mt-5 text-white text-2xl">User or resume not found</div>
    );
  }

  return (
    <div className="flex flex-col gap-10 py-30" ref={container}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <h1
          className="mb-10 px-5 font-manrope text-fsize2 font-bold text-white dark:text-green-400
    before:mr-1 before:text-5xl dark:before:text-white before:text-green-400 before:content-['.']
    sm:px-0 md:px-0"
        >
          Projects
        </h1>

        {/* <!-- Filter Buttons Container (Inside the highlighted red area) --> */}
        {/* <div className="inline-flex items-center p-1.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg shadow-black/40 overflow-x-auto max-w-full custom-scrollbar">

          <button
            className="filter-btn active-filter relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-white bg-slate-800 border border-emerald-500/40 shadow-sm"
            data-category="all"
          >
            <span>All</span>
            <span className="filter-count font-mono text-[11px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-green-400">4</span>
          </button>

          <button
            
            className="filter-btn relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            data-category="fullstack"
          >
            <span>Fullstack</span>
            <span className="filter-count font-mono text-[11px] px-1.5 py-0.2 rounded-md bg-slate-800 text-slate-400">2</span>
          </button>

          <button
            className="filter-btn relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            data-category="cms"
          >
            <span>CMS</span>
            <span className="filter-count font-mono text-[11px] px-1.5 py-0.2 rounded-md bg-slate-800 text-slate-400">2</span>
          </button>


          <button
            className="filter-btn relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            data-category="apps"
          >
            <span>Apps</span>
            <span className="filter-count font-mono text-[11px] px-1.5 py-0.2 rounded-md bg-slate-800 text-slate-400">2</span>
          </button>
        </div> */}

      </div>

      {resume?.resumeInfo?.projects.map((project) => (

        <article className="group relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 md:p-8 transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-emerald-500/10 card-border-glow ani_slideUp">
          {/* <!-- Subtle Top Glow Gradient --> */}
          <div className="absolute -top-px left-12 right-12 h-px bg-linear-to-r from-transparent via-brand-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="flex flex-col">
            <div className="space-y-4">
              {/* <!-- Header section inside card --> */}
              <div className="space-y-1">
                {/* <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400/90 tracking-wider uppercase">
                  <i data-lucide="map-pin" className="w-3.5 h-3.5"></i>
                  <span>Surfers Paradise, Gold Coast • Accommodation</span>
                </div> */}
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-green-500 group-hover:text-green-400 transition-colors flex items-center gap-3">
                  <span>{project.name}</span>
                  <span className="inline-flex font-mono items-center text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-500/10 text-slate-300 border border-emerald-500/20">
                    Custom Build
                  </span>
                </h2>
              </div>

              {/* <!-- Description --> */}
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {project.description}
              </p>

              {/* <!-- Tools & Technologies (Redesigned as Pills) --> */}
              <div className="pt-2">
                <div className="text-[11px] font-mono tracking-wider text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="layers" aria-hidden="true" className="lucide lucide-layers w-3.5 h-3.5 text-emerald-400">
                    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                  </svg>
                  <span>Tech Stack & Deliverables</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tools
                    ?.split(",")
                    .map((item: string) => item.trim())
                    .filter(Boolean)
                    .map((item: string, index: number) => (
                      <span
                        key={`${item}-${index}`}
                        className="px-2.5 font-inter py-1 text-xs rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/60 hover:border-green-500/40 hover:text-green-400 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <div className="pt-10 shrink-0">
              <a
                href={project.link}
                className="font-mono uppercase inline-flex items-center justify-center gap-2 w-full lg:w-auto px-5 py-2.5 rounded-xl bg-slate-800 dark:text-white dark:bg-green-400 hover:bg-green-400 text-slate-200 hover:text-white font-semibold text-xs transition-all duration-200 border border-slate-700 hover:border-emerald-400 group/btn shadow-md hover:shadow-green-500/20"
              >
                <span>View live site</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="external-link" aria-hidden="true" className="lucide lucide-external-link w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                  <path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
