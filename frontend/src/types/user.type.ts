export type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  google_id?: string;
  lastLogin: Date;
  ids?: {
    resume: string;
    contact: string;
    personal_info: string;
    experience: string;
    skills: string;
    projects: string;
    educations: string;
  }[];
}