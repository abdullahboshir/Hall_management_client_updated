// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const diningApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDinings: build.query({
      query: () => ({
        url: "/dining/getAllDinings",
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

export const { useGetAllDiningsQuery, useUpdateDiningMutation } = diningApi;
