// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const diningApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDining: build.query({
      query: () => ({
        url: "/dining/getAllDining",
        method: "GET",
      }),
      providesTags: [tagTypes.dining],
    }),
      updateDining: build.mutation({
        query: (data) => ({
          url: `/dining/${data?.id}`,
          method: "PATCH",
          data: data.body,
        }),
        invalidatesTags: [tagTypes.dining],
      }),
  }),
});

export const { useGetAllDiningQuery, useUpdateDiningMutation } = diningApi;
