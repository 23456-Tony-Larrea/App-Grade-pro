import { User } from "../models/User";

export class UserInitialValues implements User {
  name?: string = "";
  secondName?: string = "";
  firstLastName?: string = "";
  secondLastName?: string = "";
  identity?: string = "";
  dateOfBirth?: string = "";
  gender?: string = "";
  phone?: string = "";
  address?: string = "";
  age?: number = 0;
  email?: string = "";
  password?: string = "";
  roleId: number = 0;
}
