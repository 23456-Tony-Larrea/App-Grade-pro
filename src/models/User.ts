import { Role } from "./Role";

export interface User {
  id?: number;
  name?: string;

  secondName?: string;

  firstLastName?: string;

  secondLastName?: string;

  identity?: string;

  dateOfBirth?: Date;

  gender?: string;

  phone?: string;

  address?: string;

  age?: number;

  email?: string;

  password?: string;

  roleId?: number;
  
  role? : Role
  }