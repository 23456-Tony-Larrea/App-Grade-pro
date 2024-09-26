export interface RolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  state: boolean;
  role: {
    id: number;
    name: string;
  };
  permission?: {
    id: number;
    name: string;
  };
  message?: string;
}
