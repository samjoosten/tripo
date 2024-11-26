import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "src/axios.index";
import { ApplicationUser } from "src/types/user";

export const useApplicationUserQuery = (options?: UseQueryOptions<ApplicationUser, AxiosError>) => {
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get<ApplicationUser>('/users/me');
      const user = new ApplicationUser(response.data);
      console.log('user', user);
      return user;
    } catch (e) {
      console.error(e);
      throw new AxiosError('Failed to get user');
    }
  }

  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: Infinity,
    ...options
  })
};