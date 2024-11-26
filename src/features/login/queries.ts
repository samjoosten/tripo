import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { LoginFormData } from "./types";
import { useAppStore } from "src/store/store";
import axiosInstance from "src/axios.index";
import type { Token } from "src/types/token";

export const useLoginMutation = (options?: UseMutationOptions<void, Error, LoginFormData, LoginFormData>) => {
  const setToken = useAppStore(state => state.setToken);

  const login = async (data: LoginFormData) => {
    try {
      const response = await axiosInstance.post<Token>('/login', data);
      setToken(response.data);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 400) {
        throw new Error('Gebruikersnaam of wachtwoord is onjuist');
      }
      throw new Error('Fout bij inloggen');
    }
  }

  return useMutation({
    mutationFn: login,
    ...options
  })
}