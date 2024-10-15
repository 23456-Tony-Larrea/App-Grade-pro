import React from "react";
import { Dialog } from "primereact/dialog";

interface CoursesDialogProps {
  visible: boolean;
  onHide: () => void;
  courses: string[];
  title: string;
}

const CoursesDialog: React.FC<CoursesDialogProps> = ({
  visible,
  onHide,
  courses,
  title,
}) => {
  return (
    <Dialog
      header={title}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </Dialog>
  );
};

export default CoursesDialog;
