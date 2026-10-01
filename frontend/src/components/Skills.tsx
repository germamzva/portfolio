import React from "react";

// hooks
import { useCurrentUser } from "../utils/useCurrentUser";
import { useResumeInfo } from "../utils/useResumeInfo";

type Props = {
  aniClass?: string;
};

enum SkillType {
  frontend = "frontend",
  backend = "backend",
  cms = "cms",
  others = "others",
}

export default function Skills({ aniClass }: Props) {

  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: resume, isLoading: resumeLoading } = useResumeInfo({ userId: user?._id || "" });

  if (userLoading || resumeLoading) {
    return <div className="mt-5 text-white text-2xl px-5 sm:px-0 md:px-0">Loading...</div>;
  }

  if (!user || !resume) {
    return <div className="mt-5 text-white text-2xl px-5 sm:px-0 md:px-0">User or resume not found</div>;
  }

  const skills = resume?.resumeInfo?.skills || [];

  return (
    <>
      <div className="px-5 sm:px-0 md:px-0">
        <h2 className="text-3xl md:text-6xl text-green-400 font-sora mb-10 ani_slideUp">Skills</h2>

        {Object.values(SkillType).map((type) => {
          const filteredSkills = skills?.filter(
            (skill) => skill.skill_type === type
          );

          // Don't render this skill type if it has no skills
          if (!filteredSkills?.length) {
            return null;
          }

          return (
            <div
              key={type}
              className={`mb-6 rounded-2xl border border-white/10 bg-slate-900/50 p-5 md:p-5 backdrop-blur-lg ${aniClass}`}
            >
              <h3 className="mb-5 px-5 font-manrope text-fsize2 font-bold text-white
    before:mr-1 before:text-3xl before:text-green-400 before:content-['.']
    sm:px-0 md:px-0">{type}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex font-inter items-center justify-center text-center p-3 rounded-xl border border-white/5 bg-slate-800/40 text-xs font-manrope text-slate-300 transition-all duration-200 hover:border-green-500/40 hover:text-green-400 hover:bg-slate-800/75"
                  >
                    {skill.skills}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
