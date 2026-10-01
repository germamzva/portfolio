import apiRequest from "../utils/apiRequest.ts";

// type
import type { Skill } from "../types/skills.type.ts";

export const getSkills = async () => {
  try {
    const response = await apiRequest.get("/skills");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addSkills = async (data: Skill) => {
  try {
    const response = await apiRequest.post("/skills/add", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSkills = async (id: string, data: { skill: string }) => {
  try {
    const response = await apiRequest.put(`/skills/edit/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const removeSkills = async (id: string) => {
  try {
    const response = await apiRequest.delete(`/skills/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
