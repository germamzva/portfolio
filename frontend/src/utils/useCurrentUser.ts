import { useQuery } from "@tanstack/react-query";

// queries
import { myInfo } from "../queries/user.queries";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: myInfo,
    // Don't refetch user information for 5 minutes
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error: any) =>
      error?.response?.status !== 401 && failureCount < 2,
  });
};
