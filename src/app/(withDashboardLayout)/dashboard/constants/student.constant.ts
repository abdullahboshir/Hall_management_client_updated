import dayjs from "dayjs";
import { IStudent } from "../types/student.interface";

export const studentRegisterDefaultValues = (userData?: IStudent) => {
  return {
    studentData: {
      name: {
        firstName: userData?.name?.firstName || "Mr.",
        middleName: userData?.name?.middleName || "",
        lastName: userData?.name?.lastName || "Student",
      },
      gender: userData?.gender || "Male",
      phoneNumber: userData?.phoneNumber || "01826396861",
      email: userData?.email || "allused20177@gmail.com",
      dateOfBirth: userData?.dateOfBirth
        ? dayjs(userData.dateOfBirth)
        : dayjs(),
      bloodGroup: userData?.bloodGroup || "A-",
      roomNumber: userData?.roomNumber || "305",
      seatNumber: userData?.seatNumber || "1",
      academicFaculty: userData?.academicFaculty || "",
      academicDepartment: userData?.academicDepartment || "",
      session: userData?.session || "2018",
      classRoll: userData?.classRoll || "43",
      emergencyContact: userData?.emergencyContact || "01826396855",

      guardian: {
        fatherName: userData?.guardian?.fatherName || "Mr. Abul kalam",
        fatherOccupation: userData?.guardian?.fatherOccupation || "Teacher",
        fatherContactNo: userData?.guardian?.fatherContactNo || "01826396273",
        motherName: userData?.guardian?.motherName || "Mrs. Kalima Khatun",
        motherOccupation: userData?.guardian?.motherOccupation || "House Wife",
        motherContactNo: userData?.guardian?.motherContactNo || "01826396839",
      },

      presentAddress: {
        division: userData?.presentAddress?.division || "Chauttagram",
        district: userData?.presentAddress?.district || "Cumilla",
        subDistrict: userData?.presentAddress?.subDistrict || "Chauddagram",
        alliance: userData?.presentAddress?.alliance || "Shreepur",
        village: userData?.presentAddress?.village || "Ramchandrapur",
      },

      permanentAddress: {
        division: userData?.permanentAddress?.division || "Chauttagram",
        district: userData?.permanentAddress?.district || "Cumilla",
        subDistrict: userData?.permanentAddress?.subDistrict || "Chauddagram",
        alliance: userData?.permanentAddress?.alliance || "Shreepur",
        village: userData?.permanentAddress?.village || "Ramchandrapur",
      },
    },
  };
};
