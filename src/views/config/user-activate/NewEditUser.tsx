import { useRef, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Steps } from "primereact/steps";
import { Card } from "primereact/card";
import { validationSchema } from "../../../validations/ValidationsSchema";
import { User } from "../../../models/User";
import { UserInitialValues } from "../../../class/UserRegister";
import { UpdateUserAction, UsersAddAction } from "../../../actions/users/users-actions";
import axios from "axios";
import { Toast } from "primereact/toast";
import SidebarComponent from "../../components/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";

export default function NewUsers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userToEdit = location.state?.user;

  const formik = useFormik<User>({
    initialValues: userToEdit || new UserInitialValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (userToEdit) {
          await UpdateUserAction(values).then((data) => {
            toast.current?.show({
              severity: "success",
              summary: "Éxito",
              detail: data.message,
            });
          });
        } else {
          await UsersAddAction(values).then((data) => {
            toast.current?.show({
              severity: "success",
              summary: "Éxito",
              detail: data.message,
            });
          });
        }
        navigate("/user-active");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const backendError = error.response.data;
          console.log(backendError);
          toast.current?.show({
            severity: "error",
            summary: `Error: ${backendError.error}`,
            detail: backendError.message,
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Error inesperado",
          });
        }
      }
    },
  });

  const roles = [
    { name: "Estudiante", code: 1 },
    { name: "Delegado", code: 2 },
    { name: "Representante", code: 3 },
  ];

  const steps = [
    { label: "Información Básica" },
    { label: "Información General" },
    { label: "Ingreso del Alumnado" },
  ];
  const genders = [
    { name: "Masculino", value: "M" },
    { name: "Femenino", value: "F" },
    { name: "Otro", value: "O" },
  ];

  const handleCancel = () => {
    formik.resetForm();
    navigate("/user-active");
  };
  const handleBack = () => {
    navigate('/user-active');
  };
  return (
    <div className="card">
      <SidebarComponent />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button icon="pi pi-arrow-left" className="p-button-text" onClick={handleBack} />
        <h1 style={{ textAlign: "center", flex: 1 }}>
          <i className="pi pi-user-plus" style={{ marginRight: "0.5rem" }}></i>
          {userToEdit ? "Editar Usuario" : "Insertar Usuarios"}
        </h1>
      </div>
      <Toast ref={toast} />
      <Steps
        model={steps}
        activeIndex={activeIndex}
        onSelect={(e) => setActiveIndex(e.index)}
        readOnly={false}
      />

      <Card title="Registro de Usuarios" className="mt-4">
        <form onSubmit={formik.handleSubmit}>
          {activeIndex === 0 && (
            <div className="p-fluid">
              <div className="field">
                <label htmlFor="identity" className="font-bold">
                  Cédula
                </label>
                <InputText
                  id="identity"
                  name="identity"
                  value={formik.values.identity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.identity && formik.errors.identity ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.identity as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="name" className="font-bold">
                  Primer Nombre
                </label>
                <InputText
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.name as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="secondName" className="font-bold">
                  Segundo Nombre
                </label>
                <InputText
                  id="secondName"
                  name="secondName"
                  value={formik.values.secondName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.secondName && formik.errors.secondName ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.secondName as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="firstLastName" className="font-bold">
                  Apellido Paterno
                </label>
                <InputText
                  id="firstLastName"
                  name="firstLastName"
                  value={formik.values.firstLastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstLastName && formik.errors.firstLastName ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.firstLastName as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="secondLastName" className="font-bold">
                  Apellido Materno
                </label>
                <InputText
                  id="secondLastName"
                  name="secondLastName"
                  value={formik.values.secondLastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.secondLastName &&
                formik.errors.secondLastName ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.secondLastName as string}
                  </div>
                ) : null}
              </div>
            </div>
          )}
          {activeIndex === 1 && (
            <div className="p-fluid">
              <div className="field">
                <label htmlFor="email" className="font-bold">
                  Correo Electrónico
                </label>
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.email as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="dateOfBirth" className="font-bold">
                  Fecha de Nacimiento
                </label>
                <InputText
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.dateOfBirth as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="gender" className="font-bold">
                  Género
                </label>
                <Dropdown
                  id="gender"
                  value={formik.values.gender}
                  options={genders}
                  onChange={(e) => formik.setFieldValue("gender", e.value)}
                  optionLabel="name"
                  placeholder="Selecciona un género"
                />
                {formik.touched.gender && formik.errors.gender ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.gender as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="phone" className="font-bold">
                  Teléfono
                </label>
                <InputText
                  id="phone"
                  name="phone"
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.phone as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="address" className="font-bold">
                  Dirección
                </label>
                <InputText
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.address as string}
                  </div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="age" className="font-bold">
                  Edad
                </label>
                <InputText
                  id="age"
                  name="age"
                  type="number"
                  value={String(formik.values.age)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.age && formik.errors.age ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.age as string}
                  </div>
                ) : null}
              </div>
            </div>
          )}
          {activeIndex === 2 && (
            <div className="p-fluid">
              <div className="field">
                <label htmlFor="roles" className="font-bold">
                  Roles
                </label>
                <Dropdown
                  id="code"
                  value={formik.values.roleId}
                  options={roles}
                  onChange={(e) => formik.setFieldValue("roleId", e.value)}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selecciona un rol"
                />
                {formik.touched.roleId && formik.errors.roleId ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.roleId as string}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-content-end" style={{ gap: "1rem" }}>
                <Button label="Enviar" icon="pi pi-check" type="submit" />
                <Button
                  label="Cancelar"
                  icon="pi pi-times"
                  className="p-button-danger"
                  onClick={handleCancel}
                />
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}