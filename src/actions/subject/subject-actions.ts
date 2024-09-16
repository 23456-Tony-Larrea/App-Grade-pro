import axios from "axios";
import { Subject } from "../../models/Subject";
import { API_URL } from "../../public/urls/URL'S";

export type subjectsParams = Omit<Subject, "id">;

export const SubjectsAddAction = async (data: subjectsParams): Promise<Subject> => {
  const response = await axios.post(`${API_URL}/subject`, data);
  return response.data;
};
export const GetSubjectsAction = async (): Promise<Subject[]> => {
  const response = await axios.get(`${API_URL}/subject`);
  return response.data;
};
export const ChangeStateBoolSubjectAction = async (id: number): Promise<Subject> => {
  const response = await axios.put(`${API_URL}/subject/${id}/change-state`);
  return response.data;
};

export const UpdateSubjectAction = async (data: Subject): Promise<Subject> => {
  const response = await axios.put(`${API_URL}/subject/${data.id}`, data);
  return response.data;
};
