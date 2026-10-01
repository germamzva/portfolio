import { useRef } from "react";
import { Link, useLocation } from "react-router";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

// queries  
import { useResumeInfo } from "../utils/useResumeInfo";
import { useCurrentUser } from "../utils/useCurrentUser";

// components
import Contact from "./Contact";

export default function Footer() {
  const location = useLocation();
  const { data: user } = useCurrentUser();
  const { data: resume } = useResumeInfo({ userId: user?._id || "" });

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
      dependencies: [location.pathname, resume],
      revertOnUpdate: true,
    },
  );

  const isContactPage = location.pathname === "/contact";

  return (

    <div id="contact" className="flex flex-col gap-10 py-30" ref={container}>
      <div className="px-5 sm:px-0 md:px-0">
        {/* if the url is /contact then make h1 if not make h2 */}
        {isContactPage ? (
          <h1
            className="mb-10 px-5 font-manrope text-fsize2 font-bold text-white dark:text-green-400
    before:mr-1 before:text-5xl before:text-green-400 dark:before:text-white before:content-['.']
    sm:px-0 md:px-0"
          >
            Contact Us
          </h1>
        ) : (
          <h2
            className="mb-10 font-manrope text-fsize2 font-bold text-white dark:text-green-400
    before:mr-1 before:text-5xl before:text-green-400 dark:before:text-white before:content-['.']
    sm:px-0 md:px-0"
          >
            Let's Connect
          </h2>
        )}
      </div>

      <div className="flex items-center flex-col md:flex-row sm:flex-col px-5 sm:px-0 md:px-0">
        <div className="w-full md:w-1/2 sm:w-full">
          <p className="mb-5 text-3xl md:text-6xl text-green-400 font-sora ani_slideUp">
            Don't hesitate to contact me
          </p>

          <p className="mb-5 flex flex-col">
            <span className="text-white font-roboto text-fsize2 ani_slideUp">
              {resume?.resumeInfo?.personalInfo?.[0]?.email ?? ""}
            </span>
            <span className="font-roboto text-fsize4 text-slate-400 ani_slideUp">
              {resume?.resumeInfo?.personalInfo?.[0]?.address ?? "Esmeralda Residenses, Apokon, Tagum City"}
            </span>
          </p>

          <div className="flex gap-2 mb-15 ani_slideUp">
            {resume?.resumeInfo?.personalInfo?.[0]?.links?.map((link) => (
              <div key={link._id} className="flex items-center justify-center hover:scale-110 transition-transform duration-300">
                {link.name === "Git" ? (
                  <Link to={link.link} title={link.name}>
                    {/* generate git icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-7 h-7 fill-white dark:fill-green-400"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Link>
                ) : ""}

                {link.name === "Facebook" ? (
                  <Link to={link.link} title={link.name}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-8 h-8 fill-white dark:fill-green-400"
                    >
                      <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                    </svg>
                  </Link>
                ) : ""}

                {link.name === "LinkedIn" ? (
                  <Link to={link.link} title={link.name}>
                    {/* generate linkedin svg */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-8 h-8 fill-white dark:fill-green-400"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </Link>
                ) : ""}

                {link.name === "IG" ? (
                  <Link to={link.link} title={link.name}>
                    {/* generate IG svg */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-8 h-8 fill-white dark:fill-green-400"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>

                  </Link>
                ) : ""}
              </div>
            ))}
          </div>


        </div>
        <Contact animationClass="ani_slideUp" />
      </div>

      <div className="flex items-center justify-center gap-2 mt-15 px-5 sm:px-0 md:px-0">
        <p className="font-roboto text-white dark:text-slate-800 text-sm text-center">
          © {new Date().getFullYear()} <Link to="/">GCODES</Link>. All Rights Reserved. Designed and built with care by GCODES
        </p>
      </div>
    </div >
  );
}
