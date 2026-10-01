import apiRequest from "../utils/apiRequest.ts";

// type
import type { PersonalInfo } from "../types/personal.type.ts";

export const addPersonalInfo = async (payload: PersonalInfo) => {
  try {
    const response = await apiRequest.post("/personal/create", payload);
    return response.data;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const getInfo = async () => {
  try {
    const response = await apiRequest.get("/personal");
    return response.data;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};
