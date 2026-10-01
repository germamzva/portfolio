export type Education = {
  _id?: string;
  school_name: string;
  course: string;
  start_year: string;
  end_year: string;
  description: string;
};

export type UpdateEducationPayload = {
  educationId: string;
  data: Education;
};
