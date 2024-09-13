import axios from "axios";
import { User } from "../../models/User";
import { API_URL } from "../../public/urls/URL'S";

export type UsersParams = Omit<User, "id">;

export const UsersAddAction = async (data: UsersParams): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};
export const GetUsersAction = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};
export const GetUsersFalseAction = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users/false`);
  return response.data;
};
export const ChangeStateBoolAction = async (id: number): Promise<User> => {
  const response = await axios.put(`${API_URL}/users/state/${id}`);
  return response.data;
};

export const UpdateUserAction = async (data: User): Promise<User> => {
  const response = await axios.put(`${API_URL}/users/${data.id}`, data);
  return response.data;
};
