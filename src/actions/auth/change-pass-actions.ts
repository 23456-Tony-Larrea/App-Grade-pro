import axios from "axios";
import { API_URL } from "../../public/urls/URL'S";
import { User } from "../../models/User";

export type ChangePassParams = Omit<User, "id_user">;

export const ChangePasswordAction = async (
  data: ChangePassParams
): Promise<User> => {
  const response = await axios.post(`${API_URL}/update-password/forgot/:id`, data);
  return response.data;
};
