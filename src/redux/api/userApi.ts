// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStudent: build.mutation({
      query: (data) => ({
        url: "/user/create-student",
        method: "POST",
        // contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.student],
    }),
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUserStatus: build.mutation({
      query: ({ body, id }) => ({
        url: `/user/status/${id}`,
        method: "PATCH",
        data: body,
      }),
      transformResponse: (response) => {
        console.log("Full response from backend:", response);
        return response; // ✅ Ensure the full response is passed through
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useCreateStudentMutation,
  useUpdateUserStatusMutation,
} = userApi;
