import apiRequest from "../utils/apiRequest.ts";

// type
import type { Experience } from "../types/experience.type.ts";

export const getExperiences = async () => {
  try {
    const response = await apiRequest.get("/experiences");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getExperiencesById = async (id: string) => {
  try {
    const response = await apiRequest.get(`/experiences/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addExperiences = async (data: Experience) => {
  try {
    const response = await apiRequest.post("/experiences/create", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeExperiences = async (id: string) => {
  try {
    const response = await apiRequest.delete(`/experiences/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateExperiences = async (id: string, data: Experience) => {
  try {
    const response = await apiRequest.put(`/experiences/edit/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
