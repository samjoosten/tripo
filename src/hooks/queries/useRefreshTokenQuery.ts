import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import axiosInstance from "src/axios.index";
import { BASE_URL } from "src/config/config";
import { useAppStore } from "src/store/store";
import type { Token } from "src/types/token";

export const useRefreshTokenMutation = () => {
  const fetchRefreshToken = async () => {
    try {
      const refreshToken = useAppStore.getState().token.refreshToken;
      const accessToken = useAppStore.getState().token.accessToken;
      const res: AxiosResponse<Token> = await axiosInstance.post(`${BASE_URL}/token/refresh`, { accessToken, refreshToken });
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error("Fout bij vernieuwen van token");
    }
  }

  return useMutation({
    mutationFn: fetchRefreshToken,
    onSuccess: (data) => {
      useAppStore.getState().setToken(data);
    }
  })
}