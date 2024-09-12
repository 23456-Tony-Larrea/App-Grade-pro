import axios from "axios";
import { API_URL } from "../../public/urls/URL'S";
import { User } from "../../models/User";

export type ForgotPassParams = Omit<User, "id_user">;

export const ForgotPasswordAction = async (
  data: ForgotPassParams
): Promise<User> => {
  const response = await axios.post(`${API_URL}/forgot-password`, data);
  return response.data;
};
