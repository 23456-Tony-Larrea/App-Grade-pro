import axios from "axios";
import { API_URL } from "../../public/urls/URL'S";
import { ChangePass } from "../../models/ChangePass";

export const ChangePasswordAction = async (
  id: number,
  data: ChangePass
): Promise<ChangePass> => {
  const response = await axios.put(
    `${API_URL}/update-password/forgot/${id}`,
    data
  );
  return response.data;
};
