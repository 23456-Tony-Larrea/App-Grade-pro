import axios from "axios";
import { User } from "../../models/User";
import { API_URL } from "../../public/urls/URL'S";

export type UsersParams = Omit<User, "id">;

export const UsersAction = async (data: UsersParams): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};
