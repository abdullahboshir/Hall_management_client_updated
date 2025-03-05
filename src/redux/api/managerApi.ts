// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const managerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createManager: build.mutation({
      query: (data) => ({
        url: "/users/create-manager",
        method: "POST",
        contentType: "multipart/form-data",
        body: data,
      }),
      invalidatesTags: [tagTypes.manager],
    }),
    getAllManager: build.query({
      query: () => ({
        url: "/manager/getManagers",
        method: "GET",
      }),
      providesTags: [tagTypes.manager],
    }),

    deleteManager: build.mutation({
      query: (id) => ({
        url: `/manager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.manager],
    }),
  }),
});

export const {
  useCreateManagerMutation,
  useGetAllManagerQuery,
  useDeleteManagerMutation,
} = managerApi;
