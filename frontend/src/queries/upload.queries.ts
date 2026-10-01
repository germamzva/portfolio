import apiRequest from "../utils/apiRequest.ts";

// type
import type { PrimaryImg } from "../types/personal.type.ts";

export const profileImage = async () => {
  try {
    const response = await apiRequest.get("/personal/primary");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (file: File): Promise<PrimaryImg> => {
  try {
    const response = await apiRequest.post("/personal/upload", file);
    return response.data;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};
