// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const noticeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNotice: build.mutation({
      query: (data) => ({
        url: "/notice/create-notice",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.notice],
    }),
    getAllNotices: build.query({
      query: () => ({
        url: "/notice/getAllNotices",
        method: "GET",
      }),
      providesTags: [tagTypes.notice],
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
    updateNoticePinned: build.mutation({
      query: (data) => ({
        url: `/notice/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.manager],
    }),
  }),
});

export const {
  useCreateNoticeMutation,
  useGetAllNoticesQuery,
  useDeleteManagerMutation,
  useGetSingleManagerQuery,
  useUpdateNoticePinnedMutation,
} = noticeApi;
