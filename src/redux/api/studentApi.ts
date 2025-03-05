// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllStudent: build.query({
      query: () => ({
        url: "/students/getStudents",
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),
  }),
});

export const { useGetAllStudentQuery } = studentApi;
