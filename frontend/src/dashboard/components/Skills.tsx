import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// queries
import {
  getSkills,
  addSkills,
  removeSkills,
  updateSkills,
} from "../../queries/skills.queries.ts";

// type
import type { Skill } from "../../types/skills.type.ts";

type skillPayload = {
  id: string;
  data: {
    skill: string;
  };
};

enum SkillType {
  frontend = "frontend",
  backend = "backend",
  cms = "cms",
  others = "others",
}

export default function Skills() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { data: skills } = useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const { mutate } = useMutation<unknown, unknown, Skill>({
    mutationFn: addSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: ({ id, data }: skillPayload) => updateSkills(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: removeSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  const handleSubmitSkillsAdd = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Skill;
    mutate(data);
    e.currentTarget.reset();
  };

  const handleDeleteSkill = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    mutateDelete(id);
  };

  const handleEditSkill = async (
    id: string,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    mutateUpdate({ id, data: { skill: e.currentTarget.value } });
    setEditingId(null);
  };

  return (
    <>
      <h1 className="font-bold font-manrope text-white mb-15 text-fsize2">
        <span className="text-green-400 text-5xl">.</span>Technical Skills
      </h1>

      <div className="">
        <form onSubmit={handleSubmitSkillsAdd}>
          <div className="mt-5 pe-3">
            <div className="mb-5 flex gap-5 items-end justify-center">
              <div className="w-1/4">
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Type
                </label>
                <select
                  name="skill_type"
                  id="skill_type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                >
                  <option value="">Select Type</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="cms">CMS</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="w-3/4">
                <label
                  htmlFor="position"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                />
              </div>
              <div className="w-1/6">
                <button
                  type="submit"
                  className="bg-white hover:bg-green-400 text-slate-700 hover:text-white transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {skills && skills.length > 0 && (
        <div className="mt-20">
          <h2 className="font-bold font-manrope text-white mb-10 text-fsize2">
            <span className="text-green-400 text-5xl">.</span>Skill Lists
          </h2>
          <div className="flex flex-col gap-10">
            {Object.values(SkillType).map((type) => {
              const filteredSkills = skills?.filter(
                (skill) => skill.skill_type === type
              );

              // Don't render this skill type if it has no skills
              if (!filteredSkills?.length) {
                return null;
              }

              return (
                <div key={type}>
                  <h2 className="font-semibold mb-2 text-white capitalize">
                    {type}
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.map((skill) =>
                      editingId === skill._id ? (
                        <input
                          key={skill._id}
                          autoFocus
                          className="px-3 py-1 bg-gray-100 rounded focus:outline-green-400 w-auto"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            setEditingId(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEditSkill(skill._id, e);
                            }
                          }}
                        />
                      ) : (
                        <span
                          className="px-3 py-1 bg-gray-100 rounded relative"
                          key={skill._id}
                          onClick={() => {
                            setEditingId(skill._id);
                            setEditValue(skill.skills);
                          }}
                        >
                          {skill.skills}

                          <button
                            type="button"
                            className="ml-2 font-roboto absolute top-[-5px] right-[-5px] bg-red-400 p-1 transition hover:bg-green-400 text-red-500 rounded-full hover:text-white text-white cursor-pointer"
                            onClick={(e) => handleDeleteSkill(skill._id, e)}
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
                              />
                            </svg>
                          </button>
                        </span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
