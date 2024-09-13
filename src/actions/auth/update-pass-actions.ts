import axios from "axios";
import { API_URL } from "../../public/urls/URL'S";
import { UpdatePass } from "../../models/updatePass";

export const UpdatePasswordAction = async (id:number,data: UpdatePass): Promise<UpdatePass> => {
  const response = await axios.put(`${API_URL}/update-password/${id}`, data);
  return response.data;
};
