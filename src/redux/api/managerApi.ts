// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const managerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createManager: build.mutation({
      query: (data) => ({
        url: "/user/create-manager",
        method: "POST",
        contentType: "multipart/form-data",
        data,
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

    getSingleManager: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/manager/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.manager],
    }),
    updateManager: build.mutation({
      query: (data) => ({
        url: `/manager/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.manager],
    }),
  }),
});

export const {
  useCreateManagerMutation,
  useGetAllManagerQuery,
  useDeleteManagerMutation,
  useGetSingleManagerQuery,
  useUpdateManagerMutation,
} = managerApi;
