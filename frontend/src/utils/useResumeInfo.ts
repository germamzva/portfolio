import { useQuery } from "@tanstack/react-query";

// queries
import { getResume } from "../queries/resume.queries";

import type { ResumeType } from "../types/resume.type";

type ResumeParams = {
  userId: string;
};

export const useResumeInfo = (params?: ResumeParams) => {
  const userId = params?.userId ?? "";

  return useQuery<ResumeType>({
    queryKey: ["resume", userId],
    queryFn: () => getResume(userId!),
    enabled: !!userId,
  });
};
