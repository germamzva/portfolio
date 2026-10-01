import moment from "moment"
import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

// components
import Skills from "../components/Skills";

// hooks
import { useCurrentUser } from "../utils/useCurrentUser";
import { useResumeInfo } from "../utils/useResumeInfo";

export default function AboutMe() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: resume, isLoading: resumeLoading } = useResumeInfo({ userId: user?._id || "" });

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
    return <div className="mt-5 text-white text-2xl px-5 sm:px-0 md:px-0">Loading...</div>;
  }

  if (!user || !resume) {
    return <div className="mt-5 text-white text-2xl px-5 sm:px-0 md:px-0">User or resume not found</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-10 py-30" ref={container}>
        <h1 className="font-bold font-manrope text-white dark:text-green-400 mb-15 text-fsize2 px-5 sm:px-0 md:px-0">
          <span className="text-green-400 dark:text-white text-5xl">.</span>About Me
        </h1>

        <p className="text-3xl md:text-6xl text-green-400 font-sora px-5 sm:px-0 md:px-0 ani_slideUp">
          Personal Information
        </p>

        <div className="mb-10 px-5 sm:px-0 md:px-0 ani_slideUp">
          <p className="text-white font-roboto text-fsize3 mb-5">
            I am a 30-year-old Filipino male, born on August 28, 1990, and
            currently married. I am a highly motivated individual who values
            hard work, responsibility, and continuous self-improvement. I am a
            fast learner with the ability to quickly adapt to new environments,
            technologies, and work processes. I take initiative in completing
            tasks efficiently and am committed to producing high-quality
            results, even when working under pressure.
          </p>
          <p className="text-white  font-roboto text-fsize3">
            I am persistent and dedicated, ensuring that every task assigned to
            me is completed thoroughly and on time. I am always eager to expand
            my knowledge and develop new skills that contribute to both my
            personal and professional growth. My creative and resourceful
            approach allows me to solve problems effectively and find practical
            solutions to challenges. I work well independently as well as
            collaboratively with a team, maintaining a positive attitude and a
            strong work ethic. I am confident that my willingness to learn,
            adaptability, and commitment to excellence make me a valuable asset
            to any organization.
          </p>
        </div>

        <p className="text-3xl md:text-6xl text-green-400 font-sora px-5 sm:px-0 md:px-0 ani_slideUp">
          Education Information
        </p>

        <div className="mb-10 px-5 sm:px-0 md:px-0 ani_slideUp">
          <p className="text-white  font-roboto text-fsize3">
            <strong>{resume?.resumeInfo?.educations?.[0]?.school_name} ( {moment(resume?.resumeInfo?.educations?.[0]?.start_year).format("MMM YYYY")} - {moment(resume?.resumeInfo?.educations?.[0]?.end_year).format("MMM YYYY")} )</strong> - {resume?.resumeInfo?.educations?.[0]?.course}
          </p>
        </div>

        <Skills aniClass="ani_slideUp" />
      </div>
    </>
  );
}
