import React, { useState } from "react";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// queries
import {
  getExperiences,
  removeExperiences,
} from "../../queries/experiences.queries.ts";

// type
import type { Experience } from "../../types/experience.type.ts";

// components
import AddExperience from "./modals/AddExperience.tsx";
import EditExperience from "./modals/EditExperience.tsx";

export default function Experiences() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: experiences } = useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });

  return (
    <>
      <div className="flex items-center justify-between mb-5 pe-5">
        <h1 className="font-bold font-manrope text-white text-fsize2 flex items-baseline justify-center">
          <span className="text-green-400 text-5xl">.</span>Experiences
        </h1>
        <button
          type="button"
          className="bg-white hover:bg-green-400 text-slate-700 hover:text-white transition text-sm font-bold py-2 px-4 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
          onClick={() => setModalOpen((prev) => !prev)}
        >
          Add Experience
        </button>
      </div>

      <ExperiencesList experiences={experiences || []} />

      <AddExperience modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export function ExperiencesList({
  experiences,
}: {
  experiences: Experience[];
}) {
  const queryClient = useQueryClient();
  const [experienceId, setExperienceId] = useState<string>("");
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const { mutate: removeExperiencesMutate } = useMutation({
    mutationFn: removeExperiences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });

  const handleDeleteExperience = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    removeExperiencesMutate(id);
  };

  const handleOpenEditExperience = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setExperienceId(id);
    setModalOpenEdit((prev) => !prev);
  };

  return (
    <>
      {experiences && experiences.length > 0 && (
        <div className="mt-10">
          {/* experiences list */}
          {experiences?.map((experience: Experience) => (
            <div className="mb-5 pe-5 relative" key={experience._id}>
              <div className="absolute top-2.5 right-7 z-10">
                <button
                  type="button"
                  className="ml-2 font-roboto bg-green-400 p-1 transition hover:bg-blue-400 rounded-full text-white cursor-pointer z-10"
                  onClick={(e) => {
                    if (!experience._id) return;
                    handleOpenEditExperience(experience._id, e);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-3"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75L21 5.75z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="ml-2 font-roboto bg-green-400 p-1 transition hover:bg-red-400 rounded-full text-white cursor-pointer z-10"
                  onClick={(e) => {
                    if (!experience._id) return;
                    handleDeleteExperience(experience._id, e);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="relative border-white/10 bg-slate-600/20 border py-5 px-5">
                <div className="mb-5 flex items-center gap-5">
                  <p className="text-green-400 font-sora">
                    {experience.company}
                  </p>
                  <span className="text-white font-manrope text-2xl">-</span>
                  <span className="text-white font-manrope">
                    {moment(experience.total_from).format("MMMM YYYY")} -{" "}
                    {moment(experience.total_to).format("MMMM YYYY")}
                  </span>
                </div>

                <p className="text-white font-roboto text-fsize2 mb-1">
                  {experience.position}
                </p>

                <p className="text-white font-roboto text-fsize3 mb-1">
                  Roles:
                </p>
                <p className="text-white font-manrope text-fsize3" style={{ whiteSpace: "pre-line" }}>
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditExperience
        modalOpenEdit={modalOpenEdit}
        setModalOpenEdit={setModalOpenEdit}
        experienceId={experienceId}
      />
    </>
  );
}
