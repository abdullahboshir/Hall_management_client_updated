// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation({
      query: (data) => ({
        url: "/post/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.post],
    }),
    getAllPosts: build.query({
      query: (arg?: Record<string, unknown>) => ({
        url: "/post/getAllPosts",
        method: "GET",
        params: arg
      }),
      keepUnusedDataFor: 0,
      providesTags: [tagTypes.notice],
    }),
       updatePostBookmark: build.mutation({
          query: (id) => ({
            url: `/post/${id}`,
            method: "PATCH",
          }),
          invalidatesTags: [tagTypes.post],
        }),

    // deleteManager: build.mutation({
    //   query: (id) => ({
    //     url: `/manager/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.manager],
    // }),

    // getSingleManager: build.query({
    //   query: (id: string | string[] | undefined) => ({
    //     url: `/manager/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.manager],
    // }),
    updateLike: build.mutation({
      query: (id) => ({
        url: `/post/like/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.post],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useUpdatePostBookmarkMutation,
//   useDeleteManagerMutation,
//   useGetSingleManagerQuery,
  useUpdateLikeMutation,
} = postApi;
