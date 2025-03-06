import { FieldValues } from "react-hook-form";

export const modifyPayload = (values: FieldValues, dataName: string) => {
  const obj = { ...values };
  obj.studentData.adminId = "60f1f7e8f3a2b5b8d23bb7b9";
  obj.studentData.hallId = "67a49753051fe01222ca735d";
  obj.studentData.diningId = "67a49753051fe01222ca735b";
  obj.studentData.managerId = "60f1f7e8f3a2b5b8d23bb7b2";
  obj.studentData.user = "60f1f7e8f3a2b5b8d23bb7b3";
  obj.studentData.academicDepartment = "60f1f7e8f3a2b5b8d23bb7b4";

  const file = obj["file"];
  delete obj["file"];
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append(dataName, data);
  formData.append("file", file as Blob);
  return formData;
};
