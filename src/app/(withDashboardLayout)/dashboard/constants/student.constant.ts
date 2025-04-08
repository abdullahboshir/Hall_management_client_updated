import dayjs from "dayjs";
import { IStudent } from "../types/student.interface";

export const studentRegisterDefaultValues = (userData?: IStudent) => {
  return {
    studentData: {
      name: {
        firstName: userData?.name?.firstName || "",
        middleName: userData?.name?.middleName || "",
        lastName: userData?.name?.lastName || "",
      },
      gender: userData?.gender || "",
      phoneNumber: userData?.phoneNumber || "",
      email: userData?.email || "",
      dateOfBirth: userData?.dateOfBirth
        ? dayjs(userData.dateOfBirth)
        : dayjs(),
      bloodGroup: userData?.bloodGroup || "",
      roomNumber: userData?.roomNumber || "",
      seatNumber: userData?.seatNumber || "",
      academicFaculty: userData?.academicFaculty || "",
      academicDepartment: userData?.academicDepartment || "",
      session: userData?.session || "",
      classRoll: userData?.classRoll || "",
      emergencyContact: userData?.emergencyContact || "",

      guardian: {
        fatherName: userData?.guardian?.fatherName || "",
        fatherOccupation: userData?.guardian?.fatherOccupation || "",
        fatherContactNo: userData?.guardian?.fatherContactNo || "",
        motherName: userData?.guardian?.motherName || "",
        motherOccupation: userData?.guardian?.motherOccupation || "",
        motherContactNo: userData?.guardian?.motherContactNo || "",
      },

      presentAddress: {
        division: userData?.presentAddress?.division || "",
        district: userData?.presentAddress?.district || "",
        subDistrict: userData?.presentAddress?.subDistrict || "",
        alliance: userData?.presentAddress?.alliance || "",
        village: userData?.presentAddress?.village || "",
      },

      permanentAddress: {
        division: userData?.permanentAddress?.division || "",
        district: userData?.permanentAddress?.district || "",
        subDistrict: userData?.permanentAddress?.subDistrict || "",
        alliance: userData?.permanentAddress?.alliance || "",
        village: userData?.permanentAddress?.village || "",
      },
    },
  };
};
