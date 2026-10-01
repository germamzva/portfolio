import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

// queries
import {
  getExperiencesById,
  updateExperiences,
} from "../../../queries/experiences.queries";

// type
import type {
  Experience,
  UpdateExperiencePayload,
} from "../../../types/experience.type";

type Props = {
  modalOpenEdit: boolean;
  setModalOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  experienceId: string;
};

const EditExperience = ({
  modalOpenEdit,
  setModalOpenEdit,
  experienceId,
}: Props) => {
  const queryClient = useQueryClient();

  const { data: experience } = useQuery<Experience>({
    queryKey: ["experiences", experienceId],
    queryFn: () => getExperiencesById(experienceId),
    enabled: modalOpenEdit,
  });

  const { mutate: editExperiencesMutate } = useMutation({
    mutationFn: ({ experienceId, data }: UpdateExperiencePayload) =>
      updateExperiences(experienceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });

  const handleSubmitExperiencesEdit = (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Experience;
    editExperiencesMutate({ experienceId, data });
    setModalOpenEdit((prev) => !prev);
    e.currentTarget.reset();
  };
  return (
    <div
      tabIndex={-1}
      className={`
                fixed inset-0 z-50 flex justify-center transition-all duration-300 ease-in-out
                ${
                  modalOpenEdit
                    ? "opacity-100 visible bg-black/30"
                    : "opacity-0 invisible pointer-events-none"
                }
              `}
    >
      <div
        className={`
                  relative p-5 w-full max-w-4xl
                  transition-all duration-300 ease-in-out
                  ${modalOpenEdit ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
                `}
      >
        <div className="relative bg-white border border-gray-900/10 rounded-base shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-900/10 py-4 px-4">
            <strong className="font-bold text-xl text-center">
              Edit Experience
            </strong>
            <button
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              onClick={() => setModalOpenEdit(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="border-white/10 px-4">
            <form onSubmit={handleSubmitExperiencesEdit}>
              <div className="mt-5">
                <div className="px-2 mb-5 ">
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                    defaultValue={experience?.company}
                  />
                </div>
                <div className="mb-5 flex gap-5 items-baseline px-1">
                  <div className="w-1/2">
                    <label
                      htmlFor="position"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      id="position"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                      defaultValue={experience?.position}
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="position"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Number of Years Worked
                    </label>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <input
                          type="date"
                          name="total_from"
                          id="total_from"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5 font-manrope"
                          defaultValue={experience?.total_from}
                        />
                        <small className="text-black">From</small>
                      </div>
                      <div>
                        <input
                          type="date"
                          name="total_to"
                          id="total_to"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5 font-manrope"
                          defaultValue={experience?.total_to}
                        />
                        <small className="text-black">To</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    cols={30}
                    rows={10}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
                    defaultValue={experience?.description}
                  ></textarea>
                </div>
                <div className="mb-7">
                  <button
                    type="submit"
                    className=" bg-green-400 text-slate-700 hover:text-white transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExperience;
