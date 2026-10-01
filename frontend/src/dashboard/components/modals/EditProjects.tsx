import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

// queries
import {
  getProjectsById,
  updateProjects,
} from "../../../queries/projects.queries";

// type
import type {
  Project,
  UpdateProjectPayload,
} from "../../../types/project.type";
interface Props {
  modalOpenEdit: boolean;
  setModalOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
}

const EditProjects = ({
  modalOpenEdit,
  setModalOpenEdit,
  projectId,
}: Props) => {
  const queryClient = useQueryClient();

  const { data: education } = useQuery<Project>({
    queryKey: ["projects", projectId],
    queryFn: async () => getProjectsById(projectId!),
    enabled: !!projectId,
  });

  const { mutate: editProjectsMutate, isPending } = useMutation({
    mutationFn: ({ projectId, data }: UpdateProjectPayload) =>
      updateProjects(projectId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      if ((data as { status: string })?.status === "success") {
        setModalOpenEdit(false);
      }
    },
  });

  const handleSubmitProjectEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Project;
    editProjectsMutate({ projectId, data });
    e.currentTarget.reset();
  };

  return (
    <div
      tabIndex={-1}
      className={`
                fixed inset-0 z-50 flex justify-center transition-all duration-300 ease-in-out
                ${modalOpenEdit
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
              Edit Project
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
            <form onSubmit={handleSubmitProjectEdit}>
              <div className="mt-5 pe-5">
                <div className=" mb-5 ">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                    defaultValue={education?.name}
                  />
                </div>
                <div className="mb-5 flex gap-5 items-end px-1">
                  <div className="w-1/2">
                    <label
                      htmlFor="tools"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Tools
                    </label>
                    <input
                      type="text"
                      name="tools"
                      id="tools"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                      defaultValue={education?.tools}
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="link"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Link
                    </label>

                    <input
                      type="text"
                      name="link"
                      id="link"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5 font-manrope"
                      defaultValue={education?.link}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    cols={30}
                    rows={10}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
                    defaultValue={education?.description}
                  ></textarea>
                </div>
                <div className="mb-7">
                  <button
                    type="submit"
                    className="bg-green-400 text-slate-700 hover:text-white transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit"}
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

export default EditProjects;
