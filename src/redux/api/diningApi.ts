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
  }),
});

export const { useGetAllDiningsQuery } = diningApi;
