import React, { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// queries
import {
  getProjects,
  addProjects,
  removeProjects,
} from "../../queries/projects.queries.ts";

// type
import type { Project } from "../../types/project.type.ts";

// components
import AddProjects from "./modals/AddProjects.tsx";
import EditProjects from "./modals/EditProjects.tsx";

export default function Projects() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [projectId, setProjectId] = useState("");
  const { data: projects } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const { mutate: removeProjectsMutate } = useMutation({
    mutationFn: removeProjects,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleDeleteProject = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    removeProjectsMutate(id);
  };

  const handleOpenEditProject = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setProjectId(id);
    setModalOpenEdit((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 pe-5">
        <h1 className="font-bold font-manrope text-white text-fsize2 flex items-baseline justify-center">
          <span className="text-green-400 text-5xl">.</span>Projects
        </h1>
        <button
          type="button"
          className="bg-white hover:bg-green-400 text-slate-700 hover:text-white transition text-sm font-bold py-2 px-4 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
          onClick={() => setModalOpen((prev) => !prev)}
        >
          Add Project
        </button>
      </div>

      {projects && projects?.length > 0 && (
        <div className="mt-10">
          {projects?.map((project) => (
            <div className="mb-5 pe-5 relative" key={project._id}>
              <div className="absolute top-2.5 right-7 z-10">
                <button
                  type="button"
                  className="ml-2 font-roboto bg-green-400 p-1 transition hover:bg-blue-400 rounded-full text-white cursor-pointer z-10"
                  onClick={(e) => {
                    if (!project._id) return;
                    handleOpenEditProject(project._id, e);
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
                    if (!project._id) return;
                    handleDeleteProject(project._id, e);
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
                  <p className="text-green-400 font-sora">{project.name}</p>
                </div>

                <p className="text-white font-roboto  mb-1">
                  Tools: {project.tools}
                </p>

                <p className="text-white font-manrope text-fsize3">
                  Roles
                </p>
                <p className="text-white font-manrope text-fsize3" style={{ whiteSpace: "pre-line" }}>
                  {project.description}
                </p>

                <p className="mt-3 text-xs text-start">
                  <a
                    href={project.link}
                    className="underline hover:text-green-500 text-white"
                  >
                    View site
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddProjects modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <EditProjects
        modalOpenEdit={modalOpenEdit}
        setModalOpenEdit={setModalOpenEdit}
        projectId={projectId}
      />
    </>
  );
}
