import React from "react";
import Skills from "./Skills";

export default function About() {
  return (
    <>
      <div className="flex flex-col gap-10 py-30">
        <h1 className="font-bold font-manrope text-white mb-15 text-fsize2">
          <span className="text-green-400 text-5xl">.</span>About Me
        </h1>

        <p className="text-6xl text-green-400 font-sora">
          Personal Information
        </p>

        <div className="mb-10">
          <p className="text-white font-roboto text-fsize3 mb-5">
            I am a 30-year-old Filipino male, born on August 28, 1990, and
            currently married. I am a highly motivated individual who values
            hard work, responsibility, and continuous self-improvement. I am a
            fast learner with the ability to quickly adapt to new environments,
            technologies, and work processes. I take initiative in completing
            tasks efficiently and am committed to producing high-quality
            results, even when working under pressure.{" "}
          </p>
          <p className="text-white font-roboto text-fsize3">
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

        <p className="text-6xl text-green-400 font-sora">
          Education Information
        </p>

        <div className="mb-10">
          <p className="text-white font-roboto text-fsize3">
            <strong>University of Mindanao ( 2007 - 2012 )</strong> - Bachelor
            of Science in Information Technology
          </p>
        </div>

        <Skills />
      </div>
    </>
  );
}
