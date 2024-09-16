import axios from "axios";
import { Course } from "../../models/Course";
import { API_URL } from "../../public/urls/URL'S";

export type CoursesParams = Omit<Course, "id">;

export const CoursesAddAction = async (
  data: CoursesParams
): Promise<Course> => {
  const response = await axios.post(`${API_URL}/course`, data);
  return response.data;
};
export const GetCoursesAction = async (): Promise<Course[]> => {
  const response = await axios.get(`${API_URL}/course`);
  return response.data;
};
export const ChangeStateBoolCourseAction = async (
  id: number
): Promise<Course> => {
  const response = await axios.put(`${API_URL}/course/${id}/change-state`);
  return response.data;
};

export const UpdateCourseAction = async (data: Course): Promise<Course> => {
  const response = await axios.put(`${API_URL}/course/${data.id}`, data);
  return response.data;
};
