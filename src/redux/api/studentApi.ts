// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllStudent: build.query({
      query: () => ({
        url: "/student/getStudents",
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),
    getSingleStudent: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/student/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),
    updateStudent: build.mutation({
      query: (data) => ({
        url: `/student/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.student],
    }),
  }),
});

export const {
  useGetAllStudentQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} = studentApi;
