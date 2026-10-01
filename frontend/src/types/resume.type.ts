export type PersonalInfo = {
  _id: string;
  fullname: string;
  phone?: string;
  email?: string;
  address?: string;
  image?: string;
  links?: {
    _id: string;
    name: string;
    link: string;
  }[];
  about_summary?: string;
  position?: string;
};

export type EducationType = {
  _id: string;
  school_name: string;
  course: string;
  start_year: string;
  end_year: string;
  description: string;
};

export type ExperienceType = {
  _id: string;
  company: string;
  position: string;
  description?: string;
  total_from?: string;
  total_to?: string;
  total_year?: string;
};

export type ProjectType = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  tools?: string[];
  link?: string;
};

export type SkillType = {
  _id: string;
  skill_type: string;
  skills: string[];
};

export type ResumeType = {
  user: {
    _id: string;
    username: string;
    email: string;
  } | null;
  resumeInfo: {
    personalInfo: PersonalInfo[];
    educations: EducationType[];
    experiences: ExperienceType[];
    projects: ProjectType[];
    skills: SkillType[];
  };
};
