import axios from 'axios';
import { API_URL } from '../public/urls/URL\'S';
import { Users } from '../models/User';

export type LoginUserParams = Omit<Users, 'id_user'>;

export const login = async (data: LoginUserParams): Promise<Users> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};