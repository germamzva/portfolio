import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// services
import { addPersonalInfo, getInfo } from "../../queries/personal.queries.ts";

// type
import type { PersonalInfo, LinkField } from "../../types/personal.type.ts";

// utils
import { useCurrentUser } from "../../utils/useCurrentUser.ts";

export default function Personal() {
  const { data: user, isLoading } = useCurrentUser();
  const queryClient = useQueryClient();
  const [aboutSummary, setAboutSummary] = useState<string>("");
  const [linksFields, setLinksFields] = useState<LinkField[]>([
    { name: "", link: "" },
  ]);
  const handleAddField = () => {
    const newField: LinkField = { name: "", link: "" };
    setLinksFields([...linksFields, newField]);
  };

  const handleChange = (index: number, key: keyof LinkField, value: string) => {
    const updated = [...linksFields];
    updated[index][key] = value;



    setLinksFields(updated);
  };

  const handleRemoveField = (index: number) => {
    const updated = [...linksFields];
    if (index === 0) return;
    updated.splice(index, 1);
    setLinksFields(updated);
  };

  const { data: personalInfo } = useQuery({
    queryKey: ["personalInfo"],
    queryFn: getInfo,
  });

  useEffect(() => {
    if (personalInfo?.[0]?.links) {
      setLinksFields(personalInfo?.[0]?.links);
    }
  }, [personalInfo]);

  const { mutateAsync } = useMutation<ResponseType, Error, PersonalInfo>({
    mutationFn: addPersonalInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["personalInfo"],
      });
    },
  });

  const handleSubmitPersonalInfo = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("aboutSummary", aboutSummary);

    const data = Object.fromEntries(formData);
    const payload: PersonalInfo = {
      ...(data as Omit<PersonalInfo, "links">),
      links: linksFields,
    };
    mutateAsync(payload);
  };

  return (
    <>
      <h1 className="font-bold font-manrope text-white mb-15 text-fsize2">
        <span className="text-green-400 text-5xl">.</span>Personal Information
      </h1>

      <div className="">
        <form onSubmit={handleSubmitPersonalInfo}>
          <div className="mt-5 pe-5">
            <div className="mb-5 grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
                  defaultValue={personalInfo?.[0]?.fullname || user?.username}
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
                  defaultValue={personalInfo?.[0]?.position}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pe-5">
            <div className="mb-5 grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
                  defaultValue={personalInfo?.[0]?.email || user?.email}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
                  defaultValue={personalInfo?.[0]?.phone}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pe-5">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <textarea
              name="address"
              id="address"
              cols={30}
              rows={3}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
              defaultValue={personalInfo?.[0]?.address}
            ></textarea>
          </div>

          <div className="mt-5 pe-5">
            <label
              htmlFor="about_summary"
              className="block mb-2 text-sm font-medium text-white"
            >
              Personal Summary
            </label>
            {/* <textarea
              name="about_summary"
              id="about_summary"
              cols={30}
              rows={10}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
              defaultValue={personalInfo?.[0]?.about_summary}
            ></textarea> */}
            <ReactQuill
              theme="snow"
              onChange={setAboutSummary}
              id="about_summary"
              className="bg-white"
              value={personalInfo?.[0]?.about_summary}
            />
          </div>

          <div className="mt-5 pe-5">
            <div className="flex flex-row items-center justify-between mb-3">
              <label
                htmlFor="links"
                className="block mb-2 text-sm font-medium text-white"
              >
                Personal Links <small>(Git, Linkedin, etc)</small>
              </label>

              <button
                onClick={handleAddField}
                type="button"
                className="bg-white hover:bg-green-400 text-slate-700 hover:text-white transition font-bold py-3 px-3 text-xs rounded-md font-roboto cursor-pointer leading-0"
              >
                Add Field
              </button>
            </div>
            {linksFields.map((field, index) => {
              return (
                <div className="flex flex-row gap-5 mb-3" key={index}>
                  <div className="w-1/4">
                    <input
                      type="text"
                      value={field.name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
                      placeholder="Link Name"
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-3/4 flex gap-3 justify-between">
                    <input
                      type="text"
                      value={field.link}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"
                      placeholder="URL Link"
                      onChange={(e) =>
                        handleChange(index, "link", e.target.value)
                      }
                    />
                    {/* add remove icon from flaticon svg */}
                    <button
                      onClick={() => handleRemoveField(index)}
                      type="button"
                      className="bg-white hover:bg-red-400 text-slate-700 hover:text-white transition font-bold py-2 px-2 text-xs rounded-md font-roboto cursor-pointer leading-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="bg-white hover:bg-green-400 text-slate-700 hover:text-white transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
