import apiRequest from "../utils/apiRequest";

// type
import type { ResumeType } from "../types/resume.type";

export const getResume = async (userId?: string) => {
  const response = await apiRequest.get<ResumeType>("/resume/" + userId);
  return response.data;
};
