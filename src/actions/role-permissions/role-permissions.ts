import axios from "axios";
import { API_URL } from "../../public/urls/URL'S";
import { Role } from "../../models/Role";
import { RolePermission } from "../../models/RolePermissions";

export type RoleParams = Omit<Role, "id">;

export const RoleAction = async (data: RoleParams): Promise<Role> => {
  const response = await axios.post(`${API_URL}/roles`, data);
  return response.data;
};

export const getAllRoles = async (): Promise<Role[]> => {
  const response = await axios.get(`${API_URL}/roles`);
  return response.data;
};

export const getRolePermissionById = async (
  id: number
): Promise<RolePermission[]> => {
  const response = await axios.get(`${API_URL}/roles-permission/${id}`);
  return response.data;
};
export const updateRole = async (
  id: number,
  data: RoleParams
): Promise<Role> => {
  const response = await axios.put(`${API_URL}/roles/${id}`, data);
  return response.data;
};

export const updateRoleAndPermissionById = async (
  roleId: number,
  permissionId: number,
  state: boolean
): Promise<RolePermission> => {
  const response = await axios.put(
    `${API_URL}/roles-permission/${roleId}/${permissionId}`,
    { state }
  );
  return response.data;
};
