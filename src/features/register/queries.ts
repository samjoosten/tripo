import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { RegisterFormData } from "./types";
import { AxiosError } from "axios";
import axiosInstance from "src/axios.index";
import type { Token } from "src/types/token";
import { useAppStore } from "src/store/store";

export const useRegisterMutation = (options?: UseMutationOptions<void, AxiosError, RegisterFormData, RegisterFormData>) => {
  const setToken = useAppStore(state => state.setToken);

  const register = async (data: RegisterFormData) => {
    try {
      const response = await axiosInstance.post<Token>('/register', data);
      setToken(response.data);
    } catch (e) {
      console.error(e);
      throw new AxiosError('Fout bij aanmelden');
    }
  }

  return useMutation({
    mutationFn: register,
    ...options
  })
}