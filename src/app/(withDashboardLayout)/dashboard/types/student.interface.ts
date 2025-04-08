export interface IAddress {
  village: string;
  alliance: string;
  subDistrict: string;
  district: string;
  division: string;
}

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface IUser {
  _id: string;
  status: "active" | "inactive" | "blocked";
  role: string;
}

export interface IStudent {
  id: string;
  profileImg?: string | undefined;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  academicDepartment: string;
  academicFaculty: string;
  classRoll: string;
  session: string;
  dateOfBirth?: string;
  gender: string;
  bloodGroup: string;
  roomNumber: string;
  seatNumber: string;
  presentAddress: IAddress;
  permanentAddress: IAddress;
  guardian: IGuardian;
  user: IUser;
}
