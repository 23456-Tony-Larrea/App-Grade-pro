import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("El primer nombre es requerido"),
  secondName: yup.string().optional(),
  firstLastName: yup.string().required("El apellido paterno es requerido"),
  secondLastName: yup.string().required("El apellido materno es requerido"),
  identity: yup.string().required("La cédula es requerida"),
  dateOfBirth: yup.string().required("La fecha de nacimiento es requerida"),
  gender: yup.string().required("El género es requerido"),
  phone: yup.string().required("El teléfono es requerido"),
  address: yup.string().optional(),
  age: yup.string().required("La edad es requerida"),
  email: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es requerido"),
  roleId: yup
    .number()
    .required("El rol es requerido")
    .integer("El rol debe ser un número entero"),
});
