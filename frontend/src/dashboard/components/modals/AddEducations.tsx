import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Education } from "../../../types/education.type";

import { addEducation } from "../../../queries/education.queries";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddEducations({ modalOpen, setModalOpen }: Props) {
  const queryClient = useQueryClient();

  const { mutate: addEducationMutate } = useMutation<
    unknown,
    unknown,
    Education
  >({
    mutationFn: addEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },
  });

  const handleSubmitEducationAdd = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Education;
    addEducationMutate(data);
    // reset form
    e.currentTarget.reset();
    setModalOpen((prev) => !prev);
  };
  return (
    <div
      tabIndex={-1}
      className={`
                fixed inset-0 z-50 flex justify-center transition-all duration-300 ease-in-out
                ${modalOpen
          ? "opacity-100 visible bg-black/30"
          : "opacity-0 invisible pointer-events-none"
        }
              `}
    >
      <div
        className={`
                  relative p-5 w-full max-w-4xl
                  transition-all duration-300 ease-in-out
                  ${modalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
                `}
      >
        <div className="relative bg-white border border-gray-900/10 rounded-base shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-900/10 py-4 px-4">
            <strong className="font-bold text-xl text-center">
              Add Education
            </strong>
            <button
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              onClick={() => setModalOpen(false)}
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
            <form onSubmit={handleSubmitEducationAdd}>
              <div className="mt-5">
                <div className="mb-5 ">
                  <label
                    htmlFor="school_name"
                    className="block mb-2 text-sm font-medium"
                  >
                    School Name
                  </label>
                  <input
                    type="text"
                    name="school_name"
                    id="school_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                  />
                </div>
                <div className="mb-5 flex gap-5 items-end">
                  <div className="w-1/2">
                    <label
                      htmlFor="course"
                      className="block mb-2 text-sm font-medium"
                    >
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      id="course"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="link"
                      className="block mb-2 text-sm font-medium"
                    >
                      School Year
                    </label>
                    <div className="grid grid-cols-2 gap-5">
                      <input
                        type="date"
                        name="start_year"
                        id="start_year"
                        className="bg-gray-50 border border-gray-300 text-gray-900 font-manrope text-sm rounded-lg outline-green-400 block w-full p-3.5"
                        placeholder="Start Year"
                      />
                      <input
                        type="date"
                        name="end_year"
                        id="end_year"
                        className="bg-gray-50 border border-gray-300 text-gray-900 font-manrope text-sm rounded-lg outline-green-400 block w-full p-3.5"
                        placeholder="End Year"
                      />
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
                  ></textarea>
                </div>
                <div className="mb-7">
                  <button
                    type="submit"
                    className="bg-green-400 text-white hover:text-slate-700 transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
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
}

export default AddEducations;
