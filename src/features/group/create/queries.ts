import { useQuery, type QueryKey, type UseQueryOptions, type QueryFunctionContext, useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import axiosInstance from "src/axios.index";
import { useSnackbar } from "src/components/snackbar/hooks";
import { SnackbarType } from "src/components/snackbar/types";
import { useRefreshTokenMutation } from "src/hooks/queries/useRefreshTokenQuery";

export type UserSearchResponse = Array<UserSearchResult>
export type UserSearchResult = {
  id: string;
  name: string;
}

export const useSearchUsersQuery = (options: UseQueryOptions<UserSearchResponse, Error, UserSearchResponse, QueryKey>) => {
  const searchUsers = async ({queryKey}: QueryFunctionContext) => {
    try {
      const search = queryKey[1];
      const response = await axiosInstance.get<UserSearchResponse>(`/users/search?q=${search}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Fout bij ophalen van gebruikers");
    }
  }

  return useQuery({
    queryFn: searchUsers,
    ...options,
  })
}

export const useCreateGroupMutation = () => {
  const snackbar = useSnackbar();
  const { mutateAsync: fetchRefreshToken } = useRefreshTokenMutation();

  const createGroup = async (userIds: string[]) => {
    try {
      const response = await axiosInstance.post(`/groups`, { userIds });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Fout bij aanmaken van groep");
    }
  }

  return useMutation({
    mutationFn: createGroup,
    onSuccess: async () => {
      snackbar.showSnackbar({ message: 'Groep aangemaakt', type: SnackbarType.SUCCESS });
      await fetchRefreshToken();
    },
    onError: (error) => {
      snackbar.showSnackbar({ message: error.message, type: SnackbarType.ERROR });
    }
  });
}