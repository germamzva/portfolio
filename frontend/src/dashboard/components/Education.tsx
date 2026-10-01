import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

// queries
import {
  getEducation,
  deleteEducation,
} from "../../queries/education.queries.ts";

// type
import type { Education } from "../../types/education.type.ts";

// components
import AddEducations from "./modals/AddEducations.tsx";
import EditEducations from "./modals/EditEducation.tsx";

export default function Education() {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [educationId, setEducationId] = useState("");

  const { data: educations } = useQuery({
    queryKey: ["educations"],
    queryFn: getEducation,
  });

  const { mutate: removeEducationMutate } = useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },
  });

  const handleDeleteEducation = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    removeEducationMutate(id);
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalOpen((prev) => !prev);
  };

  const handleOpenEditEducation = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setEducationId(id);
    setModalOpenEdit((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 pe-5">
        <h1 className="font-bold font-manrope text-white text-fsize2">
          <span className="text-green-400 text-5xl">.</span>Education
        </h1>
        <button
          type="button"
          className="bg-white hover:bg-green-400 text-slate-700 hover:text-white transition text-sm font-bold py-2 px-4 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
          onClick={(e) => handleOpenModal(e)}
        >
          Add Education
        </button>
      </div>

      {/* {educations.length === 0 && (
        <h2 className="text-white">Education List is Empty</h2>
      )} */}

      {educations && educations.length > 0 && (
        <div className="mt-10">
          {educations?.map((education: Education) => (
            <div className="mb-5 pe-5 relative" key={education._id}>
              <div className="absolute top-2.5 right-7 z-10">
                <button
                  type="button"
                  className="ml-2 font-roboto bg-green-400 p-1 transition hover:bg-blue-400 rounded-full text-white cursor-pointer z-10"
                  onClick={(e) => {
                    if (!education._id) return;
                    handleOpenEditEducation(education._id, e);
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
                    if (!education._id) return;
                    handleDeleteEducation(education._id, e);
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
                    {education.school_name}
                  </p>
                </div>

                <p className="text-white font-roboto  mb-1">
                  Course: {education.course}
                </p>

                <p className="text-white font-manrope text-fsize3">
                  SY: {moment(education.school_start).format("MMMM DD YYYY")} -
                  {moment(education.school_end).format("MMMM DD YYYY")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddEducations modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <EditEducations
        modalOpenEdit={modalOpenEdit}
        setModalOpenEdit={setModalOpenEdit}
        educationId={educationId}
      />
    </>
  );
}
