export type Experience = {
  _id?: string;
  company: string;
  position: string;
  description: string;
  total_from: string;
  total_to: string;
  total_year?: string;
};

export type UpdateExperiencePayload = {
  experienceId: string;
  data: Experience;
};

