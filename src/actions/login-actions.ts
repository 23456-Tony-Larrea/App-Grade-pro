import axios from "axios";
import { API_URL } from "../public/urls/URL'S";
import { User } from "../models/User";

export type LoginUserParams = Omit<User, "id_user">;

export const login = async (data: LoginUserParams): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};
